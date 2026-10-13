/** Shared content types for the Aura Cosmetique site. All content lives in src/data. */

export interface ImageAsset {
  /** Key in the generated image manifest, e.g. "treatments/cosmetic-dermatology". */
  key: string;
  alt: string;
}

export interface Treatment {
  /** URL-safe id used as an in-page anchor (#chemical-peeling). */
  id: string;
  name: string;
  /** Verbatim description from the old site. Undefined when the old site had none. */
  description?: string;
}

export interface TreatmentGroup {
  /** Anchor id for the group, e.g. "skin", "hair", "face". */
  id: string;
  title: string;
  intro?: string;
  image?: ImageAsset;
  treatments: Treatment[];
}

export interface ServiceCategory {
  slug: string;
  /** Path on the site, with trailing slash. */
  path: string;
  name: string;
  /** Short display name for cards and nav. */
  shortName: string;
  /** One-sentence summary for cards and meta description. */
  summary: string;
  seo: { title: string; description: string };
  heroImage: ImageAsset;
  cardImage: ImageAsset;
  groups: TreatmentGroup[];
  /** Doctor ids who lead this category. */
  doctorIds: string[];
}

export interface Doctor {
  id: string;
  slug: string;
  name: string;
  qualifications: string;
  designation: string;
  image: ImageAsset;
  /** Service category slugs this doctor is associated with. */
  specialties: string[];
}

export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] };

export interface BlogPost {
  slug: string;
  title: string;
  /** ISO date (YYYY-MM-DD) of original publication on the WordPress site. */
  date: string;
  modified: string;
  author: string;
  category: string;
  image: string;
  imageAlt: string;
  excerpt: string;
  blocks: ContentBlock[];
}

export interface Testimonial {
  quote: string;
  name: string;
  source: string;
}

export interface NavLink {
  label: string;
  href: string;
  /** Marks anchors that should scroll on the same page. */
  external?: boolean;
}

export interface NavGroup {
  label: string;
  href: string;
  columns: { title?: string; links: NavLink[] }[];
}
