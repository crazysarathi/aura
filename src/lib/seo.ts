import { site } from "@/data/site";
import { image as resolveImage } from "@/lib/images";

export interface SeoProps {
  title: string;
  description: string;
  /** Route path with trailing slash, e.g. "/blog/". Used for canonical + og:url via pageUrl(). */
  path: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
  /** JSON-LD objects. */
  jsonLd?: Record<string, unknown>[];
  article?: { published: string; modified: string; author: string };
  /** Image manifest key of the above-the-fold (LCP) image to preload. */
  preloadImage?: { key: string; sizes: string };
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/**
 * Public URL of a route. Routing is hash-based, so every page except home lives under
 * "/#": pageUrl("/blog/") → "https://aura.sks.clinic/#/blog/".
 */
export const pageUrl = (path: string) => (path === "/" ? `${site.url}/` : `${site.url}/#${path}`);

export function buildHeadTags(p: SeoProps): string[] {
  const url = pageUrl(p.path);
  const image = p.image ? (p.image.startsWith("http") ? p.image : `${site.url}${p.image}`) : `${site.url}/assets/brand/og-default.jpg`;
  const tags = [
    `<title data-seo>${esc(p.title)}</title>`,
    `<meta data-seo name="description" content="${esc(p.description)}">`,
    `<link data-seo rel="canonical" href="${esc(url)}">`,
    `<meta data-seo property="og:type" content="${p.type ?? "website"}">`,
    `<meta data-seo property="og:site_name" content="${esc(site.name)}">`,
    `<meta data-seo property="og:title" content="${esc(p.title)}">`,
    `<meta data-seo property="og:description" content="${esc(p.description)}">`,
    `<meta data-seo property="og:url" content="${esc(url)}">`,
    `<meta data-seo property="og:image" content="${esc(image)}">`,
    `<meta data-seo property="og:locale" content="en_IN">`,
    `<meta data-seo name="twitter:card" content="summary_large_image">`,
    `<meta data-seo name="twitter:title" content="${esc(p.title)}">`,
    `<meta data-seo name="twitter:description" content="${esc(p.description)}">`,
    `<meta data-seo name="twitter:image" content="${esc(image)}">`,
  ];
  if (p.preloadImage) {
    const img = resolveImage(p.preloadImage.key);
    tags.push(`<link data-seo rel="preload" as="image" href="${img.src}" imagesrcset="${esc(img.srcSet)}" imagesizes="${esc(p.preloadImage.sizes)}" fetchpriority="high">`);
  }
  if (p.noindex) tags.push(`<meta data-seo name="robots" content="noindex, follow">`);
  if (p.article) {
    tags.push(`<meta data-seo property="article:published_time" content="${p.article.published}">`);
    tags.push(`<meta data-seo property="article:modified_time" content="${p.article.modified}">`);
  }
  for (const ld of p.jsonLd ?? []) {
    tags.push(`<script data-seo type="application/ld+json">${JSON.stringify(ld).replace(/</g, "\\u003c")}</script>`);
  }
  return tags;
}

/* ---------- JSON-LD helpers (facts only from src/data/site.ts) ---------- */

export const organizationLd = () => ({
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  "@id": `${site.url}/#clinic`,
  name: site.legalName,
  alternateName: site.name,
  url: site.url,
  logo: `${site.url}/assets/brand/aura-logo.png`,
  image: `${site.url}/assets/brand/og-default.jpg`,
  description: site.description,
  parentOrganization: { "@type": "Hospital", name: site.parent },
  telephone: site.phones[0].tel,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  geo: { "@type": "GeoCoordinates", latitude: site.map.geo.lat, longitude: site.map.geo.lng },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:00", closes: "20:00" },
  ],
  sameAs: site.social.map((s) => s.href),
  medicalSpecialty: ["Dermatology", "PlasticSurgery", "Gynecologic", "Dentistry"],
});

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: pageUrl(it.path) })),
});
