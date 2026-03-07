export type IntegrationProvider = "shopify" | "akahu" | "stripe";

export type IntegrationStatus = "active" | "error" | "disconnected";

export type MetricStatus = "ok" | "stale" | "partial" | "error";

export type MetricType =
  | "revenue_today"
  | "revenue_this_month"
  | "orders_today"
  | "top_product"
  | "new_vs_returning"
  | "cash_in_bank"
  | "sales_vs_last_month"
  | "payments_received";

export type TimeRange = "today" | "this_month" | "last_month" | "this_week";

export type AlertSeverity = "info" | "warning" | "critical";

export type DashboardLayoutItem = {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  minH?: number;
  maxW?: number;
  maxH?: number;
};

export type BlockConfig = {
  timeRange?: TimeRange;
  displayFormat?: "currency" | "number" | "percentage" | "days";
  accentColor?: string;
};

export type BlockRecord = {
  id: string;
  dashboardId: string;
  metricType: MetricType;
  label: string;
  position: DashboardLayoutItem;
  visible: boolean;
  config?: BlockConfig | null;
};

export type MetricSnapshotRecord = {
  id: string;
  organizationId: string;
  metricType: MetricType;
  value: number;
  currency: string;
  timeRange: TimeRange;
  calculatedAt: Date;
  lastSyncedAt: Date;
  sourceSystems: string[];
  status: MetricStatus;
  definitionVersion: string;
  metadata?: Record<string, unknown> | null;
};

export type DashboardSummary = {
  id: string;
  organizationId: string;
  name: string;
  layout: DashboardLayoutItem[];
  blocks: BlockRecord[];
};

export type IntegrationSummary = {
  id: string;
  provider: IntegrationProvider;
  status: IntegrationStatus;
  connectedAt: string;
  lastSyncedAt: string | null;
};

export type AlertRecord = {
  id: string;
  type: string;
  message: string;
  severity: AlertSeverity;
  createdAt: string;
  read: boolean;
};

export type DigestPreview = {
  subject: string;
  content: string;
};
