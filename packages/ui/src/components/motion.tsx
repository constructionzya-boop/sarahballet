"use client";

/*
 * Primitives d'animation du design system Noéma.
 *
 * Règles globales (mission SITE-002 §5) :
 * - LazyMotion + domAnimation (strict) : on ne charge que le sous-ensemble DOM
 *   de Framer Motion et on n'utilise que les composants `m.*` (pas `motion.*`).
 * - Reveal on scroll par défaut : fade + translateY 24 px, 0,5 s, stagger 80 ms,
 *   `once: true` (jamais de re-trigger).
 * - Uniquement `transform` et `opacity` (GPU).
 * - `prefers-reduced-motion` : MotionConfig `reducedMotion="user"` neutralise les
 *   transforms → tout se réduit à un fade simple (les composants coupent aussi le
 *   translateY manuellement quand la préférence est active).
 */

import type { ComponentProps, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import {
  LazyMotion,
  domAnimation,
  MotionConfig,
  m,
  animate,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { cn } from "../lib/cn";

/** Courbe d'accélération maison (ease-out doux) partagée par tous les reveals. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

/**
 * Fournit le contexte Framer Motion à toute l'app. À poser une seule fois,
 * au plus haut (layout racine). `reducedMotion="user"` respecte la préférence
 * système sans code supplémentaire dans chaque composant.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}

export type RevealProps = {
  children: ReactNode;
  /** Balise rendue (div par défaut). */
  as?: "div" | "section" | "li" | "span" | "article" | "header" | "figure";
  /** Décalage vertical initial en px (0 = fade seul). */
  y?: number;
  /** Retard avant l'apparition (s). */
  delay?: number;
  className?: string;
};

/** Enveloppe un bloc pour le faire apparaître au scroll (fade + montée douce). */
export function Reveal({ children, as = "div", y = 24, delay = 0, className }: RevealProps) {
  const reduce = useReducedMotion();
  const MTag = m[as] as typeof m.div;
  return (
    <MTag
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.5, ease: EASE_OUT, delay }}
    >
      {children}
    </MTag>
  );
}

/**
 * Conteneur qui orchestre l'apparition en cascade de ses <RevealItem> enfants.
 * Le `stagger` est le délai (s) entre chaque enfant.
 */
export function RevealGroup({
  children,
  as = "div",
  stagger = 0.08,
  className,
}: {
  children: ReactNode;
  as?: "div" | "section" | "ul" | "ol";
  stagger?: number;
  className?: string;
}) {
  const MTag = m[as] as typeof m.div;
  return (
    <MTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </MTag>
  );
}

/** Enfant d'un <RevealGroup>. Hérite du timing du parent. */
export function RevealItem({
  children,
  as = "div",
  y = 24,
  className,
}: {
  children: ReactNode;
  as?: "div" | "li" | "article" | "figure";
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const MTag = m[as] as typeof m.div;
  return (
    <MTag
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduce ? 0 : y },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
      }}
    >
      {children}
    </MTag>
  );
}

export type AnimatedNumberProps = {
  /** Valeur cible (nombre). */
  value: number;
  /** Durée du comptage (s). */
  duration?: number;
  /** Formatage de la valeur courante (ex. séparateurs de milliers). */
  format?: (n: number) => string;
  className?: string;
};

/**
 * Compteur qui s'anime de 0 à `value` quand il entre dans le viewport
 * (une seule fois). Sans animation si `prefers-reduced-motion`.
 */
export function AnimatedNumber({ value, duration = 1.2, format, className }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, VIEWPORT);
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: EASE_OUT,
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value, duration, reduce]);

  const fmt = format ?? ((n: number) => Math.round(n).toLocaleString("fr-FR"));
  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {fmt(display)}
    </span>
  );
}

/** Réexport pratique de `m` pour les composants du design system. */
export { m };
export type MDivProps = ComponentProps<typeof m.div>;
