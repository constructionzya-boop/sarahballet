// lib/stripe/config.ts — Configuration Stripe partagée (client + serveur).
// Ne contient AUCUN secret : uniquement des seuils et la clé publiable.

import type { Currency } from "../payment/money";
import { EUR_XOF } from "../constants";

/** Clé publiable (exposée au navigateur). Absente = checkout en mode « non configuré ». */
export const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "";

/** Le checkout CB est-il activé côté client ? */
export const isCheckoutConfigured = STRIPE_PUBLISHABLE_KEY.length > 0;

/** Devises acceptées au checkout. EUR = diaspora (SAS FR), XOF = local. */
export const SUPPORTED_CURRENCIES: readonly Currency[] = ["eur", "xof"];

/**
 * Seuil de forçage 3DS2 (SCA) — au-delà, on force l'authentification forte.
 * Défini en euros (500 €) puis dérivé en XOF via la parité fixe : une seule
 * source de vérité, aucune constante magique qui puisse diverger de EUR_XOF.
 */
export const FORCE_3DS_EUR = 500;
export const FORCE_3DS_EUR_MINOR = FORCE_3DS_EUR * 100; // 50 000 c = 500,00 €
export const FORCE_3DS_XOF_MINOR = Math.round(FORCE_3DS_EUR * EUR_XOF); // XOF zero-decimal

export function force3dsThreshold(currency: Currency): number {
  return currency === "eur" ? FORCE_3DS_EUR_MINOR : FORCE_3DS_XOF_MINOR;
}
