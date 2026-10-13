import { Link } from "react-router";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Crumb {
  name: string;
  path: string;
}

export function Breadcrumbs({ items, className, tone = "default" }: { items: Crumb[]; className?: string; tone?: "default" | "light" }) {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-[13px]", className)}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className={cn("size-3.5", tone === "light" ? "text-white/50" : "text-ink-muted/60")} aria-hidden="true" />}
              {last ? (
                <span aria-current="page" className={cn(tone === "light" ? "text-white" : "text-indigo-900", "font-medium")}>
                  {c.name}
                </span>
              ) : (
                <Link to={c.path} className={cn(tone === "light" ? "text-white/75 hover:text-white" : "text-ink-muted hover:text-copper-700")}>
                  {c.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
