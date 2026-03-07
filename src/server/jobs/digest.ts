import { getMemoryAlerts, getMemoryOrganization, getMemorySnapshots } from "@/lib/memory-store";
import { formatCurrency } from "@/lib/utils";
import { logger } from "@/server/logger";

export async function buildMorningDigest() {
  const organization = getMemoryOrganization();
  const snapshots = getMemorySnapshots();
  const alerts = getMemoryAlerts();

  const content = [
    `Good morning ${organization.name},`,
    "",
    `Revenue: ${formatCurrency(
      snapshots.find((snapshot) => snapshot.metricType === "revenue_today")?.value ?? 0,
    )} today · ${formatCurrency(
      snapshots.find((snapshot) => snapshot.metricType === "revenue_this_month")?.value ?? 0,
    )} this month`,
    `Orders: ${snapshots.find((snapshot) => snapshot.metricType === "orders_today")?.value ?? 0} today`,
    `Cash in bank: ${formatCurrency(
      snapshots.find((snapshot) => snapshot.metricType === "cash_in_bank")?.value ?? 0,
    )}`,
    "",
    alerts.length ? alerts.map((alert) => `• ${alert.message}`).join("\n") : "Everything looks healthy today.",
    "",
    "Open your dashboard →",
  ].join("\n");

  logger.info({ event: "digest_built", organizationId: organization.id }, "Morning digest generated");
  return content;
}
