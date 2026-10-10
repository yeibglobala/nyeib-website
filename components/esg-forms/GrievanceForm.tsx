"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, AlertCircle, CheckCircle2 } from "lucide-react";
import {
  ESG_FORMS_DRAFT_UI,
  ESG_FORMS_EDITORIAL,
} from "@/src/content/esgForms";

interface FormValues {
  relationship: string;
  concernType: string;
  location: string;
  description: string;
  name: string;
  contact: string;
}

interface FormErrors {
  relationship?: string;
  concernType?: string;
  description?: string;
  contact?: string;
}

export function GrievanceForm() {
  const editorial = ESG_FORMS_EDITORIAL.grievance;
  const ui = ESG_FORMS_DRAFT_UI;
  const draftGrievance = ui.grievance;

  // STRICT COMPLIANCE: Pure React state only. Never persisted to localStorage, cookies, or APIs.
  const [values, setValues] = useState<FormValues>({
    relationship: "",
    concernType: "",
    location: "",
    description: "",
    name: "",
    contact: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const confirmationHeadingRef = useRef<HTMLHeadingElement>(null);

  const relationshipInputRef = useRef<HTMLSelectElement>(null);
  const concernTypeInputRef = useRef<HTMLSelectElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const contactInputRef = useRef<HTMLInputElement>(null);

  const validate = (currentValues: FormValues): FormErrors => {
    const errs: FormErrors = {};

    if (!currentValues.relationship) {
      errs.relationship = draftGrievance.errors.relationshipRequired;
    }
    if (!currentValues.concernType) {
      errs.concernType = draftGrievance.errors.concernTypeRequired;
    }
    if (!currentValues.description.trim()) {
      errs.description = draftGrievance.errors.descriptionRequired;
    } else if (currentValues.description.length > 3000) {
      errs.description = draftGrievance.errors.descriptionTooLong;
    }

    if (currentValues.contact.trim()) {
      // Basic sanity check: must contain @ or digits
      const contactVal = currentValues.contact.trim();
      const hasEmailChar = contactVal.includes("@");
      const hasPhoneChar = /\d{6,}/.test(contactVal.replace(/[\s+-]/g, ""));
      if (!hasEmailChar && !hasPhoneChar) {
        errs.contact = draftGrievance.errors.contactInvalid;
      }
    }

    return errs;
  };

  const handleChange = (
    field: keyof FormValues,
    val: string
  ) => {
    const newValues = { ...values, [field]: val };
    setValues(newValues);

    if (hasAttemptedSubmit) {
      const fieldErrors = validate(newValues);
      setErrors(fieldErrors);
    }
  };

  const handleBlur = () => {
    if (hasAttemptedSubmit) {
      setErrors(validate(values));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setHasAttemptedSubmit(true);
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setTimeout(() => {
        errorSummaryRef.current?.focus();
      }, 50);
      return;
    }

    // ZERO NETWORK REQUEST: Preview only. Transition UI state in memory.
    setIsSubmitting(true);
    setIsSubmitted(true);
    setIsSubmitting(false);

    setTimeout(() => {
      confirmationHeadingRef.current?.focus();
    }, 50);
  };

  const handleEditAgain = () => {
    setIsSubmitted(false);
  };

  return (
    <div className="w-full bg-[#F7F5F0] py-12 lg:py-20 px-4 sm:px-8 lg:px-12">
      <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* =========================================================================
            LEFT COLUMN (~40%): Approved editorial paragraphs and back link
            ========================================================================= */}
        <aside className="lg:col-span-5 lg:sticky lg:top-28 self-start">
          <div className="space-y-5 text-[#4A5B53] text-base sm:text-[17px] leading-relaxed">
            {editorial.paragraphs.map((para, idx) => (
              <p key={idx} style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}>
                {para}
              </p>
            ))}
          </div>

          <div className="pt-8">
            <Link
              href={ui.backLinkHref}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0F2A20] hover:text-[#1f9d74] transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f9d74] rounded-md px-1 py-1"
              style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>{ui.backLinkText}</span>
            </Link>
          </div>
        </aside>

        {/* =========================================================================
            RIGHT COLUMN (~60%): Form card or Preview Confirmation Panel
            ========================================================================= */}
        <div className="lg:col-span-7">
          {isSubmitted ? (
            /* PREVIEW CONFIRMATION PANEL */
            <div
              role="status"
              aria-live="polite"
              className="bg-[#BFEBDC]/35 border border-[#96DCBE] rounded-[28px] p-8 sm:p-12 shadow-[0_12px_40px_rgba(15,42,32,0.04)] text-center flex flex-col items-center select-text"
            >
              <div className="w-16 h-16 rounded-full bg-[#BFEBDC] text-[#0F2A20] flex items-center justify-center mb-6 shadow-sm">
                <CheckCircle2 className="w-8 h-8 text-[#0F2A20]" />
              </div>

              <h2
                ref={confirmationHeadingRef}
                tabIndex={-1}
                className="text-2xl sm:text-3xl font-bold text-[#0F2A20] mb-3 outline-none"
                style={{ fontFamily: "var(--font-headline, 'Asul', Georgia, serif)" }}
              >
                {ui.previewHeading}
              </h2>

              <p
                className="text-base sm:text-lg text-[#0F2A20]/80 max-w-md mx-auto mb-8 leading-relaxed font-normal"
                style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
              >
                {ui.previewBody}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button
                  type="button"
                  onClick={handleEditAgain}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white border border-[#E6DCCB] text-[#0F2A20] font-semibold text-sm hover:bg-[#F7F5F0] transition-colors focus-visible:ring-2 focus-visible:ring-[#0F2A20] outline-none"
                  style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
                >
                  {ui.editAgainButtonText}
                </button>

                <Link
                  href={ui.backLinkHref}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#0F2A20] text-white font-semibold text-sm hover:bg-[#183d30] transition-colors focus-visible:ring-2 focus-visible:ring-[#0F2A20] outline-none text-center"
                  style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
                >
                  {ui.backToEsgButtonText}
                </Link>
              </div>
            </div>
          ) : (
            /* FORM CARD */
            <div className="bg-white rounded-[28px] border border-[#E6DCCB] p-6 sm:p-10 shadow-[0_12px_40px_rgba(15,42,32,0.04)]">
              {/* Error Summary */}
              {hasAttemptedSubmit && Object.keys(errors).length > 0 && (
                <div
                  ref={errorSummaryRef}
                  role="alert"
                  tabIndex={-1}
                  aria-labelledby="error-summary-title"
                  className="mb-8 rounded-2xl bg-[#B3261E]/5 border border-[#B3261E]/30 p-5 outline-none focus:ring-2 focus:ring-[#B3261E]"
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-[#B3261E] shrink-0 mt-0.5" />
                    <div>
                      <h3
                        id="error-summary-title"
                        className="text-sm font-bold text-[#B3261E] mb-2"
                      >
                        {ui.errorSummaryTitle}
                      </h3>
                      <ul className="text-sm text-[#B3261E] space-y-1.5 list-disc list-inside">
                        {errors.relationship && (
                          <li>
                            <button
                              type="button"
                              onClick={() => relationshipInputRef.current?.focus()}
                              className="underline text-left hover:opacity-80"
                            >
                              {errors.relationship}
                            </button>
                          </li>
                        )}
                        {errors.concernType && (
                          <li>
                            <button
                              type="button"
                              onClick={() => concernTypeInputRef.current?.focus()}
                              className="underline text-left hover:opacity-80"
                            >
                              {errors.concernType}
                            </button>
                          </li>
                        )}
                        {errors.description && (
                          <li>
                            <button
                              type="button"
                              onClick={() => descriptionInputRef.current?.focus()}
                              className="underline text-left hover:opacity-80"
                            >
                              {errors.description}
                            </button>
                          </li>
                        )}
                        {errors.contact && (
                          <li>
                            <button
                              type="button"
                              onClick={() => contactInputRef.current?.focus()}
                              className="underline text-left hover:opacity-80"
                            >
                              {errors.contact}
                            </button>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* 1. Relationship to activity (Select, required) */}
                <div>
                  <label
                    htmlFor="grievance-relationship"
                    className="block text-sm font-semibold text-[#0F2A20] mb-2"
                    style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
                  >
                    {draftGrievance.relationshipLabel}
                    <span className="text-xs font-normal text-[#4A5B53] ml-2">
                      {ui.requiredLabel}
                    </span>
                  </label>
                  <select
                    id="grievance-relationship"
                    ref={relationshipInputRef}
                    value={values.relationship}
                    onChange={(e) => handleChange("relationship", e.target.value)}
                    onBlur={handleBlur}
                    aria-required="true"
                    aria-invalid={errors.relationship ? "true" : "false"}
                    aria-describedby={errors.relationship ? "err-relationship" : undefined}
                    className={`w-full h-[52px] rounded-[14px] px-4 text-[16px] bg-white text-[#0F2A20] transition-colors ${
                      errors.relationship
                        ? "border-2 border-[#B3261E] focus:ring-2 focus:ring-[#B3261E]"
                        : "border border-[#E6DCCB] focus:ring-2 focus:ring-[#1f9d74]"
                    } focus:outline-none focus:ring-offset-2`}
                  >
                    <option value="">{ui.selectPlaceholder}</option>
                    {draftGrievance.relationshipOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {errors.relationship && (
                    <p
                      id="err-relationship"
                      className="mt-1.5 text-xs font-semibold text-[#B3261E] flex items-center gap-1.5"
                    >
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.relationship}</span>
                    </p>
                  )}
                </div>

                {/* 2. Type of concern (Select, required) */}
                <div>
                  <label
                    htmlFor="grievance-concern-type"
                    className="block text-sm font-semibold text-[#0F2A20] mb-2"
                    style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
                  >
                    {draftGrievance.concernTypeLabel}
                    <span className="text-xs font-normal text-[#4A5B53] ml-2">
                      {ui.requiredLabel}
                    </span>
                  </label>
                  <select
                    id="grievance-concern-type"
                    ref={concernTypeInputRef}
                    value={values.concernType}
                    onChange={(e) => handleChange("concernType", e.target.value)}
                    onBlur={handleBlur}
                    aria-required="true"
                    aria-invalid={errors.concernType ? "true" : "false"}
                    aria-describedby={errors.concernType ? "err-concern-type" : undefined}
                    className={`w-full h-[52px] rounded-[14px] px-4 text-[16px] bg-white text-[#0F2A20] transition-colors ${
                      errors.concernType
                        ? "border-2 border-[#B3261E] focus:ring-2 focus:ring-[#B3261E]"
                        : "border border-[#E6DCCB] focus:ring-2 focus:ring-[#1f9d74]"
                    } focus:outline-none focus:ring-offset-2`}
                  >
                    <option value="">{ui.selectPlaceholder}</option>
                    {draftGrievance.concernTypeOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {errors.concernType && (
                    <p
                      id="err-concern-type"
                      className="mt-1.5 text-xs font-semibold text-[#B3261E] flex items-center gap-1.5"
                    >
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.concernType}</span>
                    </p>
                  )}
                </div>

                {/* 3. Activity or location concerned (Text, optional) */}
                <div>
                  <label
                    htmlFor="grievance-location"
                    className="block text-sm font-semibold text-[#0F2A20] mb-2"
                    style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
                  >
                    {draftGrievance.locationLabel}
                    <span className="text-xs font-normal text-[#4A5B53] ml-2">
                      {ui.optionalLabel}
                    </span>
                  </label>
                  <input
                    id="grievance-location"
                    type="text"
                    value={values.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    placeholder={draftGrievance.locationPlaceholder}
                    className="w-full h-[52px] rounded-[14px] px-4 text-[16px] bg-white border border-[#E6DCCB] text-[#0F2A20] placeholder-[#4A5B53]/50 focus:outline-none focus:ring-2 focus:ring-[#1f9d74] focus:ring-offset-2 transition-colors"
                  />
                </div>

                {/* 4. Describe your concern (Textarea, required, 6 rows, max 3000 chars) */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="grievance-description"
                      className="block text-sm font-semibold text-[#0F2A20]"
                      style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
                    >
                      {draftGrievance.descriptionLabel}
                      <span className="text-xs font-normal text-[#4A5B53] ml-2">
                        {ui.requiredLabel}
                      </span>
                    </label>
                    <span
                      aria-live="polite"
                      className={`text-xs ${
                        values.description.length > 3000
                          ? "text-[#B3261E] font-bold"
                          : "text-[#0F2A20]/60"
                      }`}
                    >
                      {values.description.length} / 3000 {ui.characterCountSuffix}
                    </span>
                  </div>
                  <textarea
                    id="grievance-description"
                    ref={descriptionInputRef}
                    rows={6}
                    maxLength={3000}
                    value={values.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    onBlur={handleBlur}
                    placeholder={draftGrievance.descriptionPlaceholder}
                    aria-required="true"
                    aria-invalid={errors.description ? "true" : "false"}
                    aria-describedby={errors.description ? "err-description" : undefined}
                    className={`w-full rounded-[14px] p-4 text-[16px] bg-white text-[#0F2A20] placeholder-[#4A5B53]/50 transition-colors resize-y ${
                      errors.description
                        ? "border-2 border-[#B3261E] focus:ring-2 focus:ring-[#B3261E]"
                        : "border border-[#E6DCCB] focus:ring-2 focus:ring-[#1f9d74]"
                    } focus:outline-none focus:ring-offset-2`}
                  />
                  {errors.description && (
                    <p
                      id="err-description"
                      className="mt-1.5 text-xs font-semibold text-[#B3261E] flex items-center gap-1.5"
                    >
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.description}</span>
                    </p>
                  )}
                </div>

                {/* 5. Your name (Text, optional) */}
                <div>
                  <label
                    htmlFor="grievance-name"
                    className="block text-sm font-semibold text-[#0F2A20] mb-2"
                    style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
                  >
                    {draftGrievance.nameLabel}
                    <span className="text-xs font-normal text-[#4A5B53] ml-2">
                      {ui.optionalLabel}
                    </span>
                  </label>
                  <input
                    id="grievance-name"
                    type="text"
                    autoComplete="name"
                    value={values.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder={draftGrievance.namePlaceholder}
                    className="w-full h-[52px] rounded-[14px] px-4 text-[16px] bg-white border border-[#E6DCCB] text-[#0F2A20] placeholder-[#4A5B53]/50 focus:outline-none focus:ring-2 focus:ring-[#1f9d74] focus:ring-offset-2 transition-colors"
                  />
                </div>

                {/* 6. Email or phone number (Text, optional) */}
                <div>
                  <label
                    htmlFor="grievance-contact"
                    className="block text-sm font-semibold text-[#0F2A20] mb-2"
                    style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
                  >
                    {draftGrievance.contactLabel}
                    <span className="text-xs font-normal text-[#4A5B53] ml-2">
                      {ui.optionalLabel}
                    </span>
                  </label>
                  <input
                    id="grievance-contact"
                    ref={contactInputRef}
                    type="text"
                    autoComplete="email tel"
                    value={values.contact}
                    onChange={(e) => handleChange("contact", e.target.value)}
                    onBlur={handleBlur}
                    placeholder={draftGrievance.contactPlaceholder}
                    aria-invalid={errors.contact ? "true" : "false"}
                    aria-describedby={errors.contact ? "err-contact" : undefined}
                    className={`w-full h-[52px] rounded-[14px] px-4 text-[16px] bg-white text-[#0F2A20] placeholder-[#4A5B53]/50 transition-colors ${
                      errors.contact
                        ? "border-2 border-[#B3261E] focus:ring-2 focus:ring-[#B3261E]"
                        : "border border-[#E6DCCB] focus:ring-2 focus:ring-[#1f9d74]"
                    } focus:outline-none focus:ring-offset-2`}
                  />
                  {errors.contact && (
                    <p
                      id="err-contact"
                      className="mt-1.5 text-xs font-semibold text-[#B3261E] flex items-center gap-1.5"
                    >
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.contact}</span>
                    </p>
                  )}
                </div>

                {/* Submit button: Orange primary with round arrow */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group/btn inline-flex items-center gap-2 select-none outline-none rounded-full transition-transform duration-300 hover:-translate-y-[2px] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#F88404] focus-visible:ring-offset-2"
                  >
                    <span
                      className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#F88404] hover:bg-[#ff941f] text-white text-[13px] sm:text-[14px] tracking-[0.05em] uppercase font-bold shadow-[0_8px_24px_rgba(248,132,4,0.3)] transition-colors duration-200"
                      style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
                    >
                      {ui.submitButtonText}
                    </span>
                    <span className="inline-grid place-items-center w-11 h-11 rounded-full bg-[#F88404] hover:bg-[#ff941f] text-white shadow-[0_8px_24px_rgba(248,132,4,0.3)] shrink-0 transition-transform duration-300 group-hover/btn:rotate-45">
                      <ArrowUpRight className="w-[18px] h-[18px]" />
                    </span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
