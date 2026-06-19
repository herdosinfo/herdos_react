import { Link } from 'react-router-dom'
import Reveal from '../../common/Reveal'

const ICON = {
  arrow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
}

export default function BlogTeaserSection() {
  return (
    <section className="section section--sage" id="blog">
      <div className="container">
        <Reveal className="shead">
          <span className="eyebrow">From the field</span>
          <h2 className="t-h2">Notes from Indian pastures.</h2>
        </Reveal>

        <div className="blog-grid">
          <Reveal>
            <Link to="/resources/#blog" className="bcard">
              <div className="bcard-img">
                <img src="/media/collar-solar.png" alt="Solar collar article" />
              </div>
              <div className="bcard-body">
                <span className="bcard-cat">Technology</span>
                <h4>How solar harvesting gives a collar infinite battery life</h4>
                <p>Inside the power management that keeps HERDOS running through long grazing days.</p>
                <span className="bcard-meta">6 min read</span>
              </div>
            </Link>
          </Reveal>

          <Reveal>
            <Link to="/resources/#blog" className="bcard">
              <div className="bcard-img">
                <img src="/media/app-map.png" alt="Virtual fencing article" />
              </div>
              <div className="bcard-body">
                <span className="bcard-cat">Grazing Tips</span>
                <h4>Rotational grazing without a single physical fence</h4>
                <p>Using virtual paddocks to rest land and improve pasture recovery.</p>
                <span className="bcard-meta">5 min read</span>
              </div>
            </Link>
          </Reveal>

          <Reveal>
            <Link to="/resources/#blog" className="bcard">
              <div className="bcard-img">
                <img src="/media/collar-front.png" alt="Illness detection article" />
              </div>
              <div className="bcard-body">
                <span className="bcard-cat">Animal Health</span>
                <h4>Catching PPR early: detection thresholds in small ruminants</h4>
                <p>What rumination and temperature drift can tell you days before symptoms.</p>
                <span className="bcard-meta">7 min read</span>
              </div>
            </Link>
          </Reveal>
        </div>

        <Reveal style={{ marginTop: '2.5rem' }}>
          <Link to="/resources/" className="tlink">
            Visit the blog {ICON.arrow}
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
