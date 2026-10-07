"use client";

import React from "react";
import { Clock, ShieldCheck, FileCheck, Users2, ArrowRight } from "lucide-react";
import { Parallax } from "@/shared/components/Parallax";
import { HeaderReveal } from "@/shared/components/HeaderReveal";

interface ApplyProcessSectionProps {
  onOpenModal?: (track: "business" | "vc_pe" | "banks" | "ecosystem" | "research" | "investors") => void;
}

export function ApplyProcessSection({ onOpenModal }: ApplyProcessSectionProps) {
  return (
    <section
      id="process"
      data-theme="light"
      className="relative w-full bg-[#FAF7F2] py-16 md:py-24 px-6 sm:px-10 lg:px-16 text-[#003124] overflow-hidden"
    >
      <div className="max-w-[1400px] w-full mx-auto space-y-16 md:space-y-24">
        {/* =========================================================================
            2. APPLICATION REASSURANCE CARD
            ========================================================================= */}
        <Parallax speed={12} className="w-full">
          <div className="group relative rounded-2xl sm:rounded-3xl bg-white border border-[#E1C9B3] p-6 sm:p-8 lg:py-7 lg:px-9 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
            <div className="flex items-start gap-6">
              {/* Clock icon vertically aligned with the headline */}
              <div className="w-12 h-12 rounded-xl bg-[#00BE93]/15 border border-[#00BE93]/30 flex items-center justify-center text-[#008f6e] flex-shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110">
                <Clock className="w-6 h-6" />
              </div>

              {/* Headline and supporting line stacked */}
              <div className="space-y-2">
                <HeaderReveal delay={0} duration={850}>
                  <h3
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#003124] tracking-tight [text-wrap:balance] m-0"
                    style={{ fontFamily: "var(--font-headline, serif)" }}
                  >
                    Applying for business support takes about 5 minutes.
                  </h3>
                </HeaderReveal>
                <HeaderReveal delay={120} duration={850} mask={false}>
                  <p className="text-[#2b3d36] text-base sm:text-[17px] leading-relaxed font-normal max-w-[560px] m-0">
                    There is no application fee, and NYEIB does not work through paid agents or intermediaries.
                  </p>
                </HeaderReveal>
              </div>
            </div>
          </div>
        </Parallax>

        {/* =========================================================================
            3. WHAT HAPPENS NEXT & 4. FINAL TRUST NOTE
            ========================================================================= */}
        <div className="space-y-12">
          {/* Section Heading with HeaderReveal */}
          <HeaderReveal delay={0} duration={900} parallaxSpeed={12}>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#003124] tracking-tight m-0"
              style={{ fontFamily: "var(--font-headline, serif)" }}
            >
              What Happens Next
            </h2>
          </HeaderReveal>

          {/* Two Equal-Height Cards */}
          <Parallax speed={16} className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              {/* Card 1: For business applications */}
              <div className="group rounded-2xl bg-white border border-[#E1C9B3] hover:border-[#00BE93]/50 p-7 sm:p-9 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#00BE93]/15 border border-[#00BE93]/30 flex items-center justify-center text-[#008f6e] transition-transform duration-300 group-hover:scale-110">
                    <FileCheck className="w-6 h-6" />
                  </div>
                  <h3
                    className="text-xl sm:text-2xl font-bold text-[#003124]"
                    style={{ fontFamily: "var(--font-headline, serif)" }}
                  >
                    For business applications:
                  </h3>
                  <p className="text-[#2b3d36] text-base leading-relaxed font-normal">
                    Your submission will be reviewed for initial fit. If it progresses, we may request additional information or supporting documentation.
                  </p>
                </div>

                {/* Bottom Text Link (Margin top auto) */}
                <div className="mt-auto pt-6 border-t border-[#003124]/10">
                  <button
                    type="button"
                    onClick={() => onOpenModal?.("business")}
                    className="group/btn inline-flex items-center gap-2 font-sans text-xs sm:text-[13px] font-semibold uppercase tracking-wider text-[#008f6e] hover:text-[#005a45] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00BE93] rounded"
                  >
                    <span>Start Application</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1.5" />
                  </button>
                </div>
              </div>

              {/* Card 2: For partnership enquiries */}
              <div className="group rounded-2xl bg-white border border-[#E1C9B3] hover:border-[#F88404]/50 p-7 sm:p-9 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F88404]/15 border border-[#F88404]/30 flex items-center justify-center text-[#cf6900] transition-transform duration-300 group-hover:scale-110">
                    <Users2 className="w-6 h-6" />
                  </div>
                  <h3
                    className="text-xl sm:text-2xl font-bold text-[#003124]"
                    style={{ fontFamily: "var(--font-headline, serif)" }}
                  >
                    For partnership enquiries:
                  </h3>
                  <p className="text-[#2b3d36] text-base leading-relaxed font-normal">
                    Tell us about your institution, mandate and area of interest. The NYEIB team will review your submission and follow up where there is a relevant pathway to engage.
                  </p>
                </div>

                {/* Bottom Text Link (Margin top auto) */}
                <div className="mt-auto pt-6 border-t border-[#003124]/10">
                  <a
                    href="#partnership-accordion"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("partnership-accordion")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="group/btn inline-flex items-center gap-2 font-sans text-xs sm:text-[13px] font-semibold uppercase tracking-wider text-[#cf6900] hover:text-[#a04e00] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F88404] rounded"
                  >
                    <span>Explore Partnership</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1.5" />
                  </a>
                </div>
              </div>
            </div>
          </Parallax>

          {/* 4. FINAL TRUST NOTE (40px / mt-10 space above it, shield icon aligned with top text line) */}
          <Parallax speed={10} className="w-full">
            <div className="mt-10 rounded-2xl bg-[#E1C9B3]/30 border border-[#E1C9B3] p-6 sm:p-8 flex items-start gap-5 sm:gap-6 w-full hover:bg-[#E1C9B3]/40 transition-colors duration-300">
              <div className="w-11 h-11 rounded-xl bg-white border border-[#003124]/10 flex items-center justify-center text-[#003124] flex-shrink-0 shadow-sm mt-0.5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-1 text-left flex-1">
                <h4 className="text-base sm:text-lg font-bold text-[#003124] m-0">
                  Submitting an application or partnership enquiry does not guarantee funding or partnership.
                </h4>
                <p className="text-xs sm:text-sm text-[#2b3d36] leading-relaxed font-normal m-0 pt-1">
                  All submissions are subject to the relevant eligibility, screening, assessment and approval processes.
                </p>
              </div>
            </div>
          </Parallax>
        </div>
      </div>
    </section>
  );
}
