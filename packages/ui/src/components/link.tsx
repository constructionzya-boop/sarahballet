import type { ComponentProps } from "react";
import { cn } from "../lib/cn";

/** Lien stylé. `render` permet d'injecter un `<Link>` de Next si besoin. */
export function Link({ className, ...props }: ComponentProps<"a">) {
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content -- primitive : contenu fourni par le consommateur
    <a
      className={cn(
        "font-medium text-dawn underline-offset-4 hover:text-accent hover:underline",
        className,
      )}
      {...props}
    />
  );
}
