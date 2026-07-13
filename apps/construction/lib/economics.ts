// lib/economics.ts — Unit economics Noéma Construction.
//
// ⚠️ TOUS les chiffres sont des HYPOTHÈSES V1 « indicatives », à remplacer par
// des devis fournisseurs réels datés (cf. NOEMA-DOSSIER §4.6). Ils servent au
// pilotage interne (dashboard /office/economics) et au calcul « win-win »
// affiché publiquement — jamais à un engagement de prix ferme.
//
// Module pur, sans dépendance externe : entièrement testable unitairement.
// Convention : tous les montants en FCFA entiers (XOF), sauf mention EUR.

import type { ProjectId } from "./pricing";
import { EUR_XOF } from "./constants";

/** Décomposition du coût de revient variable d'un module (par unité produite). */
export interface CostBreakdown {
  /**
   * Béton, aciers, panneaux P1-P8 et consommables de coulage — coût VARIABLE
   * pur. ⚠️ N'inclut PAS l'amortissement des moules : celui-ci est une charge
   * FIXE mensuelle (`ATELIER_FIXED.moldsAmortFcfa`), une seule source de vérité,
   * pour ne pas le compter deux fois (cf. docs/11-sourcing-chine.md §2).
   */
  materialsFcfa: number;
  /** Main-d'œuvre atelier (coffrage, coulage, finitions, contrôle qualité). */
  laborFcfa: number;
  /** Transport usine→site + pose (2-4 personnes, 1 jour). */
  logisticsFcfa: number;
  /** Kit technique : électricité pré-câblée, eau, cellule sanitaire selon niveau. */
  equipmentFcfa: number;
}

/** Coût variable total d'un module = somme des 4 postes. */
export function costTotal(c: CostBreakdown): number {
  return c.materialsFcfa + c.laborFcfa + c.logisticsFcfa + c.equipmentFcfa;
}

/**
 * Coût de revient variable par offre (hypothèses V1).
 * Base : chiffrages internes ordre de grandeur ; marge de lancement calibrée
 * pour rester à peine au-dessus du point mort structure (volume-first).
 */
//
// Les totaux sont calibrés pour que le prix de LANCEMENT (marge 20 %, cf.
// pricing_v2) tombe pile sur le « à partir de » publié au catalogue :
//   commerce 2 560 000 → 3 200 000 · studio 3 040 000 → 3 800 000 ·
//   local-pro 1 600 000 → 2 000 000. Cohérence prix affiché ↔ décomposition.
export const MODULE_COST: Record<ProjectId, CostBreakdown> = {
  commerce: {
    materialsFcfa: 1_600_000,
    laborFcfa: 400_000,
    logisticsFcfa: 300_000,
    equipmentFcfa: 260_000,
  },
  studio: {
    materialsFcfa: 1_850_000,
    laborFcfa: 430_000,
    logisticsFcfa: 320_000,
    equipmentFcfa: 440_000,
  },
  "local-pro": {
    materialsFcfa: 950_000,
    laborFcfa: 250_000,
    logisticsFcfa: 220_000,
    equipmentFcfa: 180_000,
  },
};

/**
 * Structure de coûts FIXES mensuels de l'atelier (indépendants du volume).
 * Détermine le point mort : combien de modules/mois pour couvrir la structure.
 */
export const ATELIER_FIXED = {
  /** Masse salariale mensuelle (équipe atelier + encadrement, charges incluses). */
  payrollFcfa: 2_200_000,
  /** Amortissement mensuel du jeu de moules (import Chine, sur 36 mois). */
  moldsAmortFcfa: 800_000,
  /** Loyer dépôt/atelier + énergie + assurances. */
  overheadFcfa: 500_000,
} as const;

/** Total des charges fixes mensuelles de l'atelier. */
export function atelierFixedMonthly(): number {
  return ATELIER_FIXED.payrollFcfa + ATELIER_FIXED.moldsAmortFcfa + ATELIER_FIXED.overheadFcfa;
}

/** Coût d'acquisition client cible (digital + terrain), hypothèse V1. */
export const CAC_TARGET_FCFA = 120_000;

/**
 * Hypothèses de valeur client par offre — sert au calcul du payback et de la LTV.
 * `monthlyValueFcfa` = revenu net généré (commerce) OU loyer économisé/perçu
 * (studio en location, local pro vs location d'un local équivalent).
 */
export const MODULE_VALUE: Record<
  ProjectId,
  { monthlyValueFcfa: number; valueLabel: string }
> = {
  commerce: { monthlyValueFcfa: 180_000, valueLabel: "revenu net estimé du commerce" },
  studio: { monthlyValueFcfa: 90_000, valueLabel: "loyer résidentiel perçu" },
  "local-pro": { monthlyValueFcfa: 70_000, valueLabel: "loyer d'un local équivalent" },
};

/** Marge de contribution unitaire = prix de vente − coût variable. */
export function contributionMargin(project: ProjectId, priceFcfa: number): number {
  return priceFcfa - costTotal(MODULE_COST[project]);
}

/**
 * Point mort mensuel de l'atelier : nombre de modules à vendre par mois pour
 * couvrir les charges fixes, à marge de contribution moyenne donnée.
 */
export function breakevenModulesPerMonth(avgContributionFcfa: number): number {
  if (avgContributionFcfa <= 0) return Infinity;
  return Math.ceil(atelierFixedMonthly() / avgContributionFcfa);
}

/** Composantes de la valeur vie client (LTV) au-delà de la première vente. */
export interface LtvBreakdown {
  /** Marge de contribution sur le module initial. */
  moduleMarginFcfa: number;
  /** SAV / maintenance sur la durée de vie (marge). */
  serviceMarginFcfa: number;
  /** Extension probable (+1 travée) pondérée par sa probabilité. */
  extensionMarginFcfa: number;
  /** Valeur de parrainage attendue (filleuls générés × marge, pondérée). */
  referralMarginFcfa: number;
}

/** Paramètres de LTV (probabilités et marges annexes), hypothèses V1. */
export const LTV_PARAMS = {
  serviceMarginFcfa: 120_000,
  extensionMarginFcfa: 130_000,
  extensionProbability: 0.35,
  /** Filleuls livrés attendus par client satisfait. */
  referralsPerClient: 0.4,
  /**
   * Marge moyenne récupérée sur un filleul = moyenne des marges de contribution
   * de lancement des 3 offres : (640k + 760k + 400k) / 3 = 600 000.
   */
  referralMarginPerFilleulFcfa: 600_000,
} as const;

/** LTV détaillée d'un client pour une offre et un prix donnés. */
export function ltv(project: ProjectId, priceFcfa: number): LtvBreakdown & { totalFcfa: number } {
  const moduleMarginFcfa = contributionMargin(project, priceFcfa);
  const serviceMarginFcfa = LTV_PARAMS.serviceMarginFcfa;
  const extensionMarginFcfa = Math.round(
    LTV_PARAMS.extensionMarginFcfa * LTV_PARAMS.extensionProbability,
  );
  const referralMarginFcfa = Math.round(
    LTV_PARAMS.referralsPerClient * LTV_PARAMS.referralMarginPerFilleulFcfa,
  );
  const totalFcfa =
    moduleMarginFcfa + serviceMarginFcfa + extensionMarginFcfa + referralMarginFcfa;
  return {
    moduleMarginFcfa,
    serviceMarginFcfa,
    extensionMarginFcfa,
    referralMarginFcfa,
    totalFcfa,
  };
}

/** Ratio LTV / CAC — santé du modèle (cible > 3). */
export function ltvCacRatio(project: ProjectId, priceFcfa: number): number {
  return Math.round((ltv(project, priceFcfa).totalFcfa / CAC_TARGET_FCFA) * 10) / 10;
}

/** Payback client : nombre de mois pour rentabiliser l'achat via la valeur mensuelle. */
export function paybackMonths(project: ProjectId, priceFcfa: number): number {
  const v = MODULE_VALUE[project].monthlyValueFcfa;
  if (v <= 0) return Infinity;
  return Math.ceil(priceFcfa / v);
}

/**
 * Simulateur de sensibilité : impact sur la marge d'une variation du prix
 * ciment (poste matériaux) et du volume (dilution des coûts fixes).
 *
 * @param cementDeltaPct variation du coût matériaux, ex. +0.15 pour +15 %.
 * @param volumeDeltaPct variation du volume mensuel, ex. -0.5 pour −50 %.
 */
export interface SensitivityResult {
  project: ProjectId;
  priceFcfa: number;
  baseContributionFcfa: number;
  newContributionFcfa: number;
  contributionDeltaFcfa: number;
  /** Marge brute % (contribution / prix) après choc. */
  newGrossMarginPct: number;
  /** Résultat mensuel de l'atelier après choc de volume (peut être négatif). */
  monthlyOperatingResultFcfa: number;
}

export function sensitivity(
  project: ProjectId,
  priceFcfa: number,
  baseMonthlyVolume: number,
  cementDeltaPct: number,
  volumeDeltaPct: number,
): SensitivityResult {
  const cost = MODULE_COST[project];
  const baseContributionFcfa = priceFcfa - costTotal(cost);

  // Choc ciment : n'affecte que le poste matériaux.
  const shockedMaterials = Math.round(cost.materialsFcfa * (1 + cementDeltaPct));
  const shockedCost = costTotal({ ...cost, materialsFcfa: shockedMaterials });
  const newContributionFcfa = priceFcfa - shockedCost;

  // Choc volume : dilue (ou concentre) les charges fixes sur plus/moins d'unités.
  const newVolume = Math.max(0, Math.round(baseMonthlyVolume * (1 + volumeDeltaPct)));
  const monthlyOperatingResultFcfa =
    newVolume * newContributionFcfa - atelierFixedMonthly();

  return {
    project,
    priceFcfa,
    baseContributionFcfa,
    newContributionFcfa,
    contributionDeltaFcfa: newContributionFcfa - baseContributionFcfa,
    newGrossMarginPct: Math.round((newContributionFcfa / priceFcfa) * 1000) / 10,
    monthlyOperatingResultFcfa,
  };
}

/** Conversion utilitaire FCFA → EUR (parité fixe). */
export function toEur(fcfa: number): number {
  return Math.round((fcfa / EUR_XOF) * 100) / 100;
}
