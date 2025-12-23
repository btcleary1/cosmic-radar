const SERVICES = [
  {
    id: 'design',
    name: 'Landscape Design',
    description:
      'Custom landscape design and planning services, specializing in native plants and climate-appropriate solutions.',
    included: [
      'Site analysis and soil testing',
      'Custom design consultation',
      '3D landscape visualization',
      'Plant selection for local climate',
      'Professional installation',
      '1-year plant warranty',
    ],
    base: 2500,
    note: 'Price varies by property size and complexity',
    cadence: 'project',
  },
  {
    id: 'lawn',
    name: 'Lawn Maintenance & Care',
    description:
      'Professional lawn care and maintenance, including mowing, fertilization, and weed control.',
    included: [
      'Weekly or bi-weekly mowing',
      'Edge trimming and cleanup',
      'Fertilization program',
      'Weed control treatment',
      'Seasonal lawn care',
      'Equipment and supplies included',
    ],
    base: 150,
    note: 'Based on property size and frequency',
    cadence: 'monthly',
  },
  {
    id: 'trees',
    name: 'Tree & Shrub Care Services',
    description:
      'Expert tree trimming, pruning, and shrub care services ensuring healthy growth and storm resistance.',
    included: [
      'Professional pruning and shaping',
      'Tree and shrub planting',
      'Disease and pest treatment',
      'Fertilization and soil care',
      'Removal of dead or damaged trees',
      'Native species expertise',
    ],
    base: 300,
    note: 'Per service visit or project',
    cadence: 'visit',
  },
  {
    id: 'irrigation',
    name: 'Irrigation Systems',
    description:
      'Professional irrigation system installation, repair, and maintenance for efficient water management.',
    included: [
      'Smart irrigation system design',
      'Professional installation',
      'Zone-based watering control',
      'Water-efficient sprinkler heads',
      'System maintenance and repairs',
      'Local water regulation compliance',
    ],
    base: 1800,
    note: 'Complete system installation',
    cadence: 'project',
  },
  {
    id: 'cleanup',
    name: 'Landscape Cleanup Services',
    description:
      'Comprehensive cleanup and debris removal for storm cleanup, seasonal maintenance, and property preparation.',
    included: [
      'Seasonal leaf and debris removal',
      'Storm damage cleanup',
      'Overgrown vegetation clearing',
      'Mulch installation and refresh',
      'Property preparation services',
      'Eco-friendly disposal methods',
    ],
    base: 200,
    note: 'Per cleanup service',
    cadence: 'visit',
  },
];

function money(n) {
  return n.toLocaleString(undefined, { style: 'currency', currency: 'USD' });
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function getFormValue(id) {
  const el = document.getElementById(id);
  if (!el) return null;
  if (el.type === 'checkbox') return el.checked;
  return el.value;
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function calcQuote(input) {
  const service = SERVICES.find((s) => s.id === input.serviceType) ?? SERVICES[0];
  const size = clamp(Number(input.propertySize || 0), 500, 100000);
  const complexityFactor =
    input.complexity === 'premium' ? 1.2 : input.complexity === 'high' ? 1.45 : 1;

  const sizeFactor = service.id === 'lawn' ? clamp(size / 5000, 0.7, 2.3) : clamp(size / 6000, 0.8, 2.6);

  const urgentFee = input.urgent ? 125 : 0;

  let frequencyFactor = 1;
  if (service.id === 'lawn') {
    frequencyFactor =
      input.frequency === 'weekly'
        ? 1.6
        : input.frequency === 'bi-weekly'
          ? 1.25
          : input.frequency === 'monthly'
            ? 1
            : 1; // one-time treated as monthly baseline
  } else {
    frequencyFactor = input.frequency === 'one-time' ? 1 : 1;
  }

  const subtotal = Math.round(service.base * sizeFactor * complexityFactor * frequencyFactor);
  const tax = Math.round(subtotal * 0.0);
  const total = subtotal + urgentFee + tax;

  const cadenceLabel =
    service.cadence === 'monthly'
      ? 'Estimated monthly total'
      : service.cadence === 'visit'
        ? 'Estimated per-visit total'
        : 'Estimated project total';

  return {
    service,
    size,
    complexityFactor,
    sizeFactor,
    frequencyFactor,
    urgentFee,
    subtotal,
    tax,
    total,
    cadenceLabel,
  };
}

function buildContract(input, quote, signatureDataUrl) {
  const now = new Date();
  const dateStr = now.toLocaleDateString();
  const timeStr = now.toLocaleTimeString();

  const scopeLines = quote.service.included
    .map((x) => `- ${x}`)
    .join('\n');

  const cadence = quote.service.cadence === 'monthly' ? 'monthly service' : quote.service.cadence === 'visit' ? 'service visit' : 'project';

  const signatureLine = signatureDataUrl ? '[SIGNATURE CAPTURED]' : '[NOT SIGNED]';

  return [
    'HORTUS GARDEN & LANDSCAPE — QUOTE CONTRACT',
    '',
    `Generated: ${dateStr} ${timeStr}`,
    '',
    'CUSTOMER',
    `Name: ${input.customerName || ''}`,
    `Email: ${input.customerEmail || ''}`,
    `Phone: ${input.customerPhone || ''}`,
    `Service area: ${input.serviceArea || ''}`,
    `Property type: ${input.propertyType || ''}`,
    `Yard size (sq ft): ${quote.size}`,
    '',
    'SERVICE',
    `Selected service: ${quote.service.name}`,
    `Cadence: ${cadence}`,
    `Frequency: ${input.frequency || ''}`,
    `Complexity: ${input.complexity || ''}`,
    `Rush: ${input.urgent ? 'Yes' : 'No'}`,
    '',
    'SCOPE (WHAT’S INCLUDED)',
    scopeLines,
    '',
    'PRICING',
    `Base pricing: ${money(quote.service.base)}`,
    `Size factor: ${quote.sizeFactor.toFixed(2)}`,
    `Complexity factor: ${quote.complexityFactor.toFixed(2)}`,
    `Frequency factor: ${quote.frequencyFactor.toFixed(2)}`,
    `Subtotal: ${money(quote.subtotal)}`,
    `Rush fee: ${money(quote.urgentFee)}`,
    `Total: ${money(quote.total)}`,
    '',
    'TERMS (SUMMARY)',
    '- This quote is an estimate based on provided information.',
    '- Final pricing may change after on-site verification.',
    '- Customer agrees to provide reasonable access to the work area.',
    '- Payment due upon completion unless otherwise agreed in writing.',
    '- Warranty/guarantees, if any, apply only as stated in service documentation.',
    '',
    'CUSTOMER NOTES',
    input.notes ? input.notes : '(none)',
    '',
    'ACCEPTANCE',
    `Digital signature: ${signatureLine}`,
    `Accepted by: ${input.customerName || ''}`,
    `Accepted on: ${dateStr} ${timeStr}`,
  ].join('\n');
}

function renderServices() {
  const wrap = document.getElementById('service-cards');
  const select = document.getElementById('serviceType');
  if (!wrap || !select) return;

  wrap.innerHTML = '';
  select.innerHTML = '';

  for (const s of SERVICES) {
    const opt = document.createElement('option');
    opt.value = s.id;
    opt.textContent = s.name;
    select.appendChild(opt);

    const card = document.createElement('div');
    card.className = 'card';

    const top = document.createElement('div');
    top.className = 'card-top';

    const title = document.createElement('h3');
    title.className = 'card-title';
    title.textContent = s.name;

    const pill = document.createElement('div');
    pill.className = 'price-pill';
    pill.textContent = `Starting at ${money(s.base)}${s.cadence === 'monthly' ? '/mo' : ''}`;

    top.appendChild(title);
    top.appendChild(pill);

    const desc = document.createElement('p');
    desc.className = 'card-desc';
    desc.textContent = s.description;

    const list = document.createElement('ul');
    list.className = 'card-list';
    for (const item of s.included.slice(0, 4)) {
      const li = document.createElement('li');
      li.textContent = item;
      list.appendChild(li);
    }

    const actions = document.createElement('div');
    actions.className = 'card-actions';

    const details = document.createElement('button');
    details.className = 'btn btn-outline';
    details.type = 'button';
    details.textContent = 'View details';
    details.addEventListener('click', () => openServiceModal(s));

    const quote = document.createElement('a');
    quote.className = 'btn';
    quote.href = '#quote';
    quote.textContent = 'Get quote';
    quote.addEventListener('click', () => {
      select.value = s.id;
      requestUpdate();
    });

    actions.appendChild(details);
    actions.appendChild(quote);

    card.appendChild(top);
    card.appendChild(desc);
    card.appendChild(list);
    card.appendChild(actions);

    wrap.appendChild(card);
  }
}

function openServiceModal(service) {
  const modal = document.getElementById('serviceModal');
  if (!modal) return;

  setText('modalTitle', service.name);
  setText('modalPrice', `Starting at ${money(service.base)} — ${service.note}`);
  setText('modalDesc', service.description);
  setText('modalNote', service.note);

  const ul = document.getElementById('modalList');
  if (ul) {
    ul.innerHTML = '';
    for (const item of service.included) {
      const li = document.createElement('li');
      li.textContent = item;
      ul.appendChild(li);
    }
  }

  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  const select = document.getElementById('serviceType');
  if (select) select.value = service.id;
  requestUpdate();
}

function closeModal() {
  const modal = document.getElementById('serviceModal');
  if (!modal) return;
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function setupModal() {
  document.addEventListener('click', (e) => {
    const t = e.target;
    if (!(t instanceof HTMLElement)) return;
    if (t.matches('[data-modal-close]')) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

let currentStep = 1;
let signatureDataUrl = '';
let isDrawing = false;

function setStep(step) {
  currentStep = clamp(step, 1, 5);

  document.querySelectorAll('.step').forEach((btn) => {
    const s = Number(btn.getAttribute('data-step'));
    if (s === currentStep) btn.setAttribute('aria-current', 'step');
    else btn.removeAttribute('aria-current');
  });

  document.querySelectorAll('.step-pane').forEach((pane) => {
    const s = Number(pane.getAttribute('data-step-pane'));
    pane.hidden = s !== currentStep;
  });

  const back = document.querySelector('[data-action="back"]');
  const next = document.querySelector('[data-action="next"]');
  if (back) back.toggleAttribute('disabled', currentStep === 1);
  if (next) next.textContent = currentStep === 5 ? 'Done' : 'Next';

  requestUpdate();
}

function collectInput() {
  return {
    customerName: getFormValue('customerName'),
    customerEmail: getFormValue('customerEmail'),
    customerPhone: getFormValue('customerPhone'),
    serviceType: getFormValue('serviceType'),
    serviceArea: getFormValue('serviceArea'),
    propertyType: getFormValue('propertyType'),
    propertySize: getFormValue('propertySize'),
    complexity: getFormValue('complexity'),
    frequency: getFormValue('frequency'),
    notes: getFormValue('notes'),
    urgent: getFormValue('urgent'),
  };
}

function validateStep(step, input) {
  const requiredIdsByStep = {
    1: ['customerName', 'customerEmail', 'serviceType', 'serviceArea'],
    2: ['propertySize'],
  };

  const ids = requiredIdsByStep[step] || [];
  let ok = true;
  for (const id of ids) {
    const el = document.getElementById(id);
    if (!el) continue;
    const val = getFormValue(id);
    const invalid = !val || (typeof val === 'string' && val.trim().length === 0);
    if (invalid) {
      ok = false;
      el.setAttribute('aria-invalid', 'true');
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      el.removeAttribute('aria-invalid');
    }
  }

  const email = String(input.customerEmail || '');
  if (step === 1 && email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    ok = false;
    const el = document.getElementById('customerEmail');
    if (el) el.setAttribute('aria-invalid', 'true');
  }

  return ok;
}

function renderSummary() {
  const input = collectInput();
  const quote = calcQuote(input);

  setText('quoteTotal', money(quote.total));
  setText('quoteCadence', quote.cadenceLabel);

  const breakdown = document.getElementById('quoteBreakdown');
  if (breakdown) {
    breakdown.innerHTML = '';
    const rows = [
      ['Service', quote.service.name],
      ['Yard size', `${quote.size.toLocaleString()} sq ft`],
      ['Complexity', String(input.complexity)],
      ['Frequency', String(input.frequency)],
      ['Subtotal', money(quote.subtotal)],
      ['Rush fee', money(quote.urgentFee)],
      ['Total', money(quote.total)],
    ];

    for (const [k, v] of rows) {
      const div = document.createElement('div');
      const dt = document.createElement('dt');
      dt.textContent = k;
      const dd = document.createElement('dd');
      dd.textContent = v;
      div.appendChild(dt);
      div.appendChild(dd);
      breakdown.appendChild(div);
    }
  }

  const finalDetails = document.getElementById('finalDetails');
  if (finalDetails) {
    finalDetails.innerHTML = '';
    const rows = [
      ['Name', String(input.customerName || '')],
      ['Email', String(input.customerEmail || '')],
      ['Service area', String(input.serviceArea || '')],
      ['Service', quote.service.name],
      ['Total', money(quote.total)],
    ];

    for (const [k, v] of rows) {
      const div = document.createElement('div');
      const dt = document.createElement('dt');
      dt.textContent = k;
      const dd = document.createElement('dd');
      dd.textContent = v;
      div.appendChild(dt);
      div.appendChild(dd);
      finalDetails.appendChild(div);
    }
  }

  if (currentStep >= 4) {
    const contractText = document.getElementById('contractText');
    if (contractText) contractText.textContent = buildContract(input, quote, signatureDataUrl);
  }
}

let updateRequested = false;
function requestUpdate() {
  if (updateRequested) return;
  updateRequested = true;
  window.requestAnimationFrame(() => {
    updateRequested = false;
    renderSummary();
  });
}

function setupQuoteNav() {
  document.querySelectorAll('.step').forEach((btn) => {
    btn.addEventListener('click', () => {
      const step = Number(btn.getAttribute('data-step'));
      const input = collectInput();
      // only allow jumping forward if current is valid
      if (step > currentStep && !validateStep(currentStep, input)) return;
      setStep(step);
    });
  });

  document.addEventListener('click', (e) => {
    const t = e.target;
    if (!(t instanceof HTMLElement)) return;
    const action = t.getAttribute('data-action');
    if (!action) return;

    const input = collectInput();

    if (action === 'back') {
      setStep(currentStep - 1);
      return;
    }

    if (action === 'next') {
      if (!validateStep(currentStep, input)) return;
      setStep(currentStep + 1);
      return;
    }

    if (action === 'refresh') {
      requestUpdate();
      return;
    }

    if (action === 'download') {
      const quote = calcQuote(input);
      const content = buildContract(input, quote, signatureDataUrl);
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `hortus-quote-contract-${Date.now()}.txt`;
      a.click();
      URL.revokeObjectURL(url);
      return;
    }

    if (action === 'email') {
      const quote = calcQuote(input);
      const subject = encodeURIComponent('Hortus Quote Contract');
      const body = encodeURIComponent(buildContract(input, quote, signatureDataUrl));
      const email = encodeURIComponent(String(input.customerEmail || ''));
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
      return;
    }

    if (action === 'clear-signature') {
      clearSignature();
      requestUpdate();
      return;
    }

    if (action === 'accept') {
      acceptContract();
      return;
    }
  });

  document.getElementById('quote-form')?.addEventListener('input', () => requestUpdate());
}

function setupNavMenu() {
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');
  if (!(toggle instanceof HTMLButtonElement) || !(nav instanceof HTMLElement)) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.getAttribute('data-open') === 'true';
    nav.setAttribute('data-open', String(!isOpen));
    toggle.setAttribute('aria-expanded', String(!isOpen));
  });

  nav.addEventListener('click', (e) => {
    const t = e.target;
    if (!(t instanceof HTMLElement)) return;
    if (t.matches('a')) {
      nav.removeAttribute('data-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('click', (e) => {
    const t = e.target;
    if (!(t instanceof HTMLElement)) return;
    const clickedInside = nav.contains(t) || toggle.contains(t);
    if (!clickedInside) {
      nav.removeAttribute('data-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

function setupSignaturePad() {
  const canvas = document.getElementById('signatureCanvas');
  if (!(canvas instanceof HTMLCanvasElement)) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  function resizeForDevice() {
    const ratio = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.floor(rect.width * ratio);
    canvas.height = Math.floor(rect.height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 2.4;
    ctx.strokeStyle = '#0f172a';
  }

  const ro = new ResizeObserver(() => resizeForDevice());
  ro.observe(canvas);
  resizeForDevice();

  let last = null;

  function pointFromEvent(ev) {
    const rect = canvas.getBoundingClientRect();
    if ('touches' in ev && ev.touches.length) {
      return { x: ev.touches[0].clientX - rect.left, y: ev.touches[0].clientY - rect.top };
    }
    return { x: ev.clientX - rect.left, y: ev.clientY - rect.top };
  }

  function start(ev) {
    isDrawing = true;
    last = pointFromEvent(ev);
    ctx.beginPath();
    ctx.moveTo(last.x, last.y);
    ev.preventDefault?.();
  }

  function move(ev) {
    if (!isDrawing) return;
    const p = pointFromEvent(ev);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    last = p;
    ev.preventDefault?.();
  }

  function end() {
    if (!isDrawing) return;
    isDrawing = false;
    try {
      signatureDataUrl = canvas.toDataURL('image/png');
    } catch {
      signatureDataUrl = '';
    }
    requestUpdate();
  }

  canvas.addEventListener('mousedown', start);
  canvas.addEventListener('mousemove', move);
  window.addEventListener('mouseup', end);

  canvas.addEventListener('touchstart', start, { passive: false });
  canvas.addEventListener('touchmove', move, { passive: false });
  window.addEventListener('touchend', end);

  window.__clearSignature = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    signatureDataUrl = '';
  };
}

function clearSignature() {
  if (typeof window.__clearSignature === 'function') window.__clearSignature();
  const accept = document.getElementById('acceptTerms');
  if (accept instanceof HTMLInputElement) accept.checked = false;
  const notice = document.getElementById('acceptNotice');
  if (notice) notice.hidden = true;
}

function acceptContract() {
  const accept = document.getElementById('acceptTerms');
  const notice = document.getElementById('acceptNotice');
  const input = collectInput();

  const hasSig = !!signatureDataUrl;
  const accepted = accept instanceof HTMLInputElement ? accept.checked : false;

  if (!hasSig) {
    if (notice) {
      notice.textContent = 'Please provide a signature before accepting.';
      notice.hidden = false;
    }
    return;
  }

  if (!accepted) {
    if (notice) {
      notice.textContent = 'Please check the acceptance box to confirm.';
      notice.hidden = false;
    }
    return;
  }

  const quote = calcQuote(input);
  const contract = buildContract(input, quote, signatureDataUrl);

  // Prepare email content
  const subject = `New Contract Acceptance - ${input.customerName}`;
  const body = `Customer: ${input.customerName}\n` +
             `Email: ${input.customerEmail || 'Not provided'}\n` +
             `Phone: ${input.customerPhone || 'Not provided'}\n\n` +
             `Service: ${quote.service?.name || 'Not specified'}\n` +
             `Total: $${quote.total?.toFixed(2) || '0.00'}\n\n` +
             `Contract Details:\n${contract || 'No contract details'}\n\n` +
             `Signature: ${signatureDataUrl ? 'Attached (see signature data)' : 'Not provided'}`;

  // Create mailto link
  const mailtoLink = `mailto:info@hortuslandscaping.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  // Open user's default email client
  window.location.href = mailtoLink;

  // Save locally
  const payload = {
    acceptedAt: new Date().toISOString(),
    input,
    quote: {
      serviceId: quote.service?.id,
      serviceName: quote.service?.name,
      total: quote.total,
      subtotal: quote.subtotal,
      urgentFee: quote.urgentFee,
      size: quote.size,
    },
    signatureDataUrl,
    contract,
  };

  try {
    localStorage.setItem('hortusAcceptedContract', JSON.stringify(payload));
  } catch (e) {
    console.error('Failed to save contract locally:', e);
  }

  // Show success message
  if (notice) {
    notice.textContent = 'Your contract has been saved. Please send the email that opened to complete the process.';
    notice.hidden = false;
    notice.className = 'notice-success';
  }

  // Close the modal
  closeModal();
  // Reset the form
  const form = document.getElementById('quote-form');
  if (form) form.reset();
  // Clear the signature
  clearSignature();
  // Reset to first step
  setStep(1);
  
  requestUpdate();
}

function init() {
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  renderServices();
  setupModal();
  setupNavMenu();
  setupQuoteNav();
  setupSignaturePad();

  // initial defaults
  const serviceType = document.getElementById('serviceType');
  if (serviceType instanceof HTMLSelectElement) serviceType.value = SERVICES[0].id;

  setStep(1);
  requestUpdate();
}

document.addEventListener('DOMContentLoaded', init);
