import type { ComponentProps } from "react";
import { cn } from "../lib/cn";

export type WhatsAppButtonProps = Omit<ComponentProps<"a">, "href"> & {
  /** Numéro au format international sans « + » ni espaces, ex. « 2250700000000 ». */
  phone: string;
  /** Message pré-rempli (payload du dossier/devis). */
  message?: string;
};

/**
 * CTA WhatsApp — canal n°1 du marché. Génère un deep link wa.me avec message
 * pré-rempli. Le vert WhatsApp est l'identité du canal (exception assumée à la
 * charte, réservée à ce composant).
 */
export function WhatsAppButton({
  phone,
  message,
  className,
  children,
  ...props
}: WhatsAppButtonProps) {
  const href =
    `https://wa.me/${phone.replace(/[^\d]/g, "")}` +
    (message ? `?text=${encodeURIComponent(message)}` : "");

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-md bg-whatsapp px-5 font-medium text-white transition-[filter] hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-whatsapp focus-visible:ring-offset-2",
        className,
      )}
      {...props}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 fill-current">
        <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.38a9.86 9.86 0 0 0 4.73 1.2h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.64-1.03-5.13-2.9-7A9.82 9.82 0 0 0 12.04 2Zm5.8 14.03c-.24.68-1.4 1.3-1.94 1.35-.5.05-1.13.07-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.8-4.17-4.94-4.36-.15-.19-1.18-1.57-1.18-3s.75-2.13 1.02-2.42c.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.82 2.01.9 2.16.07.15.12.32.02.51-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.03 1.12 1 2.06 1.31 2.35 1.46.29.15.46.12.63-.07.17-.19.73-.85.92-1.14.19-.29.39-.24.66-.15.27.1 1.7.8 1.99.95.29.15.48.22.55.34.07.12.07.68-.17 1.35Z" />
      </svg>
      {children ?? "WhatsApp"}
    </a>
  );
}
