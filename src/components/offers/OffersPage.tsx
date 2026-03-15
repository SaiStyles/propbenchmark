'use client'

import { useState } from 'react'
import type { Offer } from './OfferCard'
import OfferCard from './OfferCard'
import { useMarketType } from '@/context/MarketTypeContext'

type Props = { initialOffers?: Offer[] }

const SORT_OPTIONS = [
  { label: 'Highest Discount', value: 'discount' },
  { label: 'Best Rated', value: 'rating' },
  { label: 'Most Reviews', value: 'reviews' },
]

export default function OffersPage({ initialOffers }: Props) {
  const { marketType } = useMarketType()
  const baseOffers = initialOffers ?? []
  const ALL_OFFERS = baseOffers.filter(o =>
    marketType === 'futures' ? o.category === 'futures' : o.category === 'forex'
  )
  const [sortBy, setSortBy] = useState('discount')

  const filtered = ALL_OFFERS
    .sort((a, b) => {
      if (sortBy === 'discount') return b.discount - a.discount
      if (sortBy === 'rating') return b.firmRating - a.firmRating
      if (sortBy === 'reviews') return b.firmReviews - a.firmReviews
      return 0
    })

  const featured = filtered.filter(o => o.featured)
  const rest = filtered.filter(o => !o.featured)

  const avgDiscount = ALL_OFFERS.length > 0
    ? Math.round(ALL_OFFERS.reduce((sum, o) => sum + o.discount, 0) / ALL_OFFERS.length)
    : 0

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 0 80px' }}>

      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{
          fontSize: 'clamp(26px, 4vw, 38px)',
          fontWeight: 700, color: '#f1f5f9',
          marginBottom: '8px', letterSpacing: '-0.5px', lineHeight: 1.1,
          fontFamily: 'var(--font-geist-sans), Inter, sans-serif',
        }}>
          Exclusive Discount Codes
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '20px', maxWidth: '640px' }}>
          Verified deals negotiated for PropBenchmark readers — we track live prop offers so you can maximise discount without sacrificing risk rules.
        </p>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {[
            { label: 'Active Deals', value: ALL_OFFERS.length },
            { label: 'Avg Discount', value: `${avgDiscount}%` },
            { label: 'Exclusive Codes', value: ALL_OFFERS.filter(o => o.tag === 'EXCLUSIVE').length },
            { label: 'No Expiry', value: ALL_OFFERS.filter(o => !o.expires).length },
          ].map(stat => (
            <div key={stat.label} style={{
              background: '#0d1117',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '12px', padding: '12px 16px',
            }}>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.5px' }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '10px', color: '#475569',
                marginTop: '3px', textTransform: 'uppercase', letterSpacing: '0.5px',
              }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter bar */}
      <div style={{
        display: 'flex', gap: '10px', alignItems: 'center',
        marginBottom: '28px', flexWrap: 'wrap',
      }}>
        {/* Sort */}
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          style={{
            background: '#020617',
            border: '1px solid rgba(148,163,184,0.55)',
            borderRadius: '999px', padding: '9px 16px',
            color: '#e2e8f0', fontSize: '13px',
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
        <div style={{ marginBottom: '40px' }}>
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
          <p style={{ fontSize: '14px' }}>No offers available for this market yet.</p>
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
