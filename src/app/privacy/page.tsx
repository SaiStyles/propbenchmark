import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — PropBenchmark',
  description: 'PropBenchmark privacy policy. Learn how we collect and use your data.',
}

const sections = [
  {
    heading: '1. Who We Are',
    body: 'PropBenchmark (propbenchmark.com) is an independent prop firm benchmarking platform operated by an individual based in India. We are not a financial advisor, broker, or regulated entity.',
  },
  {
    heading: '2. What Data We Collect',
    body: 'The only personal data we collect is your email address, and only if you voluntarily subscribe to our newsletter.',
  },
  {
    heading: '3. How We Use Your Data',
    body: 'Your email address is used solely to send you PropBenchmark updates and industry news. We do not sell, share, or rent your data to any third party.',
  },
  {
    heading: '4. Affiliate Links',
    body: 'PropBenchmark contains affiliate links. If you click a link or use a discount code and purchase a prop firm account, we may earn a commission. This does not affect our rankings, data, or editorial content.',
  },
  {
    heading: '5. Cookies',
    body: 'We may use basic cookies for site functionality. We do not use advertising or tracking cookies.',
  },
  {
    heading: '6. Data Storage',
    body: 'Newsletter subscriber data is stored securely via Supabase. You can request deletion of your data at any time by emailing propbenchmark@gmail.com.',
  },
  {
    heading: '7. Your Rights',
    body: 'Under GDPR, EU residents have the right to access, correct, or delete their personal data. Contact us at propbenchmark@gmail.com for any requests.',
  },
  {
    heading: '8. Changes',
    body: 'We may update this policy from time to time. Continued use of the site constitutes acceptance of the updated policy.',
  },
  {
    heading: '9. Contact',
    body: 'propbenchmark@gmail.com',
  },
]

export default function PrivacyPage() {
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
          Privacy Policy
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
