"use client";

import { RevealWrapper } from "@/components/ui/RevealWrapper";
import { IntegrationStrip } from "@/components/landing/IntegrationStrip";
import { scrollToHash } from "@/lib/utils";

export function FinalCta() {
  return (
    <section
      id="cta"
      className="py-12 px-5 pb-12 md:py-24 md:px-10 md:pb-16"
      style={{
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

      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", minHeight: "min(60vh, 480px)" }}>
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
            The first 10 businesses get in free.
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
              className="min-h-[44px] inline-flex items-center justify-center"
              style={{
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
              className="min-h-[44px] inline-flex items-center justify-center"
              style={{
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

        <RevealWrapper delay={4}>
          <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <IntegrationStrip theme="dark" />
            <p
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,.4)",
                fontFamily: "var(--font-sans)",
                margin: 0,
              }}
            >
              NZ-built · Read-only OAuth · 14-day free trial
            </p>
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}
