import type { Metadata } from "next";
import { InnerHero } from "@/components/inner-hero/InnerHero";
import { PartnerAccordionSection } from "@/components/partners-page/PartnerAccordionSection";
import { PartnerInstitutionalGovernanceSection } from "@/components/partners-page/PartnerInstitutionalGovernanceSection";

export const metadata: Metadata = {
  title: "Partners & Investors — Nigeria YEIB Investment Funds",
  description:
    "NYEIB gives institutional investors and development partners a structured pathway to growth-oriented youth- and women-led businesses through a professionally managed platform designed to support credible capital deployment.",
};

export default function PartnersPage() {
  return (
    <main className="w-full bg-[#003124] flex flex-col">
      {/* Hero */}
      <InnerHero slug="partners-and-investors" />

      {/* Unified Interactive Accordion with Shape A (Two Strands) & Shape B (Three Pillars) */}
      <PartnerAccordionSection />

      {/* Institutional Partners, Ecosystem Statement & Disclaimer */}
      <PartnerInstitutionalGovernanceSection />
    </main>
  );
}
