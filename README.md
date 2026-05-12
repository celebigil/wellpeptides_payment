# well_payment

React (Vite) SPA bundle for the `payment.wellpeptides.com` micro-CMS.

## Role in the system

This repo only ships the JS + CSS bundle. The HTML wrapper (`<head>`,
OG meta tags, page data) is rendered server-side by the FastAPI backend
in [../new_well_be/](../new_well_be/) so social previews work without
JavaScript.

```
Instagram crawler / browser
        │
        ▼
payment.wellpeptides.com  ──▶  Cloud Run (new_well_be)
                                 │  ← renders Jinja shell with meta tags
                                 │     and injects window.__PAGE_DATA__
                                 ▼
                          Browser executes JS bundle hosted on
                          Cloudflare Pages (this repo's `dist/`).
                          React reads __PAGE_DATA__ and renders blocks.
```

Content is edited in the BO under **Commerce → External Payments**
(see [../new_bo/blueprints/external_payments.py](../new_bo/blueprints/external_payments.py)),
written directly to the shared `external_payment_pages` table.

## Local development

```bash
npm install
npm run dev      # http://localhost:5174 — uses the stub in index.html
```

The stub data in [index.html](index.html) lets you iterate on block
renderers without running the backend. In production that `<script>`
block is replaced with one rendered server-side by Jinja.

To test the full integration locally:

1. Run the backend: `cd ../new_well_be && uvicorn app.main:app --reload`
2. Set `EXTERNAL_PAYMENT_SPA_BASE=http://localhost:5174` in the BE env.
3. Curl with the payment host:
   `curl -H "Host: payment.wellpeptides.com" http://localhost:8000/`

## Production build

```bash
npm run build
```

Outputs to `dist/`. Asset filenames are deterministic — the BE shell
hardcodes them:

- `dist/assets/index.js`
- `dist/assets/index.css`

This means CF Pages cache invalidation matters: deploy of a new bundle
should clear the cache (CF Pages handles this on deploy). If you ever
need cache-busting via filename hashes, update the BE shell template to
read a manifest.

## Cloudflare Pages

- Build command: `npm run build`
- Output directory: `dist`
- Environment variables (Production):
    - `VITE_POSTHOG_KEY` — PostHog project key (no leading `phc_…` quote)
    - `VITE_POSTHOG_HOST` — defaults to `https://us.i.posthog.com`

Custom domain is **not** assigned here — the project URL
(`well-payment.pages.dev` or similar) is referenced by the backend via
`EXTERNAL_PAYMENT_SPA_BASE`. The user-facing domain
`payment.wellpeptides.com` points to Cloud Run, not Pages.

## Adding a new block type

1. BO: add to `ALLOWED_BLOCK_TYPES` in
   [../new_bo/blueprints/external_payments.py](../new_bo/blueprints/external_payments.py)
   and add a UI for it in
   [../new_bo/templates/external_payments/form.html](../new_bo/templates/external_payments/form.html).
2. BE: extend the discriminated union in
   [../new_well_be/app/schemas/external_payment.py](../new_well_be/app/schemas/external_payment.py).
3. FE (this repo): add `src/blocks/MyBlock.jsx` and wire it into
   [src/App.jsx](src/App.jsx) `RENDERERS`.
4. Add CSS for it in [src/styles.css](src/styles.css).

## Analytics events

| Event | When | Properties |
|---|---|---|
| `ep_page_view` | Page loads | `page_id`, `slug`, `is_default` |
| `ep_cta_click` | CTA tapped | `cta_label`, `cta_href`, `slug`, `page_id` |

Sent only when `VITE_POSTHOG_KEY` is set.
