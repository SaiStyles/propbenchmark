'use client'

import { useState } from 'react'
import RankingList, { RankingCategory } from './RankingList'

const RANKINGS: RankingCategory[] = [
  {
    id: 'best-overall',
    label: 'Best Overall',
    icon: '🏆',
    description: 'Composite score across rating, payout, trust, and community feedback. The definitive list.',
    metricLabel: 'Rating',
    firms: [
      {
        id: 1, name: 'FTMO', logo: 'F', slug: 'ftmo', rating: 4.9, reviews: 2847,
        tag: "EDITOR'S CHOICE", category: 'forex', profitSplit: '90%',
        maxDrawdown: '10%', challengeFee: '$155', steps: 2, instantFunding: false,
        reason: 'Gold standard for forex traders. Six years of consistent payouts, industry-leading trust score, and the most recognizable name in prop trading.',
        highlight: { label: 'Trust Score', value: '9.8 / 10' },
      },
      {
        id: 2, name: 'Funding Pips', logo: 'FP', slug: 'funding-pips', rating: 4.8, reviews: 1923,
        tag: 'TOP RATED', category: 'forex', profitSplit: '85%',
        maxDrawdown: '8%', challengeFee: '$99', steps: 1, instantFunding: false,
        reason: 'Top-tier 1-step challenge with elite payout consistency. Weekend holding and competitive fees make this a standout for active forex traders.',
        highlight: { label: 'Eval Steps', value: '1-Step' },
      },
      {
        id: 4, name: 'The5ers', logo: '5', slug: 'the5ers', rating: 4.8, reviews: 1456,
        tag: 'LOW COST', category: 'forex', profitSplit: '100%',
        maxDrawdown: '5%', challengeFee: '$39', steps: 2, instantFunding: false,
        reason: 'The only firm offering 100% profit split with a sub-$50 entry fee. A truly unique model for disciplined traders who want to keep everything they earn.',
        highlight: { label: 'Profit Split', value: '100%' },
      },
      {
        id: 3, name: 'Topstep', logo: 'TS', slug: 'topstep', rating: 4.7, reviews: 3102,
        tag: 'FUTURES #1', category: 'futures', profitSplit: '90%',
        maxDrawdown: '6%', challengeFee: '$165', steps: 1, instantFunding: false,
        reason: 'Most community-validated firm on the platform with 3,000+ reviews. The clear choice for futures traders with decade-long operational history.',
        highlight: { label: 'Reviews', value: '3,102' },
      },
      {
        id: 5, name: 'Apex Trader', logo: 'AT', slug: 'apex-trader', rating: 4.6, reviews: 2231,
        tag: 'BEST VALUE', category: 'futures', profitSplit: '90%',
        maxDrawdown: '6%', challengeFee: '$137', steps: 1, instantFunding: false,
        reason: 'Best cost-to-value ratio in futures. Frequent 25% discount promotions bring the fee to some of the lowest in the industry for a 90% split account.',
        highlight: { label: 'Discount', value: '25% OFF' },
      },
      {
        id: 7, name: 'BrightFunded', logo: 'BF', slug: 'brightfunded', rating: 4.5, reviews: 643,
        tag: 'RISING STAR', category: 'forex', profitSplit: '85%',
        maxDrawdown: '10%', challengeFee: '$79', steps: 1, instantFunding: false,
        reason: 'Fast-growing firm with highly transparent operations and daily withdrawal availability. One to watch as it continues scaling its trader base.',
        highlight: { label: 'Payouts', value: 'Daily' },
      },
    ],
  },
  {
    id: 'best-beginners',
    label: 'Best for Beginners',
    icon: '🌱',
    description: 'Lowest barriers to entry — minimal fees, simple rulesets, and forgiving evaluation structures.',
    metricLabel: 'Challenge Fee',
    firms: [
      {
        id: 4, name: 'The5ers', logo: '5', slug: 'the5ers', rating: 4.8, reviews: 1456,
        tag: 'LOW COST', category: 'forex', profitSplit: '100%',
        maxDrawdown: '5%', challengeFee: '$39', steps: 2, instantFunding: false,
        reason: 'Lowest barrier to entry on the market. $39 to start, no time limit on the evaluation, and 100% profit split once funded. Perfect for traders still refining their edge.',
        highlight: { label: 'Entry Fee', value: '$39' },
      },
      {
        id: 7, name: 'BrightFunded', logo: 'BF', slug: 'brightfunded', rating: 4.5, reviews: 643,
        tag: 'RISING STAR', category: 'forex', profitSplit: '85%',
        maxDrawdown: '10%', challengeFee: '$79', steps: 1, instantFunding: false,
        reason: 'Simple 1-step challenge with generous 10% max drawdown — one of the most forgiving evaluations available. Great for beginners who want a clear, single-phase process.',
        highlight: { label: 'Max DD', value: '10%' },
      },
      {
        id: 2, name: 'Funding Pips', logo: 'FP', slug: 'funding-pips', rating: 4.8, reviews: 1923,
        tag: 'TOP RATED', category: 'forex', profitSplit: '85%',
        maxDrawdown: '8%', challengeFee: '$99', steps: 1, instantFunding: false,
        reason: 'Clean 1-step evaluation with an 8% drawdown allowance and no minimum trading days. Straightforward rules make it easy to know exactly what you need to do.',
        highlight: { label: 'Eval Steps', value: '1-Step' },
      },
      {
        id: 5, name: 'Apex Trader', logo: 'AT', slug: 'apex-trader', rating: 4.6, reviews: 2231,
        tag: 'BEST VALUE', category: 'futures', profitSplit: '90%',
        maxDrawdown: '6%', challengeFee: '$137', steps: 1, instantFunding: false,
        reason: 'Ideal for beginners entering futures markets. Unlimited evaluation retries during promotional periods and a straightforward 1-step Combine evaluation.',
        highlight: { label: 'Retries', value: 'Unlimited' },
      },
      {
        id: 8, name: 'ThinkCapital', logo: 'TC', slug: 'thinkcapital', rating: 4.3, reviews: 512,
        tag: '3-STEP VALUE', category: 'forex', profitSplit: '80%',
        maxDrawdown: '12%', challengeFee: '$109', steps: 3, instantFunding: false,
        reason: 'The 3-step structure, while slower, teaches disciplined trading habits. The 12% max drawdown — widest in the industry — gives beginners maximum room to learn.',
        highlight: { label: 'Max DD', value: '12%' },
      },
      {
        id: 1, name: 'FTMO', logo: 'F', slug: 'ftmo', rating: 4.9, reviews: 2847,
        tag: "EDITOR'S CHOICE", category: 'forex', profitSplit: '90%',
        maxDrawdown: '10%', challengeFee: '$155', steps: 2, instantFunding: false,
        reason: 'Extensive free resources, a free trial Challenge account, and the most documented ruleset in the industry. Higher fee, but you get the most supported learning environment.',
        highlight: { label: 'Free Trial', value: 'Yes' },
      },
    ],
  },
  {
    id: 'highest-split',
    label: 'Highest Profit Split',
    icon: '💰',
    description: 'Ranked by how much of your profits you keep after passing the challenge. Every % matters.',
    metricLabel: 'Profit Split',
    firms: [
      {
        id: 4, name: 'The5ers', logo: '5', slug: 'the5ers', rating: 4.8, reviews: 1456,
        tag: 'LOW COST', category: 'forex', profitSplit: '100%',
        maxDrawdown: '5%', challengeFee: '$39', steps: 2, instantFunding: false,
        reason: 'The only verified firm offering a 100% profit split. You keep every dollar you earn — the firm monetizes through challenge fees and scaling plan purchases instead.',
        highlight: { label: 'Profit Split', value: '100%' },
      },
      {
        id: 1, name: 'FTMO', logo: 'F', slug: 'ftmo', rating: 4.9, reviews: 2847,
        tag: "EDITOR'S CHOICE", category: 'forex', profitSplit: '90%',
        maxDrawdown: '10%', challengeFee: '$155', steps: 2, instantFunding: false,
        reason: '90% split on the most trusted platform in the industry. FTMO also offers a 10% add-on to reach 100% for top-performing traders in their scaling plan.',
        highlight: { label: 'Profit Split', value: '90%' },
      },
      {
        id: 3, name: 'Topstep', logo: 'TS', slug: 'topstep', rating: 4.7, reviews: 3102,
        tag: 'FUTURES #1', category: 'futures', profitSplit: '90%',
        maxDrawdown: '6%', challengeFee: '$165', steps: 1, instantFunding: false,
        reason: '90% split with no ongoing subscription fee after funding — you just pay to enter the Combine. A strong long-term income model for consistent futures traders.',
        highlight: { label: 'Profit Split', value: '90%' },
      },
      {
        id: 5, name: 'Apex Trader', logo: 'AT', slug: 'apex-trader', rating: 4.6, reviews: 2231,
        tag: 'BEST VALUE', category: 'futures', profitSplit: '90%',
        maxDrawdown: '6%', challengeFee: '$137', steps: 1, instantFunding: false,
        reason: '90% split in the futures space with the best promotional discounts. Lower effective cost than Topstep when accounting for frequent coupon offers.',
        highlight: { label: 'Profit Split', value: '90%' },
      },
      {
        id: 2, name: 'Funding Pips', logo: 'FP', slug: 'funding-pips', rating: 4.8, reviews: 1923,
        tag: 'TOP RATED', category: 'forex', profitSplit: '85%',
        maxDrawdown: '8%', challengeFee: '$99', steps: 1, instantFunding: false,
        reason: '85% split with one of the fastest payout cycles available — weekly. A strong choice for high-frequency traders who want regular access to their profits.',
        highlight: { label: 'Profit Split', value: '85%' },
      },
      {
        id: 7, name: 'BrightFunded', logo: 'BF', slug: 'brightfunded', rating: 4.5, reviews: 643,
        tag: 'RISING STAR', category: 'forex', profitSplit: '85%',
        maxDrawdown: '10%', challengeFee: '$79', steps: 1, instantFunding: false,
        reason: '85% split with daily withdrawal availability — one of the fastest payout options in the market. Ideal for active traders who want frequent access to profits.',
        highlight: { label: 'Profit Split', value: '85%' },
      },
    ],
  },
  {
    id: 'best-futures',
    label: 'Best Futures',
    icon: '📈',
    description: 'Top prop firms specifically for futures traders — CME, NQ, ES, CL, and more.',
    metricLabel: 'Reviews',
    firms: [
      {
        id: 3, name: 'Topstep', logo: 'TS', slug: 'topstep', rating: 4.7, reviews: 3102,
        tag: 'FUTURES #1', category: 'futures', profitSplit: '90%',
        maxDrawdown: '6%', challengeFee: '$165', steps: 1, instantFunding: false,
        reason: 'The original futures prop firm — over a decade of operations, the highest review count of any futures firm, and a consistent 90% payout record. The benchmark all others are measured against.',
        highlight: { label: 'Since', value: '2012' },
      },
      {
        id: 5, name: 'Apex Trader', logo: 'AT', slug: 'apex-trader', rating: 4.6, reviews: 2231,
        tag: 'BEST VALUE', category: 'futures', profitSplit: '90%',
        maxDrawdown: '6%', challengeFee: '$137', steps: 1, instantFunding: false,
        reason: 'Aggressive promotional discounts — often 25% or more off — make Apex the most affordable route to a futures funded account. 2,200+ reviews confirm consistent execution.',
        highlight: { label: 'Max Discount', value: '25% OFF' },
      },
    ],
  },
  {
    id: 'best-value',
    label: 'Best Value',
    icon: '💎',
    description: 'Best challenge fee relative to profit split, drawdown limits, and evaluation difficulty.',
    metricLabel: 'Challenge Fee',
    firms: [
      {
        id: 4, name: 'The5ers', logo: '5', slug: 'the5ers', rating: 4.8, reviews: 1456,
        tag: 'LOW COST', category: 'forex', profitSplit: '100%',
        maxDrawdown: '5%', challengeFee: '$39', steps: 2, instantFunding: false,
        reason: '$39 for access to a 100% profit split funded account. No other firm on the market comes close to this fee-to-payout ratio. The obvious choice for value-conscious traders.',
        highlight: { label: 'Fee', value: '$39' },
      },
      {
        id: 7, name: 'BrightFunded', logo: 'BF', slug: 'brightfunded', rating: 4.5, reviews: 643,
        tag: 'RISING STAR', category: 'forex', profitSplit: '85%',
        maxDrawdown: '10%', challengeFee: '$79', steps: 1, instantFunding: false,
        reason: '$79 for a 1-step evaluation with 10% drawdown room and 85% split. Second-lowest entry fee for a quality evaluation structure. Strong value at every account tier.',
        highlight: { label: 'Fee', value: '$79' },
      },
      {
        id: 2, name: 'Funding Pips', logo: 'FP', slug: 'funding-pips', rating: 4.8, reviews: 1923,
        tag: 'TOP RATED', category: 'forex', profitSplit: '85%',
        maxDrawdown: '8%', challengeFee: '$99', steps: 1, instantFunding: false,
        reason: 'Under $100 for a 1-step challenge at a 4.8-rated firm. The combination of low cost and high trust score makes Funding Pips one of the best all-around value propositions.',
        highlight: { label: 'Fee', value: '$99' },
      },
      {
        id: 8, name: 'ThinkCapital', logo: 'TC', slug: 'thinkcapital', rating: 4.3, reviews: 512,
        tag: '3-STEP VALUE', category: 'forex', profitSplit: '80%',
        maxDrawdown: '12%', challengeFee: '$109', steps: 3, instantFunding: false,
        reason: '$109 with the most lenient drawdown rules in the industry at 12%. If you need maximum room to trade your strategy, ThinkCapital gives you the most runway per dollar.',
        highlight: { label: 'Max DD', value: '12%' },
      },
      {
        id: 5, name: 'Apex Trader', logo: 'AT', slug: 'apex-trader', rating: 4.6, reviews: 2231,
        tag: 'BEST VALUE', category: 'futures', profitSplit: '90%',
        maxDrawdown: '6%', challengeFee: '$137', steps: 1, instantFunding: false,
        reason: 'With 25% discount codes reducing the effective cost to ~$103, Apex delivers 90% split futures access at a sub-$110 effective fee. Top futures value when promotions apply.',
        highlight: { label: 'Effective Fee', value: '~$103' },
      },
      {
        id: 1, name: 'FTMO', logo: 'F', slug: 'ftmo', rating: 4.9, reviews: 2847,
        tag: "EDITOR'S CHOICE", category: 'forex', profitSplit: '90%',
        maxDrawdown: '10%', challengeFee: '$155', steps: 2, instantFunding: false,
        reason: 'Higher fee reflects the premium brand and support system. For traders where trust and longevity matter above all else, the $155 entry to the #1-rated firm is justified.',
        highlight: { label: 'Rating', value: '4.9 ★' },
      },
    ],
  },
  {
    id: 'instant-funding',
    label: 'Instant Funding',
    icon: '⚡',
    description: 'Skip the challenge entirely — get funded on day one. For experienced traders only.',
    metricLabel: 'Entry Cost',
    firms: [
      {
        id: 6, name: 'Alpha Capital', logo: 'AC', slug: 'alpha-capital', rating: 4.4, reviews: 867,
        tag: 'INSTANT FUND', category: 'instant', profitSplit: '80%',
        maxDrawdown: '10%', challengeFee: '$299', steps: 0, instantFunding: true,
        reason: 'The premier instant funding option — pay once, skip the evaluation, and start trading a funded account immediately. Best suited for consistently profitable traders with a proven track record.',
        highlight: { label: 'Funded In', value: 'Day 1' },
      },
    ],
  },
  {
    id: 'most-trusted',
    label: 'Most Trusted',
    icon: '🛡️',
    description: 'Ranked by verified review count — the most community-validated firms on PropBenchmark.',
    metricLabel: 'Reviews',
    firms: [
      {
        id: 3, name: 'Topstep', logo: 'TS', slug: 'topstep', rating: 4.7, reviews: 3102,
        tag: 'FUTURES #1', category: 'futures', profitSplit: '90%',
        maxDrawdown: '6%', challengeFee: '$165', steps: 1, instantFunding: false,
        reason: 'Most-reviewed prop firm on the platform. 3,102 verified trader reviews across a decade of operations speaks for itself — no other futures firm has this level of documented community trust.',
        highlight: { label: 'Reviews', value: '3,102' },
      },
      {
        id: 1, name: 'FTMO', logo: 'F', slug: 'ftmo', rating: 4.9, reviews: 2847,
        tag: "EDITOR'S CHOICE", category: 'forex', profitSplit: '90%',
        maxDrawdown: '10%', challengeFee: '$155', steps: 2, instantFunding: false,
        reason: 'Highest-rated firm in the forex category with 2,847 reviews and a 4.9 average. Six-year track record with no major payout disputes on record.',
        highlight: { label: 'Rating', value: '4.9 ★' },
      },
      {
        id: 5, name: 'Apex Trader', logo: 'AT', slug: 'apex-trader', rating: 4.6, reviews: 2231,
        tag: 'BEST VALUE', category: 'futures', profitSplit: '90%',
        maxDrawdown: '6%', challengeFee: '$137', steps: 1, instantFunding: false,
        reason: 'Over 2,000 verified reviews with a consistent 4.6 average. Strong track record for following through on payouts with transparent terms and no hidden restrictions.',
        highlight: { label: 'Reviews', value: '2,231' },
      },
      {
        id: 2, name: 'Funding Pips', logo: 'FP', slug: 'funding-pips', rating: 4.8, reviews: 1923,
        tag: 'TOP RATED', category: 'forex', profitSplit: '85%',
        maxDrawdown: '8%', challengeFee: '$99', steps: 1, instantFunding: false,
        reason: 'Nearly 2,000 reviews at a 4.8 rating — exceptional for a firm of its age. Known for responsive support and a clean withdrawal process with no unnecessary delays.',
        highlight: { label: 'Reviews', value: '1,923' },
      },
      {
        id: 4, name: 'The5ers', logo: '5', slug: 'the5ers', rating: 4.8, reviews: 1456,
        tag: 'LOW COST', category: 'forex', profitSplit: '100%',
        maxDrawdown: '5%', challengeFee: '$39', steps: 2, instantFunding: false,
        reason: '1,456 reviews at a 4.8 average — the highest review-to-fee ratio on this list. Traders are consistently happy with the 100% split model and the firm\'s long-term reliability.',
        highlight: { label: 'Reviews', value: '1,456' },
      },
      {
        id: 6, name: 'Alpha Capital', logo: 'AC', slug: 'alpha-capital', rating: 4.4, reviews: 867,
        tag: 'INSTANT FUND', category: 'instant', profitSplit: '80%',
        maxDrawdown: '10%', challengeFee: '$299', steps: 0, instantFunding: true,
        reason: '867 reviews for an instant funding firm is a strong signal — most firms in this category have far fewer. Consistent payout record within the instant funding niche.',
        highlight: { label: 'Reviews', value: '867' },
      },
    ],
  },
]

export default function RankingsPage() {
  const [activeId, setActiveId] = useState('best-overall')

  const activeRanking = RANKINGS.find(r => r.id === activeId)!

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
          {RANKINGS.length} RANKING CATEGORIES
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
          {RANKINGS.map(r => {
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
                onMouseEnter={e => {
                  if (!isActive) e.currentTarget.style.color = '#94a3b8'
                }}
                onMouseLeave={e => {
                  if (!isActive) e.currentTarget.style.color = '#475569'
                }}
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
        <RankingList ranking={activeRanking} />

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
