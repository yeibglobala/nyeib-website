import React from "react";

export interface TimelineStep {
  stepNumber: string; // e.g. "Step 1"
  title: string;
  description: string;
}

export interface WhatHappensNextTimelineProps {
  steps: TimelineStep[];
  heading?: string;
}

export function WhatHappensNextTimeline({
  steps,
  heading = "What Happens Next?",
}: WhatHappensNextTimelineProps) {
  return (
    <section
      aria-labelledby="what-happens-next-heading"
      className="w-full py-12 sm:py-16"
    >
      <div className="max-w-[1240px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="what-happens-next-heading"
          className="text-2xl sm:text-3xl md:text-4xl font-normal text-[#0F2A20] tracking-tight mb-10 sm:mb-14"
          style={{ fontFamily: "var(--font-headline, serif)" }}
        >
          {heading}
        </h2>

        {/* Desktop: 3 Columns with Connecting Line / Mobile: Vertical List with Line */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 lg:gap-10">
          {/* Connecting Line on Desktop */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-6 left-[15%] right-[15%] h-[1px] bg-[#E6DCCB] -z-0"
          />

          {steps.map((item, index) => (
            <div
              key={index}
              className="relative flex flex-row md:flex-col items-start gap-5 md:gap-4 z-10"
            >
              {/* Vertical line connector for mobile */}
              {index < steps.length - 1 && (
                <div
                  aria-hidden="true"
                  className="md:hidden absolute top-12 left-5 bottom-[-20px] w-[1px] bg-[#E6DCCB]"
                />
              )}

              {/* Numbered Circle */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-[#E6DCCB] text-[#0F2A20] flex items-center justify-center shrink-0 shadow-sm text-sm sm:text-base font-semibold font-mono">
                {index + 1}
              </div>

              {/* Content */}
              <div className="flex-1 space-y-2 pt-0.5 md:pt-2">
                <span className="font-mono text-[0.78rem] tracking-wider text-[#0F2A20]/50 uppercase block">
                  {item.stepNumber}
                </span>

                <h3
                  className="text-lg sm:text-xl font-normal text-[#0F2A20] leading-snug"
                  style={{ fontFamily: "var(--font-headline, serif)" }}
                >
                  {item.title}
                </h3>

                <p
                  className="text-[0.92rem] sm:text-[0.98rem] text-[#0F2A20]/75 leading-relaxed font-normal"
                  style={{ fontFamily: "var(--font-body, sans-serif)" }}
                >
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
