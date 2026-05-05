// import * as React from "react";
// import * as SliderPrimitive from "@radix-ui/react-slider";
// import { cn } from "../../lib/utils";

// const Slider = React.forwardRef(({ className, ...props }, ref) => (
//   <SliderPrimitive.Root ref={ref} className={cn("relative flex w-full touch-none select-none items-center", className)} {...props}>
//     <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
//       <SliderPrimitive.Range className="absolute h-full bg-primary" />
//     </SliderPrimitive.Track>
//     <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background shadow transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50" />
//   </SliderPrimitive.Root>
// ));
// Slider.displayName = SliderPrimitive.Root.displayName;
// export { Slider };
import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "../../lib/utils";
import {
  ELECTRIC_CYAN,
  ENTERPRISE_CHARCOAL,
  INFRASTRUCTURE_NAVY,
  CLEAN_WHITE,
  LIGHT_CANVAS_GREY,
} from "../../app/assets/constants/zevgrid-colors";


// ─── Style tokens ─────────────────────────────────────────────────────────────

const sliderStyles = {
  track: {
    backgroundColor: LIGHT_CANVAS_GREY,
    border: `1px solid ${ENTERPRISE_CHARCOAL}18`,
  },
  range: {
    background: `linear-gradient(90deg, ${ELECTRIC_CYAN}cc, ${ELECTRIC_CYAN})`,
  },
  thumb: {
    base: {
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      backgroundColor: CLEAN_WHITE,
      border: `2.5px solid ${ELECTRIC_CYAN}`,
      boxShadow: `0 0 0 0px ${ELECTRIC_CYAN}00, 0 1px 4px ${INFRASTRUCTURE_NAVY}33`,
      transition: "box-shadow 150ms ease, border-color 150ms ease",
      cursor: "pointer",
      display: "block",
      outline: "none",
    },
    focus: {
      boxShadow: `0 0 0 4px ${ELECTRIC_CYAN}33, 0 1px 4px ${INFRASTRUCTURE_NAVY}33`,
      borderColor: ELECTRIC_CYAN,
    },
    hover: {
      boxShadow: `0 0 0 6px ${ELECTRIC_CYAN}22, 0 1px 4px ${INFRASTRUCTURE_NAVY}33`,
    },
    disabled: {
      opacity: 0.5,
      cursor: "not-allowed",
      borderColor: `${ENTERPRISE_CHARCOAL}60`,
    },
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

const Slider = React.forwardRef(({ className, disabled, ...props }, ref) => {
  const [focused, setFocused] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);

  const thumbStyle = {
    ...sliderStyles.thumb.base,
    ...(hovered && !disabled ? sliderStyles.thumb.hover : {}),
    ...(focused && !disabled ? sliderStyles.thumb.focus : {}),
    ...(disabled ? sliderStyles.thumb.disabled : {}),
  };

  return (
    <SliderPrimitive.Root
      ref={ref}
      disabled={disabled}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      {...props}
    >
      {/* Track */}
      <SliderPrimitive.Track
        className="relative h-2 w-full grow overflow-hidden rounded-full"
        style={sliderStyles.track}
      >
        {/* Filled range */}
        <SliderPrimitive.Range
          className="absolute h-full"
          style={sliderStyles.range}
        />
      </SliderPrimitive.Track>

      {/* Thumb */}
      <SliderPrimitive.Thumb
        style={thumbStyle}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />
    </SliderPrimitive.Root>
  );
});

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };