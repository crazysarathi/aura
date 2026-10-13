import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

/** Height of everything stuck to the top (main header + an in-page section nav), measured live. */
function stickyOffset() {
  const header = document.querySelector("header");
  const subnav = document.querySelector<HTMLElement>("[data-subnav]");
  return (header?.getBoundingClientRect().height ?? 64) + (subnav?.offsetHeight ?? 0) + 16;
}

function targetTop(hash: string) {
  const el = document.getElementById(decodeURIComponent(hash.slice(1)));
  if (!el) return null;
  return Math.max(0, el.getBoundingClientRect().top + window.scrollY - stickyOffset());
}

/**
 * Scroll to top on route change and to in-page anchors. The first scroll after a page load is
 * instant and re-applied once more shortly after (fonts, images and ScrollTrigger's own refresh
 * can shift layout or restore the previous position); later in-page jumps are smooth.
 */
export function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  const firstRun = useRef(true);

  useEffect(() => {
    const initial = firstRun.current;
    firstRun.current = false;
    if (!hash) {
      if (!initial) window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }
    let attempts = 0;
    const timers: number[] = [];
    const go = (behavior: ScrollBehavior) => {
      const top = targetTop(hash);
      if (top === null) {
        if (attempts++ < 12) timers.push(window.setTimeout(() => go(behavior), 80)); // lazy route not rendered yet
        return;
      }
      window.scrollTo({ top, behavior });
      if (initial) {
        // Correct once layout and ScrollTrigger have settled.
        timers.push(window.setTimeout(() => {
          const t = targetTop(hash);
          if (t !== null && Math.abs(t - window.scrollY) > 4) window.scrollTo({ top: t, behavior: "auto" });
        }, 600));
      }
    };
    go(initial ? "auto" : "smooth");
    return () => timers.forEach(clearTimeout);
  }, [pathname, hash, key]);
  return null;
}
