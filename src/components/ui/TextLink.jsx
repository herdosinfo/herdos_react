import { forwardRef } from 'react'

const TextLink = forwardRef((
  {
    children,
    href,
    arrow = true,
    className = '',
    ...props
  },
  ref
) => {
  return (
    <a ref={ref} href={href} className={`tlink ${className}`.trim()} {...props}>
      {children}
      {arrow && (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      )}
    </a>
  )
})

TextLink.displayName = 'TextLink'

export default TextLink
