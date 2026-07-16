"use client";

/*
 * StatCard — tuile de statistique de la DA « vitrine ». Pastille ronde en haut
 * (photo ou icône), GROS chiffre animé au scroll (0 → valeur), légende grise
 * sur 2 lignes. Le chiffre est un élément décoratif majeur de la maquette.
 */

import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { AnimatedNumber } from "./motion";

export type StatCardProps = {
  /** Valeur numérique animée. */
  value: number;
  /** Préfixe collé au chiffre (ex. « + » ). */
  prefix?: string;
  /** Suffixe collé au chiffre (ex. « mm », « m² », « + »). */
  suffix?: string;
  /** Légende sous le chiffre (2 lignes max). */
  label: ReactNode;
  /** Formatage du nombre (défaut : entier fr-FR). */
  format?: (n: number) => string;
  /** Image de la pastille ronde. Absente = pastille d'accent unie. */
  imageSrc?: string;
  /** Contenu de la pastille si pas d'image (ex. une icône). */
  pastille?: ReactNode;
  className?: string;
};

export function StatCard({
  value,
  prefix,
  suffix,
  label,
  format,
  imageSrc,
  pastille,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-[2rem] bg-white p-6 shadow-soft sm:p-7",
        className,
      )}
    >
      <span className="flex size-12 items-center justify-center overflow-hidden rounded-full bg-dew text-night">
        {imageSrc ? (
          <img src={imageSrc} alt="" className="size-full object-cover" />
        ) : (
          (pastille ?? <span className="size-2.5 rounded-full bg-orange" />)
        )}
      </span>

      <p className="text-4xl font-semibold tracking-tight text-night sm:text-5xl">
        {prefix}
        <AnimatedNumber value={value} format={format} />
        {suffix}
      </p>

      <p className="text-sm leading-snug text-night/55">{label}</p>
    </div>
  );
}
