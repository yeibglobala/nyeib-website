"use client";

import React from "react";
import { HeaderReveal } from "@/shared/components/HeaderReveal";

export function InstitutionalCredibilitySection() {
  return (
    <section
      id="institutional-credibility"
      data-theme="light"
      aria-label="Institutional Credibility"
      className="relative w-full bg-[#EFF6F1] text-[#003124] py-[clamp(64px,8vw,110px)] px-6 sm:px-10 lg:px-16 overflow-hidden border-y border-[rgba(0,49,36,0.08)]"
    >
      {/* Background ambient radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[380px] bg-[radial-gradient(ellipse_at_center,rgba(0,190,147,0.08)_0%,transparent_70%)] pointer-events-none blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1400px] w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Eyebrow + Prominent Headline */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-4 sm:space-y-5">
            {/* Eyebrow Tag */}
            <HeaderReveal delay={0} duration={800} mask={false}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#003124]/[0.06] border border-[#003124]/10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00875A]" />
                <span
                  className="text-[12px] sm:text-[13px] font-semibold tracking-[0.16em] uppercase text-[#003124]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Institutional Credibility
                </span>
              </div>
            </HeaderReveal>

            {/* Headline */}
            <HeaderReveal delay={120} duration={900}>
              <h2
                className="text-[clamp(30px,3.8vw,52px)] font-bold leading-[1.12] tracking-tight text-[#003124] m-0"
                style={{ fontFamily: "var(--font-headline, serif)" }}
              >
                Institutionally anchored for{" "}
                <span className="text-[#00875A]">long-term impact.</span>
              </h2>
            </HeaderReveal>
          </div>

          {/* Right Column: Narrative Statement with Accent border */}
          <div className="lg:col-span-5 flex flex-col items-start justify-center pt-2 lg:pt-0">
            <HeaderReveal delay={220} duration={900} mask={false}>
              <div className="pl-0 lg:pl-8 lg:border-l lg:border-[rgba(0,49,36,0.14)] flex flex-col">
                <p
                  className="text-[16.5px] sm:text-[18.5px] lg:text-[19.5px] leading-[1.62] text-[#003124]/75 font-normal m-0"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  NYEIB operates within an institutional framework involving leading sovereign, development, financial and public-sector stakeholders.
                </p>
              </div>
            </HeaderReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
