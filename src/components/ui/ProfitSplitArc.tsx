type Props = {
  percent: string // e.g. "90%" or "100%"
  size?: number
}

export default function ProfitSplitArc({ percent, size = 36 }: Props) {
  const value = parseFloat(percent) / 100
  const r = 13
  const cx = size / 2
  const cy = size / 2
  const circumference = 2 * Math.PI * r
  const dashOffset = circumference * (1 - value)

  return (
    <svg width={size} height={size} style={{ flexShrink: 0, transform: 'rotate(-90deg)' }}>
      {/* Track */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="3"
      />
      {/* Arc */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="#00ff88"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={dashOffset}
        style={{ transition: 'stroke-dashoffset 0.6s ease' }}
      />
    </svg>
  )
}
