import React from "react";

export interface CompactHeaderProps {
  title: string;
  pill: string;
  pillColor?: "mint" | "orange";
}

export function CompactHeader({
  title,
  pill,
  pillColor = "mint",
}: CompactHeaderProps) {
  return (
    <header className="apply-hero">
      <div className="apply-w">
        <h1 id="h1">{title}</h1>
        <span
          className="apply-pill"
          id="pill"
          style={{
            borderColor:
              pillColor === "orange"
                ? "rgba(248, 132, 4, 0.6)"
                : "rgba(0, 190, 147, 0.6)",
            color: pillColor === "orange" ? "#F5C07D" : "#79DCC4",
          }}
        >
          {pill}
        </span>
      </div>
    </header>
  );
}
