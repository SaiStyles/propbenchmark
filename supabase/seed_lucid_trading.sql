-- Seed: Lucid Trading
-- Run against your Supabase project (postgres dialect)

DO $$
DECLARE
  v_firm_id uuid;
BEGIN

  -- ── Firm ─────────────────────────────────────────────────────────────────
  INSERT INTO firms (
    id,
    name,
    slug,
    website,
    category,
    platforms,
    instruments,
    description,
    editor_rating,
    status,
    affiliate_link,
    discount_code,
    discount_percent
  ) VALUES (
    gen_random_uuid(),
    'Lucid Trading',
    'lucid-trading',
    'lucidtrading.com',
    'futures',
    ARRAY['NinjaTrader', 'TradingView', 'Tradovate', 'Quantower', 'Rithmic'],
    ARRAY['Futures'],
    'Futures prop firm founded in 2025 offering evaluation and instant funding paths with EOD trailing drawdown, no activation fees, and payout speeds averaging under 15 minutes.',
    NULL,
    'active',
    NULL,
    'LUMI',
    50
  )
  RETURNING id INTO v_firm_id;

  -- ── LucidFlex (1-step, no DLL) ────────────────────────────────────────────

  INSERT INTO account_models (
    id, firm_id, program_name, account_size,
    challenge_fee, activation_fee,
    profit_target, max_drawdown, daily_drawdown,
    profit_split, evaluation_steps, minimum_trading_days,
    consistency_rule, weekend_holding, news_trading,
    first_payout_days, payout_frequency, minimum_payout, scaling_available
  ) VALUES
    (gen_random_uuid(), v_firm_id, 'LucidFlex', 25000,
     100, NULL, 5, 4, NULL, 90, 1, 2,
     TRUE, FALSE, TRUE, 5, 'on-demand', 500, TRUE),

    (gen_random_uuid(), v_firm_id, 'LucidFlex', 50000,
     130, NULL, 6, 4, NULL, 90, 1, 2,
     TRUE, FALSE, TRUE, 5, 'on-demand', 500, TRUE),

    (gen_random_uuid(), v_firm_id, 'LucidFlex', 100000,
     225, NULL, 6, 3, NULL, 90, 1, 2,
     TRUE, FALSE, TRUE, 5, 'on-demand', 500, TRUE),

    (gen_random_uuid(), v_firm_id, 'LucidFlex', 150000,
     315, NULL, 6, 3, NULL, 90, 1, 2,
     TRUE, FALSE, TRUE, 5, 'on-demand', 500, TRUE);

  -- ── LucidPro (1-step, DLL on larger sizes) ───────────────────────────────

  INSERT INTO account_models (
    id, firm_id, program_name, account_size,
    challenge_fee, activation_fee,
    profit_target, max_drawdown, daily_drawdown,
    profit_split, evaluation_steps, minimum_trading_days,
    consistency_rule, weekend_holding, news_trading,
    first_payout_days, payout_frequency, minimum_payout, scaling_available
  ) VALUES
    (gen_random_uuid(), v_firm_id, 'LucidPro', 25000,
     135, NULL, 5, 4, NULL, 90, 1, 3,
     TRUE, FALSE, TRUE, 5, 'on-demand', 500, TRUE),

    (gen_random_uuid(), v_firm_id, 'LucidPro', 50000,
     185, NULL, 6, 4, 1200, 90, 1, 3,
     TRUE, FALSE, TRUE, 5, 'on-demand', 500, TRUE),

    (gen_random_uuid(), v_firm_id, 'LucidPro', 100000,
     285, NULL, 6, 3, 1800, 90, 1, 3,
     TRUE, FALSE, TRUE, 5, 'on-demand', 500, TRUE),

    (gen_random_uuid(), v_firm_id, 'LucidPro', 150000,
     370, NULL, 6, 3, 2700, 90, 1, 3,
     TRUE, FALSE, TRUE, 5, 'on-demand', 500, TRUE);

  -- ── LucidDirect (instant funding, no evaluation) ─────────────────────────

  INSERT INTO account_models (
    id, firm_id, program_name, account_size,
    challenge_fee, activation_fee,
    profit_target, max_drawdown, daily_drawdown,
    profit_split, evaluation_steps, minimum_trading_days,
    consistency_rule, weekend_holding, news_trading,
    first_payout_days, payout_frequency, minimum_payout, scaling_available
  ) VALUES
    (gen_random_uuid(), v_firm_id, 'LucidDirect', 25000,
     340, NULL, NULL, NULL, NULL, 90, 0, 8,
     TRUE, FALSE, TRUE, 8, 'on-demand', 500, TRUE),

    (gen_random_uuid(), v_firm_id, 'LucidDirect', 50000,
     529, NULL, NULL, NULL, NULL, 90, 0, 8,
     TRUE, FALSE, TRUE, 8, 'on-demand', 500, TRUE),

    (gen_random_uuid(), v_firm_id, 'LucidDirect', 100000,
     700, NULL, NULL, NULL, NULL, 90, 0, 8,
     TRUE, FALSE, TRUE, 8, 'on-demand', 500, TRUE),

    (gen_random_uuid(), v_firm_id, 'LucidDirect', 150000,
     840, NULL, NULL, NULL, NULL, 90, 0, 8,
     TRUE, FALSE, TRUE, 8, 'on-demand', 500, TRUE);

END $$;
