import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PhotoFrame } from "../../../components/PhotoFrame";
import { WhatsAppCTA } from "../../../components/WhatsAppCTA";
import { Tour3DPoster } from "../../../components/three/Tour3DPoster";
import { getModule, MODULES } from "../../../lib/modules";
import { EUR_XOF } from "../../../lib/constants";
import { formatEur, formatFcfa } from "../../../lib/pricing";

export function generateStaticParams() {
  return MODULES.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const m = getModule(slug);
  if (!m) return { title: "Module — Noéma Construction" };
  return { title: `${m.name} — Noéma Construction`, description: m.tagline };
}

function FinanceCards({ total }: { total: number }) {
  const monthly = Math.round(total / 36);
  const deposit = monthly * 3;
  const down = Math.round(total * 0.3);
  const accessionMonthly = Math.round((total - down) / 36);
  const eur = Math.round((total / EUR_XOF) * 100) / 100;

  const cards = [
    { t: "Achat comptant", main: formatFcfa(total), sub: `≈ ${formatEur(eur)}` },
    { t: "Location", main: `${formatFcfa(monthly)}/mois`, sub: `Caution ${formatFcfa(deposit)}` },
    {
      t: "Location-accession",
      main: formatFcfa(down),
      sub: `puis ${formatFcfa(accessionMonthly)}/mois × 36`,
    },
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {cards.map((c) => (
        <div key={c.t} className="rounded-3xl bg-white p-5 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-widest text-dawn">{c.t}</p>
          <p className="mt-2 text-xl font-black tabular-nums text-night">{c.main}</p>
          <p className="text-sm text-night/60">{c.sub}</p>
        </div>
      ))}
    </div>
  );
}

export default async function ModulePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const m = getModule(slug);
  if (!m) notFound();

  const waMessage = `Bonjour Noéma, je suis intéressé par le module ${m.name}. Pouvez-vous m'envoyer un devis ?`;

  return (
    <main className="flex flex-col gap-6 px-3 py-6 sm:px-4">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <Link href="/configurer" className="text-sm font-semibold text-dawn">
          ← Tous les modules
        </Link>

        {/* Hero fiche produit */}
        <section className="grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <PhotoFrame
              label={`Rendu ${m.name} — vue 3/4 façade`}
              src={m.image}
              priority
              ratio="4/3"
              className="rounded-3xl"
            />
          </div>
          <div className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-soft lg:col-span-2 lg:p-8">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-dew px-3 py-1 text-xs font-semibold text-night">
                {m.level}
              </span>
              <span className="text-xs font-semibold uppercase tracking-widest text-dawn">
                {m.area}
              </span>
            </div>
            <h1 className="text-4xl font-black tracking-tight text-night">{m.name}</h1>
            <p className="text-night/70">{m.description}</p>
            <ul className="flex flex-wrap gap-2">
              {m.specs.map((s) => (
                <li
                  key={s}
                  className="rounded-full bg-snow px-3 py-1 text-xs font-medium text-night/70"
                >
                  {s}
                </li>
              ))}
            </ul>
            <p className="mt-2 text-sm">
              <span className="text-night/50">à partir de </span>
              <span className="text-lg font-bold tabular-nums text-night">
                {m.fromFcfa ? formatFcfa(m.fromFcfa) : "sur devis"}
              </span>
            </p>
            <div className="mt-auto flex flex-col gap-2">
              {m.configurable ? (
                <Link
                  href="/configurer"
                  className="flex h-12 items-center justify-center rounded-full bg-orange text-sm font-semibold text-white transition-[filter] hover:brightness-110 active:scale-95"
                >
                  Configurer ce module →
                </Link>
              ) : null}
              <WhatsAppCTA message={waMessage} variant="green" className="w-full" />
            </div>
          </div>
        </section>

        {/* Galerie — images de m.gallery, complétées par des placeholders */}
        <section className="grid gap-4 sm:grid-cols-3">
          {[
            m.gallery?.[0] ?? { label: `${m.name} — intérieur` },
            m.gallery?.[1] ?? { label: `${m.name} — détail toiture ventilée` },
            m.gallery?.[2] ?? { label: `${m.name} — pose sur site` },
          ].map((slot, i) => (
            <PhotoFrame
              key={i}
              label={slot.label}
              src={"src" in slot ? slot.src : undefined}
              ratio="1/1"
            />
          ))}
        </section>

        {/* Visite 3D */}
        {m.configurable ? (
          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-black tracking-tight text-night sm:text-3xl">
              Visitez ce module en 3D
            </h2>
            <Tour3DPoster
              config={{
                preset: m.configurable,
                extraTravees: 0,
                level: m.level,
                base: "achat",
                options: [],
              }}
              priceFcfa={m.fromFcfa ?? undefined}
              label={`Visite 3D — ${m.name}`}
              className="h-[70vh] min-h-[440px]"
            />
          </section>
        ) : null}

        {/* Financements */}
        {m.fromFcfa ? (
          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-black tracking-tight text-night sm:text-3xl">
              3 façons de payer
            </h2>
            <FinanceCards total={m.fromFcfa} />
            <p className="text-xs text-night/50">
              Prix indicatifs — devis exact gratuit. Dimensions = hypothèses V1 à valider par
              ingénieur structure agréé.
            </p>
          </section>
        ) : null}
      </div>
    </main>
  );
}
