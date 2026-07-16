"use client";

/*
 * TimelinePose — frise horizontale « la pose en 1 jour », heure par heure. Une
 * ligne de progression se remplit au fur et à mesure que la section défile
 * (scaleX piloté par le scroll). Sur mobile, la frise défile horizontalement.
 */

import { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import { cn } from "../lib/cn";

export type PoseStep = {
  /** Heure ou jalon, ex. « 8h ». */
  time: string;
  /** Ce qui se passe à cette heure. */
  label: string;
};

export function TimelinePose({
  steps,
  className,
}: {
  steps: PoseStep[];
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 55%"],
  });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className={cn("overflow-x-auto pb-2", className)}>
      <div className="relative min-w-[640px]">
        {/* Rail + progression. */}
        <div className="absolute left-0 right-0 top-4 h-1 rounded-full bg-night/10">
          <m.div
            style={{ scaleX }}
            className="h-full origin-left rounded-full bg-orange"
          />
        </div>

        <ol className="relative flex justify-between gap-4">
          {steps.map((step, i) => (
            <li key={i} className="flex w-32 flex-col items-center text-center">
              <span className="relative z-10 flex size-9 items-center justify-center rounded-full border-2 border-orange bg-cream text-xs font-bold text-night">
                {i + 1}
              </span>
              <span className="mt-3 text-sm font-semibold text-night">{step.time}</span>
              <span className="mt-1 text-xs leading-snug text-night/55">{step.label}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
