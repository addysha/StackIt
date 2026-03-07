import { ok } from "@/lib/api";
import { recomputeAllMetrics } from "@/lib/metrics/compute";
import { getMemorySnapshot } from "@/lib/memory-store";
import type { MetricType } from "@/lib/types";

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => ({}))) as { metricType?: MetricType };

  if (payload.metricType) {
    return ok({ success: true, snapshot: getMemorySnapshot(payload.metricType) });
  }

  const snapshots = await recomputeAllMetrics("demo-org");
  return ok({ success: true, snapshots });
}
