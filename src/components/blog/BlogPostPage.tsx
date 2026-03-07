'use client'

import { useState } from 'react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Components } from 'react-markdown'
import type { BlogPostDetail, BlogPost } from '@/lib/queries'

// ─── Markdown component map ────────────────────────────────────────────────────

const mdComponents: Components = {
  h1: ({ children }) => (
    <h1
      style={{
        fontSize: 'clamp(22px, 3vw, 32px)',
        fontWeight: 800,
        color: '#f1f5f9',
        fontFamily: 'var(--font-geist-sans), Inter, sans-serif',
        letterSpacing: '-0.3px',
        lineHeight: 1.2,
        marginTop: '40px',
        marginBottom: '16px',
      }}
    >
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2
      style={{
        fontSize: 'clamp(18px, 2.4vw, 26px)',
        fontWeight: 700,
        color: '#f1f5f9',
        fontFamily: 'var(--font-geist-sans), Inter, sans-serif',
        letterSpacing: '-0.2px',
        lineHeight: 1.25,
        marginTop: '36px',
        marginBottom: '14px',
      }}
    >
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3
      style={{
        fontSize: 'clamp(15px, 1.8vw, 20px)',
        fontWeight: 700,
        color: '#f1f5f9',
        fontFamily: 'var(--font-geist-sans), Inter, sans-serif',
        lineHeight: 1.3,
        marginTop: '28px',
        marginBottom: '10px',
      }}
    >
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p
      style={{
        fontSize: '16px',
        color: '#94a3b8',
        lineHeight: 1.8,
        marginTop: '0',
        marginBottom: '20px',
      }}
    >
      {children}
    </p>
  ),
  strong: ({ children }) => (
    <strong style={{ color: '#f1f5f9', fontWeight: 600 }}>{children}</strong>
  ),
  em: ({ children }) => (
    <em style={{ color: '#94a3b8', fontStyle: 'italic' }}>{children}</em>
  ),
  ul: ({ children }) => (
    <ul
      style={{
        color: '#94a3b8',
        fontSize: '16px',
        lineHeight: 1.8,
        paddingLeft: '24px',
        marginBottom: '20px',
        listStyleType: 'disc',
      }}
    >
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol
      style={{
        color: '#94a3b8',
        fontSize: '16px',
        lineHeight: 1.8,
        paddingLeft: '24px',
        marginBottom: '20px',
        listStyleType: 'decimal',
      }}
    >
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li style={{ marginBottom: '6px' }}>{children}</li>
  ),
  blockquote: ({ children }) => (
    <blockquote
      style={{
        borderLeft: '3px solid #00ff88',
        paddingLeft: '20px',
        paddingTop: '4px',
        paddingBottom: '4px',
        margin: '28px 0',
        fontStyle: 'italic',
        color: '#94a3b8',
        background: 'rgba(0,255,136,0.03)',
        borderRadius: '0 8px 8px 0',
      }}
    >
      {children}
    </blockquote>
  ),
  code: ({ children, className }) => {
    const isBlock = className?.includes('language-')
    if (isBlock) {
      return (
        <code
          style={{
            display: 'block',
            background: '#0d1829',
            color: '#22d3ee',
            fontSize: '13px',
            lineHeight: 1.7,
            padding: '20px 24px',
            borderRadius: '10px',
            overflowX: 'auto',
            fontFamily: 'var(--font-geist-mono), "Fira Code", monospace',
            border: '1px solid rgba(34,211,238,0.12)',
          }}
        >
          {children}
        </code>
      )
    }
    return (
      <code
        style={{
          background: '#0d1829',
          color: '#22d3ee',
          fontSize: '13px',
          padding: '2px 7px',
          borderRadius: '5px',
          fontFamily: 'var(--font-geist-mono), "Fira Code", monospace',
          border: '1px solid rgba(34,211,238,0.1)',
        }}
      >
        {children}
      </code>
    )
  },
  pre: ({ children }) => (
    <pre
      style={{
        marginBottom: '24px',
        borderRadius: '10px',
        overflow: 'hidden',
      }}
    >
      {children}
    </pre>
  ),
  a: ({ children, href }) => (
    <a
      href={href}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      style={{
        color: '#00ff88',
        textDecoration: 'none',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.textDecoration = 'underline' }}
      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.textDecoration = 'none' }}
    >
      {children}
    </a>
  ),
  hr: () => (
    <hr
      style={{
        border: 'none',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        margin: '36px 0',
      }}
    />
  ),
  table: ({ children }) => (
    <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '14px',
          color: '#94a3b8',
        }}
      >
        {children}
      </table>
    </div>
  ),
  th: ({ children }) => (
    <th
      style={{
        padding: '10px 14px',
        textAlign: 'left',
        color: '#f1f5f9',
        fontWeight: 600,
        fontSize: '12px',
        letterSpacing: '0.5px',
        textTransform: 'uppercase',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(255,255,255,0.03)',
      }}
    >
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td
      style={{
        padding: '10px 14px',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      {children}
    </td>
  ),
}

// ─── Sub-components ────────────────────────────────────────────────────────────

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
      }}
    >
      {category}
    </span>
  )
}

function RelatedPostCard({ post }: { post: BlogPost }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered ? '#111827' : '#0d1117',
          border: `1px solid ${hovered ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.07)'}`,
          boxShadow: hovered ? 'inset 3px 0 0 #00ff88' : 'none',
          borderRadius: '12px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          transition: 'background 0.15s, border-color 0.15s, box-shadow 0.15s, transform 0.15s',
          transform: hovered ? 'translateY(-2px)' : 'none',
          cursor: 'pointer',
        }}
      >
        <CategoryChip category={post.category} />

        <h3
          style={{
            fontSize: '14px',
            fontWeight: 700,
            color: '#f1f5f9',
            lineHeight: 1.4,
            margin: 0,
            fontFamily: 'var(--font-geist-sans), Inter, sans-serif',
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

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '12px',
            color: '#475569',
          }}
        >
          <span>{post.date}</span>
          <span
            style={{
              width: '3px',
              height: '3px',
              borderRadius: '50%',
              background: '#475569',
              display: 'inline-block',
            }}
          />
          <span>{post.readTime} read</span>
        </div>
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
      <div style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center' }}>
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

// ─── Main component ────────────────────────────────────────────────────────────

export default function BlogPostPage({
  post,
  relatedPosts,
}: {
  post: BlogPostDetail
  relatedPosts: BlogPost[]
}) {
  return (
    <div>
      {/* ── Article ───────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px 0' }}>
        {/* Back link */}
        <Link
          href="/blog"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            color: '#475569',
            textDecoration: 'none',
            marginBottom: '36px',
            transition: 'color 0.15s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#94a3b8' }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#475569' }}
        >
          ← Back to Blog
        </Link>

        {/* Article content constrained to readable width */}
        <div style={{ maxWidth: '720px' }}>
          <CategoryChip category={post.category} />

          <h1
            style={{
              fontSize: 'clamp(26px, 4vw, 48px)',
              fontWeight: 800,
              color: '#f1f5f9',
              fontFamily: 'var(--font-geist-sans), Inter, sans-serif',
              letterSpacing: '-0.4px',
              lineHeight: 1.15,
              marginTop: '20px',
              marginBottom: '20px',
            }}
          >
            {post.title}
          </h1>

          {/* Meta row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '13px',
              color: '#475569',
              marginBottom: '28px',
              flexWrap: 'wrap',
            }}
          >
            <span>{post.date}</span>
            <span
              style={{
                width: '3px',
                height: '3px',
                borderRadius: '50%',
                background: '#475569',
                display: 'inline-block',
              }}
            />
            <span>{post.readTime} read</span>
          </div>

          {/* Stat highlight callout */}
          {post.statHighlight && (
            <div
              style={{
                padding: '16px 20px',
                background: 'rgba(245,158,11,0.06)',
                border: '1px solid rgba(245,158,11,0.2)',
                borderLeft: '3px solid #f59e0b',
                borderRadius: '0 10px 10px 0',
                fontSize: '14px',
                fontWeight: 600,
                color: '#f59e0b',
                lineHeight: 1.5,
                marginBottom: '32px',
              }}
            >
              {post.statHighlight}
            </div>
          )}

          {/* Divider */}
          <div
            style={{
              borderTop: '1px solid rgba(255,255,255,0.07)',
              marginBottom: '36px',
            }}
          />

          {/* Article body */}
          <div>
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>

      {/* ── Newsletter CTA ────────────────────────────────────────────────── */}
      <div style={{ marginTop: '80px' }}>
        <NewsletterStrip />
      </div>

      {/* ── Related posts ─────────────────────────────────────────────────── */}
      {relatedPosts.length > 0 && (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 24px 96px' }}>
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
            Related Articles
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '20px',
            }}
          >
            {relatedPosts.map(p => (
              <RelatedPostCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
