"use client";

/*
 * PaymentCard — carte d'un mode de paiement, déclinée claire ou sombre (grille
 * alternée). Titre + paragraphe court + flèche ronde en bas à droite qui pivote
 * de -45° à 0° au survol.
 */

import type { ReactNode } from "react";
import { m } from "framer-motion";
import { cn } from "../lib/cn";

export type PaymentCardProps = {
  title: ReactNode;
  children: ReactNode;
  tone?: "light" | "dark";
  href?: string;
  eyebrow?: ReactNode;
  className?: string;
};

export function PaymentCard({
  title,
  children,
  tone = "light",
  href,
  eyebrow,
  className,
}: PaymentCardProps) {
  const dark = tone === "dark";
  const Tag = (href ? m.a : m.div) as typeof m.a;

  return (
    <Tag
      href={href}
      initial="rest"
      whileHover="hover"
      whileFocus="hover"
      animate="rest"
      className={cn(
        "group relative flex min-h-44 flex-col gap-2 rounded-[1.5rem] p-6 shadow-soft transition-shadow hover:shadow-soft-lg sm:p-7",
        dark ? "bg-night text-cream" : "bg-white text-night",
        href &&
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2",
        className,
      )}
    >
      {eyebrow ? (
        <span
          className={cn(
            "text-xs font-semibold uppercase tracking-widest",
            dark ? "text-dew" : "text-dawn",
          )}
        >
          {eyebrow}
        </span>
      ) : null}
      <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
      <p className={cn("max-w-[34ch] text-sm leading-snug", dark ? "text-cream/65" : "text-night/60")}>
        {children}
      </p>

      <m.span
        variants={{ rest: { rotate: -45 }, hover: { rotate: 0 } }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "absolute bottom-5 right-5 flex size-10 items-center justify-center rounded-full",
          dark ? "bg-white/10 text-white" : "bg-night text-white",
        )}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-current">
          <path d="M5 12h12.2l-4.6-4.6L14 6l7 7-7 7-1.4-1.4 4.6-4.6H5z" />
        </svg>
      </m.span>
    </Tag>
  );
}
