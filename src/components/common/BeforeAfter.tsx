import { useCallback, useId, useRef, useState } from "react";
import { ResponsiveImage } from "./ResponsiveImage";
import { cn } from "@/lib/utils";

interface Props {
  before: { key: string; alt: string };
  after: { key: string; alt: string };
  label?: string;
  caption?: string;
  className?: string;
}

/**
 * Before/after comparison slider (replaces the Elementor image-compare widget on the old
 * home page). Pointer-draggable, keyboard-accessible through a visually hidden range input.
 */
export function BeforeAfter({ before, after, label = "Aura", caption, className }: Props) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const id = useId();

  const update = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  return (
    <figure className={cn("w-full", className)}>
      <div
        ref={ref}
        className="group relative aspect-[4/3] touch-pan-y sm:aspect-[16/8] lg:aspect-[1920/750] select-none overflow-hidden rounded-xl bg-sand shadow-card"
        onPointerDown={(e) => {
          dragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          update(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && update(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        <ResponsiveImage imageKey={after.key} alt={after.alt} sizes="(min-width: 1280px) 80rem, 100vw" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <ResponsiveImage imageKey={before.key} alt={before.alt} sizes="(min-width: 1280px) 80rem, 100vw" className="h-full w-full object-cover" draggable={false} />
        </div>
        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-indigo-950/60 px-2.5 py-1 text-[10px] sm:left-4 sm:top-4 sm:px-3 sm:text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">Before</span>
        <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-white/80 px-2.5 py-1 text-[10px] sm:right-4 sm:top-4 sm:px-3 sm:text-xs font-semibold uppercase tracking-[0.18em] text-indigo-900 backdrop-blur">After</span>
        <div className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgb(29_26_46/0.15)]" style={{ left: `${pos}%` }} />
        <div
          className="pointer-events-none absolute top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white font-display text-[11px] uppercase tracking-[0.25em] text-indigo-900 shadow-card transition-transform duration-300 group-active:scale-95 sm:size-20 sm:text-sm sm:tracking-[0.3em] lg:size-24"
          style={{ left: `${pos}%` }}
          aria-hidden="true"
        >
          {label}
        </div>
        <label htmlFor={id} className="sr-only">
          Drag to compare before and after
        </label>
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          value={Math.round(pos)}
          onChange={(e) => setPos(Number(e.target.value))}
          className="absolute inset-x-0 bottom-0 h-10 w-full cursor-ew-resize opacity-0 focus-visible:opacity-100 focus-visible:[accent-color:var(--color-copper-700)]"
          aria-valuetext={`${Math.round(pos)}% before`}
        />
      </div>
      {caption && <figcaption className="mt-3 text-center text-xs text-ink-muted">{caption}</figcaption>}
    </figure>
  );
}
