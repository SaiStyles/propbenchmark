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

      <div
        style={{
          position: 'relative',
          maxWidth: '900px',
          margin: '0',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.6fr) minmax(0, 1.1fr)',
          gap: '40px',
          alignItems: 'center',
        }}
      >
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
            50+ VERIFIED FIRMS · LIVE DATA
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
              maxWidth: '520px',
              margin: '0 0 28px',
              lineHeight: 1.8,
              animationDelay: '160ms',
            }}
          >
            A data‑driven dashboard to evaluate funding programs, risk rules and real trader outcomes —
            so you don&apos;t blow an evaluation on fine print.
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
            <span
              style={{
                fontSize: '12px',
                color: '#64748b',
                marginLeft: '2px',
              }}
            >
              No fluff. Just risk rules, payouts and edge.
            </span>
          </div>
        </div>

        {/* Side metric card */}
        <div
          className="anim-fade-up"
          style={{
            animationDelay: '220ms',
            background: '#0d1117',
            borderRadius: '18px',
            border: '1px solid rgba(255,255,255,0.07)',
            padding: '18px 18px 16px',
            display: 'grid',
            gridTemplateColumns: '1.3fr 1.1fr',
            gap: '14px',
            boxShadow: '0 24px 80px rgba(0,0,0,0.85)',
          }}
        >
          <div style={{ borderRight: '1px solid rgba(15,23,42,0.9)', paddingRight: '14px' }}>
            <div style={{ fontSize: '11px', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
              Live funding landscape
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span style={{ fontSize: '26px', fontWeight: 800, letterSpacing: '-0.06em', color: '#f1f5f9' }}>54</span>
              <span style={{ fontSize: '12px', color: '#64748b' }}>active firms tracked</span>
            </div>
            <div style={{ marginTop: '10px', display: 'flex', gap: '10px', alignItems: 'center' }}>
              <span style={{
                fontSize: '11px',
                padding: '3px 8px',
                borderRadius: '999px',
                background: 'rgba(22,163,74,0.15)',
                border: '1px solid rgba(34,197,94,0.4)',
                color: '#bbf7d0',
              }}>
                92% payout success
              </span>
              <span style={{ fontSize: '11px', color: '#64748b' }}>last 90 days</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: '11px', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.09em' }}>Best profit split</span>
              <span style={{ fontSize: '13px', color: '#22d3ee' }}>Top 5 firms</span>
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <div style={{
                flex: 1,
                height: '40px',
                borderRadius: '999px',
                background: 'linear-gradient(90deg, rgba(34,197,94,0.2), rgba(22,101,52,0.05))',
                border: '1px solid rgba(34,197,94,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 10px',
              }}>
                <span style={{ fontSize: '11px', color: '#a7f3d0' }}>Max split</span>
                <span style={{ fontSize: '16px', fontWeight: 800, color: '#00ff88' }}>95%</span>
              </div>
              <div style={{
                flex: 1,
                height: '40px',
                borderRadius: '999px',
                background: 'rgba(15,23,42,0.85)',
                border: '1px solid rgba(148,163,184,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 10px',
              }}>
                <span style={{ fontSize: '11px', color: '#cbd5f5' }}>Avg drawdown</span>
                <span style={{ fontSize: '15px', fontWeight: 700, color: '#f59e0b' }}>12%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
