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
  hidden: { opacity: 0, y: 40 },
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
      translateY: [0, -12, 0],
      duration: 6000,
      ease: "inOutSine",
      loop: true,
    });
  }, []);

  return (
    <section className="relative min-h-[85vh] overflow-hidden bg-[var(--bg-base)] px-6 pt-12 pb-20 md:min-h-[90vh] md:px-10 md:pt-16 md:pb-28">
      {/* Ambient glow blobs */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <div
          className="absolute -left-[200px] -top-[200px] h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(124,111,247,0.08)_0%,transparent_70%)] [filter:blur(80px)]"
        />
        <div
          className="absolute -right-[200px] -top-[100px] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.06)_0%,transparent_70%)] [filter:blur(80px)]"
        />
        <div
          className="absolute left-[30%] top-[60%] h-[400px] w-[800px] rounded-full bg-[radial-gradient(ellipse,rgba(124,111,247,0.04)_0%,transparent_60%)] [filter:blur(120px)]"
        />
      </div>

      {/* Dot grid */}
      <div
        className="hero-dot-grid pointer-events-none absolute inset-0 opacity-100"
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
            className="text-4xl font-bold leading-[1.1] tracking-tight text-[var(--text-primary)] md:text-5xl lg:text-6xl xl:text-[72px]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <span className="block">Your Business.</span>
            <span
              className="mt-1 block font-[family-name:var(--font-hero)] italic text-[#C4BFFF]"
            >
              One Screen.
            </span>
          </motion.h1>
          <motion.p
            variants={item}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
            className="mt-6 text-lg text-[var(--text-secondary)] md:text-xl md:leading-relaxed"
            style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
          >
            StackIt connects your Shopify, Square, and bank accounts so you can see
            everything at a glance. Drag. Drop. Done.
          </motion.p>
          <motion.div
            variants={item}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a
              href="#early-access"
              onClick={scrollToHash}
              className="inline-flex min-h-[48px] min-w-[180px] items-center justify-center rounded-full bg-[var(--accent)] px-6 py-3 text-base font-medium text-white shadow-[0_0_20px_var(--accent-glow)] transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--bg-base)]"
            >
              Get Early Access
            </a>
            <a
              href="#how-it-works"
              onClick={scrollToHash}
              className="inline-flex min-h-[48px] min-w-[180px] items-center justify-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] px-6 py-3 text-base font-medium text-[var(--text-primary)] backdrop-blur-[20px] transition-colors hover:border-white/[0.14] hover:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--bg-base)]"
            >
              See How It Works
              <ArrowRight className="size-4" />
            </a>
          </motion.div>
        </motion.div>

        {/* Floating dashboard mockup — glass card */}
        <motion.div
          ref={mockupRef}
          variants={item}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
          className="mx-auto mt-16 max-w-4xl md:mt-20"
        >
          <div className="glass-card relative rounded-2xl p-8 md:p-12">
            <div className="grid gap-4 sm:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-24 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)]"
                />
              ))}
            </div>
            <div className="mt-4 flex gap-4">
              <div className="h-20 flex-1 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)]" />
              <div className="h-20 w-1/3 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)]" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
