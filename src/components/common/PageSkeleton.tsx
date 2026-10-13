export function PageSkeleton() {
  return (
    <div className="container-x animate-pulse py-16" aria-busy="true" aria-live="polite">
      <div className="h-3 w-24 rounded bg-sand" />
      <div className="mt-4 h-10 w-2/3 max-w-xl rounded bg-sand" />
      <div className="mt-6 space-y-3">
        <div className="h-4 w-full max-w-3xl rounded bg-sand/80" />
        <div className="h-4 w-5/6 max-w-2xl rounded bg-sand/80" />
        <div className="h-4 w-4/6 max-w-xl rounded bg-sand/80" />
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="aspect-[4/3] rounded-lg bg-sand/70" />
        ))}
      </div>
      <span className="sr-only">Loading page…</span>
    </div>
  );
}
