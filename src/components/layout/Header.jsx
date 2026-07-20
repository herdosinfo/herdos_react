import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { NAV } from '../../data/navigation'
import { useSite } from '../../context/SiteContext'
import MobileDrawer from './MobileDrawer'
import { gsap, ScrollTrigger } from '../../lib/gsap'

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

// ---------------------------------------------------------------------------
// Reusable animation helpers
// ---------------------------------------------------------------------------

function applyFloatingState(header) {
  const isMobile = window.innerWidth < 768
  gsap.fromTo(
    header,
    { y: -20, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.35,
      ease: 'power2.out',
      marginTop:    isMobile ? '12px' : '20px',
      marginLeft:   isMobile ? '16px' : '32px',
      marginRight:  isMobile ? '16px' : '32px',
      borderRadius: '9999px',
      backgroundColor: 'rgba(13, 31, 18, 0.45)',
      borderColor:     'rgba(255, 255, 255, 0.12)',
      boxShadow: isMobile
        ? '0 10px 30px rgba(13, 31, 18, 0.25)'
        : '0 12px 40px rgba(13, 31, 18, 0.25)',
      backdropFilter: 'blur(16px)',
    }
  )
}

function applyHeroTransparentState(header) {
  gsap.to(header, {
    y: 0,
    opacity: 1,
    duration: 0.3,
    ease: 'power2.out',
    marginTop:       'var(--hero-pad)',
    marginLeft:      'var(--hero-pad)',
    marginRight:     'var(--hero-pad)',
    borderRadius:    'var(--hero-radius)',
    backgroundColor: 'rgba(15, 15, 15, 0)',
    borderColor:     'rgba(255, 255, 255, 0)',
    boxShadow:       '0 0px 0px rgba(0, 0, 0, 0)',
    backdropFilter:  'blur(0px)',
  })
}

function applyNonHomeTransparentState(header) {
  gsap.to(header, {
    y: 0,
    opacity: 1,
    duration: 0.3,
    ease: 'power2.out',
    marginTop:       '0px',
    marginLeft:      '0px',
    marginRight:     '0px',
    borderRadius:    '0px',
    backgroundColor: 'rgba(245, 245, 245, 0)',
    borderColor:     'rgba(245, 245, 245, 0)',
    boxShadow:       '0 0px 0px rgba(0, 0, 0, 0)',
    backdropFilter:  'blur(0px)',
  })
}

function applyNonHomeFloatingState(header) {
  const isMobile = window.innerWidth < 768
  gsap.fromTo(
    header,
    { y: -20, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.35,
      ease: 'power2.out',
      marginTop:    isMobile ? '8px' : '16px',
      marginLeft:   isMobile ? '12px' : '24px',
      marginRight:  isMobile ? '12px' : '24px',
      borderRadius: '9999px',
      backgroundColor: 'rgba(245, 245, 245, 0.85)',
      borderColor:     'rgba(13, 31, 18, 0.08)',
      boxShadow:       '0 8px 32px rgba(13, 31, 18, 0.08)',
      backdropFilter:  'blur(16px)',
    }
  )
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function Header() {
  const { setMobileMenuOpen } = useSite()
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const headerRef = useRef(null)

  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    // Remove all GSAP inline styles from any previous route to start clean
    gsap.set(header, { clearProps: 'all' })

    const isHome = pathname === '/' || pathname === '/home/'
    let triggerInstance = null
    let heroReadyListener = null

    if (isHome) {
      // -----------------------------------------------------------------------
      // HOME PAGE
      //
      // Problem: If we create the navbar ScrollTrigger immediately on mount,
      // the Hero's pin spacer does not exist yet (assets are still loading).
      // ScrollTrigger would measure .ticker at its pre-pin DOM position (~100vh),
      // causing the navbar to appear at scrollY ≈ 0.
      //
      // Solution: Set the transparent state immediately (synchronous, safe),
      // then wait for the `hero:ready` event before creating the ScrollTrigger.
      //
      // By the time `hero:ready` fires:
      //   • The Hero's pin spacer (190vh) has been added to the DOM
      //   • ScrollTrigger.refresh() has been called by the Hero controller
      //   • .ticker sits at its correct position (~290vh from page top)
      //   • 'top 90%' fires at scrollY ≈ 200vh — well past the hero pin end
      // -----------------------------------------------------------------------

      // STATE 1: Transparent Hero Navbar — applied immediately and held until
      // the user exits the Hero.
      gsap.set(header, {
        y: 0,
        opacity: 1,
        marginTop:       'var(--hero-pad)',
        marginLeft:      'var(--hero-pad)',
        marginRight:     'var(--hero-pad)',
        borderRadius:    'var(--hero-radius)',
        backgroundColor: 'rgba(15, 15, 15, 0)',
        borderColor:     'rgba(255, 255, 255, 0)',
        boxShadow:       '0 0px 0px rgba(0, 0, 0, 0)',
        backdropFilter:  'blur(0px)',
      })

      const createNavbarTrigger = () => {
        // .ticker is the first real content section after the Hero.
        // At this point (post hero:ready) it is positioned correctly
        // in scroll-space because the Hero's pin spacer has been created.
        const ticker = document.querySelector('.ticker')
        if (!ticker) return

        // 'top 90%' → fires when ticker's top edge is 10% from the viewport
        // bottom — the Hero has fully ended and the next section is just
        // peeking into view. Produces a natural, cinematic transition.
        triggerInstance = ScrollTrigger.create({
          trigger: ticker,
          start: 'top 90%',
          invalidateOnRefresh: true,
          onEnter: () => {
            setScrolled(true)
            applyFloatingState(header)
          },
          onLeaveBack: () => {
            setScrolled(false)
            applyHeroTransparentState(header)
          },
        })
      }

      // { once: true } automatically removes the listener after first fire
      heroReadyListener = createNavbarTrigger
      window.addEventListener('hero:ready', heroReadyListener, { once: true })

    } else {
      // -----------------------------------------------------------------------
      // NON-HOME PAGES
      //
      // No Hero pin spacer, so the trigger can be created immediately.
      // Fires after 120px of scroll on the body.
      // -----------------------------------------------------------------------
      gsap.set(header, {
        y: 0,
        opacity: 1,
        marginTop:       '0px',
        marginLeft:      '0px',
        marginRight:     '0px',
        borderRadius:    '0px',
        backgroundColor: 'rgba(245, 245, 245, 0)',
        borderColor:     'rgba(245, 245, 245, 0)',
        boxShadow:       '0 0px 0px rgba(0, 0, 0, 0)',
        backdropFilter:  'blur(0px)',
      })

      triggerInstance = ScrollTrigger.create({
        trigger: document.body,
        start: 'top+=120 top',
        invalidateOnRefresh: true,
        onEnter: () => {
          setScrolled(true)
          applyNonHomeFloatingState(header)
        },
        onLeaveBack: () => {
          setScrolled(false)
          applyNonHomeTransparentState(header)
        },
      })
    }

    return () => {
      // Remove hero:ready listener if it hasn't fired yet (e.g. user navigated
      // away before Hero finished loading)
      if (heroReadyListener) {
        window.removeEventListener('hero:ready', heroReadyListener)
      }
      if (triggerInstance) {
        triggerInstance.kill()
        triggerInstance = null
      }
    }
  }, [pathname])

  return (
    <>
      <div data-site-header="">
        <header ref={headerRef} className={`nav site-header ${scrolled ? 'scrolled' : ''}`}>
          <div className="container">
            {/* Brand Logo */}
            <Link to="/" className="brand">
              <div className="logo-wrap">
                <img src="/assets/green-logo.svg" alt="HERDOS logo" width="17" height="26" className="logo-colour" />
                <img src="/assets/white-logo.svg" alt="" aria-hidden="true" width="17" height="26" className="logo-white" />
              </div>
              <span className="word">HERDOS</span>
            </Link>

            {/* Desktop Navigation */}
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
              <Link to="/contact/" className="btn btn--outline">Login</Link>
              <Link to="/contact/" className="btn btn--primary">Request Demo</Link>
            </div>

            {/* Mobile Burger */}
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
