import Link from "next/link";
import { cn } from "@noema/ui";
import type { ConfigInput, ConfigResult } from "../lib/pricing";
import { formatEur, formatFcfa } from "../lib/pricing";
import { buildWhatsAppRecap, whatsappHref } from "../lib/whatsapp";

export type PriceBarProps = {
  input: ConfigInput;
  result: ConfigResult;
  className?: string;
};

function Headline({ input, result }: PriceBarProps) {
  const f = result.financing;
  switch (input.financing) {
    case "location":
      return (
        <>
          <span className="text-3xl font-black tabular-nums">
            {formatFcfa(f.monthlyRentFcfa)}
            <span className="text-base font-medium text-cream/70">/mois</span>
          </span>
          <span className="text-sm text-cream/70">Caution {formatFcfa(f.depositFcfa)}</span>
        </>
      );
    case "accession":
      return (
        <>
          <span className="text-3xl font-black tabular-nums">{formatFcfa(f.downPaymentFcfa)}</span>
          <span className="text-sm text-cream/70">
            puis {formatFcfa(f.accessionMonthlyFcfa)}/mois × 36
          </span>
        </>
      );
    case "diaspora":
      return (
        <>
          <span className="text-2xl font-black tabular-nums">
            {formatEur(f.diasporaEur[0])} · {formatEur(f.diasporaEur[1])} ·{" "}
            {formatEur(f.diasporaEur[2])}
          </span>
          <span className="text-sm text-cream/70">3 jalons (30 / 40 / 30 %)</span>
        </>
      );
    default:
      return (
        <>
          <span className="text-3xl font-black tabular-nums">{formatFcfa(result.totalFcfa)}</span>
          <span className="text-sm text-cream/70">≈ {formatEur(result.totalEur)}</span>
        </>
      );
  }
}

/** Barre de total — carte Night, collante en bas du panneau / de l'écran mobile. */
export function PriceBar({ input, result, className }: PriceBarProps) {
  const message = buildWhatsAppRecap(input, result);
  return (
    <div className={cn("rounded-3xl bg-night p-5 text-cream shadow-soft-lg", className)}>
      <div className="flex items-end justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-dew">
            Total indicatif
          </span>
          <Headline input={input} result={result} />
        </div>
        <span className="hidden text-xs text-cream/50 sm:block">
          {result.areaM2} m² · grille V{result.pricingVersion}
        </span>
      </div>
      <a
        href={whatsappHref(message)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-orange text-base font-semibold text-white transition-[filter] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-night active:scale-95"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 fill-current">
          <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.38a9.86 9.86 0 0 0 4.73 1.2h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.64-1.03-5.13-2.9-7A9.82 9.82 0 0 0 12.04 2Zm5.8 14.03c-.24.68-1.4 1.3-1.94 1.35-.5.05-1.13.07-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.8-4.17-4.94-4.36-.15-.19-1.18-1.57-1.18-3s.75-2.13 1.02-2.42c.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.82 2.01.9 2.16.07.15.12.32.02.51-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.03 1.12 1 2.06 1.31 2.35 1.46.29.15.46.12.63-.07.17-.19.73-.85.92-1.14.19-.29.39-.24.66-.15.27.1 1.7.8 1.99.95.29.15.48.22.55.34.07.12.07.68-.17 1.35Z" />
        </svg>
        Recevoir ce devis sur WhatsApp
      </a>
      <Link
        href={`/reserver?project=${input.project}&currency=${
          input.financing === "diaspora" ? "eur" : "xof"
        }`}
        className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-full border border-white/25 text-sm font-semibold text-cream transition-colors hover:bg-white/10"
      >
        Réserver avec 30 % d&apos;acompte →
      </Link>
      <p className="mt-2 text-center text-[11px] text-cream/50">
        Prix indicatif — devis exact gratuit.
      </p>
    </div>
  );
}
