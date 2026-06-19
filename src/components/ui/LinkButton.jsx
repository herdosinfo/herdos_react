import { forwardRef } from 'react'
import { Link } from 'react-router-dom'

const LinkButton = forwardRef((
  { children, to, variant = 'primary', size = 'base', fullWidth = false, className = '', ...props },
  ref
) => {
  const sizeClass = {
    base: '',
    lg: 'btn--lg',
  }[size]

  const variantClass = {
    primary: 'btn--primary',
    outline: 'btn--outline',
    white: 'btn--white',
    ghostw: 'btn--ghostw',
  }[variant]

  const fullClass = fullWidth ? 'btn--full' : ''

  return (
    <Link
      ref={ref}
      to={to}
      className={`btn ${variantClass} ${sizeClass} ${fullClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </Link>
  )
})

LinkButton.displayName = 'LinkButton'

export default LinkButton
