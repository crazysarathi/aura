import { site } from "@/data/site";
import { cn } from "@/lib/utils";

/* Brand glyphs inline: lucide-react no longer ships brand icons. */
const icons: Record<string, React.ReactNode> = {
  Facebook: <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.6 1.6-1.6h1.7V4.4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.2v2.3H7.4V14h2.8v8h3.3z" />,
  Twitter: <path d="M17.5 3h3l-6.6 7.6L21.7 21h-6.1l-4.8-6.2L5.3 21h-3l7.1-8.1L2 3h6.2l4.3 5.7L17.5 3zm-1.1 16.2h1.7L7.3 4.7H5.5l10.9 14.5z" />,
  Instagram: (
    <>
      <path d="M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
      <circle cx="16.9" cy="7.1" r="1.1" />
      <path d="M12 3.6c2.7 0 3.1 0 4.1.1 1 0 1.5.2 1.9.3.5.2.8.4 1.2.8.4.4.6.7.8 1.2.1.4.3.9.3 1.9.1 1.1.1 1.4.1 4.1s0 3.1-.1 4.1c0 1-.2 1.5-.3 1.9-.2.5-.4.8-.8 1.2-.4.4-.7.6-1.2.8-.4.1-.9.3-1.9.3-1.1.1-1.4.1-4.1.1s-3.1 0-4.1-.1c-1 0-1.5-.2-1.9-.3-.5-.2-.8-.4-1.2-.8-.4-.4-.6-.7-.8-1.2-.1-.4-.3-.9-.3-1.9-.1-1.1-.1-1.4-.1-4.1s0-3.1.1-4.1c0-1 .2-1.5.3-1.9.2-.5.4-.8.8-1.2.4-.4.7-.6 1.2-.8.4-.1.9-.3 1.9-.3 1-.1 1.4-.1 4.1-.1M12 2c-2.7 0-3.1 0-4.2.1-1.1 0-1.8.2-2.4.5-.7.2-1.2.6-1.8 1.1-.5.6-.9 1.1-1.1 1.8-.3.6-.5 1.3-.5 2.4C2 9 2 9.3 2 12s0 3.1.1 4.2c0 1.1.2 1.8.5 2.4.2.7.6 1.2 1.1 1.8.6.5 1.1.9 1.8 1.1.6.3 1.3.5 2.4.5 1 .1 1.4.1 4.1.1s3.1 0 4.2-.1c1.1 0 1.8-.2 2.4-.5.7-.2 1.2-.6 1.8-1.1.5-.6.9-1.1 1.1-1.8.3-.6.5-1.3.5-2.4.1-1.1.1-1.4.1-4.2s0-3.1-.1-4.2c0-1.1-.2-1.8-.5-2.4-.2-.7-.6-1.2-1.1-1.8-.6-.5-1.1-.9-1.8-1.1-.6-.3-1.3-.5-2.4-.5C15.1 2 14.7 2 12 2z" />
    </>
  ),
};

export function SocialLinks({ className, tone = "default" }: { className?: string; tone?: "default" | "light" }) {
  return (
    <ul className={cn("flex items-center gap-2", className)} aria-label="Social media">
      {site.social.map((s) => (
        <li key={s.href}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${site.name} on ${s.label}`}
            className={cn(
              "flex size-9 items-center justify-center rounded-full border transition-colors",
              tone === "light" ? "border-white/30 text-white hover:bg-white/10" : "border-line text-indigo-900 hover:border-copper-400 hover:text-copper-700",
            )}
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
              {icons[s.label]}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
