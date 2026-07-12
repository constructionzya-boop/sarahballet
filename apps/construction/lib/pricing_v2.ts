// lib/pricing_v2.ts — Moteur de tarification paramétrique COST-PLUS transparent.
//
// Stratégie « volume-first gagnant-gagnant » : la marge de lancement est
// VOLONTAIREMENT basse (à peine au-dessus du point mort structure) pour
// maximiser le carnet de commandes. Elle monte par paliers de volume, qui
// financent les machines puis consolident la structure. Un client qui commande
// tôt VERROUILLE son prix de lancement (early-adopter lock-in).
//
// Ce moteur s'appuie sur les coûts de revient de lib/economics.ts. La grille V1
// (lib/pricing.ts) reste la référence historique du configurateur ; pricing_v2
// dérive le prix depuis le coût + la marge du palier courant.
//
// ⚠️ Tous les montants FCFA (XOF) entiers. Chiffres = hypothèses V1 indicatives.

import type { ProjectId } from "./pricing";
import { MODULE_COST, costTotal, contributionMargin } from "./economics";
import { EUR_XOF } from "./constants";

export const PRICING_V2_VERSION = 2 as const;

export type TierId = "lancement" | "croissance" | "etabli";

export interface PricingTier {
  id: TierId;
  label: string;
  /** Borne basse de volume cumulé (modules signés) — incluse. */
  minVolume: number;
  /** Borne haute de volume cumulé — incluse. Infinity pour le dernier palier. */
  maxVolume: number;
  /** Marge brute cible (part du prix de vente). Cost-plus : prix = coût/(1−marge). */
  grossMarginTarget: number;
  /** À quoi sert la marge de ce palier — affiché en transparence. */
  purpose: string;
}

/**
 * Paliers d'évolution de la marge. La bascule est déclenchée par le VOLUME
 * cumulé de modules signés (pas par une date arbitraire) : la notoriété se
 * mesure au carnet de commandes.
 */
export const PRICING_TIERS: readonly PricingTier[] = [
  {
    id: "lancement",
    label: "Prix de lancement",
    minVolume: 0,
    maxVolume: 50,
    grossMarginTarget: 0.2,
    purpose: "À peine au-dessus du point mort — on construit le carnet de commandes.",
  },
  {
    id: "croissance",
    label: "Palier croissance",
    minVolume: 51,
    maxVolume: 200,
    grossMarginTarget: 0.27,
    purpose: "Finance les machines et un second jeu de moules.",
  },
  {
    id: "etabli",
    label: "Palier établi",
    minVolume: 201,
    maxVolume: Number.POSITIVE_INFINITY,
    grossMarginTarget: 0.32,
    purpose: "Consolide la structure, le SAV et la R&D produit.",
  },
];

const FIRST_TIER: PricingTier = PRICING_TIERS[0]!;
const LAST_TIER: PricingTier = PRICING_TIERS[PRICING_TIERS.length - 1]!;

/** Palier courant en fonction du volume cumulé de modules signés. */
export function tierForVolume(cumulativeVolume: number): PricingTier {
  const v = Math.max(0, Math.floor(cumulativeVolume));
  return PRICING_TIERS.find((t) => v >= t.minVolume && v <= t.maxVolume) ?? LAST_TIER;
}

/** Modules restants avant la bascule au palier suivant (null si dernier palier). */
export function modulesUntilNextTier(cumulativeVolume: number): number | null {
  const tier = tierForVolume(cumulativeVolume);
  if (!Number.isFinite(tier.maxVolume)) return null;
  return Math.max(0, tier.maxVolume - Math.floor(cumulativeVolume) + 1);
}

/**
 * Prix cost-plus : marge exprimée en part du PRIX (marge brute), donc
 * prix = coût / (1 − marge). Arrondi au millier de FCFA supérieur (lisibilité).
 */
export function priceFromCost(costFcfa: number, grossMarginTarget: number): number {
  if (grossMarginTarget >= 1) throw new Error("grossMarginTarget doit être < 1");
  const raw = costFcfa / (1 - grossMarginTarget);
  return Math.ceil(raw / 1000) * 1000;
}

export interface ModulePriceV2 {
  project: ProjectId;
  tier: PricingTier;
  costFcfa: number;
  priceFcfa: number;
  priceEur: number;
  grossMarginPct: number;
  version: typeof PRICING_V2_VERSION;
}

/** Prix d'un module au palier correspondant au volume cumulé courant. */
export function modulePrice(project: ProjectId, cumulativeVolume: number): ModulePriceV2 {
  const tier = tierForVolume(cumulativeVolume);
  const costFcfa = costTotal(MODULE_COST[project]);
  const priceFcfa = priceFromCost(costFcfa, tier.grossMarginTarget);
  return {
    project,
    tier,
    costFcfa,
    priceFcfa,
    priceEur: Math.round((priceFcfa / EUR_XOF) * 100) / 100,
    grossMarginPct: Math.round(((priceFcfa - costFcfa) / priceFcfa) * 1000) / 10,
    version: PRICING_V2_VERSION,
  };
}

/**
 * Prix VERROUILLÉ pour un early adopter : le prix signé au palier de commande
 * ne bouge jamais, même quand la grille publique monte. On facture donc le
 * MINIMUM entre le prix de son palier verrouillé et le prix courant (garantie
 * « jamais de hausse sur une commande signée »).
 */
export function lockedPrice(
  project: ProjectId,
  lockedTierId: TierId,
  currentVolume: number,
): number {
  const lockedTier = PRICING_TIERS.find((t) => t.id === lockedTierId) ?? FIRST_TIER;
  const costFcfa = costTotal(MODULE_COST[project]);
  const atLock = priceFromCost(costFcfa, lockedTier.grossMarginTarget);
  const atNow = modulePrice(project, currentVolume).priceFcfa;
  return Math.min(atLock, atNow);
}

// ─────────────────────────────────────────────────────────────────────────────
// CALCULATEUR WIN-WIN — la transparence radicale EST le marketing.
// Côte à côte : le gain CLIENT et la décomposition NOÉMA (matériaux/MO/marge).
// ─────────────────────────────────────────────────────────────────────────────

export interface WinWinClient {
  /** Valeur mensuelle générée ou économisée (revenu commerce / loyer). */
  monthlyValueFcfa: number;
  valueLabel: string;
  /** Nombre de mois pour rentabiliser l'achat. */
  paybackMonths: number;
  /** Patrimoine constitué : valeur de revente estimée du module à 3 ans. */
  assetValue3yFcfa: number;
}

export interface WinWinNoema {
  costFcfa: number;
  priceFcfa: number;
  /** Parts en % du prix de vente (somme = 100). */
  materialsPct: number;
  laborPct: number;
  logisticsPct: number;
  equipmentPct: number;
  marginPct: number;
}

export interface WinWin {
  project: ProjectId;
  client: WinWinClient;
  noema: WinWinNoema;
}

/** Décote patrimoniale : un module reconditionnable garde ~70 % de valeur à 3 ans. */
export const ASSET_RETENTION_3Y = 0.7;

/**
 * Calcule le tableau win-win pour une offre à un prix donné.
 * `monthlyValueFcfa` et `valueLabel` proviennent de MODULE_VALUE (economics).
 */
export function computeWinWin(
  project: ProjectId,
  priceFcfa: number,
  monthlyValueFcfa: number,
  valueLabel: string,
): WinWin {
  const cost = MODULE_COST[project];
  const costFcfa = costTotal(cost);
  const marginFcfa = contributionMargin(project, priceFcfa);
  const pct = (n: number) => Math.round((n / priceFcfa) * 1000) / 10;

  return {
    project,
    client: {
      monthlyValueFcfa,
      valueLabel,
      paybackMonths: monthlyValueFcfa > 0 ? Math.ceil(priceFcfa / monthlyValueFcfa) : Infinity,
      assetValue3yFcfa: Math.round(priceFcfa * ASSET_RETENTION_3Y),
    },
    noema: {
      costFcfa,
      priceFcfa,
      materialsPct: pct(cost.materialsFcfa),
      laborPct: pct(cost.laborFcfa),
      logisticsPct: pct(cost.logisticsFcfa),
      equipmentPct: pct(cost.equipmentFcfa),
      marginPct: pct(marginFcfa),
    },
  };
}
