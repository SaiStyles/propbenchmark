'use client'
 
import { useState } from 'react'
import type { Firm } from '@/lib/types'
import type { RankingFirmRow } from '@/lib/queries'
import RankingList, { type RankingCategory } from './RankingList'
import { useMarketType } from '@/context/MarketTypeContext'

// ─── Category metadata — no hardcoded firm slugs ──────────────────────────────

type CategoryMeta = {
  id: string
  label: string
  icon: string
  description: string
  metricLabel: string
}

const CATEGORY_META: CategoryMeta[] = [
  {
    id: 'best_overall',
    label: 'Best Overall',
    icon: '🏆',
    description: 'Composite score across rating, payout, trust, and community feedback. The definitive list.',
    metricLabel: 'Rating',
  },
  {
    id: 'best_beginners',
    label: 'Best for Beginners',
    icon: '🌱',
    description: 'Lowest barriers to entry — minimal fees, simple rulesets, and forgiving evaluation structures.',
    metricLabel: 'Challenge Fee',
  },
  {
    id: 'best_value',
    label: 'Best Value',
    icon: '💎',
    description: 'Best challenge fee relative to profit split, drawdown limits, and evaluation difficulty.',
    metricLabel: 'Challenge Fee',
  },
  {
    id: 'most_trusted',
    label: 'Most Trusted',
    icon: '🛡️',
    description: 'Ranked by verified review count — the most community-validated firms on PropBenchmark.',
    metricLabel: 'Reviews',
  },
  {
    id: 'instant_funding',
    label: 'Instant Funding',
    icon: '⚡',
    description: 'Skip the challenge entirely — get funded on day one. For experienced traders only.',
    metricLabel: 'Entry Cost',
  },
  {
    id: 'highest_split',
    label: 'Highest Profit Split',
    icon: '💰',
    description: 'Ranked by how much of your profits you keep after passing the challenge. Every % matters.',
    metricLabel: 'Profit Split',
  },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

function matchesMarketType(firmCategory: string, marketType: 'cfd' | 'futures'): boolean {
  if (marketType === 'futures') return firmCategory === 'futures'
  return firmCategory === 'forex'
}

function buildHighestSplitFirms(firms: Firm[]): RankingCategory['firms'] {
  return firms.map(f => ({
    ...f,
    reason: `Offers a ${f.profitSplit} profit split on funded accounts — among the highest available on the market.`,
    highlight: { label: 'Profit Split', value: f.profitSplit },
  }))
}

// ─── Component ───────────────────────────────────────────────────────────────

type Props = {
  rankingsData: Record<string, RankingFirmRow[]>
  topProfitSplit: Firm[]
}

export default function RankingsPage({ rankingsData, topProfitSplit }: Props) {
const [activeId, setActiveId] = useState('best_overall')
  const { marketType } = useMarketType()

  const rankings: RankingCategory[] = CATEGORY_META.map(cat => {
    const firms: RankingCategory['firms'] =
      cat.id === 'highest_split'
        ? buildHighestSplitFirms(topProfitSplit)
        : (rankingsData[cat.id] ?? [])

    return { ...cat, firms }
  })

  const activeRanking = rankings.find(r => r.id === activeId) ?? rankings[0]

  const filteredFirms = activeRanking
    ? activeRanking.firms.filter(f => matchesMarketType(f.category, marketType))
    : []

  const marketLabel = marketType === 'futures' ? 'Futures' : 'Forex'

  const hasAnyData =
    Object.keys(rankingsData).length > 0 || topProfitSplit.length > 0

  return (
    <div>
      {/* Page header */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px 32px' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'rgba(0,255,136,0.06)', border: '1px solid rgba(0,255,136,0.15)',
          borderRadius: '20px', padding: '4px 14px',
          fontSize: '11px', color: '#00ff88',
          letterSpacing: '1px', fontWeight: 600,
          marginBottom: '16px',
        }}>
          {CATEGORY_META.length} RANKING CATEGORIES
        </div>
        <h1 style={{
          fontSize: 'clamp(28px, 4vw, 42px)',
          fontWeight: 700, color: '#f1f5f9',
          letterSpacing: '-0.5px', lineHeight: 1.1, marginBottom: '10px',
          fontFamily: 'var(--font-geist-sans), Inter, sans-serif',
        }}>
          Prop Firm Rankings
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '16px', margin: 0 }}>
          Curated lists ranking the best prop firms by what matters most to funded traders.
        </p>
      </div>

      {/* Sticky category nav */}
      <div style={{
        position: 'sticky',
        top: '64px',
        zIndex: 50,
        background: 'rgba(6,11,20,0.96)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '0 24px',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          gap: '2px',
          overflowX: 'auto',
          scrollbarWidth: 'none',
        }}>
          {CATEGORY_META.map(r => {
            const isActive = r.id === activeId
            return (
              <button
                key={r.id}
                onClick={() => setActiveId(r.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '7px',
                  padding: '14px 18px',
                  border: 'none',
                  borderBottom: isActive ? '2px solid #00ff88' : '2px solid transparent',
                  background: 'transparent',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#00ff88' : '#475569',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.15s',
                  flexShrink: 0,
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#94a3b8' }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = '#475569' }}
              >
                <span style={{ fontSize: '16px' }}>{r.icon}</span>
                {r.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Active ranking content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px 96px' }}>

        {!hasAnyData ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: '32px', marginBottom: '16px' }}>—</div>
            <p style={{ fontSize: '15px', color: '#94a3b8' }}>Rankings are unavailable right now. Please check back shortly.</p>
          </div>
        ) : filteredFirms.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: '32px', marginBottom: '16px' }}>—</div>
            <p style={{ fontSize: '15px', color: '#94a3b8' }}>
              No {marketLabel} firms in this ranking category.
            </p>
            <p style={{ fontSize: '13px', color: '#475569', marginTop: '8px' }}>
              Try switching to a different market type or category.
            </p>
          </div>
        ) : (
          <RankingList ranking={{ ...activeRanking!, firms: filteredFirms }} />
        )}

        {/* Footer note */}
        <div style={{
          marginTop: '48px',
          padding: '20px 24px',
          background: '#0d1117',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '12px',
          display: 'flex',
          gap: '16px',
          alignItems: 'flex-start',
        }}>
          <span style={{ fontSize: '20px', flexShrink: 0, marginTop: '1px' }}>ℹ️</span>
          <p style={{ fontSize: '12px', color: '#475569', margin: 0, lineHeight: 1.7 }}>
            <strong style={{ color: '#94a3b8' }}>Methodology:</strong> Rankings are based on a combination of verified trader reviews, payout history, fee structures, profit split percentages, and editorial assessment by the PropBenchmark team. All data is based on publicly available information and verified submissions. Rankings are updated monthly. PropBenchmark may earn affiliate commissions from firms listed here — this does not influence ranking positions.
          </p>
        </div>
      </div>
    </div>
  )
}
