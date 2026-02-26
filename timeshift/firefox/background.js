// background.js - TimeShift (Firefox / Manifest V2)
// Author: Sheikh Abir Ali | sheikhabirali@gmail.com
// https://www.linkedin.com/in/sheikhabirali/
//
// Firefox MV2 uses background scripts (not service workers).
// Uses browser.* APIs with chrome.* fallback for compatibility.
// Injection via browser.tabs.executeScript (no scripting API needed).

const api = typeof browser !== 'undefined' ? browser : chrome;

// ── Register context menu on install ────────────────────────────────────────
api.runtime.onInstalled.addListener(() => {
  api.contextMenus.create({
    id: 'timeshift-convert',
    title: '⏱ Convert Time with TimeShift',
    contexts: ['selection']
  });
  api.storage.sync.get(['installed'], (data) => {
    if (!data.installed) {
      api.storage.sync.set({ installed: true });
    }
  });
});

// ── Handle right-click menu click ───────────────────────────────────────────
api.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId !== 'timeshift-convert' || !info.selectionText) return;
  if (!tab || !tab.id) return;

  const selectedText = info.selectionText.trim();

  // Firefox MV2: inject via tabs.executeScript (no scripting API)
  // CSS first, then scripts in order
  api.tabs.insertCSS(tab.id, { file: 'content.css' })
    .catch(() => {}) // ignore if already injected or restricted page
    .then(() => api.tabs.executeScript(tab.id, { file: 'timezones.js' }))
    .then(() => api.tabs.executeScript(tab.id, { file: 'content.js' }))
    .then(() => {
      // Small delay to let content script initialize
      setTimeout(() => {
        api.tabs.sendMessage(tab.id, {
          action: 'showConvertOverlay',
          selectedText: selectedText
        }).catch((err) => {
          console.warn('TimeShift: message failed:', err);
        });
      }, 50);
    })
    .catch((err) => {
      // Restricted page (about:, moz-extension:, etc.)
      console.warn('TimeShift: cannot inject into this page:', err);
    });
});

// ── Relay storage requests from content script ───────────────────────────────
api.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getStorage') {
    api.storage.sync.get(['fromTz', 'toTz'], (data) => {
      sendResponse(data);
    });
    return true; // keep channel open for async response
  }
});
