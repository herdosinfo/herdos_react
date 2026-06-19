import { Link } from 'react-router-dom'
import Reveal from '../../common/Reveal'

const ICONS = {
  fencing: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <path d="M4 3v18M9 3v18M14 3v18M19 3v18M2 8h20M2 14h20" />
    </svg>
  ),
  illness: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  maintenance: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
}

export default function ValuePropSection() {
  return (
    <section className="section" id="value">
      <div className="container">
        <Reveal className="shead center">
          <span className="eyebrow">Why HERDOS</span>
          <h2 className="t-h2">Farm the way you've always wanted.</h2>
        </Reveal>

        <div className="vp-grid">
          <Reveal className="vp-card">
            <span className="vp-ico">{ICONS.fencing}</span>
            <h3>Virtual Fencing</h3>
            <p>
              Draw grazing zones in the app. Animals learn invisible boundaries through a
              progressive 3-stage alert — sound, vibration, then a safe mild pulse.
            </p>
            <Link to="/solutions/#fencing" className="tlink">
              Learn more {ICONS.arrow}
            </Link>
          </Reveal>

          <Reveal className="vp-card">
            <span className="vp-ico">{ICONS.illness}</span>
            <h3>Early Illness Detection</h3>
            <p>
              Precision MEMS sensors monitor jaw movement, posture and temperature. Get alerts
              before symptoms are visible — and before treatment gets costly.
            </p>
            <Link to="/solutions/#illness" className="tlink">
              Learn more {ICONS.arrow}
            </Link>
          </Reveal>

          <Reveal className="vp-card">
            <span className="vp-ico">{ICONS.maintenance}</span>
            <h3>Near-Zero Maintenance</h3>
            <p>
              Solar-assisted charging and intelligent sleep/wake power management keep collars
              running through long grazing days, season after season.
            </p>
            <Link to="/technology/#collar" className="tlink">
              Learn more {ICONS.arrow}
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
