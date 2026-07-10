"use client";

import { useMemo, useState } from "react";
import { cn } from "@noema/ui";
import {
  type BaseType,
  type ConfigInput,
  type Financing,
  type Level,
  type OptionId,
  type ProjectId,
  computeConfig,
  formatFcfa,
  PRICING_V1,
} from "../lib/pricing";
import { PhotoFrame } from "./PhotoFrame";
import { PlanPreview2D } from "./PlanPreview2D";
import { ConfiguratorPanel } from "./ConfiguratorPanel";
import { PriceBar } from "./PriceBar";

const PROJECT_ORDER: ProjectId[] = ["commerce", "studio", "local-pro"];

const PROJECT_TAGLINE: Record<ProjectId, string> = {
  commerce: "Box Commerce 17,3 m² — pour vendre dès demain.",
  studio: "Studio eau + électricité — habiter ou louer.",
  "local-pro": "Poste de gardiennage / bureau 5,8 m².",
};

type State = {
  project: ProjectId | null;
  extraTravees: number;
  level: Level;
  options: OptionId[];
  base: BaseType;
  financing: Financing;
};

const INITIAL: State = {
  project: null,
  extraTravees: 0,
  level: "M2",
  options: [],
  base: "achat",
  financing: "comptant",
};

function ProjectChoice({ onSelect }: { onSelect: (id: ProjectId) => void }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {PROJECT_ORDER.map((id) => {
        const p = PRICING_V1.projects[id];
        return (
          <button
            key={id}
            type="button"
            onClick={() => onSelect(id)}
            className="lift flex flex-col gap-4 rounded-3xl bg-white p-5 text-left shadow-soft"
          >
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-dew px-3 py-1 text-xs font-semibold text-night">
                {p.baseLevel}
              </span>
              <span className="text-xs font-semibold uppercase tracking-widest text-dawn">
                {p.offer}
              </span>
            </div>
            <PhotoFrame label={`Rendu ${p.offer} — vignette`} ratio="4/3" />
            <div>
              <p className="text-lg font-black tracking-tight text-night">{p.name}</p>
              <p className="mt-1 text-sm text-night/60">{PROJECT_TAGLINE[id]}</p>
            </div>
            <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-night/70">
              <li className="tabular-nums">{p.baseAreaM2} m²</li>
              <li>Pose 1 jour</li>
              <li>{p.baseLevel === "M3" ? "Eau + élec" : "Électricité"}</li>
            </ul>
            <p className="mt-auto text-sm">
              <span className="text-night/50">à partir de </span>
              <span className="font-bold tabular-nums text-night">
                {formatFcfa(p.basePriceFcfa)}
              </span>
            </p>
            <span className="inline-flex h-11 items-center justify-center rounded-full bg-night px-5 text-sm font-semibold text-cream">
              Configurer →
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function Configurator() {
  const [state, setState] = useState<State>(INITIAL);

  const selectProject = (id: ProjectId) => {
    const p = PRICING_V1.projects[id];
    setState({
      project: id,
      extraTravees: 0,
      level: p.baseLevel,
      options: [],
      base: "achat",
      financing: "comptant",
    });
  };

  const computed = useMemo(() => {
    if (!state.project) return null;
    const input: ConfigInput = {
      project: state.project,
      extraTravees: state.extraTravees,
      level: state.level,
      options: state.options,
      base: state.base,
      financing: state.financing,
    };
    return { input, result: computeConfig(input) };
  }, [state]);

  if (!computed) {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-dawn">Étape 1</p>
          <h2 className="mt-1 text-3xl font-black tracking-tight text-night">
            Choisissez votre projet
          </h2>
        </div>
        <ProjectChoice onSelect={selectProject} />
      </div>
    );
  }

  const { input, result } = computed;
  const project = result.project;
  const clamp = (n: number) => Math.max(0, Math.min(n, PRICING_V1.travee.maxExtra));

  return (
    <div className="pb-40 lg:grid lg:grid-cols-5 lg:gap-6 lg:pb-0">
      {/* Zone visuelle (gauche) */}
      <div className="lg:col-span-3 lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-3xl bg-white p-5 shadow-soft sm:p-8">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-dawn">
                {project.offer}
              </p>
              <h2 className="text-2xl font-black tracking-tight text-night">{project.name}</h2>
            </div>
            <button
              type="button"
              onClick={() => setState(INITIAL)}
              className="rounded-full border border-night/15 px-3 py-1.5 text-xs font-medium text-night hover:border-night/30"
            >
              Changer de projet
            </button>
          </div>

          <div className="mt-6 flex items-center justify-center rounded-2xl bg-cream p-4">
            <PlanPreview2D
              project={project.id}
              extraTravees={state.extraTravees}
              className="max-h-[42vh] w-auto"
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-night/70">
            <span className="tabular-nums">
              <span className="font-bold text-night">{result.areaM2} m²</span> au sol
            </span>
            <span>Équipement {result.level}</span>
            <span>{state.base === "achat" ? "Dalle" : "Skid démontable"}</span>
          </div>
        </div>
      </div>

      {/* Panneau de configuration (droite) */}
      <div className="mt-4 flex flex-col gap-4 lg:col-span-2 lg:mt-0">
        <ConfiguratorPanel
          input={input}
          project={project}
          onExtraTravees={(n) => setState((s) => ({ ...s, extraTravees: clamp(n) }))}
          onLevel={(level) => setState((s) => ({ ...s, level }))}
          onToggleOption={(id) =>
            setState((s) => ({
              ...s,
              options: s.options.includes(id)
                ? s.options.filter((o) => o !== id)
                : [...s.options, id],
            }))
          }
          onBase={(base) => setState((s) => ({ ...s, base }))}
          onFinancing={(financing) => setState((s) => ({ ...s, financing }))}
        />
        {/* Total — collant en bas de colonne sur desktop */}
        <div className="hidden lg:sticky lg:bottom-4 lg:block">
          <PriceBar input={input} result={result} />
        </div>
      </div>

      {/* Total — barre fixe mobile */}
      <div className={cn("fixed inset-x-3 bottom-3 z-40 lg:hidden")}>
        <PriceBar input={input} result={result} />
      </div>
    </div>
  );
}
