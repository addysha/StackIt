"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Pencil,
  Check,
  X,
  AlertTriangle,
  Package,
  Building2,
  DollarSign,
  Receipt,
  RotateCcw,
  Calendar,
  FileText,
  TrendingDown,
  Users,
  Repeat,
  Gem,
  Target,
  LayoutGrid,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const DEMO_DETAIL: Record<
  string,
  { title: string; val: string; dir: "up" | "dn"; txt: string; meta: string }
> = {
  revenue: {
    title: "Revenue This Month",
    val: "$14,250",
    dir: "up",
    txt: "12% vs last month",
    meta: "Synced 3m ago · Shopify",
  },
  cash: {
    title: "Cash & Runway",
    val: "$8,420",
    dir: "dn",
    txt: "18-day runway — low",
    meta: "Synced 1h ago · Akahu",
  },
  orders: {
    title: "Orders Today",
    val: "24",
    dir: "up",
    txt: "3 more than yesterday",
    meta: "Synced 3m ago · Shopify",
  },
};

const DEFAULT_WIDGET_IDS = [
  "revenue",
  "cash",
  "bars",
  "heat",
  "products",
  "cashflow",
  "orders",
];

const SPAN_CLASS: Record<string, string> = {
  revenue: "md:col-span-3",
  cash: "md:col-span-2",
  bars: "md:col-span-2",
  heat: "md:col-span-2",
  products: "md:col-span-4",
  cashflow: "md:col-span-2",
  orders: "md:col-span-2",
};

const PICKER_CATEGORIES: {
  title: string;
  icon: LucideIcon;
  items: { id: string; name: string; icon: LucideIcon; viz: string }[];
}[] = [
  {
    title: "Revenue & Sales",
    icon: DollarSign,
    items: [
      { id: "revenue-today", name: "Revenue Today", icon: DollarSign, viz: "Sparkline" },
      { id: "avg-order", name: "Avg Order Value", icon: Receipt, viz: "Number" },
      { id: "refunds", name: "Refunds", icon: RotateCcw, viz: "Number" },
    ],
  },
  {
    title: "Cash & Finance",
    icon: Building2,
    items: [
      { id: "runway", name: "Cash Runway", icon: Calendar, viz: "Gauge" },
      { id: "invoices", name: "Overdue Invoices", icon: FileText, viz: "Number" },
      { id: "expenses", name: "Expenses", icon: TrendingDown, viz: "Bar chart" },
    ],
  },
  {
    title: "Customers",
    icon: Users,
    items: [
      { id: "new-cust", name: "New Customers", icon: Users, viz: "Number" },
      { id: "retention", name: "Retention Rate", icon: Repeat, viz: "Progress" },
      { id: "ltv", name: "Customer LTV", icon: Gem, viz: "Number" },
    ],
  },
  {
    title: "Goals",
    icon: Target,
    items: [
      { id: "goal", name: "Revenue Goal", icon: Target, viz: "Progress bar" },
      { id: "heatmap", name: "Sales Heatmap", icon: LayoutGrid, viz: "Heatmap" },
      { id: "custom", name: "Custom Metric", icon: Pencil, viz: "Set yours" },
    ],
  },
];

export function ProductPreview() {
  const [editMode, setEditMode] = useState(false);
  const [detailWidget, setDetailWidget] = useState<string | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [widgetIds, setWidgetIds] = useState<string[]>(DEFAULT_WIDGET_IDS);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dropOverId, setDropOverId] = useState<string | null>(null);

  const handleDragStart = useCallback(
    (e: React.DragEvent, id: string) => {
      if (!editMode) {
        e.preventDefault();
        return;
      }
      setDraggingId(id);
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", id);
    },
    [editMode]
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent, id: string) => {
      e.preventDefault();
      if (draggingId && draggingId !== id) setDropOverId(id);
    },
    [draggingId]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent, targetId: string) => {
      e.preventDefault();
      const sourceId = e.dataTransfer.getData("text/plain");
      if (!sourceId || sourceId === targetId) {
        setDraggingId(null);
        setDropOverId(null);
        return;
      }
      setWidgetIds((prev) => {
        const i = prev.indexOf(sourceId);
        const j = prev.indexOf(targetId);
        if (i === -1 || j === -1) return prev;
        const next = [...prev];
        next.splice(i, 1);
        next.splice(next.indexOf(targetId), 0, sourceId);
        return next;
      });
      setDraggingId(null);
      setDropOverId(null);
    },
    []
  );

  const handleDragEnd = useCallback(() => {
    setDraggingId(null);
    setDropOverId(null);
  }, []);

  const removeWidget = useCallback((e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setWidgetIds((prev) => prev.filter((w) => w !== id));
  }, []);

  const addWidget = useCallback((item: { id: string; name: string }) => {
    setWidgetIds((prev) => [...prev, `custom-${item.id}-${Date.now()}`]);
    setPickerOpen(false);
  }, []);

  const openDetail = useCallback((id: string) => {
    if (DEMO_DETAIL[id]) setDetailWidget(id);
  }, []);

  const heatCells = [
    0.12, 0.25, 0.4, 0.18, 0.58, 0.88, 0.72, 0.15, 0.3, 0.46, 0.22, 0.62, 0.9,
    0.76,
  ];

  return (
    <section
      id="demo"
      className="relative overflow-hidden bg-[#1E1810] px-4 py-20 md:px-6 md:py-28"
    >
      <div className="mx-auto max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-3.5 text-xs font-bold uppercase tracking-[0.1em] text-white/40"
        >
          Interactive demo
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl"
          style={{ fontFamily: "var(--font-hero)" }}
        >
          This is the actual dashboard.
          <br />
          <em className="italic text-[var(--accent)]">Try it right here.</em>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-4 max-w-[520px] text-base leading-relaxed text-white/55"
        >
          Not a video. Not screenshots. A working demo — drag widgets around, go
          into edit mode, add new widgets, click any metric to see the detail
          view.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          {[
            { color: "var(--accent)", text: "Click Edit to rearrange" },
            { color: "#3fa85f", text: "Drag widgets to reorder" },
            { color: "#6fcf97", text: "Tap any metric for details" },
            { color: "#e8916a", text: "Press + to add widgets" },
          ].map((h) => (
            <div
              key={h.text}
              className="flex items-center gap-2 text-sm font-medium text-white/55"
            >
              <span
                className="size-2 rounded-full"
                style={{ background: h.color }}
              />
              {h.text}
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-2xl"
      >
        <div className="flex items-center gap-2.5 border-b border-white/10 bg-white/[0.06] px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="size-2 rounded-full bg-[#FF6058]" />
            <span className="size-2 rounded-full bg-[#FFBD2E]" />
            <span className="size-2 rounded-full bg-[#29C940]" />
          </div>
          <div className="flex-1 rounded-md bg-white/[0.07] px-3 py-1.5 text-xs font-medium text-white/30">
            app.stackit.co.nz/dashboard
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-[var(--success)]">
            <span className="size-1.5 rounded-full bg-[var(--success)]" />
            LIVE
          </div>
        </div>

        <div className="relative max-h-[620px] overflow-y-auto bg-[#1E1810]">
          <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3">
            <span
              className="text-base font-semibold text-white/90"
              style={{ fontFamily: "var(--font-hero)" }}
            >
              Stack<span className="text-[var(--accent)]">it</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setEditMode((e) => !e)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                  editMode
                    ? "border-[var(--accent)] bg-[var(--accent)]/15 text-[var(--accent)]"
                    : "border-white/12 bg-white/8 text-white/70 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                )}
              >
                {editMode ? (
                  <>
                    <Check className="size-3.5" />
                    Done
                  </>
                ) : (
                  <>
                    <Pencil className="size-3.5" />
                    Edit
                  </>
                )}
              </button>
              <span className="flex size-7 items-center justify-center rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-hover)] text-[10px] font-bold text-white">
                AD
              </span>
            </div>
          </div>

          <div className="px-4 pb-2 pt-1">
            <h3 className="text-base font-semibold text-white/90" style={{ fontFamily: "var(--font-hero)" }}>
              Morning, Addy
            </h3>
            <p className="text-xs text-white/40">
              Here&apos;s your business at a glance · Sun 08 Mar 2026
            </p>
          </div>

          <button
            type="button"
            onClick={() => openDetail("cash")}
            className="mx-4 mb-2 flex w-[calc(100%-2rem)] items-center gap-2 rounded-lg border border-[var(--warning)]/20 bg-[var(--warning)]/10 px-3 py-2.5 text-left text-sm font-medium text-amber-100/90 transition-colors hover:bg-[var(--warning)]/15"
          >
            <AlertTriangle className="size-4 shrink-0" />
            <span className="flex-1">
              Cash runway is tighter than usual — <strong>18 days</strong> at
              current spend
            </span>
            <span className="opacity-40">›</span>
          </button>

          <div className="px-3 pb-4 pt-2">
            <div className="mb-2 text-[9.5px] font-bold uppercase tracking-wider text-white/30">
              Overview
            </div>
            <div
              className="grid grid-cols-2 gap-2 md:grid-cols-6"
              onDragEnd={handleDragEnd}
            >
              {widgetIds.map((id) => {
                const span = SPAN_CLASS[id] ?? "md:col-span-2";
                const isDragging = draggingId === id;
                const isDropOver = dropOverId === id;
                const showRemove = editMode && widgetIds.length > 1;
                return (
                  <div
                    key={id}
                    draggable={editMode}
                    onDragStart={(e) => handleDragStart(e, id)}
                    onDragOver={(e) => handleDragOver(e, id)}
                    onDrop={(e) => handleDrop(e, id)}
                    onClick={() => !editMode && DEMO_DETAIL[id] && openDetail(id)}
                    className={cn(
                      "relative col-span-2 cursor-default rounded-xl border bg-white/[0.06] p-3.5 transition-all",
                      span,
                      editMode && "cursor-grab",
                      isDragging && "scale-[1.02] rotate-[0.8deg] border-[var(--accent)] opacity-95 shadow-xl",
                      isDropOver && "border-[var(--accent)] bg-[var(--accent)]/10 ring-2 ring-[var(--accent)]"
                    )}
                  >
                    {showRemove && (
                      <button
                        type="button"
                        onClick={(e) => removeWidget(e, id)}
                        className="absolute -left-1.5 -top-1.5 z-10 flex size-[18px] items-center justify-center rounded-full border-2 border-[#1E1810] bg-[var(--danger)] text-[11px] font-bold text-white hover:scale-110"
                        aria-label="Remove widget"
                      >
                        <X className="size-2.5" />
                      </button>
                    )}
                    {id === "revenue" && (
                      <>
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-[9.5px] font-bold uppercase tracking-wider text-white/35">
                            Revenue · Month
                          </span>
                          <span className="size-1.5 rounded-full bg-[var(--success)]" />
                        </div>
                        <div className="text-2xl font-semibold text-white" style={{ fontFamily: "var(--font-hero)" }}>
                          $14,250
                        </div>
                        <span className="mt-1 inline-flex rounded-full bg-[var(--success)]/20 px-2 py-0.5 text-[10.5px] font-bold text-[var(--success)]">
                          ↑ 12% vs last month
                        </span>
                        <div className="mt-2 h-8 w-full opacity-70">
                          <svg viewBox="0 0 220 30" preserveAspectRatio="none" className="h-full w-full">
                            <path
                              d="M0,28 L28,22 L55,24 L83,15 L110,18 L138,10 L165,13 L193,6 L220,3"
                              fill="none"
                              stroke="#3fa85f"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                        <div className="mt-2 flex justify-between border-t border-white/[0.07] pt-2 text-[9px] text-white/25">
                          <span>Synced 3m ago</span>
                          <span className="rounded border border-white/8 bg-white/6 px-1.5 py-0.5 font-semibold text-white/30">
                            shopify
                          </span>
                        </div>
                      </>
                    )}
                    {id === "cash" && (
                      <>
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-[9.5px] font-bold uppercase tracking-wider text-white/35">
                            Cash · Runway
                          </span>
                          <span className="size-1.5 rounded-full bg-[var(--warning)]" />
                        </div>
                        <div className="text-2xl font-semibold text-[var(--warning)]" style={{ fontFamily: "var(--font-hero)" }}>
                          18 days
                        </div>
                        <div className="mt-2">
                          <div className="mb-1 flex justify-between text-[10px] text-white/35">
                            <span>$8,420</span>
                            <span className="font-bold text-[var(--danger)]">Low</span>
                          </div>
                          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-[var(--success)] via-[var(--warning)] to-[var(--danger)]"
                              style={{ width: "28%" }}
                            />
                          </div>
                          <div className="mt-1 flex justify-between text-[9px] text-white/25">
                            <span>0d</span>
                            <span>90d</span>
                          </div>
                        </div>
                        <div className="mt-2 flex justify-between border-t border-white/[0.07] pt-2 text-[9px] text-white/25">
                          <span>Synced 1h ago</span>
                          <span className="rounded border border-white/8 bg-white/6 px-1.5 py-0.5 font-semibold text-white/30">
                            akahu
                          </span>
                        </div>
                      </>
                    )}
                    {id === "bars" && (
                      <>
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-[9.5px] font-bold uppercase tracking-wider text-white/35">
                            Sales · 6 Months
                          </span>
                          <span className="size-1.5 rounded-full bg-[var(--success)]" />
                        </div>
                        <div className="text-lg font-semibold text-[var(--success)]">+12% MoM</div>
                        <div className="mt-2 flex items-end gap-0.5 h-10">
                          {["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"].map((m, i) => (
                            <div key={m} className="flex flex-1 flex-col items-center gap-0.5">
                              <div
                                className="w-full rounded-t-sm bg-[var(--success)]/50"
                                style={{
                                  height: `${[55, 68, 62, 72, 76, 95][i]}%`,
                                }}
                              />
                              <span className="text-[7px] text-white/25">{m}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-2 flex justify-between border-t border-white/[0.07] pt-2 text-[9px] text-white/25">
                          <span>Synced 3m ago</span>
                          <span className="rounded border border-white/8 bg-white/6 px-1.5 py-0.5 font-semibold text-white/30">
                            shopify
                          </span>
                        </div>
                      </>
                    )}
                    {id === "heat" && (
                      <>
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-[9.5px] font-bold uppercase tracking-wider text-white/35">
                            Sales by Day
                          </span>
                          <span className="size-1.5 rounded-full bg-[var(--success)]" />
                        </div>
                        <div className="grid grid-cols-7 gap-0.5">
                          {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
                            <div key={d} className="text-center text-[7.5px] font-semibold text-white/25">
                              {d}
                            </div>
                          ))}
                          {heatCells.map((opacity, i) => (
                            <div
                              key={i}
                              className="aspect-square rounded-sm bg-[var(--accent)]"
                              style={{ opacity }}
                            />
                          ))}
                        </div>
                        <div className="mt-2 flex items-center gap-1 text-[8.5px] text-white/20">
                          <span>Less</span>
                          <div className="h-1 flex-1 rounded bg-gradient-to-r from-[var(--accent)]/10 to-[var(--accent)]" />
                          <span>More</span>
                        </div>
                        <div className="mt-2 flex justify-between border-t border-white/[0.07] pt-2 text-[9px] text-white/25">
                          <span>Synced 3m ago</span>
                          <span className="rounded border border-white/8 bg-white/6 px-1.5 py-0.5 font-semibold text-white/30">
                            shopify
                          </span>
                        </div>
                      </>
                    )}
                    {id === "products" && (
                      <>
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-[9.5px] font-bold uppercase tracking-wider text-white/35">
                            Top Products · Month
                          </span>
                          <span className="size-1.5 rounded-full bg-[var(--success)]" />
                        </div>
                        <div className="space-y-0">
                          {[
                            { name: "Merino Tee — Black", val: "$4,260", pct: 100 },
                            { name: "Canvas Tote", val: "$2,940", pct: 69 },
                            { name: "Beanie — Grey", val: "$1,340", pct: 31 },
                            { name: "Hoodie — Slate", val: "$980", pct: 23 },
                          ].map((row, idx) => (
                            <div
                              key={row.name}
                              className="flex items-center gap-2 border-b border-white/[0.07] py-1.5 last:border-0"
                            >
                              <span className="w-4 text-[9.5px] font-bold text-white/25">
                                0{idx + 1}
                              </span>
                              <span className="flex-1 text-[11.5px] font-medium text-white/70">
                                {row.name}
                              </span>
                              <div className="h-1 w-12 overflow-hidden rounded-full bg-white/10">
                                <div
                                  className="h-full rounded-full bg-[var(--accent)]"
                                  style={{ width: `${row.pct}%` }}
                                />
                              </div>
                              <span className="min-w-[38px] text-right text-[11px] font-bold text-white/85" style={{ fontFamily: "var(--font-hero)" }}>
                                {row.val}
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-2 flex justify-between border-t border-white/[0.07] pt-2 text-[9px] text-white/25">
                          <span>Synced 3m ago</span>
                          <span className="rounded border border-white/8 bg-white/6 px-1.5 py-0.5 font-semibold text-white/30">
                            shopify
                          </span>
                        </div>
                      </>
                    )}
                    {id === "cashflow" && (
                      <>
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-[9.5px] font-bold uppercase tracking-wider text-white/35">
                            Cashflow · Week
                          </span>
                          <span className="size-1.5 rounded-full bg-[var(--success)]" />
                        </div>
                        <div className="grid grid-cols-2 gap-1.5 mb-2">
                          <div className="rounded-lg bg-[var(--success)]/10 p-2">
                            <div className="text-[8.5px] font-bold uppercase tracking-wider text-white/30">
                              In
                            </div>
                            <div className="text-base font-semibold text-[var(--success)]" style={{ fontFamily: "var(--font-hero)" }}>
                              $6,820
                            </div>
                          </div>
                          <div className="rounded-lg bg-[var(--danger)]/10 p-2">
                            <div className="text-[8.5px] font-bold uppercase tracking-wider text-white/30">
                              Out
                            </div>
                            <div className="text-base font-semibold text-[var(--danger)]" style={{ fontFamily: "var(--font-hero)" }}>
                              $4,240
                            </div>
                          </div>
                        </div>
                        <div className="space-y-0">
                          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-2.5 py-2">
                            <Package className="size-3.5 shrink-0 text-white/50" />
                            <span className="flex-1 text-xs text-white/75">Shopify sales</span>
                            <span className="text-xs font-bold text-[var(--success)]">+$4,260</span>
                          </div>
                          <div className="mt-1.5 flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-2.5 py-2">
                            <Building2 className="size-3.5 shrink-0 text-white/50" />
                            <span className="flex-1 text-xs text-white/75">Rent</span>
                            <span className="text-xs font-bold text-[var(--danger)]">−$1,440</span>
                          </div>
                        </div>
                        <div className="mt-2 flex justify-between border-t border-white/[0.07] pt-2 text-[9px] text-white/25">
                          <span>Synced 1h ago</span>
                          <span className="rounded border border-white/8 bg-white/6 px-1.5 py-0.5 font-semibold text-white/30">
                            akahu
                          </span>
                        </div>
                      </>
                    )}
                    {id === "orders" && (
                      <>
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-[9.5px] font-bold uppercase tracking-wider text-white/35">
                            Orders · Today
                          </span>
                          <span className="size-1.5 rounded-full bg-[var(--success)]" />
                        </div>
                        <div className="text-2xl font-semibold text-white" style={{ fontFamily: "var(--font-hero)" }}>
                          24
                        </div>
                        <span className="mt-1 inline-flex rounded-full bg-[var(--success)]/20 px-2 py-0.5 text-[10.5px] font-bold text-[var(--success)]">
                          ↑ 3 vs yesterday
                        </span>
                        <div className="mt-2 rounded-lg bg-white/[0.04] p-2">
                          <div className="flex justify-between text-[11px]">
                            <span className="text-white/40">Avg order</span>
                            <span className="font-bold text-white" style={{ fontFamily: "var(--font-hero)" }}>
                              $59.13
                            </span>
                          </div>
                          <div className="mt-1 flex justify-between text-[11px]">
                            <span className="text-white/40">Refunds</span>
                            <span className="font-bold text-[var(--danger)]">$240</span>
                          </div>
                        </div>
                        <div className="mt-2 flex justify-between border-t border-white/[0.07] pt-2 text-[9px] text-white/25">
                          <span>Synced 3m ago</span>
                          <span className="rounded border border-white/8 bg-white/6 px-1.5 py-0.5 font-semibold text-white/30">
                            shopify
                          </span>
                        </div>
                      </>
                    )}
                    {id.startsWith("custom-") && (
                      <>
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-[9.5px] font-bold uppercase tracking-wider text-white/35">
                            New widget
                          </span>
                        </div>
                        <div className="text-lg font-semibold text-white/80">—</div>
                        <div className="mt-2 flex justify-between border-t border-white/[0.07] pt-2 text-[9px] text-white/25">
                          <span>just added</span>
                          <span className="rounded border border-white/8 bg-white/6 px-1.5 py-0.5 font-semibold text-white/30">
                            manual
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="sticky bottom-0 flex justify-center bg-gradient-to-t from-[#1E1810] via-[#1E1810]/95 to-transparent pb-5 pt-8">
            <button
              type="button"
              onClick={() => setPickerOpen(true)}
              className="flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-[var(--accent)]/30 transition-all hover:bg-[var(--accent-hover)] hover:scale-[1.02] hover:shadow-xl hover:shadow-[var(--accent)]/40"
            >
              <span className="text-lg font-light leading-none">+</span>
              Add Widget
            </button>
          </div>
        </div>
      </motion.div>

      {/* Detail sheet */}
      {detailWidget && DEMO_DETAIL[detailWidget] && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            onClick={() => setDetailWidget(null)}
            aria-hidden
          />
          <div className="fixed bottom-0 left-0 right-0 z-50 max-h-[80%] overflow-y-auto rounded-t-2xl border border-white/10 bg-[#1E1810] p-5 pb-9 shadow-2xl">
            <div className="mx-auto mb-3 h-1 w-8 rounded-full bg-white/15" />
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-white/30">
                {DEMO_DETAIL[detailWidget].title}
              </span>
              <button
                type="button"
                onClick={() => setDetailWidget(null)}
                className="flex size-7 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white/50 hover:bg-white/20"
                aria-label="Close"
              >
                <X className="size-3.5" />
              </button>
            </div>
            <div className="text-4xl font-semibold tracking-tight text-white" style={{ fontFamily: "var(--font-hero)" }}>
              {DEMO_DETAIL[detailWidget].val}
            </div>
            <div
              className={cn(
                "mt-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold",
                DEMO_DETAIL[detailWidget].dir === "up"
                  ? "bg-[var(--success)]/20 text-[var(--success)]"
                  : "bg-[var(--danger)]/20 text-[var(--danger)]"
              )}
            >
              {DEMO_DETAIL[detailWidget].dir === "up" ? "↑" : "↓"}{" "}
              {DEMO_DETAIL[detailWidget].txt}
            </div>
            <div className="mt-4 rounded-xl border border-white/8 bg-white/[0.04] p-3">
              <div className="mb-2 text-[9.5px] font-bold uppercase tracking-wider text-white/30">
                30-day trend
              </div>
              <svg viewBox="0 0 300 55" preserveAspectRatio="none" className="h-14 w-full">
                <path
                  d="M0,50 L30,40 L60,44 L90,27 L120,32 L150,18 L180,23 L210,13 L240,16 L270,7 L300,4"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="mt-3 space-y-0 border-t border-white/[0.07]">
              {[
                { label: "Revenue today", value: "$1,840" },
                { label: "Orders this month", value: "241" },
                { label: "Avg order value", value: "$59.13" },
                { label: "Last month total", value: "$12,720" },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between border-b border-white/[0.07] py-3 last:border-0"
                >
                  <span className="text-sm text-white/50">{row.label}</span>
                  <span className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-hero)" }}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-3 rounded-lg border border-white/7 bg-white/[0.04] px-3 py-2 text-[10px] font-medium text-white/25">
              {DEMO_DETAIL[detailWidget].meta}
            </p>
          </div>
        </>
      )}

      {/* Widget picker sheet */}
      {pickerOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            onClick={() => setPickerOpen(false)}
            aria-hidden
          />
          <div className="fixed bottom-0 left-0 right-0 z-50 max-h-[75%] overflow-y-auto rounded-t-2xl border border-[var(--border-default)] bg-[var(--bg-base)] p-4 pb-11">
            <div className="mx-auto mb-4 h-1 w-8 rounded-full bg-[var(--border-default)]" />
            <h3 className="mb-3 text-lg font-semibold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-hero)" }}>
              Add a Widget
            </h3>
            {PICKER_CATEGORIES.map((cat) => (
              <div key={cat.title} className="mb-4">
                <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[var(--text-tertiary)]">
                  <cat.icon className="size-3.5" />
                  {cat.title}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {cat.items.map((it) => (
                    <button
                      key={it.id}
                      type="button"
                      onClick={() => addWidget(it)}
                      className="flex flex-col items-center rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-3 text-center shadow-sm transition-all hover:border-[var(--accent)] hover:bg-[var(--accent)]/5 hover:shadow-md"
                    >
                      <it.icon className="mb-1 size-5 text-[var(--accent)]" />
                      <span className="text-[10.5px] font-semibold text-[var(--text-secondary)] leading-tight">
                        {it.name}
                      </span>
                      <span className="mt-0.5 text-[8.5px] font-bold uppercase tracking-wider text-[var(--accent)]">
                        {it.viz}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
