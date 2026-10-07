"use client";

import React, { useState } from "react";
import { InnerHero } from "@/components/inner-hero/InnerHero";
import { ApplyPathwaysSection } from "@/components/apply-page/ApplyPathwaysSection";
import { ApplyPartnershipAccordionSection } from "@/components/apply-page/ApplyPartnershipAccordionSection";
import { ApplyProcessSection } from "@/components/apply-page/ApplyProcessSection";
import { ApplyModal } from "@/components/apply-page/ApplyModal";

export function ApplyPageContent() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<
    "business" | "vc_pe" | "banks" | "ecosystem" | "research" | "investors"
  >("business");

  const handleOpenModal = (
    track: "business" | "vc_pe" | "banks" | "ecosystem" | "research" | "investors"
  ) => {
    setSelectedTrack(track);
    setModalOpen(true);
  };

  return (
    <main className="w-full bg-[#0b1310] flex flex-col">
      {/* Inner Hero: Work With NYEIB */}
      <InnerHero slug="apply-for-funding" />

      {/* Pathway 1 & Primary Route 3D Flip Cards (Plain White & Pale Oak Field) */}
      <ApplyPathwaysSection onOpenModal={handleOpenModal} />

      {/* Pathway 2: 5 Institutional Tracks Accordion with Plus Icons */}
      <ApplyPartnershipAccordionSection onOpenModal={handleOpenModal} />

      {/* Application Reassurance, What Happens Next, and Final Trust Note */}
      <ApplyProcessSection onOpenModal={handleOpenModal} />

      {/* Application / Partnership Modal Flow */}
      <ApplyModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialTrack={selectedTrack}
      />
    </main>
  );
}
