import Fastify from "fastify";

import { evaluateAlerts } from "@/server/jobs/alerts";
import { buildMorningDigest } from "@/server/jobs/digest";
import { handleMetricsCompute } from "@/server/jobs/metrics";
import { handleSyncJob } from "@/server/jobs/sync";
import { logger } from "@/server/logger";
import { createWorker } from "@/server/queue";

const app = Fastify({
  logger: false,
});

app.get("/health", async () => ({ ok: true }));

app.post("/jobs/run-demo", async () => {
  await handleSyncJob({
    orgId: "demo-org",
    integrationId: "demo-integration",
    jobType: "sync.shopify.orders",
  });
  await handleMetricsCompute("demo-org");
  await evaluateAlerts();
  const digest = await buildMorningDigest();

  return { success: true, digest };
});

createWorker(async (job) => {
  logger.info({ jobId: job.id, jobName: job.name }, "Worker processing job");
  return { success: true };
});

app
  .listen({
    port: Number(process.env.PORT ?? 4000),
    host: "0.0.0.0",
  })
  .then((address) => {
    logger.info({ address }, "Fastify worker ready");
  })
  .catch((error) => {
    logger.error({ error }, "Unable to start Fastify worker");
    process.exit(1);
  });
