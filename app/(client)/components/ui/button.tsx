import * as React from "react";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background ease-in transition-colors duration-200",
  {
    variants: {
      variant: {
        default:
          "bg-primary border border-primary/30  text-background hover:bg-background hover:text-primary",
        outline:
          "bg-transparent border border-primary/30  text-primary hover:bg-primary hover:text-background",
        secondaryOutline:
          "bg-transparent border border-white   text-white hover:bg-white/20 ",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        white: "bg-white text-primary hover:bg-primary/90",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-theme-blue",
        blue: "bg-theme-blue border text-white hover:bg-background hover:text-theme-blue hover:border-theme-blue",
        blueOutline:
          "border-theme-blue text-theme-blue border hover:bg-theme-blue hover:text-white ",
        pink: "bg-theme-pink border text-white hover:bg-background hover:text-theme-pink hover:border-theme-pink ",
        pinkOutline:
          "border-theme-pink text-theme-pink border hover:bg-theme-pink hover:text-white",
      },
      size: {
        default: "h-10 py-2 px-4",
        xsm: "h-6 px-2 rounded-full",
        sm: "h-9 px-3 rounded-full",
        lg: "h-11 px-8 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
