import { createMemoryAlert, getMemoryAlerts, getMemorySnapshots } from "@/lib/memory-store";
import { logger } from "@/server/logger";

export async function evaluateAlerts() {
  const snapshots = getMemorySnapshots();
  const existingUnread = new Set(getMemoryAlerts().filter((alert) => !alert.read).map((alert) => alert.type));

  const cashInBank = snapshots.find((snapshot) => snapshot.metricType === "cash_in_bank");
  const salesVsLastMonth = snapshots.find((snapshot) => snapshot.metricType === "sales_vs_last_month");
  const ordersToday = snapshots.find((snapshot) => snapshot.metricType === "orders_today");

  if (cashInBank && cashInBank.value < 40000 && !existingUnread.has("cash_low")) {
    createMemoryAlert({
      type: "cash_low",
      severity: "warning",
      message: "Cash is tighter than usual — you have about 19 days of runway at current spend.",
    });
  }

  if (salesVsLastMonth && salesVsLastMonth.value < -30 && !existingUnread.has("revenue_drop")) {
    createMemoryAlert({
      type: "revenue_drop",
      severity: "warning",
      message: `Sales are down ${Math.abs(salesVsLastMonth.value).toFixed(0)}% compared to this time last month.`,
    });
  }

  if (ordersToday && ordersToday.value === 0 && new Date().getHours() >= 14 && !existingUnread.has("no_sales_today")) {
    createMemoryAlert({
      type: "no_sales_today",
      severity: "info",
      message: "No sales yet today — unusual for this time of day based on your history.",
    });
  }

  logger.info({ event: "alerts_evaluated", count: getMemoryAlerts().length }, "Alerts evaluated");
  return getMemoryAlerts();
}
