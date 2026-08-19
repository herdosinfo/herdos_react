import { useState, useMemo } from 'react'

function calculate(herd, labor, loss) {
  const laborSave = Math.round(labor * 12 * 0.5)          // 50% of annual herder cost
  const lossSave = Math.round(herd * (loss / 100) * 9000 * 0.47) // animals × loss-rate × value × recovery
  const sub = Math.round(herd * 1200)                     // ₹1200/animal/yr subscription
  const grossBenefit = laborSave + lossSave
  const net = grossBenefit - sub
  const hasROI = net > 0
  const payback = hasROI
    ? (sub / (net / 12)).toFixed(1).replace(/\.0$/, '') + ' months'
    : '—'
  return { laborSave, lossSave, sub, grossBenefit, net, payback, hasROI }
}

export function useROICalc(defaults) {
  const [herd, setHerd] = useState(defaults?.herdDefault ?? 100)
  const [labor, setLabor] = useState(defaults?.laborDefault ?? 12000)
  const [loss, setLoss] = useState(defaults?.lossDefault ?? 8)

  const results = useMemo(() => calculate(herd, labor, loss), [herd, labor, loss])

  return { herd, labor, loss, setHerd, setLabor, setLoss, results }
}
