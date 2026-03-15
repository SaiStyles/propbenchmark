'use client'

import { useState, useCallback, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import type { CompareFirm } from '@/lib/types'
import { useMarketType } from '@/context/MarketTypeContext'
import CompareSelector from './CompareSelector'
import CompareTable from './CompareTable'

export type FirmSelection = {
  slug: string
  programName: string
  accountSize: number
}

type Props = {
  firms: CompareFirm[]
}

export function getPrograms(firm: CompareFirm): string[] {
  return [...new Set(firm.account_models.map(m => m.program_name))].sort()
}

export function getSizes(firm: CompareFirm, programName: string): number[] {
  return firm.account_models
    .filter(m => m.program_name === programName)
    .map(m => m.account_size)
    .sort((a, b) => a - b)
}

function defaultSize(sizes: number[]): number {
  return sizes.includes(50000) ? 50000 : sizes[0]
}

function serializeSelections(selections: FirmSelection[]): string {
  return selections
    .map(s => `${s.slug}:${encodeURIComponent(s.programName)}:${s.accountSize}`)
    .join(',')
}

function parseSelections(param: string, firms: CompareFirm[]): FirmSelection[] {
  return param
    .split(',')
    .map(part => {
      const [slug, encodedProgram, sizeStr] = part.split(':')
      if (!slug || !encodedProgram || !sizeStr) return null
      const programName = decodeURIComponent(encodedProgram)
      const accountSize = parseInt(sizeStr, 10)
      if (isNaN(accountSize)) return null
      const firm = firms.find(f => f.slug === slug)
      if (!firm) return null
      const valid = firm.account_models.find(
        m => m.program_name === programName && m.account_size === accountSize
      )
      if (!valid) return null
      return { slug, programName, accountSize }
    })
    .filter((s): s is FirmSelection => s !== null)
    .slice(0, 3)
}

export default function CompareView({ firms }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { marketType } = useMarketType()

  const filteredFirms = firms.filter(f =>
    marketType === 'futures' ? f.category === 'futures' : f.category !== 'futures'
  )

  const [selections, setSelections] = useState<FirmSelection[]>(() => {
    const param = searchParams.get('firms')
    if (param) return parseSelections(param, firms) // use all firms for initial parse
    return []
  })

  // Drop selections that don't exist in the filtered set
  useEffect(() => {
    setSelections(prev => prev.filter(s => filteredFirms.find(f => f.slug === s.slug)))
  }, [marketType]) // eslint-disable-line react-hooks/exhaustive-deps

  // Sync URL
  useEffect(() => {
    const url = new URL(window.location.href)
    if (selections.length > 0) {
      url.searchParams.set('firms', serializeSelections(selections))
    } else {
      url.searchParams.delete('firms')
    }
    router.replace(url.pathname + url.search, { scroll: false })
  }, [selections]) // eslint-disable-line react-hooks/exhaustive-deps

  const addFirm = useCallback((slug: string) => {
    setSelections(prev => {
      if (prev.length >= 3) return prev
      if (prev.find(s => s.slug === slug)) return prev
      const firm = filteredFirms.find(f => f.slug === slug)
      if (!firm) return prev
      const programs = getPrograms(firm)
      const programName = programs[0]
      const sizes = getSizes(firm, programName)
      const accountSize = defaultSize(sizes)
      return [...prev, { slug, programName, accountSize }]
    })
  }, [filteredFirms])

  const removeFirm = useCallback((slug: string) => {
    setSelections(prev => prev.filter(s => s.slug !== slug))
  }, [])

  const changeProgram = useCallback((slug: string, programName: string) => {
    setSelections(prev => prev.map(s => {
      if (s.slug !== slug) return s
      const firm = filteredFirms.find(f => f.slug === slug)
      if (!firm) return s
      const sizes = getSizes(firm, programName)
      const accountSize = defaultSize(sizes)
      return { ...s, programName, accountSize }
    }))
  }, [filteredFirms])

  const changeSize = useCallback((slug: string, accountSize: number) => {
    setSelections(prev => prev.map(s => s.slug === slug ? { ...s, accountSize } : s))
  }, [])

  const selectedSlugs = selections.map(s => s.slug)

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 0 80px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{
          fontSize: '26px', fontWeight: 700, color: '#f1f5f9', marginBottom: '6px',
          fontFamily: 'var(--font-geist-sans), Inter, sans-serif',
        }}>
          Compare prop firms
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '13px', maxWidth: '620px' }}>
          Pick up to 3 firms, lock in the same account size, then inspect cost, survival rules, payout terms and trust side by side.
        </p>
      </div>

      <CompareSelector
        firms={filteredFirms}
        selectedSlugs={selectedSlugs}
        onAdd={addFirm}
        onRemove={removeFirm}
      />

      <CompareTable
        allFirms={filteredFirms}
        selections={selections}
        onRemove={removeFirm}
        onChangeProgram={changeProgram}
        onChangeSize={changeSize}
      />
    </div>
  )
}
