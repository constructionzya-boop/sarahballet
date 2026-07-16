"use client";

/*
 * TestimonialCard — carte de témoignage : avatar (photo ou initiale), note en
 * étoiles, citation, nom + rôle. Légère élévation au survol.
 */

import type { ReactNode } from "react";
import { m } from "framer-motion";
import { cn } from "../lib/cn";

export type TestimonialCardProps = {
  quote: ReactNode;
  author: string;
  /** Rôle / métier de l'auteur (nommé `authorRole` pour ne pas heurter la
   *  règle a11y qui inspecte tout attribut nommé `role`). */
  authorRole?: string;
  /** Note sur 5 (arrondie à l'entier pour l'affichage étoiles). */
  rating?: number;
  avatarSrc?: string;
  className?: string;
};

export function TestimonialCard({
  quote,
  author,
  authorRole,
  rating = 5,
  avatarSrc,
  className,
}: TestimonialCardProps) {
  const stars = Math.max(0, Math.min(5, Math.round(rating)));

  return (
    <m.figure
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "flex h-full flex-col gap-4 rounded-[1.75rem] bg-white p-6 shadow-soft transition-shadow hover:shadow-soft-lg sm:p-7",
        className,
      )}
    >
      <div className="flex gap-0.5" aria-label={`Note ${stars} sur 5`}>
        {Array.from({ length: 5 }, (_, i) => (
          <svg
            key={i}
            viewBox="0 0 24 24"
            aria-hidden="true"
            className={cn("size-4", i < stars ? "fill-orange" : "fill-night/15")}
          >
            <path d="m12 2 3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01Z" />
          </svg>
        ))}
      </div>

      <blockquote className="flex-1 text-[15px] leading-relaxed text-night/80">{quote}</blockquote>

      <figcaption className="flex items-center gap-3">
        <span className="flex size-11 items-center justify-center overflow-hidden rounded-full bg-dew text-sm font-bold text-night">
          {avatarSrc ? (
            <img src={avatarSrc} alt="" className="size-full object-cover" />
          ) : (
            author.trim().charAt(0).toUpperCase()
          )}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold text-night">{author}</span>
          {authorRole ? (
            <span className="block truncate text-xs text-night/50">{authorRole}</span>
          ) : null}
        </span>
      </figcaption>
    </m.figure>
  );
}
