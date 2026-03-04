'use client'

import { useEffect, useRef, useState } from 'react'

type Props = {
  value: string
  style?: React.CSSProperties
}

function parseValue(raw: string): { num: number; suffix: string; prefix: string } {
  // Handles: "50+", "9,000+", "4M+", "100%"
  const cleaned = raw.replace(/,/g, '')
  const match = cleaned.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)([KMB%+]*)$/)
  if (!match) return { num: 0, suffix: raw, prefix: '' }
  const prefix = match[1] || ''
  const num = parseFloat(match[2])
  const suffix = match[3] || ''
  return { num, suffix, prefix }
}

function formatNum(n: number, original: string): string {
  // Preserve original formatting style (commas, decimals)
  if (original.includes(',')) {
    return Math.floor(n).toLocaleString()
  }
  if (original.includes('.')) {
    return n.toFixed(1)
  }
  return Math.floor(n).toString()
}

export default function CountUp({ value, style }: Props) {
  const [display, setDisplay] = useState('0')
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const { num, suffix, prefix } = parseValue(value)
          const duration = 1400
          const start = performance.now()

          const tick = (now: number) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            // Cubic ease-out
            const eased = 1 - Math.pow(1 - progress, 3)
            const current = eased * num
            setDisplay(prefix + formatNum(current, value) + suffix)
            if (progress < 1) requestAnimationFrame(tick)
          }

          requestAnimationFrame(tick)
          observer.disconnect()
        }
      },
      { threshold: 0.4 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [value])

  return (
    <span ref={ref} style={style}>
      {display === '0' ? value : display}
    </span>
  )
}
