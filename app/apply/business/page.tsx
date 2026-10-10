import type { Metadata } from "next";
import Link from "next/link";
import { CompactHeader } from "@/components/apply/CompactHeader";
import { PathwaySwitcher } from "@/components/apply/PathwaySwitcher";
import { WhatHappensNextTimeline } from "@/components/apply/WhatHappensNextTimeline";
import { SimpleFirstStepSection } from "@/components/apply/SimpleFirstStepSection";
import { ApplySvgDefs } from "@/components/apply/ApplySvgDefs";
import { FloatingMobileCTA } from "@/components/apply/FloatingMobileCTA";

export const metadata: Metadata = {
  title: "Apply for Business Support — Nigeria YEIB Investment Funds",
  description:
    "NYEIB supports growth-oriented businesses connected to Nigerian youth and women, with a focus on creating jobs and building stronger, more investable enterprises.",
};

export default function ApplyBusinessPage() {
  const businessSteps = [
    {
      stepNumber: "Step 1",
      title: "Submit your application.",
      description:
        "Complete the business application form with information about your enterprise, its operations, growth plans and the support you are seeking.",
    },
    {
      stepNumber: "Step 2",
      title: "Initial screening.",
      description:
        "Your submission will be reviewed against the relevant initial screening criteria.",
    },
    {
      stepNumber: "Step 3",
      title: "Further assessment.",
      description:
        "If your business progresses, the NYEIB team may request additional information or documentation to support the assessment process.",
    },
  ];

  return (
    <div className="apply-pg min-h-screen">
      <ApplySvgDefs />

      {/* Hero Header */}
      <CompactHeader
        title="Apply for Business Support"
        pill="For Entrepreneurs & Businesses"
        pillColor="mint"
      />

      {/* Pathway Switcher */}
      <PathwaySwitcher currentPathway="business" />

      <main>
        {/* Intro Section */}
        <section className="apply-sec max-w-[1240px] w-full mx-auto px-5 sm:px-8 lg:px-12">
          <div className="apply-intro">
            <h2>Building a business with room to grow?</h2>
            <div className="r">
              <p>
                NYEIB supports growth-oriented businesses connected to Nigerian
                youth and women, with a focus on creating jobs and building
                stronger, more investable enterprises.
              </p>
              <p>
                Depending on your stage and needs, you may be considered for
                equity or quasi-equity investment, capacity-building support, or
                both.
              </p>
            </div>
          </div>

          <div className="apply-call">
            <svg viewBox="-.1 -.1 8.3 17.4" aria-hidden="true">
              <use href="#L" fill="url(#gm)" />
            </svg>
            <span>
              This pathway is designed for businesses with a working product or
              service, paying customers and a clear plan for growth.
            </span>
          </div>

          <div>
            <Link href="/apply/business/start" className="apply-btn">
              <span>Start Business Application</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        {/* What Happens Next? Strip */}
        <WhatHappensNextTimeline steps={businessSteps} />

        {/* A Simple First Step Section */}
        <SimpleFirstStepSection />
      </main>

      {/* Floating CTA for Mobile screens */}
      <FloatingMobileCTA />
    </div>
  );
}
