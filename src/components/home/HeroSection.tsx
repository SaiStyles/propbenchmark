'use client'

import Link from 'next/link'

export default function HeroSection() {
  return (
    <section style={{
      padding: '72px 0 70px',
      textAlign: 'left',
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

      <div style={{
        position: 'relative',
        maxWidth: '1200px',
        margin: '0',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
        gap: '64px',
        alignItems: 'center',
      }}>

        {/* Left column */}
        <div>
          {/* Badge */}
          <div
            className="anim-fade-up"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(15,23,42,0.9)',
              border: '1px solid rgba(148,163,184,0.5)',
              borderRadius: '999px',
              padding: '5px 16px',
              fontSize: '11px',
              color: '#00ff88',
              marginBottom: '20px',
              letterSpacing: '1.5px',
              fontWeight: 600,
              animationDelay: '0ms',
            }}
          >
            <span className="pulse-dot" />
            18 VERIFIED FIRMS
          </div>

          {/* Title */}
          <h1
            className="anim-fade-up"
            style={{
              fontSize: 'clamp(40px, 5.6vw, 64px)',
              fontWeight: 800,
              lineHeight: 1.05,
              marginBottom: '20px',
              letterSpacing: '-2px',
              color: '#f1f5f9',
              fontFamily: 'var(--font-geist-sans), Inter, sans-serif',
              animationDelay: '80ms',
            }}
          >
            Find your next
            <br />
            <span style={{ color: '#00ff88' }}>prop firm edge</span>
          </h1>

          {/* Subtitle */}
          <p
            className="anim-fade-up"
            style={{
              fontSize: '16px',
              color: '#94a3b8',
              margin: '0 0 28px',
              lineHeight: 1.8,
              animationDelay: '160ms',
            }}
          >
            Every rule. Every fee. Every payout condition — benchmarked, so you trade with clarity, not regret.
          </p>

          {/* CTAs */}
          <div
            className="anim-fade-up"
            style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              flexWrap: 'wrap',
              animationDelay: '240ms',
            }}
          >
            <Link
              href="/firms"
              style={{
                padding: '13px 30px',
                background: '#00ff88',
                color: '#060b14',
                borderRadius: '999px',
                fontWeight: 700,
                fontSize: '15px',
                textDecoration: 'none',
                transition: 'transform 0.15s, box-shadow 0.15s',
                boxShadow: '0 14px 45px rgba(0,255,136,0.25)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-1px)'
                e.currentTarget.style.boxShadow = '0 16px 55px rgba(0,255,136,0.32)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 14px 45px rgba(0,255,136,0.25)'
              }}
            >
              Explore firms
            </Link>
            <Link
              href="/compare"
              style={{
                padding: '12px 26px',
                background: 'rgba(15,23,42,0.9)',
                border: '1px solid rgba(148,163,184,0.5)',
                color: '#e2e8f0',
                borderRadius: '999px',
                fontWeight: 600,
                fontSize: '14px',
                textDecoration: 'none',
                transition: 'background 0.15s, border-color 0.15s, color 0.15s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(34,211,238,0.8)'
                e.currentTarget.style.color = '#22d3ee'
                e.currentTarget.style.background = 'rgba(15,23,42,1)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(148,163,184,0.5)'
                e.currentTarget.style.color = '#e2e8f0'
                e.currentTarget.style.background = 'rgba(15,23,42,0.9)'
              }}
            >
              Compare side by side
            </Link>
            <span style={{ fontSize: '12px', color: '#64748b', marginLeft: '2px' }}>
              No fluff. Just risk rules, payouts and edge.
            </span>
          </div>
        </div>

        {/* Right column — Godfather statement */}
        <div
          className="anim-fade-up"
          style={{
            animationDelay: '200ms',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <p style={{
            fontSize: 'clamp(28px, 3.2vw, 46px)',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-1.5px',
            color: '#f1f5f9',
            margin: 0,
            fontFamily: 'var(--font-geist-sans), Inter, sans-serif',
          }}>
            If it&apos;s not on PropBenchmark,{' '}
            <span style={{ color: '#00ff88' }}>it hasn&apos;t earned its place.</span>
          </p>
        </div>

      </div>
    </section>
  )
}
