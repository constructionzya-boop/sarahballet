import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PhotoFrame } from "../../../components/PhotoFrame";
import { ContributionBox } from "../../../components/ContributionBox";
import { formatFcfa } from "../../../lib/pricing";
import {
  IMPACT_PROJECTS,
  getImpactProject,
  CATEGORY_LABEL,
  REWARD_TIERS,
  INVEST_MODE,
  INVEST_DISCLAIMER,
  progressPct,
} from "../../../lib/invest";

export function generateStaticParams() {
  return IMPACT_PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getImpactProject(slug);
  if (!p) return { title: "Projet — Noéma Impact" };
  return { title: `${p.title} — Noéma Impact`, description: p.tagline };
}

export default async function ImpactProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getImpactProject(slug);
  if (!p) notFound();
  const pct = progressPct(p);

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-6 px-3 py-8 sm:px-4">
      <Link href="/impact" className="text-sm font-semibold text-dawn">
        ← Tous les projets
      </Link>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Colonne récit */}
        <div className="flex flex-col gap-5 lg:col-span-3">
          <PhotoFrame
            label={`${p.title} — ${p.location}`}
            src={p.image}
            ratio="4/3"
            className="rounded-3xl"
          />
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-dew px-3 py-1 text-xs font-semibold text-night">
              {CATEGORY_LABEL[p.category]}
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-dawn">
              {p.location}
            </span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-night sm:text-4xl">{p.title}</h1>
          <p className="text-night/70">{p.story}</p>

          {/* Métriques d'impact */}
          <div className="grid grid-cols-3 gap-3">
            {p.impact.map((m) => (
              <div key={m.label} className="rounded-2xl bg-white p-4 text-center shadow-soft">
                <p className="text-2xl font-black tabular-nums text-night">{m.value}</p>
                <p className="text-xs text-night/60">{m.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Colonne contribution */}
        <div className="flex flex-col gap-4 lg:col-span-2">
          <div className="rounded-3xl bg-night p-6 text-cream shadow-soft">
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/15">
              <div className="h-full rounded-full bg-orange" style={{ width: `${pct}%` }} />
            </div>
            <div className="mt-3 flex items-end justify-between">
              <div>
                <p className="text-2xl font-black tabular-nums">{formatFcfa(p.raisedFcfa)}</p>
                <p className="text-sm text-cream/60">sur {formatFcfa(p.goalFcfa)}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black tabular-nums">{pct} %</p>
                <p className="text-sm text-cream/60">{p.contributors} contributeurs</p>
              </div>
            </div>
          </div>

          <ContributionBox projectSlug={p.slug} />

          {/* Paliers de contrepartie */}
          <div className="rounded-3xl bg-white p-6 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-widest text-dawn">
              Vos contreparties
            </p>
            <ul className="mt-3 flex flex-col gap-3">
              {REWARD_TIERS.map((t) => (
                <li key={t.title} className="border-l-2 border-orange pl-3">
                  <p className="text-sm font-bold text-night">
                    {t.title} · dès {formatFcfa(t.minFcfa)}
                  </p>
                  <p className="text-sm text-night/60">{t.reward}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <p className="rounded-2xl bg-snow p-5 text-sm text-night/60">
        <span className="font-semibold text-night">Cadre légal.</span>{" "}
        {INVEST_DISCLAIMER[INVEST_MODE]}
      </p>
    </main>
  );
}
