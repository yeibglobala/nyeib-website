import { PillarShape } from "../pillars/config";

export const PARTNERS_WAYS_CONFIG = {
  intro: {
    tag: "",
    headline: {
      before: "Choose the pathway that ",
      highlight: "fits your mandate",
      after: ".",
    },
    paragraph:
      "Partners may explore opportunities across the Equity Investment Fund, Credit Guarantee Facility and Ecosystem Development Fund, as well as co-investment, technical-assistance funding and other forms of support aligned with their mandate.",
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
        "Provides equity and quasi-equity financing to growth-oriented businesses, directly or through fund managers, helping them access the patient capital needed to expand operations and scale sustainably.",
      chips: [],
      shape: "capital" as PillarShape,
    },
    {
      id: "02",
      number: "02",
      title: "Credit Guarantee Facility",
      description:
        "Provides risk-sharing guarantees to participating financial institutions, helping reduce lending risks and encourage greater access to finance for eligible youth- and women-led businesses.",
      chips: [],
      shape: "growth" as PillarShape,
    },
    {
      id: "03",
      number: "03",
      title: "Ecosystem Development Fund",
      description:
        "Supports business development services, capacity-building and ecosystem initiatives that help entrepreneurs strengthen their operations, improve investment readiness and unlock growth opportunities.",
      chips: [],
      shape: "ecosystem" as PillarShape,
    },
  ],
};
