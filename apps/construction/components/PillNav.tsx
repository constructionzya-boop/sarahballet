"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@noema/ui";
import { Logo } from "./Logo";
import { WhatsAppCTA } from "./WhatsAppCTA";

const LINKS = [
  { href: "/modules/box-commerce", label: "Modules" },
  { href: "/configurer", label: "Configurer" },
  { href: "/visite", label: "Visite 3D" },
  { href: "/investir", label: "Investir" },
];

const NAV_MESSAGE = "Bonjour Noéma, je souhaite un devis pour un module.";

export function PillNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full bg-night px-3 py-2 shadow-soft sm:px-4">
        <Link href="/" className="pl-1" aria-label="Noéma Construction — accueil">
          <Logo variant="white" className="h-7" />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-full px-3 py-1.5 text-sm font-medium text-cream/80 transition-colors hover:bg-white/10 hover:text-cream"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <WhatsAppCTA message={NAV_MESSAGE} className="hidden sm:inline-flex" />
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

      {/* Menu mobile déroulant */}
      <div
        className={cn(
          "mx-auto mt-2 max-w-6xl overflow-hidden rounded-3xl bg-night text-cream shadow-soft transition-all md:hidden",
          open ? "max-h-96 opacity-100" : "pointer-events-none max-h-0 opacity-0",
        )}
      >
        <ul className="flex flex-col p-3">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-base font-medium text-cream/90 hover:bg-white/10"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="p-2">
            <WhatsAppCTA message={NAV_MESSAGE} className="w-full" />
          </li>
        </ul>
      </div>
    </header>
  );
}
