"use client";

import React from "react";
import { CurvedHeroLayout, CurvedHeroLayoutProps } from "./CurvedHeroLayout";

export type InnerHeroProps = CurvedHeroLayoutProps;

/**
 * InnerHero component
 *
 * Renders the full-bleed curved photo hero layout matching Figma Node 620:128 (mobile) & 646:364 (desktop).
 * Note: The previous editorial inner hero is reserved in `EditorialInnerHero.tsx` for future use.
 */
export function InnerHero(props: InnerHeroProps) {
  return <CurvedHeroLayout {...props} />;
}
