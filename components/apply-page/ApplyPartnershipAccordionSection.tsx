"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Parallax } from "@/shared/components/Parallax";
import {
  HoverFillAccordionItem,
  BrandColorConfig,
} from "@/shared/components/HoverFillAccordionItem";

import { HeaderReveal } from "@/shared/components/HeaderReveal";

interface ApplyPartnershipAccordionSectionProps {
  onOpenModal: (track: "vc_pe" | "banks" | "ecosystem" | "research" | "investors") => void;
}

const PARTNERSHIP_ACCORDION_ITEMS = [
  {
    id: "vc_pe" as const,
    num: "01",
    title: "Venture Capital & Private Equity Fund Managers",
    description:
      "For fund managers interested in investment, co-investment or other partnership opportunities with NYEIB.",
  },
  {
    id: "banks" as const,
    num: "02",
    title: "Banks & Licensed Lenders",
    description:
      "For banks, microfinance banks and other licensed lenders interested in risk-sharing arrangements that can help expand lending to eligible businesses.",
  },
  {
    id: "ecosystem" as const,
    num: "03",
    title: "Ecosystem Support Organisations",
    description:
      "For business development service providers, incubators, accelerators and other organisations that support entrepreneurs and MSMEs.",
  },
  {
    id: "research" as const,
    num: "04",
    title: "Research, Policy & Public Institutions",
    description:
      "For organisations working on entrepreneurship research, policy, data or public initiatives that can strengthen Nigeria’s MSME and entrepreneurial ecosystem.",
  },
  {
    id: "investors" as const,
    num: "05",
    title: "Investors & Development Partners",
    description:
      "For institutions interested in investing in, co-investing alongside, funding technical assistance or otherwise partnering with NYEIB.",
  },
];

export function ApplyPartnershipAccordionSection({
  onOpenModal,
}: ApplyPartnershipAccordionSectionProps) {
  const [openId, setOpenId] = useState<string | null>("vc_pe");

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="partnership-accordion"
      data-theme="light"
      className="relative w-full bg-white py-20 sm:py-28 px-6 sm:px-8 lg:px-12 text-[#003124] border-b border-[#003124]/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-14 sm:space-y-16">
        {/* =========================================================================
            HEADER: Clean Evergreen Headline with HeaderReveal
            ========================================================================= */}
        <div className="flex flex-col space-y-3 max-w-3xl">
          <HeaderReveal delay={0} duration={800} mask={false} parallaxSpeed={10}>
            <span
              className="text-[13px] font-semibold tracking-[0.16em] uppercase text-[#F88404] block"
              style={{ fontFamily: "var(--font-mono, monospace)" }}
            >
              PATHWAY 2 — PARTNER WITH NYEIB
            </span>
          </HeaderReveal>

          <HeaderReveal delay={120} duration={950} parallaxSpeed={14}>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#003124] leading-[1.15]"
              style={{ fontFamily: "var(--font-headline, serif)" }}
            >
              Institutional engagement across five structured tracks.
            </h2>
          </HeaderReveal>

          <HeaderReveal delay={240} duration={950} mask={false} parallaxSpeed={10}>
            <p className="text-[#2b3d36] text-base sm:text-lg leading-relaxed font-normal pt-1 m-0">
              NYEIB collaborates with financial institutions, fund managers, enterprise enablers, and development partners to mobilize capital at scale.
            </p>
          </HeaderReveal>
        </div>

        {/* =========================================================================
            ACCORDION WITH HOVER RADIAL SPREAD FILL ANIMATION
            ========================================================================= */}
        <Parallax speed={18} className="w-full">
          <div className="space-y-4 max-w-5xl">
            {PARTNERSHIP_ACCORDION_ITEMS.map((item, idx) => {
              const isOpen = openId === item.id;

              return (
                <HoverFillAccordionItem
                  key={item.id}
                  id={item.id}
                  index={idx}
                  number={item.num}
                  title={item.title}
                  isOpen={isOpen}
                  onToggle={() => toggleItem(item.id)}
                >
                  {(colorConfig: BrandColorConfig, isFilled: boolean) => (
                    <>
                      <p
                        className={`text-base sm:text-[17px] leading-relaxed font-normal max-w-3xl transition-colors duration-200 ${
                          isFilled ? colorConfig.descColor : "text-[#2b3d36]"
                        }`}
                      >
                        {item.description}
                      </p>

                      <div className="flex items-center gap-4 pt-1">
                        <button
                          type="button"
                          onClick={() => onOpenModal(item.id)}
                          className={`inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full font-semibold text-xs sm:text-sm transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 ${
                            isFilled
                              ? colorConfig.id === "oak"
                                ? "bg-[#003124] text-white hover:bg-[#0b523b]"
                                : "bg-white text-[#003124] hover:bg-[#FAF7F2]"
                              : "bg-[#00BE93] hover:bg-[#008f6e] text-white"
                          }`}
                        >
                          Explore Partnership
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </>
                  )}
                </HoverFillAccordionItem>
              );
            })}
          </div>
        </Parallax>
      </div>
    </section>
  );
}
