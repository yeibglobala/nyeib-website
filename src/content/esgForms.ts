/**
 * ESG DRAFT FORMS CONTENT & CONFIGURATION
 * 
 * IMPORTANT:
 * DRAFT_MODE is set to true. While DRAFT_MODE is true:
 * 1. The visible draft review banner is rendered at the top of both forms.
 * 2. Search engine robots are strictly instructed not to index or follow these pages (noindex, nofollow).
 * 3. Form submissions are strictly simulated in local component memory; no network requests,
 *    APIs, emails, cookies, or storages are used.
 * 
 * Checklist before DRAFT_MODE can be safely switched to false in the future:
 * 1. Implement secure, encrypted backend API endpoints with authenticated access.
 * 2. Establish official recipient email routing and escalation procedures with legal/compliance teams.
 * 3. Complete an independent security and privacy impact assessment.
 * 4. Draft and publish formal privacy, whistleblower protection, and data retention policies.
 * 5. Set up dedicated grievance logging and audit mechanisms adhering to stakeholder engagement standards.
 */
export const DRAFT_MODE = true;

/* =========================================================================
   DRAFT UI TEXT FOR CLIENT APPROVAL
   All user interface copy not present in the original ESG markdown
   is organized here for client review and adjustment.
   ========================================================================= */
export const ESG_FORMS_DRAFT_UI = {
  // Shared Banner
  draftBannerText: "Draft for client review. This form does not send or save anything.",

  // Shared Navigation
  backLinkText: "Back to Accountability & Stakeholder Contact",
  backLinkHref: "/esg#contact",

  // Shared Form Card & Field UI
  requiredLabel: "Required",
  optionalLabel: "Optional",
  characterCountSuffix: "characters",
  selectPlaceholder: "Select an option",
  submitButtonText: "Submit",
  errorSummaryTitle: "Please correct the errors before submitting:",

  // Preview Confirmation Panel
  previewHeading: "Preview only",
  previewBody: "Nothing was sent or saved. This is a draft form for review.",
  editAgainButtonText: "Edit again",
  backToEsgButtonText: "Back to ESG & Sustainability",

  // Grievance Form Draft Field Labels & Options
  grievance: {
    relationshipLabel: "Your relationship to the activity",
    relationshipOptions: [
      { value: "beneficiary", label: "Beneficiary" },
      { value: "community-member", label: "Community member" },
      { value: "project-affected-person", label: "Project-affected person" },
      { value: "other-stakeholder", label: "Other stakeholder" },
    ],
    concernTypeLabel: "Type of concern",
    concernTypeOptions: [
      { value: "environmental", label: "Environmental" },
      { value: "social", label: "Social" },
      { value: "other-project-related", label: "Other project-related" },
    ],
    locationLabel: "Activity or location concerned",
    locationPlaceholder: "Enter the activity name, program or location",
    descriptionLabel: "Describe your concern",
    descriptionPlaceholder: "Provide details about what occurred, when it happened, and who is affected",
    nameLabel: "Your name",
    namePlaceholder: "Enter your full name",
    contactLabel: "Email or phone number",
    contactPlaceholder: "Enter your email address or phone number",

    // Validation error messages
    errors: {
      relationshipRequired: "Please select your relationship to the activity.",
      concernTypeRequired: "Please select the type of concern.",
      descriptionRequired: "Please describe your concern.",
      descriptionTooLong: "Description cannot exceed 3000 characters.",
      contactInvalid: "Please enter a valid email address or phone number.",
    },
  },

  // Whistleblowing Form Draft Field Labels & Options
  whistleblowing: {
    concernTypeLabel: "Type of concern",
    concernTypeOptions: [
      { value: "suspected-fraud", label: "Suspected fraud" },
      { value: "corruption", label: "Corruption" },
      { value: "unethical-conduct", label: "Unethical conduct" },
      { value: "conflict-of-interest", label: "Conflict of interest" },
      { value: "other-breach", label: "Other breach" },
    ],
    descriptionLabel: "What happened",
    descriptionPlaceholder: "Describe the suspected misconduct, including relevant dates and circumstances",
    whenWhereLabel: "When and where",
    whenWherePlaceholder: "Specify dates, times, locations or departments",
    partiesInvolvedLabel: "People or organisations involved",
    partiesInvolvedPlaceholder: "Names, titles, departments or external organisations involved",
    contactLabel: "Contact details",
    contactPlaceholder: "Enter your contact information if you wish to provide it",

    // Validation error messages
    errors: {
      concernTypeRequired: "Please select the type of concern.",
      descriptionRequired: "Please describe what happened.",
      descriptionTooLong: "Description cannot exceed 3000 characters.",
    },
  },

  // Contact NYEIB Form Draft Field Labels & Options
  contact: {
    nameLabel: "Your name",
    namePlaceholder: "Enter your full name",
    emailLabel: "Email address",
    emailPlaceholder: "Enter your email address",
    phoneLabel: "Phone number",
    phonePlaceholder: "Enter your phone number",
    organisationLabel: "Organisation or company",
    organisationPlaceholder: "Enter your organisation name",
    enquiryTypeLabel: "Topic of enquiry",
    enquiryTypeOptions: [
      { value: "sustainability-esg", label: "Sustainability & ESG" },
      { value: "reports-disclosures", label: "Reports & Disclosures" },
      { value: "policies-procedures", label: "Policies & Procedures" },
      { value: "partnerships", label: "Partnerships & Collaboration" },
      { value: "funding-eligibility", label: "Funding & Investment" },
      { value: "general-enquiry", label: "General Enquiry" },
    ],
    subjectLabel: "Subject",
    subjectPlaceholder: "Enter the subject of your enquiry",
    messageLabel: "Message",
    messagePlaceholder: "How can we help you? Provide details about your enquiry",
    errors: {
      nameRequired: "Please enter your name.",
      emailRequired: "Please enter your email address.",
      emailInvalid: "Please enter a valid email address.",
      enquiryTypeRequired: "Please select a topic of enquiry.",
      subjectRequired: "Please enter a subject.",
      messageRequired: "Please enter your message.",
      messageTooLong: "Message cannot exceed 3000 characters.",
    },
  },
} as const;

/* =========================================================================
   APPROVED EDITORIAL COPY (From esg.md)
   ========================================================================= */
export const ESG_FORMS_EDITORIAL = {
  grievance: {
    title: "Grievance Redress",
    boldLine: "Raise a concern about an NYEIB-supported activity.",
    paragraphs: [
      "Beneficiaries, community members, project-affected persons and other stakeholders can use the Grievance Redress Mechanism to raise environmental, social or other project-related concerns.",
      "The grievance process will explain how concerns can be submitted, acknowledged, reviewed, addressed and escalated where necessary.",
    ],
  },
  whistleblowing: {
    title: "Whistleblowing",
    boldLine: "Report suspected misconduct.",
    paragraphs: [
      "The whistleblowing channel is intended for reporting suspected fraud, corruption, unethical conduct, conflicts of interest or other breaches connected to NYEIB’s activities.",
      "Reports will be handled through the applicable procedures, including relevant confidentiality and escalation arrangements.",
    ],
  },
  contact: {
    title: "Contact NYEIB",
    boldLine: "Have a question? Get in touch.",
    paragraphs: [
      "For questions about NYEIB’s sustainability approach, reports, policies or general activities, please use our general enquiries channel.",
      "Our team will direct your enquiry to the appropriate department and respond to you promptly.",
    ],
  },
} as const;
