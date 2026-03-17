import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact — PropBenchmark',
  description: 'Get in touch with PropBenchmark.',
}

export default function ContactPage() {
  return (
    <div style={{ maxWidth: '560px', margin: '0 auto', padding: '56px 0 96px' }}>

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
          Contact
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: 1.8 }}>
          Data corrections, partnership enquiries, or anything else — reach us directly.
        </p>
      </div>

      {/* Email card */}
      <div style={{
        background: '#0d1117',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '16px',
        padding: '32px',
        marginBottom: '24px',
      }}>
        <div style={{
          fontSize: '11px', fontWeight: 700, color: '#475569',
          textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px',
        }}>
          Email
        </div>
        <a
          href="mailto:propbenchmark@gmail.com"
          style={{
            fontSize: '18px', fontWeight: 700,
            color: '#00ff88', textDecoration: 'none',
            letterSpacing: '-0.2px',
          }}
        >
          propbenchmark@gmail.com
        </a>
        <p style={{ color: '#475569', fontSize: '13px', marginTop: '12px', lineHeight: 1.7 }}>
          We aim to respond within 48 hours. For data corrections, please include the firm name and the specific field in question.
        </p>
      </div>

      {/* Topics */}
      <div style={{
        background: '#0d1117',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '16px',
        padding: '32px',
      }}>
        <div style={{
          fontSize: '11px', fontWeight: 700, color: '#475569',
          textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px',
        }}>
          What to include
        </div>
        {[
          { label: 'Data correction', detail: 'Firm name, field, current value, correct value, and source URL.' },
          { label: 'Firm listing enquiry', detail: 'See our Advertise page for featured placement information.' },
          { label: 'Press or partnership', detail: 'Brief description of the opportunity and your contact details.' },
          { label: 'General', detail: 'Anything else — we read every email.' },
        ].map(({ label, detail }) => (
          <div key={label} style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ fontWeight: 600, color: '#f1f5f9', fontSize: '13px', marginBottom: '4px' }}>{label}</div>
            <div style={{ color: '#475569', fontSize: '13px', lineHeight: 1.6 }}>{detail}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
