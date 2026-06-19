import { Link } from 'react-router-dom'
import Reveal from '../components/common/Reveal'
import FinalCTA from '../components/common/FinalCTA'

const TIMELINE = [
  { phase: 'Phase 1', heading: 'Prototype', body: 'Collar hardware, firmware, HERDOS Intelligence, the app and the gateway.' },
  { phase: 'Phase 2', heading: 'IP protection', body: 'Prior-art analysis and patent filings for the intelligence and collar design.' },
  { phase: 'Phase 3', heading: 'Field trials', body: 'Validation across multiple breeds and grazing environments.' },
  { phase: 'Phase 4', heading: 'Pilot & launch', body: 'Deployments with farmers, cooperatives, FPOs and development programs.' },
  { phase: 'Phase 5', heading: 'Scale-up', body: '100,000 HERDOS collars within five years of commercial launch.' },
]

const VALUES = [
  { title: 'Farmer first', desc: 'Every decision is judged by whether it helps a working farmer earn more and worry less.' },
  { title: 'Animal welfare', desc: 'Welfare is a design constraint — the gentlest effective guidance, always.' },
  { title: 'Field-proven', desc: 'We validate on real breeds, real land and real grazing conditions, not in a lab.' },
  { title: 'Open innovation', desc: 'We build with partners — cooperatives, FPOs and development programs.' },
]

const TEAM_MEMBERS = [
  {
    id: 1,
    name: 'Ananth',
    role: 'Co-Founder & CEO',
    bio: 'Agricultural engineer focused on small-ruminant systems and precision livestock management.',
    photo: '/media/ananth-team.png',
  },
  {
    id: 2,
    name: 'Gowtham',
    role: 'Co-Founder & CTO',
    bio: 'Embedded systems engineer. Designed the HERDOS solar collar and power management system.',
    photo: '/media/gowtham-team.png',
  },
  {
    id: 3,
    name: 'Rajesh Kumar',
    role: 'Founder & CEO',
    bio: 'Agricultural engineer focused on small-ruminant systems.',
    photo: null,
  },
  {
    id: 4,
    name: 'Dr. Anjali Sharma',
    role: 'Head of Animal Health',
    bio: 'Veterinary data scientist leading illness-detection models.',
    photo: null,
  },
  {
    id: 5,
    name: 'Dr. Vikram Singh',
    role: 'Head of Hardware',
    bio: 'Embedded & power systems for rugged field devices.',
    photo: null,
  },
]

const ICON = {
  arrow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
}

export default function AboutPage() {
  return (
    <>
      {/* Subhero */}
      <section className="subhero subhero--center hero">
        <div className="container" style={{ maxWidth: '780px' }}>
          <Reveal>
            <span className="breadcrumb">About</span>
            <h1 className="t-display">We're building the digital backbone of India's livestock economy.</h1>
            <p>India has one of the world's largest sheep and goat populations — and almost none of it is managed with technology. We started HERDOS to change that, farmer first.</p>
          </Reveal>
        </div>
      </section>

      {/* Our Story */}
      <section className="section">
        <div className="container">
          <Reveal className="split">
            <div className="split-text prose">
              <span className="eyebrow">Our story</span>
              <h2 className="t-h3">From a field problem to a field OS.</h2>
              <p>More than 80% of India's 223 million sheep and goats are still managed by hand — continuous herding, physical fences, and illness caught only once it's visible. The cost falls on the farmers who can least afford it.</p>
              <p>HERDOS combines virtual fencing and early illness detection into one solar-powered collar, built specifically for small ruminants and the realities of Indian grazing land.</p>
            </div>
            <div className="split-media">
              <img src="/media/field.jpg" alt="Indian grazing landscape" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Roadmap */}
      <section className="section section--sage">
        <div className="container">
          <Reveal className="shead center">
            <span className="eyebrow">Roadmap</span>
            <h2 className="t-h2">From prototype to 100,000 collars.</h2>
          </Reveal>
          <Reveal className="timeline">
            {TIMELINE.map((item) => (
              <div className="tl-item" key={item.phase}>
                <span className="tl-year">{item.phase}</span>
                <h4>{item.heading}</h4>
                <p>{item.body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="container">
          <Reveal className="shead center">
            <span className="eyebrow">Our values</span>
            <h2 className="t-h2">What we hold to.</h2>
          </Reveal>
          <div className="vp-grid" style={{ gridTemplateColumns: 'repeat(2,1fr)' }}>
            {VALUES.map((v, idx) => (
              <Reveal className="vp-card" key={idx}>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="section section--sage">
        <div className="container">
          <Reveal className="shead center">
            <span className="eyebrow">Leadership</span>
            <h2 className="t-h2">The team building it.</h2>
          </Reveal>
          <div className="team-grid">
            {TEAM_MEMBERS.map((member) => (
              <Reveal className="team-card" key={member.id}>
                <div
                  className="ph"
                  style={member.photo ? { backgroundImage: `url(${member.photo})` } : undefined}
                ></div>
                <div className="info">
                  <h5>{member.name}</h5>
                  <div className="role">{member.role}</div>
                  <p>{member.bio}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p style={{ textAlign: 'center', color: 'var(--faint)', fontSize: '0.82rem', marginTop: '1.25rem' }}>
            Team photos are placeholders pending real headshots.
          </p>
        </div>
      </section>

      {/* Careers */}
      <section className="section" id="careers">
        <div className="container">
          <Reveal className="shead">
            <span className="eyebrow">Careers</span>
            <h2 className="t-h2">Build the future of Indian livestock.</h2>
          </Reveal>
          <div className="role-grid" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Link to="/contact/" className="role-card">
              <div>
                <h4>Firmware Engineer</h4>
                <span className="meta">Hardware · Bengaluru · Full-time</span>
              </div>
              <span className="tlink">Apply {ICON.arrow}</span>
            </Link>
            <Link to="/contact/" className="role-card">
              <div>
                <h4>Veterinary Data Analyst</h4>
                <span className="meta">Animal Health · Remote · Full-time</span>
              </div>
              <span className="tlink">Apply {ICON.arrow}</span>
            </Link>
            <Link to="/contact/" className="role-card">
              <div>
                <h4>Field Deployment Lead</h4>
                <span className="meta">Operations · Pune · Full-time</span>
              </div>
              <span className="tlink">Apply {ICON.arrow}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Press */}
      <section className="section section--sage" id="press">
        <div className="container">
          <Reveal className="shead">
            <span className="eyebrow">Press & media</span>
            <h2 className="t-h2">HERDOS in the news.</h2>
          </Reveal>
          <div className="role-grid" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <a href="#" className="role-card">
              <div>
                <h4>HERDOS unveils India's first virtual fence for small ruminants</h4>
                <span className="meta">Press Release · 2026</span>
              </div>
              <span className="tlink">Read {ICON.arrow}</span>
            </a>
            <Link to="/contact/" className="role-card">
              <div>
                <h4>Media kit & brand assets</h4>
                <span className="meta">Logos · founder photos · product shots</span>
              </div>
              <span className="tlink">Request {ICON.arrow}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <FinalCTA
        hasPill={false}
        headline="Join us."
        lead="Help build the digital backbone of India's livestock economy."
        primaryLabel="View open roles"
        primaryTo="#careers"
        secondaryLabel="Get in touch"
        secondaryTo="/contact/"
      />
    </>
  )
}
