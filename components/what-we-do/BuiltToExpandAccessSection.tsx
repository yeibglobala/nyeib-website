"use client";

import React from "react";
import { StatFlipCard } from "@/components/cards/StatFlipCard";
import { HeaderReveal } from "@/shared/components/HeaderReveal";
import { Parallax } from "@/shared/components/Parallax";

const PILLAR_FLIP_CARDS = [
  {
    id: "blended-capital",
    frontStat: "Blended Capital",
    frontTitle: "Blended Capital",
    frontDescription:
      "We bring together equity and quasi-equity investment, risk-sharing guarantees, grants and reimbursable grants to address different financing needs.",
    backStat: "Blended Capital",
    backTitle: "Tailored Financing Suite",
    backDescription:
      "We bring together equity and quasi-equity investment, risk-sharing guarantees, grants and reimbursable grants to address different financing needs.",
    backItems: [
      "Equity and quasi-equity investment",
      "Risk-sharing guarantees",
      "Grants & reimbursable grants",
      "Catalytic blended structuring",
    ],
  },
  {
    id: "growth-focus",
    frontStat: "Growth Focus",
    frontTitle: "Focused on Growth-Oriented Businesses",
    frontDescription:
      "We support promising businesses across sectors with the potential to scale, create jobs and generate sustainable economic value.",
    backStat: "Growth Focus",
    backTitle: "High-Potential Enterprise Backing",
    backDescription:
      "We support promising businesses across sectors with the potential to scale, create jobs and generate sustainable economic value.",
    backItems: [
      "Promising businesses across sectors",
      "Potential to scale sustainably",
      "Job creation & economic value",
      "Enterprise resilience & expansion",
    ],
  },
  {
    id: "ecosystem-development",
    frontStat: "Ecosystem",
    frontTitle: "Strengthening the Ecosystem",
    frontDescription:
      "We work with ecosystem organisations and business-development providers to strengthen the capabilities and support businesses need to grow and become investment-ready.",
    backStat: "Ecosystem",
    backTitle: "Capability & Readiness Support",
    backDescription:
      "We work with ecosystem organisations and business-development providers to strengthen the capabilities and support businesses need to grow and become investment-ready.",
    backItems: [
      "Ecosystem organisations collaboration",
      "Business-development service providers",
      "Strengthen operational capabilities",
      "Investment-ready enterprise development",
    ],
  },
  {
    id: "governance",
    frontStat: "Governance",
    frontTitle: "Governance designed to build confidence.",
    frontDescription:
      "Nigeria NYEIB Investment Funds combines professional management, independent oversight and clearly defined investment structures to support credible and accountable capital deployment.",
    backStat: "Governance",
    backTitle: "Building Institutional Confidence",
    backDescription:
      "Nigeria NYEIB Investment Funds combines professional management, independent oversight and clearly defined investment structures to support credible and accountable capital deployment.",
    backItems: [
      "Professional commercial management",
      "Independent oversight structures",
      "Clearly defined investment structures",
      "Accountable capital deployment",
    ],
  },
];

export function BuiltToExpandAccessSection() {
  return (
    <section
      id="what-makes-nyeib-different"
      data-theme="light"
      aria-label="What Makes NYEIB Different"
      className="relative w-full bg-[#FAF7F2] text-[#003124] py-[clamp(72px,9vw,130px)] px-6 sm:px-10 lg:px-16 overflow-hidden border-t border-[rgba(0,49,36,0.08)]"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(0,190,147,0.07)_0%,transparent_70%)] pointer-events-none blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1400px] w-full mx-auto flex flex-col gap-12 sm:gap-16">
        {/* Top Header: Tag, Headline, Paragraph */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-14 items-end">
          <div className="lg:col-span-7 flex flex-col items-start gap-4">
            <HeaderReveal delay={0} duration={800} mask={false}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#003124]/[0.06] border border-[#003124]/10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00875A]" />
                <span
                  className="text-[12px] sm:text-[13px] font-semibold tracking-[0.16em] uppercase text-[#003124]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  What Makes NYEIB Different?
                </span>
              </div>
            </HeaderReveal>

            <HeaderReveal delay={120} duration={900}>
              <h2
                className="text-[clamp(32px,4.2vw,54px)] font-bold leading-[1.1] tracking-tight text-[#003124] m-0"
                style={{ fontFamily: "var(--font-headline, serif)" }}
              >
                Built to expand access for{" "}
                <span className="text-[#00875A]">sustainable growth.</span>
              </h2>
            </HeaderReveal>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-end">
            <HeaderReveal delay={220} duration={900} mask={false}>
              <p
                className="text-[16px] sm:text-[18px] leading-[1.62] text-[#003124]/75 font-normal m-0"
                style={{ fontFamily: "var(--font-body)" }}
              >
                NYEIB combines financial and non-financial support within one platform designed to strengthen businesses and build confidence among the institutions that back them.
              </p>
            </HeaderReveal>
          </div>
        </div>

        {/* 4 Flip Cards Grid (1 col mobile, 2 cols tablet, 4 cols desktop) */}
        <Parallax speed={16} className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6 w-full">
            {PILLAR_FLIP_CARDS.map((card) => (
              <StatFlipCard
                key={card.id}
                variant="style1"
                frontStat={card.frontStat}
                frontStatClassName="text-[30px] sm:text-[34px] lg:text-[36px] font-bold leading-[1.12] tracking-tight text-[#003124]"
                frontTitle={card.frontTitle}
                frontTitleClassName="text-[16px] sm:text-[17px] font-semibold leading-[1.3] text-[#003124] pt-0.5"
                frontDescription={card.frontDescription}
                frontDescriptionClassName="text-[13.5px] sm:text-[14.5px] leading-[1.58] text-[#003124]/75 pt-0.5"
                backStat={card.backStat}
                backStatClassName="text-[26px] sm:text-[30px] font-bold leading-[1.15] text-[#eef6f2]"
                backTitle={card.backTitle}
                backTitleClassName="font-semibold text-[15px] sm:text-[16px] leading-[1.35] text-[#00BE93]"
                backItems={card.backItems}
                className="w-full h-[440px] sm:h-[460px] xl:h-[480px]"
              />
            ))}
          </div>
        </Parallax>
      </div>
    </section>
  );
}
