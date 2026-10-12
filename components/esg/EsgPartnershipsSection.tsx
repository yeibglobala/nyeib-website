"use client";

import React from "react";
import { ESG_CONTENT } from "@/src/content/esg";
import { EsgButton } from "./EsgButton";
import { PartnershipWaveCard } from "@/components/cards/PartnershipWaveCard";

export interface EsgPartnershipsSectionProps {
  className?: string;
  bgColor?: string;
}

export function EsgPartnershipsSection({
  className = "",
  bgColor = "bg-[#E8F3EE]",
}: EsgPartnershipsSectionProps = {}) {
  const { headline, text, leadIn, items, ctaCard } = ESG_CONTENT.partnerships;

  return (
    <section
      id="partnerships"
      data-theme="light"
      aria-label="Partnerships"
      className={`relative w-full ${bgColor} text-[#003124] py-[72px] lg:py-[112px] px-4 sm:px-8 lg:px-12 border-t border-[#003124]/10 scroll-mt-32 ${className}`}
    >
      <div className="max-w-[1320px] w-full mx-auto flex flex-col items-center">
        {/* =========================================================================
            CENTERED STATEMENT & LEAD-IN
            ========================================================================= */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-14">
          <h2
            className="text-[32px] sm:text-[44px] lg:text-[48px] font-bold text-[#003124] leading-[1.12] tracking-tight mb-5"
            style={{ fontFamily: "var(--font-headline, 'Asul', Georgia, serif)" }}
          >
            {headline}
          </h2>
          <p
            className="text-base sm:text-lg text-[#003124]/75 leading-relaxed font-normal mb-6 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
          >
            {text}
          </p>
          <p
            className="text-xs sm:text-sm font-semibold text-[#003124]/65 uppercase tracking-wide leading-relaxed m-0"
            style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
          >
            {leadIn}
          </p>
        </div>

        {/* =========================================================================
            CARDS GRID: 3 in top row, 2 centered in bottom row (matching Figma)
            ========================================================================= */}
        <div className="w-full flex flex-col items-center gap-6 sm:gap-8">
          {/* Top row: 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full max-w-[1280px] justify-items-center">
            {items.slice(0, 3).map((item, idx) => (
              <div key={idx} className="w-full flex justify-center">
                <PartnershipWaveCard
                  title={item.title}
                  description={item.description}
                />
              </div>
            ))}
          </div>

          {/* Bottom row: 2 cards centered */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full max-w-[840px] justify-items-center">
            {items.slice(3, 5).map((item, idx) => (
              <div key={idx} className="w-full flex justify-center">
                <PartnershipWaveCard
                  title={item.title}
                  description={item.description}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Centered CTA Button */}
        {ctaCard && (
          <div className="mt-12 sm:mt-16 flex justify-center">
            <EsgButton
              label={ctaCard.buttonLabel}
              href={ctaCard.buttonHref}
              variant="orange"
            />
          </div>
        )}
      </div>
    </section>
  );
}
