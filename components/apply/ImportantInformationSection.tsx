import React from "react";
import { ShieldCheck } from "lucide-react";

export function ImportantInformationSection() {
  return (
    <section
      aria-label="Important Information"
      className="w-full pb-16 sm:pb-24"
    >
      <div className="max-w-[1240px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full bg-[#EFE7DC] rounded-[24px] border border-[#E6DCCB] p-6 sm:p-10 md:p-12 flex flex-col sm:flex-row items-start gap-6 shadow-[0_4px_24px_rgba(15,42,32,0.03)]">
          <div className="w-12 h-12 rounded-2xl bg-[#0F2A20]/10 text-[#0F2A20] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6 stroke-[2]" aria-hidden="true" />
          </div>
          <div className="flex-1 space-y-3 sm:space-y-3.5">
            <h3
              className="text-lg sm:text-xl md:text-[22px] font-bold text-[#0F2A20] leading-snug"
              style={{ fontFamily: "var(--font-headline, serif)" }}
            >
              Every application is considered through the relevant review process.
            </h3>
            <p
              className="text-[0.95rem] sm:text-[1rem] text-[#0F2A20]/80 leading-relaxed font-normal"
              style={{ fontFamily: "var(--font-body, sans-serif)" }}
            >
              Submitting a business application or partnership enquiry does not guarantee funding, investment, grant support or an institutional partnership.
            </p>
            <p
              className="text-[0.95rem] sm:text-[1rem] text-[#0F2A20]/80 leading-relaxed font-normal"
              style={{ fontFamily: "var(--font-body, sans-serif)" }}
            >
              All opportunities remain subject to applicable eligibility requirements, screening, assessment and approval processes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
