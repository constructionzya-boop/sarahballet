import type { Metadata } from "next";
import Link from "next/link";
import { ReserveCheckout } from "../../components/ReserveCheckout";
import { WhatsAppCTA } from "../../components/WhatsAppCTA";
import type { ProjectId } from "../../lib/pricing";
import type { Currency } from "../../lib/payment/money";
import { stripeMode } from "../../lib/stripe/server";

export const metadata: Metadata = {
  title: "Réserver mon module — Noéma Construction",
  description: "Réservez votre module avec 30 % d'acompte. Paiement sécurisé, plan à jalons.",
};

const VALID_PROJECTS: ProjectId[] = ["commerce", "studio", "local-pro"];

function parseProject(v: string | undefined): ProjectId {
  return VALID_PROJECTS.includes(v as ProjectId) ? (v as ProjectId) : "commerce";
}
function parseCurrency(v: string | undefined): Currency {
  return v === "xof" ? "xof" : "eur";
}

const WA = "Bonjour Noéma, je souhaite réserver un module. Pouvez-vous m'accompagner ?";

export default async function ReserverPage({
  searchParams,
}: {
  searchParams: Promise<{ project?: string; currency?: string }>;
}) {
  const sp = await searchParams;
  const project = parseProject(sp.project);
  const currency = parseCurrency(sp.currency);
  const mode = stripeMode();
  const modeLabel =
    mode === "live" ? "" : mode === "test" ? " (mode test)" : " (paiement non configuré)";

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-6 px-3 py-8 sm:px-4">
      <div>
        <Link href="/configurer" className="text-sm font-semibold text-dawn">
          ← Retour au configurateur
        </Link>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-night sm:text-4xl">
          Réserver votre module
        </h1>
        <p className="mt-2 text-night/70">
          Bloquez votre <span className="font-semibold">prix de lancement</span> avec 30 %
          d&apos;acompte. Le solde suit la fabrication puis la pose — jamais de pose sous 70 %
          encaissé.
        </p>
      </div>

      {/* Sélecteur de devise (diaspora EUR / local XOF) */}
      <div className="flex gap-2">
        <Link
          href={`/reserver?project=${project}&currency=eur`}
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            currency === "eur" ? "bg-night text-cream" : "bg-white text-night/70"
          }`}
        >
          € Diaspora (EUR)
        </Link>
        <Link
          href={`/reserver?project=${project}&currency=xof`}
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            currency === "xof" ? "bg-night text-cream" : "bg-white text-night/70"
          }`}
        >
          FCFA Local (XOF)
        </Link>
      </div>

      <ReserveCheckout project={project} currency={currency} />

      <div className="rounded-2xl bg-snow p-5 text-sm text-night/70">
        <p className="font-semibold text-night">Un doute avant de payer ?</p>
        <p className="mt-1">
          On vous accompagne pas à pas sur WhatsApp — configuration, financement, délais.
        </p>
        <WhatsAppCTA message={WA} variant="green" className="mt-3 w-fit" />
      </div>

      <p className="text-xs text-night/50">
        Paiements traités par Stripe{modeLabel}. Montants indicatifs. Les ventes diaspora sont
        encaissées en EUR par la SAS française Noéma Diaspora ; production et pose assurées par
        l&apos;entité ivoirienne (convention intra-groupe).
      </p>
    </main>
  );
}
