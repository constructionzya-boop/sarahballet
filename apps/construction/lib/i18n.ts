// lib/i18n.ts — Scaffold i18n. Le site est en français ; la structure permet
// d'ajouter l'anglais (diaspora anglophone, partenaires Chine) sans refonte.
//
// Usage : t("nav.modules") ; par défaut locale "fr". La bascule de locale
// (routing /en, header Accept-Language) sera câblée en V2 — les dictionnaires
// et le helper sont prêts.

export type Locale = "fr" | "en";
export const LOCALES: readonly Locale[] = ["fr", "en"];
export const DEFAULT_LOCALE: Locale = "fr";

type Dict = Record<string, string>;

const fr: Dict = {
  "nav.modules": "Modules",
  "nav.configure": "Configurer",
  "nav.impact": "Impact",
  "nav.investors": "Investisseurs",
  "cta.reserve": "Réserver avec 30 % d'acompte",
  "cta.whatsapp": "Recevoir ce devis sur WhatsApp",
  "price.launch": "Prix de lancement",
  "price.indicative": "indicatif — devis exact gratuit",
  "disclaimer.v1": "Hypothèse V1 à valider par ingénieur structure agréé.",
};

// Anglais : squelette à compléter en V2 (fallback fr en attendant).
const en: Partial<Dict> = {
  "nav.modules": "Modules",
  "nav.configure": "Configure",
  "nav.impact": "Impact",
  "nav.investors": "Investors",
};

const DICTS: Record<Locale, Partial<Dict>> = { fr, en };

/** Traduit une clé pour une locale, avec repli sur le français puis la clé. */
export function t(key: keyof typeof fr, locale: Locale = DEFAULT_LOCALE): string {
  return DICTS[locale]?.[key] ?? fr[key] ?? String(key);
}
