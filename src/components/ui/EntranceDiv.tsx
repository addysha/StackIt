"use client";

import { useEffect, useState } from "react";
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
  const [effectiveDelay, setEffectiveDelay] = useState(delay ?? 0);

  useEffect(() => {
    const update = () => {
      const isMobile = window.innerWidth < 768;
      setEffectiveDelay(isMobile ? Math.min(delay ?? 0, 200) : delay ?? 0);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [delay]);

  return (
    <div
      ref={ref}
      className={cn("entrance", className)}
      style={{ transitionDelay: `${effectiveDelay}ms`, ...style }}
    >
      {children}
    </div>
  );
}
