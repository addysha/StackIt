import { ok } from "@/lib/api";
import { getMemoryAlerts, getMemoryOrganization, getMemorySnapshots } from "@/lib/memory-store";
import { formatCurrency } from "@/lib/utils";

export async function GET() {
  const organization = getMemoryOrganization();
  const snapshots = getMemorySnapshots();
  const revenueToday = snapshots.find((item) => item.metricType === "revenue_today")?.value ?? 0;
  const revenueMonth = snapshots.find((item) => item.metricType === "revenue_this_month")?.value ?? 0;
  const ordersToday = snapshots.find((item) => item.metricType === "orders_today")?.value ?? 0;
  const topProduct = snapshots.find((item) => item.metricType === "top_product")?.metadata as
    | { productName?: string; unitsSold?: number }
    | undefined;
  const cashInBank = snapshots.find((item) => item.metricType === "cash_in_bank")?.value ?? 0;
  const salesTrend = snapshots.find((item) => item.metricType === "sales_vs_last_month")?.value ?? 0;

  const content = `Good morning,\n\nHere's your business for today:\n\nRevenue: ${formatCurrency(revenueToday)} today · ${formatCurrency(revenueMonth)} this month\nOrders: ${ordersToday} today\nTop seller: ${topProduct?.productName ?? "Ceremonial Matcha Tin"} (${topProduct?.unitsSold ?? 42} units)\nCash in bank: ${formatCurrency(cashInBank)}\n\n${
    getMemoryAlerts().length > 0
      ? getMemoryAlerts()
          .map((alert) => `• ${alert.message}`)
          .join("\n")
      : "Everything looks healthy today."
  }\n\n${
    salesTrend > 0
      ? `Sales are up ${salesTrend.toFixed(1)}% vs last month.`
      : `Sales are down ${Math.abs(salesTrend).toFixed(1)}% vs last month.`
  }\n\nOpen your dashboard →`;

  return ok({
    subject: `☀️ ${organization.name} — ${new Date().toLocaleDateString("en-NZ")}`,
    content,
  });
}
