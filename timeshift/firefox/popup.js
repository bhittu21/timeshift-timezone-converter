// popup.js - TimeShift Popup Logic
// Author: Sheikh Abir Ali
// Email:  sheikhabirali@gmail.com
// LinkedIn: https://www.linkedin.com/in/sheikhabirali/
// SECURITY: Zero external calls. All data stays on device.
// Uses only: tsApi.storage.sync (for preferences), Intl API (built-in), DOM APIs

'use strict';

// Firefox / Chrome compatibility shim
const tsApi = typeof browser !== 'undefined' ? browser : chrome;

// ===== STATE =====
let fromTz = null;
let toTz = null;
let ampm = 'AM';
let isFromAutoDetected = false;

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initTimezones();
  initTimeInput();
  initDateInput();
  initButtons();
});

function initTimezones() {
  // Auto-detect local timezone
  const localIana = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const detected = TIMEZONES.find(t => t.iana === localIana);
  const localOffset = -new Date().getTimezoneOffset() / 60;
  const fallback = TIMEZONES.find(t => t.offset === localOffset) || TIMEZONES[12];
  const localTz = detected || fallback;

  // Default "to" timezone — pick something likely different from local
  const defaultTo = localTz.iana === 'America/New_York'
    ? TIMEZONES.find(t => t.iana === 'Europe/London')
    : TIMEZONES.find(t => t.iana === 'America/New_York');

  // Load saved preferences
  tsApi.storage.sync.get(['fromTz', 'toTz'], (data) => {
    fromTz = data.fromTz ? TIMEZONES.find(t => t.iana === data.fromTz) || localTz : localTz;
    toTz   = data.toTz   ? TIMEZONES.find(t => t.iana === data.toTz) || defaultTo : defaultTo;
    isFromAutoDetected = !data.fromTz;

    renderTz('from', fromTz, isFromAutoDetected);
    renderTz('to', toTz, false);
  });

  // Wire up search inputs
  setupSearch('from');
  setupSearch('to');

  // Edit buttons
  document.getElementById('from-edit-btn').addEventListener('click', () => toggleSearch('from'));
  document.getElementById('to-edit-btn').addEventListener('click', () => toggleSearch('to'));

  // Swap button
  document.getElementById('swap-btn').addEventListener('click', swapTimezones);
}

function renderTz(which, tz, isAuto = false) {
  if (!tz) return;
  const prefix = which; // 'from' or 'to'
  document.getElementById(`${prefix}-abbr`).textContent = tz.abbr;
  
  const nameEl = document.getElementById(`${prefix}-name`);
  nameEl.textContent = tz.label;
  
  if (which === 'from') {
    const autoBadge = document.getElementById('from-auto-badge');
    if (autoBadge) {
      autoBadge.style.display = isAuto ? 'inline' : 'none';
    } else {
      if (isAuto) {
        const badge = document.createElement('span');
        badge.className = 'auto-badge';
        badge.id = 'from-auto-badge';
        badge.textContent = 'AUTO';
        nameEl.appendChild(badge);
      }
    }
  }

  // Format offset
  const off = tz.offset;
  const sign = off >= 0 ? '+' : '−';
  const absOff = Math.abs(off);
  const h = Math.floor(absOff);
  const m = Math.round((absOff - h) * 60);
  const offStr = `UTC ${sign}${h}:${String(m).padStart(2,'0')}`;
  document.getElementById(`${prefix}-offset`).textContent = offStr;
}

function setupSearch(which) {
  const input = document.getElementById(`${which}-search`);
  const dropdown = document.getElementById(`${which}-dropdown`);

  input.addEventListener('input', () => renderDropdown(which, input.value));
  input.addEventListener('focus', () => renderDropdown(which, input.value));
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSearch(which);
  });
}

function renderDropdown(which, query) {
  const dropdown = document.getElementById(`${which}-dropdown`);
  const filtered = query.trim()
    ? TIMEZONES.filter(t =>
        t.label.toLowerCase().includes(query.toLowerCase()) ||
        t.abbr.toLowerCase().includes(query.toLowerCase()) ||
        t.iana.toLowerCase().includes(query.toLowerCase()))
    : TIMEZONES;

  // Safe DOM construction — no innerHTML with dynamic values
  while (dropdown.firstChild) dropdown.removeChild(dropdown.firstChild);
  filtered.slice(0, 10).forEach(t => {
    const item = document.createElement('div');
    item.className = 'tz-option';
    item.dataset.iana = t.iana;
    const labelSpan = document.createElement('span');
    labelSpan.className = 'tz-option-label';
    labelSpan.textContent = t.label;
    const abbrSpan = document.createElement('span');
    abbrSpan.className = 'tz-option-abbr';
    abbrSpan.textContent = t.abbr;
    item.appendChild(labelSpan);
    item.appendChild(abbrSpan);
    dropdown.appendChild(item);
  });

  dropdown.querySelectorAll('.tz-option').forEach(el => {
    el.addEventListener('click', () => {
      const selected = TIMEZONES.find(t => t.iana === el.dataset.iana);
      if (!selected) return;
      if (which === 'from') {
        fromTz = selected;
        isFromAutoDetected = false;
        renderTz('from', fromTz, false);
        tsApi.storage.sync.set({ fromTz: selected.iana });
      } else {
        toTz = selected;
        renderTz('to', toTz, false);
        tsApi.storage.sync.set({ toTz: selected.iana });
      }
      closeSearch(which);
      hideResult();
    });
  });
}

function toggleSearch(which) {
  const wrap = document.getElementById(`${which}-search-wrap`);
  const isOpen = wrap.classList.contains('open');
  // Close both first
  closeSearch('from'); closeSearch('to');
  if (!isOpen) {
    wrap.classList.add('open');
    document.getElementById(`${which}-search`).focus();
    renderDropdown(which, '');
    document.getElementById(`${which}-block`) &&
      document.getElementById(`${which}-block`).classList.add('active-block');
  }
}

function closeSearch(which) {
  document.getElementById(`${which}-search-wrap`).classList.remove('open');
  document.getElementById(`${which}-search`).value = '';
  const block = document.getElementById(`${which}-block`);
  if (block) block.classList.remove('active-block');
}

function swapTimezones() {
  [fromTz, toTz] = [toTz, fromTz];
  isFromAutoDetected = false;
  renderTz('from', fromTz, false);
  renderTz('to', toTz, false);
  tsApi.storage.sync.set({ fromTz: fromTz.iana, toTz: toTz.iana });
  hideResult();
}

function initTimeInput() {
  const input = document.getElementById('time-input');
  input.addEventListener('input', () => {
    // Auto-insert colon: "1030" → "10:30"
    let val = input.value.replace(/[^0-9]/g, '');
    if (val.length > 2) {
      val = val.slice(0,2) + ':' + val.slice(2,4);
    }
    input.value = val;
  });

  document.getElementById('btn-am').addEventListener('click', () => setAmPm('AM'));
  document.getElementById('btn-pm').addEventListener('click', () => setAmPm('PM'));
}

function setAmPm(val) {
  ampm = val;
  document.getElementById('btn-am').classList.toggle('active', val === 'AM');
  document.getElementById('btn-pm').classList.toggle('active', val === 'PM');
}

function initDateInput() {
  const today = new Date();
  const currentYear = today.getFullYear();

  // Populate year select: 2 years back to 2 years forward
  const yearSelect = document.getElementById('date-year');
  for (let y = currentYear - 2; y <= currentYear + 2; y++) {
    const opt = document.createElement('option');
    opt.value = y;
    opt.textContent = y;
    if (y === currentYear) opt.selected = true;
    yearSelect.appendChild(opt);
  }

  // Set current month
  document.getElementById('date-month').value = today.getMonth();

  // Populate and set day
  updateDayOptions();
  document.getElementById('date-day').value = today.getDate();

  // Re-populate days when month/year changes
  document.getElementById('date-month').addEventListener('change', updateDayOptions);
  document.getElementById('date-year').addEventListener('change', updateDayOptions);
}

function updateDayOptions() {
  const month = parseInt(document.getElementById('date-month').value);
  const year  = parseInt(document.getElementById('date-year').value);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daySelect = document.getElementById('date-day');
  const current = parseInt(daySelect.value) || 1;

  while (daySelect.firstChild) daySelect.removeChild(daySelect.firstChild);
  for (let d = 1; d <= daysInMonth; d++) {
    const opt = document.createElement('option');
    opt.value = d;
    opt.textContent = String(d).padStart(2, '0');
    daySelect.appendChild(opt);
  }
  daySelect.value = Math.min(current, daysInMonth);
}

function initButtons() {
  document.getElementById('convert-btn').addEventListener('click', doConvert);
  document.getElementById('now-btn').addEventListener('click', useCurrentTime);
  document.getElementById('copy-btn').addEventListener('click', copyResult);
}

function useCurrentTime() {
  const now = new Date();
  let h = now.getHours();
  const m = now.getMinutes();
  ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12; if (h === 0) h = 12;
  document.getElementById('time-input').value = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
  setAmPm(ampm);
}

// ===== CONVERSION LOGIC =====
function getOffsetMinutes(ianaName, date) {
  try {
    const tzStr = date.toLocaleString('en-US', { timeZone: ianaName });
    const utcStr = date.toLocaleString('en-US', { timeZone: 'UTC' });
    return (new Date(tzStr) - new Date(utcStr)) / 60000;
  } catch(e) {
    return 0;
  }
}

function doConvert() {
  hideError();
  hideResult();

  if (!fromTz || !toTz) {
    showError('Please select both timezones first.');
    return;
  }

  const rawTime = document.getElementById('time-input').value.trim();
  if (!rawTime) {
    showError('Please enter a time (e.g. 10:30)');
    return;
  }

  // Parse time
  const match = rawTime.match(/^(\d{1,2})(?::(\d{2}))?$/);
  if (!match) {
    showError('Invalid time format. Use HH:MM or just HH');
    return;
  }

  let hours = parseInt(match[1]);
  let minutes = parseInt(match[2] || '0');

  if (hours < 1 || hours > 12 || minutes < 0 || minutes > 59) {
    showError('Please enter a valid time (1–12 hours, 00–59 minutes)');
    return;
  }

  // Convert to 24hr
  if (ampm === 'PM' && hours !== 12) hours += 12;
  if (ampm === 'AM' && hours === 12) hours = 0;

  // Get the selected date from dropdowns
  const day   = parseInt(document.getElementById('date-day').value);
  const month = parseInt(document.getElementById('date-month').value);
  const year  = parseInt(document.getElementById('date-year').value);
  const refDate = new Date(year, month, day, 12, 0, 0);

  const fromOffset = getOffsetMinutes(fromTz.iana, refDate);
  const toOffset = getOffsetMinutes(toTz.iana, refDate);
  const diff = toOffset - fromOffset;

  let rH = hours + Math.floor(diff / 60);
  let rM = minutes + (diff % 60);
  if (rM >= 60) { rH++; rM -= 60; }
  if (rM < 0)   { rH--; rM += 60; }

  let dayShift = 0;
  if (rH >= 24) { dayShift = 1; rH -= 24; }
  else if (rH < 0) { dayShift = -1; rH += 24; }

  const resultAmPm = rH >= 12 ? 'PM' : 'AM';
  const rH12 = rH % 12 === 0 ? 12 : rH % 12;
  const resultTimeStr = `${rH12}:${String(rM).padStart(2,'0')} ${resultAmPm}`;

  // Original time display
  const origH12 = hours % 12 === 0 ? 12 : hours % 12;
  const origStr = `${origH12}:${String(minutes).padStart(2,'0')} ${ampm}`;

  // Day label — compute the actual destination date
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const days   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  // Build the destination date by shifting days from refDate
  const toDate = new Date(refDate);
  toDate.setDate(toDate.getDate() + dayShift);
  const dd   = String(toDate.getDate()).padStart(2, '0');
  const mon  = months[toDate.getMonth()];
  const yyyy = toDate.getFullYear();
  const dayName = days[toDate.getDay()];

  // e.g. "22 Feb 2026 — Saturday"
  const dateStr  = `${dd} ${mon} ${yyyy} — ${dayName}`;
  const dayLabel = dayShift === 0
    ? `✓ ${dateStr}`
    : dayShift > 0
    ? `→ ${dateStr}`
    : `← ${dateStr}`;

  // Render result
  document.getElementById('res-from-time').textContent = origStr;
  document.getElementById('res-from-tz').textContent = fromTz.abbr;
  document.getElementById('res-from-city').textContent = fromTz.label;
  document.getElementById('res-to-time').textContent = resultTimeStr;
  document.getElementById('res-to-tz').textContent = toTz.abbr;
  document.getElementById('res-to-city').textContent = toTz.label;

  const chip = document.getElementById('res-day-chip');
  chip.textContent = dayLabel;
  chip.className = 'day-chip ' + (dayShift === 0 ? 'day-same' : dayShift > 0 ? 'day-next' : 'day-prev');

  // Store for copy — format: 3:00 PM EST (22 Feb 2026 — Saturday)
  const dayPart = dayLabel.replace(/^[✓→←] /, '');
  document.getElementById('result-box').dataset.copyText =
    `${resultTimeStr} ${toTz.abbr} (${dayPart})`;

  showResult();
}

function copyResult() {
  const text = document.getElementById('result-box').dataset.copyText || '';
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById('copy-btn');
    btn.textContent = '✓ Copied to clipboard!';
    setTimeout(() => { btn.textContent = '📋 Copy Result'; }, 2000);
  }).catch(() => {
    // Fallback for older browsers
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  });
}

// ===== HELPERS =====
function showError(msg) {
  const el = document.getElementById('error-msg');
  el.textContent = msg;
  el.classList.add('visible');
}
function hideError() {
  document.getElementById('error-msg').classList.remove('visible');
}
function showResult() {
  document.getElementById('result-box').classList.add('visible');
}
function hideResult() {
  document.getElementById('result-box').classList.remove('visible');
}
function esc(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ===== EXTERNAL LINK HANDLER =====
// Chrome extensions cannot open links directly — must use tsApi.tabs.create()
document.querySelectorAll('a[href^="http"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    tsApi.tabs.create({ url: link.href });
  });
});
