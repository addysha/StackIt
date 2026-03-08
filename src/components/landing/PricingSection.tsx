"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const PRICES = {
  mo: { base: 99, growth: 199, addon: 30 },
  an: { base: 79, growth: 159, addon: 24 },
};

const PLANS = [
  {
    id: "base",
    name: "Base",
    priceKey: "base" as const,
    per: "per month, NZD",
    feats: [
      "All core metric blocks",
      "1 integration",
      "Onboarding call included",
      "Always live data",
    ],
    noFeats: ["Multiple integrations", "Priority support"],
    cta: "Get started",
    featured: false,
  },
  {
    id: "growth",
    name: "Growth",
    priceKey: "growth" as const,
    per: "per month, NZD",
    feats: [
      "Unlimited metric blocks",
      "All integrations",
      "Onboarding call included",
      "Priority support",
      "Quarterly check-in call",
      "Early access to new blocks",
    ],
    noFeats: [],
    cta: "Get started",
    featured: true,
    badge: "Most popular",
  },
  {
    id: "addon",
    name: "Add-ons",
    priceKey: "addon" as const,
    per: "per module / month",
    feats: [
      "Inventory Management",
      "Staff & Labour Tracker",
      "Marketing Spend ROI",
      "Social Performance",
      "Custom KPI blocks",
    ],
    noFeats: [],
    cta: "Learn more",
    featured: false,
    prefix: "+$",
  },
];

export function PricingSection() {
  const [billing, setBilling] = useState<"mo" | "an">("mo");
  const [sliderRev, setSliderRev] = useState(20);
  const [sliderHrs, setSliderHrs] = useState(5);

  const p = PRICES[billing];

  const calcValue =
    sliderHrs * 50 + Math.round((sliderRev * 1000 * 0.02) / 10) * 10;
  const calcDisplay =
    calcValue >= 1000 ? `$${(calcValue / 1000).toFixed(1)}k` : `$${calcValue}`;

  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-[#1E1810] px-4 py-20 md:px-6 md:py-28"
    >
      <div className="mx-auto max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-3.5 text-xs font-bold uppercase tracking-[0.1em] text-white/35"
        >
          Pricing
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl"
          style={{ fontFamily: "var(--font-hero)" }}
        >
          Straightforward.
          <br />
          <em className="italic text-[var(--accent)]">In NZD.</em>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-4 max-w-[540px] text-base leading-relaxed text-white/50"
        >
          No hidden fees. Onboarding call always included. Cancel any time.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto mt-10 flex flex-wrap items-center justify-center gap-3"
      >
        <button
          type="button"
          onClick={() => setBilling("mo")}
          className={cn(
            "text-sm font-semibold transition-colors",
            billing === "mo" ? "text-white" : "text-white/35"
          )}
        >
          Monthly
        </button>
        <button
          type="button"
          onClick={() => setBilling((b) => (b === "mo" ? "an" : "mo"))}
          className={cn(
            "relative flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)]",
            billing === "an" ? "bg-[var(--accent)]" : "bg-white/10"
          )}
          aria-label="Toggle annual billing"
        >
          <span
            className={cn(
              "inline-block size-4.5 translate-x-0.5 rounded-full bg-white transition-transform",
              billing === "an" && "translate-x-5"
            )}
          />
        </button>
        <span className={cn("text-sm font-semibold", billing === "an" ? "text-white" : "text-white/35")}>
          Annual
        </span>
        <span className="rounded-full border border-[var(--accent)]/25 bg-[var(--accent)]/15 px-2.5 py-0.5 text-[10.5px] font-bold text-[var(--accent)]">
          Save 20%
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-3"
      >
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className={cn(
              "relative rounded-2xl border p-6 transition-all hover:-translate-y-1 hover:shadow-xl",
              plan.featured
                ? "border-[var(--accent)] bg-[var(--accent)]/10"
                : "border-white/10 bg-white/[0.04] hover:shadow-white/5"
            )}
          >
            {plan.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--accent)] px-3 py-1 text-[9.5px] font-bold uppercase tracking-wider text-white">
                {plan.badge}
              </div>
            )}
            <div className="text-[10.5px] font-bold uppercase tracking-wider text-white/35">
              {plan.name}
            </div>
            <div className="mt-2 flex items-baseline gap-0.5">
              <span className="text-base text-white/35">
                {plan.prefix ?? "$"}
              </span>
              <span
                className="text-4xl font-semibold text-white"
                style={{ fontFamily: "var(--font-hero)" }}
              >
                {p[plan.priceKey]}
              </span>
            </div>
            <div className="text-xs text-white/30">{plan.per}</div>
            <ul className="mt-5 space-y-2">
              {plan.feats.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2 text-[13px] text-white/60"
                >
                  <span className="mt-0.5 text-[var(--success)]">✓</span>
                  {f}
                </li>
              ))}
              {plan.noFeats.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2 text-[13px] text-white/20"
                >
                  <span className="text-white/20">—</span>
                  {f}
                </li>
              ))}
            </ul>
            <button
              type="button"
              className={cn(
                "mt-6 w-full rounded-full py-2.5 text-sm font-bold transition-all",
                plan.featured
                  ? "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]"
                  : "border border-white/12 bg-transparent text-white/60 hover:border-white/35 hover:text-white"
              )}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto mt-10 max-w-5xl rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8"
      >
        <div className="grid gap-8 md:grid-cols-[1fr,1.2fr] md:items-center">
          <div>
            <h3 className="text-lg font-semibold text-white" style={{ fontFamily: "var(--font-hero)" }}>
              What&apos;s it worth to you?
            </h3>
            <p className="mt-1 text-[13px] leading-relaxed text-white/40">
              Most users find one insight in week one that earns more than a
              year&apos;s subscription.
            </p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-28 shrink-0 text-[12.5px] text-white/45">
                Monthly revenue
              </span>
              <input
                type="range"
                min={1}
                max={100}
                value={sliderRev}
                onChange={(e) => setSliderRev(Number(e.target.value))}
                className="h-1 flex-1 appearance-none rounded-full bg-white/10 accent-[var(--accent)]"
              />
              <span
                className="w-12 text-right text-[13.5px] font-semibold text-white"
                style={{ fontFamily: "var(--font-hero)" }}
              >
                {sliderRev >= 100 ? "$100k+" : `$${sliderRev}k`}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-28 shrink-0 text-[12.5px] text-white/45">
                Hrs/wk on admin
              </span>
              <input
                type="range"
                min={1}
                max={20}
                value={sliderHrs}
                onChange={(e) => setSliderHrs(Number(e.target.value))}
                className="h-1 flex-1 appearance-none rounded-full bg-white/10 accent-[var(--accent)]"
              />
              <span
                className="w-12 text-right text-[13.5px] font-semibold text-white"
                style={{ fontFamily: "var(--font-hero)" }}
              >
                {sliderHrs} hrs
              </span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-[var(--accent)]/20 bg-[var(--accent)]/10 px-4 py-3">
              <div>
                <div className="text-[12.5px] text-white/45">
                  Est. monthly value
                </div>
                <div className="text-[10.5px] text-white/25">
                  Time saved + better decisions
                </div>
              </div>
              <div className="text-right">
                <div
                  className="text-xl font-semibold text-white"
                  style={{ fontFamily: "var(--font-hero)" }}
                >
                  {calcDisplay}
                </div>
                <div className="text-[10.5px] text-white/30">vs $199/mo Growth</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
