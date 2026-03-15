'use client'

import Link from 'next/link'
import { BadgeCheck, Users } from 'lucide-react'
import StarRating from '@/components/ui/StarRating'
import FirmLogo from '@/components/ui/FirmLogo'
import type { Firm } from '@/lib/types'

export type { Firm } from '@/lib/types'

const EDITORIAL_TAGS = new Set(["EDITOR'S CHOICE", 'TOP RATED', 'FUTURES #1', 'BEST VALUE'])

function TagBadge({ tag }: { tag: string }) {
  const isEditorial = EDITORIAL_TAGS.has(tag)
  return (
    <span style={{
      background: isEditorial ? 'rgba(0,255,136,0.08)' : 'rgba(255,255,255,0.04)',
      color: isEditorial ? '#00ff88' : '#94a3b8',
      border: isEditorial ? '1px solid rgba(0,255,136,0.3)' : '1px solid rgba(255,255,255,0.08)',
      borderRadius: '999px', padding: '2px 9px',
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
        border: firm.featured ? '1px solid transparent' : '1px solid rgba(255,255,255,0.08)',
        borderRadius: '18px',
        padding: '22px 20px 18px',
        transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s, transform 0.2s',
        position: 'relative',
        animationDelay: `${(index ?? 0) * 60}ms`,
        boxShadow: firm.featured ? '0 0 30px rgba(0,255,136,0.08)' : undefined,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = firm.featured ? 'transparent' : 'rgba(255,255,255,0.16)'
        e.currentTarget.style.background = '#111827'
        e.currentTarget.style.boxShadow = firm.featured
          ? '0 0 40px rgba(0,255,136,0.12)'
          : '0 18px 55px rgba(0,0,0,0.85)'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = firm.featured ? 'transparent' : 'rgba(255,255,255,0.08)'
        e.currentTarget.style.background = '#0d1117'
        e.currentTarget.style.boxShadow = firm.featured ? '0 0 30px rgba(0,255,136,0.08)' : 'none'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {/* Featured badge */}
      {firm.featured && (
        <div style={{
          position: 'absolute', top: '14px', right: '16px',
          background: 'rgba(0,255,136,0.08)',
          border: '1px solid rgba(0,255,136,0.4)',
          borderRadius: '999px', padding: '3px 9px',
          fontSize: '9px', fontWeight: 700, letterSpacing: '1.5px', color: '#00ff88',
        }}>FEATURED</div>
      )}

      {/* Top row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
          <div style={{
            width: '48px', height: '48px',
            background: 'rgba(15,23,42,0.9)',
            borderRadius: '12px', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontWeight: 900, fontSize: '14px',
            color: '#94a3b8', flexShrink: 0, overflow: 'hidden',
          }}><FirmLogo logo={firm.logo} name={firm.name} size={48} /></div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '15px', color: '#f1f5f9', fontFamily: 'var(--font-geist-sans), Inter, sans-serif' }}>{firm.name}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '3px' }}>
              <StarRating rating={firm.rating} size={12} />
              <span style={{ color: '#475569', fontSize: '12px' }}>
                {firm.rating} · {firm.reviews.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '18px', fontWeight: 800, color: '#00ff88', letterSpacing: '-0.5px' }}>{firm.discount}%</div>
          <div style={{ fontSize: '10px', color: '#475569', textTransform: 'uppercase', letterSpacing: '1px' }}>discount</div>
        </div>
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
        <TagBadge tag={firm.tag} />
        {firm.instantFunding && (
          <span style={{
            background: 'rgba(255,255,255,0.04)', color: '#94a3b8',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '999px', padding: '2px 8px',
            fontSize: '10px', fontWeight: 600,
          }}>⚡ INSTANT</span>
        )}
        {firm.weekendHolding && (
          <span style={{
            background: 'rgba(255,255,255,0.04)', color: '#94a3b8',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '999px', padding: '2px 8px',
            fontSize: '10px', fontWeight: 600,
          }}>🌙 WEEKEND</span>
        )}
      </div>

      {/* Metrics */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1.2fr 1.1fr 1.1fr',
        gap: '8px', marginBottom: '16px',
      }}>
        {/* Split with arc — lime only on profit split */}
        <div style={{
          background: 'rgba(15,23,42,0.9)', borderRadius: '9px',
          padding: '10px 10px', textAlign: 'center',
          border: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div style={{ fontSize: '10px', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Split</div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#00ff88', marginTop: '3px' }}>{firm.profitSplit}</div>
        </div>
        {/* Max Drawdown — amber */}
        <div style={{
          background: 'rgba(15,23,42,0.9)', borderRadius: '9px',
          padding: '10px 10px', textAlign: 'center',
          border: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div style={{ fontSize: '10px', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Max DD</div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#f59e0b', marginTop: '3px' }}>{firm.maxDrawdown}</div>
        </div>
        {/* Fee — neutral */}
        <div style={{
          background: 'rgba(15,23,42,0.9)', borderRadius: '9px',
          padding: '10px 10px', textAlign: 'center',
          border: '1px solid rgba(255,255,255,0.06)',
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
          padding: '10px 12px', background: '#00ff88',
          color: '#060b14', borderRadius: '999px',
          fontWeight: 700, fontSize: '13px',
          textDecoration: 'none',
          transition: 'transform 0.15s, box-shadow 0.15s',
          boxShadow: '0 10px 35px rgba(0,255,136,0.28)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-1px)'
          e.currentTarget.style.boxShadow = '0 12px 42px rgba(0,255,136,0.33)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = '0 10px 35px rgba(0,255,136,0.28)'
        }}
      >
        View Deal →
      </Link>

      {/* Trust signals */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        marginTop: '12px', flexWrap: 'wrap',
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
      </div>
    </div>
  )
}
