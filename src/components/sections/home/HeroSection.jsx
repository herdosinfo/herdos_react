import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../../lib/gsap'
import { useHeroParallax } from '../../../hooks'

const ICON = {
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
}

export default function HeroSection() {
  const containerRef = useRef(null)
  const { handleMouseMove, handleMouseLeave, imageStyle } = useHeroParallax()

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 0.9 } })

    tl.from('.hero-pill', { opacity: 0, y: 20, duration: 0.6 })
      .from('.hero h1', { opacity: 0, y: 36, duration: 1 }, '-=0.3')
      .from('.hero-sub', { opacity: 0, y: 24 }, '-=0.6')
      .from('.hero-cta', { opacity: 0, y: 20 }, '-=0.5')
      .from('.hero-trust', { opacity: 0, y: 16, stagger: 0.1 }, '-=0.4')
      .from('.hero-visual', { opacity: 0, x: 40, duration: 1 }, '-=1.2')
      .from('.hero-appcard', { opacity: 0, y: 30, scale: 0.96 }, '-=0.5')
  }, { scope: containerRef })

  return (
    <section
      ref={containerRef}
      className="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="container">
        <div className="hero-text">
          <span className="pill pill--ondark hero-pill">
            <span className="dot"></span> India's First Virtual Fencing for Small Ruminants
          </span>
          <h1 className="t-display">
            One Collar.<br />
            <span className="accent">Two Powerful Technologies.</span><br />
            <span className="accent-gold">Zero Maintenance.</span>
          </h1>
          <p className="hero-sub">
            HERDOS is an intelligent smart collar for sheep and goats — combining virtual fencing,
            early illness detection, and solar-powered, zero-maintenance operation in one device.
          </p>
          <div className="hero-cta">
            <Link to="/contact/" className="btn btn--primary btn--lg">
              Request a Pilot Demo
            </Link>
            <a href="#how" className="btn btn--ghostw btn--lg">
              See How It Works
            </a>
          </div>
          <div className="hero-trust">
            <div>
              {ICON.check} 223M+ animals addressable
            </div>
            <div>
              {ICON.check} Patent-pending IP
            </div>
            <div>
              {ICON.check} Solar-assisted · zero maintenance
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <motion.img
            className="hero-photo"
            src="/media/hero-goat.png"
            alt="HERDOS smart collar on a goat in a green field"
            style={imageStyle}
          />
          <div className="hero-appcard">
            <div className="ac-row">
              <span className="ac-pill">Live paddock</span>
            </div>
            <img className="ac-map" src="/media/app-map.png" alt="Live grazing map with virtual paddock" />
            <div className="ac-stat">
              14 / 14 <span>animals in zone</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
