import { recomputeAllMetrics } from "@/lib/metrics/compute";
import { logger } from "@/server/logger";

export async function handleMetricsCompute(orgId: string) {
  logger.info({ event: "metrics_compute_started", orgId }, "Computing metric snapshots");
  const snapshots = await recomputeAllMetrics(orgId);
  logger.info(
    { event: "metrics_compute_completed", orgId, count: snapshots.length },
    "Metric snapshots ready",
  );
  return snapshots;
}
