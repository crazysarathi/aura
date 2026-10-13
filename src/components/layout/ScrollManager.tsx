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
 * Scroll to top on route change and to in-page anchors. Route changes and the first anchor
 * jump after a load are "instant" — note that "auto" would inherit the stylesheet's
 * scroll-behavior: smooth and animate. The first jump is re-applied once after layout settles
 * (fonts, images, ScrollTrigger refresh); later in-page jumps within a page are smooth.
 */
export function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  const firstRun = useRef(true);

  useEffect(() => {
    const initial = firstRun.current;
    firstRun.current = false;
    if (!hash) {
      if (!initial) window.scrollTo({ top: 0, behavior: "instant" });
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
          if (t !== null && Math.abs(t - window.scrollY) > 4) window.scrollTo({ top: t, behavior: "instant" });
        }, 600));
      }
    };
    go(initial ? "instant" : "smooth");
    return () => timers.forEach(clearTimeout);
  }, [pathname, hash, key]);
  return null;
}
