import { useCountUp } from '../../hooks'

function CountUp({ target, duration = 2, decimals = 0, suffix = '' }) {
  const value = useCountUp(target, duration, decimals)

  return (
    <span className="count-up">
      {value}
      {suffix}
    </span>
  )
}

export default CountUp
