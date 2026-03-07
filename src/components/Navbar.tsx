'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

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
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flex: 1 }}>
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
        ].map(link => {
          const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href + '/'))
          return (
            <Link key={link.href} href={link.href} style={{
              padding: '6px 14px', borderRadius: '6px',
              fontSize: '14px', fontWeight: isActive ? 600 : 500,
              color: isActive ? '#00ff88' : '#475569',
              textDecoration: 'none', transition: 'color 0.15s',
              borderBottom: isActive ? '2px solid #00ff88' : '2px solid transparent',
            }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#94a3b8' }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = '#475569' }}
            >{link.label}</Link>
          )
        })}
      </div>

      {/* Spacer — mirrors logo width to keep links centered */}
      <div style={{ flex: 1 }} />

    </nav>
  )
}
