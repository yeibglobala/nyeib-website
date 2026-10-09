"use client";

import React from "react";
import Image from "next/image";
import { HeaderReveal } from "@/shared/components/HeaderReveal";

export function ApplyLandingHero() {
  const headline = "Your next step towards growth starts here.";
  const subtext =
    "Whether you are building a business or exploring an institutional partnership, NYEIB provides pathways to access capital, practical support and opportunities for collaboration.";

  return (
    <section
      id="apply-hero"
      data-theme="light"
      aria-label={headline}
      className="relative w-full bg-[#F7F5F0] text-[#0F2A20] pt-36 sm:pt-44 lg:pt-50 pb-8 sm:pb-12 overflow-hidden flex flex-col items-center"
    >
      <div className="max-w-[1240px] w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Centered Editorial Headline & Subtext */}
        <div className="w-full max-w-3xl lg:max-w-4xl mx-auto flex flex-col items-center text-center mb-8 sm:mb-10 lg:mb-12">
          <HeaderReveal delay={60} duration={900}>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-normal text-[#0F2A20] tracking-tight leading-[1.14] text-center"
              style={{ fontFamily: "var(--font-headline, serif)" }}
            >
              {headline}
            </h1>
          </HeaderReveal>

          <HeaderReveal delay={160} duration={850} mask={false}>
            <p
              className="text-base sm:text-lg md:text-[19px] text-[#0F2A20]/75 font-normal leading-relaxed max-w-2xl mx-auto mt-4 sm:mt-5"
              style={{ fontFamily: "var(--font-body, sans-serif)" }}
            >
              {subtext}
            </p>
          </HeaderReveal>
        </div>

        {/* Large Rounded Photography Container (Desktop ~72svh relative sizing) */}
        <div className="w-full relative h-[260px] sm:h-[340px] md:h-[400px] lg:h-[460px] rounded-[24px] sm:rounded-[36px] lg:rounded-[40px] overflow-hidden shadow-[0_16px_45px_rgba(15,42,32,0.06)] border border-[#E6DCCB] bg-[#EFE7DC]">
          <Image
            src="/images/apply-for-funding.png"
            alt={headline}
            fill
            priority
            sizes="(max-width: 1240px) 100vw, 1240px"
            className="object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}
