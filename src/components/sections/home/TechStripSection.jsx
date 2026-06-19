import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../../lib/gsap'
import Reveal from '../../common/Reveal'

const ICONS = {
  intelligence: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" />
    </svg>
  ),
  collar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  app: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M11 18h2" />
    </svg>
  ),
  connectivity: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <path d="M2 20h.01M7 20v-4M12 20v-8M17 20V8M22 4v16" />
    </svg>
  ),
  cloud: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <path d="M17.5 19a4.5 4.5 0 1 0 0-9h-1.8A7 7 0 1 0 4 15.3" />
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
}

export default function TechStripSection() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    gsap.from('.tech-item', {
      opacity: 0,
      y: 30,
      stagger: 0.08,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 85%',
        once: true,
      },
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="section" id="technology">
      <div className="container">
        <Reveal className="shead center">
          <span className="eyebrow">The technology</span>
          <h2 className="t-h2">Built on five integrated technologies.</h2>
        </Reveal>

        <Reveal className="techstrip">
          <Link to="/technology/#intelligence" className="tech-item">
            <span className="ti-ico">{ICONS.intelligence}</span>
            <span>HERDOS Intelligence</span>
          </Link>
          <Link to="/technology/#collar" className="tech-item">
            <span className="ti-ico">{ICONS.collar}</span>
            <span>Smart Collar</span>
          </Link>
          <Link to="/technology/#app" className="tech-item">
            <span className="ti-ico">{ICONS.app}</span>
            <span>Mobile App</span>
          </Link>
          <Link to="/technology/#connectivity" className="tech-item">
            <span className="ti-ico">{ICONS.connectivity}</span>
            <span>Connectivity Stack</span>
          </Link>
          <Link to="/technology/#cloud" className="tech-item">
            <span className="ti-ico">{ICONS.cloud}</span>
            <span>Cloud Platform</span>
          </Link>
        </Reveal>

        <Reveal style={{ marginTop: '2.5rem', textAlign: 'center' }}>
          <Link to="/technology/" className="tlink">
            Explore the full technology stack {ICONS.arrow}
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
