"use client";

import React from "react";
import { PartnerConfig } from "./config";

interface PartnerCardProps {
  partner: PartnerConfig;
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
  isAnyCardActive?: boolean;
}

export function PartnerCard({
  partner,
  isActive,
  onActivate,
  onDeactivate,
}: PartnerCardProps) {
  // Support hover, keyboard (Enter/Space), and touch tap toggle
  const handleMouseEnter = () => {
    onActivate();
  };

  const handleMouseLeave = () => {
    onDeactivate();
  };

  const handleFocus = () => {
    onActivate();
  };

  const handleBlur = () => {
    onDeactivate();
  };

  const handleClick = () => {
    if (isActive) {
      onDeactivate();
    } else {
      onActivate();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (isActive) {
        onDeactivate();
      } else {
        onActivate();
      }
    }
  };

  return (
    <article
      tabIndex={0}
      role="button"
      aria-label={`${partner.name} overview`}
      aria-expanded={isActive}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className="group relative w-full aspect-[4/5] min-h-[340px] max-[700px]:aspect-auto max-[700px]:min-h-[300px] rounded-[22px] overflow-hidden cursor-pointer select-none bg-[#F2FBF6] border border-[rgba(0,49,36,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#003124] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F2FBF6] transition-[box-shadow,transform] duration-300 hover:shadow-[0_12px_32px_rgba(0,49,36,0.12)] hover:-translate-y-1"
    >
      {/* =========================================================================
          BASE LAYER: Mint Cream (#F2FBF6) card background in ALL states.
          - Never dimmed, never greyed.
          ========================================================================= */}

      {/* TOP ZONE (Mint Cream #F2FBF6): Official Partner Logo
          - Sits completely in the top 42% Mint Cream area
          - Never recolored, tinted, dimmed or covered by overlays (opacity-100 always)
          - Moves up ~12% on hover/focus/tap as the curved sweep rises
          - Clear space preserved on all sides
      */}
      <div className="absolute top-0 left-0 right-0 h-[42%] flex items-center justify-center p-6 sm:p-7 z-10 pointer-events-none">
        <div
          className={`w-full h-full flex items-center justify-center transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isActive ? "-translate-y-[12%]" : "translate-y-0"
          }`}
        >
          <img
            src={partner.logoPath}
            alt={partner.name}
            className="w-auto h-auto max-w-[220px] max-h-[82px] sm:max-h-[92px] object-contain filter-none opacity-100"
          />
        </div>
      </div>

      {/* REST STATE BOTTOM LABEL (Dark Ink on Mint Cream):
          - Visible at rest, smoothly transitions under the sweep as it rises
      */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-6 sm:p-7 z-0 pointer-events-none transition-opacity duration-300 ${
          isActive ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="pt-2.5 border-t border-[rgba(0,49,36,0.16)]">
          <span
            className="text-[14.5px] sm:text-[15px] font-bold text-[#003124] tracking-tight block"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {partner.name}
          </span>
        </div>
      </div>

      {/* =========================================================================
          CURVED SWEEP LAYER:
          - Mint Leaf (#00BE93) curved sweep rises from bottom (58% card height)
          - SVG path with curved top edge
          - translateY from 103% to 0 over 700ms, cubic-bezier(0.22, 1, 0.36, 1)
          - Description fades in 250ms later
          - Institution name stays at bottom in Evergreen (#003124)
          ========================================================================= */}
      <div
        aria-hidden={!isActive}
        className={`absolute bottom-0 left-0 right-0 h-[58%] z-20 transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none ${
          isActive ? "translate-y-0" : "translate-y-[103%]"
        }`}
      >
        {/* Curved Top SVG Path (Mint Leaf #00BE93) */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 400 240"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 0,26 C 120,4 280,4 400,26 L 400,240 L 0,240 Z"
            fill="#00BE93"
          />
        </svg>

        {/* Content on the sweep */}
        <div className="relative h-full w-full p-6 sm:p-7 flex flex-col justify-between z-10">
          {/* Description: fades in 250ms later in Evergreen #003124 */}
          <div
            className={`transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isActive
                ? "opacity-100 translate-y-0 delay-[250ms]"
                : "opacity-0 translate-y-2 delay-0"
            }`}
          >
            <p
              className="text-[13.5px] sm:text-[14.5px] font-medium leading-[1.5] text-[#003124] m-0"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {partner.description}
            </p>
          </div>

          {/* Institution name in Evergreen #003124 at the bottom */}
          <div className="pt-2.5 border-t border-[rgba(0,49,36,0.22)]">
            <span
              className="text-[14.5px] sm:text-[15px] font-bold text-[#003124] tracking-tight block"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {partner.name}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
