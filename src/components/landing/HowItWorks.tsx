"use client";

import { RevealWrapper } from "@/components/ui/RevealWrapper";

const STEPS = [
  {
    num: 1,
    title: "Sign up - no card",
    body: "Email, password, done. Takes under a minute.",
    badge: "1 min",
  },
  {
    num: 2,
    title: "Connect your tools",
    body: "One click to link Shopify, your bank, Stripe. OAuth login - no API keys needed.",
    badge: "5 min",
  },
  {
    num: 3,
    title: "Open it every morning",
    body: "Your numbers are always current. No exports, no refreshes.",
    badge: "Every day",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how"
      className="py-12 px-5 md:py-24 md:px-10"
      style={{
        background: "var(--w)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background blob */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 50% at 90% 60%, rgba(181,96,58,.05) 0%, transparent 55%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <RevealWrapper>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              color: "var(--terra)",
              marginBottom: 14,
              fontFamily: "var(--font-sans)",
            }}
          >
            How it works
          </p>
        </RevealWrapper>

        <RevealWrapper delay={1}>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(30px, 4vw, 50px)",
              fontWeight: 600,
              lineHeight: 1.18,
              letterSpacing: "-.02em",
              color: "var(--ink)",
            }}
          >
            Live in <em style={{ fontStyle: "italic", color: "var(--terra)" }}>30 minutes.</em>
          </h2>
        </RevealWrapper>

        <RevealWrapper delay={2}>
          <p
            style={{
              fontSize: 16.5,
              color: "var(--ink-2)",
              maxWidth: 540,
              margin: "16px auto 0",
              lineHeight: 1.8,
              fontFamily: "var(--font-sans)",
            }}
          >
            You connect your tools. We handle the rest.
          </p>
        </RevealWrapper>
      </div>

      {/* Steps grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 0,
          position: "relative",
          marginTop: 56,
          maxWidth: 900,
          margin: "56px auto 0",
        }}
        className="max-md:grid-cols-1 max-md:gap-8"
      >
        {/* Connector line - desktop only */}
        <div
          aria-hidden
          className="hidden md:block"
          style={{
            position: "absolute",
            top: 28,
            left: "12%",
            right: "12%",
            height: 1,
            background:
              "linear-gradient(to right, transparent, var(--stone) 10%, var(--stone) 90%, transparent)",
            zIndex: 0,
          }}
        />

        {STEPS.map((step, idx) => (
          <RevealWrapper
            key={step.title}
            delay={((idx + 1) as 1 | 2 | 3)}
            style={{
              textAlign: "center",
              padding: "0 20px",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Icon box */}
            <div
              style={{
                width: 56,
                height: 56,
                background: "var(--surf)",
                border: "1.5px solid var(--stone)",
                borderRadius: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 18px",
                boxShadow: "var(--sh-sm)",
                position: "relative",
              }}
            >
              {/* Step number badge */}
              <div
                style={{
                  position: "absolute",
                  top: -7,
                  right: -7,
                  width: 18,
                  height: 18,
                  background: "var(--terra)",
                  color: "#fff",
                  fontSize: 9.5,
                  fontWeight: 700,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-sans)",
                }}
              >
                {step.num}
              </div>
              {/* Large number inside box */}
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 22,
                  fontWeight: 600,
                  color: "var(--ink-3)",
                  lineHeight: 1,
                }}
              >
                {step.num}
              </span>
            </div>

            <h3
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 16,
                fontWeight: 600,
                marginBottom: 7,
                color: "var(--ink)",
              }}
            >
              {step.title}
            </h3>
            <p
              style={{
                fontSize: 13,
                color: "var(--ink-2)",
                lineHeight: 1.7,
                fontFamily: "var(--font-sans)",
              }}
            >
              {step.body}
            </p>
            <span
              style={{
                display: "inline-block",
                fontSize: 10,
                fontWeight: 700,
                color: "var(--terra)",
                background: "var(--terra-lt)",
                border: "1px solid rgba(181,96,58,.2)",
                padding: "2px 9px",
                borderRadius: 100,
                marginTop: 9,
                letterSpacing: ".05em",
                textTransform: "uppercase",
                fontFamily: "var(--font-sans)",
              }}
            >
              {step.badge}
            </span>
          </RevealWrapper>
        ))}
      </div>
    </section>
  );
}
