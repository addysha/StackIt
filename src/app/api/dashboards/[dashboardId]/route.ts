import { ok } from "@/lib/api";
import { getMemoryDashboard } from "@/lib/memory-store";

export async function GET() {
  return ok(getMemoryDashboard());
}
