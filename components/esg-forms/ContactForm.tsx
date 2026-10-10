"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, AlertCircle, CheckCircle2 } from "lucide-react";
import {
  ESG_FORMS_DRAFT_UI,
  ESG_FORMS_EDITORIAL,
} from "@/src/content/esgForms";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  organisation: string;
  enquiryType: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  enquiryType?: string;
  subject?: string;
  message?: string;
}

export function ContactForm() {
  const editorial = ESG_FORMS_EDITORIAL.contact;
  const ui = ESG_FORMS_DRAFT_UI;
  const draftContact = ui.contact;

  // STRICT COMPLIANCE: Pure React state only. Never persisted to localStorage, cookies, or APIs.
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    phone: "",
    organisation: "",
    enquiryType: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const confirmationHeadingRef = useRef<HTMLHeadingElement>(null);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const enquiryTypeInputRef = useRef<HTMLSelectElement>(null);
  const subjectInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  const validate = (currentValues: FormValues): FormErrors => {
    const errs: FormErrors = {};

    if (!currentValues.name.trim()) {
      errs.name = draftContact.errors.nameRequired;
    }

    if (!currentValues.email.trim()) {
      errs.email = draftContact.errors.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(currentValues.email.trim())) {
      errs.email = draftContact.errors.emailInvalid;
    }

    if (!currentValues.enquiryType) {
      errs.enquiryType = draftContact.errors.enquiryTypeRequired;
    }

    if (!currentValues.subject.trim()) {
      errs.subject = draftContact.errors.subjectRequired;
    }

    if (!currentValues.message.trim()) {
      errs.message = draftContact.errors.messageRequired;
    } else if (currentValues.message.length > 3000) {
      errs.message = draftContact.errors.messageTooLong;
    }

    return errs;
  };

  const handleChange = (
    field: keyof FormValues,
    value: string
  ) => {
    const nextValues = { ...values, [field]: value };
    setValues(nextValues);

    if (hasAttemptedSubmit) {
      const nextErrors = validate(nextValues);
      setErrors(nextErrors);
    }
  };

  const handleBlur = () => {
    if (hasAttemptedSubmit) {
      setErrors(validate(values));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);

    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setTimeout(() => {
        errorSummaryRef.current?.focus();
        errorSummaryRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 50);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        confirmationHeadingRef.current?.focus();
        confirmationHeadingRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }, 400);
  };

  const handleEditAgain = () => {
    setIsSubmitted(false);
    setTimeout(() => {
      nameInputRef.current?.focus();
    }, 50);
  };

  return (
    <div className="w-full bg-[#F7F5F0] py-12 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-12">
      <div className="max-w-[1240px] w-full mx-auto">
        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Context & Explanations (No repeated H1 or bold line) */}
          <div className="lg:col-span-5 flex flex-col">
            {/* Approved MD Paragraphs */}
            <div className="space-y-5 text-[#4A5B53] text-base sm:text-[17px] leading-relaxed mb-8">
              {editorial.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Other Channels Box */}
            <div className="bg-[#EFECE6]/80 border border-[#E6DCCB] rounded-2xl p-6 sm:p-7 text-[#0F2A20] mb-8">
              <h3
                className="text-base font-bold text-[#0F2A20] mb-2"
                style={{ fontFamily: "var(--font-headline, 'Asul', Georgia, serif)" }}
              >
                {draftContact.otherChannelsHeading}
              </h3>
              <p
                className="text-xs sm:text-sm text-[#0F2A20]/75 leading-relaxed mb-4"
                style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
              >
                {draftContact.otherChannelsText}
              </p>
              <div className="flex flex-col gap-2.5">
                <Link
                  href="/esg/grievance"
                  className="inline-flex items-center justify-between text-xs sm:text-sm font-semibold text-[#0F2A20] hover:text-[#00BE93] transition-colors py-1 border-b border-[#0F2A20]/10"
                >
                  <span>{draftContact.grievanceLinkText}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
                <Link
                  href="/esg/whistleblowing"
                  className="inline-flex items-center justify-between text-xs sm:text-sm font-semibold text-[#0F2A20] hover:text-[#00BE93] transition-colors py-1"
                >
                  <span>{draftContact.whistleblowingLinkText}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Back Link under text */}
            <div className="pt-2">
              <Link
                href={ui.backLinkHref}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#0F2A20] hover:text-[#00BE93] transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F2A20] rounded-sm py-1 px-1.5 -ml-1.5"
                style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
              >
                <ArrowLeft
                  className="w-4 h-4 transition-transform group-hover:-translate-x-1"
                  aria-hidden="true"
                />
                <span>{ui.backLinkText}</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Form Card */}
          <div className="lg:col-span-7">
            {isSubmitted ? (
              /* Preview Confirmation Panel */
              <div
                role="status"
                aria-live="polite"
                className="bg-white rounded-[24px] border border-[#E6DCCB] p-8 sm:p-12 text-center shadow-[0_4px_24px_rgba(15,42,32,0.04)]"
              >
                <div className="w-14 h-14 rounded-full bg-[#E8F8F2] text-[#00BE93] flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
                </div>
                <h2
                  ref={confirmationHeadingRef}
                  tabIndex={-1}
                  className="text-2xl sm:text-3xl font-bold text-[#0F2A20] tracking-tight mb-3 outline-none"
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

                <div className="flex flex-col sm:flex-row gap-3 items-center justify-center w-full max-w-xs mx-auto mt-2">
                  <button
                    type="button"
                    onClick={handleEditAgain}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-[#0F2A20]/20 text-[#0F2A20] hover:bg-black/[0.03] text-xs sm:text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F2A20]"
                    style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
                  >
                    {ui.editAgainButtonText}
                  </button>
                  <Link
                    href="/esg"
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#0F2A20] text-white hover:bg-[#0F2A20]/90 text-xs sm:text-sm font-semibold transition-all text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F2A20]"
                    style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
                  >
                    {ui.backToEsgButtonText}
                  </Link>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-[24px] border border-[#E6DCCB] p-6 sm:p-10 shadow-[0_4px_24px_rgba(15,42,32,0.04)]">
                {/* Accessible Error Summary */}
                {hasAttemptedSubmit && Object.keys(errors).length > 0 && (
                  <div
                    ref={errorSummaryRef}
                    tabIndex={-1}
                    role="alert"
                    aria-labelledby="contact-error-summary-title"
                    className="mb-8 p-5 rounded-[16px] bg-[#FDF2F2] border-2 border-[#B3261E] outline-none"
                  >
                    <div className="flex items-start gap-3">
                      <AlertCircle
                        className="w-5 h-5 text-[#B3261E] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <div>
                        <h4
                          id="contact-error-summary-title"
                          className="text-sm font-bold text-[#B3261E] mb-2"
                          style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
                        >
                          {ui.errorSummaryTitle}
                        </h4>
                        <ul className="text-xs sm:text-sm space-y-1.5 list-disc list-inside text-[#B3261E]">
                          {errors.name && (
                            <li>
                              <button
                                type="button"
                                onClick={() => nameInputRef.current?.focus()}
                                className="underline hover:opacity-80 text-left font-medium"
                              >
                                {errors.name}
                              </button>
                            </li>
                          )}
                          {errors.email && (
                            <li>
                              <button
                                type="button"
                                onClick={() => emailInputRef.current?.focus()}
                                className="underline hover:opacity-80 text-left font-medium"
                              >
                                {errors.email}
                              </button>
                            </li>
                          )}
                          {errors.enquiryType && (
                            <li>
                              <button
                                type="button"
                                onClick={() => enquiryTypeInputRef.current?.focus()}
                                className="underline hover:opacity-80 text-left font-medium"
                              >
                                {errors.enquiryType}
                              </button>
                            </li>
                          )}
                          {errors.subject && (
                            <li>
                              <button
                                type="button"
                                onClick={() => subjectInputRef.current?.focus()}
                                className="underline hover:opacity-80 text-left font-medium"
                              >
                                {errors.subject}
                              </button>
                            </li>
                          )}
                          {errors.message && (
                            <li>
                              <button
                                type="button"
                                onClick={() => messageInputRef.current?.focus()}
                                className="underline hover:opacity-80 text-left font-medium"
                              >
                                {errors.message}
                              </button>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  {/* 1. Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-sm font-semibold text-[#0F2A20] mb-2"
                        style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
                      >
                        {draftContact.nameLabel}
                        <span className="text-xs font-normal text-[#4A5B53] ml-2">
                          {ui.requiredLabel}
                        </span>
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        ref={nameInputRef}
                        required
                        value={values.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        onBlur={handleBlur}
                        placeholder={draftContact.namePlaceholder}
                        aria-required="true"
                        aria-invalid={errors.name ? "true" : "false"}
                        aria-describedby={errors.name ? "err-name" : undefined}
                        className={`w-full h-[52px] rounded-[14px] px-4 text-[16px] bg-white text-[#0F2A20] placeholder-[#4A5B53]/50 transition-colors ${
                          errors.name
                            ? "border-2 border-[#B3261E] focus:ring-2 focus:ring-[#B3261E]"
                            : "border border-[#E6DCCB] focus:ring-2 focus:ring-[#003124]"
                        } focus:outline-none focus:ring-offset-2`}
                      />
                      {errors.name && (
                        <p
                          id="err-name"
                          className="mt-1.5 text-xs font-semibold text-[#B3261E] flex items-center gap-1.5"
                        >
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-sm font-semibold text-[#0F2A20] mb-2"
                        style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
                      >
                        {draftContact.emailLabel}
                        <span className="text-xs font-normal text-[#4A5B53] ml-2">
                          {ui.requiredLabel}
                        </span>
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        ref={emailInputRef}
                        required
                        value={values.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        onBlur={handleBlur}
                        placeholder={draftContact.emailPlaceholder}
                        aria-required="true"
                        aria-invalid={errors.email ? "true" : "false"}
                        aria-describedby={errors.email ? "err-email" : undefined}
                        className={`w-full h-[52px] rounded-[14px] px-4 text-[16px] bg-white text-[#0F2A20] placeholder-[#4A5B53]/50 transition-colors ${
                          errors.email
                            ? "border-2 border-[#B3261E] focus:ring-2 focus:ring-[#B3261E]"
                            : "border border-[#E6DCCB] focus:ring-2 focus:ring-[#003124]"
                        } focus:outline-none focus:ring-offset-2`}
                      />
                      {errors.email && (
                        <p
                          id="err-email"
                          className="mt-1.5 text-xs font-semibold text-[#B3261E] flex items-center gap-1.5"
                        >
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* 2. Phone & Organisation Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-sm font-semibold text-[#0F2A20] mb-2"
                        style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
                      >
                        {draftContact.phoneLabel}
                        <span className="text-xs font-normal text-[#4A5B53] ml-2">
                          {ui.optionalLabel}
                        </span>
                      </label>
                      <input
                        type="tel"
                        id="contact-phone"
                        value={values.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        placeholder={draftContact.phonePlaceholder}
                        className="w-full h-[52px] rounded-[14px] px-4 text-[16px] bg-white border border-[#E6DCCB] text-[#0F2A20] placeholder-[#4A5B53]/50 focus:outline-none focus:ring-2 focus:ring-[#003124] focus:ring-offset-2 transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-organisation"
                        className="block text-sm font-semibold text-[#0F2A20] mb-2"
                        style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
                      >
                        {draftContact.organisationLabel}
                        <span className="text-xs font-normal text-[#4A5B53] ml-2">
                          {ui.optionalLabel}
                        </span>
                      </label>
                      <input
                        type="text"
                        id="contact-organisation"
                        value={values.organisation}
                        onChange={(e) => handleChange("organisation", e.target.value)}
                        placeholder={draftContact.organisationPlaceholder}
                        className="w-full h-[52px] rounded-[14px] px-4 text-[16px] bg-white border border-[#E6DCCB] text-[#0F2A20] placeholder-[#4A5B53]/50 focus:outline-none focus:ring-2 focus:ring-[#003124] focus:ring-offset-2 transition-colors"
                      />
                    </div>
                  </div>

                  {/* 3. Enquiry Topic */}
                  <div>
                    <label
                      htmlFor="contact-enquiry-type"
                      className="block text-sm font-semibold text-[#0F2A20] mb-2"
                      style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
                    >
                      {draftContact.enquiryTypeLabel}
                      <span className="text-xs font-normal text-[#4A5B53] ml-2">
                        {ui.requiredLabel}
                      </span>
                    </label>
                    <select
                      id="contact-enquiry-type"
                      ref={enquiryTypeInputRef}
                      required
                      value={values.enquiryType}
                      onChange={(e) => handleChange("enquiryType", e.target.value)}
                      onBlur={handleBlur}
                      aria-required="true"
                      aria-invalid={errors.enquiryType ? "true" : "false"}
                      aria-describedby={errors.enquiryType ? "err-enquiry-type" : undefined}
                      className={`w-full h-[52px] rounded-[14px] px-4 text-[16px] bg-white text-[#0F2A20] transition-colors ${
                        errors.enquiryType
                          ? "border-2 border-[#B3261E] focus:ring-2 focus:ring-[#B3261E]"
                          : "border border-[#E6DCCB] focus:ring-2 focus:ring-[#003124]"
                      } focus:outline-none focus:ring-offset-2`}
                    >
                      <option value="">{ui.selectPlaceholder}</option>
                      {draftContact.enquiryTypeOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    {errors.enquiryType && (
                      <p
                        id="err-enquiry-type"
                        className="mt-1.5 text-xs font-semibold text-[#B3261E] flex items-center gap-1.5"
                      >
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.enquiryType}</span>
                      </p>
                    )}
                  </div>

                  {/* 4. Subject */}
                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block text-sm font-semibold text-[#0F2A20] mb-2"
                      style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
                    >
                      {draftContact.subjectLabel}
                      <span className="text-xs font-normal text-[#4A5B53] ml-2">
                        {ui.requiredLabel}
                      </span>
                    </label>
                    <input
                      type="text"
                      id="contact-subject"
                      ref={subjectInputRef}
                      required
                      value={values.subject}
                      onChange={(e) => handleChange("subject", e.target.value)}
                      onBlur={handleBlur}
                      placeholder={draftContact.subjectPlaceholder}
                      aria-required="true"
                      aria-invalid={errors.subject ? "true" : "false"}
                      aria-describedby={errors.subject ? "err-subject" : undefined}
                      className={`w-full h-[52px] rounded-[14px] px-4 text-[16px] bg-white text-[#0F2A20] placeholder-[#4A5B53]/50 transition-colors ${
                        errors.subject
                          ? "border-2 border-[#B3261E] focus:ring-2 focus:ring-[#B3261E]"
                            : "border border-[#E6DCCB] focus:ring-2 focus:ring-[#003124]"
                      } focus:outline-none focus:ring-offset-2`}
                    />
                    {errors.subject && (
                      <p
                        id="err-subject"
                        className="mt-1.5 text-xs font-semibold text-[#B3261E] flex items-center gap-1.5"
                      >
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.subject}</span>
                      </p>
                    )}
                  </div>

                  {/* 5. Message */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label
                        htmlFor="contact-message"
                        className="block text-sm font-semibold text-[#0F2A20]"
                        style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
                      >
                        {draftContact.messageLabel}
                        <span className="text-xs font-normal text-[#4A5B53] ml-2">
                          {ui.requiredLabel}
                        </span>
                      </label>
                      <span
                        aria-live="polite"
                        className={`text-xs ${
                          values.message.length > 3000
                            ? "text-[#B3261E] font-bold"
                            : "text-[#0F2A20]/60"
                        }`}
                      >
                        {values.message.length} / 3000 {ui.characterCountSuffix}
                      </span>
                    </div>
                    <textarea
                      id="contact-message"
                      ref={messageInputRef}
                      rows={6}
                      maxLength={3000}
                      value={values.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      onBlur={handleBlur}
                      placeholder={draftContact.messagePlaceholder}
                      aria-required="true"
                      aria-invalid={errors.message ? "true" : "false"}
                      aria-describedby={errors.message ? "err-message" : undefined}
                      className={`w-full rounded-[14px] p-4 text-[16px] bg-white text-[#0F2A20] placeholder-[#4A5B53]/50 transition-colors resize-y ${
                        errors.message
                          ? "border-2 border-[#B3261E] focus:ring-2 focus:ring-[#B3261E]"
                          : "border border-[#E6DCCB] focus:ring-2 focus:ring-[#003124]"
                      } focus:outline-none focus:ring-offset-2`}
                    />
                    {errors.message && (
                      <p
                        id="err-message"
                        className="mt-1.5 text-xs font-semibold text-[#B3261E] flex items-center gap-1.5"
                      >
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit button: Orange primary with round arrow */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group/btn inline-flex items-center gap-2 select-none outline-none rounded-full transition-transform duration-300 hover:-translate-y-[2px] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#F88404] focus-visible:ring-offset-2 cursor-pointer"
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
    </div>
  );
}
