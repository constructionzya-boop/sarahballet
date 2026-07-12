"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_PUBLISHABLE_KEY, isCheckoutConfigured } from "../../../lib/stripe/config";

type Status = "loading" | "success" | "processing" | "failed" | "unknown";

function MerciInner() {
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    if (!isCheckoutConfigured) return setStatus("unknown");
    const cs = new URLSearchParams(window.location.search).get("payment_intent_client_secret");
    if (!cs) return setStatus("unknown");
    loadStripe(STRIPE_PUBLISHABLE_KEY).then(async (stripe) => {
      if (!stripe) return setStatus("unknown");
      const { paymentIntent } = await stripe.retrievePaymentIntent(cs);
      if (paymentIntent?.status === "succeeded") setStatus("success");
      else if (paymentIntent?.status === "processing") setStatus("processing");
      else if (paymentIntent?.status === "requires_payment_method") setStatus("failed");
      else setStatus("unknown");
    });
  }, []);

  const title =
    status === "success"
      ? "Merci — vous êtes un bâtisseur 🧱"
      : status === "processing"
        ? "Contribution en cours de traitement"
        : status === "failed"
          ? "La contribution n'a pas abouti"
          : "Merci de votre soutien";
  const body =
    status === "success"
      ? "Votre nom rejoint le mur des bâtisseurs. Vous recevrez le rapport photo trimestriel du chantier."
      : status === "failed"
        ? "Aucun montant n'a été débité. Vous pouvez réessayer."
        : "Nous confirmons votre contribution sous peu.";

  return (
    <main className="mx-auto flex max-w-lg flex-col gap-6 px-3 py-16 text-center sm:px-4">
      <div className="rounded-3xl bg-white p-8 shadow-soft">
        <h1 className="text-2xl font-black tracking-tight text-night">{title}</h1>
        <p className="mt-3 text-night/70">{body}</p>
        <div className="mt-6 flex flex-col gap-2">
          <Link
            href="/impact"
            className="flex h-12 items-center justify-center rounded-full bg-night text-sm font-semibold text-cream"
          >
            Retour aux projets
          </Link>
          {status === "failed" ? (
            <Link
              href="/impact"
              className="flex h-12 items-center justify-center rounded-full border border-night/15 text-sm font-semibold text-night"
            >
              Réessayer
            </Link>
          ) : null}
        </div>
      </div>
    </main>
  );
}

export default function ImpactMerciPage() {
  return (
    <Suspense fallback={null}>
      <MerciInner />
    </Suspense>
  );
}
