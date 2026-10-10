import type { Metadata } from "next";
import { FormHeader } from "@/components/esg-forms/FormHeader";
import { DraftBanner } from "@/components/esg-forms/DraftBanner";
import { WhistleblowingForm } from "@/components/esg-forms/WhistleblowingForm";
import { ESG_FORMS_EDITORIAL, DRAFT_MODE } from "@/src/content/esgForms";

export const metadata: Metadata = {
  title: "Whistleblowing | NYEIB",
  description:
    "Report suspected misconduct connected to NYEIB activities through the whistleblowing channel.",
  ...(DRAFT_MODE
    ? {
        robots: {
          index: false,
          follow: false,
        },
      }
    : {}),
};

export default function WhistleblowingPage() {
  const editorial = ESG_FORMS_EDITORIAL.whistleblowing;

  return (
    <main className="w-full bg-[#F7F5F0] flex flex-col min-h-screen">
      {/* 1. Compact Header */}
      <FormHeader title={editorial.title} boldLine={editorial.boldLine} />

      {/* 2. Draft Notice Banner (while DRAFT_MODE is true) */}
      <DraftBanner />

      {/* 3. Main Two-Column Layout and Form Card */}
      <WhistleblowingForm />
    </main>
  );
}
