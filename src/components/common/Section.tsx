import { cn } from "@/lib/utils";

export function Section({ id, className, children, tone = "default" }: { id?: string; className?: string; children: React.ReactNode; tone?: "default" | "white" | "indigo" | "cream" }) {
  return (
    <section
      id={id}
      className={cn(
        "py-12 sm:py-16 lg:py-24",
        tone === "white" && "bg-white",
        tone === "cream" && "bg-cream/60",
        tone === "indigo" && "bg-indigo-900 text-white",
        className,
      )}
    >
      <div className="container-x">{children}</div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, intro, align = "left", tone = "default", as: Tag = "h2", className }: { eyebrow?: string; title: string; intro?: string; align?: "left" | "center"; tone?: "default" | "light"; as?: "h1" | "h2" | "h3"; className?: string }) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className={cn("eyebrow", tone === "light" && "text-copper-400")}>{eyebrow}</p>}
      <Tag className={cn("mt-2 text-[1.75rem] leading-[1.15] sm:mt-3 sm:text-4xl lg:text-[2.75rem]", tone === "light" && "text-white")}>{title}</Tag>
      {intro && <p className={cn("mt-3 text-[15px] leading-relaxed text-ink-muted sm:mt-5 sm:text-[1.0625rem]", tone === "light" && "text-white/80")}>{intro}</p>}
    </div>
  );
}
