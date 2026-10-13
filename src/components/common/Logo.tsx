import { Link } from "react-router";
import { image } from "@/lib/images";
import { cn } from "@/lib/utils";

/** The original Aura Cosmetique by SKS wordmark (white background keyed out). */
export function Logo({ className, priority = true }: { className?: string; priority?: boolean }) {
  const img = image("brand/aura-logo");
  return (
    <Link to="/" className={cn("inline-flex shrink-0 items-center", className)} aria-label="Aura Cosmetique – home">
      <img
        src={img.src}
        srcSet={img.srcSet}
        sizes="(min-width: 640px) 200px, 160px"
        width={img.width}
        height={img.height}
        alt="Aura Cosmetique by SKS"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        className="h-10 w-auto sm:h-11 lg:h-13"
      />
    </Link>
  );
}
