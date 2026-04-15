// SparkSol WhatsApp Bot v3 — Cloudflare Worker
// Two entry paths:
//   A) Website CTA (SPARKSOL:s=X) → fast-track: knows service, skips challenge+service steps
//   B) Generic → full 9-step flow
// WABA: Sparksol | Phone: +91 94914 78569 | Phone ID: 1092313753959048

const WA_API = 'https://graph.facebook.com/v21.0';
const CATALOG_ID = '1463846368518886'; // SparkSol Services catalogue

// ═══════════════════════════════════════════════════════════════
// SERVICE NAME LOOKUP (mirrors proposal.js SERVICES keys)
// ═══════════════════════════════════════════════════════════════

const SERVICE_NAMES = {
  google_g1: 'Google Maps Listing',
  google_g2: 'Google Presence Management',
  google_g3: 'Google Presence + Ads',
  social_s1: 'Social Media Setup + Photos',
  social_s2: 'Social Media Management',
  social_s3: 'Social Media Full Service',
  whatsapp_w1: 'WhatsApp Ordering + Booking',
  whatsapp_w2: 'WhatsApp Ordering + Marketing',
  pos_p1: 'Self-Hosted POS',
  photo_ph1: 'AI Food Photography',
  photo_ph2: 'Real Menu Shoot',
  design_ds1: 'Packaging Design',
  hiring_h1: 'WhatsApp Hiring Campaign',
};

// Parse structured website context: "SPARKSOL:s=whatsapp_w1&m=14999&n=4+campaigns"
function parseWebsiteContext(msg) {
  if (!msg || !msg.startsWith('SPARKSOL:')) return null;
  try {
    const params = new URLSearchParams(msg.slice(9));
    const serviceId = params.get('s');
    if (!serviceId || !SERVICE_NAMES[serviceId]) return null;
    return {
      service_id: serviceId,
      service_name: SERVICE_NAMES[serviceId],
      monthly: params.get('m') ? parseInt(params.get('m')) : null,
      custom_notes: params.get('n') ? decodeURIComponent(params.get('n').replace(/\+/g, ' ')) : '',
      source: 'website_cta',
    };
  } catch (e) { return null; }
}

// ═══════════════════════════════════════════════════════════════
// PAIN POINT → SERVICE MAPPING
// ═══════════════════════════════════════════════════════════════

const PAIN_POINTS = [
  {
    id: 'online',
    label: 'Get found on Google & Instagram',
    desc: 'Customers search but can\'t find you',
    services: [
      { id: 'google_g1', name: 'Google Maps Listing', badge: 'Rs 4,999 one-time', desc: 'Show up when people search nearby' },
      { id: 'google_g2', name: 'Google Presence Management', badge: 'Rs 7,999 + 4,999/mo', desc: 'Listing + reviews + weekly posts' },
      { id: 'social_s1', name: 'Instagram + Facebook Setup', badge: 'Rs 2,499 one-time', desc: 'Professional social presence in 5 days' },
    ]
  },
  {
    id: 'commissions',
    label: 'Cut Swiggy/Zomato commissions',
    desc: 'Losing 20-25% on every order',
    services: [
      { id: 'whatsapp_w1', name: 'WhatsApp Ordering Bot', badge: 'Rs 14,999 + 1,999/mo', desc: 'Direct orders, 0% commission to platforms' },
      { id: 'whatsapp_w2', name: 'WhatsApp Menu Catalog', badge: 'Rs 4,999 one-time', desc: 'Browsable menu inside WhatsApp' },
    ]
  },
  {
    id: 'social',
    label: 'Fix inactive social media',
    desc: 'Last post was months ago',
    services: [
      { id: 'social_s2', name: 'Social Media Posting Engine', badge: 'Rs 4,999 + 3,999/mo', desc: 'Daily posts without you doing anything' },
      { id: 'social_s3', name: 'Reel Production', badge: 'Rs 14,999 per reel', desc: 'Professional food reels that get real views' },
    ]
  },
  {
    id: 'operations',
    label: 'Fix billing, kitchen & cash',
    desc: 'Orders get missed, cash doesn\'t match',
    services: [
      { id: 'pos_p1', name: 'POS + Billing System', badge: 'Rs 24,999 + 4,999/year', desc: 'Own your POS data, no monthly SaaS fees' },
      { id: 'photo_ph1', name: 'Food Photography', badge: 'Rs 7,999 one-time', desc: 'Professional food photos for all platforms' },
    ]
  },
  {
    id: 'hiring',
    label: 'Find good restaurant staff',
    desc: 'Cooks, waiters, helpers — fast',
    services: [
      { id: 'hiring_h1', name: 'WhatsApp Hiring Campaign', badge: 'Rs 9,999 one-time', desc: 'Reach 5,000+ candidates in 48 hours' },
    ]
  },
];

// Which services ask customisation questions before generating proposal
const CUSTOMISABLE = {
  social_s2: {
    question: '📅 How many posts per month do you need?',
    options: [
      { id: 'posts_20', title: '20 posts/month' },
      { id: 'posts_30', title: '30 posts/month' },
      { id: 'posts_custom', title: 'Discuss with team' },
    ]
  },
  social_s3: {
    question: '🎬 How many reels do you need?',
    options: [
      { id: 'reels_1', title: '1 reel' },
      { id: 'reels_3', title: '3-reel pack' },
      { id: 'reels_5', title: '5-reel pack' },
    ]
  },
  whatsapp_w1: {
    question: '📋 Roughly how many items are on your menu?',
    options: [
      { id: 'menu_small', title: 'Under 30 items' },
      { id: 'menu_mid', title: '30-60 items' },
      { id: 'menu_large', title: '60+ items' },
    ]
  },
};

// Cross-sell suggestions: primary service → what to offer next
const CROSSSELLS = {
  google_g1:   { id: 'photo_ph1',  name: 'Food Photography',        price: 'Rs 7,999', reason: 'Great photos make your Google listing convert 3x better' },
  google_g2:   { id: 'social_s1',  name: 'Instagram + Facebook Setup', price: 'Rs 2,499', reason: 'Google drives discovery, Instagram builds trust' },
  social_s1:   { id: 'social_s2',  name: 'Social Posting Engine',   price: 'Rs 3,999/mo', reason: 'Setup is step 1 — daily posting is where results come from' },
  social_s2:   { id: 'social_s3',  name: 'Reel Production',         price: 'Rs 14,999', reason: 'Reels get 10x the reach of static posts' },
  social_s3:   { id: 'photo_ph1',  name: 'Food Photography',        price: 'Rs 7,999', reason: 'Better source material = better reels' },
  whatsapp_w1: { id: 'google_g1',  name: 'Google Maps Listing',     price: 'Rs 4,999', reason: 'Customers need to find you on Google before WhatsApp ordering' },
  whatsapp_w2: { id: 'whatsapp_w1',name: 'WhatsApp Ordering Bot',   price: 'Rs 14,999', reason: 'Catalog shows menu — the bot handles orders and payment' },
  pos_p1:      { id: 'google_g1',  name: 'Google Maps Listing',     price: 'Rs 4,999', reason: 'Operations handled internally + visibility externally = full package' },
  photo_ph1:   { id: 'social_s2',  name: 'Social Posting Engine',   price: 'Rs 3,999/mo', reason: 'Great photos need consistent posting to reach people' },
  hiring_h1:   { id: 'social_s1',  name: 'Instagram + Facebook Setup', price: 'Rs 2,499', reason: 'Job openings on social get 5x more candidate reach' },
};

// ═══════════════════════════════════════════════════════════════
// MAIN HANDLER
// ═══════════════════════════════════════════════════════════════

export async function onRequest(context) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (context.request.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  const url = new URL(context.request.url);
  const { env } = context;

  // Webhook verification (GET)
  if (context.request.method === 'GET') {
    const mode = url.searchParams.get('hub.mode');
    const token = url.searchParams.get('hub.verify_token');
    const challenge = url.searchParams.get('hub.challenge');
    if (mode === 'subscribe' && token === env.WA_VERIFY_TOKEN) {
      return new Response(challenge, { status: 200 });
    }
    return new Response('Forbidden', { status: 403 });
  }

  // Incoming message (POST)
  try {
    const body = await context.request.json();
    const entry = body?.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;

    if (!value?.messages?.[0]) {
      return new Response('OK', { status: 200, headers: corsHeaders });
    }

    const msg = value.messages[0];
    const from = msg.from;
    const msgType = msg.type;
    const msgText = msgType === 'text' ? (msg.text?.body?.trim() || '') : '';
    const interactiveReply = msg.interactive?.list_reply?.id || msg.interactive?.button_reply?.id || null;
    const contactName = value.contacts?.[0]?.profile?.name || '';

    // Mark as read
    await sendWhatsApp(env, {
      messaging_product: 'whatsapp',
      status: 'read',
      message_id: msg.id
    });

    const state = await getState(env.DB, from);

    // Route to handler based on current step
    switch (state.step) {
      case 'new':
        await handleNew(env, from, contactName, msgText, state); break;
      case 'asked_restaurant':
        await handleRestaurant(env, from, msgText, state); break;
      case 'asked_location':
        await handleLocation(env, from, msgText, state); break;
      case 'asked_challenge':
        await handleChallenge(env, from, interactiveReply || msgText, state); break;
      case 'asked_service':
        await handleService(env, from, interactiveReply || msgText, state); break;
      case 'asked_custom':
        await handleCustom(env, from, interactiveReply || msgText, state); break;
      case 'asked_crosssell':
        await handleCrossSell(env, from, interactiveReply || msgText, state); break;
      case 'asked_email':
        await handleEmail(env, from, msgText, state); break;
      case 'asked_schedule':
        await handleSchedule(env, from, interactiveReply || msgText, state); break;
      case 'proposal_sent':
        await handleProposalFollowUp(env, from, interactiveReply || msgText, state); break;
      case 'complete':
        await handleExisting(env, from, msgText, state); break;
      default:
        await handleNew(env, from, contactName, msgText, state);
    }

    return new Response('OK', { status: 200, headers: corsHeaders });
  } catch (err) {
    console.error('Webhook error:', err);
    return new Response('OK', { status: 200, headers: corsHeaders });
  }
}

// ═══════════════════════════════════════════════════════════════
// STEP HANDLERS
// ═══════════════════════════════════════════════════════════════

async function handleNew(env, from, name, firstMsg, state) {
  const ctx = parseWebsiteContext(firstMsg);
  const firstName = name ? name.split(' ')[0] : '';

  if (ctx) {
    // ── Fast-track: user came from a specific service page ──
    await setState(env.DB, from, {
      step: 'asked_restaurant',
      contact_name: name,
      first_message: firstMsg,
      source: ctx.source,
      service_id: ctx.service_id,
      service_name: ctx.service_name,
      custom_notes: ctx.custom_notes,
      monthly_hint: ctx.monthly,
      fast_track: true,
    });

    await sendText(env, from,
      `Hi${firstName ? ' ' + firstName : ''}! 👋\n\n` +
      `I can see you're interested in *${ctx.service_name}*${ctx.monthly ? ` — ₹${ctx.monthly.toLocaleString('en-IN')}/month` : ''}.\n\n` +
      `Let me build you a personalised proposal. Two quick questions.\n\n` +
      `*What's your restaurant or cafe called?*`
    );
  } else {
    // ── Normal flow: unknown service, run full discovery ──
    await setState(env.DB, from, {
      step: 'asked_restaurant',
      contact_name: name,
      first_message: firstMsg,
      source: detectSource(firstMsg),
    });

    await sendText(env, from,
      `Hi${firstName ? ' ' + firstName : ''}! 👋\n\n` +
      `I'm from *SparkSol* — we help restaurants and cafes in Bangalore with technology: Google, Instagram, WhatsApp ordering, billing, and more.\n\n` +
      `Takes 3 minutes. A few quick questions so I can build the right proposal for you.\n\n` +
      `*What's your restaurant or cafe called?*`
    );
  }
}

async function handleRestaurant(env, from, name, state) {
  await setState(env.DB, from, { ...state, step: 'asked_location', restaurant_name: name });

  await sendText(env, from,
    `*${name}* — nice! 🍽️\n\n` +
    `*Where are you located?*\n_(Area name — like Koramangala, Shivajinagar, Indiranagar)_`
  );
}

async function handleLocation(env, from, location, state) {
  const newState = { ...state, location };

  if (state.fast_track && state.service_id) {
    // ── Fast-track: service already known — skip challenge + service selection ──
    await setState(env.DB, from, { ...newState, step: 'asked_custom' });
    // Jump straight to cross-sell (customisation already captured via calculator notes)
    await offerCrossSell(env, from, { ...newState, step: 'asked_custom' });
  } else {
    // ── Normal flow ──
    await setState(env.DB, from, { ...newState, step: 'asked_challenge' });
    await sendInteractiveList(env, from,
      `What's your biggest challenge right now?`,
      `Pick the one that's costing you the most. I'll show you exactly what we'd do for *${state.restaurant_name}*.`,
      'See Options',
      [{
        title: 'Challenges',
        rows: PAIN_POINTS.map(p => ({
          id: `challenge_${p.id}`,
          title: p.label.substring(0, 24),
          description: p.desc.substring(0, 72),
        }))
      }]
    );
  }
}

async function handleChallenge(env, from, reply, state) {
  // Strip "challenge_" prefix if present
  const challengeId = reply.replace('challenge_', '');
  const painPoint = PAIN_POINTS.find(p => p.id === challengeId);

  if (!painPoint) {
    // Unrecognised — re-prompt
    await sendText(env, from, `Please pick one of the options from the list above. Tap the button to see them.`);
    return;
  }

  await setState(env.DB, from, { ...state, step: 'asked_service', challenge_id: challengeId, challenge_label: painPoint.label });

  if (painPoint.services.length === 1) {
    // Only one service — skip selection, go direct
    await handleService(env, from, painPoint.services[0].id, { ...state, step: 'asked_service', challenge_id: challengeId, challenge_label: painPoint.label });
    return;
  }

  // Show services as button replies (max 3 buttons)
  const serviceList = painPoint.services.slice(0, 3).map(s =>
    `*${s.name}*\n${s.badge} — ${s.desc}`
  ).join('\n\n');

  const buttons = painPoint.services.slice(0, 3).map(s => ({
    type: 'reply', reply: { id: s.id, title: s.name.substring(0, 20) }
  }));

  await sendButtonMessage(env, from,
    `Here's what we offer for "${painPoint.label}":\n\n${serviceList}\n\n*Which one fits best for ${state.restaurant_name}?*`,
    buttons
  );
}

async function handleService(env, from, serviceId, state) {
  // Find service name from pain points map
  let serviceName = serviceId;
  for (const pp of PAIN_POINTS) {
    const s = pp.services.find(s => s.id === serviceId);
    if (s) { serviceName = s.name; break; }
  }

  const newState = { ...state, step: 'asked_custom', service_id: serviceId, service_name: serviceName };
  await setState(env.DB, from, newState);

  // Check if this service has customisation questions
  const customQ = CUSTOMISABLE[serviceId];
  if (customQ) {
    const buttons = customQ.options.map(o => ({
      type: 'reply', reply: { id: o.id, title: o.title.substring(0, 20) }
    }));
    await sendButtonMessage(env, from,
      `Good choice. *${serviceName}* for *${state.restaurant_name}* in *${state.location}*.\n\n${customQ.question}`,
      buttons
    );
  } else {
    // No customisation needed — go straight to cross-sell
    await offerCrossSell(env, from, newState);
  }
}

async function handleCustom(env, from, reply, state) {
  // Map button IDs back to readable labels
  const customLabels = {
    posts_20: '20 posts/month', posts_30: '30 posts/month', posts_custom: 'Custom posting plan',
    reels_1: '1 reel', reels_3: '3-reel pack', reels_5: '5-reel pack',
    menu_small: 'Under 30 menu items', menu_mid: '30-60 menu items', menu_large: '60+ menu items',
  };
  const customNote = customLabels[reply] || reply;
  const newState = { ...state, custom_notes: customNote };
  await setState(env.DB, from, newState);

  await offerCrossSell(env, from, newState);
}

async function offerCrossSell(env, from, state) {
  await setState(env.DB, from, { ...state, step: 'asked_crosssell' });

  const cross = CROSSSELLS[state.service_id];
  if (!cross) {
    // No cross-sell for this service — go straight to email
    await askEmail(env, from, state);
    return;
  }

  await sendButtonMessage(env, from,
    `✅ *${state.service_name}* — noted.\n\n` +
    `One more thing: restaurants that get *${state.service_name}* often also add *${cross.name}* (${cross.price}).\n\n` +
    `💡 _${cross.reason}_\n\n` +
    `Want me to include it in your proposal?`,
    [
      { type: 'reply', reply: { id: 'crosssell_yes', title: 'Yes, add it' } },
      { type: 'reply', reply: { id: 'crosssell_no', title: 'No thanks' } },
    ]
  );
}

async function handleCrossSell(env, from, reply, state) {
  const cross = CROSSSELLS[state.service_id];
  let addedService = null;

  if (reply === 'crosssell_yes' && cross) {
    addedService = cross.id;
    await setState(env.DB, from, { ...state, crosssell_id: cross.id, crosssell_name: cross.name });
    await sendText(env, from, `Perfect! I'll include *${cross.name}* in your proposal too. 🎉`);
  }

  await askEmail(env, from, { ...state, crosssell_id: addedService });
}

async function askEmail(env, from, state) {
  await setState(env.DB, from, { ...state, step: 'asked_email' });
  await sendText(env, from,
    `Almost done!\n\n*What's your email?*\nWe'll send the formal proposal there.\n\n_(Type "skip" if you prefer WhatsApp only)_`
  );
}

async function handleEmail(env, from, email, state) {
  const finalEmail = email.toLowerCase() === 'skip' ? null : email;
  await setState(env.DB, from, { ...state, step: 'asked_schedule', email: finalEmail });

  // Save lead to DB
  await saveLead(env.DB, {
    restaurant_name: state.restaurant_name,
    contact_name: state.contact_name,
    phone: from,
    email: finalEmail,
    location: state.location,
    interested_in: state.service_name,
    interested_id: state.service_id,
    source: state.source || 'waba_bot',
    first_message: state.first_message,
  });

  // Generate proposal via API
  let proposalUrl = null;
  let proposalId = null;
  try {
    const proposalRes = await fetch(`${env.SITE_URL}/api/proposal?action=create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        restaurantName: state.restaurant_name,
        contactName: state.contact_name,
        phone: from,
        email: finalEmail,
        location: state.location,
        serviceId: state.service_id,
        crosssellId: state.crosssell_id || null,
        customNotes: state.custom_notes || '',
        source: 'waba_bot',
      })
    });
    const pd = await proposalRes.json();
    if (pd.proposalId) {
      proposalId = pd.proposalId;
      proposalUrl = pd.proposalUrl;
    }
  } catch (e) {
    console.error('Proposal generation failed:', e);
  }

  // Send proposal link
  if (proposalUrl) {
    await sendText(env, from,
      `✅ Your personalised proposal is ready!\n\n` +
      `📄 *${state.service_name}${state.crosssell_name ? ' + ' + state.crosssell_name : ''}*\n` +
      `For: *${state.restaurant_name}*, ${state.location}\n\n` +
      `👉 ${proposalUrl}\n\n` +
      `_(Valid for 30 days | Ref: ${(proposalId || '').toUpperCase()})_`
    );
  } else {
    await sendText(env, from,
      `✅ Details received!\n\n` +
      `*${state.restaurant_name}* | ${state.location}\n` +
      `Service: *${state.service_name}*\n\n` +
      `Our team will send you a detailed proposal within 2 hours.`
    );
  }

  // Ask for call scheduling
  await sendButtonMessage(env, from,
    `When works best for a quick 15-minute call with our team? 📞`,
    [
      { type: 'reply', reply: { id: 'schedule_morning', title: 'Morning (10-12)' } },
      { type: 'reply', reply: { id: 'schedule_afternoon', title: 'Afternoon (2-5)' } },
      { type: 'reply', reply: { id: 'schedule_evening', title: 'Evening (6-8)' } },
    ]
  );
}

async function handleSchedule(env, from, reply, state) {
  const scheduleLabels = {
    schedule_morning: 'Morning (10 AM – 12 PM)',
    schedule_afternoon: 'Afternoon (2 PM – 5 PM)',
    schedule_evening: 'Evening (6 PM – 8 PM)',
  };
  const slot = scheduleLabels[reply] || reply;

  await setState(env.DB, from, { ...state, step: 'complete', call_slot: slot });

  // Update proposal call_scheduled_at
  if (state.proposal_id) {
    try {
      await env.DB.prepare(
        `UPDATE proposals SET call_scheduled_at = datetime('now'), status = 'call_scheduled' WHERE id = ?`
      ).bind(state.proposal_id).run();
    } catch (e) { /* ignore */ }
  }

  await sendText(env, from,
    `✅ Confirmed! *${slot}*\n\n` +
    `Nihaf from SparkSol will call you at *+${from}* during that window.\n\n` +
    `If you have any questions before the call, just reply here.\n\n` +
    `Looking forward to speaking with you! 🙏`
  );

  // Notify team
  await notifyTeam(env, {
    restaurant_name: state.restaurant_name,
    contact_name: state.contact_name,
    phone: from,
    email: state.email,
    location: state.location,
    service_name: state.service_name,
    crosssell_name: state.crosssell_name,
    custom_notes: state.custom_notes,
    call_slot: slot,
    source: state.source,
  });
}

async function handleProposalFollowUp(env, from, reply, state) {
  // User came via website form — proposal already sent, now they replied
  // Could be a text reply OR a schedule button click

  const scheduleLabels = {
    schedule_morning: 'Morning (10 AM – 12 PM)',
    schedule_afternoon: 'Afternoon (2 PM – 5 PM)',
    schedule_evening: 'Evening (6 PM – 8 PM)',
  };

  if (scheduleLabels[reply]) {
    // They clicked a call slot button
    await handleSchedule(env, from, reply, state);
    return;
  }

  // They sent a text — ask for call slot
  await setState(env.DB, from, { ...state, step: 'proposal_sent' }); // keep in proposal_sent
  await sendButtonMessage(env, from,
    `Thanks for reaching out! 👋\n\n` +
    `Your proposal for *${state.service_name || 'our services'}* is ready.\n` +
    (state.proposal_url ? `👉 ${state.proposal_url}\n\n` : '\n') +
    `When works best for a quick 15-minute call to walk through it?`,
    [
      { type: 'reply', reply: { id: 'schedule_morning', title: 'Morning (10-12)' } },
      { type: 'reply', reply: { id: 'schedule_afternoon', title: 'Afternoon (2-5)' } },
      { type: 'reply', reply: { id: 'schedule_evening', title: 'Evening (6-8)' } },
    ]
  );
}

async function handleExisting(env, from, msgText, state) {
  await sendText(env, from,
    `Thanks for the message! Our team has been notified and will get back to you shortly.\n\n` +
    `If urgent, call us at *+91 94914 78569*.`
  );

  await notifyTeam(env, {
    restaurant_name: state.restaurant_name,
    phone: from,
    follow_up_message: msgText,
  });
}

// ═══════════════════════════════════════════════════════════════
// WHATSAPP API HELPERS
// ═══════════════════════════════════════════════════════════════

async function sendWhatsApp(env, payload) {
  try {
    const res = await fetch(`${WA_API}/${env.WA_PHONE_ID}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.WA_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ messaging_product: 'whatsapp', ...payload })
    });
    return res;
  } catch (e) {
    console.error('WA send error:', e);
  }
}

async function sendText(env, to, body) {
  return sendWhatsApp(env, { to, type: 'text', text: { body, preview_url: false } });
}

async function sendButtonMessage(env, to, body, buttons) {
  return sendWhatsApp(env, {
    to, type: 'interactive',
    interactive: {
      type: 'button',
      body: { text: body },
      action: { buttons: buttons.slice(0, 3) }
    }
  });
}

async function sendInteractiveList(env, to, header, body, buttonText, sections) {
  return sendWhatsApp(env, {
    to, type: 'interactive',
    interactive: {
      type: 'list',
      header: { type: 'text', text: header },
      body: { text: body },
      action: { button: buttonText, sections }
    }
  });
}

async function notifyTeam(env, lead) {
  const teamPhone = '917010426808';
  let text;

  if (lead.follow_up_message) {
    text = `📩 Follow-up from *${lead.restaurant_name || 'Lead'}* (+${lead.phone}):\n\n"${lead.follow_up_message}"`;
  } else {
    text =
      `🔔 *New SparkSol Lead!*\n\n` +
      `🍽️ *${lead.restaurant_name}*\n` +
      `👤 ${lead.contact_name || 'Unknown'}\n` +
      `📍 ${lead.location || ''}\n` +
      `📱 +${lead.phone}\n` +
      (lead.email ? `📧 ${lead.email}\n` : '') +
      `📋 *${lead.service_name}*${lead.crosssell_name ? ' + ' + lead.crosssell_name : ''}\n` +
      (lead.custom_notes ? `🔧 ${lead.custom_notes}\n` : '') +
      (lead.call_slot ? `📅 Call slot: *${lead.call_slot}*\n` : '') +
      `🔗 Source: ${lead.source || 'waba_bot'}\n\n` +
      (lead.call_slot ? `✅ CALL SCHEDULED — dial in the slot above!` : `⏰ Call within 4 hours!`);
  }

  // Notify via SparkSol WABA → Nihaf's personal number
  await sendWhatsApp(env, {
    to: teamPhone, type: 'text', text: { body: text }
  });

  // Also store in D1 notifications table
  try {
    await env.DB.prepare(
      'INSERT INTO notifications (type, content, created_at) VALUES (?1, ?2, datetime("now"))'
    ).bind('new_lead', text).run();
  } catch (e) { /* ignore */ }
}

// ═══════════════════════════════════════════════════════════════
// CONVERSATION STATE (D1)
// ═══════════════════════════════════════════════════════════════

async function getState(db, phone) {
  try {
    const row = await db.prepare('SELECT * FROM conversations WHERE phone = ?').bind(phone).first();
    if (row) return { ...row, ...JSON.parse(row.data || '{}') };
  } catch (e) { /* ignore */ }
  return { step: 'new' };
}

async function setState(db, phone, state) {
  const data = JSON.stringify(state);
  try {
    await db.prepare(`
      INSERT INTO conversations (phone, step, data, updated_at)
      VALUES (?1, ?2, ?3, datetime('now'))
      ON CONFLICT(phone) DO UPDATE SET step = ?2, data = ?3, updated_at = datetime('now')
    `).bind(phone, state.step, data).run();
  } catch (e) {
    console.error('setState error:', e);
  }
}

async function saveLead(db, lead) {
  try {
    await db.prepare(`
      INSERT INTO leads
        (restaurant_name, contact_name, phone, email, location, interested_in, interested_id, source, first_message, status, created_at, updated_at)
      VALUES
        (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, 'new', datetime('now'), datetime('now'))
      ON CONFLICT(phone) DO UPDATE SET
        restaurant_name = ?1, contact_name = ?2, email = ?4, location = ?5,
        interested_in = ?6, interested_id = ?7, updated_at = datetime('now')
    `).bind(
      lead.restaurant_name, lead.contact_name, lead.phone, lead.email,
      lead.location, lead.interested_in, lead.interested_id, lead.source, lead.first_message
    ).run();
  } catch (e) {
    console.error('saveLead error:', e);
  }
}

// ═══════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════

function detectSource(msg) {
  if (!msg) return 'waba_bot';
  const m = msg.toLowerCase();
  if (m.includes('google') || m.includes('maps')) return 'website_google';
  if (m.includes('instagram') || m.includes('social')) return 'website_social';
  if (m.includes('whatsapp ordering')) return 'website_whatsapp';
  if (m.includes('billing') || m.includes('pos')) return 'website_pos';
  if (m.includes('hiring') || m.includes('staff')) return 'website_hiring';
  if (m.includes('photography') || m.includes('photos')) return 'website_photography';
  if (m.includes('pricing') || m.includes('pack') || m.includes('sparksol')) return 'website_pricing';
  return 'waba_bot';
}
