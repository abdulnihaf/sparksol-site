# Pricing Calculator — Customer Experience Architecture

## The Problem With Fixed Plans

Current service pages show: "S2 — Social Media Management — Rs 14,999 setup + Rs 12,999/month — includes 20 posts, 10 stories, community management, analytics."

A restaurant owner thinks: "But I only want 12 posts. Why am I paying for 20?"
Or: "I want 30 posts. Do I have to upgrade to S3 which costs Rs 24,999 and includes ads I don't need?"

Fixed plans force the customer into OUR structure. The calculator lets them build THEIR plan.

## How a Restaurant Owner Thinks

They DON'T think: "I want 20 Instagram posts per month."
They think: "I want my Instagram to look active. How much does that cost?"

So the calculator can't just be sliders. It needs to TRANSLATE between their thinking and our units.

**Their language → Our units:**
- "I want active social media" → minimum 15 posts + 5 stories/month
- "I want it to look really good" → 20 posts + 8 stories + 2 reels/month
- "I want to dominate Instagram" → 30 posts + 15 stories + 4 reels + ads

## The Calculator Architecture

### Option A: Slider-Based (Technical)
Customer moves sliders for each unit type. Sees price change in real-time.
**Problem:** Restaurant owners don't know if they need 15 or 20 posts. The choice paralyzes them.

### Option B: Pre-Set + Customize (BEST)
1. Show 2-3 pre-set packages (like current bundles) as the DEFAULT
2. Add a "Customize" button that OPENS the slider view
3. Customer starts from a pre-set, then adjusts up/down
4. Price updates as they move sliders

**This way:** The non-technical owner picks a package. The detail-oriented owner customizes.

### Option C: Question-Based
"How active do you want your social media?"
Light / Active / Very Active / Maximum
Each option maps to specific unit counts.
**Problem:** Feels like a quiz. Restaurant owners want to see numbers and prices, not answer questions.

## DECISION: Option B — Pre-Set + Customize

### How It Works on the Page

```
┌──────────────────────────────────────────────────────┐
│ Social Media Management                               │
│                                                       │
│ Choose a plan, or customize your own:                 │
│                                                       │
│ ┌─────────────┐ ┌═════════════┐ ┌─────────────┐     │
│ │   Starter   │ ║  Standard   ║ │   Premium   │     │
│ │  12 posts   │ ║  20 posts   ║ │  30 posts   │     │
│ │  5 stories  │ ║  10 stories ║ │  15 stories │     │
│ │  —          │ ║  —          ║ │  4 reels    │     │
│ │             │ ║             ║ │  Ads mgmt   │     │
│ │  Rs 8,450   │ ║  Rs 12,999  ║ │  Rs 24,999  │     │
│ │  /month     │ ║  /month ★   ║ │  /month     │     │
│ │  [Select]   │ ║  [Selected] ║ │  [Select]   │     │
│ └─────────────┘ └═════════════┘ └─────────────┘     │
│                                                       │
│ [▼ Customize your plan]                               │
│                                                       │
│ ─── When "Customize" is clicked: ───                  │
│                                                       │
│ Instagram/FB Posts     ─────●──────────  20/month     │
│                        10  15  20  25  30              │
│                        Rs 650/post → Rs 585/post      │
│                                                       │
│ Instagram Stories      ─────●──────────  10/month     │
│                        0   5   10  15  20              │
│                        Rs 350/story                    │
│                                                       │
│ Instagram Reels        ●───────────────  0/month      │
│                        0   2   4   6   8               │
│                        Rs 3,000/reel                   │
│                                                       │
│ ☐ Add Community Management (+Rs 3,000/mo)             │
│ ☐ Add Ads Management (+Rs 5,000/mo)                   │
│ ☐ Add Monthly Analytics Report (+Rs 2,000/mo)         │
│                                                       │
│ ┌─────────────────────────────────────┐               │
│ │ YOUR PLAN                           │               │
│ │                                     │               │
│ │ 20 posts × Rs 585    Rs 11,700     │               │
│ │ 10 stories × Rs 350  Rs 3,500      │               │
│ │ Content calendar      Rs 2,000      │               │
│ │ ──────────────────────────────      │               │
│ │ Monthly total         Rs 17,200     │               │
│ │                                     │               │
│ │ 💡 Get the Standard bundle at       │               │
│ │    Rs 12,999/month (save Rs 4,201)  │               │
│ │                                     │               │
│ │ ── Market comparison ──             │               │
│ │ Freelancer would charge:            │               │
│ │ Rs 21,000 — 45,000/month            │               │
│ │ You save: 20-62%                    │               │
│ │                                     │               │
│ │ [Talk to Us on WhatsApp →]          │               │
│ └─────────────────────────────────────┘               │
└──────────────────────────────────────────────────────┘
```

## Key UX Decisions

### 1. Pre-sets are ALWAYS visible first
The calculator doesn't replace the bundles. It EXTENDS them. Default view = 3 packages. "Customize" is an expandable section below.

### 2. Bundle recommendation is always shown
When the customer customizes, the calculator ALWAYS checks: "Is there a bundle that covers what you selected for less?" If yes, show it prominently. This drives bundle sales while still giving flexibility.

### 3. Per-unit price shows the DISCOUNT
As the slider moves right, the per-unit price drops visually. The old price is struck through:
"Rs ~~650~~ 585/post (10% volume discount)"

### 4. Market comparison is always visible
A sidebar or bottom section shows: "A freelancer would charge Rs X-Y for this. You save Z%."

### 5. Setup fee shown SEPARATELY
Monthly recurring and one-time setup are clearly split:
"Setup: Rs 14,999 (one-time) | Monthly: Rs 12,999"

### 6. WhatsApp CTA is the action
No "Add to Cart." The CTA is always "Talk to Us on WhatsApp" with the custom plan details pre-filled in the message.

### 7. Mobile-first slider design
Sliders must work on mobile. Large touch targets (44px+). Price updates instantly. No lag.

## Which Service Pages Get Calculators

NOT every service needs a calculator. Only services with customizable quantities:

| Service | Calculator? | Customizable Elements |
|---------|------------|----------------------|
| Social Media | YES | Posts, stories, reels, add-ons |
| Google Presence | YES | Posts, review responses, add-ons |
| WhatsApp Marketing | YES | Campaigns, add-ons |
| Photography (AI) | YES | Number of dishes |
| Photography (Real) | YES | Number of dishes, style |
| Hiring | YES | Number of roles, platforms |
| Design | YES | Number of SKUs/pages |
| Website | NO | Fixed scope |
| POS | NO | Fixed scope + config options |
| KDS | NO | Fixed scope + config options |
| Settlement | NO | Fixed scope |
| Inventory | NO | Fixed scope + tier selection |
| P&L | NO | Fixed scope |
| Staff | NO | Fixed scope + config options |

**7 service pages get calculators. 7 keep fixed pricing.**

## Implementation Plan

1. Build a single `calculator.js` that handles all 7 services
2. Each service page includes `<div id="calculator" data-service="social">` 
3. The JS reads the data-service attribute and renders the right sliders
4. All pricing data is in a single JSON object (no API calls)
5. Calculator is a collapsible section below the bundle cards
6. Pre-filled WhatsApp message includes the custom plan details

## Design in Figma First

Before building, create the calculator UI in Figma:
1. Desktop layout (800px content width)
2. Mobile layout (375px)
3. Slider component
4. Price summary card
5. Bundle recommendation card
6. Add-on toggles
7. Market comparison sidebar
