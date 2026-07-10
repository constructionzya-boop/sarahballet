// Logique de prix du configurateur — grille versionnée PRICING_V1.
// Tous les montants sont en FCFA (entiers). Aucune dépendance externe :
// ce module est pur et testable unitairement.

import { EUR_XOF } from "./constants";

export type ProjectId = "commerce" | "studio" | "local-pro";
export type Level = "M1" | "M2" | "M3";
export type BaseType = "achat" | "location";
export type Financing = "comptant" | "location" | "accession" | "diaspora";

export type OptionId = "mezzanine" | "solaire" | "citerne" | "claustra" | "casquettes";

export interface ProjectDef {
  id: ProjectId;
  name: string;
  offer: string;
  baseAreaM2: number;
  basePriceFcfa: number;
  baseLevel: Level;
  allowTravees: boolean;
  /** Niveaux d'équipement proposés pour ce projet. */
  levels: readonly Level[];
}

export interface OptionDef {
  id: OptionId;
  label: string;
  priceFcfa: number;
  /** Non commandable pour l'instant (badge « Phase 2 »). */
  phase2?: boolean;
  /** Restreint à certains projets. */
  onlyProjects?: readonly ProjectId[];
}

const PROJECTS: Record<ProjectId, ProjectDef> = {
  commerce: {
    id: "commerce",
    name: "Mon commerce",
    offer: "Box Commerce",
    baseAreaM2: 17.3,
    basePriceFcfa: 3_200_000,
    baseLevel: "M2",
    allowTravees: true,
    levels: ["M1", "M2", "M3"],
  },
  studio: {
    id: "studio",
    name: "Mon studio / ma maison",
    offer: "Studio",
    baseAreaM2: 17.3,
    basePriceFcfa: 3_800_000,
    baseLevel: "M3",
    allowTravees: true,
    levels: ["M2", "M3"],
  },
  "local-pro": {
    id: "local-pro",
    name: "Mon local pro",
    offer: "Poste de gardiennage",
    baseAreaM2: 5.8,
    basePriceFcfa: 2_000_000,
    baseLevel: "M2",
    allowTravees: false,
    levels: ["M1", "M2"],
  },
};

const OPTIONS: readonly OptionDef[] = [
  {
    id: "mezzanine",
    label: "Mezzanine de stockage",
    priceFcfa: 600_000,
    phase2: true,
    onlyProjects: ["commerce"],
  },
  { id: "solaire", label: "Kit solaire (panneau + batterie + 3 LED + USB)", priceFcfa: 250_000 },
  { id: "citerne", label: "Citerne 1000 L + châssis", priceFcfa: 180_000 },
  { id: "claustra", label: "Extension claustra décoratif", priceFcfa: 90_000 },
  { id: "casquettes", label: "Casquettes supplémentaires", priceFcfa: 60_000 },
];

/**
 * Grille tarifaire V1. Toute évolution = nouvelle version (PRICING_V2) ;
 * un devis référence toujours la version qui l'a calculé.
 */
export const PRICING_V1 = {
  version: 1,
  currency: "XOF" as const,
  eurRate: EUR_XOF,
  travee: { priceFcfa: 300_000, areaM2: 4.32, maxExtra: 2 },
  /** Delta de prix par niveau, exprimé sur une base M2 = 0. */
  levelDeltaFcfa: { M1: -350_000, M2: 0, M3: 600_000 } as Record<Level, number>,
  projects: PROJECTS,
  options: OPTIONS,
};

export interface ConfigInput {
  project: ProjectId;
  extraTravees: number;
  level: Level;
  options: readonly OptionId[];
  base: BaseType;
  financing: Financing;
}

export interface FinancingBreakdown {
  /** Prix de référence (achat comptant) en FCFA. */
  totalFcfa: number;
  /** Loyer mensuel (location) en FCFA. */
  monthlyRentFcfa: number;
  /** Caution (3 loyers) en FCFA. */
  depositFcfa: number;
  /** Acompte location-accession (30 %) en FCFA. */
  downPaymentFcfa: number;
  /** Mensualité location-accession sur 36 mois en FCFA. */
  accessionMonthlyFcfa: number;
  /** Jalons diaspora 30/40/30 en EUR. */
  diasporaEur: readonly [number, number, number];
}

export interface ConfigResult {
  project: ProjectDef;
  areaM2: number;
  level: Level;
  totalFcfa: number;
  totalEur: number;
  financing: FinancingBreakdown;
  pricingVersion: number;
}

function round(n: number): number {
  return Math.round(n);
}

/** Delta d'équipement relatif au niveau de base du projet. */
export function levelDelta(project: ProjectDef, level: Level): number {
  return PRICING_V1.levelDeltaFcfa[level] - PRICING_V1.levelDeltaFcfa[project.baseLevel];
}

/** Somme des options réellement commandables (les options Phase 2 sont ignorées). */
export function optionsTotal(project: ProjectId, options: readonly OptionId[]): number {
  return PRICING_V1.options.reduce((sum, opt) => {
    if (!options.includes(opt.id)) return sum;
    if (opt.phase2) return sum;
    if (opt.onlyProjects && !opt.onlyProjects.includes(project)) return sum;
    return sum + opt.priceFcfa;
  }, 0);
}

/** Calcule le prix total et tous les plans de financement d'une configuration. */
export function computeConfig(input: ConfigInput): ConfigResult {
  const project = PRICING_V1.projects[input.project];

  const extra = project.allowTravees
    ? Math.max(0, Math.min(input.extraTravees, PRICING_V1.travee.maxExtra))
    : 0;

  const traveesFcfa = extra * PRICING_V1.travee.priceFcfa;
  const equipmentFcfa = levelDelta(project, input.level);
  const optsFcfa = optionsTotal(input.project, input.options);

  const totalFcfa = project.basePriceFcfa + traveesFcfa + equipmentFcfa + optsFcfa;
  const areaM2 = round((project.baseAreaM2 + extra * PRICING_V1.travee.areaM2) * 10) / 10;

  const monthlyRentFcfa = round(totalFcfa / 36);
  const depositFcfa = monthlyRentFcfa * 3;
  const downPaymentFcfa = round(totalFcfa * 0.3);
  const accessionMonthlyFcfa = round((totalFcfa - downPaymentFcfa) / 36);

  const eur = (fcfa: number) => round((fcfa / PRICING_V1.eurRate) * 100) / 100;
  const diasporaEur: [number, number, number] = [
    eur(totalFcfa * 0.3),
    eur(totalFcfa * 0.4),
    eur(totalFcfa * 0.3),
  ];

  return {
    project,
    areaM2,
    level: input.level,
    totalFcfa,
    totalEur: eur(totalFcfa),
    financing: {
      totalFcfa,
      monthlyRentFcfa,
      depositFcfa,
      downPaymentFcfa,
      accessionMonthlyFcfa,
      diasporaEur,
    },
    pricingVersion: PRICING_V1.version,
  };
}

const FCFA = new Intl.NumberFormat("fr-FR");
const EUR = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });

export function formatFcfa(n: number): string {
  return `${FCFA.format(n)} FCFA`;
}

export function formatEur(n: number): string {
  return EUR.format(n);
}
