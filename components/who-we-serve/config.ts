import { PillarShape } from "../pillars/config";

export const WHO_WE_SERVE_PILLARS_CONFIG = {
  shapeMode: "classic" as "funds" | "classic",
  intro: {
    tag: "WHO WE SERVE",
    headline: {
      before: "One ecosystem with ",
      highlight: "different pathways",
      after: " to participate.",
    },
    paragraph:
      "NYEIB works across the investment ecosystem, helping businesses, financial institutions and investment partners engage through pathways suited to their role.",
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
      title: "For Youth- and Women-Led Businesses",
      description:
        "We support growth-oriented businesses with access to capital, capacity-building support and wider ecosystem opportunities that can help them strengthen and scale.",
      chips: [
        "Access to capital",
        "Capacity-building support",
        "Ecosystem opportunities",
        "Investment-readiness",
      ],
      shape: "growth" as PillarShape,
    },
    {
      id: "02",
      number: "02",
      title: "For Banks & Financial Institutions",
      description:
        "We work with commercial banks, microfinance institutions and other financial partners through risk-sharing mechanisms designed to expand lending to eligible youth- and women-led businesses.",
      chips: [
        "Risk-sharing mechanisms",
        "Expanded lending capacity",
        "Portfolio de-risking",
        "Commercial integration",
      ],
      shape: "capital" as PillarShape,
    },
    {
      id: "03",
      number: "03",
      title: "For Institutional Investors & Partners",
      description:
        "We provide institutional investors, development finance institutions, foundations and other partners with opportunities to invest in, co-invest alongside or otherwise support Nigeria NYEIB Investment Funds.",
      chips: [
        "Co-investment vehicles",
        "Institutional governance",
        "Targeted economic returns",
        "Development alignment",
      ],
      shape: "ecosystem" as PillarShape,
    },
  ],
};
