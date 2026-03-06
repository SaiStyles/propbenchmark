-- Fix RLS: grant anon/public SELECT on all tables read by the app.
-- Run this in the Supabase SQL editor (Dashboard → SQL Editor → New query).
--
-- Safe to run multiple times — DROP IF EXISTS before each CREATE.

-- ── firms ────────────────────────────────────────────────────────────────────
ALTER TABLE firms ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_active_firms" ON firms;
CREATE POLICY "public_read_active_firms"
  ON firms
  FOR SELECT
  TO anon, authenticated
  USING (status = 'active');

-- ── account_models ────────────────────────────────────────────────────────────
ALTER TABLE account_models ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_account_models" ON account_models;
CREATE POLICY "public_read_account_models"
  ON account_models
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- ── pros_cons ─────────────────────────────────────────────────────────────────
ALTER TABLE pros_cons ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_pros_cons" ON pros_cons;
CREATE POLICY "public_read_pros_cons"
  ON pros_cons
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- ── reviews ───────────────────────────────────────────────────────────────────
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_reviews" ON reviews;
CREATE POLICY "public_read_reviews"
  ON reviews
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- ── featured_slots ────────────────────────────────────────────────────────────
ALTER TABLE featured_slots ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_featured_slots" ON featured_slots;
CREATE POLICY "public_read_featured_slots"
  ON featured_slots
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- ── offers ────────────────────────────────────────────────────────────────────
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_offers" ON offers;
CREATE POLICY "public_read_offers"
  ON offers
  FOR SELECT
  TO anon, authenticated
  USING (true);
