import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { ResponsiveImage } from "./ResponsiveImage";
import { cn } from "@/lib/utils";

interface Props {
  eyebrow?: string;
  title: string;
  intro?: string;
  crumbs: Crumb[];
  image?: { key: string; alt: string };
  children?: React.ReactNode;
  compact?: boolean;
}

/** Shared inner-page hero: breadcrumbs, H1, intro and an optional image. */
export function PageHero({ eyebrow, title, intro, crumbs, image, children, compact }: Props) {
  return (
    <section className="relative overflow-hidden bg-indigo-900 text-white">
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 -top-40 size-[28rem] rounded-full bg-indigo-700/40 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 right-1/3 size-[24rem] rounded-full bg-copper-600/20 blur-3xl" />
      <div className={cn("container-x relative grid items-center gap-8 py-10 sm:py-14 lg:gap-10 lg:py-20", image && "lg:grid-cols-12")}>
        <div className={cn(image && "lg:col-span-7")}>
          <Breadcrumbs items={crumbs} tone="light" />
          {eyebrow && <p className="eyebrow mt-5 text-copper-400 sm:mt-6">{eyebrow}</p>}
          <h1 className={cn("mt-2 leading-[1.1] text-white sm:mt-3", compact ? "text-[1.875rem] sm:text-4xl lg:text-5xl" : "text-[2rem] sm:text-5xl")}>{title}</h1>
          {intro && <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/80 sm:mt-5 sm:text-[1.0625rem]">{intro}</p>}
          {children && <div className="mt-6 sm:mt-7">{children}</div>}
        </div>
        {image && (
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-xl border border-white/10 shadow-2xl">
              <ResponsiveImage imageKey={image.key} alt={image.alt} sizes="(min-width: 1024px) 40vw, 100vw" priority className="aspect-[16/10] object-cover sm:aspect-[16/9] lg:aspect-[4/5]" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
