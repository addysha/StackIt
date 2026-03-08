"use client";

import { Twitter, Instagram, Linkedin, Music } from "lucide-react";
import { scrollToHash } from "@/lib/utils";

const FOOTER_LINKS = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Try the demo", href: "#demo" },
    { label: "Pricing", href: "#pricing" },
    { label: "Integrations", href: "#integrations" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
  ],
  Support: [
    { label: "FAQ", href: "#faq" },
    { label: "Contact us", href: "mailto:hello@stackit.co.nz" },
    { label: "Privacy policy", href: "#" },
    { label: "Terms of service", href: "#" },
  ],
} as const;

const SOCIALS = [
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Music, href: "https://tiktok.com", label: "TikTok" },
];

export function Footer() {
  return (
    <footer
      style={{
        background: "var(--ink)",
        borderTop: "1px solid rgba(255,255,255,.07)",
      }}
    >
      {/* Mini CTA band */}
      <div
        style={{
          borderBottom: "1px solid rgba(255,255,255,.07)",
          padding: "36px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 20,
              fontWeight: 600,
              color: "#fff",
              marginBottom: 4,
            }}
          >
            Ready to get started?
          </div>
          <div
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,.4)",
              fontFamily: "var(--font-sans)",
            }}
          >
            First 10 businesses get in free. No credit card required.
          </div>
        </div>
        <a
          href="mailto:hello@stackit.co.nz"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            padding: "12px 28px",
            borderRadius: 100,
            background: "var(--terra)",
            color: "#fff",
            fontFamily: "var(--font-sans)",
            fontSize: 14,
            fontWeight: 700,
            textDecoration: "none",
            transition: "all .2s cubic-bezier(.34,1.56,.64,1)",
            boxShadow: "0 4px 16px rgba(181,96,58,.3)",
            letterSpacing: ".01em",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "var(--terra-dk)";
            (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "var(--terra)";
            (e.currentTarget as HTMLAnchorElement).style.transform = "none";
          }}
        >
          Get early access
        </a>
      </div>

      {/* Main footer grid */}
      <div
        style={{
          padding: "56px 40px 48px",
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: 48,
        }}
        className="max-md:grid-cols-2 max-sm:grid-cols-1"
      >
        {/* Brand column */}
        <div>
          <div
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 20,
              fontWeight: 600,
              color: "#fff",
              marginBottom: 10,
            }}
          >
            Stack<span style={{ color: "var(--terra)" }}>it</span>
          </div>
          <p
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,.4)",
              lineHeight: 1.75,
              maxWidth: 260,
              fontFamily: "var(--font-sans)",
              marginBottom: 20,
            }}
          >
            The live business dashboard for New Zealand&apos;s small business
            owners. Open it every morning. Know your numbers.
          </p>
          {/* Socials */}
          <div style={{ display: "flex", gap: 8 }}>
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,.07)",
                  border: "1px solid rgba(255,255,255,.1)",
                  color: "rgba(255,255,255,.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                  transition: "all .2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,.12)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,.2)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,.07)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,.5)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,.1)";
                }}
              >
                <Icon style={{ width: 14, height: 14 }} />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(FOOTER_LINKS).map(([title, links]) => (
          <div key={title}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: ".1em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,.3)",
                marginBottom: 14,
                fontFamily: "var(--font-sans)",
              }}
            >
              {title}
            </div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {links.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    onClick={href.startsWith("#") ? scrollToHash : undefined}
                    style={{
                      fontSize: 13,
                      color: "rgba(255,255,255,.45)",
                      textDecoration: "none",
                      fontFamily: "var(--font-sans)",
                      transition: "color .2s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,.85)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,.45)";
                    }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,.07)",
          padding: "18px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        <span
          style={{
            fontSize: 12,
            color: "rgba(255,255,255,.25)",
            fontFamily: "var(--font-sans)",
          }}
        >
          © {new Date().getFullYear()} Stackit Ltd. Made in New Zealand.
        </span>
        <span
          style={{
            fontSize: 12,
            color: "rgba(255,255,255,.25)",
            fontFamily: "var(--font-sans)",
          }}
        >
          Read-only OAuth · Encrypted · NZ data residency
        </span>
      </div>
    </footer>
  );
}
