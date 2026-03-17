'use client'

import { useRef, useCallback } from 'react'
import Link from 'next/link'
import FirmLogo from '@/components/ui/FirmLogo'
import StarRating from '@/components/ui/StarRating'
import type { CompareFirm, CompareAccountModel } from '@/lib/types'
import { getPrograms, getSizes, type FirmSelection } from './CompareView'

type Props = {
  allFirms: CompareFirm[]
  selections: FirmSelection[]
  onRemove: (slug: string) => void
  onChangeProgram: (slug: string, program: string) => void
  onChangeSize: (slug: string, size: number) => void
}

// ─── Formatters ───────────────────────────────────────────────────────────────

function fmtFee(n: number | null): string {
  if (n == null) return '—'
  return `$${n.toLocaleString('en-US')}`
}

function fmtSize(n: number): string {
  return n >= 1000 ? `$${n / 1000}K` : `$${n}`
}

function fmtAllocation(n: number | null): string {
  if (n == null) return '—'
  if (n >= 1_000_000) {
    const m = n / 1_000_000
    return `$${m % 1 === 0 ? m : m.toFixed(1)}M`
  }
  if (n >= 1_000) return `$${n / 1_000}K`
  return `$${n}`
}

function fmtThresholdValue(value: number, accountSize: number, category: string | null): string {
  if (category === 'futures') {
    const pctRaw = (value / accountSize) * 100
    const pct = Number.isInteger(pctRaw) ? `${pctRaw}` : pctRaw.toFixed(1)
    return `$${value.toLocaleString('en-US')} (${pct}%)`
  }
  const dollar = Math.round((value / 100) * accountSize)
  return `${value}% ($${dollar.toLocaleString('en-US')})`
}

function fmtPayoutFreq(freq: string | null): string {
  if (!freq) return '—'
  if (freq === 'on-demand') return 'On Demand'
  return freq.charAt(0).toUpperCase() + freq.slice(1)
}

const DD_TYPE_RANK: Record<string, number> = {
  'Static': 3,
  'EOD Trailing': 2,
  'Intraday Trailing': 1,
}

const PAYOUT_RANK: Record<string, number> = {
  'daily': 6,
  'on-demand': 5,
  '3-day': 4,
  'weekly': 3,
  'bi-weekly': 2,
  'monthly': 1,
}

function payoutRank(freq: string | null): number {
  if (!freq) return 0
  return PAYOUT_RANK[freq.toLowerCase().replace(/\s+/g, '-')] ?? 0
}

function getModel(firm: CompareFirm, sel: FirmSelection): CompareAccountModel | null {
  return firm.account_models.find(
    m => m.program_name === sel.programName && m.account_size === sel.accountSize
  ) ?? null
}

// ─── Winner helpers ───────────────────────────────────────────────────────────

function winnerSet(vals: (number | null)[], mode: 'lowest' | 'highest'): Set<number> {
  const nonNull = vals.filter((v): v is number => v != null)
  if (!nonNull.length) return new Set()
  const target = mode === 'lowest' ? Math.min(...nonNull) : Math.max(...nonNull)
  return new Set(vals.map((v, i) => (v === target ? i : -1)).filter(i => i >= 0))
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Badge({
  children,
  color = '#94a3b8',
  bg = 'rgba(255,255,255,0.04)',
  border = 'rgba(255,255,255,0.08)',
}: {
  children: React.ReactNode
  color?: string
  bg?: string
  border?: string
}) {
  return (
    <span style={{
      background: bg, border: `1px solid ${border}`, color,
      borderRadius: '5px', padding: '2px 8px',
      fontSize: '12px', fontWeight: 600, display: 'inline-block',
    }}>
      {children}
    </span>
  )
}

function CategoryBadge({ category }: { category: string | null }) {
  const isInstant = category?.includes('instant')
  const isFutures = category === 'futures'
  const label = isFutures ? 'Futures' : isInstant ? 'Instant Funding' : 'Evaluation'
  const color = isFutures ? '#22d3ee' : isInstant ? '#f59e0b' : '#94a3b8'
  const bg = isFutures ? '#0e2030' : isInstant ? 'rgba(245,158,11,0.08)' : 'rgba(255,255,255,0.04)'
  const border = isFutures ? 'rgba(34,211,238,0.2)' : isInstant ? 'rgba(245,158,11,0.25)' : 'rgba(255,255,255,0.08)'
  return <Badge color={color} bg={bg} border={border}>{label}</Badge>
}

// ─── Row config ───────────────────────────────────────────────────────────────

type RowDef = {
  id: string
  label: string
  isRuleBased?: boolean
  render: (model: CompareAccountModel | null, firm: CompareFirm | null, isWinner: boolean) => React.ReactNode
  winnerFn?: (models: (CompareAccountModel | null)[], firms: (CompareFirm | null)[]) => Set<number>
}

type RowGroup = {
  label: string
  category: 'cost' | 'survival' | 'payout' | 'trust'
  rows: RowDef[]
}

const ROW_GROUPS: RowGroup[] = [
  {
    label: 'COST',
    category: 'cost',
    rows: [
      {
        id: 'challenge_fee',
        label: 'Challenge Fee',
        render: (m) => (
          <span style={{ color: m?.challenge_fee != null ? '#f1f5f9' : '#475569', fontWeight: 700 }}>
            {fmtFee(m?.challenge_fee ?? null)}
          </span>
        ),
        winnerFn: (models) => winnerSet(models.map(m => m?.challenge_fee ?? null), 'lowest'),
      },
      {
        id: 'activation_fee',
        label: 'Activation Fee',
        render: (m) => {
          const fee = m?.activation_fee ?? null
          if (fee == null) return <Badge color='#00ff88' bg='rgba(0,255,136,0.08)' border='rgba(0,255,136,0.2)'>None</Badge>
          return <span style={{ color: '#f1f5f9', fontWeight: 700 }}>{fmtFee(fee)}</span>
        },
        // null treated as 0 (free = best) for comparison
        winnerFn: (models) => winnerSet(models.map(m => m?.activation_fee ?? 0), 'lowest'),
      },
      {
        id: 'total_cost',
        label: 'Total Entry Cost',
        render: (m) => {
          if (!m) return <span style={{ color: '#2a3040' }}>—</span>
          const total = (m.challenge_fee ?? 0) + (m.activation_fee ?? 0)
          return (
            <span style={{ color: '#f1f5f9', fontWeight: 800 }}>
              ${total.toLocaleString('en-US')}
            </span>
          )
        },
        winnerFn: (models) => winnerSet(
          models.map(m => m ? (m.challenge_fee ?? 0) + (m.activation_fee ?? 0) : null),
          'lowest'
        ),
      },
    ],
  },
  {
    label: 'SURVIVAL RULES',
    category: 'survival',
    rows: [
      {
        id: 'drawdown_type',
        label: 'Drawdown Type',
        render: (m) => {
          const dt = m?.drawdown_type ?? null
          if (!dt) return <span style={{ color: '#475569' }}>—</span>
          const isEOD = dt === 'EOD Trailing'
          const isIntra = dt === 'Intraday Trailing'
          return (
            <Badge
              color={isEOD ? '#22d3ee' : isIntra ? '#f59e0b' : '#94a3b8'}
              bg={isEOD ? '#0e2030' : isIntra ? 'rgba(245,158,11,0.08)' : 'rgba(255,255,255,0.04)'}
              border={isEOD ? 'rgba(34,211,238,0.2)' : isIntra ? 'rgba(245,158,11,0.25)' : 'rgba(255,255,255,0.08)'}
            >
              {dt}
            </Badge>
          )
        },
        winnerFn: (models) => {
          const ranks = models.map(m => m?.drawdown_type ? (DD_TYPE_RANK[m.drawdown_type] ?? 0) : null)
          return winnerSet(ranks, 'highest')
        },
      },
      {
        id: 'max_drawdown',
        label: 'Max Drawdown',
        render: (m, firm) => {
          const dd = m?.max_drawdown ?? null
          if (dd == null) return <span style={{ color: '#475569' }}>—</span>
          return <span style={{ color: 'rgb(255,41,87)', fontWeight: 700 }}>
            {fmtThresholdValue(dd, m!.account_size, firm?.category ?? 'forex')}
          </span>
        },
        winnerFn: (models) => winnerSet(models.map(m => m?.max_drawdown ?? null), 'highest'),
      },
      {
        id: 'daily_drawdown',
        label: 'Daily Loss Limit',
        isRuleBased: true,
        render: (m, firm) => {
          const dll = m?.daily_drawdown ?? null
          if (dll == null) return <Badge color='#00ff88' bg='rgba(0,255,136,0.08)' border='rgba(0,255,136,0.2)'>None</Badge>
          return <span style={{ color: 'rgb(255,41,87)', fontWeight: 700 }}>
            {fmtThresholdValue(dll, m!.account_size, firm?.category ?? 'forex')}
          </span>
        },
        winnerFn: (models) => {
          // null wins; among non-null, highest $ wins (more headroom)
          const nullIdx = models.map((m, i) => m?.daily_drawdown == null ? i : -1).filter(i => i >= 0)
          if (nullIdx.length) return new Set(nullIdx)
          return winnerSet(models.map(m => m?.daily_drawdown ?? null), 'highest')
        },
      },
      {
        id: 'consistency_rule',
        label: 'Consistency Rule on Eval',
        isRuleBased: true,
        render: (m) => {
          if (!m) return <span style={{ color: '#2a3040' }}>—</span>
          const cr = m.consistency_rule
          if (!cr) return <Badge color='#00ff88' bg='rgba(0,255,136,0.08)' border='rgba(0,255,136,0.2)'>None</Badge>
          return <Badge color='#f59e0b' bg='rgba(245,158,11,0.08)' border='rgba(245,158,11,0.25)'>Yes</Badge>
        },
        winnerFn: (models) => {
          // false/null wins
          return new Set(models.map((m, i) => (!m?.consistency_rule ? i : -1)).filter(i => i >= 0))
        },
      },
      {
        id: 'min_trading_days',
        label: 'Min Trading Days to Pass',
        render: (m) => {
          const days = m?.minimum_trading_days ?? null
          if (days == null) return <span style={{ color: '#475569' }}>—</span>
          return <span style={{ color: '#f1f5f9' }}>{days} days</span>
        },
        winnerFn: (models) => winnerSet(models.map(m => m?.minimum_trading_days ?? null), 'lowest'),
      },
    ],
  },
  {
    label: 'GETTING PAID',
    category: 'payout',
    rows: [
      {
        id: 'profit_split',
        label: 'Profit Split',
        render: (m, _, w) => {
          const ps = m?.profit_split ?? null
          if (ps == null) return <span style={{ color: '#475569' }}>—</span>
          // Profit split always lime; winner is brighter
          return <span style={{ color: '#00ff88', fontWeight: 800, opacity: w ? 1 : 0.7 }}>{ps}%</span>
        },
        winnerFn: (models) => winnerSet(models.map(m => m?.profit_split ?? null), 'highest'),
      },
      {
        id: 'funded_consistency',
        label: 'Funded Consistency',
        isRuleBased: true,
        render: (m) => {
          if (!m) return <span style={{ color: '#2a3040' }}>—</span>
          const fc = m.funded_consistency ?? null
          if (fc == null) return <Badge color='#00ff88' bg='rgba(0,255,136,0.08)' border='rgba(0,255,136,0.2)'>None</Badge>
          return <span style={{ color: '#f59e0b' }}>{fc}%</span>
        },
        winnerFn: (models) => {
          const nullIdx = models.map((m, i) => (m?.funded_consistency == null ? i : -1)).filter(i => i >= 0)
          if (nullIdx.length) return new Set(nullIdx)
          return winnerSet(models.map(m => m?.funded_consistency ?? null), 'lowest')
        },
      },
      {
        id: 'payout_frequency',
        label: 'Payout Frequency',
        render: (m, _, w) => {
          const pf = m?.payout_frequency ?? null
          if (!pf) return <span style={{ color: '#475569' }}>—</span>
          return (
            <Badge color='#e2e8f0' bg={w ? 'rgba(0,255,136,0.06)' : 'rgba(255,255,255,0.04)'} border={w ? 'rgba(0,255,136,0.2)' : 'rgba(255,255,255,0.08)'}>
              {fmtPayoutFreq(pf)}
            </Badge>
          )
        },
        winnerFn: (models) => {
          const ranks = models.map(m => payoutRank(m?.payout_frequency ?? null))
          const max = Math.max(...ranks)
          if (max === 0) return new Set()
          return new Set(ranks.map((r, i) => (r === max ? i : -1)).filter(i => i >= 0))
        },
      },
      {
        id: 'scaling',
        label: 'Scaling Available',
        render: (m, _, w) => {
          if (!m) return <span style={{ color: '#2a3040' }}>—</span>
          return m.scaling_available
            ? <Badge color='#00ff88' bg='rgba(0,255,136,0.08)' border='rgba(0,255,136,0.2)'>Yes</Badge>
            : <Badge>No</Badge>
        },
        winnerFn: (models) => new Set(models.map((m, i) => (m?.scaling_available ? i : -1)).filter(i => i >= 0)),
      },
    ],
  },
  {
    label: 'FIRM TRUST',
    category: 'trust',
    rows: [
      {
        id: 'country',
        label: 'Country',
        render: (_, f) => (
          <span style={{ color: f?.country ? '#f1f5f9' : '#475569' }}>{f?.country ?? '—'}</span>
        ),
      },
      {
        id: 'years_in_operation',
        label: 'Years in Operation',
        render: (_, f) => {
          const y = f?.years_in_operation ?? null
          return <span style={{ color: y != null ? '#f1f5f9' : '#475569' }}>{y != null ? `${y} yrs` : '—'}</span>
        },
        winnerFn: (_, firms) => winnerSet(firms.map(f => f?.years_in_operation ?? null), 'highest'),
      },
      {
        id: 'max_allocation',
        label: 'Max Allocation',
        render: (_, f) => {
          const ma = f?.max_allocation ?? null
          return <span style={{ color: ma != null ? '#f1f5f9' : '#475569', fontWeight: 700 }}>{fmtAllocation(ma)}</span>
        },
        winnerFn: (_, firms) => winnerSet(firms.map(f => f?.max_allocation ?? null), 'highest'),
      },
      {
        id: 'trustpilot',
        label: 'Trustpilot Score',
        render: (_, f, w) => {
          const ts = f?.trustpilot_score ?? null
          if (ts == null) return <span style={{ color: '#475569' }}>—</span>
          return (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <StarRating rating={ts} size={12} />
              <span style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '13px' }}>{ts}</span>
            </div>
          )
        },
        winnerFn: (_, firms) => winnerSet(firms.map(f => f?.trustpilot_score ?? null), 'highest'),
      },
      {
        id: 'editor_rating',
        label: 'Editor Rating',
        render: (_, f, w) => {
          const er = f?.editor_rating ?? null
          if (er == null) return <span style={{ color: '#475569' }}>—</span>
          return (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <StarRating rating={er} size={12} />
              <span style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '13px' }}>{er}</span>
            </div>
          )
        },
        winnerFn: (_, firms) => winnerSet(firms.map(f => f?.editor_rating ?? null), 'highest'),
      },
      {
        id: 'platforms',
        label: 'Platforms',
        render: (_, f) => {
          const pt = f?.platforms?.join(', ') ?? null
          return <span style={{ color: pt ? '#94a3b8' : '#475569', fontSize: '12px', lineHeight: 1.5 }}>{pt ?? '—'}</span>
        },
      },
    ],
  },
]

// ─── Main component ───────────────────────────────────────────────────────────

const MAX_SLOTS = 3
const LABEL_W = 200
const COL_W = 300
const TABLE_W = LABEL_W + MAX_SLOTS * COL_W

export default function CompareTable({
  allFirms,
  selections,
  onRemove,
  onChangeProgram,
  onChangeSize,
}: Props) {
  // Scroll-sync refs: header inner div syncs horizontally with body
  const headerInnerRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

  const syncHeader = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    if (headerInnerRef.current) {
      headerInnerRef.current.style.transform = `translateX(-${e.currentTarget.scrollLeft}px)`
    }
  }, [])

  // Build slots (3 total, empty if no selection)
  const slots: Array<{
    firm: CompareFirm | null
    selection: FirmSelection | null
    model: CompareAccountModel | null
  }> = Array.from({ length: MAX_SLOTS }, (_, i) => {
    const sel = selections[i] ?? null
    const firm = sel ? allFirms.find(f => f.slug === sel.slug) ?? null : null
    const model = firm && sel ? getModel(firm, sel) : null
    return { firm, selection: sel, model }
  })

  const filledCount = slots.filter(s => s.firm != null).length

  // Compute winner indices for a row — only among filled slots
  function computeWinners(row: RowDef): Set<number> {
    if (!row.winnerFn) return new Set()
    const models = slots.map(s => s.model)
    const firms = slots.map(s => s.firm)
    const filledIndices = new Set(slots.map((s, i) => s.firm ? i : -1).filter(i => i >= 0))
    const winners = row.winnerFn(models, firms)
    return new Set([...winners].filter(i => filledIndices.has(i)))
  }

  // Determine if a row should be shown
  function shouldShow(row: RowDef): boolean {
    if (row.isRuleBased) return true
    const filled = slots.filter(s => s.firm != null)
    if (!filled.length) return true

    // Always show key metrics regardless of null state
    const alwaysShow = new Set(['challenge_fee', 'activation_fee', 'total_cost', 'profit_split', 'max_drawdown', 'payout_frequency', 'scaling'])
    if (alwaysShow.has(row.id)) return true

    // For rows with a winnerFn that uses firm-level data
    if (row.id === 'country') return filled.some(s => s.firm?.country != null)
    if (row.id === 'trustpilot') return filled.some(s => s.firm?.trustpilot_score != null)
    if (row.id === 'editor_rating') return filled.some(s => s.firm?.editor_rating != null)
    if (row.id === 'years_in_operation') return filled.some(s => s.firm?.years_in_operation != null)
    if (row.id === 'max_allocation') return filled.some(s => s.firm?.max_allocation != null)
    if (row.id === 'platforms') return filled.some(s => (s.firm?.platforms?.length ?? 0) > 0)
    if (row.id === 'drawdown_type') return filled.some(s => s.model?.drawdown_type != null)
    if (row.id === 'min_trading_days') return filled.some(s => s.model?.minimum_trading_days != null)

    return true
  }

  // Compute overall verdict per slot
  type WinCounts = { cost: number; survival: number; payout: number; trust: number }
  const verdicts: string[] = (() => {
    if (filledCount < 2) return slots.map(() => '')
    const counts: WinCounts[] = slots.map(() => ({ cost: 0, survival: 0, payout: 0, trust: 0 }))
    for (const group of ROW_GROUPS) {
      for (const row of group.rows) {
        computeWinners(row).forEach(i => {
          if (slots[i].firm) counts[i][group.category]++
        })
      }
    }
    return slots.map((slot, i) => {
      if (!slot.firm) return ''
      const c = counts[i]
      const maxVal = Math.max(c.cost, c.survival, c.payout, c.trust)
      if (maxVal === 0) return 'Most Balanced'
      const leaders = [c.cost, c.survival, c.payout, c.trust].filter(v => v === maxVal)
      if (leaders.length > 1) return 'Most Balanced'
      if (c.cost === maxVal) return 'Best Value'
      if (c.survival === maxVal) return 'Most Forgiving'
      if (c.payout === maxVal) return 'Best Payout'
      if (c.trust === maxVal) return 'Most Trusted'
      return 'Most Balanced'
    })
  })()

  const verdictEmoji: Record<string, string> = {
    'Best Value': '💰',
    'Most Forgiving': '🛡️',
    'Best Payout': '💸',
    'Most Trusted': '⭐',
    'Most Balanced': '⚖️',
  }

  const gridCols = `${LABEL_W}px repeat(${MAX_SLOTS}, ${COL_W}px)`

  return (
    <div style={{
      background: '#0d1117',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '18px',
      overflow: 'hidden',
    }}>
      {/* ── STICKY HEADER (outside scroll container for top-stickiness) ── */}
      <div style={{
        position: 'sticky',
        top: '80px',
        zIndex: 20,
        overflow: 'hidden',
        background: '#0d1117',
        borderBottom: '2px solid rgba(255,255,255,0.08)',
      }}>
        <div
          ref={headerInnerRef}
          style={{
            minWidth: TABLE_W,
            display: 'grid',
            gridTemplateColumns: gridCols,
          }}
        >
          {/* Label col header */}
          <div style={{
            padding: '20px',
            borderRight: '1px solid rgba(255,255,255,0.07)',
            display: 'flex', alignItems: 'flex-end',
          }}>
            <span style={{ fontSize: '10px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Firm
            </span>
          </div>

          {/* Firm columns */}
          {slots.map((slot, i) => {
            if (!slot.firm || !slot.selection) {
              return (
                <div key={i} style={{
                  borderLeft: '1px solid rgba(255,255,255,0.07)',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  padding: '28px 16px', gap: '8px',
                  background: 'rgba(255,255,255,0.01)',
                  minHeight: '140px',
                }}>
                  <div style={{
                    width: '36px', height: '36px',
                    border: '2px dashed rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '20px', color: 'rgba(255,255,255,0.2)',
                  }}>+</div>
                  <span style={{ fontSize: '12px', color: '#475569', textAlign: 'center', lineHeight: 1.4 }}>
                    Add a firm<br />to compare
                  </span>
                </div>
              )
            }

            const { firm, selection } = slot
            const programs = getPrograms(firm)
            const sizes = getSizes(firm, selection.programName)

            return (
              <div key={firm.slug} style={{
                padding: '16px',
                borderLeft: '1px solid rgba(255,255,255,0.07)',
                position: 'relative',
              }}>
                {/* Remove button */}
                <button
                  onClick={() => onRemove(firm.slug)}
                  style={{
                    position: 'absolute', top: '10px', right: '10px',
                    width: '22px', height: '22px', background: 'transparent',
                    border: '1px solid rgba(255,255,255,0.08)', borderRadius: '50%',
                    cursor: 'pointer', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '13px', color: '#475569', lineHeight: 1,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,100,100,0.5)'; e.currentTarget.style.color = '#ff6464' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#475569' }}
                >×</button>

                {/* Logo + name */}
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '12px', paddingRight: '26px' }}>
                  <div style={{
                    width: '40px', height: '40px',
                    background: 'rgba(255,255,255,0.08)', borderRadius: '9px',
                    flexShrink: 0, overflow: 'hidden',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '12px', color: '#94a3b8',
                  }}>
                    <FirmLogo logo={firm.logo_url ?? ''} name={firm.name} size={40} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '14px', color: '#f1f5f9', marginBottom: '5px' }}>
                      {firm.name}
                    </div>
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', alignItems: 'center' }}>
                      <CategoryBadge category={firm.category} />
                      {firm.is_verified && (
                        <span style={{
                          background: 'rgba(0,255,136,0.06)', border: '1px solid rgba(0,255,136,0.2)',
                          color: '#00ff88', borderRadius: '4px', padding: '1px 5px',
                          fontSize: '9px', fontWeight: 700, letterSpacing: '0.5px',
                        }}>✓ VERIFIED</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Program dropdown */}
                <select
                  value={selection.programName}
                  onChange={e => onChangeProgram(firm.slug, e.target.value)}
                  style={{
                    width: '100%', marginBottom: '8px',
                    background: '#111827', border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '6px', padding: '6px 28px 6px 10px',
                    color: '#f1f5f9', fontSize: '12px', fontWeight: 600,
                    cursor: 'pointer', appearance: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='%2394a3b8'%3E%3Cpath d='M0 0l5 6 5-6z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center',
                  }}
                >
                  {programs.map(p => <option key={p} value={p}>{p}</option>)}
                </select>

                {/* Size toggle */}
                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '12px' }}>
                  {sizes.map(size => {
                    const active = selection.accountSize === size
                    return (
                      <button
                        key={size}
                        onClick={() => onChangeSize(firm.slug, size)}
                        style={{
                          padding: '3px 8px', borderRadius: '5px', cursor: 'pointer',
                          fontSize: '11px', fontWeight: 700, transition: 'all 0.15s',
                          background: active ? 'rgba(0,255,136,0.12)' : 'rgba(255,255,255,0.04)',
                          color: active ? '#00ff88' : '#475569',
                          border: active ? '1px solid rgba(0,255,136,0.25)' : '1px solid rgba(255,255,255,0.07)',
                        }}
                      >
                        {fmtSize(size)}
                      </button>
                    )
                  })}
                </div>

                {/* CTA */}
                <Link
                  href={`/firms/${firm.slug}`}
                  style={{
                    display: 'block', textAlign: 'center',
                    padding: '7px', background: '#00ff88',
                    color: '#060b14', borderRadius: '6px',
                    fontWeight: 700, fontSize: '12px', textDecoration: 'none',
                  }}
                >
                  View Firm →
                </Link>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── SCROLLABLE BODY ── */}
      <div ref={bodyRef} style={{ overflowX: 'auto' }} onScroll={syncHeader}>
        <div style={{ minWidth: TABLE_W }}>

          {filledCount < 2 ? (
            <div style={{ padding: '64px 24px', textAlign: 'center' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px', opacity: 0.3 }}>⚖</div>
              <p style={{ color: '#94a3b8', fontSize: '14px' }}>
                Select at least 2 firms above to start comparing
              </p>
            </div>
          ) : (
            <>
              {ROW_GROUPS.map(group => {
                const visibleRows = group.rows.filter(shouldShow)
                if (!visibleRows.length) return null
                return (
                  <div key={group.label}>
                    {/* Group header */}
                    <div style={{
                      display: 'grid', gridTemplateColumns: gridCols,
                      background: 'rgba(0,0,0,0.25)',
                      borderTop: '1px solid rgba(255,255,255,0.06)',
                    }}>
                      <div style={{
                        gridColumn: '1 / -1', padding: '7px 20px',
                        fontSize: '10px', fontWeight: 700, color: '#475569',
                        letterSpacing: '1.5px', textTransform: 'uppercase',
                      }}>
                        {group.label}
                      </div>
                    </div>

                    {/* Data rows */}
                    {visibleRows.map((row, rowIdx) => {
                      const winners = computeWinners(row)
                      const alt = rowIdx % 2 === 1
                      return (
                        <div
                          key={row.id}
                          style={{
                            display: 'grid', gridTemplateColumns: gridCols,
                            borderBottom: '1px solid rgba(255,255,255,0.04)',
                          }}
                        >
                          {/* Label cell — sticky left */}
                          <div style={{
                            padding: '13px 20px',
                            position: 'sticky', left: 0, zIndex: 5,
                            background: alt ? '#0a0f19' : '#0d1117',
                            borderRight: '1px solid rgba(255,255,255,0.05)',
                            display: 'flex', alignItems: 'center',
                            fontSize: '11px', fontWeight: 600, color: '#475569',
                            textTransform: 'uppercase', letterSpacing: '0.5px',
                          }}>
                            {row.label}
                          </div>

                          {/* Value cells */}
                          {slots.map((slot, i) => {
                            const isWinner = winners.has(i)
                            return (
                              <div
                                key={i}
                                style={{
                                  padding: '13px 16px',
                                  borderLeft: '1px solid rgba(255,255,255,0.05)',
                                  display: 'flex', alignItems: 'center',
                                  fontSize: '13px', fontWeight: 600,
                                  background: isWinner
                                    ? 'rgba(0,255,136,0.04)'
                                    : alt ? '#0a0f19' : '#0d1117',
                                }}
                              >
                                {slot.firm
                                  ? row.render(slot.model, slot.firm, isWinner)
                                  : <span style={{ color: '#1e2535' }}>—</span>
                                }
                              </div>
                            )
                          })}
                        </div>
                      )
                    })}
                  </div>
                )
              })}

              {/* ── VERDICT ── */}
              <div style={{
                background: 'rgba(0,0,0,0.2)',
                borderTop: '2px solid rgba(255,255,255,0.08)',
              }}>
                <div style={{
                  display: 'grid', gridTemplateColumns: gridCols,
                  background: 'rgba(0,0,0,0.25)',
                }}>
                  <div style={{
                    gridColumn: '1 / -1', padding: '7px 20px',
                    fontSize: '10px', fontWeight: 700, color: '#475569',
                    letterSpacing: '1.5px', textTransform: 'uppercase',
                  }}>
                    VERDICT
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: gridCols }}>
                  <div style={{
                    padding: '20px',
                    position: 'sticky', left: 0, zIndex: 5,
                    background: '#0d1117',
                    borderRight: '1px solid rgba(255,255,255,0.07)',
                    display: 'flex', alignItems: 'center',
                    fontSize: '11px', fontWeight: 600, color: '#475569',
                    textTransform: 'uppercase', letterSpacing: '0.5px',
                  }}>
                    Overall
                  </div>
                  {slots.map((slot, i) => (
                    <div key={i} style={{
                      padding: '16px',
                      borderLeft: '1px solid rgba(255,255,255,0.07)',
                    }}>
                      {slot.firm && verdicts[i] ? (
                        <div style={{
                          background: 'rgba(0,255,136,0.06)',
                          border: '1px solid rgba(0,255,136,0.18)',
                          borderRadius: '10px', padding: '14px 12px',
                          textAlign: 'center',
                        }}>
                          <div style={{ fontSize: '20px', marginBottom: '4px' }}>
                            {verdictEmoji[verdicts[i]] ?? '⚖️'}
                          </div>
                          <div style={{
                            fontSize: '12px', fontWeight: 800,
                            color: '#00ff88', letterSpacing: '0.5px',
                          }}>
                            {verdicts[i]}
                          </div>
                        </div>
                      ) : (
                        <div style={{ minHeight: '74px' }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
