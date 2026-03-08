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
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-colors duration-300",
        scrolled ? "bg-[#0A0A0F] border-b border-[var(--border)]" : "bg-transparent"
      )}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-[72px] md:px-10"
        aria-label="Main navigation"
      >
        {/* Wordmark */}
        <a
          href="#"
          className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--text-primary)] transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[#0A0A0F] rounded-md min-h-[44px] min-w-[44px] flex items-center"
        >
          StackIt
        </a>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={handleAnchorClick}
              className="text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[#0A0A0F] rounded-md py-2 px-1 min-h-[44px] flex items-center"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <a
            href="#early-access"
            onClick={handleAnchorClick}
            className="inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius)] bg-[var(--primary)] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[#0A0A0F]"
          >
            Get Early Access
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          className="flex size-11 items-center justify-center rounded-[var(--radius)] text-[var(--text-primary)] transition-colors hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[#0A0A0F] md:hidden"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-[var(--border)] bg-[#0A0A0F] px-6 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={handleAnchorClick}
                className="min-h-[44px] flex items-center rounded-[var(--radius)] px-3 text-[var(--text-primary)] transition-colors hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-inset"
              >
                {label}
              </a>
            ))}
            <a
              href="#early-access"
              onClick={handleAnchorClick}
              className="mt-2 flex min-h-[44px] items-center justify-center rounded-[var(--radius)] bg-[var(--primary)] px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Get Early Access
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
