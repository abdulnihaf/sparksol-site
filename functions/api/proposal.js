// SparkSol Proposal Generator
// Creates personalized proposals, stores in D1, sends via WhatsApp


const WA_API = 'https://graph.facebook.com/v21.0';

// Service catalog for proposal generation
const SERVICES = {
  // Social Media
  social_s1: { name: 'Social Media Setup + Photos', setup: 14999, monthly: 0, amc: 0, timeline: '10 working days',
    deliverables: ['Instagram & Facebook pages with brand identity', 'First 9 posts designed and published', 'Up to 40 AI food photos (styled + white background)', 'Brand kit: logo, colors, fonts', 'Content pillars defined', 'All assets + credentials handed over'],
    exclusions: ['Ongoing posting', 'Reels/video', 'Ads', 'Photo reshoots if menu changes'] },
  social_s2: { name: 'Social Media Management', setup: 14999, monthly: 12999, amc: 0, timeline: 'Setup: 10 days, posting starts month 1',
    deliverables: ['Everything in Setup + Photos', '20 posts/month (10 food, 5 BTS, 3 offers, 2 reviews)', 'Content calendar shared on 1st of each month', '10 stories/month', 'DM replies within 4 hours', 'Monthly analytics report'],
    exclusions: ['Reels/video production', 'Paid ads', 'Influencer collaborations', 'Photography reshoots'] },
  social_s3: { name: 'Social Media Full Service', setup: 14999, monthly: 24999, amc: 0, timeline: 'Setup: 10 days, full service from month 1',
    deliverables: ['Everything in Management', '4 food reels/month (15-30 sec, trending audio)', '2 story-format videos/month', 'Instagram + Facebook ads management', 'Monthly ads report', 'Quarterly content strategy review'],
    exclusions: ['Ad spend (paid to Meta, min ₹10K/mo recommended)', 'Influencer partnerships', 'Event coverage'] },
  // Google
  google_g1: { name: 'Google Maps Listing', setup: 4999, monthly: 0, amc: 0, timeline: '5 working days',
    deliverables: ['Google Business Profile created and verified', '30+ food photos uploaded', 'Full menu with prices', 'Correct hours, categories, contact', 'Review collection QR codes (5 standees)', 'Login credentials + guide handed over'],
    exclusions: ['Ongoing posting', 'Review reply management', 'Google Ads'] },
  google_g2: { name: 'Google Presence Management', setup: 7999, monthly: 4999, amc: 0, timeline: 'Setup: 5 days, ongoing from month 1',
    deliverables: ['Everything in Maps Listing', '4 Google Business Posts/month', 'Review growth system (QR + staff training)', 'All reviews replied within 24hrs', 'Monthly performance report', 'Quarterly listing audit'],
    exclusions: ['Google Ads', 'Social media posting', 'Website'] },
  google_g3: { name: 'Google Presence + Ads', setup: 9999, monthly: 9999, amc: 0, timeline: 'Setup: 7 days, ads live within 48hrs',
    deliverables: ['Everything in Presence Management', 'Google Search Ads campaign', 'Keyword research + location targeting', 'Monthly ads report with CPA and ROAS', 'Conversion tracking (calls, directions, clicks)'],
    exclusions: ['Ad spend (paid to Google, min ₹10K/mo recommended)', 'Social media ads'] },
  // WhatsApp
  whatsapp_w1: { name: 'WhatsApp Ordering + Booking', setup: 24999, monthly: 0, amc: 11999, timeline: '10 working days',
    deliverables: ['WhatsApp Business API setup', 'Product catalog: up to 50 items with photos', 'Ordering flow: browse → cart → checkout → payment', 'Razorpay payment integration (UPI, cards)', 'Table booking flow', 'Auto-replies for common queries', 'Admin dashboard + 30-min training call'],
    exclusions: ['Promotional broadcasts', 'Customer follow-ups', 'Customer tracking/CRM'] },
  whatsapp_w2: { name: 'WhatsApp Ordering + Marketing', setup: 34999, monthly: 7999, amc: 0, timeline: '12 working days',
    deliverables: ['Everything in Ordering + Booking', '2 broadcast campaigns/month', 'Automatic 72-hour follow-up', 'Customer auto-tagging (new/repeat/inactive/VIP)', 'Monthly broadcast performance report'],
    exclusions: ['Customer tracking dashboard', 'More than 2 campaigns/month (₹2K each additional)'] },
  // POS
  pos_p1: { name: 'Self-Hosted POS', setup: 29999, monthly: 0, amc: 9999, timeline: '7-10 working days',
    deliverables: ['Odoo 19 POS on your hardware', 'Up to 100 items configured', 'Cash, UPI, card payments', 'Branded receipt template', '2-hour on-site staff training', 'Owner + 3 staff accounts'],
    exclusions: ['Hardware (tablet/printer — we recommend, you buy)', 'Kitchen Display', 'Settlement', 'Ongoing menu changes beyond 10/month'] },
  // Photography
  photo_ph1: { name: 'AI Food Photography', setup: 8000, monthly: 0, amc: 0, timeline: '5 working days',
    deliverables: ['Up to 40 AI-generated dish photos', 'White background + styled variants', 'Optimized for Instagram, Swiggy, Zomato, WhatsApp', 'High-res files handed over'],
    exclusions: ['Real on-site photography', 'Interior shots', 'Video'] },
  photo_ph2: { name: 'Real Menu Shoot', setup: 14999, monthly: 0, amc: 0, timeline: '7-10 working days',
    deliverables: ['Professional photographer visit', 'Up to 15 dishes (basic styling, 2-3 angles)', 'Retouched and color-corrected', 'All platforms optimized'],
    exclusions: ['Styled/lifestyle shots', 'Interior', 'Video', 'Extra dishes: ₹799/dish'] },
  // Design
  design_ds1: { name: 'Packaging Design (3 SKUs)', setup: 10500, monthly: 0, amc: 0, timeline: '7 working days',
    deliverables: ['3 packaging designs (box, bag, cup/napkin)', 'Your logo, brand colors, QR code integrated', 'Print-ready files (PDF, AI, EPS)', '2 revision rounds per SKU'],
    exclusions: ['Manufacturing/printing', 'More than 3 SKUs (₹3,500 each additional)'] },
  design_ds3: { name: 'Full Brand Suite', setup: 22500, monthly: 0, amc: 0, timeline: '12-15 working days',
    deliverables: ['3 packaging SKU designs', '8-page printed menu design', 'Food photos integrated', 'Consistent brand identity', 'Print-ready files for everything'],
    exclusions: ['Printing', 'Photography (add separately)', 'More than 3+8 items'] },
  // Hiring
  hiring_h1: { name: 'Hiring Campaign', setup: 6999, monthly: 0, amc: 0, timeline: '7-10 working days',
    deliverables: ['Job poster design (2 variations)', 'Posting on Apna + WorkIndia + 5 FB groups', 'WhatsApp application collection', 'Up to 20 screened candidates', 'Candidate shortlist with details'],
    exclusions: ['Interviews', 'Salary negotiation', 'Background verification'] },
  // Packs
  pack_m1: { name: 'Digital Starter Pack', setup: 24999, monthly: 0, amc: 0, timeline: '15 working days',
    deliverables: ['Google Maps Listing with photos & menu', 'Instagram & Facebook pages + food photos', 'QR Menu with printed standees', 'Swiggy or Zomato listing'],
    exclusions: ['Ongoing posting', 'Ads', 'WhatsApp ordering'] },
  pack_m2: { name: 'Growth Pack', setup: 69999, monthly: 14999, amc: 0, timeline: '20 working days',
    deliverables: ['Google Presence Management', 'Social Media Management (daily posting)', 'WhatsApp Ordering + Booking', 'All 3 delivery platforms + commission analysis', 'Restaurant Website with QR menu'],
    exclusions: ['Reels/video', 'Paid ads', 'Customer tracking'] },
};

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

  // GET: Render proposal page
  if (context.request.method === 'GET' && action === 'view') {
    const id = url.searchParams.get('id');
    if (!id) return new Response('Not found', { status: 404 });

    const proposal = await env.DB.prepare('SELECT * FROM proposals WHERE id = ?').bind(id).first();
    if (!proposal) return new Response('Proposal not found', { status: 404 });

    // Mark as viewed
    if (!proposal.viewed_at) {
      await env.DB.prepare('UPDATE proposals SET viewed_at = datetime("now"), status = "viewed" WHERE id = ?').bind(id).run();
    }

    return new Response(renderProposalHTML(proposal), {
      headers: { ...corsHeaders, 'Content-Type': 'text/html' }
    });
  }

  // POST: Create proposal
  if (context.request.method === 'POST' && action === 'create') {
    const data = await context.request.json();
    const serviceId = data.service_id;
    const service = SERVICES[serviceId];
    if (!service) return new Response(JSON.stringify({ error: 'Invalid service' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

    // Generate unique short ID
    const id = generateId();

    // Store proposal
    await env.DB.prepare(`
      INSERT INTO proposals (id, restaurant_name, contact_name, phone, email, location, service_id, service_name, deliverables, exclusions, setup_price, monthly_price, amc_price, timeline, source, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'sent', datetime('now'))
    `).bind(
      id, data.restaurant_name, data.contact_name, data.phone, data.email, data.location,
      serviceId, service.name, JSON.stringify(service.deliverables), JSON.stringify(service.exclusions),
      service.setup, service.monthly, service.amc || 0, service.timeline, data.source || 'website'
    ).run();

    const proposalUrl = `https://sparksol.in/api/proposal?action=view&id=${id}`;

    // Send PDF via WhatsApp
    if (data.phone) {
      const phone = data.phone.replace(/\D/g, '');
      const fullProposal = {
        id, restaurant_name: data.restaurant_name, contact_name: data.contact_name,
        location: data.location || 'Bangalore', service_name: service.name,
        deliverables: JSON.stringify(service.deliverables), exclusions: JSON.stringify(service.exclusions),
        setup_price: service.setup, monthly_price: service.monthly, amc_price: service.amc || 0,
        timeline: service.timeline, created_at: new Date().toISOString(),
      };
      await sendWhatsAppProposal(env, phone, data.restaurant_name, service.name, proposalUrl, id, fullProposal);
    }

    return new Response(JSON.stringify({ success: true, id, url: proposalUrl }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  // GET: List services (for bot)
  if (action === 'services') {
    const category = url.searchParams.get('category');
    const filtered = Object.entries(SERVICES)
      .filter(([k]) => !category || k.startsWith(category))
      .map(([id, s]) => ({ id, name: s.name, setup: s.setup, monthly: s.monthly, amc: s.amc }));
    return new Response(JSON.stringify(filtered), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }

  return new Response('OK', { status: 200, headers: corsHeaders });
}

function generateId() {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  for (let i = 0; i < 8; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

async function sendWhatsAppProposal(env, phone, restaurantName, serviceName, url, proposalId, proposal) {
  try {
    // Step 1: Generate PDF
    const pdfBytes = generateProposalPDF(proposal);

    // Step 2: Upload PDF to WhatsApp Media API
    const formData = new FormData();
    formData.append('file', new Blob([pdfBytes], { type: 'application/pdf' }), `SparkSol-Proposal-${proposalId.toUpperCase()}.pdf`);
    formData.append('messaging_product', 'whatsapp');
    formData.append('type', 'application/pdf');

    const uploadRes = await fetch(`${WA_API}/${env.WA_PHONE_ID}/media`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${env.WA_ACCESS_TOKEN}` },
      body: formData
    });
    const uploadData = await uploadRes.json();
    const mediaId = uploadData.id;

    if (mediaId) {
      // Step 3: Send PDF as document message
      await fetch(`${WA_API}/${env.WA_PHONE_ID}/messages`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${env.WA_ACCESS_TOKEN}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messaging_product: 'whatsapp', to: phone, type: 'document',
          document: {
            id: mediaId,
            filename: `SparkSol-Proposal-${proposalId.toUpperCase()}.pdf`,
            caption: `📄 Your SparkSol Proposal\n\nFor: *${restaurantName}*\nService: *${serviceName}*\n\nValid for 30 days. Review and reply when ready.`
          }
        })
      });

      // Step 4: Send "Schedule a Call" button
      await fetch(`${WA_API}/${env.WA_PHONE_ID}/messages`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${env.WA_ACCESS_TOKEN}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messaging_product: 'whatsapp', to: phone, type: 'interactive',
          interactive: {
            type: 'button',
            body: { text: 'Ready to discuss? Schedule a quick 15-minute call with our team.' },
            action: {
              buttons: [
                { type: 'reply', reply: { id: 'schedule_call', title: '📞 Schedule a Call' } },
                { type: 'reply', reply: { id: 'ask_question', title: '❓ Ask a Question' } }
              ]
            }
          }
        })
      });
    } else {
      // Fallback: send as text with PDF download link
      await fetch(`${WA_API}/${env.WA_PHONE_ID}/messages`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${env.WA_ACCESS_TOKEN}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messaging_product: 'whatsapp', to: phone, type: 'text',
          text: { body:
            `📄 *Your SparkSol Proposal*\n\n` +
            `For: *${restaurantName}*\nService: *${serviceName}*\n\n` +
            `Download your proposal:\n${url.replace('view', 'pdf')}\n\n` +
            `Valid for 30 days. Reply here to schedule a call.`
          }
        })
      });
    }
  } catch (e) { console.error('WA send error:', e); }
}

function renderProposalHTML(p) {
  const deliverables = JSON.parse(p.deliverables || '[]');
  const exclusions = JSON.parse(p.exclusions || '[]');
  const firstMonth = (p.setup_price || 0) + (p.monthly_price || 0);
  const date = new Date(p.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });

  return `<!DOCTYPE html><html lang="en"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Proposal for ${p.restaurant_name} | SparkSol</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',system-ui,sans-serif;color:#121219;line-height:1.7;background:#F9F9FA;-webkit-font-smoothing:antialiased}
.page{max-width:640px;margin:24px auto;background:#fff;border-radius:16px;box-shadow:0 4px 24px rgba(0,0,0,0.06);overflow:hidden}
.header{background:#121219;padding:40px 36px;color:#fff}
.logo{display:flex;align-items:center;gap:8px;font-size:20px;font-weight:800;margin-bottom:24px}
.logo svg{width:24px;height:24px}
.logo span{color:#C05621}
.header h1{font-size:13px;font-weight:600;color:#94A3B8;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:8px}
.header .restaurant{font-size:28px;font-weight:800;letter-spacing:-0.5px}
.header .location{font-size:14px;color:#94A3B8;margin-top:4px}
.header .meta{display:flex;gap:24px;margin-top:20px;font-size:12px;color:#64748B}
.body{padding:36px}
.service-name{font-size:22px;font-weight:800;color:#121219;margin-bottom:4px;letter-spacing:-0.3px}
.service-tag{display:inline-block;background:#FCF2ED;color:#C05621;font-size:11px;font-weight:600;padding:3px 10px;border-radius:8px;margin-bottom:20px}
.section{margin-bottom:28px}
.section h2{font-size:13px;font-weight:600;color:#8E8E99;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px}
.check-list{list-style:none}
.check-list li{font-size:14px;padding:6px 0;padding-left:24px;position:relative;color:#36363F}
.check-list li::before{content:'✓';position:absolute;left:0;color:#228B54;font-weight:700}
.cross-list li::before{content:'✗';color:#DC3232}
.pricing{background:#F9F9FA;border:1px solid #F1F1F3;border-radius:12px;padding:24px;margin-bottom:28px}
.price-row{display:flex;justify-content:space-between;padding:8px 0;font-size:14px;border-bottom:1px solid #F1F1F3}
.price-row:last-child{border:none;padding-top:12px;font-size:18px;font-weight:800;color:#C05621}
.timeline{background:#E8F7EE;border-radius:8px;padding:14px 20px;font-size:14px;color:#228B54;font-weight:500;margin-bottom:28px}
.cta{text-align:center;padding:28px 0}
.cta a{display:inline-block;background:#228B54;color:#fff;padding:14px 36px;border-radius:8px;font-size:15px;font-weight:600;text-decoration:none;transition:all 0.2s}
.cta a:hover{background:#1A6B40}
.cta p{font-size:13px;color:#8E8E99;margin-top:10px}
.footer{border-top:1px solid #F1F1F3;padding:24px 36px;text-align:center;font-size:11px;color:#8E8E99}
.valid{background:#FCF2ED;border-radius:8px;padding:10px 16px;font-size:12px;color:#C05621;font-weight:500;text-align:center;margin-bottom:20px}
@media(max-width:640px){.page{margin:0;border-radius:0}.header{padding:28px 20px}.body{padding:24px 20px}}
</style></head><body>
<div class="page">
  <div class="header">
    <div class="logo"><svg viewBox="0 0 28 28"><polygon points="14,1 17,10.5 26,14 17,17.5 14,27 11,17.5 2,14 11,10.5" fill="#C05621"/><circle cx="20" cy="6" r="2" fill="#B8860B" opacity="0.6"/></svg>Spark<span>Sol</span></div>
    <h1>Proposal For</h1>
    <div class="restaurant">${p.restaurant_name}</div>
    <div class="location">${p.location || 'Bangalore'}</div>
    <div class="meta"><span>Prepared ${date}</span><span>Ref: ${p.id.toUpperCase()}</span></div>
  </div>
  <div class="body">
    <div class="valid">This proposal is valid for 30 days</div>
    <div class="service-name">${p.service_name}</div>
    <div class="service-tag">Personalized for ${p.restaurant_name}</div>

    <div class="section">
      <h2>What You Get</h2>
      <ul class="check-list">${deliverables.map(d => `<li>${d}</li>`).join('')}</ul>
    </div>

    <div class="section">
      <h2>Not Included</h2>
      <ul class="check-list cross-list">${exclusions.map(e => `<li>${e}</li>`).join('')}</ul>
    </div>

    <div class="pricing">
      <div class="section" style="margin:0"><h2>Pricing</h2></div>
      ${p.setup_price > 0 ? `<div class="price-row"><span>One-time setup</span><span>₹${p.setup_price.toLocaleString('en-IN')}</span></div>` : ''}
      ${p.monthly_price > 0 ? `<div class="price-row"><span>Monthly recurring</span><span>₹${p.monthly_price.toLocaleString('en-IN')}/month</span></div>` : ''}
      ${p.amc_price > 0 ? `<div class="price-row"><span>Annual maintenance</span><span>₹${p.amc_price.toLocaleString('en-IN')}/year</span></div>` : ''}
      ${firstMonth > 0 ? `<div class="price-row"><span>First month total</span><span>₹${firstMonth.toLocaleString('en-IN')}</span></div>` : ''}
    </div>

    <div class="timeline">⏱️ Timeline: ${p.timeline}</div>

    <div class="cta">
      <a href="https://wa.me/15559090227?text=${encodeURIComponent(`Hi, I've reviewed proposal ${p.id.toUpperCase()} for ${p.restaurant_name}. I'd like to schedule a call.`)}">Schedule a Call →</a>
      <p>Or reply on WhatsApp to discuss</p>
    </div>
  </div>
  <div class="footer">
    SparkSol Hospitality Pvt Ltd · CIN: U74999KA2019PTC122300 · Bangalore<br>
    sparksol.in · +1 555-909-0227
  </div>
</div>
</body></html>`;
}
// Minimal PDF generator for Cloudflare Workers
// Generates a branded SparkSol proposal PDF from structured data

function generateProposalPDF(proposal) {
  const p = proposal;
  const deliverables = JSON.parse(p.deliverables || '[]');
  const exclusions = JSON.parse(p.exclusions || '[]');
  const date = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
  const firstMonth = (p.setup_price || 0) + (p.monthly_price || 0);

  // Build PDF content using raw PDF operators
  const lines = [];
  let y = 780; // Start from top (A4 = 595 x 842 points)
  const lm = 50; // Left margin
  const rw = 495; // Right width (595 - 50 - 50)

  // Helper to add text
  function addText(text, x, yPos, size, bold, color) {
    const font = bold ? '/F2' : '/F1';
    const r = ((color >> 16) & 0xFF) / 255;
    const g = ((color >> 8) & 0xFF) / 255;
    const b = (color & 0xFF) / 255;
    lines.push(`BT ${font} ${size} Tf ${r.toFixed(3)} ${g.toFixed(3)} ${b.toFixed(3)} rg ${x} ${yPos} Td (${escPDF(text)}) Tj ET`);
  }

  function addLine(x1, y1, x2, y2, color, width) {
    const r = ((color >> 16) & 0xFF) / 255;
    const g = ((color >> 8) & 0xFF) / 255;
    const b = (color & 0xFF) / 255;
    lines.push(`${width || 0.5} w ${r.toFixed(3)} ${g.toFixed(3)} ${b.toFixed(3)} RG ${x1} ${y1} m ${x2} ${y2} l S`);
  }

  function addRect(x, yPos, w, h, color) {
    const r = ((color >> 16) & 0xFF) / 255;
    const g = ((color >> 8) & 0xFF) / 255;
    const b = (color & 0xFF) / 255;
    lines.push(`${r.toFixed(3)} ${g.toFixed(3)} ${b.toFixed(3)} rg ${x} ${yPos} ${w} ${h} re f`);
  }

  // === HEADER BACKGROUND ===
  addRect(0, 720, 595, 122, 0x121219);

  // SparkSol logo text
  addText('SparkSol', lm, 810, 20, true, 0xC05621);
  addText('Restaurant Technology Services', lm, 792, 9, false, 0x94A3B8);

  // Proposal for
  addText('PROPOSAL FOR', lm, 768, 9, true, 0x94A3B8);
  addText(p.restaurant_name || 'Your Restaurant', lm, 748, 22, true, 0xFFFFFF);
  if (p.location) addText(p.location, lm, 730, 10, false, 0x94A3B8);

  // Date + Ref
  addText('Prepared ' + date + '  |  Ref: ' + (p.id || '').toUpperCase(), 300, 810, 8, false, 0x94A3B8);
  addText('Valid for 30 days', 300, 796, 8, false, 0x64748B);

  // === SERVICE NAME ===
  y = 700;
  addText(p.service_name || 'Service', lm, y, 18, true, 0x121219);
  y -= 18;
  addText('Personalized for ' + (p.restaurant_name || 'your restaurant'), lm, y, 9, false, 0xC05621);

  // === WHAT YOU GET ===
  y -= 30;
  addText('WHAT YOU GET', lm, y, 9, true, 0x8E8E99);
  y -= 5;
  addLine(lm, y, lm + rw, y, 0xF1F1F3, 0.5);

  deliverables.forEach(d => {
    y -= 16;
    if (y < 60) return; // Page overflow protection
    addText('✓  ' + d, lm + 4, y, 10, false, 0x36363F);
  });

  // === WHAT'S NOT INCLUDED ===
  y -= 24;
  addText("WHAT'S NOT INCLUDED", lm, y, 9, true, 0x8E8E99);
  y -= 5;
  addLine(lm, y, lm + rw, y, 0xF1F1F3, 0.5);

  exclusions.forEach(e => {
    y -= 16;
    if (y < 60) return;
    addText('✗  ' + e, lm + 4, y, 10, false, 0x8E8E99);
  });

  // === PRICING ===
  y -= 28;
  addRect(lm - 10, y - 80, rw + 20, 100, 0xF9F9FA);

  addText('PRICING', lm, y, 9, true, 0x8E8E99);
  y -= 5;
  addLine(lm, y, lm + rw, y, 0xF1F1F3, 0.5);

  if (p.setup_price > 0) {
    y -= 18;
    addText('One-time setup', lm + 4, y, 10, false, 0x36363F);
    addText('Rs ' + Number(p.setup_price).toLocaleString('en-IN'), 420, y, 10, true, 0x121219);
  }
  if (p.monthly_price > 0) {
    y -= 18;
    addText('Monthly recurring', lm + 4, y, 10, false, 0x36363F);
    addText('Rs ' + Number(p.monthly_price).toLocaleString('en-IN') + '/month', 420, y, 10, true, 0x121219);
  }
  if (p.amc_price > 0) {
    y -= 18;
    addText('Annual maintenance', lm + 4, y, 10, false, 0x36363F);
    addText('Rs ' + Number(p.amc_price).toLocaleString('en-IN') + '/year', 420, y, 10, true, 0x121219);
  }
  if (firstMonth > 0) {
    y -= 4;
    addLine(lm, y, lm + rw, y, 0xF1F1F3, 0.5);
    y -= 18;
    addText('First month total', lm + 4, y, 12, true, 0xC05621);
    addText('Rs ' + firstMonth.toLocaleString('en-IN'), 420, y, 12, true, 0xC05621);
  }

  // === TIMELINE ===
  y -= 30;
  addRect(lm - 10, y - 10, rw + 20, 24, 0xE8F7EE);
  addText('Timeline: ' + (p.timeline || 'To be discussed'), lm + 4, y, 10, true, 0x228B54);

  // === NEXT STEP ===
  y -= 36;
  addText('NEXT STEP', lm, y, 9, true, 0x8E8E99);
  y -= 18;
  addText('Reply to this message to schedule a 15-minute call with our team.', lm, y, 10, false, 0x36363F);
  y -= 16;
  addText('Or visit: sparksol.in', lm, y, 10, false, 0xC05621);

  // === FOOTER ===
  addLine(lm, 50, lm + rw, 50, 0xF1F1F3, 0.5);
  addText('SparkSol Hospitality Pvt Ltd  |  CIN: U74999KA2019PTC122300  |  Bangalore  |  sparksol.in', lm, 36, 7, false, 0x8E8E99);

  // === BUILD PDF ===
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
