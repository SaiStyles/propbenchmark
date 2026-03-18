import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About — PropBenchmark',
  description: 'PropBenchmark is an independent prop firm benchmarking platform. Pure data, no paid placements, no bias.',
}

export default function AboutPage() {
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
          About PropBenchmark
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '16px', lineHeight: 1.8 }}>
          The benchmark for prop firm evaluation. Pure data, no bias.
        </p>
      </div>

      {/* Sections */}
      {[
        {
          heading: 'What we do',
          body: 'PropBenchmark is an independent benchmarking platform for proprietary trading firms. We collect, verify, and present structured data on challenge rules, fees, profit splits, drawdown limits, payout conditions, and platform support — so traders can make informed decisions without wading through marketing copy.',
        },
        {
          heading: 'How our data is sourced',
          body: 'All data is sourced directly from official firm websites, published terms and conditions, and public-facing documentation. We do not rely on firm-provided summaries or promotional materials. When a firm updates its rules, we update our data. Every data point is linked back to its source wherever possible.',
        },
        {
          heading: 'No paid placements in rankings',
          body: 'Our rankings are determined entirely by objective criteria — evaluation structure, drawdown rules, profit split, payout speed, and overall terms. Firms cannot pay to appear higher in rankings. Featured placements (marked clearly as such) exist as a commercial arrangement separate from rankings and have zero influence on ranking position or editorial scores.',
        },
        {
          heading: 'Editorial independence',
          body: 'PropBenchmark editorial content — rankings, comparisons, and analysis — is produced independently. Affiliate relationships exist with some firms, meaning we may earn a commission if a trader purchases an account via our link or discount code. This never influences ranking positions, data accuracy, or editorial conclusions. Affiliate relationships are always disclosed.',
        },
        {
          heading: 'Our goal',
          body: 'To be the most trusted, data-accurate resource in the prop trading space. Traders deserve clear, comparable, unbiased information — not another affiliate site dressed up as a review platform.',
        },
      ].map(({ heading, body }) => (
        <div key={heading} style={{ marginBottom: '40px' }}>
          <h2 style={{
            fontSize: '16px', fontWeight: 700,
            color: '#f1f5f9', marginBottom: '12px',
            fontFamily: 'var(--font-geist-sans), Inter, sans-serif',
          }}>
            {heading}
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.85 }}>
            {body}
          </p>
        </div>
      ))}

      {/* Follow on X */}
      <div style={{
        marginTop: '56px',
        padding: '28px 32px',
        background: '#0d1117',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '16px',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: '16px',
      }}>
        <div>
          <div style={{ fontWeight: 700, color: '#f1f5f9', fontSize: '15px', marginBottom: '4px' }}>
            Follow us on X
          </div>
          <div style={{ color: '#475569', fontSize: '13px' }}>
            Firm news, offer alerts, and prop firm analysis — no noise.
          </div>
        </div>
        <a
          href="https://x.com/PropBenchmark"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '10px 22px',
            background: '#f1f5f9', color: '#060b14',
            borderRadius: '999px', fontWeight: 700,
            fontSize: '13px', textDecoration: 'none',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          @PropBenchmark
        </a>
      </div>

      {/* CTA */}
      <div style={{
        marginTop: '16px',
        padding: '28px 32px',
        background: '#0d1117',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '16px',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: '16px',
      }}>
        <div>
          <div style={{ fontWeight: 700, color: '#f1f5f9', fontSize: '15px', marginBottom: '4px' }}>
            Questions or corrections?
          </div>
          <div style={{ color: '#475569', fontSize: '13px' }}>
            Found a data error or want to get in touch?
          </div>
        </div>
        <Link href="/contact" style={{
          padding: '10px 22px',
          background: '#00ff88', color: '#060b14',
          borderRadius: '999px', fontWeight: 700,
          fontSize: '13px', textDecoration: 'none',
        }}>
          Contact Us →
        </Link>
      </div>
    </div>
  )
}
