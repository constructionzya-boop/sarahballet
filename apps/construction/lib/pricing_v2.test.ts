import { describe, it, expect } from "vitest";
import {
  PRICING_TIERS,
  tierForVolume,
  modulesUntilNextTier,
  priceFromCost,
  modulePrice,
  lockedPrice,
  computeWinWin,
} from "./pricing_v2";
import {
  MODULE_COST,
  costTotal,
  contributionMargin,
  breakevenModulesPerMonth,
  atelierFixedMonthly,
  ltv,
  ltvCacRatio,
  paybackMonths,
  sensitivity,
  MODULE_VALUE,
} from "./economics";

describe("paliers de volume", () => {
  it("classe le volume dans le bon palier", () => {
    expect(tierForVolume(0).id).toBe("lancement");
    expect(tierForVolume(50).id).toBe("lancement");
    expect(tierForVolume(51).id).toBe("croissance");
    expect(tierForVolume(200).id).toBe("croissance");
    expect(tierForVolume(201).id).toBe("etabli");
    expect(tierForVolume(99999).id).toBe("etabli");
  });

  it("gère les volumes négatifs comme lancement", () => {
    expect(tierForVolume(-5).id).toBe("lancement");
  });

  it("les paliers sont contigus et couvrent [0, ∞)", () => {
    PRICING_TIERS.forEach((t, i) => {
      if (i === 0) return;
      const prev = PRICING_TIERS[i - 1]!;
      expect(t.minVolume).toBe(prev.maxVolume + 1);
    });
    expect(PRICING_TIERS.at(-1)!.maxVolume).toBe(Infinity);
  });

  it("compte les modules restants avant bascule", () => {
    expect(modulesUntilNextTier(0)).toBe(51);
    expect(modulesUntilNextTier(50)).toBe(1);
    expect(modulesUntilNextTier(201)).toBeNull();
  });
});

describe("cost-plus", () => {
  it("prix = coût / (1 − marge), arrondi au millier supérieur", () => {
    // coût 800 000, marge 20 % → 1 000 000
    expect(priceFromCost(800_000, 0.2)).toBe(1_000_000);
  });

  it("la marge brute réalisée est au moins la cible", () => {
    for (const project of Object.keys(MODULE_COST) as (keyof typeof MODULE_COST)[]) {
      const p = modulePrice(project, 0);
      expect(p.grossMarginPct).toBeGreaterThanOrEqual(20);
      // l'arrondi ne fait jamais chuter sous la cible du palier
      expect(p.grossMarginPct).toBeLessThan(25);
    }
  });

  it("le prix monte strictement avec les paliers", () => {
    const lancement = modulePrice("commerce", 10).priceFcfa;
    const croissance = modulePrice("commerce", 100).priceFcfa;
    const etabli = modulePrice("commerce", 500).priceFcfa;
    expect(croissance).toBeGreaterThan(lancement);
    expect(etabli).toBeGreaterThan(croissance);
  });

  it("rejette une marge ≥ 100 %", () => {
    expect(() => priceFromCost(100, 1)).toThrow();
  });
});

describe("early-adopter lock-in", () => {
  it("un prix verrouillé au lancement ne subit jamais la hausse", () => {
    const locked = lockedPrice("commerce", "lancement", 500); // volume actuel = palier établi
    const atLaunch = modulePrice("commerce", 0).priceFcfa;
    expect(locked).toBe(atLaunch);
  });

  it("ne facture jamais plus que le prix courant", () => {
    // verrou « établi » mais volume encore au lancement → on paie le prix courant (plus bas)
    const locked = lockedPrice("commerce", "etabli", 0);
    const current = modulePrice("commerce", 0).priceFcfa;
    expect(locked).toBe(current);
  });
});

describe("win-win", () => {
  it("les parts de coût + marge somment ~100 %", () => {
    const price = modulePrice("commerce", 0).priceFcfa;
    const { monthlyValueFcfa, valueLabel } = MODULE_VALUE.commerce;
    const w = computeWinWin("commerce", price, monthlyValueFcfa, valueLabel);
    const sum =
      w.noema.materialsPct +
      w.noema.laborPct +
      w.noema.logisticsPct +
      w.noema.equipmentPct +
      w.noema.marginPct;
    expect(Math.abs(sum - 100)).toBeLessThanOrEqual(0.5);
  });

  it("le payback est positif et fini pour une valeur mensuelle > 0", () => {
    const price = modulePrice("studio", 0).priceFcfa;
    const w = computeWinWin("studio", price, MODULE_VALUE.studio.monthlyValueFcfa, "loyer");
    expect(w.client.paybackMonths).toBeGreaterThan(0);
    expect(Number.isFinite(w.client.paybackMonths)).toBe(true);
  });
});

describe("unit economics", () => {
  it("marge de contribution = prix − coût variable", () => {
    const price = modulePrice("commerce", 0).priceFcfa;
    expect(contributionMargin("commerce", price)).toBe(price - costTotal(MODULE_COST.commerce));
  });

  it("point mort atelier cohérent avec les charges fixes", () => {
    const avg = 640_000;
    expect(breakevenModulesPerMonth(avg)).toBe(Math.ceil(atelierFixedMonthly() / avg));
    expect(breakevenModulesPerMonth(0)).toBe(Infinity);
  });

  it("LTV > CAC (ratio santé > 3)", () => {
    const price = modulePrice("commerce", 0).priceFcfa;
    expect(ltvCacRatio("commerce", price)).toBeGreaterThan(3);
    expect(ltv("commerce", price).totalFcfa).toBeGreaterThan(0);
  });

  it("payback plus court quand la valeur mensuelle est plus élevée", () => {
    const price = 3_000_000;
    expect(paybackMonths("commerce", price)).toBeLessThan(paybackMonths("studio", price));
  });
});

describe("simulateur de sensibilité", () => {
  it("un choc ciment +15 % réduit la contribution", () => {
    const price = modulePrice("commerce", 0).priceFcfa;
    const r = sensitivity("commerce", price, 10, 0.15, 0);
    expect(r.contributionDeltaFcfa).toBeLessThan(0);
    expect(r.newContributionFcfa).toBeLessThan(r.baseContributionFcfa);
  });

  it("un choc volume −50 % dégrade le résultat mensuel", () => {
    const price = modulePrice("commerce", 0).priceFcfa;
    const base = sensitivity("commerce", price, 10, 0, 0);
    const shocked = sensitivity("commerce", price, 10, 0, -0.5);
    expect(shocked.monthlyOperatingResultFcfa).toBeLessThan(base.monthlyOperatingResultFcfa);
  });
});
