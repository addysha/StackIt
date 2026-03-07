import pino from "pino";

export const logger = pino({
  name: "stackit-worker",
  level: process.env.LOG_LEVEL ?? "info",
  redact: ["accessToken", "refreshToken", "authorization", "*.token"],
  transport:
    process.env.NODE_ENV === "development"
      ? {
          target: "pino-pretty",
        }
      : undefined,
});
