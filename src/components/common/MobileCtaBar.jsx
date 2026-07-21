import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function MobileCtaBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Show once hero section has scrolled out of view
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={`mcta${visible ? ' show' : ''}`}>
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <Link
          to="/contact/"
          className="btn btn--ghostw"
          style={{ flex: 1, textAlign: 'center', fontSize: '0.88rem', padding: '0.75rem 0' }}
        >
          Login
        </Link>
        <Link
          to="/contact/"
          className="btn btn--primary"
          style={{ flex: 1, textAlign: 'center', fontSize: '0.88rem', padding: '0.75rem 0' }}
        >
          Request Demo
        </Link>
      </div>
    </div>
  )
}
