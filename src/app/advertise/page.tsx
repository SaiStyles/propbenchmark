import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Advertise — PropBenchmark',
  description: 'Get your prop firm featured on PropBenchmark. Featured placements are clearly labelled and never influence rankings.',
}

export default function AdvertisePage() {
  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '56px 0 96px' }}>

      {/* Header */}
      <div style={{ marginBottom: '48px' }}>
        <div style={{
          width: '40px', height: '3px',
          background: '#00ff88', marginBottom: '24px',
          borderRadius: '2px',
        }} />
        <h1 style={{
          fontSize: 'clamp(28px, 4vw, 42px)',
          fontWeight: 800, color: '#f1f5f9',
          marginBottom: '16px', letterSpacing: '-0.5px', lineHeight: 1.1,
          fontFamily: 'var(--font-geist-sans), Inter, sans-serif',
        }}>
          Advertise on PropBenchmark
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '16px', lineHeight: 1.8 }}>
          Reach traders who are actively evaluating prop firms and ready to fund an account.
        </p>
      </div>

      {/* Important notice */}
      <div style={{
        background: 'rgba(0,255,136,0.04)',
        border: '1px solid rgba(0,255,136,0.15)',
        borderRadius: '12px',
        padding: '20px 24px',
        marginBottom: '48px',
      }}>
        <div style={{ fontWeight: 700, color: '#00ff88', fontSize: '13px', marginBottom: '6px' }}>
          Editorial independence guaranteed
        </div>
        <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: 1.7, margin: 0 }}>
          Paid placements are always clearly labelled as "Featured". They have zero influence on ranking positions, editor scores, or any editorial content. Our rankings are determined solely by objective data.
        </p>
      </div>

      {/* Options */}
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '16px', fontWeight: 700, color: '#f1f5f9',
          marginBottom: '20px',
          fontFamily: 'var(--font-geist-sans), Inter, sans-serif',
        }}>
          Placement options
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            {
              label: 'Featured firm listing',
              detail: 'Your firm card appears at the top of the firms directory with a Featured badge. Clearly labelled. Does not affect ranking position.',
            },
            {
              label: 'Featured offer',
              detail: 'Your discount code or exclusive offer is highlighted at the top of the Offers page with premium placement.',
            },
            {
              label: 'Affiliate partnership',
              detail: 'We include your affiliate link across your firm profile, comparison pages, and relevant editorial content. Commission-based.',
            },
          ].map(({ label, detail }) => (
            <div key={label} style={{
              background: '#0d1117',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '12px',
              padding: '22px 24px',
            }}>
              <div style={{ fontWeight: 700, color: '#f1f5f9', fontSize: '14px', marginBottom: '8px' }}>
                {label}
              </div>
              <p style={{ color: '#475569', fontSize: '13px', lineHeight: 1.7, margin: 0 }}>
                {detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Requirements */}
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '16px', fontWeight: 700, color: '#f1f5f9',
          marginBottom: '16px',
          fontFamily: 'var(--font-geist-sans), Inter, sans-serif',
        }}>
          Listing requirements
        </h2>
        <div style={{
          background: '#0d1117',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '12px',
          padding: '24px',
        }}>
          {[
            'Firm must be actively operating and accepting new traders.',
            'All published rules, fees, and terms must be accurate and up to date.',
            'Firms must cooperate with data verification requests.',
            'PropBenchmark reserves the right to decline or remove any listing.',
          ].map(item => (
            <div key={item} style={{
              display: 'flex', gap: '10px',
              marginBottom: '12px', fontSize: '13px',
              color: '#94a3b8', lineHeight: 1.6,
            }}>
              <span style={{ color: '#00ff88', flexShrink: 0, marginTop: '1px' }}>✓</span>
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{
        background: '#0d1117',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '16px',
        padding: '32px',
        textAlign: 'center',
      }}>
        <div style={{
          fontWeight: 800, color: '#f1f5f9',
          fontSize: '18px', marginBottom: '8px',
          fontFamily: 'var(--font-geist-sans), Inter, sans-serif',
        }}>
          Get listed
        </div>
        <p style={{ color: '#475569', fontSize: '14px', marginBottom: '24px', lineHeight: 1.7 }}>
          Email us with your firm name and the placement you&apos;re interested in. We&apos;ll get back to you within 48 hours.
        </p>
        <a
          href="mailto:propbenchmark@gmail.com?subject=Advertising%20Enquiry"
          style={{
            display: 'inline-block',
            padding: '12px 28px',
            background: '#00ff88', color: '#060b14',
            borderRadius: '999px', fontWeight: 700,
            fontSize: '14px', textDecoration: 'none',
            boxShadow: '0 10px 35px rgba(0,255,136,0.22)',
          }}
        >
          propbenchmark@gmail.com →
        </a>
        <div style={{ marginTop: '16px' }}>
          <Link href="/contact" style={{ color: '#475569', fontSize: '12px', textDecoration: 'none' }}
            >
            Or visit our contact page
          </Link>
        </div>
      </div>
    </div>
  )
}
