"use client";

import React from "react";
import { HeroCanvas } from "./HeroCanvas";

interface HeroClientWrapperProps {
  seed?: number;
}

export function HeroClientWrapper({ seed }: HeroClientWrapperProps) {
  return <HeroCanvas seed={seed} />;
}
