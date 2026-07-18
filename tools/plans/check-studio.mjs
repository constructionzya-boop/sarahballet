#!/usr/bin/env node
// Contrôles de cohérence MEP du module Studio (PL-06/PL-07).
// Échec = code retour 1 → le rendu est bloqué.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const S = JSON.parse(readFileSync(join(here, "specs.json"), "utf8"));
const ST = JSON.parse(readFileSync(join(here, "specs-studio.json"), "utf8"));

let fail = 0;
const ok = (id, cond, msg) => {
  console.log(`${cond ? "  ✔" : "✘ FAIL"} [${id}] ${msg}`);
  if (!cond) fail = 1;
};

const [W, D] = ST.footprint;

// --- géométrie générale
ok("s1", W % 1200 === 0 && D % 1200 === 0, `emprise ${W}×${D} multiple de 1200`);
ok("s2", ST.baysW * 1200 === W && ST.baysD * 1200 === D, "travées × 1200 = emprise");
ok("s3", ST.axesW === ST.baysW + 1 && ST.axesD === ST.baysD + 1, "axes = travées + 1");
ok("s4", 2 * (ST.baysW + ST.baysD) === 14, "14 poteaux périmétriques");

// --- SDB sur sous-module 600, dans l'emprise
const B = ST.sdb;
ok("s5", [B.x, B.y, B.w, B.d].every(v => v % 600 === 0), "SDB calée sur sous-module 600");
ok("s6", B.x + B.w <= W && B.y + B.d <= D, "SDB dans l'emprise");
ok("s7", B.partitionHeight <= 2600, `cloison ${B.partitionHeight} arrêtée sous claustra (2600)`);

// --- niveaux
const wallTop = S.wall.plinth + S.wall.height; // 200+2700=2900
ok("s8", wallTop === S.column.height, "sommet mur = tête de poteau (2900)");
ok("s9", ST.ceiling >= 2600 && ST.ceiling <= wallTop, `plafond ${ST.ceiling} entre ligne claustra et tête de poteau`);

// --- élec
const E = ST.elec;
ok("e1", E.trunking.height < 2600 && E.trunking.height > E.heights.board,
  `goulotte ${E.trunking.height} sous la ligne claustra (2600) et au-dessus du coffret`);
ok("e2", E.claustraCrossing.level > 2600 && E.claustraCrossing.level < wallTop,
  "traversée élec dans la bande claustra 2600-2900 (zéro réservation)");
for (const c of E.circuits) {
  const max = E.maxPoints[String(c.section)];
  ok(`e3-${c.id}`, c.points <= max, `${c.id} ${c.name} : ${c.points} pts ≤ ${max} (section ${c.section} mm²)`);
  ok(`e4-${c.id}`, (c.section === 1.5 && c.breaker <= 16) || (c.section === 2.5 && c.breaker <= 20),
    `${c.id} : disjoncteur ${c.breaker} A compatible section ${c.section} mm²`);
}
ok("e5", E.heights.pc >= 50 && E.heights.board >= 900 && E.heights.board <= 1800,
  "hauteurs PC ≥ 50 et coffret entre 900 et 1800");
ok("e6", E.board.x >= ST.kitchenette.xFrom && E.board.x <= ST.kitchenette.xTo,
  "coffret sur le mur technique arrière côté kitchenette");

// --- plomberie : réservations toutes en plinthe arrière, gardes suffisantes
const P = ST.plumbing;
for (const r of P.reservations) {
  const guard = (S.wall.plinth - r.dia) / 2;
  ok(`p1-${r.id}`, guard >= P.minGuard, `${r.id} Ø${r.dia} en plinthe 200 : garde ${guard} ≥ ${P.minGuard}`);
  ok(`p2-${r.id}`, r.axis === S.wall.plinth / 2, `${r.id} axé mi-plinthe (100)`);
  ok(`p3-${r.id}`, r.x >= 150 && r.x <= W - 150, `${r.id} x=${r.x} à ≥150 des angles`);
}
const wc = P.fixtures.find(f => f.id === "wc");
const r1 = P.reservations.find(r => r.id === "R1");
ok("p4", r1.dia > wc.drainDia, `fourreau R1 Ø${r1.dia} > tuyau WC Ø${wc.drainDia}`);

// --- gravité : hauteur de charge par appareil + option surpresseur si < confort
let minHead = Infinity;
for (const f of P.fixtures) {
  const head = P.tank.standHeight - f.tapHeight;
  minHead = Math.min(minHead, head);
  ok(`p5-${f.id}`, head > 0, `${f.id} : charge gravitaire ${head} mm > 0 (fond de cuve ${P.tank.standHeight})`);
}
ok("p6", minHead >= P.pressure.minComfortHead || !!P.pressure.boosterOption,
  `charge mini ${minHead} mm < confort ${P.pressure.minComfortHead} → option surpresseur PRÉSENTE`);

// --- évacuations : pente × longueur du collecteur compatible regard
const drop = (P.slopesPct.exterior / 100) * P.collector.runMm;
ok("p7", drop <= 400, `chute collecteur ext. ${drop} mm sur ${P.collector.runMm} ≤ regard 400`);
ok("p8", P.fixtures.every(f => [32, 40, 100].includes(f.drainDia)), "diamètres EU normalisés (32/40/100)");
// appareils humides tous dans SDB ou sur mur kitchenette (façade technique)
for (const f of P.fixtures) {
  const inSdb = f.x >= B.x && f.x <= B.x + B.w && f.y >= B.y && f.y <= B.y + B.d;
  const onKitchWall = f.y >= D - ST.kitchenette.depth && f.x >= ST.kitchenette.xFrom;
  ok(`p9-${f.id}`, inSdb || onKitchWall, `${f.id} dans SDB ou sur bandeau kitchenette arrière`);
}
// citerne au-dessus de la kitchenette côté extérieur, sous débord 600
ok("p10", S.roof.overhang.rear >= 600, "citerne protégée : débord arrière ≥ 600");

console.log(fail ? "\nCHECK STUDIO MEP : ÉCHEC" : "\nCHECK STUDIO MEP : 27+ contrôles OK");
process.exit(fail);
