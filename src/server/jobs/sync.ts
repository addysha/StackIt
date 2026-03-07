import { logger } from "@/server/logger";

type SyncJobPayload = {
  orgId: string;
  integrationId: string;
  jobType: string;
};

export async function handleSyncJob(payload: SyncJobPayload) {
  logger.info(
    {
      event: "sync_started",
      orgId: payload.orgId,
      integrationId: payload.integrationId,
      jobType: payload.jobType,
    },
    "Sync job started",
  );

  logger.info(
    {
      event: "sync_completed",
      orgId: payload.orgId,
      integrationId: payload.integrationId,
      jobType: payload.jobType,
      recordCount: 0,
    },
    "Sync job completed",
  );

  return { success: true };
}
