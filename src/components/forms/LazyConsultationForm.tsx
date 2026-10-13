import { lazy, Suspense, type ComponentProps } from "react";

const ConsultationForm = lazy(() => import("./ConsultationForm").then((m) => ({ default: m.ConsultationForm })));

function FormSkeleton() {
  return (
    <div className="animate-pulse space-y-5" aria-busy="true" aria-label="Loading form">
      <div className="grid gap-5 sm:grid-cols-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i}>
            <div className="mb-2 h-3 w-20 rounded bg-sand" />
            <div className="h-11 rounded-md bg-sand/70" />
          </div>
        ))}
      </div>
      <div className="h-12 w-44 rounded-full bg-sand" />
    </div>
  );
}

/** Defers the form (react-hook-form + zod) so it never competes with above-the-fold rendering. */
export function LazyConsultationForm(props: ComponentProps<typeof ConsultationForm>) {
  return (
    <Suspense fallback={<FormSkeleton />}>
      <ConsultationForm {...props} />
    </Suspense>
  );
}
