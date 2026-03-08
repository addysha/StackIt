"use client";

import { motion } from "framer-motion";
import { Mail, Calendar, Layers, Coffee } from "lucide-react";

const STEPS = [
  {
    icon: Mail,
    title: "Sign up — no card",
    body: "Email, password, done. Takes under a minute.",
    badge: "1 min",
  },
  {
    icon: Calendar,
    title: "Book your call",
    body: "Pick a time. 30 minutes on Zoom. We'll take it from here.",
    badge: "30 sec",
  },
  {
    icon: Layers,
    title: "We build it live",
    body: "5 questions, we connect your tools and set up your dashboard while you watch.",
    badge: "30 min",
  },
  {
    icon: Coffee,
    title: "Open it every morning",
    body: "Your numbers are always current. No exports, no refreshes.",
    badge: "Every day",
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export function HowItWorks() {
  return (
    <section
      id="how"
      className="relative overflow-hidden bg-[var(--bg-base)] px-4 py-20 md:px-6 md:py-28"
    >
      <div className="mx-auto max-w-4xl text-center">
        <motion.p
          variants={item}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-3.5 text-xs font-bold uppercase tracking-[0.1em] text-[var(--accent)]"
        >
          How it works
        </motion.p>
        <motion.h2
          variants={item}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl lg:text-5xl"
          style={{ fontFamily: "var(--font-hero)" }}
        >
          Live in <em className="italic text-[var(--accent)]">30 minutes.</em>
          <br />
          We handle everything.
        </motion.h2>
        <motion.p
          variants={item}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-4 text-base leading-relaxed text-[var(--text-secondary)]"
        >
          Show up to a call. We do the rest.
        </motion.p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="relative mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-0"
      >
        {/* Connector line — desktop only */}
        <div
          className="absolute left-[12%] right-[12%] top-7 hidden h-px bg-gradient-to-r from-transparent via-[var(--border-default)] to-transparent md:block"
          aria-hidden
        />
        {STEPS.map((step, idx) => (
          <motion.div
            key={step.title}
            variants={item}
            className="relative z-10 flex flex-col items-center text-center"
          >
            <div className="mb-4 flex size-14 items-center justify-center rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] shadow-[var(--shadow-sm)]">
              <step.icon
                className="size-6 text-[var(--text-secondary)]"
                strokeWidth={1.5}
                aria-hidden
              />
              <span className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full bg-[var(--accent)] text-[9.5px] font-bold text-white">
                {idx + 1}
              </span>
            </div>
            <h3 className="text-base font-semibold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-hero)" }}>
              {step.title}
            </h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--text-secondary)]">
              {step.body}
            </p>
            <span className="mt-2 inline-block rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">
              {step.badge}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
