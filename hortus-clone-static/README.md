# Hortus Clone (Static)

This is a **static HTML/CSS/JS** site (no Node/npm required) that mirrors the core UI/flow of https://hortus.netlify.app/:

- Services section
- Instant quote builder (multi-step)
- Quote summary + itemization
- Quote contract generation
- Email contract (via `mailto:`)
- Download contract (as `.txt`)
- Digital signature capture (canvas)
- Accept contract (saved to browser `localStorage`)

## Run locally

From the repo root:

```bash
python3 -m http.server 8000
```

Then open:

- http://localhost:8000/hortus-clone-static/

## Files

- `index.html` – page structure
- `styles.css` – styling
- `app.js` – quote logic + contract/signature flow

## Notes

- The “Email Quote Contract” button uses `mailto:` (opens the user’s email client). A real transactional email send would require a backend/API.
- Update pricing rules and contract terms inside `app.js` (`SERVICES` and `buildContract`).
