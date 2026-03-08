import * as React from "react";

import { cn } from "@/lib/utils";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: "div" | "section" | "article";
}

export function GlassCard({
  className,
  as: Component = "div",
  ...props
}: GlassCardProps) {
  return (
    <Component
      className={cn("glass-card", className)}
      {...props}
    />
  );
}
