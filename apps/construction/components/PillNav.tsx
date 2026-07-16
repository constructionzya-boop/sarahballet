"use client";

import Link from "next/link";
import { StickyNav, type NavLink } from "@noema/ui";
import { Logo } from "./Logo";
import { WhatsAppCTA } from "./WhatsAppCTA";

const LINKS: NavLink[] = [
  { href: "/modules/box-commerce", label: "Modules" },
  { href: "/configurer", label: "Configurer" },
  { href: "/impact", label: "Impact" },
  { href: "/investisseurs", label: "Investisseurs" },
];

const NAV_MESSAGE = "Bonjour Noéma, je souhaite un devis pour un module.";

/**
 * Nav du site construction : pose la nouvelle DA via le StickyNav du design
 * system (qui se détache en pill glassmorphism au scroll), avec le logo, les
 * liens next/link et le CTA WhatsApp propres à l'app.
 */
export function PillNav() {
  return (
    <StickyNav
      brand={
        <Link href="/" aria-label="Noéma Construction — accueil">
          <Logo variant="white" className="h-7" />
        </Link>
      }
      links={LINKS}
      renderLink={(link, className, onClick) => (
        <Link href={link.href} className={className} onClick={onClick}>
          {link.label}
        </Link>
      )}
      actions={<WhatsAppCTA message={NAV_MESSAGE} className="w-full sm:w-auto" />}
    />
  );
}
