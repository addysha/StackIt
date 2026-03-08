"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn, scrollToHash } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Integrations", href: "#integrations" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
] as const;

const SCROLL_THRESHOLD = 24;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    scrollToHash(e);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full px-4 pt-4 md:px-6 md:pt-5">
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between rounded-full transition-[border-color,background,box-shadow] duration-300",
          scrolled
            ? "border-b border-[var(--border-default)] bg-[rgba(250,250,248,0.85)] shadow-[var(--shadow-sm)] backdrop-blur-[20px]"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <nav
          className="flex h-14 min-w-0 flex-1 items-center justify-between gap-4 rounded-full px-4 md:h-16 md:px-6"
          aria-label="Main navigation"
        >
          {/* Logo — subtle pill behind wordmark */}
          <a
            href="#"
            className="flex shrink-0 items-center rounded-full bg-[var(--bg-elevated)] py-2 pl-3 pr-4 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--bg-base)] min-h-[44px]"
          >
            <span className="font-[family-name:var(--font-body)] text-xl font-semibold text-[var(--text-primary)]">
              StackIt
            </span>
          </a>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={handleAnchorClick}
                className="rounded-full py-2.5 px-4 text-sm font-normal text-[var(--text-secondary)] transition-colors duration-100 hover:text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--bg-base)] min-h-[44px] flex items-center"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Desktop CTA — pill */}
          <div className="hidden md:block shrink-0">
            <a
              href="#early-access"
              onClick={handleAnchorClick}
              className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-medium text-[var(--text-inverse)] shadow-[0_2px_8px_rgba(91,87,232,0.25)] transition-colors duration-200 hover:bg-[var(--accent-hover)] hover:shadow-[0_4px_12px_rgba(91,87,232,0.35)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--bg-base)]"
            >
              Get Early Access
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="flex size-11 shrink-0 items-center justify-center rounded-full text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-subtle)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--bg-base)] md:hidden"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>
      </div>

      {/* Mobile menu — light treatment */}
      {mobileOpen && (
        <div className="mx-auto mt-2 max-w-7xl rounded-2xl border border-[var(--border-default)] bg-[rgba(250,250,248,0.95)] px-4 py-3 backdrop-blur-[20px] shadow-[var(--shadow-md)] md:hidden">
          <div className="flex flex-col gap-0.5">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={handleAnchorClick}
                className="flex min-h-[44px] items-center rounded-full px-4 text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-subtle)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-inset"
              >
                {label}
              </a>
            ))}
            <a
              href="#early-access"
              onClick={handleAnchorClick}
              className="mt-2 flex min-h-[44px] items-center justify-center rounded-full bg-[var(--accent)] px-4 py-2.5 text-sm font-medium text-[var(--text-inverse)] shadow-[0_2px_8px_rgba(91,87,232,0.25)]"
            >
              Get Early Access
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
