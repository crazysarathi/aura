import { useState } from "react";
import { Link } from "react-router";
import * as Tabs from "@radix-ui/react-tabs";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { ResponsiveImage } from "@/components/common/ResponsiveImage";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";

/** Every treatment, grouped by speciality, in a tabbed index (home page). */
export function TreatmentIndex() {
  const [active, setActive] = useState(services[0].slug);
  const reduce = useReducedMotion();
  return (
    <Tabs.Root value={active} onValueChange={setActive} className="grid gap-5 sm:gap-8 lg:grid-cols-12">
      <Tabs.List aria-label="Specialities" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0 lg:col-span-4 lg:flex-col lg:overflow-visible">
        {services.map((s) => {
          const count = s.groups.reduce((n, g) => n + g.treatments.length, 0);
          return (
            <Tabs.Trigger
              key={s.slug}
              value={s.slug}
              className="group flex shrink-0 items-center gap-3 rounded-xl border border-line bg-white p-2 pr-4 text-left sm:gap-4 sm:p-3 sm:pr-5 transition-colors hover:border-copper-400 data-[state=active]:border-indigo-900 data-[state=active]:bg-indigo-900 data-[state=active]:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper-400"
            >
              <ResponsiveImage imageKey={s.cardImage.key} alt="" sizes="56px" className="size-10 shrink-0 rounded-lg object-cover sm:size-14" />
              <span>
                <span className="block font-display text-[15px] sm:text-base">{s.name}</span>
                <span className="block text-xs opacity-70">{count} treatments</span>
              </span>
            </Tabs.Trigger>
          );
        })}
      </Tabs.List>
      <div className="lg:col-span-8">
        <AnimatePresence mode="wait" initial={false}>
          {services
            .filter((s) => s.slug === active)
            .map((s) => (
              <Tabs.Content key={s.slug} value={s.slug} forceMount asChild>
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-xl border border-line bg-white p-4 shadow-soft sm:p-8"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="max-w-xl">
                      <h3 className="text-xl sm:text-2xl">{s.name}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{s.summary}</p>
                    </div>
                    <Link to={s.path} className="inline-flex items-center gap-1.5 text-sm font-semibold text-copper-800 hover:underline">
                      Open page <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  </div>
                  <div className="mt-6 space-y-6">
                    {s.groups.map((g) => (
                      <div key={g.id}>
                        <h4 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-indigo-900">
                          <Link to={`${s.path}#${g.id}`} className="hover:text-copper-800">
                            {g.title}
                          </Link>
                        </h4>
                        <ul className="mt-3 flex flex-wrap gap-2">
                          {g.treatments.map((t) => (
                            <li key={t.id}>
                              <Link
                                to={`${s.path}#${t.id}`}
                                className={cn("inline-flex min-h-8 items-center rounded-full border border-line bg-ivory px-3 py-1 text-[12.5px] text-indigo-900 sm:px-3.5 sm:text-[13px] transition-colors hover:border-copper-400 hover:bg-copper-50")}
                              >
                                {t.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </Tabs.Content>
            ))}
        </AnimatePresence>
      </div>
    </Tabs.Root>
  );
}
