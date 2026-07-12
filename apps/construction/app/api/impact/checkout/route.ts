import { NextResponse } from "next/server";
import { z } from "zod";
import { getStripe } from "../../../../lib/stripe/server";
import { getImpactProject, tierForAmount } from "../../../../lib/invest";
import { fcfaToMinor, type Currency } from "../../../../lib/payment/money";

export const runtime = "nodejs";

const Body = z.object({
  projectSlug: z.string().min(1),
  amountFcfa: z.number().int().min(1_000).max(50_000_000),
  currency: z.enum(["eur", "xof"]).default("eur"),
  name: z.string().max(120).optional(),
  email: z.string().email().optional(),
});

export async function POST(req: Request) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json({ error: "Paiement non configuré." }, { status: 503 });
  }

  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Paramètres invalides." }, { status: 400 });
  }

  const { projectSlug, amountFcfa, name, email } = parsed.data;
  const currency = parsed.data.currency as Currency;
  const project = getImpactProject(projectSlug);
  if (!project) {
    return NextResponse.json({ error: "Projet inconnu." }, { status: 404 });
  }

  const amountMinor = fcfaToMinor(currency, amountFcfa);
  const tier = tierForAmount(amountFcfa);

  try {
    const intent = await stripe.paymentIntents.create({
      amount: amountMinor,
      currency,
      automatic_payment_methods: { enabled: true },
      description: `Noéma Impact — ${project.title}`,
      metadata: {
        kind: "impact",
        projectSlug,
        amountFcfa: String(amountFcfa),
        tier: tier?.title ?? "libre",
        name: name ?? "",
        email: email ?? "",
      },
    });
    return NextResponse.json({
      clientSecret: intent.client_secret,
      amountMinor,
      currency,
      tier: tier?.title ?? null,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur Stripe.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
