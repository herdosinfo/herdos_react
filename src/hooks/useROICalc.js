import { useState, useMemo } from 'react'

function calculate(herd, labor, loss) {
  const laborSave = Math.round(labor * 12 * 0.5)
  const lossSave = Math.round(herd * (loss / 100) * 9000 * 0.47)
  const sub = Math.round(herd * 1200)
  const net = laborSave + lossSave - sub
  const payback = net > 0 ? (sub / (net / 12)).toFixed(1).replace(/\.0$/, '') + ' months' : '—'
  return { laborSave, lossSave, sub, net: Math.max(net, 0), payback }
}

export function useROICalc(defaults) {
  const [herd, setHerd] = useState(defaults?.herdDefault ?? 100)
  const [labor, setLabor] = useState(defaults?.laborDefault ?? 12000)
  const [loss, setLoss] = useState(defaults?.lossDefault ?? 8)

  const results = useMemo(() => calculate(herd, labor, loss), [herd, labor, loss])

  return { herd, labor, loss, setHerd, setLabor, setLoss, results }
}
