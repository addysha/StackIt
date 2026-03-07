const requiredServerEnv = [
  "DATABASE_URL",
  "CLERK_SECRET_KEY",
  "ENCRYPTION_KEY",
] as const;

type RequiredServerEnv = (typeof requiredServerEnv)[number];

function readEnv(name: RequiredServerEnv) {
  return process.env[name] ?? "";
}

export const env = {
  databaseUrl: readEnv("DATABASE_URL"),
  clerkSecretKey: readEnv("CLERK_SECRET_KEY"),
  encryptionKey: readEnv("ENCRYPTION_KEY"),
  clerkPublishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "",
  posthogKey: process.env.NEXT_PUBLIC_POSTHOG_KEY ?? "",
  posthogHost: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
  sentryDsn: process.env.SENTRY_DSN ?? "",
  shopifyClientId: process.env.SHOPIFY_CLIENT_ID ?? "",
  shopifyClientSecret: process.env.SHOPIFY_CLIENT_SECRET ?? "",
  shopifyWebhookSecret: process.env.SHOPIFY_WEBHOOK_SECRET ?? "",
  shopifyAppUrl: process.env.SHOPIFY_APP_URL ?? "http://localhost:3000",
  akahuClientId: process.env.AKAHU_CLIENT_ID ?? "",
  akahuClientSecret: process.env.AKAHU_CLIENT_SECRET ?? "",
  akahuAppUrl: process.env.AKAHU_APP_URL ?? "http://localhost:3000",
  redisUrl: process.env.REDIS_URL ?? "",
  resendApiKey: process.env.RESEND_API_KEY ?? "",
  resendFromEmail: process.env.RESEND_FROM_EMAIL ?? "hello@stackit.app",
};

export function hasRequiredServerEnv() {
  return requiredServerEnv.every((name) => Boolean(process.env[name]));
}
