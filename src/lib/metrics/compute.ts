import { endOfMonth, endOfWeek, startOfDay, startOfMonth, startOfWeek } from "date-fns";

import { DEFINITION_VERSION } from "@/lib/constants";
import { getDb } from "@/lib/db";
import { getMemorySnapshot, setMemorySnapshot } from "@/lib/memory-store";
import type { MetricSnapshotRecord, MetricStatus, MetricType, TimeRange } from "@/lib/types";

function buildSnapshot(
  organizationId: string,
  metricType: MetricType,
  value: number,
  timeRange: TimeRange,
  sourceSystems: string[],
  lastSyncedAt: Date,
  metadata: Record<string, unknown> | null = null,
): MetricSnapshotRecord {
  const status: MetricStatus =
    Date.now() - lastSyncedAt.getTime() > 2 * 60 * 60 * 1000 ? "stale" : "ok";

  return {
    id: crypto.randomUUID(),
    organizationId,
    metricType,
    value,
    currency: "NZD",
    timeRange,
    calculatedAt: new Date(),
    lastSyncedAt,
    sourceSystems,
    status,
    definitionVersion: DEFINITION_VERSION,
    metadata,
  };
}

export async function computeMetric(orgId: string, metricType: MetricType, date = new Date()) {
  try {
    switch (metricType) {
      case "revenue_today":
        return computeRevenueToday(orgId, date);
      case "revenue_this_month":
        return computeRevenueThisMonth(orgId, date);
      case "orders_today":
        return computeOrdersToday(orgId, date);
      case "top_product":
        return computeTopProduct(orgId, date);
      case "new_vs_returning":
        return computeNewVsReturning(orgId);
      case "cash_in_bank":
        return computeCashInBank(orgId);
      case "sales_vs_last_month":
        return computeSalesVsLastMonth(orgId, date);
      case "payments_received":
        return computePaymentsReceived(orgId, date);
      default:
        return getMemorySnapshot(metricType)!;
    }
  } catch {
    return getMemorySnapshot(metricType)!;
  }
}

export async function recomputeAllMetrics(orgId: string) {
  const metrics: MetricType[] = [
    "revenue_today",
    "revenue_this_month",
    "orders_today",
    "top_product",
    "new_vs_returning",
    "cash_in_bank",
    "sales_vs_last_month",
    "payments_received",
  ];

  const results = await Promise.all(metrics.map((metric) => computeMetric(orgId, metric)));
  results.forEach((snapshot) => setMemorySnapshot(snapshot));
  return results;
}

async function computeRevenueToday(orgId: string, date: Date) {
  const db = await getDb();
  const fallback = getMemorySnapshot("revenue_today");

  if (!db) {
    return fallback!;
  }

  const value = await db.rawOrder.aggregate({
    where: {
      organizationId: orgId,
      shopifyCreatedAt: {
        gte: startOfDay(date),
      },
      status: {
        notIn: ["refunded", "cancelled"],
      },
    },
    _sum: { totalPrice: true },
    _max: { syncedAt: true },
  });

  return buildSnapshot(
    orgId,
    "revenue_today",
    value._sum.totalPrice ?? fallback?.value ?? 0,
    "today",
    ["shopify"],
    value._max.syncedAt ?? fallback?.lastSyncedAt ?? new Date(),
    {
      trend: fallback?.metadata?.trend ?? 0,
    },
  );
}

async function computeRevenueThisMonth(orgId: string, date: Date) {
  const db = await getDb();
  const fallback = getMemorySnapshot("revenue_this_month");

  if (!db) {
    return fallback!;
  }

  const value = await db.rawOrder.aggregate({
    where: {
      organizationId: orgId,
      shopifyCreatedAt: {
        gte: startOfMonth(date),
        lte: endOfMonth(date),
      },
      status: {
        notIn: ["refunded", "cancelled"],
      },
    },
    _sum: { totalPrice: true },
    _max: { syncedAt: true },
  });

  return buildSnapshot(
    orgId,
    "revenue_this_month",
    value._sum.totalPrice ?? fallback?.value ?? 0,
    "this_month",
    ["shopify"],
    value._max.syncedAt ?? fallback?.lastSyncedAt ?? new Date(),
    {
      trend: fallback?.metadata?.trend ?? 0,
      subtitle: "vs last month",
    },
  );
}

async function computeOrdersToday(orgId: string, date: Date) {
  const db = await getDb();
  const fallback = getMemorySnapshot("orders_today");

  if (!db) {
    return fallback!;
  }

  const value = await db.rawOrder.count({
    where: {
      organizationId: orgId,
      shopifyCreatedAt: {
        gte: startOfDay(date),
      },
    },
  });

  return buildSnapshot(
    orgId,
    "orders_today",
    value || fallback?.value || 0,
    "today",
    ["shopify"],
    fallback?.lastSyncedAt ?? new Date(),
    { trend: fallback?.metadata?.trend ?? 0 },
  );
}

async function computeTopProduct(orgId: string, date: Date) {
  const db = await getDb();
  const fallback = getMemorySnapshot("top_product");

  if (!db) {
    return fallback!;
  }

  const orders = await db.rawOrder.findMany({
    where: {
      organizationId: orgId,
      shopifyCreatedAt: {
        gte: startOfMonth(date),
        lte: endOfMonth(date),
      },
    },
    select: {
      lineItems: true,
      syncedAt: true,
    },
  });

  const productMap = new Map<
    string,
    { productName: string; unitsSold: number; revenue: number }
  >();

  for (const order of orders) {
    const lineItems = Array.isArray(order.lineItems)
      ? (order.lineItems as Array<Record<string, unknown>>)
      : [];
    for (const item of lineItems) {
      if (!item || typeof item !== "object") {
        continue;
      }

      const record = item as Record<string, unknown>;
      const key = String(record.productId ?? record.product_id ?? record.title ?? "unknown");
      const current = productMap.get(key) ?? {
        productName: String(record.title ?? "Unknown product"),
        unitsSold: 0,
        revenue: 0,
      };

      productMap.set(key, {
        productName: current.productName,
        unitsSold: current.unitsSold + Number(record.quantity ?? 0),
        revenue: current.revenue + Number(record.price ?? 0) * Number(record.quantity ?? 0),
      });
    }
  }

  const top = [...productMap.values()].sort((left, right) => right.unitsSold - left.unitsSold)[0];
  return buildSnapshot(
    orgId,
    "top_product",
    top?.unitsSold ?? fallback?.value ?? 0,
    "this_month",
    ["shopify"],
    fallback?.lastSyncedAt ?? new Date(),
    top ?? (fallback?.metadata as Record<string, unknown> | null),
  );
}

async function computeNewVsReturning(orgId: string) {
  const db = await getDb();
  const fallback = getMemorySnapshot("new_vs_returning");

  if (!db) {
    return fallback!;
  }

  const customers: Array<{ ordersCount: number; syncedAt: Date }> = await db.rawCustomer.findMany({
    where: { organizationId: orgId },
    select: { ordersCount: true, syncedAt: true },
  });

  const newCount = customers.filter((customer) => customer.ordersCount === 1).length;
  const returningCount = customers.filter((customer) => customer.ordersCount >= 2).length;
  const total = newCount + returningCount;
  return buildSnapshot(
    orgId,
    "new_vs_returning",
    total > 0 ? (returningCount / total) * 100 : fallback?.value ?? 0,
    "this_month",
    ["shopify"],
    customers[0]?.syncedAt ?? fallback?.lastSyncedAt ?? new Date(),
    {
      newCount,
      returningCount,
      total,
      trend: fallback?.metadata?.trend ?? 0,
    },
  );
}

async function computeCashInBank(orgId: string) {
  const db = await getDb();
  const fallback = getMemorySnapshot("cash_in_bank");

  if (!db) {
    return fallback!;
  }

  const transactions: Array<{
    amount: number;
    direction: string;
    syncedAt: Date;
    accountName: string | null;
    date: Date;
  }> = await db.rawTransaction.findMany({
    where: { organizationId: orgId },
    orderBy: { date: "asc" },
  });

  const balance = transactions.reduce((sum, transaction) => {
    return sum + (transaction.direction === "credit" ? transaction.amount : -transaction.amount);
  }, 0);

  return buildSnapshot(
    orgId,
    "cash_in_bank",
    balance || fallback?.value || 0,
    "today",
    ["akahu"],
    transactions.at(-1)?.syncedAt ?? fallback?.lastSyncedAt ?? new Date(),
    {
      accountName: transactions.at(-1)?.accountName ?? fallback?.metadata?.accountName ?? "Main account",
      lastTransactionDate:
        transactions.at(-1)?.date.toISOString() ?? fallback?.lastSyncedAt.toISOString() ?? new Date().toISOString(),
      trend: fallback?.metadata?.trend ?? 0,
    },
  );
}

async function computeSalesVsLastMonth(orgId: string, date: Date) {
  const db = await getDb();
  const fallback = getMemorySnapshot("sales_vs_last_month");

  if (!db) {
    return fallback!;
  }

  const [thisMonth, lastMonth] = await Promise.all([
    db.rawOrder.aggregate({
      where: {
        organizationId: orgId,
        shopifyCreatedAt: {
          gte: startOfMonth(date),
          lte: endOfMonth(date),
        },
      },
      _sum: { totalPrice: true },
    }),
    db.rawOrder.aggregate({
      where: {
        organizationId: orgId,
        shopifyCreatedAt: {
          gte: startOfMonth(new Date(date.getFullYear(), date.getMonth() - 1, 1)),
          lte: endOfMonth(new Date(date.getFullYear(), date.getMonth() - 1, 1)),
        },
      },
      _sum: { totalPrice: true },
    }),
  ]);

  const thisMonthValue = thisMonth._sum.totalPrice ?? 0;
  const lastMonthValue = lastMonth._sum.totalPrice ?? 0;
  const pctChange =
    lastMonthValue > 0
      ? ((thisMonthValue - lastMonthValue) / lastMonthValue) * 100
      : fallback?.value ?? 0;

  return buildSnapshot(
    orgId,
    "sales_vs_last_month",
    pctChange,
    "last_month",
    ["shopify"],
    fallback?.lastSyncedAt ?? new Date(),
    {
      thisMonth: thisMonthValue,
      lastMonth: lastMonthValue,
      trend: pctChange,
    },
  );
}

async function computePaymentsReceived(orgId: string, date: Date) {
  const db = await getDb();
  const fallback = getMemorySnapshot("payments_received");

  if (!db) {
    return fallback!;
  }

  const value = await db.rawTransaction.aggregate({
    where: {
      organizationId: orgId,
      direction: "credit",
      date: {
        gte: startOfWeek(date, { weekStartsOn: 1 }),
        lte: endOfWeek(date, { weekStartsOn: 1 }),
      },
    },
    _sum: { amount: true },
    _max: { syncedAt: true },
  });

  return buildSnapshot(
    orgId,
    "payments_received",
    value._sum.amount ?? fallback?.value ?? 0,
    "this_week",
    ["akahu"],
    value._max.syncedAt ?? fallback?.lastSyncedAt ?? new Date(),
    {
      trend: fallback?.metadata?.trend ?? 0,
    },
  );
}
