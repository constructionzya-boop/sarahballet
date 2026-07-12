// lib/payment/milestones.ts — Séquençage des paiements par JALONS 30/40/30.
//
// Décision actée (NOEMA-DOSSIER §11.0) : plan à jalons
//   30 % à la commande · 40 % fin de fabrication (photos usine) · 30 % à la
//   réception (PV + photos). Jamais de pose sous 70 % encaissé.

import type { Currency } from "./money";
import { toMinor } from "./money";

export type MilestoneId = "acompte" | "fabrication" | "solde";

export interface MilestoneDef {
  id: MilestoneId;
  label: string;
  /** Part du total (somme = 1). */
  share: number;
  /** Condition de déclenchement (affichée au client). */
  trigger: string;
}

export const MILESTONES: readonly MilestoneDef[] = [
  { id: "acompte", label: "Acompte de commande", share: 0.3, trigger: "À la réservation" },
  {
    id: "fabrication",
    label: "Fin de fabrication",
    share: 0.4,
    trigger: "Après les photos usine",
  },
  { id: "solde", label: "Solde à la réception", share: 0.3, trigger: "PV de pose + photos" },
];

export interface MilestoneAmount extends MilestoneDef {
  /** Montant du jalon en unités mineures de la devise. */
  amountMinor: number;
}

/**
 * Répartit un total (en unités mineures) sur les 3 jalons.
 * Le DERNIER jalon absorbe l'arrondi pour que la somme == total exactement.
 */
export function splitMilestones(totalMinor: number): MilestoneAmount[] {
  let allocated = 0;
  return MILESTONES.map((m, i) => {
    const isLast = i === MILESTONES.length - 1;
    const amountMinor = isLast
      ? totalMinor - allocated
      : Math.round(totalMinor * m.share);
    allocated += amountMinor;
    return { ...m, amountMinor };
  });
}

/** Calcule les jalons à partir d'un total exprimé en « unité » et une devise. */
export function milestonesFor(currency: Currency, totalAmount: number): MilestoneAmount[] {
  return splitMilestones(toMinor(currency, totalAmount));
}

/** Part cumulée encaissée après une liste de jalons payés (0..1). */
export function paidRatio(paid: readonly MilestoneId[]): number {
  return MILESTONES.reduce((sum, m) => (paid.includes(m.id) ? sum + m.share : sum), 0);
}

/** Seuil d'encaissement minimal avant d'autoriser la pose. */
export const POSE_MIN_PAID_RATIO = 0.7;
