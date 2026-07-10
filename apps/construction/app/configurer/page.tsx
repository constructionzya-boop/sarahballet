import type { Metadata } from "next";
import { ConfiguratorLoader } from "../../components/ConfiguratorLoader";

export const metadata: Metadata = {
  title: "Montez votre projet — Configurateur Noéma",
  description:
    "Choisissez votre module, sa taille, son équipement et votre mode de paiement. Devis gratuit sur WhatsApp.",
};

export default function ConfigurerPage() {
  return (
    <main className="px-3 py-6 sm:px-4">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-dawn">Configurateur</p>
          <h1 className="mt-1 text-4xl font-black tracking-tight text-night sm:text-5xl">
            Montez votre projet
          </h1>
          <p className="mt-2 max-w-2xl text-night/60">
            Tout est construit sur une trame de 1,20 m — zéro coupe, qualité usine. Le prix se met à
            jour en direct ; recevez le récapitulatif complet sur WhatsApp.
          </p>
        </header>
        <ConfiguratorLoader />
      </div>
    </main>
  );
}
