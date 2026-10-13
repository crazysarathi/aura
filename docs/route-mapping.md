# Route mapping and redirects

Routing is hash-based: every route below is served as `https://aura.sks.clinic/#<route>` (for example `/#/cosmetic-dermatology/`). Routes keep the WordPress trailing-slash form. Any path-style URL, including every old WordPress URL, is rewritten in the browser to the same route under `/#` by `src/main.tsx`, so old links and bookmarks keep working as long as the host serves `index.html` for unknown paths.

## Preserved URLs (no redirect needed)

| URL | Page |
|---|---|
| `/` | Home |
| `/cosmetic-dermatology/` | Service: Cosmetic Dermatology |
| `/hair-transplantation/` | Service: Hair Transplantation |
| `/cosmetic-gynecology/` | Service: Cosmetic Gynecology |
| `/cosmetic-dentistry/` | Service: Cosmetic Dentistry |
| `/aesthetic-surgery/` | Service: Aesthetic Surgery |
| `/consult/` | Book a consultation (services overview, testimonials, map, form) |
| `/contact-us/` | Contact |
| `/feedback/` | Patient feedback form |
| `/privacy-policy/` | Privacy policy |
| `/blog/` | Blog index (was broken on WordPress; now lists all posts) |

## New routes (did not exist as pages on WordPress)

| URL | Page | Replaces |
|---|---|---|
| `/about/` | About Us | `/#about` anchor (menu item). Home still has `#about`. |
| `/services/` | Services overview | "Our Services" menu item that linked to `/` |
| `/doctors/` | Our Team | `/#our-team` anchor. Home still has `#our-team`. |
| `/doctors/<slug>/` | Doctor profile ×5 | — |
| `/blog/<slug>/` | Blog article ×6 | top-level post URLs (see below) |

## Changed URLs (handled client-side by `LegacyRedirect`; optional host 301s)

| Old WordPress URL | New URL |
|---|---|
| `/everything-you-need-to-know-about-skin-lightening-treatment/` | `/blog/everything-you-need-to-know-about-skin-lightening-treatment/` |
| `/say-goodbye-to-fine-lines-on-the-face-and-under-the-eyes-a-guide-to-radiant-skin/` | `/blog/say-goodbye-to-fine-lines-on-the-face-and-under-the-eyes-a-guide-to-radiant-skin/` |
| `/navigating-beauty-a-comprehensive-guide-step-guide-to-laser-hair-reduction/` | `/blog/navigating-beauty-a-comprehensive-guide-step-guide-to-laser-hair-reduction/` |
| `/a-step-by-step-guide-to-laser-hair-reduction/` | `/blog/a-step-by-step-guide-to-laser-hair-reduction/` |
| `/the-ultimate-skin-clinic-experience-at-aura-cosmetique/` | `/blog/the-ultimate-skin-clinic-experience-at-aura-cosmetique/` |
| `/5-skin-treatments-to-rejuvenate-your-skin/` | `/blog/5-skin-treatments-to-rejuvenate-your-skin/` |
| `/category/general/` | `/blog/` |
| `/author/aura/`, `/2024/03/`, `/2024/02/` (date/author archives) | `/blog/` |
| `/Contact` (old header link) | `/contact-us/` |
| `/main-home/` | `/` |
| `/shop/`, `/cart/`, `/checkout/`, `/my-account/` (empty WooCommerce pages) | `/` (or 410 Gone) |
| `/wp-content/uploads/...` images | Not redirected. Local copies live in `/assets/...`; see `content-and-assets.md`. Optionally keep the old uploads folder online for a few months. |

In-page anchors from the old mega-menu are preserved or aliased: `#skin`, `#hair`, `#nail`, `#face`, `#breast`, `#body`, `#men`, `#dentistry`, `#cosmetic` still work; `#skin-01`, `#skin-02`, `#skin-03` map to the first treatment of the old block (`#hydrafacial`, `#vitiligo-surgery`, `#face-sculpting`).

The mapping lives in `src/routes/paths.ts` (`legacyRedirects`). Because search engines ignore the `#` part of a URL, these pages are not indexed individually; see `deployment.md` → Routing and SEO.

## Ready-made redirect configs

- Netlify: `public/_redirects` (copied into `dist/`). 
- Vercel: `vercel.json`.
- Nginx / Apache: see `deployment.md`.
