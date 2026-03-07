import { ok } from "@/lib/api";
import { getMemoryIntegrations } from "@/lib/memory-store";

export async function GET() {
  return ok(getMemoryIntegrations());
}
