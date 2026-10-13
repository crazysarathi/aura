import { Link } from "react-router";
import { ArrowRight, CalendarDays } from "lucide-react";
import { ResponsiveImage } from "./ResponsiveImage";
import type { BlogPost, Doctor, ServiceCategory } from "@/types/content";
import { formatDate } from "@/lib/utils";

/*
  All three cards share one shell: same radius, border, shadow, hover lift, image-on-top,
  padded body that stretches to the row height, and a footer link pinned to the bottom.
  Text blocks reserve a fixed number of lines (`lh` units) so cards in a row line up.
*/
const shell =
  "group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white shadow-soft transition-[transform,box-shadow,border-color] duration-300 ease-out-soft hover:-translate-y-1 hover:border-copper-200 hover:shadow-card";
const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper-400";
const body = "flex flex-1 flex-col p-4 sm:p-5";
const footerLink = "mt-auto inline-flex items-center gap-1.5 pt-4 text-[13px] font-semibold text-indigo-900 transition-colors group-hover:text-copper-800 sm:text-sm";
const zoom = "transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]";

export function ServiceCard({ service }: { service: ServiceCategory }) {
  const count = service.groups.reduce((n, g) => n + g.treatments.length, 0);
  return (
    <Link to={service.path} className={`${shell} ${focusRing}`}>
      <div className="overflow-hidden">
        <ResponsiveImage imageKey={service.cardImage.key} alt={service.cardImage.alt} sizes="(min-width: 1280px) 20vw, (min-width: 640px) 50vw, 100vw" className={`aspect-[16/10] object-cover sm:aspect-[4/3] ${zoom}`} />
      </div>
      <div className={body}>
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-copper-800 sm:text-xs">{count} treatments</p>
        <h3 className="mt-1.5 line-clamp-2 text-lg leading-snug sm:mt-2 sm:text-xl xl:min-h-[2lh]">{service.name}</h3>
        <p className="mt-1.5 line-clamp-3 text-[13px] leading-relaxed text-ink-muted sm:mt-2 sm:min-h-[3lh] sm:text-sm">{service.summary}</p>
        <span className={footerLink}>
          Explore <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

export function DoctorCard({ doctor, headingLevel: Tag = "h3" }: { doctor: Doctor; headingLevel?: "h2" | "h3" }) {
  return (
    <Link to={`/doctors/${doctor.slug}/`} className={`${shell} ${focusRing}`}>
      <div className="overflow-hidden bg-sand">
        <ResponsiveImage imageKey={doctor.image.key} alt={doctor.image.alt} sizes="(min-width: 1280px) 20vw, (min-width: 640px) 33vw, 50vw" className={`aspect-[3/4] object-cover object-top ${zoom}`} />
      </div>
      <div className={`${body} p-3 sm:p-5`}>
        <Tag className="line-clamp-2 min-h-[2lh] text-[15px] leading-snug sm:text-lg xl:min-h-0">{doctor.name}</Tag>
        <p className="mt-1 line-clamp-2 min-h-[2lh] text-[11px] font-medium leading-snug text-copper-800 sm:text-[13px] xl:min-h-0">{doctor.qualifications}</p>
        <p className="mt-1 line-clamp-3 min-h-[3lh] text-xs leading-snug text-ink-muted sm:mt-1.5 sm:text-sm">{doctor.designation}</p>
        <span className={`${footerLink} pt-3 sm:pt-4`}>
          View profile <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

export function BlogCard({ post, headingLevel: Tag = "h3" }: { post: BlogPost; headingLevel?: "h2" | "h3" }) {
  return (
    <article className={`${shell} relative focus-within:ring-2 focus-within:ring-copper-400`}>
      <div className="overflow-hidden">
        <ResponsiveImage imageKey={`blog/${post.image}`} alt="" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className={`aspect-video object-cover ${zoom}`} />
      </div>
      <div className={body}>
        <p className="flex items-center gap-2 text-[11px] text-ink-muted sm:text-xs">
          <CalendarDays className="size-3.5 text-copper-700" aria-hidden="true" />
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.category}</span>
        </p>
        <Tag className="mt-1.5 line-clamp-2 text-base leading-snug sm:mt-2 sm:min-h-[2lh] sm:text-lg">
          {/* Stretched link: the whole card is clickable, but only one link is announced. */}
          <Link to={`/blog/${post.slug}/`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {post.title}
          </Link>
        </Tag>
        <p className="mt-1.5 line-clamp-3 text-[13px] leading-relaxed text-ink-muted sm:mt-2 sm:min-h-[3lh] sm:text-sm">{post.excerpt}</p>
        <span className={footerLink} aria-hidden="true">
          Read article <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}
