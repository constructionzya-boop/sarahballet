"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_PUBLISHABLE_KEY, isCheckoutConfigured } from "../../../lib/stripe/config";

type Status = "loading" | "success" | "processing" | "failed" | "unknown";

const COPY: Record<Status, { title: string; body: string }> = {
  loading: { title: "Vérification du paiement…", body: "Un instant." },
  success: {
    title: "Acompte reçu — merci ! 🎉",
    body: "Votre module est réservé au prix de lancement. Nous vous contactons sur WhatsApp pour la suite (fabrication, photos usine, pose).",
  },
  processing: {
    title: "Paiement en cours de traitement",
    body: "Votre banque finalise l'opération. Vous recevrez une confirmation sous peu.",
  },
  failed: {
    title: "Le paiement n'a pas abouti",
    body: "Aucun montant n'a été débité. Vous pouvez réessayer ou nous écrire sur WhatsApp.",
  },
  unknown: {
    title: "Statut indisponible",
    body: "Nous n'avons pas pu lire le statut du paiement. Contactez-nous si un montant a été débité.",
  },
};

function MerciInner() {
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    if (!isCheckoutConfigured) {
      setStatus("unknown");
      return;
    }
    const params = new URLSearchParams(window.location.search);
    const clientSecret = params.get("payment_intent_client_secret");
    if (!clientSecret) {
      setStatus("unknown");
      return;
    }
    loadStripe(STRIPE_PUBLISHABLE_KEY).then(async (stripe) => {
      if (!stripe) return setStatus("unknown");
      const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
      switch (paymentIntent?.status) {
        case "succeeded":
          return setStatus("success");
        case "processing":
          return setStatus("processing");
        case "requires_payment_method":
          return setStatus("failed");
        default:
          return setStatus("unknown");
      }
    });
  }, []);

  const copy = COPY[status];

  return (
    <main className="mx-auto flex max-w-lg flex-col gap-6 px-3 py-16 text-center sm:px-4">
      <div className="rounded-3xl bg-white p-8 shadow-soft">
        <h1 className="text-2xl font-black tracking-tight text-night">{copy.title}</h1>
        <p className="mt-3 text-night/70">{copy.body}</p>
        <div className="mt-6 flex flex-col gap-2">
          <Link
            href="/"
            className="flex h-12 items-center justify-center rounded-full bg-night text-sm font-semibold text-cream"
          >
            Retour à l&apos;accueil
          </Link>
          {status === "failed" ? (
            <Link
              href="/reserver"
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

export default function MerciPage() {
  return (
    <Suspense fallback={null}>
      <MerciInner />
    </Suspense>
  );
}
