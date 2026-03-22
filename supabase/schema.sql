-- ============================================================
-- AXIS EVENTS — DATABASE SCHEMA
-- Run this in Supabase SQL Editor (supabase.com/dashboard)
-- ============================================================

-- ── ORGANISERS ──────────────────────────────────────────────
CREATE TABLE organisers (
  id          BIGSERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  state       TEXT CHECK (state IN ('NSW','VIC','QLD','SA','WA','TAS','ACT','NT')),
  phone       TEXT,
  email       TEXT,
  website     TEXT,
  abn         TEXT,
  address     TEXT,
  notes       TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Staff/contacts belonging to an organiser
CREATE TABLE org_contacts (
  id            BIGSERIAL PRIMARY KEY,
  organiser_id  BIGINT REFERENCES organisers(id) ON DELETE CASCADE,
  name          TEXT NOT NULL,
  role          TEXT,
  phone         TEXT,
  email         TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── SUPPLIERS ───────────────────────────────────────────────
-- Covers equipment, transport, venues, and labour
CREATE TABLE suppliers (
  id          BIGSERIAL PRIMARY KEY,
  type        TEXT NOT NULL CHECK (type IN ('equipment','transport','venue','labour')),
  name        TEXT NOT NULL,
  state       TEXT CHECK (state IN ('NSW','VIC','QLD','SA','WA','TAS','ACT','NT')),
  phone       TEXT,
  email       TEXT,
  website     TEXT,
  abn         TEXT,
  address     TEXT,
  notes       TEXT,
  -- Venue-only fields
  forklift    BOOLEAN DEFAULT FALSE,
  bdouble     BOOLEAN DEFAULT FALSE,
  semi        BOOLEAN DEFAULT FALSE,
  dock        TEXT,
  door        TEXT,
  dropoff     TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Contacts belonging to a supplier
CREATE TABLE supplier_contacts (
  id           BIGSERIAL PRIMARY KEY,
  supplier_id  BIGINT REFERENCES suppliers(id) ON DELETE CASCADE,
  name         TEXT NOT NULL,
  role         TEXT,
  phone        TEXT,
  email        TEXT,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ── RATE CARDS ──────────────────────────────────────────────
CREATE TABLE rate_cards (
  id             BIGSERIAL PRIMARY KEY,
  name           TEXT NOT NULL,
  provider       TEXT,
  storage_price  NUMERIC(10,2),
  notes          TEXT,
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  updated_at     TIMESTAMPTZ DEFAULT NOW()
);

-- Forklift pricing tiers per rate card (e.g. 1-4 lifts $75, 5-10 $65, 11+ $55)
CREATE TABLE rate_card_tiers (
  id           BIGSERIAL PRIMARY KEY,
  rate_card_id BIGINT REFERENCES rate_cards(id) ON DELETE CASCADE,
  from_count   INTEGER NOT NULL,
  to_count     INTEGER,           -- NULL means open-ended (e.g. 11+)
  price        NUMERIC(10,2) NOT NULL,
  sort_order   INTEGER DEFAULT 0
);

-- ── SHOWS ───────────────────────────────────────────────────
CREATE TABLE shows (
  id                    BIGSERIAL PRIMARY KEY,
  name                  TEXT NOT NULL,
  code                  TEXT UNIQUE,
  status                TEXT DEFAULT 'draft' CHECK (status IN ('draft','active','completed')),
  -- Organiser
  organiser_id          BIGINT REFERENCES organisers(id),
  show_contact_id       BIGINT REFERENCES org_contacts(id),
  -- Venue (references suppliers where type='venue')
  venue_id              BIGINT REFERENCES suppliers(id),
  -- Venue access (copied at time of show creation, may differ from supplier record)
  vc_name               TEXT,
  vc_role               TEXT,
  vc_phone              TEXT,
  vc_email              TEXT,
  dock                  TEXT,
  door                  TEXT,
  dropoff               TEXT,
  bdouble               BOOLEAN DEFAULT FALSE,
  semi                  BOOLEAN DEFAULT FALSE,
  forklift              BOOLEAN DEFAULT FALSE,
  -- Dates
  show_start            DATE,
  show_end              DATE,
  show_start_time       TIME,
  show_end_time         TIME,
  bump_in_start         DATE,
  bump_in_end           DATE,
  bump_out_start        DATE,
  bump_out_end          DATE,
  -- Pricing
  provider              TEXT,
  fork_payment          TEXT CHECK (fork_payment IN ('rate','free')),
  rate_card_id          BIGINT REFERENCES rate_cards(id),
  storage_payment       TEXT CHECK (storage_payment IN ('rate','free')),
  storage_price         NUMERIC(10,2),
  notes                 TEXT,
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);

-- Bump-in and bump-out day schedules for a show
CREATE TABLE show_bump_days (
  id          BIGSERIAL PRIMARY KEY,
  show_id     BIGINT REFERENCES shows(id) ON DELETE CASCADE,
  type        TEXT NOT NULL CHECK (type IN ('bump_in','bump_out')),
  date        DATE NOT NULL,
  start_time  TIME,
  end_time    TIME
);

-- Activity log for shows (tracks every create/update/delete)
CREATE TABLE show_logs (
  id          BIGSERIAL PRIMARY KEY,
  show_id     BIGINT REFERENCES shows(id) ON DELETE CASCADE,
  action      TEXT NOT NULL CHECK (action IN ('created','updated','deleted')),
  field       TEXT,
  old_value   TEXT,
  new_value   TEXT,
  created_by  TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── QUOTES ──────────────────────────────────────────────────
-- Structure to be finalised once Patrick completes the quote form prototype
CREATE TABLE quotes (
  id          BIGSERIAL PRIMARY KEY,
  show_id     BIGINT REFERENCES shows(id),
  status      TEXT DEFAULT 'draft' CHECK (status IN ('draft','sent','accepted','rejected')),
  notes       TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── AUTO-UPDATE TIMESTAMPS ──────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER organisers_updated_at  BEFORE UPDATE ON organisers  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER suppliers_updated_at   BEFORE UPDATE ON suppliers   FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER rate_cards_updated_at  BEFORE UPDATE ON rate_cards  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER shows_updated_at       BEFORE UPDATE ON shows       FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER quotes_updated_at      BEFORE UPDATE ON quotes      FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── ROW LEVEL SECURITY ──────────────────────────────────────
-- Only authenticated admin users can read/write these tables
ALTER TABLE organisers       ENABLE ROW LEVEL SECURITY;
ALTER TABLE org_contacts     ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers        ENABLE ROW LEVEL SECURITY;
ALTER TABLE supplier_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_cards       ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_card_tiers  ENABLE ROW LEVEL SECURITY;
ALTER TABLE shows            ENABLE ROW LEVEL SECURITY;
ALTER TABLE show_bump_days   ENABLE ROW LEVEL SECURITY;
ALTER TABLE show_logs        ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes           ENABLE ROW LEVEL SECURITY;

-- Authenticated users (admins) get full access
CREATE POLICY "Authenticated full access" ON organisers        FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated full access" ON org_contacts      FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated full access" ON suppliers         FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated full access" ON supplier_contacts FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated full access" ON rate_cards        FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated full access" ON rate_card_tiers   FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated full access" ON shows             FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated full access" ON show_bump_days    FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated full access" ON show_logs         FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated full access" ON quotes            FOR ALL TO authenticated USING (true) WITH CHECK (true);
