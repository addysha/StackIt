import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

import { getDb } from "@/lib/db";
import { DEFAULT_DIGEST_TIME, DEFAULT_TIMEZONE, PRESET_LAYOUT } from "@/lib/constants";

export async function POST(request: Request) {
  const payload = await request.text();
  const headerPayload = await headers();

  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");
  const secret = process.env.CLERK_WEBHOOK_SECRET;

  if (!svixId || !svixTimestamp || !svixSignature || !secret) {
    return NextResponse.json({ error: "Missing webhook headers" }, { status: 400 });
  }

  const wh = new Webhook(secret);

  let event: Record<string, unknown>;
  try {
    event = wh.verify(payload, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type !== "user.created") {
    return NextResponse.json({ received: true });
  }

  const data = event.data as Record<string, unknown>;
  const email = Array.isArray(data.email_addresses)
    ? String((data.email_addresses[0] as Record<string, unknown>)?.email_address ?? "")
    : "";

  try {
    const db = await getDb();

    if (!db) {
      return NextResponse.json({ error: "Database client unavailable" }, { status: 503 });
    }

    const user = await db.user.upsert({
      where: { clerkId: String(data.id) },
      update: {
        email,
        firstName: String(data.first_name ?? ""),
      },
      create: {
        clerkId: String(data.id),
        email,
        firstName: String(data.first_name ?? ""),
      },
    });

    const organization = await db.organization.create({
      data: {
        name: `${user.firstName || "New"} Business`,
        digestTime: DEFAULT_DIGEST_TIME,
        timezone: DEFAULT_TIMEZONE,
        dashboards: {
          create: {
            name: "My Dashboard",
            layout: PRESET_LAYOUT,
            blocks: {
              create: PRESET_LAYOUT.map((item) => ({
                metricType: item.i,
                label: item.i.replaceAll("_", " "),
                position: item,
                visible: true,
              })),
            },
          },
        },
        members: {
          create: {
            userId: user.id,
            role: "owner",
          },
        },
      },
    });

    return NextResponse.json({ received: true, organizationId: organization.id });
  } catch (error) {
    console.error("Webhook processing failed", error);
    return NextResponse.json({ error: "Unable to process webhook" }, { status: 500 });
  }
}
