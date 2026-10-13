import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, Fieldset } from "@/components/ui/field";
import { Input, NativeSelect, Textarea } from "@/components/ui/input";
import { RadioGroup, RadioItem, ScaleItems } from "@/components/ui/radio-group";
import { CheckboxItem } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FormStatus } from "./FormStatus";
import { feedbackDoctorOptions } from "@/data/doctors";
import { submitForm, type SubmitResult } from "@/lib/forms";
import { nameSchema, phoneSchema } from "@/lib/validation";

/**
 * Faithful rebuild of the WPForms patient feedback form (id 5505) from /feedback/:
 * same sections, questions, scales (0–10) and options as the old site.
 */
const yesNo = z.enum(["Yes", "No"], { message: "Please choose an option" });
const yesNoNa = z.enum(["Yes", "No", "NA"], { message: "Please choose an option" });
const scale = z.string().min(1, "Please pick a rating");
const optionalScale = z.string().optional();

const schema = z.object({
  fullName: nameSchema,
  phone: phoneSchema,
  gender: z.enum(["Male", "Female", "Others"], { message: "Please select your gender" }),
  doctor: z.enum(feedbackDoctorOptions, { message: "Please select the doctor you consulted" }),
  appointmentType: z.array(z.enum(["New Consultation", "Review", "Walk-In"])).min(1, "Select at least one"),
  waitingTime: z.string().trim().min(1, "Please tell us how long you waited").max(60),
  waitingAcceptable: yesNo,
  cleanlinessClinic: optionalScale,
  cleanlinessRestroom: optionalScale,
  facilities: optionalScale,
  staffFriendliness: scale,
  staffHelpfulness: scale,
  staffSatisfactory: yesNo,
  providerCommunication: scale,
  concernsAddressed: yesNo,
  treatmentExplained: yesNoNa,
  treatmentComfortable: yesNoNa,
  schedulingEase: scale,
  schedulingTimely: yesNo,
  overallSatisfaction: scale,
  recommend: scale,
  suggestions: z.string().trim().max(1500, "Please keep it under 1500 characters").optional(),
  website: z.string().max(0).optional(),
});
type Values = z.infer<typeof schema>;

const appointmentTypes = ["New Consultation", "Review", "Walk-In"] as const;

function YesNoField({ name, label, control, error, options = ["Yes", "No"] }: { name: keyof Values; label: string; control: ReturnType<typeof useForm<Values>>["control"]; error?: string; options?: readonly string[] }) {
  return (
    <div>
      <Label required id={`${name}-label`}>
        {label}
      </Label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <RadioGroup aria-labelledby={`${name}-label`} aria-invalid={!!error} value={(field.value as string) ?? ""} onValueChange={field.onChange} className="flex flex-wrap gap-5">
            {options.map((o) => (
              <RadioItem key={o} id={`${name}-${o}`} value={o} label={o} />
            ))}
          </RadioGroup>
        )}
      />
      {error && (
        <p role="alert" className="mt-1 text-xs font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

function ScaleField({ name, label, control, error, required, maxLabel, extra }: { name: keyof Values; label: string; control: ReturnType<typeof useForm<Values>>["control"]; error?: string; required?: boolean; maxLabel: string; extra?: string }) {
  return (
    <div>
      <Label required={required} id={`${name}-label`}>
        {label}
      </Label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <RadioGroup aria-labelledby={`${name}-label`} aria-invalid={!!error} value={(field.value as string) ?? ""} onValueChange={field.onChange}>
            <ScaleItems name={name} maxLabel={maxLabel} extra={extra} />
          </RadioGroup>
        )}
      />
      {error && (
        <p role="alert" className="mt-1 text-xs font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

export function FeedbackForm() {
  const [result, setResult] = useState<SubmitResult | null>(null);
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { appointmentType: [], suggestions: "", website: "" } });

  const onSubmit = async (values: Values) => {
    if (values.website) return;
    const { website: _honeypot, ...payload } = values;
    void _honeypot;
    const r = await submitForm("feedback", payload);
    setResult(r);
    if (r.ok) {
      toast.success("Thank you for your feedback.");
      reset();
    } else if (r.reason !== "not-configured") toast.error(r.message);
  };

  if (result) {
    return <FormStatus result={result} onReset={() => setResult(null)} successTitle="Thank you for your feedback" successText="Your responses help us keep improving the care we provide." />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
      <Fieldset legend="Personal Information">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="fullName" label="Full Name" required error={errors.fullName?.message}>
            <Input id="fullName" autoComplete="name" aria-invalid={!!errors.fullName} {...register("fullName")} />
          </Field>
          <Field id="phone" label="Phone" required error={errors.phone?.message}>
            <Input id="phone" type="tel" inputMode="tel" autoComplete="tel" aria-invalid={!!errors.phone} {...register("phone")} />
          </Field>
          <Field id="gender" label="Gender" required error={errors.gender?.message}>
            <NativeSelect id="gender" defaultValue="" aria-invalid={!!errors.gender} {...register("gender")}>
              <option value="" disabled>
                Select
              </option>
              <option>Male</option>
              <option>Female</option>
              <option>Others</option>
            </NativeSelect>
          </Field>
        </div>
      </Fieldset>

      <Fieldset legend="Appointment Information">
        <Field id="doctor" label="Name of the Doctor" required error={errors.doctor?.message}>
          <NativeSelect id="doctor" defaultValue="" aria-invalid={!!errors.doctor} {...register("doctor")}>
            <option value="" disabled>
              Select the doctor you consulted
            </option>
            {feedbackDoctorOptions.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </NativeSelect>
        </Field>
        <div>
          <Label required id="appointmentType-label">
            Type of appointment
          </Label>
          <Controller
            control={control}
            name="appointmentType"
            render={({ field }) => (
              <div role="group" aria-labelledby="appointmentType-label" className="flex flex-wrap gap-5">
                {appointmentTypes.map((t) => (
                  <CheckboxItem
                    key={t}
                    id={`appointmentType-${t}`}
                    label={t}
                    checked={field.value.includes(t)}
                    onCheckedChange={(v) => field.onChange(v ? [...field.value, t] : field.value.filter((x) => x !== t))}
                  />
                ))}
              </div>
            )}
          />
          {errors.appointmentType && (
            <p role="alert" className="mt-1 text-xs font-medium text-danger">
              {errors.appointmentType.message}
            </p>
          )}
        </div>
      </Fieldset>

      <Fieldset legend="Waiting Time">
        <Field id="waitingTime" label="How long did you have to wait before being seen?" required error={errors.waitingTime?.message}>
          <Input id="waitingTime" placeholder="e.g. 15 minutes" aria-invalid={!!errors.waitingTime} {...register("waitingTime")} />
        </Field>
        <YesNoField name="waitingAcceptable" label="Was the waiting time acceptable to you?" control={control} error={errors.waitingAcceptable?.message} />
      </Fieldset>

      <Fieldset legend="Overall Cleanliness">
        <ScaleField name="cleanlinessClinic" label="Rate the cleanliness of the clinic." control={control} maxLabel="Very Good" />
        <ScaleField name="cleanlinessRestroom" label="Rate the cleanliness of the restroom." control={control} maxLabel="Very Clean" extra="NA" />
        <ScaleField name="facilities" label="Rate the facilities and amenities available in the clinic." control={control} maxLabel="Very Good" />
      </Fieldset>

      <Fieldset legend="Staff & Reception">
        <ScaleField name="staffFriendliness" label="Rate the friendliness of the clinic's staff and reception." required control={control} error={errors.staffFriendliness?.message} maxLabel="Very Friendly" />
        <ScaleField name="staffHelpfulness" label="Rate the helpfulness of the clinic." required control={control} error={errors.staffHelpfulness?.message} maxLabel="Very Helpful" />
        <YesNoField name="staffSatisfactory" label="Were your interactions with the staff satisfactory?" control={control} error={errors.staffSatisfactory?.message} />
      </Fieldset>

      <Fieldset legend="Consultation">
        <ScaleField name="providerCommunication" label="How well did the healthcare provider communicate with you?" required control={control} error={errors.providerCommunication?.message} maxLabel="Very Well" />
        <YesNoField name="concernsAddressed" label="Were your questions and concerns addressed?" control={control} error={errors.concernsAddressed?.message} />
      </Fieldset>

      <Fieldset legend="Treatment / Procedure">
        <YesNoField name="treatmentExplained" label="Was the treatment or procedure explained to you in a way that you could understand?" control={control} error={errors.treatmentExplained?.message} options={["Yes", "No", "NA"]} />
        <YesNoField name="treatmentComfortable" label="Did you feel comfortable during the treatment or procedure?" control={control} error={errors.treatmentComfortable?.message} options={["Yes", "No", "NA"]} />
      </Fieldset>

      <Fieldset legend="Appointment Scheduling">
        <ScaleField name="schedulingEase" label="How easy was it to schedule an appointment?" required control={control} error={errors.schedulingEase?.message} maxLabel="Very Easy" />
        <YesNoField name="schedulingTimely" label="Were you able to get an appointment within a reasonable timeframe?" control={control} error={errors.schedulingTimely?.message} />
      </Fieldset>

      <Fieldset legend="Overall Satisfaction">
        <ScaleField name="overallSatisfaction" label="Overall Satisfaction" required control={control} error={errors.overallSatisfaction?.message} maxLabel="Very Satisfied" />
        <ScaleField name="recommend" label="How likely will you recommend Aura Cosmetique to others?" required control={control} error={errors.recommend?.message} maxLabel="Very Likely" />
      </Fieldset>

      <Fieldset legend="Suggestions">
        <Field id="suggestions" label="Any specific suggestions or comments on how the clinic can improve its services?" error={errors.suggestions?.message}>
          <Textarea id="suggestions" rows={5} aria-invalid={!!errors.suggestions} {...register("suggestions")} />
        </Field>
      </Fieldset>

      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="fb-website">Leave this field empty</label>
        <input id="fb-website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      {Object.keys(errors).length > 0 && (
        <p role="alert" className="text-sm font-medium text-danger">
          Please check the highlighted fields above.
        </p>
      )}
      <Button type="submit" variant="accent" size="lg" disabled={isSubmitting}>
        {isSubmitting ? <Loader2 className="animate-spin" aria-hidden="true" /> : <Send aria-hidden="true" />}
        {isSubmitting ? "Submitting…" : "Submit feedback"}
      </Button>
    </form>
  );
}
