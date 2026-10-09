import type { Metadata } from "next";
import { DecorativeBlobs } from "@/components/apply/DecorativeBlobs";
import { PartnerEnquiryForm } from "@/components/apply/PartnerEnquiryForm";

interface GroupMeta {
  title: string;
  category: string;
}

const GROUP_INFO: Record<string, GroupMeta> = {
  "vc-pe": {
    title: "Venture Capital & Private Equity Fund Managers",
    category: "Investment Partnerships & Co-investment",
  },
  "banks-lenders": {
    title: "Banks & Licensed Lenders",
    category: "Risk-Sharing & Lending Arrangements",
  },
  "ecosystem-support": {
    title: "Ecosystem Support Organisations",
    category: "Capacity-Building & Enterprise Support",
  },
  "research-policy": {
    title: "Research, Policy & Public Institutions",
    category: "Policy, Research & Ecosystem Data",
  },
  "investors-dev-partners": {
    title: "Investors & Development Partners",
    category: "Strategic Capital & Development Cooperation",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ group: string }>;
}): Promise<Metadata> {
  const { group } = await params;
  const info = GROUP_INFO[group] || { title: "Partnership Enquiry" };
  return {
    title: `${info.title} — NYEIB Partnership`,
    description: `Explore partnership opportunities with NYEIB for ${info.title}.`,
  };
}

export default async function PartnerGroupPage({
  params,
}: {
  params: Promise<{ group: string }>;
}) {
  const { group } = await params;
  const info = GROUP_INFO[group] || {
    title: "Institutional Partnership Enquiry",
    category: "Partnership Engagement",
  };

  return (
    <main
      data-theme="light"
      className="relative min-h-screen w-full bg-[#F7F5F0] text-[#0F2A20] pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center"
    >
      <DecorativeBlobs />
      <PartnerEnquiryForm
        groupSlug={group}
        groupTitle={info.title}
        category={info.category}
      />
    </main>
  );
}
