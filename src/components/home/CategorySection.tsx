'use client'

import Link from 'next/link'

const categories = [
  {
    emoji: '🌍',
    title: 'Forex Firms',
    description: 'Best for forex & CFD traders',
    href: '/firms?category=forex',
  },
  {
    emoji: '📈',
    title: 'Futures Firms',
    description: 'CME, CBOT & NYMEX access',
    href: '/firms?category=futures',
  },
  {
    emoji: '⚡',
    title: 'Instant Funding',
    description: 'No evaluation required',
    href: '/firms?category=instant',
  },
  {
    emoji: '💰',
    title: 'Lowest Cost',
    description: 'Cheapest challenge fees',
    href: '/firms?sort=cheapest',
  },
]

export default function CategorySection() {
  return (
    <section style={{
      padding: '0 24px 96px',
      maxWidth: '1200px',
      margin: '0 auto',
    }}>
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{
          fontSize: '22px', fontWeight: 700, color: '#f1f5f9', marginBottom: '8px',
          fontFamily: 'var(--font-geist-sans), Inter, sans-serif',
        }}>
          Browse by Category
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '14px' }}>
          Find firms that match your trading style
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: '12px',
      }}>
        {categories.map(cat => (
          <Link key={cat.title} href={cat.href} style={{
            background: '#0d1117',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '16px',
            padding: '28px 24px',
            textDecoration: 'none',
            display: 'block',
            transition: 'border-color 0.2s, background 0.2s, transform 0.2s, box-shadow 0.2s',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
              e.currentTarget.style.background = '#111827'
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
              e.currentTarget.style.background = '#0d1117'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <div style={{ fontSize: '24px', marginBottom: '14px' }}>{cat.emoji}</div>
            <div style={{ fontWeight: 600, color: '#f1f5f9', marginBottom: '6px', fontSize: '15px' }}>{cat.title}</div>
            <div style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '18px' }}>{cat.description}</div>
            <div style={{ color: '#22d3ee', fontSize: '13px', fontWeight: 500 }}>Explore →</div>
          </Link>
        ))}
      </div>
    </section>
  )
}
