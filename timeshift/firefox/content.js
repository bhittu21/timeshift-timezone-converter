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

  // Firefox / Chrome compatibility shim
  const tsApi = typeof browser !== 'undefined' ? browser : chrome;


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
      tsApi.storage.sync.get(['toTz'], (data) => {
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
    // Safe DOM build — no innerHTML with dynamic values
    while (overlay.firstChild) overlay.removeChild(overlay.firstChild);

    const hdr1 = document.createElement('div'); hdr1.className = 'ts-header';
    const logo1 = document.createElement('span'); logo1.className = 'ts-logo'; logo1.textContent = '⏱ TimeShift';
    const close1 = document.createElement('button'); close1.className = 'ts-close'; close1.title = 'Close'; close1.textContent = '✕';
    hdr1.appendChild(logo1); hdr1.appendChild(close1);

    const body1 = document.createElement('div'); body1.className = 'ts-body';

    const q = document.createElement('div'); q.className = 'ts-question';
    q.textContent = 'No timezone found in "'; 
    const strong1 = document.createElement('strong'); strong1.textContent = timeStr;
    q.appendChild(strong1); q.appendChild(document.createTextNode('"'));

    const sub1 = document.createElement('div'); sub1.className = 'ts-sublabel'; sub1.textContent = 'What timezone is this time in?';

    const inp1 = document.createElement('input'); inp1.className = 'ts-search'; inp1.id = 'ts-from-search';
    inp1.type = 'text'; inp1.placeholder = 'Search timezone…'; inp1.autocomplete = 'off';

    const listDiv = document.createElement('div'); listDiv.className = 'ts-list'; listDiv.id = 'ts-from-list';

    const selDiv = document.createElement('div'); selDiv.className = 'ts-selected'; selDiv.id = 'ts-from-selected';
    selDiv.textContent = 'Selected: ';
    const selStrong = document.createElement('strong'); selStrong.textContent = localTz.label;
    selDiv.appendChild(selStrong); selDiv.appendChild(document.createTextNode(' (' + localTz.abbr + ')'));

    const confirmBtn = document.createElement('button'); confirmBtn.className = 'ts-btn'; confirmBtn.id = 'ts-confirm-btn'; confirmBtn.textContent = 'Convert →';

    [q, sub1, inp1, listDiv, selDiv, confirmBtn].forEach(el => body1.appendChild(el));
    overlay.appendChild(hdr1); overlay.appendChild(body1);
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
      while (list.firstChild) list.removeChild(list.firstChild);
      filtered.slice(0, 8).forEach(t => {
        const row = document.createElement('div');
        row.className = 'ts-list-item';
        row.dataset.iana = t.iana;
        row.textContent = t.label + ' ';
        const abbrSpan = document.createElement('span');
        abbrSpan.className = 'ts-abbr';
        abbrSpan.textContent = t.abbr;
        row.appendChild(abbrSpan);
        list.appendChild(row);
      });
      list.querySelectorAll('.ts-list-item').forEach(item => {
        item.addEventListener('click', () => {
          selectedFromTz = TIMEZONES.find(t => t.iana === item.dataset.iana);
          while (selectedLabel.firstChild) selectedLabel.removeChild(selectedLabel.firstChild);
          selectedLabel.textContent = 'Selected: ';
          const sl = document.createElement('strong'); sl.textContent = selectedFromTz.label;
          selectedLabel.appendChild(sl);
          selectedLabel.appendChild(document.createTextNode(' (' + selectedFromTz.abbr + ')'));
          while (list.firstChild) list.removeChild(list.firstChild);
          searchInput.value = selectedFromTz.label;
        });
      });
    }

    searchInput.addEventListener('input', () => renderList(searchInput.value));
    searchInput.addEventListener('focus', () => renderList(searchInput.value));

    overlay.querySelector('#ts-confirm-btn').addEventListener('click', () => {
      tsApi.storage.sync.get(['toTz'], (data) => {
        const toTz = data.toTz ? TIMEZONES.find(t => t.iana === data.toTz) : getLocalTz();
        showResultOverlay(overlay, timeStr, selectedFromTz, toTz, x, y);
      });
    });
  }

  function showResultOverlay(overlay, timeStr, fromTz, toTz, x, y) {
    const result = convertTime(timeStr, fromTz.iana, toTz.iana);
    if (!result) {
      while (overlay.firstChild) overlay.removeChild(overlay.firstChild);
      const errBody = document.createElement('div'); errBody.className = 'ts-body';
      const errMsg  = document.createElement('div'); errMsg.className = 'ts-error';
      errMsg.textContent = 'Could not parse time. Please try the popup.';
      errBody.appendChild(errMsg); overlay.appendChild(errBody);
      positionOverlay(overlay, x, y);
      return;
    }

    const fromAmPm = formatDisplayTime(timeStr);
    const dayClass = result.dayShift === 0 ? 'ts-same' : result.dayShift > 0 ? 'ts-next' : 'ts-prev';

    // Safe DOM build for result overlay
    while (overlay.firstChild) overlay.removeChild(overlay.firstChild);

    const hdr2 = document.createElement('div'); hdr2.className = 'ts-header';
    const logo2 = document.createElement('span'); logo2.className = 'ts-logo'; logo2.textContent = '⏱ TimeShift';
    const close2 = document.createElement('button'); close2.className = 'ts-close'; close2.title = 'Close'; close2.textContent = '✕';
    hdr2.appendChild(logo2); hdr2.appendChild(close2);

    const body2 = document.createElement('div'); body2.className = 'ts-body';

    const row = document.createElement('div'); row.className = 'ts-result-row';

    const fromBlock = document.createElement('div'); fromBlock.className = 'ts-from-block';
    const fromTime  = document.createElement('div'); fromTime.className = 'ts-time-big';    fromTime.textContent = fromAmPm;
    const fromAbbr  = document.createElement('div'); fromAbbr.className = 'ts-tz-label';   fromAbbr.textContent = fromTz.abbr;
    const fromCity  = document.createElement('div'); fromCity.className = 'ts-tz-city';    fromCity.textContent = fromTz.label;
    [fromTime, fromAbbr, fromCity].forEach(el => fromBlock.appendChild(el));

    const arrow = document.createElement('div'); arrow.className = 'ts-arrow'; arrow.textContent = '→';

    const toBlock = document.createElement('div'); toBlock.className = 'ts-to-block';
    const toTime  = document.createElement('div'); toTime.className = 'ts-time-big ts-highlight'; toTime.textContent = result.resultTime;
    const toAbbr  = document.createElement('div'); toAbbr.className = 'ts-tz-label';             toAbbr.textContent = toTz.abbr;
    const toCity  = document.createElement('div'); toCity.className = 'ts-tz-city';              toCity.textContent = toTz.label;
    [toTime, toAbbr, toCity].forEach(el => toBlock.appendChild(el));

    [fromBlock, arrow, toBlock].forEach(el => row.appendChild(el));

    const badge = document.createElement('div'); badge.className = 'ts-day-badge ' + dayClass; badge.textContent = result.dayLabel;
    const copyBtn = document.createElement('button'); copyBtn.className = 'ts-btn ts-copy-btn'; copyBtn.id = 'ts-copy-result'; copyBtn.textContent = 'Copy Result';

    [row, badge, copyBtn].forEach(el => body2.appendChild(el));
    overlay.appendChild(hdr2); overlay.appendChild(body2);
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
  tsApi.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "showConvertOverlay") {
      // Position near center of viewport since we don't have mouse coords from context menu
      const x = window.innerWidth / 2 - 160;
      const y = window.innerHeight / 2 - 150;
      showOverlay(message.selectedText, x, y);
    }
  });

})();
