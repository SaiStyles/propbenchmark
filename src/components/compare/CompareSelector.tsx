'use client'

import FirmLogo from '@/components/ui/FirmLogo'
import type { CompareFirm } from '@/lib/types'

type Props = {
  firms: CompareFirm[]
  selectedSlugs: string[]
  onAdd: (slug: string) => void
  onRemove: (slug: string) => void
}

export default function CompareSelector({ firms, selectedSlugs, onAdd, onRemove }: Props) {
  const isFull = selectedSlugs.length >= 3

  if (firms.length === 0) {
    return (
      <div style={{
        background: '#0d1117', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '14px', padding: '32px 20px', marginBottom: '20px',
        textAlign: 'center', color: '#475569', fontSize: '14px',
      }}>
        No firms available to compare in this market type.
      </div>
    )
  }

  return (
    <div style={{
      background: 'radial-gradient(circle at top left, rgba(15,23,42,0.9), rgba(15,23,42,0.95))',
      border: '1px solid rgba(30,64,175,0.65)',
      borderRadius: '14px',
      padding: '16px 18px',
      marginBottom: '20px',
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: '16px',
      }}>
        <span style={{
          fontSize: '11px', fontWeight: 600, color: '#475569',
          textTransform: 'uppercase', letterSpacing: '1px',
        }}>
          Select Firms to Compare
        </span>
        <span style={{
          fontSize: '12px', fontWeight: 600,
          color: isFull ? '#00ff88' : '#475569',
          background: isFull ? 'rgba(0,255,136,0.08)' : 'transparent',
          border: `1px solid ${isFull ? 'rgba(0,255,136,0.2)' : 'rgba(255,255,255,0.08)'}`,
          borderRadius: '20px', padding: '2px 10px',
        }}>
          {selectedSlugs.length}/3 selected
        </span>
      </div>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {firms.map(firm => {
          const isSelected = selectedSlugs.includes(firm.slug)
          const isDisabled = !isSelected && isFull
          return (
            <button
              key={firm.slug}
              onClick={() => {
                if (isDisabled) return
                if (isSelected) onRemove(firm.slug)
                else onAdd(firm.slug)
              }}
              style={{
                display: 'flex', alignItems: 'center', gap: '9px',
                padding: '8px 13px', borderRadius: '10px',
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                border: isSelected
                  ? '1px solid rgba(0,255,136,0.3)'
                  : '1px solid rgba(255,255,255,0.08)',
                background: isSelected ? 'rgba(0,255,136,0.07)' : 'rgba(255,255,255,0.02)',
                opacity: isDisabled ? 0.4 : 1,
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => {
                if (!isDisabled && !isSelected) {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                }
              }}
              onMouseLeave={e => {
                if (!isDisabled && !isSelected) {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
                }
              }}
            >
              <div style={{
                width: '26px', height: '26px',
                background: 'rgba(255,255,255,0.06)',
                borderRadius: '6px', flexShrink: 0, overflow: 'hidden',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '10px', color: '#94a3b8',
              }}>
                <FirmLogo logo={firm.logo_url ?? ''} name={firm.name} size={26} />
              </div>
              <span style={{
                fontSize: '13px', fontWeight: 600,
                color: isSelected ? '#00ff88' : '#94a3b8',
              }}>
                {firm.name}
              </span>
              {isSelected && (
                <div style={{
                  width: '15px', height: '15px',
                  background: 'rgba(0,255,136,0.15)',
                  border: '1px solid rgba(0,255,136,0.3)',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '8px', color: '#00ff88', fontWeight: 900,
                }}>✓</div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
