import { useLayoutEffect } from "react";
import { buildHeadTags, type SeoProps } from "@/lib/seo";

/**
 * Declarative per-page <head> management (title, description, canonical, Open Graph, JSON-LD).
 * Replaces every tag marked data-seo, including the defaults written into index.html.
 */
export function Seo(props: SeoProps) {
  const key = JSON.stringify(props);
  useLayoutEffect(() => {
    document.head.querySelectorAll("[data-seo]").forEach((el) => el.remove());
    const tpl = document.createElement("template");
    tpl.innerHTML = buildHeadTags(props).join("");
    // Scripts created via innerHTML never execute; JSON-LD is inert data anyway.
    document.head.append(tpl.content);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return null;
}
