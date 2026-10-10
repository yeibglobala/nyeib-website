"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export interface EsgButtonProps {
  label: string;
  href: string;
  variant?: "orange" | "darkGreen";
  className?: string;
  ariaLabel?: string;
  minHeight64?: boolean;
}

export function EsgButton({
  label,
  href,
  variant = "orange",
  className = "",
  ariaLabel,
  minHeight64 = false,
}: EsgButtonProps) {
  const isOrange = variant === "orange";

  if (minHeight64) {
    return (
      <Link
        href={href}
        aria-label={ariaLabel || label}
        className={`group/btn inline-flex items-center gap-2 max-w-full select-none outline-none rounded-full transition-transform duration-300 hover:-translate-y-[2px] active:scale-[0.98] focus-visible:ring-2 ${
          isOrange
            ? "focus-visible:ring-[#F88404] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F5F0]"
            : "focus-visible:ring-[#0F2A20] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F5F0]"
        } ${className}`}
      >
        {/* Pill with min-height 64px */}
        <span
          className={`inline-flex items-center justify-center px-5 sm:px-6 h-16 min-h-[64px] rounded-full text-[12px] min-[400px]:text-[13px] sm:text-[14px] tracking-[0.05em] uppercase font-bold transition-colors duration-200 text-center leading-tight whitespace-normal ${
            isOrange
              ? "bg-[#F88404] hover:bg-[#ff941f] text-white shadow-[0_8px_24px_rgba(248,132,4,0.3)]"
              : "bg-[#0F2A20] hover:bg-[#183d30] text-white shadow-sm"
          }`}
          style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
        >
          {label}
        </span>

        {/* Round Arrow matching pill height exactly (64px) */}
        <span
          className={`inline-grid place-items-center w-16 h-16 min-w-[64px] min-h-[64px] rounded-full text-white shrink-0 transition-transform duration-300 group-hover/btn:rotate-45 ${
            isOrange
              ? "bg-[#F88404] hover:bg-[#ff941f] shadow-[0_8px_24px_rgba(248,132,4,0.3)]"
              : "bg-[#0F2A20] hover:bg-[#183d30] shadow-sm"
          }`}
        >
          <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      aria-label={ariaLabel || label}
      className={`group/btn inline-flex items-center gap-2 max-w-full select-none outline-none rounded-full transition-transform duration-300 hover:-translate-y-[2px] active:scale-[0.98] focus-visible:ring-2 ${
        isOrange
          ? "focus-visible:ring-[#F88404] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F5F0]"
          : "focus-visible:ring-[#0F2A20] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F5F0]"
      } ${className}`}
    >
      {/* Pill */}
      <span
        className={`inline-flex items-center justify-center px-5 sm:px-7 py-3 sm:py-3.5 rounded-full text-[12px] min-[400px]:text-[13px] sm:text-[14px] tracking-[0.05em] uppercase font-bold transition-colors duration-200 text-center leading-tight whitespace-normal ${
          isOrange
            ? "bg-[#F88404] hover:bg-[#ff941f] text-white shadow-[0_8px_24px_rgba(248,132,4,0.3)]"
            : "bg-[#0F2A20] hover:bg-[#183d30] text-white shadow-sm"
        }`}
        style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
      >
        {label}
      </span>

      {/* Round Arrow */}
      <span
        className={`inline-grid place-items-center w-10 h-10 sm:w-11 sm:h-11 rounded-full text-white shrink-0 transition-transform duration-300 group-hover/btn:rotate-45 ${
          isOrange
            ? "bg-[#F88404] hover:bg-[#ff941f] shadow-[0_8px_24px_rgba(248,132,4,0.3)]"
            : "bg-[#0F2A20] hover:bg-[#183d30] shadow-sm"
        }`}
      >
        <ArrowUpRight className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
      </span>
    </Link>
  );
}
