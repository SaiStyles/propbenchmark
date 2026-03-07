'use client'

import { useState } from 'react'
import type { Firm } from '@/lib/types'
import CompareSelector from './CompareSelector'
import CompareTable from './CompareTable'
import { useMarketType } from '@/context/MarketTypeContext'

type Props = { allFirms?: Firm[] }

export default function CompareView({ allFirms }: Props) {
  const { marketType } = useMarketType()
  const baseFirms = allFirms ?? []
  const ALL_FIRMS = baseFirms.filter(f =>
    marketType === 'futures' ? f.category === 'futures' : f.category === 'forex'
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
