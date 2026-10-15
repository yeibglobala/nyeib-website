import React from "react";
import { ParticleStoryHero } from "@/components/hero/ParticleStoryHero";
import { LogoMarquee } from "@/components/home/LogoMarquee";
import { InstitutionalCredibilitySection } from "@/components/home/InstitutionalCredibilitySection";
import { WhoWeServeTeaser } from "@/components/home/WhoWeServeTeaser";
import { SectorAgnosticAudiencesSection } from "@/components/who-we-serve/SectorAgnosticAudiencesSection";
import { CapitalMobilisation } from "@/components/home/CapitalMobilisation";
import { ImpactSection } from "@/components/impact/ImpactSection";
import { CtaCard } from "@/components/cta/CtaCard";
import { CTA_CONTENT } from "@/src/content/cta";

export default function HomePage() {
  return (
    <div className="w-full bg-[var(--bg-deep)] flex flex-col">
      <main className="w-full flex-1">
        {/* Primary Interactive Particle Hero */}
        <ParticleStoryHero />

        {/* Anchor Institutions & Partners Logo Marquee */}
        <LogoMarquee />

        {/* Institutional Credibility Statement Section */}
        <InstitutionalCredibilitySection />

        {/* Who We Serve Overview & Pathways Teaser */}
        <WhoWeServeTeaser />

        {/* A Blended Platform for Capital and Growth (Sector Agnostic Growth Focused) */}
        <SectorAgnosticAudiencesSection />

        {/* Built to Mobilise Capital at Scale (US$300M / US$100M / 3 Instruments) */}
        <CapitalMobilisation />

        {/* Measurable Economic Impact Targets (Pinned Ring Stage) */}
        <ImpactSection />

        {/* Closing CTA */}
        <CtaCard {...CTA_CONTENT.homepage} />
      </main>
    </div>
  );
}
