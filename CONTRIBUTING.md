# Contributing to TimeShift

Thank you for considering contributing! Every improvement, no matter how small, helps thousands of users who deal with timezones daily.

---

## Ways to Contribute

- 🐛 **Report a bug** — [Open an issue](https://github.com/sheikhabirali/timeshift/issues/new?template=bug_report.md)
- 💡 **Request a feature** — [Open a feature request](https://github.com/sheikhabirali/timeshift/issues/new?template=feature_request.md)
- 🌍 **Add a missing city/timezone** — Edit `timezones.js`
- 🔧 **Fix a bug** — Fork, fix, PR
- 📝 **Improve docs** — Fix typos, add examples, improve clarity

---

## Development Setup

### Prerequisites
- Chrome or Firefox browser
- A code editor (VS Code recommended)
- Git

### Chrome
```bash
git clone https://github.com/sheikhabirali/timeshift.git
cd timeshift

# In Chrome: chrome://extensions/ → Enable Developer Mode → Load Unpacked → select /chrome
```

### Firefox
```bash
# In Firefox: about:debugging → Load Temporary Add-on → select /firefox/manifest.json
```

---

## Pull Request Guidelines

1. **Fork** the repository
2. **Create a branch**: `git checkout -b fix/your-bug` or `feat/your-feature`
3. **Commit clearly**: Use [Conventional Commits](https://www.conventionalcommits.org/)
   - `fix: correct day shift calculation for negative offsets`
   - `feat: add DST boundary warning`
   - `docs: update README with new screenshots`
4. **Test in both browsers** (Chrome and Firefox) before submitting
5. **Open a PR** with a clear description of what changed and why

---

## Adding a Timezone

Timezones live in `chrome/timezones.js` (and `firefox/timezones.js` — keep both in sync).

Each entry follows this format:

```js
{ label: "City, Country", iana: "Continent/City", abbr: "TZ", offset: +6 },
```

- `label` — Human readable city name shown in the UI
- `iana` — Valid IANA timezone string (check [tz database](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones))
- `abbr` — Short timezone abbreviation (max 5 chars)
- `offset` — UTC offset in hours (e.g. `+6`, `-5`, `+5.5`)

---

## Code Style

- Plain vanilla JavaScript — no build tools, no bundlers, no frameworks
- `'use strict'` at the top of every JS file
- Descriptive variable names
- Comments for non-obvious logic
- No external dependencies

---

## Questions?

Open an issue or reach out via [LinkedIn](https://www.linkedin.com/in/sheikhabirali/).
