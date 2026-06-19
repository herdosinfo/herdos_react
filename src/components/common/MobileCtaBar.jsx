import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

export default function MobileCtaBar() {
  const [visible, setVisible] = useState(false)
  const sentinel = useRef(null)

  useEffect(() => {
    // Show once hero section has scrolled out of view
    // The sentinel is placed at the bottom of the hero in HeroSection
    // But here we use a simple scroll threshold as fallback
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-forest border-t border-white/10 p-4 flex gap-3">
      <Link
        to="/contact/"
        className="btn btn--ghostw flex-1 text-center text-sm py-3"
      >
        Login
      </Link>
      <Link
        to="/contact/"
        className="btn btn--primary flex-1 text-center text-sm py-3"
      >
        Request Demo
      </Link>
    </div>
  )
}
