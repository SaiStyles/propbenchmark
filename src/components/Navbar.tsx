'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const pathname = usePathname()

  function handleCopy() {
    navigator.clipboard.writeText('BENCH')
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      margin: '16px 0 12px',
      padding: '10px 16px',
      borderRadius: '12px',
      background: 'rgba(6,11,20,0.95)',
      backdropFilter: 'blur(18px) saturate(180%)',
      border: '1px solid rgba(148,163,184,0.25)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '16px',
    }}>
      {/* Logo (reverted to original P mark) */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}>
        <div style={{
          width: '36px',
          height: '36px',
          background: 'linear-gradient(135deg, #00ff88, #00cc6a)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 900,
          fontSize: '16px',
          color: '#060b14',
        }}>P</div>
        <span style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '-0.5px', color: '#f1f5f9' }}>
          PropBenchmark
        </span>
      </Link>

      {/* Desktop Links */}
      <div style={{ display: 'flex', gap: '4px', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        {[
          { label: 'Firms', href: '/firms' },
          { label: 'Compare', href: '/compare' },
          { label: 'Offers', href: '/offers' },
          { label: 'Rankings', href: '/rankings' },
          { label: 'Blog', href: '/blog' },
        ].map(link => {
          const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href + '/'))
          return (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: '6px 14px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: isActive ? 600 : 500,
                color: isActive ? '#00ff88' : '#94a3b8',
                textDecoration: 'none',
                transition: 'background 0.18s, color 0.18s, box-shadow 0.18s',
                background: isActive ? 'rgba(15,23,42,0.9)' : 'transparent',
                boxShadow: isActive ? '0 0 0 1px rgba(0,255,136,0.5)' : 'none',
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  e.currentTarget.style.background = 'rgba(15,23,42,0.7)'
                  e.currentTarget.style.color = '#e2e8f0'
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = '#94a3b8'
                }
              }}
            >
              {link.label}
            </Link>
          )
        })}
      </div>

      {/* Discount code widget — hidden, do not delete */}
      {/* <button
        onClick={handleCopy}
        style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          background: copied ? 'rgba(0,255,136,0.1)' : 'rgba(0,255,136,0.05)',
          border: `1px solid ${copied ? 'rgba(0,255,136,0.5)' : 'rgba(0,255,136,0.3)'}`,
          borderRadius: '8px', padding: '5px 11px',
          cursor: 'pointer', flexShrink: 0, minWidth: '148px', justifyContent: 'center',
          boxShadow: copied ? '0 0 10px rgba(0,255,136,0.2)' : '0 0 8px rgba(0,255,136,0.08)',
          transition: 'all 0.15s',
        }}
        onMouseEnter={e => {
          if (!copied) {
            e.currentTarget.style.background = 'rgba(0,255,136,0.09)'
            e.currentTarget.style.borderColor = 'rgba(0,255,136,0.45)'
            e.currentTarget.style.boxShadow = '0 0 12px rgba(0,255,136,0.16)'
          }
        }}
        onMouseLeave={e => {
          if (!copied) {
            e.currentTarget.style.background = 'rgba(0,255,136,0.05)'
            e.currentTarget.style.borderColor = 'rgba(0,255,136,0.3)'
            e.currentTarget.style.boxShadow = '0 0 8px rgba(0,255,136,0.08)'
          }
        }}
      >
        {copied ? (
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#00ff88', letterSpacing: '0.5px' }}>
            Copied!
          </span>
        ) : (
          <>
            <span style={{ fontSize: '11px', fontWeight: 500, color: '#475569', letterSpacing: '0.2px' }}>
              use code
            </span>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#00ff88', letterSpacing: '1.5px', fontFamily: 'monospace' }}>
              BENCH
            </span>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6, flexShrink: 0 }}>
              <rect x="9" y="9" width="13" height="13" rx="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          </>
        )}
      </button> */}

    </nav>
  )
}
