export interface PartnerConfig {
  id: string;
  name: string;
  shortName: string;
  logoPath: string;
  description: string;
  descriptionLines: string[];
}

export const GOVERNANCE_CONFIG = {
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
    tag: "INSTITUTIONAL RELATIONSHIPS",
    headline: "Institutionally anchored for long-term impact.",
    paragraph:
      "NYEIB operates within an institutional framework involving the Nigeria Sovereign Investment Authority, Development Bank of Nigeria and African Development Bank.",
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
        "A multilateral development finance institution supporting economic development and social progress across Africa.",
      descriptionLines: [
        "A multilateral development finance",
        "institution supporting economic",
        "development and social progress",
        "across Africa.",
      ],
    },
  ] as PartnerConfig[],
};
