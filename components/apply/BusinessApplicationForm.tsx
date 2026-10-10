"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Shield,
  ArrowRight,
  Loader2,
  AlertCircle,
} from "lucide-react";

export function BusinessApplicationForm() {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

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

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = (data: typeof formData): Record<string, string> => {
    const errs: Record<string, string> = {};

    if (!data.fullName.trim()) {
      errs.fullName = "Full name is required.";
    }

    if (!data.email.trim()) {
      errs.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errs.email = "Please enter a valid email address.";
    }

    if (!data.phone.trim()) {
      errs.phone = "Phone number is required.";
    }

    if (!data.businessName.trim()) {
      errs.businessName = "Business name is required.";
    }

    if (!data.businessLocation.trim()) {
      errs.businessLocation = "State or location in Nigeria is required.";
    }

    if (!data.description.trim()) {
      errs.description = "Brief description of your enterprise is required.";
    }

    return errs;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const nextData = { ...formData, [name]: value };
    setFormData(nextData);

    if (hasAttemptedSubmit || touched[name]) {
      setErrors(validate(nextData));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(formData));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const getFieldClass = (fieldName: keyof typeof formData) => {
    const isError = Boolean((hasAttemptedSubmit || touched[fieldName]) && errors[fieldName]);
    return `w-full px-4 py-3 rounded-xl bg-[#F7F5F0] text-[#0F2A20] text-sm transition-all duration-200 outline-none placeholder-[#0F2A20]/40 ${
      isError
        ? "border-2 border-[#B3261E] focus:ring-2 focus:ring-[#B3261E]"
        : "border border-[#E6DCCB] focus:ring-2 focus:ring-[#2eb78c]"
    }`;
  };

  // 1. Success State
  if (isSubmitted) {
    return (
      <div className="max-w-2xl w-full bg-white border border-[#E6DCCB] rounded-[28px] p-8 sm:p-12 shadow-[0_12px_40px_rgba(15,42,32,0.06)] text-center space-y-6 animate-in zoom-in-95 duration-300">
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
    const errorCount = Object.keys(errors).length;

    return (
      <div className="max-w-2xl w-full bg-white border border-[#E6DCCB] rounded-[28px] p-8 sm:p-12 shadow-[0_12px_40px_rgba(15,42,32,0.06)] text-left space-y-8 animate-in fade-in duration-300">
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

        {/* Accessible Error Summary */}
        {hasAttemptedSubmit && errorCount > 0 && (
          <div
            role="alert"
            tabIndex={-1}
            aria-labelledby="form-error-title"
            className="rounded-2xl bg-[#B3261E]/5 border border-[#B3261E]/30 p-4 sm:p-5 outline-none animate-in fade-in duration-200"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#B3261E] shrink-0 mt-0.5" />
              <div>
                <h3 id="form-error-title" className="text-sm font-bold text-[#B3261E] mb-1.5">
                  Please resolve the following issues before submitting:
                </h3>
                <ul className="text-xs sm:text-sm text-[#B3261E] space-y-1 list-disc list-inside">
                  {Object.values(errors).map((err, idx) => (
                    <li key={idx}>{err}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Full Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#0F2A20]/75">
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="e.g. Aisha Bello"
                aria-required="true"
                aria-invalid={(hasAttemptedSubmit || touched.fullName) && errors.fullName ? "true" : "false"}
                aria-describedby={errors.fullName ? "err-fullName" : undefined}
                className={getFieldClass("fullName")}
              />
              {(hasAttemptedSubmit || touched.fullName) && errors.fullName && (
                <p id="err-fullName" className="mt-1.5 text-xs font-semibold text-[#B3261E] flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.fullName}</span>
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#0F2A20]/75">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="aisha@example.com"
                aria-required="true"
                aria-invalid={(hasAttemptedSubmit || touched.email) && errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "err-email" : undefined}
                className={getFieldClass("email")}
              />
              {(hasAttemptedSubmit || touched.email) && errors.email && (
                <p id="err-email" className="mt-1.5 text-xs font-semibold text-[#B3261E] flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>
          </div>

          {/* Business Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#0F2A20]/75">
                Business Name *
              </label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="e.g. AgriTech Solutions Ltd"
                aria-required="true"
                aria-invalid={(hasAttemptedSubmit || touched.businessName) && errors.businessName ? "true" : "false"}
                aria-describedby={errors.businessName ? "err-businessName" : undefined}
                className={getFieldClass("businessName")}
              />
              {(hasAttemptedSubmit || touched.businessName) && errors.businessName && (
                <p id="err-businessName" className="mt-1.5 text-xs font-semibold text-[#B3261E] flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.businessName}</span>
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#0F2A20]/75">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="+234 800 000 0000"
                aria-required="true"
                aria-invalid={(hasAttemptedSubmit || touched.phone) && errors.phone ? "true" : "false"}
                aria-describedby={errors.phone ? "err-phone" : undefined}
                className={getFieldClass("phone")}
              />
              {(hasAttemptedSubmit || touched.phone) && errors.phone && (
                <p id="err-phone" className="mt-1.5 text-xs font-semibold text-[#B3261E] flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.phone}</span>
                </p>
              )}
            </div>
          </div>

          {/* Sector & State */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#0F2A20]/75">
                Sector *
              </label>
              <select
                name="sector"
                value={formData.sector}
                onChange={handleChange}
                className={getFieldClass("sector")}
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

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#0F2A20]/75">
                State / Location in Nigeria *
              </label>
              <input
                type="text"
                name="businessLocation"
                value={formData.businessLocation}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="e.g. Lagos, Abuja, Kano"
                aria-required="true"
                aria-invalid={(hasAttemptedSubmit || touched.businessLocation) && errors.businessLocation ? "true" : "false"}
                aria-describedby={errors.businessLocation ? "err-businessLocation" : undefined}
                className={getFieldClass("businessLocation")}
              />
              {(hasAttemptedSubmit || touched.businessLocation) && errors.businessLocation && (
                <p id="err-businessLocation" className="mt-1.5 text-xs font-semibold text-[#B3261E] flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.businessLocation}</span>
                </p>
              )}
            </div>
          </div>

          {/* Support Needed */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#0F2A20]/75">
              Support Sought *
            </label>
            <select
              name="supportType"
              value={formData.supportType}
              onChange={handleChange}
              className={getFieldClass("supportType")}
            >
              <option>Both Investment & Capacity Building</option>
              <option>Equity or Quasi-Equity Investment</option>
              <option>Capacity Building & Technical Assistance</option>
            </select>
          </div>

          {/* Business Overview Description */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#0F2A20]/75">
              Brief Description of Enterprise & Growth Plans *
            </label>
            <textarea
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Tell us briefly about your product/service, paying customers, and growth targets..."
              aria-required="true"
              aria-invalid={(hasAttemptedSubmit || touched.description) && errors.description ? "true" : "false"}
              aria-describedby={errors.description ? "err-description" : undefined}
              className={`${getFieldClass("description")} resize-none`}
            />
            {(hasAttemptedSubmit || touched.description) && errors.description && (
              <p id="err-description" className="mt-1.5 text-xs font-semibold text-[#B3261E] flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.description}</span>
              </p>
            )}
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
                  <span>Submitting Application...</span>
                </>
              ) : (
                <>
                  <span>Submit Application</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    );
  }

  // 3. Initial Intake Landing / Overview State
  return (
    <div className="max-w-2xl w-full bg-white border border-[#E6DCCB] rounded-[28px] p-8 sm:p-12 shadow-[0_12px_40px_rgba(15,42,32,0.06)] text-center space-y-6 animate-in fade-in duration-300">
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
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#F7F5F0] border border-[#E6DCCB]/60 text-sm font-medium text-[#0F2A20]/80">
          <Clock className="w-5 h-5 text-[#1f9d74] shrink-0" />
          <span>Takes ~5 minutes</span>
        </div>
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#F7F5F0] border border-[#E6DCCB]/60 text-sm font-medium text-[#0F2A20]/80">
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
