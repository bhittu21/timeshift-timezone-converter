# Changelog

All notable changes to TimeShift are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versioning follows [Semantic Versioning](https://semver.org/).

---

## [1.0.1] — 2026-02-26

### Added
- Firefox version published on Mozilla Add-ons (AMO)
- `browser` / `chrome` API compatibility shim across all scripts
- `data_collection_permissions` declared in Firefox manifest
- Safe DOM construction replacing all `innerHTML` assignments

### Changed
- Chrome manifest: removed `content_scripts` block — scripts now injected on-demand only via `activeTab` + `scripting.executeScript()`. Eliminates Chrome's "Broad Host Permissions" warning.
- Date display format updated to `DD Mon YYYY — DayName` (e.g. `22 Feb 2026 — Sunday`)

### Fixed
- Right-click overlay not appearing on tabs opened before extension install
- Day shift label showing incorrect day name in edge cases near midnight

---

## [1.0.0] — 2026-02-20

### Added
- Initial release on Chrome Web Store
- Right-click any selected time on any webpage to convert instantly
- Floating overlay panel showing source and destination times
- Date chip showing exact converted date (`DD Mon YYYY — DayName`)
- 285+ cities timezone database with IANA identifiers
- Auto-detection of timezone abbreviations in selected text (EST, BDT, PST, etc.)
- Manual popup converter with timezone search
- AM/PM toggle and 12-hour display
- Copy result to clipboard with one click
- Timezone preference persistence via `chrome.storage.sync`
- Timezone auto-detection using `Intl.DateTimeFormat`
- Swap button to reverse from/to timezones
- Keyboard shortcut: `Escape` to close overlay
- Privacy policy page — zero data collection declaration
