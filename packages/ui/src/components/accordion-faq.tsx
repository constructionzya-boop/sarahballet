"use client";

/*
 * AccordionFAQ — liste de questions/réponses. Le panneau s'ouvre par animation
 * de hauteur (auto) et le chevron pivote. Chaque item est indépendant.
 * Accessibilité : bouton natif, aria-expanded, région liée par aria-controls.
 */

import { useId, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { cn } from "../lib/cn";

export type FaqItem = { q: string; a: string };

export function AccordionFAQ({ items, className }: { items: FaqItem[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const baseId = useId().replace(/[:]/g, "");
  const reduce = useReducedMotion();
  const dur = reduce ? 0 : 0.3;

  return (
    <div className={cn("divide-y divide-night/10", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const btnId = `${baseId}-btn-${i}`;
        return (
          <div key={i}>
            <h3>
              <button
                type="button"
                id={btnId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-4 text-left text-base font-semibold text-night"
              >
                {item.q}
                <m.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: dur, ease: [0.22, 1, 0.36, 1] }}
                  className="flex size-7 shrink-0 items-center justify-center rounded-full bg-night/5 text-dawn"
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 24 24" className="size-4 fill-current">
                    <path d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6z" />
                  </svg>
                </m.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <m.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: dur, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-4 text-sm leading-relaxed text-night/65">{item.a}</p>
                </m.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
