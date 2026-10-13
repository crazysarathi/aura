# Aura Cosmetique — website

React rebuild of https://aura.sks.clinic/ (previously WordPress). A static, content-driven single-page app with hash-based routing (`/#/cosmetic-dermatology/`).

## Stack

React 19 · Vite 8 · TypeScript · Tailwind CSS 4 · Radix UI primitives (shadcn-style components in `src/components/ui`) · React Router 7 (`HashRouter`) · React Hook Form + Zod · Sonner · Lucide icons · Motion for React (menu/tab/hero transitions, counters) · GSAP (hero parallax) · sharp (image pipeline) · ESLint + typescript-eslint.

## Commands

```bash
npm install          # install dependencies
npm run dev          # local dev server (http://localhost:5173)
npm run build        # typecheck → vite build into dist/
npm run preview      # serve dist/ (http://localhost:4173)
npm run lint         # ESLint
npm run typecheck    # tsc -b
npm run images       # regenerate public/assets from assets-src/ originals
```

Copy `.env.example` to `.env` and set `VITE_SITE_URL` and `VITE_FORMS_ENDPOINT` (see `docs/deployment.md`).

## Project structure

```
src/
├── main.tsx                 # Entry: converts path URLs to hash URLs, renders <HashRouter><App /></HashRouter>
├── App.tsx                  # Root component: the complete route tree inside <SiteLayout />
├── routes/
│   ├── lazyPages.ts         # React.lazy page imports (one chunk per page)
│   ├── LegacyRedirect.tsx   # Catch-all: old WordPress URLs → new routes, else 404
│   └── paths.ts             # Legacy WordPress URL → route map
├── pages/                   # One component per page; ServicePage/DoctorPage/BlogPostPage are templates
├── components/
│   ├── layout/              # SiteLayout, Header, MegaMenu, Footer, FloatingActions, ScrollManager
│   ├── home/                # Home-only sections: Hero, TreatmentIndex
│   ├── common/              # Shared building blocks: cards, CardGrid, Section, PageHero, Seo, BeforeAfter…
│   ├── forms/               # ConsultationForm (+ lazy wrapper), FeedbackForm, FormStatus
│   └── ui/                  # shadcn-style primitives on Radix: button, input, accordion, sheet…
├── data/                    # All content: site facts, services, doctors, blog posts, testimonials, nav
├── hooks/                   # useHeroParallax
├── lib/                     # utils, images, seo helpers (pageUrl, JSON-LD), forms transport, validation
├── types/                   # content.ts interfaces
└── styles/globals.css       # Tailwind v4 theme tokens, base styles, utilities (card-grid, prose-aura…)
scripts/                     # optimize-images.mjs (image pipeline)
docs/                        # migration inventory, content & assets, route mapping, deployment
public/                      # static files; public/assets = generated WebP images
```

## Fonts

Marcellus (display) and Work Sans (body) load from Google Fonts without blocking render. To stop text reflowing when they arrive, `globals.css` defines metric-matched fallback faces (`size-adjust`, `ascent-override`, `descent-override`) over Times New Roman / Arial (Windows, macOS, iOS, Linux) and Noto Serif / Roboto (Android). The values were measured in Chrome against the site's own copy; re-measure if the fonts or headline copy change substantially.

## Routing

All routes are hash-based (`HashRouter`): `https://aura.sks.clinic/#/doctors/dr-kavitha/`. In-page anchors follow the route: `/#/cosmetic-dermatology/#hair`. Use `<Link to="…">` or `<Link to={{ hash: "#id" }}>` for internal links; a bare `<a href="#id">` would be read as a route.

Path-style URLs still work. Old WordPress links and bookmarks like `/cosmetic-dermatology/#skin` are rewritten by `main.tsx` to `/#/cosmetic-dermatology/#skin` before the app renders, and `LegacyRedirect` maps retired URLs such as top-level blog slugs. The host only needs to serve `index.html` for every path.

**SEO trade-off.** Search engines ignore everything after `#`, so only the home URL is indexed as its own page, and crawlers that do not run JavaScript see only the defaults in `index.html`. Per-page titles, descriptions and JSON-LD are still set in the browser by `<Seo />`. If search visibility for individual service pages becomes a priority, switch to `BrowserRouter` with build-time prerendering (see `docs/deployment.md`).

## Responsive breakpoints

| Width | Layout |
|---|---|
| < 640 px (phones) | 1-column services, 2-column doctor cards, compact type scale, mobile sheet menu with every treatment, 4:3 before/after crop |
| 640–1023 px (tablets) | 2–3 column cards, larger type, mobile menu |
| 1024–1279 px (small laptops) | Desktop nav + mega menu without image panel, 3-column cards |
| ≥ 1280 px | Full mega menu with image panel, 5-column service and doctor rows |
| ≥ 1536 px | Wider container (88 rem) |

## Editing content

- Add/edit a treatment: `src/data/services.ts` (menus, pages, anchors and sitemap update automatically).
- Add a doctor: `src/data/doctors.ts` + drop the portrait in `assets-src/`, add a job in `scripts/optimize-images.mjs`, run `npm run images`.
- Add a blog post: append to `src/data/blog-posts.ts` using the block format (`p`, `h2`, `h3`, `ul`, `ol`; `**bold**` inline).
