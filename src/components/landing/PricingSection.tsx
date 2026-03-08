"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { scrollToHash } from "@/lib/utils";
import { RevealWrapper } from "@/components/ui/RevealWrapper";

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    yearlyPrice: 29,
    monthlyPrice: 39,
    description: "For businesses just getting started. Connect a few tools, get instant clarity.",
    features: [
      "Up to 3 integrations",
      "30 days history",
      "Revenue, orders, cash widgets",
      "1 dashboard",
      "Email support",
    ],
    cta: "Get early access",
    highlight: false,
  },
  {
    id: "grow",
    name: "Grow",
    yearlyPrice: 69,
    monthlyPrice: 89,
    description: "For businesses that need everything syncing. Unlimited integrations, full history.",
    features: [
      "Unlimited integrations",
      "Full history",
      "All 10 widget types",
      "3 dashboards (e.g. per location)",
      "Custom metric widgets",
      "Priority email support",
    ],
    cta: "Get early access",
    highlight: true,
  },
  {
    id: "pro",
    name: "Pro",
    yearlyPrice: 149,
    monthlyPrice: 189,
    description: "For businesses scaling fast. Multi-location, team access, and white-glove setup.",
    features: [
      "Everything in Grow",
      "Unlimited dashboards",
      "Team members (up to 5)",
      "Accountant read-only access",
      "CSV & webhook export",
      "Phone + priority support",
    ],
    cta: "Get early access",
    highlight: false,
  },
] as const;

const ROI_ITEMS = [
  { label: "Time spent on reports", save: "2h / week" },
  { label: "Avoidable cash crises", save: "1–2× / year" },
  { label: "Cost of hiring an analyst", save: "$20k+/year" },
];

export function PricingSection() {
  const [yearly, setYearly] = useState(true);

  return (
    <section
      id="pricing"
      style={{
        padding: "100px 40px",
        background: "var(--ink)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* BG gradient */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 55% 50% at 85% 30%, rgba(181,96,58,.07) 0%, transparent 55%), radial-gradient(ellipse 40% 40% at 15% 75%, rgba(46,77,56,.08) 0%, transparent 55%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: "center" }}>
          <RevealWrapper>
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: ".1em",
                textTransform: "uppercase",
                color: "rgba(253,250,245,.4)",
                marginBottom: 14,
                fontFamily: "var(--font-sans)",
              }}
            >
              Pricing
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
                color: "#fff",
                maxWidth: 600,
                margin: "0 auto",
              }}
            >
              Simple pricing.
              <br />
              <em style={{ fontStyle: "italic", color: "var(--terra)" }}>Sensible value.</em>
            </h2>
          </RevealWrapper>

          <RevealWrapper delay={2}>
            <p
              style={{
                fontSize: 16.5,
                color: "rgba(253,250,245,.55)",
                maxWidth: 480,
                margin: "16px auto 36px",
                lineHeight: 1.8,
                fontFamily: "var(--font-sans)",
              }}
            >
              You save hours. You avoid expensive surprises. Stackit pays for
              itself many times over.
            </p>
          </RevealWrapper>

          {/* Toggle */}
          <RevealWrapper delay={3}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "4px",
                borderRadius: 100,
                background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.1)",
                marginBottom: 48,
              }}
            >
              <button
                type="button"
                onClick={() => setYearly(true)}
                style={{
                  padding: "8px 20px",
                  borderRadius: 100,
                  background: yearly ? "var(--terra)" : "transparent",
                  color: yearly ? "#fff" : "rgba(255,255,255,.5)",
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                  border: "none",
                  fontFamily: "var(--font-sans)",
                  transition: "all .2s",
                }}
              >
                Yearly
                <span
                  style={{
                    marginLeft: 6,
                    fontSize: 10,
                    background: yearly ? "rgba(255,255,255,.2)" : "rgba(181,96,58,.3)",
                    color: yearly ? "#fff" : "var(--terra)",
                    padding: "1px 6px",
                    borderRadius: 100,
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  save 25%
                </span>
              </button>
              <button
                type="button"
                onClick={() => setYearly(false)}
                style={{
                  padding: "8px 20px",
                  borderRadius: 100,
                  background: !yearly ? "var(--terra)" : "transparent",
                  color: !yearly ? "#fff" : "rgba(255,255,255,.5)",
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                  border: "none",
                  fontFamily: "var(--font-sans)",
                  transition: "all .2s",
                }}
              >
                Monthly
              </button>
            </div>
          </RevealWrapper>
        </div>

        {/* Plan cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
            maxWidth: 1050,
            margin: "0 auto",
          }}
          className="max-md:grid-cols-1"
        >
          {PLANS.map((plan, idx) => (
            <RevealWrapper
              key={plan.id}
              delay={((idx + 1) as 1 | 2 | 3)}
              style={{
                background: plan.highlight ? "var(--terra)" : "rgba(255,255,255,.05)",
                border: `1.5px solid ${plan.highlight ? "var(--terra)" : "rgba(255,255,255,.1)"}`,
                borderRadius: 18,
                padding: 28,
                position: "relative",
                overflow: "hidden",
                transition: "transform .2s, box-shadow .2s",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLElement).style.boxShadow = plan.highlight
                  ? "0 14px 40px rgba(181,96,58,.35)"
                  : "0 12px 30px rgba(0,0,0,.25)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "none";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              {plan.highlight && (
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "radial-gradient(ellipse 90% 70% at 50% 0%, rgba(255,255,255,.08), transparent)",
                    pointerEvents: "none",
                  }}
                />
              )}
              <span
                style={{
                  display: "inline-block",
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: ".07em",
                  padding: "3px 10px",
                  borderRadius: 100,
                  marginBottom: 12,
                  background: plan.highlight ? "rgba(255,255,255,.18)" : "rgba(255,255,255,.07)",
                  color: plan.highlight ? "#fff" : "rgba(255,255,255,.5)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                {plan.name}
              </span>
              {plan.highlight && (
                <span
                  style={{
                    marginLeft: 6,
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "3px 8px",
                    borderRadius: 100,
                    background: "rgba(255,255,255,.2)",
                    color: "#fff",
                    textTransform: "uppercase",
                    letterSpacing: ".07em",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  Most popular
                </span>
              )}
              <div
                style={{
                  marginTop: 8,
                  display: "flex",
                  alignItems: "flex-end",
                  gap: 4,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: 40,
                    fontWeight: 600,
                    color: plan.highlight ? "#fff" : "rgba(255,255,255,.9)",
                    lineHeight: 1,
                    letterSpacing: "-1.5px",
                  }}
                >
                  ${yearly ? plan.yearlyPrice : plan.monthlyPrice}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    color: plan.highlight ? "rgba(255,255,255,.7)" : "rgba(255,255,255,.4)",
                    paddingBottom: 4,
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  /mo
                </span>
              </div>
              {yearly && (
                <div
                  style={{
                    fontSize: 11,
                    color: plan.highlight ? "rgba(255,255,255,.7)" : "rgba(255,255,255,.35)",
                    marginTop: 3,
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  billed annually
                </div>
              )}
              <p
                style={{
                  fontSize: 13,
                  color: plan.highlight ? "rgba(255,255,255,.75)" : "rgba(255,255,255,.45)",
                  lineHeight: 1.65,
                  margin: "12px 0 16px",
                  fontFamily: "var(--font-sans)",
                }}
              >
                {plan.description}
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 7,
                  marginBottom: 20,
                }}
              >
                {plan.features.map((f) => (
                  <div
                    key={f}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 8,
                    }}
                  >
                    <div
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        background: plan.highlight ? "rgba(255,255,255,.2)" : "rgba(255,255,255,.07)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginTop: 1,
                      }}
                    >
                      <Check
                        style={{
                          width: 9,
                          height: 9,
                          color: plan.highlight ? "#fff" : "rgba(255,255,255,.5)",
                        }}
                      />
                    </div>
                    <span
                      style={{
                        fontSize: 12.5,
                        color: plan.highlight ? "rgba(255,255,255,.85)" : "rgba(255,255,255,.5)",
                        lineHeight: 1.5,
                        fontFamily: "var(--font-sans)",
                      }}
                    >
                      {f}
                    </span>
                  </div>
                ))}
              </div>
              <a
                href="#cta"
                onClick={scrollToHash}
                style={{
                  display: "block",
                  textAlign: "center",
                  padding: "12px",
                  borderRadius: 100,
                  background: plan.highlight ? "#fff" : "rgba(255,255,255,.1)",
                  color: plan.highlight ? "var(--terra)" : "rgba(255,255,255,.8)",
                  fontFamily: "var(--font-sans)",
                  fontSize: 13,
                  fontWeight: 700,
                  textDecoration: "none",
                  border: `1.5px solid ${plan.highlight ? "transparent" : "rgba(255,255,255,.15)"}`,
                  transition: "all .2s cubic-bezier(.34,1.56,.64,1)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.02)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.transform = "none";
                }}
              >
                {plan.cta}
              </a>
            </RevealWrapper>
          ))}
        </div>

        {/* ROI calculator band */}
        <RevealWrapper
          style={{
            marginTop: 48,
            maxWidth: 1050,
            margin: "48px auto 0",
            background: "rgba(255,255,255,.04)",
            border: "1px solid rgba(255,255,255,.08)",
            borderRadius: 18,
            padding: "24px 32px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 24,
          }}
          className="max-md:grid-cols-1"
        >
          {ROI_ITEMS.map((item) => (
            <div key={item.label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 22,
                  fontWeight: 600,
                  color: "var(--terra)",
                  marginBottom: 4,
                }}
              >
                {item.save}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,.4)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                {item.label}
              </div>
            </div>
          ))}
        </RevealWrapper>

        <p
          style={{
            textAlign: "center",
            marginTop: 20,
            fontSize: 12,
            color: "rgba(255,255,255,.25)",
            fontFamily: "var(--font-sans)",
          }}
        >
          All plans include a 14-day free trial. No credit card required.
        </p>
      </div>
    </section>
  );
}
