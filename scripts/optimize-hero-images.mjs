import sharp from "sharp";
import fs from "fs";
import path from "path";

const HEROES = [
  {
    slug: "what-we-do",
    src: "public/images/african-american-man-woman-home-office-analyzes-online-business-trends.jpg",
  },
  {
    slug: "who-we-serve",
    src: "public/images/nyeib-who-we-serve.jpg",
  },
  {
    slug: "impact",
    src: "public/images/nyeib-Impact-and-measurement.jpg",
  },
  {
    slug: "partners",
    src: "public/images/nyeib-partner-and-investor.jpg",
  },
  {
    slug: "esg",
    src: "public/images/nyeib-investors.jpg",
  },
  {
    slug: "apply",
    src: "public/images/nyeib-apply-for-funding.jpg",
  },
];

async function optimize() {
  console.log("Optimizing hero images with sharp...\n");

  for (const hero of HEROES) {
    const inputPath = path.resolve(hero.src);
    if (!fs.existsSync(inputPath)) {
      console.warn(`File not found: ${inputPath}`);
      continue;
    }

    const originalStats = fs.statSync(inputPath);
    const originalSizeMB = (originalStats.size / (1024 * 1024)).toFixed(2);

    const outDeskWebp = `public/images/heroes/${hero.slug}-desktop.webp`;
    const outMobWebp = `public/images/heroes/${hero.slug}-mobile.webp`;
    const outDeskJpg = `public/images/heroes/${hero.slug}-desktop.jpg`;
    const outMobJpg = `public/images/heroes/${hero.slug}-mobile.jpg`;

    // 1. Desktop WebP (1920px wide, quality 84)
    await sharp(inputPath)
      .resize(1920, null, { withoutEnlargement: true })
      .webp({ quality: 84, effort: 4 })
      .toFile(outDeskWebp);

    // 2. Mobile WebP (960px wide, quality 82)
    await sharp(inputPath)
      .resize(960, null, { withoutEnlargement: true })
      .webp({ quality: 82, effort: 4 })
      .toFile(outMobWebp);

    // 3. Desktop Progressive JPEG fallback (1920px wide, quality 82)
    await sharp(inputPath)
      .resize(1920, null, { withoutEnlargement: true })
      .jpeg({ quality: 82, progressive: true, mozjpeg: true })
      .toFile(outDeskJpg);

    // 4. Mobile Progressive JPEG fallback (960px wide, quality 80)
    await sharp(inputPath)
      .resize(960, null, { withoutEnlargement: true })
      .jpeg({ quality: 80, progressive: true, mozjpeg: true })
      .toFile(outMobJpg);

    const deskSize = (fs.statSync(outDeskWebp).size / 1024).toFixed(1);
    const mobSize = (fs.statSync(outMobWebp).size / 1024).toFixed(1);

    console.log(`✓ ${hero.slug}:`);
    console.log(`   Original: ${originalSizeMB} MB`);
    console.log(`   Desktop WebP (1920px): ${deskSize} KB`);
    console.log(`   Mobile WebP (960px):   ${mobSize} KB\n`);
  }

  console.log("All hero images successfully optimized!");
}

optimize().catch((err) => {
  console.error(err);
  process.exit(1);
});
