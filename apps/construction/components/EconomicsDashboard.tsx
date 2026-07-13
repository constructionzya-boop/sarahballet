"use client";

import { useMemo, useState } from "react";
import type { ProjectId } from "../lib/pricing";
import { formatFcfa } from "../lib/pricing";
import {
  MODULE_COST,
  MODULE_VALUE,
  costTotal,
  contributionMargin,
  atelierFixedMonthly,
  breakevenModulesPerMonth,
  ltv,
  ltvCacRatio,
  CAC_TARGET_FCFA,
  sensitivity,
} from "../lib/economics";
import {
  PRICING_TIERS,
  modulePrice,
  computeWinWin,
  tierForVolume,
} from "../lib/pricing_v2";
import { CURRENT_VOLUME } from "../lib/metrics";

const PROJECTS: ProjectId[] = ["commerce", "studio", "local-pro"];
const LABELS: Record<ProjectId, string> = {
  commerce: "Box Commerce",
  studio: "Studio",
  "local-pro": "Poste gardiennage",
};

function Pct({ v }: { v: number }) {
  return <span className="tabular-nums">{v.toFixed(1)} %</span>;
}

export function EconomicsDashboard() {
  const [project, setProject] = useState<ProjectId>("commerce");
  const [cement, setCement] = useState(0); // -0.15 .. +0.15
  const [volume, setVolume] = useState(0); // -0.5 .. +0.5
  const [baseVolume, setBaseVolume] = useState(8); // modules/mois

  // Dashboard interne aligné sur le VOLUME COURANT (comme le site public), pas
  // figé sur le palier de lancement : évite un prix/marge faux passé 50 modules.
  const currentTier = tierForVolume(CURRENT_VOLUME);
  const price = useMemo(() => modulePrice(project, CURRENT_VOLUME).priceFcfa, [project]);
  const cost = MODULE_COST[project];
  const totalCost = costTotal(cost);
  const contribution = contributionMargin(project, price);
  const value = MODULE_VALUE[project];
  const win = computeWinWin(project, price, value.monthlyValueFcfa, value.valueLabel);
  const ltvB = ltv(project, price);
  const ratio = ltvCacRatio(project, price);

  const sens = useMemo(
    () => sensitivity(project, price, baseVolume, cement, volume),
    [project, price, baseVolume, cement, volume],
  );

  const avgContribution = useMemo(() => {
    const sum = PROJECTS.reduce(
      (s, p) => s + contributionMargin(p, modulePrice(p, CURRENT_VOLUME).priceFcfa),
      0,
    );
    return Math.round(sum / PROJECTS.length);
  }, []);
  const breakeven = breakevenModulesPerMonth(avgContribution);

  return (
    <div className="flex flex-col gap-6">
      {/* Sélecteur d'offre */}
      <div className="flex flex-wrap gap-2">
        {PROJECTS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setProject(p)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              project === p ? "bg-night text-cream" : "bg-white text-night/70 hover:bg-snow"
            }`}
          >
            {LABELS[p]}
          </button>
        ))}
      </div>

      {/* KPIs clés */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { t: "Coût de revient", v: formatFcfa(totalCost), s: "variable / module" },
          {
            t: `Prix · ${currentTier.label}`,
            v: formatFcfa(price),
            s: `vol. ${CURRENT_VOLUME} · marge cible ${Math.round(currentTier.grossMarginTarget * 100)} %`,
          },
          { t: "Marge contribution", v: formatFcfa(contribution), s: `${win.noema.marginPct} % du prix` },
          { t: "LTV / CAC", v: `${ratio}×`, s: `CAC ${formatFcfa(CAC_TARGET_FCFA)}` },
        ].map((k) => (
          <div key={k.t} className="rounded-2xl bg-white p-4 shadow-soft">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-dawn">{k.t}</p>
            <p className="mt-1 text-xl font-black tabular-nums text-night">{k.v}</p>
            <p className="text-xs text-night/50">{k.s}</p>
          </div>
        ))}
      </div>

      {/* Décomposition coût + marge */}
      <div className="rounded-2xl bg-white p-5 shadow-soft">
        <h3 className="text-sm font-bold uppercase tracking-widest text-dawn">
          Décomposition du prix — {LABELS[project]}
        </h3>
        <div className="mt-4 flex h-6 overflow-hidden rounded-full">
          {[
            { pct: win.noema.materialsPct, c: "bg-night", l: "Matériaux" },
            { pct: win.noema.laborPct, c: "bg-dawn", l: "Main-d'œuvre" },
            { pct: win.noema.logisticsPct, c: "bg-dew", l: "Logistique+pose" },
            { pct: win.noema.equipmentPct, c: "bg-sand", l: "Kit technique" },
            { pct: win.noema.marginPct, c: "bg-orange", l: "Marge" },
          ].map((seg) => (
            <div
              key={seg.l}
              className={`${seg.c} flex items-center justify-center`}
              style={{ width: `${seg.pct}%` }}
              title={`${seg.l} — ${seg.pct} %`}
            />
          ))}
        </div>
        <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1 text-sm sm:grid-cols-5">
          {[
            ["Matériaux", win.noema.materialsPct, cost.materialsFcfa],
            ["Main-d'œuvre", win.noema.laborPct, cost.laborFcfa],
            ["Logistique+pose", win.noema.logisticsPct, cost.logisticsFcfa],
            ["Kit technique", win.noema.equipmentPct, cost.equipmentFcfa],
            ["Marge", win.noema.marginPct, contribution],
          ].map(([l, pct, fcfa]) => (
            <li key={l as string} className="flex flex-col">
              <span className="text-night/60">{l as string}</span>
              <span className="font-semibold tabular-nums text-night">
                <Pct v={pct as number} />
              </span>
              <span className="text-xs tabular-nums text-night/40">{formatFcfa(fcfa as number)}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* LTV + point mort */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-5 shadow-soft">
          <h3 className="text-sm font-bold uppercase tracking-widest text-dawn">
            Valeur vie client (LTV)
          </h3>
          <ul className="mt-3 flex flex-col gap-1.5 text-sm">
            {[
              ["Marge module", ltvB.moduleMarginFcfa],
              ["SAV / maintenance", ltvB.serviceMarginFcfa],
              ["Extension (pondérée)", ltvB.extensionMarginFcfa],
              ["Parrainage (pondéré)", ltvB.referralMarginFcfa],
            ].map(([l, v]) => (
              <li key={l as string} className="flex justify-between">
                <span className="text-night/60">{l as string}</span>
                <span className="font-semibold tabular-nums text-night">
                  {formatFcfa(v as number)}
                </span>
              </li>
            ))}
            <li className="mt-1 flex justify-between border-t border-night/10 pt-2">
              <span className="font-semibold text-night">LTV totale</span>
              <span className="font-black tabular-nums text-orange">
                {formatFcfa(ltvB.totalFcfa)}
              </span>
            </li>
          </ul>
        </div>

        <div className="rounded-2xl bg-night p-5 text-cream shadow-soft">
          <h3 className="text-sm font-bold uppercase tracking-widest text-dew">
            Point mort de l&apos;atelier
          </h3>
          <p className="mt-3 text-sm text-cream/70">
            Charges fixes mensuelles : {formatFcfa(atelierFixedMonthly())}
          </p>
          <p className="mt-1 text-sm text-cream/70">
            Marge de contribution moyenne : {formatFcfa(avgContribution)}
          </p>
          <p className="mt-4 text-3xl font-black tabular-nums">
            {breakeven} modules<span className="text-lg font-semibold text-cream/60">/mois</span>
          </p>
          <p className="mt-1 text-xs text-cream/50">pour couvrir la structure</p>
        </div>
      </div>

      {/* Simulateur de sensibilité */}
      <div className="rounded-2xl bg-white p-5 shadow-soft">
        <h3 className="text-sm font-bold uppercase tracking-widest text-dawn">
          Simulateur de sensibilité
        </h3>
        <div className="mt-4 grid gap-6 sm:grid-cols-3">
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-night/70">
              Prix ciment / matériaux :{" "}
              <span className="font-bold tabular-nums text-night">
                {cement >= 0 ? "+" : ""}
                {Math.round(cement * 100)} %
              </span>
            </span>
            <input
              type="range"
              min={-0.15}
              max={0.15}
              step={0.01}
              value={cement}
              onChange={(e) => setCement(Number(e.target.value))}
              className="accent-orange"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-night/70">
              Volume mensuel :{" "}
              <span className="font-bold tabular-nums text-night">
                {volume >= 0 ? "+" : ""}
                {Math.round(volume * 100)} %
              </span>
            </span>
            <input
              type="range"
              min={-0.5}
              max={0.5}
              step={0.05}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="accent-orange"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-night/70">
              Volume de base :{" "}
              <span className="font-bold tabular-nums text-night">{baseVolume} /mois</span>
            </span>
            <input
              type="range"
              min={1}
              max={30}
              step={1}
              value={baseVolume}
              onChange={(e) => setBaseVolume(Number(e.target.value))}
              className="accent-orange"
            />
          </label>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-snow p-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-dawn">
              Marge brute après choc
            </p>
            <p
              className={`mt-1 text-2xl font-black tabular-nums ${
                sens.newGrossMarginPct < 10 ? "text-orange" : "text-night"
              }`}
            >
              {sens.newGrossMarginPct} %
            </p>
          </div>
          <div className="rounded-xl bg-snow p-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-dawn">
              Contribution / module
            </p>
            <p className="mt-1 text-2xl font-black tabular-nums text-night">
              {formatFcfa(sens.newContributionFcfa)}
            </p>
            <p className="text-xs tabular-nums text-night/40">
              {sens.contributionDeltaFcfa >= 0 ? "+" : ""}
              {formatFcfa(sens.contributionDeltaFcfa)}
            </p>
          </div>
          <div className="rounded-xl bg-snow p-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-dawn">
              Résultat mensuel atelier
            </p>
            <p
              className={`mt-1 text-2xl font-black tabular-nums ${
                sens.monthlyOperatingResultFcfa < 0 ? "text-orange" : "text-night"
              }`}
            >
              {formatFcfa(sens.monthlyOperatingResultFcfa)}
            </p>
          </div>
        </div>
      </div>

      {/* Paliers de marge */}
      <div className="rounded-2xl bg-white p-5 shadow-soft">
        <h3 className="text-sm font-bold uppercase tracking-widest text-dawn">
          Paliers de marge (volume-first)
        </h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[520px] text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-widest text-night/50">
                <th className="pb-2">Palier</th>
                <th className="pb-2">Volume</th>
                <th className="pb-2">Marge cible</th>
                <th className="pb-2">Prix {LABELS[project]}</th>
                <th className="pb-2">Finance</th>
              </tr>
            </thead>
            <tbody>
              {PRICING_TIERS.map((t) => {
                const vol = t.minVolume + 1;
                const p = modulePrice(project, vol).priceFcfa;
                return (
                  <tr key={t.id} className="border-t border-night/10">
                    <td className="py-2 font-semibold text-night">{t.label}</td>
                    <td className="py-2 tabular-nums text-night/60">
                      {t.minVolume}–{Number.isFinite(t.maxVolume) ? t.maxVolume : "∞"}
                    </td>
                    <td className="py-2 tabular-nums text-night/60">
                      {Math.round(t.grossMarginTarget * 100)} %
                    </td>
                    <td className="py-2 font-semibold tabular-nums text-night">{formatFcfa(p)}</td>
                    <td className="py-2 text-xs text-night/50">{t.purpose}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
