// import * as React from "react";
// import * as LabelPrimitive from "@radix-ui/react-label";
// import { cn } from "../../lib/utils";

// const Label = React.forwardRef(({ className, ...props }, ref) => (
//   <LabelPrimitive.Root
//     ref={ref}
//     className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)}
//     {...props}
//   />
// ));
// Label.displayName = LabelPrimitive.Root.displayName;
// export { Label };
import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "../../lib/utils";
import {
  ENTERPRISE_CHARCOAL,
  INFRASTRUCTURE_NAVY,
  ELECTRIC_CYAN,
} from "../../app/assets/constants/zevgrid-colors";

// ─── Inline style tokens ──────────────────────────────────────────────────────

const labelStyles = {
  base: {
    color: INFRASTRUCTURE_NAVY,
    fontSize: "0.8125rem",   // 13px — slightly tighter than default 14px
    fontWeight: 600,
    letterSpacing: "0.02em",
    lineHeight: 1,
    userSelect: "none",
    transition: "color 120ms ease",
    cursor: "default",
  },
  disabled: {
    color: `${ENTERPRISE_CHARCOAL}70`,  // ~44% opacity charcoal
    cursor: "not-allowed",
  },
  required: {
    // Applied to the asterisk span rendered via ::after equivalent
    color: ELECTRIC_CYAN,
    marginLeft: "3px",
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

const Label = React.forwardRef(
  ({ className, style, required, children, ...props }, ref) => (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(
        // peer-disabled still works via Tailwind for pairing with Input
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      style={{ ...labelStyles.base, ...style }}
      {...props}
    >
      {children}
      {required && (
        <span aria-hidden="true" style={labelStyles.required}>
          *
        </span>
      )}
    </LabelPrimitive.Root>
  )
);

Label.displayName = LabelPrimitive.Root.displayName;

export { Label };