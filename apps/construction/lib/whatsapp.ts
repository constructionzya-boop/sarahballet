// Génère le récapitulatif texte d'une configuration + le lien wa.me.
// Pur (pas de dépendance React) — réutilisable partout.

import { PLACEHOLDER_WHATSAPP } from "./constants";
import {
  type ConfigInput,
  type ConfigResult,
  type Financing,
  type Level,
  type BaseType,
  type OptionId,
  PRICING_V1,
  formatEur,
  formatFcfa,
} from "./pricing";

const LEVEL_LABEL: Record<Level, string> = {
  M1: "M1 — brut",
  M2: "M2 — électricité",
  M3: "M3 — eau + électricité",
};

const BASE_LABEL: Record<BaseType, string> = {
  achat: "Achat — dalle définitive",
  location: "Location — skid démontable",
};

const FINANCING_LABEL: Record<Financing, string> = {
  comptant: "Achat comptant",
  location: "Location (loyer mensuel)",
  accession: "Location-accession (30 % + 36 mois)",
  diaspora: "Diaspora — 3 jalons (30/40/30)",
};

function optionLabel(id: OptionId): string {
  return PRICING_V1.options.find((o) => o.id === id)?.label ?? id;
}

function financingLines(input: ConfigInput, r: ConfigResult): string {
  const f = r.financing;
  switch (input.financing) {
    case "location":
      return `Loyer : ${formatFcfa(f.monthlyRentFcfa)}/mois (caution ${formatFcfa(f.depositFcfa)})`;
    case "accession":
      return `Acompte : ${formatFcfa(f.downPaymentFcfa)} puis ${formatFcfa(f.accessionMonthlyFcfa)}/mois sur 36 mois`;
    case "diaspora":
      return `Jalons diaspora : ${formatEur(f.diasporaEur[0])} / ${formatEur(f.diasporaEur[1])} / ${formatEur(f.diasporaEur[2])}`;
    default:
      return `Total : ${formatFcfa(f.totalFcfa)} (${formatEur(r.totalEur)})`;
  }
}

/** Construit le message texte complet à pré-remplir dans WhatsApp. */
export function buildWhatsAppRecap(input: ConfigInput, r: ConfigResult): string {
  const opts = input.options.filter((id) =>
    PRICING_V1.options.some((o) => o.id === id && !o.phase2),
  );
  const lines = [
    "Bonjour Noéma, voici mon projet configuré :",
    "",
    `• Projet : ${r.project.name} (${r.project.offer})`,
    `• Surface : ${r.areaM2} m²`,
    `• Équipement : ${LEVEL_LABEL[r.level]}`,
    `• Assise : ${BASE_LABEL[input.base]}`,
    opts.length ? `• Options : ${opts.map(optionLabel).join(", ")}` : "• Options : aucune",
    `• Paiement : ${FINANCING_LABEL[input.financing]}`,
    "",
    financingLines(input, r),
    `(Prix indicatif — grille V${r.pricingVersion}. Devis exact gratuit.)`,
  ];
  return lines.join("\n");
}

/** Lien wa.me avec message pré-rempli. */
export function whatsappHref(message: string, phone: string = PLACEHOLDER_WHATSAPP): string {
  return `https://wa.me/${phone.replace(/[^\d]/g, "")}?text=${encodeURIComponent(message)}`;
}
