'use client'

import Link from 'next/link'
import { Firm } from '@/components/firms/FirmCard'

type Props = {
  firms: Firm[]
  onRemove: (slug: string) => void
}

const EDITORIAL_TAGS = new Set(["EDITOR'S CHOICE", 'TOP RATED', 'FUTURES #1', 'BEST VALUE'])

// For each metric, return value + whether this firm has the best value (for highlighting)
const METRICS: {
  label: string
  render: (f: Firm) => string
  best?: (firms: Firm[]) => string  // slug of best firm for this metric
}[] = [
  {
    label: 'Rating',
    render: f => `★ ${f.rating}`,
    best: firms => firms.reduce((a, b) => a.rating >= b.rating ? a : b).slug,
  },
  {
    label: 'Reviews',
    render: f => f.reviews.toLocaleString(),
    best: firms => firms.reduce((a, b) => a.reviews >= b.reviews ? a : b).slug,
  },
  {
    label: 'Profit Split',
    render: f => f.profitSplit,
    best: firms => firms.reduce((a, b) => parseInt(a.profitSplit) >= parseInt(b.profitSplit) ? a : b).slug,
  },
  {
    label: 'Max Drawdown',
    render: f => f.maxDrawdown,
    // Highest = most lenient = best for trader
    best: firms => firms.reduce((a, b) => parseFloat(a.maxDrawdown) >= parseFloat(b.maxDrawdown) ? a : b).slug,
  },
  {
    label: 'Challenge Fee',
    render: f => f.challengeFee,
    // Lowest fee = best
    best: firms => firms.reduce((a, b) => parseFloat(a.challengeFee.replace('$', '').replace(',', '')) <= parseFloat(b.challengeFee.replace('$', '').replace(',', '')) ? a : b).slug,
  },
  {
    label: 'Eval Steps',
    render: f => f.steps === 0 ? 'Instant' : `${f.steps}-Step`,
  },
  {
    label: 'Instant Funding',
    render: f => f.instantFunding ? '✓ Yes' : '✗ No',
  },
  {
    label: 'Weekend Hold',
    render: f => f.weekendHolding ? '✓ Yes' : '✗ No',
  },
  {
    label: 'Category',
    render: f => f.category.charAt(0).toUpperCase() + f.category.slice(1),
  },
  {
    label: 'Discount',
    render: f => `${f.discount}% OFF`,
    best: firms => firms.reduce((a, b) => a.discount >= b.discount ? a : b).slug,
  },
]

export default function CompareTable({ firms, onRemove }: Props) {
  const cols = `160px repeat(${firms.length}, 1fr)`

  return (
    <div style={{
      background: '#0d1117',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: '16px',
      overflow: 'hidden',
    }}>
      {/* Firm header row */}
      <div style={{ display: 'grid', gridTemplateColumns: cols, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ padding: '20px 16px', background: 'rgba(0,0,0,0.2)' }} />
        {firms.map(firm => {
          const isEditorial = EDITORIAL_TAGS.has(firm.tag)
          return (
            <div key={firm.slug} style={{
              padding: '20px 16px',
              borderLeft: '1px solid rgba(255,255,255,0.07)',
              position: 'relative',
            }}>
              {/* Remove button */}
              <button
                onClick={() => onRemove(firm.slug)}
                style={{
                  position: 'absolute', top: '12px', right: '12px',
                  width: '22px', height: '22px',
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '13px', color: '#475569', lineHeight: 1,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,100,100,0.5)'
                  e.currentTarget.style.color = '#ff6464'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                  e.currentTarget.style.color = '#475569'
                }}
              >×</button>

              {/* Logo + name */}
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '12px', paddingRight: '28px' }}>
                <div style={{
                  width: '40px', height: '40px',
                  background: 'rgba(255,255,255,0.08)',
                  borderRadius: '9px', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontWeight: 900, fontSize: '12px', color: '#94a3b8',
                  flexShrink: 0,
                }}>{firm.logo}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '14px', color: '#f1f5f9', marginBottom: '4px' }}>{firm.name}</div>
                  <span style={{
                    background: isEditorial ? 'rgba(0,255,136,0.08)' : 'rgba(255,255,255,0.04)',
                    color: isEditorial ? '#00ff88' : '#94a3b8',
                    border: isEditorial ? '1px solid rgba(0,255,136,0.2)' : '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '4px', padding: '1px 6px',
                    fontSize: '9px', fontWeight: 700, letterSpacing: '1px',
                  }}>{firm.tag}</span>
                </div>
              </div>

              {/* View deal link */}
              <Link href={`/firms/${firm.slug}`} style={{
                display: 'block', textAlign: 'center',
                padding: '7px', background: '#00ff88',
                color: '#060b14', borderRadius: '6px',
                fontWeight: 700, fontSize: '12px',
                textDecoration: 'none',
              }}>
                View Deal →
              </Link>
            </div>
          )
        })}
      </div>

      {/* Metric rows */}
      {METRICS.map((metric, i) => {
        const bestSlug = metric.best ? metric.best(firms) : null
        return (
          <div key={metric.label} style={{
            display: 'grid',
            gridTemplateColumns: cols,
            borderBottom: i < METRICS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
          }}>
            {/* Label cell */}
            <div style={{
              padding: '14px 16px',
              display: 'flex', alignItems: 'center',
              fontSize: '12px', fontWeight: 600, color: '#475569',
              background: i % 2 === 0 ? '#0d1117' : 'rgba(0,0,0,0.15)',
              textTransform: 'uppercase', letterSpacing: '0.5px',
            }}>
              {metric.label}
            </div>

            {/* Value cells */}
            {firms.map(firm => {
              const value = metric.render(firm)
              const isBest = bestSlug === firm.slug
              return (
                <div key={firm.slug} style={{
                  padding: '14px 16px',
                  borderLeft: '1px solid rgba(255,255,255,0.05)',
                  display: 'flex', alignItems: 'center',
                  fontSize: '14px', fontWeight: 700,
                  color: isBest ? '#00ff88' : '#94a3b8',
                  background: isBest
                    ? 'rgba(0,255,136,0.04)'
                    : i % 2 === 0 ? '#0d1117' : 'rgba(0,0,0,0.15)',
                }}>
                  {value}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
