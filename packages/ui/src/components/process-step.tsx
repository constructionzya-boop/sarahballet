"use client";

/*
 * ProcessStep — une étape du parcours « Trois pas vers votre nouveau local ».
 * Numéro GÉANT en outline (contour seul) qui « se dessine » au scroll via
 * l'animation de strokeDashoffset. Titre + paragraphe dessous.
 */

import type { ReactNode } from "react";
import { m, useReducedMotion } from "framer-motion";

export type ProcessStepProps = {
  /** Numéro affiché en contour géant (1, 2, 3…). */
  n: number;
  title: ReactNode;
  children: ReactNode;
  className?: string;
};

const DASH = 520;

export function ProcessStep({ n, title, children, className }: ProcessStepProps) {
  const reduce = useReducedMotion();

  return (
    <div className={className}>
      <svg
        viewBox="0 0 120 150"
        className="h-28 w-auto sm:h-36"
        aria-hidden="true"
        role="presentation"
      >
        <m.text
          x="50%"
          y="118"
          textAnchor="middle"
          className="fill-none font-sans text-[150px] font-semibold"
          stroke="var(--color-orange)"
          strokeWidth={2}
          style={{ strokeDasharray: DASH }}
          initial={{ strokeDashoffset: reduce ? 0 : DASH, opacity: reduce ? 1 : 0.2 }}
          whileInView={{ strokeDashoffset: 0, opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {n}
        </m.text>
      </svg>

      <h3 className="mt-3 text-xl font-semibold tracking-tight text-night">{title}</h3>
      <p className="mt-2 max-w-[36ch] text-sm leading-relaxed text-night/60">{children}</p>
    </div>
  );
}
