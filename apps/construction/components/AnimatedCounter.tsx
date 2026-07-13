"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Compteur animé au défilement (count-up). Respecte prefers-reduced-motion
 * (affiche directement la valeur finale).
 */
export function AnimatedCounter({
  value,
  durationMs = 1200,
  decimals = 0,
  format,
  className,
}: {
  value: number;
  durationMs?: number;
  /** Décimales conservées pendant l'animation (ex. 1 pour 38,4). */
  decimals?: number;
  format?: (n: number) => string;
  className?: string;
}) {
  const fmt =
    format ?? ((n: number) => n.toLocaleString("fr-FR", { maximumFractionDigits: decimals }));
  const factor = Math.pow(10, decimals);
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // La valeur (ou la durée) a changé : on ré-arme l'animation, sinon `run()`
    // sortirait immédiatement et le compteur resterait figé sur l'ancienne valeur.
    started.current = false;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(value);
      return;
    }

    const run = () => {
      if (started.current) return;
      started.current = true;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / durationMs);
        // easeOutCubic
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay(Math.round(value * eased * factor) / factor);
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) run();
        });
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, durationMs, factor]);

  return (
    <span ref={ref} className={className}>
      {fmt(display)}
    </span>
  );
}
