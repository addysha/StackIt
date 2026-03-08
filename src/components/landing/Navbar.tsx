"use client";

import { useEffect, useState } from "react";
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
        padding: "0 40px",
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

      {/* CTA */}
      <a
        href="#cta"
        onClick={handleAnchorClick}
        className="hidden md:inline-flex"
        style={{
          background: "var(--ink)",
          color: "var(--w)",
          padding: "8px 20px",
          borderRadius: 100,
          fontSize: 13,
          fontWeight: 700,
          textDecoration: "none",
          fontFamily: "var(--font-sans)",
          letterSpacing: ".01em",
          transition: "background .2s, transform .15s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.background = "#2c2012";
          (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.background = "var(--ink)";
          (e.currentTarget as HTMLAnchorElement).style.transform = "none";
        }}
      >
        Get early access →
      </a>

      {/* Mobile hamburger */}
      <button
        type="button"
        onClick={() => setMobileOpen((o) => !o)}
        className="flex md:hidden"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "8px",
          color: "var(--ink)",
        }}
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          {mobileOpen ? (
            <>
              <line x1="4" y1="4" x2="16" y2="16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="16" y1="4" x2="4" y2="16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </>
          ) : (
            <>
              <line x1="3" y1="6" x2="17" y2="6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="3" y1="14" x2="17" y2="14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </>
          )}
        </svg>
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
