// background.js - TimeShift
// Author: Sheikh Abir Ali | sheikhabirali@gmail.com
// https://www.linkedin.com/in/sheikhabirali/
// Service Worker (Manifest V3)

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "timeshift-convert",
    title: "⏱ Convert Time with TimeShift",
    contexts: ["selection"]
  });
  chrome.storage.sync.get(['installed'], (data) => {
    if (!data.installed) {
      chrome.storage.sync.set({ installed: true });
    }
  });
});

// Handle right-click menu click
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId !== "timeshift-convert" || !info.selectionText) return;
  if (!tab || !tab.id) return;

  const selectedText = info.selectionText.trim();

  // Force-inject scripts (handles tabs that were open before install,
  // or where content script silently failed). Scripts are idempotent —
  // content.js has a guard: if (window.__timeshiftLoaded) return;
  // Inject CSS first, then scripts
  chrome.scripting.insertCSS(
    { target: { tabId: tab.id }, files: ["content.css"] },
    () => { if (chrome.runtime.lastError) {} } // ignore if already injected
  );
  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      files: ["timezones.js", "content.js"]
    },
    () => {
      if (chrome.runtime.lastError) {
        // Tab is a chrome:// or restricted page — can't inject
        console.warn("TimeShift: cannot inject into this page:", chrome.runtime.lastError.message);
        return;
      }
      // Small delay to let scripts initialize, then send message
      setTimeout(() => {
        chrome.tabs.sendMessage(tab.id, {
          action: "showConvertOverlay",
          selectedText: selectedText
        }, (response) => {
          if (chrome.runtime.lastError) {
            console.warn("TimeShift: message failed:", chrome.runtime.lastError.message);
          }
        });
      }, 50);
    }
  );
});

// Relay storage requests from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getStorage") {
    chrome.storage.sync.get(['fromTz', 'toTz'], (data) => {
      sendResponse(data);
    });
    return true;
  }
});
