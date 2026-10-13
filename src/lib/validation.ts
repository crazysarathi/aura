import { z } from "zod";

/** Indian mobile/landline numbers with optional +91 / 0 prefix, 10 digits, or landline with STD code. */
export const phoneSchema = z
  .string()
  .trim()
  .min(1, "Phone number is required")
  .transform((v) => v.replace(/[\s\-().]/g, ""))
  .refine((v) => /^(\+91|0)?[6-9]\d{9}$/.test(v) || /^(\+91|0)?\d{3,5}\d{6,8}$/.test(v), "Enter a valid phone number, e.g. 93847 48884");

export const nameSchema = z.string().trim().min(2, "Please enter your full name").max(80, "Name is too long");

export const emailSchema = z.string().trim().min(1, "Email is required").email("Enter a valid email address").max(120);
