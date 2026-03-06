# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server at localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

No test framework is configured.

---

## Project Overview

**PropBenchmark** (propbenchmark.com) is a premium prop trading firm review and comparison platform — think Prop Firm Match but cleaner and more trustworthy. The goal is to be the #1 resource for traders evaluating prop firms.

- **Domain:** propbenchmark.com (Namecheap)
- **Email:** propbenchmark@gmail.com
- **Hosting:** Vercel
- **Supabase region:** Mumbai

### Monetization
- Affiliate links + discount codes per firm (primary revenue)
- Paid/featured firm listings
- Newsletter signups

### Target audience
Retail traders looking to get funded — they need trust, clarity, and real comparisons.

---

## Design System

**Non-negotiable. Never deviate from this.**

| Role | Color | Used for |
|---|---|---|
| LIME | `#00ff88` | CTA buttons, editorial tag badges, active nav, pulse dot, profit split % value |
| WARM WHITE | `#f1f5f9` | Headings, firm names, key numbers, prices |
| MID GREY | `#94a3b8` | Body text, descriptions, card subtitles |
| DIM GREY | `#475569` | Meta info, labels, dates, stat labels, inactive nav links |
| CYAN | `#22d3ee` | Platform chips (bg `#0e2030`, border `rgba(34,211,238,0.2)`), ranking highlights |
| AMBER | `#f59e0b` | Drawdown values, savings amounts, expiry warnings, offer tags |
| CARD BG | `#0d1117` | All cards |
| HOVER BG | `#111827` | Card hover state |
| PAGE BG | `#060b14` | Page background |

- **Style:** Dark, premium, confident. Clean and data-dense.
- **Styling approach:** Inline `style` objects — not Tailwind utility classes (except `anim-fade-up`, `featured-card-border`, `pulse-dot`)
- **Card borders:** `1px solid rgba(255,255,255,0.07)` default, `rgba(255,255,255,0.12)` hover
- **Non-editorial tags** (LOW COST, RISING STAR, etc.): `color: #94a3b8`, `bg: rgba(255,255,255,0.04)`, `border: rgba(255,255,255,0.08)`
- **Offer tags** (EXCLUSIVE, BEST DEAL): amber `#f59e0b`, bg `rgba(245,158,11,0.08)`, border `rgba(245,158,11,0.25)`
- **Discount code pill:** bg `#1a2a1a`, border `rgba(0,255,136,0.3)`, text `#00ff88`
- **Featured cards:** use `.featured-card-border` CSS class (shimmer animation)
- **Background depth** (globals.css): dot grid + lime glow top-right (`body::before`) + cyan glow bottom-left (`body::after`)
- **No purple gradients, no white backgrounds, no generic AI aesthetics**

---

## Architecture

Built with Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, and Supabase.

### Key conventions

- Path alias `@/*` maps to `./src/*`
- Interactive components must use `'use client'` directive; server components are the default
- Two Supabase clients: `src/lib/supabase.ts` (browser/client) and `src/lib/supabase-server.ts` (server-side with cookies)
- Styling uses Tailwind CSS utility classes + React inline `style` objects where needed
- CSS variables defined in `src/app/globals.css`
- `clsx` + `tailwind-merge` available for conditional className logic
- **State management:** Local React `useState` only — no Redux, Zustand, or Context API

### Application structure

```
src/app/
  layout.tsx              # Root layout: Navbar + Footer
  page.tsx                # Home page
  globals.css             # Global styles, CSS vars, bg depth, animations
  firms/
    page.tsx              # /firms listing
    [slug]/page.tsx       # /firms/[slug] detail page
  compare/
    page.tsx              # /compare tool
  offers/
    page.tsx              # /offers page
  rankings/
    page.tsx              # /rankings page
  blog/                   # (to build)

src/components/
  Navbar.tsx
  Footer.tsx
  home/                   # HeroSection, StatsSection, TopFirmsSection, CategorySection
  firms/                  # FirmsDirectory, FirmCard, FirmDetail, FirmsFilter
  compare/                # CompareView, CompareTable, CompareSelector
  offers/                 # OfferCard, OffersPage
  rankings/               # RankingsPage, RankingList
  ui/                     # CountUp, DrawdownBar, ProfitSplitArc, StarRating
  blog/                   # (to build)

src/lib/
  supabase.ts             # createBrowserClient() — use in 'use client' components
  supabase-server.ts      # createServerClient() — use in Server Components / Route Handlers
```

---

## Data Layer

Supabase is configured via `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**Current state:** All firm data is hardcoded as mock data inside components. Supabase is set up but not yet wired. When integrating real data, use server client in Server Components and browser client for client-side queries.

### Supabase tables
`profiles`, `firms`, `reviews`, `offers`, `blog_posts`, `featured_slots`, `account_models`, `pros_cons` — all with RLS policies set.

### DB schema (firms → account_models, pros_cons)

```
firms: id, name, slug, logo_url, website, category, platforms[], instruments[],
       editor_rating, status, affiliate_link, discount_code, discount_percent, description

account_models: id, firm_id, program_name, account_size, challenge_fee, activation_fee,
                profit_target, max_drawdown, daily_drawdown, profit_split, evaluation_steps,
                minimum_trading_days, consistency_rule, weekend_holding, news_trading,
                max_contracts, first_payout_days, payout_frequency, minimum_payout, scaling_available
                UNIQUE (firm_id, program_name, account_size)

pros_cons: id, firm_id, type (pro|con), text
```

---

## What's Built ✅

- `layout.tsx` — Navbar + Footer
- `app/page.tsx` — Home page
- `components/home/` — HeroSection, StatsSection, TopFirmsSection, CategorySection
- `app/firms/page.tsx` — Firm directory
- `components/firms/` — FirmsDirectory, FirmCard, FirmDetail (account size selector + tabs), FirmsFilter
- `app/firms/[slug]/page.tsx` — Individual firm page
- `app/compare/` — Compare tool (CompareView, CompareTable, CompareSelector)
- `app/offers/` — Offers page (OfferCard, OffersPage)
- `app/rankings/` — Rankings page (RankingsPage, RankingList)
- `components/ui/` — CountUp, DrawdownBar, ProfitSplitArc, StarRating
- Supabase schema — firms, account_models, pros_cons tables with RLS + indexes

## Still To Build 🔨

- `/blog` + `/blog/[slug]` — Blog/editorial content
- Supabase integration — replace all hardcoded mock data with DB queries
- OAuth (Google + X) — account must be 1yr+ to leave reviews
- Admin panel — add/edit firms, manage featured slots
- Review submission flow
- Newsletter signup
- Deploy to Vercel + connect propbenchmark.com

## Known Things To Revisit

- Challenge types within account sizes (Core, Rapid, etc.) — DB schema ready, UI to be added when Supabase connected
- Featured firm placement logic

---

## Component Patterns

When building new pages/components always:
1. Read existing components first for consistency (especially FirmCard, FirmDetail, Navbar)
2. Use inline `style` objects — not Tailwind utility classes
3. Card bg `#0d1117`, border `1px solid rgba(255,255,255,0.07)`, hover border `rgba(255,255,255,0.12)`
4. Use the sticky header pattern from compare page for sub-navigation
5. Use `#00ff88` only for: best value indicators, CTAs, active states, profit split values
6. Keep pages within `max-w-[1400px] mx-auto` with `px: 24px` inline
7. All new pages need a `metadata` export for SEO
8. Every affiliate link: `target="_blank" rel="noopener noreferrer"`
9. Use `<DrawdownBar>` for drawdown values, `<ProfitSplitArc>` for profit split, `<CountUp>` for animated numbers