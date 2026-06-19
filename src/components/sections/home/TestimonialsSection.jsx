import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../../common/Reveal'
import { TESTIMONIALS } from '../../../data/testimonials'

const ICON = {
  star: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="m12 2 3 6.3 6.9.9-5 4.8 1.2 6.8L12 17.8 5.9 20.8 7.1 14l-5-4.8 6.9-.9z" />
    </svg>
  ),
  prev: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M19 12H5M5 12l7 7M5 12l7-7" />
    </svg>
  ),
  next: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M5 12h14M19 12l-7 7M19 12l-7-7" />
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
}

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0)
  const trackRef = useRef(null)
  const [transformStyle, setTransformStyle] = useState('none')

  const getVisibleCount = () => {
    if (typeof window === 'undefined') return 3
    if (window.innerWidth >= 1000) return 3
    if (window.innerWidth >= 680) return 2
    return 1
  }

  const handleNext = () => {
    const vis = getVisibleCount()
    const max = TESTIMONIALS.length - vis
    setIndex((prev) => (prev < max ? prev + 1 : 0))
  }

  const handlePrev = () => {
    const vis = getVisibleCount()
    const max = TESTIMONIALS.length - vis
    setIndex((prev) => (prev > 0 ? prev - 1 : max))
  }

  useEffect(() => {
    const handleResize = () => {
      setIndex(0)
      setTransformStyle('none')
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!trackRef.current) return
    const card = trackRef.current.querySelector('.tcard')
    if (!card) return
    const gap = parseFloat(window.getComputedStyle(trackRef.current).gap) || 20
    const offset = index * (card.offsetWidth + gap)
    setTransformStyle(`translateX(-${offset}px)`)
  }, [index])

  return (
    <section className="section section--sage" id="farmers">
      <div className="container">
        <Reveal className="shead">
          <span className="eyebrow">Our farmers</span>
          <h2 className="t-h2">Trusted by the people who feed India.</h2>
        </Reveal>

        <Reveal className="tcar">
          <div
            className="tcar-track"
            ref={trackRef}
            style={{ transform: transformStyle }}
          >
            {TESTIMONIALS.map((t) => (
              <article key={t.id} className="tcard">
                <img className="tcard-photo" src={t.photo} alt={t.photoAlt} />
                <div className="tcard-stars">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <svg key={i} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="m12 2 3 6.3 6.9.9-5 4.8 1.2 6.8L12 17.8 5.9 20.8 7.1 14l-5-4.8 6.9-.9z" />
                    </svg>
                  ))}
                </div>
                <p className="tcard-quote">"{t.quote}"</p>
                <div className="tcard-meta">
                  <h6>{t.name}</h6>
                  <p>
                    {t.location} · {t.meta}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="tcar-ctrls">
            <button className="tcar-btn tcar-prev" aria-label="Previous" onClick={handlePrev}>
              {ICON.prev}
            </button>
            <button className="tcar-btn tcar-next" aria-label="Next" onClick={handleNext}>
              {ICON.next}
            </button>
          </div>
        </Reveal>

        <Reveal style={{ marginTop: '2rem' }}>
          <Link to="/farmers/" className="tlink">
            Read all farmer stories {ICON.arrow}
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
