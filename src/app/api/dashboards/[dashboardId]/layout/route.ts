import { badRequest, ok } from "@/lib/api";
import { updateMemoryLayout } from "@/lib/memory-store";
import type { DashboardLayoutItem } from "@/lib/types";

export async function POST(request: Request) {
  const payload = (await request.json()) as { layout?: DashboardLayoutItem[] };

  if (!payload.layout) {
    return badRequest("Layout payload is required");
  }

  return ok(updateMemoryLayout(payload.layout));
}
