import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const R = 22;
const CIRC = 2 * Math.PI * R;

/**
 * Bottom-right action stack: back-to-top (with a scroll-progress ring) above the WhatsApp
 * button. The ring is updated by writing to the SVG directly in a rAF, so scrolling never
 * re-renders React; state only flips when the button crosses the visibility threshold.
 */
export function FloatingActions() {
  const [visible, setVisible] = useState(false);
  const ring = useRef<SVGCircleElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      ring.current?.setAttribute("stroke-dashoffset", String(CIRC * (1 - progress)));
      setVisible(window.scrollY > Math.min(600, window.innerHeight * 0.8));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "instant" : "smooth" });
    document.getElementById("main")?.focus({ preventScroll: true });
  };

  const text = encodeURIComponent("Hello Aura Cosmetique, I would like to book a consultation.");

  return (
    <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-30 flex flex-col items-center gap-3 sm:bottom-6 sm:right-6">
      <button
        type="button"
        onClick={toTop}
        aria-label="Back to top"
        tabIndex={visible ? 0 : -1}
        aria-hidden={!visible}
        className={cn(
          "group relative flex size-11 items-center justify-center rounded-full bg-white text-indigo-900 shadow-card transition-[opacity,transform] duration-300 ease-out-soft hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-copper-200 sm:size-12",
          visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
        )}
      >
        <svg viewBox="0 0 48 48" className="absolute inset-0 size-full -rotate-90" aria-hidden="true">
          <circle cx="24" cy="24" r={R} fill="none" stroke="var(--color-line)" strokeWidth="2" />
          <circle ref={ring} cx="24" cy="24" r={R} fill="none" stroke="var(--color-copper-600)" strokeWidth="2" strokeLinecap="round" strokeDasharray={CIRC} strokeDashoffset={CIRC} />
        </svg>
        <ArrowUp className="relative size-[18px] transition-transform group-hover:-translate-y-0.5" aria-hidden="true" />
      </button>
      <a
        href={`${site.whatsapp.href}?text=${text}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Aura Cosmetique on WhatsApp"
        className="flex size-12 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_8px_24px_-6px_rgb(37_211_102/0.6)] transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25d366]/40 motion-reduce:transition-none sm:size-14"
      >
        <svg viewBox="0 0 32 32" className="size-6 sm:size-7" aria-hidden="true" fill="currentColor">
          <path d="M16 3C8.8 3 3 8.7 3 15.8c0 2.6.8 5.1 2.2 7.2L3 29l6.2-2.1c2 1.1 4.4 1.7 6.8 1.7 7.2 0 13-5.7 13-12.8S23.2 3 16 3zm0 23.4c-2.2 0-4.3-.6-6.1-1.7l-.4-.3-3.7 1.2 1.2-3.5-.3-.4A10.5 10.5 0 0 1 5.3 15.8C5.3 10 10.1 5.3 16 5.3s10.7 4.7 10.7 10.5S21.9 26.4 16 26.4zm5.9-7.8c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.6l.5-.6c.2-.2.2-.3.3-.5.1-.2.1-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.7s1.2 3.1 1.3 3.3c.2.2 2.3 3.5 5.6 4.9.8.3 1.4.5 1.9.7.8.2 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.8.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z" />
        </svg>
      </a>
    </div>
  );
}
