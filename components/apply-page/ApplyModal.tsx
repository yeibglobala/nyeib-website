"use client";

import React, { useState, useEffect } from "react";
import { X, CheckCircle2, ArrowRight } from "lucide-react";

export interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTrack?: "business" | "vc_pe" | "banks" | "ecosystem" | "research" | "investors";
}

const TRACK_LABELS: Record<string, string> = {
  business: "Entrepreneurs & Businesses (Business Support)",
  vc_pe: "Venture Capital & Private Equity Fund Managers",
  banks: "Banks & Licensed Lenders",
  ecosystem: "Ecosystem Support Organisations",
  research: "Research, Policy & Public Institutions",
  investors: "Investors & Development Partners",
};

export function ApplyModal({ isOpen, onClose, initialTrack = "business" }: ApplyModalProps) {
  const [track, setTrack] = useState(initialTrack);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [orgName, setOrgName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTrack(initialTrack);
      setIsSubmitted(false);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, initialTrack]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate lightweight intake processing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
      className="fixed inset-0 z-[100] grid place-items-center p-4 sm:p-6 md:p-8 bg-black/80 backdrop-blur-md overflow-hidden animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-3.5rem)] flex flex-col bg-[#0e1915] border border-white/10 rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] text-left animate-in zoom-in-95 duration-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 sm:top-5 right-4 sm:right-5 z-20 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content Container (centered in viewport at all times) */}
        <div className="overflow-y-auto overscroll-contain p-6 sm:p-8 md:p-10">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#00BE93]/20 border border-[#00BE93]/40 flex items-center justify-center mx-auto text-[#00BE93]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3
                id="modal-headline"
                className="text-2xl sm:text-3xl text-white font-normal"
                style={{ fontFamily: "var(--font-headline, serif)" }}
              >
                Submission Received
              </h3>
              <p className="text-[#e1c9b3] text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                Thank you for reaching out to NYEIB. Your submission has been recorded. Our team will review your information in line with our assessment processes.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#00BE93] hover:bg-[#00d6a5] text-[#0b1310] font-medium text-sm transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="pr-10">
                <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#00BE93]">
                  {track === "business" ? "Pathway 1 — Business Application" : "Pathway 2 — Partnership Enquiry"}
                </span>
                <h2
                  id="modal-headline"
                  className="text-2xl sm:text-3xl text-white font-normal mt-1 tracking-tight"
                  style={{ fontFamily: "var(--font-headline, serif)" }}
                >
                  {track === "business" ? "Apply for Business Support" : "Explore Partnership with NYEIB"}
                </h2>
                <p className="text-[#e1c9b3]/80 text-xs sm:text-sm mt-1.5 leading-relaxed">
                  {track === "business"
                    ? "Applying for business support takes about 5 minutes. No application fee required."
                    : "Tell us about your institution, mandate and area of interest."}
                </p>
              </div>

              {/* Select Track */}
              <div className="space-y-1.5">
                <label htmlFor="track-select" className="block text-xs uppercase tracking-wider text-[#e1c9b3]/70 font-medium">
                  Engagement Pathway
                </label>
                <select
                  id="track-select"
                  value={track}
                  onChange={(e) => setTrack(e.target.value as any)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#00BE93] transition-colors"
                >
                  {Object.entries(TRACK_LABELS).map(([value, label]) => (
                    <option key={value} value={value} className="bg-[#0b1310] text-white">
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Grid fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="fullName" className="block text-xs uppercase tracking-wider text-[#e1c9b3]/70 font-medium">
                    Full Name <span className="text-[#00BE93]">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Amina Bello"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#00BE93] transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-xs uppercase tracking-wider text-[#e1c9b3]/70 font-medium">
                    Email Address <span className="text-[#00BE93]">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. name@organisation.com"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#00BE93] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="orgName" className="block text-xs uppercase tracking-wider text-[#e1c9b3]/70 font-medium">
                    {track === "business" ? "Business Name" : "Institution / Organisation Name"} <span className="text-[#00BE93]">*</span>
                  </label>
                  <input
                    id="orgName"
                    type="text"
                    required
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    placeholder={track === "business" ? "e.g. AgriTech Innovations Ltd" : "e.g. First Horizon Capital"}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#00BE93] transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="phone" className="block text-xs uppercase tracking-wider text-[#e1c9b3]/70 font-medium">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+234 ..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#00BE93] transition-colors"
                  />
                </div>
              </div>

              {/* Overview / Notes */}
              <div className="space-y-1.5">
                <label htmlFor="message" className="block text-xs uppercase tracking-wider text-[#e1c9b3]/70 font-medium">
                  {track === "business" ? "Brief Business Overview" : "Mandate & Area of Interest"}
                </label>
                <textarea
                  id="message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    track === "business"
                      ? "Briefly describe your product/service, paying customers, and growth plans..."
                      : "Tell us about your institution, mandate, and intended collaboration..."
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#00BE93] transition-colors resize-none"
                />
              </div>

              {/* Disclaimer reassurance */}
              <div className="p-3.5 rounded-lg bg-white/[0.03] border border-white/5 text-[11px] sm:text-xs text-[#e1c9b3]/60 leading-relaxed">
                Submitting an application or partnership enquiry does not guarantee funding or partnership. All submissions are subject to relevant screening and approval processes.
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full text-xs sm:text-sm text-white/70 hover:text-white font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#00BE93] hover:bg-[#00d6a5] disabled:opacity-50 text-[#0b1310] font-medium text-xs sm:text-sm transition-colors"
                >
                  {isSubmitting ? "Submitting..." : track === "business" ? "Submit Application" : "Submit Enquiry"}
                  {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
