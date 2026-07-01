import { useState, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { NAV } from '../../data/navigation'
import { useSite } from '../../context/SiteContext'
import MobileDrawer from './MobileDrawer'
import { useGSAP } from '@gsap/react'
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

export default function Header() {
  const { setMobileMenuOpen } = useSite()
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const headerRef = useRef(null)

  useGSAP(() => {
    const header = headerRef.current
    if (!header) return

    // Clear any previous inline styles to prevent route contamination
    gsap.set(header, { clearProps: 'all' })
    gsap.set('.nav-cta .btn--primary', { clearProps: 'all' })

    const isHome = document.body.dataset.page === 'home'
    const mm = gsap.matchMedia()

    let triggerInstance = null
    let timelineInstance = null
    let rafId = null

    const setupScrollTriggers = () => {
      const hero = document.querySelector('.hero-shell')
      if (isHome && !hero) {
        // Retry on next animation frame if home route component is still lazy loading
        rafId = requestAnimationFrame(setupScrollTriggers)
        return
      }

      const triggerEl = isHome ? hero : document.body
      const startVal = isHome ? '85% top' : 'top top'
      const endVal = isHome ? 'bottom top' : '+=120'

      // Trigger state toggle
      triggerInstance = ScrollTrigger.create({
        trigger: triggerEl,
        start: startVal,
        end: endVal,
        scrub: 0.5,
        onUpdate: (self) => {
          setScrolled(self.progress > 0.1)
        },
      })

      // Animation timeline for glass morphing
      timelineInstance = gsap.timeline({
        scrollTrigger: {
          trigger: triggerEl,
          start: startVal,
          end: endVal,
          scrub: 0.5,
        }
      })

      if (isHome) {
        mm.add('(min-width: 768px)', () => {
          timelineInstance.fromTo(header,
            {
              marginTop: 'var(--hero-pad)',
              marginLeft: 'var(--hero-pad)',
              marginRight: 'var(--hero-pad)',
              borderRadius: 'var(--hero-radius)',
              backgroundColor: 'rgba(15, 15, 15, 0)',
              borderColor: 'rgba(255, 255, 255, 0)',
              boxShadow: '0 0px 0px rgba(0, 0, 0, 0)',
              backdropFilter: 'blur(0px)',
              webkitBackdropFilter: 'blur(0px)',
            },
            {
              marginTop: '20px',
              marginLeft: '32px',
              marginRight: '32px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(13, 31, 18, 0.45)', // Premium brand forest green glass tint
              borderColor: 'rgba(255, 255, 255, 0.12)',
              boxShadow: '0 12px 40px rgba(13, 31, 18, 0.25)',
              backdropFilter: 'blur(16px)',
              webkitBackdropFilter: 'blur(16px)',
              ease: 'none',
            }
          )
        })

        mm.add('(max-width: 767px)', () => {
          timelineInstance.fromTo(header,
            {
              marginTop: 'var(--hero-pad)',
              marginLeft: 'var(--hero-pad)',
              marginRight: 'var(--hero-pad)',
              borderRadius: 'var(--hero-radius)',
              backgroundColor: 'rgba(15, 15, 15, 0)',
              borderColor: 'rgba(255, 255, 255, 0)',
              boxShadow: '0 0px 0px rgba(0, 0, 0, 0)',
              backdropFilter: 'blur(0px)',
              webkitBackdropFilter: 'blur(0px)',
            },
            {
              marginTop: '12px',
              marginLeft: '16px',
              marginRight: '16px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(13, 31, 18, 0.45)', // Premium brand forest green glass tint
              borderColor: 'rgba(255, 255, 255, 0.12)',
              boxShadow: '0 10px 30px rgba(13, 31, 18, 0.25)',
              backdropFilter: 'blur(16px)',
              webkitBackdropFilter: 'blur(16px)',
              ease: 'none',
            }
          )
        })
      } else {
        mm.add('(min-width: 768px)', () => {
          timelineInstance.fromTo(header,
            {
              marginTop: '0px',
              marginLeft: '0px',
              marginRight: '0px',
              borderRadius: '0px',
              backgroundColor: 'rgba(245, 245, 245, 0)',
              borderColor: 'rgba(245, 245, 245, 0)',
              boxShadow: '0 0px 0px rgba(0, 0, 0, 0)',
              backdropFilter: 'blur(0px)',
              webkitBackdropFilter: 'blur(0px)',
            },
            {
              marginTop: '16px',
              marginLeft: '24px',
              marginRight: '24px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(245, 245, 245, 0.85)',
              borderColor: 'rgba(13, 31, 18, 0.08)',
              boxShadow: '0 8px 32px rgba(13, 31, 18, 0.08)',
              backdropFilter: 'blur(16px)',
              webkitBackdropFilter: 'blur(16px)',
              ease: 'none',
            }
          )
        })

        mm.add('(max-width: 767px)', () => {
          timelineInstance.fromTo(header,
            {
              marginTop: '0px',
              marginLeft: '0px',
              marginRight: '0px',
              borderRadius: '0px',
              backgroundColor: 'rgba(245, 245, 245, 0)',
              borderColor: 'rgba(245, 245, 245, 0)',
              boxShadow: '0 0px 0px rgba(0, 0, 0, 0)',
              backdropFilter: 'blur(0px)',
              webkitBackdropFilter: 'blur(0px)',
            },
            {
              marginTop: '8px',
              marginLeft: '12px',
              marginRight: '12px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(245, 245, 245, 0.85)',
              borderColor: 'rgba(13, 31, 18, 0.08)',
              boxShadow: '0 8px 32px rgba(13, 31, 18, 0.08)',
              backdropFilter: 'blur(16px)',
              webkitBackdropFilter: 'blur(16px)',
              ease: 'none',
            }
          )
        })
      }
    }

    setupScrollTriggers()

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      if (triggerInstance) triggerInstance.kill()
      if (timelineInstance) timelineInstance.kill()
      mm.revert()
    }
  }, [pathname])

  return (
    <>
      <div data-site-header="">
        {/* Main Navbar */}
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
