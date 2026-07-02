import { useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { gsap, ScrollTrigger } from './lib/gsap'
import Lenis from 'lenis'
import { SiteProvider } from './context/SiteContext'
import PageShell from './components/layout/PageShell'
import MobileCtaBar from './components/common/MobileCtaBar'
import SEO from './components/common/SEO'

// Lazy load all pages for code splitting
const HomePage     = lazy(() => import('./pages/HomePage'))
const AboutPage    = lazy(() => import('./pages/AboutPage'))
const ContactPage  = lazy(() => import('./pages/ContactPage'))
const TechnologyPage = lazy(() => import('./pages/TechnologyPage'))
const SolutionsPage  = lazy(() => import('./pages/SolutionsPage'))
const GoatsPage    = lazy(() => import('./pages/GoatsPage'))
const SheepPage    = lazy(() => import('./pages/SheepPage'))
const FarmersPage  = lazy(() => import('./pages/FarmersPage'))
const ResourcesPage = lazy(() => import('./pages/ResourcesPage'))

function HashScrollObserver() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const timer = setTimeout(() => {
        const target = document.querySelector(hash)
        if (target && window.lenis) {
          window.lenis.scrollTo(target, { offset: -80 })
        }
      }, 350)
      return () => clearTimeout(timer)
    }
  }, [pathname, hash])

  return null
}

function AnimatedRoutes() {
  const location = useLocation()

  useEffect(() => {
    const path = location.pathname
    let pageName = 'home'
    if (path.includes('/about/')) pageName = 'about'
    else if (path.includes('/contact/')) pageName = 'contact'
    else if (path.includes('/technology/')) pageName = 'technology'
    else if (path.includes('/solutions/')) pageName = 'solutions'
    else if (path.includes('/goats/')) pageName = 'goats'
    else if (path.includes('/sheep/')) pageName = 'sheep'
    else if (path.includes('/farmers/')) pageName = 'farmers'
    else if (path.includes('/resources/')) pageName = 'resources'
    document.body.dataset.page = pageName
  }, [location])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
      >
        <Suspense fallback={<div className="min-h-screen bg-cream" />}>
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/home/" element={<Navigate to="/" replace />} />
            <Route path="/about/" element={<AboutPage />} />
            <Route path="/contact/" element={<ContactPage />} />
            <Route path="/technology/" element={<TechnologyPage />} />
            <Route path="/solutions/" element={<SolutionsPage />} />
            <Route path="/goats/" element={<GoatsPage />} />
            <Route path="/sheep/" element={<SheepPage />} />
            <Route path="/farmers/" element={<FarmersPage />} />
            <Route path="/resources/" element={<ResourcesPage />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  )
}

/**
 * RouteRefresh — fires ScrollTrigger.refresh() once per route change
 * with a 300 ms debounce to let the incoming page finish its layout.
 *
 * Excludes the Home page, where the Hero section handles its own single
 * refresh at the end of its staged loading pipeline.
 */
function RouteRefresh() {
  const { pathname } = useLocation()

  useEffect(() => {
    const isHome = pathname === '/' || pathname === '/home/'
    if (isHome) return // Managed by Hero Controller

    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 300)
    return () => clearTimeout(timer)
  }, [pathname])

  return null
}

function AppContent() {
  const { pathname } = useLocation()

  useEffect(() => {
    let lenisInstance = null

    const initLenis = () => {
      if (lenisInstance) return

      // Initialise Lenis smooth scroll
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      })

      window.lenis = lenis
      lenisInstance = lenis

      // Wire Lenis to GSAP ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update)

      // Start GSAP Ticker bindings
      gsap.ticker.add(rafCb)
      gsap.ticker.lagSmoothing(0)

      // Trigger initial update to sync states
      ScrollTrigger.update()
    }

    const rafCb = (time) => {
      if (lenisInstance) {
        lenisInstance.raf(time * 1000)
      }
    }

    const destroyLenis = () => {
      if (lenisInstance) {
        lenisInstance.destroy()
        window.lenis = undefined
        lenisInstance = null
      }
      gsap.ticker.remove(rafCb)
    }

    // Determine page state
    const isHome = pathname === '/' || pathname === '/home/'

    if (isHome) {
      // Stage 4 / Controller 4: Wait for hero ready event before initializing Lenis
      const handleHeroReady = () => {
        initLenis()
      }
      window.addEventListener('hero:ready', handleHeroReady)

      return () => {
        window.removeEventListener('hero:ready', handleHeroReady)
        destroyLenis()
      }
    } else {
      // Non-home routes: Initialize immediately
      initLenis()
      return () => {
        destroyLenis()
      }
    }
  }, [pathname])

  return (
    <>
      <SEO />
      <HashScrollObserver />
      <RouteRefresh />
      <PageShell>
        <AnimatedRoutes />
      </PageShell>
      <MobileCtaBar />
    </>
  )
}

function App() {
  useEffect(() => {
    // Intercept clicks on hash links for smooth scroll
    const handleGlobalClick = (e) => {
      const anchor = e.target.closest('a')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (href && href.startsWith('#')) {
        e.preventDefault()
        const target = document.querySelector(href)
        if (target && window.lenis) {
          window.lenis.scrollTo(target, { offset: -80 })
        }
      } else if (href && href.includes('#')) {
        const [path, hash] = href.split('#')
        if (path === window.location.pathname || path === '') {
          e.preventDefault()
          const target = document.querySelector('#' + hash)
          if (target && window.lenis) {
            window.lenis.scrollTo(target, { offset: -80 })
          }
        }
      }
    }

    document.addEventListener('click', handleGlobalClick)

    return () => {
      document.removeEventListener('click', handleGlobalClick)
    }
  }, [])

  return (
    <BrowserRouter>
      <SiteProvider>
        <AppContent />
      </SiteProvider>
    </BrowserRouter>
  )
}

export default App
