import { cn } from "@noema/ui";
import type { ReactNode } from "react";

export type StatCardProps = {
  label: string;
  value: ReactNode;
  sub?: ReactNode;
  tone?: "default" | "money" | "dark";
  className?: string;
};

/** Tuile de statistique type tableau de bord (gros chiffre + label). */
export function StatCard({ label, value, sub, tone = "default", className }: StatCardProps) {
  const tones = {
    default: "bg-white text-night",
    money: "bg-money text-money-ink",
    dark: "bg-night text-cream",
  };
  return (
    <div className={cn("rounded-3xl p-6 shadow-soft", tones[tone], className)}>
      <p
        className={cn(
          "text-xs font-semibold uppercase tracking-widest",
          tone === "dark" ? "text-dew" : tone === "money" ? "text-money-ink/70" : "text-dawn",
        )}
      >
        {label}
      </p>
      <p className="mt-2 text-3xl font-black tracking-tight tabular-nums sm:text-4xl">{value}</p>
      {sub ? (
        <p className={cn("mt-1 text-sm", tone === "dark" ? "text-cream/70" : "text-night/60")}>
          {sub}
        </p>
      ) : null}
    </div>
  );
}
