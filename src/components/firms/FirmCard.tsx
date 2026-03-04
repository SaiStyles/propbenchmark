'use client'

import Link from 'next/link'
import { BadgeCheck, Users, Clock } from 'lucide-react'
import StarRating from '@/components/ui/StarRating'
import ProfitSplitArc from '@/components/ui/ProfitSplitArc'

export type Firm = {
  id: number
  name: string
  logo: string
  rating: number
  reviews: number
  discount: number
  tag: string
  profitSplit: string
  maxDrawdown: string
  challengeFee: string
  steps: number
  instantFunding: boolean
  weekendHolding: boolean
  category: string
  slug: string
  featured?: boolean
  verified?: boolean
  paysWithin?: string
}

const EDITORIAL_TAGS = new Set(["EDITOR'S CHOICE", 'TOP RATED', 'FUTURES #1', 'BEST VALUE'])

function TagBadge({ tag }: { tag: string }) {
  const isEditorial = EDITORIAL_TAGS.has(tag)
  return (
    <span style={{
      background: isEditorial ? 'rgba(0,255,136,0.08)' : 'rgba(255,255,255,0.04)',
      color: isEditorial ? '#00ff88' : '#94a3b8',
      border: isEditorial ? '1px solid rgba(0,255,136,0.2)' : '1px solid rgba(255,255,255,0.08)',
      borderRadius: '4px', padding: '2px 8px',
      fontSize: '10px', fontWeight: 700, letterSpacing: '1px',
    }}>{tag}</span>
  )
}

type Props = {
  firm: Firm
  index?: number
}

export default function FirmCard({ firm, index }: Props) {
  return (
    <div
      className={`anim-fade-up ${firm.featured ? 'featured-card-border' : ''}`}
      style={{
        background: '#0d1117',
        border: firm.featured ? '1px solid transparent' : '1px solid rgba(255,255,255,0.07)',
        borderRadius: '16px',
        padding: '24px',
        transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s, transform 0.2s',
        position: 'relative',
        animationDelay: `${(index ?? 0) * 60}ms`,
        boxShadow: firm.featured ? '0 0 30px rgba(0,255,136,0.08)' : undefined,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = firm.featured ? 'transparent' : 'rgba(255,255,255,0.12)'
        e.currentTarget.style.background = '#111827'
        e.currentTarget.style.boxShadow = firm.featured
          ? '0 0 40px rgba(0,255,136,0.12)'
          : '0 8px 32px rgba(0,0,0,0.35)'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = firm.featured ? 'transparent' : 'rgba(255,255,255,0.07)'
        e.currentTarget.style.background = '#0d1117'
        e.currentTarget.style.boxShadow = firm.featured ? '0 0 30px rgba(0,255,136,0.08)' : 'none'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {/* Featured badge */}
      {firm.featured && (
        <div style={{
          position: 'absolute', top: '16px', right: '16px',
          background: 'rgba(0,255,136,0.12)',
          border: '1px solid rgba(0,255,136,0.25)',
          borderRadius: '4px', padding: '2px 7px',
          fontSize: '9px', fontWeight: 700, letterSpacing: '1.5px', color: '#00ff88',
        }}>FEATURED</div>
      )}

      {/* Top row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
        <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
          <div style={{
            width: '48px', height: '48px',
            background: 'rgba(255,255,255,0.06)',
            borderRadius: '10px', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontWeight: 900, fontSize: '14px',
            color: '#94a3b8',
            flexShrink: 0,
          }}>{firm.logo}</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '16px', color: '#f1f5f9', fontFamily: 'var(--font-geist-sans), Inter, sans-serif' }}>{firm.name}</div>
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

      {/* Tags */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <TagBadge tag={firm.tag} />
        {firm.instantFunding && (
          <span style={{
            background: 'rgba(255,255,255,0.04)', color: '#94a3b8',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '4px', padding: '2px 8px',
            fontSize: '10px', fontWeight: 600,
          }}>⚡ INSTANT</span>
        )}
        {firm.weekendHolding && (
          <span style={{
            background: 'rgba(255,255,255,0.04)', color: '#94a3b8',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '4px', padding: '2px 8px',
            fontSize: '10px', fontWeight: 600,
          }}>🌙 WEEKEND</span>
        )}
      </div>

      {/* Metrics */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
        gap: '8px', marginBottom: '20px',
      }}>
        {/* Split with arc — lime only on profit split */}
        <div style={{
          background: 'rgba(0,0,0,0.25)', borderRadius: '8px',
          padding: '11px 10px', textAlign: 'center',
          border: '1px solid rgba(255,255,255,0.05)',
        }}>
          <div style={{ fontSize: '10px', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Split</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginTop: '3px' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#00ff88' }}>{firm.profitSplit}</div>
            <ProfitSplitArc percent={firm.profitSplit} size={20} />
          </div>
        </div>
        {/* Max Drawdown — amber */}
        <div style={{
          background: 'rgba(0,0,0,0.25)', borderRadius: '8px',
          padding: '11px 10px', textAlign: 'center',
          border: '1px solid rgba(255,255,255,0.05)',
        }}>
          <div style={{ fontSize: '10px', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Max DD</div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#f59e0b', marginTop: '3px' }}>{firm.maxDrawdown}</div>
        </div>
        {/* Fee — neutral */}
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

      {/* Trust signals */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        marginTop: '14px', flexWrap: 'wrap',
      }}>
        <span style={{ fontSize: '10px', color: '#475569' }}>Updated March 2026</span>
        {firm.verified && (
          <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '10px', color: '#475569' }}>
            <BadgeCheck size={11} color="#00ff88" />
            <span>Verified</span>
          </span>
        )}
        <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '10px', color: '#475569' }}>
          <Users size={10} />
          {firm.reviews.toLocaleString()}
        </span>
        {firm.paysWithin && (
          <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '10px', color: '#475569' }}>
            <Clock size={10} />
            {firm.paysWithin}
          </span>
        )}
      </div>
    </div>
  )
}
