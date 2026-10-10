import React from "react";
import { Info } from "lucide-react";
import { DRAFT_MODE, ESG_FORMS_DRAFT_UI } from "@/src/content/esgForms";

export function DraftBanner() {
  if (!DRAFT_MODE) return null;

  return (
    <div
      role="status"
      aria-label="Draft notice"
      className="w-full bg-[#F3E3A6] text-[#0F2A20] border-b border-[#E6DCCB] py-3.5 px-4 sm:px-8"
    >
      <div className="max-w-[1240px] mx-auto flex items-center justify-center gap-2.5 text-center">
        <Info className="w-4 h-4 shrink-0 text-[#0F2A20]/80" aria-hidden="true" />
        <span
          className="text-xs sm:text-sm font-semibold tracking-wide"
          style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
        >
          {ESG_FORMS_DRAFT_UI.draftBannerText}
        </span>
      </div>
    </div>
  );
}
