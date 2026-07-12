"use client";

import { useCallback, useMemo, useState } from "react";
import { loadStripe, type Stripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import type { ProjectId } from "../lib/pricing";
import { modulePrice } from "../lib/pricing_v2";
import { CURRENT_VOLUME } from "../lib/metrics";
import {
  fcfaToMinor,
  formatMinor,
  type Currency,
} from "../lib/payment/money";
import { splitMilestones } from "../lib/payment/milestones";
import { STRIPE_PUBLISHABLE_KEY, isCheckoutConfigured } from "../lib/stripe/config";

const LABELS: Record<ProjectId, string> = {
  commerce: "Box Commerce",
  studio: "Studio",
  "local-pro": "Poste de gardiennage",
};

// Singleton Stripe.js (chargé une seule fois).
let stripePromise: Promise<Stripe | null> | null = null;
function stripeJs() {
  if (!stripePromise && isCheckoutConfigured) {
    stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
}

function PaymentForm({ amountLabel }: { amountLabel: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setSubmitting(true);
    setError(null);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/reserver/merci` },
    });
    if (error) {
      setError(error.message ?? "Le paiement a échoué.");
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <PaymentElement />
      {error ? <p className="text-sm font-medium text-orange">{error}</p> : null}
      <button
        type="submit"
        disabled={!stripe || submitting}
        className="flex h-12 items-center justify-center rounded-full bg-orange text-sm font-semibold text-white transition-[filter] hover:brightness-110 active:scale-95 disabled:opacity-60"
      >
        {submitting ? "Traitement…" : `Payer l'acompte — ${amountLabel}`}
      </button>
      <p className="text-center text-xs text-night/50">
        Paiement sécurisé Stripe · 3D Secure · Apple&nbsp;Pay / Google&nbsp;Pay
      </p>
    </form>
  );
}

export function ReserveCheckout({
  project,
  currency = "eur",
}: {
  project: ProjectId;
  currency?: Currency;
}) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const price = useMemo(() => modulePrice(project, CURRENT_VOLUME).priceFcfa, [project]);
  const totalMinor = useMemo(() => fcfaToMinor(currency, price), [currency, price]);
  const parts = useMemo(() => splitMilestones(totalMinor), [totalMinor]);
  const acompte = parts.find((p) => p.id === "acompte")!;

  const startCheckout = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ project, currency, milestone: "acompte" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur serveur.");
      setClientSecret(data.clientSecret);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur inattendue.");
    } finally {
      setLoading(false);
    }
  }, [project, currency]);

  // Récapitulatif jalons (toujours affiché).
  const summary = (
    <div className="rounded-2xl bg-white p-5 shadow-soft">
      <p className="text-xs font-semibold uppercase tracking-widest text-dawn">
        {LABELS[project]} · plan à jalons
      </p>
      <p className="mt-1 text-2xl font-black tabular-nums text-night">
        {formatMinor(currency, totalMinor)}
      </p>
      <ul className="mt-3 flex flex-col gap-1.5 text-sm">
        {parts.map((p) => (
          <li key={p.id} className="flex items-center justify-between">
            <span className="text-night/60">
              {p.label} <span className="text-night/40">· {p.trigger}</span>
            </span>
            <span className="font-semibold tabular-nums text-night">
              {formatMinor(currency, p.amountMinor)}{" "}
              <span className="text-xs text-night/40">({Math.round(p.share * 100)} %)</span>
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-night/50">
        Prix indicatif (grille V2, palier de lancement). Aucune pose sous 70 % encaissé.
      </p>
    </div>
  );

  if (!isCheckoutConfigured) {
    return (
      <div className="flex flex-col gap-4">
        {summary}
        <div className="rounded-2xl border border-dashed border-dew bg-snow p-5 text-sm text-night/70">
          <p className="font-semibold text-night">Paiement en préparation.</p>
          <p className="mt-1">
            Le tunnel de paiement par carte (Stripe, mode test) est intégré ; il s&apos;active dès
            que les clés API sont configurées. En attendant, réservez sur WhatsApp.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {summary}

      {!clientSecret ? (
        <div className="flex flex-col gap-3">
          {error ? <p className="text-sm font-medium text-orange">{error}</p> : null}
          <button
            type="button"
            onClick={startCheckout}
            disabled={loading}
            className="flex h-12 items-center justify-center rounded-full bg-orange text-sm font-semibold text-white transition-[filter] hover:brightness-110 active:scale-95 disabled:opacity-60"
          >
            {loading
              ? "Préparation…"
              : `Réserver avec ${formatMinor(currency, acompte.amountMinor)} (30 %)`}
          </button>
        </div>
      ) : (
        <div className="rounded-2xl bg-white p-5 shadow-soft">
          <Elements
            stripe={stripeJs()}
            options={{ clientSecret, appearance: { theme: "flat" } }}
          >
            <PaymentForm amountLabel={formatMinor(currency, acompte.amountMinor)} />
          </Elements>
        </div>
      )}
    </div>
  );
}
