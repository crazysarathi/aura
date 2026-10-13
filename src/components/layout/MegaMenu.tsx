import { useState } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { ResponsiveImage } from "@/components/common/ResponsiveImage";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";

/**
 * Desktop services mega menu: speciality tabs on the left, every treatment of the active
 * speciality on the right (the old WordPress menu listed all treatments too), plus an image card.
 */
export function MegaMenu({ open, onNavigate }: { open: boolean; onNavigate: () => void }) {
  const [active, setActive] = useState(services[0].slug);
  const reduce = useReducedMotion();
  const current = services.find((s) => s.slug === active) ?? services[0];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="services-mega-menu"
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: 6 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-1/2 top-full z-50 w-[min(84rem,calc(100vw-2rem))] -translate-x-1/2 pt-3"
        >
          <div className="grid grid-cols-12 overflow-hidden rounded-xl border border-line bg-white shadow-card">
            <ul className="col-span-4 space-y-1 border-r border-line bg-ivory p-3 xl:col-span-3" role="tablist" aria-label="Specialities">
              {services.map((s) => {
                const count = s.groups.reduce((n, g) => n + g.treatments.length, 0);
                const isActive = s.slug === active;
                return (
                  <li key={s.slug}>
                    <Link
                      to={s.path}
                      role="tab"
                      aria-selected={isActive}
                      onMouseEnter={() => setActive(s.slug)}
                      onFocus={() => setActive(s.slug)}
                      onClick={onNavigate}
                      className={cn(
                        "relative flex items-center justify-between gap-3 rounded-lg px-4 py-3.5 text-left transition-colors duration-200",
                        isActive ? "text-white" : "text-indigo-900 hover:bg-white hover:text-copper-800",
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="mega-active"
                          transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }}
                          className="absolute inset-0 rounded-lg bg-indigo-900 shadow-[0_10px_24px_-12px_rgb(39_31_84/0.6)]"
                          aria-hidden="true"
                        >
                          <span className="absolute inset-y-2.5 left-0 w-1 rounded-r-full bg-copper-500" />
                        </motion.span>
                      )}
                      <span className="relative">
                        <span className="block font-display text-base leading-tight">{s.name}</span>
                        <span className={cn("block text-[11px] uppercase tracking-[0.14em]", isActive ? "text-copper-200" : "text-ink-muted")}>{count} treatments</span>
                      </span>
                      <ArrowRight className={cn("relative size-4 shrink-0 transition-all duration-200", isActive ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0")} aria-hidden="true" />
                    </Link>
                  </li>
                );
              })}
              <li className="mt-2 border-t border-line pt-3">
                <Link to="/services/" onClick={onNavigate} className="block rounded-lg px-3.5 py-2 text-sm font-semibold text-copper-800 hover:bg-white">
                  All services overview →
                </Link>
              </li>
            </ul>

            <div className="col-span-8 max-h-[min(36rem,calc(100dvh-9rem))] overflow-y-auto p-6 xl:col-span-6 xl:p-7" role="tabpanel">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.slug}
                  initial={reduce ? false : { opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? undefined : { opacity: 0, x: -6 }}
                  transition={{ duration: 0.18 }}
                >
                  <div className="grid grid-cols-3 gap-x-6 gap-y-5">
                    {current.groups.map((g) => (
                      <div key={g.id} className={cn(g.treatments.length > 12 ? "col-span-3" : g.treatments.length > 5 ? "col-span-2" : "col-span-1")}>
                        <Link to={`${current.path}#${g.id}`} onClick={onNavigate} className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-copper-800 hover:text-indigo-900">
                          {g.title}
                        </Link>
                        <ul className={cn("mt-2 gap-x-6", g.treatments.length > 12 ? "columns-3" : g.treatments.length > 5 ? "columns-2" : "")}>
                          {g.treatments.map((t) => (
                            <li key={t.id} className="break-inside-avoid">
                              <Link to={`${current.path}#${t.id}`} onClick={onNavigate} className="block rounded px-1 py-[3px] text-[13.5px] leading-snug text-ink-muted transition-colors hover:bg-copper-50 hover:text-indigo-900">
                                {t.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="hidden border-l border-line bg-ivory p-4 xl:col-span-3 xl:block">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={current.slug} initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={reduce ? undefined : { opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Link to={current.path} onClick={onNavigate} className="group block overflow-hidden rounded-lg">
                    <ResponsiveImage imageKey={current.cardImage.key} alt={current.cardImage.alt} sizes="260px" className="aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                  </Link>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">{current.summary}</p>
                  <Link to={current.path} onClick={onNavigate} className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-900 hover:text-copper-800">
                    Explore {current.shortName} <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
