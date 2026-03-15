'use client'

import { useState } from 'react'
import Link from 'next/link'
import StarRating from '@/components/ui/StarRating'
import FirmLogo from '@/components/ui/FirmLogo'
import ProfitSplitArc from '@/components/ui/ProfitSplitArc'
import DrawdownBar from '@/components/ui/DrawdownBar'
import type { FirmDetailData } from '@/lib/types'

const TABS = ['Overview', 'Reviews', 'Platforms']
const EDITORIAL_TAGS = new Set(["EDITOR'S CHOICE", 'TOP RATED', 'FUTURES #1', 'BEST VALUE'])

function parsePercent(s: string): number {
  return parseFloat(s.replace('%', '')) || 0
}

type Props = { dbFirm: FirmDetailData | null }

export default function FirmDetail({ dbFirm }: Props) {
  const [activeTab, setActiveTab] = useState('Overview')
  const [selectedProgram, setSelectedProgram] = useState('')
  const [selectedAccount, setSelectedAccount] = useState(0)

  const firm = dbFirm

  if (!firm) {
    return (
      <div style={{ textAlign: 'center', padding: '120px 24px', color: '#94a3b8' }}>
        <div style={{ fontSize: '40px', marginBottom: '16px' }}>—</div>
        <h2 style={{ color: '#f1f5f9', marginBottom: '12px', fontWeight: 700 }}>Firm not found</h2>
        <Link href="/firms" style={{ color: '#22d3ee', textDecoration: 'none' }}>← Back to all firms</Link>
      </div>
    )
  }

  const programs = [...new Set(firm.accounts.map(a => a.programName).filter((p): p is string => !!p))]
  const hasPrograms = programs.length > 1
  const activeProgram = selectedProgram || programs[0] || ''
  const programAccounts = hasPrograms ? firm.accounts.filter(a => a.programName === activeProgram) : firm.accounts
  const account = programAccounts[selectedAccount] ?? programAccounts[0]
  const isEditorial = EDITORIAL_TAGS.has(firm.tag)

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '32px 0 80px' }}>

      {/* Back */}
      <Link href="/firms" style={{
        color: '#64748b', textDecoration: 'none',
        fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px',
        marginBottom: '20px',
        transition: 'color 0.15s',
      }}
        onMouseEnter={e => (e.currentTarget.style.color = '#94a3b8')}
        onMouseLeave={e => (e.currentTarget.style.color = '#64748b')}
      >
        <span style={{
          width: '18px',
          height: '18px',
          borderRadius: '999px',
          border: '1px solid rgba(148,163,184,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '10px',
        }}>←</span>
        All firms
      </Link>

      {/* Header */}
      <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', marginBottom: '28px', flexWrap: 'wrap' }}>
        <div style={{
          width: '72px', height: '72px',
          background: 'rgba(15,23,42,0.9)',
          borderRadius: '16px', display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontWeight: 900, fontSize: '22px',
          color: '#94a3b8', flexShrink: 0, overflow: 'hidden',
        }}><FirmLogo logo={firm.logo} name={firm.name} size={72} /></div>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '8px' }}>
            <h1 style={{
              fontSize: '26px', fontWeight: 700, color: '#f1f5f9', margin: 0,
              fontFamily: 'var(--font-geist-sans), Inter, sans-serif',
            }}>{firm.name}</h1>
            <span style={{
              background: isEditorial ? 'rgba(0,255,136,0.08)' : 'rgba(255,255,255,0.04)',
              color: isEditorial ? '#00ff88' : '#94a3b8',
              border: isEditorial ? '1px solid rgba(0,255,136,0.3)' : '1px solid rgba(255,255,255,0.08)',
              borderRadius: '999px', padding: '2px 9px',
              fontSize: '10px', fontWeight: 700, letterSpacing: '1px',
            }}>{firm.tag}</span>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '8px' }}>
            <StarRating rating={firm.rating} size={16} />
            <span style={{ fontWeight: 700, fontSize: '16px', color: '#f1f5f9' }}>{firm.rating}</span>
            <span style={{ color: '#94a3b8', fontSize: '14px' }}>{firm.reviews.toLocaleString()} reviews</span>
          </div>
          <p style={{ color: '#94a3b8', marginTop: '4px', lineHeight: 1.8, fontSize: '14px' }}>
            {firm.description}
          </p>
        </div>

        {/* Discount + CTA */}
        <div style={{ textAlign: 'center', minWidth: '150px' }}>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-1px' }}>
            {firm.discount}% OFF
          </div>
          <div style={{
            background: '#1a2a1a',
            border: '1px solid rgba(0,255,136,0.35)',
            borderRadius: '999px', padding: '7px 16px',
            fontSize: '12px', fontWeight: 600, color: '#00ff88',
            marginTop: '8px', letterSpacing: '0.16em', fontFamily: 'monospace',
          }}>
            {firm.discountCode}
          </div>
          {firm.affiliateLink ? (
            <a
              href={firm.affiliateLink}
              target="_blank"
              rel="noopener noreferrer"
                style={{
                  display: 'block', marginTop: '10px', padding: '11px 26px',
                  background: '#00ff88', color: '#060b14',
                  borderRadius: '999px', fontWeight: 700,
                  fontSize: '14px', textDecoration: 'none',
                  textAlign: 'center', transition: 'transform 0.15s, box-shadow 0.15s',
                  boxShadow: '0 14px 45px rgba(0,255,136,0.28)',
                }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-1px)'
                e.currentTarget.style.boxShadow = '0 16px 55px rgba(0,255,136,0.32)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 14px 45px rgba(0,255,136,0.28)'
              }}
            >
              Get Deal →
            </a>
          ) : (
            <button
              style={{
                marginTop: '10px', padding: '11px 26px',
                background: '#00ff88', color: '#060b14',
                borderRadius: '999px', fontWeight: 700,
                fontSize: '14px', border: 'none', cursor: 'pointer',
                width: '100%', transition: 'transform 0.15s, box-shadow 0.15s',
                boxShadow: '0 14px 45px rgba(0,255,136,0.28)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-1px)'
                e.currentTarget.style.boxShadow = '0 16px 55px rgba(0,255,136,0.32)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 14px 45px rgba(0,255,136,0.28)'
              }}
            >
              Get Deal →
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0', borderBottom: '1px solid rgba(15,23,42,0.9)', marginBottom: '24px' }}>
        {TABS.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            padding: '9px 18px', background: 'none', border: 'none',
            borderBottom: `2px solid ${activeTab === tab ? '#00ff88' : 'transparent'}`,
            color: activeTab === tab ? '#00ff88' : '#64748b',
            cursor: 'pointer', fontWeight: 600, fontSize: '13px',
            transition: 'all 0.15s',
          }}
            onMouseEnter={e => { if (activeTab !== tab) e.currentTarget.style.color = '#e2e8f0' }}
            onMouseLeave={e => { if (activeTab !== tab) e.currentTarget.style.color = '#64748b' }}
          >{tab}</button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'Overview' && (
        <div>
          {/* Program Selector */}
          {hasPrograms && (
            <div style={{ marginBottom: '16px' }}>
              <div style={{
                fontSize: '11px', color: '#475569',
                marginBottom: '12px', fontWeight: 600,
                textTransform: 'uppercase', letterSpacing: '1px',
              }}>Program</div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {programs.map(prog => (
                  <button key={prog} onClick={() => { setSelectedProgram(prog); setSelectedAccount(0) }} style={{
                    padding: '8px 16px', borderRadius: '8px', cursor: 'pointer',
                    fontSize: '14px', fontWeight: 600, transition: 'all 0.15s',
                    border: activeProgram === prog ? '1px solid rgba(0,255,136,0.4)' : '1px solid rgba(255,255,255,0.08)',
                    background: activeProgram === prog ? 'rgba(0,255,136,0.08)' : 'transparent',
                    color: activeProgram === prog ? '#00ff88' : '#475569',
                  }}>
                    {prog}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Account Size Selector */}
          <div style={{ marginBottom: '28px' }}>
            <div style={{
              fontSize: '11px', color: '#475569',
              marginBottom: '12px', fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: '1px',
            }}>Account Size</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {programAccounts.map((acc, i) => (
                <button key={`${i}-${acc.size}`} onClick={() => setSelectedAccount(i)} style={{
                  padding: '8px 16px', borderRadius: '8px', cursor: 'pointer',
                  fontSize: '14px', fontWeight: 600, transition: 'all 0.15s',
                  border: selectedAccount === i ? '1px solid rgba(0,255,136,0.4)' : '1px solid rgba(255,255,255,0.08)',
                  background: selectedAccount === i ? 'rgba(0,255,136,0.08)' : 'transparent',
                  color: selectedAccount === i ? '#00ff88' : '#475569',
                }}>
                  {acc.size}
                </button>
              ))}
            </div>
          </div>

          {/* Metrics for selected account */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(155px, 1fr))',
            gap: '10px', marginBottom: '32px',
          }}>
            {[
              { label: 'Challenge Fee', value: account.fee },
              { label: 'Profit Target', value: account.profitTarget },
              { label: 'Max Drawdown', value: account.maxDrawdown, isDrawdown: true },
              { label: 'Daily Drawdown', value: account.dailyDrawdown, isDrawdown: true },
              { label: 'Profit Split', value: firm.profitSplit, highlight: true, isSplit: true },
              { label: 'Eval Steps', value: firm.steps === 0 ? 'Instant' : `${firm.steps}-Step` },
              { label: 'Payout Freq', value: firm.payoutFreq },
            ].map(({ label, value, highlight, isSplit, isDrawdown }) => (
              <div key={label} style={{
                background: highlight ? 'rgba(0,255,136,0.05)' : '#0d1117',
                border: highlight ? '1px solid rgba(0,255,136,0.15)' : '1px solid rgba(255,255,255,0.07)',
                borderRadius: '12px', padding: '18px 16px',
              }}>
                <div style={{
                  fontSize: '11px', color: '#475569',
                  marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px',
                }}>{label}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{
                    fontSize: '20px', fontWeight: 700,
                    color: highlight ? '#00ff88' : isDrawdown && value !== 'None' ? '#f59e0b' : '#f1f5f9',
                  }}>{value}</div>
                  {isSplit && <ProfitSplitArc percent={firm.profitSplit} size={28} />}
                </div>
              </div>
            ))}
          </div>

          {/* Pros & Cons */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
            <div style={{
              background: '#0d1117',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '12px', padding: '24px',
            }}>
              <div style={{
                fontWeight: 600, color: '#94a3b8',
                marginBottom: '16px', fontSize: '12px',
                textTransform: 'uppercase', letterSpacing: '1px',
              }}>Pros</div>
              {firm.pros.map((p: string) => (
                <div key={p} style={{
                  color: '#94a3b8', marginBottom: '10px',
                  fontSize: '14px', lineHeight: 1.5,
                  display: 'flex', gap: '8px',
                }}>
                  <span style={{ color: '#00ff88', flexShrink: 0 }}>✓</span>
                  {p}
                </div>
              ))}
            </div>
            <div style={{
              background: '#0d1117',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '12px', padding: '24px',
            }}>
              <div style={{
                fontWeight: 600, color: '#94a3b8',
                marginBottom: '16px', fontSize: '12px',
                textTransform: 'uppercase', letterSpacing: '1px',
              }}>Cons</div>
              {firm.cons.map((c: string) => (
                <div key={c} style={{
                  color: '#94a3b8', marginBottom: '10px',
                  fontSize: '14px', lineHeight: 1.5,
                  display: 'flex', gap: '8px',
                }}>
                  <span style={{ color: '#475569', flexShrink: 0 }}>✕</span>
                  {c}
                </div>
              ))}
            </div>
          </div>

          {/* Rules */}
          <div style={{
            fontSize: '11px', color: '#475569',
            marginBottom: '12px', fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: '1px',
          }}>Rules</div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '10px',
          }}>
            {([
              { label: 'Drawdown Type', value: account.drawdown_type ?? 'Check firm website', color: '#f1f5f9' },
              { label: 'Min Trading Days', value: account.minimumTradingDays, color: '#f1f5f9' },
              { label: 'Activation Fee', value: account.activationFee, color: '#f1f5f9' },
              { label: 'Max Contracts', value: account.maxContracts, color: '#f1f5f9' },
              { label: 'Consistency', value: account.consistencyRule, color: '#f1f5f9' },
              {
                label: 'Scaling',
                value: account.scalingAvailable ? 'Available' : 'Not Available',
                color: '#f1f5f9',
              },
              {
                label: 'Weekend Holding',
                value: firm.weekendHolding ? 'Allowed' : 'Not Allowed',
                color: '#f1f5f9',
              },
              {
                label: 'News Trading',
                value: firm.newsTradingPolicy ?? 'Check firm website',
                color: '#f1f5f9',
              },
            ] as Array<{ label: string; value: string; color: string }>).map(({ label, value, color }) => (
              <div key={label} style={{
                background: '#0d1829',
                border: '1px solid #1e293b',
                borderRadius: '12px',
                padding: '16px',
              }}>
                <div style={{
                  fontSize: '11px', color: '#64748b',
                  marginBottom: '8px', textTransform: 'uppercase',
                  letterSpacing: '0.5px', fontWeight: 600,
                }}>{label}</div>
                <div style={{ fontSize: '18px', fontWeight: 700, color }}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reviews Tab */}
      {activeTab === 'Reviews' && (
        <div>
          <div style={{
            background: '#0d1117', borderRadius: '16px',
            padding: '32px', marginBottom: '24px',
            textAlign: 'center', border: '1px solid rgba(255,255,255,0.07)',
          }}>
            <div style={{ fontSize: '56px', fontWeight: 800, color: '#f1f5f9', lineHeight: 1, letterSpacing: '-2px' }}>
              {firm.rating}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '12px 0 8px' }}>
              <StarRating rating={firm.rating} size={20} />
            </div>
            <div style={{ color: '#475569', fontSize: '13px' }}>
              Based on {firm.reviews.toLocaleString()} verified reviews
            </div>
          </div>
          <div style={{
            textAlign: 'center', padding: '40px 0',
            color: '#475569', fontSize: '14px',
          }}>
            Verified trader reviews coming soon.
          </div>
        </div>
      )}

      {/* Platforms Tab */}
      {activeTab === 'Platforms' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '12px',
        }}>
          {firm.platforms.map((p) => (
            <div key={p} style={{
              background: '#0e2030',
              border: '1px solid rgba(34,211,238,0.2)',
              borderRadius: '12px', padding: '28px 24px', textAlign: 'center',
            }}>
              <div style={{ fontSize: '28px', marginBottom: '12px' }}>💹</div>
              <div style={{ fontWeight: 600, color: '#22d3ee', fontSize: '15px' }}>{p}</div>
              <div style={{ color: '#475569', fontSize: '12px', marginTop: '4px' }}>Supported</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
