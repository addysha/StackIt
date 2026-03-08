"use client";

import { RevealWrapper } from "@/components/ui/RevealWrapper";
import { scrollToHash } from "@/lib/utils";

const INTEGRATIONS = [
  "Shopify",
  "Stripe",
  "Square",
  "Xero",
  "ANZ",
  "ASB",
  "BNZ",
  "Etsy",
  "PayPal",
  "MYOB",
  "+200 more",
];

export function FinalCta() {
  return (
    <section
      id="cta"
      style={{
        padding: "100px 40px 120px",
        background: "var(--terra)",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      {/* BG gradient */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(30,24,16,.18) 0%, transparent 55%)",
          pointerEvents: "none",
        }}
      />
      {/* Dot grid */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(rgba(255,255,255,.12) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <RevealWrapper>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: ".12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,.6)",
              marginBottom: 16,
              fontFamily: "var(--font-sans)",
            }}
          >
            Early access
          </p>
        </RevealWrapper>

        <RevealWrapper delay={1}>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(36px, 5vw, 66px)",
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: "-.03em",
              color: "#fff",
              maxWidth: 640,
              margin: "0 auto 18px",
            }}
          >
            Your business.
            <br />
            One screen.
            <br />
            <em style={{ fontStyle: "italic", color: "rgba(255,255,255,.65)" }}>Starting today.</em>
          </h2>
        </RevealWrapper>

        <RevealWrapper delay={2}>
          <p
            style={{
              fontSize: 17,
              color: "rgba(255,255,255,.72)",
              maxWidth: 480,
              margin: "0 auto 36px",
              lineHeight: 1.75,
              fontFamily: "var(--font-sans)",
            }}
          >
            The first 10 businesses get in free. Takes under an hour to set up.
            No credit card.
          </p>
        </RevealWrapper>

        <RevealWrapper delay={3}>
          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: 24,
            }}
          >
            <a
              href="mailto:hello@stackit.co.nz"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                padding: "15px 36px",
                borderRadius: 100,
                background: "#fff",
                color: "var(--terra)",
                fontFamily: "var(--font-sans)",
                fontSize: 15,
                fontWeight: 700,
                textDecoration: "none",
                boxShadow: "0 8px 32px rgba(30,24,16,.2)",
                transition: "all .22s cubic-bezier(.34,1.56,.64,1)",
                letterSpacing: ".01em",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px) scale(1.02)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 16px 40px rgba(30,24,16,.28)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "none";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 32px rgba(30,24,16,.2)";
              }}
            >
              Get early access
            </a>
            <a
              href="#demo"
              onClick={scrollToHash}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                padding: "15px 36px",
                borderRadius: 100,
                background: "transparent",
                color: "#fff",
                fontFamily: "var(--font-sans)",
                fontSize: 15,
                fontWeight: 700,
                textDecoration: "none",
                border: "1.5px solid rgba(255,255,255,.35)",
                transition: "all .22s cubic-bezier(.34,1.56,.64,1)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,.7)";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,.35)";
                (e.currentTarget as HTMLAnchorElement).style.transform = "none";
              }}
            >
              Try the demo →
            </a>
          </div>
        </RevealWrapper>

        {/* Integration chips */}
        <RevealWrapper delay={4}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 7,
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            {INTEGRATIONS.map((name) => (
              <span
                key={name}
                style={{
                  padding: "5px 14px",
                  borderRadius: 100,
                  background: "rgba(255,255,255,.1)",
                  border: "1px solid rgba(255,255,255,.18)",
                  fontSize: 11.5,
                  fontWeight: 700,
                  color: "rgba(255,255,255,.8)",
                  fontFamily: "var(--font-sans)",
                  letterSpacing: ".02em",
                }}
              >
                {name}
              </span>
            ))}
          </div>
        </RevealWrapper>

        <p
          style={{
            fontSize: 12,
            color: "rgba(255,255,255,.4)",
            fontFamily: "var(--font-sans)",
          }}
        >
          NZ-built · Read-only OAuth · 14-day free trial
        </p>
      </div>
    </section>
  );
}
