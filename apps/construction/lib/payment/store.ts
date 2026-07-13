// lib/payment/store.ts — Persistance des dossiers de commande, abstraite derrière
// une interface `OrderStore`. La state machine (order.ts) est PURE ; ce module
// est le seul point qui la relie à un stockage.
//
// V1 : implémentation en mémoire (référence + tests). Elle ne survit PAS à un
// redéploiement ni ne se partage entre instances serverless — c'est le point
// d'ancrage explicite pour brancher une table SQL en Phase 2 (cf.
// docs/07-integrations.md), sans toucher au reste du code.

import type { Order, OrderEvent } from "./order";
import { createOrder, applyWebhookEvent, transition } from "./order";
import type { Currency } from "./money";

export interface OrderStore {
  get(orderId: string): Promise<Order | null>;
  save(order: Order): Promise<void>;
}

/** Stockage en mémoire (process). Suffisant en dev/test ; à remplacer en prod. */
export class InMemoryOrderStore implements OrderStore {
  private readonly orders = new Map<string, Order>();

  async get(orderId: string): Promise<Order | null> {
    return this.orders.get(orderId) ?? null;
  }

  async save(order: Order): Promise<void> {
    this.orders.set(order.id, order);
  }

  /** Test/diagnostic : nombre de dossiers connus. */
  size(): number {
    return this.orders.size;
  }
}

/** Store par défaut du process (singleton). Swap en Phase 2 par un store SQL. */
let defaultStore: OrderStore | null = null;
export function getOrderStore(): OrderStore {
  if (!defaultStore) defaultStore = new InMemoryOrderStore();
  return defaultStore;
}

/** Paramètres nécessaires pour matérialiser un dossier au premier acompte. */
export interface OrderSeed {
  currency: Currency;
  totalMinor: number;
}

export interface FulfillResult {
  order: Order;
  /** Faux si l'event avait déjà été traité (idempotent) — aucune transition. */
  applied: boolean;
  /** Renseigné si la transition métier a été refusée (hors séquence). */
  rejected?: string;
}

/**
 * Applique un événement de paiement à un dossier, de façon idempotente et
 * persistante. Crée le dossier au premier acompte (seed requis alors).
 *
 * - event déjà traité (eventId connu) → no-op, `applied=false`.
 * - transition invalide (hors séquence) → dossier inchangé, `rejected` renseigné
 *   (la route peut alors ACK 200 sans replanter Stripe indéfiniment).
 */
export async function fulfillOrderEvent(
  store: OrderStore,
  orderId: string,
  eventId: string,
  event: OrderEvent,
  seed?: OrderSeed,
): Promise<FulfillResult> {
  let order = await store.get(orderId);

  if (!order) {
    if (!seed) {
      throw new Error(`Dossier ${orderId} introuvable et aucun seed fourni.`);
    }
    order = createOrder({ id: orderId, currency: seed.currency, totalMinor: seed.totalMinor });
    await store.save(order);
  }

  // Court-circuit idempotent AVANT toute transition (retry-safe).
  if (order.processedEventIds.includes(eventId)) {
    return { order, applied: false };
  }

  try {
    // Validation sèche pour distinguer « hors séquence » d'une vraie erreur.
    transition(order, event);
  } catch (err) {
    return {
      order,
      applied: false,
      rejected: err instanceof Error ? err.message : "Transition refusée.",
    };
  }

  const next = applyWebhookEvent(order, eventId, event);
  await store.save(next);
  return { order: next, applied: true };
}
