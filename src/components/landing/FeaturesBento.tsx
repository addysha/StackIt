"use client";

import { motion } from "framer-motion";
import {
  ShoppingCart,
  Landmark,
  CreditCard,
  FileText,
  Mail,
  Calendar,
  Layers,
  Coffee,
} from "lucide-react";
import { cn } from "@/lib/utils";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const MINI_WIDGETS = [
  { label: "Revenue", value: "$14,250", trend: "↑ 12%", up: true },
  { label: "Orders", value: "241", trend: "↑ 8%", up: true },
  { label: "Cash", value: "$8,420", trend: "↓ 8%", up: false },
  { label: "Customers", value: "142", trend: "↑ 18%", up: true },
];

const LIVE_SOURCES = [
  { icon: ShoppingCart, name: "Shopify" },
  { icon: Landmark, name: "ANZ Bank Feed" },
  { icon: CreditCard, name: "Stripe" },
  { icon: FileText, name: "Xero" },
];

const ONBOARD_STEPS = [
  { icon: Mail, label: "Sign up", status: "Done" as const },
  { icon: Calendar, label: "Book call", status: "Done" as const },
  { icon: Layers, label: "We build live", status: "Now" as const },
  { icon: Coffee, label: "You use it", status: "Next" as const },
];

const TOP_PRODUCTS = [
  { name: "Merino Tee — Black", value: "$4,260", pct: 100 },
  { name: "Canvas Tote", value: "$2,940", pct: 69 },
  { name: "Beanie — Grey", value: "$1,340", pct: 31 },
];

export function FeaturesBento() {
  return (
    <section
      id="features"
      className="border-t border-[var(--border-default)] bg-[var(--bg-elevated)] px-4 py-20 md:px-6 md:py-28"
    >
      <div className="mx-auto max-w-[560px]">
        <motion.p
          variants={item}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-3.5 text-xs font-bold uppercase tracking-[0.1em] text-[var(--accent)]"
        >
          Features
        </motion.p>
        <motion.h2
          variants={item}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl"
          style={{ fontFamily: "var(--font-hero)" }}
        >
          Everything you need.
          <br />
          <em className="italic text-[var(--accent)]">Exactly how you need it.</em>
        </motion.h2>
        <motion.p
          variants={item}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-4 text-base leading-relaxed text-[var(--text-secondary)]"
        >
          Each feature was built around one kind of person — someone brilliant
          at their business, not at software.
        </motion.p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="mx-auto mt-12 grid max-w-6xl grid-cols-12 gap-3.5 md:mt-14"
      >
        {/* Drag-and-drop canvas — span 5 */}
        <motion.div
          variants={item}
          className="col-span-12 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] md:col-span-5"
        >
          <span className="mb-3 inline-flex rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">
            New
          </span>
          <h3
            className="text-lg font-semibold leading-snug text-[var(--text-primary)] md:text-xl"
            style={{ fontFamily: "var(--font-hero)" }}
          >
            Flexible, drag-and-drop canvas
          </h3>
          <p className="mt-2 text-[13px] leading-relaxed text-[var(--text-secondary)]">
            Build your exact dashboard by dragging metric blocks onto a canvas.
            They snap into place. No code, no config — it works like Lego.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {MINI_WIDGETS.map((w) => (
              <div
                key={w.label}
                className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-base)] p-2.5"
              >
                <div className="text-[9px] font-bold uppercase tracking-wider text-[var(--text-tertiary)]">
                  {w.label}
                </div>
                <div
                  className="text-base font-semibold text-[var(--text-primary)]"
                  style={{ fontFamily: "var(--font-hero)" }}
                >
                  {w.value}
                </div>
                <div
                  className={cn(
                    "mt-0.5 text-[10px] font-semibold",
                    w.up ? "text-[var(--success)]" : "text-[var(--danger)]"
                  )}
                >
                  {w.trend}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Live data — dark card span 4 */}
        <motion.div
          variants={item}
          className="col-span-12 rounded-2xl border-0 bg-[var(--text-primary)] p-6 text-white shadow-[var(--shadow-md)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)] md:col-span-4"
        >
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-[var(--success)]/20 bg-[var(--success)]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--success)]">
            <span className="size-1.5 rounded-full bg-[var(--success)]" />
            Live
          </span>
          <h3
            className="text-lg font-semibold leading-snug md:text-xl"
            style={{ fontFamily: "var(--font-hero)" }}
          >
            Always current. Always yours.
          </h3>
          <p className="mt-2 text-[13px] leading-relaxed text-white/70">
            Data syncs in real time from every connected source. No manual
            refreshes. No CSV uploads. Open Stackit every morning and your
            numbers are already there.
          </p>
          <div className="mt-4 space-y-2">
            {LIVE_SOURCES.map((s) => (
              <div
                key={s.name}
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-2.5 py-2"
              >
                <s.icon className="size-3.5 shrink-0 text-white/80" />
                <span className="flex-1 text-xs text-white/80">{s.name}</span>
                <span className="size-1.5 rounded-full bg-[var(--success)]" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Onboarding — accent card span 3 */}
        <motion.div
          variants={item}
          className="col-span-12 rounded-2xl border-0 bg-[var(--accent)] p-6 text-white shadow-[var(--shadow-md)] transition-all duration-300 hover:-translate-y-0.5 md:col-span-3"
        >
          <h3
            className="text-lg font-semibold leading-snug md:text-xl"
            style={{ fontFamily: "var(--font-hero)" }}
          >
            Done for you in 30 minutes
          </h3>
          <p className="mt-2 text-[13px] leading-relaxed text-white/75">
            We get on a Zoom, ask 5 questions, and build your dashboard while
            you watch. You leave with live data.
          </p>
          <div className="mt-4 space-y-2">
            {ONBOARD_STEPS.map((step) => (
              <div
                key={step.label}
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-2.5 py-2"
              >
                <step.icon className="size-3.5 shrink-0 text-white/70" />
                <span className="flex-1 text-xs text-white/80">{step.label}</span>
                <span
                  className={cn(
                    "text-[9.5px] font-bold",
                    step.status === "Done" && "text-[var(--success)]",
                    step.status === "Now" && "text-[var(--warning)]",
                    step.status === "Next" && "text-white/40"
                  )}
                >
                  {step.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 10 viz types — full width row span 8 */}
        <motion.div
          variants={item}
          className="col-span-12 flex flex-col gap-5 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 md:col-span-8 md:flex-row md:items-center"
        >
          <div className="flex-1">
            <span className="mb-3 inline-flex rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">
              10 types
            </span>
            <h3
              className="text-lg font-semibold leading-snug text-[var(--text-primary)] md:text-xl"
              style={{ fontFamily: "var(--font-hero)" }}
            >
              Data shown the way it makes sense
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed text-[var(--text-secondary)]">
              Cash runway is a gauge. Weekly sales is a heatmap. Top products is
              a ranked bar list. Revenue trend is a sparkline. Every metric gets
              the visualisation that fits it.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-2">
            <div className="grid grid-cols-7 gap-0.5 rounded-xl bg-[var(--bg-elevated)] p-2.5">
              {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
                <div
                  key={d}
                  className="text-center text-[8px] font-semibold text-[var(--text-tertiary)]"
                >
                  {d}
                </div>
              ))}
              {[0.12, 0.25, 0.4, 0.2, 0.55, 0.85, 0.72, 0.18, 0.3, 0.45, 0.22, 0.6, 0.9, 0.76].map((opacity, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-sm bg-[var(--accent)]"
                  style={{ opacity }}
                />
              ))}
            </div>
            <div className="flex items-end gap-1 rounded-xl bg-[var(--bg-elevated)] p-2.5" style={{ height: 36 }}>
              {[40, 55, 48, 65, 70, 90].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm bg-[var(--accent)]"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Top products — forest-style dark card span 4 */}
        <motion.div
          variants={item}
          className="col-span-12 rounded-2xl border-0 bg-[#2E4D38] p-6 text-white shadow-[var(--shadow-md)] transition-all duration-300 hover:-translate-y-0.5 md:col-span-4"
        >
          <h3
            className="text-lg font-semibold leading-snug md:text-xl"
            style={{ fontFamily: "var(--font-hero)" }}
          >
            See what's driving revenue
          </h3>
          <p className="mt-2 text-[13px] leading-relaxed text-white/65">
            Ranked product performance with proportional bars. Know your
            best-sellers at a glance.
          </p>
          <div className="mt-4 space-y-0">
            {TOP_PRODUCTS.map((row, idx) => (
              <div
                key={row.name}
                className="flex items-center gap-2 border-b border-white/10 py-1.5 last:border-0"
              >
                <span className="w-4 text-[9.5px] font-bold text-white/40">
                  0{idx + 1}
                </span>
                <span className="flex-1 text-[11.5px] text-white/80">
                  {row.name}
                </span>
                <div className="h-1 w-12 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-white/70"
                    style={{ width: `${row.pct}%` }}
                  />
                </div>
                <span
                  className="text-[11px] font-bold"
                  style={{ fontFamily: "var(--font-hero)" }}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Custom widgets — span 4 */}
        <motion.div
          variants={item}
          className="col-span-12 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] md:col-span-4"
        >
          <span className="mb-3 inline-flex rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">
            Custom
          </span>
          <h3
            className="text-lg font-semibold leading-snug text-[var(--text-primary)] md:text-xl"
            style={{ fontFamily: "var(--font-hero)" }}
          >
            Add any metric you want
          </h3>
          <p className="mt-2 text-[13px] leading-relaxed text-[var(--text-secondary)]">
            No integration for it? Name it, enter the value, pick how it
            displays. Your dashboard, your rules.
          </p>
          <div className="mt-4 rounded-xl border-2 border-dashed border-[var(--border-strong)] bg-[var(--bg-elevated)] p-3">
            <div className="mb-1.5 text-[10px] font-bold text-[var(--text-tertiary)]">
              Widget name
            </div>
            <div className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] px-2.5 py-1.5 text-xs font-semibold text-[var(--accent)]">
              Weekly Tips
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[var(--border-default)]">
              <div
                className="h-full rounded-full bg-[var(--accent)]"
                style={{ width: "62%" }}
              />
            </div>
            <div className="mt-1 flex justify-between text-[10px] text-[var(--text-tertiary)]">
              <span>$0</span>
              <span className="font-bold text-[var(--text-secondary)]">
                $1,240 / $2,000
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
