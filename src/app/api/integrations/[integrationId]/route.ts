import { badRequest, ok } from "@/lib/api";
import { getMemoryIntegrations } from "@/lib/memory-store";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ integrationId: string }> },
) {
  const { integrationId } = await params;
  const integration = getMemoryIntegrations().find((item) => item.id === integrationId);

  if (!integration) {
    return badRequest("Integration not found", 404);
  }

  return ok({ success: true, integrationId });
}
