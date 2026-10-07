export const IMPACT_MEASUREMENT_FRAMEWORK_CONFIG = {
  timing: {
    revealDurationMs: 600,
    leaveDurationMs: 400,
    staggerDelayMs: 45,
    textStartDelayMs: 150,
    softenOpacity: 0.65,
    cardAspectRatio: "4 / 5",
  },
  topArea: {
    tag: "ACCOUNTABILITY",
    headline: "Tracking progress as we grow.",
    paragraph:
      "As capital is deployed, we will monitor performance against our impact framework and use what we learn to strengthen implementation over time.",
  },
  partners: [
    {
      id: "impact",
      name: "Impact",
      shortName: "IMPACT",
      logoPath: "/brand/logo-white.png",
      question: "Are businesses and communities better off because of our intervention?",
      description:
        "We track outcomes such as jobs, business growth, productivity and wider economic benefits.",
    },
    {
      id: "additionality",
      name: "Additionality",
      shortName: "ADDITIONALITY",
      logoPath: "/brand/logo-white.png",
      question: "Are we unlocking capital that would not otherwise be available?",
      description:
        "We assess whether NYEIB brings new capital into the market, expands access to finance and encourages more institutions to back youth- and women-led businesses.",
    },
    {
      id: "risk",
      name: "Risk",
      shortName: "RISK",
      logoPath: "/brand/logo-white.png",
      question: "Are we creating impact while protecting capital responsibly?",
      description:
        "We monitor financial, portfolio, liquidity, macroeconomic, reputational and ESG risks across the Funds.",
    },
  ],
};
