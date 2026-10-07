Here is the comprehensive scaffolding and development guide for your Antigravity agent to build the Nigeria YEIB Investment Funds (NYEIB) web platform using Next.js App Router and the specified folder structure.

---

# Next.js Project Scaffolding & Development Guide: Nigeria YEIB Investment Funds (NYEIB)

## Phase 1: Project Scaffolding & Directory Setup

Instruct your Antigravity agent to establish the following directory architecture. Every visible UI block, widget, and section must be fully modularized as an isolated component.

```text
├── app/                  # Next.js App Router (Entry points & Routing)
│   ├── design-system/    # Design System Showcase page
│   ├── docs/             # Documentation site page
│   ├── what-we-do/       # What We Do page
│   ├── who-we-serve/     # Who We Serve page
│   ├── impact/           # Impact & Measurement page
│   ├── partners/         # Partners & Investors page
│   ├── esg/              # ESG & Sustainability page
│   ├── apply/            # Apply for Funding page
│   ├── layout.tsx        # Root Layout wrapping global styles & fonts
│   ├── page.tsx          # Homepage entry point
│   └── globals.css       # Global styles & Tailwind imports
├── features/             # Business logic & components grouped by feature
│   ├── design-system/    # Logic & showcase widgets for design tokens
│   ├── docs/             # Documentation engine components
│   ├── home/             # Homepage components (Hero, Metrics, Sectors)
│   ├── what-we-do/       # What We Do feature blocks
│   ├── who-we-serve/     # Audience selector & interactive tabs
│   ├── impact/           # Metrics counter & measurement layout
│   ├── partners/         # Investor value proposition & tiers
│   ├── esg/              # ESG pillars and accountability components
│   └── apply/            # Multi-pathway application forms & guidance
├── shared/               # Shared utilities, styles, and types
│   ├── styles/           # CSS design tokens (colors, typography, spacing)
│   └── utils/            # Shared helper functions (CSS parsers, classnames)
└── public/               # Static brand assets (Logo files, imagery)

```

---

## Phase 2: Design System & Design Tokens Setup

Your agent must configure the design system strictly around the brand guidelines provided in the brand document and website copy:

### 1. Color Tokens (`shared/styles/tokens.css` or Tailwind config)

- **Primary / Evergreen (`#01261B` or brand dark green):** Used for solid foundations, structure, and headers.
- **Mint Leaf (`#11B981` / brand accent mint):** Freshness, innovation, and forward momentum.
- **Tiger Orange (`#F76A23` / accent):** Enterprise, energy, and CTAs.
- **Pale Oak & Mint Cream:** Neutral backgrounds and breathing room.

### 2. Typography Pairings

- **Headings:** **Asul** (Bold/Regular) imported from Google Fonts (`[https://fonts.google.com/specimen/Asul](https://fonts.google.com/specimen/Asul)`). Never used below 20pt.

- **Body Copy:** **Chivo** (Light, Regular, SemiBold, Bold) imported from Google Fonts (`[https://fonts.google.com/specimen/Chivo](https://fonts.google.com/specimen/Chivo)`).

---

## Phase 3: Component Implementation Roadmap for the Agent

Instruct your agent to execute the following build sequence step-by-step:

### Step 1: Global Setup & Layout Wrappers

- Initialize Next.js App Router configuration with Tailwind CSS v4.
- Load Google Font links (`Asul` and `Chivo`) inside `app/layout.tsx`.
- Create global shared UI primitives in `features/` (Buttons, Cards, Badges, Accordions, Modal shells).

### Step 2: Refactoring & Rebuilding the Hero Section

- **Current state:** Built in legacy HTML/CSS/JS.
- **Agent Task:** Rebuild the hero section as a clean, modular React component (`features/home/Hero.tsx`) adhering to the layout specifications (70-30 / 50-50 split or diagonal framing inspired by the brand guide).
- **Copy to Integrate:**
  > **Unlocking pathways for investable businesses.**
  > NYEIB connect growth-oriented businesses with the capital, partnerships and practical support they need to become more credible, resilient and investment-ready.
  > _CTA:_ Apply for Funding

### Step 3: Scaffolding Feature Modules & Pages

1. **Homepage (`app/page.tsx` & `features/home/`)**

- _Institutional Credibility Section:_ Highlighting institutional partners (NSIA, DBN, AfDB).
- _Who We Serve Summary Cards:_ Quick links to youth/women entrepreneurs, banks, and institutional investors.

- _Blended Capital Instruments:_ Equity Investment Fund, Credit Guarantee Fund, Ecosystem Development Fund.

- _20-Year Impact Metrics Grid:_ 1.6M jobs, 118 ESOs, Gender parity by Year 5, ~38,400 businesses supported.

2. **What We Do (`app/what-we-do/page.tsx`)**

- Problem/Purpose breakdown ("Ambition was never the problem; access was").

- Blended Capital & Ecosystem Development pillars.

3. **Who We Serve (`app/who-we-serve/page.tsx`)**

- Interactive segmented dropdowns/tabs for Youth & Women Entrepreneurs, Banks & Financial Institutions, and Institutional Investors & Partners.

4. **Impact & Measurement (`app/impact/page.tsx`)**

- Detailed target breakdowns (Jobs, Businesses, Gender Parity).

- Three-pillar evaluation framework: **Impact, Additionality, and Risk**.

5. **Partners & Investors (`app/partners/page.tsx`)**

- Investor value proposition and structural anchor details (NSIA, DBN, AfDB).

6. **ESG & Sustainability (`app/esg/page.tsx`)**

- Environmental, Social, and Governance breakdown.

7. **Apply for Funding (`app/apply/page.tsx`)**

- Dual pathway selection interface (Pathway 1: Business Support / Pathway 2: Partnerships across VC/PE, Lenders, ESOs, and Research institutions).

---

## Phase 4: Verification & Design System Showcase

- Populate `app/design-system/page.tsx` with live interactive tokens showing color swatches, typographic scales (Asul vs. Chivo), button variants, and layout split templates so the agent can self-audit its output against the NYEIB brand identity guidelines.
