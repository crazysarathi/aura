import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";

export const RadioGroup = RadioGroupPrimitive.Root;

export function RadioItem({ value, label, id, className }: { value: string; label: string; id: string; className?: string }) {
  return (
    <label htmlFor={id} className={cn("flex cursor-pointer items-center gap-2.5 text-[15px] text-ink", className)}>
      <RadioGroupPrimitive.Item
        id={id}
        value={value}
        className="size-5 shrink-0 rounded-full border border-indigo-900/40 bg-white data-[state=checked]:border-copper-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper-200"
      >
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
          <span className="block size-2.5 rounded-full bg-copper-600" />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
      {label}
    </label>
  );
}

/** 0–10 scale rendered as a segmented control (mirrors the old form's rating rows). */
export function ScaleItems({ name, max = 10, maxLabel, extra }: { name: string; max?: number; maxLabel: string; extra?: string }) {
  const values = Array.from({ length: max + 1 }, (_, i) => String(i));
  return (
    <div className="grid grid-cols-6 gap-1.5 sm:flex sm:flex-wrap sm:items-center">
      {values.map((v) => (
        <RadioGroupPrimitive.Item
          key={v}
          id={`${name}-${v}`}
          value={v}
          aria-label={v === String(max) ? `${v} – ${maxLabel}` : v}
          className="h-10 min-w-0 rounded-md border sm:h-9 sm:min-w-9 border-line bg-white px-2 text-sm font-medium text-ink transition-colors hover:border-copper-400 data-[state=checked]:border-copper-600 data-[state=checked]:bg-copper-700 data-[state=checked]:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper-200"
        >
          {v}
        </RadioGroupPrimitive.Item>
      ))}
      {extra && (
        <RadioGroupPrimitive.Item
          id={`${name}-${extra}`}
          value={extra}
          className="h-9 rounded-md border border-line bg-white px-3 text-sm font-medium text-ink transition-colors hover:border-copper-400 data-[state=checked]:border-copper-600 data-[state=checked]:bg-copper-700 data-[state=checked]:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper-200"
        >
          {extra}
        </RadioGroupPrimitive.Item>
      )}
      <span className="col-span-full mt-1 text-xs text-ink-muted sm:ml-2 sm:mt-0">0 = lowest · {max} = {maxLabel}</span>
    </div>
  );
}
