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

| Token | Value |
|---|---|
| Background | `#060b14` |
| Card background | `#0a1628` or `white/[0.03]` |
| Accent green | `#00ff88` |
| Border | `white/[0.08]` or `white/[0.10]` |
| Primary text | `white` |
| Secondary text | `white/60` or `white/40` |
| Font | Inter (loaded via next/font) |

- **Style:** Dark, premium, confident — inspired by Lucid Trading. Clean and data-dense.
- **Accents:** Lime green `#00ff88` for highlights, CTAs, badges, best-value indicators
- **Borders:** Subtle `border-white/8` or `border-white/10` — never harsh
- **Buttons:** Primary = `bg-[#00ff88] text-[#060b14] font-bold`. Secondary = outlined with white/10 border
- **Cards:** `rounded-2xl border border-white/8 bg-white/[0.03]`
- **Badges:** `rounded-full bg-[#00ff88]/10 border border-[#00ff88]/20 text-[#00ff88] text-xs`
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
  globals.css             # Global styles, CSS variables
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
    [slug]/page.tsx       # /blog/[slug] post

src/components/
  Navbar.tsx
  Footer.tsx
  home/                   # HeroSection, StatsSection, TopFirmsSection, CategorySection
  firms/                  # FirmsDirectory, FirmCard, FirmDetail, FirmsFilter
  compare/                # CompareClient, CompareTable, FirmSelector
  offers/                 # (to build)
  rankings/               # (to build)
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
`profiles`, `firms`, `reviews`, `offers`, `blog_posts`, `featured_slots` — all with RLS policies set.

### Firm data shape

```typescript
{
  id, name, logo, rating, reviews, discount, tag,
  profitSplit, maxDrawdown, challengeFee,
  steps: number,          // 0 = instant funding, 1–3 = challenge steps
  instantFunding: boolean,
  weekendHolding: boolean,
  category: "forex" | "futures" | "instant",
  slug: string,
  // FirmDetail adds: platforms, instruments, description, pros, cons, accounts, traderReviews
}
```

---

## What's Built ✅

- `layout.tsx` — Navbar + Footer
- `app/page.tsx` — Home page
- `components/home/` — HeroSection, StatsSection, TopFirmsSection, CategorySection
- `app/firms/page.tsx` — Firm directory
- `components/firms/` — FirmsDirectory, FirmCard, FirmDetail (with account size selector + tabs), FirmsFilter
- `app/firms/[slug]/page.tsx` — Individual firm page
- `app/compare/` — Compare tool (CompareClient, CompareTable, FirmSelector)

## Still To Build 🔨

- `/offers` — Exclusive discount codes and affiliate offers per firm
- `/rankings` — Ranked lists (best for beginners, best payout, best for futures, etc.)
- `/blog` + `/blog/[slug]` — Blog/editorial content
- OAuth (Google + X) — account must be 1yr+ to leave reviews
- Supabase integration — replace all hardcoded mock data
- Admin panel — add/edit firms, manage featured slots
- Review submission flow
- Newsletter signup
- Deploy to Vercel + connect propbenchmark.com

## Known Things To Revisit

- Challenge types within account sizes (Core, Rapid, etc.) — data structure ready, UI to be added when Supabase connected
- Featured firm placement logic

---

## Component Patterns

When building new pages/components always:
1. Read existing components first for consistency (especially FirmCard, FirmDetail, Navbar)
2. Match the card style: `rounded-2xl border border-white/8 bg-white/[0.03]`
3. Use the sticky header pattern from compare page for sub-navigation
4. Use `#00ff88` only for: best value indicators, CTAs, active states, badges
5. Keep pages within `max-w-[1400px] mx-auto px-4 sm:px-6`
6. All new pages need a `metadata` export for SEO
7. Every affiliate link: `target="_blank" rel="noopener noreferrer"`