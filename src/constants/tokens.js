/**
 * Design Tokens (JavaScript Mirror)
 * All values extracted verbatim from css/tokens.css
 * Used by GSAP, Framer Motion, and component logic
 */

export const TOKENS = {
  // Brand greens
  forest: '#0D1F12',
  green: '#007925',
  greenHover: '#006A20',
  greenPress: '#014C1B',
  greenBright: '#39B54A',

  // Greens — secondary shades
  sage50: '#EAF3EE',
  sage100: '#D7E8DD',
  sage200: '#B6D0C0',

  // Neutrals
  cream: '#F5F5F5',
  paper: '#FFFFFF',
  ink: '#0D1F12',
  muted: '#4A5E50',
  faint: '#7A8C82',
  border: 'rgba(13, 31, 18, 0.10)',
  borderSoft: 'rgba(13, 31, 18, 0.06)',

  // Accent + status
  gold: '#FCBD16',
  danger: '#B43A2B',
  success: '#0E7A3A',

  // Gradients
  gradHero: 'linear-gradient(150deg, #0D1F12 0%, #11331C 45%, #0B4A22 100%)',
  gradLogo: 'linear-gradient(135deg, #39B54A 0%, #007925 100%)',
  gradLogoDark: 'linear-gradient(135deg, #D7FFF3 0%, #39B54A 100%)',

  // Typography — font families (as arrays for CSS fallback chains)
  fontDisplay: ["'Schibsted Grotesk'", 'system-ui', 'sans-serif'],
  fontBody: ["'Hanken Grotesk'", 'system-ui', '-apple-system', 'sans-serif'],
  fontMono: ["'Space Mono'", 'ui-monospace', 'monospace'],

  // Shadows — forest-tinted
  shSm: '0 2px 8px rgba(13, 31, 18, 0.06)',
  shMd: '0 10px 30px rgba(13, 31, 18, 0.08)',
  shLg: '0 22px 55px rgba(13, 31, 18, 0.12)',
  shCta: '0 8px 22px rgba(0, 121, 37, 0.24)',
  shCtaHover: '0 12px 30px rgba(0, 121, 37, 0.32)',

  // Radii
  rSm: '10px',
  rMd: '16px',
  rLg: '22px',
  rXl: '28px',
  rPill: '999px',

  // Motion
  ease: [0.16, 1, 0.3, 1], // cubic-bezier values for GSAP
  easeString: 'cubic-bezier(0.16, 1, 0.3, 1)', // CSS string format
  dur: 0.42, // seconds
  durMs: 420, // milliseconds

  // Layout
  maxW: '1440px',
  maxWWide: '1640px',
  maxWWider: '1760px',
  navH: '64px',
  gutterMin: '1.25rem',
  gutterResponsive: 'clamp(1.25rem, 5vw, 4rem)',
  gutterWide: '5vw',

  // Scroll progress (CSS custom property)
  scrollProgress: '0%', // Updated dynamically in browser
};

// GSAP easing function reference
export const EASE_GSAP = 'power4.out'; // Approximation of cubic-bezier(0.16, 1, 0.3, 1)
