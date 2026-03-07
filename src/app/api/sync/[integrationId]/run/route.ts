import { ok } from "@/lib/api";
import { recomputeAllMetrics } from "@/lib/metrics/compute";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ integrationId: string }> },
) {
  await params;
  const snapshots = await recomputeAllMetrics("demo-org");
  return ok({ success: true, snapshots });
}
