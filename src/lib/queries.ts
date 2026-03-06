import { createServerSupabaseClient } from '@/lib/supabase-server'
import type { Firm, FirmDetailData, OfferData, AccountModel, DbAccountModel } from '@/lib/types'

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

// ─── Transforms ───────────────────────────────────────────────────────────────

function mapAccounts(models: DbAccountModel[]): AccountModel[] {
  return [...models]
    .sort((a, b) => a.account_size - b.account_size)
    .map(m => ({
      size: fmtSize(m.account_size),
      fee: m.challenge_fee != null ? fmtFee(m.challenge_fee) : '—',
      profitTarget: fmtPercent(m.profit_target),
      maxDrawdown: fmtPercent(m.max_drawdown),
      dailyDrawdown: m.daily_drawdown != null
        ? `${fmtFee(m.daily_drawdown)} (${((m.daily_drawdown / m.account_size) * 100).toFixed(1)}%)`
        : 'None',
      programName: m.program_name,
    }))
}

function mapFirmCard(firm: any, featured: boolean, reviewCount: number): Firm {
  const models: DbAccountModel[] = firm.account_models ?? []
  const entry = [...models].sort((a, b) => (a.account_size ?? 0) - (b.account_size ?? 0))[0]

  const steps = entry?.evaluation_steps ?? 1

  return {
    id: firm.id,
    name: firm.name,
    logo: firm.logo_url ?? initials(firm.name),
    rating: firm.editor_rating ?? 0,
    reviews: reviewCount,
    discount: firm.discount_percent ?? 0,
    tag: '',
    profitSplit: fmtPercent(entry?.profit_split),
    maxDrawdown: fmtPercent(entry?.max_drawdown),
    challengeFee: entry?.challenge_fee != null ? fmtFee(entry.challenge_fee) : '—',
    steps,
    instantFunding: steps === 0,
    weekendHolding: entry?.weekend_holding ?? false,
    category: firm.category ?? 'forex',
    slug: firm.slug,
    featured,
    verified: reviewCount > 0,
    paysWithin: entry?.first_payout_days ? `Pays in ${entry.first_payout_days} days` : undefined,
  }
}

// ─── Shared helper: get review counts for a set of firm IDs ──────────────────

async function getReviewMap(
  supabase: Awaited<ReturnType<typeof createServerSupabaseClient>>,
): Promise<Map<string, number>> {
  const { data } = await supabase.from('reviews').select('firm_id')
  const map = new Map<string, number>()
  data?.forEach((r: any) => map.set(r.firm_id, (map.get(r.firm_id) ?? 0) + 1))
  return map
}

// ─── Queries ─────────────────────────────────────────────────────────────────

/** All active firms, ordered by editor_rating desc. Returns [] on any error. */
export async function getFirms(): Promise<Firm[]> {
  try {
    const supabase = await createServerSupabaseClient()

    const [{ data, error }, featuredRes, reviewMap] = await Promise.all([
      supabase
        .from('firms')
        .select(`
          id, name, slug, logo_url, category, editor_rating, discount_percent,
          account_models (
            account_size, challenge_fee, profit_split, max_drawdown,
            evaluation_steps, weekend_holding, first_payout_days
          )
        `)
        .eq('status', 'active')
        .order('editor_rating', { ascending: false, nullsFirst: false }),
      supabase.from('featured_slots').select('firm_id'),
      getReviewMap(supabase),
    ])

    if (error || !data?.length) return []

    const featuredIds = new Set(featuredRes.data?.map((f: any) => f.firm_id) ?? [])

    return data.map(firm =>
      mapFirmCard(firm, featuredIds.has(firm.id), reviewMap.get(firm.id) ?? 0)
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
          account_models (
            account_size, challenge_fee, profit_split, max_drawdown,
            evaluation_steps, weekend_holding, first_payout_days
          )
        )
      `)
      .order('position')

    if (error || !data?.length) return []

    return data
      .filter((slot: any) => slot.firms?.status === 'active')
      .map((slot: any) => mapFirmCard(slot.firms, true, 0))
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

    const { count: reviewCount } = await supabase
      .from('reviews')
      .select('id', { count: 'exact', head: true })
      .eq('firm_id', data.id)

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
      rating: data.editor_rating ?? 0,
      reviews: reviewCount ?? 0,
      discount: data.discount_percent ?? 0,
      tag: '',
      discountCode: data.discount_code ?? '',
      profitSplit: fmtPercent(entry?.profit_split),
      steps,
      payoutFreq: entry?.payout_frequency ?? 'Monthly',
      minPayout: entry?.minimum_payout != null ? `$${entry.minimum_payout}` : '$0',
      countries: 'Worldwide',
      instantFunding: steps === 0,
      weekendHolding: entry?.weekend_holding ?? false,
      platforms: data.platforms ?? [],
      instruments: data.instruments ?? [],
      description: data.description ?? '',
      pros,
      cons,
      accounts: mapAccounts(models),
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
      .select(`*, firms (name, slug, logo_url, editor_rating, category)`)
      .order('featured', { ascending: false })

    if (error || !data?.length) return []

    return data.map((o: any) => {
      const firm = o.firms ?? {}
      const expiresAt = o.expires_at ?? o.expires ?? null
      return {
        id: o.id,
        firmName: firm.name ?? '',
        firmLogo: firm.logo_url ?? initials(firm.name ?? '?'),
        firmSlug: firm.slug ?? '',
        firmRating: firm.editor_rating ?? 0,
        firmReviews: 0,
        category: firm.category ?? 'forex',
        discount: o.discount_percent ?? o.discount ?? 0,
        code: o.code ?? '',
        description: o.description ?? '',
        tag: o.tag ?? '',
        featured: o.featured ?? false,
        affiliateUrl: o.affiliate_url ?? '#',
        savings: o.savings ?? '',
        expires: expiresAt
          ? new Date(expiresAt).toLocaleDateString('en-US', {
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

/**
 * Firms for the rankings page — same as getFirms(), sorted by rating.
 * Editorial ranking structure (categories, reasons, highlights) lives in
 * the component as curated content.
 */
export async function getRankings(): Promise<Firm[]> {
  return getFirms()
}
