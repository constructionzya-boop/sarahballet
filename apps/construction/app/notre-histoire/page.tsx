import type { Metadata } from "next";
import { PhotoFrame } from "../../components/PhotoFrame";

export const metadata: Metadata = {
  title: "Notre histoire — Noéma Construction",
  description: "Pourquoi Noéma industrialise le logement et le local pro en Afrique de l'Ouest.",
};

export default function HistoirePage() {
  return (
    <main className="px-3 py-6 sm:px-4">
      <div className="mx-auto flex max-w-4xl flex-col gap-6">
        <header className="rounded-3xl bg-white p-6 shadow-soft sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-dawn">
            Notre histoire
          </p>
          <h1 className="mt-1 text-4xl font-black tracking-tight text-night sm:text-6xl">
            « Eux vendent des morceaux. Nous livrons la pièce. »
          </h1>
          <p className="mt-4 max-w-2xl text-night/70">
            Noéma est né d&apos;un constat simple : construire un local en Afrique de l&apos;Ouest
            prend des semaines, mobilise un capital rare et dépend de la météo. En industrialisant
            les finitions en usine, on livre un module fini, monté et branché — en une journée.
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2">
          <PhotoFrame label="Atelier — moules et panneaux P1" ratio="4/3" />
          <PhotoFrame label="Équipe Noéma sur chantier, Abidjan" ratio="4/3" />
        </div>

        <section className="rounded-3xl bg-white p-6 shadow-soft sm:p-10">
          <h2 className="text-2xl font-black tracking-tight text-night sm:text-3xl">
            Un produit, pas un chantier
          </h2>
          <p className="mt-3 text-night/70">
            Tout repose sur une trame de 1,20 m et un catalogue fermé de composants (P1 à P8). Cette
            discipline, c&apos;est la garantie d&apos;une qualité usine constante et de délais
            tenus. Le module de location se démonte et se récupère : un actif mobile, pas un pari à
            vie.
          </p>
        </section>

        <section className="rounded-3xl bg-night p-6 text-cream shadow-soft sm:p-10">
          <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
            Entre la Chine et l&apos;Afrique de l&apos;Ouest
          </h2>
          <p className="mt-3 text-cream/70">
            Sourcing et moules en Chine, marchés en Côte d&apos;Ivoire (Abidjan) et au Gabon. Un
            pack climat tropical de série : toiture froide ventilée, ventilation traversante,
            casquettes brise-soleil.
          </p>
        </section>

        <p className="text-xs text-night/50">
          Dimensions et détails techniques = hypothèses V1 à valider par ingénieur structure agréé
          avant fabrication.
        </p>
      </div>
    </main>
  );
}
