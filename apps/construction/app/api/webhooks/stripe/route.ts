import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe, getWebhookSecret } from "../../../../lib/stripe/server";
import { mapStripeEvent } from "../../../../lib/payment/webhook";
import { getOrderStore, fulfillOrderEvent } from "../../../../lib/payment/store";
import type { Currency } from "../../../../lib/payment/money";

export const runtime = "nodejs";

// Idempotence de bord en mémoire (best-effort, court-circuit rapide). La source
// de vérité idempotente est `Order.processedEventIds` via le store. En prod,
// remplacer le store en mémoire par une table SQL partagée entre instances —
// cf. docs/07-integrations.md.
const processed = new Set<string>();
const orderStore = getOrderStore();

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
      case "order": {
        // Matérialise/charge le dossier et applique la transition métier (pure,
        // idempotente, retry-safe). Le seed (devise + total) permet de créer le
        // dossier au premier acompte à partir des metadata du PaymentIntent.
        const pi = event.data.object as Stripe.PaymentIntent;
        const totalMinorRaw = Number(pi.metadata?.totalMinor);
        const seed =
          Number.isFinite(totalMinorRaw) && totalMinorRaw > 0
            ? { currency: pi.currency as Currency, totalMinor: totalMinorRaw }
            : undefined;
        const res = await fulfillOrderEvent(
          orderStore,
          outcome.orderId,
          event.id,
          outcome.event,
          seed,
        );
        if (res.rejected) {
          // Hors séquence : on ACK 200 (ne pas faire retenter Stripe indéfiniment).
          console.warn(
            `[stripe] order=${outcome.orderId} jalon=${outcome.milestone} REFUSÉ: ${res.rejected}`,
          );
        } else {
          // TODO Phase 2 : reçu WhatsApp/email + déblocage production selon res.order.status.
          console.log(
            `[stripe] order=${outcome.orderId} jalon=${outcome.milestone} → ${res.order.status}` +
              (res.applied ? "" : " (déjà traité)"),
          );
        }
        break;
      }
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
