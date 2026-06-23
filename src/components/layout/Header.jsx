import { Link, useLocation } from 'react-router-dom'
import { NAV } from '../../data/navigation'
import { useSite } from '../../context/SiteContext'
import { useScrolled } from '../../hooks'
import MobileDrawer from './MobileDrawer'

const ICON = {
  chev: (
    <svg viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="1.5" className="chev-icon" aria-hidden="true">
      <path d="M1 1.5 6 6.5 11 1.5" />
    </svg>
  ),
  phone: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  burger: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
}

export default function Header() {
  const { setMobileMenuOpen } = useSite()
  const scrolled = useScrolled(40)
  const { pathname } = useLocation()

  return (
    <>
      <div data-site-header="">
        {/* Scroll progress bar */}
        <div className="scroll-bar" />

        {/* Utility Strip */}
        <div className="ustrip">
          <div className="container">
            <span className="ustrip-left">
              {ICON.phone} Farmer Helpline: +91-98765-43210
            </span>
            <span className="ustrip-right">
              <a href="#">India (English)</a>
              <Link to="/contact/" className="accent">
                Become a Pilot Farmer
              </Link>
            </span>
          </div>
        </div>

        {/* Main Navbar */}
        <header className={`nav site-header ${scrolled ? 'scrolled' : ''}`}>
          <div className="container">
            {/* Brand Logo */}
            <Link to="/" className="brand">
              <div className="logo-wrap">
                <img src="/assets/green-logo.svg" alt="HERDOS logo" width="17" height="26" className="logo-colour" />
                <img src="/assets/white-logo.svg" alt="" aria-hidden="true" width="17" height="26" className="logo-white" />
              </div>
              <span className="word">HERDOS</span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="nav-links" role="navigation" aria-label="Main navigation">
              {NAV.map((n) => {
                const isActive = pathname.startsWith(n.href)
                return (
                  <div key={n.id} className="nav-item">
                    <Link
                      to={n.href}
                      className={`nav-link ${isActive ? 'active' : ''}`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {n.label} {ICON.chev}
                    </Link>
                    <div className={`mega ${n.cols.length > 1 ? 'mega--2' : ''}`}>
                      {n.cols.map((col, idx) => (
                        <div key={idx} className="mega-col">
                          <span className="mega-title">{col.title}</span>
                          {col.items.map(([href, h5, p], i) => (
                            <Link key={i} to={href} className="mega-link">
                              <h5>{h5}</h5>
                              <p>{p}</p>
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </nav>

            {/* Nav CTAs */}
            <div className="nav-cta">
              <Link to="/contact/" className="btn btn--outline">
                Login
              </Link>
              <Link to="/contact/" className="btn btn--primary">
                Request Demo
              </Link>
            </div>

            {/* Mobile Burger Trigger */}
            <button
              className="burger"
              aria-label="Open menu"
              onClick={() => setMobileMenuOpen(true)}
            >
              {ICON.burger}
            </button>
          </div>
        </header>
      </div>

      <MobileDrawer />
    </>
  )
}
