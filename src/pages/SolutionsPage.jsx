import { Link } from 'react-router-dom'
import Reveal from '../components/common/Reveal'
import FinalCTA from '../components/common/FinalCTA'

const ICON = {
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
}

export default function SolutionsPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="subhero subhero--center hero">
        <div className="container" style={{ maxWidth: '760px' }}>
          <Reveal>
            <span className="breadcrumb">Solutions</span>
            <h1 className="t-display">One collar. Four problems solved.</h1>
            <p>
              HERDOS tackles the four things that cost small-ruminant farmers the most — labour,
              illness, fencing and theft — with a single device on the animal's neck.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 1. Reduce Herding Cost */}
      <section className="section" id="herding">
        <div className="container">
          <Reveal className="split">
            <div className="split-media">
              <img src="/media/field.jpg" alt="Open grazing without constant supervision" />
            </div>
            <div className="split-text">
              <span className="eyebrow">01 — Reduce herding cost</span>
              <h2 className="t-h3">One herder, a much larger herd.</h2>
              <p className="t-lead">
                Virtual boundaries and live tracking remove the need for constant manual
                supervision and boundary checking.
              </p>
              <ul className="checks">
                <li>{ICON.check} No continuous grazing supervision</li>
                <li>{ICON.check} Cut labour cost per animal</li>
                <li>{ICON.check} Scale herd size without scaling labour</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. Early Illness Detection */}
      <section className="section section--sage" id="illness">
        <div className="container">
          <Reveal className="split flip">
            <div className="split-media">
              <img src="/media/collar-detail.png" alt="Illness detection sensors" />
            </div>
            <div className="split-text">
              <span className="eyebrow">02 — Early illness detection</span>
              <h2 className="t-h3">Catch illness hours to days early.</h2>
              <p className="t-lead">
                HERDOS spots abnormal rumination, posture and temperature before symptoms are
                visible — cutting treatment cost and mortality.
              </p>
              <ul className="checks">
                <li>{ICON.check} Early alerts before visible symptoms</li>
                <li>{ICON.check} Lower treatment cost</li>
                <li>{ICON.check} Reduce herd mortality</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. Virtual Fencing */}
      <section className="section" id="fencing">
        <div className="container">
          <Reveal className="split">
            <div className="split-media">
              <img src="/media/fencing.png" alt="Virtual fencing on a live map" />
            </div>
            <div className="split-text">
              <span className="eyebrow">03 — Virtual fencing</span>
              <h2 className="t-h3">Create, modify and shift paddocks in minutes.</h2>
              <p className="t-lead">
                No posts, no wire, no rebuilding fence lines — draw grazing zones on a map and move
                them whenever the land needs it.
              </p>
              <ul className="checks">
                <li>{ICON.check} Reshape zones in minutes</li>
                <li>{ICON.check} Save fencing capex & upkeep</li>
                <li>{ICON.check} Rotational grazing made easy</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4. Livestock Security */}
      <section className="section section--sage" id="security">
        <div className="container">
          <Reveal className="split flip">
            <div className="split-media">
              <img src="/media/field-square.jpg" alt="Livestock security and tracking" />
            </div>
            <div className="split-text">
              <span className="eyebrow">04 — Livestock security</span>
              <h2 className="t-h3">Track, protect and recover your animals.</h2>
              <p className="t-lead">
                Anti-tamper alerts, real-time tracking and exclusion zones keep animals safe from
                theft and off roads and railway tracks.
              </p>
              <ul className="checks">
                <li>{ICON.check} Anti-tamper & collar-removal alerts</li>
                <li>{ICON.check} Real-time GPS tracking</li>
                <li>{ICON.check} Exclusion zones for roads & rail</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Cards Preview Section */}
      <section className="section">
        <div className="container">
          <div className="vp-grid">
            <Reveal className="vp-card">
              <h3>See the device</h3>
              <p>The HERDOS smart collar — solar, rugged, sensor-rich.</p>
              <Link to="/technology/#collar" className="tlink">
                Smart Collar {ICON.arrow}
              </Link>
            </Reveal>
            <Reveal className="vp-card">
              <h3>See the app</h3>
              <p>Live map, alerts and find-animal mode in your pocket.</p>
              <Link to="/technology/#app" className="tlink">
                Mobile App {ICON.arrow}
              </Link>
            </Reveal>
            <Reveal className="vp-card">
              <h3>Calculate ROI</h3>
              <p>Estimate your savings per animal, per season.</p>
              <Link to="/goats/#roi" className="tlink">
                ROI calculator {ICON.arrow}
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <FinalCTA />
    </>
  )
}
