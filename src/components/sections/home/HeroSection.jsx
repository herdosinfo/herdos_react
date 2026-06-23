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
  const sectionRef  = useRef(null)
  const videoRef    = useRef(null)
  const overlayRef  = useRef(null)
  const contentRef  = useRef(null)
  const scrollCueRef = useRef(null)

  /* ---- Entrance + scroll animations ---- */
  useGSAP(() => {
    const section  = sectionRef.current
    const video    = videoRef.current
    const overlay  = overlayRef.current
    const content  = contentRef.current
    const scrollCue = scrollCueRef.current

    if (!section) return

    // --- Entrance sequence ---
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.from(video,   { opacity: 0, duration: 1.4 }, 0)
      .from(overlay, { opacity: 0, duration: 1.0 }, 0.2)
      .from('.hero-eyebrow',    { opacity: 0, y: 22, duration: 0.7 }, 0.6)
      .from('.hero-h1-line',    { opacity: 0, y: 34, duration: 0.8, stagger: 0.13 }, 0.82)
      .from('.hero-desc',       { opacity: 0, y: 22, duration: 0.6 }, 1.2)
      .from('.hero-cta-btn',    { opacity: 0, y: 16, duration: 0.55, stagger: 0.1 }, 1.45)
      .from('.hero-trust-item', { opacity: 0, y: 10, duration: 0.5,  stagger: 0.08 }, 1.65)
      .from(scrollCue, { opacity: 0, duration: 0.5 }, 2.1)

    // --- Scroll fade-out on hero content (0 → 30% scroll through hero) ---
    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '30% top',
      onUpdate: (self) => {
        if (content) {
          gsap.set(content, { opacity: Math.max(0, 1 - self.progress * 2.0) })
        }
        if (scrollCue) {
          gsap.set(scrollCue, { opacity: Math.max(0, 1 - self.progress * 4) })
        }
      },
    })

    // --- Subtle parallax on background ---
    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom top',
      onUpdate: (self) => {
        if (video) {
          gsap.set(video, { y: self.progress * -60 })
        }
      },
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="hero-cinema"
      aria-label="HERDOS Hero"
    >
      {/* ── Layer 1: Background video ── */}
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

      {/* ── Layer 2: Gradient overlay ── */}
      <div ref={overlayRef} className="hero-overlay" aria-hidden="true" />

      {/* ── Layer 3: Content ── */}
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
              <span className="hero-h1-line">One Smart Collar.</span>
              <span className="hero-h1-line hero-h1-accent">Two Powerful Technologies.</span>
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

      {/* ── Scroll cue ── */}
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
    </section>
  )
}
