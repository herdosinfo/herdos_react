import { lazy, Suspense } from 'react'
import HeroSection from '../components/sections/home/HeroSection'
import LiveTickerSection from '../components/sections/home/LiveTickerSection'

// Below-fold sections — lazy loaded for code splitting.
// HeroSection and LiveTickerSection remain eager:
//   • HeroSection is the LCP and has a bespoke asset-loading pipeline
//   • LiveTickerSection is the Header's ScrollTrigger anchor — must be in
//     the DOM at the correct position immediately after the hero.
const ValuePropSection      = lazy(() => import('../components/sections/home/ValuePropSection'))
const KeyFeaturesSection    = lazy(() => import('../components/sections/home/KeyFeaturesSection'))
const ProductCompareSection = lazy(() => import('../components/sections/home/ProductCompareSection'))
const MarketSection         = lazy(() => import('../components/sections/home/MarketSection'))
const HowItWorksSection     = lazy(() => import('../components/sections/home/HowItWorksSection'))
const TestimonialsSection   = lazy(() => import('../components/sections/home/TestimonialsSection'))
const TeamSection           = lazy(() => import('../components/sections/home/TeamSection'))
const TechStripSection      = lazy(() => import('../components/sections/home/TechStripSection'))
const BlogTeaserSection     = lazy(() => import('../components/sections/home/BlogTeaserSection'))
const FinalCTA              = lazy(() => import('../components/common/FinalCTA'))

// Shared invisible placeholder — sized to match approximate section height.
// Prevents layout shift while the lazy chunk downloads.
// Uses min-height so it collapses if content loads instantly from cache.
const SectionPlaceholder = ({ height = '400px' }) => (
  <div aria-hidden="true" style={{ minHeight: height }} />
)

export default function HomePage() {
  return (
    <>
      {/* Above-fold — always eager */}
      <HeroSection />
      <LiveTickerSection />

      {/* Below-fold — lazy loaded */}
      <Suspense fallback={<SectionPlaceholder height="480px" />}>
        <ValuePropSection />
      </Suspense>

      <Suspense fallback={<SectionPlaceholder height="1800px" />}>
        <KeyFeaturesSection />
      </Suspense>

      <Suspense fallback={<SectionPlaceholder height="600px" />}>
        <ProductCompareSection />
      </Suspense>

      <Suspense fallback={<SectionPlaceholder height="480px" />}>
        <MarketSection />
      </Suspense>

      <Suspense fallback={<SectionPlaceholder height="680px" />}>
        <HowItWorksSection />
      </Suspense>

      <Suspense fallback={<SectionPlaceholder height="560px" />}>
        <TestimonialsSection />
      </Suspense>

      <Suspense fallback={<SectionPlaceholder height="480px" />}>
        <TeamSection />
      </Suspense>

      <Suspense fallback={<SectionPlaceholder height="320px" />}>
        <TechStripSection />
      </Suspense>

      <Suspense fallback={<SectionPlaceholder height="560px" />}>
        <BlogTeaserSection />
      </Suspense>

      <Suspense fallback={<SectionPlaceholder height="280px" />}>
        <FinalCTA />
      </Suspense>
    </>
  )
}


