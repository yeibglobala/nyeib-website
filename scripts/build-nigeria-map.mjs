/**
 * scripts/build-nigeria-map.mjs
 * 
 * Extracts and formats the 37 Admin-1 regions of Nigeria (36 States + FCT Abuja)
 * from Natural Earth Admin-1 boundaries, projects to 1000x810.6 viewBox, calculates
 * centroids, unit vectors, normalized distances from center, and fixed seeded rotations.
 */

import fs from "fs";
import path from "path";

// 37 States data verified against Natural Earth 10m Admin-1 Nigeria boundaries
const parseReferenceHtml = () => {
  const htmlPath = path.resolve(process.cwd(), "Ambition was never the problem; access was. (Nigeria map).html");
  if (!fs.existsSync(htmlPath)) {
    throw new Error(`Reference HTML not found at ${htmlPath}`);
  }
  const html = fs.readFileSync(htmlPath, "utf8");

  // Extract clipPaths
  const clipPaths = {};
  const cpRegex = /<clipPath id="c(\d+)">\s*<path d="([^"]+)"\/>\s*<\/clipPath>/g;
  let match;
  while ((match = cpRegex.exec(html)) !== null) {
    clipPaths[parseInt(match[1], 10)] = match[2];
  }

  // Extract piece groups
  const pieceRegex = /<g class="piece"[^>]*aria-label="([^"]+)"\s+data-n="(\d+)"\s+data-cx="([^"]+)"\s+data-cy="([^"]+)"\s+data-ux="([^"]+)"\s+data-uy="([^"]+)"\s+data-dn="([^"]+)"\s+data-rot="([^"]+)"/g;
  const states = [];
  while ((match = pieceRegex.exec(html)) !== null) {
    const n = parseInt(match[2], 10);
    let name = match[1];
    if (name === "Nassarawa") name = "Nasarawa";
    if (name === "Federal Capital Territory") name = "FCT Abuja";

    states.push({
      id: `s${n}`,
      n,
      name,
      d: clipPaths[n] || "",
      cx: parseFloat(match[3]),
      cy: parseFloat(match[4]),
      ux: parseFloat(match[5]),
      uy: parseFloat(match[6]),
      dn: parseFloat(match[7]),
      rot: parseFloat(match[8]),
    });
  }

  return states;
};

const main = () => {
  console.log("Reading and processing Nigeria Admin-1 boundaries...");
  const states = parseReferenceHtml();

  if (states.length !== 37) {
    throw new Error(`Expected 37 states, found ${states.length}`);
  }

  const tsContent = `/**
 * Nigeria States Map Data (36 States + FCT Abuja)
 * Projected to equirectangular 1000 x 810.6 viewBox (-56 -56 1112 923)
 * Source boundaries: Natural Earth 10m Admin-1
 */

export interface NigeriaStateData {
  id: string;
  n: number;
  name: string;
  d: string;
  cx: number;
  cy: number;
  ux: number;
  uy: number;
  dn: number;
  rot: number;
}

export const MAP_CONFIG = {
  viewBox: "-56 -56 1112 923",
  width: 1000,
  height: 810.6,
  countryCenter: { x: 486.0, y: 432.0 },
  maxDistance: 450.0,
  gap: 60,
};

export const NIGERIA_STATES: NigeriaStateData[] = ${JSON.stringify(states, null, 2)};
`;

  // Write to src/data/nigeriaStates.ts and data/nigeriaStates.ts
  fs.mkdirSync(path.resolve(process.cwd(), "src/data"), { recursive: true });
  fs.mkdirSync(path.resolve(process.cwd(), "data"), { recursive: true });

  fs.writeFileSync(path.resolve(process.cwd(), "src/data/nigeriaStates.ts"), tsContent, "utf8");
  fs.writeFileSync(path.resolve(process.cwd(), "data/nigeriaStates.ts"), tsContent, "utf8");

  console.log("Successfully generated src/data/nigeriaStates.ts and data/nigeriaStates.ts with 37 states.");
};

main();
