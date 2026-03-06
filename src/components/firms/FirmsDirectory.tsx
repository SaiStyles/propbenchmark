'use client'

import { useState } from 'react'
import type { Firm } from '@/lib/types'
import FirmCard from './FirmCard'
import FirmsFilter from './FirmsFilter'

const MOCK_FIRMS: Firm[] = [
  {
    id: 1, name: 'FTMO', logo: 'F', rating: 4.9, reviews: 2847, discount: 10,
    tag: "EDITOR'S CHOICE", profitSplit: '90%', maxDrawdown: '10%',
    challengeFee: '$155', steps: 2, instantFunding: false, weekendHolding: true,
    category: 'forex', slug: 'ftmo',
    featured: true, verified: true, paysWithin: 'Pays in 1–3 days',
  },
  {
    id: 2, name: 'Funding Pips', logo: 'FP', rating: 4.8, reviews: 1923, discount: 15,
    tag: 'TOP RATED', profitSplit: '85%', maxDrawdown: '8%',
    challengeFee: '$99', steps: 1, instantFunding: false, weekendHolding: true,
    category: 'forex', slug: 'funding-pips',
    featured: true, verified: true,
  },
  {
    id: 3, name: 'Topstep', logo: 'TS', rating: 4.7, reviews: 3102, discount: 20,
    tag: 'FUTURES #1', profitSplit: '90%', maxDrawdown: '6%',
    challengeFee: '$165', steps: 1, instantFunding: false, weekendHolding: false,
    category: 'futures', slug: 'topstep',
    verified: true,
  },
  {
    id: 4, name: 'The5ers', logo: '5', rating: 4.8, reviews: 1456, discount: 5,
    tag: 'LOW COST', profitSplit: '100%', maxDrawdown: '5%',
    challengeFee: '$39', steps: 2, instantFunding: false, weekendHolding: true,
    category: 'forex', slug: 'the5ers',
    verified: true,
  },
  {
    id: 5, name: 'Apex Trader', logo: 'AT', rating: 4.6, reviews: 2231, discount: 25,
    tag: 'BEST VALUE', profitSplit: '90%', maxDrawdown: '6%',
    challengeFee: '$137', steps: 1, instantFunding: false, weekendHolding: false,
    category: 'futures', slug: 'apex-trader',
    verified: true,
  },
  {
    id: 6, name: 'Alpha Capital', logo: 'AC', rating: 4.4, reviews: 867, discount: 15,
    tag: 'INSTANT FUND', profitSplit: '80%', maxDrawdown: '10%',
    challengeFee: '$299', steps: 0, instantFunding: true, weekendHolding: true,
    category: 'instant', slug: 'alpha-capital',
  },
  {
    id: 7, name: 'BrightFunded', logo: 'BF', rating: 4.5, reviews: 643, discount: 15,
    tag: 'RISING STAR', profitSplit: '85%', maxDrawdown: '10%',
    challengeFee: '$79', steps: 1, instantFunding: false, weekendHolding: true,
    category: 'forex', slug: 'brightfunded',
  },
  {
    id: 8, name: 'ThinkCapital', logo: 'TC', rating: 4.3, reviews: 512, discount: 25,
    tag: '3-STEP VALUE', profitSplit: '80%', maxDrawdown: '12%',
    challengeFee: '$109', steps: 3, instantFunding: false, weekendHolding: true,
    category: 'forex', slug: 'thinkcapital',
  },
]

type Props = { initialFirms?: Firm[] }

export default function FirmsDirectory({ initialFirms }: Props) {
  const ALL_FIRMS = initialFirms && initialFirms.length > 0 ? initialFirms : MOCK_FIRMS

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
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px 96px' }}>
      {/* Header */}
      <div style={{ marginBottom: '36px' }}>
        <h1 style={{
          fontSize: '28px', fontWeight: 700,
          color: '#f1f5f9', marginBottom: '8px',
          fontFamily: 'var(--font-geist-sans), Inter, sans-serif',
        }}>
          All Prop Firms
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '14px' }}>
          Showing {filtered.length} of {ALL_FIRMS.length} verified firms
        </p>
      </div>

      {/* Filters */}
      <FirmsFilter filters={filters} onChange={setFilters} />

      {/* Grid */}
      {filtered.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '16px',
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
