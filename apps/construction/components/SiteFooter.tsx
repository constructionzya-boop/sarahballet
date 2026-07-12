import Link from "next/link";
import { Logo } from "./Logo";
import { PRICE_DISCLAIMER } from "../lib/constants";

const COLS = [
  {
    title: "Produit",
    links: [
      { href: "/modules/box-commerce", label: "Box Commerce" },
      { href: "/modules/sanitaire-public", label: "Sanitaire public" },
      { href: "/modules/studio", label: "Studio" },
      { href: "/configurer", label: "Configurateur" },
    ],
  },
  {
    title: "Financer",
    links: [
      { href: "/configurer", label: "Achat · Location · Accession" },
      { href: "/reserver", label: "Réserver (30 % en ligne)" },
      { href: "/impact", label: "Noéma Impact" },
      { href: "/investisseurs", label: "Investisseurs" },
      { href: "/investir", label: "Diaspora" },
    ],
  },
  {
    title: "Noéma",
    links: [
      { href: "/notre-histoire", label: "Notre histoire" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="px-3 pb-6 sm:px-4">
      <div className="mx-auto max-w-6xl rounded-3xl bg-night px-6 py-10 text-cream shadow-soft sm:px-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="max-w-xs">
            <Logo variant="white" className="h-10" />
            <p className="mt-4 text-sm text-cream/70">
              Modules préfabriqués béton, posés en un jour. Abidjan · Libreville.
            </p>
            <p className="mt-4 text-xs text-cream/50">
              <span className="font-semibold text-dew">Réseau Noéma :</span> Étansol · Hydralis ·
              Ventalis · Saniva
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {COLS.map((col) => (
              <div key={col.title}>
                <p className="text-xs font-semibold uppercase tracking-widest text-dew">
                  {col.title}
                </p>
                <ul className="mt-3 flex flex-col gap-2">
                  {col.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link href={link.href} className="text-sm text-cream/80 hover:text-cream">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-10 border-t border-white/10 pt-6 text-xs text-cream/50">
          Tous les prix sont {PRICE_DISCLAIMER}. Dimensions et détails = hypothèses V1 à valider par
          ingénieur structure agréé avant fabrication. © {2026} Noéma Construction.
        </p>
      </div>
    </footer>
  );
}
