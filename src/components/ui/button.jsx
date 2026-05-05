// import * as React from "react";
// import { Slot } from "@radix-ui/react-slot";
// import { cva } from "class-variance-authority";
// import { cn } from "../../lib/utils";

// const buttonVariants = cva(
//   "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none",
//   {
//     variants: {
//       variant: {
//         default:  "bg-primary text-primary-foreground hover:bg-primary/90",
//         outline:  "border border-input hover:bg-accent hover:text-accent-foreground",
//         ghost:    "hover:bg-accent hover:text-accent-foreground",
//         destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
//       },
//       size: {
//         default: "h-10 py-2 px-4",
//         sm:      "h-9 px-3",
//         lg:      "h-11 px-8",
//         icon:    "h-10 w-10",
//       },
//     },
//     defaultVariants: { variant: "default", size: "default" },
//   }
// );

// const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
//   const Comp = asChild ? Slot : "button";
//   return <Comp className={cn(buttonVariants({ variant, size }), className)} ref={ref} {...props} />;
// });
// Button.displayName = "Button";

//  export { Button, buttonVariants };
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

import {
  ELECTRIC_CYAN,
  ENTERPRISE_CHARCOAL,
  INFRASTRUCTURE_NAVY,
  CLEAN_WHITE,
  LIGHT_CANVAS_GREY,
  CRITICAL_RED,
} from "../../app/assets/constants/zevgrid-colors";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        // ZevGrid Primary: Cyan background, Navy text
        default:  "bg-[var(--cyan)] text-[var(--navy)] hover:opacity-90",
        // ZevGrid Outline: Charcoal borders and text, Grey hover
        outline:  "border border-[var(--charcoal-light)] text-[var(--charcoal)] hover:bg-[var(--grey)]",
        // ZevGrid Ghost: Invisible until hover
        ghost:    "text-[var(--charcoal)] hover:bg-[var(--grey)]",
        // ZevGrid Destructive: Red background for critical actions
        destructive: "bg-[var(--red)] text-[var(--white)] hover:opacity-90",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm:      "h-9 px-3",
        lg:      "h-11 px-8",
        icon:    "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, style, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  // Map constants to CSS variables for clean Tailwind integration
  const themeStyles = {
    "--cyan": ELECTRIC_CYAN,
    "--navy": INFRASTRUCTURE_NAVY,
    "--charcoal": ENTERPRISE_CHARCOAL,
    "--charcoal-light": `${ENTERPRISE_CHARCOAL}40`, // ~25% opacity for borders
    "--grey": LIGHT_CANVAS_GREY,
    "--red": CRITICAL_RED,
    "--white": CLEAN_WHITE,
    ...style, // Preserve any inline styles passed down to the button
  };

  return (
    <Comp 
      className={cn(buttonVariants({ variant, size }), className)} 
      style={themeStyles} 
      ref={ref} 
      {...props} 
    />
  );
});
Button.displayName = "Button";

export { Button, buttonVariants };
