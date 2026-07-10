import type { ReactNode } from "react";
import { cn } from "@noema/ui";
import type { ConfigInput, Level, OptionId, ProjectDef } from "../lib/pricing";
import { levelDelta, PRICING_V1, formatFcfa } from "../lib/pricing";

const LEVEL_DESC: Record<Level, string> = {
  M1: "Structure seule, sans réseaux.",
  M2: "Tableau pré-câblé, prises, éclairage, attentes.",
  M3: "M2 + arrivée d'eau, évacuation, cellule sanitaire.",
};

const BASE_DESC = {
  achat: "Dalle coulée définitive — vous êtes propriétaire.",
  location: "Skid démontable boulonné — module récupérable.",
} as const;

const FINANCINGS = [
  { id: "comptant", label: "Achat comptant" },
  { id: "location", label: "Location" },
  { id: "accession", label: "Location-accession" },
  { id: "diaspora", label: "Diaspora (3 jalons)" },
] as const;

export type ConfiguratorPanelProps = {
  input: ConfigInput;
  project: ProjectDef;
  onExtraTravees: (n: number) => void;
  onLevel: (l: Level) => void;
  onToggleOption: (id: OptionId) => void;
  onBase: (b: "achat" | "location") => void;
  onFinancing: (f: ConfigInput["financing"]) => void;
};

function Legend({ children }: { children: string }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-widest text-dawn">{children}</p>
  );
}

function Accordion({
  title,
  hint,
  defaultOpen,
  children,
}: {
  title: string;
  hint?: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  return (
    <details open={defaultOpen} className="group rounded-3xl bg-white p-5 shadow-soft">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
        <span className="text-base font-bold text-night">{title}</span>
        <span className="flex items-center gap-2">
          {hint ? <span className="text-xs text-night/50">{hint}</span> : null}
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="size-5 fill-dawn transition-transform group-open:rotate-180"
          >
            <path d="m12 15-5-5 1.4-1.4L12 12.2l3.6-3.6L17 10Z" />
          </svg>
        </span>
      </summary>
      <div className="mt-4">{children}</div>
    </details>
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "min-h-11 rounded-full border px-4 py-2 text-sm font-medium transition-colors active:scale-95",
        active
          ? "border-orange bg-orange text-white"
          : "border-night/15 bg-white text-night hover:border-night/30",
      )}
    >
      {children}
    </button>
  );
}

export function ConfiguratorPanel({
  input,
  project,
  onExtraTravees,
  onLevel,
  onToggleOption,
  onBase,
  onFinancing,
}: ConfiguratorPanelProps) {
  const options = PRICING_V1.options.filter(
    (o) => !o.onlyProjects || o.onlyProjects.includes(project.id),
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Règle absolue */}
      <div className="rounded-3xl bg-dew/50 p-4 text-sm text-night">
        <span className="font-semibold">Standard Noéma :</span> tout est construit sur une trame de
        1,20 m — zéro coupe, qualité usine garantie.
      </div>

      {/* 1 · Taille */}
      <Accordion title="Taille" hint={`${project.baseAreaM2} m² base`} defaultOpen>
        {project.allowTravees ? (
          <div className="flex flex-col gap-3">
            <Legend>Profondeur (travées de 1,20 m)</Legend>
            <div className="flex items-center gap-4">
              <button
                type="button"
                aria-label="Retirer une travée"
                onClick={() => onExtraTravees(input.extraTravees - 1)}
                disabled={input.extraTravees <= 0}
                className="flex size-11 items-center justify-center rounded-full border border-night/15 text-xl font-bold text-night disabled:opacity-30"
              >
                −
              </button>
              <span className="min-w-16 text-center text-sm text-night/70">
                +{input.extraTravees} travée{input.extraTravees > 1 ? "s" : ""}
              </span>
              <button
                type="button"
                aria-label="Ajouter une travée"
                onClick={() => onExtraTravees(input.extraTravees + 1)}
                disabled={input.extraTravees >= PRICING_V1.travee.maxExtra}
                className="flex size-11 items-center justify-center rounded-full border border-night/15 text-xl font-bold text-night disabled:opacity-30"
              >
                +
              </button>
              <span className="ml-auto text-xs text-night/50">
                +{formatFcfa(PRICING_V1.travee.priceFcfa)} / travée
              </span>
            </div>
          </div>
        ) : (
          <p className="text-sm text-night/60">
            Taille fixe pour ce modèle ({project.baseAreaM2} m²).
          </p>
        )}
      </Accordion>

      {/* 2 · Équipement */}
      <Accordion title="Équipement" hint={input.level}>
        <div className="flex flex-col gap-2">
          {project.levels.map((lvl) => {
            const delta = levelDelta(project, lvl);
            const active = input.level === lvl;
            return (
              <button
                key={lvl}
                type="button"
                onClick={() => onLevel(lvl)}
                aria-pressed={active}
                className={cn(
                  "flex items-start justify-between gap-3 rounded-2xl border p-3 text-left transition-colors",
                  active ? "border-orange bg-orange/5" : "border-night/10 hover:border-night/25",
                )}
              >
                <span>
                  <span className="text-sm font-bold text-night">{lvl}</span>
                  <span className="ml-2 text-xs text-night/60">{LEVEL_DESC[lvl]}</span>
                </span>
                <span className="shrink-0 text-xs font-semibold text-dawn">
                  {delta === 0 ? "inclus" : delta > 0 ? `+${formatFcfa(delta)}` : formatFcfa(delta)}
                </span>
              </button>
            );
          })}
        </div>
      </Accordion>

      {/* 3 · Options */}
      <Accordion title="Options" hint={`${input.options.length} choisie(s)`}>
        <div className="flex flex-col gap-2">
          {options.map((opt) => {
            const checked = input.options.includes(opt.id);
            const disabled = Boolean(opt.phase2);
            return (
              <label
                key={opt.id}
                className={cn(
                  "flex items-center gap-3 rounded-2xl border p-3",
                  disabled ? "border-night/10 opacity-60" : "border-night/10",
                )}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  disabled={disabled}
                  onChange={() => onToggleOption(opt.id)}
                  className="size-5 accent-orange"
                />
                <span className="flex-1 text-sm text-night">{opt.label}</span>
                {disabled ? (
                  <span className="rounded-full bg-night/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-night/60">
                    Phase 2
                  </span>
                ) : (
                  <span className="text-xs font-semibold text-dawn">
                    +{formatFcfa(opt.priceFcfa)}
                  </span>
                )}
              </label>
            );
          })}
        </div>
      </Accordion>

      {/* 4 · Assise */}
      <Accordion title="Assise" hint={input.base === "achat" ? "Dalle" : "Skid"}>
        <div className="flex flex-col gap-2">
          {(["achat", "location"] as const).map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => onBase(b)}
              aria-pressed={input.base === b}
              className={cn(
                "flex flex-col items-start rounded-2xl border p-3 text-left transition-colors",
                input.base === b
                  ? "border-orange bg-orange/5"
                  : "border-night/10 hover:border-night/25",
              )}
            >
              <span className="text-sm font-bold text-night">
                {b === "achat" ? "Achat — dalle définitive" : "Location — skid démontable"}
              </span>
              <span className="text-xs text-night/60">{BASE_DESC[b]}</span>
            </button>
          ))}
        </div>
      </Accordion>

      {/* 5 · Financement */}
      <Accordion title="Financement" hint="4 formules">
        <div className="flex flex-wrap gap-2">
          {FINANCINGS.map((f) => (
            <Pill key={f.id} active={input.financing === f.id} onClick={() => onFinancing(f.id)}>
              {f.label}
            </Pill>
          ))}
        </div>
        <p className="mt-3 text-xs text-night/50">
          Le mode de paiement change l&apos;affichage du total (loyer, acompte, jalons €).
        </p>
      </Accordion>
    </div>
  );
}
