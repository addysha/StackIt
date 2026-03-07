import type { DashboardLayoutItem, MetricType } from "@/lib/types";

export const GRID_COLS = 12;
export const ROW_HEIGHT = 120;
export const MARGIN: [number, number] = [12, 12];
export const CONTAINER_PADDING: [number, number] = [16, 16];
export const MIN_W = 2;
export const MIN_H = 2;
export const MAX_W = 6;
export const MAX_H = 4;

export const PRESET_LAYOUT: DashboardLayoutItem[] = [
  { i: "revenue_this_month", x: 0, y: 0, w: 4, h: 2, minW: 2, minH: 2 },
  { i: "cash_in_bank", x: 4, y: 0, w: 4, h: 2, minW: 2, minH: 2 },
  { i: "orders_today", x: 8, y: 0, w: 4, h: 2, minW: 2, minH: 2 },
  { i: "top_product", x: 0, y: 2, w: 6, h: 3, minW: 3, minH: 2 },
  { i: "new_vs_returning", x: 6, y: 2, w: 6, h: 3, minW: 3, minH: 2 },
];

export const CORE_METRICS: MetricType[] = [
  "revenue_today",
  "revenue_this_month",
  "orders_today",
  "top_product",
  "new_vs_returning",
  "cash_in_bank",
  "sales_vs_last_month",
  "payments_received",
];

export const DEMO_ORG_ID = "demo-org";
export const DEMO_DASHBOARD_ID = "demo-dashboard";
export const DEFINITION_VERSION = "1.0";
export const DEFAULT_TIMEZONE = "Pacific/Auckland";
export const DEFAULT_DIGEST_TIME = "07:00";
