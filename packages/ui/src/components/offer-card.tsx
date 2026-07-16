"use client";

/*
 * OfferCard — carte catalogue « photo pleine image ». Bandeau overlay en bas
 * (nom + « à partir de X »). Au survol : zoom photo 1,05 et l'overlay se
 * soulève de quelques px. Cliquable en entier (le titre porte le lien).
 */

import type { ReactNode } from "react";
import { m } from "framer-motion";
import { cn } from "../lib/cn";

export type OfferCardProps = {
  name: string;
  /** Ligne de prix, ex. « à partir de 3 200 000 F ». */
  price: ReactNode;
  /** Badge en haut à gauche (niveau M1/M2/M3, surface…). */
  badge?: ReactNode;
  href: string;
  imageSrc?: string;
  imageLabel: string;
  className?: string;
};

export function OfferCard({
  name,
  price,
  badge,
  href,
  imageSrc,
  imageLabel,
  className,
}: OfferCardProps) {
  return (
    <m.a
      href={href}
      initial="rest"
      whileHover="hover"
      whileFocus="hover"
      animate="rest"
      className={cn(
        "group relative block aspect-[3/4] overflow-hidden rounded-[1.75rem] bg-snow shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2",
        className,
      )}
    >
      {imageSrc ? (
        <m.img
          src={imageSrc}
          alt={imageLabel}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 size-full object-cover"
          variants={{ rest: { scale: 1 }, hover: { scale: 1.05 } }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      ) : (
        <div
          role="img"
          aria-label={imageLabel}
          className="absolute inset-0 flex items-center justify-center bg-snow p-6 text-center"
        >
          <span className="max-w-[80%] text-[11px] font-medium uppercase tracking-widest text-dawn/70">
            {imageLabel}
          </span>
        </div>
      )}

      {/* Voile de lisibilité de l'overlay. */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-night/85 via-night/30 to-transparent" />

      {badge ? (
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-night backdrop-blur">
          {badge}
        </span>
      ) : null}

      <m.div
        variants={{ rest: { y: 0 }, hover: { y: -4 } }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5"
      >
        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-white">{name}</h3>
          <p className="mt-0.5 text-sm text-white/80">{price}</p>
        </div>
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-orange text-white">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-current">
            <path d="M5 12h12.2l-4.6-4.6L14 6l7 7-7 7-1.4-1.4 4.6-4.6H5z" />
          </svg>
        </span>
      </m.div>
    </m.a>
  );
}
