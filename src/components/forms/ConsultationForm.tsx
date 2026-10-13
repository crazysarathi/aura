import { useState } from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input, NativeSelect, Textarea } from "@/components/ui/input";
import { FormStatus } from "./FormStatus";
import { services } from "@/data/services";
import { submitForm, type SubmitResult } from "@/lib/forms";
import { emailSchema, nameSchema, phoneSchema } from "@/lib/validation";
import { cn } from "@/lib/utils";

/**
 * Rebuild of the WPForms "Book a consultation" form (id 5545: Name, Email, Phone).
 * Adds an optional service of interest and message; keeps medical data collection minimal.
 */
const schema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  service: z.string().optional(),
  message: z.string().trim().max(600, "Please keep your message under 600 characters").optional(),
  /** Honeypot: must stay empty. */
  website: z.string().max(0).optional(),
});
type Values = z.infer<typeof schema>;

export function ConsultationForm({ compact = false, defaultService, className, idPrefix = "consult" }: { compact?: boolean; defaultService?: string; className?: string; idPrefix?: string }) {
  const [result, setResult] = useState<SubmitResult | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { service: defaultService ?? "", message: "", website: "" } });

  const onSubmit = async (values: Values) => {
    if (values.website) return; // bot
    const { website: _honeypot, ...payload } = values;
    void _honeypot;
    const r = await submitForm("consultation", payload);
    setResult(r);
    if (r.ok) {
      toast.success("Request sent. We'll be in touch shortly.");
      reset();
    } else if (r.reason !== "not-configured") {
      toast.error(r.message);
    }
  };

  if (result) {
    return (
      <div className={className}>
        <FormStatus result={result} onReset={() => setResult(null)} />
      </div>
    );
  }

  const id = (n: string) => `${idPrefix}-${n}`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className={cn("space-y-5", className)} aria-describedby={`${idPrefix}-note`}>
      <div className={cn("grid gap-5", !compact && "sm:grid-cols-2")}>
        <Field id={id("name")} label="Name" required error={errors.name?.message}>
          <Input id={id("name")} autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? `${id("name")}-error` : undefined} {...register("name")} />
        </Field>
        <Field id={id("phone")} label="Phone" required error={errors.phone?.message}>
          <Input id={id("phone")} type="tel" inputMode="tel" autoComplete="tel" placeholder="+91 93847 48884" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? `${id("phone")}-error` : undefined} {...register("phone")} />
        </Field>
        <Field id={id("email")} label="Email" required error={errors.email?.message} className={cn(compact && "sm:col-span-1")}>
          <Input id={id("email")} type="email" inputMode="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? `${id("email")}-error` : undefined} {...register("email")} />
        </Field>
        <Field id={id("service")} label="Service of interest" error={errors.service?.message}>
          <NativeSelect id={id("service")} {...register("service")}>
            <option value="">Not sure yet</option>
            {services.map((s) => (
              <option key={s.slug} value={s.name}>
                {s.name}
              </option>
            ))}
          </NativeSelect>
        </Field>
      </div>
      {!compact && (
        <Field id={id("message")} label="Message" error={errors.message?.message} hint="Optional. Please don't include sensitive medical details here; our doctors will discuss them with you in person.">
          <Textarea id={id("message")} rows={4} aria-invalid={!!errors.message} aria-describedby={`${id("message")}-hint`} {...register("message")} />
        </Field>
      )}
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={id("website")}>Leave this field empty</label>
        <input id={id("website")} type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" variant="accent" size="lg" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="animate-spin" aria-hidden="true" /> : <Send aria-hidden="true" />}
          {isSubmitting ? "Sending…" : "Request a callback"}
        </Button>
        <p id={`${idPrefix}-note`} className="text-xs text-ink-muted">
          By submitting you agree to our{" "}
          <Link to="/privacy-policy/" className="underline underline-offset-4 hover:text-copper-700">
            privacy policy
          </Link>
          .
        </p>
      </div>
    </form>
  );
}
