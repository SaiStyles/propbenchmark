'use client'

import { useState } from 'react'
import type { Offer } from './OfferCard'
import OfferCard from './OfferCard'

const MOCK_OFFERS: Offer[] = [
  {
    id: 1, firmName: 'FTMO', firmLogo: 'F', firmSlug: 'ftmo',
    firmRating: 4.9, firmReviews: 2847, category: 'forex',
    discount: 10, code: 'BENCHMARK10',
    description: '10% off all FTMO Challenge accounts. Applies to Standard and Aggressive plans.',
    tag: 'EXCLUSIVE', featured: true, affiliateUrl: '#',
    savings: 'Save up to $15.50 on $155 plan', expires: null,
  },
  {
    id: 2, firmName: 'Apex Trader', firmLogo: 'AT', firmSlug: 'apex-trader',
    firmRating: 4.6, firmReviews: 2231, category: 'futures',
    discount: 25, code: 'APEX25PB',
    description: '25% off Apex Trader Combine subscription. Best futures deal on PropBenchmark.',
    tag: 'BEST DEAL', featured: true, affiliateUrl: '#',
    savings: 'Save $34.25 on $137 plan', expires: 'Mar 31, 2026',
  },
  {
    id: 3, firmName: 'Topstep', firmLogo: 'TS', firmSlug: 'topstep',
    firmRating: 4.7, firmReviews: 3102, category: 'futures',
    discount: 20, code: 'PROPBENCH20',
    description: '20% off your first month of Topstep Trading Combine. Top-rated futures firm.',
    tag: 'LIMITED TIME', featured: false, affiliateUrl: '#',
    savings: 'Save $33 on $165 plan', expires: 'Apr 15, 2026',
  },
  {
    id: 4, firmName: 'Funding Pips', firmLogo: 'FP', firmSlug: 'funding-pips',
    firmRating: 4.8, firmReviews: 1923, category: 'forex',
    discount: 15, code: 'BENCH15',
    description: '15% off all Funding Pips 1-step challenge accounts. Fast-track to funding.',
    tag: 'EXCLUSIVE', featured: false, affiliateUrl: '#',
    savings: 'Save $14.85 on $99 plan', expires: null,
  },
  {
    id: 5, firmName: 'BrightFunded', firmLogo: 'BF', firmSlug: 'brightfunded',
    firmRating: 4.5, firmReviews: 643, category: 'forex',
    discount: 15, code: 'BRIGHT15',
    description: '15% off BrightFunded challenge. Rising star in the prop firm space.',
    tag: 'NEW OFFER', featured: false, affiliateUrl: '#',
    savings: 'Save $11.85 on $79 plan', expires: null,
  },
  {
    id: 6, firmName: 'Alpha Capital', firmLogo: 'AC', firmSlug: 'alpha-capital',
    firmRating: 4.4, firmReviews: 867, category: 'instant',
    discount: 15, code: 'ALPHAPB15',
    description: '15% off Alpha Capital instant funding accounts. Skip the challenge entirely.',
    tag: 'INSTANT ONLY', featured: false, affiliateUrl: '#',
    savings: 'Save $44.85 on $299 plan', expires: null,
  },
  {
    id: 7, firmName: 'ThinkCapital', firmLogo: 'TC', firmSlug: 'thinkcapital',
    firmRating: 4.3, firmReviews: 512, category: 'forex',
    discount: 25, code: 'THINK25',
    description: '25% off ThinkCapital 3-step challenge. Great for traders who want lower targets.',
    tag: 'BEST VALUE', featured: false, affiliateUrl: '#',
    savings: 'Save $27.25 on $109 plan', expires: 'May 1, 2026',
  },
  {
    id: 8, firmName: 'The5ers', firmLogo: '5', firmSlug: 'the5ers',
    firmRating: 4.8, firmReviews: 1456, category: 'forex',
    discount: 5, code: 'BENCH5',
    description: '5% off The5ers challenge. 100% profit split firm with very low fees.',
    tag: 'VERIFIED', featured: false, affiliateUrl: '#',
    savings: 'Save $1.95 on $39 plan', expires: null,
  },
]

type Props = { initialOffers?: Offer[] }

const CATEGORIES = [
  { label: 'All Deals', value: 'all' },
  { label: 'Forex', value: 'forex' },
  { label: 'Futures', value: 'futures' },
  { label: 'Instant Funding', value: 'instant' },
]

const SORT_OPTIONS = [
  { label: 'Highest Discount', value: 'discount' },
  { label: 'Best Rated', value: 'rating' },
  { label: 'Most Reviews', value: 'reviews' },
]

export default function OffersPage({ initialOffers }: Props) {
  const ALL_OFFERS = initialOffers && initialOffers.length > 0 ? initialOffers : MOCK_OFFERS
  const [category, setCategory] = useState('all')
  const [sortBy, setSortBy] = useState('discount')

  const filtered = ALL_OFFERS
    .filter(o => category === 'all' || o.category === category)
    .sort((a, b) => {
      if (sortBy === 'discount') return b.discount - a.discount
      if (sortBy === 'rating') return b.firmRating - a.firmRating
      if (sortBy === 'reviews') return b.firmReviews - a.firmReviews
      return 0
    })

  const featured = filtered.filter(o => o.featured)
  const rest = filtered.filter(o => !o.featured)

  const avgDiscount = Math.round(
    ALL_OFFERS.reduce((sum, o) => sum + o.discount, 0) / ALL_OFFERS.length
  )

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px 96px' }}>

      {/* Header */}
      <div style={{ marginBottom: '44px' }}>
        <h1 style={{
          fontSize: 'clamp(26px, 4vw, 38px)',
          fontWeight: 700, color: '#f1f5f9',
          marginBottom: '10px', letterSpacing: '-0.5px', lineHeight: 1.1,
          fontFamily: 'var(--font-geist-sans), Inter, sans-serif',
        }}>
          Exclusive Discount Codes
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '15px', marginBottom: '28px' }}>
          Verified deals negotiated for PropBenchmark readers. Avg {avgDiscount}% off.
        </p>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {[
            { label: 'Active Deals', value: ALL_OFFERS.length },
            { label: 'Avg Discount', value: `${avgDiscount}%` },
            { label: 'Exclusive Codes', value: ALL_OFFERS.filter(o => o.tag === 'EXCLUSIVE').length },
            { label: 'No Expiry', value: ALL_OFFERS.filter(o => !o.expires).length },
          ].map(stat => (
            <div key={stat.label} style={{
              background: '#0d1117',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '10px', padding: '14px 20px',
            }}>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.5px' }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '11px', color: '#475569',
                marginTop: '3px', textTransform: 'uppercase', letterSpacing: '0.5px',
              }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter bar */}
      <div style={{
        display: 'flex', gap: '10px', alignItems: 'center',
        marginBottom: '36px', flexWrap: 'wrap',
      }}>
        {/* Category tabs */}
        <div style={{
          display: 'flex', gap: '4px',
          background: '#0d1117',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '10px', padding: '4px', flexWrap: 'wrap',
        }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              style={{
                padding: '7px 16px', borderRadius: '7px', border: 'none',
                cursor: 'pointer', fontSize: '13px', fontWeight: 600,
                transition: 'all 0.15s',
                background: category === cat.value ? 'rgba(0,255,136,0.1)' : 'transparent',
                color: category === cat.value ? '#00ff88' : '#475569',
              }}
              onMouseEnter={e => { if (category !== cat.value) e.currentTarget.style.color = '#94a3b8' }}
              onMouseLeave={e => { if (category !== cat.value) e.currentTarget.style.color = '#475569' }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          style={{
            background: '#0d1117',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '10px', padding: '10px 14px',
            color: '#94a3b8', fontSize: '13px',
            fontWeight: 500, outline: 'none', cursor: 'pointer',
          }}
        >
          {SORT_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        <span style={{ fontSize: '13px', color: '#475569', marginLeft: 'auto' }}>
          {filtered.length} deal{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Featured deals */}
      {featured.length > 0 && (
        <div style={{ marginBottom: '44px' }}>
          <div style={{
            fontSize: '11px', fontWeight: 600, color: '#475569',
            letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '16px',
          }}>
            Featured Deals
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '16px',
          }}>
            {featured.map((offer, i) => (
              <OfferCard key={offer.id} offer={offer} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* Divider */}
      {featured.length > 0 && rest.length > 0 && (
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', marginBottom: '36px' }} />
      )}

      {/* All remaining deals */}
      {rest.length > 0 && (
        <div>
          {featured.length > 0 && (
            <div style={{
              fontSize: '11px', fontWeight: 600, color: '#475569',
              letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '16px',
            }}>
              All Offers
            </div>
          )}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '16px',
          }}>
            {rest.map((offer, i) => (
              <OfferCard key={offer.id} offer={offer} index={featured.length + i} />
            ))}
          </div>
        </div>
      )}

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '80px 0', color: '#94a3b8' }}>
          <p style={{ fontSize: '14px' }}>No offers in this category yet.</p>
          <button
            onClick={() => setCategory('all')}
            style={{
              marginTop: '16px', padding: '10px 24px',
              border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px',
              background: 'transparent', color: '#94a3b8',
              cursor: 'pointer', fontSize: '13px', fontWeight: 600,
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(0,255,136,0.3)'
              e.currentTarget.style.color = '#00ff88'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
              e.currentTarget.style.color = '#94a3b8'
            }}
          >
            View All Deals
          </button>
        </div>
      )}

      {/* Disclosure */}
      <div style={{
        marginTop: '64px', padding: '20px 24px',
        background: '#0d1117',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '12px',
      }}>
        <p style={{ fontSize: '12px', color: '#475569', margin: 0, lineHeight: 1.7 }}>
          <strong style={{ color: '#94a3b8' }}>Disclosure:</strong> PropBenchmark may earn a commission when you use our affiliate links or discount codes. This does not affect our rankings or reviews — all evaluations are independent. Always verify current terms directly with the prop firm before purchasing.
        </p>
      </div>
    </div>
  )
}
