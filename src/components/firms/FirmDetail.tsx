'use client'

import { useState } from 'react'
import Link from 'next/link'
import StarRating from '@/components/ui/StarRating'
import ProfitSplitArc from '@/components/ui/ProfitSplitArc'
import DrawdownBar from '@/components/ui/DrawdownBar'
import type { FirmDetailData } from '@/lib/types'

type Account = {
  size: string
  fee: string
  profitTarget: string
  maxDrawdown: string
  dailyDrawdown: string
  programName?: string
}

type Review = {
  user: string
  rating: number
  date: string
  text: string
}

type FirmData = {
  name: string
  logo: string
  rating: number
  reviews: number
  discount: number
  tag: string
  discountCode: string
  profitSplit: string
  steps: number
  payoutFreq: string
  minPayout: string
  countries: string
  instantFunding: boolean
  weekendHolding: boolean
  platforms: string[]
  instruments: string[]
  description: string
  pros: string[]
  cons: string[]
  accounts: Account[]
  traderReviews: Review[]
}

const FIRMS_DATA: Record<string, FirmData> = {
  'ftmo': {
    name: 'FTMO', logo: 'F', rating: 4.9, reviews: 2847, discount: 10,
    tag: "EDITOR'S CHOICE", discountCode: 'PROPHUB10',
    profitSplit: '90%', steps: 2,
    payoutFreq: 'Monthly', minPayout: '$50', countries: 'Worldwide',
    instantFunding: false, weekendHolding: true,
    platforms: ['MT4', 'MT5'],
    instruments: ['Forex', 'Indices', 'Commodities', 'Crypto', 'Stocks'],
    description: 'The gold standard in prop trading. Trusted by 200,000+ traders globally with a proven track record of reliable payouts.',
    pros: ['Highest trust rating in industry', '90% profit split', 'Fast & reliable payouts', 'Wide range of instruments'],
    cons: ['Higher entry fee vs competitors', 'US traders not accepted', 'Strict trading rules'],
    accounts: [
      { size: '$10K', fee: '$155', profitTarget: '10%', maxDrawdown: '10%', dailyDrawdown: '5%' },
      { size: '$25K', fee: '$250', profitTarget: '10%', maxDrawdown: '10%', dailyDrawdown: '5%' },
      { size: '$50K', fee: '$345', profitTarget: '10%', maxDrawdown: '10%', dailyDrawdown: '5%' },
      { size: '$100K', fee: '$540', profitTarget: '10%', maxDrawdown: '10%', dailyDrawdown: '5%' },
      { size: '$200K', fee: '$1,080', profitTarget: '10%', maxDrawdown: '10%', dailyDrawdown: '5%' },
    ],
    traderReviews: [
      { user: 'TraderJoe92', rating: 5, date: 'Feb 2026', text: 'Best prop firm I have used. Payouts were on time every single month.' },
      { user: 'FXWolf_Berlin', rating: 4, date: 'Jan 2026', text: 'Solid overall experience. Evaluation rules are fair and the platform is stable.' },
      { user: 'ScalpQueen', rating: 5, date: 'Jan 2026', text: 'On my 3rd funded account now. Never had a payout issue.' },
    ],
  },
  'funding-pips': {
    name: 'Funding Pips', logo: 'FP', rating: 4.8, reviews: 1923, discount: 15,
    tag: 'TOP RATED', discountCode: 'PROPHUB15',
    profitSplit: '85%', steps: 1,
    payoutFreq: 'Bi-weekly', minPayout: '$25', countries: 'Worldwide',
    instantFunding: false, weekendHolding: true,
    platforms: ['MT5', 'cTrader'],
    instruments: ['Forex', 'Indices', 'Commodities', 'Crypto'],
    description: '1-step evaluation with rapid bi-weekly payouts. Perfect for experienced traders who want to get funded fast.',
    pros: ['1-step challenge', 'Bi-weekly payouts', 'Weekend holding allowed', 'Low minimum payout'],
    cons: ['Lower account ceiling', 'Crypto spreads can be wide'],
    accounts: [
      { size: '$5K', fee: '$49', profitTarget: '8%', maxDrawdown: '8%', dailyDrawdown: '4%' },
      { size: '$10K', fee: '$99', profitTarget: '8%', maxDrawdown: '8%', dailyDrawdown: '4%' },
      { size: '$25K', fee: '$199', profitTarget: '8%', maxDrawdown: '8%', dailyDrawdown: '4%' },
      { size: '$50K', fee: '$299', profitTarget: '8%', maxDrawdown: '8%', dailyDrawdown: '4%' },
      { size: '$100K', fee: '$499', profitTarget: '8%', maxDrawdown: '8%', dailyDrawdown: '4%' },
    ],
    traderReviews: [
      { user: 'PipHunter', rating: 5, date: 'Feb 2026', text: 'Passed the 1-step in 12 days. Payout arrived within 3 days. Highly recommend.' },
      { user: 'ForexNomad', rating: 4, date: 'Jan 2026', text: 'Great firm. Bi-weekly payouts are a huge plus. Rules are clear and fair.' },
    ],
  },
  'topstep': {
    name: 'Topstep', logo: 'TS', rating: 4.7, reviews: 3102, discount: 20,
    tag: 'FUTURES #1', discountCode: 'PROPHUB20',
    profitSplit: '90%', steps: 1,
    payoutFreq: 'Weekly', minPayout: '$100', countries: 'US + Global',
    instantFunding: false, weekendHolding: false,
    platforms: ['NinjaTrader', 'TradingView', 'Quantower'],
    instruments: ['Futures'],
    description: 'The #1 futures prop firm. Access CME, CBOT, NYMEX markets with weekly payouts.',
    pros: ['Weekly payouts', 'Top platform selection', 'US traders welcome', 'Strong community'],
    cons: ['Futures only', 'No weekend holds', 'Daily drawdown is strict'],
    accounts: [
      { size: '$50K', fee: '$165', profitTarget: '6%', maxDrawdown: '6%', dailyDrawdown: '3%' },
      { size: '$100K', fee: '$325', profitTarget: '6%', maxDrawdown: '6%', dailyDrawdown: '3%' },
      { size: '$150K', fee: '$375', profitTarget: '6%', maxDrawdown: '6%', dailyDrawdown: '3%' },
    ],
    traderReviews: [
      { user: 'FuturesKing', rating: 5, date: 'Feb 2026', text: 'Been with Topstep for 2 years. Weekly payouts never missed.' },
      { user: 'NQTrader', rating: 4, date: 'Jan 2026', text: 'Great firm for futures. TradingView integration is smooth.' },
    ],
  },
  'the5ers': {
    name: 'The5ers', logo: '5', rating: 4.8, reviews: 1456, discount: 5,
    tag: 'LOW COST', discountCode: 'PROPHUB5',
    profitSplit: '100%', steps: 2,
    payoutFreq: 'Monthly', minPayout: '$100', countries: 'Worldwide',
    instantFunding: false, weekendHolding: true,
    platforms: ['MT5'],
    instruments: ['Forex', 'Indices', 'Commodities'],
    description: 'Start from just $39. 100% profit split on funded account. Scale up to $4M in capital.',
    pros: ['Cheapest entry at $39', '100% profit split', 'Scale up to $4M', 'Weekend holding'],
    cons: ['MT5 only', 'Strict consistency rules', 'Monthly payouts only'],
    accounts: [
      { size: '$5K', fee: '$39', profitTarget: '6%', maxDrawdown: '5%', dailyDrawdown: '3%' },
      { size: '$10K', fee: '$79', profitTarget: '6%', maxDrawdown: '5%', dailyDrawdown: '3%' },
      { size: '$20K', fee: '$139', profitTarget: '6%', maxDrawdown: '5%', dailyDrawdown: '3%' },
      { size: '$40K', fee: '$249', profitTarget: '6%', maxDrawdown: '5%', dailyDrawdown: '3%' },
      { size: '$100K', fee: '$499', profitTarget: '6%', maxDrawdown: '5%', dailyDrawdown: '3%' },
    ],
    traderReviews: [
      { user: 'BudgetTrader', rating: 5, date: 'Feb 2026', text: 'Started with $39. Now managing $100K. The scaling plan is incredible.' },
      { user: 'SwingMaster', rating: 4, date: 'Jan 2026', text: '100% profit split is unreal. Rules are strict but fair.' },
    ],
  },
  'apex-trader': {
    name: 'Apex Trader', logo: 'AT', rating: 4.6, reviews: 2231, discount: 25,
    tag: 'BEST VALUE', discountCode: 'PROPHUB25',
    profitSplit: '90%', steps: 1,
    payoutFreq: '2x/month', minPayout: '$0', countries: 'US + Global',
    instantFunding: false, weekendHolding: false,
    platforms: ['NinjaTrader', 'Rithmic', 'Tradovate'],
    instruments: ['Futures'],
    description: 'No daily drawdown limit. Multiple funded accounts allowed. Great value for futures traders.',
    pros: ['No daily drawdown', 'Multiple accounts allowed', 'Fast approval', '25% discount available'],
    cons: ['Futures only', 'High consistency rule', 'No weekend holds'],
    accounts: [
      { size: '$25K', fee: '$97', profitTarget: '6%', maxDrawdown: '6%', dailyDrawdown: 'N/A' },
      { size: '$50K', fee: '$137', profitTarget: '6%', maxDrawdown: '6%', dailyDrawdown: 'N/A' },
      { size: '$100K', fee: '$167', profitTarget: '6%', maxDrawdown: '6%', dailyDrawdown: 'N/A' },
      { size: '$150K', fee: '$187', profitTarget: '6%', maxDrawdown: '6%', dailyDrawdown: 'N/A' },
      { size: '$250K', fee: '$207', profitTarget: '6%', maxDrawdown: '6%', dailyDrawdown: 'N/A' },
    ],
    traderReviews: [
      { user: 'MultiAccountPro', rating: 5, date: 'Feb 2026', text: 'Running 3 funded accounts simultaneously. No daily DD is a game changer.' },
    ],
  },
  'alpha-capital': {
    name: 'Alpha Capital', logo: 'AC', rating: 4.4, reviews: 867, discount: 15,
    tag: 'INSTANT FUND', discountCode: 'PROPHUB15',
    profitSplit: '80%', steps: 0,
    payoutFreq: 'On-demand', minPayout: '$50', countries: 'Worldwide',
    instantFunding: true, weekendHolding: true,
    platforms: ['MT4', 'MT5'],
    instruments: ['Forex', 'Indices', 'Crypto', 'Commodities'],
    description: 'Skip evaluations entirely. Get funded instantly and start trading real capital today.',
    pros: ['Instant funding', 'On-demand payouts', 'Weekend holding', 'No evaluation stress'],
    cons: ['Higher upfront cost', 'Lower profit split', 'Trailing drawdown'],
    accounts: [
      { size: '$10K', fee: '$199', profitTarget: 'N/A', maxDrawdown: '10%', dailyDrawdown: '5%' },
      { size: '$25K', fee: '$399', profitTarget: 'N/A', maxDrawdown: '10%', dailyDrawdown: '5%' },
      { size: '$50K', fee: '$699', profitTarget: 'N/A', maxDrawdown: '10%', dailyDrawdown: '5%' },
      { size: '$100K', fee: '$1,199', profitTarget: 'N/A', maxDrawdown: '10%', dailyDrawdown: '5%' },
    ],
    traderReviews: [
      { user: 'InstantTrader', rating: 4, date: 'Feb 2026', text: 'Got funded in 10 minutes. No eval headaches. Worth the higher fee.' },
    ],
  },
  'brightfunded': {
    name: 'BrightFunded', logo: 'BF', rating: 4.5, reviews: 643, discount: 15,
    tag: 'RISING STAR', discountCode: 'PROPHUB15',
    profitSplit: '85%', steps: 1,
    payoutFreq: 'On-demand', minPayout: '$10', countries: 'Worldwide',
    instantFunding: false, weekendHolding: true,
    platforms: ['MT5'],
    instruments: ['Forex', 'Indices', 'Commodities', 'Crypto'],
    description: 'On-demand payouts with just $10 minimum. Fast-growing community with great support.',
    pros: ['$10 minimum payout', 'On-demand withdrawals', 'Weekend holding', 'Affordable fee'],
    cons: ['Newer firm', 'MT5 only', 'Limited track record'],
    accounts: [
      { size: '$5K', fee: '$39', profitTarget: '10%', maxDrawdown: '10%', dailyDrawdown: '5%' },
      { size: '$10K', fee: '$79', profitTarget: '10%', maxDrawdown: '10%', dailyDrawdown: '5%' },
      { size: '$25K', fee: '$149', profitTarget: '10%', maxDrawdown: '10%', dailyDrawdown: '5%' },
      { size: '$50K', fee: '$249', profitTarget: '10%', maxDrawdown: '10%', dailyDrawdown: '5%' },
      { size: '$100K', fee: '$399', profitTarget: '10%', maxDrawdown: '10%', dailyDrawdown: '5%' },
    ],
    traderReviews: [
      { user: 'NewbieFunder', rating: 5, date: 'Feb 2026', text: 'Withdrew $10 just to test. Arrived same day. Incredible firm.' },
    ],
  },
  'thinkcapital': {
    name: 'ThinkCapital', logo: 'TC', rating: 4.3, reviews: 512, discount: 25,
    tag: '3-STEP VALUE', discountCode: 'PROPHUB25',
    profitSplit: '80%', steps: 3,
    payoutFreq: 'Monthly', minPayout: '$100', countries: 'Worldwide',
    instantFunding: false, weekendHolding: true,
    platforms: ['MT4', 'MT5', 'cTrader'],
    instruments: ['Forex', 'Indices', 'Commodities', 'Crypto', 'Stocks'],
    description: 'Generous 12% max drawdown across a structured 3-step evaluation. Great for beginner traders.',
    pros: ['12% max drawdown', 'All major platforms', 'Stock instruments', 'Beginner friendly'],
    cons: ['3-step process is long', '80% profit split', 'Monthly payouts only'],
    accounts: [
      { size: '$10K', fee: '$79', profitTarget: '8%', maxDrawdown: '12%', dailyDrawdown: '6%' },
      { size: '$25K', fee: '$149', profitTarget: '8%', maxDrawdown: '12%', dailyDrawdown: '6%' },
      { size: '$50K', fee: '$249', profitTarget: '8%', maxDrawdown: '12%', dailyDrawdown: '6%' },
      { size: '$100K', fee: '$399', profitTarget: '8%', maxDrawdown: '12%', dailyDrawdown: '6%' },
      { size: '$200K', fee: '$699', profitTarget: '8%', maxDrawdown: '12%', dailyDrawdown: '6%' },
    ],
    traderReviews: [
      { user: 'BeginnerTrader', rating: 4, date: 'Jan 2026', text: 'The 12% drawdown gave me so much breathing room. Finally passed my first challenge.' },
    ],
  },
}

const TABS = ['Overview', 'Rules', 'Reviews', 'Platforms']
const EDITORIAL_TAGS = new Set(["EDITOR'S CHOICE", 'TOP RATED', 'FUTURES #1', 'BEST VALUE'])

function parsePercent(s: string): number {
  return parseFloat(s.replace('%', '')) || 0
}

function fromDbFirm(d: FirmDetailData): FirmData {
  return {
    name: d.name, logo: d.logo, rating: d.rating, reviews: d.reviews,
    discount: d.discount, tag: d.tag, discountCode: d.discountCode,
    profitSplit: d.profitSplit, steps: d.steps, payoutFreq: d.payoutFreq,
    minPayout: d.minPayout, countries: d.countries, instantFunding: d.instantFunding,
    weekendHolding: d.weekendHolding, platforms: d.platforms, instruments: d.instruments,
    description: d.description, pros: d.pros, cons: d.cons,
    accounts: d.accounts, traderReviews: [],
  }
}

type Props = { slug: string; dbFirm?: FirmDetailData | null }

export default function FirmDetail({ slug, dbFirm }: Props) {
  const [activeTab, setActiveTab] = useState('Overview')
  const [selectedProgram, setSelectedProgram] = useState('')
  const [selectedAccount, setSelectedAccount] = useState(0)

  // Use DB data when available, fall back to hardcoded mock
  const firm: FirmData | undefined = dbFirm ? fromDbFirm(dbFirm) : FIRMS_DATA[slug]

  if (!firm) {
    return (
      <div style={{ textAlign: 'center', padding: '120px 24px', color: '#94a3b8' }}>
        <div style={{ fontSize: '40px', marginBottom: '16px' }}>—</div>
        <h2 style={{ color: '#f1f5f9', marginBottom: '12px', fontWeight: 700 }}>Firm not found</h2>
        <Link href="/firms" style={{ color: '#22d3ee', textDecoration: 'none' }}>← Back to all firms</Link>
      </div>
    )
  }

  const programs = [...new Set(firm.accounts.map(a => a.programName).filter((p): p is string => !!p))]
  const hasPrograms = programs.length > 1
  const activeProgram = selectedProgram || programs[0] || ''
  const programAccounts = hasPrograms ? firm.accounts.filter(a => a.programName === activeProgram) : firm.accounts
  const account = programAccounts[selectedAccount] ?? programAccounts[0]
  const isEditorial = EDITORIAL_TAGS.has(firm.tag)

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '48px 24px 96px' }}>

      {/* Back */}
      <Link href="/firms" style={{
        color: '#475569', textDecoration: 'none',
        fontSize: '13px', display: 'inline-block', marginBottom: '32px',
        transition: 'color 0.15s',
      }}
        onMouseEnter={e => (e.currentTarget.style.color = '#94a3b8')}
        onMouseLeave={e => (e.currentTarget.style.color = '#475569')}
      >
        ← All firms
      </Link>

      {/* Header */}
      <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', marginBottom: '40px', flexWrap: 'wrap' }}>
        <div style={{
          width: '72px', height: '72px',
          background: 'rgba(255,255,255,0.06)',
          borderRadius: '16px', display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontWeight: 900, fontSize: '22px',
          color: '#94a3b8',
          flexShrink: 0,
        }}>{firm.logo}</div>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '10px' }}>
            <h1 style={{
              fontSize: '28px', fontWeight: 700, color: '#f1f5f9', margin: 0,
              fontFamily: 'var(--font-geist-sans), Inter, sans-serif',
            }}>{firm.name}</h1>
            <span style={{
              background: isEditorial ? 'rgba(0,255,136,0.08)' : 'rgba(255,255,255,0.04)',
              color: isEditorial ? '#00ff88' : '#94a3b8',
              border: isEditorial ? '1px solid rgba(0,255,136,0.2)' : '1px solid rgba(255,255,255,0.08)',
              borderRadius: '4px', padding: '2px 8px',
              fontSize: '10px', fontWeight: 700, letterSpacing: '1px',
            }}>{firm.tag}</span>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '10px' }}>
            <StarRating rating={firm.rating} size={16} />
            <span style={{ fontWeight: 700, fontSize: '16px', color: '#f1f5f9' }}>{firm.rating}</span>
            <span style={{ color: '#94a3b8', fontSize: '14px' }}>{firm.reviews.toLocaleString()} reviews</span>
          </div>
          <p style={{ color: '#94a3b8', marginTop: '4px', lineHeight: 1.7, fontSize: '14px' }}>
            {firm.description}
          </p>
        </div>

        {/* Discount + CTA */}
        <div style={{ textAlign: 'center', minWidth: '140px' }}>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-1px' }}>
            {firm.discount}% OFF
          </div>
          <div style={{
            background: '#1a2a1a',
            border: '1px solid rgba(0,255,136,0.3)',
            borderRadius: '8px', padding: '8px 16px',
            fontSize: '13px', fontWeight: 600, color: '#00ff88',
            marginTop: '10px', letterSpacing: '1px', fontFamily: 'monospace',
          }}>
            {firm.discountCode}
          </div>
          <button
            style={{
              marginTop: '10px', padding: '12px 28px',
              background: '#00ff88', color: '#060b14',
              borderRadius: '8px', fontWeight: 700,
              fontSize: '14px', border: 'none', cursor: 'pointer',
              width: '100%', transition: 'transform 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.02)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Get Deal →
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0', borderBottom: '1px solid rgba(255,255,255,0.07)', marginBottom: '32px' }}>
        {TABS.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            padding: '10px 20px', background: 'none', border: 'none',
            borderBottom: `2px solid ${activeTab === tab ? '#00ff88' : 'transparent'}`,
            color: activeTab === tab ? '#00ff88' : '#475569',
            cursor: 'pointer', fontWeight: 600, fontSize: '14px',
            transition: 'all 0.15s',
          }}
            onMouseEnter={e => { if (activeTab !== tab) e.currentTarget.style.color = '#94a3b8' }}
            onMouseLeave={e => { if (activeTab !== tab) e.currentTarget.style.color = '#475569' }}
          >{tab}</button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'Overview' && (
        <div>
          {/* Program Selector */}
          {hasPrograms && (
            <div style={{ marginBottom: '16px' }}>
              <div style={{
                fontSize: '11px', color: '#475569',
                marginBottom: '12px', fontWeight: 600,
                textTransform: 'uppercase', letterSpacing: '1px',
              }}>Program</div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {programs.map(prog => (
                  <button key={prog} onClick={() => { setSelectedProgram(prog); setSelectedAccount(0) }} style={{
                    padding: '8px 16px', borderRadius: '8px', cursor: 'pointer',
                    fontSize: '14px', fontWeight: 600, transition: 'all 0.15s',
                    border: activeProgram === prog ? '1px solid rgba(0,255,136,0.4)' : '1px solid rgba(255,255,255,0.08)',
                    background: activeProgram === prog ? 'rgba(0,255,136,0.08)' : 'transparent',
                    color: activeProgram === prog ? '#00ff88' : '#475569',
                  }}>
                    {prog}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Account Size Selector */}
          <div style={{ marginBottom: '28px' }}>
            <div style={{
              fontSize: '11px', color: '#475569',
              marginBottom: '12px', fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: '1px',
            }}>Account Size</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {programAccounts.map((acc, i) => (
                <button key={`${i}-${acc.size}`} onClick={() => setSelectedAccount(i)} style={{
                  padding: '8px 16px', borderRadius: '8px', cursor: 'pointer',
                  fontSize: '14px', fontWeight: 600, transition: 'all 0.15s',
                  border: selectedAccount === i ? '1px solid rgba(0,255,136,0.4)' : '1px solid rgba(255,255,255,0.08)',
                  background: selectedAccount === i ? 'rgba(0,255,136,0.08)' : 'transparent',
                  color: selectedAccount === i ? '#00ff88' : '#475569',
                }}>
                  {acc.size}
                </button>
              ))}
            </div>
          </div>

          {/* Metrics for selected account */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(155px, 1fr))',
            gap: '10px', marginBottom: '32px',
          }}>
            {[
              { label: 'Challenge Fee', value: account.fee },
              { label: 'Profit Target', value: account.profitTarget },
              { label: 'Max Drawdown', value: account.maxDrawdown, isDrawdown: true },
              { label: 'Daily Drawdown', value: account.dailyDrawdown, isDrawdown: true },
              { label: 'Profit Split', value: firm.profitSplit, highlight: true, isSplit: true },
              { label: 'Eval Steps', value: firm.steps === 0 ? 'Instant' : `${firm.steps}-Step` },
              { label: 'Payout Freq', value: firm.payoutFreq },
              { label: 'Min Payout', value: firm.minPayout },
            ].map(({ label, value, highlight, isSplit, isDrawdown }) => (
              <div key={label} style={{
                background: highlight ? 'rgba(0,255,136,0.05)' : '#0d1117',
                border: highlight ? '1px solid rgba(0,255,136,0.15)' : '1px solid rgba(255,255,255,0.07)',
                borderRadius: '12px', padding: '18px 16px',
              }}>
                <div style={{
                  fontSize: '11px', color: '#475569',
                  marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px',
                }}>{label}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{
                    fontSize: '20px', fontWeight: 700,
                    color: highlight ? '#00ff88' : isDrawdown && value !== 'None' ? '#f59e0b' : '#f1f5f9',
                  }}>{value}</div>
                  {isSplit && <ProfitSplitArc percent={firm.profitSplit} size={28} />}
                </div>
                {isDrawdown && value.endsWith('%') && (
                  <DrawdownBar percent={parsePercent(value)} />
                )}
              </div>
            ))}
          </div>

          {/* Pros & Cons */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{
              background: '#0d1117',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '12px', padding: '24px',
            }}>
              <div style={{
                fontWeight: 600, color: '#94a3b8',
                marginBottom: '16px', fontSize: '12px',
                textTransform: 'uppercase', letterSpacing: '1px',
              }}>Pros</div>
              {firm.pros.map((p: string) => (
                <div key={p} style={{
                  color: '#94a3b8', marginBottom: '10px',
                  fontSize: '14px', lineHeight: 1.5,
                  display: 'flex', gap: '8px',
                }}>
                  <span style={{ color: '#00ff88', flexShrink: 0 }}>✓</span>
                  {p}
                </div>
              ))}
            </div>
            <div style={{
              background: '#0d1117',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '12px', padding: '24px',
            }}>
              <div style={{
                fontWeight: 600, color: '#94a3b8',
                marginBottom: '16px', fontSize: '12px',
                textTransform: 'uppercase', letterSpacing: '1px',
              }}>Cons</div>
              {firm.cons.map((c: string) => (
                <div key={c} style={{
                  color: '#94a3b8', marginBottom: '10px',
                  fontSize: '14px', lineHeight: 1.5,
                  display: 'flex', gap: '8px',
                }}>
                  <span style={{ color: '#475569', flexShrink: 0 }}>✕</span>
                  {c}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Rules Tab */}
      {activeTab === 'Rules' && (
        <div style={{ display: 'grid', gap: '8px' }}>
          {[
            { label: 'Weekend Holding', value: firm.weekendHolding ? 'Allowed' : 'Not Allowed', positive: firm.weekendHolding },
            { label: 'Instant Funding', value: firm.instantFunding ? 'Available' : 'Evaluation Required', positive: firm.instantFunding },
            { label: 'Countries', value: firm.countries },
            { label: 'Instruments', value: firm.instruments.join(', ') },
            { label: 'Evaluation Steps', value: firm.steps === 0 ? 'Instant — No Evaluation' : `${firm.steps}-Step Evaluation` },
          ].map(({ label, value, positive }) => (
            <div key={label} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '16px 20px',
              background: '#0d1117',
              border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px',
            }}>
              <span style={{ color: '#94a3b8', fontSize: '14px' }}>{label}</span>
              <span style={{
                fontWeight: 600, fontSize: '14px',
                color: positive === true ? '#00ff88' : positive === false ? '#94a3b8' : '#f1f5f9',
              }}>{value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Reviews Tab */}
      {activeTab === 'Reviews' && (
        <div>
          <div style={{
            background: '#0d1117', borderRadius: '16px',
            padding: '32px', marginBottom: '24px',
            textAlign: 'center', border: '1px solid rgba(255,255,255,0.07)',
          }}>
            <div style={{ fontSize: '56px', fontWeight: 800, color: '#f1f5f9', lineHeight: 1, letterSpacing: '-2px' }}>
              {firm.rating}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '12px 0 8px' }}>
              <StarRating rating={firm.rating} size={20} />
            </div>
            <div style={{ color: '#475569', fontSize: '13px' }}>
              Based on {firm.reviews.toLocaleString()} verified reviews
            </div>
          </div>
          {firm.traderReviews.map((r, i) => (
            <div key={i} style={{
              background: '#0d1117', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '12px', padding: '22px', marginBottom: '10px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div style={{
                    width: '36px', height: '36px',
                    background: 'rgba(255,255,255,0.06)',
                    borderRadius: '50%', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '14px', fontWeight: 700,
                    color: '#94a3b8',
                  }}>{r.user[0]}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '14px', color: '#f1f5f9' }}>{r.user}</div>
                    <div style={{ color: '#475569', fontSize: '12px' }}>{r.date}</div>
                  </div>
                </div>
                <StarRating rating={r.rating} size={14} />
              </div>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: '14px', lineHeight: 1.7 }}>{r.text}</p>
            </div>
          ))}
        </div>
      )}

      {/* Platforms Tab */}
      {activeTab === 'Platforms' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '12px',
        }}>
          {firm.platforms.map((p) => (
            <div key={p} style={{
              background: '#0e2030',
              border: '1px solid rgba(34,211,238,0.2)',
              borderRadius: '12px', padding: '28px 24px', textAlign: 'center',
            }}>
              <div style={{ fontSize: '28px', marginBottom: '12px' }}>💹</div>
              <div style={{ fontWeight: 600, color: '#22d3ee', fontSize: '15px' }}>{p}</div>
              <div style={{ color: '#475569', fontSize: '12px', marginTop: '4px' }}>Supported</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
