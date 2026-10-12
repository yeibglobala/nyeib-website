"use client";

import React from "react";

export interface PartnershipWaveCardProps {
  /** Title of the card in Asul bold serif */
  title: string;

  /** Description text in Chivo sans-serif */
  description: string;

  /** Optional link if card is clickable */
  href?: string;

  /** Primary top wave color (default: Tiger Orange #F88404) */
  primaryWaveColor?: string;

  /** Secondary bottom wave color (default: Evergreen #003124) */
  secondaryWaveColor?: string;

  /** Additional CSS class names */
  className?: string;

  /** Optional tag/badge above title */
  badge?: string;

  /** Optional icon element */
  icon?: React.ReactNode;
}

/**
 * Dual-tone Wave Graphic
 * Matching Figma nodes 648:506, 648:535, 648:543, 648:551, 648:523.
 *
 * ViewBox: 0 0 399 452
 * Dual paths: Tiger Orange (#F88404) and Evergreen (#003124)
 */
export function PartnershipWaveSvg({
  primaryColor = "#F88404",
  secondaryColor = "#003124",
  className = "",
}: {
  primaryColor?: string;
  secondaryColor?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 399 452"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute inset-0 w-full h-full pointer-events-none select-none ${className}`}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      {/* Upper wave ribbon (Tiger Orange #F88404) */}
      <path
        d="M452.139 216.003L433.665 393.346C433.118 398.588 429.593 402.636 425.327 405.283C266.109 482.304 84.1838 517.663 -104.426 498.016C-180.747 490.065 -253.526 473.653 -322.855 449.652C-328.859 447.702 -333.047 441.084 -332.319 434.095L-321.307 328.388C-320.397 319.652 -312.258 313.877 -303.576 315.664L-68.3886 364.89C1.01813 379.627 73.3206 370.821 136.751 340.781L431.088 201.005C441.329 196.332 453.322 204.646 452.139 216.003Z"
        fill={primaryColor}
      />
      {/* Lower wave base (Evergreen #003124) */}
      <path
        d="M523.51 497.348L426.488 347.753C423.62 343.331 418.641 341.326 413.638 340.907C236.807 344.621 58.6755 395.767 -100.423 498.953C-164.802 540.707 -222.182 588.39 -273.041 641.266C-277.504 645.731 -278.228 653.529 -274.405 659.425L-216.574 748.592C-211.795 755.962 -201.92 757.409 -194.998 751.873L-7.84241 601.177C47.2946 556.519 115.706 531.517 185.86 529.464L511.57 520.271C522.817 519.782 529.723 506.928 523.51 497.348Z"
        fill={secondaryColor}
      />
    </svg>
  );
}

/**
 * PartnershipWaveCard Component
 *
 * Implements Figma node 648:506 / 648:535 / 648:543 / 648:551 / 648:523.
 * Clean, editorial card on pure white (#FFFFFF) with rounded [32px] corners
 * and rising dual-tone Tiger Orange / Evergreen wave at bottom.
 */
export function PartnershipWaveCard({
  title,
  description,
  href,
  primaryWaveColor = "#F88404",
  secondaryWaveColor = "#003124",
  className = "",
  badge,
  icon,
}: PartnershipWaveCardProps) {
  const CardWrapper = href ? "a" : "article";

  return (
    <CardWrapper
      {...(href ? { href } : {})}
      tabIndex={0}
      className={`group relative w-full aspect-[398/452] min-h-[380px] sm:min-h-[420px] max-w-[420px] bg-white rounded-[32px] overflow-hidden flex flex-col justify-between p-7 sm:p-9 border border-[#E6DCCB]/30 shadow-[0_8px_26px_rgba(0,35,26,0.04)] transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:shadow-[0_20px_48px_rgba(0,35,26,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F88404] focus-visible:ring-offset-2 select-none ${className}`}
    >
      {/* =========================================================================
          TOP CONTENT AREA (Directly positioned over the clean white background)
          ========================================================================= */}
      <div className="relative z-10 flex flex-col items-start gap-4 sm:gap-5 w-full">
        {badge && (
          <span
            className="text-xs uppercase tracking-wider font-semibold text-[#003124]/60 font-mono"
          >
            {badge}
          </span>
        )}

        {icon && (
          <div className="w-12 h-12 rounded-2xl bg-[#F7F5F0] text-[#003124] flex items-center justify-center shadow-xs">
            {icon}
          </div>
        )}

        {/* Title: Asul Bold 28px in Evergreen #003124 */}
        <h3
          className="text-[24px] sm:text-[27px] lg:text-[28px] font-bold text-[#003124] leading-[1.15] tracking-tight m-0 text-left transition-colors duration-300 group-hover:text-[#00241A]"
          style={{ fontFamily: "var(--font-headline, 'Asul', Georgia, serif)" }}
        >
          {title}
        </h3>

        {/* Description: Chivo Light/Regular ~17px in Evergreen #003124 */}
        <p
          className="text-[15px] sm:text-[16.5px] lg:text-[17px] font-light sm:font-normal leading-[1.32] sm:leading-[1.35] text-[#003124]/90 m-0 text-left"
          style={{ fontFamily: "var(--font-body, 'Chivo', sans-serif)" }}
        >
          {description}
        </p>
      </div>

      {/* =========================================================================
          BOTTOM DUAL-TONE SVG WAVE GRAPHIC
          ========================================================================= */}
      <PartnershipWaveSvg
        primaryColor={primaryWaveColor}
        secondaryColor={secondaryWaveColor}
        className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
      />
    </CardWrapper>
  );
}
