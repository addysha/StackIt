import { badRequest, ok } from "@/lib/api";
import { markMemoryAlertRead } from "@/lib/memory-store";

export async function PATCH(
  _request: Request,
  { params }: { params: Promise<{ alertId: string }> },
) {
  const { alertId } = await params;
  const alert = markMemoryAlertRead(alertId);

  if (!alert) {
    return badRequest("Alert not found", 404);
  }

  return ok(alert);
}
