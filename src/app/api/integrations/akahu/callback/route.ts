import { NextResponse } from "next/server";

import { connectMemoryIntegration } from "@/lib/memory-store";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Missing OAuth code" }, { status: 400 });
  }

  const integration = connectMemoryIntegration("akahu");
  return NextResponse.json({ success: true, integration });
}
