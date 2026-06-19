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
  intel: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <path d="M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  browse: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <path d="M3 12h4l3 8 4-16 3 8h4" />
    </svg>
  ),
  flock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
}

export default function GoatsPage() {
  return (
    <>
      {/* Subhero */}
      <section className="subhero subhero--media hero">
        <div className="container">
          <Reveal>
            <span className="breadcrumb">For Goats</span>
            <h1 className="t-display">Built for the way goats move, browse and graze.</h1>
            <p>
              Goats are curious, agile climbers with their own herd dynamics. HERDOS tunes its
              fencing, sensors and alerts to goat behaviour — so boundaries hold, illness is caught
              early, and your herd stays safe.
            </p>
            <div className="hero-cta">
              <Link to="/contact/" className="btn btn--primary btn--lg">
                Get HERDOS for your herd
              </Link>
              <a href="#roi" className="btn btn--ghostw btn--lg">
                Calculate your savings
              </a>
            </div>
          </Reveal>
          <Reveal className="subhero-media">
            <img src="/media/hero-goat.png" alt="HERDOS collar on a goat" />
          </Reveal>
        </div>
      </section>

      {/* Why goats need HERDOS */}
      <section className="section" id="features">
        <div className="container">
          <Reveal className="shead center">
            <span className="eyebrow">Why goats need HERDOS</span>
            <h2 className="t-h2">Smarter animals need smarter boundaries.</h2>
          </Reveal>
          <div className="vp-grid">
            <Reveal className="vp-card">
              <span className="vp-ico">{ICON.intel}</span>
              <h3>Higher intelligence</h3>
              <p>
                Goats test fences and find gaps. HERDOS uses progressive guidance so they learn
                boundaries instead of pushing through them.
              </p>
            </Reveal>
            <Reveal className="vp-card">
              <span className="vp-ico">{ICON.browse}</span>
              <h3>Browsing behaviour</h3>
              <p>
                Goats browse heads-up, not just graze heads-down. Posture and rumination thresholds
                are tuned for that browsing pattern.
              </p>
            </Reveal>
            <Reveal className="vp-card">
              <span className="vp-ico">{ICON.flock}</span>
              <h3>Flock dynamics</h3>
              <p>
                Goats move as a group with leaders. Flock-aware grouping keeps the whole herd
                inside the zone, not just individuals.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Goat Specific Features */}
      <section className="section section--sage">
        <div className="container">
          <Reveal className="split">
            <div className="split-media">
              <img src="/media/goat.png" alt="Goat wearing HERDOS collar" />
            </div>
            <div className="split-text">
              <span className="eyebrow">Goat-specific features</span>
              <h2 className="t-h3">Tuned to goat anatomy and behaviour.</h2>
              <ul className="checks two">
                <li>{ICON.check} Anti-climb fencing logic</li>
                <li>{ICON.check} Lighter pulse for browsers</li>
                <li>{ICON.check} Goat-neck collar ergonomics</li>
                <li>{ICON.check} Heat-stress thresholds for Indian summers</li>
                <li>{ICON.check} Boer · Sirohi · Osmanabadi</li>
                <li>{ICON.check} Barbari · Beetal · Jamnapari</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ROI Calculator */}
      <ROICalculator
        type="goats"
        minHerd={10}
        maxHerd={2000}
        defaultHerd={100}
        stepHerd={10}
      />

      {/* Final CTA */}
      <FinalCTA
        headline="Start your goat pilot."
        lead="Tell us about your herd and we'll set up a walkthrough within 48 hours."
      />
    </>
  )
}
