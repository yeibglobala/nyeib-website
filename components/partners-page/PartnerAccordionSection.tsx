"use client";

import React, { useState, useRef } from "react";
import { HeaderReveal } from "@/shared/components/HeaderReveal";
import { Parallax } from "@/shared/components/Parallax";
import { PartnerPillarsStage } from "./PartnerPillarsStage";

interface AccordionItem {
  number: string;
  title: string;
  description: string;
}

const PARTNER_ITEMS: AccordionItem[] = [
  {
    number: "01",
    title: "More than impact. A stronger investment opportunity.",
    description:
      "NYEIB helps institutions participate in businesses with growth potential, measurable impact and long-term economic value, while strengthening the conditions that can make those businesses more investment-ready.",
  },
  {
    number: "02",
    title: "Institutionally anchored. Professionally structured.",
    description:
      "NYEIB is being established through an institutional framework involving the Nigeria Sovereign Investment Authority, Development Bank of Nigeria and African Development Bank, with dedicated governance, investment and risk-management arrangements.",
  },
];

export function PartnerAccordionSection() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (idx: number) => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      setActiveIndex(idx);
    }, 60);
  };

  const handleMouseLeave = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
  };

  return (
    <section
      id="partner-pathways"
      data-theme="light"
      aria-label="Choose the pathway that fits your mandate"
      className="relative w-full bg-[#e3ece7] text-[#12201b] py-[clamp(88px,10vw,160px)] px-[clamp(24px,5.5vw,96px)] select-none overflow-hidden border-t border-[rgba(18,32,27,0.08)]"
    >
      <div className="max-w-[1440px] w-full mx-auto">
        {/* =========================================================================
            HEADER AT THE TOP (Full-width intro header)
            ========================================================================= */}
        <header className="mb-[clamp(48px,5.5vw,88px)]">
          <div className="grid grid-cols-1 min-[900px]:grid-cols-[7fr_5fr] gap-4 min-[900px]:gap-[4vw] items-end">
            <HeaderReveal delay={100} duration={950} parallaxSpeed={14}>
              <h2
                className="text-[clamp(2.2rem,3.8vw,3.6rem)] font-normal leading-[1.12] tracking-[-0.015em] text-[#12201b] m-0"
                style={{ fontFamily: "var(--font-headline, serif)" }}
              >
                Choose the pathway that{" "}
                <span className="text-[#1f9d74]">fits your mandate</span>.
              </h2>
            </HeaderReveal>

            <HeaderReveal delay={200} duration={950} mask={false} parallaxSpeed={12}>
              <p
                className="m-0 text-[#4a5d55] max-w-[46ch] text-[clamp(0.98rem,1.15vw,1.12rem)] leading-[1.6]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Partners may explore opportunities across the Equity Investment Fund,
                Credit Guarantee Facility and Ecosystem Development Fund, as well as
                co-investment, technical-assistance funding and other forms of support
                aligned with their mandate.
              </p>
            </HeaderReveal>
          </div>
        </header>

        {/* =========================================================================
            ACCORDION BODY: Left 5fr Accordion List, Right 7fr Particle Stage
            ========================================================================= */}
        <div className="grid grid-cols-1 min-[900px]:grid-cols-[5fr_7fr] gap-12 min-[900px]:gap-[5vw] items-center">
          {/* Left Column: Interactive Accordion Rows */}
          <div
            onMouseLeave={handleMouseLeave}
            className="border-t border-[rgba(18,32,27,0.16)] flex flex-col"
          >
            {PARTNER_ITEMS.map((item, idx) => {
              const isActive = activeIndex === idx;

              return (
                <div
                  key={item.number}
                  onMouseEnter={() => handleMouseEnter(idx)}
                  className="group relative border-b border-[rgba(18,32,27,0.16)]"
                >
                  <button
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    aria-expanded={isActive}
                    aria-controls={`partner-panel-${item.number}`}
                    className={`w-full text-left grid grid-cols-[44px_1fr] gap-2 py-7 px-0 cursor-pointer outline-none focus-visible:outline-2 focus-visible:outline-[#1f9d74] rounded-sm transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-45 hover:opacity-80"
                    }`}
                  >
                    <span
                      className="font-semibold text-[#f88404] text-[0.95rem] pt-[0.2em]"
                      style={{ fontFamily: "var(--font-mono, monospace)" }}
                    >
                      {item.number}
                    </span>
                    <h3
                      className="text-[clamp(1.18rem,1.8vw,1.65rem)] leading-[1.25] font-normal text-[#12201b] m-0"
                      style={{ fontFamily: "var(--font-headline, serif)" }}
                    >
                      {item.title}
                    </h3>
                  </button>

                  {/* Accordion Expand Panel */}
                  <div
                    id={`partner-panel-${item.number}`}
                    role="region"
                    className={`grid transition-[grid-template-rows] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isActive
                        ? "grid-rows-[1fr] duration-[500ms]"
                        : "grid-rows-[0fr] duration-[300ms]"
                    }`}
                  >
                    <div className="overflow-hidden min-h-0 pl-[44px]">
                      <div
                        className={`pb-7 transition-all ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          isActive
                            ? "opacity-100 translate-y-0 duration-[500ms] delay-[80ms]"
                            : "opacity-0 translate-y-2 duration-200 delay-0"
                        }`}
                      >
                        <p
                          className="m-0 text-[#4a5d55] text-[clamp(0.98rem,1.1vw,1.1rem)] leading-[1.65]"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Morphing Particle Stage */}
          <div className="w-full flex items-center justify-center">
            <Parallax speed={16} className="w-full">
              <PartnerPillarsStage activeIndex={activeIndex} />
            </Parallax>
          </div>
        </div>
      </div>
    </section>
  );
}
