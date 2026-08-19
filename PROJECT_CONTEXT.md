# Project Overview

* **Project Name**: herdos-react
* **Purpose**: Premium, dynamic marketing website for HERDOS—a smart herd management system and tracking collar for goats and sheep.
* **Main Features**:
  * Interactive hero section — premium card-contained viewport with outer forest shell, scroll-scrubbed cinematic video background (Apple-style `currentTime` proxy tween), opacity/blur crossfade to `hero.png` brand image, directional gradient overlay, radial vignette, scroll-pinned GSAP ScrollTrigger timeline, and manual word-level mask reveals that only begin after image has fully settled.
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
      * `hero/`: Contains [HeroAssetLoader.js](file:///home/diganth/Desktop/product/4/herdos-react/src/components/sections/home/hero/HeroAssetLoader.js) and [HeroScrollController.js](file:///home/diganth/Desktop/product/4/herdos-react/src/components/sections/home/hero/HeroScrollController.js).
    * `common/`: Reusable page structure blocks (page hero, content split, accordion FAQ, final CTA, ROI calculator).
    * `ui/`: Atom elements (buttons, pill badges, count-up animations, star ratings).
  * `src/pages`: Page views (About, Technology, Goats, Sheep, Farmers, Resources, Contact).
  * `src/context`: [SiteContext.jsx](file:///home/diganth/Desktop/product/4/herdos-react/src/context/SiteContext.jsx) providing global navigation states.
  * `src/hooks`: Custom hooks (useHeroParallax, useCountUp, useLiveTicker, useROICalc, useLenis).
  * `src/styles`: CSS files organized by concerns (tokens, base, chrome, pages, sections).
  * `src/constants`: JS mirror of style design tokens (`tokens.js`) for GSAP/Framer Motion consumption.
  * `src/data`: Static mock arrays (faqItems, testimonials, navigation structure, default ROI variables).
  * `src/lib`: GSAP registration utilities.
* **Important Architectural Patterns**: 
  * **Lazy-loaded Pages**: Route components are dynamically imported inside [App.jsx](file:///home/diganth/Desktop/product/4/herdos-react/src/App.jsx) wrapped in a `<Suspense>` fallback to minimize bundle sizes.
  * **Global Smooth Scroll Interceptor**: Standard anchor clicks (`href="#id"`) are intercepted globally in [App.jsx](file:///home/diganth/Desktop/product/4/herdos-react/src/App.jsx) and navigated using Lenis scrollTo offsets.
  * **Layout Stabilization**: [LayoutStabilizer](file:///home/diganth/Desktop/product/4/herdos-react/src/App.jsx) monitors fonts loading, initial window load, and page changes to perform debounced `ScrollTrigger.refresh()` actions once the page settles.
* **Routing Approach**: Hash routing and canonical paths with trailing slashes `/page/` enforced in React Router configuration.

# Key Components

* **PageShell**: Wraps all page contents with the persistent global header navigation, `<FarmerHelpline />` pre-footer bar, mobile drawer, and footer.
* **Header** ([Header.jsx](file:///home/diganth/Desktop/product/4/herdos-react/src/components/layout/Header.jsx)): Persistent global header navigation. Features a premium dual-state ScrollTrigger transition that morphs the navbar from a transparent, integrated hero overlay into a floating glass capsule (dark forest-green glass on Home, light cream glass on other pages). Uses GSAP `matchMedia` for responsive padding/margin adjustments.
* **FarmerHelpline** ([FarmerHelpline.jsx](file:///home/diganth/Desktop/product/4/herdos-react/src/components/layout/FarmerHelpline.jsx)): Standalone helpline bar rendered globally above the Footer on every page. Displays the Farmer Helpline phone number and a "Become a Pilot Farmer" link. Previously embedded inline inside the Header's utility strip; relocated to pre-footer on 2026-06-24.
* **HeroSection** ([HeroSection.jsx](file:///home/diganth/Desktop/product/4/herdos-react/src/components/sections/home/HeroSection.jsx)): Premium, scroll-pinned, card-contained hero. Driven by the modular loaders and controller:
  * [HeroAssetLoader](file:///home/diganth/Desktop/product/4/herdos-react/src/components/sections/home/hero/HeroAssetLoader.js): Freezes scrolling/layout during asset loads, checks fonts/images/videos, and includes a safety timeout to prevent stalling.
  * [HeroScrollController](file:///home/diganth/Desktop/product/4/herdos-react/src/components/sections/home/hero/HeroScrollController.js): Sets up a pinned GSAP ScrollTrigger timeline, scrubs background video `currentTime`, crossfades to `hero.png` at `imageSettled`, and manages staggering word mask reveals and text animations.
* **ROICalculator** ([ROICalculator.jsx](file:///home/diganth/Desktop/product/4/herdos-react/src/components/common/ROICalculator.jsx)): An interactive form allowing farmers to customize herd size, feed costs, and labor to see dynamic financial projections.
* **MobileCtaBar** ([MobileCtaBar.jsx](file:///home/diganth/Desktop/product/4/herdos-react/src/components/common/MobileCtaBar.jsx)): Sticky bottom CTA panel visible exclusively on mobile viewports for quick engagement.
* **TeamSection** ([TeamSection.jsx](file:///home/diganth/Desktop/product/4/herdos-react/src/components/sections/home/TeamSection.jsx)): Founder team showcase rendered on the Home page. Contains founder data for Ananth R Kulkarni (Co-Founder & Operations Lead) and Gowtham M A (Co-Founder & Technical Lead). Uses Framer Motion `<Reveal>` for scroll-triggered entrance animations.

# Key Pages

* **HomePage**: Comprehensive feature showcase, compare matrix, client testimonials, founder team section, technology strip, and latest blog teaser.
* **TechnologyPage**: Highlights collar hardware specs, solar charging capability, and regional cellular connectivity.
* **GoatsPage & SheepPage**: Customized niche value propositions for specific sheep and goat herd needs.
* **FarmersPage**: Focuses on modern ranching operations and ease-of-use highlights.
* **ResourcesPage**: Hosts the agricultural blog articles, FAQs list, and the ROI Calculator.
* **AboutPage**: Company story, roadmap, core values, open careers, and press. Does **not** render a team section (team lives on Home page).

# Component Ownership

| Section | Owner Page | Component |
|---|---|---|
| Hero | Home | [HeroSection.jsx](file:///home/diganth/Desktop/product/4/herdos-react/src/components/sections/home/HeroSection.jsx) |
| Live Ticker | Home | `sections/home/LiveTickerSection.jsx` |
| Value Propositions | Home | `sections/home/ValuePropSection.jsx` |
| Key Features | Home | `sections/home/KeyFeaturesSection.jsx` |
| Product Compare | Home | `sections/home/ProductCompareSection.jsx` |
| Market Stats | Home | `sections/home/MarketSection.jsx` |
| How It Works | Home | `sections/home/HowItWorksSection.jsx` |
| Testimonials | Home | `sections/home/TestimonialsSection.jsx` |
| Team / Founders | Home | [TeamSection.jsx](file:///home/diganth/Desktop/product/4/herdos-react/src/components/sections/home/TeamSection.jsx) |
| Tech Strip | Home | `sections/home/TechStripSection.jsx` |
| Blog Teaser | Home | `sections/home/BlogTeaserSection.jsx` |
| Farmer Helpline Bar | All pages (pre-footer) | [FarmerHelpline.jsx](file:///home/diganth/Desktop/product/4/herdos-react/src/components/layout/FarmerHelpline.jsx) |
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
  * `cream`/`off-white` (`#F7F7F3`): Warm page body background.
* **Typography**:
  * Headings/Display: `'Schibsted Grotesk'` (sans-serif)
  * Body: `'Hanken Grotesk'` (sans-serif)
  * Technical/Mono: `'Space Mono'` (monospace)
* **Layout**: Centered container bounding max-width between `1440px` and `1760px` depending on viewport size, with fluid gutters mapping responsive clamping. Includes floating hero card padding/margins (`--hero-pad`, `--hero-radius`) and a Mobile CTA clearance offset (`--mcta-h`).

# Important Decisions

* **Lenis-GSAP Synchronization**: Lenis smooth scroll updates GSAP ScrollTrigger markers on every scroll event, and GSAP's ticker controls Lenis' RAF loop. This avoids scroll/animation stutter.
* **Dual Animation Setup**: Framer Motion is chosen for route transitions and local mouse tracking (due to its state-driven nature), while GSAP handles coordinate-based scroll triggers.
* **Git Repository Context**: `.gitignore` explicitly excludes `herdos.zip` (original 93MB archive) and `prompt.md` to prevent ballooning Git history size.
* **Team Section on Home Page**: The founder team section was moved from About to Home (2026-06-22) to follow the natural investor/visitor storytelling arc: social proof (testimonials) → team credibility → technology → CTA.
* **Tailwind v4 Config Directive**: In TailwindCSS v4, `tailwind.config.js` is not auto-discovered; it is explicitly referenced in [index.css](file:///home/diganth/Desktop/product/4/herdos-react/src/index.css) using `@config "../tailwind.config.js"` to generate correct custom theme utility classes.
* **Layout Stabilization & Debounced Refresh**: Implemented `LayoutStabilizer` to prevent GSAP ScrollTrigger marker offset issues by running debounced refreshes when fonts load, window loads, or when media is dynamically injected by lazy-loaded page modules.
* **Hero Load Pipeline & Safety Nets**: Configured an 8-second video load safety timeout in [HeroAssetLoader.js](file:///home/diganth/Desktop/product/4/herdos-react/src/components/sections/home/hero/HeroAssetLoader.js) and a 10-second safety timeout in [App.jsx](file:///home/diganth/Desktop/product/4/herdos-react/src/App.jsx) for Lenis initialization to guarantee the viewport never remains permanently scroll-locked.
* **Header CSS State Synchronization**: Pre-configured the Home page transparent header's CSS margins, borders, and backgrounds in [chrome.css](file:///home/diganth/Desktop/product/4/herdos-react/src/styles/chrome.css) to match the GSAP ScrollTrigger's initial `fromTo` values, preventing visual jump-shift/flicker on load.
* **Navigation Restructuring**: Removed the main-level Technology tab, moving the page under the About mega-menu dropdown as a secondary column to streamline header navigation.

# Current Status

* **Completed**:
  * Porting codebase to React structure.
  * Configuration of animations (Lenis + GSAP ScrollTrigger + Framer Motion).
  * Implementation of custom page layouts and responsive design.
  * Initialization of the project's Git repository and push to GitHub `main` branch.
  * Migration of Team section from About to Home.
  * Relocation of Farmer Helpline bar to a standalone pre-footer component.
  * Cleaned up green top scroll progress bar.
  * Redesigned cinematic, scroll-scrubbed HeroSection with crossfade to static image.
  * Implemented floating glass navbar with delayed trigger logic keyed to `.hero-shell` exit.
  * Fixed Header initialization order using pathname.
  * Integrated TailwindCSS v4 with local tailwind.config.js utility generation.
  * Implemented LayoutStabilizer for debounced ScrollTrigger recalculations.
  * Created robust loading safety timeouts to prevent hero pipeline locking.
  * Restructured navigation categories (moved Technology under About).
  * Optimized full responsiveness for compact mobile viewports (e.g., iPhone SE), managing scaling and safe areas.
* **Work in Progress**:
  * Validation of design and typography consistency.
* **Pending**:
  * Production bundle optimization and test build deployment.

# Known Issues

* No active or unresolved functional bugs reported.

# AI Handoff

* **Recently Completed**:
  * Resolved PostCSS warnings by removing redundant autoprefixer configurations.
  * Created `/public/_redirects` file for routing on static host environments.
  * Implemented layout/scrolling safety timeouts ensuring fallback initialization.
  * Refined mobile viewport CSS overrides for all core landing blocks.
* **Next Steps / Recommendations**:
  * Verify navbar transparent-to-glass transitions on real iOS / Safari environments.
  * Perform a final production build test (`npm run build`) to check code-splitting bundle boundaries.
