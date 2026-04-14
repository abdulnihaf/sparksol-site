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
