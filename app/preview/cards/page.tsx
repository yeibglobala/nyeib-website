import type { Metadata } from "next";
import { CardsPreviewClient } from "./CardsPreviewClient";

export const metadata: Metadata = {
  title: "Cards Preview — Nigeria YEIB Investment Funds",
  description: "Preview of the 4 Figma flip-card designs (Card Style 1, Card Style 2, and Flip reveal backs).",
};

export default function CardsPreviewPage() {
  return <CardsPreviewClient />;
}
