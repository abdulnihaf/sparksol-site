// SparkSol Proposal Generator v2
// Creates personalized single-service proposals, stores in D1, sends via WhatsApp
// Uses services-map.js data for deep context per service

const WA_API = 'https://graph.facebook.com/v21.0';

// ═══════════════════════════════════════════════════════════════
// SERVICE CATALOG — synced from services-map.js
// Each SKU has full proposal content: problem copy, steps, cross-sells
// ═══════════════════════════════════════════════════════════════

const SERVICES = {
  google_g1: { name: 'Google Maps Listing', category: 'google', setup: 4999, monthly: 0, amc: 0, timeline: '5 working days', paymentLabel: 'One-time setup',
    problemHeadline: "People search. You don't show up.",
    problemLines: ["Every day, hundreds of people in your area search for food on Google Maps. If your restaurant isn't there — or shows outdated info, no photos, no menu — they scroll past you.", "The worst part? You might already have a listing that someone else created with wrong hours and a blurry photo."],
    deliverables: ['Google Business Profile created and verified', '30+ food photos uploaded', 'Full menu with prices', 'Correct hours, categories, contact', 'Review collection QR codes (5 standees)', 'Login credentials + guide handed over'],
    exclusions: ['Ongoing posting', 'Review reply management', 'Google Ads'],
    steps: [['We claim your listing', 'We verify your Google Business Profile, fix duplicates, and set up categories, hours, and contact.'], ['Photos and menu go up', 'We upload 30+ food photos, your full menu with prices, and all business details.'], ['Review system installed', 'QR standees for tables and counter that make it easy for happy customers to leave a review.'], ['Handover', 'You get the login, a guide, and full ownership.']],
    theyProvide: ['Access to restaurant', 'Menu with prices', '15 min for Google verification call'], weHandle: ['Listing creation', 'Photo upload', 'Menu formatting', 'QR standee design', 'SEO setup'],
    suggests: ['social_s1', 'photo_ph1', 'google_g2'] },

  google_g2: { name: 'Google Presence Management', category: 'google', setup: 7999, monthly: 4999, amc: 0, timeline: 'Setup: 5 days, ongoing from month 1', paymentLabel: 'Monthly retainer',
    problemHeadline: "A dead listing is worse than no listing.",
    problemLines: ["You have a Google listing. But it has 12 reviews from 2 years ago, no recent photos, and zero posts. Google sees that as inactive — ranks you lower.", "The restaurant down the street has 200 reviews, weekly posts, and fresh photos. Guess who shows up first?"],
    deliverables: ['Everything in Google Maps Listing setup', '4 Google Business Posts/month', 'Review growth system (QR + staff training)', 'All reviews replied within 24hrs', 'Monthly performance report', 'Quarterly listing audit'],
    exclusions: ['Google Ads', 'Social media posting', 'Website'],
    steps: [['Audit and fix', 'We audit your profile, fix errors, upload fresh photos, install review system.'], ['Weekly posts go live', 'Branded post every week — offers, dish highlights, events — visible to anyone who finds you.'], ['Reviews grow', 'QR system + staff training gets happy customers to leave 5-star reviews. We reply to every one.'], ['Monthly report', 'How many found you, clicked for directions, called — plus review growth.']],
    theyProvide: ['Google Business Profile access', 'Offers to promote', 'Brief staff on QR process'], weHandle: ['All posting and scheduling', 'Review monitoring and replies', 'QR standee design', 'Monthly analytics'],
    suggests: ['google_g3', 'social_s2'] },

  google_g3: { name: 'Google Presence + Ads', category: 'google', setup: 9999, monthly: 9999, amc: 0, timeline: 'Setup: 7 days, ads live within 48hrs', paymentLabel: 'Monthly (ad spend separate)',
    problemHeadline: "Your competitors are paying to be first. Are you?",
    problemLines: ["When someone searches 'biryani near me', the top results are paid ads. If you're not there, you're invisible to the most ready-to-buy customers.", "Google Ads for restaurants isn't about big budgets. Rs 10,000/month can bring 200+ clicks from people within 4km."],
    deliverables: ['Everything in Presence Management', 'Google Search Ads campaign', 'Keyword research + location targeting', 'Monthly ads report with CPA and ROAS', 'Conversion tracking (calls, directions, clicks)'],
    exclusions: ['Ad spend (paid to Google, min Rs 10K/month)', 'Social media ads'],
    steps: [['Listing + reviews setup', 'Profile optimized with photos, menu, and review system.'], ['Ads campaign built', 'Keyword research, location targeting (4km radius), compelling ad copy.'], ['Ads go live', 'Within 48 hours, your restaurant shows at the top of local search.'], ['Monthly optimization', 'Clear report: spend, clicks, calls, directions — and what we\'re improving.']],
    theyProvide: ['Google Business Profile access', 'Monthly ad budget (to Google)', 'Offers to run'], weHandle: ['Campaign setup', 'Keyword research', 'Ad copy', 'Conversion tracking', 'Monthly reporting'],
    suggests: ['social_s2'] },

  social_s1: { name: 'Social Media Setup + Photos', category: 'social', setup: 14999, monthly: 0, amc: 0, timeline: '10 working days', paymentLabel: 'One-time setup',
    problemHeadline: "No Instagram? That's invisible to anyone under 35.",
    problemLines: ["People check Instagram before Google. No page — or 3 blurry photos from 2021 — means you've lost them before they tried your food.", "Setting up a professional brand presence isn't just posting. It's the right identity, photos, and first impression."],
    deliverables: ['Instagram & Facebook pages with brand identity', 'First 9 posts designed and published', 'Up to 40 AI food photos', 'Brand kit: logo treatment, colors, fonts', 'Content pillars defined', 'All assets + credentials handed over'],
    exclusions: ['Ongoing posting', 'Reels/video', 'Ads', 'Photo reshoots if menu changes'],
    steps: [['Brand session', 'We understand your vibe, colors, personality — 15-minute conversation.'], ['Food photos generated', 'Up to 40 AI-generated photos — styled, realistic, platform-ready.'], ['Pages created', 'Instagram + Facebook business pages with brand identity, bio, highlights, first 9 posts.'], ['Handover', 'All assets, credentials, and a simple guide. Yours forever.']],
    theyProvide: ['Menu (dishes and prices)', 'Logo or brand preferences', '15 min for brand conversation'], weHandle: ['Brand identity and design', 'AI food photography', 'Page creation and setup', 'First 9 posts'],
    suggests: ['social_s2', 'google_g1'] },

  social_s2: { name: 'Social Media Management', category: 'social', setup: 14999, monthly: 12999, amc: 0, timeline: 'Setup: 10 days, posting starts month 1', paymentLabel: 'Monthly retainer',
    problemHeadline: "Your food is great. But nobody sees it online.",
    problemLines: ["You know your food speaks for itself. But when someone searches for food in your area, they see your competitors — not you.", "Posting on Instagram every day takes time you don't have. Hiring an agency costs a fortune and they don't understand food.", "The result? Empty tables, new customers going elsewhere, regulars forgetting you exist."],
    deliverables: ['Everything in Setup + Photos', '20 posts/month (food, BTS, offers, reviews)', 'Content calendar shared on 1st of each month', '10 stories/month', 'DM replies within 4 hours', 'Monthly analytics report'],
    exclusions: ['Reels/video production', 'Paid ads', 'Influencer collaborations', 'Photography reshoots'],
    steps: [['We visit and shoot', 'One visit to photograph your food, understand your brand, see your space.'], ['Content engine built', 'Branded templates, posting calendar, first month of posts. You review and approve.'], ['Posts go live daily', 'Every day, a fresh post on Instagram and Facebook. You don\'t think about it.'], ['Monthly review', 'What worked, what got engagement, strategy adjustments.']],
    theyProvide: ['Instagram + Facebook page access', '30 min for photo visit', 'Offers or events to promote'], weHandle: ['All content creation', 'Food photography (Month 1)', 'Daily posting', 'DM management', 'Monthly reporting'],
    suggests: ['photo_ph1', 'google_g2', 'social_s3'] },

  social_s3: { name: 'Social Media Full Service', category: 'social', setup: 14999, monthly: 24999, amc: 0, timeline: 'Setup: 10 days, full service from month 1', paymentLabel: 'Monthly (ad spend separate)',
    problemHeadline: "Posts get you seen. Reels + ads get you remembered.",
    problemLines: ["Static posts keep you visible. But reels drive 3x the reach. And without ads, you only reach existing followers.", "Full-service means someone handles everything — daily posts, trending reels, targeted ads — while you make great food."],
    deliverables: ['Everything in Social Media Management', '4 food reels/month (15-30 sec, trending audio)', '2 story-format videos/month', 'Instagram + Facebook ads management', 'Monthly ads report', 'Quarterly strategy review'],
    exclusions: ['Ad spend (paid to Meta, min Rs 10K/month)', 'Influencer partnerships', 'Event coverage'],
    steps: [['Brand setup + shoot', 'Pages created, visit done, content library built.'], ['Content + reel calendar', 'Monthly calendar with posts, reels, stories. You approve, we execute.'], ['Ads launched', 'Targeted local ads bring new customers to your WhatsApp or doorstep.'], ['Monthly review', 'Reach, engagement, follower growth, ad performance, next month\'s strategy.']],
    theyProvide: ['Page access', 'Monthly ad budget (to Meta)', '1 hour for monthly reel filming'], weHandle: ['Everything: content, reels, stories, ads, DMs, reporting'],
    suggests: ['whatsapp_w1'] },

  whatsapp_w1: { name: 'WhatsApp Ordering + Booking', category: 'whatsapp', setup: 24999, monthly: 0, amc: 11999, timeline: '10 working days', paymentLabel: 'One-time + annual support',
    problemHeadline: "Swiggy takes 25%. WhatsApp takes 2.3%.",
    problemLines: ["Every Swiggy order costs 20-25% commission. Rs 500 order = Rs 125 gone. 30 orders/day = Rs 3,750 daily = Rs 1.1 lakh/month.", "Your customers already have WhatsApp. They don't want another app. They just want to browse, pick, and pay — all in one chat."],
    deliverables: ['WhatsApp Business API setup', 'Product catalog: up to 50 items with photos', 'Ordering flow: browse, cart, checkout, payment', 'Razorpay payment integration (UPI, cards)', 'Table booking flow', 'Auto-replies for common queries', 'Admin dashboard + 30-min training call'],
    exclusions: ['Promotional broadcasts', 'Customer follow-ups', 'Customer tracking/CRM'],
    steps: [['Menu and catalog setup', 'WhatsApp product catalog with photos, prices, categories. Like a digital menu.'], ['Ordering + payment wired', 'Browse, cart, checkout, UPI payment. Automatic. No manual work.'], ['Table booking added', 'Customers book a table in 3 taps. You get notified instantly.'], ['Training + handover', '30-minute call to train you and your team. Dashboard access handed over.']],
    theyProvide: ['Menu with prices', 'Food photos (or we use AI)', 'Razorpay account (we help set up)'], weHandle: ['WhatsApp Business API setup', 'Catalog creation', 'Payment integration', 'Booking flow', 'Testing'],
    suggests: ['photo_ph1', 'whatsapp_w2', 'social_s1'] },

  whatsapp_w2: { name: 'WhatsApp Ordering + Marketing', category: 'whatsapp', setup: 34999, monthly: 7999, amc: 0, timeline: '12 working days', paymentLabel: 'Monthly retainer',
    problemHeadline: "Getting the first order is hard. Getting the second is easy — if you follow up.",
    problemLines: ["Most restaurants get a customer once and never reach them again. No follow-up, no offer, no reminder. They forget and order from Swiggy.", "WhatsApp marketing changes that. Send Eid offers, new menu items, weekend specials — directly to their phone. 98% open rate."],
    deliverables: ['Everything in WhatsApp Ordering + Booking', '2 broadcast campaigns/month', 'Automatic 72-hour follow-up', 'Customer auto-tagging (new/repeat/inactive/VIP)', 'Monthly broadcast performance report'],
    exclusions: ['Customer tracking dashboard', 'More than 2 campaigns/month (Rs 2K each additional)'],
    steps: [['Full ordering system setup', 'Catalog, payments, booking — everything from the Ordering package.'], ['Marketing engine configured', 'Broadcast templates, audience segments, 72-hour follow-up automation.'], ['First campaign launched', 'Within the first week, broadcast to existing customers. See results immediately.'], ['Monthly campaigns', 'Every month: 2 targeted campaigns. You tell us the offer, we handle the rest.']],
    theyProvide: ['Menu + photos', 'Monthly offers to broadcast', 'Razorpay account'], weHandle: ['Full WhatsApp system', 'Template creation and Meta approval', 'Audience segmentation', 'Campaign sending', 'Follow-up automation'],
    suggests: ['social_s2'] },

  pos_p1: { name: 'Self-Hosted POS', category: 'operations', setup: 29999, monthly: 0, amc: 9999, timeline: '7-10 working days', paymentLabel: 'One-time + annual support',
    problemHeadline: "You're renting your billing system. And you don't own your data.",
    problemLines: ["Petpooja charges Rs 1,500/month. Posist charges Rs 2,000. That's Rs 18-24K/year — for software that holds YOUR data hostage. Stop paying? Lose everything.", "Own your billing system outright. One setup fee, you own the software, you own the data."],
    deliverables: ['Odoo 19 POS on your hardware', 'Up to 100 items configured', 'Cash, UPI, card payments', 'Branded receipt template', '2-hour on-site staff training', 'Owner + 3 staff accounts'],
    exclusions: ['Hardware (tablet/printer)', 'Kitchen Display', 'Settlement system', 'Menu changes beyond 10/month in AMC'],
    steps: [['Hardware assessment', 'We check what you have and recommend what you need. Most need Rs 15-20K in hardware.'], ['System deployed', 'Odoo POS installed, full menu configured with categories, prices, payment methods.'], ['On-site training', '2 hours at your restaurant. Owner and 3 staff trained on billing, discounts, reports.'], ['Go live', 'System live. We monitor for 7 days and fix anything.']],
    theyProvide: ['Hardware (tablet + receipt printer)', 'Menu with categories and prices', '2 hours for training'], weHandle: ['Software installation', 'Menu setup', 'Receipt design', 'Payment config', 'Staff training', '7-day support'],
    suggests: ['whatsapp_w1', 'google_g1'] },

  photo_ph1: { name: 'AI Food Photography', category: 'photography', setup: 8000, monthly: 0, amc: 0, timeline: '5 working days', paymentLabel: 'One-time',
    problemHeadline: "Bad photos cost you orders. Every single day.",
    problemLines: ["On Swiggy, restaurants with professional photos get 3x more orders. On Instagram, good food photos get 10x engagement. On Google, listings with photos get 42% more direction requests.", "AI food photos look stunning, cost a fraction, and are ready in 5 days."],
    deliverables: ['Up to 40 AI-generated dish photos', 'White background + styled variants', 'Optimized for Instagram, Swiggy, Zomato, WhatsApp', 'High-res files handed over'],
    exclusions: ['Real on-site photography', 'Interior shots', 'Video'],
    steps: [['Menu shared', 'You share your menu — dish names, descriptions, reference photos.'], ['Photos generated', 'Realistic AI food photos for each dish — styled, lit, platform-ready.'], ['Review and revisions', 'You review. We revise. Up to 2 rounds.'], ['Delivery', 'All files in high-res. Ready for every platform.']],
    theyProvide: ['Menu with dish names', 'Reference photos (optional)', 'Feedback on first batch'], weHandle: ['AI photo generation', 'Styling and composition', 'Platform optimization', 'Revisions'],
    suggests: ['social_s1', 'whatsapp_w1', 'google_g1'] },

  photo_ph2: { name: 'Real Menu Shoot', category: 'photography', setup: 14999, monthly: 0, amc: 0, timeline: '7-10 working days', paymentLabel: 'One-time',
    problemHeadline: "Nothing beats real food, shot right.",
    problemLines: ["For hero dishes — the ones that define your brand — real photography captures the steam, texture, and authenticity that makes people crave your food.", "Our photographer comes to you, shoots 15 dishes, and delivers retouched, platform-ready images."],
    deliverables: ['Professional photographer visit', 'Up to 15 dishes (basic styling, 2-3 angles)', 'Retouched and color-corrected', 'All platforms optimized'],
    exclusions: ['Styled/lifestyle shots', 'Interior photography', 'Video', 'Extra dishes: Rs 799/dish'],
    steps: [['Pre-shoot call', '15-minute call to pick dishes, discuss styling, schedule the shoot.'], ['On-site shoot', 'Photographer visits. 2-3 hours. Kitchen prepares each dish fresh.'], ['Editing', 'Professional retouching, color correction, platform-specific cropping.'], ['Delivery', 'High-res files ready for Instagram, Swiggy, Zomato, print.']],
    theyProvide: ['Kitchen prep for 15 dishes', '2-3 hours on shoot day', 'Dish selection'], weHandle: ['Photographer coordination', 'Food styling', 'Retouching and delivery'],
    suggests: ['photo_ph1', 'social_s1'] },

  design_ds1: { name: 'Packaging Design (3 SKUs)', category: 'design', setup: 10500, monthly: 0, amc: 0, timeline: '7 working days', paymentLabel: 'One-time',
    problemHeadline: "Your food deserves packaging that matches.",
    problemLines: ["Customer pays Rs 400 for biryani, it arrives in a plain white box. No logo, no brand. A missed impression on every delivery order.", "Branded packaging turns every delivery into a marketing touchpoint."],
    deliverables: ['3 packaging designs (box, bag, cup/napkin)', 'Logo, brand colors, QR code integrated', 'Print-ready files (PDF, AI, EPS)', '2 revision rounds per SKU'],
    exclusions: ['Manufacturing/printing', 'More than 3 SKUs (Rs 3,500 each additional)'],
    steps: [['Brief call', '15 minutes — brand, packaging sizes, requirements.'], ['First drafts', 'All 3 SKU designs within 4 days.'], ['Revisions', '2 rounds per SKU.'], ['Print-ready delivery', 'Final files in PDF, AI, EPS.']],
    theyProvide: ['Logo', 'Packaging sizes', 'Printer contact (optional)'], weHandle: ['Design concept', 'Brand integration', 'Print-ready files'],
    suggests: ['design_ds3', 'photo_ph1'] },

  design_ds3: { name: 'Full Brand Suite', category: 'design', setup: 22500, monthly: 0, amc: 0, timeline: '12-15 working days', paymentLabel: 'One-time',
    problemHeadline: "A brand isn't a logo. It's how everything looks and feels.",
    problemLines: ["Packaging says one thing, menu says another, Instagram says a third. That inconsistency costs trust.", "A full brand suite means every touchpoint speaks the same language. Professional, consistent, memorable."],
    deliverables: ['3 packaging SKU designs', '8-page printed menu design', 'Food photos integrated', 'Consistent brand identity', 'Print-ready files for everything'],
    exclusions: ['Printing', 'Photography (add separately)', 'More than 3+8 items'],
    steps: [['Brand session', 'Deep dive — colors, personality, vibe. Guides everything.'], ['Packaging designs', '3 SKUs with your brand identity.'], ['Menu design', '8-page printed menu with photos, categories, pricing.'], ['Final delivery', 'All files print-ready. One cohesive brand.']],
    theyProvide: ['Menu content', 'Logo', 'Packaging dimensions', 'Printer contacts'], weHandle: ['Brand direction', 'All design work', 'Print-ready files'],
    suggests: ['social_s1'] },

  hiring_h1: { name: 'Hiring Campaign', category: 'hiring', setup: 6999, monthly: 0, amc: 0, timeline: '7-10 working days', paymentLabel: 'Per campaign',
    problemHeadline: "The right cook can make your restaurant. The wrong hire can break it.",
    problemLines: ["You've been asking around, posting on WhatsApp groups, checking Apna. Candidates aren't right — wrong experience, location, salary. Kitchen is short-staffed, service suffers.", "We run targeted campaigns reaching thousands of relevant candidates. Within 10 days, you get 20 screened candidates."],
    deliverables: ['Job poster design (2 variations)', 'Posting on Apna + WorkIndia + 5 Facebook groups', 'WhatsApp application collection', 'Up to 20 screened candidates', 'Candidate shortlist with details'],
    exclusions: ['Interviews', 'Salary negotiation', 'Background verification'],
    steps: [['Requirements call', '15 minutes — role, salary range, experience, location.'], ['Campaign launched', 'Job poster on Apna, WorkIndia, 5 targeted Facebook groups.'], ['Applications collected', 'Candidates apply via WhatsApp. We screen for fit.'], ['Shortlist delivered', '15-20 screened candidates with name, experience, location, salary.']],
    theyProvide: ['Job description (or we write it)', 'Salary range', 'Location preference'], weHandle: ['Poster design', 'Multi-platform posting', 'Application collection', 'Screening', 'Shortlist'],
    suggests: [] },

  pack_m1: { name: 'Digital Starter Pack', category: 'packs', setup: 24999, monthly: 0, amc: 0, timeline: '15 working days', paymentLabel: 'One-time',
    problemHeadline: "Starting from zero? This gets you online everywhere in 15 days.",
    problemLines: ["No Google listing, no Instagram, no Swiggy, no website. You're invisible to 90% of potential customers.", "The Digital Starter Pack puts you on every platform that matters — in 15 days."],
    deliverables: ['Google Maps Listing with photos & menu', 'Instagram & Facebook pages + food photos', 'QR Menu with printed standees', 'Swiggy or Zomato listing'],
    exclusions: ['Ongoing posting', 'Ads', 'WhatsApp ordering'],
    steps: [['Kickoff call', '30-minute call: menu, photos, brand basics.'], ['All platforms set up', 'Google, Instagram, Facebook, Swiggy/Zomato — all simultaneously.'], ['QR menu deployed', 'Digital menu with QR codes on standees for every table.'], ['Handover', 'All credentials, assets, guide. You\'re online.']],
    theyProvide: ['Menu with prices', 'Logo', '30 min for kickoff'], weHandle: ['Everything — photos to platform setup to QR printing'],
    suggests: ['social_s2', 'whatsapp_w1'] },

  pack_m2: { name: 'Growth Pack', category: 'packs', setup: 69999, monthly: 14999, amc: 0, timeline: '20 working days', paymentLabel: 'Monthly retainer',
    problemHeadline: "You don't need 5 vendors. You need one team.",
    problemLines: ["One agency for social, another for Google, a freelancer for WhatsApp. Different timelines, quality, invoices. Nobody sees the full picture.", "The Growth Pack puts everything under one roof — all connected, consistent, managed by one team that runs restaurants ourselves."],
    deliverables: ['Google Presence Management', 'Social Media Management (daily posting)', 'WhatsApp Ordering + Booking', 'All 3 delivery platforms + commission analysis', 'Restaurant Website with QR menu'],
    exclusions: ['Reels/video', 'Paid ads', 'Customer tracking dashboard'],
    steps: [['Discovery call', '45 minutes — restaurant, menu, brand, priorities.'], ['Phase 1: Foundation (Week 1-2)', 'Google, social, photos, WhatsApp catalog — built simultaneously.'], ['Phase 2: Activation (Week 2-3)', 'Website, delivery platforms, ordering system live.'], ['Phase 3: Ongoing', 'Daily posting, weekly Google posts, review management, monthly reporting.']],
    theyProvide: ['Menu + prices', '1 hour for discovery', 'Page access + Razorpay account'], weHandle: ['Every single thing — setup, content, posting, ordering, reviews, reporting'],
    suggests: [] },
};


// ═══════════════════════════════════════════════════════════════
// API HANDLER
// ═══════════════════════════════════════════════════════════════

export async function onRequest(context) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
  if (context.request.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  const url = new URL(context.request.url);
  const action = url.searchParams.get('action');
  const { env } = context;

  // GET: View proposal (HTML page — primary customer view)
  if (context.request.method === 'GET' && action === 'view') {
    const id = url.searchParams.get('id');
    if (!id) return new Response('Not found', { status: 404 });
    const proposal = await env.DB.prepare('SELECT * FROM proposals WHERE id = ?').bind(id).first();
    if (!proposal) return new Response('Proposal not found', { status: 404 });

    if (!proposal.viewed_at) {
      await env.DB.prepare('UPDATE proposals SET viewed_at = datetime("now"), status = "viewed" WHERE id = ?').bind(id).run();
    }

    return new Response(renderProposalHTML(proposal), {
      headers: { ...corsHeaders, 'Content-Type': 'text/html' }
    });
  }

  // GET: Download PDF
  if (context.request.method === 'GET' && action === 'pdf') {
    const id = url.searchParams.get('id');
    if (!id) return new Response('Not found', { status: 404 });
    const proposal = await env.DB.prepare('SELECT * FROM proposals WHERE id = ?').bind(id).first();
    if (!proposal) return new Response('Proposal not found', { status: 404 });

    const pdfBytes = generateProposalPDF(proposal);
    return new Response(pdfBytes, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="SparkSol-Proposal-${id.toUpperCase()}.pdf"`,
      }
    });
  }

  // POST: Create proposal
  if (context.request.method === 'POST' && action === 'create') {
    try {
      const data = await context.request.json();
      const serviceId = data.service_id;
      const service = SERVICES[serviceId];
      if (!service) return new Response(JSON.stringify({ error: 'Invalid service' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

      const id = generateId();

      // Store proposal with rich context
      await env.DB.prepare(
        `INSERT INTO proposals (id, restaurant_name, contact_name, phone, email, location, service_id, service_name, deliverables, exclusions, setup_price, monthly_price, amc_price, timeline, source, status, created_at) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15, 'sent', datetime('now'))`
      ).bind(
        id, data.restaurant_name || '', data.contact_name || '', data.phone || '', data.email || '', data.location || 'Bangalore',
        serviceId, service.name, JSON.stringify(service.deliverables), JSON.stringify(service.exclusions),
        service.setup, service.monthly, service.amc || 0, service.timeline, data.source || 'website'
      ).run();

      const proposalUrl = `https://sparksol.in/api/proposal?action=view&id=${id}`;

      // Send via WhatsApp (non-blocking — don't crash if WA fails)
      if (data.phone) {
        const phone = data.phone.replace(/\D/g, '');
        sendWhatsAppProposal(env, phone, data.restaurant_name, data.contact_name, service.name, proposalUrl, id, { ...service, id, restaurant_name: data.restaurant_name, contact_name: data.contact_name, location: data.location, created_at: new Date().toISOString() }).catch(e => console.error('WA error:', e));
      }

      return new Response(JSON.stringify({ success: true, id, url: proposalUrl }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message, stack: err.stack }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  }

  // GET: List services (for bot and frontend)
  if (action === 'services') {
    const category = url.searchParams.get('category');
    const filtered = Object.entries(SERVICES)
      .filter(([k]) => !category || SERVICES[k].category === category)
      .map(([id, s]) => ({ id, name: s.name, category: s.category, setup: s.setup, monthly: s.monthly, amc: s.amc, paymentLabel: s.paymentLabel, suggests: s.suggests }));
    return new Response(JSON.stringify(filtered), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }

  // GET: Full service detail (for smart selector)
  if (action === 'service-detail') {
    const id = url.searchParams.get('id');
    const service = SERVICES[id];
    if (!service) return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

    // Return full service data + suggested service names
    const suggestDetails = (service.suggests || []).map(sid => {
      const s = SERVICES[sid];
      return s ? { id: sid, name: s.name, paymentLabel: s.paymentLabel, setup: s.setup, monthly: s.monthly } : null;
    }).filter(Boolean);

    return new Response(JSON.stringify({ ...service, id, suggestDetails }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }

  return new Response('OK', { status: 200, headers: corsHeaders });
}


// ═══════════════════════════════════════════════════════════════
// WHATSAPP DELIVERY
// ═══════════════════════════════════════════════════════════════

function generateId() {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  for (let i = 0; i < 8; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

async function sendWhatsAppProposal(env, phone, restaurantName, contactName, serviceName, url, proposalId, proposal) {
  try {
    // Step 1: Send proposal link message
    await fetch(`${WA_API}/${env.WA_PHONE_ID}/messages`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${env.WA_ACCESS_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messaging_product: 'whatsapp', to: phone, type: 'text',
        text: { body:
          `Hi ${contactName || 'there'},\n\n` +
          `Your proposal for *${restaurantName}* is ready.\n\n` +
          `*Service:* ${serviceName}\n` +
          `*View your proposal:*\n${url}\n\n` +
          `This is a personalized proposal with everything you need to know — deliverables, timeline, pricing, and next steps.\n\n` +
          `Valid for 30 days.`
        }
      })
    });

    // Step 2: Send "Schedule a Call" buttons
    await fetch(`${WA_API}/${env.WA_PHONE_ID}/messages`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${env.WA_ACCESS_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messaging_product: 'whatsapp', to: phone, type: 'interactive',
        interactive: {
          type: 'button',
          body: { text: 'Ready to discuss? Let\'s schedule a quick call.' },
          action: {
            buttons: [
              { type: 'reply', reply: { id: 'schedule_morning', title: 'Morning (10-12)' } },
              { type: 'reply', reply: { id: 'schedule_afternoon', title: 'Afternoon (2-5)' } },
              { type: 'reply', reply: { id: 'schedule_evening', title: 'Evening (6-8)' } },
            ]
          }
        }
      })
    });

    // Step 3: Notify Nihaf
    await fetch(`${WA_API}/${env.WA_PHONE_ID}/messages`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${env.WA_ACCESS_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messaging_product: 'whatsapp', to: '917010426808', type: 'text',
        text: { body:
          `NEW PROPOSAL SENT\n\n` +
          `Restaurant: ${restaurantName}\n` +
          `Contact: ${contactName || 'Unknown'}\n` +
          `Phone: ${phone}\n` +
          `Service: ${serviceName}\n` +
          `Proposal: ${url}\n` +
          `Ref: ${proposalId.toUpperCase()}`
        }
      })
    });

  } catch (e) { console.error('WA send error:', e); }
}


// ═══════════════════════════════════════════════════════════════
// HTML PROPOSAL PAGE (v2 — 7-section design, mobile-first)
// ═══════════════════════════════════════════════════════════════

function renderProposalHTML(p) {
  const deliverables = JSON.parse(p.deliverables || '[]');
  const exclusions = JSON.parse(p.exclusions || '[]');
  const service = SERVICES[p.service_id] || {};
  const firstMonth = (p.setup_price || 0) + (p.monthly_price || 0);
  const date = new Date(p.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
  const steps = service.steps || [];
  const theyProvide = service.theyProvide || [];
  const weHandle = service.weHandle || [];
  const problemHeadline = service.problemHeadline || '';
  const problemLines = service.problemLines || [];
  const waLink = `https://wa.me/917010426808?text=${encodeURIComponent(`Hi, I've reviewed proposal ${p.id.toUpperCase()} for ${p.restaurant_name} (${p.service_name}). I'd like to schedule a call.`)}`;

  return `<!DOCTYPE html><html lang="en"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Proposal for ${esc(p.restaurant_name)} — ${esc(p.service_name)} | SparkSol</title>
<meta name="robots" content="noindex">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--navy:#1a1a2e;--gold:#c9963b;--gold-light:#f8f0e3;--dark:#2d2d2d;--gray:#888;--light:#f5f5f5;--white:#fff;--green:#228B54;--red:#cc4444}
body{font-family:'Inter',system-ui,sans-serif;color:var(--dark);line-height:1.7;background:var(--light);-webkit-font-smoothing:antialiased}

/* Cover */
.cover{background:var(--navy);padding:48px 28px;min-height:60vh;display:flex;flex-direction:column;justify-content:center}
.cover-brand{font-size:12px;color:var(--gray);margin-bottom:48px;letter-spacing:0.5px}
.cover h1{font-size:clamp(28px,6vw,42px);font-weight:800;color:var(--white);letter-spacing:-1px;margin-bottom:8px}
.cover .service{font-size:clamp(18px,4vw,24px);color:var(--gold);font-weight:600;margin-bottom:24px}
.cover .prepared{font-size:14px;color:#aaa}
.cover .date{font-size:13px;color:#666;margin-top:4px}

/* Sections */
.section{max-width:680px;margin:0 auto;padding:48px 28px}
.section-label{font-size:11px;font-weight:600;color:var(--gray);text-transform:uppercase;letter-spacing:1.5px;margin-bottom:8px}
.gold-bar{width:60px;height:3px;background:var(--gold);margin-bottom:20px;border-radius:2px}

/* Problem */
.problem h2{font-size:clamp(22px,5vw,32px);font-weight:800;color:var(--navy);letter-spacing:-0.5px;margin-bottom:20px;line-height:1.2}
.problem p{font-size:15px;color:#444;margin-bottom:14px}
.proof{color:var(--gold);font-weight:600;font-style:italic;margin-top:20px;font-size:14px}

/* Deliverables */
.service-name{font-size:clamp(20px,4vw,28px);font-weight:800;color:var(--gold);margin-bottom:8px}
.payment-badge{display:inline-block;background:var(--gold-light);color:var(--gold);font-size:11px;font-weight:700;padding:4px 12px;border-radius:6px;margin-bottom:24px;text-transform:uppercase;letter-spacing:0.5px}
.del-list{list-style:none;margin-bottom:28px}
.del-list li{font-size:14px;padding:8px 0 8px 28px;position:relative;border-bottom:1px solid #f0f0f0}
.del-list li::before{content:'';position:absolute;left:0;top:14px;width:8px;height:8px;border-radius:50%;background:var(--gold)}
.inc-list{list-style:none;margin-bottom:20px}
.inc-list li{font-size:13px;padding:5px 0 5px 20px;position:relative;color:#444}
.inc-list.yes li::before{content:'+';position:absolute;left:2px;color:var(--green);font-weight:700}
.inc-list.no li::before{content:'-';position:absolute;left:2px;color:var(--red);font-weight:700}
.inc-list.no li{color:var(--gray)}
h3{font-size:15px;font-weight:700;margin-bottom:10px;color:var(--dark)}

/* Steps */
.step{display:flex;gap:16px;margin-bottom:24px}
.step-num{font-size:28px;font-weight:800;color:var(--gold);min-width:36px;line-height:1}
.step-title{font-size:14px;font-weight:700;margin-bottom:2px}
.step-desc{font-size:13px;color:var(--gray);line-height:1.6}
.timeline-box{background:var(--gold-light);border-radius:8px;padding:14px 20px;font-size:14px;color:var(--gold);font-weight:600;margin:20px 0}
.two-col{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:20px}
.two-col h4{font-size:13px;font-weight:700;margin-bottom:8px;color:var(--dark)}
.two-col li{font-size:12px;color:var(--gray);list-style:none;padding:3px 0}

/* Investment */
.price-big{font-size:clamp(28px,6vw,40px);font-weight:800;color:var(--gold);margin:16px 0}
.price-detail{font-size:14px;color:#444;margin-bottom:6px}
.terms-box{background:var(--gold-light);border-radius:10px;padding:20px;margin:24px 0}
.terms-box h4{font-size:13px;font-weight:700;margin-bottom:10px}
.terms-box li{font-size:13px;color:#444;list-style:none;padding:4px 0}

/* Why */
.reason{margin-bottom:28px}
.reason h4{font-size:15px;font-weight:700;color:var(--gold);margin-bottom:4px}
.reason p{font-size:14px;color:#444}

/* CTA */
.cta-section{background:var(--navy);padding:60px 28px;text-align:center}
.cta-section h2{font-size:clamp(24px,5vw,36px);font-weight:800;color:var(--white);margin-bottom:12px}
.cta-section p{font-size:15px;color:#aaa;margin-bottom:28px}
.cta-btn{display:inline-block;background:var(--green);color:var(--white);padding:16px 40px;border-radius:10px;font-size:16px;font-weight:700;text-decoration:none;transition:all 0.2s}
.cta-btn:hover{background:#1A6B40;transform:translateY(-1px);box-shadow:0 4px 20px rgba(34,139,84,0.3)}
.cta-note{font-size:12px;color:#666;margin-top:16px}
.contact{margin-top:32px;font-size:13px;color:var(--gold)}

.footer{text-align:center;padding:24px;font-size:11px;color:var(--gray);background:var(--white)}
.divider{height:1px;background:var(--gold);opacity:0.3;max-width:680px;margin:0 auto}

@media(max-width:600px){.two-col{grid-template-columns:1fr}}
</style></head><body>

<!-- 1. COVER -->
<div class="cover">
  <div class="cover-brand">SparkSol Hospitality Pvt Ltd | Bangalore</div>
  <h1>${esc(p.restaurant_name)}</h1>
  <div class="service">${esc(p.service_name)}</div>
  <div class="prepared">Prepared for ${esc(p.contact_name || p.restaurant_name)}</div>
  <div class="date">${date} | Ref: ${p.id.toUpperCase()}</div>
</div>

<!-- 2. THE PROBLEM -->
<div class="section problem">
  <div class="gold-bar"></div>
  <h2>${esc(problemHeadline)}</h2>
  ${problemLines.map(l => `<p>${esc(l)}</p>`).join('')}
  <p class="proof">We've solved this at our own restaurants — Hamza Express and Nawabi Chai House, Bangalore.</p>
</div>
<div class="divider"></div>

<!-- 3. WHAT YOU GET -->
<div class="section">
  <div class="section-label">What You Get</div>
  <div class="gold-bar"></div>
  <div class="service-name">${esc(p.service_name)}</div>
  <div class="payment-badge">${esc(service.paymentLabel || 'Custom')}</div>

  <h3>Deliverables</h3>
  <ul class="del-list">${deliverables.map(d => `<li>${esc(d)}</li>`).join('')}</ul>

  <h3>Included</h3>
  <ul class="inc-list yes">${deliverables.slice(0, 5).map(d => `<li>${esc(d)}</li>`).join('')}</ul>

  ${exclusions.length ? `<h3>Not Included</h3><ul class="inc-list no">${exclusions.map(e => `<li>${esc(e)}</li>`).join('')}</ul>` : ''}
</div>
<div class="divider"></div>

<!-- 4. HOW IT WORKS -->
<div class="section">
  <div class="section-label">How It Works</div>
  <div class="gold-bar"></div>
  ${steps.map((s, i) => `<div class="step"><div class="step-num">${String(i+1).padStart(2,'0')}</div><div><div class="step-title">${esc(s[0])}</div><div class="step-desc">${esc(s[1])}</div></div></div>`).join('')}

  <div class="timeline-box">Timeline: ${esc(p.timeline || service.timeline || 'To be discussed')}</div>

  <div class="two-col">
    <div><h4>You Provide</h4>${theyProvide.map(t => `<li>${esc(t)}</li>`).join('')}</div>
    <div><h4>We Handle</h4>${weHandle.map(w => `<li>${esc(w)}</li>`).join('')}</div>
  </div>
</div>
<div class="divider"></div>

<!-- 5. INVESTMENT -->
<div class="section">
  <div class="section-label">Investment</div>
  <div class="gold-bar"></div>
  <div class="price-big">${formatPrice(p)}</div>
  ${p.setup_price > 0 ? `<div class="price-detail">One-time setup: Rs ${num(p.setup_price)}</div>` : ''}
  ${p.monthly_price > 0 ? `<div class="price-detail">Monthly: Rs ${num(p.monthly_price)}/month</div>` : ''}
  ${p.amc_price > 0 ? `<div class="price-detail">Annual support: Rs ${num(p.amc_price)}/year</div>` : ''}
  ${firstMonth > 0 && p.setup_price > 0 && p.monthly_price > 0 ? `<div class="price-detail" style="margin-top:8px;font-weight:700;color:var(--gold)">First month total: Rs ${num(firstMonth)}</div>` : ''}

  <div class="terms-box">
    <h4>Payment Terms</h4>
    <li>Payment via UPI or bank transfer to SparkSol Hospitality Pvt Ltd</li>
    ${p.setup_price > 0 ? '<li>Setup fee payable in advance to begin work</li>' : ''}
    ${p.monthly_price > 0 ? '<li>Monthly payment due on 1st of each month</li>' : ''}
    <li>30-day notice to pause or cancel — no lock-in</li>
    <li>This proposal is valid for 30 days</li>
  </div>
</div>
<div class="divider"></div>

<!-- 6. WHY SPARKSOL -->
<div class="section">
  <div class="section-label">Why SparkSol</div>
  <div class="gold-bar"></div>
  <div class="reason"><h4>We run restaurants ourselves</h4><p>Everything we offer runs live at our own outlets — Hamza Express and Nawabi Chai House in Bangalore. This isn't theory. It's what we built, tested, and use every day.</p></div>
  <div class="reason"><h4>You own everything</h4><p>Your data, your billing system, your customer list — it's all yours. We don't lock you into subscriptions or hold your data hostage.</p></div>
  <div class="reason"><h4>No learning curve</h4><p>You already use WhatsApp, Google, and Instagram. We just make them work harder for your restaurant.</p></div>
  <div class="reason"><h4>Results, not promises</h4><p>We don't show decks and roadmaps. We show what's already working — at our restaurants, today.</p></div>
</div>

<!-- 7. NEXT STEP -->
<div class="cta-section">
  <h2>Ready to start?</h2>
  <p>${esc(p.contact_name || 'Let\'s')} get this going. One conversation is all it takes.</p>
  <a href="${waLink}" class="cta-btn">Schedule a Call</a>
  <div class="cta-note">Or just reply on WhatsApp</div>
  <div class="contact">nihafwork@gmail.com | +91 70104 26808<br>SparkSol Hospitality Pvt Ltd | Bangalore</div>
</div>

<div class="footer">SparkSol Hospitality Pvt Ltd | CIN: U74999KA2019PTC122300 | sparksol.in</div>

</body></html>`;
}

function formatPrice(p) {
  if (p.monthly_price > 0 && p.setup_price > 0) return `Rs ${num(p.setup_price)} + Rs ${num(p.monthly_price)}/mo`;
  if (p.monthly_price > 0) return `Rs ${num(p.monthly_price)}/month`;
  if (p.amc_price > 0) return `Rs ${num(p.setup_price)} + Rs ${num(p.amc_price)}/year`;
  return `Rs ${num(p.setup_price)}`;
}

function num(n) { return Number(n || 0).toLocaleString('en-IN'); }
function esc(s) { return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }


// ═══════════════════════════════════════════════════════════════
// PDF GENERATOR (compact 1-page version for WABA attachment)
// ═══════════════════════════════════════════════════════════════

function generateProposalPDF(proposal) {
  const p = proposal;
  const deliverables = JSON.parse(p.deliverables || '[]');
  const exclusions = JSON.parse(p.exclusions || '[]');
  const service = SERVICES[p.service_id] || {};
  const date = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
  const firstMonth = (p.setup_price || 0) + (p.monthly_price || 0);

  const lines = [];
  let y = 780;
  const lm = 50;
  const rw = 495;

  function addText(text, x, yPos, size, bold, color) {
    const font = bold ? '/F2' : '/F1';
    const r = ((color >> 16) & 0xFF) / 255;
    const g = ((color >> 8) & 0xFF) / 255;
    const b = (color & 0xFF) / 255;
    lines.push(`BT ${font} ${size} Tf ${r.toFixed(3)} ${g.toFixed(3)} ${b.toFixed(3)} rg ${x} ${yPos} Td (${escPDF(text)}) Tj ET`);
  }
  function addLine(x1, y1, x2, y2, color, width) {
    const r = ((color >> 16) & 0xFF) / 255; const g = ((color >> 8) & 0xFF) / 255; const b = (color & 0xFF) / 255;
    lines.push(`${width || 0.5} w ${r.toFixed(3)} ${g.toFixed(3)} ${b.toFixed(3)} RG ${x1} ${y1} m ${x2} ${y2} l S`);
  }
  function addRect(x, yPos, w, h, color) {
    const r = ((color >> 16) & 0xFF) / 255; const g = ((color >> 8) & 0xFF) / 255; const b = (color & 0xFF) / 255;
    lines.push(`${r.toFixed(3)} ${g.toFixed(3)} ${b.toFixed(3)} rg ${x} ${yPos} ${w} ${h} re f`);
  }

  // Header
  addRect(0, 720, 595, 122, 0x1A1A2E);
  addText('SparkSol Hospitality', lm, 810, 16, true, 0xC9963B);
  addText('PROPOSAL FOR', lm, 788, 9, true, 0x94A3B8);
  addText(p.restaurant_name || 'Your Restaurant', lm, 768, 22, true, 0xFFFFFF);
  addText(p.service_name || 'Service', lm, 746, 14, false, 0xC9963B);
  addText('Prepared ' + date + '  |  Ref: ' + (p.id || '').toUpperCase(), 300, 810, 8, false, 0x94A3B8);

  // Deliverables
  y = 700;
  addText('WHAT YOU GET', lm, y, 9, true, 0x8E8E99);
  y -= 5; addLine(lm, y, lm + rw, y, 0xF1F1F3, 0.5);
  deliverables.forEach(d => { y -= 16; if (y < 60) return; addText('  ' + d, lm + 4, y, 10, false, 0x36363F); });

  // Exclusions
  y -= 24; addText("NOT INCLUDED", lm, y, 9, true, 0x8E8E99);
  y -= 5; addLine(lm, y, lm + rw, y, 0xF1F1F3, 0.5);
  exclusions.forEach(e => { y -= 16; if (y < 60) return; addText('  ' + e, lm + 4, y, 10, false, 0x8E8E99); });

  // Pricing
  y -= 28; addRect(lm - 10, y - 80, rw + 20, 100, 0xF9F9FA);
  addText('PRICING', lm, y, 9, true, 0x8E8E99);
  y -= 5; addLine(lm, y, lm + rw, y, 0xF1F1F3, 0.5);
  if (p.setup_price > 0) { y -= 18; addText('Setup', lm + 4, y, 10, false, 0x36363F); addText('Rs ' + Number(p.setup_price).toLocaleString('en-IN'), 420, y, 10, true, 0x1A1A2E); }
  if (p.monthly_price > 0) { y -= 18; addText('Monthly', lm + 4, y, 10, false, 0x36363F); addText('Rs ' + Number(p.monthly_price).toLocaleString('en-IN') + '/month', 420, y, 10, true, 0x1A1A2E); }
  if (p.amc_price > 0) { y -= 18; addText('Annual support', lm + 4, y, 10, false, 0x36363F); addText('Rs ' + Number(p.amc_price).toLocaleString('en-IN') + '/year', 420, y, 10, true, 0x1A1A2E); }

  // Timeline
  y -= 30; addRect(lm - 10, y - 10, rw + 20, 24, 0xF8F0E3);
  addText('Timeline: ' + (p.timeline || 'To be discussed'), lm + 4, y, 10, true, 0xC9963B);

  // Next step
  y -= 36; addText('NEXT STEP', lm, y, 9, true, 0x8E8E99);
  y -= 18; addText('Open the link sent with this PDF to view the full proposal.', lm, y, 10, false, 0x36363F);
  y -= 16; addText('Reply to schedule a call.', lm, y, 10, false, 0xC9963B);

  // Footer
  addLine(lm, 50, lm + rw, 50, 0xF1F1F3, 0.5);
  addText('SparkSol Hospitality Pvt Ltd  |  Bangalore  |  sparksol.in  |  +91 70104 26808', lm, 36, 7, false, 0x8E8E99);

  const stream = lines.join('\n');
  const streamLen = new TextEncoder().encode(stream).length;

  const pdf = `%PDF-1.4
1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj
2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj
3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 595 842]/Contents 4 0 R/Resources<</Font<</F1 5 0 R/F2 6 0 R>>>>>>endobj
4 0 obj<</Length ${streamLen}>>
stream
${stream}
endstream
endobj
5 0 obj<</Type/Font/Subtype/Type1/BaseFont/Helvetica/Encoding/WinAnsiEncoding>>endobj
6 0 obj<</Type/Font/Subtype/Type1/BaseFont/Helvetica-Bold/Encoding/WinAnsiEncoding>>endobj
xref
0 7
0000000000 65535 f
0000000009 00000 n
0000000058 00000 n
0000000115 00000 n
0000000266 00000 n
${String(300 + streamLen).padStart(10, '0')} 00000 n
${String(395 + streamLen).padStart(10, '0')} 00000 n
trailer<</Size 7/Root 1 0 R>>
startxref
${490 + streamLen}
%%EOF`;

  return new TextEncoder().encode(pdf);
}

function escPDF(str) {
  return str.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)').replace(/[^\x20-\x7E]/g, ' ');
}
