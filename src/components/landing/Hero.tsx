"use client";

import { motion } from "framer-motion";
import { scrollToHash } from "@/lib/utils";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export function Hero() {
  return (
    <section className="relative min-h-[85vh] overflow-hidden px-6 pt-12 pb-20 md:min-h-[90vh] md:px-10 md:pt-16 md:pb-28">
      {/* Animated mesh / gradient background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
      >
        <div
          className="absolute -top-1/2 -left-1/2 h-full w-full rounded-full bg-[var(--primary)] mix-blend-multiply blur-[120px] animate-hero-glow"
          style={{ opacity: 0.15 }}
        />
        <div
          className="absolute -bottom-1/4 -right-1/4 h-3/4 w-3/4 rounded-full bg-[var(--primary)] mix-blend-multiply blur-[100px] animate-hero-glow-delayed"
          style={{ opacity: 0.08 }}
        />
      </div>

      {/* Subtle noise overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        aria-hidden
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-3xl text-center"
        >
          <motion.h1
            variants={item}
            className="font-[family-name:var(--font-display)] text-4xl font-bold leading-[1.1] tracking-tight text-[var(--text-primary)] md:text-5xl lg:text-6xl xl:text-7xl"
          >
            Your Business. One Screen.
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-6 text-lg text-[var(--text-secondary)] md:text-xl md:leading-relaxed"
          >
            StackIt connects your Shopify, Square, and bank accounts so you can see
            everything at a glance. Drag. Drop. Done.
          </motion.p>
          <motion.div
            variants={item}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a
              href="#early-access"
              onClick={scrollToHash}
              className="inline-flex min-h-[48px] min-w-[180px] items-center justify-center rounded-[var(--radius)] bg-[var(--primary)] px-6 py-3 text-base font-medium text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[#0A0A0F]"
            >
              Get Early Access
            </a>
            <a
              href="#how-it-works"
              onClick={scrollToHash}
              className="inline-flex min-h-[48px] min-w-[180px] items-center justify-center rounded-[var(--radius)] border border-[var(--border)] bg-transparent px-6 py-3 text-base font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--primary)] hover:bg-[var(--primary-soft)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[#0A0A0F]"
            >
              See How It Works
            </a>
          </motion.div>
        </motion.div>

        {/* Floating dashboard mockup placeholder */}
        <motion.div
          variants={item}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
          className="mx-auto mt-16 max-w-4xl md:mt-20"
        >
          <div
            className="relative rounded-2xl border-2 border-[var(--primary)] bg-[var(--surface)] p-8 shadow-[0_0_60px_-12px_rgba(99,102,241,0.25)] md:p-12"
            style={{
              boxShadow:
                "0 0 0 1px rgba(99, 102, 241, 0.2), 0 0 60px -12px rgba(99, 102, 241, 0.25)",
            }}
          >
            <div className="grid gap-4 sm:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-24 rounded-xl bg-[var(--surface-raised)] border border-[var(--border)]"
                />
              ))}
            </div>
            <div className="mt-4 flex gap-4">
              <div className="h-20 flex-1 rounded-xl bg-[var(--surface-raised)] border border-[var(--border)]" />
              <div className="h-20 w-1/3 rounded-xl bg-[var(--surface-raised)] border border-[var(--border)]" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
