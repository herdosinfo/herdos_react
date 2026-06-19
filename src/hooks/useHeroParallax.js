import { useMotionValue, useTransform } from 'framer-motion'
import { useCallback, useMemo } from 'react'

const prefersReduced = typeof window !== 'undefined'
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : false
const isTouchDevice = typeof window !== 'undefined' && 'ontouchstart' in window

export function useHeroParallax() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const imgX = useTransform(mouseX, [-1, 1], [-18, 18])
  const imgY = useTransform(mouseY, [-1, 1], [-18, 18])

  const handleMouseMove = useCallback((e) => {
    if (prefersReduced || isTouchDevice) return
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left - rect.width / 2) * 0.018)
    mouseY.set((e.clientY - rect.top - rect.height / 2) * 0.018)
  }, [mouseX, mouseY])

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0)
    mouseY.set(0)
  }, [mouseX, mouseY])

  const imageStyle = useMemo(() => ({
    x: imgX,
    y: imgY,
  }), [imgX, imgY])

  return { handleMouseMove, handleMouseLeave, imageStyle }
}
