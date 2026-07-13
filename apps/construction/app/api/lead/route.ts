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
  // Consentement RGPD (requis pour les formulaires collectant des données).
  consent: z.boolean().optional(),
  // Honeypot anti-spam : rempli uniquement par les bots (traité côté handler).
  company_url: z.string().optional(),
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

  // Honeypot rempli → bot : on répond 200 (ne pas signaler la détection) sans
  // rien enregistrer.
  if (lead.company_url && lead.company_url.trim().length > 0) {
    return NextResponse.json({ received: true });
  }

  // Consentement RGPD requis pour les formulaires investisseurs/data room.
  if ((lead.kind === "interet" || lead.kind === "dataroom") && lead.consent !== true) {
    return NextResponse.json({ error: "Consentement requis." }, { status: 422 });
  }

  const score = scoreLead(lead);
  // Placeholder CRM — remplacé en Phase 2 par Connect + WhatsApp interne. On
  // journalise le lead qualifié (score + canal) pour reprise manuelle immédiate.
  const priority = score >= 60 ? "HOT" : score >= 40 ? "WARM" : "COLD";
  console.log(
    `[lead] ${lead.kind} priorité=${priority} score=${score} profil=${lead.profile ?? "-"} ` +
      `ticket=${lead.ticketEur ?? "-"}€ email=${lead.email}`,
  );
  return NextResponse.json({ received: true, score, priority });
}
