import type { Metadata } from "next";
import { AnimatedCounter } from "../../components/AnimatedCounter";
import { InterestForm } from "../../components/InterestForm";
import { METRICS } from "../../lib/metrics";
import {
  MARKET,
  FUNDING_ROUNDS,
  BUSINESS_MODEL,
  EXECUTION_MILESTONES,
  TEAM,
} from "../../lib/investors";

export const metadata: Metadata = {
  title: "Investisseurs — Noéma Construction",
  description:
    "Le bâtiment devient un produit industriel accessible en ligne. Thèse, marché, business model, jalons et calendrier de levées.",
};

const STATUS_STYLE: Record<string, string> = {
  franchi: "bg-dew text-night",
  "en cours": "bg-orange text-white",
  "à venir": "bg-snow text-night/60",
};

export default function InvestisseursPage() {
  return (
    <main className="flex flex-col gap-12 px-3 py-10 sm:px-4">
      {/* Hero sobre */}
      <section className="mx-auto w-full max-w-5xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-dawn">
          Espace investisseurs
        </p>
        <h1 className="mt-2 max-w-3xl text-4xl font-black leading-tight tracking-tight text-night sm:text-5xl">
          Le bâtiment devient un produit industriel — accessible en ligne.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-night/70">
          Nous industrialisons le local professionnel et le logement accessible en Afrique de
          l&apos;Ouest : usiné, posé en un jour, démontable, vendu et financé en ligne.
        </p>
      </section>

      {/* Chiffres clés animés */}
      <section className="mx-auto w-full max-w-5xl">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { v: METRICS.modulesSigned, l: "modules signés", suffix: "" },
            { v: METRICS.modulesDelivered, l: "modules livrés", suffix: "" },
            { v: METRICS.m2Built, l: "m² construits", suffix: "" },
            { v: Math.round(METRICS.backlogFcfa / 1_000_000), l: "M FCFA de carnet", suffix: "" },
          ].map((k) => (
            <div key={k.l} className="rounded-3xl bg-white p-5 shadow-soft">
              <p className="text-3xl font-black tabular-nums text-night sm:text-4xl">
                <AnimatedCounter value={k.v} />
                {k.suffix}
              </p>
              <p className="mt-1 text-sm text-night/60">{k.l}</p>
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs text-night/40">
          Chiffres indicatifs au {METRICS.updatedAt}, mis à jour à chaque jalon.
        </p>
      </section>

      {/* Thèse d'investissement */}
      <section className="mx-auto w-full max-w-5xl">
        <h2 className="text-3xl font-black tracking-tight text-night">Thèse d&apos;investissement</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {[
            {
              t: "Un déficit massif et solvable",
              d: "600 000 logements manquants à Abidjan, objectif national de 500 000 logements sociaux, +18 % de permis sur le Grand Abidjan. La demande existe ; l'offre industrielle non.",
            },
            {
              t: "Le financement est le produit",
              d: "Location, rent-to-own, prévente : on lève la barrière du capital initial. Le module démontable est un actif mobile récupérable — le risque d'impayé est maîtrisé.",
            },
            {
              t: "Un moat d'exécution",
              d: "Industrialiser les finitions (là où le traditionnel perd 20 jours) + une plateforme qui vend et encaisse en ligne. Le béton est banal ; l'assemblage du système ne l'est pas.",
            },
          ].map((c) => (
            <div key={c.t} className="rounded-3xl bg-white p-6 shadow-soft">
              <h3 className="text-lg font-black text-night">{c.t}</h3>
              <p className="mt-2 text-sm text-night/70">{c.d}</p>
            </div>
          ))}
        </div>

        {/* TAM / SAM / SOM */}
        <div className="mt-6 flex flex-col gap-3">
          {MARKET.map((m, i) => (
            <div
              key={m.id}
              className="flex flex-col gap-1 rounded-2xl bg-night p-5 text-cream sm:flex-row sm:items-center sm:justify-between"
              style={{ opacity: 1 - i * 0.12 }}
            >
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-dew">
                  {m.label}
                </p>
                <p className="text-xs text-cream/60">{m.basis}</p>
              </div>
              <p className="text-2xl font-black tabular-nums">{m.valueLabel}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Business model */}
      <section className="mx-auto w-full max-w-5xl">
        <h2 className="text-3xl font-black tracking-tight text-night">Business model</h2>
        <div className="mt-4 flex snap-x gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-5 sm:overflow-visible">
          {BUSINESS_MODEL.map((s, i) => (
            <div
              key={s.step}
              className="w-56 shrink-0 snap-start rounded-2xl bg-white p-5 shadow-soft sm:w-auto"
            >
              <span className="flex size-8 items-center justify-center rounded-full bg-orange text-sm font-black text-white">
                {i + 1}
              </span>
              <h3 className="mt-3 text-sm font-black text-night">{s.step}</h3>
              <p className="mt-1 text-xs text-night/60">{s.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Jalons franchis */}
      <section className="mx-auto w-full max-w-5xl">
        <h2 className="text-3xl font-black tracking-tight text-night">Exécution</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {EXECUTION_MILESTONES.map((m) => (
            <li
              key={m.label}
              className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-soft"
            >
              <span
                className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full text-xs font-black ${
                  m.done ? "bg-dew text-night" : "border border-night/20 text-night/30"
                }`}
              >
                {m.done ? "✓" : ""}
              </span>
              <span className={`text-sm ${m.done ? "text-night" : "text-night/50"}`}>
                {m.label}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Calendrier de levées */}
      <section className="mx-auto w-full max-w-5xl">
        <h2 className="text-3xl font-black tracking-tight text-night">Calendrier de levées</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {FUNDING_ROUNDS.map((r) => (
            <div key={r.id} className="flex flex-col gap-2 rounded-3xl bg-white p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${STATUS_STYLE[r.status]}`}
                >
                  {r.status}
                </span>
                <span className="text-2xl font-black tabular-nums text-night">{r.target}</span>
              </div>
              <h3 className="text-base font-black text-night">{r.label}</h3>
              <p className="text-sm text-night/60">{r.use}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Équipe */}
      <section className="mx-auto w-full max-w-5xl">
        <h2 className="text-3xl font-black tracking-tight text-night">Équipe</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {TEAM.map((t) => (
            <div key={t.name} className="rounded-3xl bg-white p-6 shadow-soft">
              <p className="text-lg font-black text-night">{t.name}</p>
              <p className="text-xs font-semibold uppercase tracking-widest text-dawn">{t.role}</p>
              <p className="mt-2 text-sm text-night/60">{t.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Data room */}
      <section className="mx-auto w-full max-w-5xl">
        <div className="grid gap-6 rounded-3xl bg-night p-6 text-cream shadow-soft sm:p-10 lg:grid-cols-2">
          <div className="flex flex-col justify-center gap-4">
            <h2 className="text-3xl font-black tracking-tight">Accéder à la data room</h2>
            <p className="text-cream/70">
              Pitch deck, modèle financier, diagnostic technique, cadre juridique. Accès sur
              demande qualifiée — nous revenons sous 48 h ouvrées.
            </p>
            <p className="text-sm text-cream/50">
              Pitch deck (PDF) transmis après qualification. Ceci n&apos;est pas une offre de
              titres financiers.
            </p>
          </div>
          <div id="dataroom">
            <InterestForm kind="dataroom" submitLabel="Demander l'accès data room" />
          </div>
        </div>
      </section>

      <p className="mx-auto w-full max-w-5xl text-xs text-night/40">
        Document d&apos;information à caractère indicatif. Ne constitue ni un conseil en
        investissement, ni une offre de titres financiers, ni une sollicitation. Tout chiffre est
        une hypothèse de travail susceptible d&apos;évoluer.
      </p>
    </main>
  );
}
