// lib/payment/money.ts — Gestion multi-devises pour le checkout.
//
// EUR (diaspora, settlement SAS française) : 2 décimales → unités mineures = centimes.
// XOF (local Côte d'Ivoire) : devise SANS décimale (zero-decimal Stripe) → l'unité
// mineure EST le franc. Parité fixe XOF/EUR (655,957).

import { EUR_XOF } from "../constants";

export type Currency = "eur" | "xof";

/** Devises sans décimale (l'unité mineure = l'unité). */
const ZERO_DECIMAL: ReadonlySet<Currency> = new Set(["xof"]);

/** Nombre d'unités mineures par unité (100 pour EUR, 1 pour XOF). */
export function minorFactor(currency: Currency): number {
  return ZERO_DECIMAL.has(currency) ? 1 : 100;
}

/**
 * Convertit un montant « unité » (euros, ou francs) en unités mineures Stripe.
 * EUR 12,50 → 1250 ; XOF 3 200 000 → 3 200 000.
 */
export function toMinor(currency: Currency, amount: number): number {
  return Math.round(amount * minorFactor(currency));
}

/** Convertit des unités mineures en montant « unité ». */
export function fromMinor(currency: Currency, minor: number): number {
  return minor / minorFactor(currency);
}

/** Convertit un montant FCFA (XOF) vers la devise cible en unités mineures. */
export function fcfaToMinor(currency: Currency, fcfa: number): number {
  if (currency === "xof") return Math.round(fcfa);
  // EUR : parité fixe, arrondi au centime.
  return Math.round((fcfa / EUR_XOF) * 100);
}

const FMT: Record<Currency, Intl.NumberFormat> = {
  eur: new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }),
  xof: new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }),
};

/** Formate un montant en unités mineures pour affichage. */
export function formatMinor(currency: Currency, minor: number): string {
  const v = fromMinor(currency, minor);
  return currency === "xof" ? `${FMT.xof.format(v)} FCFA` : FMT.eur.format(v);
}
