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

### Key dependencies
- `@supabase/supabase-js` + `@supabase/ssr` — database client
- `@anthropic-ai/sdk` — Claude API (available for AI features)
- `lucide-react` — icons
- `react-markdown` + `remark-gfm` — markdown rendering (used in blog posts)
- `clsx` + `tailwind-merge` — conditional className logic
- `geist` — font

### Key conventions

- Path alias `@/*` maps to `./src/*`
- Interactive components must use `'use client'` directive; server components are the default
- Two Supabase clients: `src/lib/supabase.ts` (browser/client) and `src/lib/supabase-server.ts` (server-side with cookies)
- All data fetching is in `src/lib/queries.ts` (server-side, uses supabase-server)
- Styling: inline `style` objects — not Tailwind utility classes
- CSS variables defined in `src/app/globals.css`
- `clsx` + `tailwind-merge` available for conditional className logic
- **State management:** Local React `useState` only — no Redux, Zustand, or Context API
- **Exception:** `MarketTypeContext` (CFD/Futures toggle) is a Context — only global state in the app

### Application structure

```
src/app/
  layout.tsx              # Root layout: MarketTypeProvider + Navbar + MarketToggle + Footer
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
  blog/
    page.tsx              # /blog listing
    [slug]/page.tsx       # /blog/[slug] post detail
    loading.tsx           # Shimmer skeleton for blog list
  about/page.tsx          # /about — mission, editorial independence, affiliate disclosure
  advertise/page.tsx      # /advertise — featured listing options
  contact/page.tsx        # /contact — data correction submissions
  privacy/page.tsx        # /privacy — privacy policy
  terms/page.tsx          # /terms — terms of service

src/components/
  Navbar.tsx              # Sticky nav: logo, 5 main links, "BENCH" discount copy button
  Footer.tsx              # Newsletter strip + links (Explore, Resources, Company) + X link
  home/                   # HeroSection, StatsSection, TopFirmsSection, CategorySection
  firms/                  # FirmsDirectory, FirmCard, FirmDetail, FirmsFilter
  compare/                # CompareView, CompareTable, CompareSelector
  offers/                 # OfferCard, OffersPage
  rankings/               # RankingsPage, RankingList
  blog/                   # BlogPage, BlogPostPage
  ui/                     # CountUp, DrawdownBar, ProfitSplitArc, StarRating, FirmLogo, MarketToggle

src/context/
  MarketTypeContext.tsx   # CFD/Futures toggle — persists to localStorage as pb_market_type

src/lib/
  supabase.ts             # createBrowserClient() — use in 'use client' components
  supabase-server.ts      # createServerClient() — use in Server Components / Route Handlers
  queries.ts              # All data fetching (getFirms, getFirmBySlug, getOffers, getBlogPosts, etc.)
  types.ts                # All TypeScript types: DbFirm, Firm, FirmDetailData, CompareFirm, OfferData, etc.
```

---

## Data Layer

Supabase is configured via `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**Current state:** Firms and account_models are fetched live from Supabase via `queries.ts`. Offers still use mock/fallback data. Blog posts are fetched from Supabase `blog_posts` table.

All queries are in `src/lib/queries.ts`. They catch errors and return empty arrays on failure — never throw. Use server client (`supabase-server.ts`) in Server Components and Route Handlers; browser client (`supabase.ts`) in `'use client'` components.

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

- `layout.tsx` — Root layout with MarketTypeProvider, Navbar, MarketToggle, Footer
- `app/page.tsx` — Home page (Hero, Stats, Top Firms, Category browse)
- `components/home/` — HeroSection, StatsSection, TopFirmsSection, CategorySection
- `app/firms/page.tsx` — Firms directory with filters (search, steps, instant, weekend, sort)
- `components/firms/` — FirmsDirectory, FirmCard, FirmDetail (account size + program selector, tabs), FirmsFilter
- `app/firms/[slug]/page.tsx` — Individual firm detail page
- `app/compare/` — Compare tool up to 3 firms (CompareView, CompareTable, CompareSelector) with URL sync
- `app/offers/` — Offers/discounts page (OffersPage, OfferCard) with featured deals section
- `app/rankings/` — 6-category rankings (RankingsPage, RankingList) with sticky category nav
- `app/blog/` — Blog listing with category filter + search (BlogPage) + post detail with markdown (BlogPostPage)
- `app/about/`, `app/advertise/`, `app/contact/`, `app/privacy/`, `app/terms/` — Static info pages
- `components/ui/` — CountUp, DrawdownBar, ProfitSplitArc, StarRating, FirmLogo, MarketToggle
- `src/context/MarketTypeContext.tsx` — CFD/Futures market toggle with localStorage persistence
- `src/lib/queries.ts` — All Supabase data fetching (firms, accounts, blog, offers, rankings)
- `src/lib/types.ts` — Full TypeScript type definitions
- Newsletter signup — Footer email input writes to Supabase subscribers table
- Supabase schema — firms, account_models, pros_cons, blog_posts, featured_slots tables with RLS + indexes

## Hidden Features (Ready to Enable)

- **Pros & Cons section** (`src/components/firms/FirmDetail.tsx` ~line 290) — fully built, commented out. To enable: uncomment the `{/* Pros & Cons ... */}` block. Requires `firm.pros` and `firm.cons` arrays populated in Supabase `pros_cons` table.

---

## Component Patterns

When building new pages/components always:
1. Read existing components first for consistency (especially FirmCard, FirmDetail, Navbar)
2. Use inline `style` objects — not Tailwind utility classes
3. Card bg `#0d1117`, border `1px solid rgba(255,255,255,0.07)`, hover border `rgba(255,255,255,0.12)`
4. Use the sticky header pattern from compare/rankings pages for sub-navigation
5. Use `#00ff88` only for: best value indicators, CTAs, active states, profit split values
6. Keep pages within `max-w-[1400px] mx-auto` with `px: 24px` inline
7. All new pages need a `metadata` export for SEO
8. Every affiliate link: `target="_blank" rel="noopener noreferrer"`
9. Use `<DrawdownBar>` for drawdown values, `<ProfitSplitArc>` for profit split, `<CountUp>` for animated numbers
10. Use `<FirmLogo>` for firm logos — handles image load failure with initials fallback
11. Market type filtering: read `marketType` from `useMarketType()` context in client components
