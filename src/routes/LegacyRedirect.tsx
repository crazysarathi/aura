import { Navigate, useLocation } from "react-router";
import { legacyRedirects } from "./paths";
import { NotFoundPage } from "./lazyPages";

/**
 * Catch-all route. Old WordPress URLs (e.g. top-level blog slugs, /category/general/) are
 * redirected client-side; production hosts also send real 301s (docs/route-mapping.md).
 * Anything else renders the 404 page.
 */
export function LegacyRedirect() {
  const { pathname, hash } = useLocation();
  const normalized = pathname.endsWith("/") ? pathname : `${pathname}/`;
  const target = legacyRedirects[pathname] ?? legacyRedirects[normalized];
  if (target) return <Navigate to={`${target}${hash}`} replace />;
  return <NotFoundPage />;
}
