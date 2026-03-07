import { Resend } from "resend";

import { ok } from "@/lib/api";
import { env } from "@/lib/env";
import { getMemoryOrganization } from "@/lib/memory-store";

export async function POST() {
  const previewResponse = await fetch(`${env.shopifyAppUrl}/api/digest/preview`, {
    cache: "no-store",
  }).catch(() => null);

  const preview = previewResponse
    ? ((await previewResponse.json()) as { subject: string; content: string })
    : {
        subject: `☀️ ${getMemoryOrganization().name}`,
        content: "Open your dashboard →",
      };

  if (env.resendApiKey) {
    const resend = new Resend(env.resendApiKey);
    await resend.emails.send({
      from: env.resendFromEmail,
      to: ["owner@stackit.app"],
      subject: preview.subject,
      text: preview.content,
    });
  }

  return ok({ success: true, preview });
}
