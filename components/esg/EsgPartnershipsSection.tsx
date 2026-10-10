"use client";

import React from "react";
import {
  Landmark,
  Building2,
  BadgeDollarSign,
  Users2,
  TrendingUp,
} from "lucide-react";
import { ESG_CONTENT } from "@/src/content/esg";
import { EsgButton } from "./EsgButton";

const ICONS = [
  { icon: Landmark, tintBg: "bg-[#BFEBDC]" },
  { icon: Building2, tintBg: "bg-[#F8CFA3]" },
  { icon: BadgeDollarSign, tintBg: "bg-[#F3E3A6]" },
  { icon: Users2, tintBg: "bg-[#A9DDD3]" },
  { icon: TrendingUp, tintBg: "bg-[#BFEBDC]" },
];

export function EsgPartnershipsSection() {
  const { headline, text, leadIn, items, ctaCard } = ESG_CONTENT.partnerships;

  return (
    <section
      id="partnerships"
      data-theme="light"
      aria-label="Partnerships"
      className="relative w-full bg-[#EFE7DC] text-[#0F2A20] py-[72px] lg:py-[112px] px-4 sm:px-8 lg:px-12 border-t border-[#E6DCCB]/60 scroll-mt-32"
    >
      <div className="max-w-[1240px] w-full mx-auto">
        {/* =========================================================================
            CENTERED STATEMENT & LEAD-IN
            ========================================================================= */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2
            className="text-[32px] sm:text-[44px] lg:text-[48px] font-bold text-[#0F2A20] leading-[1.12] tracking-tight mb-5"
            style={{ fontFamily: "var(--font-headline, 'Asul', Georgia, serif)" }}
          >
            {headline}
          </h2>
          <p
            className="text-base sm:text-lg text-[#0F2A20]/75 leading-relaxed font-normal mb-8"
            style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
          >
            {text}
          </p>
          <p
            className="text-base sm:text-[17px] text-[#4A5B53] font-normal leading-relaxed m-0"
            style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
          >
            {leadIn}
          </p>
        </div>

        {/* =========================================================================
            3-COLUMN GRID OF 6 CELLS (2 cols tablet, 1 col phone)
            Cells 1-5: White cards with lift on hover
            Cell 6: Mint-tinted card holding only the orange button
            ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, idx) => {
            const IconConfig = ICONS[idx % ICONS.length];
            const Icon = IconConfig.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-[24px] p-7 sm:p-8 border border-[#E6DCCB] shadow-[0_4px_20px_rgba(15,42,32,0.03)] flex flex-col justify-start transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(15,42,32,0.08)] cursor-default select-text"
              >
                {/* Small tinted icon at top */}
                <div
                  className={`w-11 h-11 rounded-2xl ${IconConfig.tintBg} text-[#0F2A20] flex items-center justify-center shrink-0 mb-6 shadow-xs`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <h3
                  className="text-xl sm:text-[22px] font-bold text-[#0F2A20] mb-3 leading-snug"
                  style={{ fontFamily: "var(--font-headline, 'Asul', Georgia, serif)" }}
                >
                  {item.title}
                </h3>

                <p
                  className="text-sm sm:text-[15px] text-[#4A5B53] leading-relaxed m-0"
                  style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
                >
                  {item.description}
                </p>
              </div>
            );
          })}

          {/* Cell 6: Mint-tinted card holding only the orange button */}
          <div className="bg-[#BFEBDC]/75 rounded-[24px] p-8 border border-[#96DCBE] shadow-[0_4px_20px_rgba(15,42,32,0.03)] flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(15,42,32,0.08)] min-h-[240px]">
            <EsgButton
              label={ctaCard.buttonLabel}
              href={ctaCard.buttonHref}
              variant="orange"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
