import type { Metadata } from "next";
import { EconomicsDashboard } from "../../../components/EconomicsDashboard";

// Dashboard INTERNE — non public. Non indexé, non lié depuis la navigation.
export const metadata: Metadata = {
  title: "Économie unitaire — interne Noéma",
  robots: { index: false, follow: false },
};

export default function OfficeEconomicsPage() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-6 px-3 py-8 sm:px-4">
      <header className="rounded-2xl bg-night px-5 py-4 text-cream">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-dew">
          Interne · non public
        </p>
        <h1 className="mt-1 text-2xl font-black tracking-tight">Économie unitaire</h1>
        <p className="mt-1 text-sm text-cream/60">
          Pilotage : coût de revient, marges par palier, LTV/CAC, point mort et sensibilité.
          Chiffres = hypothèses V1 indicatives, à remplacer par des devis fournisseurs datés.
        </p>
      </header>

      <EconomicsDashboard />
    </main>
  );
}
