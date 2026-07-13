import { describe, it, expect } from "vitest";
import {
  REGULATED_ENABLED,
  REWARD_TIERS,
  tierForAmount,
  progressPct,
  impactTotals,
  IMPACT_PROJECTS,
  INVEST_DISCLAIMER,
  capabilitiesFor,
} from "./invest";
import { makeReferralCode, referralLink, LEADERBOARD, REFERRAL_CREDIT_EUR } from "./referral";
import { t } from "./i18n";

describe("garde-fou légal", () => {
  it("le mode régulé n'est JAMAIS actif par défaut", () => {
    expect(REGULATED_ENABLED).toBe(false);
  });
  it("chaque mode a un disclaimer non vide", () => {
    for (const key of ["pionniers", "interet", "regule"] as const) {
      expect(INVEST_DISCLAIMER[key].length).toBeGreaterThan(20);
    }
  });
  it("le mode régulé n'active JAMAIS l'offre régulée sans licence", () => {
    // Tant que REGULATED_ENABLED est false, aucun mode ne peut ouvrir le régulé.
    expect(capabilitiesFor("regule").regulated).toBe(REGULATED_ENABLED);
    expect(capabilitiesFor("regule").regulated).toBe(false);
    expect(capabilitiesFor("pionniers").regulated).toBe(false);
    expect(capabilitiesFor("interet").regulated).toBe(false);
  });
  it("les capacités gatent réellement don et intérêt selon le mode", () => {
    expect(capabilitiesFor("pionniers")).toMatchObject({ donation: true, interest: true });
    expect(capabilitiesFor("interet")).toMatchObject({ donation: false, interest: true });
    expect(capabilitiesFor("regule").donation).toBe(false);
  });
});

describe("contreparties de don", () => {
  it("retourne le bon palier selon le montant", () => {
    expect(tierForAmount(10_000)).toBeNull();
    expect(tierForAmount(25_000)?.title).toBe("Bâtisseur");
    expect(tierForAmount(120_000)?.title).toBe("Bâtisseur+");
    expect(tierForAmount(1_000_000)?.title).toBe("Partenaire");
  });
  it("les paliers sont croissants", () => {
    for (let i = 1; i < REWARD_TIERS.length; i++) {
      expect(REWARD_TIERS[i]!.minFcfa).toBeGreaterThan(REWARD_TIERS[i - 1]!.minFcfa);
    }
  });
});

describe("progression des projets", () => {
  it("progressPct est borné 0..100", () => {
    expect(progressPct({ raisedFcfa: 0, goalFcfa: 100 })).toBe(0);
    expect(progressPct({ raisedFcfa: 250, goalFcfa: 100 })).toBe(100);
    expect(progressPct({ raisedFcfa: 50, goalFcfa: 100 })).toBe(50);
    expect(progressPct({ raisedFcfa: 10, goalFcfa: 0 })).toBe(0);
  });
  it("aucun projet ne dépasse déjà son objectif de façon incohérente", () => {
    for (const p of IMPACT_PROJECTS) {
      expect(p.raisedFcfa).toBeGreaterThanOrEqual(0);
      expect(p.goalFcfa).toBeGreaterThan(0);
    }
  });
  it("impactTotals agrège correctement", () => {
    const totals = impactTotals();
    expect(totals.projects).toBe(IMPACT_PROJECTS.length);
    expect(totals.raisedFcfa).toBe(IMPACT_PROJECTS.reduce((s, p) => s + p.raisedFcfa, 0));
  });
});

describe("parrainage", () => {
  it("génère un code stable et déterministe", () => {
    const a = makeReferralCode("Aminata");
    const b = makeReferralCode("Aminata");
    expect(a).toBe(b);
    expect(a).toMatch(/^AMINATA-[A-Z0-9]{4}$/);
  });
  it("gère les accents et caractères spéciaux", () => {
    const code = makeReferralCode("Fatou-Bâ");
    expect(code).toMatch(/^[A-Z0-9]+-[A-Z0-9]{4}$/);
  });
  it("renvoie vide pour un nom trop court", () => {
    expect(makeReferralCode("A")).toBe("");
  });
  it("le lien contient le code encodé", () => {
    expect(referralLink("AMINA-3F7K")).toContain("ref=AMINA-3F7K");
  });
  it("le crédit du leaderboard = filleuls × crédit unitaire", () => {
    for (const r of LEADERBOARD) {
      expect(r.creditEur).toBe(r.filleuls * REFERRAL_CREDIT_EUR);
    }
  });
});

describe("i18n", () => {
  it("renvoie le français par défaut", () => {
    expect(t("nav.modules")).toBe("Modules");
  });
  it("renvoie la traduction anglaise quand elle existe", () => {
    expect(t("price.launch", "en")).toBe("Launch price");
    expect(t("cta.reserve", "en")).toBe("Reserve with a 30% deposit");
  });
  it("retombe sur le français puis la clé si la traduction manque", () => {
    // @ts-expect-error — clé volontairement inexistante pour tester le repli.
    expect(t("cle.inexistante", "en")).toBe("cle.inexistante");
  });
});
