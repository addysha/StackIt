import { badRequest, ok } from "@/lib/api";
import { addMemoryBlock } from "@/lib/memory-store";
import type { DashboardLayoutItem, MetricType } from "@/lib/types";

export async function POST(request: Request) {
  const payload = (await request.json()) as {
    metricType?: MetricType;
    label?: string;
    position?: DashboardLayoutItem;
  };

  if (!payload.metricType || !payload.label || !payload.position) {
    return badRequest("metricType, label, and position are required");
  }

  return ok(
    addMemoryBlock({
      metricType: payload.metricType,
      label: payload.label,
      position: payload.position,
    }),
  );
}
