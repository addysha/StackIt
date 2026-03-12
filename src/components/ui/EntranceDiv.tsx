"use client";

import { cn } from "@/lib/utils";
import { useEntranceAnimation } from "@/hooks/useEntranceAnimation";

interface EntranceDivProps {
  delay?: number;
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function EntranceDiv({ delay = 0, className, children, style }: EntranceDivProps) {
  const ref = useEntranceAnimation<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn("entrance", className)}
      // transitionDelay overrides the delay part of the .entrance transition-*
      // longhands, giving per-card stagger without CSS custom-property gymnastics.
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  );
}
