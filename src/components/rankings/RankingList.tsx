'use client'

import Link from 'next/link'
import StarRating from '@/components/ui/StarRating'

export type RankedFirm = {
  id: string | number
  name: string
  logo: string
  slug: string
  rating: number
  reviews: number
  tag: string
  category: string
  profitSplit: string
  maxDrawdown: string
  challengeFee: string
  steps: number
  instantFunding: boolean
  reason: string
  highlight: { label: string; value: string }
}

export type RankingCategory = {
  id: string
  label: string
  icon: string
  description: string
  metricLabel: string
  firms: RankedFirm[]
}

const RANK_STYLES: Record<number, { bg: string; color: string; border: string }> = {
  1: { bg: 'linear-gradient(135deg, #ffd700, #f59e0b)', color: '#1a0a00', border: 'rgba(255,215,0,0.3)' },
  2: { bg: 'linear-gradient(135deg, #e2e8f0, #94a3b8)', color: '#0f1923', border: 'rgba(203,213,225,0.3)' },
  3: { bg: 'linear-gradient(135deg, #cd7f32, #92400e)', color: '#fff8f0', border: 'rgba(205,127,50,0.3)' },
}

function RankBadge({ rank }: { rank: number }) {
  const style = RANK_STYLES[rank]
  return (
    <div style={{
      width: '38px', height: '38px', borderRadius: '10px',
      background: style ? style.bg : 'rgba(255,255,255,0.04)',
      border: style ? `1px solid ${style.border}` : '1px solid rgba(255,255,255,0.08)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      <span style={{
        fontSize: rank <= 9 ? '15px' : '12px',
        fontWeight: 800,
        color: style ? style.color : '#475569',
      }}>
        {rank <= 3 ? ['🥇', '🥈', '🥉'][rank - 1] : `#${rank}`}
      </span>
    </div>
  )
}

const EDITORIAL_TAGS = new Set(["EDITOR'S CHOICE", 'TOP RATED', 'FUTURES #1', 'BEST VALUE'])

type Props = {
  ranking: RankingCategory
}

export default function RankingList({ ranking }: Props) {
  return (
    <div>
      {/* Section header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <span style={{ fontSize: '26px' }}>{ranking.icon}</span>
          <h2 style={{
            fontSize: '22px', fontWeight: 700, color: '#f1f5f9', margin: 0,
            fontFamily: 'var(--font-geist-sans), Inter, sans-serif',
          }}>
            {ranking.label}
          </h2>
        </div>
        <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0, paddingLeft: '38px' }}>
          {ranking.description}
        </p>
      </div>

      {/* Ranked rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {ranking.firms.map((firm, i) => {
          const rank = i + 1
          const isTop3 = rank <= 3
          const isEditorial = EDITORIAL_TAGS.has(firm.tag)
          return (
            <div
              key={firm.id}
              className="anim-fade-up"
              style={{
                background: '#0d1117',
                border: `1px solid ${isTop3 ? 'rgba(255,255,255,0.09)' : 'rgba(255,255,255,0.07)'}`,
                borderRadius: '14px', padding: '22px',
                position: 'relative', overflow: 'hidden',
                transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s',
                animationDelay: `${i * 60}ms`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.13)'
                e.currentTarget.style.background = '#111827'
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = isTop3 ? 'rgba(255,255,255,0.09)' : 'rgba(255,255,255,0.07)'
                e.currentTarget.style.background = '#0d1117'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* #1 accent strip */}
              {rank === 1 && (
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, #00ff88, #00cc6a)',
                }} />
              )}

              {/* Main row */}
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <RankBadge rank={rank} />

                {/* Firm logo */}
                <div style={{
                  width: '42px', height: '42px',
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: '10px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 900, fontSize: '13px', color: '#94a3b8',
                  flexShrink: 0,
                }}>
                  {firm.logo}
                </div>

                {/* Firm info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  {/* Name + tags */}
                  <div style={{
                    display: 'flex', flexWrap: 'wrap', gap: '8px',
                    alignItems: 'center', marginBottom: '6px',
                  }}>
                    <span style={{ fontWeight: 700, fontSize: '16px', color: '#f1f5f9' }}>
                      {firm.name}
                    </span>
                    <span style={{
                      background: isEditorial ? 'rgba(0,255,136,0.08)' : 'rgba(255,255,255,0.04)',
                      border: isEditorial ? '1px solid rgba(0,255,136,0.2)' : '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '4px', padding: '1px 7px',
                      fontSize: '10px', fontWeight: 700,
                      color: isEditorial ? '#00ff88' : '#94a3b8',
                      letterSpacing: '1px',
                    }}>
                      {firm.tag}
                    </span>
                    <span style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: '4px', padding: '1px 7px',
                      fontSize: '10px', color: '#475569', textTransform: 'capitalize',
                    }}>
                      {firm.instantFunding ? 'Instant' : `${firm.steps === 0 ? 'Instant' : firm.steps + '-Step'}`} · {firm.category}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <StarRating rating={firm.rating} size={11} />
                      <span style={{ fontSize: '12px', color: '#475569' }}>{firm.rating} · {firm.reviews.toLocaleString()}</span>
                    </span>
                  </div>

                  {/* Reason */}
                  <p style={{
                    fontSize: '13px', color: '#94a3b8',
                    margin: '0 0 14px', lineHeight: 1.65,
                  }}>
                    {firm.reason}
                  </p>

                  {/* Metrics + CTA */}
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                    {/* Profit split — lime */}
                    <div style={{
                      background: 'rgba(0,0,0,0.25)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: '6px', padding: '5px 10px',
                    }}>
                      <div style={{ fontSize: '9px', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Split</div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#00ff88' }}>{firm.profitSplit}</div>
                    </div>
                    {/* Max drawdown — amber */}
                    <div style={{
                      background: 'rgba(0,0,0,0.25)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: '6px', padding: '5px 10px',
                    }}>
                      <div style={{ fontSize: '9px', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Max DD</div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#f59e0b' }}>{firm.maxDrawdown}</div>
                    </div>
                    {/* Fee — neutral */}
                    <div style={{
                      background: 'rgba(0,0,0,0.25)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: '6px', padding: '5px 10px',
                    }}>
                      <div style={{ fontSize: '9px', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Fee</div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#f1f5f9' }}>{firm.challengeFee}</div>
                    </div>

                    {/* Key highlight — cyan */}
                    <div style={{
                      background: '#0e2030',
                      border: '1px solid rgba(34,211,238,0.2)',
                      borderRadius: '6px', padding: '5px 10px',
                    }}>
                      <div style={{ fontSize: '9px', color: '#22d3ee', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {firm.highlight.label}
                      </div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#22d3ee' }}>
                        {firm.highlight.value}
                      </div>
                    </div>

                    {/* CTA */}
                    <Link
                      href={`/firms/${firm.slug}`}
                      style={{
                        marginLeft: 'auto', padding: '8px 20px',
                        background: '#00ff88', color: '#060b14',
                        borderRadius: '8px', fontWeight: 700,
                        fontSize: '13px', textDecoration: 'none',
                        whiteSpace: 'nowrap', flexShrink: 0,
                        transition: 'transform 0.15s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.02)')}
                      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                    >
                      View Firm →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
