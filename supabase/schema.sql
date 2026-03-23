-- ============================================================
--  Sammy's Grill Cafe — Supabase Schema
--  Paste into Supabase Dashboard → SQL Editor → Run
-- ============================================================

-- ── 1. RESERVATIONS ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.reservations (
  id               UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name        TEXT        NOT NULL,
  email            TEXT        NOT NULL,
  phone            TEXT        NOT NULL,
  reservation_date DATE        NOT NULL,
  reservation_time TIME        NOT NULL,
  guests           INTEGER     NOT NULL DEFAULT 1 CHECK (guests BETWEEN 1 AND 20),
  special_requests TEXT,
  status           TEXT        NOT NULL DEFAULT 'pending'
                               CHECK (status IN ('pending','confirmed','cancelled')),
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS res_date_idx   ON public.reservations (reservation_date);
CREATE INDEX IF NOT EXISTS res_email_idx  ON public.reservations (email);
CREATE INDEX IF NOT EXISTS res_status_idx ON public.reservations (status);
CREATE INDEX IF NOT EXISTS res_name_idx   ON public.reservations USING GIN (to_tsvector('english', full_name));

-- ── 2. CONTACT MESSAGES ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.contacts (
  id         UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  name       TEXT        NOT NULL,
  email      TEXT        NOT NULL,
  subject    TEXT        NOT NULL,
  message    TEXT        NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── 3. ROW LEVEL SECURITY ────────────────────────────────────
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts     ENABLE ROW LEVEL SECURITY;

-- Public can insert reservations (book a table)
CREATE POLICY "public_insert_reservations"
  ON public.reservations FOR INSERT WITH CHECK (true);

-- Public can insert contact messages
CREATE POLICY "public_insert_contacts"
  ON public.contacts FOR INSERT WITH CHECK (true);

-- Service role (admin panel) can do everything — no additional policy needed
-- because service role bypasses RLS by default

-- ── 4. REALTIME ───────────────────────────────────────────────
ALTER PUBLICATION supabase_realtime ADD TABLE public.reservations;
