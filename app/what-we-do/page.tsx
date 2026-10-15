import type { Metadata } from "next";
import { InnerHero } from "@/components/inner-hero/InnerHero";
import { PurposeSection } from "@/components/purpose/PurposeSection";
import { BuiltToExpandAccessSection } from "@/components/what-we-do/BuiltToExpandAccessSection";
import { GovernanceSection } from "@/components/governance/GovernanceSection";
import { ImpactSection } from "@/components/impact/ImpactSection";
import { WHAT_WE_DO_GOVERNANCE_CONFIG } from "@/components/governance/config";
import { CtaCard } from "@/components/cta/CtaCard";
import { CTA_CONTENT } from "@/src/content/cta";

export const metadata: Metadata = {
  title: "What We Do — Nigeria YEIB Investment Funds",
  description:
    "NYEIB connects growth-oriented businesses with the capital, strategic partnerships and practical support they need to become more credible, resilient and investment-ready.",
};

export default function WhatWeDoPage() {
  return (
    <main className="w-full bg-[#003124] flex flex-col">
      {/* 1. Hero */}
      <InnerHero slug="what-we-do" />

      {/* 2. Problem / Purpose: Cinematic Ambition Video Section */}
      <PurposeSection />

      {/* 3. What Makes NYEIB Different? (Built to expand access for sustainable growth: 4 Flip Cards) */}
      <BuiltToExpandAccessSection />

      {/* 4. Institutional Relationships */}
      <GovernanceSection config={WHAT_WE_DO_GOVERNANCE_CONFIG} />

      {/* 5. Impact (Designed to create measurable economic impact) */}
      <ImpactSection />

      {/* 6. Closing CTA */}
      <CtaCard {...CTA_CONTENT.whatWeDo} />
    </main>
  );
}

