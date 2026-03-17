'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { OfferData } from '@/lib/types'

// Backward-compat alias used by OffersPage
export type Offer = OfferData

const FEATURED_OFFER_TAGS = new Set(['EXCLUSIVE', 'BEST DEAL'])

type Props = {
  offer: Offer
  index?: number
}

export default function OfferCard({ offer, index }: Props) {
  const [copied, setCopied] = useState(false)
  const isHighlightTag = FEATURED_OFFER_TAGS.has(offer.tag)

  const handleCopy = () => {
    navigator.clipboard.writeText(offer.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className={`anim-fade-up ${offer.featured ? 'featured-card-border' : ''}`}
      style={{
        background: '#0d1117',
        border: offer.featured ? '1px solid transparent' : `1px solid rgba(255,255,255,0.08)`,
        borderRadius: '18px',
        overflow: 'hidden',
        transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s, transform 0.2s',
        position: 'relative',
        boxShadow: offer.featured ? '0 0 30px rgba(0,255,136,0.08)' : undefined,
        animationDelay: `${(index ?? 0) * 60}ms`,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = offer.featured ? 'transparent' : 'rgba(255,255,255,0.16)'
        e.currentTarget.style.background = '#111827'
        e.currentTarget.style.boxShadow = offer.featured
          ? '0 0 40px rgba(0,255,136,0.12)'
          : '0 18px 55px rgba(0,0,0,0.85)'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = offer.featured ? 'transparent' : 'rgba(255,255,255,0.08)'
        e.currentTarget.style.background = '#0d1117'
        e.currentTarget.style.boxShadow = offer.featured ? '0 0 30px rgba(0,255,136,0.08)' : 'none'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {/* Featured top accent */}
      {offer.featured && (
        <div style={{
          height: '2px',
          background: 'linear-gradient(90deg, #00ff88, #00cc6a)',
        }} />
      )}

      <div style={{ padding: '22px 20px 18px' }}>
        {/* Firm row */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-start', marginBottom: '18px',
        }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{
              width: '44px', height: '44px',
              background: 'rgba(15,23,42,0.9)',
              borderRadius: '12px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 900, fontSize: '13px', color: '#94a3b8',
              flexShrink: 0, overflow: 'hidden',
            }}>
              {offer.firmLogo.startsWith('http') ? (
                <img
                  src={offer.firmLogo}
                  alt={offer.firmName}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              ) : offer.firmLogo}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '15px', color: '#f1f5f9' }}>
                {offer.firmName}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
            <span style={{
              background: isHighlightTag ? 'rgba(245,158,11,0.08)' : 'rgba(255,255,255,0.04)',
              border: isHighlightTag ? '1px solid rgba(245,158,11,0.25)' : '1px solid rgba(255,255,255,0.08)',
              borderRadius: '999px', padding: '2px 9px',
              fontSize: '10px', fontWeight: 700,
              color: isHighlightTag ? '#f59e0b' : '#94a3b8',
              letterSpacing: '1px',
            }}>
              {offer.tag}
            </span>
            <span style={{
              fontSize: '10px', color: '#475569',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '999px', padding: '2px 8px',
              textTransform: 'capitalize',
            }}>
              {offer.category}
            </span>
          </div>
        </div>

        {/* Discount + description */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '6px' }}>
            <span style={{
              fontSize: '34px', fontWeight: 800,
              color: '#f1f5f9', lineHeight: 1, letterSpacing: '-1px',
            }}>
              {offer.discount}%
            </span>
            <span style={{
              fontSize: '14px', fontWeight: 600,
              color: '#475569', letterSpacing: '1px',
            }}>OFF</span>
          </div>
          <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0, lineHeight: 1.6 }}>
            {offer.description}
          </p>
        </div>

        {/* Code row */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
          <div style={{
            flex: 1,
            background: '#1a2a1a',
            border: '1px solid rgba(0,255,136,0.35)',
            borderRadius: '999px', padding: '9px 14px',
            fontFamily: 'monospace', fontSize: '13px',
            fontWeight: 700, color: '#00ff88', letterSpacing: '2px',
          }}>
            {offer.code}
          </div>
          <button
            onClick={handleCopy}
            style={{
              padding: '9px 14px', borderRadius: '999px',
              border: copied ? '1px solid rgba(0,255,136,0.4)' : '1px solid rgba(255,255,255,0.08)',
              background: copied ? 'rgba(0,255,136,0.08)' : 'rgba(255,255,255,0.03)',
              color: copied ? '#00ff88' : '#475569',
              fontSize: '12px', fontWeight: 700, cursor: 'pointer',
              transition: 'all 0.2s', whiteSpace: 'nowrap', letterSpacing: '0.5px',
            }}
            onMouseEnter={e => { if (!copied) e.currentTarget.style.color = '#94a3b8' }}
            onMouseLeave={e => { if (!copied) e.currentTarget.style.color = '#475569' }}
          >
            {copied ? '✓ COPIED' : 'COPY'}
          </button>
        </div>

        {/* Savings + expiry */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: '16px',
        }}>
          <span style={{ fontSize: '12px', color: '#f59e0b', fontWeight: 600 }}>
            {offer.savings}
          </span>
          <span style={{
            fontSize: '11px',
            color: offer.expires ? '#f59e0b' : '#475569',
          }}>
            {offer.expires ? `Expires ${offer.expires}` : 'No expiry'}
          </span>
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <a
            href={offer.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1, display: 'block', textAlign: 'center',
              padding: '10px 12px', background: '#00ff88',
              color: '#060b14', borderRadius: '999px',
              fontWeight: 700, fontSize: '13px', textDecoration: 'none',
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
            Claim Deal →
          </a>
          <Link
            href={`/firms/${offer.firmSlug}`}
            style={{
              padding: '10px 14px',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '999px', color: '#94a3b8',
              fontSize: '12px', fontWeight: 600,
              textDecoration: 'none', whiteSpace: 'nowrap',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(0,255,136,0.3)'
              e.currentTarget.style.color = '#00ff88'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
              e.currentTarget.style.color = '#94a3b8'
            }}
          >
            Review
          </Link>
        </div>
      </div>
    </div>
  )
}
