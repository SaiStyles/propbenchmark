import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — PropBenchmark',
  description: 'PropBenchmark terms of service. Read our terms before using the platform.',
}

const sections = [
  {
    heading: '1. Acceptance',
    body: 'By using PropBenchmark (propbenchmark.com), you agree to these terms.',
  },
  {
    heading: '2. What We Are',
    body: 'PropBenchmark is an independent benchmarking and comparison platform for prop trading firms. We are not a financial advisor, broker, or regulated financial service. Nothing on this site constitutes financial advice.',
  },
  {
    heading: '3. Data Accuracy',
    body: 'We source all firm data directly from official firm websites and update it regularly. However, prop firm rules and pricing change frequently. Always verify current terms directly with the firm before purchasing.',
  },
  {
    heading: '4. Affiliate Relationships',
    body: 'PropBenchmark has affiliate relationships with some of the firms listed. We may earn a commission if you purchase via our links or discount codes. Affiliate relationships do not influence rankings, scores, or editorial content.',
  },
  {
    heading: '5. No Financial Advice',
    body: 'Nothing on PropBenchmark constitutes investment advice, trading advice, or a recommendation to purchase any financial product. Prop trading carries significant risk. You are solely responsible for your trading decisions.',
  },
  {
    heading: '6. Intellectual Property',
    body: 'All content on PropBenchmark including rankings, comparisons, and written content is the property of PropBenchmark. Do not reproduce without permission.',
  },
  {
    heading: '7. Limitation of Liability',
    body: 'PropBenchmark is not liable for any losses incurred as a result of decisions made based on information found on this site.',
  },
  {
    heading: '8. Changes',
    body: 'We reserve the right to update these terms at any time. Continued use of the site constitutes acceptance.',
  },
  {
    heading: '9. Contact',
    body: 'propbenchmark@gmail.com',
  },
]

export default function TermsPage() {
  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '56px 24px 96px' }}>

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
          Terms of Service
        </h1>
        <p style={{ color: '#475569', fontSize: '13px' }}>Last updated: March 2026</p>
      </div>

      {/* Sections */}
      {sections.map(({ heading, body }) => (
        <div key={heading} style={{ marginBottom: '36px' }}>
          <h2 style={{
            fontSize: '15px', fontWeight: 700,
            color: '#f1f5f9', marginBottom: '10px',
            fontFamily: 'var(--font-geist-sans), Inter, sans-serif',
          }}>
            {heading}
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.85 }}>
            {body}
          </p>
        </div>
      ))}
    </div>
  )
}
