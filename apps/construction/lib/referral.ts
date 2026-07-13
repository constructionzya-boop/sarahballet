// lib/referral.ts — Programme ambassadeurs diaspora (parrainage tracké).
//
// 100 € de crédit par filleul LIVRÉ (pas seulement inscrit) — le crédit se
// déclenche à la livraison pour aligner l'incitation sur la valeur réelle.

import { SITE_URL } from "./constants";

export const REFERRAL_CREDIT_EUR = 100;

/** Hash déterministe (djb2) → base36, pour un code stable sans état serveur. */
function hash36(input: string): string {
  let h = 5381;
  for (let i = 0; i < input.length; i++) {
    h = (h * 33) ^ input.charCodeAt(i);
  }
  return (h >>> 0).toString(36).toUpperCase().slice(0, 4).padStart(4, "0");
}

/** Slug alphanumérique majuscule d'un prénom/pseudo. */
function slug(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toUpperCase()
    .slice(0, 8);
}

/** Code de parrainage stable, ex. « AMINA-3F7K ». Vide si nom trop court. */
export function makeReferralCode(name: string): string {
  const s = slug(name);
  if (s.length < 2) return "";
  return `${s}-${hash36(s + "noema")}`;
}

/** Lien de parrainage partageable. */
export function referralLink(code: string, origin = SITE_URL): string {
  return `${origin}/configurer?ref=${encodeURIComponent(code)}`;
}

export interface AmbassadorRow {
  rank: number;
  name: string;
  filleuls: number;
  creditEur: number;
}

/** Leaderboard (données de démonstration — à brancher sur Connect en V2). */
export const LEADERBOARD: readonly AmbassadorRow[] = [
  { rank: 1, name: "Aminata K.", filleuls: 7, creditEur: 700 },
  { rank: 2, name: "Yao B.", filleuls: 5, creditEur: 500 },
  { rank: 3, name: "Fatou D.", filleuls: 4, creditEur: 400 },
  { rank: 4, name: "Kouassi N.", filleuls: 3, creditEur: 300 },
  { rank: 5, name: "Awa T.", filleuls: 2, creditEur: 200 },
].map((r) => ({ ...r, creditEur: r.filleuls * REFERRAL_CREDIT_EUR }));
