// lib/metrics.ts — Source unique des métriques publiques Noéma Construction.
//
// À METTRE À JOUR MANUELLEMENT à chaque jalon réel (ou brancher sur Connect en
// V2). Sert : compteur de preuve sociale, chiffres clés investisseurs, palier
// de prix courant (early-adopter lock-in). Chiffres = état déclaratif indicatif.

export const METRICS = {
  /** Modules signés à ce jour (pilote le palier de prix courant). */
  modulesSigned: 12,
  /** Modules effectivement livrés et posés. */
  modulesDelivered: 4,
  /** Mètres carrés construits (cumul). */
  m2Built: 69,
  /** Carnet de commandes en cours (FCFA). */
  backlogFcfa: 38_400_000,
  /** Contributeurs Noéma Impact (dons + préventes). */
  impactContributors: 0,
  /** Villes couvertes. */
  cities: ["Abidjan", "Libreville"],
  /** Date de dernière mise à jour (ISO). */
  updatedAt: "2026-07-12",
} as const;

/** Volume cumulé pilotant la grille de prix (= modules signés). */
export const CURRENT_VOLUME = METRICS.modulesSigned;
