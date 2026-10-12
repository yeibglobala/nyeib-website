"use client";

import React, { useState, useRef } from "react";
import { Sprout, Landmark, Users, ChartNoAxesCombined } from "lucide-react";
import { ESG_CONTENT } from "@/src/content/esg";

const PILLAR_ICONS: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  "principles-commitments": Sprout,
  "governance-accountability": Landmark,
  "stakeholder-engagement": Users,
  "impact-performance": ChartNoAxesCombined,
};

const PILLAR_ICONS_LIST = [Sprout, Landmark, Users, ChartNoAxesCombined];

export function EsgApproachSection() {
  const { headline, text, leadIn, areas } = ESG_CONTENT.approach;
  const [activeTab, setActiveTab] = useState<number>(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      nextIndex = (index + 1) % areas.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
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
      className="relative w-full bg-[#F7F5F0] text-[#0F2A20] py-16 sm:py-20 lg:py-24 px-5 sm:px-8 lg:px-12 scroll-mt-32"
    >
      <div className="max-w-[1180px] w-full mx-auto">
        {/* =========================================================================
            HEADER WITH EYEBROW & LEAD-IN
            ========================================================================= */}
        <header className="max-w-[780px] mx-auto text-center mb-10 sm:mb-12">
          <span className="inline-flex items-center gap-2.5 mb-4 text-[#0D3026] text-xs font-bold tracking-[0.12em] uppercase select-none">
            <span className="w-6 h-[2px] bg-[#FB8500]" aria-hidden="true" />
            Our approach
          </span>
          <h2
            className="max-w-[850px] mx-auto text-[32px] sm:text-[42px] lg:text-[50px] font-bold text-[#0D3026] leading-[1.12] tracking-tight mb-5"
            style={{ fontFamily: "var(--font-headline, 'Asul', Georgia, serif)" }}
          >
            {headline}
          </h2>
          <p
            className="max-w-[700px] mx-auto text-base sm:text-[17px] text-[#435B51] leading-[1.8] font-normal m-0"
            style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
          >
            {text}
          </p>
          <p
            className="mt-6 sm:mt-7 text-base sm:text-[17px] text-[#435B51] font-semibold leading-[1.8] m-0"
            style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
          >
            {leadIn}
          </p>
        </header>

        {/* =========================================================================
            PILLAR TABS (2x2 on mobile, 4 columns on tablet & desktop)
            ========================================================================= */}
        <div
          role="tablist"
          aria-label="Sustainability pillars"
          className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3.5 mb-5"
        >
          {areas.map((area, idx) => {
            const isSelected = activeTab === idx;
            const Icon = PILLAR_ICONS[area.id] || PILLAR_ICONS_LIST[idx] || Sprout;
            return (
              <button
                key={area.id}
                id={`tab-${area.id}`}
                ref={(el) => {
                  tabRefs.current[idx] = el;
                }}
                role="tab"
                type="button"
                tabIndex={isSelected ? 0 : -1}
                aria-selected={isSelected}
                aria-controls="pillar-panel"
                onClick={() => setActiveTab(idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                style={{
                  backgroundColor: area.buttonBg,
                }}
                className={`min-h-[82px] sm:min-h-[94px] p-3.5 sm:p-4 rounded-2xl text-[12.5px] sm:text-[13.5px] font-bold text-[#0D3026] leading-[1.35] cursor-pointer text-left flex flex-col justify-between items-start transition-all duration-200 outline-none ${
                  isSelected
                    ? "border border-[#0D3026]/30 shadow-[inset_0_0_0_1px_#0D3026,0_6px_16px_rgba(13,48,38,0.06)] -translate-y-0.5"
                    : "border border-[#E7DDCC] hover:-translate-y-0.5"
                } focus-visible:ring-3 focus-visible:ring-[#FB8500] focus-visible:ring-offset-2`}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#0D3026] shrink-0 mb-2 sm:mb-2.5" strokeWidth={2} />
                <span>{area.name}</span>
              </button>
            );
          })}
        </div>

        {/* =========================================================================
            PILLAR PANEL (Interactive split panel with aside takeaway)
            ========================================================================= */}
        <article
          id="pillar-panel"
          role="tabpanel"
          aria-labelledby={`tab-${currentArea.id}`}
          tabIndex={0}
          style={{
            backgroundColor: currentArea.panelTone,
          }}
          className="grid grid-cols-1 md:grid-cols-[minmax(0,1.2fr)_minmax(240px,0.8fr)] gap-8 md:gap-10 lg:gap-12 items-center min-h-[320px] p-6 sm:p-10 lg:p-14 rounded-[26px] sm:rounded-[28px] border border-[#E7DDCC]/60 transition-colors duration-300 ease-out outline-none focus-visible:ring-2 focus-visible:ring-[#0D3026]"
        >
          {/* Left Column: Headline and paragraphs */}
          <div className="flex flex-col">
            <h3
              id="pillar-title"
              className="text-[24px] sm:text-[28px] lg:text-[34px] font-bold text-[#0D3026] leading-[1.2] tracking-tight mb-5"
              style={{ fontFamily: "var(--font-headline, 'Asul', Georgia, serif)" }}
            >
              {currentArea.headline}
            </h3>
            <div
              id="pillar-copy"
              className="space-y-4 max-w-[700px] text-sm sm:text-[15px] lg:text-base text-[#304B40] leading-[1.8]"
              style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
            >
              {currentArea.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="m-0">
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* Right Column: Aside with 64px serif number, subtitle, and takeaway */}
          <aside className="pt-6 border-t border-[#0D3026]/20 md:pt-0 md:border-t-0 md:pl-8 lg:pl-10 md:border-l md:border-[#0D3026]/20 flex flex-col justify-center">
            <span
              id="pillar-number"
              className="block font-bold text-5xl sm:text-[60px] lg:text-[64px] text-[#0D3026] leading-none select-none"
              style={{ fontFamily: "var(--font-headline, 'Asul', Georgia, serif)" }}
            >
              {currentArea.number}
            </span>
            <h4
              id="pillar-aside-title"
              className="mt-4 mb-2 text-sm sm:text-[15px] font-bold text-[#0D3026] leading-snug"
              style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
            >
              {currentArea.asideTitle}
            </h4>
            <p
              id="pillar-aside-copy"
              className="m-0 text-[#38574B] text-[13px] sm:text-[13.5px] leading-[1.8]"
              style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
            >
              {currentArea.asideCopy}
            </p>
          </aside>
        </article>
      </div>
    </section>
  );
}
