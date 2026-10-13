import * as React from "react";
import { Label } from "./label";
import { cn } from "@/lib/utils";

interface FieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}

/** Label + control + error wrapper. The control must use `id` and `aria-describedby={`${id}-error`}` where relevant. */
export function Field({ id, label, required, error, hint, className, children }: FieldProps) {
  return (
    <div className={cn("space-y-1", className)}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-ink-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

export function Fieldset({ legend, description, children, className }: { legend: string; description?: string; children: React.ReactNode; className?: string }) {
  return (
    <fieldset className={cn("min-w-0 rounded-lg border border-line bg-white p-4 sm:p-6", className)}>
      <legend className="px-2 font-display text-base text-indigo-900 sm:text-lg">{legend}</legend>
      {description && <p className="mb-4 text-sm text-ink-muted">{description}</p>}
      <div className="space-y-5">{children}</div>
    </fieldset>
  );
}
