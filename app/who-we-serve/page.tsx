import type { Metadata } from "next";
import { InnerHero } from "@/components/inner-hero/InnerHero";
import { SectorAgnosticAudiencesSection } from "@/components/who-we-serve/SectorAgnosticAudiencesSection";
import { WhoWeServeTeaser } from "@/components/home/WhoWeServeTeaser";
import { GovernanceSection } from "@/components/governance/GovernanceSection";

export const metadata: Metadata = {
  title: "Who We Serve — Nigeria YEIB Investment Funds",
  description:
    "NYEIB works across the investment ecosystem, helping businesses, financial institutions and investment partners engage through pathways suited to their role.",
};

export default function WhoWeServePage() {
  return (
    <main className="w-full bg-[#FAF7F2] flex flex-col">
      {/* Inner Hero */}
      <InnerHero slug="who-we-serve" />

      {/* Interactive Sector Agnostic Audiences Showcase */}
      <SectorAgnosticAudiencesSection />

      {/* Interactive Who We Serve Swiper Showcase */}
      <WhoWeServeTeaser />

      {/* Institutional Framework */}
      <GovernanceSection />
    </main>
  );
}
