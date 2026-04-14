# SparkSol — Proposal System Architecture

## The Two Customer Journeys

### Journey A: Website → Proposal → Call
```
1. Customer browses service page
2. Uses calculator to customize their plan
3. Clicks "Get Your Proposal" (instead of just "Talk to Us")
4. Small form appears: Name, Restaurant, Phone, Email
5. Personalized proposal PDF generated instantly
6. Sent to their WhatsApp + Email
7. Proposal includes "Schedule a Call" link
8. Customer books a call (Calendly/Cal.com)
9. Team confirms on call → sends invoice
```

### Journey B: WhatsApp Bot → Proposal → Call
```
1. Customer messages test number (from any CTA)
2. Bot asks: Restaurant name → Location → Service needed
3. Bot shows interactive list of specific plans within that service
4. Customer selects plan + customizations
5. Bot asks: Email (for proposal)
6. Proposal PDF generated and sent via WhatsApp + Email
7. Bot sends "Schedule a Call" button
8. Customer books call
```

## The Proposal Document

### What It Contains (1-2 pages)

**Page 1: Cover + Service Summary**
```
┌──────────────────────────────────────────────┐
│                                              │
│  ✦ SparkSol                                  │
│  Restaurant Technology Services              │
│                                              │
│  ─────────────────────────────────────────   │
│                                              │
│  PROPOSAL FOR                                │
│  [Restaurant Name]                           │
│  [Location, Bangalore]                       │
│                                              │
│  Prepared on [Date]                          │
│  Valid for 30 days                           │
│                                              │
│  ─────────────────────────────────────────   │
│                                              │
│  SERVICE: Social Media Management            │
│                                              │
│  What You Get:                               │
│  ✓ 20 Instagram/Facebook posts per month     │
│  ✓ 10 Instagram stories per month            │
│  ✓ Content calendar shared monthly           │
│  ✓ Community management (DM replies)         │
│  ✓ Monthly analytics report                  │
│                                              │
│  What's Not Included:                        │
│  ✗ Reels/video production                    │
│  ✗ Paid advertising (available as add-on)    │
│  ✗ Photography reshoots                      │
│                                              │
│  ─────────────────────────────────────────   │
│                                              │
│  PRICING                                     │
│                                              │
│  One-time setup:     ₹14,999                 │
│  Monthly recurring:  ₹12,999/month           │
│                                              │
│  First month total:  ₹27,998                 │
│  (Setup + first month)                       │
│                                              │
│  Includes: Brand kit, page creation,         │
│  content strategy, first 9 posts             │
│                                              │
│  ─────────────────────────────────────────   │
│                                              │
│  TIMELINE                                    │
│  Setup: 10 working days                      │
│  First post: Day 11                          │
│                                              │
│  ─────────────────────────────────────────   │
│                                              │
│  NEXT STEP                                   │
│  Schedule a 15-minute call with our team:    │
│  [Schedule Call Button/Link]                 │
│                                              │
│  Or message us: wa.me/15559090227            │
│                                              │
│  ─────────────────────────────────────────   │
│                                              │
│  SparkSol Hospitality Pvt Ltd                │
│  CIN: U74999KA2019PTC122300                  │
│  Bangalore, India | sparksol.in              │
│                                              │
└──────────────────────────────────────────────┘
```

### Design Specifications
- **Format:** PDF (generated server-side) OR HTML page (shareable link)
- **Brand colors:** Amber #C05621, Dark #121219, Green #228B54
- **Font:** Inter
- **Logo:** SparkSol spark icon + wordmark
- **Size:** A4 portrait
- **File size:** Under 500KB

### HTML Proposal (Preferred over PDF)
Instead of generating a PDF, create a **unique URL** per proposal:
`sparksol.in/proposal/abc123`

This is better because:
1. No PDF generation complexity
2. Customer can view on any device instantly
3. Can include interactive elements (Schedule Call button)
4. Can track if they opened it
5. Can be shared via WhatsApp link message (no attachment needed)
6. Can be updated if pricing changes before call

### Data Model (D1)
```sql
CREATE TABLE proposals (
  id TEXT PRIMARY KEY,  -- short unique ID like "abc123"
  restaurant_name TEXT,
  contact_name TEXT,
  phone TEXT,
  email TEXT,
  location TEXT,
  service_id TEXT,      -- e.g., "social_s2", "whatsapp_w1"
  service_name TEXT,
  deliverables TEXT,    -- JSON array of what's included
  exclusions TEXT,      -- JSON array of what's not included
  setup_price INTEGER,
  monthly_price INTEGER,
  amc_price INTEGER,
  timeline TEXT,
  custom_notes TEXT,
  status TEXT DEFAULT 'sent',  -- sent, viewed, call_scheduled, closed_won, closed_lost
  source TEXT,          -- website_calculator, whatsapp_bot
  created_at TEXT DEFAULT (datetime('now')),
  viewed_at TEXT,
  call_scheduled_at TEXT
);
```

## Website Integration

### On Calculator Pages
Current CTA: "Talk to Us on WhatsApp →"
New CTA flow:
1. Customer uses calculator to select plan
2. Below the price summary, show: "Get Your Personalized Proposal"
3. Click opens a small inline form:
   - Your name
   - Restaurant name
   - Phone (WhatsApp)
   - Email
4. Submit → proposal page generated → link sent to WhatsApp + email
5. Page shows: "✅ Proposal sent to your WhatsApp! Check your messages."

### On Non-Calculator Pages (Fixed Bundles)
Each bundle card gets a secondary CTA:
- Primary: "Get Started" / "Free Assessment" (WhatsApp)
- Secondary: "Get Proposal" (generates proposal for that specific bundle)

## WhatsApp Bot Integration

After the bot captures restaurant name, location, and service interest:
1. Bot shows specific plans within that service (interactive list)
2. Customer selects a plan
3. Bot asks for email
4. Bot generates proposal and sends the link:
   "Here's your personalized proposal for [Service]:
    sparksol.in/proposal/abc123
    
    Review the details and schedule a call when ready.
    [Schedule a Call] button"
