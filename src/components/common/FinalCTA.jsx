import { Link } from 'react-router-dom'
import Reveal from './Reveal'

export default function FinalCTA({
  pill = 'Limited pilot slots this season',
  hasPill = true,
  headline = 'Bring HERDOS to your farm.',
  lead = 'Join pilot programs across India. Tell us about your herd and we\'ll set up a walkthrough within 48 hours.',
  primaryLabel = 'Request a Pilot Demo',
  primaryTo = '/contact/',
  primaryBtnClass = 'btn--white',
  secondaryLabel = 'Talk to Our Team',
  secondaryTo = '/contact/',
  hasSecondary = true,
}) {
  return (
    <section className="section finalcta">
      <div className="container">
        <Reveal>
          {hasPill && (
            <span className="pill pill--gold">
              <span className="dot"></span> {pill}
            </span>
          )}
          <h2 className="t-h2">{headline}</h2>
          <p>{lead}</p>
          <div className="hero-cta">
            <Link to={primaryTo} className={`btn ${primaryBtnClass} btn--lg`}>
              {primaryLabel}
            </Link>
            {hasSecondary && (
              <Link to={secondaryTo} className="btn btn--ghostw btn--lg">
                {secondaryLabel}
              </Link>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
