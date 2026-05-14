# Deployment guide — accesswellsociety.com

End-to-end checklist for taking the External Payments stack live.
Estimated total time: ~45 minutes once you have the credentials in hand.

## Prerequisites

- DNS provider with the `accesswellsociety.com` zone managed (instructions below assume Cloudflare; same idea on Route53 / Google Domains)
- Cloud Run domain ownership verification done for `accesswellsociety.com` (apex domains require `gcloud domains verify` + Search Console TXT record before mapping)
- GCP project with Cloud Run service `new-well-be` already deployed
- PostHog account (free tier is fine) — only needed for M5
- `gcloud` CLI authenticated

## 1. Run the BE migration

Apply migration 022 on the production database before deploying any
new BE code. The Cloud Run entrypoint already runs `alembic upgrade
head`, but a manual run is safer for the first cut:

```bash
cd new_well_be
alembic upgrade 022_external_payment_pages
```

Verify in psql:
```sql
\d external_payment_pages
SELECT COUNT(*) FROM external_payment_pages;  -- expect 0
```

## 2. Deploy the BE with the new env vars

Add these to `new_well_be/env_full.yaml` (or set in Cloud Run console):

```yaml
EXTERNAL_PAYMENT_HOST: accesswellsociety.com
EXTERNAL_PAYMENT_SPA_BASE: https://well-payment.pages.dev
```

Replace the SPA base with the actual CF Pages URL after step 4.

Deploy as usual:
```bash
gcloud run deploy new-well-be \
    --source new_well_be \
    --region europe-west1 \
    --env-vars-file new_well_be/env_full.yaml
```

## 3. Map accesswellsociety.com to Cloud Run

Cloud Run side:
```bash
gcloud beta run domain-mappings create \
    --service new-well-be \
    --domain accesswellsociety.com \
    --region europe-west1
```

Apex domains can't take a plain CNAME, so Cloud Run returns A + AAAA
records (typically `216.239.32.21` etc. and IPv6 equivalents) instead of
`ghs.googlehosted.com`. Note them all.

Cloudflare side (or whichever DNS provider holds the zone):
1. DNS → add each A and AAAA record returned, with **Name `@`** (apex).
    - Proxy: **DNS only** (grey cloud) for the first hour while certs
      provision. Once Cloud Run shows the cert as `ACTIVE` you can
      enable the orange cloud if you want CF caching/WAF.
2. SSL/TLS mode for the zone must be **Full (strict)** — Cloud Run
   provides a valid cert. Flexible mode would break.

Wait until the cert is `ACTIVE`:
```bash
gcloud beta run domain-mappings describe \
    --domain accesswellsociety.com \
    --region europe-west1
```

Sanity check:
```bash
curl -I https://accesswellsociety.com/
# expect: HTTP/2 404 (no default page configured yet) or 200 if you seeded one
```

## 4. Deploy well_payment to Cloudflare Pages

In the Cloudflare dashboard → Pages → Create application →
Connect to Git → pick the `well_payment` repo.

Build settings:
- Framework preset: **None** (Vite isn't in the dropdown; manual works fine)
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: leave empty
- Node version: `20` (set via `NODE_VERSION` env var if not auto-detected)

Environment variables (Production):
- `VITE_POSTHOG_KEY` — leave blank until step 6 if you want a quieter
  first deploy
- `VITE_POSTHOG_HOST` — `https://us.i.posthog.com`

Deploy. Take the assigned URL (e.g. `well-payment.pages.dev`) and
update `EXTERNAL_PAYMENT_SPA_BASE` on the BE (step 2) if it differs
from the default.

**Do not** attach `accesswellsociety.com` as a custom domain on the
Pages project — that hostname belongs to Cloud Run.

## 5. Create the first page in BO

1. BO → Commerce → External Payments → **New Page**.
2. Fill in:
    - Internal Title: `Default Landing`
    - Slug: leave empty
    - PayPal URL: real production checkout URL
    - OG Title / Description / Image: matters for Instagram preview
    - Check **Default page** and **Active**
3. Add at least:
    - One `hero` block
    - One `cta` block
4. Save.

## 6. PostHog (M5)

1. Create a free PostHog project.
2. Copy the Project API key (starts with `phc_…`).
3. In CF Pages env: `VITE_POSTHOG_KEY=phc_...` → trigger a redeploy.
4. Browse to `accesswellsociety.com` once; verify the
   `ep_page_view` event appears in PostHog within ~30 seconds.
5. Define dashboards as needed (or skip — events are stored anyway).

## 7. End-to-end verification

Run through this list with each new page that's important:

- [ ] `curl -I https://accesswellsociety.com/` returns 200
- [ ] Open in browser: hero + CTA visible, CTA goes to PayPal
- [ ] Open in iPhone Safari (or DevTools mobile emulation): layout sane
- [ ] Facebook Sharing Debugger: <https://developers.facebook.com/tools/debug/>
    - Paste the URL, click Debug, then Scrape Again
    - Confirm `og:title`, `og:description`, `og:image` all populated
- [ ] LinkedIn Post Inspector (optional, similar tool)
- [ ] PostHog Live Events shows `ep_page_view` from your test visit
- [ ] BO list view: page shows as Active + Default, "View" button works

## Rollback

If anything breaks live:

- Bad page content: BO → edit the page → uncheck **Active** → save.
- Bad bundle: roll back the CF Pages deploy to the previous build.
- BE issue: `gcloud run services update-traffic new-well-be --to-revisions=PREVIOUS=100`.
- Worst case: remove the apex A/AAAA records for `accesswellsociety.com`
  — Instagram links 404 until restored, but no other surface is affected.
