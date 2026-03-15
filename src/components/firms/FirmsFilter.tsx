'use client'

type Filters = {
  search: string
  category: string
  steps: string
  instant: boolean
  weekend: boolean
  sortBy: string
}

type Props = {
  filters: Filters
  onChange: (filters: Filters) => void
}

const inputStyle = {
  background: '#020617',
  border: '1px solid rgba(148,163,184,0.5)',
  borderRadius: '999px',
  padding: '8px 16px',
  color: '#e2e8f0',
  fontSize: '13px',
  outline: 'none',
}

export default function FirmsFilter({ filters, onChange }: Props) {
  const update = (key: keyof Filters, value: string | boolean) => {
    onChange({ ...filters, [key]: value })
  }

  return (
    <div style={{
      background: 'radial-gradient(circle at top left, rgba(15,23,42,0.9), rgba(15,23,42,0.95))',
      border: '1px solid rgba(30,64,175,0.65)',
      borderRadius: '14px',
      padding: '14px 16px',
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap',
      alignItems: 'center',
      marginBottom: '28px',
    }}>
      {/* Search */}
      <input
        placeholder="Search firms..."
        value={filters.search}
        onChange={e => update('search', e.target.value)}
        style={{ ...inputStyle, flex: 1, minWidth: '160px' }}
      />

      {/* Category */}
      <select value={filters.category} onChange={e => update('category', e.target.value)} style={inputStyle}>
        <option value="all">All Categories</option>
        <option value="forex">Forex</option>
        <option value="futures">Futures</option>
        <option value="instant">Instant Funding</option>
      </select>

      {/* Steps */}
      <select value={filters.steps} onChange={e => update('steps', e.target.value)} style={inputStyle}>
        <option value="all">All Steps</option>
        <option value="0">Instant</option>
        <option value="1">1-Step</option>
        <option value="2">2-Step</option>
        <option value="3">3-Step</option>
      </select>

      {/* Sort */}
      <select value={filters.sortBy} onChange={e => update('sortBy', e.target.value)} style={inputStyle}>
        <option value="rating">Sort: Rating</option>
        <option value="discount">Sort: Discount</option>
        <option value="reviews">Sort: Reviews</option>
      </select>

      {/* Instant toggle */}
      <button
        onClick={() => update('instant', !filters.instant)}
        style={{
          padding: '8px 14px', borderRadius: '8px', cursor: 'pointer',
          fontSize: '13px', fontWeight: 600,
          border: filters.instant ? '1px solid rgba(0,255,136,0.3)' : '1px solid rgba(255,255,255,0.08)',
          background: filters.instant ? 'rgba(0,255,136,0.08)' : 'transparent',
          color: filters.instant ? '#00ff88' : '#475569',
          transition: 'all 0.15s',
        }}
        onMouseEnter={e => { if (!filters.instant) e.currentTarget.style.color = '#94a3b8' }}
        onMouseLeave={e => { if (!filters.instant) e.currentTarget.style.color = '#475569' }}
      >
        ⚡ Instant Only
      </button>

      {/* Weekend toggle */}
      <button
        onClick={() => update('weekend', !filters.weekend)}
        style={{
          padding: '8px 14px', borderRadius: '8px', cursor: 'pointer',
          fontSize: '13px', fontWeight: 600,
          border: filters.weekend ? '1px solid rgba(0,255,136,0.3)' : '1px solid rgba(255,255,255,0.08)',
          background: filters.weekend ? 'rgba(0,255,136,0.08)' : 'transparent',
          color: filters.weekend ? '#00ff88' : '#475569',
          transition: 'all 0.15s',
        }}
        onMouseEnter={e => { if (!filters.weekend) e.currentTarget.style.color = '#94a3b8' }}
        onMouseLeave={e => { if (!filters.weekend) e.currentTarget.style.color = '#475569' }}
      >
        🌙 Weekend Hold
      </button>
    </div>
  )
}
