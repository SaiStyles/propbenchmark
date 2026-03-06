'use client'

import { useState } from 'react'
import type { Firm } from '@/lib/types'
import RankingList, { RankingCategory } from './RankingList'
import { useMarketType } from '@/context/MarketTypeContext'

// ─── Editorial config — curated per-firm context only ────────────────────────

type RankingFirmConfig = {
  slug: string
  tag: string
  reason: string
  highlight: { label: string; value: string }
}

type RankingCategoryConfig = {
  id: string
  label: string
  icon: string
  description: string
  metricLabel: string
  firms: RankingFirmConfig[]
}

const RANKINGS_CONFIG: RankingCategoryConfig[] = [
  {
    id: 'best-overall',
    label: 'Best Overall',
    icon: '🏆',
    description: 'Composite score across rating, payout, trust, and community feedback. The definitive list.',
    metricLabel: 'Rating',
    firms: [
      { slug: 'ftmo', tag: "EDITOR'S CHOICE", reason: 'Gold standard for forex traders. Six years of consistent payouts, industry-leading trust score, and the most recognizable name in prop trading.', highlight: { label: 'Trust Score', value: '9.8 / 10' } },
      { slug: 'funding-pips', tag: 'TOP RATED', reason: 'Top-tier 1-step challenge with elite payout consistency. Weekend holding and competitive fees make this a standout for active forex traders.', highlight: { label: 'Eval Steps', value: '1-Step' } },
      { slug: 'the5ers', tag: 'LOW COST', reason: 'The only firm offering 100% profit split with a sub-$50 entry fee. A truly unique model for disciplined traders who want to keep everything they earn.', highlight: { label: 'Profit Split', value: '100%' } },
      { slug: 'topstep', tag: 'FUTURES #1', reason: 'Most community-validated firm on the platform. The clear choice for futures traders with decade-long operational history.', highlight: { label: 'Reviews', value: '3,102' } },
      { slug: 'apex-trader', tag: 'BEST VALUE', reason: 'Best cost-to-value ratio in futures. Frequent 25% discount promotions bring the fee to some of the lowest in the industry for a 90% split account.', highlight: { label: 'Discount', value: '25% OFF' } },
      { slug: 'brightfunded', tag: 'RISING STAR', reason: 'Fast-growing firm with highly transparent operations and daily withdrawal availability. One to watch as it continues scaling its trader base.', highlight: { label: 'Payouts', value: 'Daily' } },
    ],
  },
  {
    id: 'best-beginners',
    label: 'Best for Beginners',
    icon: '🌱',
    description: 'Lowest barriers to entry — minimal fees, simple rulesets, and forgiving evaluation structures.',
    metricLabel: 'Challenge Fee',
    firms: [
      { slug: 'the5ers', tag: 'LOW COST', reason: 'Lowest barrier to entry on the market. $39 to start, no time limit on the evaluation, and 100% profit split once funded. Perfect for traders still refining their edge.', highlight: { label: 'Entry Fee', value: '$39' } },
      { slug: 'brightfunded', tag: 'RISING STAR', reason: 'Simple 1-step challenge with generous 10% max drawdown — one of the most forgiving evaluations available. Great for beginners who want a clear, single-phase process.', highlight: { label: 'Max DD', value: '10%' } },
      { slug: 'funding-pips', tag: 'TOP RATED', reason: 'Clean 1-step evaluation with an 8% drawdown allowance and no minimum trading days. Straightforward rules make it easy to know exactly what you need to do.', highlight: { label: 'Eval Steps', value: '1-Step' } },
      { slug: 'apex-trader', tag: 'BEST VALUE', reason: 'Ideal for beginners entering futures markets. Unlimited evaluation retries during promotional periods and a straightforward 1-step Combine evaluation.', highlight: { label: 'Retries', value: 'Unlimited' } },
      { slug: 'thinkcapital', tag: '3-STEP VALUE', reason: 'The 3-step structure, while slower, teaches disciplined trading habits. The 12% max drawdown — widest in the industry — gives beginners maximum room to learn.', highlight: { label: 'Max DD', value: '12%' } },
      { slug: 'ftmo', tag: "EDITOR'S CHOICE", reason: 'Extensive free resources, a free trial Challenge account, and the most documented ruleset in the industry. Higher fee, but you get the most supported learning environment.', highlight: { label: 'Free Trial', value: 'Yes' } },
    ],
  },
  {
    id: 'highest-split',
    label: 'Highest Profit Split',
    icon: '💰',
    description: 'Ranked by how much of your profits you keep after passing the challenge. Every % matters.',
    metricLabel: 'Profit Split',
    firms: [
      { slug: 'the5ers', tag: 'LOW COST', reason: 'The only verified firm offering a 100% profit split. You keep every dollar you earn — the firm monetizes through challenge fees and scaling plan purchases instead.', highlight: { label: 'Profit Split', value: '100%' } },
      { slug: 'ftmo', tag: "EDITOR'S CHOICE", reason: '90% split on the most trusted platform in the industry. FTMO also offers a 10% add-on to reach 100% for top-performing traders in their scaling plan.', highlight: { label: 'Profit Split', value: '90%' } },
      { slug: 'topstep', tag: 'FUTURES #1', reason: '90% split with no ongoing subscription fee after funding — you just pay to enter the Combine. A strong long-term income model for consistent futures traders.', highlight: { label: 'Profit Split', value: '90%' } },
      { slug: 'apex-trader', tag: 'BEST VALUE', reason: '90% split in the futures space with the best promotional discounts. Lower effective cost than Topstep when accounting for frequent coupon offers.', highlight: { label: 'Profit Split', value: '90%' } },
      { slug: 'funding-pips', tag: 'TOP RATED', reason: '85% split with one of the fastest payout cycles available — weekly. A strong choice for high-frequency traders who want regular access to their profits.', highlight: { label: 'Profit Split', value: '85%' } },
      { slug: 'brightfunded', tag: 'RISING STAR', reason: '85% split with daily withdrawal availability — one of the fastest payout options in the market. Ideal for active traders who want frequent access to profits.', highlight: { label: 'Profit Split', value: '85%' } },
    ],
  },
  {
    id: 'best-futures',
    label: 'Best Futures',
    icon: '📈',
    description: 'Top prop firms specifically for futures traders — CME, NQ, ES, CL, and more.',
    metricLabel: 'Reviews',
    firms: [
      { slug: 'topstep', tag: 'FUTURES #1', reason: 'The original futures prop firm — over a decade of operations, the highest review count of any futures firm, and a consistent 90% payout record. The benchmark all others are measured against.', highlight: { label: 'Since', value: '2012' } },
      { slug: 'apex-trader', tag: 'BEST VALUE', reason: 'Aggressive promotional discounts — often 25% or more off — make Apex the most affordable route to a futures funded account. 2,200+ reviews confirm consistent execution.', highlight: { label: 'Max Discount', value: '25% OFF' } },
    ],
  },
  {
    id: 'best-value',
    label: 'Best Value',
    icon: '💎',
    description: 'Best challenge fee relative to profit split, drawdown limits, and evaluation difficulty.',
    metricLabel: 'Challenge Fee',
    firms: [
      { slug: 'the5ers', tag: 'LOW COST', reason: '$39 for access to a 100% profit split funded account. No other firm on the market comes close to this fee-to-payout ratio. The obvious choice for value-conscious traders.', highlight: { label: 'Fee', value: '$39' } },
      { slug: 'brightfunded', tag: 'RISING STAR', reason: '$79 for a 1-step evaluation with 10% drawdown room and 85% split. Second-lowest entry fee for a quality evaluation structure. Strong value at every account tier.', highlight: { label: 'Fee', value: '$79' } },
      { slug: 'funding-pips', tag: 'TOP RATED', reason: 'Under $100 for a 1-step challenge at a 4.8-rated firm. The combination of low cost and high trust score makes Funding Pips one of the best all-around value propositions.', highlight: { label: 'Fee', value: '$99' } },
      { slug: 'thinkcapital', tag: '3-STEP VALUE', reason: '$109 with the most lenient drawdown rules in the industry at 12%. If you need maximum room to trade your strategy, ThinkCapital gives you the most runway per dollar.', highlight: { label: 'Max DD', value: '12%' } },
      { slug: 'apex-trader', tag: 'BEST VALUE', reason: 'With 25% discount codes reducing the effective cost to ~$103, Apex delivers 90% split futures access at a sub-$110 effective fee. Top futures value when promotions apply.', highlight: { label: 'Effective Fee', value: '~$103' } },
      { slug: 'ftmo', tag: "EDITOR'S CHOICE", reason: 'Higher fee reflects the premium brand and support system. For traders where trust and longevity matter above all else, the $155 entry to the #1-rated firm is justified.', highlight: { label: 'Rating', value: '4.9 ★' } },
    ],
  },
  {
    id: 'instant-funding',
    label: 'Instant Funding',
    icon: '⚡',
    description: 'Skip the challenge entirely — get funded on day one. For experienced traders only.',
    metricLabel: 'Entry Cost',
    firms: [
      { slug: 'alpha-capital', tag: 'INSTANT FUND', reason: 'The premier instant funding option — pay once, skip the evaluation, and start trading a funded account immediately. Best suited for consistently profitable traders with a proven track record.', highlight: { label: 'Funded In', value: 'Day 1' } },
    ],
  },
  {
    id: 'most-trusted',
    label: 'Most Trusted',
    icon: '🛡️',
    description: 'Ranked by verified review count — the most community-validated firms on PropBenchmark.',
    metricLabel: 'Reviews',
    firms: [
      { slug: 'topstep', tag: 'FUTURES #1', reason: 'Most-reviewed prop firm on the platform. Verified trader reviews across a decade of operations speaks for itself — no other futures firm has this level of documented community trust.', highlight: { label: 'Reviews', value: '3,102' } },
      { slug: 'ftmo', tag: "EDITOR'S CHOICE", reason: 'Highest-rated firm in the forex category with a 4.9 average. Six-year track record with no major payout disputes on record.', highlight: { label: 'Rating', value: '4.9 ★' } },
      { slug: 'apex-trader', tag: 'BEST VALUE', reason: 'Over 2,000 verified reviews with a consistent 4.6 average. Strong track record for following through on payouts with transparent terms and no hidden restrictions.', highlight: { label: 'Reviews', value: '2,231' } },
      { slug: 'funding-pips', tag: 'TOP RATED', reason: 'Nearly 2,000 reviews at a 4.8 rating — exceptional for a firm of its age. Known for responsive support and a clean withdrawal process with no unnecessary delays.', highlight: { label: 'Reviews', value: '1,923' } },
      { slug: 'the5ers', tag: 'LOW COST', reason: '1,456 reviews at a 4.8 average — the highest review-to-fee ratio on this list. Traders are consistently happy with the 100% split model and the firm\'s long-term reliability.', highlight: { label: 'Reviews', value: '1,456' } },
      { slug: 'alpha-capital', tag: 'INSTANT FUND', reason: 'Strong review count for an instant funding firm — most firms in this category have far fewer. Consistent payout record within the instant funding niche.', highlight: { label: 'Reviews', value: '867' } },
    ],
  },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

function matchesMarketType(category: string, marketType: 'cfd' | 'futures'): boolean {
  if (marketType === 'futures') return category === 'futures'
  return category === 'forex' || category === 'instant'
}

// ─── Component ───────────────────────────────────────────────────────────────

type Props = { initialFirms: Firm[] }

export default function RankingsPage({ initialFirms }: Props) {
  const [activeId, setActiveId] = useState('best-overall')
  const { marketType } = useMarketType()

  const firmMap = new Map(initialFirms.map(f => [f.slug, f]))

  const rankings: RankingCategory[] = RANKINGS_CONFIG.map(cat => ({
    ...cat,
    firms: cat.firms
      .map(fc => {
        const firm = firmMap.get(fc.slug)
        if (!firm) return null
        return { ...firm, reason: fc.reason, highlight: fc.highlight, tag: fc.tag }
      })
      .filter((f): f is NonNullable<typeof f> => f !== null),
  }))

  const activeRanking = rankings.find(r => r.id === activeId) ?? rankings[0]

  const filteredFirms = activeRanking
    ? activeRanking.firms.filter(f => matchesMarketType(f.category, marketType))
    : []

  const marketLabel = marketType === 'futures' ? 'Futures' : 'CFD / Forex'

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
          {RANKINGS_CONFIG.length} RANKING CATEGORIES
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
          {RANKINGS_CONFIG.map(r => {
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

        {initialFirms.length === 0 ? (
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
