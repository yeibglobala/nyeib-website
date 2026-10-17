import type { Metadata } from "next";
import { InnerHero } from "@/components/inner-hero/InnerHero";
import { WhoWeServeTeaser } from "@/components/home/WhoWeServeTeaser";
import { CtaCard } from "@/components/cta/CtaCard";
import { CTA_CONTENT } from "@/src/content/cta";

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

      {/* Interactive Who We Serve Swiper Showcase */}
      <WhoWeServeTeaser />

      {/* Closing CTA */}
      <CtaCard {...CTA_CONTENT.whoWeServe} />
    </main>
  );
}
