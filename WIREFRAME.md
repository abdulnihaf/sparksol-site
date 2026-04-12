# SparkSol Homepage — View-by-View Wireframe

Every "view" = what the user sees at ONE scroll position without scrolling further.
Planned for both desktop (1280px) and mobile (375px).

---

## VIEW 1: First Impression (Above the Fold)

**What user must understand in 3 seconds:** "This company sets up technology for restaurants in Bangalore."
**What user must feel:** Professional, warm, trustworthy — "these people know restaurants."

### Desktop Layout (1280px)
```
┌──────────────────────────────────────────────────────────────────┐
│ ▄ SparkSol        Services  Pricing  About  Blog   [Talk to Us] │
│ (frosted glass nav, border-bottom, sticky)                       │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  [For Restaurants & Cafes]           ┌─────────────────────┐     │
│                                      │                     │     │
│  Your restaurant                     │   HERO VISUAL       │     │
│  deserves better                     │                     │     │
│  technology.                         │   NOT a generic     │     │
│                                      │   illustration.     │     │
│  We handle Google, Instagram,        │                     │     │
│  WhatsApp ordering, billing,         │   USE: A device     │     │
│  kitchen screens, inventory.         │   mockup showing    │     │
│  You focus on food.                  │   ACTUAL SparkSol   │     │
│                                      │   dashboard or a    │     │
│  [🟢 Talk to Us on WhatsApp]         │   composite of      │     │
│  See Pricing →                       │   phone + tablet +  │     │
│                                      │   TV screens with   │     │
│  We respond in 4 hours.              │   realistic UI.     │     │
│                                      └─────────────────────┘     │
│                                                                  │
│  ───── Trusted by restaurants in Bangalore ─────                 │
│  [HE logo]  [NCH logo]  4.8★ & 4.9★ on Google  600+ deployments │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

**Design notes:**
- Nav: frosted glass (backdrop-filter blur), white with 60% opacity, sticky
- Hero headline: 48px, Inter Bold, dark. NO line breaks forced — let it flow naturally.
- Hero subtext: 17px, Inter Regular, gray-500
- Primary CTA: Green (#228B54), large, WhatsApp icon, pill shape
- Secondary CTA: Text link, amber, with arrow
- Hero visual: RIGHT SIDE. Must be high-quality. Options:
  1. BEST: Composite device mockup (phone showing WhatsApp order, tablet showing POS, TV showing KDS) — rendered in realistic device frames
  2. GOOD: A warm restaurant photo with a subtle tech overlay (dashboard floating above)
  3. ACCEPTABLE: The isometric illustration (current) but at much higher quality
- Trust bar: Below hero, subtle, shows logos of HE + NCH + aggregate stats. This replaces a separate "social proof" section.
- Background: Pure white. NO gradient. Clean.

### Mobile Layout (375px)
```
┌─────────────────────────┐
│ ▄ SparkSol         ≡    │
├─────────────────────────┤
│                         │
│ [For Restaurants & Cafes]│
│                         │
│ Your restaurant         │
│ deserves better         │
│ technology.             │
│                         │
│ We handle Google,       │
│ Instagram, WhatsApp...  │
│                         │
│ [🟢 Talk to Us WhatsApp]│
│ See Pricing →           │
│                         │
│ ┌─────────────────────┐ │
│ │   HERO VISUAL       │ │
│ │   (smaller, centered)│ │
│ └─────────────────────┘ │
│                         │
│ HE 4.8★ · NCH 4.9★     │
│ 600+ deployments        │
│                         │
├─────────────────────────┤
│ 🟢 Talk to Us WhatsApp  │ ← sticky bottom bar
└─────────────────────────┘
```

**Mobile notes:**
- Headline: 28-32px, centered
- CTA: Full width, stacked
- Hero visual: Below text, centered, max 280px wide
- Trust bar: Simplified — just stars + one line
- Sticky bottom CTA: Fixed, green, 56px height

---

## VIEW 2: The Problem (First Scroll)

**What user must understand:** "They understand my exact problems."
**What user must feel:** "Yes, this is what I deal with every day."

### Desktop
```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│  ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐ │
│  │ 🔍               │ │ 💸               │ │ ⏰               │ │
│  │                  │ │                  │ │                  │ │
│  │ Customers can't  │ │ Platforms eat    │ │ You find out     │ │
│  │ find you         │ │ your profit      │ │ problems too late│ │
│  │                  │ │                  │ │                  │ │
│  │ Someone searches │ │ Swiggy takes 25%.│ │ Cash doesn't     │ │
│  │ "biryani near me"│ │ Your regulars    │ │ match. Stock     │ │
│  │ Your competitor  │ │ still order there│ │ runs out. You    │ │
│  │ shows up.        │ │ — you lose Rs 50 │ │ know profit at   │ │
│  │ You don't.       │ │ on every order.  │ │ month-end only.  │ │
│  └──────────────────┘ └──────────────────┘ └──────────────────┘ │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

**Design notes:**
- Background: Subtle warm gradient — NOT flat white. Use: linear-gradient from #FAFAF7 to #FFF) or a very faint amber tint
- Cards: White, 1px border (#F1F1F3), 12px radius, subtle shadow on hover
- Icons: NOT line art. Use FILLED icons with amber background circles. Each icon should be distinctive and recognizable at 48px.
  - Card 1: Magnifying glass with X (can't find)
  - Card 2: Coins falling through a sieve (money leaking)
  - Card 3: Clock with warning triangle (too late)
- Text: Heading 18px Bold, body 14px Regular gray-500
- Hover: Card lifts slightly (translateY -4px), shadow increases
- Scroll reveal: Cards fade in from bottom with 100ms stagger

---

## VIEW 3: Services (Second Scroll)

**What user must understand:** "They do these specific things. I can pick what I need."
**What user must feel:** Clarity, not overwhelm. "I see the thing I need."

### Desktop
```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│  WHAT WE DO                                                      │
│  Everything your restaurant needs.                               │
│  Pick what matters to you.                                       │
│                                                                  │
│  ── Get More Customers ─────────────────────────────────────     │
│                                                                  │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐        │
│  │ 📍     │ │ 📸     │ │ 💬     │ │ 🛵     │ │ 🌐     │        │
│  │ Google │ │ Social │ │ WA     │ │ Platf  │ │ Web    │        │
│  │ From   │ │ From   │ │ From   │ │ From   │ │ From   │        │
│  │ ₹4,999 │ │₹14,999 │ │₹24,999 │ │ ₹5,999 │ │ ₹3,999 │        │
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘        │
│                                                                  │
│  ── Run Better Operations ──────────────────────────────────     │
│                                                                  │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐        │
│  │ 💳     │ │ 📺     │ │ 💰     │ │ 📦     │ │ 📊     │        │
│  │ POS    │ │ KDS    │ │ Cash   │ │ Stock  │ │ Profit │        │
│  │ From   │ │ From   │ │ From   │ │ From   │ │ From   │        │
│  │₹29,999 │ │₹14,999 │ │₹19,999 │ │₹19,999 │ │₹24,999 │        │
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘        │
│                                                                  │
│  ┌────────┐ ┌────────┐                                          │
│  │ 👥     │ │ 📋     │                                          │
│  │ Staff  │ │ Hiring │                                          │
│  │ From   │ │ From   │                                          │
│  │₹29,999 │ │ ₹6,999 │                                          │
│  └────────┘ └────────┘                                          │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

**CRITICAL DESIGN DECISION: Should services be shown as cards or as a compact list?**

**Cards (current):** Visual, scannable, but 12 cards = overwhelming.
**List:** Compact, professional, but less visual.
**Hybrid (BEST):** Show services as a COMPACT GRID with icon + name + price only. NO descriptions on homepage. The description lives on the service page. This reduces visual noise dramatically.

Each service card on homepage should be:
- 48px icon (filled, amber background circle)
- Service name (16px, Bold)
- Starting price badge (12px, amber-light background)
- Click → goes to service page
- NO description text on the homepage card

This way 12 cards fit in 2 rows without scrolling, and the page doesn't feel overwhelming.

### Mobile
- 2 cards per row (compact)
- Or vertical list with icon + name + price per row

---

## VIEW 4: Packs (Third Scroll)

**What user must understand:** "If I'm not sure what to pick, these packages bundle things together."
**What user must feel:** "This simplifies my decision."

### Desktop
```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│  Background: Subtle warm gradient section                        │
│                                                                  │
│  NOT SURE WHERE TO START?                                        │
│  Pick a pack. Save money.                                        │
│                                                                  │
│  ┌─────────┐ ┌═══════════┐ ┌─────────┐ ┌─────────┐             │
│  │ Starter │ ║  Growth   ║ │ Ops     │ │ All-In  │             │
│  │         │ ║ ★ POPULAR ║ │         │ │         │             │
│  │ ₹24,999 │ ║ ₹69,999   ║ │₹1.25L  │ │₹2.2L   │             │
│  │ one-time│ ║ + ₹15K/mo ║ │ + ₹40K/y│ │ + both │             │
│  │         │ ║           ║ │         │ │         │             │
│  │ • Google│ ║ • Google  ║ │ • POS   │ │ • All  │             │
│  │ • Social│ ║ • Social  ║ │ • KDS   │ │ Growth │             │
│  │ • QR    │ ║ • WhatsApp║ │ • Cash  │ │ • All  │             │
│  │ • Swiggy│ ║ • Platform║ │ • Stock │ │ Ops    │             │
│  │         │ ║ • Website ║ │ • P&L   │ │ • Staff│             │
│  │ Save ₹5K│ ║ Save ₹16K ║ │Save ₹34K│ │Save₹55K│             │
│  │         │ ║           ║ │         │ │         │             │
│  │[Get Pk] │ ║[Assess't] ║ │[Assess] │ │[Propsl]│             │
│  └─────────┘ └═══════════┘ └─────────┘ └─────────┘             │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

**Design notes:**
- Background: NOT white. Use a subtle warm gradient (e.g., #FDF8F4 to #FAFAF7) to differentiate from services section above
- Featured card (Growth): Double-height border in amber, slight elevation, "Most Popular" badge
- Price display SIMPLIFIED:
  - Starter: "₹24,999" (one number, no suffix needed — it's one-time)
  - Growth: "₹69,999 setup" on one line, "then ₹14,999/month" on second line (two separate lines, smaller text)
  - Operations: "₹1.25L setup" (use lakhs notation — restaurant owners think in lakhs), "then ₹40K/year"
  - All-In-One: "₹2.2L setup" + "then ₹15K/mo + ₹40K/yr"
- Savings: Green badge, prominent
- CTA colors match the CTA type system (green = direct, amber = consultation, outline = proposal)

---

## VIEW 5: Proof (Fourth Scroll)

**What user must understand:** "These people actually run restaurants. This is not theory."
**What user must feel:** Trust, confidence, "I should talk to them."

### Desktop
```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│  WE RUN RESTAURANTS TOO.                                         │
│  Every system we sell runs live at our own outlets.              │
│                                                                  │
│  ┌─────────────────────────────┐ ┌─────────────────────────────┐ │
│  │ [PHOTO: HE interior]       │ │ [PHOTO: NCH interior]       │ │
│  │  aspect: 16:9, full-width  │ │  aspect: 16:9, full-width  │ │
│  │  height: 220px crop        │ │  height: 220px crop        │ │
│  │                             │ │                             │ │
│  │  Hamza Express              │ │  Nawabi Chai House          │ │
│  │  QSR Biryani · Shivajinagar│ │  Irani Chai · 24 Hours     │ │
│  │                             │ │                             │ │
│  │  4.8★   145+  39   304     │ │  4.9★   168+  24hr  305    │ │
│  │  rating reviews APIs deploys│ │  rating reviews ops  deploys│ │
│  │                             │ │                             │ │
│  │  "All running live daily."  │ │  "Full ops — 24hrs."       │ │
│  └─────────────────────────────┘ └─────────────────────────────┘ │
│                                                                  │
│  Visit our restaurants in Shivajinagar and see these systems.    │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

**Design notes:**
- Photos: Use the AI-generated mid-premium restaurant images. They represent the TYPE of restaurant SparkSol serves, even if they're not exact HE/NCH photos. Later replace with actual photos.
- Photo treatment: 16:9 crop, rounded top corners, 220px height on desktop
- Stats: Grid of 4, each with large amber number + small gray label
- Card background: White with subtle border
- This section should feel substantial — it's SparkSol's biggest differentiator

**IMPORTANT: When we have actual photos of HE and NCH, replace the AI images immediately. AI images are placeholder for launch.**

---

## VIEW 6: How It Works + Final CTA (Last Scroll)

**What user must understand:** "Getting started is easy — 4 steps."
**What user must feel:** "I should message them now."

### Desktop
```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│  HOW IT WORKS                                                    │
│  4 steps. That's it.                                             │
│                                                                  │
│  ① Browse ──→ ② Message ──→ ③ Quick Call ──→ ④ We Set It Up     │
│  See services   WhatsApp us   15 min call     Live in 5-15 days  │
│  with prices    your name     right plan      you do nothing     │
│                                                                  │
│  ──────────────────────────────────────────────────────────────  │
│                                                                  │
│  Every price is on this website.                                 │
│  No "contact us for pricing." No hidden fees.                    │
│  [See All Pricing →]                                             │
│                                                                  │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ██████████████████████████████████████████████████████████████  │
│  █                                                            █  │
│  █  Ready to make your restaurant run better?                 █  │
│  █                                                            █  │
│  █  Message us on WhatsApp. No pressure.                      █  │
│  █  No follow-up calls you didn't ask for.                    █  │
│  █                                                            █  │
│  █  [🟢 Talk to Us on WhatsApp]                               █  │
│  █                                                            █  │
│  █  Or call: +91 8008002049                                   █  │
│  █                                                            █  │
│  ██████████████████████████████████████████████████████████████  │
│                                                                  │
│  FOOTER                                                          │
└──────────────────────────────────────────────────────────────────┘
```

**Design notes:**
- How It Works: HORIZONTAL on desktop with connecting arrows/lines between steps. Numbered circles in amber.
- Pricing transparency: Brief section between How It Works and Final CTA
- Final CTA: Dark background section (var(--dark)) with white text, centered. Large green CTA button. Phone number below. This creates visual contrast and signals "this is the end, take action."
- Footer: Standard footer, clean, links organized in columns

---

## CSS ENHANCEMENTS FOR PREMIUM FEEL

1. **Scroll reveal animations:**
   - Each section fades in and slides up 20px on scroll
   - Cards stagger with 100ms delay between each
   - Use Intersection Observer (vanilla JS, no library)

2. **Frosted glass nav:**
   - `backdrop-filter: blur(12px); background: rgba(255,255,255,0.85);`

3. **Gradient section backgrounds:**
   - Problem section: very subtle warm tint
   - Packs section: subtle warm gradient
   - Final CTA: dark (#121219)

4. **Hover micro-interactions:**
   - Service cards: lift + border-color change + shadow
   - Pack cards: lift + shadow
   - CTA buttons: lift + shadow + slight scale

5. **Connecting elements:**
   - How It Works steps connected by a subtle line or dotted path
   - Service categories separated by thin amber accent lines

6. **Image treatments:**
   - Proof photos: slight rounded corners, subtle shadow
   - Hero illustration: no border, floats naturally

---

## PAGE WEIGHT BUDGET

For "fastest possible load":
- HTML: < 50KB
- CSS: inline (< 15KB)
- JS: inline (< 5KB) — only scroll reveal + nav toggle
- Images: hero PNG < 200KB (compress), proof PNGs < 150KB each (compress)
- Fonts: Inter (preloaded, < 100KB for 4 weights)
- Total: < 700KB
- Target load time: < 1.5 seconds on 4G

**Image optimization:** All PNGs must be compressed before deployment. Use tinypng or similar.

---

## EXECUTION ORDER

1. Compress all images (hero, HE, NCH) to web-optimized sizes
2. Rebuild index.html with this exact wireframe
3. Add scroll reveal JS
4. Test on desktop (1280px) and mobile (375px)
5. Fix any issues
6. Screenshot each view and verify against this wireframe
7. Then move to service pages
