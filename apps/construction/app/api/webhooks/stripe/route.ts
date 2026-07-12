import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe, getWebhookSecret } from "../../../../lib/stripe/server";
import type { OrderEvent } from "../../../../lib/payment/order";
import type { MilestoneId } from "../../../../lib/payment/milestones";

export const runtime = "nodejs";

// Idempotence en mémoire (best-effort). En production, remplacer par une table
// `processed_webhook_events` (unique sur event.id) — cf. docs/07-integrations.md.
const processed = new Set<string>();

/** Traduit un événement Stripe en événement métier du dossier. */
function toOrderEvent(event: Stripe.Event): OrderEvent | null {
  if (event.type === "payment_intent.succeeded") {
    const pi = event.data.object as Stripe.PaymentIntent;
    const milestone = pi.metadata?.milestone as MilestoneId | undefined;
    if (milestone) return { type: "PAYMENT_CONFIRMED", milestone };
  }
  return null;
}

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
  processed.add(event.id);

  const orderEvent = toOrderEvent(event);
  if (orderEvent) {
    const pi = event.data.object as Stripe.PaymentIntent;
    // TODO Phase 2 : charger le dossier (DB), appliquer applyWebhookEvent(),
    // persister, puis envoyer reçu WhatsApp/email et débloquer la production.
    console.log(
      `[stripe] ${event.type} order=${pi.metadata?.orderId} → ${orderEvent.type}`,
      orderEvent,
    );
  }

  return NextResponse.json({ received: true });
}
