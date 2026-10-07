export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterConfig {
  brandLine: string;
  columns: FooterColumn[];
  copyright: string;
  legalLinks: FooterLink[];
}

export const FOOTER_CONFIG: FooterConfig = {
  brandLine: "The institutional ally at the meeting point of ambition and capital.",
  columns: [
    {
      title: "EXPLORE",
      links: [
        { label: "What We Do", href: "/what-we-do" },
        { label: "Who We Serve", href: "/who-we-serve" },
        { label: "Impact & Measurement", href: "/impact" },
      ],
    },
    {
      title: "ORGANISATION",
      links: [
        { label: "Partners & Investors", href: "/partners" },
        { label: "ESG & Sustainability", href: "/esg" },
        { label: "Apply for Funding", href: "/apply" },
      ],
    },
  ],
  copyright: "© 2026 Nigeria YEIB Investment Funds. All rights reserved.",
  legalLinks: [
    { label: "Privacy Policy", href: "#privacy" },
    { label: "Terms of Service", href: "#terms" },
  ],
};
