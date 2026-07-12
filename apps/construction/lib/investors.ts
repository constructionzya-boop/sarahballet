// lib/investors.ts — Données de l'espace investisseurs (thèse, marché, levées).
//
// Ton : sobre, chiffré, sourcé quand possible. Chiffres marché = ordres de
// grandeur issus du dossier (NOEMA-DOSSIER §1, §6) — « indicatif ».

export interface MarketLayer {
  id: "tam" | "sam" | "som";
  label: string;
  valueLabel: string;
  basis: string;
}

/** TAM / SAM / SOM — marché du local pro et du logement accessible en CI. */
export const MARKET: readonly MarketLayer[] = [
  {
    id: "tam",
    label: "TAM — logement & local pro, Afrique de l'Ouest",
    valueLabel: "≈ 40 Md€",
    basis: "Déficit structurel logement + explosion du commerce informel formalisable.",
  },
  {
    id: "sam",
    label: "SAM — Côte d'Ivoire (Grand Abidjan + secondaires)",
    valueLabel: "≈ 3,5 Md€",
    basis: "600 000 logements manquants à Abidjan ; objectif national 500 000 logements sociaux.",
  },
  {
    id: "som",
    label: "SOM — capté à 5 ans (corridor Abidjan)",
    valueLabel: "≈ 45 M€",
    basis: "1 usine, rayon de livraison rentable, montée en cadence progressive.",
  },
];

export interface FundingRound {
  id: string;
  label: string;
  target: string;
  use: string;
  status: "franchi" | "en cours" | "à venir";
}

/** Calendrier de levées : matériel/moules → usine → régional. */
export const FUNDING_ROUNDS: readonly FundingRound[] = [
  {
    id: "preseed",
    label: "Pré-seed — matériel & moules",
    target: "150 k€",
    use: "1er jeu de moules (Chine), unité showroom, 3 pré-commandes signées.",
    status: "en cours",
  },
  {
    id: "seed",
    label: "Seed — usine pilote",
    target: "800 k€",
    use: "Atelier Abidjan, 2e jeu de moules, équipe production, BFR.",
    status: "à venir",
  },
  {
    id: "serieA",
    label: "Série A — expansion régionale",
    target: "4 M€",
    use: "2e usine (corridor), Gabon, plateforme financière régulée.",
    status: "à venir",
  },
];

export interface BusinessStep {
  step: string;
  detail: string;
}

/** Business model en une chaîne de valeur lisible. */
export const BUSINESS_MODEL: readonly BusinessStep[] = [
  { step: "Sourcing Chine", detail: "Moules + quincaillerie importés (FOB), coût rendu maîtrisé." },
  { step: "Usine Abidjan", detail: "Préfabrication béton ±2-3 mm, finitions industrialisées." },
  { step: "Vente en ligne", detail: "Configurateur + checkout CB/mobile money, 3 façons de payer." },
  { step: "Pose en 1 jour", detail: "Montage à sec manuporté, aucun engin." },
  { step: "Revenus récurrents", detail: "Location, rent-to-own, SAV, marques annexes B2B." },
];

export interface Milestone {
  done: boolean;
  label: string;
}

/** Jalons franchis / à franchir (preuve d'exécution). */
export const EXECUTION_MILESTONES: readonly Milestone[] = [
  { done: true, label: "Système constructif figé (trame 1,20 m, nomenclature P1-P8)" },
  { done: true, label: "Diagnostic ingénieur + 11 décisions techniques actées" },
  { done: true, label: "Plateforme web : catalogue, configurateur, visite 3D, checkout" },
  { done: true, label: "Planches techniques V1 (box, sanitaire, gardiennage, studio)" },
  { done: false, label: "Statut juridique du module démontable tranché (GUPCCU/juriste)" },
  { done: false, label: "Prototype + essais (montage chrono, aspersion joints, démontage)" },
  { done: false, label: "3 lettres d'intention signées (pré-vente)" },
  { done: false, label: "1er jeu de moules commandé (usine Chine)" },
];

export interface TeamMember {
  name: string;
  role: string;
  note: string;
}

export const TEAM: readonly TeamMember[] = [
  {
    name: "Jeremy Gracia",
    role: "Fondateur",
    note: "Vision produit + plateforme, sourcing Chine, pied-à-terre familial en Côte d'Ivoire.",
  },
  {
    name: "Équipe d'agents IA",
    role: "Ingénierie · Stratégie · Dev",
    note: "Diagnostic technique, veille réglementaire, génération visuelle, développement continu.",
  },
  {
    name: "Partenaires terrain (en cours)",
    role: "Ingénieur structure agréé · bureau de contrôle CI",
    note: "Validation des hypothèses V1 avant fabrication en série.",
  },
];
