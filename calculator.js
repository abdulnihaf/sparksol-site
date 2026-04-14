// SparkSol Dynamic Pricing Calculator
// Embeds into service pages via <div id="spark-calc" data-service="social"></div>

const CALC_DATA = {
  social: {
    name: "Social Media",
    setup: 14999,
    units: [
      { id: "posts", label: "Instagram/FB Posts", base: 650, maxDiscount: 0.20, min: 10, max: 40, step: 5, default: 20, suffix: "/month", marketLow: 800, marketHigh: 2500 },
      { id: "stories", label: "Instagram Stories", base: 350, maxDiscount: 0.20, min: 0, max: 30, step: 5, default: 10, suffix: "/month", marketLow: 500, marketHigh: 1000 },
      { id: "reels", label: "Instagram Reels", base: 3000, maxDiscount: 0.15, min: 0, max: 8, step: 1, default: 0, suffix: "/month", marketLow: 2000, marketHigh: 8000 },
    ],
    addons: [
      { id: "community", label: "Community Management (DM replies, comments)", price: 3000, monthly: true },
      { id: "ads", label: "Instagram & Facebook Ads Management", price: 5000, monthly: true },
      { id: "analytics", label: "Monthly Analytics Report", price: 2000, monthly: true },
      { id: "influencer", label: "Influencer Coordination (per visit)", price: 5000, monthly: false },
    ],
    presets: [
      { name: "Starter", desc: "Light presence", values: { posts: 12, stories: 5, reels: 0 }, addons: [], price: 8450 },
      { name: "Standard", desc: "Active daily posting", values: { posts: 20, stories: 10, reels: 0 }, addons: ["analytics"], price: 12999, popular: true },
      { name: "Premium", desc: "Full service + reels + ads", values: { posts: 30, stories: 15, reels: 4 }, addons: ["community", "ads", "analytics"], price: 24999 },
    ],
    bundleLink: "/services/social-media",
  },
  google: {
    name: "Google Presence",
    setup: 7999,
    units: [
      { id: "posts", label: "Google Business Posts", base: 1250, maxDiscount: 0.20, min: 2, max: 12, step: 2, default: 4, suffix: "/month", marketLow: 750, marketHigh: 2000 },
      { id: "reviews", label: "Review Responses", base: 150, maxDiscount: 0.20, min: 0, max: 60, step: 10, default: 20, suffix: "/month", marketLow: 200, marketHigh: 500 },
    ],
    addons: [
      { id: "report", label: "Monthly Performance Report", price: 2500, monthly: true },
      { id: "audit", label: "Quarterly Listing Audit", price: 1000, monthly: true },
      { id: "googleads", label: "Google Ads Management", price: 5000, monthly: true },
    ],
    presets: [
      { name: "Basic", desc: "Posts + reviews", values: { posts: 4, reviews: 20 }, addons: ["report"], price: 4999 },
      { name: "Growth", desc: "Posts + reviews + ads", values: { posts: 4, reviews: 30 }, addons: ["report", "audit", "googleads"], price: 9999, popular: true },
    ],
    bundleLink: "/services/google-presence",
  },
  whatsapp: {
    name: "WhatsApp Marketing",
    setup: 24999,
    units: [
      { id: "campaigns", label: "Broadcast Campaigns", base: 4000, maxDiscount: 0.15, min: 1, max: 8, step: 1, default: 2, suffix: "/month", marketLow: 3000, marketHigh: 8000 },
      { id: "followups", label: "Follow-up Sequences", base: 2500, maxDiscount: 0.15, min: 0, max: 4, step: 1, default: 1, suffix: "/month", marketLow: 5000, marketHigh: 10000 },
    ],
    addons: [
      { id: "tracking", label: "Customer Tracking Dashboard", price: 5000, monthly: true },
      { id: "loyalty", label: "WhatsApp Loyalty Program", price: 2999, monthly: true },
      { id: "birthday", label: "Birthday/Anniversary Automation", price: 1500, monthly: true },
    ],
    presets: [
      { name: "Basic", desc: "2 campaigns + follow-up", values: { campaigns: 2, followups: 1 }, addons: [], price: 7999 },
      { name: "Growth", desc: "4 campaigns + tracking", values: { campaigns: 4, followups: 2 }, addons: ["tracking"], price: 14999, popular: true },
    ],
    bundleLink: "/services/whatsapp",
  },
  photography: {
    name: "Food Photography",
    setup: 0,
    units: [
      { id: "ai", label: "AI Food Photos (menu items)", base: 200, maxDiscount: 0.25, min: 10, max: 100, step: 10, default: 40, suffix: " dishes", marketLow: 300, marketHigh: 800 },
      { id: "real", label: "Professional Shoot (per dish)", base: 800, maxDiscount: 0.10, min: 0, max: 50, step: 5, default: 0, suffix: " dishes", marketLow: 500, marketHigh: 2500 },
      { id: "styled", label: "Styled Photos (premium)", base: 1500, maxDiscount: 0.10, min: 0, max: 20, step: 5, default: 0, suffix: " dishes", marketLow: 1200, marketHigh: 3000 },
    ],
    addons: [
      { id: "interior", label: "Interior/Ambiance Shots (10 photos)", price: 5000, monthly: false },
      { id: "wacatalog", label: "WhatsApp Catalog Optimization", price: 3000, monthly: false },
    ],
    presets: [
      { name: "AI Only", desc: "40 dishes, AI-generated", values: { ai: 40, real: 0, styled: 0 }, addons: [], price: 8000 },
      { name: "Mixed", desc: "30 AI + 15 real", values: { ai: 30, real: 15, styled: 0 }, addons: [], price: 18000, popular: true },
      { name: "Premium", desc: "20 AI + 10 real + 10 styled", values: { ai: 20, real: 10, styled: 10 }, addons: ["interior"], price: 31000 },
    ],
    bundleLink: "/services/photography",
  },
  hiring: {
    name: "Hiring",
    setup: 0,
    units: [
      { id: "roles", label: "Roles to Fill", base: 6999, maxDiscount: 0.10, min: 1, max: 6, step: 1, default: 1, suffix: " roles", marketLow: 5000, marketHigh: 15000 },
      { id: "platforms", label: "Job Platforms", base: 1500, maxDiscount: 0.10, min: 1, max: 5, step: 1, default: 3, suffix: " platforms", marketLow: 1000, marketHigh: 3000 },
    ],
    addons: [
      { id: "wacampaign", label: "WhatsApp Hiring Campaign", price: 3000, monthly: false },
      { id: "database", label: "Candidate Database Setup", price: 5000, monthly: false },
    ],
    presets: [
      { name: "Single Role", desc: "1 role, 3 platforms", values: { roles: 1, platforms: 3 }, addons: [], price: 6999 },
      { name: "Multi Role", desc: "3 roles + WhatsApp campaign", values: { roles: 3, platforms: 4 }, addons: ["wacampaign"], price: 19999, popular: true },
    ],
    bundleLink: "/services/hiring",
  },
  design: {
    name: "Design Services",
    setup: 0,
    units: [
      { id: "packaging", label: "Packaging Design (per SKU)", base: 3500, maxDiscount: 0.15, min: 1, max: 10, step: 1, default: 3, suffix: " SKUs", marketLow: 5000, marketHigh: 15000 },
      { id: "menu", label: "Menu Card Pages", base: 1500, maxDiscount: 0.15, min: 0, max: 16, step: 2, default: 0, suffix: " pages", marketLow: 750, marketHigh: 2000 },
    ],
    addons: [
      { id: "festival", label: "Festival Campaign Set (5 posts + 3 stories)", price: 5500, monthly: false },
    ],
    presets: [
      { name: "Packaging", desc: "3 SKU designs", values: { packaging: 3, menu: 0 }, addons: [], price: 10500 },
      { name: "Full Brand", desc: "3 packaging + 8 menu pages", values: { packaging: 3, menu: 8 }, addons: [], price: 22500, popular: true },
    ],
    bundleLink: "/services/design",
  },
};

const TIERS = [
  { min: 1, max: 10, discount: 0 },
  { min: 11, max: 20, discount: 0.10 },
  { min: 21, max: 30, discount: 0.15 },
  { min: 31, max: 999, discount: 0.20 },
];

function calcTiered(base, qty, maxDisc) {
  if (qty <= 0) return { total: 0, effective: 0, savings: 0, pct: 0 };
  let total = 0, rem = qty;
  for (const t of TIERS) {
    if (rem <= 0) break;
    const n = Math.min(rem, t.max - t.min + 1);
    const d = Math.min(t.discount, maxDisc);
    total += n * base * (1 - d);
    rem -= n;
  }
  const full = qty * base;
  return { total: Math.round(total), effective: Math.round(total / qty), savings: Math.round(full - total), pct: ((full - total) / full * 100).toFixed(0) };
}

function fmt(n) { return '₹' + n.toLocaleString('en-IN'); }

function renderCalc(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const svc = el.dataset.service;
  const data = CALC_DATA[svc];
  if (!data) return;

  let state = { custom: false, selected: data.presets.findIndex(p => p.popular) || 0 };
  let values = {};
  let addonState = {};
  data.units.forEach(u => values[u.id] = u.default);
  data.addons.forEach(a => addonState[a.id] = false);

  function getTotal() {
    let monthly = 0, marketLow = 0, marketHigh = 0, lines = [];
    data.units.forEach(u => {
      const qty = values[u.id];
      if (qty > 0) {
        const r = calcTiered(u.base, qty, u.maxDiscount);
        monthly += r.total;
        marketLow += qty * u.marketLow;
        marketHigh += qty * u.marketHigh;
        lines.push({ label: qty + ' ' + u.label.split('(')[0].trim(), price: r.total, effective: r.effective, base: u.base, savings: r.savings, pct: r.pct });
      }
    });
    data.addons.forEach(a => {
      if (addonState[a.id]) {
        monthly += a.price;
        lines.push({ label: a.label, price: a.price, addon: true });
      }
    });
    // Find best preset
    let bestPreset = null;
    data.presets.forEach(p => {
      if (p.price <= monthly) {
        let covers = true;
        data.units.forEach(u => { if ((p.values[u.id] || 0) < values[u.id]) covers = false; });
        if (covers && (!bestPreset || p.price < bestPreset.price)) bestPreset = p;
      }
    });
    return { monthly, marketLow, marketHigh, lines, bestPreset, savingsVsPreset: bestPreset ? monthly - bestPreset.price : 0 };
  }

  function render() {
    const t = getTotal();
    let html = '';

    // Presets
    html += '<div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:20px">';
    data.presets.forEach((p, i) => {
      const sel = !state.custom && state.selected === i;
      const border = sel ? '2px solid #C05621' : '1px solid #F1F1F3';
      html += '<div style="flex:1;min-width:200px;border:' + border + ';border-radius:12px;padding:20px;cursor:pointer;position:relative;background:#fff" onclick="sparkCalcSelect(' + i + ')">';
      if (p.popular) html += '<div style="position:absolute;top:-10px;left:16px;background:#C05621;color:#fff;font-size:10px;font-weight:700;padding:2px 10px;border-radius:4px">Popular</div>';
      html += '<div style="font-size:16px;font-weight:700;margin-bottom:4px">' + p.name + '</div>';
      html += '<div style="font-size:12px;color:#6B6B75;margin-bottom:12px">' + p.desc + '</div>';
      data.units.forEach(u => {
        if (p.values[u.id] > 0) html += '<div style="font-size:12px;color:#36363F;padding:2px 0">' + p.values[u.id] + ' ' + u.label.split('(')[0].trim() + u.suffix + '</div>';
      });
      html += '<div style="font-size:22px;font-weight:800;margin-top:12px">' + fmt(p.price) + '</div>';
      html += '<div style="font-size:11px;color:#6B6B75">' + (data.setup > 0 ? 'Setup ' + fmt(data.setup) + ' + ' : '') + '/month</div>';
      html += '<div style="margin-top:12px;text-align:center;padding:8px;border-radius:6px;font-size:13px;font-weight:600;' + (sel ? 'background:#C05621;color:#fff' : 'background:#FCF2ED;color:#C05621') + '">Select</div>';
      html += '</div>';
    });
    html += '</div>';

    // Customize toggle
    html += '<div style="padding:12px 0;cursor:pointer;font-size:14px;font-weight:600;color:#C05621" onclick="sparkCalcToggle()">' + (state.custom ? '▲ Hide customization' : '▼ Customize your plan') + '</div>';

    if (state.custom) {
      html += '<div style="border-top:1px solid #F1F1F3;padding-top:20px">';

      // Sliders
      data.units.forEach(u => {
        const val = values[u.id];
        const r = calcTiered(u.base, val, u.maxDiscount);
        const pct = u.max > u.min ? ((val - u.min) / (u.max - u.min) * 100) : 0;

        html += '<div style="margin-bottom:28px">';
        html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">';
        html += '<span style="font-size:14px;font-weight:600;color:#121219">' + u.label + '</span>';
        html += '<span style="font-size:15px;font-weight:700;color:#C05621">' + val + u.suffix + '</span>';
        html += '</div>';

        // Custom styled slider
        var pctFill = u.max > u.min ? ((val - u.min) / (u.max - u.min) * 100) : 0;
        html += '<div style="position:relative;margin:16px 0 8px;padding:0 2px">';
        html += '<input type="range" min="' + u.min + '" max="' + u.max + '" step="' + u.step + '" value="' + val + '" oninput="sparkCalcSlider(\'' + u.id + '\',parseInt(this.value))" class="spark-slider" style="--fill:' + pctFill + '%">';
        html += '</div>';

        // Step labels below slider
        html += '<div style="display:flex;justify-content:space-between;font-size:11px;color:#8E8E99;padding:0 2px">';
        var steps = [];
        for (var sv = u.min; sv <= u.max; sv += u.step) steps.push(sv);
        if (steps.length <= 8) {
          steps.forEach(function(s) { html += '<span style="' + (s === val ? 'color:#C05621;font-weight:700' : '') + '">' + s + '</span>'; });
        } else {
          html += '<span>' + u.min + '</span><span>' + Math.round((u.min+u.max)/2) + '</span><span>' + u.max + '</span>';
        }
        html += '</div>';

        // Per-unit price with discount
        if (val > 0 && r.pct > 0) {
          html += '<div style="font-size:12px;margin-top:4px"><span style="color:#8E8E99;text-decoration:line-through">' + fmt(u.base) + '</span> <span style="color:#228B54;font-weight:600">' + fmt(r.effective) + '/unit (' + r.pct + '% volume discount)</span></div>';
        } else if (val > 0) {
          html += '<div style="font-size:12px;color:#8E8E99;margin-top:4px">' + fmt(u.base) + '/unit</div>';
        }
        html += '</div>';
      });

      // Add-ons
      if (data.addons.length > 0) {
        html += '<div style="font-size:14px;font-weight:600;color:#121219;margin-bottom:12px">Add-ons</div>';
        data.addons.forEach(a => {
          const checked = addonState[a.id];
          html += '<label style="display:flex;align-items:center;gap:10px;padding:8px 0;cursor:pointer;font-size:13px;color:#36363F">';
          html += '<input type="checkbox" ' + (checked ? 'checked' : '') + ' onchange="sparkCalcAddon(\'' + a.id + '\',this.checked)" style="accent-color:#C05621;width:18px;height:18px">';
          html += '<span style="flex:1">' + a.label + '</span>';
          html += '<span style="font-weight:600;color:#C05621">' + (a.monthly ? '+' + fmt(a.price) + '/mo' : '+' + fmt(a.price)) + '</span>';
          html += '</label>';
        });
      }

      html += '</div>';
    }

    // Price summary (always visible)
    html += '<div style="background:#F9F9FA;border:1px solid #F1F1F3;border-radius:12px;padding:24px;margin-top:20px">';
    html += '<div style="font-size:11px;font-weight:600;color:#8E8E99;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px">Your Plan</div>';

    t.lines.forEach(l => {
      html += '<div style="display:flex;justify-content:space-between;padding:6px 0;font-size:13px;border-bottom:1px solid #F1F1F3">';
      html += '<span style="color:#36363F">' + l.label + (l.pct > 0 ? ' <span style="color:#228B54;font-size:11px">(-' + l.pct + '%)</span>' : '') + '</span>';
      html += '<span style="font-weight:600">' + fmt(l.price) + '</span>';
      html += '</div>';
    });

    html += '<div style="display:flex;justify-content:space-between;padding:14px 0 0;font-size:16px;font-weight:800;border-top:2px solid #F1F1F3;margin-top:8px">';
    html += '<span>Monthly total</span><span>' + fmt(t.monthly) + '</span></div>';

    if (data.setup > 0) {
      html += '<div style="font-size:12px;color:#8E8E99;margin-top:4px">+ One-time setup: ' + fmt(data.setup) + '</div>';
    }

    // Bundle recommendation
    if (state.custom && t.bestPreset && t.savingsVsPreset > 500) {
      html += '<div style="background:#E8F7EE;border-radius:8px;padding:12px 16px;margin-top:14px">';
      html += '<div style="font-size:13px;font-weight:600;color:#228B54">💡 Get the ' + t.bestPreset.name + ' plan at ' + fmt(t.bestPreset.price) + '/month</div>';
      html += '<div style="font-size:12px;color:#228B54;margin-top:2px">Save ' + fmt(t.savingsVsPreset) + ' vs custom pricing</div>';
      html += '</div>';
    }

    // Market comparison
    if (t.marketLow > 0) {
      html += '<div style="margin-top:14px;font-size:12px;color:#8E8E99">';
      html += 'Freelancer would charge: ' + fmt(t.marketLow) + ' — ' + fmt(t.marketHigh) + '/month';
      const savePct = Math.round((1 - t.monthly / t.marketHigh) * 100);
      if (savePct > 0) html += '<br><span style="color:#C05621;font-weight:600">You save up to ' + savePct + '% with SparkSol</span>';
      html += '</div>';
    }

    // CTA
    const waMsg = encodeURIComponent("Hi, I'd like a custom " + data.name + " plan: " + t.lines.map(l => l.label).join(', ') + ". Monthly total: " + fmt(t.monthly));
    html += '<a href="https://wa.me/15559090227?text=' + waMsg + '" style="display:block;text-align:center;background:#228B54;color:#fff;padding:14px;border-radius:8px;font-size:14px;font-weight:600;margin-top:16px;text-decoration:none">Talk to Us on WhatsApp →</a>';

    html += '</div>';

    el.innerHTML = html;
  }

  // Global functions for onclick handlers
  window.sparkCalcSelect = function(i) {
    state.custom = false;
    state.selected = i;
    const p = data.presets[i];
    data.units.forEach(u => values[u.id] = p.values[u.id] || 0);
    data.addons.forEach(a => addonState[a.id] = (p.addons || []).includes(a.id));
    render();
  };
  window.sparkCalcToggle = function() {
    state.custom = !state.custom;
    render();
  };
  window.sparkCalcSlider = function(id, val) {
    values[id] = parseInt(val);
    state.custom = true;
    render();
  };
  window.sparkCalcAddon = function(id, checked) {
    addonState[id] = checked;
    state.custom = true;
    render();
  };

  render();
}

// Inject slider CSS once
(function(){
  if (document.getElementById('spark-slider-css')) return;
  var s = document.createElement('style');
  s.id = 'spark-slider-css';
  s.textContent = `
    .spark-slider{-webkit-appearance:none;appearance:none;width:100%;height:8px;border-radius:4px;outline:none;cursor:pointer;background:linear-gradient(to right,#C05621 0%,#C05621 var(--fill,50%),#F1F1F3 var(--fill,50%),#F1F1F3 100%)}
    .spark-slider::-webkit-slider-thumb{-webkit-appearance:none;width:28px;height:28px;border-radius:50%;background:#C05621;border:4px solid #fff;box-shadow:0 2px 8px rgba(192,86,33,0.35);cursor:grab;transition:box-shadow 0.15s,transform 0.15s}
    .spark-slider::-webkit-slider-thumb:hover{box-shadow:0 4px 16px rgba(192,86,33,0.5);transform:scale(1.1)}
    .spark-slider::-webkit-slider-thumb:active{cursor:grabbing;transform:scale(1.15);box-shadow:0 4px 20px rgba(192,86,33,0.6)}
    .spark-slider::-moz-range-thumb{width:28px;height:28px;border-radius:50%;background:#C05621;border:4px solid #fff;box-shadow:0 2px 8px rgba(192,86,33,0.35);cursor:grab}
    .spark-slider::-moz-range-track{height:8px;border-radius:4px;background:#F1F1F3}
    .spark-slider::-moz-range-progress{height:8px;border-radius:4px;background:#C05621}
  `;
  document.head.appendChild(s);
})();

// Auto-init on page load
document.addEventListener('DOMContentLoaded', function() {
  renderCalc('spark-calc');
});
