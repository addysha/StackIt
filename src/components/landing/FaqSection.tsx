"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { cn, scrollToHash } from "@/lib/utils";

const FAQ_ITEMS = [
  {
    q: "Do I need any tech skills?",
    a: "None at all. That's the whole point. Show up to a 30-minute call — we set everything up while you watch. You leave with a live dashboard and never touch a settings screen.",
  },
  {
    q: "What does the onboarding call involve?",
    a: "30 minutes on Zoom. We ask 5 questions — what tools do you use, what numbers matter most, what does a good week look like. Then we build your dashboard live. You don't do any of the clicking.",
  },
  {
    q: "What if I only have a bank account?",
    a: "One of our best use cases. We connect directly to your NZ bank via open banking (ANZ, ASB, BNZ). Money in, money out, categorised automatically. Live dashboard even if you've never used accounting software.",
  },
  {
    q: "Is my financial data safe?",
    a: "All integrations use read-only OAuth — we can see data but never move money. Bank connections use Akahu, a regulated open-banking provider. Data is encrypted in transit and at rest.",
  },
  {
    q: "How is this different from Shopify Analytics?",
    a: "Shopify only shows Shopify data. It doesn't know about your bank, invoices, in-person sales, or expenses. Stackit pulls everything into one view — your whole business, not just one slice.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes, no lock-in. Monthly plans cancel with 30 days notice. We'd rather earn your business every month than trap you into staying.",
  },
  {
    q: "What's the catch with the first 10 free?",
    a: "There isn't one. We want 10 real businesses using Stackit so we can make it better. In exchange: honest feedback, and a testimonial if you love it. That's it.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="bg-[var(--bg-base)] px-4 py-20 md:px-6 md:py-28"
    >
      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-[1fr,1.6fr] md:gap-20">
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="md:sticky md:top-24"
        >
          <p className="mb-3.5 text-xs font-bold uppercase tracking-[0.1em] text-[var(--accent)]">
            FAQ
          </p>
          <h2
            className="text-2xl font-semibold leading-tight tracking-tight md:text-3xl"
            style={{ fontFamily: "var(--font-hero)" }}
          >
            Questions people <em className="italic text-[var(--accent)]">actually</em> ask.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
            Still unsure?{" "}
            <a
              href="#cta"
              onClick={scrollToHash}
              className="font-semibold text-[var(--accent)] underline-offset-2 hover:underline"
            >
              Book a call
            </a>{" "}
            — we&apos;ll walk you through it in 15 minutes.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col"
        >
          {FAQ_ITEMS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className={cn(
                  "border-b border-[var(--border-default)]",
                  idx === 0 && "border-t"
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between gap-4 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span
                    className="text-base font-medium leading-snug text-[var(--text-primary)] md:text-[16.5px]"
                    style={{ fontFamily: "var(--font-hero)" }}
                  >
                    {faq.q}
                  </span>
                  <span
                    className={cn(
                      "flex size-6 shrink-0 items-center justify-center rounded-full border border-[var(--border-default)] bg-[var(--bg-elevated)] text-[var(--text-tertiary)] transition-all",
                      isOpen &&
                        "rotate-45 border-[var(--accent)]/25 bg-[var(--accent)]/10 text-[var(--accent)]"
                    )}
                  >
                    <Plus className="size-3.5" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-4 pr-10 text-sm leading-relaxed text-[var(--text-secondary)]">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
