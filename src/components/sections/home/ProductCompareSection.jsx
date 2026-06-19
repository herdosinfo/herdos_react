import { Link } from 'react-router-dom'
import Reveal from '../../common/Reveal'

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

export default function ProductCompareSection() {
  return (
    <section className="section" id="compare">
      <div className="container">
        <Reveal className="shead center">
          <span className="eyebrow">Built for both</span>
          <h2 className="t-h2">Built for both. Tuned for each.</h2>
        </Reveal>

        <div className="cmp-grid">
          {/* Goats Card */}
          <Reveal className="cmp-card">
            <div className="cmp-photo">
              <img src="/media/goat.png" alt="HERDOS for goats" />
              <span className="pill pill--gold">
                <span className="dot"></span> For Goats
              </span>
            </div>
            <div className="cmp-body">
              <h3>HERDOS for Goats</h3>
              <ul>
                <li>{ICON.check} Anti-climb fencing logic for curious browsers</li>
                <li>{ICON.check} Posture thresholds tuned for browsing behaviour</li>
                <li>{ICON.check} Ergonomics for goat neck anatomy</li>
                <li>{ICON.check} Multi-breed: Boer, Sirohi, Osmanabadi, Beetal</li>
              </ul>
              <Link to="/goats/" className="tlink">
                Explore HERDOS for Goats {ICON.arrow}
              </Link>
            </div>
          </Reveal>

          {/* Sheep Card */}
          <Reveal className="cmp-card">
            <div className="cmp-photo">
              <img src="/media/sheep.png" alt="HERDOS for sheep" />
              <span className="pill pill--gold">
                <span className="dot"></span> For Sheep
              </span>
            </div>
            <div className="cmp-body">
              <h3>HERDOS for Sheep</h3>
              <ul>
                <li>{ICON.check} Flock-aware grouping & cohesion logic</li>
                <li>{ICON.check} Thresholds tuned for grazing flocks</li>
                <li>{ICON.check} Wool-safe collar fit</li>
                <li>{ICON.check} Multi-breed: Deccani, Nellore, Marwari</li>
              </ul>
              <Link to="/sheep/" className="tlink">
                Explore HERDOS for Sheep {ICON.arrow}
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
