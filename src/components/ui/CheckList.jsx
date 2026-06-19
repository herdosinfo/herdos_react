function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

export default function CheckList({ items = [], two = false, dark = false }) {
  const colorClass = dark ? 'text-white/90' : 'text-forest'
  const iconColorClass = dark ? 'text-green-bright' : 'text-green'
  const gridClass = two ? 'grid grid-cols-1 sm:grid-cols-2 gap-3' : 'flex flex-col gap-3'

  return (
    <ul className={`checks ${gridClass}`} role="list">
      {items.map((item, i) => (
        <li key={i} className={`flex items-start gap-2 text-sm font-medium ${colorClass}`}>
          <span className={`mt-0.5 flex-shrink-0 ${iconColorClass}`}>
            <CheckIcon />
          </span>
          {item}
        </li>
      ))}
    </ul>
  )
}
