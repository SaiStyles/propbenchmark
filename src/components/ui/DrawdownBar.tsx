type Props = {
  percent: number // e.g. 10 for 10%
  max?: number    // scale max, default 20
}

export default function DrawdownBar({ percent, max = 20 }: Props) {
  const fill = Math.min(percent / max, 1)
  // Color transitions: green → yellow → red
  const hue = Math.round(120 - fill * 120) // 120 (green) → 0 (red)
  const color = `hsl(${hue}, 85%, 50%)`

  return (
    <div style={{
      width: '100%',
      height: '3px',
      background: 'rgba(255,255,255,0.06)',
      borderRadius: '2px',
      marginTop: '6px',
      overflow: 'hidden',
    }}>
      <div style={{
        width: `${fill * 100}%`,
        height: '100%',
        background: color,
        borderRadius: '2px',
        transition: 'width 0.5s ease',
      }} />
    </div>
  )
}
