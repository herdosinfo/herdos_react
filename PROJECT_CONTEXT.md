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
* **Header** (`src/components/layout/Header.jsx`): Persistent global header navigation. Features a premium dual-state ScrollTrigger transition that morphs the navbar from a transparent, integrated hero overlay into a floating glass capsule (dark forest-green glass on Home, light cream glass on other pages). Uses GSAP `matchMedia` for responsive padding/margin adjustments.
* **FarmerHelpline** (`src/components/layout/FarmerHelpline.jsx`): Standalone helpline bar rendered globally above the Footer on every page. Displays the Farmer Helpline phone number and a "Become a Pilot Farmer" link. Previously embedded inline inside the Header's utility strip; relocated to pre-footer on 2026-06-24.
* **HeroSection** (`src/components/sections/home/HeroSection.jsx`): Premium, scroll-pinned, card-contained hero with cinematic storytelling sequence (redesigned 2026-06-28). Architecture: outer Forest green shell with padding (`hero-shell`) → rounded inner container card (`hero-container`) clipping the media layers → video background layer (`goat-wearing-herdos.mp4`, poster `field.jpg`) → 4-stop directional gradient overlay (`hero-overlay`) → radial vignette (`hero-vignette`) → initial center tagline layer (`.hero-center-tagline`) displaying exclusively HERDOS logo mark + tagline + scroll cue → bottom-left anchored main marketing content (`.hero-content` with eyebrow + manual word spans for mask reveals + desc + dual-CTA + trust strip). Driven by a scrubbed GSAP ScrollTrigger timeline pinned over +180% scroll depth for rapid but smooth cinematic pacing (0-8% scroll cue fade, 0-15% center tagline fade up, 15-23% eyebrow reveal, 20-32% & 30-42% word mask reveals, 40-52% desc fade up, 48-60% CTA scale-in, 56-68% trust strip, 68-100% settled screen state, 0-100% video atmospheric zoom & parallax).
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
  * **[2026-06-24] Hero Section redesigned** to a premium scroll-pinned card-contained layout. `HeroSection.jsx` fully rewritten with scroll-pinning, vignette layer, and manual word-level spans for stagger. `.hero-cinema` block in `sections.css` replaced with `.hero-shell` / `.hero-container` system. Header/Navbar modified to float over the hero container on the home page with transparent-to-frosted glass scrolled state. Reference: Halter beef hero (inspiration only — all copy, colors, and assets are HERDOS).
  * **[2026-06-24] Premium Dual-State Navbar implemented**: Created a smooth GSAP ScrollTrigger timeline to morph the navbar into a floating glass capsule on scroll. Implemented responsive margins and rounded corner adjustments, premium capsule pseudo-element hover effects on desktop links, and a glassmorphic mo  * **[2026-06-30] Cinematic Scroll-Scrubbed Video-to-Image Hero implemented**: Replaced ambient autoplay-loop video pattern with a scroll-driven cinematic sequence comparable to Apple AirPods/Vision Pro product pages. Video `currentTime` is now scrubbed directly via a GSAP proxy tween (`videoProxy.time → video.currentTime`) driven by the existing global Lenis + ScrollTrigger. On reaching the final frame, a premium opacity/scale/blur crossfade dissolves the `<video>` into `hero.png` (both elements coexist during the blend window). All existing marketing content-reveal animations (eyebrow, word-mask headline, desc, CTA `back.out` scale, trust strip stagger) are preserved exactly — only their timeline positions are shifted to begin after the `imageSettled` label. Total pinned distance is `+=190%` vh. Assets now imported as ES module assets from `src/assets/` (`herovideo.mp4` + `hero.png`) rather than public URL strings.
  * **[2026-07-01] Premium Warm Off-White Page Background & Floating Hero Refinement**: Improved visual hierarchy on the Homepage by changing the surrounding page background to a warm off-white (`#F7F7F3`). Replaced the dark green background around the Hero with `--cream` (updated to `#F7F7F3`). Elevated `.hero-container` into a premium floating card using soft shadows, a subtle border (`rgba(0, 0, 0, 0.06)`), and generous responsive padding/margins (`--hero-pad` and `--hero-radius`) to keep equal spacing on all devices. Updated initial GSAP `fromTo` values in `Header.jsx` to dynamically align the navbar boundaries.
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
  * **[2026-06-24] Hero Section redesigned** to premium scroll-pinned layout. Files modified: `src/components/sections/home/HeroSection.jsx` (scroll-pinned GSAP timeline), `src/styles/sections.css` (shell/container card structure), `src/styles/chrome.css` (floating navbar), `src/components/layout/Header.jsx` (adjusted scrolled threshold). Animation system: GSAP ScrollTrigger for pinning (+200vh scroll) and scrubbed reveals.
  * **[2026-06-24] Premium Dual-State Navbar implemented**. Files modified: `src/components/layout/Header.jsx` (GSAP ScrollTrigger transition timeline + state toggle), `src/styles/chrome.css` (capsule hover effects + mobile drawer glass overrides), `src/components/layout/MobileDrawer.jsx` (markup context).
  * **[2026-06-28] Cinematic Hero Storytelling Sequence implemented**. Built initial uncluttered landing experience showing ONLY video background, navbar, center tagline ("HERDOS - India's First AI Smart Collar for Sheep & Goats"), and animated scroll indicator. Pinned container across `+=300%` scroll height with scrubbed GSAP timeline orchestrating tagline fade-out (0-20%), eyebrow reveal (20%), word-by-word headline mask reveals (35% & 50%), description fade-in (70%), CTA button scale & entrance (80%), and trust strip fade-in (90%), with continuous background zoom and parallax motion. Files modified: `HeroSection.jsx` and `sections.css`.
  * **[2026-06-30] Scroll-Scrubbed Video + Crossfade Hero**. Complete rewrite of `HeroSection.jsx` scroll interaction model. Files modified: `src/components/sections/home/HeroSection.jsx` (video proxy tween, `heroImageRef`, import of `heroVideo`/`heroImage` from `src/assets/`, full timeline restructure with `imageSettled` label), `src/styles/sections.css` (`.hero-bg-image` rule added, `.hero-bg-video` `will-change` extended to include `opacity, filter`). Assets: `src/assets/herovideo.mp4` (new, placed in src/assets) and `src/assets/hero.png` (existing) now imported as Vite ES module assets. Removed: `autoPlay`, `loop`, `poster`, `preload="metadata"` attributes from `<video>`; replaced with `preload="auto"` and scroll-driven `currentTime` proxy. No changes to `Header.jsx`, `App.jsx`, `useLenis.js`, or `gsap.js`.
  * **[2026-07-01] Premium Warm Off-White Page Background & Floating Hero Refinement**: Improved visual hierarchy on the Homepage by changing the surrounding page background to a warm off-white (`#F7F7F3`). Replaced the dark green background around the Hero with `--cream` (updated to `#F7F7F3`). Elevated `.hero-container` into a premium floating card using soft shadows, a subtle border (`rgba(0, 0, 0, 0.06)`), and generous responsive padding/margins (`--hero-pad` and `--hero-radius`) to keep equal spacing on all devices. Updated initial GSAP `fromTo` values in `Header.jsx` to dynamically align the navbar boundaries.
  * **[2026-07-01] Cinematic Color Grading & Charcoal Overlay Refinement**: Replaced the strong green-tinted overlay and vignette with neutral charcoal gradients (`rgba(15, 15, 15, ...)`), reducing green cast and muddy look of the landscape. Configured a directional left-to-right overlay gradient (85% to 0% opacity) that preserves text readability on the left while leaving the right side clear. Added professional-grade color filters (`contrast(1.08) brightness(1.02) saturate(1.05)`) on `.hero-bg-wrap` to elevate natural contrast, dynamic range, sky realism, and texture detail.
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
  * **[2026-06-24] Hero Section redesigned** to premium scroll-pinned layout. Files modified: `src/components/sections/home/HeroSection.jsx` (scroll-pinned GSAP timeline), `src/styles/sections.css` (shell/container card structure), `src/styles/chrome.css` (floating navbar), `src/components/layout/Header.jsx` (adjusted scrolled threshold). Animation system: GSAP ScrollTrigger for pinning (+200vh scroll) and scrubbed reveals.
  * **[2026-06-24] Premium Dual-State Navbar implemented**. Files modified: `src/components/layout/Header.jsx` (GSAP ScrollTrigger transition timeline + state toggle), `src/styles/chrome.css` (capsule hover effects + mobile drawer glass overrides), `src/components/layout/MobileDrawer.jsx` (markup context).
  * **[2026-06-28] Cinematic Hero Storytelling Sequence implemented**. Built initial uncluttered landing experience showing ONLY video background, navbar, center tagline ("HERDOS - India's First AI Smart Collar for Sheep & Goats"), and animated scroll indicator. Pinned container across `+=300%` scroll height with scrubbed GSAP timeline orchestrating tagline fade-out (0-20%), eyebrow reveal (20%), word-by-word headline mask reveals (35% & 50%), description fade-in (70%), CTA button scale & entrance (80%), and trust strip fade-in (90%), with continuous background zoom and parallax motion. Files modified: `HeroSection.jsx` and `sections.css`.
  * **[2026-06-30] Scroll-Scrubbed Video + Crossfade Hero**. Complete rewrite of `HeroSection.jsx` scroll interaction model. Files modified: `src/components/sections/home/HeroSection.jsx` (video proxy tween, `heroImageRef`, import of `heroVideo`/`heroImage` from `src/assets/`, full timeline restructure with `imageSettled` label), `src/styles/sections.css` (`.hero-bg-image` rule added, `.hero-bg-video` `will-change` extended to include `opacity, filter`). Assets: `src/assets/herovideo.mp4` (new, placed in src/assets) and `src/assets/hero.png` (existing) now imported as Vite ES module assets. Removed: `autoPlay`, `loop`, `poster`, `preload="metadata"` attributes from `<video>`; replaced with `preload="auto"` and scroll-driven `currentTime` proxy. No changes to `Header.jsx`, `App.jsx`, `useLenis.js`, or `gsap.js`.
  * **[2026-07-01] Premium Warm Off-White Page Background & Floating Hero Refinement**. Files modified: `src/styles/tokens.css` (changed `--cream` to `#F7F7F3` and added global `--hero-pad`/`--hero-radius` tokens), `src/styles/sections.css` (replaced `.hero-shell` background with `var(--cream)`, updated `.hero-container` radius, box-shadow, and subtle border), `src/components/layout/Header.jsx` (updated initial inline alignment variables for the navbar fromTo).
  * **[2026-07-01] Cinematic Color Grading & Charcoal Overlay Refinement**: Replaced the strong green-tinted overlay and vignette with neutral charcoal gradients (`rgba(15, 15, 15, ...)`), reducing green cast and muddy look of the landscape. Configured a directional left-to-right overlay gradient (85% to 0% opacity) that preserves text readability on the left while leaving the right side clear. Added professional-grade color filters (`contrast(1.08) brightness(1.02) saturate(1.05)`) on `.hero-bg-wrap` to elevate natural contrast, dynamic range, sky realism, and texture detail.
  * **[2026-07-01] Delayed Floating Glass Navbar Trigger Logic**: Postponed the floating glass navbar morph transition to preserve the uninterrupted cinematic Hero journey. Changed home page ScrollTrigger trigger element in `Header.jsx` to `.hero-shell` with start: '85% top' and end: 'bottom top' (instead of the body-based 120px trigger). Incorporated a polling requestAnimationFrame fallback routine to safely initialize scroll triggers once lazy-loaded route components render.
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
  * **[2026-06-24] Hero Section redesigned** to premium scroll-pinned layout. Files modified: `src/components/sections/home/HeroSection.jsx` (scroll-pinned GSAP timeline), `src/styles/sections.css` (shell/container card structure), `src/styles/chrome.css` (floating navbar), `src/components/layout/Header.jsx` (adjusted scrolled threshold). Animation system: GSAP ScrollTrigger for pinning (+200vh scroll) and scrubbed reveals.
  * **[2026-06-24] Premium Dual-State Navbar implemented**. Files modified: `src/components/layout/Header.jsx` (GSAP ScrollTrigger transition timeline + state toggle), `src/styles/chrome.css` (capsule hover effects + mobile drawer glass overrides), `src/components/layout/MobileDrawer.jsx` (markup context).
  * **[2026-06-28] Cinematic Hero Storytelling Sequence implemented**. Built initial uncluttered landing experience showing ONLY video background, navbar, center tagline ("HERDOS - India's First AI Smart Collar for Sheep & Goats"), and animated scroll indicator. Pinned container across `+=300%` scroll height with scrubbed GSAP timeline orchestrating tagline fade-out (0-20%), eyebrow reveal (20%), word-by-word headline mask reveals (35% & 50%), description fade-in (70%), CTA button scale & entrance (80%), and trust strip fade-in (90%), with continuous background zoom and parallax motion. Files modified: `HeroSection.jsx` and `sections.css`.
  * **[2026-06-30] Scroll-Scrubbed Video + Crossfade Hero**. Complete rewrite of `HeroSection.jsx` scroll interaction model. Files modified: `src/components/sections/home/HeroSection.jsx` (video proxy tween, `heroImageRef`, import of `heroVideo`/`heroImage` from `src/assets/`, full timeline restructure with `imageSettled` label), `src/styles/sections.css` (`.hero-bg-image` rule added, `.hero-bg-video` `will-change` extended to include `opacity, filter`). Assets: `src/assets/herovideo.mp4` (new, placed in src/assets) and `src/assets/hero.png` (existing) now imported as Vite ES module assets. Removed: `autoPlay`, `loop`, `poster`, `preload="metadata"` attributes from `<video>`; replaced with `preload="auto"` and scroll-driven `currentTime` proxy. No changes to `Header.jsx`, `App.jsx`, `useLenis.js`, or `gsap.js`.
  * **[2026-07-01] Premium Warm Off-White Page Background & Floating Hero Refinement**. Files modified: `src/styles/tokens.css` (changed `--cream` to `#F7F7F3` and added global `--hero-pad`/`--hero-radius` tokens), `src/styles/sections.css` (replaced `.hero-shell` background with `var(--cream)`, updated `.hero-container` radius, box-shadow, and subtle border), `src/components/layout/Header.jsx` (updated initial inline alignment variables for the navbar fromTo).
  * **[2026-07-01] Cinematic Color Grading & Charcoal Overlay Refinement**. Files modified: `src/styles/sections.css` (replaced green overlay and vignette with neutral charcoal gradients, and added contrast/brightness/saturation filters to `.hero-bg-wrap`).
  * **[2026-07-01] Delayed Floating Glass Navbar Trigger Logic**. Files modified: `src/components/layout/Header.jsx` (updated scroll triggers on home page to bind to `.hero-shell` with start: '85% top' and end: 'bottom top', incorporating a requestAnimationFrame loop to handle lazy rendering).
* **Current Status**: Cinematic scroll-scrubbed Hero complete with delayed glass navbar morph.
* **What to do next**: Verify that the navbar stays 100% transparent and integrated into the Hero until the very end of the scroll sequence when the Hero leaves the screen.



