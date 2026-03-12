"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn, scrollToHash } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Try it", href: "#demo" },
  { label: "Integrations", href: "#integrations" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
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
      className="px-5 md:px-10"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 500,
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(253,250,245,.9)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--stone)",
        transition: "box-shadow .3s",
        boxShadow: scrolled ? "0 2px 20px rgba(30,24,16,.06)" : "none",
      }}
    >
      {/* Logo */}
      <a
        href="#hero"
        onClick={handleAnchorClick}
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: 19,
          fontWeight: 600,
          color: "var(--ink)",
          textDecoration: "none",
          letterSpacing: "-0.2px",
        }}
      >
        Stack<span style={{ color: "var(--terra)" }}>it</span>
      </a>

      {/* Desktop nav links */}
      <ul
        className="hidden md:flex"
        style={{ gap: 2, listStyle: "none", margin: 0, padding: 0 }}
      >
        {NAV_LINKS.map(({ label, href }) => (
          <li key={href}>
            <a
              href={href}
              onClick={handleAnchorClick}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 13,
                fontWeight: 600,
                color: "var(--ink-3)",
                textDecoration: "none",
                padding: "5px 12px",
                borderRadius: 100,
                display: "inline-block",
                transition: "color .2s, background .2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--ink)";
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(30,24,16,.05)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--ink-3)";
                (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
              }}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      {/* CTA — visible on mobile (smaller), full size on md+ */}
      <a
        href="#cta"
        onClick={handleAnchorClick}
        className={cn(
          "inline-flex items-center justify-center min-h-[44px] rounded-full font-sans font-bold text-white no-underline transition-colors duration-200 transition-transform duration-150",
          "py-2 px-4 text-xs md:py-2 md:px-5 md:text-[13px] md:min-h-0",
          "bg-[var(--terra)] hover:bg-[var(--terra-dk)]"
        )}
        style={{
          letterSpacing: ".01em",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.transform = "none";
        }}
      >
        <span className="hidden md:inline">Get early access →</span>
        <span className="md:hidden">Get access</span>
      </a>

      {/* Mobile hamburger */}
      <button
        type="button"
        onClick={() => setMobileOpen((o) => !o)}
        className="flex md:hidden min-h-[44px] min-w-[44px] items-center justify-center rounded-none border-0 cursor-pointer p-0 text-[var(--ink)] bg-transparent"
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden"
          style={{
            position: "absolute",
            top: 56,
            left: 0,
            right: 0,
            background: "rgba(253,250,245,.97)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid var(--stone)",
            padding: "8px 18px 16px",
          }}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={handleAnchorClick}
              style={{
                display: "block",
                padding: "10px 4px",
                fontFamily: "var(--font-sans)",
                fontSize: 15,
                fontWeight: 600,
                color: "var(--ink)",
                textDecoration: "none",
                borderBottom: "1px solid var(--stone)",
              }}
            >
              {label}
            </a>
          ))}
          <a
            href="#cta"
            onClick={handleAnchorClick}
            style={{
              display: "block",
              marginTop: 12,
              background: "var(--ink)",
              color: "var(--w)",
              padding: "11px",
              borderRadius: 100,
              textAlign: "center",
              fontFamily: "var(--font-sans)",
              fontSize: 14,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Get early access
          </a>
        </div>
      )}
    </header>
  );
}
