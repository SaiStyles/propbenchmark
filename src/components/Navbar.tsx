'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

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

    </nav>
  )
}
