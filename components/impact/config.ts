export interface ImpactStat {
  id: string;
  numberDisplay: string;
  label: string;
  description: string;
  sideTag: string;
  screenReaderText?: string;
  targetValue: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  maxFillFraction?: number; // default 1.0 (100% of ticks)
}

export const IMPACT_CONFIG = {
  // Section Headings & Tags
  heading: "Designed to create measurable economic impact.",
  rightTag: "20-YEAR TARGET",

  // Color Tokens
  colors: {
    bg: "#e3ece7",
    textPrimary: "#12201b",
    textSecondary: "rgba(18, 32, 27, 0.60)",
    tickUnfilled: "rgba(18, 32, 27, 0.14)",
    tickFilled: "#2eb78c",
    tickLeading: "#4fd1b0",
    borderSubtle: "rgba(18, 32, 27, 0.12)",
  },

  // Sizing & Geometry
  ring: {
    tickCount: 120,
    radius: 170,
    tickLength: 14,
    leadingTickLength: 20,
    tickWidth: 2.0,
    leadingTickWidth: 2.5,
    viewBoxSize: 400,
  },

  // Timing & Scroll Behavior
  timing: {
    desktopScrollPerStatSvh: 90, // svh of scroll per stat
    mobileScrollPerStatSvh: 70, // svh of scroll per stat on screens < 900px
    endHoldSvh: 40, // svh hold at the end before unpinning
    fillFraction: 0.70, // 0 to 0.70: tick fill + count up
    holdFraction: 0.85, // 0.70 to 0.85: hold fully filled
    exitSlideDistancePx: 24, // translateY distance on exit
  },

  // 4 Target Impact Metrics
  stats: [
    {
      id: "businesses",
      numberDisplay: "~38,400",
      label: "businesses supported",
      description:
        "Expanding financial and non-financial support to growth-oriented youth- and women-led businesses across Nigeria.",
      sideTag: "BUSINESSES",
      screenReaderText: "approximately 38,400 businesses supported",
      targetValue: 38400,
      prefix: "~",
      suffix: "",
      decimals: 0,
      maxFillFraction: 1.0,
    },
    {
      id: "jobs",
      numberDisplay: "~1.6M",
      label: "direct and indirect jobs",
      description: "Targeted over the 20-year life of the Funds.",
      sideTag: "JOBS",
      screenReaderText: "approximately 1.6 million direct and indirect jobs",
      targetValue: 1.6,
      prefix: "~",
      suffix: "M",
      decimals: 1,
      maxFillFraction: 1.0,
    },
    {
      id: "ecosystem",
      numberDisplay: "118",
      label: "ecosystem support organisations mobilised",
      description:
        "Strengthening organisations that provide business-development and capacity-building support to MSMEs.",
      sideTag: "ECOSYSTEM",
      screenReaderText: "118 ecosystem support organisations mobilised",
      targetValue: 118,
      prefix: "",
      suffix: "",
      decimals: 0,
      maxFillFraction: 1.0,
    },
    {
      id: "gender",
      numberDisplay: "Year 5",
      label: "Gender parity by Year 5",
      description:
        "We aim to achieve gender parity as part of our commitment to stronger gender integration across the Funds.",
      sideTag: "GENDER PARITY",
      screenReaderText: "Gender parity by Year 5",
      targetValue: 5,
      prefix: "Year ",
      suffix: "",
      decimals: 0,
      maxFillFraction: 1.0,
    },
  ] as ImpactStat[],
};
