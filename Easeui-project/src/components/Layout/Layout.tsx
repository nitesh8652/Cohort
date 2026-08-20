import React from "react";
import { cn } from "@/libs/utils";

interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: number;
}

const Layout = ({ columns = 3, className, children, style, ...props }: LayoutProps) => {
  return (
    <div
      className={cn("grid gap-4", className)}
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, ...style }}
      {...props}
    >
      {children}
    </div>
  );
};

Layout.displayName = "Layout";
export { Layout };
