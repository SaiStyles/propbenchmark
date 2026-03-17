// ─── Raw Supabase row types (snake_case) ──────────────────────────────────────

export type DbFirm = {
  id: string
  name: string
  slug: string
  logo_url: string | null
  website: string | null
  category: string | null
  platforms: string[] | null

  editor_rating: number | null
  status: 'active' | 'warning' | 'closed'
  affiliate_link: string | null
  discount_code: string | null
  discount_percent: number | null
  description: string | null
  is_verified: boolean | null
  weekend_holding: boolean | null
  news_trading_policy: string | null
  created_at: string
  updated_at: string
}

export type DbAccountModel = {
  id: string
  firm_id: string
  program_name: string
  account_size: number
  challenge_fee: number | null
  activation_fee: number | null
  profit_target: number | null
  max_drawdown: number | null
  daily_drawdown: number | null
  profit_split: number | null
  evaluation_steps: number | null
  minimum_trading_days: number | null
  consistency_rule: number | null
  max_contracts: string | null
  payout_frequency: string | null
  scaling_available: boolean
  drawdown_type: string | null
  created_at: string
  updated_at: string
}

export type DbProCon = {
  id: string
  firm_id: string
  type: 'pro' | 'con'
  text: string
  created_at: string
}

// ─── UI types used by components ─────────────────────────────────────────────

/** Account size row displayed in FirmDetail overview tab */
export type AccountModel = {
  size: string
  fee: string
  profitTarget: string
  maxDrawdown: string
  dailyDrawdown: string
  programName?: string
  activationFee: string
  minimumTradingDays: string
  consistencyRule: string
  maxContracts: string
  scalingAvailable: boolean
  drawdown_type: string | null
}

/**
 * Firm card/list shape — used by FirmCard, FirmsDirectory, CompareView,
 * TopFirmsSection, RankingList. id is string | number to accept both UUIDs
 * from Supabase and numeric mock data.
 */
export type Firm = {
  id: string | number
  name: string
  logo: string
  editorRating: number | null
  discount: number
  tag: string
  profitSplit: string
  maxDrawdown: string
  challengeFee: string
  steps: number
  instantFunding: boolean
  weekendHolding: boolean
  category: string
  slug: string
  featured?: boolean
  verified?: boolean
}

/** Full detail data shape for /firms/[slug] — returned by getFirmBySlug() */
export type FirmDetailData = {
  name: string
  logo: string
  editorRating: number | null
  discount: number
  tag: string
  discountCode: string
  profitSplit: string
  steps: number
  payoutFreq: string
  instantFunding: boolean
  weekendHolding: boolean
  newsTradingPolicy: string | null
  platforms: string[]

  description: string
  pros: string[]
  cons: string[]
  accounts: AccountModel[]
  affiliateLink?: string
}

// ─── Compare page raw types ───────────────────────────────────────────────────

/** Raw firm row for the compare page — includes all compare-specific columns */
export type CompareFirm = {
  id: string
  name: string
  slug: string
  logo_url: string | null
  category: string | null
  editor_rating: number | null
  is_verified: boolean | null
  country: string | null
  years_in_operation: number | null
  max_allocation: number | null
  trustpilot_score: number | null
  platforms: string[] | null
  discount_code: string | null
  affiliate_link: string | null
  discount_percent: number | null
  account_models: CompareAccountModel[]
}

/** Raw account model row for the compare page */
export type CompareAccountModel = {
  id: string
  firm_id: string
  program_name: string
  account_size: number
  challenge_fee: number | null
  activation_fee: number | null
  profit_target: number | null
  max_drawdown: number | null
  daily_drawdown: number | null
  profit_split: number | null
  evaluation_steps: number | null
  minimum_trading_days: number | null
  consistency_rule: boolean | null
  payout_frequency: string | null
  scaling_available: boolean | null
  drawdown_type: string | null
  funded_consistency: number | null
}

/** Offer card shape — id is string | number for UUID/numeric compat */
export type OfferData = {
  id: string | number
  firmName: string
  firmLogo: string
  firmSlug: string
  category: string
  discount: number
  code: string
  description: string
  tag: string
  featured: boolean
  affiliateUrl: string
  savings: string
  expires: string | null
}
