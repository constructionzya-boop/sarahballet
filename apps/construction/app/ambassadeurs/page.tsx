import type { Metadata } from "next";
import { ReferralCard } from "../../components/ReferralCard";
import { LEADERBOARD, REFERRAL_CREDIT_EUR } from "../../lib/referral";

export const metadata: Metadata = {
  title: "Ambassadeurs diaspora — parrainez, gagnez du crédit",
  description:
    "Parrainez un proche : 100 € de crédit par filleul livré. Générez votre code, partagez, montez au classement.",
};

const STEPS = [
  { n: 1, t: "Générez votre code", d: "Un lien de parrainage unique, en un instant." },
  { n: 2, t: "Partagez-le", d: "WhatsApp, réseaux, bouche-à-oreille — au pays comme en diaspora." },
  {
    n: 3,
    t: "Gagnez du crédit",
    d: `${REFERRAL_CREDIT_EUR} € par filleul dont le module est livré, déductible de votre prochain projet.`,
  },
];

const MEDAL = ["🥇", "🥈", "🥉"];

export default function AmbassadeursPage() {
  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-10 px-3 py-10 sm:px-4">
      <header>
        <p className="text-xs font-semibold uppercase tracking-widest text-dawn">
          Programme ambassadeurs
        </p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-night sm:text-5xl">
          Parrainez. Bâtissez ensemble.
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-night/70">
          La diaspora est notre meilleur canal. Recommandez Noéma à un proche : vous gagnez{" "}
          {REFERRAL_CREDIT_EUR} € de crédit pour chaque filleul dont le module est livré.
        </p>
      </header>

      {/* Étapes */}
      <section className="grid gap-4 sm:grid-cols-3">
        {STEPS.map((s) => (
          <div key={s.n} className="rounded-3xl bg-white p-6 shadow-soft">
            <span className="flex size-10 items-center justify-center rounded-full bg-orange text-lg font-black text-white">
              {s.n}
            </span>
            <h2 className="mt-3 text-lg font-black text-night">{s.t}</h2>
            <p className="mt-1 text-sm text-night/60">{s.d}</p>
          </div>
        ))}
      </section>

      {/* Générateur + leaderboard */}
      <section className="grid gap-6 lg:grid-cols-2">
        <ReferralCard />

        <div className="rounded-3xl bg-white p-6 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-widest text-dawn">
            Classement des ambassadeurs
          </p>
          <ul className="mt-3 flex flex-col divide-y divide-night/10">
            {LEADERBOARD.map((r) => (
              <li key={r.rank} className="flex items-center justify-between py-3">
                <span className="flex items-center gap-3">
                  <span className="w-6 text-center text-lg">{MEDAL[r.rank - 1] ?? r.rank}</span>
                  <span className="font-semibold text-night">{r.name}</span>
                </span>
                <span className="flex items-center gap-4 text-sm">
                  <span className="text-night/50">{r.filleuls} filleuls</span>
                  <span className="font-black tabular-nums text-orange">{r.creditEur} €</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-night/40">
            Classement de démonstration — le suivi réel arrive avec l&apos;espace client Connect.
          </p>
        </div>
      </section>

      <p className="text-xs text-night/40">
        Crédit indicatif, versé après livraison effective du filleul, sous conditions du programme.
      </p>
    </main>
  );
}
