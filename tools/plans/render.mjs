#!/usr/bin/env node
// Rendu des planches : check → injection specs → screenshot chromium → PDF.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { execSync, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "../..");
const outDir = join(root, "docs/plans");
mkdirSync(outDir, { recursive: true });

// 1. check bloquant
const chk = spawnSync("node", [join(here, "check.mjs")], { stdio: "inherit" });
if (chk.status !== 0) { console.error("CHECK FAILED — rendu annulé."); process.exit(1); }

const specs = readFileSync(join(here, "specs.json"), "utf8");
const tpl = readFileSync(join(here, "generator.html"), "utf8");
const CH = process.env.CHROME || "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";

const SHEETS = [
  ["PL01", "NOEMA_PL01_Menuiseries_Baies_V1"],
  ["PL02", "NOEMA_PL02_Toiture_Parasol_V1"],
  ["PL03", "NOEMA_PL03_Structure_Assemblages_V1"],
  ["PL04", "NOEMA_PL04_Module_Sanitaire_V1"],
  ["PL05", "NOEMA_PL05_Poste_Gardiennage_V1"],
];

const pngs = [];
for (const [id, name] of SHEETS) {
  const html = tpl.replace("/*__SPECS__*/", specs).replace("/*__SHEET__*/", id);
  const tmp = join(here, `.render-${id}.html`);
  writeFileSync(tmp, html);
  const png = join(outDir, `${name}.png`);
  execSync(`"${CH}" --headless --disable-gpu --no-sandbox --hide-scrollbars ` +
    `--window-size=2000,1414 --force-device-scale-factor=2 ` +
    `--screenshot="${png}" --virtual-time-budget=5000 "file://${tmp}"`, { stdio: "pipe" });
  pngs.push([name, png]);
  console.log("✔ rendu", name + ".png (4000×2828)");
}

// 3. PDF assemblé (3 pages A3 paysage)
const pdfHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
@page{size:A3 landscape;margin:0}body{margin:0}
img{width:100%;height:auto;display:block;page-break-after:always}
img:last-child{page-break-after:auto}
</style></head><body>${pngs.map(([n, p]) => `<img src="file://${p}">`).join("")}</body></html>`;
const pdfTmp = join(here, ".render-pdf.html");
writeFileSync(pdfTmp, pdfHtml);
const pdf = join(outDir, "NOEMA_Details_Techniques_V1.pdf");
execSync(`"${CH}" --headless --disable-gpu --no-sandbox --no-pdf-header-footer ` +
  `--print-to-pdf="${pdf}" --virtual-time-budget=8000 "file://${pdfTmp}"`, { stdio: "pipe" });
console.log("✔ PDF assemblé :", pdf);
