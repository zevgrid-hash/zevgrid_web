// import * as React from "react";
// import * as DialogPrimitive from "@radix-ui/react-dialog";
// import { X } from "lucide-react";
// import { cn } from "../../lib/utils";

// const Sheet = DialogPrimitive.Root;
// const SheetTrigger = DialogPrimitive.Trigger;
// const SheetClose = DialogPrimitive.Close;

// const SheetOverlay = React.forwardRef(({ className, ...props }, ref) => (
//   <DialogPrimitive.Overlay ref={ref} className={cn("fixed inset-0 z-50 bg-black/80", className)} {...props} />
// ));
// SheetOverlay.displayName = "SheetOverlay";

// const SheetContent = React.forwardRef(({ className, children, side = "right", ...props }, ref) => (
//   <DialogPrimitive.Portal>
//     <SheetOverlay />
//     <DialogPrimitive.Content ref={ref} className={cn("fixed z-50 bg-background p-6 shadow-lg transition ease-in-out", side === "right" && "inset-y-0 right-0 h-full w-3/4 sm:max-w-sm", className)} {...props}>
//       {children}
//       <DialogPrimitive.Close className="absolute right-4 top-4 opacity-70 hover:opacity-100">
//         <X className="h-4 w-4" /><span className="sr-only">Close</span>
//       </DialogPrimitive.Close>
//     </DialogPrimitive.Content>
//   </DialogPrimitive.Portal>
// ));
// SheetContent.displayName = "SheetContent";

// const SheetHeader = ({ className, ...props }) => <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />;
// const SheetTitle = React.forwardRef(({ className, ...props }, ref) => (
//   <DialogPrimitive.Title ref={ref} className={cn("text-lg font-semibold", className)} {...props} />
// ));
// SheetTitle.displayName = "SheetTitle";

// export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetTitle };
import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";
import {
  ELECTRIC_CYAN,
  ENTERPRISE_CHARCOAL,
  INFRASTRUCTURE_NAVY,
  CLEAN_WHITE,
  LIGHT_CANVAS_GREY,
} from "../../app/assets/constants/zevgrid-colors";

// ─── Style tokens ─────────────────────────────────────────────────────────────

const sheetStyles = {
  overlay: {
    backgroundColor: `${INFRASTRUCTURE_NAVY}cc`, // 80% navy — richer than plain black
    backdropFilter: "blur(2px)",
  },
  content: {
    backgroundColor: CLEAN_WHITE,
    borderLeft: `1px solid ${LIGHT_CANVAS_GREY}`,
    boxShadow: `-8px 0 32px 0 ${INFRASTRUCTURE_NAVY}33`,
    color: ENTERPRISE_CHARCOAL,
  },
  closeBtn: {
    base: {
      color: `${ENTERPRISE_CHARCOAL}70`,
      backgroundColor: "transparent",
      border: "none",
      borderRadius: "6px",
      padding: "4px",
      transition: "color 150ms ease, background-color 150ms ease",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    hover: {
      color: ELECTRIC_CYAN,
      backgroundColor: `${INFRASTRUCTURE_NAVY}08`,
    },
  },
  header: {
    borderBottom: `1px solid ${LIGHT_CANVAS_GREY}`,
    paddingBottom: "16px",
    marginBottom: "4px",
  },
  title: {
    color: INFRASTRUCTURE_NAVY,
    fontWeight: 700,
    letterSpacing: "-0.01em",
    fontSize: "1.0625rem",
  },
  accentBar: {
    // Cyan top-edge accent stripe on the panel
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "3px",
    background: `linear-gradient(90deg, ${ELECTRIC_CYAN}, ${ELECTRIC_CYAN}66)`,
    borderRadius: "0 0 2px 2px",
  },
};

// ─── Components ───────────────────────────────────────────────────────────────

const Sheet = DialogPrimitive.Root;
const SheetTrigger = DialogPrimitive.Trigger;
const SheetClose = DialogPrimitive.Close;

const SheetOverlay = React.forwardRef(({ className, style, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50", className)}
    style={{ ...sheetStyles.overlay, ...style }}
    {...props}
  />
));
SheetOverlay.displayName = "SheetOverlay";

const SheetContent = React.forwardRef(
  ({ className, children, side = "right", style, ...props }, ref) => {
    const [closeHovered, setCloseHovered] = React.useState(false);

    return (
      <DialogPrimitive.Portal>
        <SheetOverlay />
        <DialogPrimitive.Content
          ref={ref}
          className={cn(
            "fixed z-50 p-6 transition ease-in-out",
            "data-[state=open]:animate-in data-[state=closed]:animate-out duration-300",
            side === "right" && [
              "inset-y-0 right-0 h-full w-3/4 sm:max-w-sm",
              "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
            ],
            side === "left" && [
              "inset-y-0 left-0 h-full w-3/4 sm:max-w-sm",
              "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
            ],
            className
          )}
          style={{ ...sheetStyles.content, ...style }}
          {...props}
        >
          {/* Cyan accent bar at top of panel */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "3px",
              background: `linear-gradient(90deg, ${ELECTRIC_CYAN}, ${ELECTRIC_CYAN}55)`,
              borderRadius: "0 0 2px 2px",
            }}
          />

          {children}

          <DialogPrimitive.Close
            asChild
            onMouseEnter={() => setCloseHovered(true)}
            onMouseLeave={() => setCloseHovered(false)}
          >
            <button
              style={{
                ...sheetStyles.closeBtn.base,
                ...(closeHovered ? sheetStyles.closeBtn.hover : {}),
                position: "absolute",
                right: "16px",
                top: "16px",
              }}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    );
  }
);
SheetContent.displayName = "SheetContent";

const SheetHeader = ({ className, style, ...props }) => (
  <div
    className={cn("flex flex-col space-y-2 text-center sm:text-left", className)}
    style={{ ...sheetStyles.header, ...style }}
    {...props}
  />
);

const SheetTitle = React.forwardRef(({ className, style, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(className)}
    style={{ ...sheetStyles.title, ...style }}
    {...props}
  />
));
SheetTitle.displayName = "SheetTitle";

export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetTitle };