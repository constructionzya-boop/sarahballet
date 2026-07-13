"use client";

import { useMemo, useState } from "react";
import { makeReferralCode, referralLink, REFERRAL_CREDIT_EUR } from "../lib/referral";

export function ReferralCard() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);
  const [registered, setRegistered] = useState<"idle" | "sending" | "done" | "error">("idle");

  const code = useMemo(() => makeReferralCode(name), [name]);
  const link = useMemo(() => (code ? referralLink(code) : ""), [code]);

  const copy = async () => {
    if (!link) return;
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard indisponible — l'utilisateur copie à la main */
    }
  };

  // Enregistre l'ambassadeur côté serveur pour attribuer les filleuls au code
  // (le crédit se déclenche à la livraison — cf. lib/referral.ts).
  const register = async () => {
    if (!code) return;
    setRegistered("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          kind: "ambassadeur",
          name,
          email: email || undefined,
          code,
        }),
      });
      setRegistered(res.ok ? "done" : "error");
    } catch {
      setRegistered("error");
    }
  };

  return (
    <div className="rounded-3xl bg-white p-6 shadow-soft">
      <p className="text-xs font-semibold uppercase tracking-widest text-dawn">
        Générer mon code
      </p>
      <input
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setCopied(false);
        }}
        placeholder="Votre prénom ou pseudo"
        className="mt-3 w-full rounded-xl border border-night/15 px-4 py-3 text-sm outline-none focus:border-night/40"
      />

      {code ? (
        <div className="mt-4 flex flex-col gap-3">
          <div className="flex items-center justify-between rounded-2xl bg-night p-4 text-cream">
            <div>
              <p className="text-[11px] uppercase tracking-widest text-dew">Votre code</p>
              <p className="text-xl font-black tabular-nums">{code}</p>
            </div>
            <span className="text-right text-sm text-cream/70">
              {REFERRAL_CREDIT_EUR} € par filleul livré
            </span>
          </div>
          <div className="flex gap-2">
            <input
              readOnly
              value={link}
              className="flex-1 rounded-xl border border-night/15 bg-snow px-3 py-2 text-xs text-night/70"
            />
            <button
              type="button"
              onClick={copy}
              className="rounded-xl bg-orange px-4 py-2 text-sm font-semibold text-white transition-[filter] hover:brightness-110 active:scale-95"
            >
              {copied ? "Copié ✓" : "Copier"}
            </button>
          </div>

          {/* Enregistrement de l'ambassadeur (attribution des filleuls) */}
          {registered === "done" ? (
            <p className="rounded-xl bg-snow p-3 text-sm text-night/70">
              Ambassadeur enregistré — vos filleuls seront rattachés à{" "}
              <span className="font-semibold text-night">{code}</span>.
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email (optionnel — pour suivre vos crédits)"
                className="w-full rounded-xl border border-night/15 px-4 py-2.5 text-sm outline-none focus:border-night/40"
              />
              <button
                type="button"
                onClick={register}
                disabled={registered === "sending"}
                className="rounded-xl border border-night/15 px-4 py-2.5 text-sm font-semibold text-night transition-colors hover:bg-snow disabled:opacity-60"
              >
                {registered === "sending"
                  ? "Enregistrement…"
                  : "M'enregistrer comme ambassadeur"}
              </button>
              {registered === "error" ? (
                <p className="text-xs font-medium text-orange">
                  Enregistrement impossible — réessayez.
                </p>
              ) : null}
            </div>
          )}
        </div>
      ) : (
        <p className="mt-3 text-sm text-night/50">
          Saisissez un prénom pour obtenir votre lien de parrainage unique.
        </p>
      )}
    </div>
  );
}
