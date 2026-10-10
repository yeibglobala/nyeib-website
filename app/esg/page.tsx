import type { Metadata } from "next";
import { InnerHero } from "@/components/inner-hero/InnerHero";
import {
  EsgInPageNav,
  EsgApproachSection,
  EsgReportsSection,
  EsgPoliciesSection,
  EsgPartnershipsSection,
  EsgAccountabilitySection,
} from "@/components/esg";
import { CtaCard } from "@/components/cta/CtaCard";
import { CTA_CONTENT } from "@/src/content/cta";

export const metadata: Metadata = {
  title: "ESG & Sustainability — Nigeria YEIB Investment Funds",
  description:
    "At NYEIB, we integrate environmental, social, and governance (ESG) considerations into our investment activities to support responsible decision-making, strengthen business resilience, and create lasting economic opportunities for Nigerian youth and women.",
};

export default function ESGPage() {
  return (
    <div className="w-full bg-[#F7F5F0] flex flex-col">
      <main className="w-full flex-1">
        {/* 0. Hero */}
        <InnerHero slug="esg-and-sustainability" />

        {/* 0b. Sticky In-Page Navigation */}
        <EsgInPageNav />

        {/* 1. Our Approach to Sustainability */}
        <EsgApproachSection />

        {/* 2. Reports & Disclosures */}
        <EsgReportsSection />

        {/* 3. Policies & Procedures */}
        <EsgPoliciesSection />

        {/* 4. Partnerships */}
        <EsgPartnershipsSection />

        {/* 5. Accountability & Stakeholder Contact */}
        <EsgAccountabilitySection />

        {/* 6. Closing CTA */}
        <CtaCard {...CTA_CONTENT.esg} />
      </main>
    </div>
  );
}
