import { useState } from 'react'
import Reveal from '../components/common/Reveal'
import FinalCTA from '../components/common/FinalCTA'

const CHIPS = ['All Stories', 'Goat Farmers', 'Sheep Farmers', 'FPOs & Cooperatives']

const STORIES = [
  {
    id: 1,
    image: '/media/field.jpg',
    alt: "Ramesh Patil's farm",
    category: 'Goat Farmers',
    subcat: 'Goat Farmer · Maharashtra',
    title: 'Ramesh Patil — 80 goats, Solapur',
    text: '"We caught a respiratory issue 48 hours before symptoms and stopped an outbreak."',
    meta: 'Saved ₹1.8L in 6 months',
  },
  {
    id: 2,
    image: '/media/herd.webp',
    alt: "Amit Prajapati's flock",
    category: 'Sheep Farmers',
    subcat: 'Sheep Farmer · Gujarat',
    title: 'Amit Prajapati — 1,500 head, Kutch',
    text: '"Virtual fencing removed physical fences across our community grazing land."',
    meta: '1,200 labour hours saved / year',
  },
  {
    id: 3,
    image: '/media/field-square.jpg',
    alt: "Sunita Devi's flock",
    category: 'Sheep Farmers',
    subcat: 'Sheep Operator · Rajasthan',
    title: 'Sunita Devi — 600 head, Ajmer',
    text: '"Anti-tamper and geofence alerts saved our flock from stray dogs near the highway."',
    meta: '47% fewer losses',
  },
  {
    id: 4,
    image: '/media/fencing.png',
    alt: 'Deccan FPO',
    category: 'FPOs & Cooperatives',
    subcat: 'FPO · Karnataka',
    title: 'Deccan Small Ruminant FPO — 4,200 head',
    text: '"We rolled HERDOS across 38 member farms with one shared dashboard."',
    meta: '38 farms onboarded',
  },
  {
    id: 5,
    image: '/media/goat.png',
    alt: "Lakshmi's goats",
    category: 'Goat Farmers',
    subcat: 'Goat Farmer · Telangana',
    title: 'Lakshmi R. — 140 goats, Warangal',
    text: '"Find Animal mode locates strays in dense scrub in minutes, not hours."',
    meta: '6 hrs/day saved',
  },
  {
    id: 6,
    image: '/media/collar-front.png',
    alt: 'Breeding operation',
    category: 'FPOs & Cooperatives',
    subcat: 'Breeding Co-op · Tamil Nadu',
    title: 'Kongu Breeders Collective — 900 head',
    text: '"Per-animal behavioural records changed how we plan breeding cycles."',
    meta: '+22% farm profitability',
  },
]

export default function FarmersPage() {
  const [activeChip, setActiveChip] = useState('All Stories')

  const filteredStories = STORIES.filter((s) => {
    if (activeChip === 'All Stories') return true
    return s.category === activeChip
  })

  return (
    <>
      {/* Page Hero */}
      <section className="subhero subhero--center hero">
        <div className="container" style={{ maxWidth: '760px' }}>
          <Reveal>
            <span className="breadcrumb">Our Farmers</span>
            <h1 className="t-display">The people who feed India, building its future.</h1>
            <p>
              From single-family herds to community grazing cooperatives — here's how farmers across
              India are using HERDOS.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Stories Section */}
      <section className="section" id="goat">
        <div className="container">
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
            {filteredStories.map((story) => (
              <Reveal key={story.id}>
                <article className="bcard">
                  <div className="bcard-img">
                    <img src={story.image} alt={story.alt} />
                  </div>
                  <div className="bcard-body">
                    <span className="bcard-cat">{story.subcat}</span>
                    <h4>{story.title}</h4>
                    <p>{story.text}</p>
                    <span className="tcard-meta" style={{ color: 'var(--green)', fontWeight: 700 }}>
                      {story.meta}
                    </span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <FinalCTA
        pill="Become a pilot farmer"
        headline="Your story could be next."
        lead="Join farmers, cooperatives and FPOs deploying HERDOS across India."
        hasSecondary={false}
      />
    </>
  )
}
