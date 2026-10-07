import { PillarShape } from "../pillars/config";

export const HOMEPAGE_PILLARS_CONFIG = {
  shapeMode: "funds" as "funds" | "classic",
  intro: {
    tag: "A BLENDED PLATFORM FOR CAPITAL AND GROWTH",
    headline: {
      before: "Sector agnostic; ",
      highlight: "growth focused",
      after: ".",
    },
    paragraph:
      "NYEIB supports youth- and women-led businesses across sectors, with a focus on enterprises that can grow, create jobs and build sustainable economic value.",
  },
  timing: {
    hoverIntentDelayMs: 80,
    morphDurationMs: 900,
    openDurationMs: 550,
    closeDurationMs: 350,
    autoPlayIntervalMs: 5000,
  },
  particles: {
    desktopCount: 7200,
    mobileCount: 3600,
    colors: ["#003124", "#0b523b", "#15835e"],
    alphaRange: [0.85, 1.0],
    driftSpeed: 0.9,
    shapeScale: 0.94,
  },
  pillars: [
    {
      id: "01",
      number: "01",
      title: "Equity Investment Fund",
      description:
        "Direct equity and fund-of-funds investment into high-potential, growth-oriented businesses capable of scaling and generating long-term economic value.",
      chips: [
        "Growth equity",
        "Quasi-equity",
        "Direct co-investment",
        "Fund-of-funds",
      ],
      shape: "capital" as PillarShape,
    },
    {
      id: "02",
      number: "02",
      title: "Credit Guarantee Fund",
      description:
        "Risk-sharing guarantees structured to de-risk commercial lending and expand private debt financing to eligible youth- and women-led businesses.",
      chips: [
        "Risk-sharing guarantees",
        "Commercial bank integration",
        "Lending expansion",
        "Loss protection",
      ],
      shape: "growth" as PillarShape,
    },
    {
      id: "03",
      number: "03",
      title: "Ecosystem Development Fund",
      description:
        "Technical assistance, capacity-building support and business development services to strengthen enterprises and make them investment-ready.",
      chips: [
        "Technical assistance",
        "Capacity building",
        "Incubators & accelerators",
        "Pipeline development",
      ],
      shape: "ecosystem" as PillarShape,
    },
  ],
};

export const HOMEPAGE_GOVERNANCE_CONFIG = {
  timing: {
    revealDurationMs: 600,
    leaveDurationMs: 400,
    staggerDelayMs: 45,
    textStartDelayMs: 150,
    softenOpacity: 0.65,
    cardAspectRatio: "4 / 5",
  },
  topArea: {
    tag: "INSTITUTIONAL CREDIBILITY",
    headline: "Institutionally anchored for long-term impact.",
    paragraph:
      "NYEIB operates within an institutional framework involving leading sovereign, development, financial and public-sector stakeholders.",
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
  ],
};
