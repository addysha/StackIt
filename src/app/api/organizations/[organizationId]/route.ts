import { badRequest, ok } from "@/lib/api";
import { getMemoryOrganization, updateMemoryOrganization } from "@/lib/memory-store";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ organizationId: string }> },
) {
  const { organizationId } = await params;

  if (!organizationId) {
    return badRequest("Organization id is required");
  }

  return ok(getMemoryOrganization());
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ organizationId: string }> },
) {
  const { organizationId } = await params;

  if (!organizationId) {
    return badRequest("Organization id is required");
  }

  const payload = (await request.json()) as Record<string, unknown>;

  const organization = updateMemoryOrganization({
    name: typeof payload.name === "string" ? payload.name : undefined,
    digestTime: typeof payload.digestTime === "string" ? payload.digestTime : undefined,
    timezone: typeof payload.timezone === "string" ? payload.timezone : undefined,
  });

  return ok(organization);
}
