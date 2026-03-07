"use client";

import { Layers3, Link2 } from "lucide-react";

import { Card } from "@/components/ui/card";
import { BLOCK_REGISTRY } from "@/lib/block-registry/definitions";
import { cn } from "@/lib/utils";
import type { IntegrationSummary, MetricType } from "@/lib/types";

export function DashboardSidebar({
  integrations,
  onAddBlock,
}: {
  integrations: IntegrationSummary[];
  onAddBlock: (metricType: MetricType) => void;
}) {
  return (
    <aside className="w-full max-w-[280px] shrink-0">
      <Card className="rounded-3xl border-white/10 p-4">
        <div className="mb-4 flex items-center gap-3 px-2">
          <div className="rounded-2xl bg-indigo-500/15 p-2 text-indigo-300">
            <Layers3 className="size-4" />
          </div>
          <div>
            <p className="font-medium text-slate-100">Block library</p>
            <p className="text-sm text-slate-500">Add metrics to your canvas</p>
          </div>
        </div>
        <div className="space-y-3">
          {BLOCK_REGISTRY.map((block) => {
            const connected = block.requiredIntegrations.every((provider) =>
              integrations.some(
                (integration) => integration.provider === provider && integration.status === "active",
              ),
            );

            return (
              <button
                key={block.type}
                className={cn(
                  "w-full rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-left transition hover:border-indigo-400/20 hover:bg-white/[0.06]",
                  !connected && "cursor-not-allowed opacity-50",
                )}
                disabled={!connected}
                onClick={() => onAddBlock(block.type)}
                title={
                  connected
                    ? `Add ${block.label}`
                    : `Connect ${block.requiredIntegrations.join(", ")} to unlock this block`
                }
                type="button"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-slate-100">{block.label}</p>
                    <p className="mt-1 text-xs text-slate-500">{block.category}</p>
                  </div>
                  {connected ? (
                    <span className="inline-flex h-9 items-center rounded-[12px] border border-white/10 bg-white/5 px-3 text-sm">
                      Add
                    </span>
                  ) : (
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Link2 className="size-3" />
                      Locked
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </Card>
    </aside>
  );
}
