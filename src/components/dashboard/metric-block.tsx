"use client";

import { RefreshCcw, TrendingDown, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { StatusDot } from "@/components/dashboard/status-dot";
import { formatCurrency, formatNumber, formatPercent, timeAgo } from "@/lib/utils";
import type { BlockRecord, MetricSnapshotRecord } from "@/lib/types";

function formatValue(snapshot: MetricSnapshotRecord) {
  if (snapshot.metricType === "new_vs_returning" || snapshot.metricType === "sales_vs_last_month") {
    return formatPercent(snapshot.value);
  }

  if (snapshot.metricType === "orders_today" || snapshot.metricType === "top_product") {
    return formatNumber(snapshot.value);
  }

  return formatCurrency(snapshot.value, snapshot.currency);
}

export function MetricBlock({
  block,
  snapshot,
  onRefresh,
  onRemove,
}: {
  block: BlockRecord;
  snapshot: MetricSnapshotRecord;
  onRefresh: (metricType: BlockRecord["metricType"]) => void;
  onRemove?: (blockId: string) => void;
}) {
  const trend = Number(snapshot.metadata?.trend ?? 0);
  const isUp = trend >= 0;

  return (
    <Card className="group flex h-full min-h-[220px] flex-col gap-4 rounded-3xl border-white/10 p-6 transition-all hover:border-indigo-400/30 hover:shadow-[0_0_0_1px_rgba(99,102,241,0.25)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">{block.label}</p>
          <p className="mt-3 font-[family-name:var(--font-display)] text-4xl text-slate-50">
            {formatValue(snapshot)}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <StatusDot status={snapshot.status} />
          {onRemove ? (
            <button
              className="rounded-full border border-transparent p-2 text-slate-500 opacity-0 transition group-hover:opacity-100 hover:border-white/10 hover:text-slate-200"
              onClick={() => onRemove(block.id)}
              type="button"
            >
              <span className="sr-only">Remove block</span>
              ×
            </button>
          ) : null}
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm">
        {isUp ? (
          <TrendingUp className="size-4 text-emerald-300" />
        ) : (
          <TrendingDown className="size-4 text-red-300" />
        )}
        <span className={isUp ? "text-emerald-300" : "text-red-300"}>
          {formatPercent(trend)}
        </span>
        <span className="text-slate-500">vs last month</span>
      </div>

      {snapshot.metadata ? (
        <div className="flex-1 rounded-2xl border border-white/5 bg-white/[0.03] p-4 text-sm text-slate-300">
          {Object.entries(snapshot.metadata)
            .filter(([key]) => key !== "trend")
            .slice(0, 3)
            .map(([key, value]) => (
              <div key={key} className="flex items-center justify-between py-1.5">
                <span className="text-slate-500">{key}</span>
                <span className="font-medium text-slate-200">{String(value)}</span>
              </div>
            ))}
        </div>
      ) : (
        <div className="flex-1" />
      )}

      <Separator />

      <div className="mt-auto flex items-center justify-between gap-3 text-xs text-slate-500">
        <div className="space-y-1">
          <p>Synced {timeAgo(snapshot.lastSyncedAt)}</p>
          <p>from {snapshot.sourceSystems.join(", ")}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0 text-slate-300"
          onClick={() => onRefresh(block.metricType)}
          type="button"
        >
          <RefreshCcw className="size-4" />
        </Button>
      </div>
    </Card>
  );
}
