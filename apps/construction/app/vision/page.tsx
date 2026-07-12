import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Notre vision — Noéma 2030",
  description:
    "Le bâtiment devient un produit accessible en ligne comme un smartphone. Notre plan, simple et séquencé, vers 10 000 espaces livrés.",
};

const PLAN = [
  {
    n: 1,
    t: "Perfectionner un seul produit",
    d: "Une famille de modules béton, usinée au maximum, aux tolérances d'usine. On maîtrise le produit avant d'élargir le catalogue.",
  },
  {
    n: 2,
    t: "Le vendre et l'encaisser en ligne",
    d: "Configurateur, prix transparent, checkout carte et mobile money, plan à jalons. Acheter un local doit être aussi simple qu'acheter un téléphone.",
  },
  {
    n: 3,
    t: "Rendre le financement accessible",
    d: "Location, location-accession, prévente : on supprime la barrière du capital. Le produit, c'est le financement autant que le béton.",
  },
  {
    n: 4,
    t: "Industrialiser la production locale",
    d: "Une usine par corridor économique, moules importés de Chine, main-d'œuvre et emplois locaux. La cadence remplace le chantier.",
  },
  {
    n: 5,
    t: "Étendre l'impact",
    d: "Écoles, sanitaires, logements sociaux financés par la communauté. Puis les marques annexes B2B qui alimentent la nomenclature.",
  },
];

const HORIZON = [
  { v: "10 000", l: "espaces livrés" },
  { v: "3", l: "pays (CI, Gabon, +1)" },
  { v: "1", l: "usine par corridor" },
];

export default function VisionPage() {
  return (
    <main className="flex flex-col gap-14 px-3 py-12 sm:px-4">
      {/* Manifeste */}
      <section className="mx-auto w-full max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-dawn">
          Notre vision · Master plan
        </p>
        <h1 className="mt-3 text-4xl font-black leading-[1.1] tracking-tight text-night sm:text-6xl">
          Le bâtiment devient un produit.
        </h1>
        <div className="mt-6 flex flex-col gap-4 text-lg text-night/75">
          <p>
            Aujourd&apos;hui, construire est lent, cher et incertain — surtout quand on part de
            loin, sans capital, sous un soleil de plomb. Ce n&apos;est pas une fatalité, c&apos;est
            un problème d&apos;industrialisation.
          </p>
          <p>
            Nous fabriquons des espaces en usine et les posons en un jour. Vous les configurez, les
            payez et les suivez en ligne — comme un produit. Accessibles sans capital, conçus pour
            le climat, démontables donc récupérables.
          </p>
          <p className="font-semibold text-night">
            Notre plan est simple, séquencé et vérifiable. Le voici.
          </p>
        </div>
      </section>

      {/* Le plan */}
      <section className="mx-auto w-full max-w-3xl">
        <ol className="flex flex-col gap-4">
          {PLAN.map((p) => (
            <li key={p.n} className="flex gap-4 rounded-3xl bg-white p-6 shadow-soft">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-orange text-lg font-black text-white">
                {p.n}
              </span>
              <div>
                <h2 className="text-lg font-black tracking-tight text-night">{p.t}</h2>
                <p className="mt-1 text-night/70">{p.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Horizon 2030 */}
      <section className="mx-auto w-full max-w-3xl">
        <div className="rounded-3xl bg-night p-8 text-cream shadow-soft sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-dew">Horizon 2030</p>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {HORIZON.map((h) => (
              <div key={h.l}>
                <p className="text-3xl font-black tabular-nums sm:text-5xl">{h.v}</p>
                <p className="mt-1 text-sm text-cream/60">{h.l}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-xl text-cream/70">
            Un objectif se mesure. Nous publierons nos chiffres — modules livrés, m² construits,
            projets financés — et les tiendrons à jour.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              href="/configurer"
              className="flex h-12 items-center justify-center rounded-full bg-orange px-6 text-sm font-semibold text-white"
            >
              Configurer un module →
            </Link>
            <Link
              href="/impact"
              className="flex h-12 items-center justify-center rounded-full border border-white/25 px-6 text-sm font-semibold text-cream"
            >
              Prendre part à l&apos;impact
            </Link>
          </div>
        </div>
        <p className="mt-3 text-xs text-night/40">
          Objectifs de trajectoire, à caractère indicatif — pas un engagement contractuel.
        </p>
      </section>
    </main>
  );
}
