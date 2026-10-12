"use client";

import React from "react";
import { AppButton } from "@/shared/components/AppButton";

export interface EsgButtonProps {
  label: string;
  href: string;
  variant?: "orange" | "darkGreen";
  className?: string;
  ariaLabel?: string;
  minHeight64?: boolean;
}

/**
 * Standard ESG section button without arrow icon.
 * Features rounded corners and staggering character roll animation.
 */
export function EsgButton({
  label,
  href,
  variant = "orange",
  className = "",
  ariaLabel,
  minHeight64 = false,
}: EsgButtonProps) {
  return (
    <AppButton
      href={href}
      label={label}
      variant={variant}
      size={minHeight64 ? "lg" : "md"}
      className={`${minHeight64 ? "min-h-[58px]" : ""} ${className}`}
      ariaLabel={ariaLabel}
    />
  );
}
