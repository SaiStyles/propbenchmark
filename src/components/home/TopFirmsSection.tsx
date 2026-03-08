'use client'

import Link from 'next/link'
import StarRating from '@/components/ui/StarRating'
import FirmLogo from '@/components/ui/FirmLogo'
import type { Firm } from '@/lib/types'

const EDITORIAL_TAGS = new Set(["EDITOR'S CHOICE", 'TOP RATED', 'FUTURES #1', 'BEST VALUE'])

type Props = { firms?: Firm[] }

export default function TopFirmsSection({ firms: propFirms }: Props) {
  const firms = propFirms ?? []

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
      {firms.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 0', color: '#475569', fontSize: '14px' }}>
          No firms available right now.
        </div>
      ) : (
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
                    color: '#94a3b8', overflow: 'hidden',
                  }}><FirmLogo logo={firm.logo} name={firm.name} size={48} /></div>
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
      )}

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
