'use client'

import CountUp from '@/components/ui/CountUp'

const stats = [
  { number: '18', label: 'Verified Firms' },
  { number: '100%', label: 'Unbiased Data' },
]

export default function StatsSection() {
  return (
    <section style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      padding: '44px 24px',
      background: '#080e18',
    }}>
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        display: 'flex', justifyContent: 'center',
        gap: '24px', flexWrap: 'wrap',
      }}>
        {stats.map(stat => (
          <div
            key={stat.label}
            style={{
              textAlign: 'center',
              background: '#0d1117',
              border: '1px solid rgba(255,255,255,0.07)',
              backdropFilter: 'blur(8px)',
              borderRadius: '12px',
              padding: '20px 28px',
            }}
          >
            <div style={{
              fontSize: '32px', fontWeight: 800,
              color: '#f1f5f9', lineHeight: 1,
              letterSpacing: '-1px',
            }}>
              <CountUp value={stat.number} />
            </div>
            <div style={{
              fontSize: '11px', color: '#475569',
              marginTop: '8px', fontWeight: 500,
              textTransform: 'uppercase', letterSpacing: '0.5px',
            }}>{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
