import { cva, type VariantProps } from "class-variance-authority";
import React, { useId, useState } from "react";
import { cn } from "@/libs/utils";

const tooltipVariants = cva(
  "absolute z-50 whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium shadow-md transition-all duration-150 pointer-events-none",
  {
    variants: {
      variant: {
        light: "bg-white text-gray-900 border border-gray-200",
        dark: "bg-slate-900 text-white",
        outline: "bg-white/90 text-gray-800 border border-gray-400 backdrop-blur-sm",
      },
      position: {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
        left: "right-full top-1/2 -translate-y-1/2 mr-2",
        right: "left-full top-1/2 -translate-y-1/2 ml-2",
      },
    },
    defaultVariants: {
      variant: "dark",
      position: "top",
    },
  }
);

const arrowVariants = cva("absolute w-2 h-2 rotate-45", {
  variants: {
    variant: {
      light: "bg-white border-b border-r border-gray-200",
      dark: "bg-slate-900",
      outline: "bg-white/90 border-b border-r border-gray-400",
    },
    position: {
      top: "top-full left-1/2 -translate-x-1/2 -mt-1",
      bottom: "bottom-full left-1/2 -translate-x-1/2 -mb-1",
      left: "left-full top-1/2 -translate-y-1/2 -ml-1",
      right: "right-full top-1/2 -translate-y-1/2 -mr-1",
    },
  },
  defaultVariants: {
    variant: "dark",
    position: "top",
  },
});

interface TooltipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tooltipVariants> {
  content: React.ReactNode;
  children: React.ReactElement;
  delay?: number;
}

const Tooltip = ({
  content,
  children,
  variant,
  position,
  delay = 100,
  className,
  ...props
}: TooltipProps) => {
  const [visible, setVisible] = useState(false);
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
  const tooltipId = useId();

  const show = () => {
    const t = setTimeout(() => setVisible(true), delay);
    setTimer(t);
  };

  const hide = () => {
    if (timer) clearTimeout(timer);
    setVisible(false);
  };

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {React.cloneElement(children, {
        "aria-describedby": visible ? tooltipId : undefined,
      })}
      {visible && (
        <span
          role="tooltip"
          id={tooltipId}
          className={cn(tooltipVariants({ variant, position, className }))}
          {...props}
        >
          {content}
          <span className={cn(arrowVariants({ variant, position }))} />
        </span>
      )}
    </span>
  );
};

Tooltip.displayName = "Tooltip";
export { Tooltip, tooltipVariants };
