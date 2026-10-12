import type { Metadata } from "next";
import { CurvedHeroLayout } from "@/components/inner-hero/CurvedHeroLayout";

export const metadata: Metadata = {
  title: "Curved Hero Layout Preview — Nigeria YEIB Investment Funds",
  description:
    "Preview of the curved sweeping hero layout design from Figma (node 620:128) using inner-pages-hero-layou-svg.svg.",
};

export default function HeroLayoutPreviewPage() {
  return (
    <main className="w-full min-h-screen bg-[#FAF7F2] flex flex-col">
      {/* Top Banner / Indicator */}
      <div className="w-full bg-[#00241A] text-white py-3 px-6 text-center text-xs tracking-wider uppercase font-semibold border-b border-[#00BE93]/20">
        Component Preview: Curved Hero Section Layout (Figma Node 620:128)
      </div>

      {/* The Curved Hero Section Layout */}
      <CurvedHeroLayout />

      {/* Demonstration with custom props */}
      <div className="max-w-[1300px] w-full mx-auto px-6 py-16">
        <h2
          className="text-2xl font-bold text-[#003124] mb-4"
          style={{ fontFamily: "var(--font-headline, serif)" }}
        >
          Custom Configuration Example
        </h2>
        <p className="text-[#003124]/75 mb-8 max-w-xl">
          The component can be customized with any headline, highlighted keyword, description, or custom image:
        </p>
      </div>

      <CurvedHeroLayout
        titlePrefix="Empowering the next generation of "
        highlight="innovators"
        titleSuffix=" across Nigeria."
        description="Providing structured, risk-sharing financing and capacity-building mechanisms for high-growth enterprises."
        ctaText="Explore Initiatives"
        ctaHref="/apply"
      />
    </main>
  );
}
