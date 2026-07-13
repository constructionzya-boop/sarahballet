import type { Metadata } from "next";
import Link from "next/link";
import { PhotoFrame } from "../../components/PhotoFrame";
import { InterestForm } from "../../components/InterestForm";
import { WhatsAppCTA } from "../../components/WhatsAppCTA";
import { formatFcfa } from "../../lib/pricing";
import {
  IMPACT_PROJECTS,
  CATEGORY_LABEL,
  INVEST_MODE,
  INVEST_CAPS,
  INVEST_DISCLAIMER,
  progressPct,
  impactTotals,
} from "../../lib/invest";

export const metadata: Metadata = {
  title: "Noéma Impact — financez des bâtiments qui changent des vies",
  description:
    "Écoles, sanitaires, logements sociaux modulaires. Contribuez par don avec contreparties — votre nom sur le mur des bâtisseurs.",
};

const WA = "Bonjour Noéma, je veux soutenir un projet Noéma Impact.";

function ProgressBar({ pct }: { pct: number }) {
  return (
    <div className="h-2.5 w-full overflow-hidden rounded-full bg-snow">
      <div className="h-full rounded-full bg-orange" style={{ width: `${pct}%` }} />
    </div>
  );
}

export default function ImpactPage() {
  const totals = impactTotals();

  return (
    <main className="flex flex-col gap-8 px-3 py-8 sm:px-4">
      {/* Hero storytelling */}
      <section className="mx-auto w-full max-w-5xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-dawn">Noéma Impact</p>
        <h1 className="mt-2 max-w-3xl text-4xl font-black leading-tight tracking-tight text-night sm:text-5xl">
          Noéma ne vend pas des modules.
          <br />
          Nous répondons à des problèmes réels.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-night/70">
          Une école qui étouffe sous la tôle, un marché sans sanitaires, des familles à reloger.
          Chacun peut prendre part — dès {formatFcfa(25_000)}.
        </p>
      </section>

      {/* Compteur agrégé */}
      <section className="mx-auto w-full max-w-5xl">
        <div className="grid grid-cols-2 gap-4 rounded-3xl bg-night p-6 text-cream sm:grid-cols-4">
          {[
            { v: formatFcfa(totals.raisedFcfa), l: "collectés" },
            { v: `${totals.contributors}`, l: "contributeurs" },
            { v: `${totals.m2Built} m²`, l: "construits" },
            { v: `${progressPct({ raisedFcfa: totals.raisedFcfa, goalFcfa: totals.goalFcfa })} %`, l: "de l'objectif global" },
          ].map((k) => (
            <div key={k.l}>
              <p className="text-2xl font-black tabular-nums sm:text-3xl">{k.v}</p>
              <p className="text-sm text-cream/60">{k.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cartes projets (style bricks) */}
      <section className="mx-auto grid w-full max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {IMPACT_PROJECTS.map((p) => {
          const pct = progressPct(p);
          return (
            <Link
              key={p.slug}
              href={`/impact/${p.slug}`}
              className="lift flex flex-col overflow-hidden rounded-3xl bg-white shadow-soft"
            >
              <PhotoFrame
                label={`${p.title} — ${p.location}`}
                src={p.image}
                ratio="4/3"
                className="rounded-none"
              />
              <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-dew px-3 py-1 text-xs font-semibold text-night">
                    {CATEGORY_LABEL[p.category]}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-widest text-dawn">
                    {p.location}
                  </span>
                </div>
                <h3 className="text-lg font-black tracking-tight text-night">{p.title}</h3>
                <p className="text-sm text-night/60">{p.tagline}</p>
                <div className="mt-auto flex flex-col gap-2">
                  <ProgressBar pct={pct} />
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-bold tabular-nums text-night">
                      {formatFcfa(p.raisedFcfa)}
                    </span>
                    <span className="text-night/50">
                      {pct}% · {p.contributors} contributeurs
                    </span>
                  </div>
                  <p className="text-xs text-night/40">objectif {formatFcfa(p.goalFcfa)}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </section>

      {/* Mur des bâtisseurs */}
      <section className="mx-auto w-full max-w-5xl">
        <div className="rounded-3xl bg-cream p-6 sm:p-8">
          <h2 className="text-2xl font-black tracking-tight text-night sm:text-3xl">
            Le mur des bâtisseurs
          </h2>
          <p className="mt-2 max-w-2xl text-night/70">
            Chaque contribution inscrit un nom ici — et, dès {formatFcfa(100_000)}, une plaque sur
            le bâtiment livré. {totals.contributors} personnes ont déjà bâti quelque chose.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {Array.from({ length: 12 }).map((_, i) => (
              <span
                key={i}
                className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-night/40 shadow-soft"
              >
                Bâtisseur #{i + 1}
              </span>
            ))}
            <span className="rounded-full bg-orange px-3 py-1.5 text-sm font-semibold text-white">
              Votre nom ici
            </span>
          </div>
        </div>
      </section>

      {/* Manifestation d'intérêt (investisseurs financiers) — gaté par le mode */}
      {INVEST_CAPS.interest ? (
      <section className="mx-auto w-full max-w-5xl">
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-night sm:text-3xl">
              Vous êtes investisseur ?
            </h2>
            <p className="mt-2 text-night/70">
              Les produits d&apos;investissement régulés (obligations, royalties) arrivent en V2,
              une fois l&apos;agrément obtenu. En attendant, laissez votre intérêt : nous
              constituons la liste des premiers financeurs.
            </p>
            <p className="mt-3 text-sm text-night/50">
              Voir aussi l&apos;
              <Link href="/investisseurs" className="font-semibold text-dawn underline">
                espace investisseurs
              </Link>{" "}
              (thèse, chiffres clés, data room).
            </p>
          </div>
          <InterestForm kind="interet" />
        </div>
      </section>
      ) : null}

      {/* Disclaimer légal */}
      <section className="mx-auto w-full max-w-5xl">
        <div className="flex flex-col gap-3 rounded-2xl bg-snow p-5 text-sm text-night/60">
          <p>
            <span className="font-semibold text-night">Cadre légal.</span>{" "}
            {INVEST_DISCLAIMER[INVEST_MODE]}
          </p>
          <WhatsAppCTA message={WA} variant="green" className="w-fit" />
        </div>
      </section>
    </main>
  );
}
