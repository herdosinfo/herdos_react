import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { NAV } from '../../data/navigation'
import { useSite } from '../../context/SiteContext'

const ICON = {
  chev: (
    <svg viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="1.5" className="chev-icon" aria-hidden="true">
      <path d="M1 1.5 6 6.5 11 1.5" />
    </svg>
  ),
  close: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
}

export default function MobileDrawer() {
  const { mobileMenuOpen, setMobileMenuOpen } = useSite()
  const [openSection, setOpenSection] = useState(null)

  const close = useCallback(() => {
    setMobileMenuOpen(false)
    setOpenSection(null)
  }, [setMobileMenuOpen])

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') close()
    }
    if (mobileMenuOpen) window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [mobileMenuOpen, close])

  const toggleSection = (id) => {
    setOpenSection((prev) => (prev === id ? null : id))
  }

  return (
    <AnimatePresence>
      {mobileMenuOpen && (
        <>
          {/* Overlay - drawer-ov */}
          <motion.div
            className="drawer-ov open"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
            aria-hidden="true"
          />

          {/* Drawer panel - drawer */}
          <motion.aside
            className="drawer open"
            initial={{ x: '105%' }}
            animate={{ x: 0 }}
            exit={{ x: '105%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            aria-label="Navigation menu"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="drawer-head">
              <span className="brand">
                <img src="/assets/white-logo.svg" alt="HERDOS logo" />
                <span className="word">HERDOS</span>
              </span>
              <button
                className="drawer-close"
                aria-label="Close menu"
                onClick={close}
              >
                {ICON.close}
              </button>
            </div>

            {/* Accordion List Body */}
            <div className="drawer-body">
              {NAV.map((n) => (
                <div key={n.id}>
                  <button
                    className={`acc-head ${openSection === n.id ? 'open' : ''}`}
                    onClick={() => toggleSection(n.id)}
                    aria-expanded={openSection === n.id}
                  >
                    {n.label} {ICON.chev}
                  </button>
                  <div
                    className="acc-body"
                    style={{
                      maxHeight: openSection === n.id ? '500px' : '0px',
                      transition: 'max-height var(--dur) var(--ease)',
                    }}
                  >
                    <Link to={n.href} onClick={close}>
                      Overview
                    </Link>
                    {n.cols
                      .flatMap((c) => c.items)
                      .map(([href, h5], idx) => (
                        <Link key={idx} to={href} onClick={close}>
                          {h5}
                        </Link>
                      ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Drawer CTAs */}
            <div className="drawer-ctas">
              <Link to="/contact/" onClick={close} className="btn btn--ghostw">
                Login
              </Link>
              <Link to="/contact/" onClick={close} className="btn btn--primary">
                Request Demo
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
