"use client";

import React, { useState } from "react";
import { HeaderReveal } from "@/shared/components/HeaderReveal";
import { Parallax } from "@/shared/components/Parallax";
import { PartnerCard } from "@/components/governance/PartnerCard";

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
      className="relative w-full bg-[#003124] text-[#eef6f2] py-[clamp(72px,9vw,130px)] px-6 sm:px-10 lg:px-16 overflow-hidden border-t border-[rgba(238,246,242,0.08)]"
    >
      <div className="max-w-[1400px] w-full mx-auto flex flex-col space-y-14 sm:space-y-16">
        {/* 3 Partner Cards Grid */}
        <Parallax speed={20} className="w-full">
          <div className="grid grid-cols-1 min-[700px]:grid-cols-3 gap-5 sm:gap-6 w-full">
            {INSTITUTIONAL_PARTNERS.map((partner) => (
              <PartnerCard
                key={partner.id}
                partner={{
                  id: partner.id,
                  name: partner.name,
                  shortName: partner.id.toUpperCase(),
                  logoPath: partner.logoPath,
                  description: partner.description,
                  descriptionLines: [partner.description],
                }}
                isActive={activePartnerId === partner.id}
                onActivate={() => setActivePartnerId(partner.id)}
                onDeactivate={() => setActivePartnerId((curr) => (curr === partner.id ? null : curr))}
              />
            ))}
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
