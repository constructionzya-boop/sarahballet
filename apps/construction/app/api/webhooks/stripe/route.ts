import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe, getWebhookSecret } from "../../../../lib/stripe/server";
import { mapStripeEvent } from "../../../../lib/payment/webhook";

export const runtime = "nodejs";

// Idempotence en mémoire (best-effort). En production, remplacer par une table
// `processed_webhook_events` (unique sur event.id) partagée entre instances —
// cf. docs/07-integrations.md et le champ Order.processedEventIds prévu à cet effet.
const processed = new Set<string>();

export async function POST(req: Request) {
  const stripe = getStripe();
  const secret = getWebhookSecret();
  if (!stripe || !secret) {
    return NextResponse.json({ error: "Webhook non configuré." }, { status: 503 });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Signature manquante." }, { status: 400 });
  }

  const payload = await req.text(); // corps BRUT requis pour la vérification.

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(payload, signature, secret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Signature invalide.";
    return NextResponse.json({ error: `Signature refusée : ${message}` }, { status: 400 });
  }

  // Idempotence : un même event.id n'est traité qu'une fois (retry-safe).
  if (processed.has(event.id)) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  try {
    const outcome = mapStripeEvent(event);

    switch (outcome.kind) {
      case "order":
        // TODO Phase 2 : charger le dossier (DB), applyWebhookEvent(order, event.id,
        // outcome.event), persister, puis reçu WhatsApp/email + déblocage production.
        console.log(
          `[stripe] order=${outcome.orderId} jalon=${outcome.milestone} → ${outcome.event.type}`,
        );
        break;
      case "impact":
        // TODO Phase 2 : incrémenter collecté + contributeurs du projet en base,
        // rafraîchir la barre de progression, ajouter au mur des bâtisseurs.
        console.log(
          `[stripe] impact projet=${outcome.projectSlug} +${outcome.amountMinor} ${outcome.currency}`,
        );
        break;
      case "signal":
        // Échec / remboursement / litige : trace comptable & anti-fraude.
        console.warn(
          `[stripe] signal=${outcome.signal} ref=${outcome.reference} order=${outcome.orderId ?? "-"}`,
        );
        break;
      case "ignore":
        break;
    }

    // On ne marque l'event traité qu'APRÈS un traitement sans exception : une
    // erreur transitoire laisse Stripe rejouer l'event (au lieu de le perdre).
    processed.add(event.id);
    return NextResponse.json({ received: true, handled: outcome.kind });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Traitement échoué.";
    // 500 → Stripe retentera. On NE marque PAS l'event comme traité.
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
