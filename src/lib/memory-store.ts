import { randomUUID } from "node:crypto";

import {
  demoAlerts,
  demoBlocks,
  demoDashboard,
  demoIntegrations,
  demoOrganization,
  demoSnapshots,
} from "@/lib/demo-data";
import type {
  AlertRecord,
  BlockRecord,
  DashboardLayoutItem,
  DashboardSummary,
  IntegrationSummary,
  MetricSnapshotRecord,
  MetricType,
} from "@/lib/types";

const state = {
  organization: { ...demoOrganization },
  integrations: [...demoIntegrations],
  dashboard: {
    ...demoDashboard,
    layout: [...demoDashboard.layout],
    blocks: [...demoBlocks],
  } as DashboardSummary,
  snapshots: [...demoSnapshots],
  alerts: [...demoAlerts],
};

export function getMemoryOrganization() {
  return state.organization;
}

export function updateMemoryOrganization(data: Partial<typeof demoOrganization>) {
  state.organization = { ...state.organization, ...data };
  return state.organization;
}

export function getMemoryIntegrations() {
  return state.integrations;
}

export function getMemoryDashboard() {
  return state.dashboard;
}

export function updateMemoryLayout(layout: DashboardLayoutItem[]) {
  state.dashboard = {
    ...state.dashboard,
    layout,
    blocks: state.dashboard.blocks.map((block) => {
      const nextPosition = layout.find((item) => item.i === block.position.i);
      return nextPosition ? { ...block, position: nextPosition } : block;
    }),
  };

  return state.dashboard;
}

export function addMemoryBlock(input: {
  metricType: MetricType;
  label: string;
  position: DashboardLayoutItem;
}) {
  const block: BlockRecord = {
    id: randomUUID(),
    dashboardId: state.dashboard.id,
    metricType: input.metricType,
    label: input.label,
    position: input.position,
    visible: true,
    config: null,
  };

  state.dashboard = {
    ...state.dashboard,
    layout: [...state.dashboard.layout, input.position],
    blocks: [...state.dashboard.blocks, block],
  };

  return block;
}

export function updateMemoryBlock(
  blockId: string,
  data: Partial<Pick<BlockRecord, "label" | "config">>,
) {
  state.dashboard = {
    ...state.dashboard,
    blocks: state.dashboard.blocks.map((block) =>
      block.id === blockId ? { ...block, ...data } : block,
    ),
  };

  return state.dashboard.blocks.find((block) => block.id === blockId) ?? null;
}

export function removeMemoryBlock(blockId: string) {
  const target = state.dashboard.blocks.find((block) => block.id === blockId);

  state.dashboard = {
    ...state.dashboard,
    blocks: state.dashboard.blocks.filter((block) => block.id !== blockId),
    layout: state.dashboard.layout.filter((item) => item.i !== target?.position.i),
  };

  return target;
}

export function getMemorySnapshots() {
  return state.snapshots;
}

export function getMemorySnapshot(metricType: MetricType) {
  return state.snapshots.find((snapshot) => snapshot.metricType === metricType) ?? null;
}

export function setMemorySnapshot(snapshot: MetricSnapshotRecord) {
  state.snapshots = [
    ...state.snapshots.filter((entry) => entry.metricType !== snapshot.metricType),
    snapshot,
  ];

  return snapshot;
}

export function getMemoryAlerts() {
  return state.alerts;
}

export function markMemoryAlertRead(alertId: string) {
  state.alerts = state.alerts.map((alert) =>
    alert.id === alertId ? { ...alert, read: true } : alert,
  );

  return state.alerts.find((alert) => alert.id === alertId) ?? null;
}

export function createMemoryAlert(alert: Omit<AlertRecord, "id" | "createdAt" | "read">) {
  const nextAlert: AlertRecord = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    read: false,
    ...alert,
  };

  state.alerts = [nextAlert, ...state.alerts];
  return nextAlert;
}

export function connectMemoryIntegration(provider: IntegrationSummary["provider"]) {
  const nextIntegration: IntegrationSummary = {
    id: randomUUID(),
    provider,
    status: "active",
    connectedAt: new Date().toISOString(),
    lastSyncedAt: new Date().toISOString(),
  };

  state.integrations = [
    ...state.integrations.filter((integration) => integration.provider !== provider),
    nextIntegration,
  ];

  return nextIntegration;
}
