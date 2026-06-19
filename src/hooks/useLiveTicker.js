import { useState, useEffect } from 'react'

const INITIAL = {
  animals: 12847,
  collars: 3204,
  alerts: 18,
}

export function useLiveTicker() {
  const [tickers, setTickers] = useState(INITIAL)

  useEffect(() => {
    const interval = setInterval(() => {
      setTickers((prev) => ({
        animals: Math.random() < 0.6 ? prev.animals + Math.floor(Math.random() * 3) + 1 : prev.animals,
        collars: Math.random() < 0.32 ? prev.collars + 1 : prev.collars,
        alerts: Math.random() < 0.08 ? prev.alerts + 1 : prev.alerts,
      }))
    }, 6500)

    return () => clearInterval(interval)
  }, [])

  return tickers
}
