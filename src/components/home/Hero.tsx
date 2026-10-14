import { useEffect, useRef, useState } from "react";
import { useHeroParallax } from "@/hooks/useHeroParallax";
import { Link } from "react-router";
import { ArrowRight, Phone, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResponsiveImage } from "@/components/common/ResponsiveImage";
import { aboutCopy, site } from "@/data/site";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";

/**
 * Home hero. Replaces the Revolution Slider with a two-slide crossfade that pauses on
 * hover, respects reduced motion, and keeps the first image eager for LCP.
 */
export function Hero() {
  const slides = aboutCopy.heroSlides;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const layerRef = useRef<HTMLDivElement | null>(null);
  useHeroParallax(sectionRef, layerRef);
  const rise = (delay: number) => ({ style: { animationDelay: `${delay}s` } });

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 7000);
    return () => clearInterval(id);
  }, [paused, slides.length]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-indigo-900 text-white" aria-roledescription="carousel" aria-label="Welcome" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div ref={layerRef} className="absolute -inset-y-[12%] inset-x-0 will-change-transform">
        {slides.map((s, i) => (
          <div key={s.image} className={cn("absolute inset-0 transition-opacity duration-1000 ease-out-soft", i === index ? "opacity-100" : "opacity-0")} aria-hidden={i !== index}>
            <ResponsiveImage imageKey={s.image} alt="" sizes="100vw" priority={i === 0} className="h-full w-full object-cover object-[65%_center] sm:object-center" />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/85 via-indigo-950/60 to-indigo-900/15" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-indigo-950/70 to-transparent" aria-hidden="true" />
      </div>

      <div className="container-x relative flex min-h-[28rem] flex-col justify-center py-14 sm:min-h-[34rem] sm:py-20 lg:min-h-[40rem]">
        <p className="eyebrow text-copper-400 animate-rise motion-reduce:animate-none">
          Aura Cosmetique by SKS<span className="hidden min-[420px]:inline"> Hospital</span> · Salem
        </p>
        {/* All headlines share one grid cell, so the block is as tall as the longest one: no layout shift when slides change. */}
        <div className="mt-3 grid sm:mt-4">
          {slides.map((s, i) => {
            const Tag = i === 0 ? "h1" : "p";
            return (
              <Tag
                key={s.image}
                className={cn(
                  "max-w-3xl font-display text-[1.875rem] leading-[1.12] tracking-tight text-white transition-[opacity,transform] duration-700 ease-out-soft [grid-area:1/1] max-[359px]:min-h-[5lh] sm:text-5xl lg:text-[3.5rem]",
                  i === index ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0",
                )}
                aria-hidden={i === 0 ? undefined : true}
              >
                {s.heading}
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

        <div className="mt-7 flex items-center gap-2 sm:mt-10" role="tablist" aria-label="Hero slides">
          {slides.map((s, i) => (
            <button
              key={s.image}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className="flex h-6 items-center"
            >
              <span className={cn("block h-1.5 rounded-full transition-all", i === index ? "w-8 bg-copper-400" : "w-3 bg-white/40 hover:bg-white/70")} />
            </button>
          ))}
        </div>

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
