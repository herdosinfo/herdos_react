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
  burger: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
}

export default function Header() {
  const { setMobileMenuOpen } = useSite()
  const scrolled = useScrolled(100)
  const { pathname } = useLocation()

  return (
    <>
      <div data-site-header="">
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
