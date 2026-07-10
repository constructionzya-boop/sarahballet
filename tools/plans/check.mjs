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
