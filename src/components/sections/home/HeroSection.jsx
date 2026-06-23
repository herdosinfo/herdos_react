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
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
  const overlayRef = useRef(null)
  const contentRef = useRef(null)
  const scrollCueRef = useRef(null)

  useGSAP(() => {
    const shell = shellRef.current
    const container = containerRef.current
    const video = videoRef.current
    const overlay = overlayRef.current
    const content = contentRef.current
    const scrollCue = scrollCueRef.current

    if (!shell || !container || !video || !overlay || !content) return

    // --- Initial State (gsap.set) ---
    // Hide content elements before scroll progress starts
    gsap.set([
      '.hero-eyebrow',
      '.hero-word',
      '.hero-desc',
      '.hero-cta-btn',
      '.hero-trust-item'
    ], { opacity: 0 })

    gsap.set([
      '.hero-eyebrow',
      '.hero-desc',
      '.hero-cta-btn',
      '.hero-trust-item'
    ], { y: 20 })

    gsap.set('.hero-word', { y: 40 })
    gsap.set(scrollCue, { opacity: 1 })

    // --- Scrubbed Scroll Animation ---
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: shell,
        start: 'top top',
        end: '+=200%',
        pin: container,
        pinSpacing: true,
        scrub: 0.5,
      }
    })

    // Fade out scroll cue early
    tl.to(scrollCue, { opacity: 0, duration: 0.8, ease: 'power1.out' }, 0)

    // Parallax background video across the entire timeline
    tl.to(video, { y: -80, ease: 'none', duration: 10 }, 0)

    // Eyebrow badge
    tl.to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 0.8)

    // H1 Line 1 words
    const line1Words = gsap.utils.toArray('.hero-word-line1')
    tl.to(line1Words, {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power2.out'
    }, 1.5)

    // H1 Line 2 words
    const line2Words = gsap.utils.toArray('.hero-word-line2')
    tl.to(line2Words, {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power2.out'
    }, 2.8)

    // Description
    tl.to('.hero-desc', { opacity: 1, y: 0, duration: 1.3, ease: 'power2.out' }, 4.2)

    // CTAs
    tl.to('.hero-cta-btn', {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 1.3,
      ease: 'power2.out'
    }, 5.5)

    // Trust items
    const trustItems = gsap.utils.toArray('.hero-trust-item')
    tl.to(trustItems, {
      opacity: 1,
      y: 0,
      stagger: 0.12,
      duration: 1.2,
      ease: 'power2.out'
    }, 6.8)
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
        <div ref={overlayRef} className="hero-overlay" aria-hidden="true" />

        {/* Layer 3: Vignette */}
        <div className="hero-vignette" aria-hidden="true" />

        {/* Layer 4: Content */}
        <div ref={contentRef} className="hero-content">
          <div className="container">
            <div className="hero-text-block">
              {/* Eyebrow */}
              <div className="hero-eyebrow">
                <span className="hero-eyebrow-dot" aria-hidden="true" />
                India's First Smart Collar System for Sheep &amp; Goats
              </div>

              {/* Headline */}
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

        {/* Scroll cue */}
        <motion.div
          ref={scrollCueRef}
          className="hero-scroll-cue"
          animate={{ y: [0, 9, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          {ICON.chevDown}
          <span>Scroll</span>
        </motion.div>
      </div>
    </section>
  )
}

