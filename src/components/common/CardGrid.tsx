import { cn } from "@/lib/utils";

/**
 * Column presets for the centred `card-grid` utility. Class strings are literal so
 * Tailwind can see them at build time.
 */
const presets = {
  /** 5 service cards: 1 → 2 → 3 → 5 columns */
  services: "[--cols:1] sm:[--cols:2] lg:[--cols:3] xl:[--cols:5]",
  /** Doctors: 2 compact columns even on phones */
  doctors: "[--cols:2] [--gap:0.875rem] sm:[--cols:3] sm:[--gap:1.5rem] xl:[--cols:5]",
  /** Up to 4 related items */
  four: "[--cols:1] sm:[--cols:2] lg:[--cols:4]",
  /** Up to 4 doctors */
  doctorsFour: "[--cols:2] [--gap:0.875rem] sm:[--gap:1.5rem] lg:[--cols:4]",
  /** Blog and general three-up */
  three: "[--cols:1] sm:[--cols:2] lg:[--cols:3]",
} as const;

export function CardGrid({ preset, className, children }: { preset: keyof typeof presets; className?: string; children: React.ReactNode }) {
  return <ul className={cn("card-grid", presets[preset], className)}>{children}</ul>;
}
