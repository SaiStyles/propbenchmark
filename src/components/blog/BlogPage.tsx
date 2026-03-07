'use client'

import { useState } from 'react'
import Link from 'next/link'

// ─── Types ────────────────────────────────────────────────────────────────────

type BlogPost = {
  slug: string
  title: string
  category: string
  excerpt: string
  author: string
  date: string
  readTime: string
  featured: boolean
  statHighlight: string | null
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'ftmo-vs-myfundedfx-2025',
    title: 'FTMO vs MyFundedFX: Which Firm Actually Pays Out?',
    category: 'Comparisons',
    excerpt:
      'We analyzed 6 months of payout data, trader testimonials, and rule changes to settle the debate.',
    author: 'Benchmark Team',
    date: 'Mar 4, 2026',
    readTime: '8 min',
    featured: true,
    statHighlight: null,
  },
  {
    slug: 'how-to-pass-prop-challenge-drawdown',
    title: 'The Drawdown Trap: Why 68% of Traders Fail Their First Challenge',
    category: 'Challenge Guides',
    excerpt:
      'Understanding trailing vs end-of-day drawdown is the single biggest edge you can have before paying for an evaluation.',
    author: 'Benchmark Team',
    date: 'Feb 28, 2026',
    readTime: '6 min',
    featured: false,
    statHighlight: null,
  },
  {
    slug: 'apex-trader-payout-stats-2026',
    title: 'Apex Trader Funding: $56M Paid in 90 Days — What the Data Actually Shows',
    category: 'Payouts & Data',
    excerpt:
      "Breaking down Apex's payout claims with verified data, trader reports, and what the numbers mean for new applicants.",
    author: 'Benchmark Team',
    date: 'Feb 22, 2026',
    readTime: '5 min',
    featured: false,
    statHighlight: '$56M in 90-day payouts',
  },
  {
    slug: 'ftmo-oanda-acquisition-impact',
    title: 'FTMO Acquired OANDA: What It Means for Funded Traders',
    category: 'Industry News',
    excerpt:
      'The biggest prop firm acquisition in history just happened. We break down the implications for traders, liquidity, and the industry.',
    author: 'Benchmark Team',
    date: 'Feb 18, 2026',
    readTime: '7 min',
    featured: false,
    statHighlight: null,
  },
  {
    slug: 'best-prop-firms-scalpers-2026',
    title: 'Best Prop Firms for Scalpers in 2026 (Tested & Ranked)',
    category: 'Comparisons',
    excerpt:
      'Not every firm tolerates fast execution. We ranked 9 firms by scalping rules, latency tolerance, and real trader feedback.',
    author: 'Benchmark Team',
    date: 'Feb 14, 2026',
    readTime: '10 min',
    featured: false,
    statHighlight: null,
  },
  {
    slug: 'trading-journal-habit-funded-trader',
    title: 'The Journal Habit That Separates Funded Traders from the Rest',
    category: 'Trading Psychology',
    excerpt:
      "Data from 500+ funded trader interviews points to one consistent habit. It's not the strategy — it's the journal.",
    author: 'Benchmark Team',
    date: 'Feb 10, 2026',
    readTime: '5 min',
    featured: false,
    statHighlight: null,
  },
  {
    slug: 'prop-firm-closures-2024-what-happened',
    title: "80+ Prop Firms Closed in 2024: What Traders Need to Learn",
    category: 'Industry News',
    excerpt:
      "The mass closure of prop firms in 2024 wasn't random. We examined the patterns and what red flags to watch for.",
    author: 'Benchmark Team',
    date: 'Feb 5, 2026',
    readTime: '9 min',
    featured: false,
    statHighlight: '80+ firms closed',
  },
  {
    slug: 'topstep-review-2026',
    title: 'Topstep Review 2026: Pass Rates, Payouts, and the Fine Print',
    category: 'Firm Reviews',
    excerpt:
      'Topstep remains one of the most recognized futures prop firms. But is 12.4% pass rate a feature or a warning?',
    author: 'Benchmark Team',
    date: 'Jan 30, 2026',
    readTime: '11 min',
    featured: false,
    statHighlight: null,
  },
  {
    slug: 'instant-funding-vs-challenge-model',
    title: 'Instant Funding vs Challenge Model: Which is Actually Better?',
    category: 'Challenge Guides',
    excerpt:
      'Instant funding sounds appealing. But the profit splits, hidden rules, and withdrawal gates tell a different story.',
    author: 'Benchmark Team',
    date: 'Jan 25, 2026',
    readTime: '7 min',
    featured: false,
    statHighlight: null,
  },
  {
    slug: 'prop-firm-pass-rates-2026',
    title: 'Prop Firm Pass Rate Benchmarks: The Industry Data You Need',
    category: 'Payouts & Data',
    excerpt:
      'Industry average is 5-10%. Apex claims 15-20%. We compiled verified pass rate data across 12 firms for comparison.',
    author: 'Benchmark Team',
    date: 'Jan 20, 2026',
    readTime: '6 min',
    featured: false,
    statHighlight: '5–20% industry pass rates',
  },
  {
    slug: 'risk-management-rules-prop-trading',
    title: '0.5% Per Trade: The Risk Rule That Keeps Traders Funded',
    category: 'Trading Psychology',
    excerpt:
      "Funded traders who last consistently risk less per trade than those who wash out. The math is simple — the discipline isn't.",
    author: 'Benchmark Team',
    date: 'Jan 15, 2026',
    readTime: '4 min',
    featured: false,
    statHighlight: null,
  },
  {
    slug: 'fundednext-review-2026',
    title: 'FundedNext Review 2026: The Firm That Went Broker',
    category: 'Firm Reviews',
    excerpt:
      'FundedNext now operates a brokerage under Comoros registration. We dig into what changed and whether it\'s still worth it.',
    author: 'Benchmark Team',
    date: 'Jan 10, 2026',
    readTime: '8 min',
    featured: false,
    statHighlight: null,
  },
]

const CATEGORIES = [
  'All',
  'Firm Reviews',
  'Comparisons',
  'Challenge Guides',
  'Industry News',
  'Trading Psychology',
  'Payouts & Data',
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function CategoryChip({ category }: { category: string }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '3px 10px',
        borderRadius: '20px',
        background: '#0e2030',
        border: '1px solid rgba(34,211,238,0.2)',
        color: '#22d3ee',
        fontSize: '11px',
        fontWeight: 600,
        letterSpacing: '0.5px',
        textTransform: 'uppercase',
        flexShrink: 0,
      }}
    >
      {category}
    </span>
  )
}

function PostMeta({
  author,
  date,
  readTime,
}: {
  author: string
  date: string
  readTime: string
}) {
  const dot = (
    <span
      style={{
        width: '3px',
        height: '3px',
        borderRadius: '50%',
        background: '#475569',
        display: 'inline-block',
        flexShrink: 0,
      }}
    />
  )
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '12px',
        color: '#475569',
        flexWrap: 'wrap',
      }}
    >
      <span>{author}</span>
      {dot}
      <span>{date}</span>
      {dot}
      <span>{readTime} read</span>
    </div>
  )
}

function FeaturedCard({ post }: { post: BlogPost }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="blog-featured-grid"
      style={{
        background: '#0d1117',
        border: `1px solid ${hovered ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.07)'}`,
        transition: 'border-color 0.15s',
        cursor: 'pointer',
      }}
    >
      {/* Text content */}
      <div
        style={{
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
        }}
      >
        <CategoryChip category={post.category} />

        <h2
          style={{
            fontSize: 'clamp(20px, 2.5vw, 30px)',
            fontWeight: 800,
            color: '#f1f5f9',
            lineHeight: 1.2,
            margin: 0,
            fontFamily: 'var(--font-geist-sans), Inter, sans-serif',
            letterSpacing: '-0.3px',
          }}
        >
          {post.title}
        </h2>

        <p
          style={{
            fontSize: '15px',
            color: '#94a3b8',
            lineHeight: 1.7,
            margin: 0,
            flex: 1,
          }}
        >
          {post.excerpt}
        </p>

        <PostMeta author={post.author} date={post.date} readTime={post.readTime} />

        <div>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 20px',
              background: '#00ff88',
              color: '#060b14',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.2px',
            }}
          >
            Read Article →
          </span>
        </div>
      </div>

      {/* Gradient placeholder image */}
      <div
        className="blog-featured-image"
        style={{
          backgroundImage: [
            'radial-gradient(rgba(34,211,238,0.04) 1px, transparent 1px)',
            'linear-gradient(135deg, #060f22 0%, #0a1e3d 35%, #071428 65%, #060d1e 100%)',
          ].join(', '),
          backgroundSize: '24px 24px, 100%',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Decorative overlay elements */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            padding: '32px',
          }}
        >
          <div
            style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '3px',
              color: 'rgba(34,211,238,0.3)',
              textTransform: 'uppercase',
            }}
          >
            Benchmark Analysis
          </div>
          <div
            style={{
              width: '48px',
              height: '1px',
              background: 'rgba(34,211,238,0.2)',
            }}
          />
          <div
            style={{
              fontSize: '42px',
              fontWeight: 900,
              color: 'rgba(255,255,255,0.04)',
              letterSpacing: '-2px',
              fontFamily: 'var(--font-geist-sans), Inter, sans-serif',
              userSelect: 'none',
              textAlign: 'center',
              lineHeight: 1,
            }}
          >
            vs
          </div>
          <div
            style={{
              display: 'flex',
              gap: '8px',
              marginTop: '8px',
            }}
          >
            {['Payouts', 'Rules', 'Trust'].map(label => (
              <span
                key={label}
                style={{
                  padding: '4px 10px',
                  borderRadius: '20px',
                  border: '1px solid rgba(255,255,255,0.06)',
                  color: 'rgba(255,255,255,0.2)',
                  fontSize: '10px',
                  letterSpacing: '0.5px',
                  fontWeight: 600,
                }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Corner glow */}
        <div
          style={{
            position: 'absolute',
            top: '-60px',
            right: '-60px',
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-40px',
            left: '-40px',
            width: '160px',
            height: '160px',
            background: 'radial-gradient(circle, rgba(0,255,136,0.04) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  )
}

function PostCard({ post }: { post: BlogPost }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered ? '#111827' : '#0d1117',
          border: `1px solid ${hovered ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.07)'}`,
          boxShadow: hovered ? 'inset 3px 0 0 #00ff88' : 'none',
          borderRadius: '12px',
          padding: '24px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          transition: 'background 0.15s, border-color 0.15s, box-shadow 0.15s, transform 0.15s',
          transform: hovered ? 'translateY(-2px)' : 'none',
          cursor: 'pointer',
          boxSizing: 'border-box',
        }}
      >
        {/* Stat highlight (Payouts & Data variant) */}
        {post.statHighlight && (
          <div
            style={{
              fontSize: '13px',
              fontWeight: 700,
              color: '#f59e0b',
              padding: '8px 12px',
              background: 'rgba(245,158,11,0.06)',
              border: '1px solid rgba(245,158,11,0.15)',
              borderRadius: '8px',
              lineHeight: 1.4,
            }}
          >
            {post.statHighlight}
          </div>
        )}

        <CategoryChip category={post.category} />

        <h3
          style={{
            fontSize: '15px',
            fontWeight: 700,
            color: '#f1f5f9',
            lineHeight: 1.35,
            margin: 0,
            fontFamily: 'var(--font-geist-sans), Inter, sans-serif',
            flex: 1,
          }}
        >
          {post.title}
        </h3>

        <p
          style={{
            fontSize: '13px',
            color: '#94a3b8',
            lineHeight: 1.6,
            margin: 0,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {post.excerpt}
        </p>

        <PostMeta author={post.author} date={post.date} readTime={post.readTime} />
      </div>
    </Link>
  )
}

function NewsletterStrip() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [btnHovered, setBtnHovered] = useState(false)

  return (
    <div
      style={{
        background: '#0d1829',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        padding: '72px 24px',
      }}
    >
      <div
        style={{
          maxWidth: '560px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        {/* Lime accent line */}
        <div
          style={{
            width: '40px',
            height: '2px',
            background: '#00ff88',
            margin: '0 auto 20px',
          }}
        />

        <h2
          style={{
            fontSize: 'clamp(22px, 3vw, 32px)',
            fontWeight: 800,
            color: '#f1f5f9',
            marginBottom: '12px',
            fontFamily: 'var(--font-geist-sans), Inter, sans-serif',
            letterSpacing: '-0.3px',
            lineHeight: 1.15,
          }}
        >
          Stay ahead of the prop firm space.
        </h2>

        <p
          style={{
            color: '#94a3b8',
            fontSize: '15px',
            marginBottom: '32px',
            lineHeight: 1.7,
          }}
        >
          Weekly digest: firm changes, new offers, pass rate data, and analysis.
        </p>

        {submitted ? (
          <div
            style={{
              color: '#00ff88',
              fontSize: '14px',
              fontWeight: 600,
              padding: '16px 20px',
              background: 'rgba(0,255,136,0.06)',
              border: '1px solid rgba(0,255,136,0.2)',
              borderRadius: '10px',
            }}
          >
            You&apos;re on the list. First issue drops next Monday.
          </div>
        ) : (
          <form
            onSubmit={e => {
              e.preventDefault()
              setSubmitted(true)
            }}
            style={{
              display: 'flex',
              gap: '10px',
              maxWidth: '440px',
              margin: '0 auto',
            }}
          >
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{
                flex: 1,
                background: '#0d1117',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px',
                padding: '12px 16px',
                color: '#f1f5f9',
                fontSize: '14px',
                outline: 'none',
                minWidth: 0,
              }}
            />
            <button
              type="submit"
              onMouseEnter={() => setBtnHovered(true)}
              onMouseLeave={() => setBtnHovered(false)}
              style={{
                background: btnHovered ? '#00cc6a' : '#00ff88',
                color: '#060b14',
                border: 'none',
                borderRadius: '10px',
                padding: '12px 22px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'background 0.15s',
                flexShrink: 0,
              }}
            >
              Subscribe
            </button>
          </form>
        )}

        <p style={{ fontSize: '12px', color: '#475569', marginTop: '16px' }}>
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const q = searchQuery.trim().toLowerCase()
  const matchesSearch = (post: BlogPost) =>
    q === '' ||
    post.title.toLowerCase().includes(q) ||
    post.excerpt.toLowerCase().includes(q)

  const featuredPost = BLOG_POSTS.find(p => p.featured)!
  const showFeatured =
    (activeCategory === 'All' || activeCategory === featuredPost.category) &&
    matchesSearch(featuredPost)

  const gridPosts = BLOG_POSTS.filter(p => {
    if (p.featured) return false
    if (activeCategory !== 'All' && p.category !== activeCategory) return false
    return matchesSearch(p)
  })

  const isEmpty = !showFeatured && gridPosts.length === 0

  return (
    <div>
      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '56px 24px 44px' }}>
        <div style={{ width: '40px', height: '2px', background: '#00ff88', marginBottom: '20px' }} />
        <h1
          style={{
            fontSize: 'clamp(32px, 4.5vw, 54px)',
            fontWeight: 800,
            color: '#f1f5f9',
            letterSpacing: '-0.5px',
            lineHeight: 1.05,
            marginBottom: '14px',
            fontFamily: 'var(--font-geist-sans), Inter, sans-serif',
          }}
        >
          The Benchmark Blog
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '16px', maxWidth: '520px', lineHeight: 1.7, margin: 0 }}>
          Prop firm reviews, challenge guides, industry news, and trader resources — no fluff.
        </p>
      </div>

      {/* ── Sticky Category Filter Bar + Search ─────────────────────────── */}
      <div
        style={{
          position: 'sticky',
          top: '64px',
          zIndex: 50,
          background: 'rgba(6,11,20,0.96)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding: '0 24px',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }} className="blog-filter-bar">

          {/* Pills */}
          <div className="blog-filter-pills">
            {CATEGORIES.map(cat => {
              const isActive = cat === activeCategory
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#94a3b8' }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = '#475569' }}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '20px',
                    border: isActive ? '1px solid rgba(0,255,136,0.3)' : '1px solid rgba(255,255,255,0.08)',
                    background: isActive ? 'rgba(0,255,136,0.08)' : 'transparent',
                    color: isActive ? '#00ff88' : '#475569',
                    fontSize: '12px',
                    fontWeight: isActive ? 600 : 500,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    transition: 'color 0.15s, background 0.15s, border-color 0.15s',
                    letterSpacing: '0.2px',
                  }}
                >
                  {cat}
                </button>
              )
            })}
          </div>

          {/* Search */}
          <div className="blog-filter-search">
            <div style={{ position: 'relative' }}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#475569"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none',
                }}
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  background: '#0d1829',
                  border: '1px solid #1e293b',
                  borderRadius: '8px',
                  padding: '7px 36px 7px 34px',
                  color: '#f1f5f9',
                  fontSize: '16px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.15s',
                }}
                onFocus={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)' }}
                onBlur={e => { e.currentTarget.style.borderColor = '#1e293b' }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.12)'
                    e.currentTarget.style.color = '#f1f5f9'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                    e.currentTarget.style.color = '#94a3b8'
                  }}
                  style={{
                    position: 'absolute',
                    right: '8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255,255,255,0.06)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#94a3b8',
                    fontSize: '13px',
                    lineHeight: 1,
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'background 0.15s, color 0.15s',
                  }}
                >
                  ×
                </button>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────────────────────── */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px 96px' }}>

        {/* Featured Post */}
        {showFeatured && (
          <div className="anim-fade-up" style={{ marginBottom: '56px' }}>
            <div
              style={{
                fontSize: '11px',
                fontWeight: 600,
                color: '#475569',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}
            >
              Featured
            </div>
            <Link href={`/blog/${featuredPost.slug}`} style={{ textDecoration: 'none' }}>
              <FeaturedCard post={featuredPost} />
            </Link>
          </div>
        )}

        {/* Grid section label */}
        {gridPosts.length > 0 && (
          <div
            style={{
              fontSize: '11px',
              fontWeight: 600,
              color: '#475569',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}
          >
            {activeCategory === 'All' ? 'Latest Articles' : activeCategory}
          </div>
        )}

        {/* Post Grid */}
        {gridPosts.length > 0 && (
          <div className="blog-post-grid">
            {gridPosts.map(post => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {isEmpty && (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div
              style={{
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '2px',
                color: '#475569',
                textTransform: 'uppercase',
                marginBottom: '12px',
              }}
            >
              No articles found
            </div>
            <p style={{ fontSize: '14px', color: '#94a3b8' }}>
              {q
                ? `No results for "${searchQuery}". Try a different search term.`
                : `Check back soon — more ${activeCategory.toLowerCase()} content is on the way.`}
            </p>
          </div>
        )}
      </div>

      {/* ── Newsletter CTA ───────────────────────────────────────────────── */}
      <NewsletterStrip />
    </div>
  )
}
