"use client";

import React, { useState, useRef, useEffect } from "react";
import { Check, ChevronDown } from "lucide-react";
import { ESG_CONTENT } from "@/src/content/esg";

export function EsgApproachSection() {
  const { headline, text, leadIn, areas } = ESG_CONTENT.approach;
  const [activeTab, setActiveTab] = useState<number>(0);
  const [openAccordion, setOpenAccordion] = useState<number>(0);
  const [isClient, setIsClient] = useState<boolean>(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (e.key === "ArrowRight") {
      nextIndex = (index + 1) % areas.length;
    } else if (e.key === "ArrowLeft") {
      nextIndex = (index - 1 + areas.length) % areas.length;
    } else if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = areas.length - 1;
    } else {
      return;
    }
    e.preventDefault();
    setActiveTab(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  const currentArea = areas[activeTab];

  return (
    <section
      id="approach"
      data-theme="light"
      aria-label="Our Approach to Sustainability"
      className="relative w-full bg-[#F7F5F0] text-[#0F2A20] py-[72px] lg:py-[112px] px-4 sm:px-8 lg:px-12 scroll-mt-32"
    >
      <div className="max-w-[1240px] w-full mx-auto">
        {/* =========================================================================
            CENTERED STATEMENT & LEAD-IN
            ========================================================================= */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2
            className="text-[32px] sm:text-[44px] lg:text-[50px] font-bold text-[#0F2A20] leading-[1.12] tracking-tight mb-5"
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
            className="text-sm sm:text-base text-[#0F2A20]/60 font-medium tracking-wide uppercase"
            style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
          >
            {leadIn}
          </p>
        </div>

        {/* =========================================================================
            DESKTOP TAB EXPLORER (820px and wider)
            WAI-ARIA tabs pattern with arrow key & Home/End support
            ========================================================================= */}
        <div className="hidden min-[820px]:block">
          {/* Tab buttons row */}
          <div
            role="tablist"
            aria-label="Sustainability Focus Areas"
            className="grid grid-cols-4 gap-3 sm:gap-4 mb-6"
          >
            {areas.map((area, idx) => {
              const isSelected = activeTab === idx;
              return (
                <button
                  key={area.id}
                  id={`tab-${area.id}`}
                  ref={(el) => {
                    tabRefs.current[idx] = el;
                  }}
                  role="tab"
                  tabIndex={isSelected ? 0 : -1}
                  aria-selected={isSelected}
                  aria-controls={`panel-${area.id}`}
                  onClick={() => setActiveTab(idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  className={`px-5 py-4 rounded-2xl text-[14px] sm:text-[15px] font-semibold text-center transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#0F2A20] border ${
                    isSelected
                      ? "shadow-sm border-transparent"
                      : "border-[#E6DCCB] hover:border-[#0F2A20]/30"
                  }`}
                  style={{
                    backgroundColor: isSelected ? area.tint : `${area.tint}40`,
                    color: "#0F2A20",
                    fontFamily: "var(--font-body, system-ui, sans-serif)",
                  }}
                >
                  {area.name}
                </button>
              );
            })}
          </div>

          {/* Full-width content panel in the selected tint (with SSR fallback) */}
          <div className="relative">
            {areas.map((area, idx) => {
              const isSelected = activeTab === idx;
              // If client JS is off, show stacked; if client is active, hide unselected
              if (isClient && !isSelected) return null;

              return (
                <div
                  key={area.id}
                  id={`panel-${area.id}`}
                  role="tabpanel"
                  tabIndex={0}
                  aria-labelledby={`tab-${area.id}`}
                  className="w-full rounded-[28px] p-8 sm:p-12 border border-[#E6DCCB]/60 shadow-[0_12px_40px_rgba(15,42,32,0.04)] transition-opacity duration-250 ease-out outline-none focus-visible:ring-2 focus-visible:ring-[#0F2A20]"
                  style={{
                    backgroundColor: area.tint,
                    color: "#0F2A20",
                  }}
                >
                  <h3
                    className="text-2xl sm:text-3xl font-bold text-[#0F2A20] mb-6 leading-tight"
                    style={{ fontFamily: "var(--font-headline, 'Asul', Georgia, serif)" }}
                  >
                    {area.headline}
                  </h3>

                  <div
                    className="space-y-4 max-w-3xl text-base sm:text-[17px] text-[#0F2A20]/85 leading-relaxed"
                    style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
                  >
                    {area.paragraphs.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}

                    {/* Indicator list if present */}
                    {area.indicators && (
                      <div className="pt-3 pb-2">
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 list-none p-0 m-0">
                          {area.indicators.map((ind, iIdx) => (
                            <li
                              key={iIdx}
                              className="flex items-start gap-3 text-[15px] sm:text-base font-medium text-[#0F2A20]"
                            >
                              <span className="w-5 h-5 rounded-full bg-[#0F2A20] text-white flex items-center justify-center shrink-0 mt-0.5">
                                <Check className="w-3.5 h-3.5" />
                              </span>
                              <span>{ind}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {area.closingParagraph && (
                      <p className="pt-2 font-medium text-[#0F2A20]">
                        {area.closingParagraph}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            PHONE ACCORDION (under 820px)
            Single active accordion item with tinted headers
            ========================================================================= */}
        <div className="block min-[820px]:hidden space-y-4">
          {areas.map((area, idx) => {
            const isOpen = openAccordion === idx;
            return (
              <div
                key={area.id}
                className="rounded-2xl border border-[#E6DCCB] overflow-hidden shadow-sm"
              >
                {/* Accordion header */}
                <button
                  type="button"
                  onClick={() => setOpenAccordion(isOpen ? -1 : idx)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between p-5 text-left font-semibold text-base transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#0F2A20]"
                  style={{
                    backgroundColor: area.tint,
                    color: "#0F2A20",
                    fontFamily: "var(--font-body, system-ui, sans-serif)",
                  }}
                >
                  <span>{area.name}</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Accordion panel body */}
                {isOpen && (
                  <div
                    className="p-6 transition-all duration-200"
                    style={{
                      backgroundColor: `${area.tint}35`,
                      color: "#0F2A20",
                    }}
                  >
                    <h3
                      className="text-xl font-bold text-[#0F2A20] mb-4 leading-tight"
                      style={{
                        fontFamily: "var(--font-headline, 'Asul', Georgia, serif)",
                      }}
                    >
                      {area.headline}
                    </h3>

                    <div
                      className="space-y-3 text-sm sm:text-base text-[#0F2A20]/85 leading-relaxed"
                      style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
                    >
                      {area.paragraphs.map((p, pIdx) => (
                        <p key={pIdx}>{p}</p>
                      ))}

                      {area.indicators && (
                        <div className="pt-2 pb-1">
                          <ul className="space-y-2.5 list-none p-0 m-0">
                            {area.indicators.map((ind, iIdx) => (
                              <li
                                key={iIdx}
                                className="flex items-start gap-2.5 text-sm font-medium text-[#0F2A20]"
                              >
                                <span className="w-4 h-4 rounded-full bg-[#0F2A20] text-white flex items-center justify-center shrink-0 mt-0.5">
                                  <Check className="w-3 h-3" />
                                </span>
                                <span>{ind}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {area.closingParagraph && (
                        <p className="pt-1 font-medium text-[#0F2A20]">
                          {area.closingParagraph}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
