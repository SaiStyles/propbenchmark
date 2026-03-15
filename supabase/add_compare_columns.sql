-- Migration: Add columns required by the compare page
-- Run this in your Supabase SQL editor

ALTER TABLE firms
  ADD COLUMN IF NOT EXISTS country TEXT,
  ADD COLUMN IF NOT EXISTS years_in_operation SMALLINT,
  ADD COLUMN IF NOT EXISTS max_allocation INT,
  ADD COLUMN IF NOT EXISTS trustpilot_score NUMERIC(3,1);

-- drawdown_type already exists on account_models
ALTER TABLE account_models
  ADD COLUMN IF NOT EXISTS funded_consistency NUMERIC(5,2);
