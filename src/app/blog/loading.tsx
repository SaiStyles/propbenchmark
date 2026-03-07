export default function BlogLoading() {
  const shimmer: React.CSSProperties = {
    background: 'linear-gradient(90deg, #0d1117 25%, #111827 50%, #0d1117 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.4s ease infinite',
    borderRadius: '6px',
  }

  return (
    <div>
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      {/* Header skeleton */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '56px 24px 44px' }}>
        <div style={{ ...shimmer, width: '40px', height: '2px', marginBottom: '20px', borderRadius: '2px' }} />
        <div style={{ ...shimmer, width: '340px', height: '52px', marginBottom: '16px' }} />
        <div style={{ ...shimmer, width: '480px', height: '20px' }} />
      </div>

      {/* Filter bar skeleton */}
      <div style={{
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '14px 24px',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '8px', alignItems: 'center' }}>
          {[80, 100, 130, 110, 120, 140, 120].map((w, i) => (
            <div key={i} style={{ ...shimmer, width: `${w}px`, height: '30px', borderRadius: '20px', flexShrink: 0 }} />
          ))}
        </div>
      </div>

      {/* Content skeleton */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px 96px' }}>

        {/* Featured card skeleton */}
        <div style={{ marginBottom: '56px' }}>
          <div style={{ ...shimmer, width: '80px', height: '11px', marginBottom: '16px' }} />
          <div style={{
            ...shimmer,
            borderRadius: '16px',
            height: '300px',
          }} />
        </div>

        {/* Grid label */}
        <div style={{ ...shimmer, width: '120px', height: '11px', marginBottom: '20px' }} />

        {/* Card grid */}
        <div className="blog-post-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              style={{
                background: '#0d1117',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '12px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <div style={{ ...shimmer, width: '80px', height: '22px', borderRadius: '20px' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ ...shimmer, width: '100%', height: '16px' }} />
                <div style={{ ...shimmer, width: '80%', height: '16px' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ ...shimmer, width: '100%', height: '13px' }} />
                <div style={{ ...shimmer, width: '70%', height: '13px' }} />
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                <div style={{ ...shimmer, width: '90px', height: '12px' }} />
                <div style={{ ...shimmer, width: '70px', height: '12px' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
