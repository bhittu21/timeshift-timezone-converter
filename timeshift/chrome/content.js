// content.js - TimeShift
// Author: Sheikh Abir Ali | sheikhabirali@gmail.com
// https://www.linkedin.com/in/sheikhabirali/

// content.js - Injected into every page
// Handles the floating overlay after right-click conversion
// SECURITY: No data sent anywhere, purely local DOM manipulation

(function() {
  'use strict';

  // Prevent double injection
  if (window.__timeshiftLoaded) return;
  window.__timeshiftLoaded = true;


  function getLocalTz() {
    const ianaName = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return TIMEZONES.find(tz => tz.iana === ianaName) || TIMEZONES[12];
  }

  function getOffsetMinutes(ianaName, date) {
    const utcMs = Date.UTC(
      date.getFullYear(), date.getMonth(), date.getDate(),
      date.getHours(), date.getMinutes()
    );
    const tzStr = new Date(utcMs).toLocaleString('en-US', { timeZone: ianaName });
    const tzDate = new Date(tzStr);
    const utcDate = new Date(new Date(utcMs).toLocaleString('en-US', { timeZone: 'UTC' }));
    return (tzDate - utcDate) / 60000;
  }

  function convertTime(timeStr, fromIana, toIana) {
    const cleaned = timeStr.trim().toUpperCase().replace(/\s+/g, '');
    let hours = 0, minutes = 0;
    const ampm12 = cleaned.match(/^(\d{1,2})(?::(\d{2}))?(AM|PM)$/);
    const hour24 = cleaned.match(/^(\d{1,2}):(\d{2})$/);
    const hourOnly = cleaned.match(/^(\d{1,2})$/);

    if (ampm12) {
      hours = parseInt(ampm12[1]);
      minutes = parseInt(ampm12[2] || '0');
      if (ampm12[3] === 'PM' && hours !== 12) hours += 12;
      if (ampm12[3] === 'AM' && hours === 12) hours = 0;
    } else if (hour24) {
      hours = parseInt(hour24[1]);
      minutes = parseInt(hour24[2]);
    } else if (hourOnly) {
      hours = parseInt(hourOnly[1]);
    } else {
      return null;
    }

    const now = new Date();
    const fromOffset = getOffsetMinutes(fromIana, now);
    const toOffset = getOffsetMinutes(toIana, now);
    const diff = toOffset - fromOffset;

    let rH = hours + Math.floor(diff / 60);
    let rM = minutes + (diff % 60);
    if (rM >= 60) { rH++; rM -= 60; }
    if (rM < 0) { rH--; rM += 60; }

    let dayShift = 0;
    if (rH >= 24) { dayShift = 1; rH -= 24; }
    else if (rH < 0) { dayShift = -1; rH += 24; }

    const ampm = rH >= 12 ? 'PM' : 'AM';
    const h12 = rH % 12 === 0 ? 12 : rH % 12;
    const resultTime = `${h12}:${String(rM).padStart(2,'0')} ${ampm}`;

    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const days   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const toDate = new Date(now);
    toDate.setDate(toDate.getDate() + dayShift);
    const dd      = String(toDate.getDate()).padStart(2, '0');
    const mon     = months[toDate.getMonth()];
    const yyyy    = toDate.getFullYear();
    const dayName = days[toDate.getDay()];
    const dayLabel = `${dd} ${mon} ${yyyy} — ${dayName}`;

    return { resultTime, dayLabel, dayShift };
  }

  function parseSelectedText(text) {
    const t = text.trim();
    const match = t.match(/(\d{1,2}(?::\d{2})?\s*(?:AM|PM|am|pm)?)\s*([A-Z]{2,5})?/i);
    if (!match) return null;
    const timeStr = match[1].trim();
    const tzAbbr = match[2] ? match[2].toUpperCase() : null;
    const isValid = /\d{1,2}(:\d{2})?(\s*(AM|PM|am|pm))?/i.test(timeStr);
    if (!isValid) return null;
    const detectedTz = tzAbbr ? TIMEZONES.find(tz => tz.abbr === tzAbbr) : null;
    return { timeStr, detectedTz };
  }

  // ---- Overlay UI ----
  function removeOverlay() {
    const existing = document.getElementById('timeshift-overlay');
    if (existing) existing.remove();
  }

  function showOverlay(selectedText, x, y) {
    removeOverlay();
    const parsed = parseSelectedText(selectedText);
    if (!parsed) return;

    const localTz = getLocalTz();

    const overlay = document.createElement('div');
    overlay.id = 'timeshift-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-label', 'TimeShift Converter');

    // If timezone detected in text, skip confirmation and convert immediately
    if (parsed.detectedTz) {
      chrome.storage.sync.get(['toTz'], (data) => {
        const toTz = data.toTz ? TIMEZONES.find(t => t.iana === data.toTz) : localTz;
        showResultOverlay(overlay, parsed.timeStr, parsed.detectedTz, toTz, x, y);
      });
    } else {
      // Ask user to confirm source timezone
      showConfirmOverlay(overlay, parsed.timeStr, localTz, x, y);
    }

    document.body.appendChild(overlay);

    // Close on outside click
    setTimeout(() => {
      document.addEventListener('click', function handler(e) {
        if (!overlay.contains(e.target)) {
          removeOverlay();
          document.removeEventListener('click', handler);
        }
      });
    }, 100);

    // Close on Escape
    document.addEventListener('keydown', function handler(e) {
      if (e.key === 'Escape') {
        removeOverlay();
        document.removeEventListener('keydown', handler);
      }
    });
  }

  function showConfirmOverlay(overlay, timeStr, localTz, x, y) {
    overlay.innerHTML = `
      <div class="ts-header">
        <span class="ts-logo">⏱ TimeShift</span>
        <button class="ts-close" title="Close">✕</button>
      </div>
      <div class="ts-body">
        <div class="ts-question">No timezone found in "<strong>${escHtml(timeStr)}</strong>"</div>
        <div class="ts-sublabel">What timezone is this time in?</div>
        <input class="ts-search" id="ts-from-search" type="text" placeholder="Search timezone…" autocomplete="off" />
        <div class="ts-list" id="ts-from-list"></div>
        <div class="ts-selected" id="ts-from-selected">
          Selected: <strong>${escHtml(localTz.label)}</strong> (${localTz.abbr})
        </div>
        <button class="ts-btn" id="ts-confirm-btn">Convert →</button>
      </div>
    `;
    positionOverlay(overlay, x, y);
    overlay.querySelector('.ts-close').addEventListener('click', removeOverlay);

    let selectedFromTz = localTz;
    const searchInput = overlay.querySelector('#ts-from-search');
    const list = overlay.querySelector('#ts-from-list');
    const selectedLabel = overlay.querySelector('#ts-from-selected');

    function renderList(query) {
      const filtered = query
        ? TIMEZONES.filter(t =>
            t.label.toLowerCase().includes(query.toLowerCase()) ||
            t.abbr.toLowerCase().includes(query.toLowerCase()))
        : TIMEZONES;
      list.innerHTML = filtered.slice(0, 8).map(t =>
        `<div class="ts-list-item" data-iana="${escHtml(t.iana)}">${escHtml(t.label)} <span class="ts-abbr">${t.abbr}</span></div>`
      ).join('');
      list.querySelectorAll('.ts-list-item').forEach(item => {
        item.addEventListener('click', () => {
          selectedFromTz = TIMEZONES.find(t => t.iana === item.dataset.iana);
          selectedLabel.innerHTML = `Selected: <strong>${escHtml(selectedFromTz.label)}</strong> (${selectedFromTz.abbr})`;
          list.innerHTML = '';
          searchInput.value = selectedFromTz.label;
        });
      });
    }

    searchInput.addEventListener('input', () => renderList(searchInput.value));
    searchInput.addEventListener('focus', () => renderList(searchInput.value));

    overlay.querySelector('#ts-confirm-btn').addEventListener('click', () => {
      chrome.storage.sync.get(['toTz'], (data) => {
        const toTz = data.toTz ? TIMEZONES.find(t => t.iana === data.toTz) : getLocalTz();
        showResultOverlay(overlay, timeStr, selectedFromTz, toTz, x, y);
      });
    });
  }

  function showResultOverlay(overlay, timeStr, fromTz, toTz, x, y) {
    const result = convertTime(timeStr, fromTz.iana, toTz.iana);
    if (!result) {
      overlay.innerHTML = `<div class="ts-body"><div class="ts-error">Could not parse time. Please try the popup.</div></div>`;
      positionOverlay(overlay, x, y);
      return;
    }

    const fromAmPm = formatDisplayTime(timeStr);
    const dayClass = result.dayShift === 0 ? 'ts-same' : result.dayShift > 0 ? 'ts-next' : 'ts-prev';

    overlay.innerHTML = `
      <div class="ts-header">
        <span class="ts-logo">⏱ TimeShift</span>
        <button class="ts-close" title="Close">✕</button>
      </div>
      <div class="ts-body">
        <div class="ts-result-row">
          <div class="ts-from-block">
            <div class="ts-time-big">${escHtml(fromAmPm)}</div>
            <div class="ts-tz-label">${escHtml(fromTz.abbr)}</div>
            <div class="ts-tz-city">${escHtml(fromTz.label)}</div>
          </div>
          <div class="ts-arrow">→</div>
          <div class="ts-to-block">
            <div class="ts-time-big ts-highlight">${escHtml(result.resultTime)}</div>
            <div class="ts-tz-label">${escHtml(toTz.abbr)}</div>
            <div class="ts-tz-city">${escHtml(toTz.label)}</div>
          </div>
        </div>
        <div class="ts-day-badge ${dayClass}">${escHtml(result.dayLabel)}</div>
        <button class="ts-btn ts-copy-btn" id="ts-copy-result">Copy Result</button>
      </div>
    `;
    positionOverlay(overlay, x, y);
    overlay.querySelector('.ts-close').addEventListener('click', removeOverlay);
    overlay.querySelector('#ts-copy-result').addEventListener('click', () => {
      const copyText = `${result.resultTime} ${toTz.abbr} (${result.dayLabel})`;
      navigator.clipboard.writeText(copyText).then(() => {
        const btn = overlay.querySelector('#ts-copy-result');
        btn.textContent = '✓ Copied!';
        setTimeout(() => { btn.textContent = 'Copy Result'; }, 2000);
      });
    });
  }

  function positionOverlay(overlay, x, y) {
    overlay.style.position = 'fixed';
    overlay.style.zIndex = '2147483647';
    const safeX = Math.min(x, window.innerWidth - 340);
    const safeY = Math.min(y, window.innerHeight - 300);
    overlay.style.left = Math.max(8, safeX) + 'px';
    overlay.style.top = Math.max(8, safeY) + 'px';
  }

  function formatDisplayTime(timeStr) {
    // Normalize for display
    return timeStr.replace(/\s+/g, ' ').trim();
  }

  function escHtml(str) {
    if (!str) return '';
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  // Listen for messages from background script
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "showConvertOverlay") {
      // Position near center of viewport since we don't have mouse coords from context menu
      const x = window.innerWidth / 2 - 160;
      const y = window.innerHeight / 2 - 150;
      showOverlay(message.selectedText, x, y);
    }
  });

})();
