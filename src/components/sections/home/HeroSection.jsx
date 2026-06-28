import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '../../../lib/gsap'

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
/* Component                                                             */
/* ------------------------------------------------------------------ */
export default function HeroSection() {
  const shellRef = useRef(null)
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const taglineRef = useRef(null)
  const taglineScrollRef = useRef(null)

  useGSAP(() => {
    const shell = shellRef.current
    const container = containerRef.current
    const video = videoRef.current
    const tagline = taglineRef.current
    const taglineScroll = taglineScrollRef.current

    if (!shell || !container || !video || !tagline || !taglineScroll) return

    // --- Initial State Configuration (0% / Initial Load) ---
    // Display ONLY: background, navbar, center tagline, scroll indicator
    gsap.set(tagline, { opacity: 1, y: 0 })
    gsap.set(taglineScroll, { opacity: 1, y: 0 })
    gsap.set(video, { scale: 1.0, y: 0 })

    // Hide marketing hero content until scrolled
    gsap.set('.hero-eyebrow', { opacity: 0, y: 20 })
    gsap.set('.hero-word', { y: '115%' }) // Offscreen inside overflow:hidden mask
    gsap.set('.hero-desc', { opacity: 0, y: 20 })
    gsap.set('.hero-cta-btn', { opacity: 0, y: 20, scale: 0.92 })
    gsap.set('.hero-trust-item', { opacity: 0, y: 15 })

    // --- GSAP ScrollTrigger Story Timeline ---
    // Pinned scroll distance reduced to 180% of viewport height for rapid but cinematic pacing
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: shell,
        start: 'top top',
        end: '+=180%',
        pin: container,
        pinSpacing: true,
        scrub: 0.5, // Ultra-responsive scroll tracking
      }
    })

    // 0% - 100%: Atmospheric background video zoom & parallax movement
    tl.to(video, {
      scale: 1.12,
      y: -40,
      ease: 'none',
      duration: 10
    }, 0)

    // 0% - 8% (0.0 to 0.8): Scroll indicator begins fading naturally
    tl.to(taglineScroll, {
      opacity: 0,
      y: -12,
      duration: 0.8,
      ease: 'power1.out'
    }, 0)

    // 0% - 15% (0.0 to 1.5): Center tagline moves upward and disappears completely
    tl.to(tagline, {
      opacity: 0,
      y: -35,
      duration: 1.5,
      ease: 'power1.inOut'
    }, 0)

    // 15% - 23% (1.5 to 2.3): Hero badge (eyebrow) fades in
    tl.to('.hero-eyebrow', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, 1.5)

    // 20% - 32% (2.0 to 3.2): Headline Line 1 word-by-word mask reveal ("One Smart Collar.")
    const line1Words = gsap.utils.toArray('.hero-word-line1')
    tl.to(line1Words, {
      y: '0%',
      stagger: 0.1,
      duration: 0.9,
      ease: 'power3.out'
    }, 2.0)

    // 30% - 42% (3.0 to 4.2): Headline Line 2 word-by-word mask reveal ("Infinite Possibilities.")
    const line2Words = gsap.utils.toArray('.hero-word-line2')
    tl.to(line2Words, {
      y: '0%',
      stagger: 0.1,
      duration: 0.9,
      ease: 'power3.out'
    }, 3.0)

    // 40% - 52% (4.0 to 5.2): Description fades in with smooth upward motion
    tl.to('.hero-desc', {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: 'power2.out'
    }, 4.0)

    // 48% - 60% (4.8 to 6.0): CTA buttons scale and fade in
    tl.to('.hero-cta-btn', {
      opacity: 1,
      y: 0,
      scale: 1,
      stagger: 0.12,
      duration: 1.0,
      ease: 'back.out(1.2)'
    }, 4.8)

    // 56% - 68% (5.6 to 6.8): Subtle trust indicators appear sequentially
    const trustItems = gsap.utils.toArray('.hero-trust-item')
    tl.to(trustItems, {
      opacity: 1,
      y: 0,
      stagger: 0.08,
      duration: 0.9,
      ease: 'power2.out'
    }, 5.6)

  }, { scope: shellRef })

  return (
    <section ref={shellRef} className="hero-shell" aria-label="HERDOS Hero">
      <div ref={containerRef} className="hero-container">
        {/* Layer 1: Background video */}
        <div className="hero-bg-wrap">
          <video
            ref={videoRef}
            className="hero-bg-video"
            src="/media/goat-wearing-herdos.mp4"
            poster="/media/field.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
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
