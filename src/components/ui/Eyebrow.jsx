import { forwardRef } from 'react'

const Eyebrow = forwardRef((
  {
    children,
    className = '',
    ...props
  },
  ref
) => {
  return (
    <div ref={ref} className={`eyebrow ${className}`.trim()} {...props}>
      {children}
    </div>
  )
})

Eyebrow.displayName = 'Eyebrow'

export default Eyebrow
