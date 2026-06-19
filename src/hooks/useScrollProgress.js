import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

export function useScrollProgress() {
  const progressRef = useRef(null)

  useEffect(() => {
    const progressBar = progressRef.current
    if (!progressBar) return

    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0
      gsap.set(progressBar, { width: scrollProgress + '%' })
    }

    window.addEventListener('scroll', updateProgress, { passive: true })
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return progressRef
}
