"use client";

/*
 * WhatsAppFAB — bouton d'action flottant WhatsApp. Apparaît après 600 px de
 * scroll (le canal n°1 reste toujours à portée de pouce), avec un pulse discret
 * toutes les ~8 s. Sans animation si l'utilisateur réduit les mouvements.
 */

import { useState } from "react";
import { AnimatePresence, m, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { cn } from "../lib/cn";

export type WhatsAppFabProps = {
  /** Lien wa.me complet (deep link avec message pré-rempli). */
  href: string;
  /** Libellé accessible du bouton. */
  label?: string;
  /** Seuil d'apparition (px de scroll). */
  threshold?: number;
  className?: string;
};

export function WhatsAppFAB({
  href,
  label = "Discuter sur WhatsApp",
  threshold = 600,
  className,
}: WhatsAppFabProps) {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();

  useMotionValueEvent(scrollY, "change", (v) => {
    setVisible(v > threshold);
  });

  return (
    <AnimatePresence>
      {visible ? (
        <m.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          initial={{ opacity: 0, scale: 0.8, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 8 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-float focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-whatsapp focus-visible:ring-offset-2",
            className,
          )}
        >
          {!reduce ? (
            <m.span
              className="absolute inset-0 rounded-full bg-whatsapp"
              animate={{ scale: [1, 1.35], opacity: [0.5, 0] }}
              transition={{ duration: 1.4, ease: "easeOut", repeat: Infinity, repeatDelay: 6.6 }}
            />
          ) : null}
          <svg viewBox="0 0 24 24" aria-hidden="true" className="relative size-7 fill-current">
            <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.38a9.86 9.86 0 0 0 4.73 1.2h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.64-1.03-5.13-2.9-7A9.82 9.82 0 0 0 12.04 2Zm5.8 14.03c-.24.68-1.4 1.3-1.94 1.35-.5.05-1.13.07-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.8-4.17-4.94-4.36-.15-.19-1.18-1.57-1.18-3s.75-2.13 1.02-2.42c.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.82 2.01.9 2.16.07.15.12.32.02.51-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.03 1.12 1 2.06 1.31 2.35 1.46.29.15.46.12.63-.07.17-.19.73-.85.92-1.14.19-.29.39-.24.66-.15.27.1 1.7.8 1.99.95.29.15.48.22.55.34.07.12.07.68-.17 1.35Z" />
          </svg>
        </m.a>
      ) : null}
    </AnimatePresence>
  );
}
