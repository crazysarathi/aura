import { site } from "@/data/site";

export function MapEmbed({ className }: { className?: string }) {
  return (
    <div className={className}>
      <iframe
        src={site.map.embed}
        title="Map showing the location of Aura Cosmetique by SKS, Brindavan Road, Salem"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="h-full min-h-72 w-full rounded-xl border border-line bg-sand"
      />
      <p className="mt-2 text-xs text-ink-muted">
        <a href={site.map.link} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-copper-700">
          Open in Google Maps
        </a>
      </p>
    </div>
  );
}
