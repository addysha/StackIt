"use client";

import { motion } from "framer-motion";
import { scrollToHash } from "@/lib/utils";

const FOOTER_LINKS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Live demo", href: "#demo" },
      { label: "Integrations", href: "#integrations" },
      { label: "Pricing", href: "#pricing" },
      { label: "Changelog", href: "#" },
      { label: "Roadmap", href: "#" },
    ],
  },
  {
    title: "Use cases",
    links: [
      { label: "Shopify stores", href: "#" },
      { label: "Cafés & hospitality", href: "#" },
      { label: "Tradies & services", href: "#" },
      { label: "Market stall sellers", href: "#" },
      { label: "Etsy sellers", href: "#" },
      { label: "Retail stores", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help centre", href: "#" },
      { label: "Documentation", href: "#" },
      { label: "Book onboarding call", href: "#cta" },
      { label: "Contact us", href: "#" },
      { label: "Service status ↗", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Privacy policy", href: "#" },
      { label: "Terms of service", href: "#" },
      { label: "hello@stackit.co.nz", href: "mailto:hello@stackit.co.nz" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--border-default)] bg-[var(--bg-base)]">
      <div className="px-4 pt-16 pb-14 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-hover)] shadow-lg">
            <span
              className="text-xl font-semibold text-white"
              style={{ fontFamily: "var(--font-hero)" }}
            >
              S
            </span>
          </div>
          <h2
            className="text-2xl font-semibold leading-tight tracking-tight md:text-3xl lg:text-4xl"
            style={{ fontFamily: "var(--font-hero)" }}
          >
            Discover a better way
            <br />
            to <em className="italic text-[var(--accent)]">run your business.</em>
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[var(--text-secondary)]">
            Get started today and join the businesses already using Stackit —
            from local cafés to Shopify sellers across New Zealand.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#cta"
              onClick={scrollToHash}
              className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[var(--accent)] px-6 py-2.5 text-sm font-bold text-[var(--text-inverse)] transition-colors hover:bg-[var(--accent-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
            >
              Get started for free
            </a>
            <a
              href="#demo"
              onClick={scrollToHash}
              className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-[var(--border-default)] bg-transparent px-6 py-2.5 text-sm font-bold text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
            >
              Watch the demo
            </a>
          </div>
          <p className="mt-4 text-xs text-[var(--text-tertiary)]">
            No credit card required · 30-min onboarding included · Cancel anytime
          </p>
        </motion.div>
      </div>

      <div className="border-t border-[var(--border-default)] px-4 py-10 md:px-6">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-hero)" }}>
              Never miss an update
            </h3>
            <p className="mt-1 text-[13.5px] leading-relaxed text-[var(--text-secondary)]">
              Get product updates, NZ business tips, and Stackit news — delivered
              directly to your inbox. We rarely send more than one email a month.
            </p>
          </div>
          <div>
            <form
              className="flex flex-col gap-2 sm:flex-row sm:gap-0"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 rounded-l-xl rounded-r-xl border border-[var(--border-default)] bg-[var(--bg-surface)] px-4 py-2.5 text-[13.5px] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] sm:rounded-r-none"
              />
              <button
                type="submit"
                className="rounded-xl bg-[var(--text-primary)] px-5 py-2.5 text-[13.5px] font-bold text-[var(--bg-base)] transition-colors hover:bg-[var(--text-primary)]/90 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] sm:rounded-l-none sm:rounded-r-xl"
              >
                Sign up
              </button>
            </form>
            <label className="mt-2.5 flex cursor-pointer items-center gap-2 text-xs text-[var(--text-tertiary)]">
              <input type="checkbox" className="accent-[var(--accent)]" />
              I agree to receive emails from Stackit.
            </label>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--border-default)] px-4 py-10 md:px-6">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-4">
          {FOOTER_LINKS.map((col) => (
            <div key={col.title}>
              <h4 className="mb-3.5 text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={link.href.startsWith("#") ? scrollToHash : undefined}
                      className="text-[13px] text-[var(--text-tertiary)] transition-colors hover:text-[var(--accent)]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-[var(--border-default)] px-4 py-6 md:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
          <span
            className="text-base font-semibold text-[var(--text-secondary)]"
            style={{ fontFamily: "var(--font-hero)" }}
          >
            Stack<span className="text-[var(--accent)]">it</span>
          </span>
          <p className="text-[12.5px] text-[var(--text-tertiary)]">
            © 2026 Stackit Ltd · Built in Auckland, New Zealand
          </p>
          <div className="flex gap-2">
            <a
              href="#"
              className="flex size-8 items-center justify-center rounded-lg border border-[var(--border-default)] bg-[var(--bg-elevated)] text-[var(--text-tertiary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
              aria-label="X / Twitter"
            >
              𝕏
            </a>
            <a
              href="#"
              className="flex size-8 items-center justify-center rounded-lg border border-[var(--border-default)] bg-[var(--bg-elevated)] text-sm font-medium text-[var(--text-tertiary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
              aria-label="LinkedIn"
            >
              in
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
