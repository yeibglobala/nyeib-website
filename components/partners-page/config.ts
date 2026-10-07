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
      description: "",
      chips: [],
      shape: "capital" as PillarShape,
    },
    {
      id: "02",
      number: "02",
      title: "Credit Guarantee Facility",
      description: "",
      chips: [],
      shape: "growth" as PillarShape,
    },
    {
      id: "03",
      number: "03",
      title: "Ecosystem Development Fund",
      description: "",
      chips: [],
      shape: "ecosystem" as PillarShape,
    },
  ],
};
