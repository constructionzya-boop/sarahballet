// lib/stripe/config.ts — Configuration Stripe partagée (client + serveur).
// Ne contient AUCUN secret : uniquement des seuils et la clé publiable.

import type { Currency } from "../payment/money";

/** Clé publiable (exposée au navigateur). Absente = checkout en mode « non configuré ». */
export const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "";

/** Le checkout CB est-il activé côté client ? */
export const isCheckoutConfigured = STRIPE_PUBLISHABLE_KEY.length > 0;

/** Devises acceptées au checkout. EUR = diaspora (SAS FR), XOF = local. */
export const SUPPORTED_CURRENCIES: readonly Currency[] = ["eur", "xof"];

/**
 * Seuil de forçage 3DS2 (SCA) — au-delà, on force l'authentification forte.
 * 500 € en centimes ; l'équivalent XOF via la parité fixe.
 */
export const FORCE_3DS_EUR_MINOR = 50000; // 500,00 €
export const FORCE_3DS_XOF_MINOR = 327979; // ≈ 500 € en FCFA

export function force3dsThreshold(currency: Currency): number {
  return currency === "eur" ? FORCE_3DS_EUR_MINOR : FORCE_3DS_XOF_MINOR;
}
