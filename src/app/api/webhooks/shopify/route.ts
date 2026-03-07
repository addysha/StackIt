import { createHmac, timingSafeEqual } from "node:crypto";
import { headers } from "next/headers";

import { badRequest, ok } from "@/lib/api";
import { createMemoryAlert } from "@/lib/memory-store";

export async function POST(request: Request) {
  const rawBody = await request.text();
  const headerStore = await headers();
  const signature = headerStore.get("x-shopify-hmac-sha256");
  const topic = headerStore.get("x-shopify-topic");
  const secret = process.env.SHOPIFY_WEBHOOK_SECRET;

  if (!signature || !secret) {
    return badRequest("Missing webhook signature", 401);
  }

  const digest = createHmac("sha256", secret).update(rawBody, "utf8").digest("base64");

  if (!timingSafeEqual(Buffer.from(signature), Buffer.from(digest))) {
    return badRequest("Invalid webhook signature", 401);
  }

  if (topic === "app/uninstalled") {
    createMemoryAlert({
      type: "shopify_disconnected",
      severity: "critical",
      message: "Shopify has been disconnected. Reconnect to resume syncing.",
    });
  }

  return ok({ received: true, topic });
}
