import { auth, currentUser } from "@clerk/nextjs/server";

import { DEMO_ORG_ID } from "@/lib/constants";

export async function getSessionContext() {
  const clerk = await auth();
  const user = await currentUser();

  return {
    userId: clerk.userId ?? "demo-user",
    orgId: clerk.orgId ?? DEMO_ORG_ID,
    email: user?.emailAddresses[0]?.emailAddress ?? "owner@stackit.app",
    firstName: user?.firstName ?? "Aditya",
  };
}
