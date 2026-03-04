'use client'

import Link from 'next/link'
import StarRating from '@/components/ui/StarRating'

const EDITORIAL_TAGS = new Set(["EDITOR'S CHOICE", 'TOP RATED', 'FUTURES #1', 'BEST VALUE'])

const firms = [
  {
    id: 1, name: 'FTMO', logo: 'F', rating: 4.9, reviews: 2847, discount: 10,
    tag: "EDITOR'S CHOICE",
    profitSplit: '90%', maxDrawdown: '10%', challengeFee: '$155', steps: 2,
    slug: 'ftmo', featured: true, verified: true,
  },
  {
    id: 2, name: 'Funding Pips', logo: 'FP', rating: 4.8, reviews: 1923, discount: 15,
    tag: 'TOP RATED',
    profitSplit: '85%', maxDrawdown: '8%', challengeFee: '$99', steps: 1,
    slug: 'funding-pips', featured: true, verified: true,
  },
  {
    id: 3, name: 'Topstep', logo: 'TS', rating: 4.7, reviews: 3102, discount: 20,
    tag: 'FUTURES #1',
    profitSplit: '90%', maxDrawdown: '6%', challengeFee: '$165', steps: 1,
    slug: 'topstep', verified: true,
  },
  {
    id: 4, name: 'The5ers', logo: '5', rating: 4.8, reviews: 1456, discount: 5,
    tag: 'LOW COST',
    profitSplit: '100%', maxDrawdown: '5%', challengeFee: '$39', steps: 2,
    slug: 'the5ers', verified: true,
  },
  {
    id: 5, name: 'Apex Trader', logo: 'AT', rating: 4.6, reviews: 2231, discount: 25,
    tag: 'BEST VALUE',
    profitSplit: '90%', maxDrawdown: '6%', challengeFee: '$137', steps: 1,
    slug: 'apex-trader', verified: true,
  },
  {
    id: 6, name: 'Alpha Capital', logo: 'AC', rating: 4.4, reviews: 867, discount: 15,
    tag: 'INSTANT FUND',
    profitSplit: '80%', maxDrawdown: '10%', challengeFee: '$299', steps: 0,
    slug: 'alpha-capital',
  },
]

export default function TopFirmsSection() {
  return (
    <section style={{ padding: '80px 24px 72px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{
          fontSize: '22px', fontWeight: 700, color: '#f1f5f9', marginBottom: '8px',
          fontFamily: 'var(--font-geist-sans), Inter, sans-serif',
        }}>
          Top Rated Firms
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '14px' }}>
          Highest rated based on verified trader feedback
        </p>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
        gap: '16px',
      }}>
        {firms.map((firm, i) => {
          const isEditorial = EDITORIAL_TAGS.has(firm.tag)
          return (
            <div
              key={firm.id}
              className="anim-fade-up"
              style={{
                background: '#0d1117',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '16px',
                padding: '24px',
                transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s, transform 0.2s',
                animationDelay: `${i * 60}ms`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
                e.currentTarget.style.background = '#111827'
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.35)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                e.currentTarget.style.background = '#0d1117'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {/* Top row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <div style={{
                    width: '48px', height: '48px',
                    background: 'rgba(255,255,255,0.06)',
                    borderRadius: '10px', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontWeight: 900, fontSize: '14px',
                    color: '#94a3b8',
                  }}>{firm.logo}</div>
                  <div>
                    <div style={{
                      fontWeight: 700, fontSize: '16px', color: '#f1f5f9',
                      fontFamily: 'var(--font-geist-sans), Inter, sans-serif',
                    }}>{firm.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '3px' }}>
                      <StarRating rating={firm.rating} size={12} />
                      <span style={{ color: '#475569', fontSize: '12px' }}>
                        {firm.rating} · {firm.reviews.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.5px' }}>{firm.discount}%</div>
                  <div style={{ fontSize: '10px', color: '#475569', textTransform: 'uppercase', letterSpacing: '1px' }}>OFF</div>
                </div>
              </div>

              {/* Tag */}
              <span style={{
                background: isEditorial ? 'rgba(0,255,136,0.08)' : 'rgba(255,255,255,0.04)',
                color: isEditorial ? '#00ff88' : '#94a3b8',
                border: isEditorial ? '1px solid rgba(0,255,136,0.2)' : '1px solid rgba(255,255,255,0.08)',
                borderRadius: '4px', padding: '2px 8px',
                fontSize: '10px', fontWeight: 700, letterSpacing: '1px',
              }}>{firm.tag}</span>

              {/* Metrics */}
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
                gap: '8px', margin: '18px 0',
              }}>
                <div style={{
                  background: 'rgba(0,0,0,0.25)', borderRadius: '8px',
                  padding: '11px 10px', textAlign: 'center',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}>
                  <div style={{ fontSize: '10px', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Split</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#00ff88', marginTop: '3px' }}>{firm.profitSplit}</div>
                </div>
                <div style={{
                  background: 'rgba(0,0,0,0.25)', borderRadius: '8px',
                  padding: '11px 10px', textAlign: 'center',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}>
                  <div style={{ fontSize: '10px', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Max DD</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#f59e0b', marginTop: '3px' }}>{firm.maxDrawdown}</div>
                </div>
                <div style={{
                  background: 'rgba(0,0,0,0.25)', borderRadius: '8px',
                  padding: '11px 10px', textAlign: 'center',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}>
                  <div style={{ fontSize: '10px', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Fee</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#f1f5f9', marginTop: '3px' }}>{firm.challengeFee}</div>
                </div>
              </div>

              {/* CTA */}
              <Link
                href={`/firms/${firm.slug}`}
                style={{
                  display: 'block', textAlign: 'center',
                  padding: '11px', background: '#00ff88',
                  color: '#060b14', borderRadius: '8px',
                  fontWeight: 700, fontSize: '14px',
                  textDecoration: 'none',
                  transition: 'transform 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.02)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              >
                View Deal →
              </Link>
            </div>
          )
        })}
      </div>

      {/* View all */}
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <Link href="/firms" style={{
          padding: '12px 28px',
          border: '1px solid rgba(255,255,255,0.12)',
          color: '#94a3b8', borderRadius: '8px',
          fontWeight: 600, fontSize: '14px',
          textDecoration: 'none',
          transition: 'all 0.15s',
          display: 'inline-block',
        }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'rgba(0,255,136,0.4)'
            e.currentTarget.style.color = '#00ff88'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
            e.currentTarget.style.color = '#94a3b8'
          }}
        >
          View All Firms →
        </Link>
      </div>
    </section>
  )
}
