import { subMinutes } from "date-fns";

import {
  DEFAULT_DIGEST_TIME,
  DEFAULT_TIMEZONE,
  DEFINITION_VERSION,
  DEMO_DASHBOARD_ID,
  DEMO_ORG_ID,
  PRESET_LAYOUT,
} from "@/lib/constants";
import type {
  AlertRecord,
  BlockRecord,
  DashboardSummary,
  IntegrationSummary,
  MetricSnapshotRecord,
} from "@/lib/types";

const now = new Date();

export const demoIntegrations: IntegrationSummary[] = [
  {
    id: "int-shopify-demo",
    provider: "shopify",
    status: "active",
    connectedAt: subMinutes(now, 60 * 24 * 8).toISOString(),
    lastSyncedAt: subMinutes(now, 6).toISOString(),
  },
  {
    id: "int-akahu-demo",
    provider: "akahu",
    status: "active",
    connectedAt: subMinutes(now, 60 * 24 * 5).toISOString(),
    lastSyncedAt: subMinutes(now, 14).toISOString(),
  },
];

export const demoSnapshots: MetricSnapshotRecord[] = [
  {
    id: "snap-revenue-month",
    organizationId: DEMO_ORG_ID,
    metricType: "revenue_this_month",
    value: 14250,
    currency: "NZD",
    timeRange: "this_month",
    calculatedAt: now,
    lastSyncedAt: subMinutes(now, 6),
    sourceSystems: ["shopify"],
    status: "ok",
    definitionVersion: DEFINITION_VERSION,
    metadata: { trend: 12, subtitle: "vs last month" },
  },
  {
    id: "snap-cash-bank",
    organizationId: DEMO_ORG_ID,
    metricType: "cash_in_bank",
    value: 38600,
    currency: "NZD",
    timeRange: "today",
    calculatedAt: now,
    lastSyncedAt: subMinutes(now, 14),
    sourceSystems: ["akahu"],
    status: "ok",
    definitionVersion: DEFINITION_VERSION,
    metadata: { accountName: "Main Trading Account", trend: 5.2 },
  },
  {
    id: "snap-orders-today",
    organizationId: DEMO_ORG_ID,
    metricType: "orders_today",
    value: 18,
    currency: "NZD",
    timeRange: "today",
    calculatedAt: now,
    lastSyncedAt: subMinutes(now, 6),
    sourceSystems: ["shopify"],
    status: "ok",
    definitionVersion: DEFINITION_VERSION,
    metadata: { trend: 8.5 },
  },
  {
    id: "snap-top-product",
    organizationId: DEMO_ORG_ID,
    metricType: "top_product",
    value: 42,
    currency: "NZD",
    timeRange: "this_month",
    calculatedAt: now,
    lastSyncedAt: subMinutes(now, 6),
    sourceSystems: ["shopify"],
    status: "ok",
    definitionVersion: DEFINITION_VERSION,
    metadata: { productName: "Ceremonial Matcha Tin", unitsSold: 42, revenue: 2310, trend: 15.8 },
  },
  {
    id: "snap-new-returning",
    organizationId: DEMO_ORG_ID,
    metricType: "new_vs_returning",
    value: 64,
    currency: "NZD",
    timeRange: "this_month",
    calculatedAt: now,
    lastSyncedAt: subMinutes(now, 6),
    sourceSystems: ["shopify"],
    status: "ok",
    definitionVersion: DEFINITION_VERSION,
    metadata: { newCount: 48, returningCount: 85, total: 133, trend: 4.1 },
  },
  {
    id: "snap-revenue-today",
    organizationId: DEMO_ORG_ID,
    metricType: "revenue_today",
    value: 2450,
    currency: "NZD",
    timeRange: "today",
    calculatedAt: now,
    lastSyncedAt: subMinutes(now, 6),
    sourceSystems: ["shopify"],
    status: "ok",
    definitionVersion: DEFINITION_VERSION,
    metadata: { trend: 9.7 },
  },
  {
    id: "snap-sales-vs",
    organizationId: DEMO_ORG_ID,
    metricType: "sales_vs_last_month",
    value: 12.4,
    currency: "NZD",
    timeRange: "last_month",
    calculatedAt: now,
    lastSyncedAt: subMinutes(now, 6),
    sourceSystems: ["shopify"],
    status: "ok",
    definitionVersion: DEFINITION_VERSION,
    metadata: { thisMonth: 14250, lastMonth: 12680, trend: 12.4 },
  },
  {
    id: "snap-payments",
    organizationId: DEMO_ORG_ID,
    metricType: "payments_received",
    value: 9700,
    currency: "NZD",
    timeRange: "this_week",
    calculatedAt: now,
    lastSyncedAt: subMinutes(now, 14),
    sourceSystems: ["akahu"],
    status: "ok",
    definitionVersion: DEFINITION_VERSION,
    metadata: { trend: 6.1 },
  },
];

export const demoBlocks: BlockRecord[] = PRESET_LAYOUT.map((item) => ({
  id: `block-${item.i}`,
  dashboardId: DEMO_DASHBOARD_ID,
  metricType: item.i as BlockRecord["metricType"],
  label:
    item.i === "revenue_this_month"
      ? "Revenue This Month"
      : item.i === "cash_in_bank"
        ? "Cash in Bank"
        : item.i === "orders_today"
          ? "Orders Today"
          : item.i === "top_product"
            ? "Top Product"
            : "New vs Returning",
  position: item,
  visible: true,
  config: null,
}));

export const demoDashboard: DashboardSummary = {
  id: DEMO_DASHBOARD_ID,
  organizationId: DEMO_ORG_ID,
  name: "Daily Check",
  layout: PRESET_LAYOUT,
  blocks: demoBlocks,
};

export const demoAlerts: AlertRecord[] = [
  {
    id: "alert-1",
    type: "cash_low",
    message: "Cash is tighter than usual - you have about 19 days of runway at current spend.",
    severity: "warning",
    createdAt: subMinutes(now, 25).toISOString(),
    read: false,
  },
  {
    id: "alert-2",
    type: "revenue_drop",
    message: "Sales are down 32% compared to this time last month for your weekend collection.",
    severity: "info",
    createdAt: subMinutes(now, 90).toISOString(),
    read: false,
  },
];

export const demoOrganization = {
  id: DEMO_ORG_ID,
  name: "Harbour Matcha",
  digestTime: DEFAULT_DIGEST_TIME,
  timezone: DEFAULT_TIMEZONE,
};
