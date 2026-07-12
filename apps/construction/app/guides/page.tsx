import type { Metadata } from "next";
import Link from "next/link";
import { GUIDES } from "../../lib/guides";

export const metadata: Metadata = {
  title: "Guides — construire, financer, investir en Côte d'Ivoire",
  description:
    "Prix, normes, financement, climat : nos guides pratiques pour construire et investir en modulaire préfabriqué en Afrique de l'Ouest.",
};

export default function GuidesIndex() {
  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-8 px-3 py-10 sm:px-4">
      <header>
        <p className="text-xs font-semibold uppercase tracking-widest text-dawn">Guides</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-night sm:text-5xl">
          Construire et investir, expliqué simplement
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-night/70">
          Prix, délais, normes, financement, climat. Des réponses concrètes au marché ivoirien —
          toutes les données chiffrées sont indicatives.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {GUIDES.map((g) => (
          <Link
            key={g.slug}
            href={`/guides/${g.slug}`}
            className="lift flex flex-col gap-2 rounded-3xl bg-white p-6 shadow-soft"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-dawn">
              {g.intent}
            </span>
            <h2 className="text-lg font-black tracking-tight text-night">{g.title}</h2>
            <p className="text-sm text-night/60">{g.description}</p>
            <span className="mt-2 text-sm font-semibold text-orange">Lire →</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
