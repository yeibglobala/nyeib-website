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

  // Pure React state only: values live strictly in memory and vanish on refresh
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
        {/* Back Link */}
        <div className="mb-8 sm:mb-12">
          <Link
            href={ui.backLinkHref}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#003124] hover:text-[#00BE93] transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003124] rounded-sm py-1 px-1.5 -ml-1.5"
            style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
          >
            <ArrowLeft
              className="w-4 h-4 transition-transform group-hover:-translate-x-1"
              aria-hidden="true"
            />
            <span>{ui.backLinkText}</span>
          </Link>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Context & Information */}
          <div className="lg:col-span-5 flex flex-col">
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#003124] tracking-tight leading-[1.2] mb-4"
              style={{ fontFamily: "var(--font-headline, 'Asul', Georgia, serif)" }}
            >
              {editorial.title}
            </h2>

            <p
              className="text-base sm:text-lg font-semibold text-[#003124]/90 leading-snug mb-6"
              style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
            >
              {editorial.boldLine}
            </p>

            <div
              className="space-y-4 text-sm sm:text-base text-[#003124]/75 leading-relaxed font-normal mb-8"
              style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
            >
              {editorial.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Information Card */}
            <div className="bg-[#EFECE6]/80 border border-[#E6DCCB] rounded-2xl p-6 sm:p-7 text-[#003124]">
              <h3
                className="text-base font-bold text-[#003124] mb-2"
                style={{ fontFamily: "var(--font-headline, 'Asul', Georgia, serif)" }}
              >
                Dedicated Response Channels
              </h3>
              <p
                className="text-xs sm:text-sm text-[#003124]/75 leading-relaxed mb-4"
                style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
              >
                Have a specific project grievance or wish to report suspected misconduct confidentially? Please use our dedicated channels:
              </p>
              <div className="flex flex-col gap-2.5">
                <Link
                  href="/esg/grievance"
                  className="inline-flex items-center justify-between text-xs sm:text-sm font-semibold text-[#003124] hover:text-[#00BE93] transition-colors py-1 border-b border-[#003124]/10"
                >
                  <span>Submit a Grievance</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
                <Link
                  href="/esg/whistleblowing"
                  className="inline-flex items-center justify-between text-xs sm:text-sm font-semibold text-[#003124] hover:text-[#00BE93] transition-colors py-1"
                >
                  <span>Make a Whistleblowing Report</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-[#E6DCCB] rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 shadow-[0_12px_40px_rgba(0,49,36,0.04)]">
              {isSubmitted ? (
                /* Submission Confirmation Panel */
                <div
                  role="status"
                  aria-live="polite"
                  className="py-8 text-center flex flex-col items-center"
                >
                  <div className="w-14 h-14 rounded-full bg-[#E8F8F2] text-[#00BE93] flex items-center justify-center mb-6 shadow-sm">
                    <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
                  </div>
                  <h3
                    ref={confirmationHeadingRef}
                    tabIndex={-1}
                    className="text-2xl sm:text-3xl font-bold text-[#003124] tracking-tight mb-3 outline-none"
                    style={{ fontFamily: "var(--font-headline, 'Asul', Georgia, serif)" }}
                  >
                    Thank You for Reaching Out
                  </h3>
                  <p
                    className="text-sm sm:text-base text-[#003124]/75 max-w-md mx-auto leading-relaxed mb-6"
                    style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
                  >
                    Your message has been received. Our team will review your enquiry and respond to your email address promptly.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 items-center justify-center w-full max-w-xs mt-2">
                    <button
                      type="button"
                      onClick={handleEditAgain}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-[#003124]/20 text-[#003124] hover:bg-black/[0.03] text-xs sm:text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003124]"
                      style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
                    >
                      {ui.editAgainButtonText}
                    </button>
                    <Link
                      href="/esg"
                      className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#003124] text-white hover:bg-[#003124]/90 text-xs sm:text-sm font-semibold transition-all text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003124]"
                      style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
                    >
                      {ui.backToEsgButtonText}
                    </Link>
                  </div>
                </div>
              ) : (
                /* Interactive Form */
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  {/* Error Summary */}
                  {hasAttemptedSubmit && Object.keys(errors).length > 0 && (
                    <div
                      ref={errorSummaryRef}
                      tabIndex={-1}
                      role="alert"
                      aria-labelledby="error-summary-heading"
                      className="p-4 sm:p-5 rounded-xl bg-red-50/80 border border-red-200 text-red-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                    >
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
                        <div>
                          <h4
                            id="error-summary-heading"
                            className="text-sm font-bold tracking-tight mb-2"
                            style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
                          >
                            {ui.errorSummaryTitle}
                          </h4>
                          <ul className="text-xs sm:text-sm space-y-1 list-disc list-inside text-red-800">
                            {errors.name && (
                              <li>
                                <button
                                  type="button"
                                  onClick={() => nameInputRef.current?.focus()}
                                  className="underline hover:text-red-950 text-left font-medium"
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
                                  className="underline hover:text-red-950 text-left font-medium"
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
                                  className="underline hover:text-red-950 text-left font-medium"
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
                                  className="underline hover:text-red-950 text-left font-medium"
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
                                  className="underline hover:text-red-950 text-left font-medium"
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

                  {/* 1. Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs sm:text-sm font-semibold text-[#003124] mb-1.5"
                        style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
                      >
                        {draftContact.nameLabel} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        ref={nameInputRef}
                        required
                        value={values.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder={draftContact.namePlaceholder}
                        aria-invalid={errors.name ? "true" : "false"}
                        aria-describedby={errors.name ? "err-name" : undefined}
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-[#003124] placeholder-[#003124]/40 bg-white transition-all outline-none focus:ring-2 focus:ring-[#003124] ${
                          errors.name
                            ? "border-red-400 bg-red-50/20"
                            : "border-[#E6DCCB] hover:border-[#003124]/40"
                        }`}
                        style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
                      />
                      {errors.name && (
                        <p id="err-name" className="text-xs text-red-600 mt-1 font-medium">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs sm:text-sm font-semibold text-[#003124] mb-1.5"
                        style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
                      >
                        {draftContact.emailLabel} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        ref={emailInputRef}
                        required
                        value={values.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder={draftContact.emailPlaceholder}
                        aria-invalid={errors.email ? "true" : "false"}
                        aria-describedby={errors.email ? "err-email" : undefined}
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-[#003124] placeholder-[#003124]/40 bg-white transition-all outline-none focus:ring-2 focus:ring-[#003124] ${
                          errors.email
                            ? "border-red-400 bg-red-50/20"
                            : "border-[#E6DCCB] hover:border-[#003124]/40"
                        }`}
                        style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
                      />
                      {errors.email && (
                        <p id="err-email" className="text-xs text-red-600 mt-1 font-medium">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* 2. Phone & Organisation Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label
                          htmlFor="contact-phone"
                          className="block text-xs sm:text-sm font-semibold text-[#003124]"
                          style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
                        >
                          {draftContact.phoneLabel}
                        </label>
                        <span className="text-[11px] text-[#003124]/50">
                          {ui.optionalLabel}
                        </span>
                      </div>
                      <input
                        type="tel"
                        id="contact-phone"
                        value={values.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        placeholder={draftContact.phonePlaceholder}
                        className="w-full px-4 py-3 rounded-xl border border-[#E6DCCB] text-sm text-[#003124] placeholder-[#003124]/40 bg-white hover:border-[#003124]/40 transition-all outline-none focus:ring-2 focus:ring-[#003124]"
                        style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label
                          htmlFor="contact-organisation"
                          className="block text-xs sm:text-sm font-semibold text-[#003124]"
                          style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
                        >
                          {draftContact.organisationLabel}
                        </label>
                        <span className="text-[11px] text-[#003124]/50">
                          {ui.optionalLabel}
                        </span>
                      </div>
                      <input
                        type="text"
                        id="contact-organisation"
                        value={values.organisation}
                        onChange={(e) => handleChange("organisation", e.target.value)}
                        placeholder={draftContact.organisationPlaceholder}
                        className="w-full px-4 py-3 rounded-xl border border-[#E6DCCB] text-sm text-[#003124] placeholder-[#003124]/40 bg-white hover:border-[#003124]/40 transition-all outline-none focus:ring-2 focus:ring-[#003124]"
                        style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
                      />
                    </div>
                  </div>

                  {/* 3. Enquiry Topic */}
                  <div>
                    <label
                      htmlFor="contact-enquiry-type"
                      className="block text-xs sm:text-sm font-semibold text-[#003124] mb-1.5"
                      style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
                    >
                      {draftContact.enquiryTypeLabel} <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="contact-enquiry-type"
                      ref={enquiryTypeInputRef}
                      required
                      value={values.enquiryType}
                      onChange={(e) => handleChange("enquiryType", e.target.value)}
                      aria-invalid={errors.enquiryType ? "true" : "false"}
                      aria-describedby={errors.enquiryType ? "err-enquiry-type" : undefined}
                      className={`w-full px-4 py-3 rounded-xl border text-sm text-[#003124] bg-white transition-all outline-none focus:ring-2 focus:ring-[#003124] ${
                        errors.enquiryType
                          ? "border-red-400 bg-red-50/20"
                          : "border-[#E6DCCB] hover:border-[#003124]/40"
                      }`}
                      style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
                    >
                      <option value="">{ui.selectPlaceholder}</option>
                      {draftContact.enquiryTypeOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    {errors.enquiryType && (
                      <p id="err-enquiry-type" className="text-xs text-red-600 mt-1 font-medium">
                        {errors.enquiryType}
                      </p>
                    )}
                  </div>

                  {/* 4. Subject */}
                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block text-xs sm:text-sm font-semibold text-[#003124] mb-1.5"
                      style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
                    >
                      {draftContact.subjectLabel} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact-subject"
                      ref={subjectInputRef}
                      required
                      value={values.subject}
                      onChange={(e) => handleChange("subject", e.target.value)}
                      placeholder={draftContact.subjectPlaceholder}
                      aria-invalid={errors.subject ? "true" : "false"}
                      aria-describedby={errors.subject ? "err-subject" : undefined}
                      className={`w-full px-4 py-3 rounded-xl border text-sm text-[#003124] placeholder-[#003124]/40 bg-white transition-all outline-none focus:ring-2 focus:ring-[#003124] ${
                        errors.subject
                          ? "border-red-400 bg-red-50/20"
                          : "border-[#E6DCCB] hover:border-[#003124]/40"
                      }`}
                      style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
                    />
                    {errors.subject && (
                      <p id="err-subject" className="text-xs text-red-600 mt-1 font-medium">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* 5. Message */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label
                        htmlFor="contact-message"
                        className="block text-xs sm:text-sm font-semibold text-[#003124]"
                        style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
                      >
                        {draftContact.messageLabel} <span className="text-red-500">*</span>
                      </label>
                      <span
                        className={`text-[11px] ${
                          values.message.length > 3000 ? "text-red-600 font-bold" : "text-[#003124]/50"
                        }`}
                      >
                        {values.message.length} / 3000 {ui.characterCountSuffix}
                      </span>
                    </div>
                    <textarea
                      id="contact-message"
                      ref={messageInputRef}
                      required
                      rows={5}
                      value={values.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      placeholder={draftContact.messagePlaceholder}
                      aria-invalid={errors.message ? "true" : "false"}
                      aria-describedby={errors.message ? "err-message" : undefined}
                      className={`w-full px-4 py-3 rounded-xl border text-sm text-[#003124] placeholder-[#003124]/40 bg-white transition-all outline-none focus:ring-2 focus:ring-[#003124] resize-y ${
                        errors.message
                          ? "border-red-400 bg-red-50/20"
                          : "border-[#E6DCCB] hover:border-[#003124]/40"
                      }`}
                      style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
                    />
                    {errors.message && (
                      <p id="err-message" className="text-xs text-red-600 mt-1 font-medium">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-6 rounded-full bg-[#003124] hover:bg-[#003124]/90 active:scale-[0.99] text-white text-sm sm:text-base font-semibold shadow-md transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#003124] disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
                      style={{ fontFamily: "var(--font-body, system-ui, sans-serif)" }}
                    >
                      {isSubmitting ? (
                        <span>Sending message...</span>
                      ) : (
                        <span>{ui.submitButtonText}</span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
