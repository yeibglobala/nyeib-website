"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock, Shield, ArrowRight, ArrowUpRight, Loader2 } from "lucide-react";

export function BusinessApplicationForm() {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    businessName: "",
    sector: "Agribusiness & Food Security",
    businessStage: "Working product with paying customers",
    supportType: "Both Investment & Capacity Building",
    businessLocation: "",
    description: "",
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
      <div className="max-w-2xl w-full bg-white border border-[#E6DCCB] rounded-[28px] p-8 sm:p-12 shadow-[0_12px_40px_rgba(15,42,32,0.04)] text-center space-y-6 animate-in zoom-in-95 duration-300">
        <div className="w-16 h-16 rounded-full bg-[#2eb78c]/15 text-[#1f9d74] flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
        </div>

        <h2
          className="text-3xl sm:text-4xl font-normal text-[#0F2A20] tracking-tight leading-tight"
          style={{ fontFamily: "var(--font-headline, serif)" }}
        >
          Application Submitted
        </h2>

        <p
          className="text-[1rem] text-[#0F2A20]/80 leading-relaxed font-normal max-w-lg mx-auto"
          style={{ fontFamily: "var(--font-body, sans-serif)" }}
        >
          Thank you for submitting your application for <strong>{formData.businessName || "your enterprise"}</strong>. Our team will review your details against the initial screening criteria.
        </p>

        <div className="pt-4 flex justify-center">
          <Link
            href="/apply"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#0F2A20] hover:bg-[#1a3d31] text-white text-sm font-semibold transition-colors shadow-md"
          >
            <span>Return to Apply Page</span>
          </Link>
        </div>
      </div>
    );
  }

  // 2. Interactive Form State
  if (showForm) {
    return (
      <div className="max-w-2xl w-full bg-white border border-[#E6DCCB] rounded-[28px] p-6 sm:p-10 shadow-[0_12px_40px_rgba(15,42,32,0.04)] text-left space-y-8 animate-in fade-in duration-300">
        <div className="flex items-center justify-between border-b border-[#E6DCCB]/60 pb-5">
          <div>
            <span className="text-[0.78rem] font-mono uppercase tracking-wider text-[#1f9d74] font-semibold">
              Pathway 1: Business Application
            </span>
            <h2
              className="text-2xl sm:text-3xl font-normal text-[#0F2A20] tracking-tight mt-1"
              style={{ fontFamily: "var(--font-headline, serif)" }}
            >
              Enterprise Information
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

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="biz-fullname"
                className="block text-sm font-semibold text-[#0F2A20] mb-2"
                style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
              >
                Full Name
                <span className="text-xs font-normal text-[#4A5B53] ml-2">(Required)</span>
              </label>
              <input
                id="biz-fullname"
                type="text"
                required
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. Aisha Bello"
                className="w-full h-[52px] rounded-[14px] px-4 text-[15px] sm:text-[16px] bg-white text-[#0F2A20] placeholder-[#4A5B53]/50 border border-[#E6DCCB] focus:outline-none focus:ring-2 focus:ring-[#1f9d74] focus:ring-offset-2 transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="biz-email"
                className="block text-sm font-semibold text-[#0F2A20] mb-2"
                style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
              >
                Email Address
                <span className="text-xs font-normal text-[#4A5B53] ml-2">(Required)</span>
              </label>
              <input
                id="biz-email"
                type="email"
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="aisha@example.com"
                className="w-full h-[52px] rounded-[14px] px-4 text-[15px] sm:text-[16px] bg-white text-[#0F2A20] placeholder-[#4A5B53]/50 border border-[#E6DCCB] focus:outline-none focus:ring-2 focus:ring-[#1f9d74] focus:ring-offset-2 transition-colors"
              />
            </div>
          </div>

          {/* Business Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="biz-name"
                className="block text-sm font-semibold text-[#0F2A20] mb-2"
                style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
              >
                Business Name
                <span className="text-xs font-normal text-[#4A5B53] ml-2">(Required)</span>
              </label>
              <input
                id="biz-name"
                type="text"
                required
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                placeholder="e.g. AgriTech Solutions Ltd"
                className="w-full h-[52px] rounded-[14px] px-4 text-[15px] sm:text-[16px] bg-white text-[#0F2A20] placeholder-[#4A5B53]/50 border border-[#E6DCCB] focus:outline-none focus:ring-2 focus:ring-[#1f9d74] focus:ring-offset-2 transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="biz-phone"
                className="block text-sm font-semibold text-[#0F2A20] mb-2"
                style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
              >
                Phone Number
                <span className="text-xs font-normal text-[#4A5B53] ml-2">(Required)</span>
              </label>
              <input
                id="biz-phone"
                type="tel"
                required
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+234 800 000 0000"
                className="w-full h-[52px] rounded-[14px] px-4 text-[15px] sm:text-[16px] bg-white text-[#0F2A20] placeholder-[#4A5B53]/50 border border-[#E6DCCB] focus:outline-none focus:ring-2 focus:ring-[#1f9d74] focus:ring-offset-2 transition-colors"
              />
            </div>
          </div>

          {/* Sector & State */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="biz-sector"
                className="block text-sm font-semibold text-[#0F2A20] mb-2"
                style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
              >
                Sector
                <span className="text-xs font-normal text-[#4A5B53] ml-2">(Required)</span>
              </label>
              <select
                id="biz-sector"
                name="sector"
                value={formData.sector}
                onChange={handleChange}
                className="w-full h-[52px] rounded-[14px] px-4 text-[15px] sm:text-[16px] bg-white text-[#0F2A20] border border-[#E6DCCB] focus:outline-none focus:ring-2 focus:ring-[#1f9d74] focus:ring-offset-2 transition-colors cursor-pointer"
              >
                <option>Agribusiness & Food Security</option>
                <option>Technology & Digital Economy</option>
                <option>Manufacturing & Industrial</option>
                <option>Healthcare & Pharmaceuticals</option>
                <option>Renewable Energy & Sustainability</option>
                <option>Creative & Media Industry</option>
                <option>Other Services & Commerce</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="biz-location"
                className="block text-sm font-semibold text-[#0F2A20] mb-2"
                style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
              >
                State / Location in Nigeria
                <span className="text-xs font-normal text-[#4A5B53] ml-2">(Required)</span>
              </label>
              <input
                id="biz-location"
                type="text"
                required
                name="businessLocation"
                value={formData.businessLocation}
                onChange={handleChange}
                placeholder="e.g. Lagos, Abuja, Kano"
                className="w-full h-[52px] rounded-[14px] px-4 text-[15px] sm:text-[16px] bg-white text-[#0F2A20] placeholder-[#4A5B53]/50 border border-[#E6DCCB] focus:outline-none focus:ring-2 focus:ring-[#1f9d74] focus:ring-offset-2 transition-colors"
              />
            </div>
          </div>

          {/* Support Needed */}
          <div>
            <label
              htmlFor="biz-support"
              className="block text-sm font-semibold text-[#0F2A20] mb-2"
              style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
            >
              Support Sought
              <span className="text-xs font-normal text-[#4A5B53] ml-2">(Required)</span>
            </label>
            <select
              id="biz-support"
              name="supportType"
              value={formData.supportType}
              onChange={handleChange}
              className="w-full h-[52px] rounded-[14px] px-4 text-[15px] sm:text-[16px] bg-white text-[#0F2A20] border border-[#E6DCCB] focus:outline-none focus:ring-2 focus:ring-[#1f9d74] focus:ring-offset-2 transition-colors cursor-pointer"
            >
              <option>Both Investment & Capacity Building</option>
              <option>Equity or Quasi-Equity Investment</option>
              <option>Capacity Building & Technical Assistance</option>
            </select>
          </div>

          {/* Business Overview Description */}
          <div>
            <label
              htmlFor="biz-description"
              className="block text-sm font-semibold text-[#0F2A20] mb-2"
              style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
            >
              Brief Description of Enterprise & Growth Plans
              <span className="text-xs font-normal text-[#4A5B53] ml-2">(Required)</span>
            </label>
            <textarea
              id="biz-description"
              required
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell us briefly about your product/service, paying customers, and growth targets..."
              className="w-full rounded-[14px] p-4 text-[15px] sm:text-[16px] bg-white text-[#0F2A20] placeholder-[#4A5B53]/50 border border-[#E6DCCB] focus:outline-none focus:ring-2 focus:ring-[#1f9d74] focus:ring-offset-2 transition-colors resize-y"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="group/btn inline-flex items-center gap-2 select-none outline-none rounded-full transition-transform duration-300 hover:-translate-y-[2px] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#F88404] focus-visible:ring-offset-2"
            >
              <span
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#F88404] hover:bg-[#ff941f] text-white text-[13px] sm:text-[14px] tracking-[0.05em] uppercase font-bold shadow-[0_8px_24px_rgba(248,132,4,0.3)] transition-colors duration-200"
                style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </span>
              <span className="inline-grid place-items-center w-11 h-11 rounded-full bg-[#F88404] hover:bg-[#ff941f] text-white shadow-[0_8px_24px_rgba(248,132,4,0.3)] shrink-0 transition-transform duration-300 group-hover/btn:rotate-45">
                {isSubmitting ? (
                  <Loader2 className="w-[18px] h-[18px] animate-spin" />
                ) : (
                  <ArrowUpRight className="w-[18px] h-[18px]" />
                )}
              </span>
            </button>
          </div>
        </form>
      </div>
    );
  }

  // 3. Initial Intake Landing / Overview State
  return (
    <div className="max-w-2xl w-full bg-white border border-[#E6DCCB] rounded-[28px] p-8 sm:p-12 shadow-[0_12px_40px_rgba(15,42,32,0.04)] text-center space-y-6 animate-in fade-in duration-300">
      <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#2eb78c]/35 text-[#1f9d74] bg-[#2eb78c]/5 text-[0.82rem] font-semibold tracking-wide">
        Pathway 1: Business Application
      </div>

      <h1
        className="text-3xl sm:text-4xl font-normal text-[#0F2A20] tracking-tight leading-tight"
        style={{ fontFamily: "var(--font-headline, serif)" }}
      >
        Start Business Application
      </h1>

      <p
        className="text-[1rem] text-[#0F2A20]/80 leading-relaxed font-normal"
        style={{ fontFamily: "var(--font-body, sans-serif)" }}
      >
        The initial application is designed to take approximately five minutes. You will need basic details about your enterprise, operations, growth plans and support needs.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-3 text-left">
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#FAF8F5] border border-[#E6DCCB] text-sm font-medium text-[#0F2A20]">
          <Clock className="w-5 h-5 text-[#1f9d74] shrink-0" />
          <span>Takes ~5 minutes</span>
        </div>
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#FAF8F5] border border-[#E6DCCB] text-sm font-medium text-[#0F2A20]">
          <Shield className="w-5 h-5 text-[#1f9d74] shrink-0" />
          <span>No application fee</span>
        </div>
      </div>

      <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/apply/business"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-[#E6DCCB] text-[#0F2A20] hover:bg-black/[0.03] text-sm font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Pathway 1</span>
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
