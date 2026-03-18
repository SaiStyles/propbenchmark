'use client'
import Link from 'next/link'
import { useState } from 'react'
import { createClient } from '@/lib/supabase'

function NewsletterStrip() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [btnHovered, setBtnHovered] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.')
      return
    }

    setLoading(true)
    try {
      const supabase = createClient()
      const { error: dbError } = await supabase
        .from('subscribers')
        .insert({ email: email.trim() })

      if (dbError) {
        if (dbError.code === '23505') {
          setError("You're already subscribed.")
        } else {
          setError('Something went wrong. Try again.')
        }
      } else {
        setSubmitted(true)
        setEmail('')
      }
    } catch {
      setError('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      background: '#0d1829',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      padding: '72px 24px',
    }}>
      <div style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ width: '40px', height: '2px', background: '#00ff88', margin: '0 auto 20px' }} />

        <h2 style={{
          fontSize: 'clamp(22px, 3vw, 32px)',
          fontWeight: 800,
          color: '#f1f5f9',
          marginBottom: '12px',
          fontFamily: 'var(--font-geist-sans), Inter, sans-serif',
          letterSpacing: '-0.3px',
          lineHeight: 1.15,
        }}>
          Stay ahead of the prop firm space.
        </h2>

        <p style={{ color: '#94a3b8', fontSize: '15px', marginBottom: '32px', lineHeight: 1.7 }}>
          Weekly digest: firm changes, new offers, pass rate data, and analysis.
        </p>

        {submitted ? (
          <div style={{
            color: '#00ff88',
            fontSize: '14px',
            fontWeight: 600,
            padding: '16px 20px',
            background: 'rgba(0,255,136,0.06)',
            border: '1px solid rgba(0,255,136,0.2)',
            borderRadius: '10px',
          }}>
            You&apos;re in! We&apos;ll be in touch.
          </div>
        ) : (
          <>
            <form
              onSubmit={handleSubmit}
              style={{ display: 'flex', gap: '10px', maxWidth: '440px', margin: '0 auto' }}
            >
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => { setEmail(e.target.value); setError('') }}
                disabled={loading}
                style={{
                  flex: 1,
                  background: '#0d1117',
                  border: `1px solid ${error ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: '10px',
                  padding: '12px 16px',
                  color: '#f1f5f9',
                  fontSize: '14px',
                  outline: 'none',
                  minWidth: 0,
                  opacity: loading ? 0.6 : 1,
                }}
              />
              <button
                type="submit"
                disabled={loading}
                onMouseEnter={() => setBtnHovered(true)}
                onMouseLeave={() => setBtnHovered(false)}
                style={{
                  background: loading ? '#00cc6a' : btnHovered ? '#00cc6a' : '#00ff88',
                  color: '#060b14',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '12px 22px',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'background 0.15s',
                  flexShrink: 0,
                  opacity: loading ? 0.8 : 1,
                }}
              >
                {loading ? 'Subscribing…' : 'Subscribe'}
              </button>
            </form>

            {error && (
              <p style={{ fontSize: '13px', color: '#ef4444', marginTop: '10px' }}>
                {error}
              </p>
            )}
          </>
        )}

        <p style={{ fontSize: '12px', color: '#475569', marginTop: '16px' }}>
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </div>
  )
}

export default function Footer() {
  return (
    <footer style={{ marginTop: 'auto' }}>
      <NewsletterStrip />
      <div style={{
        background: '#060b14',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '56px 24px 36px',
      }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Top row */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '48px', marginBottom: '48px',
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{
                width: '32px', height: '32px',
                background: 'linear-gradient(135deg, #00ff88, #00cc6a)',
                borderRadius: '8px', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontWeight: 900, fontSize: '14px', color: '#060b14',
              }}>P</div>
              <span style={{ fontSize: '16px', fontWeight: 700, color: '#f1f5f9' }}>PropBenchmark</span>
            </div>
            <p style={{ color: '#475569', fontSize: '13px', maxWidth: '240px', lineHeight: 1.7 }}>
              The benchmark for prop firm evaluation. Pure data, no bias.
            </p>
          </div>

          {/* Links */}
          {[
            {
              title: 'Explore',
              links: [
                { label: 'All Firms', href: '/firms' },
                { label: 'Compare', href: '/compare' },
                { label: 'Rankings', href: '/rankings' },
                { label: 'Offers', href: '/offers' },
              ],
            },
            {
              title: 'Resources',
              links: [
                { label: 'Blog', href: '/blog' },
              ],
            },
            {
              title: 'Company',
              links: [
                { label: 'About', href: '/about' },
                { label: 'Contact', href: '/contact' },
                { label: 'Advertise', href: '/advertise' },
              ],
            },
          ].map(col => (
            <div key={col.title}>
              <div style={{
                fontWeight: 600, color: '#475569',
                marginBottom: '16px', fontSize: '11px',
                textTransform: 'uppercase', letterSpacing: '1px',
              }}>
                {col.title}
              </div>
              {col.links.map(link => (
                <Link key={link.href} href={link.href} style={{
                  display: 'block', color: '#475569',
                  fontSize: '13px', textDecoration: 'none',
                  marginBottom: '10px', transition: 'color 0.15s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#94a3b8')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#475569')}
                >{link.label}</Link>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          paddingTop: '24px',
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: '12px',
        }}>
          <p style={{ color: '#475569', fontSize: '12px' }}>
            © 2026 PropBenchmark. Not financial advice.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {[
              { label: 'Privacy Policy', href: '/privacy' },
              { label: 'Terms', href: '/terms' },
            ].map(item => (
              <Link key={item.label} href={item.href} style={{
                color: '#475569', fontSize: '12px', textDecoration: 'none',
                transition: 'color 0.15s',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = '#94a3b8')}
                onMouseLeave={e => (e.currentTarget.style.color = '#475569')}
              >{item.label}</Link>
            ))}
            <a
              href="https://x.com/PropBenchmark"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="PropBenchmark on X"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#475569', transition: 'color 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#94a3b8')}
              onMouseLeave={e => (e.currentTarget.style.color = '#475569')}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      </div>
    </footer>
  )
}
