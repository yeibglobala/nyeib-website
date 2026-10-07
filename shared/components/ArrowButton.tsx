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
      className={`group relative inline-flex items-center cursor-pointer select-none transition-transform duration-200 active:scale-[0.98] ${className}`}
    >
      {/* =====================================================================
          LEFT ARROW BADGE (Appears on Hover with Smooth Directional Spring Glide)
          ===================================================================== */}
      <div
        className="max-w-0 opacity-0 scale-50 group-hover:max-w-[64px] group-hover:opacity-100 group-hover:scale-100 group-hover:mr-1.5 transition-all duration-350 ease-[cubic-bezier(0.34,1.4,0.64,1)] overflow-hidden flex items-center justify-center shrink-0 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transform -translate-x-3 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-350 ease-[cubic-bezier(0.34,1.4,0.64,1)] ${styles.circle} ${circleClassName}`}
        >
          <ArrowIcon className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:scale-110" />
        </div>
      </div>

      {/* =====================================================================
          MAIN PILL BUTTON
          ===================================================================== */}
      <div
        className={`inline-flex items-center justify-center rounded-full px-7 sm:px-8 py-3 sm:py-3.5 text-[0.88rem] sm:text-[0.94rem] tracking-[0.06em] uppercase transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_8px_28px_rgba(248,132,4,0.4)] ${styles.pill} ${pillClassName}`}
        style={{ fontFamily: "var(--font-body), sans-serif" }}
      >
        <span>{content}</span>
      </div>

      {/* =====================================================================
          RIGHT ARROW BADGE (Visible by Default, Glides Out on Hover)
          ===================================================================== */}
      <div
        className="max-w-[64px] opacity-100 scale-100 ml-1.5 group-hover:max-w-0 group-hover:opacity-0 group-hover:scale-50 group-hover:ml-0 transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden flex items-center justify-center shrink-0 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transform translate-x-0 translate-y-0 group-hover:translate-x-3 group-hover:-translate-y-2 transition-transform duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${styles.circle} ${circleClassName}`}
        >
          <ArrowIcon className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300" />
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
