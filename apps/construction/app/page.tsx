import Link from "next/link";
import { PhotoFrame } from "../components/PhotoFrame";
import { GlassCard } from "../components/GlassCard";
import { Logo } from "../components/Logo";
import { WhatsAppCTA } from "../components/WhatsAppCTA";
import { MODULES } from "../lib/modules";
import { formatFcfa } from "../lib/pricing";

const HERO_MODULES = ["box-commerce", "studio", "sanitaire-public"];

const STEPS = [
  {
    n: 1,
    t: "Vous configurez",
    d: "Projet, taille, équipement, financement — en ligne, en 2 minutes.",
  },
  { n: 2, t: "On fabrique en usine", d: "Panneaux à ±2-3 mm, réseaux posés, contrôle qualité." },
  { n: 3, t: "On livre sur site", d: "Camion + skid ou dalle. Aucune grue, 2 à 4 personnes." },
  { n: 4, t: "Posé en 1 jour", d: "Assemblage à sec. Vous ouvrez dès le lendemain." },
];

const COMPARE: [string, string, string][] = [
  ["Délai", "Posé en 1 jour", "Plusieurs semaines"],
  ["Avance d'argent", "0 FCFA possible (location)", "Tout le capital d'avance"],
  ["Si ça ne marche pas", "On démonte, vous arrêtez", "Bâtiment perdu"],
  ["Qualité", "Usine, ±2-3 mm", "Dépend du maçon et de la météo"],
  ["Chaleur", "Pack climat : −6 à −10 °C", "Four l'après-midi"],
  ["Déplaçable", "Oui — actif mobile", "Non, figé au sol"],
];

const FAQ: [string, string][] = [
  [
    "Vraiment posé en 1 jour ?",
    "Oui : les finitions sont faites en usine. Sur site, tout s'emboîte à sec, sans réajustement — 2 à 4 personnes, aucune grue.",
  ],
  [
    "Puis-je louer sans capital ?",
    "Oui. En location, le module est posé sur un skid démontable ; vous payez un loyer mensuel. En cas d'arrêt, on récupère le module.",
  ],
  [
    "Et la chaleur ?",
    "Le pack climat tropical (toiture froide ventilée, casquettes, ventilation traversante) fait gagner 6 à 10 °C par rapport à un box en tôle.",
  ],
  [
    "C'est solide et aux normes ?",
    "Structure béton préfabriquée, tolérances usine. Dimensions V1 à valider par un ingénieur structure agréé avant fabrication.",
  ],
];

const HOME_WHATSAPP = "Bonjour Noéma, je découvre le site et j'aimerais des informations.";

function ModuleMiniCard({ slug }: { slug: string }) {
  const m = MODULES.find((x) => x.slug === slug);
  if (!m) return null;
  return (
    <div className="lift flex flex-col gap-4 rounded-3xl bg-white p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-dew px-3 py-1 text-xs font-semibold text-night">
          {m.level}
        </span>
        <span className="text-xs font-semibold uppercase tracking-widest text-dawn">{m.area}</span>
      </div>
      <PhotoFrame label={`Rendu ${m.name} — façade avant`} ratio="4/3" />
      <div>
        <h3 className="text-lg font-black tracking-tight text-night">{m.name}</h3>
        <p className="mt-1 text-sm text-night/60">{m.tagline}</p>
      </div>
      <p className="mt-auto text-sm">
        <span className="text-night/50">à partir de </span>
        <span className="font-bold tabular-nums text-night">
          {m.fromFcfa ? formatFcfa(m.fromFcfa) : "sur devis"}
        </span>
      </p>
      <div className="flex gap-2">
        <Link
          href={`/modules/${m.slug}`}
          className="flex h-11 flex-1 items-center justify-center rounded-full border border-night/15 text-sm font-semibold text-night hover:border-night/30"
        >
          Voir
        </Link>
        <Link
          href="/configurer"
          className="flex h-11 flex-1 items-center justify-center rounded-full bg-orange text-sm font-semibold text-white transition-[filter] hover:brightness-110 active:scale-95"
        >
          Configurer →
        </Link>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="flex flex-col gap-6">
      {/* HERO — fenêtre d'app */}
      <section className="px-3 pt-3 sm:px-4">
        <div className="relative mx-auto h-[80vh] min-h-[540px] w-full max-w-6xl overflow-hidden rounded-[32px] shadow-soft-lg">
          <PhotoFrame
            fill
            label="Vidéo hero — Box Commerce posé en 1 jour, rue d'Abidjan (16/9, ~15 s)"
            className="absolute inset-0 rounded-[32px] border-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/25 to-night/10" />

          <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-8">
            <div className="flex gap-2">
              <Link
                href="/configurer"
                className="rounded-full border border-white/40 bg-white/20 px-5 py-2 text-sm font-semibold text-white backdrop-blur-md"
              >
                Acheter
              </Link>
              <Link
                href="/configurer"
                className="rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-white/80 backdrop-blur-md"
              >
                Louer
              </Link>
            </div>

            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <h1 className="max-w-2xl text-5xl font-black leading-[1.05] tracking-tight text-white drop-shadow-sm sm:text-7xl">
                Votre commerce.
                <br />
                Posé en 1 jour.
              </h1>

              <GlassCard className="w-full sm:w-72">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-dawn">
                  Module vedette
                </p>
                <p className="mt-1 text-xl font-black tracking-tight text-night">NOEMA ONE 17</p>
                <ul className="mt-3 flex flex-col gap-1.5 text-sm text-night/80">
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-orange" /> 17,3 m²
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-orange" /> Pose 1 jour
                  </li>
                  <li className="flex items-center gap-2 tabular-nums">
                    <span className="size-1.5 rounded-full bg-orange" /> dès 85 000 F/mois
                  </li>
                </ul>
                <Link
                  href="/configurer"
                  className="mt-4 flex h-11 items-center justify-center rounded-full bg-orange text-sm font-semibold text-white transition-[filter] hover:brightness-110 active:scale-95"
                >
                  Configurer →
                </Link>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section className="px-3 sm:px-4">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 flex items-end justify-between">
            <h2 className="text-3xl font-black tracking-tight text-night sm:text-4xl">
              Les modules
            </h2>
            <Link href="/configurer" className="text-sm font-semibold text-dawn hover:text-night">
              Tout configurer →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {HERO_MODULES.map((slug) => (
              <ModuleMiniCard key={slug} slug={slug} />
            ))}
          </div>
        </div>
      </section>

      {/* COMPARATIF */}
      <section className="px-3 sm:px-4">
        <div className="mx-auto max-w-6xl rounded-3xl bg-white p-6 shadow-soft sm:p-8">
          <h2 className="text-3xl font-black tracking-tight text-night sm:text-4xl">
            Noéma vs construction traditionnelle
          </h2>
          <div className="mt-6 overflow-hidden rounded-2xl border border-night/10">
            <div className="grid grid-cols-3 bg-night px-4 py-3 text-xs font-semibold uppercase tracking-widest text-cream">
              <span>Critère</span>
              <span>Box Noéma</span>
              <span>Traditionnel</span>
            </div>
            {COMPARE.map((row, i) => (
              <div
                key={row[0]}
                className={`grid grid-cols-3 gap-2 px-4 py-3 text-sm ${i % 2 ? "bg-snow" : "bg-white"}`}
              >
                <span className="font-medium text-night/70">{row[0]}</span>
                <span className="font-semibold text-night">{row[1]}</span>
                <span className="text-night/50">{row[2]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section className="px-3 sm:px-4">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-3xl font-black tracking-tight text-night sm:text-4xl">
            Comment ça marche
          </h2>
          <div className="flex snap-x gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-4 sm:overflow-visible">
            {STEPS.map((s) => (
              <div
                key={s.n}
                className="w-64 shrink-0 snap-start rounded-3xl bg-white p-6 shadow-soft sm:w-auto"
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-orange text-lg font-black text-white">
                  {s.n}
                </span>
                <h3 className="mt-4 text-lg font-bold text-night">{s.t}</h3>
                <p className="mt-1 text-sm text-night/60">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOIT PARASOL */}
      <section className="px-3 sm:px-4">
        <div className="mx-auto grid max-w-6xl gap-6 rounded-3xl bg-night p-6 text-cream shadow-soft sm:p-10 lg:grid-cols-2">
          <div className="flex flex-col justify-center gap-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-dew">
              Pack climat tropical
            </p>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Le Toit Parasol</h2>
            <p className="text-cream/70">
              Toiture froide double peau ventilée + casquettes brise-soleil : le module reste 6 à 10
              °C plus frais qu&apos;un box en tôle. On n&apos;isole pas — on ombrage et on ventile.
            </p>
            <div className="mt-2 flex items-center gap-3">
              <span className="flex size-12 items-center justify-center rounded-xl bg-white p-1.5">
                <Logo variant="mark" alt="" className="h-full" />
              </span>
              <p className="text-sm font-semibold text-dew">C&apos;est lui, dans notre logo.</p>
            </div>
          </div>
          <div className="flex items-center">
            <PhotoFrame
              label="Schéma Toit Parasol — coupe toiture ventilée"
              ratio="4/3"
              className="w-full border-white/25 bg-white/5"
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-3 sm:px-4">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white p-6 shadow-soft sm:p-8">
          <h2 className="text-3xl font-black tracking-tight text-night sm:text-4xl">
            Questions fréquentes
          </h2>
          <div className="mt-4 divide-y divide-night/10">
            {FAQ.map(([q, a]) => (
              <details key={q} className="group py-3">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-base font-semibold text-night">
                  {q}
                  <span className="text-dawn transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-2 text-sm text-night/70">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="px-3 sm:px-4">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 rounded-3xl bg-night p-8 text-cream shadow-soft sm:p-12">
          <h2 className="max-w-2xl text-4xl font-black tracking-tight sm:text-5xl">
            Prêt à monter votre projet ?
          </h2>
          <p className="max-w-xl text-cream/70">
            Configurez votre module et recevez un devis gratuit sur WhatsApp en quelques minutes.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/configurer"
              className="flex h-14 items-center justify-center rounded-full bg-orange px-8 text-base font-semibold text-white transition-[filter] hover:brightness-110 active:scale-95"
            >
              Ouvrir le configurateur →
            </Link>
            <WhatsAppCTA message={HOME_WHATSAPP} size="lg" variant="green">
              Nous écrire
            </WhatsAppCTA>
          </div>
        </div>
      </section>
    </main>
  );
}
