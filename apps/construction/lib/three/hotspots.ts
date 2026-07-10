// Points d'intérêt pédagogiques, data-driven par preset. Position en mètres
// dans le repère du module (centré à l'origine, Y vers le haut).

import type { ModuleConfig } from "./moduleBuilder";
import { bays, BAY } from "./moduleBuilder";

export type Hotspot = {
  id: string;
  title: string;
  body: string;
  href: string;
  position: [number, number, number];
};

/** Retourne les hotspots adaptés à la taille courante du module. */
export function getHotspots(config: ModuleConfig): Hotspot[] {
  const { w, d } = bays(config);
  const halfW = (w * BAY) / 2;
  const halfD = (d * BAY) / 2;

  const list: Hotspot[] = [
    {
      id: "toit-parasol",
      title: "Toit Parasol",
      body: "Toiture froide ventilée : une lame d'air de 300 mm évacue la chaleur. −6 à −10 °C.",
      href: "/#toit-parasol",
      position: [0, 3.35, halfD * 0.2],
    },
    {
      id: "claustra",
      title: "Claustra P2",
      body: "Bandeau perforé en tête de mur : ventilation traversante, moustiquaire intégrée.",
      href: "/modules/box-commerce",
      position: [halfW + 0.05, 2.75, 0],
    },
    {
      id: "panneau",
      title: "Panneau P1 — trame 1,20 m",
      body: "Panneaux horizontaux 1200×600×60 empilés à sec. Zéro coupe, qualité usine.",
      href: "/configurer",
      position: [-halfW - 0.05, 1.1, 0],
    },
    {
      id: "casquette",
      title: "Casquette P5",
      body: "Brise-soleil béton au-dessus de chaque fenêtre : protège du soleil vertical.",
      href: "/#toit-parasol",
      position: [-halfW - 0.05, 2.0, -halfD + BAY * 0.5],
    },
    {
      id: "plinthe",
      title: "Plinthe & assise",
      body:
        config.base === "location"
          ? "Skid démontable boulonné : le module se récupère (actif mobile)."
          : "Plinthe surélevée 200 mm + dalle : hors d'eau, arase étanche.",
      href: "/configurer",
      position: [0, 0.12, -halfD - 0.2],
    },
  ];

  if (config.preset === "studio") {
    list.push({
      id: "cellule-eau",
      title: "Cellule d'eau",
      body: "Cellule sanitaire 1,2 × 2,4 m + kitchenette, préinstallée en usine.",
      href: "/modules/studio",
      position: [-halfW + 0.6, 1.4, halfD - 1.2],
    });
  }

  return list;
}
