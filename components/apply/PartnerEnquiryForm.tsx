"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock, Shield, ArrowRight, Loader2 } from "lucide-react";

interface PartnerEnquiryFormProps {
  groupSlug: string;
  groupTitle: string;
  category: string;
}

export function PartnerEnquiryForm({
  groupSlug,
  groupTitle,
  category,
}: PartnerEnquiryFormProps) {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    contactName: "",
    contactTitle: "",
    email: "",
    phone: "",
    institutionName: "",
    institutionType: groupTitle,
    headquarters: "",
    mandateSummary: "",
    proposedCollaboration: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  // 1. Success State
  if (isSubmitted) {
    return (
      <div className="max-w-2xl w-full bg-white border border-[#E6DCCB] rounded-[28px] p-8 sm:p-12 shadow-[0_12px_40px_rgba(15,42,32,0.06)] text-center space-y-6 animate-in zoom-in-95 duration-300">
        <div className="w-16 h-16 rounded-full bg-[#F88404]/15 text-[#c26200] flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
        </div>

        <h2
          className="text-3xl sm:text-4xl font-normal text-[#0F2A20] tracking-tight leading-tight"
          style={{ fontFamily: "var(--font-headline, serif)" }}
        >
          Enquiry Received
        </h2>

        <p
          className="text-[1rem] text-[#0F2A20]/80 leading-relaxed font-normal max-w-lg mx-auto"
          style={{ fontFamily: "var(--font-body, sans-serif)" }}
        >
          Thank you for sharing your interest on behalf of <strong>{formData.institutionName || "your institution"}</strong>. The NYEIB partnership team will review your mandate and follow up promptly.
        </p>

        <div className="pt-4 flex justify-center">
          <Link
            href="/apply/partner"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#0F2A20] hover:bg-[#1a3d31] text-white text-sm font-semibold transition-colors shadow-md"
          >
            <span>Return to Pathway 2</span>
          </Link>
        </div>
      </div>
    );
  }

  // 2. Interactive Form State
  if (showForm) {
    return (
      <div className="max-w-2xl w-full bg-white border border-[#E6DCCB] rounded-[28px] p-8 sm:p-12 shadow-[0_12px_40px_rgba(15,42,32,0.06)] text-left space-y-8 animate-in fade-in duration-300">
        <div className="flex items-center justify-between border-b border-[#E6DCCB]/60 pb-5">
          <div>
            <span className="text-[0.78rem] font-mono uppercase tracking-wider text-[#c26200] font-semibold">
              Pathway 2: Partnership Enquiry
            </span>
            <h2
              className="text-2xl sm:text-3xl font-normal text-[#0F2A20] tracking-tight mt-1"
              style={{ fontFamily: "var(--font-headline, serif)" }}
            >
              Institution & Mandate
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="text-xs font-semibold text-[#0F2A20]/60 hover:text-[#0F2A20] transition-colors"
          >
            Cancel
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Representative Name & Job Title */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#0F2A20]/75">
                Representative Name *
              </label>
              <input
                type="text"
                required
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                placeholder="e.g. Dr. Emeka Okafor"
                className="w-full px-4 py-3 rounded-xl bg-[#F7F5F0] border border-[#E6DCCB] text-[#0F2A20] text-sm focus:outline-none focus:ring-2 focus:ring-[#F88404]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#0F2A20]/75">
                Official Job Title *
              </label>
              <input
                type="text"
                required
                name="contactTitle"
                value={formData.contactTitle}
                onChange={handleChange}
                placeholder="e.g. Managing Director / Partner"
                className="w-full px-4 py-3 rounded-xl bg-[#F7F5F0] border border-[#E6DCCB] text-[#0F2A20] text-sm focus:outline-none focus:ring-2 focus:ring-[#F88404]"
              />
            </div>
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#0F2A20]/75">
                Official Email *
              </label>
              <input
                type="email"
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.okafor@institution.org"
                className="w-full px-4 py-3 rounded-xl bg-[#F7F5F0] border border-[#E6DCCB] text-[#0F2A20] text-sm focus:outline-none focus:ring-2 focus:ring-[#F88404]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#0F2A20]/75">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+234 800 000 0000"
                className="w-full px-4 py-3 rounded-xl bg-[#F7F5F0] border border-[#E6DCCB] text-[#0F2A20] text-sm focus:outline-none focus:ring-2 focus:ring-[#F88404]"
              />
            </div>
          </div>

          {/* Institution Name & Group */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#0F2A20]/75">
                Institution / Organisation Name *
              </label>
              <input
                type="text"
                required
                name="institutionName"
                value={formData.institutionName}
                onChange={handleChange}
                placeholder="e.g. Apex Growth Capital"
                className="w-full px-4 py-3 rounded-xl bg-[#F7F5F0] border border-[#E6DCCB] text-[#0F2A20] text-sm focus:outline-none focus:ring-2 focus:ring-[#F88404]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#0F2A20]/75">
                Stakeholder Category
              </label>
              <input
                type="text"
                readOnly
                value={groupTitle}
                className="w-full px-4 py-3 rounded-xl bg-[#F7F5F0]/80 border border-[#E6DCCB] text-[#0F2A20]/80 text-sm cursor-not-allowed"
              />
            </div>
          </div>

          {/* Proposed Area of Collaboration */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#0F2A20]/75">
              Proposed Area of Collaboration & Mandate *
            </label>
            <textarea
              required
              rows={4}
              name="proposedCollaboration"
              value={formData.proposedCollaboration}
              onChange={handleChange}
              placeholder="Tell us about your institution's mandate, co-investment focus or proposed partnership area with NYEIB..."
              className="w-full px-4 py-3 rounded-xl bg-[#F7F5F0] border border-[#E6DCCB] text-[#0F2A20] text-sm focus:outline-none focus:ring-2 focus:ring-[#F88404] resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-full bg-[#F88404] hover:bg-[#e07500] text-white font-['Chivo',sans-serif] text-base font-bold shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Submitting Enquiry...</span>
                </>
              ) : (
                <>
                  <span>Submit Partnership Enquiry</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    );
  }

  // 3. Initial Overview State
  return (
    <div className="max-w-2xl w-full bg-white border border-[#E6DCCB] rounded-[28px] p-8 sm:p-12 shadow-[0_12px_40px_rgba(15,42,32,0.06)] text-center space-y-6 animate-in fade-in duration-300">
      <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#F88404]/35 text-[#c26200] bg-[#F88404]/5 text-[0.82rem] font-semibold tracking-wide">
        Pathway 2: {category}
      </div>

      <h1
        className="text-2xl sm:text-3xl md:text-4xl font-normal text-[#0F2A20] tracking-tight leading-snug"
        style={{ fontFamily: "var(--font-headline, serif)" }}
      >
        {groupTitle}
      </h1>

      <p
        className="text-[1rem] text-[#0F2A20]/80 leading-relaxed font-normal"
        style={{ fontFamily: "var(--font-body, sans-serif)" }}
      >
        Share your institution&apos;s details, mandate and proposed area of collaboration. The NYEIB team will review your submission and follow up where an appropriate opportunity for engagement exists.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-3 text-left">
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#F7F5F0] border border-[#E6DCCB]/60 text-sm font-medium text-[#0F2A20]/80">
          <Clock className="w-5 h-5 text-[#c26200] shrink-0" />
          <span>Takes ~5 minutes</span>
        </div>
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#F7F5F0] border border-[#E6DCCB]/60 text-sm font-medium text-[#0F2A20]/80">
          <Shield className="w-5 h-5 text-[#c26200] shrink-0" />
          <span>Structured review</span>
        </div>
      </div>

      <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/apply/partner"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-[#E6DCCB] text-[#0F2A20] hover:bg-black/[0.03] text-sm font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Pathway 2</span>
        </Link>

        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#F88404] hover:bg-[#e07500] text-white font-['Chivo',sans-serif] text-sm font-bold shadow-md transition-all active:scale-95"
        >
          <span>Proceed to Form</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
