import { NextResponse } from "next/server";

import { connectMemoryIntegration } from "@/lib/memory-store";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if (!code || !state) {
    return NextResponse.json({ error: "Missing OAuth parameters" }, { status: 400 });
  }

  const integration = connectMemoryIntegration("shopify");
  return NextResponse.json({ success: true, integration });
}
