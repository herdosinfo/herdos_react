import { forwardRef } from 'react'

const Pill = forwardRef((
  {
    children,
    variant = 'gold',
    dot = false,
    className = '',
    ...props
  },
  ref
) => {
  const variantClass = {
    gold: 'pill--gold',
    sage: 'pill--sage',
    ondark: 'pill--ondark',
  }[variant]

  return (
    <span ref={ref} className={`pill ${variantClass} ${className}`.trim()} {...props}>
      {dot && <span className="dot" />}
      {children}
    </span>
  )
})

Pill.displayName = 'Pill'

export default Pill
