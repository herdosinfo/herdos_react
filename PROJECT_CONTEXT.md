# Project Overview

* **Project Name**: herdos-react
* **Purpose**: Premium, dynamic marketing website for HERDOS—a smart herd management system and tracking collar for goats and sheep.
* **Main Features**:
  * Interactive hero section with mouse parallax tracking.
  * Smooth scrolling using Lenis integrated with GSAP ScrollTrigger.
  * Real-time styled live status ticker.
  * Side-by-side product comparison matrix.
  * Interactive ROI (Return on Investment) calculator for livestock farmers.
  * Responsive layout with customized desktop mega menu and mobile navigation drawer.
  * Founder team showcase section on the Home page.
* **Current Development Stage**: Core features, page routing, and design system are implemented. The local development environment is configured, and the codebase is pushed to remote origin.

# Tech Stack

* **Frameworks**: React (v19) scaffolded with Vite (v8)
* **Libraries**: React Router DOM (v7) for client-side routing
* **State Management**: React Context (`SiteContext`) for site-wide UI states (mobile menu open/close, active page sections)
* **Styling**: Vanilla CSS structure styled using TailwindCSS (v4)
* **Animation Libraries**: 
  * **GSAP**: Custom ScrollTrigger interactions aligned to scroll position
  * **Lenis**: Smooth scrolling engine driving the GSAP ticker
  * **Framer Motion**: Route page transition fades and light interactive hover/mouse movements
* **Deployment Platforms**: Configured for static SPA hosting

# Architecture Summary

* **High-Level Folder Structure**:
  * `src/components`: UI components divided into:
    * `layout/`: Shell layout, header/navigation, footer, mega menu, and mobile drawer.
    * `sections/`: Home page specific components (hero, compare, market, tech strip, team).
    * `common/`: Reusable page structure blocks (page hero, content split, accordion FAQ, final CTA, ROI calculator).
    * `ui/`: Atom elements (buttons, pill badges, count-up animations, star ratings).
  * `src/pages`: Page views (About, Technology, Goats, Sheep, Farmers, Resources, Contact).
  * `src/context`: SiteContext providing global navigation states.
  * `src/hooks`: Custom hooks (useHeroParallax, useCountUp, useLiveTicker, useROICalc, useLenis).
  * `src/styles`: CSS files organized by concerns (tokens, base, chrome, pages, sections).
  * `src/constants`: JS mirror of style design tokens (`tokens.js`) for GSAP/Framer Motion consumption.
  * `src/data`: Static mock arrays (faqItems, testimonials, navigation structure, default ROI variables).
  * `src/lib`: GSAP registration utilities.
* **Important Architectural Patterns**: 
  * **Lazy-loaded Pages**: Route components are dynamically imported inside `App.jsx` wrapped in a `<Suspense>` fallback to minimize bundle sizes.
  * **Global Smooth Scroll Interceptor**: Standard anchor clicks (`href="#id"`) are intercepted globally in `App.jsx` and navigated using Lenis scrollTo offsets.
* **Routing Approach**: Hash routing and canonical paths with trailing slashes `/page/` enforced in React Router configuration.

# Key Components

* **PageShell**: Wraps all page contents with the persistent global header navigation, `<FarmerHelpline />` pre-footer bar, mobile drawer, and footer.
* **FarmerHelpline** (`src/components/layout/FarmerHelpline.jsx`): Standalone helpline bar rendered globally above the Footer on every page. Displays the Farmer Helpline phone number and a "Become a Pilot Farmer" link. Previously embedded inline inside the Header's utility strip; relocated to pre-footer on 2026-06-24.
* **ROICalculator** (`src/components/common/ROICalculator.jsx`): An interactive form allowing farmers to customize herd size, feed costs, and labor to see dynamic financial projections.
* **MobileCtaBar**: Sticky bottom CTA panel visible exclusively on mobile viewports for quick engagement.
* **TeamSection** (`src/components/sections/home/TeamSection.jsx`): Founder team showcase rendered on the Home page. Contains founder data for Ananth R Kulkarni (Co-Founder & Operations Lead) and Gowtham M A (Co-Founder & Technical Lead). Uses Framer Motion `<Reveal>` for scroll-triggered entrance animations.

# Key Pages

* **HomePage**: Comprehensive feature showcase, compare matrix, client testimonials, **founder team section**, technology strip, and latest blog teaser.
* **TechnologyPage**: Highlights collar hardware specs, solar charging capability, and regional cellular connectivity.
* **GoatsPage & SheepPage**: Customized niche value propositions for specific sheep and goat herd needs.
* **FarmersPage**: Focuses on modern ranching operations and ease-of-use highlights.
* **ResourcesPage**: Hosts the agricultural blog articles, FAQs list, and the ROI Calculator.
* **AboutPage**: Company story, roadmap, core values, open careers, and press. Does **not** render a team section (team lives on Home page).

# Component Ownership

| Section | Owner Page | Component |
|---|---|---|
| Hero | Home | `sections/home/HeroSection.jsx` |
| Live Ticker | Home | `sections/home/LiveTickerSection.jsx` |
| Value Propositions | Home | `sections/home/ValuePropSection.jsx` |
| Key Features | Home | `sections/home/KeyFeaturesSection.jsx` |
| Product Compare | Home | `sections/home/ProductCompareSection.jsx` |
| Market Stats | Home | `sections/home/MarketSection.jsx` |
| How It Works | Home | `sections/home/HowItWorksSection.jsx` |
| Testimonials | Home | `sections/home/TestimonialsSection.jsx` |
| **Team / Founders** | **Home** | **`sections/home/TeamSection.jsx`** |
| Tech Strip | Home | `sections/home/TechStripSection.jsx` |
| Blog Teaser | Home | `sections/home/BlogTeaserSection.jsx` |
| **Farmer Helpline Bar** | **All pages (pre-footer)** | **`layout/FarmerHelpline.jsx`** |
| Story / OurStory | About | inline in `pages/AboutPage.jsx` |
| Roadmap | About | inline in `pages/AboutPage.jsx` |
| Values | About | inline in `pages/AboutPage.jsx` |
| Careers | About | inline in `pages/AboutPage.jsx` |
| Press | About | inline in `pages/AboutPage.jsx` |

# Important Integrations

* **Assets**: Solar collar media assets, SVGs, and a local video demo (`public/media/goat-wearing-herdos.mp4`) are hosted locally inside the public directory. No external CMS or database API connections are currently used.
* **Team Photos**: Founder headshots at `public/media/ananth-team.png` and `public/media/gowtham-team.png`.

# Design System

* **Color System**:
  * `forest` (`#0D1F12`): Main heading, text, header, and footer background.
  * `green` (`#007925`): Primary active color for buttons, CTAs, and links.
  * `gold` (`#FCBD16`): Secondary highlight color (stats, badge indicators).
  * `cream` (`#F5F5F5`): Primary body page background.
* **Typography**:
  * Headings/Display: `'Schibsted Grotesk'` (sans-serif)
  * Body: `'Hanken Grotesk'` (sans-serif)
  * Technical/Mono: `'Space Mono'` (monospace)
* **Layout**: Centered container bounding max-width between `1440px` and `1760px` depending on viewport size, with fluid gutters mapping responsive clamping.

# Important Decisions

* **Lenis-GSAP Synchronization**: Lenis smooth scroll updates GSAP ScrollTrigger markers on every scroll event, and GSAP's ticker controls Lenis' RAF loop. This avoids scroll/animation stutter.
* **Dual Animation Setup**: Framer Motion is chosen for route transitions and local mouse tracking (due to its state-driven nature), while GSAP handles coordinate-based scroll triggers.
* **Git Repository Context**: `.gitignore` explicitly excludes `herdos.zip` (original 93MB archive) and `prompt.md` to prevent ballooning Git history size.
* **Team Section on Home Page**: The founder team section was moved from About to Home (2026-06-22) to follow the natural investor/visitor storytelling arc: social proof (testimonials) → team credibility → technology → CTA.

# Current Status

* **Completed**:
  * Porting codebase to React structure.
  * Configuration of animations (Lenis + GSAP ScrollTrigger + Framer Motion).
  * Implementation of custom page layouts and responsive design.
  * Initialization of the project's Git repository and push to GitHub `main` branch.
  * **Team section migration** from About page to Home page (2026-06-22). Placed after Testimonials, before TechStrip. Premium card styles updated (hover lift, photo zoom, green-bright border accent).
  * **[2026-06-24] Farmer Helpline bar relocated** from the top utility strip inside `Header.jsx` to a standalone pre-footer component (`FarmerHelpline.jsx`). The `[data-site-header]` CSS sticky offset corrected from `top: -38px` to `top: 0`.
  * **[2026-06-24] Green Top Loading Bar Removed**: Removed the `ScrollProgressBar` component, `useScrollProgress` hook, `.scroll-bar` CSS rules, and the `--scroll-progress` variable, cleaning up imports in `App.jsx` and `Header.jsx`.
* **Work in Progress**:
  * Validation of design and typography consistency.
* **Pending**:
  * Production bundle optimization and test build deployment.

# Known Issues

* No active or unresolved functional bugs reported.

# AI Handoff

* **Recently Completed**:
  * Initialized Git repository for `/home/diganth/Desktop/product/4/herdos-react`.
  * Added `herdos.zip` and `prompt.md` to `.gitignore`.
  * Configured Git remote origin pointing to `https://github.com/herdosinfo/herdos_react.git` and successfully pushed `main` branch using Personal Access Token credentials.
  * Set up and verified the local development environment using `npm run dev` running on `http://localhost:5173/`.
  * **[2026-06-22] Team section successfully migrated from About to Home.** Component is a new standalone file at `src/components/sections/home/TeamSection.jsx`. Founder data (names, roles, photos) lives exclusively in that file. About page no longer imports or renders team content. No duplicate team sections exist. Full names corrected to `Ananth R Kulkarni` (Co-Founder & Operations Lead) and `Gowtham M A` (Co-Founder & Technical Lead).
  * **[2026-06-24] Farmer Helpline bar relocated from top-of-page to pre-footer.** The inline `ustrip` block was extracted from `Header.jsx` into a new standalone component at `src/components/layout/FarmerHelpline.jsx`. It is now rendered in `PageShell.jsx` immediately before `<Footer />` on every page. The `[data-site-header]` sticky CSS offset was fixed from `top: -38px` to `top: 0`. A `.ustrip--prefooter` modifier adds a bottom border to visually separate the bar from the footer body.
  * **[2026-06-24] Green top loading/scroll progress bar removed.** The `ScrollProgressBar` component and its hook `useScrollProgress` were deleted. Duplicate `.scroll-bar` markup inside `Header.jsx`, corresponding styling in `chrome.css`, and `--scroll-progress` CSS variable in `tokens.css` were completely removed.
* **Current Status / AI Handoff**: Green top loading bar successfully removed.
* **What to do next**: Run `npm run build` to confirm production bundle is clean, then commit and push to GitHub `main`.
