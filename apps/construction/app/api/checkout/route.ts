import { NextResponse } from "next/server";
import { z } from "zod";
import { getStripe } from "../../../lib/stripe/server";
import { force3dsThreshold } from "../../../lib/stripe/config";
import type { ProjectId } from "../../../lib/pricing";
import { modulePrice } from "../../../lib/pricing_v2";
import { CURRENT_VOLUME } from "../../../lib/metrics";
import { fcfaToMinor, type Currency } from "../../../lib/payment/money";
import { splitMilestones, type MilestoneId } from "../../../lib/payment/milestones";

export const runtime = "nodejs";

const Body = z.object({
  project: z.enum(["commerce", "studio", "local-pro"]),
  currency: z.enum(["eur", "xof"]),
  milestone: z.enum(["acompte", "fabrication", "solde"]).default("acompte"),
  orderId: z.string().min(1).optional(),
});

export async function POST(req: Request) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { error: "Paiement non configuré (STRIPE_SECRET_KEY manquante)." },
      { status: 503 },
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Corps JSON invalide." }, { status: 400 });
  }

  const parsed = Body.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Paramètres invalides.", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const project = parsed.data.project as ProjectId;
  const currency = parsed.data.currency as Currency;
  const milestone = parsed.data.milestone as MilestoneId;
  const orderId = parsed.data.orderId ?? crypto.randomUUID();

  // Prix courant (palier volume) → devise → jalons 30/40/30.
  const priceFcfa = modulePrice(project, CURRENT_VOLUME).priceFcfa;
  const totalMinor = fcfaToMinor(currency, priceFcfa);
  const parts = splitMilestones(totalMinor);
  const part = parts.find((p) => p.id === milestone);
  if (!part) {
    return NextResponse.json({ error: "Jalon inconnu." }, { status: 400 });
  }

  // Force 3DS (SCA) au-delà du seuil de réassurance.
  const force3ds = part.amountMinor >= force3dsThreshold(currency);

  try {
    const intent = await stripe.paymentIntents.create({
      amount: part.amountMinor,
      currency,
      // Apple Pay / Google Pay / cartes : méthodes automatiques.
      automatic_payment_methods: { enabled: true },
      description: `Noéma — ${project} — jalon ${milestone} (${part.share * 100} %)`,
      metadata: {
        orderId,
        project,
        milestone,
        pricingVersion: "2",
        totalMinor: String(totalMinor),
      },
      ...(force3ds
        ? { payment_method_options: { card: { request_three_d_secure: "any" } } }
        : {}),
    });

    return NextResponse.json({
      clientSecret: intent.client_secret,
      orderId,
      milestone,
      amountMinor: part.amountMinor,
      totalMinor,
      currency,
      force3ds,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur Stripe inconnue.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
