import { Link } from 'react-router-dom'
import Reveal from '../components/common/Reveal'
import FinalCTA from '../components/common/FinalCTA'

const ICON = {
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  sat: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <path d="M13 7 9 3 5 7l4 4M17 11l4 4-4 4-4-4M8 12l4 4M16 8l3-3M9 21a6 6 0 0 0-6-6" />
    </svg>
  ),
  cell: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <path d="M2 20h.01M7 20v-4M12 20v-8M17 20V8M22 4v16" />
    </svg>
  ),
  lora: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <path d="M2 6c2.5-2 4.5-2 7 0s4.5 2 7 0 4.5-2 6 0M2 12c2.5-2 4.5-2 7 0s4.5 2 7 0 4.5-2 6 0M2 18c2.5-2 4.5-2 7 0s4.5 2 7 0 4.5-2 6 0" />
    </svg>
  ),
}

export default function TechnologyPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="subhero subhero--center hero">
        <div className="container" style={{ maxWidth: '760px' }}>
          <Reveal>
            <span className="breadcrumb">Technology</span>
            <h1 className="t-display">Five technologies. One intelligent platform.</h1>
            <p>Intelligence, sensing, the app, connectivity and cloud — engineered to keep working across the realities of Indian grazing land.</p>
          </Reveal>
        </div>
      </section>

      {/* 1. Intelligence */}
      <section className="section" id="intelligence">
        <div className="container">
          <Reveal className="split">
            <div className="split-media">
              <img src="/media/collar-detail.png" alt="HERDOS Intelligence engine" />
            </div>
            <div className="split-text">
              <span className="pill pill--gold">
                <span className="dot"></span> Patent Pending — HERDOS Intelligence
              </span>
              <h2 className="t-h3" style={{ marginTop: '1rem' }}>
                HERDOS Intelligence — the decision engine.
              </h2>
              <p className="t-lead">
                One layer combining virtual-fencing intelligence and early-illness intelligence, built
                around how sheep and goats actually behave.
              </p>
              <ul className="checks two">
                <li>{ICON.check} Progressive guidance: call → vibration → pulse</li>
                <li>{ICON.check} Panic detection & exclusion zones</li>
                <li>{ICON.check} Return-to-paddock & bad-paddock alerts</li>
                <li>{ICON.check} Behavioural pattern analysis</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. Smart Collar */}
      <section className="section section--sage" id="collar">
        <div className="container">
          <Reveal className="split flip">
            <div className="split-media">
              <img src="/media/collar-solar.png" alt="HERDOS smart collar" />
            </div>
            <div className="split-text">
              <span className="pill pill--gold">
                <span className="dot"></span> Patent Pending — Smart Collar Design
              </span>
              <h2 className="t-h3" style={{ marginTop: '1rem' }}>
                Built for the field. Designed for the animal.
              </h2>
              <p className="t-lead">
                Lightweight, rugged and solar-assisted — engineered for the anatomy and movement
                of small ruminants.
              </p>
              <ul className="checks two">
                <li>{ICON.check} Weather-resistant, high-IP housing</li>
                <li>{ICON.check} MEMS jaw, posture, activity, temp</li>
                <li>{ICON.check} High-efficiency solar cells</li>
                <li>{ICON.check} Intelligent sleep/wake power</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. Mobile App */}
      <section className="section" id="app">
        <div className="container">
          <Reveal className="split">
            <div className="split-media">
              <img src="/media/app-dash.png" alt="HERDOS mobile app" />
            </div>
            <div className="split-text">
              <span className="eyebrow">Mobile Application</span>
              <h2 className="t-h3">Manage your herd from your pocket.</h2>
              <p className="t-lead">
                Designed for everyday farm use in five regional languages, with voice-assisted guidance.
              </p>
              <ul className="checks two">
                <li>{ICON.check} Live map with virtual zones</li>
                <li>{ICON.check} Exclusion-zone config</li>
                <li>{ICON.check} Real-time tracking + history</li>
                <li>{ICON.check} Early illness alerts</li>
                <li>{ICON.check} Find Animal mode</li>
                <li>{ICON.check} Hindi, Marathi, Tamil, Telugu, Kannada</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4. Connectivity */}
      <section className="section section--dark" id="connectivity">
        <div className="container">
          <Reveal className="shead">
            <span className="eyebrow">Connectivity</span>
            <h2 className="t-h2">Reliable from open pasture to remote hills.</h2>
          </Reveal>
          <div className="vp-grid">
            <Reveal className="vp-card" style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.10)' }}>
              <span className="vp-ico">{ICON.sat}</span>
              <h3 style={{ color: '#fff' }}>Satellite positioning</h3>
              <p style={{ color: 'rgba(245,245,245,0.72)' }}>
                Multi-constellation GNSS for accurate real-time location across open land.
              </p>
            </Reveal>
            <Reveal className="vp-card" style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.10)' }}>
              <span className="vp-ico">{ICON.cell}</span>
              <h3 style={{ color: '#fff' }}>NB-IoT</h3>
              <p style={{ color: 'rgba(245,245,245,0.72)' }}>
                Low-power wide-area cellular carries data wherever there's coverage.
              </p>
            </Reveal>
            <Reveal className="vp-card" style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.10)' }}>
              <span className="vp-ico">{ICON.lora}</span>
              <h3 style={{ color: '#fff' }}>LoRa private network</h3>
              <p style={{ color: 'rgba(245,245,245,0.72)' }}>
                A portable solar gateway builds your own long-range network where there's no signal.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 5. Cloud Platform */}
      <section className="section" id="cloud">
        <div className="container">
          <Reveal className="split">
            <div className="split-media">
              <img src="/media/app-map.png" alt="HERDOS cloud platform" />
            </div>
            <div className="split-text">
              <span className="eyebrow">Cloud Platform</span>
              <h2 className="t-h3">The data backbone.</h2>
              <p className="t-lead">
                The central layer that receives data from collars and gateways and keeps everything in sync.
              </p>
              <ul className="checks two">
                <li>{ICON.check} Real-time monitoring</li>
                <li>{ICON.check} Historical records</li>
                <li>{ICON.check} Alert generation</li>
                <li>{ICON.check} Remote device management</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Patent & IP */}
      <section className="section section--sage" id="ip">
        <div className="container">
          <Reveal className="shead center">
            <span className="eyebrow">Patent & IP</span>
            <h2 className="t-h2">Protected by design.</h2>
          </Reveal>
          <Reveal className="statrow" style={{ gridTemplateColumns: '1fr', maxWidth: '760px', marginInline: 'auto', textAlign: 'center' }}>
            <p className="t-lead">
              Patent filings are planned for <strong>HERDOS Intelligence</strong> — the unified
              virtual-fencing and early-illness platform — and for the <strong>HERDOS Smart Collar design</strong>
              , including its structural architecture and small-ruminant wearable design.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <FinalCTA
        hasPill={false}
        headline="Want a deeper technical walkthrough?"
        lead="Talk to our engineering team about how HERDOS would deploy on your land."
        primaryLabel="Talk to our team"
        primaryTo="/contact/"
        hasSecondary={false}
      />
    </>
  )
}
