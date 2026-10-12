"use client";

import React from "react";
import { AppButton, AppButtonProps } from "./AppButton";

export interface ArrowButtonProps {
  children?: React.ReactNode;
  text?: string;
  href?: string;
  onClick?: () => void;
  variant?: "orange" | "glass" | "emerald";
  arrowType?: "diagonal" | "horizontal";
  className?: string;
  pillClassName?: string;
  circleClassName?: string;
  ariaLabel?: string;
}

/**
 * Standard button component across the site.
 * Arrow badge has been removed per brand update, using unified rounded corners button with character stagger animation.
 */
export function ArrowButton({
  children,
  text,
  href,
  onClick,
  variant = "orange",
  className = "",
  pillClassName = "",
  ariaLabel,
}: ArrowButtonProps) {
  const content = text || children;
  const label = typeof content === "string" ? content : undefined;

  return (
    <AppButton
      href={href}
      onClick={onClick}
      variant={variant}
      label={label}
      size="md"
      className={`${pillClassName} ${className}`}
      ariaLabel={ariaLabel}
    >
      {content}
    </AppButton>
  );
}

export { AppButton };
