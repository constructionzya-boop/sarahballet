// lib/payment/order.ts — Machine à états du dossier de commande.
//
//   COMMANDE → ACOMPTE_OK → PRODUCTION → PREUVE_PHOTOS → JALON2_OK
//            → POSE → SOLDE_OK → LIVRE      (+ ANNULE depuis tout état non terminal)
//
// Règles dures encodées :
//  - la PRODUCTION ne démarre qu'après encaissement de l'acompte ;
//  - la POSE n'est jamais planifiée sous POSE_MIN_PAID_RATIO (70 %) encaissé.

import type { Currency } from "./money";
import type { MilestoneId } from "./milestones";
import { paidRatio, POSE_MIN_PAID_RATIO } from "./milestones";

export type OrderStatus =
  | "COMMANDE"
  | "ACOMPTE_OK"
  | "PRODUCTION"
  | "PREUVE_PHOTOS"
  | "JALON2_OK"
  | "POSE"
  | "SOLDE_OK"
  | "LIVRE"
  | "ANNULE";

export type OrderEvent =
  | { type: "PAYMENT_CONFIRMED"; milestone: MilestoneId }
  | { type: "PRODUCTION_STARTED" }
  | { type: "PHOTOS_UPLOADED" }
  | { type: "POSE_SCHEDULED" }
  | { type: "DELIVERED" }
  | { type: "CANCELLED" };

export interface Order {
  id: string;
  currency: Currency;
  /** Total en unités mineures. */
  totalMinor: number;
  status: OrderStatus;
  /** Jalons encaissés (dédupliqués). */
  paidMilestones: MilestoneId[];
  /** IDs d'événements Stripe déjà traités (idempotence). */
  processedEventIds: string[];
}

export function createOrder(params: {
  id: string;
  currency: Currency;
  totalMinor: number;
}): Order {
  return {
    id: params.id,
    currency: params.currency,
    totalMinor: params.totalMinor,
    status: "COMMANDE",
    paidMilestones: [],
    processedEventIds: [],
  };
}

export class OrderTransitionError extends Error {
  constructor(
    public readonly status: OrderStatus,
    public readonly event: OrderEvent,
    message: string,
  ) {
    super(message);
    this.name = "OrderTransitionError";
  }
}

const TERMINAL: ReadonlySet<OrderStatus> = new Set(["LIVRE", "ANNULE"]);

/** Ajoute un jalon payé sans doublon. */
function withMilestone(paid: readonly MilestoneId[], m: MilestoneId): MilestoneId[] {
  return paid.includes(m) ? [...paid] : [...paid, m];
}

/**
 * Applique un événement métier à un dossier et renvoie le nouvel état.
 * Fonction PURE : ne mute pas l'entrée. Lève OrderTransitionError si invalide.
 */
export function transition(order: Order, event: OrderEvent): Order {
  if (TERMINAL.has(order.status) && event.type !== "CANCELLED") {
    throw new OrderTransitionError(order.status, event, "Dossier déjà terminé.");
  }

  switch (event.type) {
    case "CANCELLED": {
      if (order.status === "LIVRE") {
        throw new OrderTransitionError(order.status, event, "Un dossier livré ne s'annule pas.");
      }
      return { ...order, status: "ANNULE" };
    }

    case "PAYMENT_CONFIRMED": {
      const paidMilestones = withMilestone(order.paidMilestones, event.milestone);
      const next = { ...order, paidMilestones };

      if (event.milestone === "acompte") {
        if (order.status !== "COMMANDE") {
          throw new OrderTransitionError(order.status, event, "Acompte hors séquence.");
        }
        return { ...next, status: "ACOMPTE_OK" };
      }
      if (event.milestone === "fabrication") {
        if (order.status !== "PREUVE_PHOTOS") {
          throw new OrderTransitionError(
            order.status,
            event,
            "Jalon fabrication : photos usine requises d'abord.",
          );
        }
        return { ...next, status: "JALON2_OK" };
      }
      // solde
      if (order.status !== "POSE") {
        throw new OrderTransitionError(order.status, event, "Solde encaissable après la pose.");
      }
      return { ...next, status: "SOLDE_OK" };
    }

    case "PRODUCTION_STARTED": {
      if (order.status !== "ACOMPTE_OK") {
        throw new OrderTransitionError(order.status, event, "Production : acompte requis.");
      }
      if (!order.paidMilestones.includes("acompte")) {
        throw new OrderTransitionError(order.status, event, "Acompte non encaissé.");
      }
      return { ...order, status: "PRODUCTION" };
    }

    case "PHOTOS_UPLOADED": {
      if (order.status !== "PRODUCTION") {
        throw new OrderTransitionError(order.status, event, "Photos : production en cours requise.");
      }
      return { ...order, status: "PREUVE_PHOTOS" };
    }

    case "POSE_SCHEDULED": {
      if (order.status !== "JALON2_OK") {
        throw new OrderTransitionError(order.status, event, "Pose : jalon 2 requis.");
      }
      const ratio = paidRatio(order.paidMilestones);
      if (ratio < POSE_MIN_PAID_RATIO) {
        throw new OrderTransitionError(
          order.status,
          event,
          `Pose interdite sous ${POSE_MIN_PAID_RATIO * 100} % encaissé (actuel ${Math.round(
            ratio * 100,
          )} %).`,
        );
      }
      return { ...order, status: "POSE" };
    }

    case "DELIVERED": {
      if (order.status !== "SOLDE_OK") {
        throw new OrderTransitionError(order.status, event, "Livraison : solde requis.");
      }
      return { ...order, status: "LIVRE" };
    }
  }
}

/**
 * Applique un événement idempotent (issu d'un webhook Stripe). Si l'`eventId`
 * a déjà été traité, renvoie le dossier inchangé (retry-safe). Sinon applique
 * la transition et enregistre l'eventId.
 */
export function applyWebhookEvent(order: Order, eventId: string, event: OrderEvent): Order {
  if (order.processedEventIds.includes(eventId)) {
    return order; // déjà traité — no-op
  }
  const next = transition(order, event);
  return { ...next, processedEventIds: [...order.processedEventIds, eventId] };
}

/** Vrai si la production peut démarrer (acompte encaissé). */
export function canStartProduction(order: Order): boolean {
  return order.paidMilestones.includes("acompte");
}

/** Vrai si la pose peut être planifiée (≥ 70 % encaissé). */
export function canSchedulePose(order: Order): boolean {
  return paidRatio(order.paidMilestones) >= POSE_MIN_PAID_RATIO;
}
