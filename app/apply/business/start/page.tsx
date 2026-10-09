import type { Metadata } from "next";
import { DecorativeBlobs } from "@/components/apply/DecorativeBlobs";
import { BusinessApplicationForm } from "@/components/apply/BusinessApplicationForm";

export const metadata: Metadata = {
  title: "Business Application — Nigeria YEIB Investment Funds",
  description: "Start your business application for NYEIB support.",
};

export default function BusinessApplicationStartPage() {
  return (
    <main
      data-theme="light"
      className="relative min-h-screen w-full bg-[#F7F5F0] text-[#0F2A20] pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center"
    >
      <DecorativeBlobs />
      <BusinessApplicationForm />
    </main>
  );
}
