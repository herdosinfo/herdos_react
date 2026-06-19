import HeroSection from '../components/sections/home/HeroSection'
import LiveTickerSection from '../components/sections/home/LiveTickerSection'
import ValuePropSection from '../components/sections/home/ValuePropSection'
import KeyFeaturesSection from '../components/sections/home/KeyFeaturesSection'
import ProductCompareSection from '../components/sections/home/ProductCompareSection'
import MarketSection from '../components/sections/home/MarketSection'
import HowItWorksSection from '../components/sections/home/HowItWorksSection'
import TestimonialsSection from '../components/sections/home/TestimonialsSection'
import TechStripSection from '../components/sections/home/TechStripSection'
import BlogTeaserSection from '../components/sections/home/BlogTeaserSection'
import FinalCTA from '../components/common/FinalCTA'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <LiveTickerSection />
      <ValuePropSection />
      <KeyFeaturesSection />
      <ProductCompareSection />
      <MarketSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <TechStripSection />
      <BlogTeaserSection />
      <FinalCTA />
    </>
  )
}

