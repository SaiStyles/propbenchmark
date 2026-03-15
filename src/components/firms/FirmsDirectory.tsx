'use client'

import { useState } from 'react'
import type { Firm } from '@/lib/types'
import FirmCard from './FirmCard'
import FirmsFilter from './FirmsFilter'
import { useMarketType } from '@/context/MarketTypeContext'

type Props = { initialFirms: Firm[] }

export default function FirmsDirectory({ initialFirms }: Props) {
  const { marketType } = useMarketType()
  const ALL_FIRMS = initialFirms.filter(f =>
    marketType === 'futures' ? f.category === 'futures' : f.category === 'forex'
  )

  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    steps: 'all',
    instant: false,
    weekend: false,
    sortBy: 'rating',
  })

  const filtered = ALL_FIRMS
    .filter(f => {
      if (filters.category !== 'all' && f.category !== filters.category) return false
      if (filters.steps !== 'all' && f.steps !== parseInt(filters.steps)) return false
      if (filters.instant && !f.instantFunding) return false
      if (filters.weekend && !f.weekendHolding) return false
      if (filters.search && !f.name.toLowerCase().includes(filters.search.toLowerCase())) return false
      return true
    })
    .sort((a, b) => {
      if (filters.sortBy === 'rating') return b.rating - a.rating
      if (filters.sortBy === 'discount') return b.discount - a.discount
      if (filters.sortBy === 'reviews') return b.reviews - a.reviews
      return 0
    })

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 0 80px' }}>
      {/* Header */}
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '12px' }}>
        <div>
          <h1 style={{
            fontSize: '26px', fontWeight: 700,
            color: '#f1f5f9', marginBottom: '6px',
            fontFamily: 'var(--font-geist-sans), Inter, sans-serif',
            letterSpacing: '-0.03em',
          }}>
            All prop firms
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '13px' }}>
            Filter by rules, steps and discounts to find the right funding fit.
          </p>
        </div>
        <div style={{ textAlign: 'right', fontSize: '12px', color: '#64748b' }}>
          <div>
            Showing <span style={{ color: '#e2e8f0' }}>{filtered.length}</span> of{' '}
            <span style={{ color: '#e2e8f0' }}>{ALL_FIRMS.length}</span> verified firms
          </div>
          <div style={{ marginTop: '2px' }}>Market: <span style={{ color: '#22d3ee', textTransform: 'capitalize' }}>{marketType}</span></div>
        </div>
      </div>

      {/* Filters */}
      <FirmsFilter filters={filters} onChange={setFilters} />

      {/* Grid */}
      {filtered.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '18px',
        }}>
          {filtered.map((firm, i) => (
            <FirmCard key={firm.id} firm={firm} index={i} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <div style={{ fontSize: '40px', marginBottom: '16px', color: '#475569' }}>—</div>
          <p style={{ fontSize: '14px', color: '#94a3b8' }}>No firms match your filters.</p>
          <button
            onClick={() => setFilters({ search: '', category: 'all', steps: 'all', instant: false, weekend: false, sortBy: 'rating' })}
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
            Clear Filters
          </button>
        </div>
      )}
    </div>
  )
}
