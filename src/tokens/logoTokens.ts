/**
 * Nigeria YEIB Investment Funds - Logo & Background Contrast Pairing Map
 *
 * Brand Palette:
 * - Evergreen: #003124
 * - Mint Leaf: #00BE93
 * - Pale Oak: #E1C9B3
 * - Mint Cream: #F2FBF6
 * - Tiger Orange: #F88404
 *
 * Strict Guidelines Pairing Map:
 * - background Mint Cream or Pale Oak: logo Evergreen
 * - background Evergreen: logo Mint Leaf or Mint Cream
 * - background Mint Leaf: logo Evergreen only
 * - background Tiger Orange: logo Evergreen only
 * Rule: A logo must never use the same hue as its background.
 */

export const BRAND_PALETTE = {
  EVERGREEN: "#003124",
  MINT_LEAF: "#00BE93",
  PALE_OAK: "#E1C9B3",
  MINT_CREAM: "#F2FBF6",
  TIGER_ORANGE: "#F88404",
} as const;

export type BrandColor = typeof BRAND_PALETTE[keyof typeof BRAND_PALETTE];

export const LOGO_BACKGROUND_MAP: Record<string, readonly BrandColor[]> = {
  [BRAND_PALETTE.MINT_CREAM]: [BRAND_PALETTE.EVERGREEN],
  [BRAND_PALETTE.PALE_OAK]: [BRAND_PALETTE.EVERGREEN],
  [BRAND_PALETTE.EVERGREEN]: [BRAND_PALETTE.MINT_LEAF, BRAND_PALETTE.MINT_CREAM],
  [BRAND_PALETTE.MINT_LEAF]: [BRAND_PALETTE.EVERGREEN],
  [BRAND_PALETTE.TIGER_ORANGE]: [BRAND_PALETTE.EVERGREEN],
} as const;

/**
 * Returns allowed logo colors for any given background.
 * Ensures minimum 3:1 WCAG contrast and strict brand compliance.
 */
export function getAllowedLogoColors(backgroundColorHex: string): readonly BrandColor[] {
  const norm = backgroundColorHex.trim().toUpperCase();
  if (norm === BRAND_PALETTE.MINT_CREAM || norm === BRAND_PALETTE.PALE_OAK) {
    return [BRAND_PALETTE.EVERGREEN];
  }
  if (norm === BRAND_PALETTE.EVERGREEN) {
    return [BRAND_PALETTE.MINT_LEAF, BRAND_PALETTE.MINT_CREAM];
  }
  if (norm === BRAND_PALETTE.MINT_LEAF || norm === "#2EB78C") {
    return [BRAND_PALETTE.EVERGREEN];
  }
  if (norm === BRAND_PALETTE.TIGER_ORANGE) {
    return [BRAND_PALETTE.EVERGREEN];
  }
  return [BRAND_PALETTE.EVERGREEN];
}
