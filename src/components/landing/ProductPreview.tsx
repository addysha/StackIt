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
      if (!editMode) { e.preventDefault(); return; }
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
        setDraggingId(null); setDropOverId(null); return;
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
      setDraggingId(null); setDropOverId(null);
    },
    []
  );

  const handleDragEnd = useCallback(() => {
    setDraggingId(null); setDropOverId(null);
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
    0.12, 0.25, 0.4, 0.18, 0.58, 0.88, 0.72,
    0.15, 0.3, 0.46, 0.22, 0.62, 0.9, 0.76,
  ];

  return (
    <section
      id="demo"
      style={{
        padding: "100px 40px",
        background: "var(--ink)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background blobs */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 50% 60% at 20% 30%, rgba(181,96,58,.08) 0%, transparent 55%), radial-gradient(ellipse 40% 50% at 80% 70%, rgba(46,77,56,.1) 0%, transparent 55%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: "center" }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              marginBottom: 14,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              color: "rgba(253,250,245,.4)",
              fontFamily: "var(--font-sans)",
            }}
          >
            Interactive demo
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(30px, 4vw, 50px)",
              fontWeight: 600,
              lineHeight: 1.18,
              letterSpacing: "-.02em",
              color: "#fff",
              maxWidth: 640,
              margin: "0 auto 10px",
            }}
          >
            This is the actual dashboard.
            <br />
            <em style={{ fontStyle: "italic", color: "var(--terra)" }}>Try it right here.</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontSize: 16,
              color: "rgba(253,250,245,.55)",
              maxWidth: 520,
              lineHeight: 1.75,
              marginBottom: 40,
              fontFamily: "var(--font-sans)",
              margin: "0 auto 40px",
            }}
          >
            Not a video. Not screenshots. A working demo — drag widgets around,
            go into edit mode, add new widgets, click any metric to see the
            detail view.
          </motion.p>

          {/* Hints */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              display: "flex",
              gap: 16,
              flexWrap: "wrap",
              marginBottom: 32,
              justifyContent: "center",
            }}
          >
            {[
              { color: "var(--terra)", text: "Click Edit to rearrange" },
              { color: "#3fa85f", text: "Drag widgets to reorder" },
              { color: "#6fcf97", text: "Tap any metric for details" },
              { color: "#e8916a", text: "Press + to add widgets" },
            ].map((h) => (
              <div
                key={h.text}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  fontSize: 13,
                  color: "rgba(255,255,255,.55)",
                  fontWeight: 500,
                  fontFamily: "var(--font-sans)",
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: h.color,
                    flexShrink: 0,
                    display: "inline-block",
                  }}
                />
                {h.text}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Demo browser */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            background: "rgba(253,250,245,.04)",
            border: "1px solid rgba(255,255,255,.1)",
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 32px 80px rgba(0,0,0,.4), 0 0 0 1px rgba(255,255,255,.05)",
            position: "relative",
            maxWidth: 900,
            margin: "0 auto",
          }}
        >
          {/* Chrome bar */}
          <div
            style={{
              background: "rgba(253,250,245,.06)",
              borderBottom: "1px solid rgba(255,255,255,.08)",
              padding: "11px 16px",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div style={{ display: "flex", gap: 5 }}>
              <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#FF6058", display: "inline-block" }} />
              <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#FFBD2E", display: "inline-block" }} />
              <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#29C940", display: "inline-block" }} />
            </div>
            <div
              style={{
                flex: 1,
                background: "rgba(255,255,255,.07)",
                borderRadius: 5,
                padding: "5px 12px",
                fontSize: 11,
                color: "rgba(255,255,255,.3)",
                fontWeight: 500,
                margin: "0 16px",
                fontFamily: "var(--font-sans)",
              }}
            >
              app.stackit.co.nz/dashboard
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                fontSize: 10,
                fontWeight: 700,
                color: "#6fcf97",
                letterSpacing: ".06em",
                fontFamily: "var(--font-sans)",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  background: "#3fa85f",
                  borderRadius: "50%",
                  display: "inline-block",
                  animation: "blink 2.4s infinite",
                }}
              />
              LIVE
            </div>
          </div>

          {/* Dashboard inner */}
          <div
            style={{
              background: "var(--ink)",
              maxHeight: 620,
              overflowY: "auto",
              position: "relative",
            }}
          >
            {/* Topbar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 18px",
                height: 50,
                background: "rgba(253,250,245,.06)",
                borderBottom: "1px solid rgba(255,255,255,.07)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 17,
                  fontWeight: 600,
                  color: "rgba(253,250,245,.9)",
                }}
              >
                Stack<span style={{ color: "var(--terra)" }}>it</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button
                  type="button"
                  onClick={() => setEditMode((e) => !e)}
                  style={{
                    background: editMode ? "rgba(181,96,58,.15)" : "rgba(255,255,255,.08)",
                    border: `1px solid ${editMode ? "var(--terra)" : "rgba(255,255,255,.12)"}`,
                    color: editMode ? "var(--terra)" : "rgba(255,255,255,.7)",
                    padding: "5px 13px",
                    borderRadius: 100,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    fontFamily: "var(--font-sans)",
                    transition: "all .15s",
                  }}
                >
                  {editMode ? <><Check style={{ width: 13, height: 13 }} /> Done</> : <><Pencil style={{ width: 13, height: 13 }} /> Edit</>}
                </button>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, var(--terra), var(--terra-dk))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#fff",
                    cursor: "pointer",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  AD
                </div>
              </div>
            </div>

            {/* Greeting */}
            <div style={{ padding: "16px 18px 4px" }}>
              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 17,
                  fontWeight: 600,
                  color: "rgba(253,250,245,.9)",
                  marginBottom: 2,
                }}
              >
                Morning, Addy
              </h3>
              <p
                style={{
                  fontSize: 12,
                  color: "rgba(253,250,245,.4)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                Here&apos;s your business at a glance · Sun 08 Mar 2026
              </p>
            </div>

            {/* Alert */}
            <button
              type="button"
              onClick={() => openDetail("cash")}
              style={{
                margin: "8px 16px",
                background: "rgba(196,122,26,.1)",
                border: "1px solid rgba(196,122,26,.2)",
                borderRadius: 10,
                padding: "9px 13px",
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 12,
                color: "rgba(254,246,231,.8)",
                cursor: "pointer",
                fontWeight: 500,
                width: "calc(100% - 32px)",
                textAlign: "left",
                fontFamily: "var(--font-sans)",
                transition: "background .15s",
              }}
            >
              <AlertTriangle style={{ width: 14, height: 14, flexShrink: 0 }} />
              <span style={{ flex: 1 }}>
                Cash runway is tighter than usual — <strong>18 days</strong> at current spend
              </span>
              <span style={{ opacity: 0.4 }}>›</span>
            </button>

            {/* Canvas */}
            <div style={{ padding: "8px 14px 80px" }}>
              <div
                style={{
                  fontSize: 9.5,
                  fontWeight: 700,
                  color: "rgba(253,250,245,.3)",
                  textTransform: "uppercase",
                  letterSpacing: ".1em",
                  padding: "10px 3px 6px",
                  fontFamily: "var(--font-sans)",
                }}
              >
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
                      className={cn("relative col-span-2", span)}
                      style={{
                        background: isDropOver ? "rgba(181,96,58,.08)" : "rgba(255,255,255,.06)",
                        border: `1px solid ${isDragging ? "var(--terra)" : isDropOver ? "var(--terra)" : "rgba(255,255,255,.1)"}`,
                        borderRadius: 12,
                        padding: 14,
                        cursor: editMode ? "grab" : DEMO_DETAIL[id] ? "pointer" : "default",
                        position: "relative",
                        transition: "transform .22s, box-shadow .2s, border-color .2s",
                        transform: isDragging ? "scale(1.04) rotate(.8deg)" : editMode ? undefined : undefined,
                        boxShadow: isDragging ? "0 16px 40px rgba(0,0,0,.3), 0 0 0 2px var(--terra)" : undefined,
                        animation: editMode && !isDragging ? "dwiggle .5s ease-in-out infinite alternate" : undefined,
                        userSelect: "none",
                      }}
                      onMouseEnter={(e) => {
                        if (!editMode && !isDragging) {
                          (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,.2)";
                          (e.currentTarget as HTMLDivElement).style.boxShadow = "0 6px 20px rgba(0,0,0,.2)";
                          (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!editMode) {
                          (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,.1)";
                          (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                          (e.currentTarget as HTMLDivElement).style.transform = "none";
                        }
                      }}
                    >
                      {showRemove && (
                        <button
                          type="button"
                          onClick={(e) => removeWidget(e, id)}
                          style={{
                            position: "absolute",
                            top: -7,
                            left: -7,
                            width: 18,
                            height: 18,
                            borderRadius: "50%",
                            background: "#e74c3c",
                            border: "2px solid var(--ink)",
                            color: "#fff",
                            fontSize: 11,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            zIndex: 10,
                            fontWeight: 700,
                            lineHeight: 1,
                            transition: "transform .15s",
                          }}
                          aria-label="Remove widget"
                        >
                          <X style={{ width: 10, height: 10 }} />
                        </button>
                      )}

                      {id === "revenue" && <RevenueWidget />}
                      {id === "cash" && <CashWidget />}
                      {id === "bars" && <BarsWidget />}
                      {id === "heat" && <HeatWidget cells={heatCells} />}
                      {id === "products" && <ProductsWidget />}
                      {id === "cashflow" && <CashflowWidget />}
                      {id === "orders" && <OrdersWidget />}
                      {id.startsWith("custom-") && <CustomWidget />}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Add widget bar */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "12px 16px 20px",
                background: "linear-gradient(to top, rgba(30,24,16,.95) 50%, transparent)",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button
                type="button"
                onClick={() => setPickerOpen(true)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  background: "var(--terra)",
                  color: "#fff",
                  border: "none",
                  padding: "10px 26px",
                  borderRadius: 100,
                  fontFamily: "var(--font-sans)",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 6px 20px rgba(181,96,58,.4)",
                  transition: "all .2s cubic-bezier(.34,1.56,.64,1)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "var(--terra-dk)";
                  (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.04) translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "var(--terra)";
                  (e.currentTarget as HTMLButtonElement).style.transform = "none";
                }}
              >
                <span style={{ fontSize: 17, fontWeight: 300, lineHeight: 1 }}>+</span>
                Add Widget
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Detail sheet */}
      {detailWidget && DEMO_DETAIL[detailWidget] && (
        <>
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 40,
              background: "rgba(10,8,5,.7)",
              backdropFilter: "blur(8px)",
            }}
            onClick={() => setDetailWidget(null)}
            aria-hidden
          />
          <div
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 50,
              maxHeight: "80%",
              overflowY: "auto",
              background: "rgba(30,24,16,.97)",
              border: "1px solid rgba(255,255,255,.1)",
              borderRadius: "14px 14px 0 0",
              padding: "0 20px 36px",
              boxShadow: "var(--sh-xl)",
            }}
          >
            <div
              style={{
                width: 30,
                height: 3,
                background: "rgba(255,255,255,.15)",
                borderRadius: 2,
                margin: "11px auto 0",
              }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 0 10px",
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "rgba(255,255,255,.3)",
                  textTransform: "uppercase",
                  letterSpacing: ".08em",
                  fontFamily: "var(--font-sans)",
                }}
              >
                {DEMO_DETAIL[detailWidget].title}
              </span>
              <button
                type="button"
                onClick={() => setDetailWidget(null)}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,.08)",
                  border: "1px solid rgba(255,255,255,.1)",
                  color: "rgba(255,255,255,.5)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all .15s",
                }}
                aria-label="Close"
              >
                <X style={{ width: 13, height: 13 }} />
              </button>
            </div>
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 42,
                fontWeight: 600,
                letterSpacing: "-1.5px",
                lineHeight: 1,
                marginBottom: 8,
                color: "#fff",
              }}
            >
              {DEMO_DETAIL[detailWidget].val}
            </div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                fontSize: 12.5,
                fontWeight: 700,
                padding: "4px 12px",
                borderRadius: 100,
                marginBottom: 18,
                background:
                  DEMO_DETAIL[detailWidget].dir === "up"
                    ? "rgba(46,125,82,.2)"
                    : "rgba(181,96,58,.2)",
                color:
                  DEMO_DETAIL[detailWidget].dir === "up" ? "#6fcf97" : "#e8916a",
                fontFamily: "var(--font-sans)",
              }}
            >
              {DEMO_DETAIL[detailWidget].dir === "up" ? "↑" : "↓"}{" "}
              {DEMO_DETAIL[detailWidget].txt}
            </div>
            <div
              style={{
                background: "rgba(255,255,255,.04)",
                border: "1px solid rgba(255,255,255,.08)",
                borderRadius: 11,
                padding: 13,
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  fontSize: 9.5,
                  color: "rgba(255,255,255,.3)",
                  textTransform: "uppercase",
                  letterSpacing: ".08em",
                  marginBottom: 9,
                  fontWeight: 700,
                  fontFamily: "var(--font-sans)",
                }}
              >
                30-day trend
              </div>
              <svg viewBox="0 0 300 55" preserveAspectRatio="none" style={{ width: "100%", height: 55 }}>
                <defs>
                  <linearGradient id="ddg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--terra)" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="var(--terra)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <path
                  d="M0,50 L30,40 L60,44 L90,27 L120,32 L150,18 L180,23 L210,13 L240,16 L270,7 L300,4"
                  fill="none"
                  stroke="#e8916a"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <path
                  d="M0,50 L30,40 L60,44 L90,27 L120,32 L150,18 L180,23 L210,13 L240,16 L270,7 L300,4 L300,55 L0,55Z"
                  fill="url(#ddg)"
                />
              </svg>
            </div>
            <div style={{ borderTop: "1px solid rgba(255,255,255,.07)" }}>
              {[
                { label: "Revenue today", value: "$1,840" },
                { label: "Orders this month", value: "241" },
                { label: "Avg order value", value: "$59.13" },
                { label: "Last month total", value: "$12,720" },
              ].map((row) => (
                <div
                  key={row.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "11px 0",
                    borderBottom: "1px solid rgba(255,255,255,.07)",
                    cursor: "pointer",
                  }}
                >
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,.5)", fontFamily: "var(--font-sans)" }}>
                    {row.label}
                  </span>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      fontFamily: "var(--font-serif)",
                      color: "#fff",
                    }}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
            <p
              style={{
                marginTop: 14,
                padding: "9px 12px",
                background: "rgba(255,255,255,.04)",
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,.07)",
                fontSize: 10,
                color: "rgba(255,255,255,.25)",
                fontWeight: 500,
                fontFamily: "var(--font-sans)",
              }}
            >
              {DEMO_DETAIL[detailWidget].meta}
            </p>
          </div>
        </>
      )}

      {/* Widget picker sheet */}
      {pickerOpen && (
        <>
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 40,
              background: "rgba(10,8,5,.7)",
              backdropFilter: "blur(8px)",
            }}
            onClick={() => setPickerOpen(false)}
            aria-hidden
          />
          <div
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 50,
              maxHeight: "75%",
              overflowY: "auto",
              background: "rgba(253,250,245,.97)",
              borderRadius: "14px 14px 0 0",
              padding: "0 16px 44px",
            }}
          >
            <div
              style={{
                width: 30,
                height: 3,
                background: "var(--stone)",
                borderRadius: 2,
                margin: "11px auto 16px",
              }}
            />
            <h3
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 17,
                fontWeight: 600,
                color: "var(--ink)",
                marginBottom: 12,
              }}
            >
              Add a Widget
            </h3>
            {PICKER_CATEGORIES.map((cat) => (
              <div key={cat.title} style={{ marginBottom: 18 }}>
                <div
                  style={{
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: ".1em",
                    color: "var(--ink-3)",
                    marginBottom: 8,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  <cat.icon style={{ width: 13, height: 13 }} />
                  {cat.title}
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 8,
                  }}
                >
                  {cat.items.map((it) => (
                    <button
                      key={it.id}
                      type="button"
                      onClick={() => addWidget(it)}
                      style={{
                        background: "var(--surf)",
                        border: "1px solid var(--stone)",
                        borderRadius: 11,
                        padding: "12px 8px",
                        cursor: "pointer",
                        textAlign: "center",
                        boxShadow: "var(--sh-sm)",
                        transition: "all .2s cubic-bezier(.34,1.56,.64,1)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 4,
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--terra)";
                        (e.currentTarget as HTMLButtonElement).style.background = "rgba(181,96,58,.04)";
                        (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.03) translateY(-1px)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--stone)";
                        (e.currentTarget as HTMLButtonElement).style.background = "var(--surf)";
                        (e.currentTarget as HTMLButtonElement).style.transform = "none";
                      }}
                    >
                      <it.icon style={{ width: 18, height: 18, color: "var(--terra)", marginBottom: 2 }} />
                      <span
                        style={{
                          fontSize: 10.5,
                          fontWeight: 600,
                          color: "var(--ink-2)",
                          lineHeight: 1.3,
                          fontFamily: "var(--font-sans)",
                        }}
                      >
                        {it.name}
                      </span>
                      <span
                        style={{
                          fontSize: 8.5,
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: ".07em",
                          color: "var(--terra)",
                          fontFamily: "var(--font-sans)",
                        }}
                      >
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

      <style>{`
        @keyframes dwiggle {
          from { transform: rotate(-.5deg); }
          to { transform: rotate(.5deg) translateY(-1px); }
        }
      `}</style>
    </section>
  );
}

/* ── Widget sub-components ── */

function WidgetHeader({ label, warn }: { label: string; warn?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
      <span style={{ fontSize: 9.5, fontWeight: 700, color: "rgba(255,255,255,.35)", textTransform: "uppercase", letterSpacing: ".07em", fontFamily: "var(--font-sans)" }}>
        {label}
      </span>
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: warn ? "var(--terra)" : "#3fa85f",
          boxShadow: warn ? "0 0 5px var(--terra)" : "0 0 5px #3fa85f",
          animation: "blink 3s infinite",
          display: "inline-block",
        }}
      />
    </div>
  );
}

function SyncBar({ ago, source }: { ago: string; source: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 10,
        paddingTop: 8,
        borderTop: "1px solid rgba(255,255,255,.07)",
        gap: 4,
      }}
    >
      <span style={{ fontSize: 9, color: "rgba(255,255,255,.25)", fontFamily: "var(--font-sans)" }}>{ago}</span>
      <span
        style={{
          fontSize: 9,
          color: "rgba(255,255,255,.3)",
          background: "rgba(255,255,255,.06)",
          padding: "2px 7px",
          borderRadius: 5,
          border: "1px solid rgba(255,255,255,.08)",
          fontWeight: 600,
          fontFamily: "var(--font-sans)",
        }}
      >
        {source}
      </span>
    </div>
  );
}

function RevenueWidget() {
  return (
    <>
      <WidgetHeader label="Revenue · Month" />
      <div style={{ fontFamily: "var(--font-serif)", fontSize: 26, fontWeight: 600, lineHeight: 1, marginBottom: 5, color: "#fff", letterSpacing: "-.8px" }}>
        $14,250
      </div>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 10.5, fontWeight: 700, padding: "2px 8px", borderRadius: 100, background: "rgba(46,125,82,.2)", color: "#6fcf97", fontFamily: "var(--font-sans)" }}>
        ↑ 12% vs last month
      </span>
      <div style={{ marginTop: 8, height: 30, opacity: .7 }}>
        <svg viewBox="0 0 220 30" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
          <defs>
            <linearGradient id="dg1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--forest)" stopOpacity={.3} />
              <stop offset="100%" stopColor="var(--forest)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <path d="M0,28 L28,22 L55,24 L83,15 L110,18 L138,10 L165,13 L193,6 L220,3" fill="none" stroke="#3fa85f" strokeWidth="2" strokeLinecap="round" />
          <path d="M0,28 L28,22 L55,24 L83,15 L110,18 L138,10 L165,13 L193,6 L220,3 L220,30 L0,30Z" fill="url(#dg1)" />
        </svg>
      </div>
      <SyncBar ago="Synced 3m ago" source="shopify" />
    </>
  );
}

function CashWidget() {
  return (
    <>
      <WidgetHeader label="Cash · Runway" warn />
      <div style={{ fontFamily: "var(--font-serif)", fontSize: 22, fontWeight: 600, lineHeight: 1, color: "var(--warn)", marginBottom: 5, letterSpacing: "-.8px" }}>
        18 days
      </div>
      <div style={{ marginTop: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "rgba(255,255,255,.35)", marginBottom: 4, fontFamily: "var(--font-sans)" }}>
          <span>$8,420</span>
          <span style={{ color: "#e8916a", fontWeight: 700 }}>Low</span>
        </div>
        <div style={{ height: 5, background: "rgba(255,255,255,.1)", borderRadius: 100, overflow: "hidden" }}>
          <div style={{ width: "28%", height: "100%", background: "linear-gradient(to right, #3fa85f, var(--warn), #e8916a)", borderRadius: 100 }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: "rgba(255,255,255,.25)", marginTop: 3, fontFamily: "var(--font-sans)" }}>
          <span>0d</span><span>90d</span>
        </div>
      </div>
      <SyncBar ago="Synced 1h ago" source="akahu" />
    </>
  );
}

function BarsWidget() {
  return (
    <>
      <WidgetHeader label="Sales · 6 Months" />
      <div style={{ fontFamily: "var(--font-serif)", fontSize: 18, fontWeight: 600, color: "#6fcf97" }}>
        +12% MoM
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 40, marginTop: 8 }}>
        {[
          { m: "Oct", h: 55 }, { m: "Nov", h: 68 }, { m: "Dec", h: 62 },
          { m: "Jan", h: 72 }, { m: "Feb", h: 76 }, { m: "Mar", h: 95, current: true },
        ].map(({ m, h, current }) => (
          <div key={m} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <div
              style={{
                flex: 1,
                width: "100%",
                background: current ? "var(--terra)" : `rgba(46,77,56,${0.5 + [0,.1,.15,.2,.3][["Oct","Nov","Dec","Jan","Feb"].indexOf(m)] || 0})`,
                borderRadius: "2px 2px 0 0",
                height: `${h}%`,
              }}
            />
            <span style={{ fontSize: 7, color: current ? "var(--terra)" : "rgba(255,255,255,.25)", fontWeight: current ? 700 : 400, fontFamily: "var(--font-sans)" }}>{m}</span>
          </div>
        ))}
      </div>
      <SyncBar ago="Synced 3m ago" source="shopify" />
    </>
  );
}

function HeatWidget({ cells }: { cells: number[] }) {
  return (
    <>
      <WidgetHeader label="Sales by Day" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
          <div key={d} style={{ textAlign: "center", fontSize: 7.5, fontWeight: 600, color: "rgba(255,255,255,.25)", fontFamily: "var(--font-sans)" }}>{d}</div>
        ))}
        {cells.map((op, i) => (
          <div
            key={i}
            style={{
              aspectRatio: "1",
              borderRadius: 3,
              background: `rgba(181,96,58,${op})`,
              transition: "transform .15s",
            }}
          />
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 6, fontFamily: "var(--font-sans)" }}>
        <span style={{ fontSize: 8.5, color: "rgba(255,255,255,.2)" }}>Less</span>
        <div style={{ flex: 1, height: 4, borderRadius: 2, background: "linear-gradient(to right, rgba(181,96,58,.08), rgba(181,96,58,.9))" }} />
        <span style={{ fontSize: 8.5, color: "rgba(255,255,255,.2)" }}>More</span>
      </div>
      <SyncBar ago="Synced 3m ago" source="shopify" />
    </>
  );
}

function ProductsWidget() {
  return (
    <>
      <WidgetHeader label="Top Products · Month" />
      <div style={{ display: "flex", flexDirection: "column" }}>
        {[
          { name: "Merino Tee — Black", val: "$4,260", pct: 100 },
          { name: "Canvas Tote", val: "$2,940", pct: 69 },
          { name: "Beanie — Grey", val: "$1,340", pct: 31 },
          { name: "Hoodie — Slate", val: "$980", pct: 23 },
        ].map((row, idx) => (
          <div key={row.name} style={{ display: "flex", alignItems: "center", gap: 7, padding: "5px 0", borderBottom: idx < 3 ? "1px solid rgba(255,255,255,.07)" : "none" }}>
            <span style={{ fontSize: 9.5, color: "rgba(255,255,255,.25)", fontWeight: 700, width: 14, fontFamily: "var(--font-sans)" }}>0{idx + 1}</span>
            <span style={{ fontSize: 11.5, fontWeight: 500, flex: 1, color: "rgba(255,255,255,.7)", fontFamily: "var(--font-sans)" }}>{row.name}</span>
            <div style={{ width: 48, height: 4, background: "rgba(255,255,255,.1)", borderRadius: 100, overflow: "hidden" }}>
              <div style={{ height: "100%", borderRadius: 100, background: "var(--terra)", width: `${row.pct}%` }} />
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.85)", fontFamily: "var(--font-serif)", minWidth: 38, textAlign: "right" }}>{row.val}</span>
          </div>
        ))}
      </div>
      <SyncBar ago="Synced 3m ago" source="shopify" />
    </>
  );
}

function CashflowWidget() {
  return (
    <>
      <WidgetHeader label="Cashflow · Week" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 8 }}>
        <div style={{ background: "rgba(46,125,82,.1)", borderRadius: 7, padding: "8px 9px" }}>
          <div style={{ fontSize: 8.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".07em", color: "rgba(255,255,255,.3)", marginBottom: 3, fontFamily: "var(--font-sans)" }}>In</div>
          <div style={{ fontFamily: "var(--font-serif)", fontSize: 16, fontWeight: 600, color: "#6fcf97" }}>$6,820</div>
        </div>
        <div style={{ background: "rgba(181,96,58,.1)", borderRadius: 7, padding: "8px 9px" }}>
          <div style={{ fontSize: 8.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".07em", color: "rgba(255,255,255,.3)", marginBottom: 3, fontFamily: "var(--font-sans)" }}>Out</div>
          <div style={{ fontFamily: "var(--font-serif)", fontSize: 16, fontWeight: 600, color: "#e8916a" }}>$4,240</div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "5px 0", borderBottom: "1px solid rgba(255,255,255,.07)" }}>
          <Package style={{ width: 12, height: 12, flexShrink: 0, color: "rgba(255,255,255,.5)" }} />
          <span style={{ flex: 1, fontSize: 11.5, color: "rgba(255,255,255,.6)", fontWeight: 500, fontFamily: "var(--font-sans)" }}>Shopify sales</span>
          <span style={{ fontSize: 11.5, fontWeight: 700, fontFamily: "var(--font-serif)", color: "#6fcf97" }}>+$4,260</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "5px 0" }}>
          <Building2 style={{ width: 12, height: 12, flexShrink: 0, color: "rgba(255,255,255,.5)" }} />
          <span style={{ flex: 1, fontSize: 11.5, color: "rgba(255,255,255,.6)", fontWeight: 500, fontFamily: "var(--font-sans)" }}>Rent</span>
          <span style={{ fontSize: 11.5, fontWeight: 700, fontFamily: "var(--font-serif)", color: "#e8916a" }}>−$1,440</span>
        </div>
      </div>
      <SyncBar ago="Synced 1h ago" source="akahu" />
    </>
  );
}

function OrdersWidget() {
  return (
    <>
      <WidgetHeader label="Orders · Today" />
      <div style={{ fontFamily: "var(--font-serif)", fontSize: 26, fontWeight: 600, lineHeight: 1, color: "#fff", letterSpacing: "-.8px" }}>24</div>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 10.5, fontWeight: 700, padding: "2px 8px", borderRadius: 100, background: "rgba(46,125,82,.2)", color: "#6fcf97", marginTop: 5, fontFamily: "var(--font-sans)" }}>
        ↑ 3 vs yesterday
      </span>
      <div style={{ marginTop: 10, background: "rgba(255,255,255,.04)", borderRadius: 7, padding: 9 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontFamily: "var(--font-sans)" }}>
          <span style={{ color: "rgba(255,255,255,.4)" }}>Avg order</span>
          <span style={{ color: "#fff", fontWeight: 700, fontFamily: "var(--font-serif)" }}>$59.13</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginTop: 4, fontFamily: "var(--font-sans)" }}>
          <span style={{ color: "rgba(255,255,255,.4)" }}>Refunds</span>
          <span style={{ color: "#e8916a", fontWeight: 700, fontFamily: "var(--font-serif)" }}>$240</span>
        </div>
      </div>
      <SyncBar ago="Synced 3m ago" source="shopify" />
    </>
  );
}

function CustomWidget() {
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontSize: 9.5, fontWeight: 700, color: "rgba(255,255,255,.35)", textTransform: "uppercase", letterSpacing: ".07em", fontFamily: "var(--font-sans)" }}>
          New widget
        </span>
      </div>
      <div style={{ fontFamily: "var(--font-serif)", fontSize: 18, fontWeight: 600, color: "rgba(255,255,255,.8)" }}>—</div>
      <SyncBar ago="just added" source="manual" />
    </>
  );
}
