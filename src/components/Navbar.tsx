'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav style={{
      background: 'rgba(6,11,20,0.90)',
      backdropFilter: 'blur(12px) saturate(180%)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '0 24px',
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      {/* Logo */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
        <div style={{
          width: '36px', height: '36px',
          background: 'linear-gradient(135deg, #00ff88, #00cc6a)',
          borderRadius: '8px', display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontWeight: 900, fontSize: '16px', color: '#060b14',
        }}>P</div>
        <span style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '-0.5px', color: '#f1f5f9' }}>
          PropBenchmark
        </span>
      </Link>

      {/* Desktop Links */}
      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
        {[
          { label: 'Firms', href: '/firms' },
          { label: 'Compare', href: '/compare' },
          { label: 'Offers', href: '/offers' },
          { label: 'Rankings', href: '/rankings' },
          { label: 'Blog', href: '/blog' },
        ].map(link => (
          <Link key={link.href} href={link.href} style={{
            padding: '6px 14px', borderRadius: '6px',
            fontSize: '14px', fontWeight: 500, color: '#475569',
            textDecoration: 'none', transition: 'color 0.15s',
          }}
            onMouseEnter={e => (e.currentTarget.style.color = '#94a3b8')}
            onMouseLeave={e => (e.currentTarget.style.color = '#475569')}
          >{link.label}</Link>
        ))}
      </div>

      {/* CTA */}
      <Link href="/login" style={{
        padding: '8px 20px',
        background: '#00ff88',
        color: '#060b14',
        borderRadius: '8px',
        fontWeight: 700,
        fontSize: '14px',
        textDecoration: 'none',
      }}>Sign In</Link>
    </nav>
  )
}
