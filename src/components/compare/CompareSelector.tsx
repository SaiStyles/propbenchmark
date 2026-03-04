'use client'

import { Firm } from '@/components/firms/FirmCard'
import StarRating from '@/components/ui/StarRating'

type Props = {
  firms: Firm[]
  selected: string[]
  onToggle: (slug: string) => void
}

export default function CompareSelector({ firms, selected, onToggle }: Props) {
  const isFull = selected.length === 3

  return (
    <div style={{
      background: '#0d1117',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '28px',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span style={{
          fontSize: '11px', fontWeight: 600, color: '#475569',
          textTransform: 'uppercase', letterSpacing: '1px',
        }}>
          Select Firms
        </span>
        <span style={{
          fontSize: '12px', fontWeight: 600,
          color: isFull ? '#00ff88' : '#475569',
          background: isFull ? 'rgba(0,255,136,0.08)' : 'transparent',
          border: `1px solid ${isFull ? 'rgba(0,255,136,0.2)' : 'rgba(255,255,255,0.08)'}`,
          borderRadius: '20px', padding: '2px 10px',
        }}>
          {selected.length}/3 selected
        </span>
      </div>

      {/* Firm chips */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {firms.map(firm => {
          const isSelected = selected.includes(firm.slug)
          const isDisabled = !isSelected && selected.length >= 3
          return (
            <button
              key={firm.slug}
              onClick={() => { if (!isDisabled) onToggle(firm.slug) }}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '9px 14px', borderRadius: '10px',
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                border: isSelected ? '1px solid rgba(0,255,136,0.3)' : '1px solid rgba(255,255,255,0.08)',
                background: isSelected ? 'rgba(0,255,136,0.07)' : 'transparent',
                opacity: isDisabled ? 0.4 : 1,
                transition: 'all 0.15s',
              }}
            >
              <div style={{
                width: '28px', height: '28px',
                background: 'rgba(255,255,255,0.06)',
                borderRadius: '6px', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontWeight: 900, fontSize: '10px',
                color: '#94a3b8',
                flexShrink: 0,
              }}>{firm.logo}</div>
              <div style={{ textAlign: 'left' }}>
                <div style={{
                  fontSize: '13px', fontWeight: 600,
                  color: isSelected ? '#00ff88' : '#94a3b8',
                }}>
                  {firm.name}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <StarRating rating={firm.rating} size={10} />
                  <span style={{ fontSize: '11px', color: '#475569' }}>{firm.rating}</span>
                </div>
              </div>
              {isSelected && (
                <div style={{
                  marginLeft: '2px', width: '16px', height: '16px',
                  background: 'rgba(0,255,136,0.15)',
                  border: '1px solid rgba(0,255,136,0.3)',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '9px', color: '#00ff88', fontWeight: 900,
                }}>✓</div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
