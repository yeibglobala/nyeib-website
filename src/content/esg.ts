export const ESG_BUTTON_ROUTES = {
  viewReports: "/esg/reports",
  explorePolicies: "/esg/policies",
  explorePartnerships: "/apply/partner",
  submitGrievance: "/esg/grievance",
  makeWhistleblowing: "/esg/whistleblowing",
  contactNyeib: "/contact",
  partnerWithNyeib: "/apply/partner",
} as const;

export interface EsgContent {
  hero: {
    headline: string;
    text: string;
  };
  inPageNav: Array<{
    id: string;
    label: string;
  }>;
  approach: {
    id: string;
    headline: string;
    text: string;
    leadIn: string;
    areas: Array<{
      id: string;
      name: string;
      number: string;
      tint: string;
      tintBg: string;
      tintBorder: string;
      panelTone: string;
      buttonBg: string;
      headline: string;
      paragraphs: string[];
      asideTitle: string;
      asideCopy: string;
      indicators?: string[];
      closingParagraph?: string;
    }>;
  };
  reports: {
    id: string;
    headline: string;
    text: string;
    buttonLabel: string;
    buttonHref: string;
    leadIn: string;
    items: Array<{
      title: string;
      description: string;
    }>;
    note: string;
  };
  policies: {
    id: string;
    headline: string;
    text: string;
    buttonLabel: string;
    buttonHref: string;
    leadIn: string;
    items: Array<{
      title: string;
      description: string;
      formHref?: string;
    }>;
    note: string;
  };
  partnerships: {
    id: string;
    headline: string;
    text: string;
    leadIn: string;
    items: Array<{
      title: string;
      description: string;
    }>;
    ctaCard: {
      buttonLabel: string;
      buttonHref: string;
    };
  };
  accountability: {
    id: string;
    headline: string;
    text: string;
    channels: Array<{
      id: string;
      tint: string;
      tintBg: string;
      tintBadge: string;
      title: string;
      boldLine: string;
      paragraphs: string[];
      buttonLabel: string;
      buttonHref: string;
    }>;
  };
  closing: {
    headline: string;
    text: string;
    buttonLabel: string;
    buttonHref: string;
  };
}

export const ESG_CONTENT: EsgContent = {
  hero: {
    headline: "Responsible investment. Sustainable growth. Lasting impact.",
    text: "At NYEIB, we integrate environmental, social, and governance (ESG) considerations into our investment activities to support responsible decision-making, strengthen business resilience, and create lasting economic opportunities for Nigerian youth and women.",
  },
  inPageNav: [
    { id: "approach", label: "Our Approach to Sustainability" },
    { id: "reports", label: "Reports & Disclosures" },
    { id: "policies", label: "Policies & Procedures" },
    { id: "partnerships", label: "Partnerships" },
    { id: "contact", label: "Accountability & Stakeholder Contact" },
  ],
  approach: {
    id: "approach",
    headline: "Building stronger businesses through responsible investment.",
    text: "Sustainable growth requires businesses that can manage risks, operate responsibly and create value for the communities they serve.",
    leadIn: "Our sustainability approach focuses on four key areas:",
    areas: [
      {
        id: "principles-commitments",
        name: "Principles & Commitments",
        number: "01",
        tint: "#e8f1eb",
        tintBg: "bg-[#e8f1eb]",
        tintBorder: "border-[#e7ddcc]",
        panelTone: "#e8f1eb",
        buttonBg: "#e8f1eb",
        headline: "Responsible growth, built on clear principles.",
        paragraphs: [
          "NYEIB aims to integrate environmental and social considerations into investment decisions and support businesses that create sustainable economic value.",
          "Our approach is designed to encourage responsible practices throughout the investment lifecycle, while recognising the needs of the people and communities affected.",
        ],
        asideTitle: "A lifecycle approach",
        asideCopy: "Consider risks and opportunities from assessment through ongoing monitoring.",
      },
      {
        id: "governance-accountability",
        name: "Governance & Accountability",
        number: "02",
        tint: "#fbd0a2",
        tintBg: "bg-[#f8ecdc]",
        tintBorder: "border-[#e7ddcc]",
        panelTone: "#fbd0a2",
        buttonBg: "#f8ecdc",
        headline: "Clear responsibilities. Stronger oversight.",
        paragraphs: [
          "NYEIB’s governance, risk, ESG and monitoring functions are designed to support the identification, assessment and management of environmental and social risks.",
          "We work with participating financial institutions and other relevant partners to encourage responsible practices throughout the investment lifecycle, from initial assessment to ongoing monitoring.",
        ],
        asideTitle: "Oversight that supports action",
        asideCopy: "Clear roles and consistent processes help keep responsible investment practices on track.",
      },
      {
        id: "stakeholder-engagement",
        name: "Stakeholder Engagement",
        number: "03",
        tint: "#f3e4a2",
        tintBg: "bg-[#f7f0df]",
        tintBorder: "border-[#e7ddcc]",
        panelTone: "#f3e4a2",
        buttonBg: "#f7f0df",
        headline: "Listening to the people our investments affect.",
        paragraphs: [
          "NYEIB recognises the importance of engaging entrepreneurs, beneficiaries, participating financial institutions, project-affected persons and communities to understand their needs and concerns throughout the investment lifecycle.",
          "We aim to provide accessible opportunities for stakeholders to share feedback, raise concerns and contribute to more responsible investment outcomes.",
        ],
        asideTitle: "Engagement throughout",
        asideCopy: "Feedback should be accessible, considered and used to inform responsible decisions.",
      },
      {
        id: "impact-performance",
        name: "Impact & Performance",
        number: "04",
        tint: "#a9ddd3",
        tintBg: "bg-[#e4efeb]",
        tintBorder: "border-[#e7ddcc]",
        panelTone: "#a9ddd3",
        buttonBg: "#e4efeb",
        headline: "Measuring progress beyond capital deployed.",
        paragraphs: [
          "As the Funds grow, NYEIB intends to monitor sustainability and development indicators that reflect the outcomes of its investment activities.",
          "These indicators may include businesses supported, jobs created and sustained, youth and women beneficiaries, environmental performance and social performance across the investment portfolio.",
        ],
        asideTitle: "Learning from outcomes",
        asideCopy: "Monitor indicators, identify opportunities for improvement and communicate development outcomes.",
      },
    ],
  },
  reports: {
    id: "reports",
    headline: "Making sustainability performance more transparent.",
    text: "As NYEIB’s activities progress, this section will provide access to publicly available sustainability reports, environmental and social disclosures, and relevant performance information.",
    buttonLabel: "View Reports & Disclosures",
    buttonHref: ESG_BUTTON_ROUTES.viewReports,
    leadIn: "Documents may include:",
    items: [
      {
        title: "Annual Environmental and Social Reports",
        description:
          "Annual information on environmental and social risks, management measures and activities across the Funds.",
      },
      {
        title: "Sustainability & Impact Reports",
        description:
          "Updates on development outcomes and progress against sustainability and impact indicators.",
      },
      {
        title: "Portfolio Environmental & Social Performance Reports",
        description:
          "Information on environmental and social performance across the investment portfolio, where available for public disclosure.",
      },
      {
        title: "Environmental & Social Assessments",
        description:
          "Relevant assessments, management plans and related documents required for public disclosure.",
      },
      {
        title: "Stakeholder Engagement Disclosures",
        description:
          "Publicly available information on stakeholder consultations, engagement activities and related outcomes.",
      },
    ],
    note: "Reports and disclosures will be added as they become available and are approved for publication.",
  },
  policies: {
    id: "policies",
    headline: "The frameworks behind responsible investment.",
    text: "NYEIB’s sustainability policies and procedures provide a framework for managing environmental and social risks, supporting responsible investment and protecting stakeholders.",
    buttonLabel: "Explore Policies & Procedures",
    buttonHref: ESG_BUTTON_ROUTES.explorePolicies,
    leadIn: "These may include:",
    items: [
      {
        title: "Environmental & Social Management System (ESMS)",
        description:
          "A framework for identifying, assessing, managing, and monitoring environmental and social risks associated with investment activities.",
        formHref: "/contact",
      },
      {
        title: "Stakeholder Engagement Framework",
        description:
          "Guidance on identifying, engaging and communicating with relevant stakeholders throughout the investment lifecycle.",
        formHref: "/contact",
      },
      {
        title: "Grievance Redress Mechanism",
        description:
          "A process that enables beneficiaries, project-affected persons, communities and other stakeholders to raise concerns relating to NYEIB-supported activities.",
        formHref: "/esg/grievance",
      },
      {
        title: "Vulnerable Persons & Safeguards Frameworks",
        description:
          "Applicable measures intended to identify and address risks affecting vulnerable individuals and communities.",
        formHref: "/esg/grievance",
      },
      {
        title: "Other ESG Policies & Procedures",
        description:
          "Additional policies and guidance covering environmental and social protection, governance and accountability.",
        formHref: "/esg/whistleblowing",
      },
    ],
    note: "Approved documents will be made available where appropriate for public disclosure. Where full publication is restricted, a summary of the relevant framework may be provided.",
  },
  partnerships: {
    id: "partnerships",
    headline: "Working together for sustainable growth.",
    text: "NYEIB collaborates with financial institutions, government bodies, development partners and technical experts to strengthen responsible investment practices, support business resilience and advance sustainable economic growth.",
    leadIn: "Our areas of collaboration include:",
    items: [
      {
        title: "Development Finance Institutions",
        description:
          "Supporting responsible investment approaches, institutional capacity and long-term development objectives.",
      },
      {
        title: "Government & Public Institutions",
        description:
          "Supporting alignment with national development priorities, governance requirements and sustainable economic growth.",
      },
      {
        title: "Participating Financial Institutions",
        description:
          "Encouraging responsible financing and the management of environmental and social risks associated with eligible investments.",
      },
      {
        title: "Development Partners & Technical Assistance Providers",
        description:
          "Supporting knowledge-sharing, capacity development and practical approaches to sustainability and impact measurement.",
      },
      {
        title: "Ecosystem Support Organisations",
        description:
          "Helping businesses improve their operations, adopt responsible practices and strengthen investment readiness.",
      },
    ],
    ctaCard: {
      buttonLabel: "Explore Partnership Opportunities",
      buttonHref: ESG_BUTTON_ROUTES.explorePartnerships,
    },
  },
  accountability: {
    id: "contact",
    headline: "Your voice matters. So does accountability.",
    text: "NYEIB provides separate channels for grievances, whistleblowing reports and general enquiries to help stakeholders direct their concerns to the appropriate team.",
    channels: [
      {
        id: "grievance",
        tint: "#F8CFA3",
        tintBg: "bg-[#F8CFA3]",
        tintBadge: "bg-[#F8CFA3]/30 text-[#0F2A20]",
        title: "Grievance Redress",
        boldLine: "Raise a concern about an NYEIB-supported activity.",
        paragraphs: [
          "Beneficiaries, community members, project-affected persons and other stakeholders can use the Grievance Redress Mechanism to raise environmental, social or other project-related concerns.",
          "The grievance process will explain how concerns can be submitted, acknowledged, reviewed, addressed and escalated where necessary.",
        ],
        buttonLabel: "Submit a Grievance",
        buttonHref: ESG_BUTTON_ROUTES.submitGrievance,
      },
      {
        id: "whistleblowing",
        tint: "#F3E3A6",
        tintBg: "bg-[#F3E3A6]",
        tintBadge: "bg-[#F3E3A6]/35 text-[#0F2A20]",
        title: "Whistleblowing",
        boldLine: "Report suspected misconduct.",
        paragraphs: [
          "The whistleblowing channel is intended for reporting suspected fraud, corruption, unethical conduct, conflicts of interest or other breaches connected to NYEIB’s activities.",
          "Reports will be handled through the applicable procedures, including relevant confidentiality and escalation arrangements.",
        ],
        buttonLabel: "Make a Whistleblowing Report",
        buttonHref: ESG_BUTTON_ROUTES.makeWhistleblowing,
      },
      {
        id: "enquiries",
        tint: "#BFEBDC",
        tintBg: "bg-[#BFEBDC]",
        tintBadge: "bg-[#BFEBDC]/35 text-[#0F2A20]",
        title: "General Enquiries",
        boldLine: "Have a question? Get in touch.",
        paragraphs: [
          "For questions about NYEIB’s sustainability approach, reports, policies or general activities, please use our general enquiries channel.",
        ],
        buttonLabel: "Contact NYEIB",
        buttonHref: ESG_BUTTON_ROUTES.contactNyeib,
      },
    ],
  },
  closing: {
    headline: "Building a more sustainable future takes collaboration.",
    text: "Explore how your organisation can work with NYEIB to advance responsible investment and sustainable business growth across Nigeria.",
    buttonLabel: "Partner With NYEIB",
    buttonHref: ESG_BUTTON_ROUTES.partnerWithNyeib,
  },
};
