import { NextResponse } from "next/server";

import { env } from "@/lib/env";

export async function POST() {
  const state = crypto.randomUUID();
  const shop = "demo-store";
  const redirectUri = `${env.shopifyAppUrl}/api/integrations/shopify/callback`;
  const url = new URL(`https://${shop}.myshopify.com/admin/oauth/authorize`);

  url.searchParams.set("client_id", env.shopifyClientId || "demo-client");
  url.searchParams.set(
    "scope",
    ["read_orders", "read_customers", "read_products", "read_inventory"].join(","),
  );
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("state", state);

  return NextResponse.json({ url: url.toString(), state });
}
