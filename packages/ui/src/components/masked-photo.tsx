"use client";

/*
 * MaskedPhoto — une photo (ou un placeholder) découpée par un masque SVG
 * organique, avec un léger parallax interne au scroll (l'image glisse d'environ
 * 8 % dans son masque). Les masques sont des <clipPath> en unités
 * `objectBoundingBox` (0→1), donc réutilisables à n'importe quelle taille et
 * compatibles avec le mode placeholder (aucune image pré-découpée).
 */

import { useId, useRef } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "../lib/cn";

export type MaskVariant = "diagonal" | "lobes" | "corner" | "wave-edge" | "none";

/** Tracés normalisés (objectBoundingBox) — 1 masque fort maximum par section. */
const PATHS: Record<Exclude<MaskVariant, "none">, string> = {
  // Fente en X : deux bandes diagonales arrondies mordent les côtés.
  diagonal:
    "M0.10,0 L1,0 L1,0.90 C0.70,0.99 0.62,0.80 0.34,0.92 C0.14,1 0.06,0.86 0,0.72 L0,0.10 C0.03,0.03 0.05,0.02 0.10,0 Z",
  // Quatre lobes : bord supérieur festonné en arches (effet colonnes).
  lobes:
    "M0,0.12 C0.06,0 0.19,0 0.25,0.12 C0.31,0.24 0.44,0.24 0.50,0.12 C0.56,0 0.69,0 0.75,0.12 C0.81,0.24 0.94,0.24 1,0.12 L1,1 L0,1 Z",
  // Un seul angle (haut-gauche) mangé par une grande courbe douce.
  corner: "M0.34,0 L1,0 L1,1 L0,1 L0,0.34 C0,0.14 0.14,0 0.34,0 Z",
  // Bord latéral droit ondulé, organique.
  "wave-edge":
    "M0,0 L0.88,0 C1,0.16 0.80,0.34 0.92,0.50 C1,0.66 0.82,0.86 0.90,1 L0,1 Z",
};

export type MaskedPhotoProps = {
  /** Légende accessible (et texte du placeholder). */
  label: string;
  /** Chemin public de l'image. Absent = placeholder discret. */
  src?: string;
  variant?: MaskVariant;
  /** Ratio de la boîte (Tailwind aspect). */
  ratio?: "16/9" | "4/3" | "1/1" | "3/4";
  /** Désactive le parallax interne. */
  parallax?: boolean;
  priority?: boolean;
  className?: string;
};

const RATIO: Record<NonNullable<MaskedPhotoProps["ratio"]>, string> = {
  "16/9": "aspect-video",
  "4/3": "aspect-[4/3]",
  "1/1": "aspect-square",
  "3/4": "aspect-[3/4]",
};

export function MaskedPhoto({
  label,
  src,
  variant = "corner",
  ratio = "4/3",
  parallax = true,
  priority = false,
  className,
}: MaskedPhotoProps) {
  const id = useId().replace(/[:]/g, "");
  const clipId = `mask-${id}`;
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const y = parallax && !reduce ? rawY : undefined;

  const clipStyle = variant === "none" ? undefined : { clipPath: `url(#${clipId})` };

  return (
    <div ref={ref} className={cn("relative overflow-hidden", RATIO[ratio], className)}>
      {variant !== "none" ? (
        <svg aria-hidden="true" className="absolute size-0">
          <defs>
            <clipPath id={clipId} clipPathUnits="objectBoundingBox">
              <path d={PATHS[variant]} />
            </clipPath>
          </defs>
        </svg>
      ) : null}

      <div className="absolute inset-0" style={clipStyle}>
        {src ? (
          <m.img
            src={src}
            alt={label}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className="h-[112%] w-full origin-center object-cover"
            style={{ y }}
          />
        ) : (
          <div
            role="img"
            aria-label={label}
            className="flex h-full w-full flex-col items-center justify-center gap-3 bg-snow p-6 text-center"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="size-8 text-dawn/50">
              <path
                fill="currentColor"
                d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm1 2v7.6l3.3-3.3 3 3 4-4L19 15V7H5Zm3.5 1.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
              />
            </svg>
            <span className="max-w-[80%] text-[11px] font-medium uppercase tracking-widest text-dawn/70">
              {label}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
