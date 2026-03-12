"use client";

import { useState } from "react";
import { RevealWrapper } from "@/components/ui/RevealWrapper";

const FAQ_ITEMS = [
  {
    q: "Do I need technical knowledge to use Stackit?",
    a: "No. Stackit is built for business owners, not developers. If you can log in to Shopify, you can set up Stackit. It works entirely through OAuth login flows - no API keys, no code.",
  },
  {
    q: "How does data actually get into my dashboard?",
    a: "You click 'Connect' next to your tool, log in with that tool's account, and grant read-only permission. Stackit then pulls your data automatically on a schedule. No CSV uploads. No manual entry.",
  },
  {
    q: "What if I don't use one of the listed integrations?",
    a: "We support 200+ tools via Apideck. If your software isn't listed, use the custom metric widget to enter any number manually. We're adding integrations regularly - email us and we'll prioritise yours.",
  },
  {
    q: "Is my data safe?",
    a: "All connections are read-only OAuth. We can see your data - we can never change anything or move money. Data is encrypted at rest and in transit. We store it in New Zealand.",
  },
  {
    q: "Can I try it before paying?",
    a: "Yes. All plans include a 14-day free trial. No credit card required. You get full access to set up your dashboard and connect your tools.",
  },
  {
    q: "How is this different from a spreadsheet or a BI tool?",
    a: "Spreadsheets require manual updates - your data is already stale the moment you save it. BI tools like Looker or Tableau cost thousands of dollars and take weeks to set up. Stackit is live, automatic, and ready in under an hour.",
  },
  {
    q: "What does 'live' actually mean?",
    a: "Data syncs on a rolling schedule - typically every few minutes for sales platforms, hourly for bank feeds. You see a 'Synced X ago' label on each widget so you always know how current the data is.",
  },
];

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="py-12 px-5 md:py-24 md:px-10"
      style={{
        background: "var(--w)",
        borderTop: "1px solid var(--stone)",
      }}
    >
      <div
        style={{
          maxWidth: 760,
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <RevealWrapper style={{ marginBottom: 48 }}>
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
            FAQ
          </p>
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
            Good questions.
            <br />
            <em style={{ fontStyle: "italic", color: "var(--terra)" }}>Honest answers.</em>
          </h2>
        </RevealWrapper>

        {/* Accordion */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {FAQ_ITEMS.map((item, idx) => (
            <RevealWrapper key={item.q} delay={idx % 2 === 0 ? 1 : 2}>
              <div
                style={{
                  borderTop: "1px solid var(--stone)",
                  borderBottom: idx === FAQ_ITEMS.length - 1 ? "1px solid var(--stone)" : "none",
                  overflow: "hidden",
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "20px 0",
                    gap: 12,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "color .15s",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: 16,
                      fontWeight: 600,
                      color: openIdx === idx ? "var(--terra)" : "var(--ink)",
                      lineHeight: 1.4,
                      flex: 1,
                      transition: "color .2s",
                    }}
                  >
                    {item.q}
                  </span>
                  <div
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: "50%",
                      background:
                        openIdx === idx ? "var(--terra-lt)" : "var(--cream)",
                      border: `1px solid ${openIdx === idx ? "rgba(181,96,58,.25)" : "var(--stone)"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      transition: "all .2s",
                      transform: openIdx === idx ? "rotate(45deg)" : "none",
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                      <path d="M6 2V10M2 6H10" stroke={openIdx === idx ? "var(--terra)" : "var(--ink-3)"} strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </div>
                </button>
                {openIdx === idx && (
                  <p
                    style={{
                      fontSize: 14,
                      color: "var(--ink-2)",
                      lineHeight: 1.8,
                      paddingBottom: 18,
                      fontFamily: "var(--font-sans)",
                    }}
                  >
                    {item.a}
                  </p>
                )}
              </div>
            </RevealWrapper>
          ))}
        </div>

        {/* Contact footer */}
        <RevealWrapper
          style={{
            marginTop: 40,
            textAlign: "center",
            fontSize: 14,
            color: "var(--ink-3)",
            fontFamily: "var(--font-sans)",
          }}
        >
          Still have questions?{" "}
          <a
            href="mailto:hello@stackit.co.nz"
            style={{ color: "var(--terra)", fontWeight: 700, textDecoration: "none" }}
          >
            hello@stackit.co.nz
          </a>
        </RevealWrapper>
      </div>
    </section>
  );
}
