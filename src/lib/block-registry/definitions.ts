import { CORE_METRICS, PRESET_LAYOUT } from "@/lib/constants";
import type { DashboardLayoutItem, IntegrationProvider, MetricType } from "@/lib/types";

export type BlockDefinition = {
  type: MetricType;
  label: string;
  category: string;
  requiredIntegrations: IntegrationProvider[];
  defaultSize: Pick<DashboardLayoutItem, "w" | "h">;
  defaultPosition: DashboardLayoutItem;
  configOptions: string[];
};

const presetLookup = Object.fromEntries(PRESET_LAYOUT.map((item) => [item.i, item]));

export const BLOCK_REGISTRY: BlockDefinition[] = CORE_METRICS.map((type) => {
  const definitionMap: Record<MetricType, Omit<BlockDefinition, "type" | "defaultPosition">> = {
    revenue_today: {
      label: "Revenue Today",
      category: "Revenue & Sales",
      requiredIntegrations: ["shopify"],
      defaultSize: { w: 4, h: 2 },
      configOptions: ["timeRange", "displayFormat", "accentColor"],
    },
    revenue_this_month: {
      label: "Revenue This Month",
      category: "Revenue & Sales",
      requiredIntegrations: ["shopify"],
      defaultSize: { w: 4, h: 2 },
      configOptions: ["timeRange", "displayFormat", "accentColor"],
    },
    orders_today: {
      label: "Orders Today",
      category: "Revenue & Sales",
      requiredIntegrations: ["shopify"],
      defaultSize: { w: 4, h: 2 },
      configOptions: ["timeRange", "displayFormat", "accentColor"],
    },
    top_product: {
      label: "Top Product",
      category: "Products",
      requiredIntegrations: ["shopify"],
      defaultSize: { w: 6, h: 3 },
      configOptions: ["timeRange", "accentColor"],
    },
    new_vs_returning: {
      label: "New vs Returning",
      category: "Customers",
      requiredIntegrations: ["shopify"],
      defaultSize: { w: 6, h: 3 },
      configOptions: ["timeRange", "displayFormat", "accentColor"],
    },
    cash_in_bank: {
      label: "Cash in Bank",
      category: "Cash & Finance",
      requiredIntegrations: ["akahu"],
      defaultSize: { w: 4, h: 2 },
      configOptions: ["displayFormat", "accentColor"],
    },
    sales_vs_last_month: {
      label: "Sales vs Last Month",
      category: "Revenue & Sales",
      requiredIntegrations: ["shopify"],
      defaultSize: { w: 4, h: 2 },
      configOptions: ["displayFormat", "accentColor"],
    },
    payments_received: {
      label: "Payments Received",
      category: "Cash & Finance",
      requiredIntegrations: ["akahu"],
      defaultSize: { w: 4, h: 2 },
      configOptions: ["timeRange", "displayFormat", "accentColor"],
    },
  };

  return {
    type,
    defaultPosition: presetLookup[type] ?? {
      i: type,
      x: 0,
      y: 0,
      w: 4,
      h: 2,
    },
    ...definitionMap[type],
  };
});

export function getBlockDefinition(type: MetricType) {
  return BLOCK_REGISTRY.find((block) => block.type === type);
}
