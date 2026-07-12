// lib/invest.ts — Noéma Impact : socle de la plateforme de financement.
//
// ⚠️ CADRE LÉGAL D'ABORD (encodé en dur). Le crowdfunding immobilier AVEC
// promesse de rendement est une activité RÉGULÉE (agrément PSFP/AMF en Europe,
// équivalents UEMOA). La V1 ne propose donc AUCUN titre financier ni promesse
// de rendement. Trois modes derrière le feature-flag INVEST_MODE :
//
//   - "pionniers"  (V1, légal partout) : don avec contreparties + prévente.
//   - "interet"    (V1) : manifestation d'intérêt investisseurs → CRM.
//   - "regule"     (V2, DÉSACTIVÉ) : titres financiers — structure prête,
//                   voir docs/10-invest-compliance.md. Ne pas activer sans licence.
//
// Cf. docs/10-invest-compliance.md pour l'architecture de conformité.

export type InvestMode = "pionniers" | "interet" | "regule";

/** Mode courant, piloté par l'env (défaut : le mode légal partout). */
export const INVEST_MODE: InvestMode =
  (process.env.NEXT_PUBLIC_INVEST_MODE as InvestMode) || "pionniers";

/** Le mode régulé n'est JAMAIS actif tant que la licence n'est pas obtenue. */
export const REGULATED_ENABLED = false;

export type ImpactCategory = "ecole" | "sanitaire" | "logement";

export interface ImpactProject {
  slug: string;
  title: string;
  location: string;
  category: ImpactCategory;
  /** Objectif de collecte (FCFA). */
  goalFcfa: number;
  /** Déjà collecté (FCFA). */
  raisedFcfa: number;
  /** Nombre de contributeurs. */
  contributors: number;
  /** Accroche courte. */
  tagline: string;
  /** Récit du projet (problème réel → réponse Noéma). */
  story: string;
  /** Métriques d'impact affichées. */
  impact: { m2: number; label: string; value: string }[];
  /** Illustration (public/renders/...), sinon placeholder. */
  image?: string;
}

export const CATEGORY_LABEL: Record<ImpactCategory, string> = {
  ecole: "École",
  sanitaire: "Sanitaire public",
  logement: "Logement social",
};

/**
 * Paliers de contribution avec contreparties (mode PIONNIERS).
 * Ce sont des DONS avec contrepartie symbolique — jamais un placement.
 */
export interface RewardTier {
  minFcfa: number;
  title: string;
  reward: string;
}

export const REWARD_TIERS: readonly RewardTier[] = [
  {
    minFcfa: 25_000,
    title: "Bâtisseur",
    reward: "Votre nom sur le mur des bâtisseurs + rapport photo trimestriel.",
  },
  {
    minFcfa: 100_000,
    title: "Bâtisseur+",
    reward: "Le tout + une plaque nominative sur le bâtiment livré.",
  },
  {
    minFcfa: 500_000,
    title: "Partenaire",
    reward: "Le tout + visite du chantier + plaque partenaire officielle.",
  },
];

/** Le palier de contrepartie atteint pour un montant donné. */
export function tierForAmount(fcfa: number): RewardTier | null {
  let match: RewardTier | null = null;
  for (const t of REWARD_TIERS) {
    if (fcfa >= t.minFcfa) match = t;
  }
  return match;
}

/** Pourcentage d'avancement d'un projet (borné 0..100). */
export function progressPct(p: Pick<ImpactProject, "raisedFcfa" | "goalFcfa">): number {
  if (p.goalFcfa <= 0) return 0;
  return Math.min(100, Math.round((p.raisedFcfa / p.goalFcfa) * 100));
}

export const IMPACT_PROJECTS: readonly ImpactProject[] = [
  {
    slug: "ecole-abobo",
    title: "Une école modulaire à Abobo",
    location: "Abobo, Abidjan",
    category: "ecole",
    goalFcfa: 9_000_000,
    raisedFcfa: 3_150_000,
    contributors: 42,
    tagline: "3 salles de classe posées en une semaine, à la rentrée.",
    story:
      "À Abobo, des classes sous tôle montent à 38 °C l'après-midi. Nous posons 3 salles modulaires ventilées (pack climat tropical) en une semaine, à la rentrée. Chaque contribution finance des panneaux, une toiture froide, un tableau.",
    impact: [
      { m2: 52, label: "Élèves accueillis", value: "120" },
      { m2: 0, label: "Salles de classe", value: "3" },
      { m2: 0, label: "Gain thermique", value: "−8 °C" },
    ],
  },
  {
    slug: "sanitaires-marche-adjame",
    title: "Sanitaires publics au marché d'Adjamé",
    location: "Adjamé, Abidjan",
    category: "sanitaire",
    goalFcfa: 5_600_000,
    raisedFcfa: 4_480_000,
    contributors: 67,
    tagline: "2 blocs H/F, eau et citerne, pour 2 000 commerçantes.",
    story:
      "Le marché d'Adjamé manque de sanitaires dignes. Deux blocs modulaires (2 cabines H/F, citerne, puisard) desservent les allées les plus fréquentées — hygiène, dignité, entretien simple.",
    impact: [
      { m2: 17, label: "Personnes desservies/jour", value: "2 000" },
      { m2: 0, label: "Cabines", value: "4" },
      { m2: 0, label: "Autonomie eau", value: "1 000 L" },
    ],
  },
  {
    slug: "logements-sociaux-yopougon",
    title: "Studios sociaux à Yopougon",
    location: "Yopougon, Abidjan",
    category: "logement",
    goalFcfa: 14_000_000,
    raisedFcfa: 2_100_000,
    contributors: 23,
    tagline: "4 studios eau+élec pour familles en relogement.",
    story:
      "Quatre studios modulaires eau + électricité pour des familles en relogement d'urgence. Démontables et récupérables : si le terrain change, le logement suit. Loyer social encadré, entretien Noéma.",
    impact: [
      { m2: 69, label: "Familles logées", value: "4" },
      { m2: 0, label: "Délai de pose", value: "4 jours" },
      { m2: 0, label: "Récupérable", value: "100 %" },
    ],
    image: "/renders/studio-3quart-1.webp",
  },
];

export function getImpactProject(slug: string): ImpactProject | undefined {
  return IMPACT_PROJECTS.find((p) => p.slug === slug);
}

/** Total agrégé (tous projets) — pour le compteur de la page. */
export function impactTotals() {
  return IMPACT_PROJECTS.reduce(
    (acc, p) => ({
      raisedFcfa: acc.raisedFcfa + p.raisedFcfa,
      goalFcfa: acc.goalFcfa + p.goalFcfa,
      contributors: acc.contributors + p.contributors,
      projects: acc.projects + 1,
    }),
    { raisedFcfa: 0, goalFcfa: 0, contributors: 0, projects: 0 },
  );
}

/** Mention légale selon le mode actif — affichée sur toutes les pages impact. */
export const INVEST_DISCLAIMER: Record<InvestMode, string> = {
  pionniers:
    "Contribution = don avec contrepartie symbolique et/ou prévente. Ce n'est pas un placement financier : aucun rendement, aucune part de capital, aucune promesse de gain.",
  interet:
    "Manifestation d'intérêt sans engagement. Ceci n'est pas une offre de titres financiers ni une sollicitation d'investissement au sens réglementaire.",
  regule:
    "Mode régulé désactivé : aucune offre de titres financiers n'est proposée tant que l'agrément PSFP/AMF (ou équivalent UEMOA) n'est pas obtenu.",
};
