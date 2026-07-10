#!/usr/bin/env node
// Contrôle de cohérence des specs Noéma avant tout rendu.
// Échec (exit 1) si une chaîne de cotes ne somme pas.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const S = JSON.parse(readFileSync(join(dirname(fileURLToPath(import.meta.url)), "specs.json"), "utf8"));
const results = [];
const eq = (name, actual, expected) =>
  results.push({ name, actual, expected, ok: actual === expected });

// (a) plinthe + mur + lame d'air = hors tout
eq("(a) plinthe+mur+lame d'air = hors tout",
  S.wall.plinth + S.wall.height + S.wall.airGap, S.wall.overall);

// (b) mur = 4×P1 + P2
eq("(b) 4×P1.h + P2.h = mur",
  4 * S.panels.P1.h + S.panels.P2.h, S.wall.height);

// (c) porte + imposte + claustra = mur
eq("(c) porte 2100 + imposte 300 + claustra 300 = mur",
  S.door.P4.clearH + S.door.transom.h + S.panels.P2.h, S.wall.height);

// (d) linteau : appuis + libre structurel = longueur ; libre structurel = 2 travées − poteau ;
//     passage libre = libre structurel − 2×(coulisse+fourrure)
eq("(d1) P9 : 2×appui + libre structurel = longueur",
  2 * S.lintel.P9.bearing + S.lintel.P9.clearStructural, S.lintel.P9.length);
eq("(d2) libre structurel = 2×trame − largeur poteau",
  2 * S.grid.module - S.column.w, S.lintel.P9.clearStructural);
eq("(d3) passage libre = libre structurel − 2×(coulisse+jeu)",
  S.lintel.P9.clearStructural - 2 * (S.lintel.shutter.guide + S.lintel.shutter.guidePacking),
  S.lintel.P9.clearPassage);

// (e) axes = travées + 1
eq("(e1) axes largeur = travées + 1", S.grid.baysW + 1, S.grid.axesW);
eq("(e2) axes profondeur = travées + 1", S.grid.baysD + 1, S.grid.axesD);

// (f) allège + fenêtre + claustra = plinthe + mur (niveaux depuis le sol)
eq("(f) allège 1400 + fenêtre 1200 + claustra 300 = plinthe+mur (2900)",
  S.window.P3.sillLevel + S.window.P3.h + S.panels.P2.h, S.wall.plinth + S.wall.height);

// (g) chaînes dessinées (déclaration statique des chaînes utilisées par le générateur)
const chains = [
  { name: "(g1) élévation verticale 200+1200+1200+300+300 = 3200",
    parts: [S.wall.plinth, S.window.P3.sillLevel - S.wall.plinth, S.window.P3.h, S.panels.P2.h, S.wall.airGap],
    total: S.wall.overall },
  { name: "(g2) porte 200+2100+300+300 = 2900",
    parts: [S.wall.plinth, S.door.P4.clearH, S.door.transom.h, S.panels.P2.h],
    total: S.wall.plinth + S.wall.height },
  { name: "(g3) rainure : engagement 35 = profondeur 40 − jeu 5",
    parts: [S.column.groove.effectiveEngagement, S.tolerances.erectionClearancePerSide],
    total: S.column.groove.depth },
  { name: "(g4) rainure : largeur 70 = panneau 60 + 2×5",
    parts: [S.panels.P1.t, 2 * S.tolerances.erectionClearancePerSide],
    total: S.column.groove.width }
];
for (const c of chains) eq(c.name, c.parts.reduce((a, b) => a + b, 0), c.total);

// (h) module sanitaire
const SA = S.modules.sanitaire;
eq("(h1) sanitaire : 1800 + 1800 = profondeur 3600",
  SA.partition.depth * 2, SA.footprint[1]);
eq("(h2) cloison à 1800 = 3×600 (sous-module)",
  SA.partition.depth % 600, 0);
eq("(h3) pignon 2400 = 2×trame (porte = 1 travée pleine)",
  2 * S.grid.module, SA.footprint[0]);
eq("(h4) cloison 2400 = 4×600 et cloison + P2 = mur (ventilation traversante au-dessus)",
  SA.partition.height + S.panels.P2.h, S.wall.height);

// (i) module gardiennage
const GA = S.modules.gardiennage;
eq("(i1) gardiennage : chaque façade 2400 = 2 travées (3 fenêtres + 1 porte = 4 façades)",
  2 * S.grid.module, GA.footprint[0]);
eq("(i2a) guichet horizontal : 300 + 2×150 ≤ largeur P1 1200",
  GA.guichet.w + 2 * GA.guichet.edge <= S.panels.P1.w, true);
eq("(i2b) guichet vertical : 200 + 2×150 ≤ hauteur P1 600",
  GA.guichet.h + 2 * GA.guichet.edge <= S.panels.P1.h, true);
// (i3) cours d'assise : limites depuis le sol 200/800/1400 — la réservation [1000;1200]
// avec gardes 150 → [850;1350] doit tenir dans le cours n°2 [800;1400]
const courseBot = 800, courseTop = 1400;
eq("(i3) réservation guichet [1000;1200] + gardes 150 tient dans le cours n°2 [800;1400]",
  (GA.guichet.sill - GA.guichet.edge >= courseBot) && (GA.guichet.sill + GA.guichet.h + GA.guichet.edge <= courseTop), true);

// Quantitatifs calculés depuis la géométrie (source des tables des planches)
function quantities(m, nDoors, nWindows){
  const bays = 2 * (m.baysW + m.baysD);                 // travées périmétriques
  const posts = 2 * m.baysW + 2 * m.baysD;              // nœuds périmétriques
  const fullBays = bays - nDoors - nWindows;
  const P1 = fullBays * 4 + nWindows * 2;               // fenêtre P3 remplace 2 cours
  const P2 = bays;                                      // bande claustra continue
  return { bays, posts, P1, P2 };
}
const qs = quantities(SA, 2, 0);
qs.P1 += (SA.partition.height / S.panels.P1.h) * (SA.footprint[0] / S.grid.module); // cloison : 4 cours × 2 sous-travées
const qg = quantities(GA, 1, 3);
console.log("\n=== QUANTITATIFS CALCULÉS ===");
console.log(`SANITAIRE  : ${qs.posts} poteaux + 2 poteaux U int. (TBV) · P1 ${qs.P1} (dont 8 cloison) · P2 ${qs.P2} · P4 2 · impostes 2 · P6 2 · WC 2 · lave-mains 2 · siphons 2 · citerne 1 · puisard 1 (TBV)`);
console.log(`GARDIENNAGE: ${qg.posts} poteaux · P1 ${qg.P1 - 1} + 1×P1G (réservation guichet) · P2 ${qg.P2} · P3 3 · P5 3 · P4 1 · imposte 1 · coffret 1`);

// Rapport
let fail = 0;
console.log("=== RAPPORT DE CONTRÔLE DE COHÉRENCE — specs.json V1 ===");
for (const r of results) {
  console.log(`${r.ok ? "✔" : "✘"} ${r.name}  →  ${r.actual} ${r.ok ? "=" : "≠"} ${r.expected}`);
  if (!r.ok) fail++;
}
console.log(fail === 0
  ? `\nTOUS LES CONTRÔLES PASSENT (${results.length}/${results.length}). Rendu autorisé.`
  : `\n${fail} CONTRÔLE(S) EN ÉCHEC — RENDU BLOQUÉ.`);
if (S._meta.corrections?.length) {
  console.log("\nCorrections V1 documentées :");
  S._meta.corrections.forEach(c => console.log("  • " + c));
}
process.exit(fail === 0 ? 0 : 1);
