"use client";

import { motion } from "framer-motion";
import {
  ShoppingCart,
  Landmark,
  CreditCard,
  FileText,
  Store,
} from "lucide-react";
import { scrollToHash } from "@/lib/utils";

const BADGES = [
  { icon: ShoppingCart, label: "Shopify" },
  { icon: Landmark, label: "Bank feed" },
  { icon: CreditCard, label: "Stripe" },
  { icon: FileText, label: "Xero" },
  { icon: Store, label: "Square" },
];

export function FinalCta() {
  return (
    <section
      id="cta"
      className="border-t border-[var(--border-default)] bg-[var(--bg-elevated)] px-4 py-20 text-center md:px-6 md:py-28"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-[520px]"
      >
        <p className="mb-3.5 text-xs font-bold uppercase tracking-[0.1em] text-[var(--accent)]">
          Limited spots
        </p>
        <h2
          className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl"
          style={{ fontFamily: "var(--font-hero)" }}
        >
          First 10 businesses
          <br />
          get in <em className="italic text-[var(--accent)]">free.</em>
        </h2>
        <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)]">
          Free setup. Free onboarding. We build your dashboard — you just show
          up. All we ask is honest feedback and a kind word if you love it.
        </p>
        <a
          href="#cta"
          onClick={scrollToHash}
          className="mt-8 inline-flex min-h-[52px] items-center justify-center rounded-full bg-[var(--accent)] px-11 py-4 text-base font-bold text-[var(--text-inverse)] shadow-lg shadow-[var(--accent-glow)] transition-all hover:bg-[var(--accent-hover)] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--bg-elevated)]"
        >
          Book your free setup call
        </a>
        <p className="mt-4 text-sm text-[var(--text-tertiary)]">
          30 minutes · No credit card · Live dashboard when you leave
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {BADGES.map((b) => (
            <span
              key={b.label}
              className="flex items-center gap-1.5 rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] px-3 py-2 text-xs font-semibold text-[var(--text-tertiary)]"
            >
              <b.icon className="size-3.5" />
              {b.label}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
