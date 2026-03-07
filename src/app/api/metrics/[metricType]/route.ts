import { badRequest, ok } from "@/lib/api";
import { getMemorySnapshot } from "@/lib/memory-store";
import type { MetricType } from "@/lib/types";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ metricType: string }> },
) {
  const { metricType } = await params;
  const snapshot = getMemorySnapshot(metricType as MetricType);

  if (!snapshot) {
    return badRequest("Metric not found", 404);
  }

  return ok(snapshot);
}
