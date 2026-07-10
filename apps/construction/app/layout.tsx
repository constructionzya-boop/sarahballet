import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { PillNav } from "../components/PillNav";
import { SiteFooter } from "../components/SiteFooter";

export const metadata: Metadata = {
  metadataBase: new URL("https://noema-construction.com"),
  title: "Noéma Construction — Votre commerce, posé en 1 jour",
  description:
    "Modules préfabriqués béton, posés en un jour. Achat, location ou location-accession. Abidjan · Libreville.",
  icons: {
    icon: "/brand/mark.svg",
    apple: "/brand/mark.svg",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Noéma Construction",
    title: "Noéma Construction — Posé en 1 jour",
    description: "Modules préfabriqués béton. Côte d'Ivoire & Gabon.",
    images: [{ url: "/brand/og.svg", width: 1200, height: 630, alt: "Noéma Construction" }],
  },
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
