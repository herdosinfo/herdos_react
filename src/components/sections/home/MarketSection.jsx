import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../../lib/gsap'
import Reveal from '../../common/Reveal'

export default function MarketSection() {
  const containerRef = useRef(null)

  useGSAP(() => {
    const els = containerRef.current.querySelectorAll('.count')
    els.forEach((el) => {
      const target = parseFloat(el.dataset.target)
      const prefix = el.dataset.prefix || ''
      const suffix = el.dataset.suffix || ''
      const obj = { val: 0 }
      gsap.to(obj, {
        val: target,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          once: true,
        },
        onUpdate: () => {
          el.textContent = prefix + Math.floor(obj.val).toLocaleString() + suffix
        },
      })
    })
  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="section section--dark" id="market">
      <div className="container">
        <div className="mkt-grid">
          {/* Stats Column */}
          <Reveal className="mkt-stats">
            <div className="mkt-stat">
              <span className="num count" data-target="178" data-suffix="M">
                0
              </span>
              <span className="lab">Total Addressable Market — animals that can benefit</span>
            </div>
            <div className="mkt-stat">
              <span className="num count" data-target="15" data-prefix="~" data-suffix="M">
                0
              </span>
              <span className="lab">Serviceable Available Market — organized operations</span>
            </div>
            <div className="mkt-stat">
              <span className="num count" data-target="100" data-suffix="K">
                0
              </span>
              <span className="lab">Target deployment within 5 years</span>
            </div>
            <div className="mkt-stat">
              <span className="num count" data-target="223" data-suffix="M">
                0
              </span>
              <span className="lab">Combined sheep + goat population in India</span>
            </div>
          </Reveal>

          {/* Copy Column */}
          <Reveal className="mkt-copy">
            <span className="eyebrow">A large, underserved market</span>
            <h2 className="t-h2">India's biggest livestock sector is still managed by hand.</h2>
            <p>
              More than 80% of India's sheep and goats depend on traditional grazing with little or no
              technology. Virtual fencing has not yet been introduced for small ruminants here — HERDOS
              is built to close that gap.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
