export default function SectionHeader({ eyebrow, title, lead, description, center = false, dark = false }) {
  const headingColor = dark ? 'text-white' : 'text-forest'
  const leadColor = dark ? 'text-white/60' : 'text-muted'

  // support both 'lead' and 'description' prop names
  const leadText = lead || description

  return (
    <div className={`shead ${center ? 'center' : ''}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      {title && <h2 className={`t-h2 mt-3 ${headingColor}`}>{title}</h2>}
      {leadText && <p className={`t-lead mt-4 max-w-3xl ${leadColor}`}>{leadText}</p>}
    </div>
  )
}
