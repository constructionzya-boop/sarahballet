/*
 * Marquee — défilement horizontal infini (villes desservies, composants P1-P9…).
 * Animation 100 % CSS (translateX, GPU) : le contenu est dupliqué et la piste
 * translate de -50 %, ce qui donne une boucle sans couture. Coupé si
 * l'utilisateur a désactivé les animations (voir .marquee-track dans theme.css).
 */

import type { CSSProperties, ReactNode } from "react";
import { cn } from "../lib/cn";

export type MarqueeProps = {
  items: ReactNode[];
  /** Durée d'un cycle complet (s). Plus grand = plus lent. */
  duration?: number;
  /** Sépare chaque item par un point. */
  dot?: boolean;
  className?: string;
};

export function Marquee({ items, duration = 34, dot = true, className }: MarqueeProps) {
  const style = { "--marquee-duration": `${duration}s` } as CSSProperties;

  return (
    <div
      className={cn(
        "group relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]",
        className,
      )}
      style={style}
    >
      {[0, 1].map((copy) => (
        <ul
          key={copy}
          aria-hidden={copy === 1}
          className="marquee-track flex shrink-0 items-center gap-8 pr-8"
        >
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-8 whitespace-nowrap">
              <span className="text-sm font-medium text-night/70">{item}</span>
              {dot ? <span className="size-1.5 rounded-full bg-orange/60" /> : null}
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
