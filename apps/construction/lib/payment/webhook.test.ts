import { describe, it, expect } from "vitest";
import { mapStripeEvent } from "./webhook";

// Fabrique un événement Stripe minimal pour les tests (structure suffisante).
function evt(type: string, object: unknown) {
  return { type, data: { object } };
}

describe("mapStripeEvent", () => {
  it("mappe un jalon de commande vers une transition PAYMENT_CONFIRMED", () => {
    const out = mapStripeEvent(
      evt("payment_intent.succeeded", {
        id: "pi_1",
        amount: 96000,
        currency: "eur",
        metadata: { kind: "order", orderId: "o-1", milestone: "acompte" },
      }),
    );
    expect(out).toEqual({
      kind: "order",
      orderId: "o-1",
      milestone: "acompte",
      event: { type: "PAYMENT_CONFIRMED", milestone: "acompte" },
    });
  });

  it("traite les commandes sans champ kind comme des dossiers (rétrocompat)", () => {
    const out = mapStripeEvent(
      evt("payment_intent.succeeded", {
        id: "pi_2",
        amount: 100,
        currency: "xof",
        metadata: { orderId: "o-2", milestone: "solde" },
      }),
    );
    expect(out.kind).toBe("order");
  });

  it("mappe une contribution Impact vers un incrément de collecte", () => {
    const out = mapStripeEvent(
      evt("payment_intent.succeeded", {
        id: "pi_3",
        amount: 25000,
        currency: "xof",
        metadata: { kind: "impact", projectSlug: "ecole-abobo", contributorName: "Awa" },
      }),
    );
    expect(out).toEqual({
      kind: "impact",
      projectSlug: "ecole-abobo",
      amountMinor: 25000,
      currency: "xof",
      contributorName: "Awa",
    });
  });

  it("ignore un jalon inconnu au lieu de le traiter", () => {
    const out = mapStripeEvent(
      evt("payment_intent.succeeded", {
        id: "pi_4",
        amount: 100,
        currency: "eur",
        metadata: { kind: "order", orderId: "o-4", milestone: "n-importe-quoi" },
      }),
    );
    expect(out.kind).toBe("ignore");
  });

  it("émet un signal anti-fraude sur paiement échoué", () => {
    const out = mapStripeEvent(
      evt("payment_intent.payment_failed", {
        id: "pi_5",
        amount: 100,
        currency: "eur",
        metadata: { orderId: "o-5" },
      }),
    );
    expect(out).toMatchObject({ kind: "signal", signal: "payment_failed", orderId: "o-5" });
  });

  it("émet un signal sur remboursement et sur litige", () => {
    const refund = mapStripeEvent(
      evt("charge.refunded", { id: "ch_1", payment_intent: "pi_6", metadata: { orderId: "o-6" } }),
    );
    expect(refund).toMatchObject({ kind: "signal", signal: "refunded", reference: "pi_6" });

    const dispute = mapStripeEvent(
      evt("charge.dispute.created", { id: "dp_1", payment_intent: "pi_7" }),
    );
    expect(dispute).toMatchObject({ kind: "signal", signal: "dispute_opened", reference: "pi_7" });
  });

  it("ignore les types d'événements non pertinents", () => {
    expect(mapStripeEvent(evt("customer.created", { id: "cus_1" })).kind).toBe("ignore");
  });
});
