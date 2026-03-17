'use client'

import { usePathname } from 'next/navigation'
import { useMarketType } from '@/context/MarketTypeContext'

export default function MarketToggle() {
  const pathname = usePathname()
  const { marketType, setMarketType } = useMarketType()

  if (pathname === '/' || pathname.startsWith('/blog')) return null

  return (
    <div style={{
      position: 'sticky',
      top: '56px',
      zIndex: 90,
      background: 'rgba(6,11,20,0.92)',
      backdropFilter: 'blur(8px)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      padding: '8px 24px',
      display: 'flex',
      justifyContent: 'center',
      marginLeft: '-24px',
      marginRight: '-24px',
    }}>
      <div style={{
        display: 'inline-flex',
        gap: '4px',
        background: '#0d1117',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '10px',
        padding: '4px',
      }}>
        {(['cfd', 'futures'] as const).map(type => {
          const active = marketType === type
          return (
            <button
              key={type}
              onClick={() => setMarketType(type)}
              style={{
                padding: '5px 20px',
                borderRadius: '7px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                transition: 'all 0.15s',
                background: active ? 'rgba(0,255,136,0.1)' : 'transparent',
                color: active ? '#00ff88' : '#475569',
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.color = '#94a3b8' }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.color = '#475569' }}
            >
              {type === 'cfd' ? 'CFD / Forex' : 'Futures'}
            </button>
          )
        })}
      </div>
    </div>
  )
}
