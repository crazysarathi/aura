import { useEffect, type RefObject } from "react";

/**
 * GSAP ScrollTrigger-driven parallax for the home hero: the imagery drifts slower than
 * the page as the visitor scrolls. Loaded lazily, skipped under prefers-reduced-motion.
 */
export function useHeroParallax(sectionRef: RefObject<HTMLElement | null>, layerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const section = sectionRef.current;
    const layer = layerRef.current;
    if (!section || !layer || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    let cleanup: (() => void) | undefined;
    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const tween = gsap.to(layer, {
        yPercent: 18,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 0.6 },
      });
      cleanup = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(layer, { clearProps: "transform" });
      };
    })();
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [sectionRef, layerRef]);
}
