"use client";

import React, { useState } from "react";
import { GOVERNANCE_CONFIG, PartnerConfig } from "./config";

interface PartnerCardProps {
  partner: PartnerConfig;
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
  isAnyCardActive: boolean;
}

export function PartnerCard({
  partner,
  isActive,
  onActivate,
  onDeactivate,
  isAnyCardActive,
}: PartnerCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isCardOpen = isActive || isHovered;

  const handleMouseEnter = () => {
    setIsHovered(true);
    onActivate();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onDeactivate();
  };

  const handleFocus = () => {
    setIsHovered(true);
    onActivate();
  };

  const handleBlur = () => {
    setIsHovered(false);
    onDeactivate();
  };

  const handleClick = (e: React.MouseEvent) => {
    // Touch tap toggle support
    if (window.matchMedia("(hover: none)").matches) {
      e.preventDefault();
      if (isActive) {
        onDeactivate();
      } else {
        onActivate();
      }
    }
  };

  const isSoftened = isAnyCardActive && !isCardOpen;

  return (
    <article
      tabIndex={0}
      role="group"
      aria-label={partner.name}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClick={handleClick}
      className={`group relative w-full aspect-[4/5] min-h-[340px] max-[700px]:aspect-auto max-[700px]:min-h-[290px] rounded-[22px] overflow-hidden cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-[#4fd1b0] border transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isSoftened
          ? "opacity-65 bg-[#F2FBF6]/80 border-[rgba(0,49,36,0.18)]"
          : "opacity-100 bg-[#F2FBF6] border-[rgba(0,49,36,0.16)] hover:border-[#2eb78c]"
      }`}
    >
      {/* =========================================================================
          REST STATE LAYER (Mint Cream #F2FBF6 Background with Large Real Partner Logo)
          ========================================================================= */}
      <div className="absolute inset-0 p-6 sm:p-7 flex flex-col justify-between z-10 pointer-events-none">
        {/* Top Spacer */}
        <div className="w-full flex justify-between items-start" />

        {/* Center Real Partner Logo (Enlarged and scaled prominently) */}
        <div
          className={`w-full flex-1 flex items-center justify-center py-4 transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isCardOpen
              ? "opacity-0 scale-90 translate-y-4"
              : "opacity-100 scale-100 translate-y-0"
          }`}
        >
          <img
            src={partner.logoPath}
            alt={partner.name}
            className="w-full max-w-[260px] h-32 sm:h-36 md:h-40 object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Bottom Partner Name Label (At Rest - Dark Ink on Mint Cream) */}
        <div
          className={`transition-opacity duration-[400ms] ${
            isCardOpen ? "opacity-0" : "opacity-95"
          }`}
        >
          <span
            className="text-[15px] font-semibold text-[#003124] tracking-tight block"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {partner.name}
          </span>
        </div>
      </div>

      {/* =========================================================================
          HOVER REVEAL LAYER:
          1. Brand green (#2eb78c) fill rising from bottom via clip-path
          2. Scaled real logo at top-left
          3. Staggered line-by-line description in dark ink (#003124)
          4. Bottom partner name in dark ink
          ========================================================================= */}
      <div
        className={`absolute inset-0 bg-[#2eb78c] text-[#003124] p-6 sm:p-7 flex flex-col justify-between z-20 transition-[clip-path] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isCardOpen
            ? "clip-path-inset-0"
            : "clip-path-inset-bottom"
        }`}
        style={{
          clipPath: isCardOpen ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)",
        }}
      >
        {/* Top-Left Scaled Logo */}
        <div className="w-full flex items-start justify-between">
          <img
            src={partner.logoPath}
            alt={partner.name}
            className="h-12 sm:h-14 w-36 sm:w-44 max-w-[60%] object-contain object-left"
          />
        </div>

        {/* Middle / Bottom Group: Description + Partner Name */}
        <div className="flex flex-col space-y-4 pt-4">
          {/* Staggered Line-by-Line Description */}
          <div className="space-y-1">
            {partner.descriptionLines.map((line, lineIdx) => (
              <div key={lineIdx} className="overflow-hidden">
                <p
                  className={`text-[13.5px] sm:text-[14.5px] font-medium leading-[1.45] text-[#003124] m-0 transition-transform duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isCardOpen
                      ? "translate-y-0"
                      : "translate-y-[110%] max-[700px]:translate-y-0"
                  }`}
                  style={{
                    fontFamily: "var(--font-body)",
                    transitionDelay: isCardOpen
                      ? `${GOVERNANCE_CONFIG.timing.textStartDelayMs + lineIdx * GOVERNANCE_CONFIG.timing.staggerDelayMs}ms`
                      : "0ms",
                  }}
                >
                  {line}
                </p>
              </div>
            ))}
          </div>

          {/* Partner Name Label in Dark Ink */}
          <div className="pt-2 border-t border-[rgba(0,49,36,0.22)]">
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
