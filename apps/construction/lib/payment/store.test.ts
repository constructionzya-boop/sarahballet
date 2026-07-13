import { describe, it, expect } from "vitest";
import { InMemoryOrderStore, fulfillOrderEvent } from "./store";
import { transition } from "./order";

const SEED = { currency: "eur" as const, totalMinor: 320_000 };

async function drive(store: InMemoryOrderStore, id: string) {
  // Séquence nominale complète pilotée par les events (paiements + jalons métier).
  await fulfillOrderEvent(store, id, "evt-acompte", { type: "PAYMENT_CONFIRMED", milestone: "acompte" }, SEED);
  // Les transitions non-paiement passent aussi par le store (production, photos…).
  let order = (await store.get(id))!;
  await store.save(transition(order, { type: "PRODUCTION_STARTED" }));
  order = (await store.get(id))!;
  await store.save(transition(order, { type: "PHOTOS_UPLOADED" }));
  await fulfillOrderEvent(store, id, "evt-fab", { type: "PAYMENT_CONFIRMED", milestone: "fabrication" });
  order = (await store.get(id))!;
  await store.save(transition(order, { type: "POSE_SCHEDULED" }));
  await fulfillOrderEvent(store, id, "evt-solde", { type: "PAYMENT_CONFIRMED", milestone: "solde" });
  order = (await store.get(id))!;
  await store.save(transition(order, { type: "DELIVERED" }));
  return (await store.get(id))!;
}

describe("fulfillOrderEvent", () => {
  it("crée le dossier au premier acompte à partir du seed", async () => {
    const store = new InMemoryOrderStore();
    const res = await fulfillOrderEvent(
      store,
      "o-1",
      "evt-1",
      { type: "PAYMENT_CONFIRMED", milestone: "acompte" },
      SEED,
    );
    expect(res.applied).toBe(true);
    expect(res.order.status).toBe("ACOMPTE_OK");
    expect(store.size()).toBe(1);
  });

  it("est idempotent : rejouer le même eventId ne change rien", async () => {
    const store = new InMemoryOrderStore();
    const ev = { type: "PAYMENT_CONFIRMED", milestone: "acompte" } as const;
    await fulfillOrderEvent(store, "o-2", "evt-dup", ev, SEED);
    const again = await fulfillOrderEvent(store, "o-2", "evt-dup", ev);
    expect(again.applied).toBe(false);
    expect(again.order.status).toBe("ACOMPTE_OK");
    expect(again.order.paidMilestones).toEqual(["acompte"]);
  });

  it("refuse une transition hors séquence sans muter le dossier", async () => {
    const store = new InMemoryOrderStore();
    await fulfillOrderEvent(store, "o-3", "evt-a", { type: "PAYMENT_CONFIRMED", milestone: "acompte" }, SEED);
    // Solde avant la pose → refus propre (pas d'exception qui remonte).
    const res = await fulfillOrderEvent(store, "o-3", "evt-b", { type: "PAYMENT_CONFIRMED", milestone: "solde" });
    expect(res.applied).toBe(false);
    expect(res.rejected).toBeTruthy();
    expect(res.order.status).toBe("ACOMPTE_OK");
  });

  it("lève si le dossier est inconnu et qu'aucun seed n'est fourni", async () => {
    const store = new InMemoryOrderStore();
    await expect(
      fulfillOrderEvent(store, "ghost", "evt", { type: "PAYMENT_CONFIRMED", milestone: "fabrication" }),
    ).rejects.toThrow();
  });

  it("mène un dossier de bout en bout jusqu'à LIVRE", async () => {
    const store = new InMemoryOrderStore();
    const order = await drive(store, "o-full");
    expect(order.status).toBe("LIVRE");
    expect(order.paidMilestones.sort()).toEqual(["acompte", "fabrication", "solde"]);
    expect(order.processedEventIds).toHaveLength(3);
  });
});
