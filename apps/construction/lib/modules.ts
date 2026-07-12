import type { Level, ProjectId } from "./pricing";

export type ModuleDef = {
  slug: string;
  name: string;
  level: Level;
  area: string;
  /** Prix indicatif « à partir de » en FCFA, ou null = sur devis. */
  fromFcfa: number | null;
  tagline: string;
  /** 3 specs courtes affichées en vignette. */
  specs: [string, string, string];
  description: string;
  /** Projet du configurateur pré-réglé, si applicable. */
  configurable: ProjectId | null;
  /** Rendu produit principal (vignette + hero fiche). Absent = placeholder. */
  image?: string;
  /** Galerie de la fiche : jusqu'à 3 vues. Complétée par des placeholders. */
  gallery?: { src: string; label: string }[];
};

export const MODULES: readonly ModuleDef[] = [
  {
    slug: "box-commerce",
    name: "Box Commerce",
    level: "M2",
    area: "17,3 m²",
    fromFcfa: 3_200_000,
    tagline: "Vendez dès le lendemain de la pose.",
    specs: ["17,3 m²", "Pose 1 jour", "Mezzanine possible"],
    description:
      "Local commercial prêt à l'emploi : électricité pré-câblée, façade vitrée à jalousies, casquettes brise-soleil. Idéal épicerie, boutique télécom, kiosque.",
    configurable: "commerce",
    image: "/renders/box-commerce-3quart-1.webp",
    gallery: [
      { src: "/renders/box-commerce-situation-1.webp", label: "Box Commerce en activité, rue d'Abidjan" },
      { src: "/renders/box-commerce-face-1.webp", label: "Box Commerce — façade avant, rideau ouvert" },
      { src: "/renders/box-commerce-ferme-1.webp", label: "Box Commerce — rideau fermé, sécurisé" },
    ],
  },
  {
    slug: "sanitaire-public",
    name: "Sanitaire public",
    level: "M3",
    area: "8,6 m²",
    fromFcfa: 2_800_000,
    tagline: "2 cabines H/F, citerne, puisard optionnel.",
    specs: ["8,6 m²", "2 cabines", "Eau + élec"],
    description:
      "Bloc sanitaire autonome pour écoles, marchés, ONG et chantiers. Entrées en pignon, ventilation dédiée, réservoir d'eau et puisard en option.",
    configurable: null,
  },
  {
    slug: "studio",
    name: "Studio / Chambre",
    level: "M3",
    area: "17,3 m²",
    fromFcfa: 3_800_000,
    tagline: "Cellule d'eau + kitchenette, prêt à habiter.",
    specs: ["17,3 m²", "Cellule d'eau", "Kitchenette"],
    description:
      "Logement d'une pièce eau + électricité : cellule sanitaire 1,2 × 2,4 m et coin cuisine. Pour la location résidentielle, la diaspora ou une annexe.",
    configurable: "studio",
    image: "/renders/studio-3quart-1.webp",
    gallery: [
      { src: "/renders/studio-3quart-2.webp", label: "Studio — variante toiture tôle ondulée" },
    ],
  },
  {
    slug: "poste-gardiennage",
    name: "Poste de gardiennage",
    level: "M2",
    area: "5,8 m²",
    fromFcfa: 2_000_000,
    tagline: "Vision 270°, guichet, prêt à poser.",
    specs: ["5,8 m²", "Vision 270°", "Guichet"],
    description:
      "Poste compact pour entreprises, résidences et chantiers : vitrage sur trois faces, guichet, électricité. Un bureau d'appoint tout aussi valable.",
    configurable: "local-pro",
  },
  {
    slug: "module-brut",
    name: "Module brut",
    level: "M1",
    area: "variable",
    fromFcfa: 1_500_000,
    tagline: "Stockage, abri — produit d'appel.",
    specs: ["Variable", "Structure seule", "Sans réseaux"],
    description:
      "La structure seule, sans réseaux : stockage, abri, réserve. Le point d'entrée le plus économique dans le système Noéma.",
    configurable: null,
  },
];

export function getModule(slug: string): ModuleDef | undefined {
  return MODULES.find((m) => m.slug === slug);
}
