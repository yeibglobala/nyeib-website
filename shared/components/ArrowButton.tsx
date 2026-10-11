"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";

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

export function ArrowButton({
  children,
  text,
  href,
  onClick,
  variant = "orange",
  arrowType = "diagonal",
  className = "",
  pillClassName = "",
  circleClassName = "",
  ariaLabel,
}: ArrowButtonProps) {
  const content = text || children;
  const labelText = typeof content === "string" ? content : ariaLabel || "Action button";

  // Visual style tokens based on variant
  const styles = {
    orange: {
      pill: "bg-[#F88404] hover:bg-[#ff941f] text-white font-bold shadow-[0_4px_20px_rgba(248,132,4,0.3)]",
      circle: "bg-[#F88404] text-white border border-[#ff9d33]/30 shadow-[0_4px_20px_rgba(248,132,4,0.3)]",
    },
    glass: {
      pill: "bg-[#F88404] hover:bg-[#ff941f] text-white font-bold shadow-[0_4px_20px_rgba(248,132,4,0.35)]",
      circle: "bg-[rgba(18,32,27,0.7)] hover:bg-[var(--c-accent)] text-[#eef6f2] border border-[rgba(238,246,242,0.2)] backdrop-blur-md shadow-md",
    },
    emerald: {
      pill: "bg-[var(--c-accent)] hover:bg-[#34cfa0] text-[#0a1814] font-extrabold shadow-[0_4px_20px_rgba(46,183,140,0.35)]",
      circle: "bg-[var(--c-accent)] text-[#0a1814] border border-[var(--c-accent)] shadow-md",
    },
  }[variant];

  const ArrowIcon = arrowType === "diagonal" ? ArrowUpRight : ArrowRight;

  const innerContent = (
    <div
      className={`group relative inline-flex items-center cursor-pointer select-none transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.99] active:duration-[150ms] ${className}`}
    >
      {/* =====================================================================
          MAIN PILL BUTTON (Lifts 3px on hover, 500ms shadow transition, 150ms pressed state)
          ===================================================================== */}
      <div
        className={`inline-flex items-center justify-center rounded-full px-7 sm:px-8 py-3 sm:py-3.5 text-[0.88rem] sm:text-[0.94rem] tracking-[0.06em] uppercase group-hover:-translate-y-[3px] active:translate-y-0 active:duration-[150ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00BE93] ${styles.pill} ${pillClassName}`}
        style={{
          fontFamily: "var(--font-body), sans-serif",
          transitionProperty: "transform, box-shadow, background-color, color",
          transitionDuration: "var(--dur-base), 500ms, var(--dur-fast), var(--dur-fast)",
          transitionTimingFunction: "var(--ease-out), var(--ease-inout), var(--ease-inout), var(--ease-inout)",
        }}
      >
        <span>{content}</span>
      </div>

      {/* =====================================================================
          RIGHT ARROW BADGE (Arrow slides 4px right with 40ms delay on hover)
          ===================================================================== */}
      <div
        className="ml-2 flex items-center justify-center shrink-0 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center group-hover:-translate-y-[3px] active:translate-y-0 active:duration-[150ms] ${styles.circle} ${circleClassName}`}
          style={{
            transitionProperty: "transform, box-shadow, background-color, border-color",
            transitionDuration: "var(--dur-base), 500ms, var(--dur-fast), var(--dur-fast)",
            transitionTimingFunction: "var(--ease-out), var(--ease-inout), var(--ease-inout), var(--ease-inout)",
          }}
        >
          <ArrowIcon
            className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-[4px] active:translate-x-0"
            style={{
              transitionProperty: "transform",
              transitionDuration: "var(--dur-base)",
              transitionTimingFunction: "var(--ease-out)",
              transitionDelay: "0ms",
            }}
          />
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} aria-label={labelText} className="inline-block focus:outline-none">
        {innerContent}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={labelText}
      className="inline-block bg-transparent border-0 p-0 focus:outline-none"
    >
      {innerContent}
    </button>
  );
}
