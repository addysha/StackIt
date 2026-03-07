import { NextResponse } from "next/server";

import { env } from "@/lib/env";

export async function POST() {
  const state = crypto.randomUUID();
  const url = new URL("https://oauth.akahu.io/");

  url.searchParams.set("client_id", env.akahuClientId || "demo-client");
  url.searchParams.set("redirect_uri", `${env.akahuAppUrl}/api/integrations/akahu/callback`);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("state", state);

  return NextResponse.json({ url: url.toString(), state });
}
