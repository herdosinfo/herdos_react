function StarIcon({ filled = true }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"
      fill={filled ? '#FCBD16' : 'none'}
      stroke={filled ? '#FCBD16' : '#CCCCCC'}
      strokeWidth="2"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

export default function StarRating({ count = 5, max = 5 }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${count} out of ${max} stars`}>
      {Array.from({ length: max }, (_, i) => (
        <StarIcon key={i} filled={i < count} />
      ))}
    </div>
  )
}
