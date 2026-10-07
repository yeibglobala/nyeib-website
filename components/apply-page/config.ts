import { PillarShape } from "../pillars/config";

export const APPLY_PATHWAYS_CONFIG = {
  intro: {
    tag: "APPLICATION & PARTNERSHIP PATHWAYS",
    headline: {
      before: "Choose the pathway that ",
      highlight: "matches your role",
      after: ".",
    },
    paragraph:
      "Applying for business support takes about 5 minutes. There is no application fee, and NYEIB does not work through paid agents or intermediaries.",
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
      title: "Entrepreneurs & Growth Businesses",
      description:
        "For youth- and women-led businesses with a working product or service, paying customers and a clear plan to grow. Depending on your stage, you may be considered for investment, capacity-building support, or both.",
      chips: [
        "Working product / service",
        "Paying customers",
        "Growth plan",
        "5-minute application",
      ],
      shape: "growth" as PillarShape,
    },
    {
      id: "02",
      number: "02",
      title: "Banks, Lenders & Fund Managers",
      description:
        "For commercial banks, microfinance banks, licensed lenders and VC/PE fund managers interested in risk-sharing guarantee arrangements and co-investment opportunities.",
      chips: [
        "Risk-sharing guarantees",
        "Co-investment",
        "Fund-of-funds deployment",
        "Portfolio growth",
      ],
      shape: "capital" as PillarShape,
    },
    {
      id: "03",
      number: "03",
      title: "Ecosystem & Institutional Partners",
      description:
        "For business development providers, incubators, accelerators, research/policy institutions, foundations and development partners looking to collaborate.",
      chips: [
        "Incubators & accelerators",
        "Capacity building",
        "Policy & data research",
        "Development finance",
      ],
      shape: "ecosystem" as PillarShape,
    },
  ],
};
