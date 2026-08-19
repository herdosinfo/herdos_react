import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import Reveal from './Reveal'

function inr(n) {
  return '₹' + Math.round(n).toLocaleString('en-IN')
}

export default function ROICalculator({
  type = 'goats',         // 'goats' or 'sheep'
  minHerd = 10,
  maxHerd = 2000,
  defaultHerd = 100,
  stepHerd = 10,
  defaultLabor = 12000,   // monthly labor cost per herder
  defaultLoss = 8,        // annual loss rate %
}) {
  const [herd, setHerd] = useState(defaultHerd)
  const [labor, setLabor] = useState(defaultLabor)
  const [loss, setLoss] = useState(defaultLoss)

  const results = useMemo(() => {
    const H = Number(herd)
    const L = Number(labor)   // monthly cost per herder
    const R = Number(loss)    // annual loss rate %

    // Annual labor saving: 50% reduction on one herder's yearly cost
    const laborSave = Math.round(L * 12 * 0.5)

    // Annual animal-loss saving: animals × loss-rate × avg value (₹9000) × recovery rate (47%)
    const lossSave = Math.round(H * (R / 100) * 9000 * 0.47)

    // Annual Herdos subscription cost: ₹1200 per animal per year
    const sub = Math.round(H * 1200)

    const grossBenefit = laborSave + lossSave
    const net = grossBenefit - sub

    const hasROI = net > 0
    // Payback in months: subscription cost ÷ monthly net benefit
    const payback = hasROI
      ? (sub / (net / 12)).toFixed(1).replace(/\.0$/, '') + ' months'
      : '—'

    return { laborSave, lossSave, sub, grossBenefit, net, payback, hasROI }
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
                {labelHerd} <span id="roi-herd-v">{Number(herd).toLocaleString()} animals</span>
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
                Annual loss rate <span id="roi-loss-v">{Number(loss).toFixed(1)}%</span>
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
              {inr(Math.abs(results.net))}
            </span>

            {/* Savings breakdown */}
            <div className="roi-row" style={{ marginTop: '0.75rem' }}>
              <span>Labor savings</span>
              <strong>{inr(results.laborSave)}/yr</strong>
            </div>
            <div className="roi-row">
              <span>Loss reduction</span>
              <strong>{inr(results.lossSave)}/yr</strong>
            </div>
            <div className="roi-row" style={{ opacity: 0.65 }}>
              <span>Subscription cost</span>
              <strong>−{inr(results.sub)}/yr</strong>
            </div>

            <div className="roi-row" style={{ marginTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '0.5rem' }}>
              <span>Payback period</span>
              <strong id="roi-pay">
                {results.hasROI ? results.payback : 'No net benefit'}
              </strong>
            </div>

            {!results.hasROI && (
              <p style={{ fontSize: '0.78rem', opacity: 0.6, marginTop: '0.4rem', lineHeight: 1.4 }}>
                Increase herd size or loss rate to see a positive return.
              </p>
            )}

            <Link to="/contact/" className="btn btn--white" style={{ marginTop: '0.9rem' }}>
              Get a custom quote
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
