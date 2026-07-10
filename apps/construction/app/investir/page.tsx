import type { Metadata } from "next";
import Link from "next/link";
import { StatCard } from "../../components/StatCard";
import { PhotoFrame } from "../../components/PhotoFrame";
import { computeConfig, formatEur, formatFcfa } from "../../lib/pricing";

export const metadata: Metadata = {
  title: "Investir & Diaspora — Noéma Construction",
  description:
    "Un module Noéma plutôt que des transferts sans fin. Rentabilité, paiement en 3 jalons, garanties.",
};

// Exemple chiffré : Box Commerce en location-accession diaspora.
const example = computeConfig({
  project: "commerce",
  extraTravees: 0,
  level: "M2",
  options: [],
  base: "achat",
  financing: "diaspora",
});

const SCENARIOS = [
  { name: "Prudent", rent: 60_000, fill: 45, payback: "53 mois" },
  { name: "Réaliste", rent: 90_000, fill: 68, payback: "36 mois" },
  { name: "Bon emplacement", rent: 130_000, fill: 100, payback: "25 mois" },
];

const JALONS = [
  {
    pct: "30 %",
    label: "À la commande",
    eur: example.financing.diasporaEur[0],
    desc: "Lancement en usine.",
  },
  {
    pct: "40 %",
    label: "Avant livraison",
    eur: example.financing.diasporaEur[1],
    desc: "Fabrication contrôlée, photos à l'appui.",
  },
  {
    pct: "30 %",
    label: "À la pose",
    eur: example.financing.diasporaEur[2],
    desc: "Module posé, PV de réception signé.",
  },
];

const LOCKS = [
  ["Photos à chaque jalon", "Vous suivez la fabrication et la pose à distance."],
  ["Prix fixe au contrat", "Le montant est bloqué à la signature — pas de mauvaise surprise."],
  ["Actif récupérable", "En location, le module se démonte et se récupère."],
  ["Devis écrit gratuit", "Chaque prix est indicatif jusqu'au devis daté."],
];

export default function InvestirPage() {
  return (
    <main className="flex flex-col gap-6 px-3 py-6 sm:px-4">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        {/* En-tête */}
        <header>
          <p className="text-xs font-semibold uppercase tracking-widest text-dawn">Diaspora</p>
          <h1 className="mt-1 max-w-3xl text-4xl font-black tracking-tight text-night sm:text-6xl">
            Un actif qui rapporte, pas des transferts qui s&apos;évaporent.
          </h1>
        </header>

        {/* Contraste chiffré */}
        <div className="grid gap-4 sm:grid-cols-2">
          <StatCard
            label="Transferts sur 10 ans"
            value="18 000 €"
            sub="Envoyés, dépensés, jamais récupérés."
            tone="dark"
          />
          <StatCard
            label="Un studio Noéma"
            value="≈ 5 900 €"
            sub="Une fois. Il reste, il loge, il loue."
            tone="money"
          />
        </div>

        {/* Rentabilité — 3 scénarios */}
        <section className="rounded-3xl bg-white p-6 shadow-soft sm:p-8">
          <h2 className="text-2xl font-black tracking-tight text-night sm:text-3xl">
            Plan de rentabilité (Box Commerce)
          </h2>
          <p className="mt-1 text-sm text-night/60">
            Loyer mensuel encaissé selon l&apos;emplacement — hypothèses indicatives.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {SCENARIOS.map((s) => (
              <div key={s.name} className="rounded-2xl border border-night/10 p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-dawn">
                  {s.name}
                </p>
                <p className="mt-2 text-2xl font-black tabular-nums text-night">
                  {formatFcfa(s.rent)}
                  <span className="text-sm font-medium text-night/50">/mois</span>
                </p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-snow">
                  <div
                    className="h-full rounded-full bg-money-ink"
                    style={{ width: `${s.fill}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-night/60">Amorti en {s.payback}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline 3 jalons */}
        <section className="rounded-3xl bg-white p-6 shadow-soft sm:p-8">
          <h2 className="text-2xl font-black tracking-tight text-night sm:text-3xl">
            Payez en 3 jalons (30 / 40 / 30)
          </h2>
          <p className="mt-1 text-sm text-night/60">
            Exemple pour un {example.project.offer} — total {formatEur(example.totalEur)} (taux fixe
            655,957).
          </p>
          <ol className="mt-6 flex flex-col gap-6">
            {JALONS.map((j, i) => (
              <li key={j.label} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className="flex size-10 items-center justify-center rounded-full bg-orange text-sm font-black text-white">
                    {i + 1}
                  </span>
                  {i < JALONS.length - 1 ? <span className="mt-1 w-px flex-1 bg-night/15" /> : null}
                </div>
                <div className="pb-2">
                  <p className="font-bold text-night">
                    {j.pct} — {j.label}{" "}
                    <span className="font-black tabular-nums text-dawn">{formatEur(j.eur)}</span>
                  </p>
                  <p className="text-sm text-night/60">{j.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Personnaliser à distance */}
        <section className="grid gap-4 rounded-3xl bg-white p-6 shadow-soft sm:grid-cols-2 sm:p-8">
          <div className="flex flex-col justify-center gap-3">
            <h2 className="text-2xl font-black tracking-tight text-night sm:text-3xl">
              Personnalisez son commerce à distance
            </h2>
            <p className="text-sm text-night/60">
              Choisissez le module, la taille et les options depuis l&apos;Europe. On s&apos;occupe
              de la fabrication et de la pose au pays.
            </p>
            <Link
              href="/configurer"
              className="mt-2 inline-flex h-12 w-fit items-center justify-center rounded-full bg-orange px-6 text-sm font-semibold text-white transition-[filter] hover:brightness-110 active:scale-95"
            >
              Configurer un Box Commerce →
            </Link>
          </div>
          <PhotoFrame label="Rendu Box Commerce — configuration diaspora" ratio="4/3" />
        </section>

        {/* Verrous de confiance */}
        <section className="grid gap-4 sm:grid-cols-2">
          {LOCKS.map(([t, d]) => (
            <div key={t} className="rounded-3xl bg-white p-6 shadow-soft">
              <h3 className="text-lg font-bold text-night">{t}</h3>
              <p className="mt-1 text-sm text-night/60">{d}</p>
            </div>
          ))}
        </section>

        <p className="text-xs text-night/50">
          Montants indicatifs (grille V{example.pricingVersion}), fournis à titre d&apos;information
          et sans valeur de conseil en investissement. Devis exact gratuit. Dimensions et prix =
          hypothèses V1 à valider par ingénieur structure agréé.
        </p>
      </div>
    </main>
  );
}
