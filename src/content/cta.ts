export interface CtaCardData {
  headline: string;
  text: string;
  buttonLabel: string;
  href: string;
}

export const CTA_CONTENT = {
  homepage: {
    headline: "Find your pathway with YEIB.",
    text: "Whether you are growing a business, deploying capital or strengthening Nigeria’s entrepreneurial ecosystem, there is a way to work with NYEIB.",
    buttonLabel: "Partner with YEIB",
    href: "/apply",
  },
  whatWeDo: {
    headline: "Partner with NYEIB",
    text: "Whether you are building a growth-oriented business, deploying capital or strengthening Nigeria’s entrepreneurial ecosystem, there is a pathway to work with NYEIB.",
    buttonLabel: "Partner with NYEIB",
    href: "/apply",
  },
  impact: {
    headline: "Build growth. Create impact.",
    text: "Whether you are growing a business or deploying capital, NYEIB offers a pathway to participate in measurable economic progress.",
    buttonLabel: "Invest & Partner with NYEIB",
    href: "/apply",
  },
  partners: {
    headline: "Partner for long-term value.",
    text: "If your institution is looking to invest in, co-invest alongside or support growth-oriented businesses in Nigeria, NYEIB offers a structured pathway to participate.",
    buttonLabel: "Partner with NYEIB",
    href: "/apply",
  },
  esg: {
    headline: "Building a more sustainable future takes collaboration.",
    text: "Explore how your organisation can work with NYEIB to advance responsible investment and sustainable business growth across Nigeria.",
    buttonLabel: "Partner With NYEIB",
    href: "/apply/partner",
  },
} as const satisfies Record<string, CtaCardData>;
