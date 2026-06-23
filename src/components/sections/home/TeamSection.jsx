import { Link } from 'react-router-dom'
import Reveal from '../../common/Reveal'

const TEAM_MEMBERS = [
  {
    id: 1,
    name: 'Ananth R Kulkarni',
    role: 'Co-Founder & Operations Lead',
    bio: 'Agricultural engineer focused on small-ruminant systems and precision livestock management.',
    photo: '/media/ananth-team.png',
    photoAlt: 'Ananth R Kulkarni, Co-Founder and Operations Lead at HERDOS',
  },
  {
    id: 2,
    name: 'Gowtham M A',
    role: 'Co-Founder & Technical Lead',
    bio: 'Embedded systems engineer. Designed the HERDOS solar collar and power management system.',
    photo: '/media/gowtham-team.png',
    photoAlt: 'Gowtham M A, Co-Founder and Technical Lead at HERDOS',
  },
]

const ICON = {
  arrow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
}

export default function TeamSection() {
  return (
    <section className="section" id="team">
      <div className="container">
        <Reveal className="shead center">
          <span className="eyebrow">Our founders</span>
          <h2 className="t-h2">The team building it.</h2>
          <p className="t-lead" style={{ marginTop: '1rem' }}>
            Two engineers who left comfortable careers to solve a problem that affects millions
            of Indian farming families.
          </p>
        </Reveal>

        <div className="team-grid">
          {TEAM_MEMBERS.map((member, idx) => (
            <Reveal className="team-card" key={member.id} delay={idx * 0.1}>
              <div
                className="ph"
                role="img"
                aria-label={member.photoAlt}
                style={
                  member.photo
                    ? { backgroundImage: `url(${member.photo})` }
                    : undefined
                }
              />
              <div className="info">
                <h5>{member.name}</h5>
                <div className="role">{member.role}</div>
                <p>{member.bio}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal style={{ marginTop: '2rem', textAlign: 'center' }}>
          <Link to="/about/" className="tlink">
            Our story & mission {ICON.arrow}
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
