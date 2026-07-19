#!/usr/bin/env node
// Rendu de la planche toiture PL-08 : check → PNG → PDF.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { execSync, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "../..");
const outDir = join(root, "docs/plans");
mkdirSync(outDir, { recursive: true });

const chk = spawnSync("node", [join(here, "check.mjs")], { stdio: "inherit" });
if (chk.status !== 0) { console.error("CHECK FAILED — rendu annulé."); process.exit(1); }

const specs = readFileSync(join(here, "specs.json"), "utf8");
const tpl = readFileSync(join(here, "generator.html"), "utf8");
const CH = process.env.CHROME || "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";

const html = tpl.replace("/*__SPECS__*/", specs).replace("/*__SHEET__*/", "PL08");
const tmp = join(here, ".render-PL08.html");
writeFileSync(tmp, html);
const png = join(outDir, "NOEMA_PL08_Toiture_Eclate_V1.png");
execSync(`"${CH}" --headless --disable-gpu --no-sandbox --hide-scrollbars ` +
  `--window-size=2000,1414 --force-device-scale-factor=2 ` +
  `--screenshot="${png}" --virtual-time-budget=5000 "file://${tmp}"`, { stdio: "pipe" });
console.log("✔ rendu NOEMA_PL08_Toiture_Eclate_V1.png");

const pdfHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
@page{size:A3 landscape;margin:0}body{margin:0}img{width:100%;display:block}
</style></head><body><img src="file://${png}"></body></html>`;
const pdfTmp = join(here, ".render-toiture-pdf.html");
writeFileSync(pdfTmp, pdfHtml);
const pdf = join(outDir, "NOEMA_PL08_Toiture_V1.pdf");
execSync(`"${CH}" --headless --disable-gpu --no-sandbox --no-pdf-header-footer ` +
  `--print-to-pdf="${pdf}" --virtual-time-budget=8000 "file://${pdfTmp}"`, { stdio: "pipe" });
console.log("✔ PDF :", pdf);
