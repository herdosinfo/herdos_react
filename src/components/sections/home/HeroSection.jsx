import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import heroVideo from '../../../assets/herovideo.mp4'
import heroImage from '../../../assets/hero.png'
import HeroAssetLoader from './hero/HeroAssetLoader'
import HeroScrollController from './hero/HeroScrollController'

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
  const shellRef         = useRef(null)
  const containerRef     = useRef(null)
  const videoRef         = useRef(null)
  const heroImageRef     = useRef(null)
  const taglineRef       = useRef(null)
  const taglineScrollRef = useRef(null)

  useEffect(() => {
    let loader = null
    let scrollController = null

    const startPipeline = () => {
      const video = videoRef.current
      const heroImg = heroImageRef.current

      if (!video || !heroImg) return

      // Instantiate Loader (Controller 1)
      loader = new HeroAssetLoader({
        video,
        image: heroImg,
        onReady: (bounds) => {
          // Once assets are loaded & ready, instantiate Scroll Controller (Controller 2)
          scrollController = new HeroScrollController({
            shell: shellRef.current,
            container: containerRef.current,
            video,
            heroImg,
            tagline: taglineRef.current,
            taglineScroll: taglineScrollRef.current,
            videoDuration: bounds.videoDuration,
            onReady: () => {
              // Dispatch event to Lenis Controller (Controller 4)
              window.dispatchEvent(new CustomEvent('hero:ready'))

              // Unlock body/scrolling
              document.documentElement.style.overflow = ''
              document.documentElement.classList.remove('hero-loading')
              document.documentElement.classList.remove('layout-frozen')
            }
          })
          scrollController.init()
        }
      })
      loader.load()
    }

    startPipeline()

    return () => {
      if (loader) {
        loader.cancel()
        loader = null
      }
      if (scrollController) {
        scrollController.destroy()
        scrollController = null
      }
      // Guarantee scrolling is restored on unmount
      document.documentElement.style.overflow = ''
      document.documentElement.classList.remove('hero-loading')
      document.documentElement.classList.remove('layout-frozen')
    }
  }, [])

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
