"use client";

import { useState } from "react";

type Profile = "fonds" | "family-office" | "business-angel" | "autre";

const PROFILES: { id: Profile; label: string }[] = [
  { id: "fonds", label: "Fonds" },
  { id: "family-office", label: "Family office" },
  { id: "business-angel", label: "Business angel" },
  { id: "autre", label: "Autre" },
];

/**
 * Formulaire de manifestation d'intérêt / accès data room.
 * `kind` = "interet" (Noéma Impact) ou "dataroom" (espace investisseurs).
 */
export function InterestForm({
  kind = "interet",
  submitLabel = "Envoyer ma manifestation d'intérêt",
}: {
  kind?: "interet" | "dataroom";
  submitLabel?: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [profile, setProfile] = useState<Profile>("business-angel");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setStatus("sending");
    try {
      const ticket = Number(form.get("ticket"));
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          kind,
          name: String(form.get("name") ?? ""),
          email: String(form.get("email") ?? ""),
          profile,
          ticketEur: Number.isFinite(ticket) && ticket > 0 ? Math.round(ticket) : undefined,
          horizon: String(form.get("horizon") ?? "") || undefined,
          message: String(form.get("message") ?? "") || undefined,
          consent: form.get("consent") === "on",
          // Honeypot : rempli uniquement par les bots — laissé vide par les humains.
          company_url: String(form.get("company_url") ?? ""),
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="rounded-2xl bg-night p-6 text-cream">
        <p className="text-lg font-black">Bien reçu — merci.</p>
        <p className="mt-1 text-sm text-cream/70">
          Nous revenons vers vous rapidement.{" "}
          {kind === "dataroom" ? "Accès data room sous 48 h ouvrées." : ""}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 rounded-2xl bg-white p-6 shadow-soft">
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          name="name"
          required
          placeholder="Nom / structure"
          className="rounded-xl border border-night/15 px-4 py-3 text-sm outline-none focus:border-night/40"
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          className="rounded-xl border border-night/15 px-4 py-3 text-sm outline-none focus:border-night/40"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {PROFILES.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setProfile(p.id)}
            className={`rounded-full px-3 py-1.5 text-sm font-semibold transition-colors ${
              profile === p.id ? "bg-night text-cream" : "bg-snow text-night/70 hover:bg-cream"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <input
          name="ticket"
          type="number"
          inputMode="numeric"
          min={0}
          step={1000}
          placeholder="Ticket envisagé (€)"
          className="rounded-xl border border-night/15 px-4 py-3 text-sm tabular-nums outline-none focus:border-night/40"
        />
        <input
          name="horizon"
          placeholder="Horizon (ex. 3-5 ans)"
          className="rounded-xl border border-night/15 px-4 py-3 text-sm outline-none focus:border-night/40"
        />
      </div>

      <textarea
        name="message"
        rows={3}
        placeholder="Un mot (optionnel)"
        className="rounded-xl border border-night/15 px-4 py-3 text-sm outline-none focus:border-night/40"
      />

      {/* Honeypot anti-spam : masqué aux humains, ignoré des lecteurs d'écran. */}
      <input
        type="text"
        name="company_url"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <label className="flex items-start gap-2 text-[12px] text-night/60">
        <input type="checkbox" name="consent" required className="mt-0.5 accent-orange" />
        <span>
          J&apos;accepte que Noéma conserve ces informations pour me recontacter au sujet de
          l&apos;investissement. Aucune cession à des tiers.
        </span>
      </label>

      {status === "error" ? (
        <p className="text-sm font-medium text-orange">Envoi impossible — réessayez.</p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="flex h-12 items-center justify-center rounded-full bg-orange text-sm font-semibold text-white transition-[filter] hover:brightness-110 active:scale-95 disabled:opacity-60"
      >
        {status === "sending" ? "Envoi…" : submitLabel}
      </button>
      <p className="text-[11px] text-night/50">
        Sans engagement. Ceci n&apos;est pas une offre de titres financiers.
      </p>
    </form>
  );
}
