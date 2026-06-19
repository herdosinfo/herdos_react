import { forwardRef } from 'react'

const Button = forwardRef((
  {
    children,
    variant = 'primary',
    size = 'base',
    fullWidth = false,
    className = '',
    ...props
  },
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
    <button
      ref={ref}
      className={`btn ${variantClass} ${sizeClass} ${fullClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = 'Button'

export default Button
