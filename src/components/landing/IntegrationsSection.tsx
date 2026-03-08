"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  CreditCard,
  Landmark,
  FileText,
  Plug,
  Store,
  Megaphone,
  Smartphone,
  Search,
  Handshake,
} from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  {
    id: 0,
    icon: ShoppingCart,
    name: "Online selling",
    count: "3 apps",
    body: "Pulls revenue, orders, top products, refunds, customer counts, and average order value directly.",
    chips: ["Shopify", "Square", "Etsy"],
  },
  {
    id: 1,
    icon: CreditCard,
    name: "Payments",
    count: "2 apps",
    body: "Track payments received, refunds, and processing fees in real time.",
    chips: ["Stripe", "PayPal"],
  },
  {
    id: 2,
    icon: Landmark,
    name: "Bank feeds",
    count: "3 banks",
    body: "Direct open-banking connection. Works even if you have no software at all.",
    chips: ["ANZ", "ASB", "BNZ"],
  },
  {
    id: 3,
    icon: FileText,
    name: "Accounting",
    count: "2 apps",
    body: "Pull invoices, P&L, expenses and cash flow from your accounting software.",
    chips: ["Xero", "MYOB"],
  },
  {
    id: 4,
    icon: Plug,
    name: "200+ via Apideck",
    count: "Ask us",
    body: "CRMs, ERPs, marketing platforms and more. Ask us about your stack.",
    chips: ["Klaviyo", "HubSpot", "Meta Ads"],
  },
];

const NODES_BY_CATEGORY: { icon: LucideIcon; name: string; status: string; on: boolean }[][] = [
  [
    { icon: ShoppingCart, name: "Shopify", status: "Connected", on: true },
    { icon: Landmark, name: "ANZ Feed", status: "Connected", on: true },
    { icon: CreditCard, name: "Stripe", status: "Connected", on: true },
    { icon: FileText, name: "Xero", status: "Tap to connect", on: false },
    { icon: Store, name: "Square", status: "Tap to connect", on: false },
    { icon: Plug, name: "+200 more", status: "Via Apideck", on: false },
  ],
  [
    { icon: CreditCard, name: "Stripe", status: "Connected", on: true },
    { icon: CreditCard, name: "PayPal", status: "Tap to connect", on: false },
    { icon: ShoppingCart, name: "Shopify", status: "Connected", on: true },
    { icon: FileText, name: "Xero", status: "Tap to connect", on: false },
    { icon: Landmark, name: "ANZ Feed", status: "Connected", on: true },
    { icon: Plug, name: "+200 more", status: "Via Apideck", on: false },
  ],
  [
    { icon: Landmark, name: "ANZ", status: "Connected", on: true },
    { icon: Landmark, name: "ASB", status: "Tap to connect", on: false },
    { icon: Landmark, name: "BNZ", status: "Tap to connect", on: false },
    { icon: CreditCard, name: "Stripe", status: "Connected", on: true },
    { icon: ShoppingCart, name: "Shopify", status: "Connected", on: true },
    { icon: Plug, name: "+200 more", status: "Via Apideck", on: false },
  ],
  [
    { icon: FileText, name: "Xero", status: "Add-on", on: false },
    { icon: FileText, name: "MYOB", status: "Tap to connect", on: false },
    { icon: Landmark, name: "ANZ Feed", status: "Connected", on: true },
    { icon: ShoppingCart, name: "Shopify", status: "Connected", on: true },
    { icon: CreditCard, name: "Stripe", status: "Connected", on: true },
    { icon: Plug, name: "+200 more", status: "Via Apideck", on: false },
  ],
  [
    { icon: Megaphone, name: "Klaviyo", status: "Via Apideck", on: false },
    { icon: Smartphone, name: "Meta Ads", status: "Via Apideck", on: false },
    { icon: Search, name: "Google Ads", status: "Via Apideck", on: false },
    { icon: Handshake, name: "HubSpot", status: "Via Apideck", on: false },
    { icon: ShoppingCart, name: "Shopify", status: "Connected", on: true },
    { icon: Plug, name: "+195 more", status: "Ask us", on: false },
  ],
];

type LucideIcon = React.ComponentType<{ className?: string }>;

export function IntegrationsSection() {
  const [activeCat, setActiveCat] = useState(0);
  const nodes = NODES_BY_CATEGORY[activeCat] ?? NODES_BY_CATEGORY[0];

  return (
    <section
      id="integrations"
      className="border-t border-[var(--border-default)] bg-[var(--bg-elevated)] px-4 py-20 md:px-6 md:py-28"
    >
      <div className="mx-auto max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-3.5 text-xs font-bold uppercase tracking-[0.1em] text-[var(--accent)]"
        >
          Integrations
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl"
          style={{ fontFamily: "var(--font-hero)" }}
        >
          Connects to the tools
          <br />
          you <em className="italic text-[var(--accent)]">already use.</em>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-4 max-w-[540px] text-base leading-relaxed text-[var(--text-secondary)]"
        >
          One click to connect. OAuth login — no API keys, no CSV uploads, no
          technical knowledge needed.
        </motion.p>
      </div>

      <div className="mx-auto mt-14 grid max-w-6xl gap-12 md:grid-cols-[1fr,1.2fr] md:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-2"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCat(cat.id)}
              className={cn(
                "rounded-xl border px-5 py-4 text-left transition-all",
                activeCat === cat.id
                  ? "border-[var(--accent)] bg-[var(--bg-surface)] shadow-[0_4px_16px_var(--accent-glow)]"
                  : "border-[var(--border-default)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)] hover:translate-x-0.5"
              )}
            >
              <div className="flex items-center gap-2.5">
                <cat.icon className="size-4 shrink-0 text-[var(--text-secondary)]" />
                <span className="flex-1 text-[15px] font-semibold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-hero)" }}>
                  {cat.name}
                </span>
                <span className="rounded-full bg-[var(--border-default)] px-2 py-0.5 text-[10.5px] font-bold text-[var(--text-tertiary)]">
                  {cat.count}
                </span>
              </div>
              {activeCat === cat.id && (
                <>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-[var(--text-secondary)]">
                    {cat.body}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {cat.chips.map((chip) => (
                      <span
                        key={chip}
                        className="rounded-full border border-[var(--success)]/20 bg-[var(--success)]/10 px-2 py-0.5 text-[11px] font-semibold text-[var(--success)]"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </button>
          ))}
        </motion.div>

        <motion.div
          key={activeCat}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="sticky top-20 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 shadow-[var(--shadow-sm)]"
        >
          <div className="mb-4 text-[10px] font-bold uppercase tracking-wider text-[var(--text-tertiary)]">
            Your connected business
          </div>
          <div className="mb-4 rounded-xl border border-[var(--accent)] bg-[var(--accent)]/10 p-4 text-center">
            <div className="text-base font-semibold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-hero)" }}>
              Stack<span className="text-[var(--accent)]">it</span>
            </div>
            <div className="mt-0.5 text-[10.5px] text-[var(--text-tertiary)]">
              Your live dashboard
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {nodes.map((node) => (
              <div
                key={node.name}
                className={cn(
                  "rounded-lg border p-2.5 text-center transition-all",
                  node.on
                    ? "border-[var(--success)]/30 bg-[var(--success)]/10"
                    : "border-[var(--border-default)] bg-[var(--bg-base)] hover:border-[var(--accent)] hover:shadow-md"
                )}
              >
                <node.icon className="mx-auto mb-1 size-4 text-[var(--text-secondary)]" />
                <div className="text-[10.5px] font-bold text-[var(--text-secondary)]">
                  {node.name}
                </div>
                <div
                  className={cn(
                    "mt-0.5 text-[9px]",
                    node.on ? "font-bold text-[var(--success)]" : "text-[var(--text-tertiary)]"
                  )}
                >
                  {node.status}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-center text-[11.5px] italic text-[var(--text-tertiary)]">
            Every node feeds your dashboard automatically
          </p>
        </motion.div>
      </div>
    </section>
  );
}
