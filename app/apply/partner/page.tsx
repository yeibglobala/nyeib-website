import type { Metadata } from "next";
import { CompactHeader } from "@/components/apply/CompactHeader";
import { PathwaySwitcher } from "@/components/apply/PathwaySwitcher";
import { StakeholderList } from "@/components/apply/StakeholderList";
import { WhatHappensNextTimeline } from "@/components/apply/WhatHappensNextTimeline";
import { SimpleFirstStepSection } from "@/components/apply/SimpleFirstStepSection";
import { ImportantInformationSection } from "@/components/apply/ImportantInformationSection";
import { DecorativeBlobs } from "@/components/apply/DecorativeBlobs";

export const metadata: Metadata = {
  title: "Partner With NYEIB — Nigeria YEIB Investment Funds",
  description:
    "NYEIB works with financial institutions, fund managers, investors, development partners and ecosystem organisations to help expand access to capital, reduce financing barriers and strengthen Nigeria's entrepreneurial ecosystem.",
};

export default function ApplyPartnerPage() {
  const partnerSteps = [
    {
      stepNumber: "Step 1",
      title: "Choose your stakeholder group.",
      description:
        "Select the category that best describes your institution or organisation.",
    },
    {
      stepNumber: "Step 2",
      title: "Share your interest.",
      description:
        "Complete the relevant form with your institution's details, mandate and proposed area of collaboration.",
    },
    {
      stepNumber: "Step 3",
      title: "Partnership review.",
      description:
        "The NYEIB team will review your submission and follow up where an appropriate opportunity for engagement exists.",
    },
  ];

  return (
    <main
      data-theme="light"
      className="relative min-h-screen w-full bg-[#F7F5F0] text-[#0F2A20] overflow-x-hidden flex flex-col"
    >
      <DecorativeBlobs />

      {/* 1. Compact Header */}
      <CompactHeader
        title="Partner With NYEIB"
        pill="For Institutions & Ecosystem Partners"
        pillColor="orange"
      />

      {/* 2. Sticky Pathway Switcher */}
      <PathwaySwitcher currentPathway="partner" />

      {/* 3. Intro Section */}
      <section className="w-full pt-12 sm:pt-16 pb-4">
        <div className="max-w-[1240px] w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
            <div className="lg:col-span-5">
              <h2
                className="text-2xl sm:text-3xl lg:text-[36px] font-normal text-[#0F2A20] leading-[1.2] tracking-tight"
                style={{ fontFamily: "var(--font-headline, serif)" }}
              >
                Explore opportunities to invest, collaborate and support business growth.
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-4">
              <p
                className="text-[1rem] sm:text-[1.08rem] text-[#0F2A20]/80 leading-relaxed font-normal"
                style={{ fontFamily: "var(--font-body, sans-serif)" }}
              >
                NYEIB works with financial institutions, fund managers, investors, development partners and ecosystem organisations to help expand access to capital, reduce financing barriers and strengthen Nigeria&apos;s entrepreneurial ecosystem.
              </p>
              <p
                className="text-[1rem] sm:text-[1.08rem] text-[#0F2A20] font-medium leading-relaxed"
                style={{ fontFamily: "var(--font-body, sans-serif)" }}
              >
                Select the stakeholder group that best describes your organisation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Stakeholder List */}
      <StakeholderList />

      {/* 5. What Happens Next? Timeline */}
      <WhatHappensNextTimeline steps={partnerSteps} />

      {/* 6. Shared Sections */}
      <SimpleFirstStepSection />
      <ImportantInformationSection />
    </main>
  );
}
