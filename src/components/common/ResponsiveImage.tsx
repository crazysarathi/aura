import { image } from "@/lib/images";
import { cn } from "@/lib/utils";

interface Props extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet" | "width" | "height"> {
  imageKey: string;
  alt: string;
  /** `sizes` attribute; defaults to full width on mobile, half on desktop. */
  sizes?: string;
  priority?: boolean;
}

/** Renders the WebP variants produced by scripts/optimize-images.mjs with intrinsic dimensions to prevent layout shift. */
export function ResponsiveImage({ imageKey, alt, sizes = "(min-width: 1024px) 50vw, 100vw", priority = false, className, ...rest }: Props) {
  const img = image(imageKey);
  return (
    <img
      src={img.src}
      srcSet={img.srcSet}
      sizes={sizes}
      width={img.width}
      height={img.height}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : undefined}
      className={cn("block h-auto w-full", className)}
      {...rest}
    />
  );
}
