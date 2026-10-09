import type { Metadata } from "next";
import { InnerHero } from "@/components/inner-hero/InnerHero";
import { ImpactSection } from "@/components/impact/ImpactSection";
import { ImpactFrameworkSection } from "@/components/impact-page/ImpactFrameworkSection";

export const metadata: Metadata = {
  title: "Impact & Measurement — Nigeria YEIB Investment Funds",
  description:
    "NYEIB is designed to expand access to finance and strengthen the conditions for youth- and women-led businesses to grow.",
};

export default function ImpactPage() {
  return (
    <main className="w-full bg-[#003124] flex flex-col">
      {/* Inner Hero */}
      <InnerHero slug="impact-and-measurement" />

      {/* 20-Year Target Metrics (Pinned Dial Stage) */}
      <ImpactSection />

      {/* How We Measure Impact (Color-Coded Impact, Additionality, Risk 3-Card Framework) */}
      <ImpactFrameworkSection />
    </main>
  );
}
