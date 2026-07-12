// lib/guides.ts — Guides SEO longue traîne (gabarit unique piloté par la donnée).
//
// Contenu réel (pas de lorem), orienté marché Côte d'Ivoire. Chaque guide tisse
// un cocon vers les fiches produits / le configurateur. Toute donnée chiffrée
// est « indicative » et renvoie au devis exact.

export interface GuideSection {
  h2: string;
  paragraphs: string[];
}

export interface GuideDef {
  slug: string;
  title: string;
  /** Meta description SEO (< 160 caractères). */
  description: string;
  /** Intention de recherche ciblée. */
  intent: string;
  intro: string;
  sections: GuideSection[];
  /** CTA final : label + href interne. */
  cta: { label: string; href: string };
  /** Fiches liées (maillage interne). */
  related: string[];
}

export const GUIDES: readonly GuideDef[] = [
  {
    slug: "construire-une-ecole-en-cote-divoire-prix",
    title: "Construire une école en Côte d'Ivoire : prix et délais (2026)",
    description:
      "Combien coûte une salle de classe en Côte d'Ivoire ? Comparatif préfabriqué vs traditionnel, délais, normes et financement.",
    intent: "prix salle de classe / école Abidjan",
    intro:
      "Ouvrir des salles de classe vite et à budget maîtrisé est un enjeu majeur en Côte d'Ivoire. Le préfabriqué modulaire change l'équation : une salle posée en un jour, aux finitions d'usine, au lieu de plusieurs semaines de chantier humide.",
    sections: [
      {
        h2: "Combien coûte une salle de classe ?",
        paragraphs: [
          "Une salle traditionnelle en agglos mobilise maçonnerie, enduits, séchage et main-d'œuvre sur plusieurs semaines, avec un prix très sensible à la météo et à la qualité du maçon.",
          "En modulaire Noéma, le prix « à partir de » se calcule au configurateur selon la surface (trame de 1,20 m), l'équipement (M1 à M3) et le pack climat. Le devis exact est gratuit — les prix affichés sont indicatifs.",
        ],
      },
      {
        h2: "Pourquoi le préfabriqué gagne pour une école",
        paragraphs: [
          "Vitesse : une salle utilisable dès le lendemain de la pose, sans engin de levage.",
          "Confort : le pack climat tropical (toiture froide ventilée, casquettes, ventilation traversante) fait gagner 6 à 10 °C — décisif pour la concentration des élèves.",
          "Réversibilité : le module est démontable et récupérable, un atout si le foncier évolue.",
        ],
      },
      {
        h2: "Normes et autorisations",
        paragraphs: [
          "Les établissements recevant du public imposent des exigences de sécurité incendie et d'accessibilité. Les dimensions et détails techniques sont des hypothèses V1 à valider par un ingénieur structure agréé et un bureau de contrôle en Côte d'Ivoire avant fabrication.",
        ],
      },
    ],
    cta: { label: "Financer une école modulaire", href: "/impact/ecole-abobo" },
    related: ["logement-social-modulaire", "toilettes-publiques-ecole-normes-cote-divoire"],
  },
  {
    slug: "investir-dans-l-immobilier-africain-petit-budget",
    title: "Investir dans l'immobilier africain avec un petit budget",
    description:
      "Comment se lancer dans l'immobilier en Afrique de l'Ouest avec un ticket modeste : préfabriqué, location, rent-to-own.",
    intent: "investir immobilier Afrique petit budget",
    intro:
      "On imagine l'immobilier réservé aux gros capitaux. Le modulaire préfabriqué et ses modes de financement rebattent les cartes : on peut démarrer petit, générer un revenu locatif, et faire grandir un parc pièce par pièce.",
    sections: [
      {
        h2: "Le module comme actif accessible",
        paragraphs: [
          "Un box commerce ou un studio préfabriqué a un coût d'entrée bien inférieur à une construction en dur, et se rentabilise via un revenu locatif ou l'exploitation directe.",
          "Parce qu'il est démontable, c'est un actif mobile : sa valeur ne dépend pas d'un unique terrain, ce qui limite le risque.",
        ],
      },
      {
        h2: "Trois façons d'y aller progressivement",
        paragraphs: [
          "Achat comptant pour maximiser la marge locative dès le premier mois.",
          "Location-accession (rent-to-own) : un acompte, puis des mensualités, et la propriété au terme — vous constituez un patrimoine en exploitant le bien.",
          "Contribution Noéma Impact : soutenir un projet à impact tout en suivant sa progression (don avec contreparties, sans promesse de rendement).",
        ],
      },
    ],
    cta: { label: "Voir les projets à impact", href: "/impact" },
    related: ["logement-social-modulaire", "location-vente-local-commercial-abidjan"],
  },
  {
    slug: "logement-social-modulaire",
    title: "Logement social modulaire : une réponse rapide au déficit",
    description:
      "Le logement modulaire béton comme levier contre le déficit de 600 000 logements à Abidjan : coûts, délais, atouts.",
    intent: "logement social modulaire Côte d'Ivoire",
    intro:
      "Abidjan fait face à un déficit estimé à 600 000 logements. Le modulaire préfabriqué offre une réponse industrielle : des studios eau + électricité posés en quelques jours, démontables et reconditionnables.",
    sections: [
      {
        h2: "Pourquoi l'industrialisation change l'échelle",
        paragraphs: [
          "La construction traditionnelle perd l'essentiel du temps dans les finitions humides. En usine, ces finitions sont faites en amont : sur site, tout s'emboîte à sec.",
          "Cette répétabilité permet de livrer un parc de logements à cadence régulière, avec une qualité constante (tolérances d'usine ±2-3 mm).",
        ],
      },
      {
        h2: "Un logement récupérable",
        paragraphs: [
          "Le studio en variante Location repose sur un skid démontable : il peut être déplacé ou récupéré. Pour du logement social, c'est un filet de sécurité — le bien suit les besoins.",
        ],
      },
    ],
    cta: { label: "Soutenir des studios sociaux", href: "/impact/logements-sociaux-yopougon" },
    related: ["investir-dans-l-immobilier-africain-petit-budget", "maison-prefabriquee-beton-diaspora"],
  },
  {
    slug: "prix-kiosque-abidjan",
    title: "Prix d'un kiosque à Abidjan : le vrai calcul",
    description:
      "Combien coûte un kiosque ou box commerce à Abidjan ? Comparatif tôle vs béton préfabriqué, et comment payer sans capital.",
    intent: "prix kiosque Abidjan",
    intro:
      "Un kiosque en tôle est bon marché à l'achat mais devient un four l'après-midi et se dégrade vite. Le box commerce préfabriqué béton coûte plus à l'entrée, mais dure, reste frais et se finance sans capital initial.",
    sections: [
      {
        h2: "Tôle vs béton : le coût réel",
        paragraphs: [
          "La tôle attire par son prix, mais l'inconfort thermique (jusqu'à 38 °C) réduit le chiffre d'affaires aux heures chaudes et la durée de vie est courte.",
          "Le box Noéma intègre le pack climat (toiture froide, casquettes, ventilation) : on reste autour de 30 °C, et la structure béton dure.",
        ],
      },
      {
        h2: "Payer sans avancer le capital",
        paragraphs: [
          "En location, vous démarrez sans capital ; si l'activité s'arrête, le module est récupéré. En location-accession, vos loyers construisent la propriété.",
          "Le prix exact dépend de la configuration : utilisez le configurateur, le devis est gratuit et indicatif.",
        ],
      },
    ],
    cta: { label: "Configurer mon box commerce", href: "/configurer" },
    related: ["box-commerce-prefabrique-cote-divoire", "location-vente-local-commercial-abidjan"],
  },
  {
    slug: "toilettes-publiques-ecole-normes-cote-divoire",
    title: "Toilettes publiques et scolaires : normes en Côte d'Ivoire",
    description:
      "Sanitaires publics et scolaires : points de vigilance, ventilation, eau, et solution modulaire clé en main.",
    intent: "toilettes école normes Abidjan",
    intro:
      "Des sanitaires dignes et bien entretenus sont un enjeu de santé publique dans les écoles et les marchés. Le bloc sanitaire modulaire apporte une réponse autonome : cabines H/F, ventilation dédiée, citerne et puisard en option.",
    sections: [
      {
        h2: "Les points de vigilance",
        paragraphs: [
          "Ventilation dédiée de la cellule sanitaire, évacuation correcte, arrivée d'eau ou citerne, et matériaux lavables sont les fondamentaux.",
          "Le bloc Noéma intègre ces éléments en usine, ce qui garantit une qualité constante et un entretien simple.",
        ],
      },
      {
        h2: "Autonomie eau et assainissement",
        paragraphs: [
          "Hors réseau, la citerne extérieure ombragée et le puisard préfabriqué assurent l'autonomie. Les dimensions techniques sont des hypothèses V1 à valider par un ingénieur agréé.",
        ],
      },
    ],
    cta: { label: "Financer des sanitaires publics", href: "/impact/sanitaires-marche-adjame" },
    related: ["construire-une-ecole-en-cote-divoire-prix", "logement-social-modulaire"],
  },
  {
    slug: "construire-sans-permis-cote-divoire",
    title: "Construire sans permis en Côte d'Ivoire : ce qui est possible",
    description:
      "Petite surface, plans-types, module démontable : les leviers pour construire vite et en règle en Côte d'Ivoire.",
    intent: "construire sans permis Côte d'Ivoire",
    intro:
      "La réglementation ivoirienne (Code de la Construction, guichet unique GUPCCU) encadre les autorisations. Plusieurs leviers favorisent les petits projets modulaires — à confirmer au cas par cas avec un juriste.",
    sections: [
      {
        h2: "Trois leviers favorables",
        paragraphs: [
          "La petite taille : sous certains seuils de surface et de montant, l'architecte n'est pas requis.",
          "Les plans-types : des modèles homologués peuvent être dispensés de certaines formalités — une piste que nous explorons pour nos modèles.",
          "Le caractère démontable/mobile : un module posé sans fondation permanente peut relever du bien mobile plutôt que de la construction — c'est la question juridique clé.",
        ],
      },
      {
        h2: "La règle d'or",
        paragraphs: [
          "Le statut exact (bien mobile vs construction, avec ou sans raccordement) doit être tranché par un juriste ivoirien ou le guichet unique avant tout déploiement à grande échelle. Ne pas se fier à une généralité.",
        ],
      },
    ],
    cta: { label: "Parler de mon projet", href: "/contact" },
    related: ["prix-kiosque-abidjan", "box-commerce-prefabrique-cote-divoire"],
  },
  {
    slug: "location-vente-local-commercial-abidjan",
    title: "Location-vente d'un local commercial à Abidjan (rent-to-own)",
    description:
      "Le rent-to-own appliqué au local commercial modulaire : mécanique, avantages et exemple de mensualités.",
    intent: "location vente local commercial Abidjan",
    intro:
      "La location-accession (rent-to-own) est prouvée en Afrique : on démarre avec un acompte, on paie des mensualités, et on devient propriétaire au terme. Appliquée au box commerce, elle transforme un loyer en patrimoine.",
    sections: [
      {
        h2: "Comment ça marche",
        paragraphs: [
          "Un acompte initial couvre le risque, puis des mensualités sur une durée fixée. La part acquise est suivie de façon transparente (« vous possédez X % de votre module »).",
          "Au terme, la propriété est transférée. En cas d'arrêt, le module démontable est récupéré et reconditionné.",
        ],
      },
      {
        h2: "L'intérêt pour le commerçant",
        paragraphs: [
          "Pas besoin d'immobiliser tout le capital : on garde sa boutique ouverte et on paie en exploitant. Le configurateur simule les trois modes (achat, location, accession).",
        ],
      },
    ],
    cta: { label: "Simuler mes mensualités", href: "/configurer" },
    related: ["prix-kiosque-abidjan", "investir-dans-l-immobilier-africain-petit-budget"],
  },
  {
    slug: "box-commerce-prefabrique-cote-divoire",
    title: "Box commerce préfabriqué en Côte d'Ivoire : le guide",
    description:
      "Tout sur le box commerce préfabriqué béton : surface, équipement, pose en 1 jour, façade et financement.",
    intent: "box commerce préfabriqué Côte d'Ivoire",
    intro:
      "Le box commerce est le produit phare : un local prêt à vendre, électricité pré-câblée, façade à jalousies et casquettes brise-soleil, posé en un jour. Idéal épicerie, boutique télécom ou kiosque.",
    sections: [
      {
        h2: "Ce qui est inclus",
        paragraphs: [
          "Structure béton (trame 1,20 m), niveau M2 (électricité pré-câblée), pack climat tropical, façade vitrée à jalousies pour ventiler et exposer.",
          "Option mezzanine de stockage sur les façades larges, kit solaire hors réseau, citerne.",
        ],
      },
      {
        h2: "Pose et exploitation",
        paragraphs: [
          "Assemblage à sec, 2 à 4 personnes, aucune grue. Le commerçant peut ouvrir dès le lendemain.",
          "Le prix « à partir de » se précise au configurateur ; le devis est gratuit et indicatif.",
        ],
      },
    ],
    cta: { label: "Voir le Box Commerce", href: "/modules/box-commerce" },
    related: ["prix-kiosque-abidjan", "location-vente-local-commercial-abidjan"],
  },
  {
    slug: "maison-prefabriquee-beton-diaspora",
    title: "Maison préfabriquée béton : le guide diaspora",
    description:
      "Construire à distance depuis la diaspora : studio préfabriqué, paiement échelonné et suivi photos.",
    intent: "maison préfabriquée béton diaspora",
    intro:
      "Pour la diaspora, construire au pays à distance rime souvent avec incertitude. Le studio préfabriqué apporte un cadre clair : configuration en ligne, paiement échelonné en euros, suivi photos à chaque jalon.",
    sections: [
      {
        h2: "Payer et suivre à distance",
        paragraphs: [
          "La SAS française Noéma Diaspora encaisse en euros selon un plan à jalons : 30 % à la commande, 40 % en fin de fabrication (photos usine), 30 % à la réception (PV + photos). Jamais de pose sous 70 % encaissé.",
          "Chaque étape est documentée par des photos — la production ne démarre qu'après encaissement de l'acompte.",
        ],
      },
      {
        h2: "Un studio prêt à habiter ou à louer",
        paragraphs: [
          "Cellule d'eau, kitchenette, niveau M3 (eau + électricité). Démontable, il peut aussi devenir une annexe ou un bien locatif.",
        ],
      },
    ],
    cta: { label: "Réserver un studio", href: "/reserver?project=studio&currency=eur" },
    related: ["logement-social-modulaire", "investir-dans-l-immobilier-africain-petit-budget"],
  },
  {
    slug: "climat-tropical-batiment-frais-sans-clim",
    title: "Garder un bâtiment frais sans clim en climat tropical",
    description:
      "Toiture froide, ventilation traversante, ombrage : comment gagner 6 à 10 °C sans climatisation en Afrique de l'Ouest.",
    intent: "bâtiment frais sans climatisation tropical",
    intro:
      "En climat ivoirien (27-33 °C, forte humidité), on ne cherche pas à isoler mais à ombrager et ventiler. Le pack climat tropical de Noéma applique ces principes de série.",
    sections: [
      {
        h2: "Les trois leviers",
        paragraphs: [
          "Toiture froide : double peau ventilée dans le bandeau de toiture + tôle claire cool-roof + plafond léger — jusqu'à −10 °C.",
          "Ventilation traversante : entrée basse et sortie haute en vis-à-vis, tirage thermique permanent.",
          "Ombrage : débords de 600 mm, casquettes au-dessus des fenêtres, orientation nord-sud.",
        ],
      },
      {
        h2: "Le détail qui change tout",
        paragraphs: [
          "Gouttières et descentes systématiques (le défaut universel du marché local), citerne extérieure ombragée, surélévation contre les remontées d'humidité.",
        ],
      },
    ],
    cta: { label: "Découvrir le Toit Parasol", href: "/" },
    related: ["box-commerce-prefabrique-cote-divoire", "toilettes-publiques-ecole-normes-cote-divoire"],
  },
];

export function getGuide(slug: string): GuideDef | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
