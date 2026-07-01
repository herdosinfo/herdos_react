import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '../../../lib/gsap'
import heroVideo from '../../../assets/herovideo.mp4'
import heroImage from '../../../assets/hero.png'

/* ------------------------------------------------------------------ */
/* Icons                                                                 */
/* ------------------------------------------------------------------ */
const ICON = {
  arrow: (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="hero-btn-arrow">
      <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
    </svg>
  ),
  play: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="hero-btn-play">
      <path d="M8 5v14l11-7z" />
    </svg>
  ),
  chevDown: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="hero-scroll-arrow">
      <path d="M6 9l6 6 6-6" />
    </svg>
  ),
}

/* ------------------------------------------------------------------ */
/* Trust strip items                                                     */
/* ------------------------------------------------------------------ */
const TRUST = [
  { icon: '☀', label: 'Solar Powered' },
  { icon: '🛡', label: 'Virtual Fencing' },
  { icon: '🩺', label: 'Early Illness Detection' },
  { icon: '📱', label: 'App Connected' },
  { icon: '🐑', label: 'Sheep & Goat Specialist' },
]

/* ------------------------------------------------------------------ */
/* Timeline layout constants (in GSAP timeline "duration units")        */
/* ------------------------------------------------------------------ */
// Total pinned scroll is +=190% vh
// GSAP scrub timeline total duration units = 18 (arbitrary, maps to physical scroll)
// Breakdown:
//   0.0 → 7.0  : video scrub segment (video.duration scrubbed over this span)
//   7.0 → 8.5  : crossfade: video → hero.png (opacity blend + scale settle + blur)
//   8.5 label  : 'imageSettled'
//   8.5 → 18.0 : marketing content reveals (re-timed from existing animations)

const TOTAL_DURATION = 18        // total timeline duration units
const VIDEO_START    = 0         // video scrub starts
const VIDEO_END      = 7.0       // video scrub ends / crossfade begins
const XFADE_END      = 8.5       // crossfade ends / image settled
const LABEL          = 'imageSettled' // timeline label after crossfade

// Tagline/scroll indicator exit (early, same relative feel as before)
const TAGLINE_SCROLL_DUR = 0.8
const TAGLINE_DUR        = 1.5

/* ------------------------------------------------------------------ */
/* Component                                                             */
/* ------------------------------------------------------------------ */
export default function HeroSection() {
  const shellRef       = useRef(null)
  const containerRef   = useRef(null)
  const videoRef       = useRef(null)
  const heroImageRef   = useRef(null)
  const taglineRef     = useRef(null)
  const taglineScrollRef = useRef(null)

  useGSAP(() => {
    const shell          = shellRef.current
    const container      = containerRef.current
    const video          = videoRef.current
    const heroImg        = heroImageRef.current
    const tagline        = taglineRef.current
    const taglineScroll  = taglineScrollRef.current

    if (!shell || !container || !video || !heroImg || !tagline || !taglineScroll) return

    // ------------------------------------------------------------------
    // Initial state — establish starting positions before any scroll
    // ------------------------------------------------------------------
    gsap.set(tagline,       { opacity: 1, y: 0 })
    gsap.set(taglineScroll, { opacity: 1, y: 0 })
    gsap.set(video,         { scale: 1.0, y: 0, opacity: 1 })
    gsap.set(heroImg,       { opacity: 0, scale: 1.05 })

    // Marketing content — hidden until after image settled
    gsap.set('.hero-eyebrow',    { opacity: 0, y: 20 })
    gsap.set('.hero-word',       { y: '115%' })        // inside overflow:hidden mask
    gsap.set('.hero-desc',       { opacity: 0, y: 20 })
    gsap.set('.hero-cta-btn',    { opacity: 0, y: 20, scale: 0.92 })
    gsap.set('.hero-trust-item', { opacity: 0, y: 15 })

    // ------------------------------------------------------------------
    // Build master timeline — pinned to container, scrub 0.5
    // Total pinned distance: +=190% vh (short, intentional)
    // ------------------------------------------------------------------
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: shell,
        start: 'top top',
        end: '+=190%',
        pin: container,
        pinSpacing: true,
        scrub: 0.5,
      }
    })

    // ------------------------------------------------------------------
    // SEGMENT 1 — Early exit: scroll cue & center tagline (0 → ~1.5 du)
    // Clears screen early so cinematic video can breathe unobstructed
    // ------------------------------------------------------------------

    // Scroll indicator fades out immediately (0 → 0.8)
    tl.to(taglineScroll, {
      opacity: 0,
      y: -12,
      duration: TAGLINE_SCROLL_DUR,
      ease: 'power1.out',
    }, 0)

    // Center tagline moves up and disappears (0 → 1.5)
    tl.to(tagline, {
      opacity: 0,
      y: -35,
      duration: TAGLINE_DUR,
      ease: 'power1.inOut',
    }, 0)

    // ------------------------------------------------------------------
    // SEGMENT 2 — Video scrub (VIDEO_START → VIDEO_END)
    // Drive video.currentTime via proxy tween — the Apple/Starlink pattern
    // ------------------------------------------------------------------

    // Atmospheric Ken Burns: video scale/parallax during scrub segment
    // Keep subtle so it doesn't fight the frame-scrub visual
    tl.to(video, {
      scale: 1.08,
      y: -30,
      ease: 'none',
      duration: VIDEO_END - VIDEO_START,
    }, VIDEO_START)

    // Proxy object — tween its .time property and push to video.currentTime
    // This is the standard performant GSAP scroll-scrub pattern for HTML5 video
    const videoProxy = { time: 0 }

    const buildVideoScrub = (duration) => {
      tl.to(videoProxy, {
        time: duration,
        ease: 'none',
        duration: VIDEO_END - VIDEO_START,
        onUpdate() {
          // Guard: only seek if video has buffered data (HAVE_CURRENT_DATA or higher)
          if (video.readyState >= 2) {
            // Epsilon skip: skip tiny sub-frame updates to reduce seek cost on slow devices
            const next = videoProxy.time
            const delta = Math.abs(next - (video.currentTime || 0))
            if (delta > 0.016) {  // ~1 frame at 60fps — skip nothing smaller
              video.currentTime = next
            }
          }
        },
      }, VIDEO_START)
    }

    // Build scrub immediately if metadata is already loaded
    if (video.readyState >= 1 && video.duration > 0) {
      buildVideoScrub(video.duration)
    } else {
      // Defer until loadedmetadata fires — attach & auto-clean inside useGSAP context
      const onMeta = () => {
        buildVideoScrub(video.duration)
        // Refresh ScrollTrigger layout after tween added to live timeline
        ScrollTrigger.refresh()
      }
      video.addEventListener('loadedmetadata', onMeta, { once: true })
      // Note: useGSAP's scope-based cleanup handles the GSAP context;
      // { once: true } guarantees the listener self-removes after firing
    }

    // ------------------------------------------------------------------
    // SEGMENT 3 — Crossfade: video → hero.png  (VIDEO_END → XFADE_END)
    // Premium dissolve: opacity blend + subtle scale settle + blur
    // ------------------------------------------------------------------

    const XFADE_DUR = XFADE_END - VIDEO_END   // 1.5 duration units

    // Fade video out (opacity 1 → 0)
    tl.to(video, {
      opacity: 0,
      ease: 'power2.inOut',
      duration: XFADE_DUR,
    }, VIDEO_END)

    // Fade hero image in with subtle scale settle and blur dissolve
    // (opacity 0→1, scale 1.05→1.0, filter blur 6px→0)
    tl.to(heroImg, {
      opacity: 1,
      scale: 1.0,
      filter: 'blur(0px)',
      ease: 'power2.out',
      duration: XFADE_DUR,
    }, VIDEO_END)

    // Set initial blur on the image for the dissolve effect
    // (done here so it's live on the element in sync with the tween start)
    gsap.set(heroImg, { filter: 'blur(6px)' })

    // Anchor label: marketing content reveals begin only after this point
    tl.addLabel(LABEL, XFADE_END)

    // ------------------------------------------------------------------
    // SEGMENT 4 — Marketing content reveals (after LABEL)
    // Exact existing animation style preserved — only timeline positions changed
    // Relative spacing between reveals maintained, shifted to start from LABEL
    // ------------------------------------------------------------------

    // Eyebrow badge fades in  (imageSettled + 0.2 → +1.0)
    tl.to('.hero-eyebrow', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
    }, `${LABEL}+=0.2`)

    // Headline Line 1 — word-by-word mask reveal  (imageSettled + 0.8 → +1.7)
    const line1Words = gsap.utils.toArray('.hero-word-line1')
    tl.to(line1Words, {
      y: '0%',
      stagger: 0.1,
      duration: 0.9,
      ease: 'power3.out',
    }, `${LABEL}+=0.8`)

    // Headline Line 2 — word-by-word mask reveal  (imageSettled + 1.8 → +2.7)
    const line2Words = gsap.utils.toArray('.hero-word-line2')
    tl.to(line2Words, {
      y: '0%',
      stagger: 0.1,
      duration: 0.9,
      ease: 'power3.out',
    }, `${LABEL}+=1.8`)

    // Description fades in  (imageSettled + 2.8 → +3.8)
    tl.to('.hero-desc', {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: 'power2.out',
    }, `${LABEL}+=2.8`)

    // CTA buttons scale & fade in  (imageSettled + 3.6 → +4.6)
    tl.to('.hero-cta-btn', {
      opacity: 1,
      y: 0,
      scale: 1,
      stagger: 0.12,
      duration: 1.0,
      ease: 'back.out(1.2)',
    }, `${LABEL}+=3.6`)

    // Trust strip items stagger in  (imageSettled + 4.4 → +5.3)
    const trustItems = gsap.utils.toArray('.hero-trust-item')
    tl.to(trustItems, {
      opacity: 1,
      y: 0,
      stagger: 0.08,
      duration: 0.9,
      ease: 'power2.out',
    }, `${LABEL}+=4.4`)

  }, { scope: shellRef })

  return (
    <section ref={shellRef} className="hero-shell" aria-label="HERDOS Hero">
      <div ref={containerRef} className="hero-container">
        {/* Layer 1: Background media — video (scrub-controlled) + image (crossfade target) */}
        <div className="hero-bg-wrap">
          {/* Scroll-scrubbed video — no autoPlay, no loop; currentTime driven by GSAP proxy */}
          <video
            ref={videoRef}
            className="hero-bg-video"
            src={heroVideo}
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
          />
          {/* Hero image — initially invisible, crossfades in when video reaches final frame */}
          <img
            ref={heroImageRef}
            src={heroImage}
            className="hero-bg-image"
            alt=""
            aria-hidden="true"
          />
        </div>

        {/* Layer 2: Gradient overlay */}
        <div className="hero-overlay" aria-hidden="true" />

        {/* Layer 3: Vignette */}
        <div className="hero-vignette" aria-hidden="true" />

        {/* Layer 4: Initial Cinematic Center Tagline */}
        <div ref={taglineRef} className="hero-center-tagline">
          <div className="hero-tagline-brand">
            <img src="/assets/white-logo.svg" alt="" aria-hidden="true" className="hero-tagline-logo" />
            <span className="hero-tagline-wordmark">HERDOS</span>
          </div>
          <p className="hero-tagline-text">
            India's First AI Smart Collar<br />
            for Sheep &amp; Goats
          </p>
          <motion.div
            ref={taglineScrollRef}
            className="hero-tagline-scroll"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            {ICON.chevDown}
            <span>SCROLL</span>
          </motion.div>
        </div>

        {/* Layer 5: Main Hero Content (Progressively Revealed on Scroll) */}
        <div className="hero-content">
          <div className="container">
            <div className="hero-text-block">
              {/* Eyebrow */}
              <div className="hero-eyebrow">
                <span className="hero-eyebrow-dot" aria-hidden="true" />
                India's First Smart Collar System for Sheep &amp; Goats
              </div>

              {/* Headline with mask container */}
              <h1 className="hero-h1">
                <span className="hero-word-line">
                  <span className="hero-word hero-word-line1">One</span>{' '}
                  <span className="hero-word hero-word-line1">Smart</span>{' '}
                  <span className="hero-word hero-word-line1">Collar.</span>
                </span>
                <span className="hero-word-line">
                  <span className="hero-word hero-word-line2 hero-word--accent">Infinite</span>{' '}
                  <span className="hero-word hero-word-line2 hero-word--accent">Possibilities.</span>
                </span>
              </h1>

              {/* Description */}
              <p className="hero-desc">
                HERDOS smart collars bring AI-powered virtual fencing and real-time
                health monitoring to India's 223 million sheep and goat population —
                solar-powered, app-connected, and built for the field.
              </p>

              {/* CTAs */}
              <div className="hero-ctas">
                <Link
                  to="/contact/"
                  className="hero-cta-btn hero-cta-primary"
                  id="hero-cta-demo"
                >
                  Request a Demo {ICON.arrow}
                </Link>
                <a
                  href="#how"
                  className="hero-cta-btn hero-cta-ghost"
                  id="hero-cta-watch"
                >
                  {ICON.play} Watch How It Works
                </a>
              </div>

              {/* Trust strip */}
              <div className="hero-trust-strip" role="list" aria-label="Key features">
                {TRUST.map((item, i) => (
                  <span key={item.label} className="hero-trust-item" role="listitem">
                    {i > 0 && <span className="hero-trust-sep" aria-hidden="true">·</span>}
                    <span className="hero-trust-icon" aria-hidden="true">{item.icon}</span>
                    {item.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
