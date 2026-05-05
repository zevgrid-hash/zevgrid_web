// import * as React from "react";
// import * as SelectPrimitive from "@radix-ui/react-select";
// import { Check, ChevronDown } from "lucide-react";
// import { cn } from "../../lib/utils";

// const Select = SelectPrimitive.Root;
// const SelectGroup = SelectPrimitive.Group;
// const SelectValue = SelectPrimitive.Value;

// const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
//   <SelectPrimitive.Trigger ref={ref} className={cn("flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none disabled:opacity-50", className)} {...props}>
//     {children}<SelectPrimitive.Icon asChild><ChevronDown className="h-4 w-4 opacity-50" /></SelectPrimitive.Icon>
//   </SelectPrimitive.Trigger>
// ));
// SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

// const SelectContent = React.forwardRef(({ className, children, ...props }, ref) => (
//   <SelectPrimitive.Portal>
//     <SelectPrimitive.Content ref={ref} className={cn("relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md", className)} {...props}>
//       <SelectPrimitive.Viewport className="p-1">{children}</SelectPrimitive.Viewport>
//     </SelectPrimitive.Content>
//   </SelectPrimitive.Portal>
// ));
// SelectContent.displayName = SelectPrimitive.Content.displayName;

// const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => (
//   <SelectPrimitive.Item ref={ref} className={cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground", className)} {...props}>
//     <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
//       <SelectPrimitive.ItemIndicator><Check className="h-4 w-4" /></SelectPrimitive.ItemIndicator>
//     </span>
//     <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
//   </SelectPrimitive.Item>
// ));
// SelectItem.displayName = SelectPrimitive.Item.displayName;

// const SelectLabel = React.forwardRef(({ className, ...props }, ref) => (
//   <SelectPrimitive.Label ref={ref} className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)} {...props} />
// ));
// SelectLabel.displayName = SelectPrimitive.Label.displayName;

// export { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectItem, SelectLabel };
import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";
import {
  ELECTRIC_CYAN,
  ENTERPRISE_CHARCOAL,
  INFRASTRUCTURE_NAVY,
  CLEAN_WHITE,
  LIGHT_CANVAS_GREY,
} from "../../app/assets/constants/zevgrid-colors";


// ─── Style tokens ─────────────────────────────────────────────────────────────

const selectStyles = {
  trigger: {
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
      boxShadow: `0 0 0 3px ${ELECTRIC_CYAN}26`,
    },
    disabled: {
      opacity: 0.5,
      cursor: "not-allowed",
      backgroundColor: LIGHT_CANVAS_GREY,
    },
  },
  content: {
    backgroundColor: CLEAN_WHITE,
    border: `1px solid ${LIGHT_CANVAS_GREY}`,
    color: ENTERPRISE_CHARCOAL,
    boxShadow: `0 4px 16px 0 ${INFRASTRUCTURE_NAVY}26, 0 1.5px 4px 0 ${INFRASTRUCTURE_NAVY}14`,
  },
  label: {
    color: INFRASTRUCTURE_NAVY,
    borderBottom: `1px solid ${LIGHT_CANVAS_GREY}`,
    marginBottom: "2px",
    paddingBottom: "6px",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    fontSize: "0.7rem",
    fontWeight: 700,
  },
  item: {
    base: {
      color: ENTERPRISE_CHARCOAL,
      backgroundColor: "transparent",
      borderLeft: "2px solid transparent",
      transition: "all 120ms ease",
      cursor: "pointer",
    },
    focus: {
      color: ELECTRIC_CYAN,
      backgroundColor: `${INFRASTRUCTURE_NAVY}08`,
      borderLeftColor: ELECTRIC_CYAN,
    },
  },
  checkIcon: {
    color: ELECTRIC_CYAN,
  },
  chevron: {
    color: `${ENTERPRISE_CHARCOAL}80`,
    transition: "color 150ms ease",
  },
};

// ─── Components ───────────────────────────────────────────────────────────────

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef(
  ({ className, children, style, disabled, ...props }, ref) => {
    const [focused, setFocused] = React.useState(false);

    return (
      <SelectPrimitive.Trigger
        ref={ref}
        disabled={disabled}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md px-3 py-2 text-sm",
          "disabled:cursor-not-allowed",
          className
        )}
        style={{
          ...selectStyles.trigger.base,
          ...(focused ? selectStyles.trigger.focus : {}),
          ...(disabled ? selectStyles.trigger.disabled : {}),
          ...style,
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...props}
      >
        {children}
        <SelectPrimitive.Icon asChild>
          <ChevronDown
            className="h-4 w-4"
            style={{
              ...selectStyles.chevron,
              ...(focused ? { color: ELECTRIC_CYAN } : {}),
            }}
          />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
    );
  }
);
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectContent = React.forwardRef(
  ({ className, children, style, ...props }, ref) => (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={cn(
          "relative z-50 min-w-[8rem] overflow-hidden rounded-lg",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          className
        )}
        style={{ ...selectStyles.content, ...style }}
        {...props}
      >
        <SelectPrimitive.Viewport className="p-1">
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
);
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef(({ className, style, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2", className)}
    style={{ ...selectStyles.label, ...style }}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef(
  ({ className, children, style, ...props }, ref) => {
    const [focused, setFocused] = React.useState(false);

    return (
      <SelectPrimitive.Item
        ref={ref}
        className={cn(
          "relative flex w-full select-none items-center rounded-md py-1.5 pl-8 pr-2 text-sm outline-none",
          className
        )}
        style={{
          ...selectStyles.item.base,
          ...(focused ? selectStyles.item.focus : {}),
          ...style,
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...props}
      >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          <SelectPrimitive.ItemIndicator>
            <Check className="h-4 w-4" style={selectStyles.checkIcon} />
          </SelectPrimitive.ItemIndicator>
        </span>
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      </SelectPrimitive.Item>
    );
  }
);
SelectItem.displayName = SelectPrimitive.Item.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectLabel,
};