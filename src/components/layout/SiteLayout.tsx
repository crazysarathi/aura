import { Suspense, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import { Toaster } from "sonner";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { FloatingActions } from "./FloatingActions";
import { ScrollManager } from "./ScrollManager";
import { PageSkeleton } from "@/components/common/PageSkeleton";
import { preloadPages } from "@/routes/lazyPages";

/**
 * Page transitions: React Router navigates inside startTransition, so the current page stays up
 * while the next one loads, then the new page fades and rises in (keyed by path). The first page
 * of a visit is not animated, to keep LCP fast. Once the browser is idle every page chunk is
 * preloaded, so later navigations are instant — skipped when the visitor has Data Saver on.
 */
export function SiteLayout() {
  const { pathname } = useLocation();
  const [landing, setLanding] = useState<string | null>(pathname);
  if (landing !== null && landing !== pathname) setLanding(null);
  const animate = landing === null;

  useEffect(() => {
    if ((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData) return;
    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(preloadPages, { timeout: 4000 });
      return () => cancelIdleCallback(id);
    }
    const id = setTimeout(preloadPages, 2500);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="flex min-h-dvh flex-col">
      <ScrollManager />
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <Suspense fallback={<PageSkeleton />}>
          <div key={pathname} className={animate ? "animate-page-in" : undefined}>
            <Outlet />
          </div>
        </Suspense>
      </main>
      <Footer />
      <FloatingActions />
      <Toaster position="top-center" richColors closeButton toastOptions={{ className: "font-sans" }} />
    </div>
  );
}
