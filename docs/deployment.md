# Deployment

## Build output

`npm run build` runs `tsc -b` and `vite build`. `dist/` is a fully static single-page app: one `index.html`, hashed JS/CSS chunks (one per page, loaded on demand), WebP images under `/assets/`, `robots.txt`, `sitemap.xml`, `site.webmanifest` and favicons.

### Routing and SEO

The site uses React Router's `HashRouter`, so every page lives under `/#/` (for example `https://aura.sks.clinic/#/cosmetic-dermatology/`). Consequences:

- **Hosting is trivial.** The server only ever needs to return `index.html`; no per-route files or rewrite rules are required for the app itself.
- **Old links keep working.** `src/main.tsx` rewrites any path-style URL to its hash form before rendering (`/cosmetic-dermatology/#skin` → `/#/cosmetic-dermatology/#skin`), and `LegacyRedirect` maps retired WordPress URLs (top-level blog slugs, `/category/general/`, `/Contact`). For this to work the host must serve `index.html` for unknown paths (SPA fallback).
- **Search engines index only the home URL.** Google and Bing drop the `#…` part, so the service, doctor and blog pages are not indexed as separate pages, and old WordPress rankings for those URLs will consolidate onto the home page. Crawlers and link previews that don't run JavaScript (WhatsApp, Facebook) see only the home-page defaults in `index.html`.
- `sitemap.xml` therefore lists only the root URL. Canonical and `og:url` tags point at the hash URLs for sharing.

If per-page search visibility becomes important, the upgrade path is: switch `HashRouter` to `BrowserRouter` in `src/main.tsx`, render every route to static HTML at build time (React's `react-dom/static` `prerender()` with `StaticRouter`), and configure the 301 redirects listed in `route-mapping.md`. Page components and the data layer need no changes.

## Hosting

Any static host works:

1. Serve `dist/`, falling back to `index.html` for any path (needed so path-style legacy URLs reach `main.tsx`).
2. Long-cache `/assets/**`.
3. Optional: the 301s in `public/_redirects` (Netlify) and `vercel.json` (Vercel) send retired blog URLs straight to their new path; `main.tsx` then converts them to hash URLs. Without them, the client-side `LegacyRedirect` handles the same mapping.

Nginx example:

```nginx
server {
  server_name aura.sks.clinic;
  root /var/www/aura/dist;
  location /assets/ { add_header Cache-Control "public, max-age=31536000, immutable"; }
  location / { try_files $uri /index.html; }
}
```

## Environment variables

| Variable | Purpose |
|---|---|
| `VITE_SITE_URL` | Public origin, used for canonical URLs, OG tags, JSON-LD and the sitemap. Defaults to `https://aura.sks.clinic`. |
| `VITE_FORMS_ENDPOINT` | HTTPS endpoint that receives form submissions (below). When unset, forms display an honest "online submission not enabled" message with call/WhatsApp buttons. |

Copy `.env.example` to `.env` and fill in values before building.

## Forms backend (required for online booking and feedback)

The WordPress site used WPForms, which only accepts submissions from its own pages (nonce-protected `admin-ajax.php`). There is no public API to reuse, and WordPress will be retired, so the React site posts to **your** endpoint:

```
POST $VITE_FORMS_ENDPOINT
Content-Type: application/json

{ "form": "consultation" | "feedback", "submittedAt": ISO-8601, "page": "/consult/", ...fields }
```

- Consultation fields: `name`, `email`, `phone`, `service?`, `message?`.
- Feedback fields: `fullName`, `phone`, `gender`, `doctor`, `appointmentType[]`, `waitingTime`, `waitingAcceptable`, `cleanlinessClinic?`, `cleanlinessRestroom?`, `facilities?`, `staffFriendliness`, `staffHelpfulness`, `staffSatisfactory`, `providerCommunication`, `concernsAddressed`, `treatmentExplained`, `treatmentComfortable`, `schedulingEase`, `schedulingTimely`, `overallSatisfaction`, `recommend`, `suggestions?`.
- Respond `2xx` on success; any other status (optionally with `{ "message": "..." }`) is shown to the user as a failure. CORS must allow the site origin.
- A honeypot field (`website`) is dropped client-side; add server-side rate limiting and spam checks as well.

Suitable implementations: a serverless function (Netlify/Vercel/Cloudflare) that emails `aura@sksh.ac.in` and/or writes to a sheet or CRM; or an SKS Hospital API. Forms collect only contact details and satisfaction ratings — no medical records — and nothing is stored in the browser. If medical information or uploads are ever added, they must go through an authenticated, access-controlled backend.

## Pre-launch checklist

- [ ] Set `VITE_SITE_URL` and `VITE_FORMS_ENDPOINT`, run `npm run build`, test a submission end-to-end.
- [ ] Confirm the host serves `index.html` for unknown paths: `https://aura.sks.clinic/cosmetic-dermatology/` should end up at `/#/cosmetic-dermatology/`.
- [ ] Submit `https://aura.sks.clinic/sitemap.xml` in Google Search Console (root URL only; see Routing and SEO above).
- [ ] Update the Google Business Profile website link if it pointed at a deep URL.
- [ ] Confirm with the clinic: the feedback form's doctor list (includes Dr. M. Preethi, who is not on the team page), the NABH statement, opening hours.
- [ ] Optional: self-host Google Fonts; add analytics (the old site used Site Kit / Jetpack).
