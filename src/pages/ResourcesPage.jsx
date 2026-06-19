import { useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/common/Reveal'

const CHIPS = ['All', 'Farmer Stories', 'Technology', 'Animal Health', 'Grazing Tips']

const BLOG_POSTS = [
  {
    id: 1,
    image: '/media/collar-solar.png',
    alt: 'Solar collar',
    category: 'Technology',
    subcat: 'Technology · 6 min',
    title: 'How solar harvesting gives a collar infinite battery life',
    text: 'The power management that keeps HERDOS running through long grazing days.',
  },
  {
    id: 2,
    image: '/media/app-map.png',
    alt: 'Rotational grazing',
    category: 'Grazing Tips',
    subcat: 'Grazing Tips · 5 min',
    title: 'Rotational grazing without a single physical fence',
    text: 'Using virtual paddocks to rest land and improve pasture recovery.',
  },
  {
    id: 3,
    image: '/media/collar-front.png',
    alt: 'PPR detection',
    category: 'Animal Health',
    subcat: 'Animal Health · 7 min',
    title: 'Catching PPR early: detection thresholds in small ruminants',
    text: 'What rumination and temperature drift reveal days before symptoms.',
  },
  {
    id: 4,
    image: '/media/field.jpg',
    alt: 'Labour costs',
    category: 'Farmer Stories',
    subcat: 'Farmer Stories · 4 min',
    title: 'One herder, twice the flock: a Rajasthan story',
    text: 'How virtual fencing reshaped a family grazing operation.',
  },
  {
    id: 5,
    image: '/media/connectivity.png',
    alt: 'Connectivity',
    category: 'Technology',
    subcat: 'Technology · 8 min',
    title: 'GNSS, NB-IoT and LoRa: connectivity that survives remote pasture',
    text: 'How HERDOS keeps reporting where the cellular network ends.',
  },
  {
    id: 6,
    image: '/media/goat.png',
    alt: 'Breed thresholds',
    category: 'Animal Health',
    subcat: 'Animal Health · 6 min',
    title: 'Why breed-specific thresholds matter for goats',
    text: 'Browsing vs grazing, and what it means for illness detection.',
  },
]

const FAQ_ITEMS = [
  {
    id: 1,
    question: 'Is the electric pulse safe for my animals?',
    answer: 'Yes. The pulse is a safe, mild cue that only fires after a warning call and vibration are ignored, and it\'s suppressed entirely if an animal is running or distressed. Thresholds are set conservatively for small ruminants.',
  },
  {
    id: 2,
    question: "What happens where there's no mobile network?",
    answer: 'HERDOS uses GNSS for positioning and falls back to a portable solar LoRa gateway, letting you build a private long-range network in remote areas with no cellular coverage.',
  },
  {
    id: 3,
    question: 'How long does the collar battery last?',
    answer: 'Solar-assisted charging plus intelligent sleep/wake power management keeps collars running through long grazing days with near-zero manual charging.',
  },
  {
    id: 4,
    question: 'Which languages does the app support?',
    answer: 'The app supports Hindi, Marathi, Tamil, Telugu and Kannada, with voice-assisted guidance for farmers of every literacy level.',
  },
  {
    id: 5,
    question: 'How do I join a pilot?',
    answer: 'Request a demo and tell us about your herd — our team will respond within 48 hours to set up a pilot walkthrough. Collars are free for the pilot period.',
  },
]

const ICON = {
  arrow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
}

export default function ResourcesPage() {
  const [activeChip, setActiveChip] = useState('All')
  const [openFaq, setOpenFaq] = useState(null)

  const filteredPosts = BLOG_POSTS.filter((p) => {
    if (activeChip === 'All') return true
    return p.category === activeChip
  })

  return (
    <>
      {/* Page Hero */}
      <section className="subhero subhero--center hero">
        <div className="container" style={{ maxWidth: '760px' }}>
          <Reveal>
            <span className="breadcrumb">Resources</span>
            <h1 className="t-display">Learn, deploy and get help.</h1>
            <p>
              Field-tested guidance on livestock technology, animal health and grazing — plus our
              welfare commitments and support.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Blog Section */}
      <section className="section" id="blog">
        <div className="container">
          <Reveal className="shead">
            <span className="eyebrow">Blog & articles</span>
            <h2 className="t-h2">From the field.</h2>
          </Reveal>

          <Reveal className="chips">
            {CHIPS.map((chip) => (
              <span
                key={chip}
                className={`chip ${activeChip === chip ? 'active' : ''}`}
                onClick={() => setActiveChip(chip)}
              >
                {chip}
              </span>
            ))}
          </Reveal>

          <div className="blog-grid">
            {filteredPosts.map((post) => (
              <Reveal key={post.id}>
                <a href="#" className="bcard" onClick={(e) => e.preventDefault()}>
                  <div className="bcard-img">
                    <img src={post.image} alt={post.alt} />
                  </div>
                  <div className="bcard-body">
                    <span className="bcard-cat">{post.subcat}</span>
                    <h4>{post.title}</h4>
                    <p>{post.text}</p>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Animal Welfare Charter */}
      <section className="section section--sage" id="welfare">
        <div className="container">
          <Reveal className="split">
            <div className="split-text prose">
              <span className="eyebrow">Animal Welfare Charter</span>
              <h2 className="t-h3">Welfare is built into the system.</h2>
              <p>
                The progressive alert sequence — a breed-specific warning call, then a gentle vibration,
                then a safe mild pulse — is designed so animals learn boundaries with the least possible
                stress. Panic detection suppresses all correction the moment an animal runs or shows
                distress.
              </p>
              <p>
                Safe-pulse thresholds are set conservatively and reviewed against third-party welfare
                guidance. Welfare is a design constraint, not an afterthought.
              </p>
              <a href="#" className="btn btn--primary" style={{ marginTop: '0.5rem' }} onClick={(e) => e.preventDefault()}>
                Download the charter (PDF)
              </a>
            </div>
            <div className="split-media">
              <img src="/media/hero-goat.png" alt="Goat wearing collar comfortably" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Learning Hub */}
      <section className="section" id="learning">
        <div className="container">
          <Reveal className="shead center">
            <span className="eyebrow">Learning Hub</span>
            <h2 className="t-h2">Become a HERDOS-certified farmer.</h2>
          </Reveal>
          <div className="vp-grid">
            <Reveal className="vp-card">
              <h3>Getting started</h3>
              <p>Fit the collar, pair it, and draw your first virtual paddock.</p>
              <span className="tcard-meta">4 lessons · 25 min</span>
            </Reveal>
            <Reveal className="vp-card">
              <h3>Reading health alerts</h3>
              <p>Understand rumination, posture and temperature signals.</p>
              <span className="tcard-meta">5 lessons · 35 min</span>
            </Reveal>
            <Reveal className="vp-card">
              <h3>Grazing management</h3>
              <p>Plan rotations, exclusion zones and bad-paddock alerts.</p>
              <span className="tcard-meta">6 lessons · 40 min</span>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Help Centre */}
      <section className="section section--sage" id="help">
        <div className="container">
          <Reveal className="shead center">
            <span className="eyebrow">Help Centre</span>
            <h2 className="t-h2">Common questions.</h2>
          </Reveal>

          <Reveal className="faq">
            {FAQ_ITEMS.map((item) => {
              const isOpen = openFaq === item.id
              return (
                <div key={item.id} className={`faq-item ${isOpen ? 'open' : ''}`}>
                  <button
                    className="faq-q"
                    onClick={() => setOpenFaq(isOpen ? null : item.id)}
                    aria-expanded={isOpen}
                  >
                    {item.question} <span className="ic"></span>
                  </button>
                  <div
                    className="faq-a"
                    style={{
                      maxHeight: isOpen ? '250px' : '0px',
                      transition: 'max-height var(--dur) var(--ease)',
                    }}
                  >
                    <p>{item.answer}</p>
                  </div>
                </div>
              )
            })}
          </Reveal>

          <Reveal style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/contact/" className="tlink">
              Contact support {ICON.arrow}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
