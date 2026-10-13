import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

export function CheckboxItem({ id, label, checked, onCheckedChange }: { id: string; label: string; checked: boolean; onCheckedChange: (v: boolean) => void }) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-center gap-2.5 text-[15px] text-ink">
      <CheckboxPrimitive.Root
        id={id}
        checked={checked}
        onCheckedChange={(v) => onCheckedChange(v === true)}
        className="flex size-5 shrink-0 items-center justify-center rounded border border-indigo-900/40 bg-white data-[state=checked]:border-copper-600 data-[state=checked]:bg-copper-700 data-[state=checked]:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper-200"
      >
        <CheckboxPrimitive.Indicator>
          <Check className="size-3.5" strokeWidth={3} />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label}
    </label>
  );
}
