import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import Reveal from './Reveal'

function inr(n) {
  return '₹' + Math.round(n).toLocaleString('en-IN')
}

export default function ROICalculator({
  type = 'goats', // 'goats' or 'sheep'
  minHerd = 10,
  maxHerd = 2000,
  defaultHerd = 100,
  stepHerd = 10,
}) {
  const [herd, setHerd] = useState(defaultHerd)
  const [labor, setLabor] = useState(12000)
  const [loss, setLoss] = useState(8)

  const results = useMemo(() => {
    const H = Number(herd)
    const L = Number(labor)
    const R = Number(loss)
    const laborSave = Math.round(L * 12 * 0.5)
    const lossSave = Math.round(H * (R / 100) * 9000 * 0.47)
    const sub = Math.round(H * 1200)
    const net = laborSave + lossSave - sub
    const payback = net > 0 ? (sub / (net / 12)).toFixed(1).replace(/\.0$/, '') + ' months' : '—'
    return {
      net: Math.max(net, 0),
      payback,
    }
  }, [herd, labor, loss])

  const labelHerd = type === 'goats' ? 'Number of goats' : 'Number of sheep'

  return (
    <section className="section" id="roi">
      <div className="container">
        <Reveal className="shead center">
          <span className="eyebrow">{type === 'goats' ? 'ROI for goats' : 'ROI for sheep'}</span>
          <h2 className="t-h2">See how much you save per season.</h2>
        </Reveal>

        <Reveal className="roi" data-roi="">
          <div className="roi-inputs">
            <div className="roi-group">
              <label htmlFor="roi-herd">
                {labelHerd} <span id="roi-herd-v">{herd.toLocaleString()} animals</span>
              </label>
              <input
                id="roi-herd"
                className="roi-slider"
                type="range"
                min={minHerd}
                max={maxHerd}
                step={stepHerd}
                value={herd}
                onChange={(e) => setHerd(Number(e.target.value))}
              />
            </div>
            <div className="roi-group">
              <label htmlFor="roi-labor">
                Labor cost / herder / month <span id="roi-labor-v">{inr(labor)}/mo</span>
              </label>
              <input
                id="roi-labor"
                className="roi-slider"
                type="range"
                min="6000"
                max="30000"
                step="500"
                value={labor}
                onChange={(e) => setLabor(Number(e.target.value))}
              />
            </div>
            <div className="roi-group">
              <label htmlFor="roi-loss">
                Annual loss rate <span id="roi-loss-v">{loss.toFixed(1)}%</span>
              </label>
              <input
                id="roi-loss"
                className="roi-slider"
                type="range"
                min="1"
                max="20"
                step="0.5"
                value={loss}
                onChange={(e) => setLoss(Number(e.target.value))}
              />
            </div>
            <p className="roi-note">Modelled estimate. Commercial pricing is being validated through pilot programs.</p>
          </div>
          <div className="roi-out">
            <span className="eyebrow">Estimated net annual benefit</span>
            <span className="roi-net" id="roi-net">
              {inr(results.net)}
            </span>
            <div className="roi-row">
              <span>Payback period</span>
              <strong id="roi-pay">{results.payback}</strong>
            </div>
            <Link to="/contact/" className="btn btn--white" style={{ marginTop: '0.6rem' }}>
              Get a custom quote
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
