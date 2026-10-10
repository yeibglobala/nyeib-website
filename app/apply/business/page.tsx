import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { CompactHeader } from "@/components/apply/CompactHeader";
import { PathwaySwitcher } from "@/components/apply/PathwaySwitcher";
import { WhatHappensNextTimeline } from "@/components/apply/WhatHappensNextTimeline";
import { SimpleFirstStepSection } from "@/components/apply/SimpleFirstStepSection";
import { ImportantInformationSection } from "@/components/apply/ImportantInformationSection";
import { DecorativeBlobs } from "@/components/apply/DecorativeBlobs";
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
    <main
      data-theme="light"
      className="relative min-h-screen w-full bg-[#F7F5F0] text-[#0F2A20] overflow-x-hidden flex flex-col"
    >
      <DecorativeBlobs />

      {/* 1. Compact Header */}
      <CompactHeader
        title="Apply for Business Support"
        pill="For Entrepreneurs & Businesses"
        pillColor="mint"
      />

      {/* 2. Sticky Pathway Switcher */}
      <PathwaySwitcher currentPathway="business" />

      {/* 3. Intro & 4. Who this is for & 5. Primary Action */}
      <section className="w-full pt-12 sm:pt-16 lg:pt-20 pb-8 sm:pb-12">
        <div className="max-w-[1240px] w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Two Columns Intro */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 xl:gap-20 items-start">
            <div className="lg:col-span-5">
              <h2
                className="text-2xl sm:text-3xl lg:text-[36px] font-normal text-[#0F2A20] leading-[1.25] tracking-tight"
                style={{ fontFamily: "var(--font-headline, serif)" }}
              >
                Building a business with room to grow?
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-5 sm:space-y-6 lg:pt-1">
              <p
                className="text-[1rem] sm:text-[1.08rem] text-[#0F2A20]/80 leading-relaxed font-normal"
                style={{ fontFamily: "var(--font-body, sans-serif)" }}
              >
                NYEIB supports growth-oriented businesses connected to Nigerian youth and women, with a focus on creating jobs and building stronger, more investable enterprises.
              </p>
              <p
                className="text-[1rem] sm:text-[1.08rem] text-[#0F2A20]/80 leading-relaxed font-normal"
                style={{ fontFamily: "var(--font-body, sans-serif)" }}
              >
                Depending on your stage and needs, you may be considered for equity or quasi-equity investment, capacity-building support, or both.
              </p>
            </div>
          </div>

          {/* 4. Who this is for: Highlighted Callout Card */}
          <div className="w-full bg-[#2eb78c]/10 border border-[#2eb78c]/30 rounded-[24px] p-6 sm:p-8 flex items-start gap-4 shadow-sm">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#2eb78c]/20 text-[#1f9d74] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" aria-hidden="true" />
            </div>
            <p
              className="text-[0.98rem] sm:text-[1.05rem] text-[#0F2A20] font-medium leading-relaxed pt-1"
              style={{ fontFamily: "var(--font-body, sans-serif)" }}
            >
              This pathway is designed for businesses with a working product or service, paying customers and a clear plan for growth.
            </p>
          </div>

          {/* Top Primary Action Button */}
          <div className="pt-2">
            <Link
              href="/apply/business/start"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#F88404] hover:bg-[#e07500] text-white font-['Chivo',sans-serif] font-bold text-[0.95rem] sm:text-[1.02rem] tracking-wide transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
            >
              <span>Start Business Application</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. What Happens Next? Timeline */}
      <WhatHappensNextTimeline steps={businessSteps} />

      {/* 6. Shared Sections */}
      <SimpleFirstStepSection />
      <ImportantInformationSection />

      {/* 7. Bottom Primary Action Button */}
      <section className="w-full pb-16 sm:pb-24">
        <div className="max-w-[1240px] w-full mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <Link
            href="/apply/business/start"
            className="inline-flex items-center justify-center gap-2.5 px-10 py-4 sm:py-4.5 rounded-full bg-[#F88404] hover:bg-[#e07500] text-white font-['Chivo',sans-serif] font-bold text-[1rem] sm:text-[1.08rem] tracking-wide transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
          >
            <span>Start Business Application</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Mobile Floating Sticky CTA Button */}
      <FloatingMobileCTA />
    </main>
  );
}
