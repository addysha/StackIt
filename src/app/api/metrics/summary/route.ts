import { ok } from "@/lib/api";
import { getMemorySnapshots } from "@/lib/memory-store";

export async function GET() {
  return ok(getMemorySnapshots());
}
