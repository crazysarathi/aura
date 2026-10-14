import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { useHeroParallax } from "@/hooks/useHeroParallax";
import { Link } from "react-router";
import { ArrowRight, ChevronLeft, ChevronRight, Phone, Pointer, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResponsiveImage } from "@/components/common/ResponsiveImage";
import { aboutCopy, site } from "@/data/site";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";

const slides = aboutCopy.heroSlides;
const AUTOPLAY_MS = 7000;
const SWIPE_PX = 50;

interface Nav {
  index: number;
  prev: number;
  /** Where the reveal starts, as % of the image layer. */
  origin: { x: number; y: number };
  /** Increments per change; keys the ripple so it replays. */
  n: number;
}

/**
 * Home hero. Replaces the Revolution Slider. Each change reveals the new slide as a circle
 * growing from wherever the visitor clicked or swiped (the right edge for autoplay), with a
 * copper ripple, a settling zoom and a word-by-word headline. Pauses on hover, swipes on
 * touch, respects reduced motion, and leaves the first slide unanimated for LCP.
 */
export function Hero() {
  const [nav, setNav] = useState<Nav>({ index: 0, prev: -1, origin: { x: 100, y: 50 }, n: 0 });
  const [paused, setPaused] = useState(false);
  const [swiped, setSwiped] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const layerRef = useRef<HTMLDivElement | null>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  useHeroParallax(sectionRef, layerRef);
  const rise = (delay: number) => ({ style: { animationDelay: `${delay}s` } });
  const { index, prev, origin, n } = nav;
  const changed = n > 0;

  const go = useCallback((to: (i: number) => number, point?: { x: number; y: number }) => {
    const r = layerRef.current?.getBoundingClientRect();
    const o = point && r ? { x: ((point.x - r.left) / r.width) * 100, y: ((point.y - r.top) / r.height) * 100 } : { x: 100, y: 50 };
    setNav((s) => {
      const next = (to(s.index) + slides.length) % slides.length;
      return next === s.index ? s : { index: next, prev: s.index, origin: o, n: s.n + 1 };
    });
  }, []);

  const fromElement = (el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  };

  // Restarts on every slide change, so a manual change gets a full interval and the dot's timer stays in sync.
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => go((i) => i + 1), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [index, paused, go]);

  const originVars = { "--rx": `${origin.x}%`, "--ry": `${origin.y}%` } as CSSProperties;

  return (
    <section ref={sectionRef} className="group/hero relative overflow-hidden bg-indigo-900 text-white" aria-roledescription="carousel" aria-label="Welcome" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div ref={layerRef} className="absolute -inset-y-[12%] inset-x-0 will-change-transform">
        <div className="absolute inset-0 isolate">
          {slides.map((s, i) => {
            const active = i === index;
            return (
              <div
                key={s.image}
                className={cn("absolute inset-0 overflow-hidden", active ? "z-2" : i === prev ? "z-1" : "opacity-0", active && changed && "animate-hero-reveal")}
                style={active ? originVars : undefined}
                aria-hidden={!active}
              >
                <div className={cn("h-full w-full", active && changed && "animate-hero-zoom")}>
                  <ResponsiveImage imageKey={s.image} alt="" sizes="100vw" priority={i === 0} className="h-full w-full object-cover object-[65%_center] sm:object-center" />
                </div>
              </div>
            );
          })}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/85 via-indigo-950/60 to-indigo-900/15" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-indigo-950/70 to-transparent" aria-hidden="true" />
        {changed && (
          <span key={n} className="pointer-events-none absolute size-24 animate-hero-ripple rounded-full border border-copper-400" style={{ left: `${origin.x}%`, top: `${origin.y}%` }} aria-hidden="true" />
        )}
      </div>

      <div
        className="relative touch-pan-y"
        onTouchStart={(e) => (touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY })}
        onTouchEnd={(e) => {
          const start = touch.current;
          touch.current = null;
          if (!start) return;
          const end = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
          const dx = end.x - start.x;
          if (Math.abs(dx) < SWIPE_PX || Math.abs(dx) < Math.abs(end.y - start.y)) return;
          setSwiped(true);
          go((i) => i + (dx < 0 ? 1 : -1), end);
        }}
      >
      <div className="container-x relative flex min-h-[28rem] lg:px-20! min-[1400px]:px-8! flex-col justify-center py-14 sm:min-h-[34rem] sm:py-20 lg:min-h-[40rem]">
        <p className="eyebrow text-copper-400 animate-rise motion-reduce:animate-none">
          Aura Cosmetique by SKS<span className="hidden min-[420px]:inline"> Hospital</span> · Salem
        </p>
        {/* All headlines share one grid cell, so the block is as tall as the longest one: no layout shift when slides change. */}
        <div className="mt-3 grid sm:mt-4">
          {slides.map((s, i) => {
            const Tag = i === 0 ? "h1" : "p";
            const active = i === index;
            return (
              <Tag
                key={s.image}
                className={cn(
                  "max-w-3xl font-display text-[1.875rem] leading-[1.12] tracking-tight text-white transition-[opacity,transform] duration-500 ease-out-soft [grid-area:1/1] max-[359px]:min-h-[5lh] sm:text-5xl lg:text-[3.5rem]",
                  active ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0",
                )}
                aria-hidden={i === 0 ? undefined : true}
              >
                {active && changed
                  ? s.heading.split(" ").map((word, w) => (
                      <span key={w}>
                        <span className="mb-[-0.15em] inline-block overflow-hidden pb-[0.15em] align-top">
                          <span className="inline-block animate-word-in" style={{ animationDelay: `${0.25 + w * 0.05}s` }}>
                            {word}
                          </span>
                        </span>{" "}
                      </span>
                    ))
                  : s.heading}
              </Tag>
            );
          })}
        </div>
        <div style={rise(0.25).style} className="mt-6 grid gap-3 animate-rise motion-reduce:animate-none min-[420px]:flex min-[420px]:flex-wrap sm:mt-8">
          <Button asChild variant="accent" size="lg">
            <Link to="/consult/">
              Book a consultation <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild variant="light" size="lg">
            <a href={`tel:${site.phones[0].tel}`}>
              <Phone aria-hidden="true" /> {site.phones[0].display}
            </a>
          </Button>
        </div>
        <p className="mt-6 flex items-start gap-2 text-[13px] text-white/80 sm:mt-8 sm:items-center sm:text-sm">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-copper-400 sm:mt-0" aria-hidden="true" /> {site.accreditation}
        </p>

        <div className="mt-7 flex items-center gap-2 sm:mt-10">
          <div className="flex items-center gap-2" role="tablist" aria-label="Hero slides">
            {slides.map((s, i) => (
              <button
                key={s.image}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Slide ${i + 1}`}
                onClick={(e) => go(() => i, fromElement(e.currentTarget))}
                className="flex h-6 items-center"
              >
                <span className={cn("relative block h-1.5 overflow-hidden rounded-full transition-all duration-500 ease-out-soft", i === index ? "w-10 bg-white/25" : "w-3 bg-white/40 hover:bg-white/70")}>
                  {/* The active dot fills over the autoplay interval; full while paused or under reduced motion. */}
                  {i === index && (
                    <span
                      key={`${index}-${paused}`}
                      className={cn("absolute inset-0 origin-left rounded-full bg-copper-400 motion-reduce:animate-none", !paused && "animate-fill-x")}
                      style={{ animationDuration: `${AUTOPLAY_MS}ms` }}
                    />
                  )}
                </span>
              </button>
            ))}
          </div>

          {/* Touch hint: a hand sweeping between chevrons, gone after the first swipe. */}
          <span className={cn("ml-auto flex items-center gap-1 text-[10px] font-semibold tracking-[0.25em] text-white/75 transition-opacity duration-500 lg:hidden", swiped && "opacity-0")} aria-hidden="true">
            <ChevronLeft className="size-3.5 animate-chevron-wave [animation-delay:0.3s]" />
            <span className="relative flex flex-col items-center">
              SWIPE
              <Pointer className="mt-1 size-5 animate-swipe-hint text-copper-400" />
            </span>
            <ChevronRight className="size-3.5 animate-chevron-wave" />
          </span>
        </div>
      </div>

      {/*
        Prev/next (desktop): a stacked triple chevron whose chevrons stream outward, fading in at the back and out
        at the front. Hover turns it copper and speeds the stream; a press kicks it the same way.
      */}
      {[
        { label: "Previous slide", step: -1, side: "left-3 min-[1400px]:left-6", flip: true },
        { label: "Next slide", step: 1, side: "right-3 min-[1400px]:right-6", flip: false },
      ].map(({ label, step, side, flip }) => (
        <button
          key={label}
          type="button"
          aria-label={label}
          onClick={(e) => go((i) => i + step, fromElement(e.currentTarget))}
          className={cn(
            "group/arrow absolute top-1/2 z-10 hidden w-16 -translate-y-1/2 flex-col items-center gap-2 rounded-2xl py-3 text-white transition-colors duration-300 hover:text-copper-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper-400 lg:flex",
            side,
          )}
        >
          <svg
            viewBox="0 0 36 32"
            fill="none"
            stroke="currentColor"
            strokeWidth={3.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(
              "chevron-flow h-10 w-11 drop-shadow-[0_2px_6px_rgb(0_0_0/0.4)] transition-transform duration-200 ease-out-soft",
              flip ? "-scale-x-100 group-active/arrow:-translate-x-1.5" : "group-active/arrow:translate-x-1.5",
            )}
            aria-hidden="true"
          >
            {[0, 1, 2].map((i) => (
              <path key={i} d="M4 5 L13 16 L4 27" style={{ "--i": i } as CSSProperties} />
            ))}
          </svg>
          <span className="text-[10px] font-semibold tracking-[0.3em] text-white/80 transition-colors group-hover/arrow:text-copper-400" aria-hidden="true">
            SWIPE
          </span>
        </button>
      ))}
      </div>

      <nav aria-label="Quick links to services" className="relative border-t border-white/10 bg-indigo-950/60 backdrop-blur">
        <ul className="container-x flex gap-2 overflow-x-auto py-2.5 text-[13px] [scrollbar-width:none] sm:py-3 sm:text-sm">
          {services.map((s) => (
            <li key={s.slug} className="shrink-0">
              <Link to={s.path} className="inline-flex h-8 items-center rounded-full border border-white/15 px-3.5 text-white/85 sm:h-9 sm:px-4 transition-colors hover:border-copper-400 hover:text-white">
                {s.shortName}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
