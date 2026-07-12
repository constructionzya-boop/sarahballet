import type { ProjectId } from "../lib/pricing";
import { formatFcfa } from "../lib/pricing";
import { MODULE_VALUE } from "../lib/economics";
import { modulePrice, computeWinWin, tierForVolume } from "../lib/pricing_v2";
import { CURRENT_VOLUME } from "../lib/metrics";

/**
 * Panneau win-win public : côte à côte, le gain CLIENT et la transparence
 * NOÉMA (décomposition matériaux/MO/logistique/kit/marge). La transparence
 * radicale EST le marketing — cf. NOEMA-DOSSIER §4.7.
 */
export function WinWinPanel({ project }: { project: ProjectId }) {
  const price = modulePrice(project, CURRENT_VOLUME).priceFcfa;
  const value = MODULE_VALUE[project];
  const w = computeWinWin(project, price, value.monthlyValueFcfa, value.valueLabel);
  const tier = tierForVolume(CURRENT_VOLUME);

  const segments = [
    { pct: w.noema.materialsPct, c: "bg-night", l: "Matériaux" },
    { pct: w.noema.laborPct, c: "bg-dawn", l: "Main-d'œuvre usine" },
    { pct: w.noema.logisticsPct, c: "bg-dew", l: "Transport + pose" },
    { pct: w.noema.equipmentPct, c: "bg-sand", l: "Kit technique" },
    { pct: w.noema.marginPct, c: "bg-orange", l: "Notre marge" },
  ];

  return (
    <section className="grid gap-4 lg:grid-cols-2">
      {/* Côté CLIENT — ce que vous gagnez */}
      <div className="flex flex-col gap-4 rounded-3xl bg-night p-6 text-cream shadow-soft sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-dew">Vous y gagnez</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-3xl font-black tabular-nums">{w.client.paybackMonths}</p>
            <p className="text-sm text-cream/60">mois pour rentabiliser</p>
          </div>
          <div>
            <p className="text-3xl font-black tabular-nums">
              {formatFcfa(w.client.monthlyValueFcfa)}
            </p>
            <p className="text-sm text-cream/60">/mois — {w.client.valueLabel}</p>
          </div>
          <div>
            <p className="text-3xl font-black tabular-nums">
              {formatFcfa(w.client.assetValue3yFcfa)}
            </p>
            <p className="text-sm text-cream/60">patrimoine à 3 ans (module récupérable)</p>
          </div>
          <div>
            <p className="text-3xl font-black tabular-nums">1 jour</p>
            <p className="text-sm text-cream/60">et vous ouvrez</p>
          </div>
        </div>
        <p className="mt-auto text-xs text-cream/40">
          Estimations indicatives — variables selon l&apos;emplacement et l&apos;usage.
        </p>
      </div>

      {/* Côté NOÉMA — où va votre argent */}
      <div className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-soft sm:p-8">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-dawn">
            Où va votre argent
          </p>
          <span className="rounded-full bg-orange/10 px-3 py-1 text-[11px] font-bold text-orange">
            {tier.label} · marge {w.noema.marginPct} %
          </span>
        </div>

        <div className="flex h-6 overflow-hidden rounded-full">
          {segments.map((s) => (
            <div
              key={s.l}
              className={s.c}
              style={{ width: `${s.pct}%` }}
              title={`${s.l} — ${s.pct} %`}
            />
          ))}
        </div>

        <ul className="flex flex-col gap-1.5 text-sm">
          {segments.map((s) => (
            <li key={s.l} className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-night/70">
                <span className={`size-3 rounded-sm ${s.c}`} />
                {s.l}
              </span>
              <span className="font-semibold tabular-nums text-night">{s.pct} %</span>
            </li>
          ))}
        </ul>

        <p className="mt-auto rounded-xl bg-snow p-3 text-xs text-night/60">
          <span className="font-semibold text-night">Prix de lancement.</span> Il augmentera avec
          notre notoriété — <span className="font-semibold text-night">jamais</span> pour une
          commande déjà signée. Commander tôt verrouille votre prix.
        </p>
      </div>
    </section>
  );
}
