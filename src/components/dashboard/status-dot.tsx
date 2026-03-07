import { cn } from "@/lib/utils";
import type { MetricStatus } from "@/lib/types";

const statusClasses: Record<MetricStatus, string> = {
  ok: "bg-emerald-400",
  stale: "bg-amber-400",
  partial: "bg-amber-400",
  error: "bg-red-400",
};

export function StatusDot({ status }: { status: MetricStatus }) {
  return (
    <span
      className={cn(
        "inline-flex size-2.5 rounded-full shadow-[0_0_12px_rgba(255,255,255,0.15)]",
        statusClasses[status],
      )}
      aria-label={status}
      title={status}
    />
  );
}
