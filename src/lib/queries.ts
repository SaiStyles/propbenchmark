import { createServerSupabaseClient } from '@/lib/supabase-server'
import type { Firm, FirmDetailData, OfferData, AccountModel, DbAccountModel, CompareFirm } from '@/lib/types'

// ─── Formatters ───────────────────────────────────────────────────────────────

function initials(name: string): string {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

function fmtSize(n: number): string {
  return n >= 1000 ? `$${n / 1000}K` : `$${n}`
}

function fmtFee(n: number): string {
  return `$${n.toLocaleString('en-US')}`
}

function fmtPercent(n: number | null | undefined): string {
  return n != null ? `${n}%` : '—'
}

/**
 * Formats a drawdown or profit target value with both unit and dollar context.
 * forex/cfd: value is a percentage  → "10% ($10,000)"
 * futures:   value is a dollar amt  → "$2,000 (4.0%)"
 * Returns 'None' for null/undefined.
 */
function fmtDrawdownValue(
  value: number | null | undefined,
  accountSize: number,
  category: string,
): string {
  if (value == null) return 'None'
  if (category === 'futures') {
    const pctRaw = (value / accountSize) * 100
    const pct = Number.isInteger(pctRaw) ? `${pctRaw}` : pctRaw.toFixed(1)
    return `$${value.toLocaleString('en-US')} (${pct}%)`
  }
  const dollar = Math.round((value / 100) * accountSize)
  return `${value}% ($${dollar.toLocaleString('en-US')})`
}

/** Same as fmtDrawdownValue but returns 'None' for 0 (profit_target = 0 means no target). */
function fmtProfitTarget(
  value: number | null | undefined,
  accountSize: number,
  category: string,
): string {
  if (value == null || value === 0) return 'None'
  return fmtDrawdownValue(value, accountSize, category)
}

// ─── Transforms ───────────────────────────────────────────────────────────────

function mapAccounts(models: DbAccountModel[], category: string): AccountModel[] {
  return [...models]
    .sort((a, b) => a.account_size - b.account_size)
    .map(m => ({
      size: fmtSize(m.account_size),
      fee: m.challenge_fee != null ? fmtFee(m.challenge_fee) : '—',
      profitTarget: fmtProfitTarget(m.profit_target, m.account_size, category),
      maxDrawdown: fmtDrawdownValue(m.max_drawdown, m.account_size, category),
      dailyDrawdown: fmtDrawdownValue(m.daily_drawdown, m.account_size, category),
      programName: m.program_name,
      activationFee: m.activation_fee != null ? fmtFee(m.activation_fee) : 'None',
      minimumTradingDays: m.minimum_trading_days != null ? `${m.minimum_trading_days}` : 'None',
      consistencyRule: m.consistency_rule != null ? `${m.consistency_rule}%` : 'None',
      maxContracts: m.max_contracts ?? 'Unlimited',
      scalingAvailable: m.scaling_available,
      drawdown_type: m.drawdown_type ?? null,
    }))
}

function mapFirmCard(firm: any, featured: boolean): Firm {
  const models: DbAccountModel[] = firm.account_models ?? []
  const entry = [...models].sort((a, b) => (a.account_size ?? 0) - (b.account_size ?? 0))[0]

  const steps = entry?.evaluation_steps ?? 1

  return {
    id: firm.id,
    name: firm.name,
    logo: firm.logo_url ?? initials(firm.name),
    editorRating: firm.editor_rating ?? null,
    discount: firm.discount_percent ?? 0,
    tag: '',
    profitSplit: fmtPercent(entry?.profit_split),
    maxDrawdown: entry
      ? fmtDrawdownValue(entry.max_drawdown, entry.account_size, firm.category ?? 'forex')
      : 'None',
    challengeFee: entry?.challenge_fee != null ? fmtFee(entry.challenge_fee) : '—',
    steps,
    instantFunding: steps === 0,
    weekendHolding: firm.weekend_holding ?? false,
    category: firm.category ?? 'forex',
    slug: firm.slug,
    featured,
    verified: firm.is_verified ?? false,
  }
}

// ─── Queries ─────────────────────────────────────────────────────────────────

/** All active firms, ordered by editor_rating desc. Returns [] on any error. */
export async function getFirms(): Promise<Firm[]> {
  try {
    const supabase = await createServerSupabaseClient()

    const [{ data, error }, featuredRes] = await Promise.all([
      supabase
        .from('firms')
        .select(`
          id, name, slug, logo_url, category, editor_rating, discount_percent,
          weekend_holding, news_trading_policy, is_verified,
          account_models (
            account_size, challenge_fee, profit_split, max_drawdown,
            evaluation_steps
          )
        `)
        .eq('status', 'active')
        .order('editor_rating', { ascending: false, nullsFirst: false }),
      supabase.from('featured_slots').select('firm_id'),
    ])

    if (error || !data?.length) return []

    const featuredIds = new Set(featuredRes.data?.map((f: any) => f.firm_id) ?? [])

    return data.map(firm =>
      mapFirmCard(firm, featuredIds.has(firm.id))
    )
  } catch {
    return []
  }
}

/** Featured firms only (from featured_slots), ordered by position. */
export async function getFeaturedFirms(): Promise<Firm[]> {
  try {
    const supabase = await createServerSupabaseClient()

    const { data, error } = await supabase
      .from('featured_slots')
      .select(`
        position,
        firms (
          id, name, slug, logo_url, category, editor_rating, discount_percent, status,
          weekend_holding, news_trading_policy, is_verified,
          account_models (
            account_size, challenge_fee, profit_split, max_drawdown,
            evaluation_steps
          )
        )
      `)
      .order('position')

    if (error || !data?.length) return []

    return data
      .filter((slot: any) => slot.firms?.status === 'active')
      .map((slot: any) => mapFirmCard(slot.firms, true))
  } catch {
    return []
  }
}

/** Full firm detail by slug. Returns null if not found or on error. */
export async function getFirmBySlug(slug: string): Promise<FirmDetailData | null> {
  try {
    const supabase = await createServerSupabaseClient()

    const { data, error } = await supabase
      .from('firms')
      .select(`*, account_models (*), pros_cons (*)`)
      .eq('slug', slug)
      .eq('status', 'active')
      .single()

    if (error || !data) return null

    const models: DbAccountModel[] = data.account_models ?? []
    const entry = [...models].sort((a, b) => a.account_size - b.account_size)[0]
    const steps = entry?.evaluation_steps ?? 1

    const pros = data.pros_cons
      .filter((p: any) => p.type === 'pro')
      .map((p: any) => p.text as string)
    const cons = data.pros_cons
      .filter((p: any) => p.type === 'con')
      .map((p: any) => p.text as string)

    return {
      name: data.name,
      logo: data.logo_url ?? initials(data.name),
      editorRating: data.editor_rating ?? null,
      discount: data.discount_percent ?? 0,
      tag: '',
      discountCode: data.discount_code ?? '',
      profitSplit: fmtPercent(entry?.profit_split),
      steps,
      payoutFreq: entry?.payout_frequency ?? 'Monthly',
      instantFunding: steps === 0,
      weekendHolding: data.weekend_holding ?? false,
      newsTradingPolicy: data.news_trading_policy ?? null,
      platforms: data.platforms ?? [],

      description: data.description ?? '',
      pros,
      cons,
      accounts: mapAccounts(models, data.category ?? 'forex'),
      affiliateLink: data.affiliate_link ?? undefined,
    }
  } catch {
    return null
  }
}

/** All active offers joined with firm data. Returns [] on any error. */
export async function getOffers(): Promise<OfferData[]> {
  try {
    const supabase = await createServerSupabaseClient()

    const { data, error } = await supabase
      .from('offers')
      .select(`*, firms (name, slug, logo_url, category)`)
      .order('featured', { ascending: false })

    if (error || !data?.length) return []

    return data.map((o: any) => {
      const firm = o.firms ?? {}
      return {
        id: o.id,
        firmName: firm.name ?? '',
        firmLogo: firm.logo_url ?? initials(firm.name ?? '?'),
        firmSlug: firm.slug ?? '',
        category: firm.category ?? 'forex',
        discount: o.discount_percent ?? 0,
        code: o.code ?? '',
        description: o.description ?? '',
        tag: o.tag ?? '',
        featured: o.featured ?? false,
        affiliateUrl: o.affiliate_url ?? '#',
        savings: o.savings ?? '',
        expires: o.expires_at
          ? new Date(o.expires_at).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })
          : null,
      } satisfies OfferData
    })
  } catch {
    return []
  }
}

/** Extended Firm row with editorial fields from firm_rankings table. */
export type RankingFirmRow = Firm & {
  reason: string
  highlight: { label: string; value: string }
}

/**
 * All active firm_rankings joined with firms + account_models, grouped by
 * ranking category and sorted by position ascending.
 */
export async function getRankings(): Promise<Record<string, RankingFirmRow[]>> {
  try {
    const supabase = await createServerSupabaseClient()

    const { data, error } = await supabase
      .from('firm_rankings')
      .select(`
        category, position,
        firms (
          id, name, slug, logo_url, category, editor_rating, discount_percent, status,
          weekend_holding, news_trading_policy, is_verified,
          account_models (
            account_size, challenge_fee, profit_split, max_drawdown,
            evaluation_steps
          )
        )
      `)
      .order('position', { ascending: true })

    if (error || !data?.length) return {}

    const result: Record<string, RankingFirmRow[]> = {}

    for (const row of data as any[]) {
      const firm = row.firms
      if (!firm || firm.status !== 'active') continue

      const mapped = mapFirmCard(firm, false)
      const ranked: RankingFirmRow = {
        ...mapped,
        tag: '',
        reason: '',
        highlight: { label: '', value: '' },
      }

      const cat: string = row.category
      if (!result[cat]) result[cat] = []
      result[cat].push(ranked)
    }

    return result
  } catch {
    return {}
  }
}

/** All active firms with full account_models for the compare page. Returns [] on any error. */
export async function getCompareData(): Promise<CompareFirm[]> {
  try {
    const supabase = await createServerSupabaseClient()

    const { data, error } = await supabase
      .from('firms')
      .select(`
        id, name, slug, logo_url, category, editor_rating, is_verified,
        country, years_in_operation, max_allocation, trustpilot_score,
        platforms, discount_code, affiliate_link, discount_percent,
        account_models (
          id, firm_id, program_name, account_size, challenge_fee, activation_fee,
          profit_target, max_drawdown, daily_drawdown, profit_split,
          evaluation_steps, minimum_trading_days, consistency_rule,
          payout_frequency, scaling_available, drawdown_type, funded_consistency
        )
      `)
      .eq('status', 'active')
      .order('name', { ascending: true })

    if (error || !data?.length) return []
    return data as CompareFirm[]
  } catch {
    return []
  }
}

// ─── Blog ─────────────────────────────────────────────────────────────────────

export type BlogPost = {
  slug: string
  title: string
  category: string
  excerpt: string
  date: string
  readTime: string
  featured: boolean
  statHighlight: string | null
}

export type BlogPostDetail = BlogPost & {
  content: string
}

/** All published blog posts ordered by date descending. Returns [] on any error. */
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const supabase = await createServerSupabaseClient()

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('[getBlogPosts] Supabase error:', JSON.stringify(error), error?.message, error?.code, error?.details)
      return []
    }

    if (!data?.length) return []

    return data.map((row: any) => ({
      slug: row.slug,
      title: row.title,
      category: row.category ?? '',
      excerpt: row.excerpt ?? '',
      date: row.created_at
        ? new Date(row.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        : '',
      readTime: row.read_time ?? '',
      featured: row.featured ?? false,
      statHighlight: row.stat_highlight ?? null, 
    }))
  } catch (err) {
    console.error('[getBlogPosts] Unexpected error:', err)
    return []
  }
}

/** Single published blog post by slug. Returns null if not found or unpublished. */
export async function getBlogPostBySlug(slug: string): Promise<BlogPostDetail | null> {
  try {
    const supabase = await createServerSupabaseClient()

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()

    if (error || !data) return null

    return {
      slug: data.slug,
      title: data.title,
      category: data.category ?? '',
      excerpt: data.excerpt ?? '',
      date: data.created_at
        ? new Date(data.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        : '',
      readTime: data.read_time ?? '',
      featured: data.featured ?? false,
      statHighlight: data.stat_highlight ?? null,
      content: data.content ?? '',
    }
  } catch {
    return null
  }
}

/** Up to 3 published posts in the same category, excluding the current post. */
export async function getRelatedPosts(category: string, excludeSlug: string): Promise<BlogPost[]> {
  try {
    const supabase = await createServerSupabaseClient()

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .eq('category', category)
      .neq('slug', excludeSlug)
      .order('created_at', { ascending: false })
      .limit(3)

    if (error || !data?.length) return []

    return data.map((row: any) => ({
      slug: row.slug,
      title: row.title,
      category: row.category ?? '',
      excerpt: row.excerpt ?? '',
      date: row.created_at
        ? new Date(row.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        : '',
      readTime: row.read_time ?? '',
      featured: row.featured ?? false,
      statHighlight: row.stat_highlight ?? null,
    }))
  } catch {
    return []
  }
}

/**
 * Top 10 active firms sorted by highest profit split (across all their
 * account models), descending.
 */
export async function getTopProfitSplit(): Promise<Firm[]> {
  try {
    const supabase = await createServerSupabaseClient()

    const { data, error } = await supabase
      .from('firms')
      .select(`
        id, name, slug, logo_url, category, editor_rating, discount_percent,
        weekend_holding, news_trading_policy, is_verified,
        account_models (
          account_size, challenge_fee, profit_split, max_drawdown,
          evaluation_steps
        )
      `)
      .eq('status', 'active')

    if (error || !data?.length) return []

    return data
      .map((firm: any) => {
        const models: DbAccountModel[] = firm.account_models ?? []
        const maxSplit = models.length > 0
          ? Math.max(...models.map(m => m.profit_split ?? 0))
          : 0
        return { firm, maxSplit }
      })
      .filter(x => x.maxSplit > 0)
      .sort((a, b) => b.maxSplit - a.maxSplit)
      .slice(0, 10)
      .map(({ firm }) => mapFirmCard(firm, false))
  } catch {
    return []
  }
}
