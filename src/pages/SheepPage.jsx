import { Link } from 'react-router-dom'
import Reveal from '../components/common/Reveal'
import ROICalculator from '../components/common/ROICalculator'
import FinalCTA from '../components/common/FinalCTA'

const ICON = {
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  flock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  browse: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <path d="M3 12h4l3 8 4-16 3 8h4" />
    </svg>
  ),
  predator: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
}

export default function SheepPage() {
  return (
    <>
      {/* Subhero */}
      <section className="subhero subhero--media hero">
        <div className="container">
          <Reveal>
            <span className="breadcrumb">For Sheep</span>
            <h1 className="t-display">Built for grazing flocks that move as one.</h1>
            <p>
              Sheep graze heads-down and move as a tight flock. HERDOS uses flock-cohesion logic
              and wool-safe collars so boundaries hold across the whole flock — and illness is caught
              before it spreads.
            </p>
            <div className="hero-cta">
              <Link to="/contact/" className="btn btn--primary btn--lg">
                Get HERDOS for your flock
              </Link>
              <a href="#roi" className="btn btn--ghostw btn--lg">
                Calculate your savings
              </a>
            </div>
          </Reveal>
          <Reveal className="subhero-media">
            <img src="/media/sheep.png" alt="HERDOS collar for sheep" />
          </Reveal>
        </div>
      </section>

      {/* Why sheep need HERDOS */}
      <section className="section" id="features">
        <div className="container">
          <Reveal className="shead center">
            <span className="eyebrow">Why sheep need HERDOS</span>
            <h2 className="t-h2">Manage the flock, not every animal.</h2>
          </Reveal>
          <div className="vp-grid">
            <Reveal className="vp-card">
              <span className="vp-ico">{ICON.flock}</span>
              <h3>Flock cohesion</h3>
              <p>
                Sheep follow the flock. HERDOS reads group movement so a few collars keep the whole
                flock inside the grazing zone.
              </p>
            </Reveal>
            <Reveal className="vp-card">
              <span className="vp-ico">{ICON.browse}</span>
              <h3>Grazing behaviour</h3>
              <p>
                Heads-down grazing has its own rumination and posture signature — thresholds are
                tuned for grazing flocks, not browsers.
              </p>
            </Reveal>
            <Reveal className="vp-card">
              <span className="vp-ico">{ICON.predator}</span>
              <h3>Predator & theft safety</h3>
              <p>
                Panic detection flags sudden scatter from dogs or theft attempts — and geofence
                alerts keep flocks off roads and rail lines.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Sheep Specific Features */}
      <section className="section section--sage">
        <div className="container">
          <Reveal className="split flip">
            <div className="split-media">
              <img src="/media/herd.webp" alt="Sheep flock grazing" />
            </div>
            <div className="split-text">
              <span className="eyebrow">Sheep-specific features</span>
              <h2 className="t-h3">Wool-safe, flock-aware, field-ready.</h2>
              <ul className="checks two">
                <li>{ICON.check} Flock-cohesion boundary logic</li>
                <li>{ICON.check} Wool-safe collar fit</li>
                <li>{ICON.check} Grazing-tuned thresholds</li>
                <li>{ICON.check} Exclusion zones for roads & rail</li>
                <li>{ICON.check} Deccani · Nellore · Marwari</li>
                <li>{ICON.check} Madras Red · Mandya</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ROI Calculator */}
      <ROICalculator
        type="sheep"
        minHerd={10}
        maxHerd={3000}
        defaultHerd={200}
        stepHerd={10}
      />

      {/* Final CTA */}
      <FinalCTA
        headline="Start your sheep pilot."
        lead="Tell us about your flock and we'll set up a walkthrough within 48 hours."
      />
    </>
  )
}
