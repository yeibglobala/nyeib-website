import React from "react";
import { ParticleStoryHero } from "@/components/hero/ParticleStoryHero";
import { PurposeSection } from "@/components/purpose/PurposeSection";
import { WhoWeServeTeaser } from "@/components/home/WhoWeServeTeaser";
import { SectorAgnosticAudiencesSection } from "@/components/who-we-serve/SectorAgnosticAudiencesSection";
import { CapitalMobilisation } from "@/components/home/CapitalMobilisation";
import { GovernanceSection } from "@/components/governance/GovernanceSection";
import { ImpactSection } from "@/components/impact/ImpactSection";
import { HOMEPAGE_GOVERNANCE_CONFIG } from "@/components/home/config";

export default function HomePage() {
  return (
    <div className="w-full bg-[var(--bg-deep)] flex flex-col">
      <main className="w-full flex-1">
        {/* Primary Interactive Particle Hero */}
        <ParticleStoryHero />

        {/* Problem / Purpose Section */}
        <PurposeSection />

        {/* Who We Serve Overview & Pathways Teaser */}
        <WhoWeServeTeaser />

        {/* A Blended Platform for Capital and Growth (Sector Agnostic Growth Focused) */}
        <SectorAgnosticAudiencesSection />

        {/* Built to Mobilise Capital at Scale (US$300M / US$100M / 3 Instruments) */}
        <CapitalMobilisation />

        {/* Institutional Credibility & Anchor Partners */}
        <GovernanceSection config={HOMEPAGE_GOVERNANCE_CONFIG} />

        {/* Measurable Economic Impact Targets (Pinned Ring Stage) */}
        <ImpactSection />
      </main>
    </div>
  );
}
