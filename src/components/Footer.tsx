'use client'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      background: '#060b14',
      padding: '56px 24px 36px',
      marginTop: 'auto',
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
              Independent prop firm reviews. Verified data. Real trader experiences.
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
              title: 'Content',
              links: [
                { label: 'Blog', href: '/blog' },
                { label: 'Reviews', href: '/reviews' },
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
            © 2026 PropBenchmark. Independent reviews. Not financial advice.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            {['Privacy Policy', 'Terms'].map(item => (
              <Link key={item} href="#" style={{
                color: '#475569', fontSize: '12px', textDecoration: 'none',
                transition: 'color 0.15s',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = '#94a3b8')}
                onMouseLeave={e => (e.currentTarget.style.color = '#475569')}
              >{item}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
