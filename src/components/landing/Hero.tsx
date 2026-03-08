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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const MOCKUP_TINTS = [
  "#f0fdf4", // block 1 — slight green
  "#eff6ff", // block 2 — slight blue
  "#f5f3ff", // block 3 — slight purple
  "#f4f4f1", // block 4
  "#f4f4f1", // block 5
];

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
      className="relative min-h-[85vh] overflow-hidden px-6 pt-[160px] pb-20 md:min-h-[90vh] md:px-10 md:pt-[160px] md:pb-[80px]"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 0%, #FFFFFF 0%, #FAFAF8 100%)",
      }}
    >
      {/* Decorative orb — top right */}
      <div
        className="pointer-events-none absolute -top-[100px] -right-[100px] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(91,87,232,0.06)_0%,transparent_70%)] [filter:blur(60px)]"
        aria-hidden
      />

      {/* Optional faint dot grid */}
      <div
        className="hero-dot-grid pointer-events-none absolute inset-0"
        aria-hidden
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
            transition={{ duration: 0.5, ease: "easeOut", delay: 0 }}
            className="text-4xl leading-[1.1] tracking-tight md:text-5xl lg:text-6xl xl:text-[72px]"
            style={{
              fontFamily: "var(--font-hero)",
              fontWeight: 400,
            }}
          >
            <span className="block text-[var(--text-primary)]">
              Your Business.
            </span>
            <span
              className="mt-1 block font-[family-name:var(--font-hero)] italic text-[var(--accent)]"
              style={{ fontFamily: "var(--font-hero)" }}
            >
              One Screen.
            </span>
          </motion.h1>
          <motion.p
            variants={item}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
            className="mx-auto mt-6 max-w-[520px] text-lg font-normal leading-relaxed text-[var(--text-secondary)] md:text-[18px]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            StackIt connects your Shopify, Square, and bank accounts so you can
            see everything at a glance. Drag. Drop. Done.
          </motion.p>
          <motion.div
            variants={item}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a
              href="#early-access"
              onClick={scrollToHash}
              className="inline-flex min-h-[48px] min-w-[180px] items-center justify-center rounded-full bg-[var(--accent)] px-6 py-3 text-base font-medium text-[var(--text-inverse)] shadow-[0_2px_8px_var(--accent-glow)] transition-colors hover:bg-[var(--accent-hover)] hover:shadow-[0_4px_16px_var(--accent-glow)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--bg-base)]"
            >
              Get Early Access
            </a>
            <a
              href="#how-it-works"
              onClick={scrollToHash}
              className="inline-flex min-h-[48px] min-w-[180px] items-center justify-center gap-2 text-base font-normal text-[var(--text-secondary)] transition-colors duration-100 hover:text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--bg-base)]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              See How It Works
              <ArrowRight className="size-4" />
            </a>
          </motion.div>
        </motion.div>

        {/* Floating dashboard mockup — white card with tinted blocks */}
        <motion.div
          ref={mockupRef}
          variants={item}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
          className="mx-auto mt-16 max-w-4xl md:mt-20"
        >
          <div className="relative rounded-[20px] border border-[var(--border-default)] bg-[var(--bg-surface)] p-8 shadow-[var(--shadow-xl)] md:p-12">
            <div className="grid gap-4 sm:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-24 rounded-xl border border-[var(--border-default)]"
                  style={{ backgroundColor: MOCKUP_TINTS[i] }}
                />
              ))}
            </div>
            <div className="mt-4 flex gap-4">
              <div
                className="h-20 flex-1 rounded-xl border border-[var(--border-default)]"
                style={{ backgroundColor: MOCKUP_TINTS[3] }}
              />
              <div
                className="h-20 w-1/3 rounded-xl border border-[var(--border-default)]"
                style={{ backgroundColor: MOCKUP_TINTS[4] }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
