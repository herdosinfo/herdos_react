import { useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/common/Reveal'

const ICON = {
  check: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    role: 'Farmer',
    animal: 'Goats',
    herd: 120,
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    const card = document.querySelector('.form-card')
    if (card) {
      const topOffset = card.getBoundingClientRect().top + window.scrollY - 120
      window.scrollTo({ top: topOffset, behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* Subhero */}
      <section className="subhero subhero--center hero">
        <div className="container" style={{ maxWidth: '760px' }}>
          <Reveal>
            <span className="breadcrumb">Contact · Request Demo</span>
            <h1 className="t-display">Bring HERDOS to your farm.</h1>
            <p>
              Tell us about your herd. We'll set up a pilot walkthrough within 48 hours — and pilot
              farmers get a free HERDOS collar kit.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Main Content */}
      <section className="section">
        <div className="container">
          <div className="contact-grid">
            {/* Form Card */}
            <Reveal className="form-card">
              {!submitted ? (
                <form id="demo-form" onSubmit={handleSubmit}>
                  <h3 style={{ marginBottom: '1.25rem' }}>Request a pilot demo</h3>
                  <div className="fld-row">
                    <div className="fld">
                      <label htmlFor="f-name">Full name</label>
                      <input
                        id="f-name"
                        type="text"
                        placeholder="Your name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="fld">
                      <label htmlFor="f-phone">Mobile</label>
                      <input
                        id="f-phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="fld-row">
                    <div className="fld">
                      <label htmlFor="f-email">Email</label>
                      <input
                        id="f-email"
                        type="email"
                        placeholder="you@farm.in"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div className="fld">
                      <label htmlFor="f-loc">State / District</label>
                      <input
                        id="f-loc"
                        type="text"
                        placeholder="District, state"
                        required
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="fld-row">
                    <div className="fld">
                      <label htmlFor="f-role">Role</label>
                      <select
                        id="f-role"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      >
                        <option>Farmer</option>
                        <option>FPO / Cooperative</option>
                        <option>Govt official</option>
                        <option>Investor</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="fld">
                      <label htmlFor="f-animal">Animal type</label>
                      <select
                        id="f-animal"
                        value={formData.animal}
                        onChange={(e) => setFormData({ ...formData, animal: e.target.value })}
                      >
                        <option>Goats</option>
                        <option>Sheep</option>
                        <option>Both</option>
                      </select>
                    </div>
                  </div>
                  <div className="fld">
                    <label htmlFor="f-herd">
                      Herd size:{' '}
                      <span id="f-herd-v" style={{ color: 'var(--green)', fontFamily: 'var(--font-mono)' }}>
                        {formData.herd.toLocaleString()} animals
                      </span>
                    </label>
                    <input
                      id="f-herd"
                      className="roi-slider"
                      type="range"
                      min="10"
                      max="5000"
                      step="10"
                      value={formData.herd}
                      onChange={(e) => setFormData({ ...formData, herd: Number(e.target.value) })}
                    />
                  </div>
                  <div className="fld">
                    <label htmlFor="f-msg">Anything else?</label>
                    <textarea
                      id="f-msg"
                      rows="3"
                      placeholder="Tell us about your land and herd"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn--primary btn--full btn--lg">
                    Submit application
                  </button>
                </form>
              ) : (
                <div className="form-ok" id="form-ok" style={{ display: 'flex' }}>
                  <span className="ico">{ICON.check}</span>
                  <h3>Application received</h3>
                  <p style={{ color: 'var(--muted)' }}>
                    Our team will call you within 48 hours from a Bengaluru number.
                  </p>
                  <Link to="/" className="btn btn--outline">
                    Back to home
                  </Link>
                </div>
              )}
            </Reveal>

            {/* Sidebar Column */}
            <div>
              <Reveal>
                <span className="eyebrow">What happens next</span>
                <div className="next-steps" style={{ marginTop: '1.25rem' }}>
                  <div className="next-step">
                    <span className="n">1</span>
                    <div>
                      <h5>We call you within 48 hours</h5>
                      <p>A specialist reaches out to understand your needs.</p>
                    </div>
                  </div>
                  <div className="next-step">
                    <span className="n">2</span>
                    <div>
                      <h5>We assess your farm & herd</h5>
                      <p>Land, herd size, breeds and grazing pattern.</p>
                    </div>
                  </div>
                  <div className="next-step">
                    <span className="n">3</span>
                    <div>
                      <h5>We schedule a pilot</h5>
                      <p>A field deployment date that works for you.</p>
                    </div>
                  </div>
                  <div className="next-step">
                    <span className="n">4</span>
                    <div>
                      <h5>You get a free collar kit</h5>
                      <p>HERDOS collars, free for the pilot period.</p>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal className="info-card">
                <h5>HERDOS HQ</h5>
                <p>Bengaluru, India</p>
                <p>Helpline: +91-98765-43210</p>
                <p>hello@herdos.in</p>
                <p>Mon–Sat · 9:00–18:00 IST</p>
              </Reveal>

              <Reveal
                className="info-card"
                style={{ background: 'var(--forest)', color: 'var(--cream)', border: 'none' }}
              >
                <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.5rem', color: 'var(--gold)' }}>
                      48h
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'rgba(245,245,245,0.72)' }}>Response time</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.5rem', color: 'var(--gold)' }}>
                      Free
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'rgba(245,245,245,0.72)' }}>For pilot farmers</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.5rem', color: 'var(--gold)' }}>
                      Limited
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'rgba(245,245,245,0.72)' }}>Pilot slots</div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
