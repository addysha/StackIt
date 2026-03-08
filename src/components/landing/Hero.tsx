"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { animate } from "animejs";
import { scrollToHash } from "@/lib/utils";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function Hero() {
  const mockupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mockupRef.current) return;
    animate(mockupRef.current, {
      translateY: [0, -6, 0],
      duration: 6000,
      ease: "inOutSine",
      loop: true,
    });
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[85vh] overflow-hidden px-6 pt-[120px] pb-16 md:min-h-[90vh] md:px-10 md:pt-[140px] md:pb-20"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 0%, #FFFFFF 0%, var(--bg-base) 100%)",
      }}
    >
      <div
        className="hero-dot-grid pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div
            variants={item}
            className="mb-7 inline-flex items-center gap-1.5 rounded-full border border-[var(--success)]/20 bg-[var(--success)]/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--success)]"
          >
            <span className="size-1.5 rounded-full bg-[var(--success)]" />
            Now in early access · NZ-built
          </motion.div>
          <motion.h1
            variants={item}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.08 }}
            className="text-4xl leading-[1.1] tracking-tight md:text-5xl lg:text-6xl xl:text-[72px]"
            style={{ fontFamily: "var(--font-hero)", fontWeight: 600 }}
          >
            <span className="block text-[var(--text-primary)]">
              Your whole business,
            </span>
            <span
              className="mt-1 block font-[family-name:var(--font-hero)] italic text-[var(--accent)]"
              style={{ fontFamily: "var(--font-hero)" }}
            >
              one screen.
            </span>
          </motion.h1>
          <motion.p
            variants={item}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.16 }}
            className="mx-auto mt-5 max-w-[520px] text-base leading-relaxed text-[var(--text-secondary)] md:text-lg"
          >
            Stackit pulls your revenue, cash, customers, and stock into one live
            dashboard. Drag the widgets you want. We set it up while you watch.
          </motion.p>
          <motion.div
            variants={item}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.24 }}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <a
              href="#cta"
              onClick={scrollToHash}
              className="inline-flex min-h-[48px] min-w-[200px] items-center justify-center rounded-full bg-[var(--accent)] px-6 py-3 text-base font-semibold text-[var(--text-inverse)] shadow-[0_6px_24px_var(--accent-glow)] transition-colors hover:bg-[var(--accent-hover)] hover:shadow-[0_8px_28px_var(--accent-glow)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--bg-base)]"
            >
              Book your free setup call
            </a>
            <a
              href="#demo"
              onClick={scrollToHash}
              className="inline-flex min-h-[48px] min-w-[200px] items-center justify-center gap-2 rounded-full border border-[var(--border-default)] bg-transparent px-6 py-3 text-base font-semibold text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--bg-base)]"
            >
              Try the dashboard
              <ArrowRight className="size-4" />
            </a>
          </motion.div>
          <motion.p
            variants={item}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.32 }}
            className="mt-4 text-sm text-[var(--text-tertiary)]"
          >
            First 10 businesses get in free · 30-min onboarding call · No credit
            card
          </motion.p>
        </motion.div>

        {/* Browser-style dashboard mockup */}
        <motion.div
          ref={mockupRef}
          variants={item}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="mx-auto mt-14 max-w-[900px] md:mt-16"
        >
          <div className="overflow-hidden rounded-t-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] shadow-[var(--shadow-md)]">
            <div className="flex items-center gap-2.5 border-b border-[var(--border-default)] bg-[var(--bg-elevated)] px-4 py-3">
              <div className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-[#FF6058]" />
                <span className="size-2.5 rounded-full bg-[#FFBD2E]" />
                <span className="size-2.5 rounded-full bg-[#29C940]" />
              </div>
              <div className="flex-1 rounded-md border border-[var(--border-default)] bg-[var(--bg-surface)] px-3 py-1.5 text-xs font-medium text-[var(--text-tertiary)]">
                app.stackit.co.nz/dashboard
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--success)]">
                <span className="size-1.5 rounded-full bg-[var(--success)]" />
                LIVE
              </div>
            </div>
            <div className="border-t border-[var(--border-default)] bg-[var(--bg-surface)]">
              <div className="flex items-center justify-between border-b border-[var(--border-default)] px-4 py-2.5">
                <span
                  className="text-base font-semibold text-[var(--text-primary)]"
                  style={{ fontFamily: "var(--font-hero)" }}
                >
                  Stack<span className="text-[var(--accent)]">it</span>
                </span>
                <div className="flex items-center gap-2">
                  <span className="rounded-full border border-[var(--border-default)] bg-[var(--bg-surface)] px-3 py-1 text-xs font-semibold text-[var(--text-secondary)]">
                    Edit
                  </span>
                  <span className="flex size-6 items-center justify-center rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-hover)] text-[10px] font-bold text-white">
                    AD
                  </span>
                </div>
              </div>
              <div
                className="grid grid-cols-6 gap-2 p-4"
                style={{
                  backgroundImage:
                    "radial-gradient(var(--border-strong) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              >
                <div className="col-span-3 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-4">
                  <div className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--text-tertiary)]">
                    Revenue · Month
                  </div>
                  <div
                    className="text-2xl font-semibold text-[var(--text-primary)]"
                    style={{ fontFamily: "var(--font-hero)" }}
                  >
                    $14,250
                  </div>
                  <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-[var(--success)]/10 px-2 py-0.5 text-[10px] font-semibold text-[var(--success)]">
                    ↑ 12% vs last month
                  </span>
                  <div className="mt-2 h-7 w-full opacity-70">
                    <svg
                      viewBox="0 0 220 28"
                      preserveAspectRatio="none"
                      className="h-full w-full"
                    >
                      <defs>
                        <linearGradient
                          id="hg1"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="var(--success)"
                            stopOpacity={0.2}
                          />
                          <stop
                            offset="100%"
                            stopColor="var(--success)"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0,26 L28,21 L55,23 L83,14 L110,17 L138,9 L165,12 L193,5 L220,2"
                        fill="none"
                        stroke="var(--success)"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                      <path
                        d="M0,26 L28,21 L55,23 L83,14 L110,17 L138,9 L165,12 L193,5 L220,2 L220,28 L0,28Z"
                        fill="url(#hg1)"
                      />
                    </svg>
                  </div>
                  <div className="mt-2 flex justify-between border-t border-[var(--border-default)] pt-2 text-[10px] text-[var(--text-tertiary)]">
                    <span>Synced 3m ago</span>
                    <span className="rounded border border-[var(--border-default)] bg-[var(--bg-elevated)] px-1.5 py-0.5 font-semibold">
                      shopify
                    </span>
                  </div>
                </div>
                <div className="col-span-2 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-4">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-tertiary)]">
                    Cash · Runway
                  </div>
                  <div
                    className="text-xl font-semibold text-[var(--warning)]"
                    style={{ fontFamily: "var(--font-hero)" }}
                  >
                    18 days
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[var(--border-default)]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[var(--success)] via-[var(--warning)] to-[var(--danger)]"
                      style={{ width: "28%" }}
                    />
                  </div>
                  <div className="mt-1 flex justify-between text-[9px] text-[var(--text-tertiary)]">
                    <span>$8,420 in bank</span>
                    <span className="font-semibold text-[var(--danger)]">Low</span>
                  </div>
                  <div className="mt-2 flex justify-between border-t border-[var(--border-default)] pt-2 text-[10px] text-[var(--text-tertiary)]">
                    <span>Synced 1h ago</span>
                    <span className="rounded border border-[var(--border-default)] bg-[var(--bg-elevated)] px-1.5 py-0.5 font-semibold">
                      akahu
                    </span>
                  </div>
                </div>
                <div className="col-span-1 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-4">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-tertiary)]">
                    Orders
                  </div>
                  <div
                    className="text-xl font-semibold text-[var(--text-primary)]"
                    style={{ fontFamily: "var(--font-hero)" }}
                  >
                    24
                  </div>
                  <span className="mt-1 inline-flex rounded-full bg-[var(--success)]/10 px-1.5 py-0.5 text-[9px] font-semibold text-[var(--success)]">
                    ↑ 3
                  </span>
                </div>
                <div className="col-span-2 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-3">
                  <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--text-tertiary)]">
                    Sales by Day
                  </div>
                  <div className="grid grid-cols-7 gap-0.5">
                    {["M", "T", "W", "T", "F", "S", "S"].map((d) => (
                      <div
                        key={d}
                        className="text-center text-[7px] font-semibold text-[var(--text-tertiary)]"
                      >
                        {d}
                      </div>
                    ))}
                    {[
                      0.15, 0.28, 0.42, 0.2, 0.6, 0.9, 0.75, 0.18, 0.32, 0.48,
                      0.24, 0.65, 0.88, 0.7,
                    ].map((opacity, i) => (
                      <div
                        key={i}
                        className="aspect-square rounded-sm bg-[var(--accent)]"
                        style={{ opacity }}
                      />
                    ))}
                  </div>
                </div>
                <div className="col-span-4 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-4">
                  <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--text-tertiary)]">
                    Top Products · Month
                  </div>
                  <div className="space-y-0 border-t border-[var(--border-default)]">
                    {[
                      { name: "Merino Tee — Black", val: "$4,260", pct: 100 },
                      { name: "Canvas Tote", val: "$2,940", pct: 69 },
                      { name: "Beanie — Grey", val: "$1,340", pct: 31 },
                    ].map((row, idx) => (
                      <div
                        key={row.name}
                        className="flex items-center gap-2 border-b border-[var(--border-default)] py-1.5 last:border-0"
                      >
                        <span className="w-3 text-[9px] font-bold text-[var(--text-tertiary)]">
                          0{idx + 1}
                        </span>
                        <span className="flex-1 text-xs font-medium text-[var(--text-primary)]">
                          {row.name}
                        </span>
                        <div className="h-1 w-12 overflow-hidden rounded-full bg-[var(--border-default)]">
                          <div
                            className="h-full rounded-full bg-[var(--accent)]"
                            style={{ width: `${row.pct}%` }}
                          />
                        </div>
                        <span
                          className="min-w-[38px] text-right text-xs font-bold text-[var(--success)]"
                          style={{ fontFamily: "var(--font-hero)" }}
                        >
                          {row.val}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-b-2xl border border-t-0 border-[var(--border-default)] bg-[var(--bg-surface)] shadow-[var(--shadow-lg)]" />
        </motion.div>
      </div>
    </section>
  );
}
