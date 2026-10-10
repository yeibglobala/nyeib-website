import type { Metadata } from "next";
import { ApplyLandingHero } from "@/components/apply/ApplyLandingHero";
import { PathwayChooserSection } from "@/components/apply/PathwayChooserSection";
import { SimpleFirstStepSection } from "@/components/apply/SimpleFirstStepSection";
import { DecorativeBlobs } from "@/components/apply/DecorativeBlobs";

export const metadata: Metadata = {
  title: "Apply for Funding — Nigeria YEIB Investment Funds",
  description:
    "Whether you are building a business or exploring an institutional partnership, NYEIB provides pathways to access capital, practical support and opportunities for collaboration.",
};

export default function ApplyPage() {
  return (
    <main
      data-theme="light"
      className="relative min-h-screen w-full bg-[#F7F5F0] text-[#0F2A20] overflow-x-hidden flex flex-col"
    >
      <DecorativeBlobs />
      <ApplyLandingHero />
      <PathwayChooserSection />
      <SimpleFirstStepSection />
    </main>
  );
}
