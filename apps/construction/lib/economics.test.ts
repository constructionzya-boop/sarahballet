import { describe, it, expect } from "vitest";
import {
  MODULE_COST,
  LTV_PARAMS,
  contributionMargin,
  atelierFixedMonthly,
  breakevenModulesPerMonth,
  ltv,
  ltvCacRatio,
  paybackMonths,
  sensitivity,
} from "./economics";
import { modulePrice } from "./pricing_v2";
import type { ProjectId } from "./pricing";

const PROJECTS: ProjectId[] = ["commerce", "studio", "local-pro"];

describe("economics — cohérence prix catalogue ↔ coûts", () => {
  // Le prix de LANCEMENT (volume 0, marge 20 %) doit tomber sur le « à partir de »
  // publié au catalogue. Verrou anti-régression sur la calibration des coûts.
  it.each([
    ["commerce", 3_200_000],
    ["studio", 3_800_000],
    ["local-pro", 2_000_000],
  ] as const)("%s → prix de lancement %i FCFA", (project, expected) => {
    expect(modulePrice(project, 0).priceFcfa).toBe(expected);
  });
});

describe("economics — parrainage aligné sur la marge de contribution moyenne", () => {
  it("referralMarginPerFilleulFcfa == moyenne des contributions de lancement", () => {
    const avg = Math.round(
      PROJECTS.reduce(
        (s, p) => s + contributionMargin(p, modulePrice(p, 0).priceFcfa),
        0,
      ) / PROJECTS.length,
    );
    expect(LTV_PARAMS.referralMarginPerFilleulFcfa).toBe(avg);
    expect(avg).toBe(600_000);
  });
});

describe("economics — point mort & LTV", () => {
  it("le point mort est fini et positif à contribution moyenne", () => {
    const avg = Math.round(
      PROJECTS.reduce((s, p) => s + contributionMargin(p, modulePrice(p, 0).priceFcfa), 0) /
        PROJECTS.length,
    );
    const be = breakevenModulesPerMonth(avg);
    expect(be).toBeGreaterThan(0);
    expect(Number.isFinite(be)).toBe(true);
    // Cohérent avec les charges fixes / la contribution moyenne.
    expect(be).toBe(Math.ceil(atelierFixedMonthly() / avg));
  });

  it("point mort infini si contribution nulle ou négative", () => {
    expect(breakevenModulesPerMonth(0)).toBe(Infinity);
    expect(breakevenModulesPerMonth(-1)).toBe(Infinity);
  });

  it("LTV/CAC de chaque offre reste dans une plage saine (> 3)", () => {
    for (const p of PROJECTS) {
      const price = modulePrice(p, 0).priceFcfa;
      expect(ltv(p, price).totalFcfa).toBeGreaterThan(contributionMargin(p, price));
      expect(ltvCacRatio(p, price)).toBeGreaterThan(3);
    }
  });
});

describe("economics — sensibilité", () => {
  it("un choc ciment +15 % réduit la contribution, un choc −15 % l'augmente", () => {
    const price = modulePrice("commerce", 0).priceFcfa;
    const up = sensitivity("commerce", price, 8, 0.15, 0);
    const down = sensitivity("commerce", price, 8, -0.15, 0);
    expect(up.newContributionFcfa).toBeLessThan(up.baseContributionFcfa);
    expect(down.newContributionFcfa).toBeGreaterThan(down.baseContributionFcfa);
    // Le choc ne porte que sur les matériaux.
    const materials = MODULE_COST.commerce.materialsFcfa;
    expect(up.contributionDeltaFcfa).toBe(-Math.round(materials * 0.15));
  });

  it("un effondrement de volume peut rendre le résultat mensuel négatif", () => {
    const price = modulePrice("local-pro", 0).priceFcfa;
    const s = sensitivity("local-pro", price, 4, 0, -0.5);
    expect(s.monthlyOperatingResultFcfa).toBeLessThan(
      sensitivity("local-pro", price, 4, 0, 0).monthlyOperatingResultFcfa,
    );
  });

  it("payback client cohérent avec la valeur mensuelle", () => {
    const price = modulePrice("commerce", 0).priceFcfa;
    expect(paybackMonths("commerce", price)).toBe(Math.ceil(price / 180_000));
  });
});
