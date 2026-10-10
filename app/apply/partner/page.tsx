import type { Metadata } from "next";
import { CompactHeader } from "@/components/apply/CompactHeader";
import { PathwaySwitcher } from "@/components/apply/PathwaySwitcher";
import { StakeholderList } from "@/components/apply/StakeholderList";
import { WhatHappensNextTimeline } from "@/components/apply/WhatHappensNextTimeline";
import { SimpleFirstStepSection } from "@/components/apply/SimpleFirstStepSection";
import { ApplySvgDefs } from "@/components/apply/ApplySvgDefs";

export const metadata: Metadata = {
  title: "Partner With NYEIB — Nigeria YEIB Investment Funds",
  description:
    "NYEIB works with financial institutions, fund managers, investors, development partners and ecosystem organisations to help expand access to capital, reduce financing barriers and strengthen Nigeria’s entrepreneurial ecosystem.",
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
        "Complete the relevant form with your institution’s details, mandate and proposed area of collaboration.",
    },
    {
      stepNumber: "Step 3",
      title: "Partnership review.",
      description:
        "The NYEIB team will review your submission and follow up where an appropriate opportunity for engagement exists.",
    },
  ];

  return (
    <div className="apply-pg min-h-screen">
      <ApplySvgDefs />

      {/* Hero Header */}
      <CompactHeader
        title="Partner With NYEIB"
        pill="For Institutions & Ecosystem Partners"
        pillColor="mint"
      />

      {/* Pathway Switcher */}
      <PathwaySwitcher currentPathway="partner" />

      <main>
        {/* Intro Section */}
        <section className="apply-sec apply-w">
          <div className="apply-intro">
            <h2>
              Explore opportunities to invest, collaborate and support business
              growth.
            </h2>
            <div className="r">
              <p>
                NYEIB works with financial institutions, fund managers,
                investors, development partners and ecosystem organisations to
                help expand access to capital, reduce financing barriers and
                strengthen Nigeria’s entrepreneurial ecosystem.
              </p>
              <p>
                <b className="font-semibold text-[var(--apply-ev)]">
                  Select the stakeholder group that best describes your
                  organisation.
                </b>
              </p>
            </div>
          </div>

          {/* Interactive Accordion for the 5 Stakeholder Groups */}
          <StakeholderList />
        </section>

        {/* What Happens Next? Strip */}
        <WhatHappensNextTimeline steps={partnerSteps} />

        {/* A Simple First Step Section */}
        <SimpleFirstStepSection />
      </main>
    </div>
  );
}
