import type { Metadata } from "next";
import { InnerHero } from "@/components/inner-hero/InnerHero";
import { EsgFrameworkSection } from "@/components/esg-page/EsgFrameworkSection";
import { CtaCard } from "@/components/cta/CtaCard";
import { CTA_CONTENT } from "@/src/content/cta";

export const metadata: Metadata = {
  title: "ESG & Sustainability — Nigeria YEIB Investment Funds",
  description:
    "NYEIB integrates environmental, social and governance considerations into how it supports businesses, with a focus on responsible growth and long-term value.",
};

export default function ESGPage() {
  return (
    <main className="w-full bg-[#003124] flex flex-col">
      {/* Inner Hero */}
      <InnerHero slug="esg-and-sustainability" />

      {/* 3 ESG Dimensions (Environmental, Social, Governance 3D Flip Card Framework) */}
      <EsgFrameworkSection />

      {/* Closing CTA */}
      <CtaCard {...CTA_CONTENT.esg} />
    </main>
  );
}
