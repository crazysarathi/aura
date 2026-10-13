import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-sans text-sm font-semibold tracking-wide transition-[background-color,color,border-color,box-shadow,transform] duration-200 ease-out-soft disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-4 [&_svg]:shrink-0 active:translate-y-px",
  {
    variants: {
      variant: {
        primary: "bg-indigo-900 text-white shadow-soft hover:bg-indigo-800",
        accent: "bg-copper-700 text-white shadow-soft hover:bg-copper-800",
        outline: "border border-indigo-900/25 bg-transparent text-indigo-900 hover:border-indigo-900 hover:bg-indigo-50",
        ghost: "text-indigo-900 hover:bg-indigo-50",
        light: "bg-white text-indigo-900 shadow-soft hover:bg-cream",
        link: "h-auto rounded-none px-0 text-copper-700 underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-[13px]",
        md: "h-11 px-6",
        lg: "h-12 px-7 text-[15px]",
        icon: "size-10",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({ className, variant, size, asChild = false, type, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} type={asChild ? undefined : (type ?? "button")} {...props} />;
}

