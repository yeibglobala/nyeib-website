#!/usr/bin/env bash
# ==============================================================================
# Script: generate-mobile-hero-crops.sh
# Purpose: Uses ffmpeg to create character-aware, mobile-optimized hero crops
#          for all inner pages of the NYEIB website.
#
# Character Bounding Box Analysis:
# - what-we-do: Centers both co-workers smiling at laptop (x=1000..4300)
# - who-we-serve: Frames both standing woman in yellow & seated man (x=1500..5400)
# - impact: Frames both colleagues collaborating over documents (x=1500..4900)
# - partners: Frames meeting attendees, tablet analysis & presentation screen (x=1600..5200)
# - esg: Frames both executive discussion partners in blue jacket & olive top (x=150..1250)
# - apply: Recovers solo entrepreneur with tablet, eliminating dead background (x=350..3150)
# ==============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
IMG_DIR="${ROOT_DIR}/public/images"
MOBILE_DIR="${IMG_DIR}/mobile"

mkdir -p "${MOBILE_DIR}"

echo "🚀 Generating character-aware mobile hero crops with ffmpeg..."

# 1. What We Do
echo "📸 Processing: what-we-do-mobile.jpg"
ffmpeg -y -v error -i "${IMG_DIR}/african-american-man-woman-home-office-analyzes-online-business-trends.jpg" \
  -vf "crop=3300:3493:1000:0,scale=1080:1143:flags=lanczos" \
  -q:v 2 "${MOBILE_DIR}/what-we-do-mobile.jpg"

# 2. Who We Serve
echo "📸 Processing: who-we-serve-mobile.jpg"
ffmpeg -y -v error -i "${IMG_DIR}/nyeib-who-we-serve.jpg" \
  -vf "crop=3900:4147:1500:0,scale=1080:1148:flags=lanczos" \
  -q:v 2 "${MOBILE_DIR}/who-we-serve-mobile.jpg"

# 3. Impact & Measurement
echo "📸 Processing: impact-mobile.jpg"
ffmpeg -y -v error -i "${IMG_DIR}/nyeib-Impact-and-measurement.jpg" \
  -vf "crop=3400:3525:1500:0,scale=1080:1120:flags=lanczos" \
  -q:v 2 "${MOBILE_DIR}/impact-mobile.jpg"

# 4. Partners & Investors
echo "📸 Processing: partners-mobile.jpg"
ffmpeg -y -v error -i "${IMG_DIR}/nyeib-partner-and-investor.jpg" \
  -vf "crop=3600:3629:1600:0,scale=1080:1089:flags=lanczos" \
  -q:v 2 "${MOBILE_DIR}/partners-mobile.jpg"

# 5. ESG & Sustainability
echo "📸 Processing: esg-mobile.jpg"
ffmpeg -y -v error -i "${IMG_DIR}/nyeib-investors.jpg" \
  -vf "crop=1100:844:150:0,scale=1080:828:flags=lanczos" \
  -q:v 2 "${MOBILE_DIR}/esg-mobile.jpg"

# 6. Apply
echo "📸 Processing: apply-mobile.jpg"
ffmpeg -y -v error -i "${IMG_DIR}/nyeib-apply-for-funding.jpg" \
  -vf "crop=2800:3337:350:0,scale=1080:1287:flags=lanczos" \
  -q:v 2 "${MOBILE_DIR}/apply-mobile.jpg"

echo "✅ All 6 mobile hero crops generated successfully in public/images/mobile/:"
ls -lh "${MOBILE_DIR}/"
