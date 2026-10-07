import type { Metadata } from "next";
import { ApplyPageContent } from "@/components/apply-page/ApplyPageContent";

export const metadata: Metadata = {
  title: "Apply for Funding — Nigeria YEIB Investment Funds",
  description:
    "Whether you are growing a business or looking to partner with NYEIB, choose the pathway that best matches your role.",
};

export default function ApplyPage() {
  return <ApplyPageContent />;
}
