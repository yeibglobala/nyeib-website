"use client";

import React from "react";
import { FileText, Info } from "lucide-react";
import { ESG_CONTENT } from "@/src/content/esg";
import { EsgButton } from "./EsgButton";

export function EsgReportsSection() {
  const { headline, text, buttonLabel, buttonHref, leadIn, items, note } =
    ESG_CONTENT.reports;

  return (
    <section
      id="reports"
      data-theme="light"
      aria-label="Reports & Disclosures"
      className="relative w-full bg-white text-[#0F2A20] py-[72px] lg:py-[112px] px-4 sm:px-8 lg:px-12 border-t border-[#E6DCCB]/60 scroll-mt-32"
    >
      <div className="max-w-[1240px] w-full mx-auto">
        {/* =========================================================================
            TWO COLUMNS ON DESKTOP (900px+), ONE COLUMN ON MOBILE
            Left column is sticky while right scrolls
            ========================================================================= */}
        <div className="grid grid-cols-1 min-[900px]:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left Column: Headline, Text, and Desktop Button */}
          <div className="min-[900px]:col-span-5 min-[900px]:sticky min-[900px]:top-36 self-start">
            <h2
              className="text-[32px] sm:text-[42px] lg:text-[46px] font-bold text-[#0F2A20] leading-[1.12] tracking-tight mb-5"
              style={{ fontFamily: "var(--font-headline, 'Asul', Georgia, serif)" }}
            >
              {headline}
            </h2>
            <p
              className="text-base sm:text-[17px] text-[#0F2A20]/75 leading-relaxed font-normal mb-8"
              style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
            >
              {text}
            </p>

            {/* Desktop Button */}
            <div className="hidden min-[900px]:block pt-2">
              <EsgButton label={buttonLabel} href={buttonHref} variant="orange" />
            </div>
          </div>

          {/* Right Column: List of documents + Note callout + Mobile Button */}
          <div className="min-[900px]:col-span-7 flex flex-col">
            <p
              className="text-xs sm:text-sm text-[#0F2A20]/60 font-semibold tracking-wider uppercase mb-4"
              style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
            >
              {leadIn}
            </p>

            {/* Document Rows separated by hairline dividers */}
            <div className="divide-y divide-[#E6DCCB] border-y border-[#E6DCCB]">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="py-5 px-3 sm:px-4 rounded-xl transition-colors duration-200 hover:bg-[#F7F5F0] cursor-default flex items-start gap-4"
                >
                  <div className="w-9 h-9 rounded-full bg-[#BFEBDC]/50 text-[#0F2A20] flex items-center justify-center shrink-0 mt-0.5">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <h3
                      className="text-lg sm:text-[19px] font-semibold text-[#0F2A20] mb-1.5 leading-snug"
                      style={{
                        fontFamily: "var(--font-headline, 'Asul', Georgia, serif)",
                      }}
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
                </div>
              ))}
            </div>

            {/* Note Callout (Sand Tint) */}
            <div className="mt-8 rounded-2xl bg-[#F3E3A6]/40 border border-[#E6DCCB] p-4 sm:p-5 flex items-start gap-3.5">
              <span className="w-5 h-5 rounded-full bg-[#0F2A20] text-white flex items-center justify-center shrink-0 mt-0.5">
                <Info className="w-3.5 h-3.5" />
              </span>
              <p
                className="text-xs sm:text-sm text-[#0F2A20]/80 leading-relaxed m-0 font-medium"
                style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
              >
                {note}
              </p>
            </div>

            {/* Mobile Button (shown under note on phone) */}
            <div className="block min-[900px]:hidden pt-6">
              <EsgButton label={buttonLabel} href={buttonHref} variant="orange" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
