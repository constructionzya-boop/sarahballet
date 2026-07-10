import { describe, expect, it } from "vitest";
import { type ModuleConfig, moduleCounts } from "./moduleBuilder";

const base: ModuleConfig = {
  preset: "commerce",
  extraTravees: 0,
  level: "M2",
  base: "achat",
  options: [],
};

describe("moduleCounts — poteaux", () => {
  it("commerce 3,6×4,8 = 14 poteaux", () => {
    expect(moduleCounts(base).poteaux).toBe(14);
  });
  it("studio 3,6×4,8 = 14 poteaux", () => {
    expect(moduleCounts({ ...base, preset: "studio", level: "M3" }).poteaux).toBe(14);
  });
  it("local-pro 2,4×2,4 = 8 poteaux", () => {
    expect(moduleCounts({ ...base, preset: "local-pro" }).poteaux).toBe(8);
  });
});

describe("moduleCounts — extension d'une travée", () => {
  it("+1 travée ajoute 2 poteaux", () => {
    const b = moduleCounts(base).poteaux;
    const e = moduleCounts({ ...base, extraTravees: 1 }).poteaux;
    expect(e - b).toBe(2);
  });
  it("+1 travée ajoute 10 panneaux (8 P1 + 2 P2)", () => {
    const b = moduleCounts(base);
    const e = moduleCounts({ ...base, extraTravees: 1 });
    expect(e.panels - b.panels).toBe(10);
    expect(e.p1 - b.p1).toBe(8);
    expect(e.p2 - b.p2).toBe(2);
  });
});

describe("moduleCounts — ouvertures par preset", () => {
  it("commerce : 1 porte + 2 fenêtres en façade", () => {
    const c = moduleCounts(base);
    expect(c.doors).toBe(1);
    expect(c.windows).toBe(2);
  });
  it("gardiennage : porte + fenêtres sur 3 faces", () => {
    const c = moduleCounts({ ...base, preset: "local-pro" });
    expect(c.doors).toBe(1);
    expect(c.windows).toBeGreaterThanOrEqual(2);
  });
});
