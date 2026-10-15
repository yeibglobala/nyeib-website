import { FederalGovernmentCardData } from "./FederalGovernmentCard";

export interface PartnerConfig {
  id: string;
  name: string;
  shortName: string;
  logoPath: string;
  description: string;
  descriptionLines: string[];
}

export interface GovernanceConfig {
  timing?: {
    revealDurationMs: number;
    leaveDurationMs: number;
    staggerDelayMs: number;
    textStartDelayMs: number;
    softenOpacity: number;
    cardAspectRatio: string;
  };
  topArea: {
    tag: string;
    headline: string;
    paragraph: string;
  };
  federalGovernment?: FederalGovernmentCardData;
  partners: PartnerConfig[];
}

export const GOVERNANCE_CONFIG: GovernanceConfig = {
  // Tweakable Settings
  timing: {
    revealDurationMs: 600,
    leaveDurationMs: 400,
    staggerDelayMs: 45,
    textStartDelayMs: 150,
    softenOpacity: 0.65,
    cardAspectRatio: "4 / 5",
  },
  topArea: {
    tag: "Institutional Credibility",
    headline: "Institutionally anchored for long-term impact.",
    paragraph:
      "NYEIB operates within an institutional framework involving leading sovereign, development, financial and public-sector stakeholders.",
  },
  federalGovernment: {
    id: "fgn-mofi",
    name: "Federal Government of Nigeria (Federal Ministry of Finance / MOFI)",
    shortName: "FGN / MOFI",
    tag: "SOVEREIGN SPONSORSHIP & POLICY MANDATE",
    coatOfArmPath: "/partner-logo/coat-of-arm-logo.png",
    mofiLogoPath: "/partner-logo/mofi-logo.png",
    title: "Federal Government of Nigeria",
    subtitle: "Federal Ministry of Finance / Ministry of Finance Incorporated (MOFI)",
    description:
      "Providing sovereign sponsorship, policy direction and anchor oversight in partnership with the Federal Ministry of Finance and Ministry of Finance Incorporated (MOFI) to establish and steer the NYEIB initiative.",
  },
  partners: [
    {
      id: "nsia",
      name: "Nigeria Sovereign Investment Authority",
      shortName: "NSIA",
      logoPath: "/partner-logo/nsia-logo.png",
      description:
        "Nigeria's sovereign investment authority, set up to build savings and invest for the benefit of future generations.",
      descriptionLines: [
        "Nigeria's sovereign investment",
        "authority, set up to build savings",
        "and invest for the benefit of",
        "future generations.",
      ],
    },
    {
      id: "dbn",
      name: "Development Bank of Nigeria",
      shortName: "DBN",
      logoPath: "/partner-logo/dbn-logo.png",
      description:
        "A development finance institution focused on improving access to finance for micro, small and medium-sized businesses in Nigeria.",
      descriptionLines: [
        "A development finance institution",
        "focused on improving access to finance",
        "for micro, small and medium-sized",
        "businesses in Nigeria.",
      ],
    },
    {
      id: "afdb",
      name: "African Development Bank",
      shortName: "AfDB",
      logoPath: "/partner-logo/afdb-logo.png",
      description:
        "A multilateral development finance institution providing sovereign financing support channeled through the Federal Government of Nigeria via the Federal Ministry of Finance / MOFI.",
      descriptionLines: [
        "A multilateral development finance",
        "institution providing sovereign support",
        "through the Federal Ministry of",
        "Finance / MOFI.",
      ],
    },
  ] as PartnerConfig[],
};

export const WHAT_WE_DO_GOVERNANCE_CONFIG: GovernanceConfig = {
  ...GOVERNANCE_CONFIG,
  topArea: {
    tag: "Institutional Relationships",
    headline: "Institutionally anchored for long-term impact.",
    paragraph:
      "NYEIB operates within an institutional framework involving the Nigeria Sovereign Investment Authority, Development Bank of Nigeria and African Development Bank.",
  },
};
