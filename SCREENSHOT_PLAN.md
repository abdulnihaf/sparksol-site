# Screenshot Capture & Processing Plan

## Source Screenshots Available

### WhatsApp (from ~/Desktop/Whatsapp Screenshot/) — 12 files, 622x1102px each
Copied to /tmp/wa-shots/ for processing.

| File | Content | Use For | Crop | Output Name |
|---|---|---|---|---|
| 8.26.27 | WA Business Profile — logo, catalog, photos | WhatsApp explainer: Business profile | Crop top 60px (status bar) | wa-01-profile.jpg |
| 8.26.43 | Business description — address, hours | WhatsApp explainer: Business info | Crop top 60px | wa-02-info.jpg |
| 8.29.11 | "Hi" → "What's it today?" + See Options | WhatsApp explainer: First interaction | Crop top 60px | wa-03-greeting.jpg |
| 8.29.22 | Options: Order, Book Table, Track, Hours, Call | WhatsApp explainer: Menu options | Crop top 60px | wa-04-options.jpg |
| 8.29.37 | Order tapped → catalog message appears | WhatsApp explainer: Ordering starts | Crop top 60px | wa-05-order-start.jpg |
| 8.29.52 | Product catalog — items, photos, prices | WhatsApp explainer: Menu catalog | Crop top 60px | wa-06-catalog.jpg |
| 8.30.03 | Item detail — Chicken Kabab, portion selector | WhatsApp explainer: Select item | Crop top 60px | wa-07-item.jpg |
| 8.31.31 | Cart — 1 item, ₹180, Place order button | WhatsApp explainer: Cart | Crop top 60px | wa-08-cart.jpg |
| 8.31.45 | Order confirmed in chat — order #, Review & pay | WhatsApp explainer: Confirmation | Crop top 60px | wa-09-confirmed.jpg |
| 8.31.55 | Order details — pending, ₹179.55, Continue | WhatsApp explainer: Payment | Crop top 60px | wa-10-payment.jpg |

### Custom Deployments (via Chrome MCP) — to capture
All are 16:9 desktop screenshots. Save at 1280x720px, JPEG 80%.

| URL | Content | Use For | Output Name |
|---|---|---|---|
| hamzaexpress.in/ops/waba-dashboard | WABA analytics | WhatsApp explainer: Owner dashboard | dash-waba.jpg |
| hamzaexpress.in/ops/leads | Lead tracker | WhatsApp explainer: Customer tracking | dash-leads.jpg |
| hamzaexpress.in/ops/sales | Sales insights | Sales/P&L explainer | dash-sales.jpg |
| hamzaexpress.in/ops/kitchen-intel | Kitchen command | Kitchen Display explainer | dash-kitchen.jpg |
| hamzaexpress.in/ops/settlement (PIN screen) | Settlement PIN | Cash Settlement explainer: Security | dash-settlement-pin.jpg |
| hamzaexpress.in/ops/inventory | Inventory (if accessible) | Inventory explainer | dash-inventory.jpg |
| hamzaexpress.in (homepage) | HE website | Website explainer | web-he.jpg |
| nawabichaihouse.com (homepage) | NCH website | Website explainer | web-nch.jpg |

### Google (via Chrome MCP)
| URL | Content | Use For | Output Name |
|---|---|---|---|
| Google Maps search "Hamza Express Bangalore" | GMB listing | Google Presence explainer | gmb-listing.jpg |
| Google Maps "biryani near me" results | Search results | Google Presence explainer | gmb-search.jpg |

### Instagram (via Chrome MCP)
| URL | Content | Use For | Output Name |
|---|---|---|---|
| instagram.com/hamzaexpressin | HE IG profile | Social Media explainer | ig-he.jpg |

### NCH Menu Photos (for product imagery)
| Source | Use For |
|---|---|
| nawabichaihouse.com menu/photos | Food photography examples for Social Media explainer |

## Processing Pipeline

1. Copy WA screenshots to /tmp/wa-shots/ ✅
2. Crop top 60px (status bar) from each WA screenshot
3. Resize to max 400px wide (mobile phone display size)
4. Convert to JPEG 80% quality
5. Save to /sparksol-site/assets/screenshots/
6. For desktop screenshots: capture at 1280x720, save as JPEG 80%
7. All final images go to /sparksol-site/assets/screenshots/

## Aspect Ratios

- Phone screenshots: 622x1042 after crop → display at 280x498 on page (in phone frame)
- Desktop screenshots: 1280x720 → display at 800x450 on page (in browser frame)
- Both wrapped in device mockup CSS frames

## Output Directory
/Users/nihaf/Documents/Tech/sparksol-site/assets/screenshots/

## Execution Order
1. Process all 10 WhatsApp screenshots (crop, resize, compress)
2. Capture all desktop screenshots via Chrome MCP (resize window to 1280x720 first)
3. Capture Google Maps and Instagram screenshots
4. Build WhatsApp explainer page with real images
5. Build remaining 11 explainer pages
6. Deploy
