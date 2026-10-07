export type PillarShape = "capital" | "growth" | "ecosystem" | "governance";

export interface PillarItem {
  id: string;
  number: string;
  title: string;
  description: string;
  chips: string[];
  shape: PillarShape;
}

export const PILLARS_CONFIG = {
  shapeMode: "classic" as "funds" | "classic",
  intro: {
    tag: "What makes NYEIB different?",
    headline: {
      before: "Built to expand ",
      highlight: "access",
      after: " for sustainable growth.",
    },
    paragraph:
      "NYEIB combines financial and non-financial support within one platform designed to strengthen businesses and build confidence among the institutions that back them.",
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
      title: "Blended Capital",
      description:
        "We bring together equity and quasi-equity investment, risk-sharing guarantees, grants and reimbursable grants to address different financing needs.",
      chips: [
        "Equity and quasi-equity",
        "Risk-sharing guarantees",
        "Grants",
        "Reimbursable grants",
      ],
      shape: "capital" as PillarShape,
    },
    {
      id: "02",
      number: "02",
      title: "Focused on Growth-Oriented Businesses",
      description:
        "We support promising businesses across sectors with the potential to scale, create jobs and generate sustainable economic value.",
      chips: [],
      shape: "growth" as PillarShape,
    },
    {
      id: "03",
      number: "03",
      title: "Strengthening the Ecosystem",
      description:
        "We work with ecosystem organisations and business-development providers to strengthen the capabilities and support businesses need to grow and become investment-ready.",
      chips: [],
      shape: "ecosystem" as PillarShape,
    },
    {
      id: "04",
      number: "04",
      title: "Governance designed to build confidence.",
      description:
        "Nigeria NYEIB Investment Funds combines professional management, independent oversight and clearly defined investment structures to support credible and accountable capital deployment.",
      chips: [
        "Professional management",
        "Independent oversight",
        "Clear investment structures",
      ],
      shape: "governance" as PillarShape,
    },
  ] as PillarItem[],
};
