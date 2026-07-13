"use client";

import { useMemo, useState } from "react";
import { loadStripe, type Stripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { formatFcfa } from "../lib/pricing";
import { REWARD_TIERS, tierForAmount } from "../lib/invest";
import { STRIPE_PUBLISHABLE_KEY, isCheckoutConfigured } from "../lib/stripe/config";
import { whatsappHref } from "../lib/whatsapp";

const PRESETS = [25_000, 100_000, 500_000];

let stripePromise: Promise<Stripe | null> | null = null;
function stripeJs() {
  if (!stripePromise && isCheckoutConfigured) stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
  return stripePromise;
}

function CardForm() {
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
      confirmParams: { return_url: `${window.location.origin}/impact/merci` },
    });
    if (error) {
      setError(error.message ?? "Le paiement a échoué.");
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="mt-3 flex flex-col gap-3">
      <PaymentElement />
      {error ? <p className="text-sm font-medium text-orange">{error}</p> : null}
      <button
        type="submit"
        disabled={!stripe || submitting}
        className="flex h-12 items-center justify-center rounded-full bg-orange text-sm font-semibold text-white transition-[filter] hover:brightness-110 active:scale-95 disabled:opacity-60"
      >
        {submitting ? "Traitement…" : "Valider ma contribution"}
      </button>
    </form>
  );
}

export function ContributionBox({ projectSlug }: { projectSlug: string }) {
  const [amount, setAmount] = useState(25_000);
  const [custom, setCustom] = useState("");
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const effective = useMemo(() => {
    const c = Number(custom);
    return custom && Number.isFinite(c) && c >= 1000 ? Math.round(c) : amount;
  }, [custom, amount]);

  const tier = tierForAmount(effective);

  const payByCard = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/impact/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ projectSlug, amountFcfa: effective, currency: "eur" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur serveur.");
      setClientSecret(data.clientSecret);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur inattendue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl bg-white p-6 shadow-soft">
      <p className="text-xs font-semibold uppercase tracking-widest text-dawn">
        Je contribue
      </p>

      {/* Montants preset */}
      <div className="mt-3 flex flex-wrap gap-2">
        {PRESETS.map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => {
              setAmount(v);
              setCustom("");
              setClientSecret(null);
            }}
            className={`rounded-full px-4 py-2 text-sm font-semibold tabular-nums transition-colors ${
              effective === v ? "bg-night text-cream" : "bg-snow text-night/70 hover:bg-cream"
            }`}
          >
            {formatFcfa(v)}
          </button>
        ))}
        <input
          type="number"
          inputMode="numeric"
          min={1000}
          step={1000}
          placeholder="Libre (FCFA)"
          value={custom}
          onChange={(e) => {
            setCustom(e.target.value);
            setClientSecret(null);
          }}
          className="w-32 rounded-full border border-night/15 px-4 py-2 text-sm tabular-nums outline-none focus:border-night/40"
        />
      </div>

      {/* Contrepartie atteinte */}
      <div className="mt-3 rounded-2xl bg-snow p-3 text-sm">
        {tier ? (
          <p>
            <span className="font-semibold text-night">Palier {tier.title}</span> — {tier.reward}
          </p>
        ) : (
          <p className="text-night/60">
            Dès {formatFcfa(REWARD_TIERS[0]!.minFcfa)} : votre nom sur le mur des bâtisseurs.
          </p>
        )}
      </div>

      {/* Deux canaux : CB (confirmée automatiquement) + mobile money (relais WhatsApp) */}
      {!clientSecret ? (
        <div className="mt-4 flex flex-col gap-2">
          {error ? <p className="text-sm font-medium text-orange">{error}</p> : null}
          {isCheckoutConfigured ? (
            <button
              type="button"
              onClick={payByCard}
              disabled={loading}
              className="flex h-12 items-center justify-center rounded-full bg-orange text-sm font-semibold text-white transition-[filter] hover:brightness-110 active:scale-95 disabled:opacity-60"
            >
              {loading ? "Préparation…" : `Carte bancaire — ${formatFcfa(effective)}`}
            </button>
          ) : (
            <div className="rounded-2xl border border-dashed border-dew bg-snow p-3 text-sm text-night/70">
              Paiement carte en préparation (Stripe). En attendant, contribuez via WhatsApp.
            </div>
          )}
          <a
            href={whatsappHref(
              `Bonjour Noéma, je veux contribuer ${formatFcfa(effective)} au projet ${projectSlug} par mobile money (Orange/MTN/Wave/Moov).`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 items-center justify-center gap-2 rounded-full border border-night/15 text-sm font-semibold text-night transition-colors hover:bg-snow"
          >
            Mobile Money (Orange · MTN · Wave · Moov)
            <span className="rounded-full bg-dew px-2 py-0.5 text-[10px] font-bold text-night">
              via WhatsApp
            </span>
          </a>
          <p className="text-center text-[11px] text-night/50">
            Carte bancaire : contribution confirmée automatiquement. Mobile money :
            enregistrée après échange WhatsApp (intégration CinetPay prévue).
          </p>
        </div>
      ) : (
        <Elements stripe={stripeJs()} options={{ clientSecret, appearance: { theme: "flat" } }}>
          <CardForm />
        </Elements>
      )}
    </div>
  );
}
