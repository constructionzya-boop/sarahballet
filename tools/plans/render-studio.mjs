#!/usr/bin/env node
// Rendu des planches MEP Studio : checks → injection specs fusionnées → PNG → PDF.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { execSync, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "../..");
const outDir = join(root, "docs/plans");
mkdirSync(outDir, { recursive: true });

for (const chk of ["check.mjs", "check-studio.mjs"]) {
  const r = spawnSync("node", [join(here, chk)], { stdio: "inherit" });
  if (r.status !== 0) { console.error(`${chk} FAILED — rendu annulé.`); process.exit(1); }
}

// fusion : specs.json (structure, intouché) + specs-studio.json → SPECS.modules.studio
const specs = JSON.parse(readFileSync(join(here, "specs.json"), "utf8"));
specs.modules.studio = JSON.parse(readFileSync(join(here, "specs-studio.json"), "utf8"));
const merged = JSON.stringify(specs);
const tpl = readFileSync(join(here, "generator.html"), "utf8");
const CH = process.env.CHROME || "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";

const SHEETS = [
  ["PL06", "NOEMA_PL06_Studio_Electricite_V1"],
  ["PL07", "NOEMA_PL07_Studio_Plomberie_V1"],
];

const pngs = [];
for (const [id, name] of SHEETS) {
  const html = tpl.replace("/*__SPECS__*/", merged).replace("/*__SHEET__*/", id);
  const tmp = join(here, `.render-${id}.html`);
  writeFileSync(tmp, html);
  const png = join(outDir, `${name}.png`);
  execSync(`"${CH}" --headless --disable-gpu --no-sandbox --hide-scrollbars ` +
    `--window-size=2000,1414 --force-device-scale-factor=2 ` +
    `--screenshot="${png}" --virtual-time-budget=5000 "file://${tmp}"`, { stdio: "pipe" });
  pngs.push([name, png]);
  console.log("✔ rendu", name + ".png");
}

const pdfHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
@page{size:A3 landscape;margin:0}body{margin:0}
img{width:100%;height:auto;display:block;page-break-after:always}
img:last-child{page-break-after:auto}
</style></head><body>${pngs.map(([n, p]) => `<img src="file://${p}">`).join("")}</body></html>`;
const pdfTmp = join(here, ".render-mep-pdf.html");
writeFileSync(pdfTmp, pdfHtml);
const pdf = join(outDir, "NOEMA_MEP_Studio_V1.pdf");
execSync(`"${CH}" --headless --disable-gpu --no-sandbox --no-pdf-header-footer ` +
  `--print-to-pdf="${pdf}" --virtual-time-budget=8000 "file://${pdfTmp}"`, { stdio: "pipe" });
console.log("✔ PDF assemblé :", pdf);
