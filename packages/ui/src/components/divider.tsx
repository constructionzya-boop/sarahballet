import type { ComponentProps } from "react";
import { cn } from "../lib/cn";

export function Divider({ className, ...props }: ComponentProps<"hr">) {
  return <hr className={cn("border-night/10", className)} {...props} />;
}
