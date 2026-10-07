import type { Metadata } from "next";
import { InnerHero } from "@/components/inner-hero/InnerHero";
import { PurposeSection } from "@/components/purpose/PurposeSection";
import { PillarsSection } from "@/components/pillars/PillarsSection";
import { GovernanceSection } from "@/components/governance/GovernanceSection";
import { ImpactSection } from "@/components/impact/ImpactSection";

export const metadata: Metadata = {
  title: "What We Do — Nigeria YEIB Investment Funds",
  description:
    "NYEIB connect growth-oriented businesses with the capital, strategic partnerships and practical support they need to become more credible, resilient and investment-ready.",
};

export default function WhatWeDoPage() {
  return (
    <main className="w-full bg-[#0b1310] flex flex-col">
      {/* Inner Page Hero */}
      <InnerHero slug="what-we-do" />

      {/* Purpose Section */}
      <PurposeSection />

      {/* Pillars Section */}
      <PillarsSection />

      {/* Governance Section */}
      <GovernanceSection />

      {/* Impact Section */}
      <ImpactSection />
    </main>
  );
}

