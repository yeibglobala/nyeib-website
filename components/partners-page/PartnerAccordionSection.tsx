"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, ArrowUpRight } from "lucide-react";
import { HeaderReveal } from "@/shared/components/HeaderReveal";

export interface PartnerPathwayItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  paragraph: string;
  href: string;
}

export const PARTNER_PATHWAYS: PartnerPathwayItem[] = [
  {
    id: "equity-investment-fund",
    number: "01",
    title: "Equity Investment Fund",
    subtitle: "Direct and intermediated patient capital",
    paragraph:
      "Provides equity and quasi-equity capital to growth-oriented businesses directly or through partner fund managers, helping enterprises access the patient capital needed to scale sustainably.",
    href: "/apply",
  },
  {
    id: "credit-guarantee-facility",
    number: "02",
    title: "Credit Guarantee Facility",
    subtitle: "Catalytic risk-sharing arrangements",
    paragraph:
      "Provides risk-sharing guarantees to participating financial institutions, reducing lending risks and expanding debt financing for eligible youth- and women-led enterprises.",
    href: "/apply",
  },
  {
    id: "ecosystem-development-fund",
    number: "03",
    title: "Ecosystem Development Fund",
    subtitle: "Strengthening enterprise support and capability",
    paragraph:
      "Supports business development service providers, incubators, accelerators and capacity-building programs to strengthen operational maturity, governance and investment readiness.",
    href: "/apply",
  },
  {
    id: "co-investment",
    number: "04",
    title: "Co-Investment",
    subtitle: "Syndicated and parallel capital deployment",
    paragraph:
      "Explore opportunities to co-invest alongside NYEIB across growth-stage enterprises, blended finance facilities and dedicated thematic investment vehicles.",
    href: "/apply",
  },
  {
    id: "technical-assistance-funding",
    number: "05",
    title: "Technical-Assistance Funding",
    subtitle: "Grant and institutional development support",
    paragraph:
      "Deploy grant capital, technical-assistance resources and institutional support aligned with your development, climate, or gender inclusion mandates.",
    href: "/apply",
  },
];

export function PartnerAccordionSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="partner-pathways"
      aria-label="Multiple Ways to Participate"
      className="relative w-full bg-[#eef6f2] text-[#003124] py-16 sm:py-20 lg:py-28 px-5 sm:px-8 lg:px-16 overflow-hidden border-t border-[#003124]/10"
    >
      <div className="max-w-[1240px] w-full mx-auto">
        {/* =========================================================================
            HEADER: 2-Column Layout matching Image 2
            Left: Eyebrow + Headline
            Right: Description
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-16 items-start pb-12 sm:pb-16">
          {/* Left Column: Heading */}
          <div className="flex flex-col items-start gap-3 sm:gap-4">
            <span
              className="text-xs sm:text-sm uppercase font-mono tracking-[0.22em] font-bold text-[#00875A]"
              style={{ fontFamily: "var(--font-body, 'Chivo', sans-serif)" }}
            >
              Multiple Ways to Participate
            </span>
            <HeaderReveal delay={80} duration={900}>
              <h2
                className="text-[34px] sm:text-[44px] lg:text-[52px] font-bold leading-[1.12] tracking-tight text-[#003124] m-0"
                style={{ fontFamily: "var(--font-headline, 'Asul', Georgia, serif)" }}
              >
                Choose the pathway that fits your mandate.
              </h2>
            </HeaderReveal>
          </div>

          {/* Right Column: Paragraph Description */}
          <div className="flex flex-col items-start gap-4 lg:pt-8">
            <HeaderReveal delay={160} duration={900} mask={false}>
              <p
                className="text-[16px] sm:text-[18px] lg:text-[19px] leading-[1.65] text-[#003124]/80 font-normal m-0"
                style={{ fontFamily: "var(--font-body, 'Chivo', sans-serif)" }}
              >
                Partners may explore opportunities across the Equity Investment Fund,
                Credit Guarantee Facility and Ecosystem Development Fund, as well as
                co-investment, technical-assistance funding and other forms of support
                aligned with their mandate.
              </p>
            </HeaderReveal>
          </div>
        </div>

        {/* =========================================================================
            ACCORDION LIST:
            Equity Investment Fund, Credit Guarantee Facility, Ecosystem Development Fund,
            Co-Investment, Technical-Assistance Funding
            (No descriptions shown at rest, clean rows matching design)
            ========================================================================= */}
        <div className="border-t border-[#003124]/15 flex flex-col w-full">
          {PARTNER_PATHWAYS.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.id}
                className="border-b border-[#003124]/15 transition-colors duration-200"
              >
                {/* Header row: Number, Title, Circular Plus/Minus toggle */}
                <button
                  type="button"
                  id={`partner-pathway-h-${index}`}
                  aria-expanded={isOpen}
                  aria-controls={`partner-pathway-p-${index}`}
                  onClick={() => toggleAccordion(index)}
                  className="w-full py-6 sm:py-8 flex items-center justify-between text-left group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00BE93] rounded-lg"
                >
                  <div className="flex items-center gap-6 sm:gap-10 pr-4">
                    {/* Number */}
                    <span
                      className="text-sm sm:text-base font-mono text-[#003124]/60 shrink-0 font-medium"
                      style={{ fontFamily: "var(--font-body, 'Chivo', sans-serif)" }}
                    >
                      {item.number}
                    </span>

                    {/* Title (No resting description underneath, matching Image 2) */}
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

                {/* Collapsible Content Panel: Revealed smoothly on click */}
                {isOpen && (
                  <div
                    id={`partner-pathway-p-${index}`}
                    role="region"
                    aria-labelledby={`partner-pathway-h-${index}`}
                    className="pb-8 pl-12 sm:pl-16 pr-4 sm:pr-12 animate-fadeIn"
                  >
                    <div className="max-w-[760px] flex flex-col items-start gap-3 pt-1">
                      <p
                        className="text-[16px] sm:text-[17px] font-semibold text-[#003124] m-0"
                        style={{ fontFamily: "var(--font-body, 'Chivo', sans-serif)" }}
                      >
                        {item.subtitle}
                      </p>

                      <p
                        className="text-[15px] sm:text-[16px] text-[#003124]/80 leading-[1.65] m-0"
                        style={{
                          fontFamily: "var(--font-body, 'Chivo', sans-serif)",
                        }}
                      >
                        {item.paragraph}
                      </p>

                      <div className="pt-2">
                        <Link
                          href={item.href}
                          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#003124] text-white font-medium text-sm hover:bg-[#00875A] transition-all shadow-sm active:scale-95"
                          style={{
                            fontFamily: "var(--font-body, 'Chivo', sans-serif)",
                          }}
                        >
                          <span>Explore Pathway</span>
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
      </div>
    </section>
  );
}

export default PartnerAccordionSection;
