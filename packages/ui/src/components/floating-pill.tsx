"use client";

/*
 * FloatingPill — badge « flottant » posé sur une photo (hero, vignette).
 * Apparition décalée (delay) et léger flottement vertical en boucle. Sert à
 * poser 1-2 informations fortes par-dessus une grande carte photo.
 */

import type { ReactNode } from "react";
import { m, useReducedMotion } from "framer-motion";
import { cn } from "../lib/cn";

export type FloatingPillProps = {
  children: ReactNode;
  /** Retard d'apparition (s), pour décaler plusieurs pills. */
  delay?: number;
  /** Icône/point à gauche du texte. */
  icon?: ReactNode;
  tone?: "light" | "dark" | "accent";
  className?: string;
};

export function FloatingPill({
  children,
  delay = 0,
  icon,
  tone = "light",
  className,
}: FloatingPillProps) {
  const reduce = useReducedMotion();
  const tones = {
    light: "bg-white/90 text-night backdrop-blur",
    dark: "bg-night/85 text-cream backdrop-blur",
    accent: "bg-orange text-white",
  };

  return (
    <m.span
      initial={{ opacity: 0, y: reduce ? 0 : 10, scale: reduce ? 1 : 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold shadow-soft",
        tones[tone],
        className,
      )}
    >
      {reduce ? (
        <span className="contents">{iconAndLabel(icon, children)}</span>
      ) : (
        <m.span
          className="contents"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, delay }}
        >
          {iconAndLabel(icon, children)}
        </m.span>
      )}
    </m.span>
  );
}

function iconAndLabel(icon: ReactNode, children: ReactNode) {
  return (
    <>
      {icon ? <span className="flex shrink-0 items-center">{icon}</span> : null}
      <span>{children}</span>
    </>
  );
}
