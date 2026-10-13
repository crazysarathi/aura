import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Subtle scroll-reveal with IntersectionObserver + CSS transitions (no library).
 * Content renders visible first (never hidden before JavaScript runs); the fade-up only
 * applies after mount, is skipped under prefers-reduced-motion, and never re-hides.
 */
export function Reveal({ children, className, delay = 0, as: Tag = "div" }: { children: React.ReactNode; className?: string; delay?: number; as?: "div" | "section" | "li" }) {
  const ref = useRef<HTMLElement | null>(null);
  const [state, setState] = useState<"idle" | "hidden" | "shown">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) return; // already in view: don't flash
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setState("shown");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    // Hide only once the observer is attached, so the element is guaranteed to be revealed
    // when it scrolls into view (or immediately, if it is already there).
    const raf = requestAnimationFrame(() => setState((s) => (s === "idle" ? "hidden" : s)));
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Comp = Tag as any;
  return (
    <Comp
      ref={ref}
      className={cn(className, state !== "idle" && "transition-[opacity,transform] duration-700 ease-out-soft", state === "hidden" && "translate-y-6 opacity-0", state === "shown" && "translate-y-0 opacity-100")}
      style={state !== "idle" && delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Comp>
  );
}
