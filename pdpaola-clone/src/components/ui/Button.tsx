"use client";

import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes } from "react";

export function Button({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" }) {
  const variant = props.variant ?? "primary";
  const base =
    "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30 disabled:opacity-50 disabled:pointer-events-none";

  const styles =
    variant === "ghost"
      ? "bg-transparent hover:bg-black/5 text-zinc-900"
      : "bg-zinc-900 text-white hover:bg-zinc-800";

  // remove our custom prop from DOM
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { variant: _variant, ...rest } = props;

  return <button className={cn(base, styles, className)} {...rest} />;
}

