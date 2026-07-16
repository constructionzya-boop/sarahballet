import type { ReactNode } from "react";
import Link from "next/link";
import {
  AccordionFAQ,
  ConfiguratorTeaser,
  FeatureCardDark,
  FloatingPill,
  MaskedPhoto,
  Marquee,
  OfferCard,
  PaymentCard,
  ProcessStep,
  Reveal,
  RevealGroup,
  RevealItem,
  SectionDivider,
  StatCard,
  TestimonialCard,
  TimelinePose,
} from "@noema/ui";
import { MODULES } from "../lib/modules";
import { formatFcfa } from "../lib/pricing";
import { METRICS } from "../lib/metrics";
import { WhatsAppCTA } from "../components/WhatsAppCTA";

const HOME_WHATSAPP = "Bonjour Noéma, je découvre le site et j'aimerais des informations.";

/* Composants standardisés (nomenclature réelle P1-P8) — défilement de preuve produit. */
const NOMENCLATURE = [
  "P1 · Panneau mural",
  "P2 · Claustra ventilé",
  "P3 · Fenêtre jalousies",
  "P4 · Porte + imposte",
  "P5 · Casquette brise-soleil",
  "P6 · Grille basse",
  "P7 · Plafond léger",
  "P8 · Kit technique",
];

const TECH = [
  {
    title: "Solidité béton",
    body: "Poteaux rainurés + panneaux empilés à sec, tolérances usine ±2-3 mm. Chaînage haut périphérique pour le vent.",
  },
  {
    title: "Fraîcheur tropicale",
    body: "Toiture froide double peau ventilée + casquettes brise-soleil : 6 à 10 °C de moins qu'un box en tôle.",
  },
  {
    title: "Démontable",
    body: "Assise skid boulonnée : le module se démonte et se récupère. Un actif mobile, pas un bâtiment figé.",
  },
];

const PAYMENTS: { title: string; body: string; tone: "light" | "dark" }[] = [
  {
    title: "Achat",
    body: "Vente directe sur dalle coulée. Marge immédiate, idéal diaspora et institutionnels.",
    tone: "light",
  },
  {
    title: "Location",
    body: "Loyer mensuel, module sur skid. Vous démarrez sans capital ; en cas d'arrêt, on récupère le module.",
    tone: "dark",
  },
  {
    title: "Location-accession",
    body: "Rent-to-own : un acompte, puis des loyers qui construisent votre propriété, mois après mois.",
    tone: "light",
  },
  {
    title: "Mobile money & CB",
    body: "Carte bancaire en ligne ; mobile money via WhatsApp (Orange Money, Wave, MTN, Moov). Reçu à chaque jalon.",
    tone: "dark",
  },
];

const PROCESS = [
  {
    n: 1,
    title: "Configurez",
    body: "Projet, taille, équipement, financement — en 2 minutes, en ligne ou directement sur WhatsApp.",
  },
  {
    n: 2,
    title: "On fabrique",
    body: "Panneaux coulés à ±2-3 mm, réseaux posés, contrôle qualité avant le départ de l'atelier.",
  },
  {
    n: 3,
    title: "Posé en 1 jour",
    body: "Assemblage à sec, 2 à 4 personnes, aucune grue. Vous ouvrez dès le lendemain.",
  },
];

const POSE: { time: string; label: string }[] = [
  { time: "7h", label: "Livraison & calage de l'assise" },
  { time: "9h", label: "Levage des poteaux rainurés" },
  { time: "11h", label: "Empilage des panneaux P1" },
  { time: "14h", label: "Toiture froide + claustras" },
  { time: "16h", label: "Portes, jalousies, raccords" },
  { time: "18h", label: "Nettoyage — prêt à ouvrir" },
];

const COMPARE: [string, string, string][] = [
  ["Délai", "Posé en 1 jour", "Plusieurs semaines"],
  ["Avance d'argent", "0 FCFA possible (location)", "Tout le capital d'avance"],
  ["Si ça ne marche pas", "On démonte, vous arrêtez", "Bâtiment perdu"],
  ["Qualité", "Usine, ±2-3 mm", "Dépend du maçon et de la météo"],
  ["Chaleur", "Pack climat : −6 à −10 °C", "Four l'après-midi"],
  ["Déplaçable", "Oui — actif mobile", "Non, figé au sol"],
];

const TESTIMONIALS = [
  {
    quote:
      "Posé un vendredi, j'ai ouvert mon épicerie le samedi. Et il fait bien plus frais que mon ancien box en tôle.",
    author: "Konan A.",
    role: "Épicier · Yopougon",
  },
  {
    quote:
      "J'ai financé le studio depuis la France, avec les photos à chaque étape. Zéro mauvaise surprise.",
    author: "Mariam S.",
    role: "Diaspora · Paris",
  },
  {
    quote:
      "Les sanitaires du marché ont changé le quotidien des commerçantes. Entretien simple, eau autonome.",
    author: "Responsable de marché",
    role: "Adjamé",
  },
];

const FAQ = [
  {
    q: "Vraiment posé en 1 jour ?",
    a: "Oui : les finitions sont faites en usine. Sur site, tout s'emboîte à sec, sans réajustement — 2 à 4 personnes, aucune grue.",
  },
  {
    q: "Puis-je louer sans capital ?",
    a: "Oui. En location, le module est posé sur un skid démontable ; vous payez un loyer mensuel. En cas d'arrêt, on récupère le module.",
  },
  {
    q: "Et la chaleur ?",
    a: "Le pack climat tropical (toiture froide ventilée, casquettes, ventilation traversante) fait gagner 6 à 10 °C par rapport à un box en tôle.",
  },
  {
    q: "C'est solide et aux normes ?",
    a: "Structure béton préfabriquée, tolérances usine. Dimensions V1 à valider par un ingénieur structure agréé avant fabrication.",
  },
];

const TEASER_PRESETS = [
  { label: "Box Commerce", bays: 4, opening: "vitrine" as const },
  { label: "Studio", bays: 4, opening: "porte" as const },
  { label: "Gardiennage", bays: 2, opening: "vitrine" as const },
  { label: "Sanitaire", bays: 3, opening: "sanitaire" as const },
];

/* Section : largeur max + rythme vertical généreux (la page respire). */
function Wrap({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">{children}</div>;
}

/** Éclaté axonométrique stylisé du système poteaux rainurés + panneaux empilés. */
function SystemAxon() {
  return (
    <svg viewBox="0 0 260 240" className="h-auto w-full max-w-sm" role="img" aria-label="Système constructif Noéma : poteaux rainurés et panneaux empilés (vue éclatée)">
      <g stroke="var(--color-dawn)" strokeWidth={1.5} fill="none" opacity={0.85}>
        {/* Poteaux rainurés (gauche/droite). */}
        <path d="M40 60 L40 210 L58 220 L58 70 Z" fill="var(--color-snow)" />
        <path d="M202 60 L202 210 L220 220 L220 70 Z" fill="var(--color-snow)" />
        {/* Panneaux empilés, décalés (éclaté). */}
        {[0, 1, 2, 3].map((i) => {
          const y = 96 + i * 30;
          return (
            <path
              key={i}
              d={`M58 ${y} L202 ${y} L220 ${y + 10} L76 ${y + 10} Z`}
              fill={i === 3 ? "var(--color-dew)" : "var(--color-sand)"}
            />
          );
        })}
        {/* Claustra haut. */}
        <path d="M58 84 L202 84 L220 94 L76 94 Z" fill="var(--color-dew)" />
      </g>
      {/* Toit parasol. */}
      <path d="M30 58 L232 58 L250 50 L48 50 Z" fill="var(--color-night)" />
      <path d="M30 58 L232 58 L232 64 L30 64 Z" fill="var(--color-orange)" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <main className="flex flex-col gap-24 pb-24 pt-6 sm:gap-32">
      {/* ── HERO (carte scindée) ── */}
      <section>
        <Wrap>
          <div className="grid gap-6 rounded-[2rem] bg-white p-6 shadow-soft-lg sm:p-8 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-10 lg:p-10">
            <div className="flex flex-col items-start gap-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-cream px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-dawn">
                <span className="size-1.5 rounded-full bg-orange" /> Abidjan · Libreville
              </span>
              <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-night sm:text-6xl">
                Votre local en béton,
                <br />
                <span className="text-orange">posé en 1 jour.</span>
              </h1>
              <p className="max-w-md text-lg leading-relaxed text-night/60">
                Des modules préfabriqués, finis en usine et montés à sec. Achat, location ou
                location-accession — vous démarrez sans immobiliser votre capital.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/configurer"
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-night px-7 text-base font-semibold text-white transition-[filter] hover:brightness-125 active:scale-[0.98]"
                >
                  Configurer mon module
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-current">
                    <path d="M5 12h12.2l-4.6-4.6L14 6l7 7-7 7-1.4-1.4 4.6-4.6H5z" />
                  </svg>
                </Link>
                <WhatsAppCTA message={HOME_WHATSAPP} size="lg" variant="green">
                  Devis WhatsApp
                </WhatsAppCTA>
              </div>
            </div>

            <div className="relative">
              <MaskedPhoto
                variant="corner"
                ratio="4/3"
                priority
                src="/renders/box-commerce-situation-1.webp"
                label="Box Commerce Noéma installé dans une rue d'Abidjan, posé en 1 jour"
              />
              <div className="absolute left-4 top-4 sm:left-6 sm:top-6">
                <FloatingPill tone="light" icon={<span className="size-2 rounded-full bg-orange" />}>
                  Pose en 1 jour
                </FloatingPill>
              </div>
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6">
                <FloatingPill tone="dark" delay={0.4}>
                  dès 85 000 F / mois
                </FloatingPill>
              </div>
            </div>
          </div>
        </Wrap>
      </section>

      {/* ── STAT-CARDS ── */}
      <section>
        <Wrap>
          <RevealGroup as="div" className="grid gap-4 sm:grid-cols-3">
            <RevealItem>
              <StatCard value={1} suffix=" jour" label="de pose sur site — vous ouvrez dès le lendemain." />
            </RevealItem>
            <RevealItem>
              <StatCard
                value={2700}
                suffix=" mm"
                label="sous plafond (mur type : 4 panneaux + 1 claustra)."
              />
            </RevealItem>
            <RevealItem>
              <StatCard value={5} suffix=" offres" label="sur 3 niveaux d'équipement M1 · M2 · M3." />
            </RevealItem>
          </RevealGroup>
        </Wrap>
      </section>

      {/* ── MARQUEE nomenclature ── */}
      <section aria-label="Composants standardisés">
        <Marquee items={NOMENCLATURE} duration={38} />
      </section>

      {/* ── TECHNOLOGIE ── */}
      <section>
        <Wrap>
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <Reveal className="flex flex-col gap-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-dawn">
                La technologie
              </span>
              <h2 className="text-3xl font-semibold leading-tight tracking-tight text-night sm:text-4xl">
                Un produit industrialisé,
                <br />
                pas un chantier.
              </h2>
              <p className="max-w-md leading-relaxed text-night/60">
                Tout s'emboîte sans réajustement : embase faite, plaques aux dimensions exactes,
                câbles posés, plomberie installée. La trame de 1,20 m structure l'ensemble.
              </p>
              <div className="flex justify-center py-2 lg:justify-start">
                <SystemAxon />
              </div>
            </Reveal>

            <RevealGroup className="flex flex-col gap-4">
              {TECH.map((t) => (
                <RevealItem key={t.title}>
                  <FeatureCardDark title={t.title}>{t.body}</FeatureCardDark>
                </RevealItem>
              ))}
              <p className="text-xs text-night/40">
                Dimensions et prix = hypothèses V1 à valider par un ingénieur structure agréé.
              </p>
            </RevealGroup>
          </div>
        </Wrap>
      </section>

      {/* ── CATALOGUE ── */}
      <section>
        <Wrap>
          <div className="mb-6 flex items-end justify-between gap-4">
            <h2 className="text-3xl font-semibold tracking-tight text-night sm:text-4xl">
              Cinq offres, un système
            </h2>
            <Link
              href="/configurer"
              className="hidden shrink-0 text-sm font-semibold text-dawn hover:text-night sm:block"
            >
              Tout configurer →
            </Link>
          </div>
          <RevealGroup className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {MODULES.map((m) => (
              <RevealItem key={m.slug}>
                <OfferCard
                  href={`/modules/${m.slug}`}
                  name={m.name}
                  badge={m.level}
                  price={m.fromFcfa ? `à partir de ${formatFcfa(m.fromFcfa)}` : "sur devis"}
                  imageSrc={m.image}
                  imageLabel={`Rendu ${m.name} — façade avant`}
                />
              </RevealItem>
            ))}
          </RevealGroup>
        </Wrap>
      </section>

      {/* ── CONFIGURATEUR (teaser) ── */}
      <section>
        <Wrap>
          <Reveal>
            <ConfiguratorTeaser presets={TEASER_PRESETS} href="/configurer" />
          </Reveal>
        </Wrap>
      </section>

      {/* ── MODES DE PAIEMENT ── */}
      <section>
        <Wrap>
          <div className="mb-6 max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-dawn">
              Le financement est le produit
            </span>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-night sm:text-4xl">
              Quatre façons de payer
            </h2>
          </div>
          <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PAYMENTS.map((p) => (
              <RevealItem key={p.title}>
                <PaymentCard title={p.title} tone={p.tone} href="/configurer">
                  {p.body}
                </PaymentCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </Wrap>
      </section>

      {/* ── PROCESS ── */}
      <section>
        <Wrap>
          <h2 className="mb-8 text-3xl font-semibold tracking-tight text-night sm:text-4xl">
            Trois pas vers votre nouveau local
          </h2>
          <RevealGroup className="grid gap-8 sm:grid-cols-3">
            {PROCESS.map((s) => (
              <RevealItem key={s.n}>
                <ProcessStep n={s.n} title={s.title}>
                  {s.body}
                </ProcessStep>
              </RevealItem>
            ))}
          </RevealGroup>
        </Wrap>
      </section>

      {/* ── TIMELINE POSE ── */}
      <section>
        <Wrap>
          <div className="rounded-[2rem] bg-white p-6 shadow-soft sm:p-8">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-2">
              <h2 className="text-2xl font-semibold tracking-tight text-night sm:text-3xl">
                La pose, heure par heure
              </h2>
              <span className="text-sm text-night/50">Un seul jour, du camion à l'ouverture.</span>
            </div>
            <TimelinePose steps={POSE} />
            <p className="mt-4 text-xs text-night/40">Déroulé indicatif — varie selon le modèle et le site.</p>
          </div>
        </Wrap>
      </section>

      {/* ── COMPARATIF ── */}
      <section>
        <Wrap>
          <Reveal className="overflow-hidden rounded-[2rem] bg-white p-6 shadow-soft sm:p-8">
            <h2 className="text-3xl font-semibold tracking-tight text-night sm:text-4xl">
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
          </Reveal>
        </Wrap>
      </section>

      {/* ── TÉMOIGNAGES ── */}
      <section>
        <Wrap>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-3xl font-semibold tracking-tight text-night sm:text-4xl">
              Ils ont franchi le pas
            </h2>
            <p className="text-sm text-night/60">
              <span className="text-lg font-semibold tabular-nums text-orange">
                {METRICS.modulesSigned}
              </span>{" "}
              modules commandés · {METRICS.modulesDelivered} livrés · {METRICS.m2Built} m²
            </p>
          </div>
          <RevealGroup className="grid gap-4 sm:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <RevealItem key={t.author}>
                <TestimonialCard quote={`« ${t.quote} »`} author={t.author} authorRole={t.role} />
              </RevealItem>
            ))}
          </RevealGroup>
          <p className="mt-3 text-xs text-night/40">
            Témoignages illustratifs. Compteur mis à jour à chaque commande signée.
          </p>
        </Wrap>
      </section>

      {/* ── FAQ ── */}
      <section>
        <Wrap>
          <div className="mx-auto max-w-3xl rounded-[2rem] bg-white p-6 shadow-soft sm:p-8">
            <h2 className="text-3xl font-semibold tracking-tight text-night sm:text-4xl">
              Questions fréquentes
            </h2>
            <AccordionFAQ className="mt-4" items={FAQ} />
          </div>
        </Wrap>
      </section>

      {/* ── CTA FINAL (transition Snow → Night) ── */}
      <section>
        <SectionDivider variant="wave" from="cream" to="night" height={80} />
        <div className="bg-night">
          <Wrap>
            <div className="flex flex-col items-start gap-6 py-16 text-cream sm:py-20">
              <h2 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
                Prêt à monter votre projet ?
              </h2>
              <p className="max-w-xl text-lg text-cream/70">
                Configurez votre module et recevez un devis gratuit sur WhatsApp en quelques minutes.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/configurer"
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-orange px-8 text-base font-semibold text-white transition-[filter] hover:brightness-110 active:scale-[0.98]"
                >
                  Ouvrir le configurateur
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-current">
                    <path d="M5 12h12.2l-4.6-4.6L14 6l7 7-7 7-1.4-1.4 4.6-4.6H5z" />
                  </svg>
                </Link>
                <WhatsAppCTA message={HOME_WHATSAPP} size="lg" variant="green">
                  Nous écrire
                </WhatsAppCTA>
              </div>
            </div>
          </Wrap>
        </div>
      </section>
    </main>
  );
}
