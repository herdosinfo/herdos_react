import { useEffect, useRef, useCallback, lazy, Suspense } from 'react'
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
 * LayoutStabilizer — fires ScrollTrigger.refresh() once the layout is
 * genuinely stable, not just when React has rendered.
 *
 * Three triggers:
 * 1. document.fonts.ready  — web fonts paint before measurements.
 * 2. window 'load'         — images/videos parsed on initial load.
 * 3. MutationObserver      — watches for images/videos injected by lazy-
 *    loaded route components and refreshes after each batch settles.
 *
 * A 300 ms debounce prevents rapid-fire refreshes during page transitions.
 */
function LayoutStabilizer() {
  const timerRef = useRef(null)
  const { pathname } = useLocation()

  const scheduleRefresh = useCallback((label) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      ScrollTrigger.refresh(true)
    }, 300)
  }, [])

  // Refresh on every route change (handles lazy-loaded page transitions)
  useEffect(() => {
    scheduleRefresh('route')
  }, [pathname, scheduleRefresh])

  useEffect(() => {
    // 1. Refresh once fonts are ready
    document.fonts.ready.then(() => scheduleRefresh('fonts'))

    // 2. Refresh on window load (initial images/videos)
    const onLoad = () => scheduleRefresh('window-load')
    if (document.readyState === 'complete') {
      scheduleRefresh('already-loaded')
    } else {
      window.addEventListener('load', onLoad, { once: true })
    }

    // 3. Watch for media injected by lazy-loaded route components
    const mo = new MutationObserver((mutations) => {
      const hasMedia = mutations.some(m =>
        [...m.addedNodes].some(n => {
          if (n.nodeType !== 1) return false
          return (
            n.tagName === 'IMG' ||
            n.tagName === 'VIDEO' ||
            n.querySelector?.('img, video')
          )
        })
      )
      if (!hasMedia) return

      // Wait for images to decode before refreshing
      const imgs = [...document.querySelectorAll('img')]
      Promise.allSettled(imgs.map(img => img.decode?.().catch(() => {}))).then(
        () => scheduleRefresh('mutation-media')
      )
    })

    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('load', onLoad)
      mo.disconnect()
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [scheduleRefresh])

  return null
}

function AppContent() {
  return (
    <>
      <SEO />
      <HashScrollObserver />
      <LayoutStabilizer />
      <PageShell>
        <AnimatedRoutes />
      </PageShell>
      <MobileCtaBar />
    </>
  )
}

function App() {
  useEffect(() => {
    // Initialise Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    window.lenis = lenis

    // Wire Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    const rafCb = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(rafCb)
    gsap.ticker.lagSmoothing(0)

    // Intercept clicks on hash links for smooth scroll
    const handleGlobalClick = (e) => {
      const anchor = e.target.closest('a')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (href && href.startsWith('#')) {
        e.preventDefault()
        const target = document.querySelector(href)
        if (target) {
          lenis.scrollTo(target, { offset: -80 })
        }
      } else if (href && href.includes('#')) {
        const [path, hash] = href.split('#')
        if (path === window.location.pathname || path === '') {
          e.preventDefault()
          const target = document.querySelector('#' + hash)
          if (target) {
            lenis.scrollTo(target, { offset: -80 })
          }
        }
      }
    }

    document.addEventListener('click', handleGlobalClick)

    return () => {
      lenis.destroy()
      window.lenis = undefined
      gsap.ticker.remove(rafCb)
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

