// lib/payment/webhook.ts — Traduction PURE des événements Stripe en intentions
// métier. Isolée de la route pour être testable unitairement sans réseau.
//
// La route (app/api/webhooks/stripe/route.ts) se contente de : vérifier la
// signature, mapper via `mapStripeEvent`, appliquer côté dossier (Phase 2 : DB),
// et ACK. Toute la logique décisionnelle vit ici.

import type { OrderEvent } from "./order";
import type { MilestoneId } from "./milestones";

/** Nature du flux à l'origine du PaymentIntent (dossier de commande vs don Impact). */
export type PaymentKind = "order" | "impact";

/** Décision issue d'un événement Stripe, prête à être appliquée par la route. */
export type WebhookOutcome =
  | {
      /** Transition à appliquer à un dossier de commande. */
      kind: "order";
      orderId: string;
      milestone: MilestoneId;
      event: OrderEvent;
    }
  | {
      /** Contribution Impact confirmée : incrémente collecté + contributeurs. */
      kind: "impact";
      projectSlug: string;
      amountMinor: number;
      currency: string;
      contributorName?: string;
    }
  | {
      /** Événement comptable/anti-fraude à journaliser (échec, remboursement, litige). */
      kind: "signal";
      signal: "payment_failed" | "refunded" | "dispute_opened";
      orderId?: string;
      reference: string;
    }
  | {
      /** Aucun traitement métier requis (ACK 200 sans effet). */
      kind: "ignore";
    };

interface MinimalPaymentIntent {
  id: string;
  amount: number;
  currency: string;
  metadata?: Record<string, string> | null;
}

interface MinimalCharge {
  id: string;
  payment_intent?: string | null;
  metadata?: Record<string, string> | null;
}

interface MinimalStripeEvent {
  type: string;
  data: { object: unknown };
}

const MILESTONE_IDS: ReadonlySet<string> = new Set(["acompte", "fabrication", "solde"]);

function asPaymentIntent(obj: unknown): MinimalPaymentIntent | null {
  const pi = obj as MinimalPaymentIntent;
  return pi && typeof pi.id === "string" && typeof pi.amount === "number" ? pi : null;
}

function asCharge(obj: unknown): MinimalCharge | null {
  const c = obj as MinimalCharge;
  return c && typeof c.id === "string" ? c : null;
}

/**
 * Traduit un événement Stripe (structure minimale) en décision métier.
 * Fonction PURE : aucun accès réseau, aucune mutation — entièrement testable.
 */
export function mapStripeEvent(event: MinimalStripeEvent): WebhookOutcome {
  switch (event.type) {
    case "payment_intent.succeeded": {
      const pi = asPaymentIntent(event.data.object);
      if (!pi) return { kind: "ignore" };
      const meta = pi.metadata ?? {};
      const kind = (meta.kind as PaymentKind | undefined) ?? "order";

      if (kind === "impact") {
        return {
          kind: "impact",
          projectSlug: meta.projectSlug ?? meta.slug ?? "",
          amountMinor: pi.amount,
          currency: pi.currency,
          contributorName: meta.contributorName || meta.name || undefined,
        };
      }

      const milestone = meta.milestone;
      if (milestone && MILESTONE_IDS.has(milestone)) {
        return {
          kind: "order",
          orderId: meta.orderId ?? "",
          milestone: milestone as MilestoneId,
          event: { type: "PAYMENT_CONFIRMED", milestone: milestone as MilestoneId },
        };
      }
      return { kind: "ignore" };
    }

    case "payment_intent.payment_failed": {
      const pi = asPaymentIntent(event.data.object);
      return {
        kind: "signal",
        signal: "payment_failed",
        orderId: pi?.metadata?.orderId,
        reference: pi?.id ?? "unknown",
      };
    }

    case "charge.refunded": {
      const c = asCharge(event.data.object);
      return {
        kind: "signal",
        signal: "refunded",
        orderId: c?.metadata?.orderId,
        reference: c?.payment_intent ?? c?.id ?? "unknown",
      };
    }

    case "charge.dispute.created": {
      const obj = event.data.object as { id?: string; payment_intent?: string | null };
      return {
        kind: "signal",
        signal: "dispute_opened",
        reference: obj?.payment_intent ?? obj?.id ?? "unknown",
      };
    }

    default:
      return { kind: "ignore" };
  }
}
