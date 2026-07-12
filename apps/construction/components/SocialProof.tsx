import { AnimatedCounter } from "./AnimatedCounter";
import { METRICS } from "../lib/metrics";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

const TESTIMONIALS: readonly Testimonial[] = [
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

/**
 * Moteur de preuve sociale : compteur de modules commandés (branché sur METRICS)
 * + témoignages. Le compteur s'anime au défilement.
 */
export function SocialProof() {
  return (
    <section className="px-3 sm:px-4">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <h2 className="text-3xl font-black tracking-tight text-night sm:text-4xl">
            Ils ont déjà franchi le pas
          </h2>
          <p className="text-sm text-night/60">
            <AnimatedCounter
              value={METRICS.modulesSigned}
              className="text-2xl font-black tabular-nums text-orange"
            />{" "}
            modules commandés · {METRICS.modulesDelivered} livrés ·{" "}
            <span className="tabular-nums">{METRICS.m2Built}</span> m²
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.author} className="flex flex-col gap-3 rounded-3xl bg-white p-6 shadow-soft">
              <blockquote className="text-night/80">« {t.quote} »</blockquote>
              <figcaption className="mt-auto">
                <p className="text-sm font-bold text-night">{t.author}</p>
                <p className="text-xs text-night/50">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-3 text-xs text-night/40">
          Témoignages illustratifs. Compteur mis à jour à chaque commande signée.
        </p>
      </div>
    </section>
  );
}
