import { Suspense } from "react";
import { Outlet } from "react-router";
import { Toaster } from "sonner";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { FloatingActions } from "./FloatingActions";
import { ScrollManager } from "./ScrollManager";
import { PageSkeleton } from "@/components/common/PageSkeleton";

export function SiteLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <ScrollManager />
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <Suspense fallback={<PageSkeleton />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <FloatingActions />
      <Toaster position="top-center" richColors closeButton toastOptions={{ className: "font-sans" }} />
    </div>
  );
}
