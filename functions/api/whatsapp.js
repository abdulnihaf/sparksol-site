// SparkSol WhatsApp Enquiry Bot — Cloudflare Worker
// Handles incoming WhatsApp messages, runs structured enquiry flow,
// captures leads in D1, notifies team

const WA_API = 'https://graph.facebook.com/v21.0';

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
    const from = msg.from; // customer phone number
    const msgType = msg.type;
    const msgBody = msgType === 'text' ? msg.text?.body?.trim() : '';
    const contactName = value.contacts?.[0]?.profile?.name || '';
    const timestamp = msg.timestamp;

    // Get or create conversation state
    const state = await getConversationState(env.DB, from);

    // Process based on current state
    let response;

    switch (state.step) {
      case 'new':
        // First message — welcome + ask restaurant name
        response = await handleNewLead(env, from, contactName, msgBody, state);
        break;
      case 'asked_restaurant':
        // They replied with restaurant name
        response = await handleRestaurantName(env, from, msgBody, state);
        break;
      case 'asked_location':
        // They replied with location
        response = await handleLocation(env, from, msgBody, state);
        break;
      case 'asked_service':
        // They selected a service (interactive list reply)
        const interactiveReply = msg.interactive?.list_reply?.id || msg.interactive?.button_reply?.id || msgBody;
        response = await handleServiceSelection(env, from, interactiveReply, state);
        break;
      case 'asked_email':
        // They replied with email (or skip)
        response = await handleEmail(env, from, msgBody, state);
        break;
      case 'complete':
        // Lead already captured — pass to team
        response = await handleExistingLead(env, from, msgBody, state);
        break;
      default:
        response = await handleNewLead(env, from, contactName, msgBody, state);
    }

    return new Response('OK', { status: 200, headers: corsHeaders });

  } catch (err) {
    console.error('Webhook error:', err);
    return new Response('OK', { status: 200, headers: corsHeaders });
  }
}

// ============================================================
// CONVERSATION HANDLERS
// ============================================================

async function handleNewLead(env, from, name, firstMsg, state) {
  // Save initial state
  await updateConversationState(env.DB, from, {
    step: 'asked_restaurant',
    contact_name: name,
    first_message: firstMsg,
    source: extractSource(firstMsg),
  });

  // Send welcome + ask restaurant name
  await sendTextMessage(env, from,
    `Hi${name ? ' ' + name.split(' ')[0] : ''}! 👋 Welcome to SparkSol.\n\n` +
    `We help restaurants in Bangalore with technology — Google, Instagram, WhatsApp ordering, billing, and more.\n\n` +
    `Before I connect you with our team, a few quick questions so we can recommend the right plan.\n\n` +
    `*What's your restaurant or cafe called?*`
  );
}

async function handleRestaurantName(env, from, restaurantName, state) {
  await updateConversationState(env.DB, from, {
    ...state,
    step: 'asked_location',
    restaurant_name: restaurantName,
  });

  await sendTextMessage(env, from,
    `Great! *${restaurantName}* 🍽️\n\n` +
    `*Where are you located in Bangalore?*\n` +
    `(Area name — like Shivajinagar, Koramangala, Indiranagar)`
  );
}

async function handleLocation(env, from, location, state) {
  await updateConversationState(env.DB, from, {
    ...state,
    step: 'asked_service',
    location: location,
  });

  // Send interactive list for service selection
  await sendInteractiveList(env, from,
    'What do you need help with?',
    'Pick the area that matters most right now. Our team will recommend the specific plan on the call.',
    'See Options',
    [
      {
        title: 'Services',
        rows: [
          { id: 'marketing', title: 'Get More Customers', description: 'Google, Instagram, WhatsApp, Swiggy/Zomato' },
          { id: 'operations', title: 'Run Better Operations', description: 'Billing, kitchen screens, cash, inventory' },
          { id: 'hiring', title: 'Hire Staff', description: 'Find cooks, waiters, helpers fast' },
          { id: 'photography', title: 'Photos & Design', description: 'Food photography, packaging, menu cards' },
          { id: 'everything', title: 'Everything', description: 'I want it all handled' },
          { id: 'not_sure', title: 'Not Sure Yet', description: 'Just exploring — tell me what you offer' },
        ]
      }
    ]
  );
}

async function handleServiceSelection(env, from, selection, state) {
  const serviceLabels = {
    marketing: 'Get More Customers (Google, Instagram, WhatsApp)',
    operations: 'Run Better Operations (Billing, Kitchen, Cash)',
    hiring: 'Hire Staff',
    photography: 'Photos & Design',
    everything: 'Everything',
    not_sure: 'Exploring options',
  };

  const interested = serviceLabels[selection] || selection;

  await updateConversationState(env.DB, from, {
    ...state,
    step: 'asked_email',
    interested_in: interested,
    interested_id: selection,
  });

  await sendTextMessage(env, from,
    `Got it — *${interested}* for *${state.restaurant_name}* in *${state.location}*.\n\n` +
    `Last question — *what's your email?*\n` +
    `(We'll send the formal quote there. Type "skip" if you prefer WhatsApp only.)`
  );
}

async function handleEmail(env, from, email, state) {
  const finalEmail = email.toLowerCase() === 'skip' ? null : email;

  // Mark conversation complete
  await updateConversationState(env.DB, from, {
    ...state,
    step: 'complete',
    email: finalEmail,
  });

  // Create lead in D1
  await createLead(env.DB, {
    restaurant_name: state.restaurant_name,
    contact_name: state.contact_name,
    phone: from,
    email: finalEmail,
    location: state.location,
    interested_in: state.interested_in,
    interested_id: state.interested_id,
    source: state.source || 'whatsapp_direct',
    first_message: state.first_message,
  });

  // Confirm to customer
  await sendTextMessage(env, from,
    `✅ Perfect! Here's what I have:\n\n` +
    `🍽️ *${state.restaurant_name}*\n` +
    `📍 ${state.location}\n` +
    `📋 ${state.interested_in}\n` +
    (finalEmail ? `📧 ${finalEmail}\n` : '') +
    `\nOur team will call you *within 4 hours* to discuss the right plan and pricing.\n\n` +
    `In the meantime, you can see all our services and pricing at sparksol.in/pricing\n\n` +
    `Talk soon! 🙏`
  );

  // Notify team
  await notifyTeam(env, {
    restaurant_name: state.restaurant_name,
    contact_name: state.contact_name,
    phone: from,
    email: finalEmail,
    location: state.location,
    interested_in: state.interested_in,
    source: state.source,
  });
}

async function handleExistingLead(env, from, msgBody, state) {
  // Lead already captured — forward to team and acknowledge
  await sendTextMessage(env, from,
    `Thanks for the message! Our team has been notified and will get back to you shortly.\n\n` +
    `If urgent, call us at +91 7010426808.`
  );

  // Forward the message to team
  await notifyTeam(env, {
    restaurant_name: state.restaurant_name,
    phone: from,
    follow_up_message: msgBody,
  });
}

// ============================================================
// WHATSAPP API HELPERS
// ============================================================

async function sendTextMessage(env, to, text) {
  await fetch(`${WA_API}/${env.WA_PHONE_ID}/messages`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.WA_ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to: to,
      type: 'text',
      text: { body: text }
    })
  });
}

async function sendInteractiveList(env, to, header, body, buttonText, sections) {
  await fetch(`${WA_API}/${env.WA_PHONE_ID}/messages`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.WA_ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to: to,
      type: 'interactive',
      interactive: {
        type: 'list',
        header: { type: 'text', text: header },
        body: { text: body },
        action: {
          button: buttonText,
          sections: sections
        }
      }
    })
  });
}

async function notifyTeam(env, lead) {
  // Send to Nihaf's WhatsApp
  const teamPhone = '917010426808';
  let text;

  if (lead.follow_up_message) {
    text = `📩 Follow-up from ${lead.restaurant_name || 'Lead'} (${lead.phone}):\n\n"${lead.follow_up_message}"`;
  } else {
    text = `🔔 *New SparkSol Lead!*\n\n` +
      `🍽️ *${lead.restaurant_name}*\n` +
      `👤 ${lead.contact_name || 'Unknown'}\n` +
      `📍 ${lead.location}\n` +
      `📱 +${lead.phone}\n` +
      (lead.email ? `📧 ${lead.email}\n` : '') +
      `📋 ${lead.interested_in}\n` +
      `🔗 Source: ${lead.source || 'direct'}\n\n` +
      `⏰ Call within 4 hours!`;
  }

  // Use NCH production number to send to team (since test number can only message test numbers)
  // In production, this would use SparkSol's own WABA number
  console.log('Team notification:', text);

  // For now, also store notification in D1 so dashboard can show it
  try {
    await env.DB.prepare(
      'INSERT INTO notifications (type, content, created_at) VALUES (?, ?, datetime("now"))'
    ).bind('new_lead', text).run();
  } catch (e) {
    // notifications table might not exist yet
  }
}

// ============================================================
// CONVERSATION STATE (D1)
// ============================================================

async function getConversationState(db, phone) {
  try {
    const result = await db.prepare(
      'SELECT * FROM conversations WHERE phone = ? ORDER BY updated_at DESC LIMIT 1'
    ).bind(phone).first();

    if (result) {
      return { ...result, ...JSON.parse(result.data || '{}') };
    }
  } catch (e) {
    // Table might not exist
  }
  return { step: 'new' };
}

async function updateConversationState(db, phone, state) {
  const data = JSON.stringify(state);
  try {
    await db.prepare(`
      INSERT INTO conversations (phone, step, data, updated_at)
      VALUES (?, ?, ?, datetime('now'))
      ON CONFLICT(phone) DO UPDATE SET step = ?, data = ?, updated_at = datetime('now')
    `).bind(phone, state.step, data, state.step, data).run();
  } catch (e) {
    console.error('State update error:', e);
  }
}

async function createLead(db, lead) {
  try {
    await db.prepare(`
      INSERT INTO leads (restaurant_name, contact_name, phone, email, location, interested_in, interested_id, source, first_message, status, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'new', datetime('now'), datetime('now'))
    `).bind(
      lead.restaurant_name, lead.contact_name, lead.phone, lead.email,
      lead.location, lead.interested_in, lead.interested_id, lead.source, lead.first_message
    ).run();
  } catch (e) {
    console.error('Lead creation error:', e);
  }
}

// ============================================================
// HELPERS
// ============================================================

function extractSource(msg) {
  if (!msg) return 'whatsapp_direct';
  const lower = msg.toLowerCase();
  if (lower.includes('starter pack')) return 'website_starter_pack';
  if (lower.includes('growth pack')) return 'website_growth_pack';
  if (lower.includes('operations pack')) return 'website_operations_pack';
  if (lower.includes('all-in-one')) return 'website_all_in_one';
  if (lower.includes('social media')) return 'website_social_media';
  if (lower.includes('google')) return 'website_google';
  if (lower.includes('whatsapp ordering')) return 'website_whatsapp';
  if (lower.includes('billing')) return 'website_pos';
  if (lower.includes('kitchen')) return 'website_kds';
  if (lower.includes('settlement')) return 'website_settlement';
  if (lower.includes('inventory')) return 'website_inventory';
  if (lower.includes('hiring')) return 'website_hiring';
  if (lower.includes('photography')) return 'website_photography';
  if (lower.includes('design')) return 'website_design';
  if (lower.includes('sparksol')) return 'website_general';
  return 'whatsapp_direct';
}
