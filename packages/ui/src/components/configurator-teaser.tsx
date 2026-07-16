"use client";

/*
 * ConfiguratorTeaser — carte home qui donne un aperçu vivant du configurateur.
 * Une façade schématique (respectant la trame 1,20 m : panneaux P1, claustra
 * P2, fenêtre jalousies P3, porte P4) change au fil des presets avec une
 * micro-animation de swap. Cliquer un preset change la façade ; un CTA ouvre le
 * configurateur complet.
 */

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { cn } from "../lib/cn";

export type TeaserPreset = {
  /** Étiquette du preset (ex. « Box Commerce »). */
  label: string;
  /** Nombre de travées de 1,20 m. */
  bays: number;
  /** Type d'ouverture principale. */
  opening?: "vitrine" | "porte" | "sanitaire";
};

export type ConfiguratorTeaserProps = {
  presets: TeaserPreset[];
  /** Cible du CTA (page configurateur). */
  href: string;
  cta?: ReactNode;
  /** Intervalle d'auto-défilement (ms). */
  interval?: number;
  className?: string;
};

export function ConfiguratorTeaser({
  presets,
  href,
  cta = "Ouvrir le configurateur",
  interval = 2800,
  className,
}: ConfiguratorTeaserProps) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || presets.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % presets.length), interval);
    return () => clearInterval(id);
  }, [reduce, presets.length, interval]);

  const current = presets[index] ?? presets[0];
  if (!current) return null;

  return (
    <div
      className={cn(
        "grid gap-6 rounded-[2rem] bg-white p-6 shadow-soft sm:p-8 lg:grid-cols-[1.1fr_1fr] lg:items-center",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-snow">
        <AnimatePresence mode="wait">
          <m.div
            key={index}
            initial={reduce ? false : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: -24 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex items-center justify-center p-6"
          >
            <FacadeGlyph bays={current.bays} opening={current.opening ?? "vitrine"} />
          </m.div>
        </AnimatePresence>
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-night shadow-soft backdrop-blur">
          {current.bays} travée{current.bays > 1 ? "s" : ""} · {(current.bays * 1.2).toLocaleString("fr-FR")} m
        </span>
      </div>

      <div className="flex flex-col gap-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-dawn">
          Aperçu configurateur
        </span>
        <p className="text-lg font-semibold leading-snug text-night">
          Composez votre module, travée par travée — la façade se met à jour en direct.
        </p>
        <div className="flex flex-wrap gap-2">
          {presets.map((preset, i) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => setIndex(i)}
              aria-pressed={i === index}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                i === index
                  ? "border-orange bg-orange text-white"
                  : "border-night/15 text-night/70 hover:border-night/30",
              )}
            >
              {preset.label}
            </button>
          ))}
        </div>
        <a
          href={href}
          className="mt-1 inline-flex h-11 w-fit items-center justify-center gap-2 rounded-full bg-night px-5 text-sm font-semibold text-white transition-[filter] hover:brightness-125 active:scale-[0.98]"
        >
          {cta}
          <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-current">
            <path d="M5 12h12.2l-4.6-4.6L14 6l7 7-7 7-1.4-1.4 4.6-4.6H5z" />
          </svg>
        </a>
      </div>
    </div>
  );
}

/** Façade schématique paramétrée par le nombre de travées et l'ouverture. */
function FacadeGlyph({ bays, opening }: { bays: number; opening: NonNullable<TeaserPreset["opening"]> }) {
  const bayW = 60;
  const gap = 8;
  const padX = 16;
  const w = padX * 2 + bays * bayW + (bays - 1) * gap;
  const h = 190;
  const roofH = 16;
  const top = 8;
  const wallTop = top + roofH + 6;
  const wallH = h - wallTop - 14;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="h-full w-auto"
      role="img"
      aria-label={`Façade ${bays} travées`}
    >
      {/* Toit parasol (débord + bandeau). */}
      <rect x={0} y={top} width={w} height={roofH} rx={4} fill="var(--color-night)" />
      <rect x={padX / 2} y={top + roofH} width={w - padX} height={4} fill="var(--color-orange)" />

      {Array.from({ length: bays }, (_, i) => {
        const x = padX + i * (bayW + gap);
        const isOpeningBay = i === Math.floor(bays / 2);
        return (
          <g key={i}>
            {/* Poteau rainuré. */}
            <rect x={x - gap / 2} y={wallTop} width={3} height={wallH} fill="var(--color-dawn)" />
            {/* Panneau / ouverture. */}
            {isOpeningBay && opening === "porte" ? (
              <rect
                x={x + 8}
                y={wallTop + 18}
                width={bayW - 16}
                height={wallH - 18}
                rx={3}
                fill="var(--color-night)"
                opacity={0.85}
              />
            ) : isOpeningBay && opening === "vitrine" ? (
              <g>
                <rect x={x + 4} y={wallTop + 14} width={bayW - 8} height={wallH - 24} rx={3} fill="var(--color-dew)" />
                <line x1={x + bayW / 2} y1={wallTop + 14} x2={x + bayW / 2} y2={wallTop + wallH - 10} stroke="var(--color-cream)" strokeWidth={2} />
              </g>
            ) : (
              <rect x={x + 4} y={wallTop + 10} width={bayW - 8} height={wallH - 14} rx={3} fill="var(--color-sand)" />
            )}
            {/* Claustra haut (ventilation P2). */}
            <g stroke="var(--color-dawn)" strokeWidth={2} opacity={0.6}>
              <line x1={x + 8} y1={wallTop + 4} x2={x + 8} y2={wallTop + 10} />
              <line x1={x + bayW / 2} y1={wallTop + 4} x2={x + bayW / 2} y2={wallTop + 10} />
              <line x1={x + bayW - 8} y1={wallTop + 4} x2={x + bayW - 8} y2={wallTop + 10} />
            </g>
          </g>
        );
      })}

      {/* Soubassement surélevé. */}
      <rect x={4} y={h - 12} width={w - 8} height={6} rx={3} fill="var(--color-night)" opacity={0.7} />
    </svg>
  );
}
