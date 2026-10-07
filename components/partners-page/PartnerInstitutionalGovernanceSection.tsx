"use client";

import React, { useState } from "react";
import { HeaderReveal } from "@/shared/components/HeaderReveal";
import { Parallax } from "@/shared/components/Parallax";

interface InstitutionalPartner {
  id: string;
  name: string;
  fullName: string;
  logoPath: string;
  description: string;
}

const INSTITUTIONAL_PARTNERS: InstitutionalPartner[] = [
  {
    id: "nsia",
    name: "Nigeria Sovereign Investment Authority (NSIA)",
    fullName: "Nigeria Sovereign Investment Authority",
    logoPath: "/partner-logo/nsia-logo.png",
    description: "An in-country sponsor and shareholder within the NYEIB structure.",
  },
  {
    id: "dbn",
    name: "Development Bank of Nigeria (DBN)",
    fullName: "Development Bank of Nigeria",
    logoPath: "/partner-logo/dbn-logo.png",
    description:
      "An in-country sponsor and shareholder, with the credit-guarantee mechanism structured through DBN’s Impact Credit Guarantee Limited.",
  },
  {
    id: "afdb",
    name: "African Development Bank (AfDB)",
    fullName: "African Development Bank",
    logoPath: "/partner-logo/afdb-logo.png",
    description:
      "A key institutional partner supporting the establishment of NYEIB, including the sovereign financing underpinning its initial capitalisation.",
  },
];

export function PartnerInstitutionalGovernanceSection() {
  const [activePartnerId, setActivePartnerId] = useState<string | null>(null);

  return (
    <section
      id="institutional-partners"
      data-theme="dark"
      aria-label="Institutional Partners"
      className="relative w-full bg-[#0b1310] text-[#eef6f2] py-[clamp(72px,9vw,130px)] px-[clamp(20px,4.5vw,64px)] overflow-hidden border-t border-[rgba(238,246,242,0.08)]"
    >
      <div className="max-w-[1240px] mx-auto flex flex-col space-y-14 sm:space-y-16">
        {/* 3 Partner Cards Grid */}
        <Parallax speed={20} className="w-full">
          <div className="grid grid-cols-1 min-[700px]:grid-cols-3 gap-5 sm:gap-6 w-full">
            {INSTITUTIONAL_PARTNERS.map((partner) => {
              const isOpen = activePartnerId === partner.id;

              return (
                <article
                  key={partner.id}
                  tabIndex={0}
                  role="group"
                  aria-label={partner.name}
                  onMouseEnter={() => setActivePartnerId(partner.id)}
                  onMouseLeave={() => setActivePartnerId(null)}
                  onFocus={() => setActivePartnerId(partner.id)}
                  onBlur={() => setActivePartnerId(null)}
                  onClick={() =>
                    setActivePartnerId((curr) => (curr === partner.id ? null : partner.id))
                  }
                  className="group relative w-full aspect-[4/5] min-h-[340px] max-[700px]:aspect-auto max-[700px]:min-h-[290px] rounded-[22px] overflow-hidden cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-[#4fd1b0] border border-[rgba(0,49,36,0.16)] hover:border-[#2eb78c] bg-[#F2FBF6] transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1"
                >
                  {/* Rest State Layer: Real Partner Logo & Name */}
                  <div className="absolute inset-0 p-6 sm:p-7 flex flex-col justify-between z-10 pointer-events-none">
                    <div className="w-full flex justify-between items-start" />

                    <div
                      className={`w-full flex-1 flex items-center justify-center py-4 transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isOpen
                          ? "opacity-0 scale-90 translate-y-4"
                          : "opacity-100 scale-100 translate-y-0"
                      }`}
                    >
                      <img
                        src={partner.logoPath}
                        alt={partner.name}
                        className="w-full max-w-[260px] h-32 sm:h-36 md:h-40 object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div
                      className={`transition-opacity duration-[400ms] ${
                        isOpen ? "opacity-0" : "opacity-95"
                      }`}
                    >
                      <span
                        className="text-[14.5px] sm:text-[15px] font-semibold text-[#003124] tracking-tight block"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {partner.name}
                      </span>
                    </div>
                  </div>

                  {/* Hover Reveal Layer: Brand Green Fill with Exact MD Description */}
                  <div
                    className="absolute inset-0 bg-[#2eb78c] text-[#0c1f19] p-6 sm:p-7 flex flex-col justify-between z-20 transition-[clip-path] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{
                      clipPath: isOpen ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)",
                    }}
                  >
                    <div className="w-full flex items-start justify-between">
                      <img
                        src={partner.logoPath}
                        alt={partner.name}
                        className="h-12 sm:h-14 w-36 sm:w-44 max-w-[60%] object-contain object-left"
                      />
                    </div>

                    <div className="flex flex-col space-y-4 pt-4">
                      <p
                        className={`text-[13.5px] sm:text-[14.5px] font-medium leading-[1.48] text-[#0c1f19] m-0 transition-transform duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          isOpen ? "translate-y-0" : "translate-y-[110%] max-[700px]:translate-y-0"
                        }`}
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {partner.description}
                      </p>

                      <div className="pt-2 border-t border-[rgba(12,31,25,0.22)]">
                        <span
                          className="text-[14.5px] sm:text-[15px] font-bold text-[#0c1f19] tracking-tight block"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {partner.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </Parallax>

        {/* Broader Institutional Framework & Disclaimer (Exact MD copy) */}
        <div className="flex flex-col space-y-8 pt-4 border-t border-[rgba(238,246,242,0.12)]">
          {/* Broader Institutional Framework */}
          <div className="flex flex-col space-y-2 max-w-3xl">
            <HeaderReveal delay={0} duration={850} mask={false}>
              <h3
                className="text-[clamp(1.25rem,2vw,1.6rem)] font-bold text-[#eef6f2] m-0"
                style={{ fontFamily: "var(--font-headline, serif)" }}
              >
                Supported by a wider public and regulatory ecosystem.
              </h3>
            </HeaderReveal>
            <HeaderReveal delay={100} duration={850} mask={false}>
              <p
                className="text-[14.5px] sm:text-[15.5px] leading-[1.65] text-[#a9c2b8] m-0"
                style={{ fontFamily: "var(--font-body)" }}
              >
                NYEIB operates within a broader institutional framework involving relevant
                government, regulatory and public-sector stakeholders.
              </p>
            </HeaderReveal>
          </div>

          {/* Investor Disclaimer */}
          <div className="pt-4 border-t border-[rgba(238,246,242,0.08)]">
            <p
              className="text-[13px] sm:text-[13.5px] leading-[1.6] text-[#7f978d] italic m-0 max-w-4xl"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Submitting an expression of interest does not constitute an offer of, or
              invitation to subscribe for, any interest in the Funds.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
