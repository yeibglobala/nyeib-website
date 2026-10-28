"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Plus,
  ArrowUpRight,
  Sprout,
  Cpu,
  Factory,
  Palette,
  HeartPulse,
  SunMedium,
  Truck,
  Landmark,
} from "lucide-react";
import { HeaderReveal } from "@/shared/components/HeaderReveal";
import { StatFlipCard } from "@/components/cards/StatFlipCard";

export interface SectorOpportunity {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const SECTORS_SUPPORTED: SectorOpportunity[] = [
  {
    id: "agriculture-agro-processing",
    title: "Agriculture & Agro-Processing",
    description:
      "Supporting businesses across agricultural production, food processing and value chains that can improve productivity, expand market access and create jobs.",
    icon: Sprout,
  },
  {
    id: "technology-digital-services",
    title: "Technology & Digital Services",
    description:
      "Enabling businesses that use technology to develop solutions, improve efficiency, expand digital access and reach new markets.",
    icon: Cpu,
  },
  {
    id: "manufacturing-industrial-enterprises",
    title: "Manufacturing & Industrial Enterprises",
    description:
      "Supporting businesses involved in production, processing and value addition, with opportunities to strengthen local industries and employment.",
    icon: Factory,
  },
  {
    id: "creative-industries",
    title: "Creative Industries",
    description:
      "Recognising opportunities in media, fashion, entertainment, design and other creative businesses with the potential to grow and generate employment.",
    icon: Palette,
  },
  {
    id: "healthcare-education",
    title: "Healthcare & Education",
    description:
      "Supporting enterprises developing products and services that improve access to essential services, strengthen human capital and create economic opportunities.",
    icon: HeartPulse,
  },
  {
    id: "clean-energy-climate-solutions",
    title: "Clean Energy & Climate Solutions",
    description:
      "Encouraging businesses offering environmentally responsible solutions, including renewable energy, resource efficiency and climate resilience.",
    icon: SunMedium,
  },
  {
    id: "trade-logistics-distribution",
    title: "Trade, Logistics & Distribution",
    description:
      "Supporting businesses that improve supply chains, connect producers to markets and strengthen the movement of goods and services.",
    icon: Truck,
  },
  {
    id: "financial-professional-services",
    title: "Financial & Professional Services",
    description:
      "Recognising businesses providing financial, advisory and other professional services that support enterprise growth and wider economic participation.",
    icon: Landmark,
  },
];

export interface StakeholderCardData {
  id: string;
  title: string;
  description: string;
}

export const STAKEHOLDER_FLIP_CARDS: StakeholderCardData[] = [
  {
    id: "for-entrepreneurs-businesses",
    title: "For Entrepreneurs & Businesses",
    description:
      "Your sector does not have to fall within a specific industry to be considered. NYEIB looks at your business's growth potential, commercial viability, capacity to create jobs and alignment with its investment criteria.",
  },
  {
    id: "for-investors-institutional-partners",
    title: "For Investors & Institutional Partners",
    description:
      "NYEIB's sector-agnostic approach creates opportunities to engage with businesses across multiple industries, supporting portfolio diversification, responsible investment and long-term economic value.",
  },
  {
    id: "for-ecosystem-partners",
    title: "For Ecosystem Partners",
    description:
      "Organisations providing business development, technical assistance, market access and investment-readiness support can explore opportunities to strengthen enterprises across different sectors.",
  },
];

export function SectorsSupportedSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="sectors-we-support"
      aria-label="Sectors We Support"
      className="relative w-full bg-[#eef6f2] text-[#003124] py-16 sm:py-20 lg:py-28 px-5 sm:px-8 lg:px-16 overflow-hidden border-t border-[#003124]/10"
    >
      <div className="max-w-[1240px] w-full mx-auto">
        {/* =========================================================================
            HEADER: 2-Column Layout matching Partners Accordion Section
            Left: Eyebrow + Headline
            Right: Description Paragraphs
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-16 items-start pb-12 sm:pb-16">
          {/* Left Column: Heading */}
          <div className="flex flex-col items-start gap-3 sm:gap-4">
            <span
              className="text-xs sm:text-sm uppercase font-mono tracking-[0.22em] font-bold text-[#00875A]"
              style={{ fontFamily: "var(--font-body, 'Chivo', sans-serif)" }}
            >
              Sectors We Support
            </span>
            <HeaderReveal delay={80} duration={900}>
              <h2
                className="text-[34px] sm:text-[44px] lg:text-[52px] font-bold leading-[1.12] tracking-tight text-[#003124] m-0"
                style={{ fontFamily: "var(--font-headline, 'Asul', Georgia, serif)" }}
              >
                Sector Agnostic. Growth Focused.
              </h2>
            </HeaderReveal>
          </div>

          {/* Right Column: Paragraph Descriptions */}
          <div className="flex flex-col items-start gap-4 lg:pt-8">
            <HeaderReveal delay={140} duration={900} mask={false}>
              <p
                className="text-[17px] sm:text-[19px] lg:text-[20px] leading-[1.45] text-[#003124] font-semibold m-0"
                style={{ fontFamily: "var(--font-body, 'Chivo', sans-serif)" }}
              >
                Supporting businesses across industries and creating opportunities across Nigeria.
              </p>
            </HeaderReveal>
            <HeaderReveal delay={200} duration={900} mask={false}>
              <p
                className="text-[15px] sm:text-[16px] lg:text-[17px] leading-[1.65] text-[#003124]/80 font-normal m-0"
                style={{ fontFamily: "var(--font-body, 'Chivo', sans-serif)" }}
              >
                NYEIB considers growth-oriented businesses across different sectors of the economy,
                recognising that opportunities for job creation, innovation and sustainable growth
                exist beyond any single industry.
              </p>
            </HeaderReveal>
            <HeaderReveal delay={260} duration={900} mask={false}>
              <p
                className="text-[15px] sm:text-[16px] lg:text-[17px] leading-[1.65] text-[#003124]/80 font-normal m-0"
                style={{ fontFamily: "var(--font-body, 'Chivo', sans-serif)" }}
              >
                Our focus is on businesses with the potential to scale, create employment and
                contribute to Nigeria&apos;s economic development, with particular attention to
                youth- and women-led enterprises.
              </p>
            </HeaderReveal>
          </div>
        </div>

        {/* =========================================================================
            AREAS OF OPPORTUNITY LABEL (Clean, no line outline)
            ========================================================================= */}
        <div className="pt-4 pb-5">
          <span
            className="text-xs sm:text-sm uppercase font-mono tracking-[0.2em] font-bold text-[#00875A]"
            style={{ fontFamily: "var(--font-body, 'Chivo', sans-serif)" }}
          >
            Areas of Opportunity
          </span>
        </div>

        {/* =========================================================================
            ACCORDION LIST: 8 Sectors
            Orange icons on the left, CTA button inside all dropdowns
            ========================================================================= */}
        <div className="border-t border-[#003124]/15 flex flex-col w-full">
          {SECTORS_SUPPORTED.map((item, index) => {
            const isOpen = openIndex === index;
            const SectorIcon = item.icon;

            return (
              <div
                key={item.id}
                className="border-b border-[#003124]/15 transition-colors duration-200"
              >
                {/* Header Row: Orange Sector Icon on left, Title, Circular Plus/Minus toggle */}
                <button
                  type="button"
                  id={`sector-item-h-${index}`}
                  aria-expanded={isOpen}
                  aria-controls={`sector-item-p-${index}`}
                  onClick={() => toggleAccordion(index)}
                  className="w-full py-6 sm:py-8 flex items-center justify-between text-left group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00BE93] rounded-lg"
                >
                  <div className="flex items-center gap-4 sm:gap-6 pr-4">
                    {/* Sector Icon badge: White circle fill with green icon */}
                    <div
                      className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                        isOpen
                          ? "bg-[#00875A] text-white border-[#00875A] shadow-sm"
                          : "bg-white text-[#00875A] border-[#003124]/12 shadow-[0_2px_8px_rgba(0,49,36,0.06)] group-hover:border-[#00875A]/50 group-hover:scale-105"
                      }`}
                      aria-hidden="true"
                    >
                      <SectorIcon className="w-5 h-5 sm:w-5.5 sm:h-5.5 transition-transform duration-300 group-hover:scale-110" />
                    </div>

                    {/* Title */}
                    <h3
                      className="text-[20px] sm:text-[24px] lg:text-[28px] font-bold text-[#003124] group-hover:text-[#00875A] transition-colors leading-[1.25] tracking-tight m-0"
                      style={{
                        fontFamily: "var(--font-headline, 'Asul', Georgia, serif)",
                      }}
                    >
                      {item.title}
                    </h3>
                  </div>

                  {/* Circular Button on the Right */}
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#003124]/20 flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? "bg-[#003124] text-white border-[#003124] rotate-45"
                        : "bg-transparent text-[#003124] group-hover:border-[#00875A] group-hover:text-[#00875A]"
                    }`}
                    aria-hidden="true"
                  >
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300" />
                  </div>
                </button>

                {/* Collapsible Content Panel with CTA button */}
                {isOpen && (
                  <div
                    id={`sector-item-p-${index}`}
                    role="region"
                    aria-labelledby={`sector-item-h-${index}`}
                    className="pb-8 pl-[60px] sm:pl-[72px] pr-4 sm:pr-12 animate-fadeIn"
                  >
                    <div className="max-w-[760px] flex flex-col items-start gap-4 pt-1">
                      <p
                        className="text-[15px] sm:text-[16.5px] text-[#003124]/85 leading-[1.65] m-0"
                        style={{
                          fontFamily: "var(--font-body, 'Chivo', sans-serif)",
                        }}
                      >
                        {item.description}
                      </p>

                      <div className="pt-2">
                        <Link
                          href="/apply"
                          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#003124] text-white font-medium text-sm hover:bg-[#00875A] transition-all shadow-sm active:scale-95"
                          style={{
                            fontFamily: "var(--font-body, 'Chivo', sans-serif)",
                          }}
                        >
                          <span>Apply for Funding</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* =========================================================================
            WHAT THIS MEANS FOR APPLICANTS & PARTNERS
            Front: Just Title. Back on hover: Full text.
            ========================================================================= */}
        <div className="mt-16 sm:mt-20 lg:mt-24 pt-12 sm:pt-16 border-t border-[#003124]/15 flex flex-col gap-10 sm:gap-12">
          {/* Subsection Heading */}
          <div className="flex flex-col items-start gap-3 max-w-3xl">
            <HeaderReveal delay={80} duration={850}>
              <h3
                className="text-[28px] sm:text-[36px] lg:text-[42px] font-bold leading-[1.18] tracking-tight text-[#003124] m-0"
                style={{ fontFamily: "var(--font-headline, 'Asul', Georgia, serif)" }}
              >
                What This Means for Applicants &amp; Partners
              </h3>
            </HeaderReveal>
          </div>

          {/* 3 Flip Cards Grid (Front: Title only, Back: Remaining content) */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 w-full">
            {STAKEHOLDER_FLIP_CARDS.map((card) => (
              <StatFlipCard
                key={card.id}
                variant="style1"
                frontStat={card.title}
                frontStatClassName="text-[26px] sm:text-[28px] lg:text-[30px] font-bold leading-[1.2] tracking-tight text-[#003124] pt-2"
                backStat={card.title}
                backStatClassName="text-[22px] sm:text-[24px] font-bold leading-[1.25] tracking-tight text-[#eef6f2]"
                backDescription={card.description}
                backDescriptionClassName="text-[14.5px] sm:text-[15.5px] leading-[1.65] text-[#eef6f2]/90 max-w-full pt-3"
                backItems={[]}
                className="w-full h-[380px] sm:h-[400px] xl:h-[420px]"
              />
            ))}
          </div>

          {/* Bottom Assessment & Approval Disclaimer */}
          <div className="pt-6 border-t border-[#003124]/10">
            <p
              className="text-[13px] sm:text-[14px] leading-relaxed text-[#003124]/65 italic m-0 max-w-4xl"
              style={{ fontFamily: "var(--font-body, 'Chivo', sans-serif)" }}
            >
              All applications and partnership opportunities remain subject to the relevant eligibility, assessment and approval processes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SectorsSupportedSection;
