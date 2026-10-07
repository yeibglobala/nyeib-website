export interface CtaConfig {
  headline: string;
  subCopy: string;
  buttonText: string;
  buttonHref: string;
}

export const DEFAULT_CTA_CONFIG: CtaConfig = {
  headline: "Find your pathway with YEIB.",
  subCopy:
    "Whether you are growing a business, deploying capital or strengthening Nigeria's entrepreneurial ecosystem, there is a way to work with NYEIB.",
  buttonText: "Partner with YEIB",
  buttonHref: "/apply",
};

export const PAGE_CTA_CONFIGS: Record<string, CtaConfig> = {
  "/": {
    headline: "Find your pathway with YEIB.",
    subCopy:
      "Whether you are growing a business, deploying capital or strengthening Nigeria’s entrepreneurial ecosystem, there is a way to work with NYEIB.",
    buttonText: "Partner with YEIB",
    buttonHref: "/apply",
  },
  "/what-we-do": {
    headline: "Partner with NYEIB",
    subCopy:
      "Whether you are building a growth-oriented business, deploying capital or strengthening Nigeria’s entrepreneurial ecosystem, there is a pathway to work with NYEIB.",
    buttonText: "Partner with NYEIB",
    buttonHref: "/apply",
  },
  "/who-we-serve": {
    headline: "Different roles with one connected ecosystem.",
    subCopy:
      "Whether you are growing a business, deploying capital or expanding access to finance, explore the pathway suited to your role.",
    buttonText: "Explore Partnerships",
    buttonHref: "/apply",
  },
  "/impact": {
    headline: "Build growth. Create impact.",
    subCopy:
      "Whether you are growing a business or deploying capital, NYEIB offers a pathway to participate in measurable economic progress.",
    buttonText: "Invest & Partner with NYEIB",
    buttonHref: "/apply",
  },
  "/impact-and-measurement": {
    headline: "Build growth. Create impact.",
    subCopy:
      "Whether you are growing a business or deploying capital, NYEIB offers a pathway to participate in measurable economic progress.",
    buttonText: "Invest & Partner with NYEIB",
    buttonHref: "/apply",
  },
  "/partners": {
    headline: "Partner for long-term value.",
    subCopy:
      "If your institution is looking to invest in, co-invest alongside or support growth-oriented businesses in Nigeria, NYEIB offers a structured pathway to participate.",
    buttonText: "Partner with NYEIB",
    buttonHref: "/apply",
  },
  "/partners-and-investors": {
    headline: "Partner for long-term value.",
    subCopy:
      "If your institution is looking to invest in, co-invest alongside or support growth-oriented businesses in Nigeria, NYEIB offers a structured pathway to participate.",
    buttonText: "Partner with NYEIB",
    buttonHref: "/apply",
  },
  "/esg": {
    headline: "Grow responsibly. Build lasting value.",
    subCopy:
      "Whether you are growing a business or supporting enterprises across Nigeria, NYEIB offers a pathway to participate in more sustainable business growth.",
    buttonText: "Partner with NYEIB",
    buttonHref: "/apply",
  },
  "/esg-and-sustainability": {
    headline: "Grow responsibly. Build lasting value.",
    subCopy:
      "Whether you are growing a business or supporting enterprises across Nigeria, NYEIB offers a pathway to participate in more sustainable business growth.",
    buttonText: "Partner with NYEIB",
    buttonHref: "/apply",
  },
  "/apply": {
    headline: "Work with NYEIB.",
    subCopy:
      "Whether you are growing a business or looking to partner with NYEIB, choose the pathway that best matches your role.",
    buttonText: "Start Application",
    buttonHref: "/apply",
  },
  "/apply-for-funding": {
    headline: "Work with NYEIB.",
    subCopy:
      "Whether you are growing a business or looking to partner with NYEIB, choose the pathway that best matches your role.",
    buttonText: "Start Application",
    buttonHref: "/apply",
  },
};
