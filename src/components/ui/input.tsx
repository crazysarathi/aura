import * as React from "react";
import { cn } from "@/lib/utils";

const fieldClass =
  "flex w-full rounded-md border border-line bg-white px-3.5 text-[15px] text-ink shadow-[inset_0_1px_2px_rgb(29_26_46/0.04)] placeholder:text-ink-muted/60 transition-colors focus-visible:border-copper-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper-200 aria-invalid:border-danger aria-invalid:ring-danger/20 disabled:cursor-not-allowed disabled:opacity-60";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(fieldClass, "h-11", className)} {...props} />;
}

export function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(fieldClass, "min-h-28 py-3 leading-relaxed", className)} {...props} />;
}

export function NativeSelect({ className, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select className={cn(fieldClass, "h-11 appearance-none pr-10", className)} {...props}>
        {children}
      </select>
      <svg aria-hidden="true" viewBox="0 0 20 20" className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-muted">
        <path d="M5 7.5 10 12.5 15 7.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export { fieldClass };
