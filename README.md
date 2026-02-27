<div align="center">

# ⏱ TimeShift — Instant Timezone Converter

**Convert any time on any webpage in one right-click. No new tab. No searching. Just the answer.**

[![Chrome Web Store](https://img.shields.io/badge/Chrome%20Web%20Store-Install%20Free-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white)](https://chromewebstore.google.com/detail/iaadchpnghncfnjkkehjkifilkccmeig)
[![Firefox Add-ons](https://img.shields.io/badge/Firefox%20Add--ons-Install%20Free-FF7139?style=for-the-badge&logo=firefox&logoColor=white)](https://addons.mozilla.org/en-US/firefox/addon/timeshift-timezone-converter/)
[![License](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)](LICENSE)
[![Version](https://img.shields.io/badge/Version-1.0.1-6366f1?style=for-the-badge)](https://github.com/bhittu21/timeshift-timezone-converter/releases)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-f59e0b?style=for-the-badge)](CONTRIBUTING.md)

<br/>

> Built by **[Sheikh Abir Ali](https://sheikhabirali.netlify.app/)** — Full-Stack Developer & Open Source Builder

<br/>

| 🌐 [Live on Chrome](https://chromewebstore.google.com/detail/iaadchpnghncfnjkkehjkifilkccmeig) | 🦊 [Live on Firefox](https://addons.mozilla.org/en-US/firefox/addon/timeshift-timezone-converter/) | 👤 [Portfolio](https://sheikhabirali.netlify.app/) |
|:---:|:---:|:---:|

</div>

---

## 🤔 The Problem

Every remote worker does this multiple times a day:

```
Sees "10:00 AM EST" in an email
  → Opens a new tab
  → Searches "EST to BDT converter"
  → Types the time manually
  → Gets the answer
  → Closes the tab
```

**That's 6 steps for something that should take 1 second.**

---

## ✅ The Solution

```
Select "10:00 AM EST"  →  Right-click  →  "Convert Time with TimeShift"  →  Done.
```

TimeShift shows the result **instantly, right where you are** — with the exact converted time, timezone, and date. No new tab. No copy-pasting. No friction.

---

## ✨ Features

| Feature | Details |
|---|---|
| ⚡ **One right-click** | Select any time on any webpage → right-click → instant result |
| 🌍 **285+ cities** | Full IANA timezone database covering every major city worldwide |
| 📅 **Exact date shown** | Shows `22 Feb 2026 — Sunday`, not just "next day" |
| 🔒 **100% offline & private** | Zero network calls. Everything runs locally. Nothing ever leaves your device |
| 🖱️ **Works everywhere** | Gmail, Slack, news articles, any webpage in Chrome or Firefox |
| 📋 **Copy in 1 click** | Copy the result directly to clipboard |
| 💾 **Remembers preferences** | Saves your timezone settings between sessions |
| 🔄 **Manual converter** | Popup with full manual conversion interface |
| 🆓 **Free forever** | No account, no subscription, no ads |

---

## 🚀 Install

<div align="center">

### Chrome

[![Install on Chrome](https://img.shields.io/badge/%E2%80%8B-Install%20on%20Chrome-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white&labelColor=1a1a2e)](https://chromewebstore.google.com/detail/iaadchpnghncfnjkkehjkifilkccmeig)

### Firefox

[![Install on Firefox](https://img.shields.io/badge/%E2%80%8B-Install%20on%20Firefox-FF7139?style=for-the-badge&logo=firefoxbrowser&logoColor=white&labelColor=1a1a2e)](https://addons.mozilla.org/en-US/firefox/addon/timeshift-timezone-converter/)

</div>

---

## 🎬 How It Works

### Step 1 — Select any time on any webpage
Highlight a time you see anywhere — an email, a Slack message, a news article, a calendar invite.

### Step 2 — Right-click it
Click **"⏱ Convert Time with TimeShift"** from the context menu.

### Step 3 — See the result instantly
A floating panel appears right where you are showing the full conversion:

```
10:00 AM  →  9:00 PM
EST            BDT
New York       Dhaka

📅 22 Feb 2026 — Sunday
```

No new tab. No searching. You never leave the page.

---

## 🗂️ Repository Structure

```
timeshift-timezone-converter/
│
├── chrome/                     # Chrome extension (Manifest V3)
│   ├── manifest.json           # MV3 manifest with service worker
│   ├── background.js           # Service worker — context menu + injection
│   ├── content.js              # Injected overlay UI
│   ├── content.css             # Overlay styles
│   ├── popup.html              # Extension popup interface
│   ├── popup.js                # Popup logic + manual converter
│   ├── timezones.js            # 285+ city timezone database
│   ├── privacy-policy.html     # Privacy policy
│   └── icons/                  # Extension icons (16, 32, 48, 128px)
│
├── firefox/                    # Firefox extension (Manifest V2)
│   ├── manifest.json           # MV2 manifest with Gecko + Android settings
│   ├── background.js           # Background script — tabs.executeScript
│   ├── content.js              # Content script with browser API compat shim
│   ├── content.css             # Overlay styles
│   ├── popup.html              # Extension popup interface
│   ├── popup.js                # Popup logic with browser API compat shim
│   ├── timezones.js            # 285+ city timezone database
│   ├── privacy-policy.html     # Privacy policy
│   └── icons/                  # Extension icons (16, 32, 48, 128px)
│
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   └── PULL_REQUEST_TEMPLATE.md
│
├── README.md
├── CONTRIBUTING.md
├── CHANGELOG.md
└── LICENSE
```

---

## 🔧 Run Locally / Development

### Chrome

```bash
# 1. Clone the repo
git clone https://github.com/bhittu21/timeshift-timezone-converter.git
cd timeshift-timezone-converter

# 2. Open Chrome and go to
chrome://extensions/

# 3. Enable "Developer mode" (top-right toggle)

# 4. Click "Load unpacked"

# 5. Select the /chrome folder
```

### Firefox

```bash
# 1. Open Firefox and go to
about:debugging#/runtime/this-firefox

# 2. Click "Load Temporary Add-on"

# 3. Navigate to the /firefox folder and select manifest.json

# For permanent install, use the signed version from Firefox Add-ons.
```

---

## ⚙️ Technical Architecture

### Chrome (Manifest V3)
- **Service Worker** (`background.js`) — registers the context menu and handles `chrome.scripting.executeScript()` for on-demand injection
- **Content Script** (`content.js`) — injected only when the user triggers the right-click. Idempotent, guarded by `window.__timeshiftLoaded`
- **Popup** (`popup.html` + `popup.js`) — standalone manual conversion interface with timezone search
- **Storage** — `chrome.storage.sync` for cross-device preference persistence
- **Zero host permissions** — `activeTab` only, no `content_scripts` block

### Firefox (Manifest V2)
- **Minimum version** — Firefox 140.0 desktop, Firefox for Android 142.0
- **Background Script** — uses `browser.tabs.executeScript()` (no Scripting API in MV2)
- **Compat shim in `background.js`** — `const api = typeof browser !== 'undefined' ? browser : chrome`
- **Compat shim in `content.js` and `popup.js`** — `const tsApi = typeof browser !== 'undefined' ? browser : chrome`
- **`data_collection_permissions`** — `{ "required": ["none"] }` inside `gecko` — collects nothing

### Timezone Engine
- Custom `convertTime()` using `Intl.DateTimeFormat` offset calculation — handles DST automatically
- Supports `10:30 AM`, `10:30`, `22:30` and plain `10` input formats
- Auto-detects timezone abbreviations in selected text (e.g. `EST`, `BDT`, `PST`)
- Day shift detection (+1 / 0 / -1) with exact destination date shown

### Privacy Architecture
```
User selects text
      ↓
background.js (local)
      ↓
content.js injected into current tab
      ↓
Intl.DateTimeFormat() [browser built-in]
      ↓
Result shown in DOM overlay
      ↓
[NOTHING sent anywhere. Ever.]
```

---

## 🔒 Privacy

TimeShift is **completely offline**. Every conversion happens locally in your browser using JavaScript's built-in `Intl` API.

- ❌ No servers
- ❌ No API calls
- ❌ No analytics or telemetry
- ❌ No tracking pixels
- ❌ No account required
- ❌ No data stored outside your browser
- ✅ All data stays 100% on your device

---

## 📋 Permissions Explained

### Chrome
| Permission | Why |
|---|---|
| `contextMenus` | To add the right-click menu item |
| `storage` | To remember your timezone preferences |
| `activeTab` | To inject the overlay into the current tab only |
| `scripting` | To execute content.js on demand (MV3 requirement) |

### Firefox
| Permission | Why |
|---|---|
| `contextMenus` | Right-click menu item |
| `storage` | Save timezone preferences |
| `activeTab` | Inject into current tab |
| `tabs` | Required for `tabs.executeScript` in MV2 |
| `<all_urls>` | Required for `tabs.executeScript` in Firefox MV2 |

No permission reads your browsing history, accesses other tabs, or sends any data.

---

## 🗺️ Roadmap

- [ ] DST warning when conversion crosses a DST boundary
- [ ] Multi-timezone display (show 3+ cities at once)
- [ ] World clock popup view
- [ ] Keyboard shortcut trigger
- [ ] Calendar app integration (Google Calendar, Outlook)
- [ ] Time zone group presets (e.g. "My Team")
- [ ] Dark / light theme toggle
- [ ] Safari extension port

Have an idea? [Open a Feature Request →](https://github.com/bhittu21/timeshift-timezone-converter/issues/new?template=feature_request.md)

---

## 🤝 Contributing

Contributions are welcome! Whether it's a bug fix, a new timezone, a UI improvement, or a new feature — please read [CONTRIBUTING.md](CONTRIBUTING.md) first.

```bash
git checkout -b feature/my-improvement
git commit -m "feat: add DST warning on conversion"
git push origin feature/my-improvement
# Then open a Pull Request on GitHub
```

---

## 📦 Changelog

See [CHANGELOG.md](CHANGELOG.md) for the full version history.

**v1.0.1** — Current
- Firefox version published on Mozilla Add-ons
- Firefox for Android supported (`gecko_android` min version 142.0)
- `data_collection_permissions: { "required": ["none"] }` declared in gecko settings
- Browser API compat shim (`api` / `tsApi`) across all scripts
- Removed broad host permissions warning on Chrome
- Fixed date display format (DD Mon YYYY — DayName)

**v1.0.0** — Initial Release
- Right-click conversion on any webpage
- 285+ cities timezone database
- Manual popup converter
- Copy to clipboard

---

## 👨‍💻 Author

<div align="center">

**Sheikh Abir Ali**
*Full-Stack Developer · Open Source Builder*

[![Portfolio](https://img.shields.io/badge/Portfolio-sheikhabirali.netlify.app-4f46e5?style=for-the-badge&logo=netlify&logoColor=white)](https://sheikhabirali.netlify.app/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/sheikhabirali/)

</div>

---

## ⭐ Support the Project

If TimeShift saves you time, consider:

- ⭐ **Starring this repo** — it helps others find it
- 🧩 **Leaving a review** on [Chrome Web Store](https://chromewebstore.google.com/detail/iaadchpnghncfnjkkehjkifilkccmeig) or [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/timeshift-timezone-converter/)
- 🐛 **Reporting bugs** via [GitHub Issues](https://github.com/bhittu21/timeshift-timezone-converter/issues)
- 💡 **Suggesting features** you'd find useful
- 📢 **Sharing it** with your remote team

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">

Made with ☕ and frustration at timezone converters · by [Sheikh Abir Ali](https://sheikhabirali.netlify.app/)

**[⬆ Back to top](#)**

</div>
