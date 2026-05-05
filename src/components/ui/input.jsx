// import * as React from "react";
// import { cn } from "../../lib/utils";

// const Input = React.forwardRef(({ className, type, ...props }, ref) => (
//   <input
//     type={type}
//     className={cn("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50", className)}
//     ref={ref}
//     {...props}
//   />
// ));
// Input.displayName = "Input";
// export { Input };
import * as React from "react";
import { cn } from "../../lib/utils";
import {
  ELECTRIC_CYAN,
  ENTERPRISE_CHARCOAL,
  INFRASTRUCTURE_NAVY,
  CLEAN_WHITE,
  LIGHT_CANVAS_GREY,
} from "../../app/assets/constants/zevgrid-colors";

// ─── Inline style tokens ──────────────────────────────────────────────────────

const inputStyles = {
  base: {
    backgroundColor: CLEAN_WHITE,
    border: `1.5px solid ${LIGHT_CANVAS_GREY}`,
    color: ENTERPRISE_CHARCOAL,
    outline: "none",
    transition: "border-color 150ms ease, box-shadow 150ms ease",
    width: "100%",
  },
  focus: {
    borderColor: ELECTRIC_CYAN,
    boxShadow: `0 0 0 3px ${ELECTRIC_CYAN}26`,  // cyan at ~15% opacity
  },
  disabled: {
    opacity: 0.5,
    cursor: "not-allowed",
    backgroundColor: LIGHT_CANVAS_GREY,
  },
  placeholder: ENTERPRISE_CHARCOAL + "66", // 40% opacity charcoal
};

// ─── Component ────────────────────────────────────────────────────────────────

const Input = React.forwardRef(({ className, type, style, disabled, ...props }, ref) => {
  const [focused, setFocused] = React.useState(false);

  return (
    <input
      type={type}
      ref={ref}
      disabled={disabled}
      className={cn(
        "flex h-10 rounded-md px-3 py-2 text-sm",
        className
      )}
      style={{
        ...inputStyles.base,
        ...(focused ? inputStyles.focus : {}),
        ...(disabled ? inputStyles.disabled : {}),
        // Placeholder colour via CSS custom property
        "--placeholder-color": inputStyles.placeholder,
        ...style,
      }}
      onFocus={(e) => {
        setFocused(true);
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        setFocused(false);
        props.onBlur?.(e);
      }}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };