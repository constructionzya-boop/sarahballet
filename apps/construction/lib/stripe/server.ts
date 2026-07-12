// lib/stripe/server.ts — Client Stripe côté serveur (jamais importé au client).
//
// Le client est instancié paresseusement depuis STRIPE_SECRET_KEY. En son
// absence (env non configuré), getStripe() renvoie null : les routes API
// répondent alors 503 « paiement non configuré » plutôt que de planter le build.
//
// ⚠️ Module SERVEUR uniquement (utilise STRIPE_SECRET_KEY) — ne jamais importer
// depuis un composant client.

import Stripe from "stripe";

let cached: Stripe | null | undefined;

export function getStripe(): Stripe | null {
  if (cached !== undefined) return cached;
  const key = process.env.STRIPE_SECRET_KEY;
  cached = key ? new Stripe(key) : null;
  return cached;
}

/** Secret de signature des webhooks (Stripe CLI ou dashboard). */
export function getWebhookSecret(): string {
  return process.env.STRIPE_WEBHOOK_SECRET ?? "";
}
