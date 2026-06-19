import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'

export function useCountUp(target, duration = 2, decimals = 0) {
  const [displayValue, setDisplayValue] = useState(0)
  const countRef = useRef({ value: 0 })

  useEffect(() => {
    gsap.to(countRef.current, {
      value: target,
      duration,
      onUpdate: () => {
        setDisplayValue(
          decimals > 0
            ? countRef.current.value.toFixed(decimals)
            : Math.floor(countRef.current.value)
        )
      },
      ease: 'power3.out',
    })
  }, [target, duration, decimals])

  return displayValue
}
