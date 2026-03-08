"use client";

import { RevealWrapper } from "@/components/ui/RevealWrapper";

const PROBLEM_CARDS = [
  {
    title: "Too expensive",
    body: "Proper business intelligence tools cost $500–$2,000/month and need someone to set them up. They're built for analysts, not café owners.",
    accent: "linear-gradient(90deg, var(--dn), var(--terra))",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
        <path d="M4 22L10 14L16 17L22 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18 6H22V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Too complex",
    body: "Most dashboards take weeks to configure, require API tokens, and break the moment something changes. You didn't sign up for that.",
    accent: "linear-gradient(90deg, var(--warn), #e6a020)",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
        <circle cx="6" cy="14" r="2.5" stroke="currentColor" strokeWidth="1.8"/>
        <circle cx="22" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.8"/>
        <circle cx="22" cy="21" r="2.5" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M8.5 13L19.5 7.5M8.5 15L19.5 20.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "Too fragmented",
    body: "You have 4 apps open at once. None of them talk to each other. You're manually piecing together a picture of your business every time.",
    accent: "linear-gradient(90deg, #c0c0c0, var(--slate))",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
        <rect x="4" y="4" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.8"/>
        <rect x="16" y="4" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.8"/>
        <rect x="4" y="16" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.8"/>
        <rect x="16" y="16" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.8" opacity=".4"/>
      </svg>
    ),
  },
];

export function ProblemSection() {
  return (
    <section
      id="problem"
      style={{
        padding: "100px 40px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        background: "#fff",
      }}
    >
      {/* Background parallax blob */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 50% 60% at 80% 50%, rgba(46,77,56,.04) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

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
          The problem
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
          Small businesses run on
          <br />
          <em style={{ fontStyle: "italic", color: "var(--terra)" }}>scattered information.</em>
        </h2>
      </RevealWrapper>

      <RevealWrapper delay={2}>
        <p
          style={{
            fontSize: 16.5,
            color: "var(--ink-2)",
            maxWidth: 540,
            margin: "16px auto 56px",
            lineHeight: 1.8,
            fontFamily: "var(--font-sans)",
          }}
        >
          Your revenue is in Shopify. Your cash is in your bank app. Your invoices
          are in Xero. Your sales are in Square. You're running the business in
          your head.
        </p>
      </RevealWrapper>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
          maxWidth: 900,
          margin: "0 auto",
        }}
        className="max-md:grid-cols-1"
      >
        {PROBLEM_CARDS.map((card, idx) => (
          <RevealWrapper key={card.title} delay={((idx + 1) as 1 | 2 | 3)}>
            <div
              style={{
                background: "var(--surf)",
                border: "1px solid var(--stone)",
                borderRadius: 18,
                padding: "28px 24px",
                textAlign: "left",
                transition: "transform .3s var(--ease), box-shadow .3s",
                position: "relative",
                overflow: "hidden",
                cursor: "default",
                height: "100%",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--sh-md)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "none";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
            >
              {/* Top accent bar */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: card.accent,
                }}
              />
              <div style={{ fontSize: 28, marginBottom: 14, color: "var(--ink-2)", display: "block" }}>
                {card.icon}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 18,
                  fontWeight: 600,
                  marginBottom: 8,
                  color: "var(--ink)",
                }}
              >
                {card.title}
              </div>
              <p
                style={{
                  fontSize: 13.5,
                  color: "var(--ink-2)",
                  lineHeight: 1.75,
                  fontFamily: "var(--font-sans)",
                }}
              >
                {card.body}
              </p>
            </div>
          </RevealWrapper>
        ))}
      </div>
    </section>
  );
}
