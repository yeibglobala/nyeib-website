import type { Metadata } from "next";
import { InnerHero } from "@/components/inner-hero/InnerHero";
import { NigeriaPhotoMap } from "@/components/map/NigeriaPhotoMap";
import { SectorAgnosticAudiencesSection } from "@/components/who-we-serve/SectorAgnosticAudiencesSection";
import { GovernanceSection } from "@/components/governance/GovernanceSection";
import { ImpactSection } from "@/components/impact/ImpactSection";

export const metadata: Metadata = {
  title: "What We Do — Nigeria YEIB Investment Funds",
  description:
    "NYEIB connect growth-oriented businesses with the capital, strategic partnerships and practical support they need to become more credible, resilient and investment-ready.",
};

export default function WhatWeDoPage() {
  return (
    <main className="w-full bg-[#003124] flex flex-col">
      {/* Inner Page Hero */}
      <InnerHero slug="what-we-do" />

      {/* Interactive Nigeria Photo Map Purpose Section */}
      <NigeriaPhotoMap />

      {/* Sector Agnostic Growth Focused Funds Showcase */}
      <SectorAgnosticAudiencesSection />

      {/* Governance Section */}
      <GovernanceSection />

      {/* Impact Section */}
      <ImpactSection />
    </main>
  );
}

