import { badRequest, ok } from "@/lib/api";
import { removeMemoryBlock, updateMemoryBlock } from "@/lib/memory-store";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ blockId: string }> },
) {
  const { blockId } = await params;
  const payload = (await request.json()) as {
    label?: string;
    config?: Record<string, unknown>;
  };

  const updated = updateMemoryBlock(blockId, payload);

  if (!updated) {
    return badRequest("Block not found", 404);
  }

  return ok(updated);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ blockId: string }> },
) {
  const { blockId } = await params;
  const removed = removeMemoryBlock(blockId);

  if (!removed) {
    return badRequest("Block not found", 404);
  }

  return ok({ success: true, blockId });
}
