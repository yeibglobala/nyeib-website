export interface PurposeSectionConfig {
  label: string;
  heading: {
    part1Small: string;
    part1Big: string;
    part2Big: string;
  };
  paragraph: string;
  media: {
    videoWebm: string;
    videoMp4: string;
    poster: string;
    objectPosition: string;
  };
}

export const PURPOSE_CONFIG: PurposeSectionConfig = {
  label: "Purpose",
  heading: {
    part1Small: "Ambition was never",
    part1Big: "the problem;",
    part2Big: "access was.",
  },
  paragraph:
    "Across Nigeria, promising businesses are held back by financing gaps, limited business support and fragmented access to growth opportunities. NYEIB exists to help close those gaps.",
  media: {
    videoWebm: "/video/access.webm",
    videoMp4: "/video/access.mp4",
    poster: "/video/access-poster.jpg",
    objectPosition: "center 40%",
  },
};
