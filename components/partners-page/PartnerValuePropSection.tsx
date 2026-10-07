"use client";

import React from "react";
import { HeaderReveal } from "@/shared/components/HeaderReveal";
import { Parallax } from "@/shared/components/Parallax";
import { PartnerSingleShapeStage } from "./PartnerSingleShapeStage";

export function PartnerValuePropSection() {
  return (
    <section
      id="investor-value-prop"
      data-theme="light"
      aria-label="Investor Value Proposition"
      className="relative w-full bg-[#e3ece7] text-[#12201b] py-[clamp(80px,9vw,144px)] px-6 sm:px-10 lg:px-16 overflow-hidden border-t border-[rgba(18,32,27,0.08)]"
    >
      <div className="max-w-[1400px] w-full mx-auto">
        <div className="grid grid-cols-1 min-[900px]:grid-cols-[5fr_7fr] gap-12 min-[900px]:gap-[5vw] items-center">
          {/* Left Column: Heading & Body Copy */}
          <div className="flex flex-col space-y-6">
            <HeaderReveal delay={100} duration={950} parallaxSpeed={14}>
              <h2
                className="text-[clamp(2.2rem,3.8vw,3.6rem)] font-normal leading-[1.12] tracking-[-0.015em] text-[#12201b] m-0"
                style={{ fontFamily: "var(--font-headline, serif)" }}
              >
                More than impact.{" "}
                <span className="text-[#1f9d74]">
                  A stronger investment opportunity.
                </span>
              </h2>
            </HeaderReveal>

            <HeaderReveal delay={240} duration={950} mask={false} parallaxSpeed={12}>
              <p
                className="m-0 text-[#4a5d55] text-[clamp(1.02rem,1.2vw,1.18rem)] leading-[1.68] max-w-[50ch]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                NYEIB helps institutions participate in businesses with growth potential,
                measurable impact and long-term economic value, while strengthening the
                conditions that can make those businesses more investment-ready.
              </p>
            </HeaderReveal>
          </div>

          {/* Right Column: Shape A Particle Panel ("TWO STRANDS BECOME ONE") */}
          <div className="w-full flex items-center justify-center">
            <Parallax speed={16} className="w-full">
              <PartnerSingleShapeStage shapeType="shapeA" />
            </Parallax>
          </div>
        </div>
      </div>
    </section>
  );
}
