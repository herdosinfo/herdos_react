import { Link } from 'react-router-dom'

const PHONE_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

export default function FarmerHelpline() {
  return (
    <div className="ustrip ustrip--prefooter">
      <div className="container">
        <span className="ustrip-left">
          {PHONE_ICON} Farmer Helpline: +91-98765-43210
        </span>
        <span className="ustrip-right">
          <a href="#">India (English)</a>
          <Link to="/contact/" className="accent">
            Become a Pilot Farmer
          </Link>
        </span>
      </div>
    </div>
  )
}
