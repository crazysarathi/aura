# Migration inventory — aura.sks.clinic → React

Audit date: 13 October 2026. Source: https://aura.sks.clinic/ (WordPress 6.x, DermaClear theme by Qode, Elementor, WPForms, All in One SEO, WooCommerce installed but unused, QuadLayers WhatsApp Chat).

How the audit was done:

- `robots.txt`, AIOSEO sitemap index and every sub-sitemap were fetched.
- The public WordPress REST API (`/wp-json/wp/v2/pages`, `/posts`, `/media`, `/categories`, `/users`, `/types`) was read. Menus, Elementor templates and WooCommerce products are not publicly readable (401) or empty.
- Every URL in the sitemaps was downloaded as rendered HTML and its text, headings, images, links, forms and meta tags were extracted.
- Original media files were downloaded from `wp-content/uploads` (see `content-and-assets.md`).

## Discovered URLs

| Old URL | Type | Title (old `<title>`) | New route | Status |
|---|---|---|---|---|
| `/` | Page (Elementor, Revolution Slider) | Best Doctor for Skincare problems in Salem… | `/` | Migrated |
| `/#about` | Anchor on home ("About Us" menu item) | — | `/about/` + `/#about` | Migrated (dedicated page added) |
| `/#our-team` | Anchor on home ("Our Team") | — | `/doctors/` + `/#our-team` | Migrated (dedicated page added) |
| `/#our-blog` | Anchor on home ("Our Blog") | — | `/blog/` | Migrated |
| `/cosmetic-dermatology/` (+ `#skin`, `#skin-01`, `#skin-02`, `#skin-03`, `#hair`, `#nail`) | Service page | Women Skincare Clinic in Salem… | `/cosmetic-dermatology/` (+ `#skin`, `#hair`, `#nail`, per-treatment ids) | Migrated |
| `/hair-transplantation/` | Service page | Hair Transplantation | `/hair-transplantation/` | Migrated |
| `/cosmetic-gynecology/` (+ `#cosmetic`) | Service page | Best Cosmetic Gynaecology surgeons in Salem… | `/cosmetic-gynecology/` | Migrated |
| `/cosmetic-dentistry/` (+ `#dentistry`) | Service page | Best Dental Doctors in Salem… | `/cosmetic-dentistry/` | Migrated |
| `/aesthetic-surgery/` (+ `#face`, `#breast`, `#body`, `#men`) | Service page | Plastic Surgery Doctors in Salem… | `/aesthetic-surgery/` (+ same anchors) | Migrated |
| `/consult/` | Services overview + testimonials + map + booking form | Consult | `/consult/` | Migrated |
| `/contact-us/` (menu links to `/Contact`, which 301s) | Contact page | Best Doctors for Skincare in Salem… | `/contact-us/` | Migrated |
| `/feedback/` | Patient feedback form (WPForms id 5505) | Feedback | `/feedback/` | Migrated |
| `/privacy-policy/` | Legal page | Privacy Policy | `/privacy-policy/` | Migrated |
| `/blog/` | Blog index — **broken on old site** ("No posts were found") | Blog | `/blog/` | Migrated and fixed (lists the 6 posts) |
| `/category/general/` | Category archive (6 posts) | General | `/blog/` (redirect) | Merged into blog index |
| `/author/aura/`, `/2024/03/`, `/2024/02/` | Author / date archives | — | `/blog/` (redirect) | Merged |
| `/everything-you-need-to-know-about-skin-lightening-treatment/` | Post, 28 Mar 2024 | | `/blog/everything-you-need-to-know-about-skin-lightening-treatment/` | Migrated (old URL redirected) |
| `/say-goodbye-to-fine-lines-on-the-face-and-under-the-eyes-a-guide-to-radiant-skin/` | Post, 20 Mar 2024 | | `/blog/say-goodbye-to-fine-lines-on-the-face-and-under-the-eyes-a-guide-to-radiant-skin/` | Migrated |
| `/navigating-beauty-a-comprehensive-guide-step-guide-to-laser-hair-reduction/` | Post, 26 Feb 2024 (title is about PRP; slug is a leftover) | | `/blog/navigating-beauty-a-comprehensive-guide-step-guide-to-laser-hair-reduction/` | Migrated, slug preserved |
| `/a-step-by-step-guide-to-laser-hair-reduction/` | Post, 5 Oct 2023 | | `/blog/a-step-by-step-guide-to-laser-hair-reduction/` | Migrated |
| `/the-ultimate-skin-clinic-experience-at-aura-cosmetique/` | Post, 1 Oct 2023 | | `/blog/the-ultimate-skin-clinic-experience-at-aura-cosmetique/` | Migrated |
| `/5-skin-treatments-to-rejuvenate-your-skin/` | Post, 1 Oct 2023 | | `/blog/5-skin-treatments-to-rejuvenate-your-skin/` | Migrated |
| `/shop/`, `/cart/`, `/checkout/`, `/my-account/` | WooCommerce defaults, no products (`/wp-json/wc/store/v1/products` → `[]`) | | — | **Not migrated** (empty store, not linked from navigation) |
| `/elementor-hf/footer/` | Elementor header/footer template | | — | Not a public page; its content is the site footer (migrated as the Footer component) |
| `/team-category/main/`, `/testimonials-category/main/`, `/clients-category/home-2/` | Theme taxonomy archives, render empty | | — | Not migrated (no content) |

Totals: 14 WordPress pages discovered (9 content pages migrated, 4 WooCommerce pages skipped, 1 is the home page), 6 blog posts migrated, 3 anchor "pages" promoted to real routes.

## Navigation structure (old header menu)

Home · About Us (`/#about`) · Our Services (mega menu, see below) · Our Team (`/#our-team`) · Our Blog (`/#our-blog`) · Contact Us · "Book Now" button → `/contact-us/`.

Mega menu columns, verbatim from the old site:

- **Cosmetic Dermatology → Skin**: Chemical Peeling; Botox & Fillers; Anti-Ageing Treatment; Tattoo Removal; Skin Tag / Mole Removal; Acne Treatment And Acne Scar Removal; Skin Rejuvenation; Laser Hair Reduction; Lasertoning/Picotoning; Medifacial; Hydrafacial; Diamond Glow Facial; Microdermabrasion; Comedone Extraction; Plexr – Laser Pen; Skin Boosters; Thread Lifting; Fat Grafting; Microneedling / Dermaroller / MNRF / Derma Pen; Vitiligo Surgery; Intralesional Injection; Mesotherapy; Pre Wedding Skin Preparatory Treatments; IV Antioxidants; Microblading; Torn Ear Lobe Repair; Face Sculpting; Bodysculpting; Cryolipolysis / Coolsculpting; Injection Lipolysis
- **Cosmetic Dermatology → Hair**: PRP / GFC; Scalp biopsy; Hair Transplant; Hair Fall Solution
- **Cosmetic Dermatology → Nail**: Nail Avulsion
- **Cosmetic Gynecology**: Mommy Makeover; Labiaplasty; Vaginoplasty; Hymenoplasty; Vaginal Rejuvenation; Genito Urinary Symptoms; Treatment Of Female Reproductive Organs; Vulval Whitening; Uterine Prolapse; Urinary Incontinence
- **Cosmetic Dentistry**: Laser Bleaching & Teeth Whitening; Dental Implants / Cortico Basal Implants – Immediate Loading; Cosmetic Smile Design; Invisalign/Aligners; Veneers/Laminates; CAD-CAM Zirconia Crowns; Cosmetic Maxillofacial Surgery/Prosthesis; Pterygoid / Zygoma Implants
- **Aesthetic Surgery → Face / Breast / Body / Men** (see `src/data/services.ts`)

Footer: About Aura blurb · Important Links (Our Services, Our Team, Our Blog, Contact Us, Privacy Policy) · Contact (address, email, phones) · Opening hours · Facebook / Twitter / Instagram · "Aura Cosmetique © 2023 || Designed by The Art Brew".

## Verified clinic facts (used verbatim)

- Name: Aura Cosmetique (by SKS Hospital), Salem.
- Address: Ground Floor, Sri Varanya Towers, Brindavan Rd, Salem, Tamil Nadu – 636004.
- Phone: +91 93847 48884 and 0427 4033577. WhatsApp: 91 93847 48884 (from the WhatsApp Chat widget config in the page HTML).
- Email: aura@sksh.ac.in.
- Hours: Weekdays 09:00–20:00, Saturday 09:00–20:00, Sunday closed.
- Social: facebook.com/auracosmetique, twitter.com/auracosmetique, instagram.com/auracosmetiquebysks.
- Google Maps place: "Aura Cosmetique by SKS" (embed URL copied from the contact page).
- Claim shown on the home page: "South India's first NABH accredited center for cosmetic care" with a NABH "Patient Safety & Quality of Care" badge (image uploaded June 2026). Reproduced as stated on the source site; not independently verified.
- The home page's before/after image-compare widget (acne vs. clear skin, stock imagery) was rebuilt as an accessible slider component.
- Testimonials (from `/consult/`): Veera Mani and Santhosh R — two short quotes, reproduced verbatim. Source attribution beyond the names is not given on the old site.
- Team (home page "Our Team"): Dr. Priyadharshini K (MBBS, MD Dermatology — Consultant Dermatologist and Cosmetologist); Dr. Harish Prasanna (MBBS, MD, DVL — Consultant Dermatologist, Cosmetologist & Dermatosurgeon); Dr. Kavitha (MD, MRCOG, MICG — Consultant Cosmetic Gynecologist); Dr. Senthil Kumaran M (MS, M.Ch Plastic Surgery — Consultant Plastic Reconstructive & Cosmetic Surgery); Dr. Nagappan AR (MDS, IFFID — Consultant Maxillofacial Surgeon & Implantologist).
- The old feedback form's doctor dropdown lists: Dr. K. Priyadharshini, Dr. M. Preethi, Dr. Kavitha Nagarajan, Dr. M. Senthil Kumaran, Dr. Nagappan A R. (It omits Dr. Harish Prasanna and includes Dr. M. Preethi, who is not on the home-page team.) The new form keeps this list unchanged; the clinic should confirm it.

## Forms on the old site

| Form | Where | Fields | Backend |
|---|---|---|---|
| "Book a consultation" (WPForms id 5545) | Every page, above footer | Name*, Email*, Phone* | WPForms AJAX submit to `wp-admin/admin-ajax.php` with a per-form anti-spam token; no public API |
| Patient feedback (WPForms id 5505) | `/feedback/` | Full Name*, Phone*, Gender*, Doctor*, Type of appointment (checkboxes), waiting time, acceptable? (Y/N), 0–10 ratings ×8, Y/N/NA questions, suggestions textarea | Same |
| Contact page | `/contact-us/` | Only the shared booking form + map + an inert calendar widget | — |

See `deployment.md` for the backend integration that the new site needs.

## Content issues found on the old site

- `/blog/` renders "No posts were found" (theme query bug). Posts are reachable only through `/category/general/` and the home page.
- Post excerpts and the blog page meta description are theme lorem ipsum ("Proin gravida nibh vel velit…"). Not migrated; excerpts are derived from each article's first paragraph.
- Three accordions on `/cosmetic-dermatology/` ("Skin Rejuvenation", "Anti-Ageing Treatment", "Pre-Wedding Skin Preparatory Treatments") contain the placeholder text "Accordion Content". They are listed as offered treatments without a description.
- Some mega-menu items have no matching description on their service page ("Hair Fall Solution", "Genito Urinary Symptoms", "Treatment Of Female Reproductive Organs", "Veneers/Laminates" — the Invisalign accordion actually describes veneers). Listed without invented descriptions.
- The "Hydrafacial" treatment heading copies: kept. "Hymeoplasty" in the menu is spelled "Hymenoplasty" on the page; the page spelling is used.
- Blog `<h2>`-style headings inside posts are plain `<strong>` paragraphs on the old site; converted to real headings.
- The header's "Contact Us" links to `/Contact` (capital C) which redirects; fixed to `/contact-us/`.
- Footer says "© 2023"; the new footer uses the current year.
