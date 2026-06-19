import { useScrollProgress } from '../../hooks/useScrollProgress'

export default function ScrollProgressBar() {
  const progressRef = useScrollProgress()
  return (
    <div
      ref={progressRef}
      className="scroll-bar"
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuenow={0}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  )
}
