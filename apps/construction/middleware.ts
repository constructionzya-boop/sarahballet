// middleware.ts — Protège l'espace interne /office/* par Basic Auth.
//
// Le dashboard économique expose des données CONFIDENTIELLES (coûts de revient,
// masse salariale, marges, point mort). `robots: noindex` ne suffit pas : il
// faut un vrai contrôle d'accès. Identifiants via env OFFICE_USER / OFFICE_PASS.
// À défaut d'identifiants configurés, l'accès est REFUSÉ (fail-closed).

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/office/:path*"],
};

function unauthorized(): NextResponse {
  return new NextResponse("Accès restreint — espace interne Noéma.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Noema Office", charset="UTF-8"' },
  });
}

/** Comparaison à temps ~constant pour éviter le timing sur les identifiants. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export function middleware(req: NextRequest) {
  const user = process.env.OFFICE_USER ?? "";
  const pass = process.env.OFFICE_PASS ?? "";

  // Fail-closed : sans identifiants configurés, l'espace interne reste fermé.
  if (!user || !pass) return unauthorized();

  const header = req.headers.get("authorization") ?? "";
  if (!header.startsWith("Basic ")) return unauthorized();

  let decoded = "";
  try {
    decoded = atob(header.slice(6));
  } catch {
    return unauthorized();
  }
  const idx = decoded.indexOf(":");
  if (idx === -1) return unauthorized();
  const gotUser = decoded.slice(0, idx);
  const gotPass = decoded.slice(idx + 1);

  if (safeEqual(gotUser, user) && safeEqual(gotPass, pass)) {
    return NextResponse.next();
  }
  return unauthorized();
}
