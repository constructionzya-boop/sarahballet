"use client";

/*
 * FeatureCardDark — carte sombre (fond Night) de la colonne « technologie » :
 * vignette photo arrondie à gauche, titre blanc + 2 lignes grises. Au survol,
 * légère élévation (lift 4 px + ombre). Réduit à l'immobilité si l'utilisateur
 * a désactivé les animations (via MotionConfig).
 */

import type { ReactNode } from "react";
import { m } from "framer-motion";
import { cn } from "../lib/cn";

export type FeatureCardDarkProps = {
  title: ReactNode;
  children: ReactNode;
  /** Vignette photo (placeholder si absente). */
  imageSrc?: string;
  imageLabel?: string;
  className?: string;
};

export function FeatureCardDark({
  title,
  children,
  imageSrc,
  imageLabel,
  className,
}: FeatureCardDarkProps) {
  return (
    <m.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "flex items-center gap-4 rounded-[1.25rem] bg-night p-4 text-cream shadow-soft transition-shadow hover:shadow-float sm:gap-5 sm:p-5",
        className,
      )}
    >
      <span className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white/10 sm:size-20">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={imageLabel ?? ""}
            loading="lazy"
            className="size-full object-cover"
          />
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true" className="size-7 text-dew/60">
            <path
              fill="currentColor"
              d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm1 2v7.6l3.3-3.3 3 3 4-4L19 15V7H5Z"
            />
          </svg>
        )}
      </span>
      <div className="min-w-0">
        <h3 className="text-base font-semibold text-white sm:text-lg">{title}</h3>
        <p className="mt-1 text-sm leading-snug text-cream/60">{children}</p>
      </div>
    </m.article>
  );
}
