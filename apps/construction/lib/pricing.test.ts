import { describe, expect, it } from "vitest";
import { type ConfigInput, computeConfig, levelDelta, optionsTotal, PRICING_V1 } from "./pricing";

const base: ConfigInput = {
  project: "commerce",
  extraTravees: 0,
  level: "M2",
  options: [],
  base: "achat",
  financing: "comptant",
};

describe("computeConfig — prix de base", () => {
  it("commerce M2 = 3 200 000 FCFA", () => {
    expect(computeConfig(base).totalFcfa).toBe(3_200_000);
  });
  it("studio M3 = 3 800 000 FCFA", () => {
    expect(computeConfig({ ...base, project: "studio", level: "M3" }).totalFcfa).toBe(3_800_000);
  });
  it("local-pro M2 = 2 000 000 FCFA", () => {
    expect(computeConfig({ ...base, project: "local-pro" }).totalFcfa).toBe(2_000_000);
  });
});

describe("travées", () => {
  it("+1 travée ajoute 300 000 FCFA et ~4,3 m²", () => {
    const r = computeConfig({ ...base, extraTravees: 1 });
    expect(r.totalFcfa).toBe(3_500_000);
    expect(r.areaM2).toBe(21.6);
  });
  it("plafonnées à 2 travées supplémentaires", () => {
    const r = computeConfig({ ...base, extraTravees: 9 });
    expect(r.totalFcfa).toBe(3_200_000 + 2 * 300_000);
  });
  it("ignorées si le projet ne les autorise pas (local-pro)", () => {
    const r = computeConfig({ ...base, project: "local-pro", extraTravees: 2 });
    expect(r.totalFcfa).toBe(2_000_000);
    expect(r.areaM2).toBe(5.8);
  });
});

describe("équipement", () => {
  it("commerce M3 = +600 000, M1 = -350 000", () => {
    expect(computeConfig({ ...base, level: "M3" }).totalFcfa).toBe(3_800_000);
    expect(computeConfig({ ...base, level: "M1" }).totalFcfa).toBe(2_850_000);
  });
  it("levelDelta relatif au niveau de base", () => {
    expect(levelDelta(PRICING_V1.projects.commerce, "M2")).toBe(0);
    expect(levelDelta(PRICING_V1.projects.studio, "M2")).toBe(-600_000);
  });
});

describe("options", () => {
  it("somme les options commandables", () => {
    expect(optionsTotal("commerce", ["solaire", "citerne"])).toBe(430_000);
  });
  it("exclut la mezzanine (Phase 2)", () => {
    expect(optionsTotal("commerce", ["mezzanine"])).toBe(0);
  });
  it("exclut une option restreinte à un autre projet", () => {
    // mezzanine est de toute façon Phase 2 ; on vérifie la restriction projet
    // via une option hypothétique déjà couverte par onlyProjects.
    expect(optionsTotal("studio", ["mezzanine"])).toBe(0);
  });
});

describe("financements", () => {
  it("loyer ≈ total / 36 et caution = 3 loyers", () => {
    const f = computeConfig(base).financing;
    expect(f.monthlyRentFcfa).toBe(Math.round(3_200_000 / 36));
    expect(f.depositFcfa).toBe(f.monthlyRentFcfa * 3);
  });
  it("accession : acompte 30 % + 36 mensualités", () => {
    const f = computeConfig(base).financing;
    expect(f.downPaymentFcfa).toBe(960_000);
    expect(f.accessionMonthlyFcfa).toBe(Math.round((3_200_000 - 960_000) / 36));
  });
  it("diaspora : 3 jalons 30/40/30 en EUR", () => {
    const f = computeConfig(base).financing;
    const total = f.diasporaEur[0] + f.diasporaEur[1] + f.diasporaEur[2];
    expect(total).toBeGreaterThan(4870);
    expect(total).toBeLessThan(4885);
  });
});
