-- SparkSol Lead Tracking + Enquiry Flow

CREATE TABLE IF NOT EXISTS leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  restaurant_name TEXT,
  contact_name TEXT,
  phone TEXT NOT NULL,
  email TEXT,
  location TEXT,
  interested_in TEXT,
  interested_id TEXT,
  source TEXT DEFAULT 'whatsapp_direct',
  first_message TEXT,
  status TEXT DEFAULT 'new',
  notes TEXT DEFAULT '',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_leads_phone ON leads(phone);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);

CREATE TABLE IF NOT EXISTS conversations (
  phone TEXT PRIMARY KEY,
  step TEXT NOT NULL DEFAULT 'new',
  data TEXT DEFAULT '{}',
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS notifications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL,
  content TEXT,
  read INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS proposals (
  id TEXT PRIMARY KEY,
  restaurant_name TEXT,
  contact_name TEXT,
  phone TEXT,
  email TEXT,
  location TEXT,
  service_id TEXT,
  service_name TEXT,
  deliverables TEXT,
  exclusions TEXT,
  setup_price INTEGER,
  monthly_price INTEGER,
  amc_price INTEGER,
  timeline TEXT,
  custom_notes TEXT,
  status TEXT DEFAULT 'sent',
  source TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  viewed_at TEXT,
  call_scheduled_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_proposals_phone ON proposals(phone);
CREATE INDEX IF NOT EXISTS idx_proposals_status ON proposals(status);
