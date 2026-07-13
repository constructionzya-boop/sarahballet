import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { WhatsAppCTA } from "../../../components/WhatsAppCTA";
import { GUIDES, getGuide } from "../../../lib/guides";
import { SITE_URL, CONTENT_UPDATED_AT } from "../../../lib/constants";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return { title: "Guide — Noéma Construction" };
  return {
    title: `${g.title} — Noéma`,
    description: g.description,
    alternates: { canonical: `/guides/${g.slug}` },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();

  const related = g.related.map(getGuide).filter((x): x is NonNullable<typeof x> => Boolean(x));

  const url = `${SITE_URL}/guides/${g.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.title,
    description: g.description,
    inLanguage: "fr",
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: `${SITE_URL}/og.png`,
    datePublished: "2026-06-01",
    dateModified: CONTENT_UPDATED_AT,
    author: {
      "@type": "Organization",
      name: "Noéma Construction",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Noéma Construction",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.png` },
    },
  };

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-6 px-3 py-10 sm:px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div>
        <Link href="/guides" className="text-sm font-semibold text-dawn">
          ← Tous les guides
        </Link>
        <h1 className="mt-2 text-3xl font-black leading-tight tracking-tight text-night sm:text-4xl">
          {g.title}
        </h1>
        <p className="mt-3 text-lg text-night/70">{g.intro}</p>
      </div>

      <article className="flex flex-col gap-6">
        {g.sections.map((s) => (
          <section key={s.h2} className="flex flex-col gap-2">
            <h2 className="text-xl font-black tracking-tight text-night">{s.h2}</h2>
            {s.paragraphs.map((p, i) => (
              <p key={i} className="text-night/70">
                {p}
              </p>
            ))}
          </section>
        ))}
      </article>

      {/* CTA */}
      <div className="flex flex-col gap-3 rounded-3xl bg-night p-6 text-cream shadow-soft sm:flex-row sm:items-center sm:justify-between">
        <p className="text-lg font-black">Prêt à avancer ?</p>
        <div className="flex flex-wrap gap-2">
          <Link
            href={g.cta.href}
            className="flex h-12 items-center justify-center rounded-full bg-orange px-6 text-sm font-semibold text-white"
          >
            {g.cta.label} →
          </Link>
          <WhatsAppCTA
            message={`Bonjour Noéma, j'ai lu votre guide « ${g.title} » et j'ai une question.`}
            variant="green"
          />
        </div>
      </div>

      {/* Maillage interne */}
      {related.length > 0 ? (
        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-bold uppercase tracking-widest text-dawn">À lire aussi</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/guides/${r.slug}`}
                className="rounded-2xl bg-white p-4 text-sm font-semibold text-night shadow-soft hover:text-orange"
              >
                {r.title} →
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <p className="text-xs text-night/40">
        Contenu informatif. Données chiffrées indicatives ; dimensions et prix = hypothèses V1 à
        valider par un ingénieur structure agréé et un bureau de contrôle en Côte d&apos;Ivoire.
      </p>
    </main>
  );
}
