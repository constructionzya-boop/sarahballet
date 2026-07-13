// lib/stripe/server.ts — Client Stripe côté serveur (jamais importé au client).
//
// Le client est instancié paresseusement depuis STRIPE_SECRET_KEY. En son
// absence (env non configuré), getStripe() renvoie null : les routes API
// répondent alors 503 « paiement non configuré » plutôt que de planter le build.
//
// ⚠️ Module SERVEUR uniquement (utilise STRIPE_SECRET_KEY) — ne jamais importer
// depuis un composant client.

import Stripe from "stripe";

/**
 * Version d'API épinglée : évite toute dérive silencieuse du comportement Stripe
 * lors d'une montée de version du SDK. À faire évoluer volontairement, testée.
 */
export const STRIPE_API_VERSION = "2025-06-30.basil" as const;

let cached: Stripe | null | undefined;

export function getStripe(): Stripe | null {
  if (cached !== undefined) return cached;
  const key = process.env.STRIPE_SECRET_KEY;
  cached = key
    ? new Stripe(key, {
        apiVersion: STRIPE_API_VERSION as Stripe.LatestApiVersion,
        typescript: true,
      })
    : null;
  return cached;
}

/** Secret de signature des webhooks (Stripe CLI ou dashboard). */
export function getWebhookSecret(): string {
  return process.env.STRIPE_WEBHOOK_SECRET ?? "";
}

/**
 * Mode déduit du PRÉFIXE de la clé secrète — jamais codé en dur dans l'UI.
 * `sk_test_…` → test ; `sk_live_…` → live ; absente → unconfigured.
 * Permet à la copie de réassurance (« paiement en mode test ») de ne jamais mentir.
 */
export type StripeMode = "test" | "live" | "unconfigured";

export function stripeMode(): StripeMode {
  const key = process.env.STRIPE_SECRET_KEY ?? "";
  if (key.startsWith("sk_live_") || key.startsWith("rk_live_")) return "live";
  if (key.startsWith("sk_test_") || key.startsWith("rk_test_")) return "test";
  return "unconfigured";
}
