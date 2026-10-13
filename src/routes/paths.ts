import { blogPosts } from "@/data/blog-posts";

/**
 * Old WordPress URL → new route. main.tsx first turns any path-style URL into a hash URL
 * (/category/general/ → /#/category/general/); LegacyRedirect then maps it with this table.
 */
export const legacyRedirects: Record<string, string> = {
  "/Contact": "/contact-us/",
  "/contact": "/contact-us/",
  "/category/general/": "/blog/",
  "/author/aura/": "/blog/",
  "/main-home/": "/",
  "/shop/": "/",
  "/cart/": "/",
  "/checkout/": "/",
  "/my-account/": "/",
  ...Object.fromEntries(blogPosts.map((p) => [`/${p.slug}/`, `/blog/${p.slug}/`])),
};
