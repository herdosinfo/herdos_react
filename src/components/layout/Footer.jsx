import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLiveTicker } from '../../hooks'

const ICON = {
  check: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
}

export default function Footer() {
  const { animals, collars } = useLiveTicker()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email.trim()) {
      setSubmitted(true)
    }
  }

  return (
    <footer className="footer">
      <div className="container">
        {/* Top Newsletter section */}
        <div className="foot-top">
          <div className="foot-news">
            <h5>Field Notes</h5>
            <p>Pilot news, farm tips and product updates. ~5 min read, monthly.</p>
          </div>
          {!submitted ? (
            <form className="foot-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                aria-label="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="btn btn--primary">
                Subscribe
              </button>
            </form>
          ) : (
            <div className="foot-success" style={{ display: 'flex' }}>
              {ICON.check} Subscribed.
            </div>
          )}
        </div>

        {/* Links Grid */}
        <div className="foot-grid">
          <div className="foot-brand">
            <span className="brand">
              <img src="/assets/white-logo.svg" alt="HERDOS" />
              <span className="word">HERDOS</span>
            </span>
            <p className="foot-tag">
              India's first virtual fencing & early illness detection system for sheep and goats.
            </p>
            <span className="pill pill--gold">
              <span className="dot"></span> Patent Pending
            </span>
          </div>

          <div className="foot-col">
            <h5>For Goats</h5>
            <Link to="/goats/">Overview</Link>
            <Link to="/goats/#roi">ROI Analysis</Link>
            <Link to="/farmers/#goat">Goat Farmers</Link>
            <Link to="/solutions/">Solutions</Link>
          </div>

          <div className="foot-col">
            <h5>For Sheep</h5>
            <Link to="/sheep/">Overview</Link>
            <Link to="/sheep/#roi">ROI Analysis</Link>
            <Link to="/farmers/#sheep">Sheep Farmers</Link>
            <Link to="/solutions/">Solutions</Link>
          </div>

          <div className="foot-col">
            <h5>Resources</h5>
            <Link to="/resources/#blog">Blog</Link>
            <Link to="/resources/#welfare">Animal Welfare Charter</Link>
            <Link to="/resources/#learning">Learning Hub</Link>
            <Link to="/resources/#help">Help Centre</Link>
          </div>

          <div className="foot-col">
            <h5>Company</h5>
            <Link to="/about/">Our Story</Link>
            <Link to="/contact/">Contact</Link>
            <Link to="/about/#press">Press & Media</Link>
            <Link to="/about/#careers">Careers</Link>
            <Link to="/technology/">Technology</Link>
          </div>
        </div>

        {/* Status Bar */}
        <div className="foot-status">
          <span className="live"></span> Live network:{' '}
          <span>
            <strong style={{ color: '#fff' }}>{animals.toLocaleString()}</strong> monitored
          </span>{' '}
          ·{' '}
          <span>
            <strong style={{ color: '#fff' }}>{collars.toLocaleString()}</strong> collars
          </span>{' '}
          · <span>99.98% uptime</span>
        </div>

        {/* Bottom copyright & legal */}
        <div className="foot-bottom">
          <span>© 2026 HERDOS Livestock Intelligence Pvt. Ltd.</span>
          <span className="foot-bottom-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Software Usage</a>
            <a href="#">Cookies</a>
          </span>
        </div>
      </div>
    </footer>
  )
}
