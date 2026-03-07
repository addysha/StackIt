import { Queue, Worker, type ConnectionOptions, type Processor } from "bullmq";

import { env } from "@/lib/env";
import { logger } from "@/server/logger";

const connection: ConnectionOptions = env.redisUrl
  ? { url: env.redisUrl }
  : {
      host: "127.0.0.1",
      port: 6379,
    };

export const jobQueue = new Queue("stackit-jobs", {
  connection,
  defaultJobOptions: {
    attempts: 3,
    removeOnComplete: 50,
    removeOnFail: 50,
  },
});

export function createWorker(
  processor: Processor<any, any, string>,
  concurrency = 2,
) {
  return new Worker("stackit-jobs", processor, {
    connection,
    concurrency,
  });
}

jobQueue.on("error", (error) => {
  logger.error({ event: "queue_error", error }, "BullMQ queue error");
});
