"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import GridLayout, { type Layout } from "react-grid-layout";
import { useMemo, useState } from "react";

import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { MetricBlock } from "@/components/dashboard/metric-block";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  CONTAINER_PADDING,
  GRID_COLS,
  MARGIN,
  MAX_H,
  MAX_W,
  MIN_H,
  MIN_W,
  ROW_HEIGHT,
} from "@/lib/constants";
import { getBlockDefinition } from "@/lib/block-registry/definitions";
import { formatCurrency } from "@/lib/utils";
import type {
  AlertRecord,
  DashboardLayoutItem,
  DashboardSummary,
  IntegrationSummary,
  MetricSnapshotRecord,
  MetricType,
} from "@/lib/types";

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
}

export function DashboardShell({
  initialDashboard,
  initialIntegrations,
  initialAlerts,
}: {
  initialDashboard: DashboardSummary;
  initialIntegrations: IntegrationSummary[];
  initialAlerts: AlertRecord[];
}) {
  const queryClient = useQueryClient();
  const [layout, setLayout] = useState<Layout>(initialDashboard.layout as Layout);

  const { data: dashboardData } = useQuery({
    queryKey: ["dashboard", initialDashboard.id],
    queryFn: () => fetchJson<DashboardSummary>(`/api/dashboards/${initialDashboard.id}`),
    initialData: initialDashboard,
  });

  const { data: integrations } = useQuery({
    queryKey: ["integrations"],
    queryFn: () => fetchJson<IntegrationSummary[]>("/api/integrations"),
    initialData: initialIntegrations,
  });

  const { data: metrics } = useQuery({
    queryKey: ["metrics", dashboardData.organizationId],
    queryFn: () => fetchJson<MetricSnapshotRecord[]>("/api/metrics/summary"),
    refetchInterval: 60_000,
    refetchIntervalInBackground: false,
    staleTime: 30_000,
  });

  const { data: alerts } = useQuery({
    queryKey: ["alerts"],
    queryFn: () => fetchJson<AlertRecord[]>("/api/alerts"),
    initialData: initialAlerts,
  });

  const saveLayout = useMutation({
    mutationFn: (nextLayout: Layout) =>
      fetchJson(`/api/dashboards/${dashboardData.id}/layout`, {
        method: "POST",
        body: JSON.stringify({ layout: nextLayout }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard", dashboardData.id] });
    },
  });

  const addBlock = useMutation({
    mutationFn: (metricType: MetricType) => {
      const definition = getBlockDefinition(metricType);
      const nextPosition: DashboardLayoutItem = {
        ...(definition?.defaultPosition ?? {
          i: metricType,
          x: 0,
          y: Number.MAX_SAFE_INTEGER,
          w: 4,
          h: 2,
        }),
        i: `${metricType}-${Date.now()}`,
        minW: MIN_W,
        minH: MIN_H,
        maxW: MAX_W,
        maxH: MAX_H,
      };

      return fetchJson(`/api/dashboards/${dashboardData.id}/blocks`, {
        method: "POST",
        body: JSON.stringify({
          metricType,
          label: definition?.label ?? metricType,
          position: nextPosition,
        }),
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["dashboard", dashboardData.id] });
    },
  });

  const removeBlock = useMutation({
    mutationFn: (blockId: string) =>
      fetchJson(`/api/dashboards/${dashboardData.id}/blocks/${blockId}`, {
        method: "DELETE",
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["dashboard", dashboardData.id] });
    },
  });

  const refreshMetric = useMutation({
    mutationFn: (metricType: MetricType) =>
      fetchJson(`/api/metrics/refresh`, {
        method: "POST",
        body: JSON.stringify({ metricType }),
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["metrics", dashboardData.organizationId] });
    },
  });

  const snapshotMap = useMemo(
    () => new Map((metrics ?? []).map((snapshot) => [snapshot.metricType, snapshot])),
    [metrics],
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">Morning dashboard</p>
          <h1 className="font-[family-name:var(--font-display)] text-4xl">
            {dashboardData.name}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="success">Shopify + Akahu connected</Badge>
          <Badge>{metrics?.length ?? 0} live metrics</Badge>
        </div>
      </div>

      {alerts.length > 0 ? (
        <div className="grid gap-3 md:grid-cols-2">
          {alerts.map((alert) => (
            <Card
              key={alert.id}
              className="rounded-2xl border border-amber-400/20 bg-amber-500/5 p-4"
            >
              <p className="text-sm text-amber-200">{alert.message}</p>
            </Card>
          ))}
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[1fr_280px]">
        <div className="canvas-grid rounded-[28px] border border-white/8 bg-[var(--surface)]/70 p-4">
          <GridLayout
            className="layout"
            width={960}
            gridConfig={{
              cols: GRID_COLS,
              rowHeight: ROW_HEIGHT,
              margin: MARGIN,
              containerPadding: CONTAINER_PADDING,
              maxRows: 12,
            }}
            dragConfig={{
              handle: ".drag-handle",
            }}
            layout={layout}
            onLayoutChange={(nextLayout) => setLayout(nextLayout)}
            onDragStop={(nextLayout) => saveLayout.mutate(nextLayout)}
            onResizeStop={(nextLayout) => saveLayout.mutate(nextLayout)}
          >
            {dashboardData.blocks.map((block) => {
              const snapshot = snapshotMap.get(block.metricType);

              if (!snapshot) {
                return (
                  <div key={block.position.i}>
                    <Card className="h-full min-h-[220px] rounded-3xl border-white/10 p-6">
                      <p className="text-slate-400">Loading {block.label}...</p>
                    </Card>
                  </div>
                );
              }

              return (
                <div key={block.position.i}>
                  <MetricBlock
                    block={block}
                    snapshot={snapshot}
                    onRefresh={(metricType) => refreshMetric.mutate(metricType)}
                    onRemove={(blockId) => removeBlock.mutate(blockId)}
                  />
                </div>
              );
            })}
          </GridLayout>
        </div>

        <DashboardSidebar integrations={integrations} onAddBlock={(metric) => addBlock.mutate(metric)} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="rounded-3xl p-5">
          <p className="text-sm text-slate-400">Revenue this month</p>
          <p className="mt-3 text-3xl font-semibold text-slate-50">
            {formatCurrency(snapshotMap.get("revenue_this_month")?.value ?? 0)}
          </p>
        </Card>
        <Card className="rounded-3xl p-5">
          <p className="text-sm text-slate-400">Cash in bank</p>
          <p className="mt-3 text-3xl font-semibold text-slate-50">
            {formatCurrency(snapshotMap.get("cash_in_bank")?.value ?? 0)}
          </p>
        </Card>
        <Card className="rounded-3xl p-5">
          <p className="text-sm text-slate-400">Orders today</p>
          <p className="mt-3 text-3xl font-semibold text-slate-50">
            {snapshotMap.get("orders_today")?.value ?? 0}
          </p>
        </Card>
      </div>
    </div>
  );
}
