"use client";

import { motion } from "framer-motion";
import { DollarSign, Zap, Puzzle } from "lucide-react";

const PROBLEM_CARDS = [
  {
    icon: DollarSign,
    title: "Too expensive",
    body: "Proper business intelligence tools cost $500–$2,000/month and need someone to set them up. They're built for analysts, not café owners.",
    accent: "from-[var(--danger)] to-[var(--accent)]",
  },
  {
    icon: Zap,
    title: "Too complex",
    body: "Most dashboards take weeks to configure, require API tokens, and break the moment something changes. You didn't sign up for that.",
    accent: "from-[var(--warning)] to-amber-400",
  },
  {
    icon: Puzzle,
    title: "Too fragmented",
    body: "You have 4 apps open at once. None of them talk to each other. You're manually piecing together a picture of your business every time.",
    accent: "from-[var(--text-tertiary)] to-[var(--border-strong)]",
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
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function ProblemSection() {
  return (
    <section
      id="problem"
      className="relative overflow-hidden px-4 py-20 md:px-6 md:py-28"
    >
      <div className="mx-auto max-w-4xl text-center">
        <motion.p
          variants={item}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="mb-3.5 text-xs font-bold uppercase tracking-[0.1em] text-[var(--accent)]"
        >
          The problem
        </motion.p>
        <motion.h2
          variants={item}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl lg:text-5xl"
          style={{ fontFamily: "var(--font-hero)" }}
        >
          Small businesses run on
          <br />
          <em className="italic text-[var(--accent)]">scattered information.</em>
        </motion.h2>
        <motion.p
          variants={item}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="mx-auto mt-4 max-w-[540px] text-base leading-relaxed text-[var(--text-secondary)] md:text-[17px]"
        >
          Your revenue is in Shopify. Your cash is in your bank app. Your
          invoices are in Xero. Your sales are in Square. You're running the
          business in your head.
        </motion.p>
      </div>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mx-auto mt-14 grid max-w-[900px] gap-4 md:grid-cols-3"
      >
        {PROBLEM_CARDS.map((card) => (
          <motion.div
            key={card.title}
            variants={item}
            className="group relative overflow-hidden rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 text-left shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"
          >
            <div
              className={`absolute left-0 right-0 top-0 h-0.5 bg-gradient-to-r ${card.accent}`}
            />
            <card.icon
              className="mb-3.5 size-7 text-[var(--text-secondary)]"
              strokeWidth={1.5}
              aria-hidden
            />
            <h3
              className="mb-2 text-lg font-semibold text-[var(--text-primary)]"
              style={{ fontFamily: "var(--font-hero)" }}
            >
              {card.title}
            </h3>
            <p className="text-[13.5px] leading-relaxed text-[var(--text-secondary)]">
              {card.body}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
