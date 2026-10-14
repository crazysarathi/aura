# Content and assets

## Where content lives

| Content | File | Notes |
|---|---|---|
| Clinic facts (address, phones, WhatsApp, email, hours, socials, map, accreditation line) | `src/data/site.ts` | Every value verified against the old site on 13 Oct 2026 |
| Home/About copy (About Us, Our Services intro, Why Us, hero headlines) | `src/data/site.ts` (`aboutCopy`) | Verbatim |
| Service categories, groups and treatments | `src/data/services.ts` | 5 categories, 11 groups, 76 treatments |
| Doctors | `src/data/doctors.ts` | 5 doctors from the home page team section; feedback-form doctor list kept separately |
| Blog posts | `src/data/blog-posts.ts` | Generated from the WordPress REST API; structured blocks (`p`, `h2`, `h3`, `ul`, `ol`) |
| Testimonials | `src/data/testimonials.ts` | 2 quotes from `/consult/` |
| Navigation | `src/data/navigation.ts` | Mega-menu is generated from the services data |
| Privacy policy | `src/pages/PrivacyPage.tsx` | Verbatim, as JSX |

Types for all of the above are in `src/types/content.ts`.

## Image pipeline

Originals were downloaded from `https://aura.sks.clinic/wp-content/uploads/` into `assets-src/` (git-ignored, 36 files, ~25 MB). `npm run images` runs `scripts/optimize-images.mjs` (sharp) which writes WebP variants and `src/data/image-manifest.json` to `public/assets/`. Components reference images by key (e.g. `doctors/dr-kavitha`) through `src/lib/images.ts`, which supplies `src`, `srcSet`, `width` and `height` so the browser can reserve space (no layout shift).

Output: 116 files, 3.8 MB total (vs. single 2.5 MB originals on the old site). Largest hero variant is 2048 px wide; cards get 480/800/1200 px variants.

| Old upload | New key(s) | Used for |
|---|---|---|
| `2023/10/aura-logo1-02-scaled.jpg` (2560×821 JPEG, white background) | `brand/aura-logo` (320/640/1200w WebP, white keyed to alpha) + `aura-logo.png` + `og-default.jpg` | Header, footer, Open Graph default |
| `2023/10/cropped-Aura-Icon-02.png` | `brand/aura-icon`, `favicon-32.png`, `apple-touch-icon.png`, `icon-192/512.png` | Favicons / manifest |
| `2026/06/nabh-patient-safety-and-quality-of-care-seeklogo.png` | `brand/nabh-patient-safety` | NABH badge |
| `2023/10/0215-scaled.jpg`, `2023/10/rejuvenating-facial-treatment-scaled.jpg` | `hero/hero-skin-wellness`, `hero/hero-facial-treatment` | Home hero (Revolution Slider slides) |
| `2023/10/254869-scaled.jpg`, `2023/11/adult-male-having-balding-problems-scaled.jpg`, `2023/10/young-woman-s-hands-…-scaled.jpg`, `2023/10/3126578-scaled.jpg`, `2023/10/doctors-performing-rhinoplasty-high-angle-scaled.jpg`, `2023/10/smiley-man-getting-prp-injection-…jpg` | `treatments/cosmetic-dermatology`, `hair-transplantation`, `cosmetic-gynecology`, `cosmetic-dentistry`, `aesthetic-surgery`, `hair-prp-consult` | Service cards |
| `2023/10/A1-01.jpg`, `A2-01.jpg`, `A3-01.jpg`, `A5-01.jpg`, `2023/11/natural-young-woman-posing…`, `2021/10/smiley-woman-posing-with-face-cream…`, `2023/10/4-01-2.jpg`, `5-01-2.jpg`, `beautician-woman-clinic-consults-client…`, `1-01-1-1.jpg`, `2-01-2.jpg`, `3-01-2.jpg` | `treatments/dermatology-*`, `hair-restoration`, `hair-prp`, `gynecology-consult`, `dentistry-smile`, `surgery-men/body/breast` | Service page imagery |
| `2024/02/LSS03465-1`, `2024/02/LSS05165-1`, `LSS05195-1`, `LSS05175-1` | `doctors/dr-priyadharshini-k`, `dr-kavitha`, `dr-senthil-kumaran-m`, `dr-nagappan-ar` | Doctor portraits (3:4 crops) |
| `2024/06/Home2-img4-1.jpg`, `Home2-img3-1.jpg` | `clinic/clinic-banner-1`, `clinic-banner-2` | The two halves of the old home page's Elementor image-compare widget; now the before/after slider on the home and about pages, captioned as illustrative imagery |
| Six post featured images | `blog/*` | Blog cards and article headers |

Alt text: the old site's alt attributes were SEO keyword strings ("best skincare doctor near me - Aura Cosmetics"). They were replaced with descriptive alt text; the original strings are recorded in `docs/migration-inventory.md`'s raw audit (`/wp-json/wp/v2/media`).

## Assets not migrated

- `2023/10/A4-01.jpg`, `DHI-02-scaled.jpg`, `head-balding-man-before-after…`, `dentist-with-smile-scaled.jpg`, `Dr.Priyadharshini_Derma.jpg`, `Dr-Nagappan_3.png`, `Dr-Preethi-scaled.jpg`, `LSS03455-1-scaled.jpg` (Dr. Preethi), `Artboard-1-3-scaled.jpg`, and ~30 2021 theme-demo PNGs (`Main-iwt-img-*.png`, `ld-revimg*.png`, `ip-png*.png`, `Main-rev-logo.png`, `Home-3-custom-logo-img.png`, `Derma-Favicon.png`, `Pin.png`) — present in the media library but not used on any public page of the old site. Downloadable from the old uploads folder if needed.
- Google Fonts (Marcellus, Work Sans) are loaded from Google Fonts; self-host them if the hosting policy requires it.

## Content fidelity notes

- Descriptions are verbatim except for: obvious typos in all-caps headings normalised to title case; "Hymeoplasty" → "Hymenoplasty" (page spelling); the Invisalign accordion on the old dentistry page described veneers, so that text now sits under "Veneers / Laminates" and "Invisalign / Aligners" is listed without a description; three dermatology accordions that held "Accordion Content" are listed without descriptions.
- Blog excerpts were lorem ipsum on WordPress; the new excerpts are the first sentences of each post.
- The "© 2023" footer year is now dynamic.
