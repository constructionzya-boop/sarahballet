"use client";

/*
 * StickyNav — barre de navigation en pill qui « se détache » au scroll : au
 * repos elle est pleine (fond Night) ; dès que la page défile, elle se compacte
 * en pill glassmorphism (fond translucide + backdrop-blur + ombre flottante).
 * Générique : le logo, les liens et les actions (CTA) sont injectés par l'app,
 * qui peut fournir son propre composant de lien (next/link) via `renderLink`.
 */

import type { ReactNode } from "react";
import { useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { cn } from "../lib/cn";

export type NavLink = { href: string; label: string };

export type StickyNavProps = {
  /** Logo cliquable (souvent un <Link href="/">). */
  brand: ReactNode;
  links: NavLink[];
  /** Actions à droite (ex. CTA WhatsApp) — visibles desktop + menu mobile. */
  actions?: ReactNode;
  /** Rendu d'un lien (défaut : <a>). Permet d'injecter next/link. */
  renderLink?: (link: NavLink, className: string, onClick?: () => void) => ReactNode;
  className?: string;
};

const defaultRenderLink = (link: NavLink, className: string, onClick?: () => void) => (
  <a href={link.href} className={className} onClick={onClick}>
    {link.label}
  </a>
);

export function StickyNav({
  brand,
  links,
  actions,
  renderLink = defaultRenderLink,
  className,
}: StickyNavProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 12);
  });

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <nav
        className={cn(
          "mx-auto flex items-center justify-between gap-3 rounded-full transition-all duration-300",
          scrolled
            ? "max-w-4xl border border-white/10 bg-night/70 px-3 py-1.5 shadow-float backdrop-blur-xl sm:px-4"
            : "max-w-6xl bg-night px-3 py-2 shadow-soft sm:px-4",
          className,
        )}
      >
        <div className="pl-1">{brand}</div>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              {renderLink(
                link,
                "rounded-full px-3 py-1.5 text-sm font-medium text-cream/80 transition-colors hover:bg-white/10 hover:text-cream",
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {actions ? <span className="hidden sm:inline-flex">{actions}</span> : null}
          <button
            type="button"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex size-10 items-center justify-center rounded-full text-cream transition-colors hover:bg-white/10 md:hidden"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 fill-current">
              {open ? (
                <path d="M6.4 5 5 6.4l5.6 5.6L5 17.6 6.4 19l5.6-5.6 5.6 5.6 1.4-1.4-5.6-5.6L19 6.4 17.6 5 12 10.6Z" />
              ) : (
                <path d="M3 6h18v2H3V6Zm0 5h18v2H3v-2Zm0 5h18v2H3v-2Z" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Menu mobile déroulant. */}
      <div
        className={cn(
          "mx-auto mt-2 max-w-6xl overflow-hidden rounded-3xl bg-night text-cream shadow-soft transition-all md:hidden",
          open ? "max-h-96 opacity-100" : "pointer-events-none max-h-0 opacity-0",
        )}
      >
        <ul className="flex flex-col p-3">
          {links.map((link) => (
            <li key={link.href}>
              {renderLink(
                link,
                "block rounded-2xl px-4 py-3 text-base font-medium text-cream/90 hover:bg-white/10",
                () => setOpen(false),
              )}
            </li>
          ))}
          {actions ? <li className="p-2">{actions}</li> : null}
        </ul>
      </div>
    </header>
  );
}
