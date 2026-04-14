// Minimal PDF generator for Cloudflare Workers
// Generates a branded SparkSol proposal PDF from structured data

export function generateProposalPDF(proposal) {
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
