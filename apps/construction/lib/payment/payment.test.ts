import { describe, it, expect } from "vitest";
import { toMinor, fromMinor, fcfaToMinor, formatMinor } from "./money";
import { splitMilestones, milestonesFor, paidRatio, MILESTONES } from "./milestones";
import {
  createOrder,
  transition,
  applyWebhookEvent,
  canStartProduction,
  canSchedulePose,
  OrderTransitionError,
  type Order,
} from "./order";

describe("money multi-devises", () => {
  it("EUR = 2 décimales (centimes)", () => {
    expect(toMinor("eur", 12.5)).toBe(1250);
    expect(fromMinor("eur", 1250)).toBe(12.5);
  });
  it("XOF = zero-decimal (franc = unité mineure)", () => {
    expect(toMinor("xof", 3_200_000)).toBe(3_200_000);
    expect(fromMinor("xof", 3_200_000)).toBe(3_200_000);
  });
  it("conversion FCFA → EUR via parité fixe", () => {
    expect(fcfaToMinor("xof", 3_200_000)).toBe(3_200_000);
    // 3 200 000 / 655,957 ≈ 4878,37 € → 487837 centimes
    expect(fcfaToMinor("eur", 3_200_000)).toBe(487837);
  });
  it("formate correctement", () => {
    expect(formatMinor("eur", 1250)).toContain("12,50");
    expect(formatMinor("xof", 3_200_000)).toContain("FCFA");
  });
});

describe("jalons 30/40/30", () => {
  it("la somme des jalons == total (dernier absorbe l'arrondi)", () => {
    for (const total of [1000, 3_200_001, 487806, 999_999]) {
      const parts = splitMilestones(total);
      expect(parts.reduce((s, p) => s + p.amountMinor, 0)).toBe(total);
    }
  });
  it("respecte les parts 30/40/30", () => {
    const parts = splitMilestones(1_000_000);
    expect(parts[0]!.amountMinor).toBe(300_000);
    expect(parts[1]!.amountMinor).toBe(400_000);
    expect(parts[2]!.amountMinor).toBe(300_000);
  });
  it("paidRatio cumule les parts", () => {
    expect(paidRatio(["acompte"])).toBeCloseTo(0.3);
    expect(paidRatio(["acompte", "fabrication"])).toBeCloseTo(0.7);
    expect(paidRatio(["acompte", "fabrication", "solde"])).toBeCloseTo(1);
  });
  it("milestonesFor calcule en devise", () => {
    const parts = milestonesFor("eur", 100);
    expect(parts.reduce((s, p) => s + p.amountMinor, 0)).toBe(10000);
  });
});

function drive(order: Order, events: Parameters<typeof transition>[1][]): Order {
  return events.reduce((o, e) => transition(o, e), order);
}

describe("state machine — parcours nominal", () => {
  it("déroule COMMANDE → LIVRE en respectant la séquence", () => {
    const o0 = createOrder({ id: "o1", currency: "eur", totalMinor: 10000 });
    const final = drive(o0, [
      { type: "PAYMENT_CONFIRMED", milestone: "acompte" },
      { type: "PRODUCTION_STARTED" },
      { type: "PHOTOS_UPLOADED" },
      { type: "PAYMENT_CONFIRMED", milestone: "fabrication" },
      { type: "POSE_SCHEDULED" },
      { type: "PAYMENT_CONFIRMED", milestone: "solde" },
      { type: "DELIVERED" },
    ]);
    expect(final.status).toBe("LIVRE");
    expect(final.paidMilestones).toEqual(["acompte", "fabrication", "solde"]);
  });
});

describe("state machine — gardes dures", () => {
  it("refuse la production sans acompte encaissé", () => {
    const o = createOrder({ id: "o2", currency: "eur", totalMinor: 10000 });
    expect(() => transition(o, { type: "PRODUCTION_STARTED" })).toThrow(OrderTransitionError);
    expect(canStartProduction(o)).toBe(false);
  });

  it("refuse la pose sous 70 % encaissé", () => {
    // On force JALON2_OK mais sans le jalon fabrication payé → paidRatio 30 %.
    const o = createOrder({ id: "o3", currency: "eur", totalMinor: 10000 });
    const afterAcompte = transition(o, { type: "PAYMENT_CONFIRMED", milestone: "acompte" });
    const prod = transition(afterAcompte, { type: "PRODUCTION_STARTED" });
    const photos = transition(prod, { type: "PHOTOS_UPLOADED" });
    const jalon2 = transition(photos, { type: "PAYMENT_CONFIRMED", milestone: "fabrication" });
    // ici paidRatio = 70 % → pose autorisée
    expect(canSchedulePose(jalon2)).toBe(true);
    expect(transition(jalon2, { type: "POSE_SCHEDULED" }).status).toBe("POSE");
  });

  it("refuse un jalon fabrication avant les photos", () => {
    const o = createOrder({ id: "o4", currency: "eur", totalMinor: 10000 });
    const a = transition(o, { type: "PAYMENT_CONFIRMED", milestone: "acompte" });
    expect(() =>
      transition(a, { type: "PAYMENT_CONFIRMED", milestone: "fabrication" }),
    ).toThrow(OrderTransitionError);
  });

  it("annule depuis un état non terminal, mais pas après livraison", () => {
    const o = createOrder({ id: "o5", currency: "eur", totalMinor: 10000 });
    expect(transition(o, { type: "CANCELLED" }).status).toBe("ANNULE");
    const delivered = drive(o, [
      { type: "PAYMENT_CONFIRMED", milestone: "acompte" },
      { type: "PRODUCTION_STARTED" },
      { type: "PHOTOS_UPLOADED" },
      { type: "PAYMENT_CONFIRMED", milestone: "fabrication" },
      { type: "POSE_SCHEDULED" },
      { type: "PAYMENT_CONFIRMED", milestone: "solde" },
      { type: "DELIVERED" },
    ]);
    expect(() => transition(delivered, { type: "CANCELLED" })).toThrow(OrderTransitionError);
  });
});

describe("idempotence webhook", () => {
  it("un même eventId n'est appliqué qu'une fois", () => {
    const o = createOrder({ id: "o6", currency: "eur", totalMinor: 10000 });
    const once = applyWebhookEvent(o, "evt_1", {
      type: "PAYMENT_CONFIRMED",
      milestone: "acompte",
    });
    const twice = applyWebhookEvent(once, "evt_1", {
      type: "PAYMENT_CONFIRMED",
      milestone: "acompte",
    });
    expect(twice).toBe(once); // no-op strict
    expect(twice.paidMilestones).toEqual(["acompte"]);
    expect(twice.processedEventIds).toEqual(["evt_1"]);
  });

  it("des eventId distincts avancent le dossier", () => {
    const o = createOrder({ id: "o7", currency: "eur", totalMinor: 10000 });
    const a = applyWebhookEvent(o, "evt_a", { type: "PAYMENT_CONFIRMED", milestone: "acompte" });
    expect(a.status).toBe("ACOMPTE_OK");
    expect(a.processedEventIds).toEqual(["evt_a"]);
  });
});
