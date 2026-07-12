import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

// Capture de leads : manifestation d'intérêt investisseur (C3) et accès data
// room (C4). En V1, on log + renvoie ok (placeholder CRM). Phase 2 : insertion
// dans Connect (table `leads`) + notification WhatsApp interne + scoring.

const Body = z.object({
  kind: z.enum(["interet", "dataroom", "ambassadeur"]),
  name: z.string().min(2).max(120),
  email: z.string().email(),
  // Champs optionnels selon le type de lead.
  profile: z.enum(["fonds", "family-office", "business-angel", "autre"]).optional(),
  ticketEur: z.number().int().min(0).optional(),
  horizon: z.string().max(60).optional(),
  message: z.string().max(2000).optional(),
});

export type LeadInput = z.infer<typeof Body>;

/** Score simple de qualification (0-100) pour prioriser le rappel commercial. */
function scoreLead(lead: LeadInput): number {
  let score = 20;
  if (lead.kind === "dataroom") score += 20;
  if (lead.profile === "fonds") score += 30;
  else if (lead.profile === "family-office") score += 25;
  else if (lead.profile === "business-angel") score += 15;
  if (lead.ticketEur) {
    if (lead.ticketEur >= 100_000) score += 30;
    else if (lead.ticketEur >= 25_000) score += 20;
    else if (lead.ticketEur >= 5_000) score += 10;
  }
  return Math.min(100, score);
}

export async function POST(req: Request) {
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Formulaire invalide.", details: parsed.error.flatten() },
      { status: 400 },
    );
  }
  const lead = parsed.data;
  const score = scoreLead(lead);
  // Placeholder CRM — remplacé en Phase 2 par Connect + WhatsApp interne.
  console.log(`[lead] ${lead.kind} score=${score} email=${lead.email}`, lead);
  return NextResponse.json({ received: true, score });
}
