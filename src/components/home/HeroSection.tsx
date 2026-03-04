'use client'

import Link from 'next/link'

export default function HeroSection() {
  return (
    <section style={{
      padding: '110px 24px 90px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 70% 40% at 50% -10%, rgba(0,255,136,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Grid lines */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
        {/* Badge */}
        <div
          className="anim-fade-up"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(0,255,136,0.07)', border: '1px solid rgba(0,255,136,0.18)',
            borderRadius: '20px', padding: '5px 16px', fontSize: '11px',
            color: '#00ff88', marginBottom: '32px', letterSpacing: '1.5px', fontWeight: 600,
            animationDelay: '0ms',
          }}
        >
          <span className="pulse-dot" />
          50+ VERIFIED FIRMS · LIVE DATA
        </div>

        {/* Title */}
        <h1
          className="anim-fade-up"
          style={{
            fontSize: 'clamp(38px, 6vw, 68px)',
            fontWeight: 800, lineHeight: 1.08,
            marginBottom: '24px', letterSpacing: '-2px',
            color: '#f1f5f9',
            fontFamily: 'var(--font-geist-sans), Inter, sans-serif',
            animationDelay: '80ms',
          }}
        >
          Find Your Perfect<br />
          <span style={{ color: '#00ff88' }}>Prop Firm</span>
        </h1>

        {/* Subtitle */}
        <p
          className="anim-fade-up"
          style={{
            fontSize: '17px', color: '#94a3b8',
            maxWidth: '500px', margin: '0 auto 44px',
            lineHeight: 1.75,
            animationDelay: '160ms',
          }}
        >
          Compare top prop trading firms with verified data, real trader reviews and exclusive discounts.
        </p>

        {/* CTAs */}
        <div
          className="anim-fade-up"
          style={{
            display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap',
            animationDelay: '240ms',
          }}
        >
          <Link
            href="/firms"
            style={{
              padding: '14px 32px',
              background: '#00ff88',
              color: '#060b14',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '15px',
              textDecoration: 'none',
              transition: 'transform 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.02)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Explore Firms →
          </Link>
          <Link
            href="/compare"
            style={{
              padding: '14px 32px',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#94a3b8',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '15px',
              textDecoration: 'none',
              transition: 'all 0.15s',
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
            Compare Side by Side
          </Link>
        </div>
      </div>
    </section>
  )
}
