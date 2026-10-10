export interface InnerHeroData {
  slug: string;
  imageSrc: string;
  headline: string;
  subtext: string;
  overlayStrength?: number; // Optional multiplier to adjust gradient density if needed
}

export const INNER_HERO_DATA: Record<string, InnerHeroData> = {
  "what-we-do": {
    slug: "what-we-do",
    imageSrc: "/images/nyeib-what-we-do.jpg",
    headline: "We exist to unlock pathways for investable businesses.",
    subtext:
      "NYEIB connects growth-oriented businesses with the capital, strategic partnerships and practical support they need to become more credible, resilient and investment-ready.",
    overlayStrength: 1.0,
  },
  "who-we-serve": {
    slug: "who-we-serve",
    imageSrc: "/images/nyeib-who-we-serve.jpg",
    headline: "One ecosystem with different pathways to participate.",
    subtext:
      "NYEIB works across the investment ecosystem, helping businesses, financial institutions and investment partners engage through pathways suited to their role.",
    overlayStrength: 1.0,
  },
  "impact": {
    slug: "impact",
    imageSrc: "/images/nyeib-Impact-and-measurement.jpg",
    headline:
      "Building measurable impact through stronger businesses and smarter capital.",
    subtext:
      "NYEIB is designed to expand access to finance and strengthen the conditions for youth- and women-led businesses to grow.",
    overlayStrength: 1.0,
  },
  "impact-and-measurement": {
    slug: "impact-and-measurement",
    imageSrc: "/images/nyeib-Impact-and-measurement.jpg",
    headline:
      "Building measurable impact through stronger businesses and smarter capital.",
    subtext:
      "NYEIB is designed to expand access to finance and strengthen the conditions for youth- and women-led businesses to grow.",
    overlayStrength: 1.0,
  },
  "partners": {
    slug: "partners",
    imageSrc: "/images/nyeib-partner-and-investor.jpg",
    headline: "Access investable businesses. Build long-term economic value.",
    subtext:
      "NYEIB gives institutional investors and development partners a structured pathway to growth-oriented youth- and women-led businesses through a professionally managed platform designed to support credible capital deployment.",
    overlayStrength: 1.0,
  },
  "partners-and-investors": {
    slug: "partners-and-investors",
    imageSrc: "/images/nyeib-partner-and-investor.jpg",
    headline: "Access investable businesses. Build long-term economic value.",
    subtext:
      "NYEIB gives institutional investors and development partners a structured pathway to growth-oriented youth- and women-led businesses through a professionally managed platform designed to support credible capital deployment.",
    overlayStrength: 1.0,
  },
  "esg": {
    slug: "esg",
    imageSrc: "/images/nyeib-investors.jpg",
    headline: "Responsible investment. Sustainable growth. Lasting impact.",
    subtext:
      "At NYEIB, we integrate environmental, social, and governance (ESG) considerations into our investment activities to support responsible decision-making, strengthen business resilience, and create lasting economic opportunities for Nigerian youth and women.",
    overlayStrength: 1.0,
  },
  "esg-and-sustainability": {
    slug: "esg-and-sustainability",
    imageSrc: "/images/nyeib-investors.jpg",
    headline: "Responsible investment. Sustainable growth. Lasting impact.",
    subtext:
      "At NYEIB, we integrate environmental, social, and governance (ESG) considerations into our investment activities to support responsible decision-making, strengthen business resilience, and create lasting economic opportunities for Nigerian youth and women.",
    overlayStrength: 1.0,
  },
  "apply": {
    slug: "apply",
    imageSrc: "/images/nyeib-apply-for-funding.jpg",
    headline: "Work With NYEIB",
    subtext:
      "Whether you are growing a business or looking to partner with NYEIB, choose the pathway that best matches your role.",
    overlayStrength: 1.0,
  },
  "apply-for-funding": {
    slug: "apply-for-funding",
    imageSrc: "/images/nyeib-apply-for-funding.jpg",
    headline: "Work With NYEIB",
    subtext:
      "Whether you are growing a business or looking to partner with NYEIB, choose the pathway that best matches your role.",
    overlayStrength: 1.0,
  },
};
