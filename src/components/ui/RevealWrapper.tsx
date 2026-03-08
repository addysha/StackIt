"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type RevealWrapperProps = React.HTMLAttributes<HTMLElement> & {
  children: React.ReactNode;
  className?: string;
  delay?: 1 | 2 | 3 | 4;
  as?: keyof React.JSX.IntrinsicElements;
};

export function RevealWrapper({
  children,
  className,
  delay,
  as: Tag = "div",
  ...rest
}: RevealWrapperProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("vis");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.RefObject<HTMLElement & HTMLDivElement>}
      className={cn(
        "reveal",
        delay === 1 && "reveal-d1",
        delay === 2 && "reveal-d2",
        delay === 3 && "reveal-d3",
        delay === 4 && "reveal-d4",
        className
      )}
      {...(rest as React.HTMLAttributes<HTMLDivElement>)}
    >
      {children}
    </Tag>
  );
}
