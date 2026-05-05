// import * as React from "react";
// import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
// import { cn } from "../../lib/utils";

// const DropdownMenu = DropdownMenuPrimitive.Root;
// const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
// const DropdownMenuGroup = DropdownMenuPrimitive.Group;
// const DropdownMenuSeparator = DropdownMenuPrimitive.Separator;

// const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => (
//   <DropdownMenuPrimitive.Portal>
//     <DropdownMenuPrimitive.Content ref={ref} sideOffset={sideOffset} className={cn("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md", className)} {...props} />
//   </DropdownMenuPrimitive.Portal>
// ));
// DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

// const DropdownMenuItem = React.forwardRef(({ className, ...props }, ref) => (
//   <DropdownMenuPrimitive.Item ref={ref} className={cn("relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground", className)} {...props} />
// ));
// DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

// const DropdownMenuLabel = React.forwardRef(({ className, ...props }, ref) => (
//   <DropdownMenuPrimitive.Label ref={ref} className={cn("px-2 py-1.5 text-sm font-semibold", className)} {...props} />
// ));
// DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

// export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator };
import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cn } from "../../lib/utils";
import {
  ELECTRIC_CYAN,
  ENTERPRISE_CHARCOAL,
  INFRASTRUCTURE_NAVY,
  CLEAN_WHITE,
  LIGHT_CANVAS_GREY,
} from "../../app/assets/constants/zevgrid-colors";

// ─── Inline style tokens ──────────────────────────────────────────────────────

const dropdownStyles = {
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
  separator: {
    backgroundColor: LIGHT_CANVAS_GREY,
    height: "1px",
    margin: "4px 0",
  },
};

// ─── Components ───────────────────────────────────────────────────────────────

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuSeparator = React.forwardRef(({ style, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    style={{ ...dropdownStyles.separator, ...style }}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuContent = React.forwardRef(
  ({ className, sideOffset = 6, style, ...props }, ref) => (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          "z-50 min-w-[10rem] overflow-hidden rounded-lg p-1",
          // animate-in / fade-in classes if your project includes them
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          className
        )}
        style={{ ...dropdownStyles.content, ...style }}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
);
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef(
  ({ className, style, ...props }, ref) => {
    const [hovered, setHovered] = React.useState(false);

    return (
      <DropdownMenuPrimitive.Item
        ref={ref}
        className={cn(
          "relative flex cursor-pointer select-none items-center rounded-md px-2.5 py-1.5 text-sm outline-none transition-colors",
          className
        )}
        style={{
          color: hovered ? ELECTRIC_CYAN : ENTERPRISE_CHARCOAL,
          backgroundColor: hovered ? `${INFRASTRUCTURE_NAVY}08` : "transparent",
          borderLeft: hovered
            ? `2px solid ${ELECTRIC_CYAN}`
            : "2px solid transparent",
          transition: "all 120ms ease",
          ...style,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        {...props}
      />
    );
  }
);
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuLabel = React.forwardRef(({ className, style, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn("px-2.5 py-1.5", className)}
    style={{ ...dropdownStyles.label, ...style }}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
};