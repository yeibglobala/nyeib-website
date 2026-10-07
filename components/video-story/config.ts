/**
 * Video Story Section Configuration
 */

export const VIDEO_STORY_CONFIG = {
  // Layout
  layout: {
    panelWidthDesktopPercent: 40, // Left frosted glass panel width (40%)
    panelPaddingDesktop: "4vw",
    panelPaddingMobile: "6vw",
  },

  // Blur & Glass Overlay
  glass: {
    backdropBlurPx: 36,
    backdropSaturate: 1.25,
    overlayBg: "rgba(10, 24, 20, 0.52)",
    borderRight: "1px solid rgba(238, 246, 242, 0.15)",
  },

  // Exact Brand Copy
  content: {
    displayWord: "PATHWAYS",
    headline: "Unlocking pathways for investable businesses",
    body: "NYEIB connect growth-oriented businesses with the capital, strategic partnerships and practical support they need to become more credible, resilient and investment-ready.",
    ctaText: "Apply for funding",
    ctaHref: "#apply",
    caption: "NYEIB connect growth-oriented businesses with the capital, strategic partnerships and practical support they need to become more credible, resilient and investment-ready.",
  },

  // Media
  media: {
    videoWebm: "/video/hero-video.webm",
    videoMp4: "/video/hero-video.mp4",
    poster: "/video/poster.jpg",
  },
};
