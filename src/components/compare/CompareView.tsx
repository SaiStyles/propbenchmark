'use client'

import { useState } from 'react'
import type { Firm } from '@/lib/types'
import CompareSelector from './CompareSelector'
import CompareTable from './CompareTable'
import { useMarketType } from '@/context/MarketTypeContext'

const MOCK_FIRMS: Firm[] = [
  {
    id: 1, name: 'FTMO', logo: 'F', rating: 4.9, reviews: 2847, discount: 10,
    tag: "EDITOR'S CHOICE", profitSplit: '90%', maxDrawdown: '10%',
    challengeFee: '$155', steps: 2, instantFunding: false, weekendHolding: true,
    category: 'forex', slug: 'ftmo',
    featured: true, verified: true,
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

type Props = { allFirms?: Firm[] }

export default function CompareView({ allFirms }: Props) {
  const { marketType } = useMarketType()
  const baseFirms = allFirms && allFirms.length > 0 ? allFirms : MOCK_FIRMS
  const ALL_FIRMS = baseFirms.filter(f =>
    marketType === 'futures' ? f.category === 'futures' : f.category === 'forex' || f.category === 'instant'
  )
  const [selected, setSelected] = useState<string[]>([])

  const toggle = (slug: string) => {
    setSelected(prev => {
      if (prev.includes(slug)) return prev.filter(s => s !== slug)
      if (prev.length >= 3) return prev
      return [...prev, slug]
    })
  }

  const selectedFirms = selected
    .map(slug => ALL_FIRMS.find(f => f.slug === slug))
    .filter((f): f is Firm => Boolean(f))

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px 96px' }}>
      {/* Header */}
      <div style={{ marginBottom: '36px' }}>
        <h1 style={{
          fontSize: '28px', fontWeight: 700, color: '#f1f5f9', marginBottom: '8px',
          fontFamily: 'var(--font-geist-sans), Inter, sans-serif',
        }}>
          Compare Firms
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '14px' }}>
          Select up to 3 firms to compare side by side
        </p>
      </div>

      {ALL_FIRMS.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <div style={{ fontSize: '32px', marginBottom: '16px', color: '#475569' }}>—</div>
          <p style={{ fontSize: '15px', color: '#94a3b8' }}>
            No {marketType === 'futures' ? 'Futures' : 'CFD / Forex'} firms available to compare.
          </p>
        </div>
      ) : (
        <>
          <CompareSelector firms={ALL_FIRMS} selected={selected} onToggle={toggle} />
          {selectedFirms.length >= 2 ? (
            <CompareTable firms={selectedFirms} onRemove={toggle} />
          ) : (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#94a3b8' }}>
              <div style={{ fontSize: '32px', marginBottom: '16px' }}>⚖</div>
              <p style={{ fontSize: '15px' }}>Select at least 2 firms above to start comparing</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
