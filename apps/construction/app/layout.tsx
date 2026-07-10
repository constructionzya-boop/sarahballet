import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { PillNav } from "../components/PillNav";
import { SiteFooter } from "../components/SiteFooter";

export const metadata: Metadata = {
  title: "Noéma Construction — Votre commerce, posé en 1 jour",
  description:
    "Modules préfabriqués béton, posés en un jour. Achat, location ou location-accession. Abidjan · Libreville.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <PillNav />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
