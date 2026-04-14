// SparkSol — Service Cross-Map Engine
// Shared data: service definitions, cross-sell relationships, customizable fields
// Used by: pricing.html (frontend), proposal.js (backend), whatsapp.js (bot)

const SERVICES_MAP = {
  // ═══════════════════════════════════════════════════════════════
  // CATEGORY: GOOGLE PRESENCE
  // ═══════════════════════════════════════════════════════════════
  google_g1: {
    id: 'google_g1',
    name: 'Google Maps Listing',
    category: 'google',
    categoryLabel: 'Google Presence',
    painPoint: "Customers can't find us on Google",
    tagline: 'Get found when people search nearby',
    paymentType: 'one-time',
    setup: 4999, monthly: 0, amc: 0,
    timeline: '5 working days',
    problemHeadline: "People search. You don't show up.",
    problemLines: [
      "Every day, hundreds of people in your area search for food on Google Maps. If your restaurant isn't there — or shows outdated info, no photos, no menu — they scroll past you to your competitor.",
      "The worst part? You might already have a listing that someone else created with wrong hours and a blurry photo. That's worse than not showing up at all.",
    ],
    deliverables: [
      'Google Business Profile created and verified',
      '30+ food photos uploaded',
      'Full menu with prices',
      'Correct hours, categories, contact',
      'Review collection QR codes (5 standees)',
      'Login credentials + guide handed over',
    ],
    exclusions: ['Ongoing posting', 'Review reply management', 'Google Ads'],
    steps: [
      ['We claim or create your listing', 'We verify your Google Business Profile, fix any duplicate/incorrect listings, and set up categories, hours, and contact correctly.'],
      ['Photos and menu go up', 'We upload 30+ professional food photos, your full menu with prices, and all business details.'],
      ['Review system installed', 'We create QR standees for your tables and counter that make it easy for happy customers to leave a review.'],
      ['Handover', 'You get the login, a 1-page guide, and full ownership. Done.'],
    ],
    theyProvide: ['Access to restaurant (for photos if needed)', 'Menu with current prices', '15 minutes for verification call from Google'],
    weHandle: ['Listing creation and verification', 'Photo upload and optimization', 'Menu formatting', 'QR standee design', 'Category and SEO setup'],
    suggests: [
      { id: 'social_s1', reason: "Your Google listing drives people to Instagram — make sure it's set up properly" },
      { id: 'photo_ph1', reason: "Better photos on Google = more clicks. AI food photography gets you there fast" },
      { id: 'google_g2', reason: "Listing alone gets you found. Add management to grow reviews and keep it active" },
    ],
    customizableFields: [],
  },

  google_g2: {
    id: 'google_g2',
    name: 'Google Presence Management',
    category: 'google',
    categoryLabel: 'Google Presence',
    painPoint: "We have a listing but no reviews or activity",
    tagline: 'Grow reviews, post weekly, rank higher',
    paymentType: 'monthly',
    setup: 7999, monthly: 4999, amc: 0,
    timeline: 'Setup: 5 days, ongoing from month 1',
    problemHeadline: "A dead listing is worse than no listing.",
    problemLines: [
      "You have a Google listing. But it has 12 reviews from 2 years ago, no recent photos, and zero posts. Google sees that as inactive — and ranks you lower.",
      "Meanwhile, the restaurant down the street has 200 reviews, weekly posts, and fresh photos. Guess who shows up first when someone searches 'biryani near me'?",
    ],
    deliverables: [
      'Everything in Google Maps Listing setup',
      '4 Google Business Posts/month',
      'Review growth system (QR + staff training)',
      'All reviews replied within 24hrs',
      'Monthly performance report',
      'Quarterly listing audit',
    ],
    exclusions: ['Google Ads', 'Social media posting', 'Website'],
    steps: [
      ['Audit and fix your listing', 'We audit your current profile, fix errors, upload fresh photos, and install the review system.'],
      ['Weekly posts go live', 'Every week, a branded post (offer, dish highlight, event) goes up on your Google profile — visible to anyone who finds you.'],
      ['Reviews start growing', 'Our QR system + staff training gets happy customers to leave 5-star reviews consistently. We reply to every single one.'],
      ['Monthly report', 'You see how many people found you, clicked for directions, called, and visited — plus review growth.'],
    ],
    theyProvide: ['Access to Google Business Profile', 'Any specific offers to promote', 'Brief staff on review QR process'],
    weHandle: ['All Google posting and scheduling', 'Review monitoring and replies', 'QR standee design and setup', 'Monthly analytics and reporting'],
    suggests: [
      { id: 'google_g3', reason: "Organic growth is great. Ads put you at the top instantly for 'biryani near me' searches" },
      { id: 'social_s2', reason: "People who find you on Google check your Instagram next. Keep both active" },
    ],
    customizableFields: [
      { field: 'posts_per_month', label: 'Google posts per month', options: [4, 8], default: 4 },
    ],
  },

  google_g3: {
    id: 'google_g3',
    name: 'Google Presence + Ads',
    category: 'google',
    categoryLabel: 'Google Presence',
    painPoint: "I want to appear first on Google search",
    tagline: 'Listing + reviews + ads = top of search',
    paymentType: 'monthly',
    setup: 9999, monthly: 9999, amc: 0,
    timeline: 'Setup: 7 days, ads live within 48hrs',
    problemHeadline: "Your competitors are paying to be first. Are you?",
    problemLines: [
      "When someone searches 'biryani near me' or 'cafe in Koramangala', the top results are paid ads. If you're not there, you're invisible to the most ready-to-buy customers.",
      "Google Ads for restaurants isn't about big budgets. It's about showing up at the exact moment someone is hungry and searching. Rs 10,000/month can bring 200+ clicks from people within 4km of your restaurant.",
    ],
    deliverables: [
      'Everything in Presence Management',
      'Google Search Ads campaign',
      'Keyword research + location targeting',
      'Monthly ads report with CPA and ROAS',
      'Conversion tracking (calls, directions, clicks)',
    ],
    exclusions: ['Ad spend (paid to Google, min Rs 10K/month recommended)', 'Social media ads'],
    steps: [
      ['Listing + reviews setup', 'We set up and optimize your Google profile with photos, menu, and review system.'],
      ['Ads campaign built', 'We research keywords, set location targeting (your area + 4km radius), and create compelling ad copy.'],
      ['Ads go live', 'Within 48 hours of setup, your restaurant shows at the top when people search nearby. We monitor and optimize daily.'],
      ['Monthly review', 'You get a clear report: how much spent, how many clicks, how many calls/directions — and what we're improving.'],
    ],
    theyProvide: ['Google Business Profile access', 'Monthly ad budget (paid to Google directly)', 'Any specific offers to run'],
    weHandle: ['Campaign setup and management', 'Keyword research and targeting', 'Ad copy and extensions', 'Conversion tracking', 'Monthly reporting and optimization'],
    suggests: [
      { id: 'social_s2', reason: "Ads bring traffic. Social media keeps them engaged and coming back" },
    ],
    customizableFields: [
      { field: 'monthly_ad_budget', label: 'Monthly ad budget (to Google)', options: [10000, 15000, 25000], default: 10000 },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY: SOCIAL MEDIA
  // ═══════════════════════════════════════════════════════════════
  social_s1: {
    id: 'social_s1',
    name: 'Social Media Setup + Photos',
    category: 'social',
    categoryLabel: 'Social Media',
    painPoint: "We're not on Instagram / our pages look bad",
    tagline: 'Professional pages + food photos, done once',
    paymentType: 'one-time',
    setup: 14999, monthly: 0, amc: 0,
    timeline: '10 working days',
    problemHeadline: "No Instagram? That's invisible to anyone under 35.",
    problemLines: [
      "People check Instagram before they check Google. If you don't have a page — or it has 3 blurry photos from 2021 — you've lost them before they even tried your food.",
      "Setting up a professional brand presence isn't just about posting. It's about the right identity, the right photos, and the right first impression.",
    ],
    deliverables: [
      'Instagram & Facebook pages with brand identity',
      'First 9 posts designed and published',
      'Up to 40 AI food photos (styled + white background)',
      'Brand kit: logo treatment, colors, fonts',
      'Content pillars defined',
      'All assets + credentials handed over',
    ],
    exclusions: ['Ongoing posting', 'Reels/video', 'Ads', 'Photo reshoots if menu changes'],
    steps: [
      ['Brand identity session', 'We understand your restaurant\'s vibe, colors, and personality. No questionnaire — just a 15-minute conversation.'],
      ['Food photos generated', 'Up to 40 AI-generated photos of your dishes — styled, realistic, platform-ready.'],
      ['Pages created', 'Instagram and Facebook business pages set up with your brand identity, bio, highlights, and first 9 posts.'],
      ['Handover', 'You get all assets, credentials, and a simple guide. The pages are yours forever.'],
    ],
    theyProvide: ['Your menu (dishes and prices)', 'Any existing logo or brand preferences', '15 minutes for brand conversation'],
    weHandle: ['Brand identity and design', 'AI food photography (40 images)', 'Page creation and setup', 'First 9 posts design and publishing'],
    suggests: [
      { id: 'social_s2', reason: "Setup gets you started. Management keeps the momentum going with daily posts" },
      { id: 'google_g1', reason: "Same photos work on Google Maps. Get found on both platforms" },
    ],
    customizableFields: [
      { field: 'photo_count', label: 'Number of food photos', options: [20, 40, 60], default: 40 },
    ],
  },

  social_s2: {
    id: 'social_s2',
    name: 'Social Media Management',
    category: 'social',
    categoryLabel: 'Social Media',
    painPoint: "We don't post regularly / no time for social media",
    tagline: 'Daily posts on Instagram + Facebook, done for you',
    paymentType: 'monthly',
    setup: 14999, monthly: 12999, amc: 0,
    timeline: 'Setup: 10 days, posting starts month 1',
    problemHeadline: "Your food is great. But nobody sees it online.",
    problemLines: [
      "You know your food speaks for itself. But when someone searches for food in your area, they see your competitors — not you.",
      "Posting on Instagram and Facebook every day takes time you don't have. Hiring a social media agency costs a fortune and they don't understand food the way you do.",
      "The result? Empty tables during slow hours, new customers going elsewhere, and regulars forgetting you exist between visits.",
    ],
    deliverables: [
      'Everything in Setup + Photos',
      '20 posts/month (10 food, 5 BTS, 3 offers, 2 reviews)',
      'Content calendar shared on 1st of each month',
      '10 stories/month',
      'DM replies within 4 hours',
      'Monthly analytics report',
    ],
    exclusions: ['Reels/video production', 'Paid ads', 'Influencer collaborations', 'Photography reshoots'],
    steps: [
      ['We visit and shoot', 'One visit to photograph your food, understand your brand, and see your space. This is where we build your content library.'],
      ['Content engine built', 'We create branded templates, a posting calendar, and your first month of posts. You review and approve.'],
      ['Posts go live daily', 'Every day, a fresh post goes out on Instagram and Facebook. You don\'t think about it — it just happens.'],
      ['Monthly review', 'At the end of each month, we share what worked, what got the most engagement, and adjust the strategy.'],
    ],
    theyProvide: ['Access to Instagram + Facebook pages', '30 minutes for food photography visit', 'Any specific offers or events to promote'],
    weHandle: ['All content creation and design', 'Food photography (Month 1)', 'Daily posting and scheduling', 'DM management', 'Monthly reporting'],
    suggests: [
      { id: 'photo_ph1', reason: "AI photos for your full menu. Real photos from Month 1 shoot cover the hero dishes" },
      { id: 'google_g2', reason: "People who find you on Google check Instagram. Keep both active" },
      { id: 'social_s3', reason: "Add reels and ads to go from present to growing" },
    ],
    customizableFields: [
      { field: 'posts_per_month', label: 'Posts per month', options: [20, 30], default: 20 },
      { field: 'platforms', label: 'Platforms', options: ['Instagram + Facebook', 'Instagram only'], default: 'Instagram + Facebook' },
    ],
  },

  social_s3: {
    id: 'social_s3',
    name: 'Social Media Full Service',
    category: 'social',
    categoryLabel: 'Social Media',
    painPoint: "We want reels, ads, and full social media handled",
    tagline: 'Posts + reels + ads = growth engine',
    paymentType: 'monthly',
    setup: 14999, monthly: 24999, amc: 0,
    timeline: 'Setup: 10 days, full service from month 1',
    problemHeadline: "Posts get you seen. Reels + ads get you remembered.",
    problemLines: [
      "Static posts keep you visible. But in 2026, reels drive 3x the reach. And without ads, you're only reaching people who already follow you.",
      "Full-service social media means someone handles everything — daily posts, trending reels, targeted ads — while you focus on what you do best: making great food.",
    ],
    deliverables: [
      'Everything in Social Media Management',
      '4 food reels/month (15-30 sec, trending audio)',
      '2 story-format videos/month',
      'Instagram + Facebook ads management',
      'Monthly ads report',
      'Quarterly content strategy review',
    ],
    exclusions: ['Ad spend (paid to Meta, min Rs 10K/month recommended)', 'Influencer partnerships', 'Event coverage'],
    steps: [
      ['Brand setup + shoot', 'Pages created, first visit done, content library built.'],
      ['Content + reel calendar', 'Monthly calendar includes posts, reels, and stories. You approve, we execute.'],
      ['Ads launched', 'Targeted local ads bring new customers to your WhatsApp or doorstep.'],
      ['Monthly performance review', 'Full report: reach, engagement, follower growth, ad performance, and next month\'s strategy.'],
    ],
    theyProvide: ['Page access', 'Monthly ad budget (paid to Meta)', '1 hour for monthly reel filming'],
    weHandle: ['Everything: content, reels, stories, ads, DMs, reporting'],
    suggests: [
      { id: 'whatsapp_w1', reason: "Ads bring customers to WhatsApp. Make sure your ordering bot is ready" },
    ],
    customizableFields: [
      { field: 'reels_per_month', label: 'Reels per month', options: [4, 8], default: 4 },
      { field: 'monthly_ad_budget', label: 'Monthly ad budget (to Meta)', options: [10000, 15000, 25000], default: 10000 },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY: WHATSAPP
  // ═══════════════════════════════════════════════════════════════
  whatsapp_w1: {
    id: 'whatsapp_w1',
    name: 'WhatsApp Ordering + Booking',
    category: 'whatsapp',
    categoryLabel: 'WhatsApp for Restaurant',
    painPoint: "I want orders without Swiggy commission",
    tagline: 'Customers order and book tables via WhatsApp',
    paymentType: 'one-time-amc',
    setup: 24999, monthly: 0, amc: 11999,
    timeline: '10 working days',
    problemHeadline: "Swiggy takes 25%. WhatsApp takes 2.3%.",
    problemLines: [
      "Every order through Swiggy or Zomato costs you 20-25% in commission. On a Rs 500 order, that's Rs 125 gone. Multiply that by 30 orders a day and you're giving away Rs 3,750 daily — Rs 1.1 lakh per month.",
      "Your customers already have WhatsApp. They don't want to download another app. They just want to browse your menu, pick items, and pay — all in one chat.",
    ],
    deliverables: [
      'WhatsApp Business API setup',
      'Product catalog: up to 50 items with photos',
      'Ordering flow: browse, cart, checkout, payment',
      'Razorpay payment integration (UPI, cards)',
      'Table booking flow',
      'Auto-replies for common queries',
      'Admin dashboard + 30-min training call',
    ],
    exclusions: ['Promotional broadcasts', 'Customer follow-ups', 'Customer tracking/CRM'],
    steps: [
      ['Menu and catalog setup', 'We build your WhatsApp product catalog with photos, prices, and categories. Customers browse like a digital menu.'],
      ['Ordering + payment wired', 'Browse → cart → checkout → UPI payment. Automatic. No manual work.'],
      ['Table booking added', 'Customers book a table in 3 taps. You get notified instantly.'],
      ['Training + handover', '30-minute call to train you and your team. Dashboard access handed over.'],
    ],
    theyProvide: ['Menu with prices', 'Food photos (or we use AI photos)', 'Razorpay account (we help set up if needed)'],
    weHandle: ['WhatsApp Business API setup', 'Catalog creation', 'Payment integration', 'Booking flow', 'Testing and deployment'],
    suggests: [
      { id: 'photo_ph1', reason: "Your WhatsApp catalog needs food photos. AI photography gets all 50 items covered" },
      { id: 'whatsapp_w2', reason: "Ordering gets you revenue. Marketing brings customers back for repeat orders" },
      { id: 'social_s1', reason: "Drive WhatsApp orders from Instagram with a 'Order on WhatsApp' link in bio" },
    ],
    customizableFields: [
      { field: 'catalog_items', label: 'Items in catalog', options: [30, 50, 100], default: 50 },
      { field: 'table_booking', label: 'Include table booking?', options: ['Yes', 'No'], default: 'Yes' },
    ],
  },

  whatsapp_w2: {
    id: 'whatsapp_w2',
    name: 'WhatsApp Ordering + Marketing',
    category: 'whatsapp',
    categoryLabel: 'WhatsApp for Restaurant',
    painPoint: "I want orders AND repeat customer engagement",
    tagline: 'Orders + broadcasts + follow-ups',
    paymentType: 'monthly',
    setup: 34999, monthly: 7999, amc: 0,
    timeline: '12 working days',
    problemHeadline: "Getting the first order is hard. Getting the second is easy — if you follow up.",
    problemLines: [
      "Most restaurants get a customer once and never reach them again. No follow-up, no offer, no reminder. The customer forgets and orders from Swiggy next time.",
      "WhatsApp marketing changes that. You have their number. You can send Eid offers, new menu items, weekend specials — directly to their phone. 98% open rate. No algorithm.",
    ],
    deliverables: [
      'Everything in WhatsApp Ordering + Booking',
      '2 broadcast campaigns/month',
      'Automatic 72-hour follow-up for non-converters',
      'Customer auto-tagging (new/repeat/inactive/VIP)',
      'Monthly broadcast performance report',
    ],
    exclusions: ['Customer tracking dashboard', 'More than 2 campaigns/month (Rs 2K each additional)'],
    steps: [
      ['Full ordering system setup', 'Catalog, payments, booking — everything from the Ordering package.'],
      ['Marketing engine configured', 'We set up broadcast templates, audience segments, and the 72-hour follow-up automation.'],
      ['First campaign launched', 'Within the first week, we send your first broadcast — an offer to existing customers. You see results immediately.'],
      ['Monthly campaigns', 'Every month, we design, get approval, and send 2 targeted campaigns. You tell us the offer, we handle the rest.'],
    ],
    theyProvide: ['Menu + photos', 'Monthly offers/promotions to broadcast', 'Razorpay account'],
    weHandle: ['Full WhatsApp system', 'Template creation and Meta approval', 'Audience segmentation', 'Campaign sending and reporting', 'Follow-up automation'],
    suggests: [
      { id: 'social_s2', reason: "WhatsApp converts. Social media attracts. Both together = full funnel" },
    ],
    customizableFields: [
      { field: 'campaigns_per_month', label: 'Broadcast campaigns/month', options: [2, 4], default: 2 },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY: POS / OPERATIONS
  // ═══════════════════════════════════════════════════════════════
  pos_p1: {
    id: 'pos_p1',
    name: 'Self-Hosted POS',
    category: 'operations',
    categoryLabel: 'Kitchen & Billing',
    painPoint: "My POS is expensive / I don't own my data",
    tagline: 'Your own billing system, no monthly SaaS fees',
    paymentType: 'one-time-amc',
    setup: 29999, monthly: 0, amc: 9999,
    timeline: '7-10 working days',
    problemHeadline: "You're renting your billing system. And you don't own your data.",
    problemLines: [
      "Petpooja charges Rs 1,500/month. Posist charges Rs 2,000. That's Rs 18-24K per year — for software that holds YOUR customer data hostage. Stop paying? Lose access to everything.",
      "There's a better way. Own your billing system outright. One setup fee, you own the software, you own the data. Annual support if you need it.",
    ],
    deliverables: [
      'Odoo 19 POS on your hardware',
      'Up to 100 items configured with categories',
      'Cash, UPI, and card payment methods',
      'Branded receipt template',
      '2-hour on-site staff training',
      'Owner + 3 staff accounts',
    ],
    exclusions: ['Hardware (tablet/printer — we recommend, you buy)', 'Kitchen Display', 'Settlement system', 'Menu changes beyond 10/month in AMC'],
    steps: [
      ['Hardware assessment', 'We check what you have (tablet, printer, router) and recommend what you need. Most restaurants need Rs 15-20K in hardware.'],
      ['System deployed', 'Odoo POS installed, your full menu configured with categories, prices, and payment methods.'],
      ['On-site training', '2 hours at your restaurant. We train the owner and 3 staff members on billing, discounts, and end-of-day reports.'],
      ['Go live', 'System goes live. We monitor for 7 days and fix anything that comes up.'],
    ],
    theyProvide: ['Hardware (tablet + receipt printer)', 'Menu with categories and prices', '2 hours for training'],
    weHandle: ['Software installation and config', 'Menu setup', 'Receipt design', 'Payment method config', 'Staff training', '7-day post-launch support'],
    suggests: [
      { id: 'whatsapp_w1', reason: "POS handles dine-in. WhatsApp handles online orders. Both feed into the same system" },
      { id: 'google_g1', reason: "Billing sorted? Now get customers to find you on Google" },
    ],
    customizableFields: [
      { field: 'menu_items', label: 'Menu items to configure', options: [50, 100, 200], default: 100 },
      { field: 'staff_accounts', label: 'Staff accounts', options: [3, 5, 10], default: 3 },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY: PHOTOGRAPHY
  // ═══════════════════════════════════════════════════════════════
  photo_ph1: {
    id: 'photo_ph1',
    name: 'AI Food Photography',
    category: 'photography',
    categoryLabel: 'Food Photography',
    painPoint: "Our photos look bad / we don't have menu photos",
    tagline: 'Professional food photos without a photographer',
    paymentType: 'one-time',
    setup: 8000, monthly: 0, amc: 0,
    timeline: '5 working days',
    problemHeadline: "Bad photos cost you orders. Every single day.",
    problemLines: [
      "On Swiggy, the restaurants with professional photos get 3x more orders. On Instagram, good food photos get 10x the engagement. On Google, listings with photos get 42% more direction requests.",
      "You don't need a photographer. AI-generated food photos look stunning, cost a fraction, and are ready in 5 days — not 5 weeks.",
    ],
    deliverables: [
      'Up to 40 AI-generated dish photos',
      'White background + styled variants',
      'Optimized for Instagram, Swiggy, Zomato, WhatsApp',
      'High-res files handed over',
    ],
    exclusions: ['Real on-site photography', 'Interior shots', 'Video'],
    steps: [
      ['Menu shared', 'You share your menu — dish names, descriptions, and any reference photos you have.'],
      ['Photos generated', 'We create realistic AI food photos for each dish — styled, lit, and platform-ready.'],
      ['Review and revisions', 'You review. We revise any that need adjustment. Up to 2 rounds.'],
      ['Delivery', 'All files delivered in high-res. Ready for Instagram, Swiggy, Zomato, WhatsApp, and print.'],
    ],
    theyProvide: ['Menu with dish names', 'Any reference photos (optional)', 'Feedback on first batch'],
    weHandle: ['AI photo generation', 'Styling and composition', 'Platform optimization', 'Revision rounds'],
    suggests: [
      { id: 'social_s1', reason: "Photos need a home. Get your Instagram set up with these photos" },
      { id: 'whatsapp_w1', reason: "These photos power your WhatsApp product catalog" },
      { id: 'google_g1', reason: "Upload these to Google Maps for 42% more direction requests" },
    ],
    customizableFields: [
      { field: 'photo_count', label: 'Number of dish photos', options: [20, 40, 60], default: 40 },
    ],
  },

  photo_ph2: {
    id: 'photo_ph2',
    name: 'Real Menu Shoot',
    category: 'photography',
    categoryLabel: 'Food Photography',
    painPoint: "We want real professional food photos",
    tagline: 'On-site shoot with professional photographer',
    paymentType: 'one-time',
    setup: 14999, monthly: 0, amc: 0,
    timeline: '7-10 working days',
    problemHeadline: "Nothing beats real food, shot right.",
    problemLines: [
      "AI photos are fast and affordable. But for hero dishes — the ones that define your brand — real photography captures the steam, the texture, the authenticity that makes people crave your food.",
      "Our photographer comes to you, shoots 15 dishes in your restaurant's natural light, and delivers retouched, color-corrected images ready for every platform.",
    ],
    deliverables: [
      'Professional photographer visit',
      'Up to 15 dishes (basic styling, 2-3 angles)',
      'Retouched and color-corrected',
      'All platforms optimized',
    ],
    exclusions: ['Styled/lifestyle shots', 'Interior photography', 'Video', 'Extra dishes: Rs 799/dish'],
    steps: [
      ['Pre-shoot call', '15-minute call to pick the 15 dishes, discuss styling, and schedule the shoot.'],
      ['On-site shoot', 'Photographer visits your restaurant. 2-3 hours. Your kitchen prepares each dish fresh.'],
      ['Editing', 'Professional retouching, color correction, and platform-specific cropping.'],
      ['Delivery', 'High-res files delivered. Ready for Instagram, Swiggy, Zomato, print.'],
    ],
    theyProvide: ['Kitchen prep for 15 dishes during shoot', '2-3 hours on shoot day', 'Dish selection (15 items)'],
    weHandle: ['Photographer booking and coordination', 'Basic food styling', 'Retouching and delivery'],
    suggests: [
      { id: 'photo_ph1', reason: "Real photos for 15 hero dishes + AI photos for the rest of the menu = complete coverage" },
      { id: 'social_s1', reason: "These photos are your social media foundation" },
    ],
    customizableFields: [
      { field: 'dish_count', label: 'Dishes to shoot', options: [10, 15, 25], default: 15 },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY: DESIGN
  // ═══════════════════════════════════════════════════════════════
  design_ds1: {
    id: 'design_ds1',
    name: 'Packaging Design (3 SKUs)',
    category: 'design',
    categoryLabel: 'Design',
    painPoint: "Our packaging looks cheap / we need branded packaging",
    tagline: 'Branded boxes, bags, cups — print-ready',
    paymentType: 'one-time',
    setup: 10500, monthly: 0, amc: 0,
    timeline: '7 working days',
    problemHeadline: "Your food deserves packaging that matches.",
    problemLines: [
      "Your customer pays Rs 400 for biryani and it arrives in a plain white box. No logo, no brand, no reason to remember you. That's a missed impression on every single delivery order.",
      "Branded packaging turns every delivery into a marketing touchpoint. Your logo, your colors, your QR code — on every box that leaves your kitchen.",
    ],
    deliverables: [
      '3 packaging designs (box, bag, cup/napkin)',
      'Your logo, brand colors, QR code integrated',
      'Print-ready files (PDF, AI, EPS)',
      '2 revision rounds per SKU',
    ],
    exclusions: ['Manufacturing/printing', 'More than 3 SKUs (Rs 3,500 each additional)'],
    steps: [
      ['Brief call', '15 minutes — we discuss your brand, packaging sizes, and any specific requirements.'],
      ['First drafts', 'Designs for all 3 SKUs delivered within 4 days.'],
      ['Revisions', '2 rounds of revisions per SKU until you\'re happy.'],
      ['Print-ready delivery', 'Final files in PDF, AI, and EPS — ready to send to your printer.'],
    ],
    theyProvide: ['Logo (if available)', 'Packaging sizes/dimensions', 'Printer contact (optional — we can recommend)'],
    weHandle: ['Design concept and execution', 'Brand integration', 'Print-ready file preparation'],
    suggests: [
      { id: 'design_ds3', reason: "Add menu design for a complete brand suite" },
      { id: 'photo_ph1', reason: "Include food photos on your packaging" },
    ],
    customizableFields: [
      { field: 'sku_count', label: 'Number of packaging SKUs', options: [3, 5, 8], default: 3 },
    ],
  },

  design_ds3: {
    id: 'design_ds3',
    name: 'Full Brand Suite',
    category: 'design',
    categoryLabel: 'Design',
    painPoint: "We need complete branding — packaging + menu + identity",
    tagline: 'Packaging + printed menu + brand consistency',
    paymentType: 'one-time',
    setup: 22500, monthly: 0, amc: 0,
    timeline: '12-15 working days',
    problemHeadline: "A brand isn't a logo. It's how everything looks and feels together.",
    problemLines: [
      "Your packaging says one thing, your menu says another, and your Instagram says a third. That inconsistency costs you trust — and trust is what turns first-timers into regulars.",
      "A full brand suite means every touchpoint — box, menu, social media — speaks the same language. Professional, consistent, memorable.",
    ],
    deliverables: [
      '3 packaging SKU designs',
      '8-page printed menu design',
      'Food photos integrated',
      'Consistent brand identity across all items',
      'Print-ready files for everything',
    ],
    exclusions: ['Printing', 'Photography (add separately)', 'More than 3+8 items'],
    steps: [
      ['Brand session', 'Deep dive into your brand — colors, personality, vibe. This guides everything.'],
      ['Packaging designs', '3 SKUs designed with your brand identity.'],
      ['Menu design', '8-page printed menu with photos, categories, and pricing.'],
      ['Final delivery', 'All files print-ready. One cohesive brand across everything.'],
    ],
    theyProvide: ['Menu content', 'Logo', 'Packaging dimensions', 'Printer contacts'],
    weHandle: ['Brand direction', 'All design work', 'Print-ready files'],
    suggests: [
      { id: 'social_s1', reason: "Extend the same brand to your Instagram and Facebook" },
    ],
    customizableFields: [],
  },

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY: HIRING
  // ═══════════════════════════════════════════════════════════════
  hiring_h1: {
    id: 'hiring_h1',
    name: 'Hiring Campaign',
    category: 'hiring',
    categoryLabel: 'Hiring',
    painPoint: "I can't find good staff / I need a cook urgently",
    tagline: 'Find cooks, waiters, managers in days',
    paymentType: 'one-time',
    setup: 6999, monthly: 0, amc: 0,
    timeline: '7-10 working days',
    problemHeadline: "The right cook can make your restaurant. The wrong hire can break it.",
    problemLines: [
      "You've been asking around, posting on WhatsApp groups, checking Apna. But the candidates aren't right — wrong experience, wrong location, wrong salary expectations. Meanwhile, your kitchen is short-staffed and service is suffering.",
      "We run targeted hiring campaigns that reach thousands of relevant candidates in your area. Within 10 days, you get 20 screened candidates with the right skills, in the right location, at the right salary range.",
    ],
    deliverables: [
      'Job poster design (2 variations)',
      'Posting on Apna + WorkIndia + 5 Facebook groups',
      'WhatsApp application collection',
      'Up to 20 screened candidates',
      'Candidate shortlist with details',
    ],
    exclusions: ['Interviews', 'Salary negotiation', 'Background verification'],
    steps: [
      ['Requirements call', '15 minutes — role, salary range, experience needed, location preferences.'],
      ['Campaign launched', 'Job poster designed, posted on Apna, WorkIndia, and 5 targeted Facebook groups in your area.'],
      ['Applications collected', 'Candidates apply via WhatsApp. We screen for role fit, location, and salary match.'],
      ['Shortlist delivered', 'You get 15-20 screened candidates with name, experience, location, and salary expectation.'],
    ],
    theyProvide: ['Job description (or we write it)', 'Salary range', 'Location/area preference'],
    weHandle: ['Poster design', 'Multi-platform posting', 'Application collection', 'Initial screening', 'Shortlist preparation'],
    suggests: [],
    customizableFields: [
      { field: 'roles', label: 'Roles to hire', options: ['Cook', 'Waiter', 'Manager', 'Delivery', 'Multiple roles'], default: 'Cook' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // PACKS (combinations)
  // ═══════════════════════════════════════════════════════════════
  pack_m1: {
    id: 'pack_m1',
    name: 'Digital Starter Pack',
    category: 'packs',
    categoryLabel: 'Bundled Packs',
    painPoint: "We're starting from zero online",
    tagline: 'Google + Instagram + QR Menu + platform listing',
    paymentType: 'one-time',
    setup: 24999, monthly: 0, amc: 0,
    timeline: '15 working days',
    problemHeadline: "Starting from zero? This gets you online everywhere in 15 days.",
    problemLines: [
      "No Google listing, no Instagram, no Swiggy, no website. You're invisible to 90% of potential customers who search online before deciding where to eat.",
      "The Digital Starter Pack puts you on every platform that matters — in 15 days. One price, everything handled.",
    ],
    deliverables: [
      'Google Maps Listing with photos & menu',
      'Instagram & Facebook pages + food photos',
      'QR Menu with printed standees',
      'Swiggy or Zomato listing',
    ],
    exclusions: ['Ongoing posting', 'Ads', 'WhatsApp ordering'],
    steps: [
      ['Kickoff call', 'We gather your menu, photos, and brand basics in one 30-minute call.'],
      ['All platforms set up', 'Google, Instagram, Facebook, Swiggy/Zomato — all created and optimized simultaneously.'],
      ['QR menu deployed', 'Digital menu with QR codes printed on standees for every table.'],
      ['Handover', 'All credentials, assets, and a simple guide. You\'re online.'],
    ],
    theyProvide: ['Menu with prices', 'Any existing logo', '30 minutes for kickoff'],
    weHandle: ['Everything — from photos to platform setup to QR printing'],
    suggests: [
      { id: 'social_s2', reason: "Starter Pack sets you up. Add management to keep posting daily" },
      { id: 'whatsapp_w1', reason: "You're online now. Add WhatsApp ordering to start taking direct orders" },
    ],
    customizableFields: [],
  },

  pack_m2: {
    id: 'pack_m2',
    name: 'Growth Pack',
    category: 'packs',
    categoryLabel: 'Bundled Packs',
    painPoint: "We want everything — Google, social, WhatsApp, website",
    tagline: 'Complete digital presence + ordering + content',
    paymentType: 'monthly',
    setup: 69999, monthly: 14999, amc: 0,
    timeline: '20 working days',
    problemHeadline: "You don't need 5 vendors. You need one team that handles everything.",
    problemLines: [
      "One agency for social media, another for Google, a freelancer for WhatsApp, and you're managing all of them. Different timelines, different quality, different invoices. Nobody sees the full picture.",
      "The Growth Pack puts everything under one roof. Google, social, WhatsApp ordering, website, delivery platforms — all connected, all consistent, all managed by one team that runs restaurants ourselves.",
    ],
    deliverables: [
      'Google Presence Management (reviews + posts)',
      'Social Media Management (daily posting)',
      'WhatsApp Ordering + Booking',
      'All 3 delivery platforms + commission analysis',
      'Restaurant Website with QR menu',
    ],
    exclusions: ['Reels/video', 'Paid ads', 'Customer tracking dashboard'],
    steps: [
      ['Discovery call', '45 minutes — we understand your restaurant, menu, brand, and priorities.'],
      ['Phase 1: Foundation (Week 1-2)', 'Google listing, social pages, food photos, WhatsApp catalog — all built simultaneously.'],
      ['Phase 2: Activation (Week 2-3)', 'Website deployed, delivery platforms onboarded, ordering system live.'],
      ['Phase 3: Ongoing', 'Daily posting, weekly Google posts, review management, monthly reporting — all on autopilot.'],
    ],
    theyProvide: ['Menu + prices', '1 hour for discovery call', 'Page access + Razorpay account', 'Monthly ad budget (if adding ads later)'],
    weHandle: ['Every single thing — setup, content, posting, ordering, reviews, reporting'],
    suggests: [],
    customizableFields: [],
  },
};

// ═══════════════════════════════════════════════════════════════
// PAIN POINT → SERVICE CATEGORY MAPPING (for WABA bot)
// ═══════════════════════════════════════════════════════════════
const PAIN_POINTS = [
  {
    id: 'findability',
    label: "Customers can't find us online",
    emoji: '🔍',
    services: ['google_g1', 'google_g2', 'google_g3'],
  },
  {
    id: 'social',
    label: "Our social media is dead or nonexistent",
    emoji: '📱',
    services: ['social_s1', 'social_s2', 'social_s3'],
  },
  {
    id: 'orders',
    label: "We want orders without platform commission",
    emoji: '💬',
    services: ['whatsapp_w1', 'whatsapp_w2'],
  },
  {
    id: 'operations',
    label: "Kitchen misses orders / billing issues / cash doesn't match",
    emoji: '🍳',
    services: ['pos_p1'],
  },
  {
    id: 'hiring',
    label: "Can't find good staff",
    emoji: '👨‍🍳',
    services: ['hiring_h1'],
  },
  {
    id: 'photos',
    label: "Our food photos are bad or missing",
    emoji: '📸',
    services: ['photo_ph1', 'photo_ph2'],
  },
  {
    id: 'branding',
    label: "We need packaging / menu / brand design",
    emoji: '🎨',
    services: ['design_ds1', 'design_ds3'],
  },
  {
    id: 'everything',
    label: "We're starting from scratch — need everything",
    emoji: '🚀',
    services: ['pack_m1', 'pack_m2'],
  },
];

// ═══════════════════════════════════════════════════════════════
// CATEGORY GROUPING (for pricing page filters)
// ═══════════════════════════════════════════════════════════════
const CATEGORIES = [
  { id: 'google', label: 'Google', icon: '🔍' },
  { id: 'social', label: 'Social Media', icon: '📱' },
  { id: 'whatsapp', label: 'WhatsApp', icon: '💬' },
  { id: 'operations', label: 'Operations', icon: '🍳' },
  { id: 'photography', label: 'Photography', icon: '📸' },
  { id: 'design', label: 'Design', icon: '🎨' },
  { id: 'hiring', label: 'Hiring', icon: '👨‍🍳' },
  { id: 'packs', label: 'Packs', icon: '🚀' },
];

// Export for both browser (inline) and Cloudflare Worker (module)
if (typeof module !== 'undefined') {
  module.exports = { SERVICES_MAP, PAIN_POINTS, CATEGORIES };
}
