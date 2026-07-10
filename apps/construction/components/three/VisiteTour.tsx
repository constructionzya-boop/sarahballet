"use client";

import { useState } from "react";
import { cn } from "@noema/ui";
import { Tour3DPoster } from "./Tour3DPoster";
import type { ModuleConfig } from "../../lib/three/moduleBuilder";
import { type ProjectId, computeConfig, formatFcfa, PRICING_V1 } from "../../lib/pricing";

const PRESETS: ProjectId[] = ["commerce", "studio", "local-pro"];

export function VisiteTour({
  initialPreset,
  initialTravees,
}: {
  initialPreset: ProjectId;
  initialTravees: number;
}) {
  const [preset, setPreset] = useState<ProjectId>(initialPreset);
  const [extra, setExtra] = useState(initialTravees);

  const p = PRICING_V1.projects[preset];
  const level = p.baseLevel;
  const extraTravees = p.allowTravees ? extra : 0;

  const config: ModuleConfig = { preset, extraTravees, level, base: "achat", options: [] };
  const result = computeConfig({
    project: preset,
    extraTravees,
    level,
    options: [],
    base: "achat",
    financing: "comptant",
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        {PRESETS.map((id) => {
          const pr = PRICING_V1.projects[id];
          return (
            <button
              key={id}
              type="button"
              onClick={() => setPreset(id)}
              aria-pressed={preset === id}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                preset === id
                  ? "border-orange bg-orange text-white"
                  : "border-night/15 bg-white text-night hover:border-night/30",
              )}
            >
              {pr.offer}
            </button>
          );
        })}

        {p.allowTravees ? (
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-night/60">Travées</span>
            <button
              type="button"
              aria-label="Retirer une travée"
              onClick={() => setExtra((n) => Math.max(0, n - 1))}
              className="size-9 rounded-full border border-night/15 text-lg font-bold text-night"
            >
              −
            </button>
            <span className="w-6 text-center text-sm tabular-nums">+{extraTravees}</span>
            <button
              type="button"
              aria-label="Ajouter une travée"
              onClick={() => setExtra((n) => Math.min(PRICING_V1.travee.maxExtra, n + 1))}
              className="size-9 rounded-full border border-night/15 text-lg font-bold text-night"
            >
              +
            </button>
          </div>
        ) : null}
      </div>

      <Tour3DPoster
        config={config}
        priceFcfa={result.totalFcfa}
        label={`Visite 3D — ${p.offer} (${formatFcfa(result.totalFcfa)})`}
        className="h-[70vh] min-h-[440px]"
      />
    </div>
  );
}
