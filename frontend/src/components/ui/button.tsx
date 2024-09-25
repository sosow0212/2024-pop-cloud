import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import cn from "./cn";

const buttonVariants = cva(
  "text-sm focus-visible:ring-ring inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        none: "",
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 rounded-md shadow",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-md shadow-sm",
        outline:
          "border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md border shadow-sm",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md shadow-sm",
        ghost: "hover:bg-accent hover:text-accent-foreground rounded-md",
        link: "text-primary rounded-md underline-offset-4 hover:underline",
      },
      size: {
        default: "size-50",
        sm: "text-xs h-8 rounded-md px-3",
        lg: "h-10 rounded-md px-8",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
