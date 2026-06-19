import { useLiveTicker } from '../../../hooks'

export default function LiveTickerSection() {
  const { animals, collars, alerts } = useLiveTicker()

  return (
    <div className="ticker">
      <div className="container">
        <span className="ticker-item">
          <span className="ticker-dot"></span>
          <span className="ticker-num tk-animals">{animals.toLocaleString()}</span> Sheep & goats monitored
        </span>
        <span className="ticker-item">
          <span className="ticker-num tk-collars">{collars.toLocaleString()}</span> Active collars
        </span>
        <span className="ticker-item">
          <span className="ticker-num tk-alerts">{alerts.toLocaleString()}</span> Health alerts resolved
        </span>
      </div>
    </div>
  )
}
