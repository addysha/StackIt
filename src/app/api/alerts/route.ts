import { ok } from "@/lib/api";
import { getMemoryAlerts } from "@/lib/memory-store";

export async function GET() {
  return ok(getMemoryAlerts().filter((alert) => !alert.read));
}
