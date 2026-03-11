"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { RevealWrapper } from "@/components/ui/RevealWrapper";

const CATEGORIES = [
  {
    id: 0,
    abbr: "SH",
    name: "Online selling",
    count: "3 apps",
    body: "Pulls revenue, orders, top products, refunds, customer counts, and average order value directly.",
    chips: ["Shopify", "Square", "Etsy"],
  },
  {
    id: 1,
    abbr: "ST",
    name: "Payments",
    count: "2 apps",
    body: "Track payments received, refunds, and processing fees in real time.",
    chips: ["Stripe", "PayPal"],
  },
  {
    id: 2,
    abbr: "AN",
    name: "Bank feeds",
    count: "3 banks",
    body: "Direct open-banking connection. Works even if you have no software at all.",
    chips: ["ANZ", "ASB", "BNZ"],
  },
  {
    id: 3,
    abbr: "XR",
    name: "Accounting",
    count: "2 apps",
    body: "Pull invoices, P&L, expenses and cash flow from your accounting software.",
    chips: ["Xero", "MYOB"],
  },
  {
    id: 4,
    abbr: "+2",
    name: "200+ via Apideck",
    count: "Ask us",
    body: "CRMs, ERPs, marketing platforms and more. Ask us about your stack.",
    chips: ["Klaviyo", "HubSpot", "Meta Ads"],
  },
];

const NODES_BY_CATEGORY: { abbr: string; name: string; status: string; on: boolean }[][] = [
  [
    { abbr: "SH", name: "Shopify", status: "Connected", on: true },
    { abbr: "AN", name: "ANZ Feed", status: "Connected", on: true },
    { abbr: "ST", name: "Stripe", status: "Connected", on: true },
    { abbr: "XR", name: "Xero", status: "Tap to connect", on: false },
    { abbr: "SQ", name: "Square", status: "Tap to connect", on: false },
    { abbr: "+2", name: "+200 more", status: "Via Apideck", on: false },
  ],
  [
    { abbr: "ST", name: "Stripe", status: "Connected", on: true },
    { abbr: "PP", name: "PayPal", status: "Tap to connect", on: false },
    { abbr: "SH", name: "Shopify", status: "Connected", on: true },
    { abbr: "XR", name: "Xero", status: "Tap to connect", on: false },
    { abbr: "AN", name: "ANZ Feed", status: "Connected", on: true },
    { abbr: "+2", name: "+200 more", status: "Via Apideck", on: false },
  ],
  [
    { abbr: "AN", name: "ANZ", status: "Connected", on: true },
    { abbr: "AS", name: "ASB", status: "Tap to connect", on: false },
    { abbr: "BN", name: "BNZ", status: "Tap to connect", on: false },
    { abbr: "ST", name: "Stripe", status: "Connected", on: true },
    { abbr: "SH", name: "Shopify", status: "Connected", on: true },
    { abbr: "+2", name: "+200 more", status: "Via Apideck", on: false },
  ],
  [
    { abbr: "XR", name: "Xero", status: "Add-on", on: false },
    { abbr: "MY", name: "MYOB", status: "Tap to connect", on: false },
    { abbr: "AN", name: "ANZ Feed", status: "Connected", on: true },
    { abbr: "SH", name: "Shopify", status: "Connected", on: true },
    { abbr: "ST", name: "Stripe", status: "Connected", on: true },
    { abbr: "+2", name: "+200 more", status: "Via Apideck", on: false },
  ],
  [
    { abbr: "KL", name: "Klaviyo", status: "Via Apideck", on: false },
    { abbr: "MA", name: "Meta Ads", status: "Via Apideck", on: false },
    { abbr: "GA", name: "Google Ads", status: "Via Apideck", on: false },
    { abbr: "HS", name: "HubSpot", status: "Via Apideck", on: false },
    { abbr: "SH", name: "Shopify", status: "Connected", on: true },
    { abbr: "+2", name: "+195 more", status: "Ask us", on: false },
  ],
];

function Monogram({ abbr, on }: { abbr: string; on: boolean }) {
  return (
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: 8,
        background: on ? "rgba(46,77,56,.15)" : "rgba(30,24,16,.06)",
        border: `1px solid ${on ? "rgba(46,77,56,.3)" : "var(--stone)"}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 11,
        fontWeight: 700,
        color: on ? "var(--forest)" : "var(--ink-3)",
        fontFamily: "var(--font-sans)",
        letterSpacing: ".02em",
        margin: "0 auto 4px",
        flexShrink: 0,
      }}
    >
      {abbr}
    </div>
  );
}

function CatMonogram({ abbr }: { abbr: string }) {
  return (
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: 8,
        background: "rgba(181,96,58,.08)",
        border: "1px solid rgba(181,96,58,.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 11,
        fontWeight: 700,
        color: "var(--terra)",
        fontFamily: "var(--font-sans)",
        letterSpacing: ".02em",
        flexShrink: 0,
      }}
    >
      {abbr}
    </div>
  );
}

export function IntegrationsSection() {
  const [activeCat, setActiveCat] = useState(0);
  const nodes = NODES_BY_CATEGORY[activeCat] ?? NODES_BY_CATEGORY[0];

  return (
    <section
      id="integrations"
      style={{
        padding: "100px 40px",
        background: "var(--cream)",
        borderTop: "1px solid var(--stone)",
      }}
    >
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
          Integrations
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
          Connects to the tools
          <br />
          you <em style={{ fontStyle: "italic", color: "var(--terra)" }}>already use.</em>
        </h2>
      </RevealWrapper>

      <RevealWrapper delay={2}>
        <p
          style={{
            fontSize: 16.5,
            color: "var(--ink-2)",
            maxWidth: 540,
            margin: "16px 0 56px",
            lineHeight: 1.8,
            fontFamily: "var(--font-sans)",
          }}
        >
          One click to connect. OAuth login - no API keys, no CSV uploads, no
          technical knowledge needed.
        </p>
      </RevealWrapper>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.2fr",
          gap: 64,
          alignItems: "start",
          maxWidth: 1100,
        }}
        className="max-md:grid-cols-1"
      >
        {/* Left accordion */}
        <RevealWrapper style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCat(cat.id)}
              style={{
                background: activeCat === cat.id ? "#fff" : "var(--surf)",
                border: `1.5px solid ${activeCat === cat.id ? "var(--terra)" : "var(--stone)"}`,
                borderRadius: 14,
                padding: "18px 20px",
                cursor: "pointer",
                textAlign: "left",
                transition: "border-color .2s, box-shadow .2s, transform .2s",
                boxShadow: activeCat === cat.id ? "0 4px 16px rgba(181,96,58,.1)" : "none",
                transform: activeCat !== cat.id ? undefined : undefined,
              }}
              onMouseEnter={(e) => {
                if (activeCat !== cat.id) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--slate)";
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateX(3px)";
                }
              }}
              onMouseLeave={(e) => {
                if (activeCat !== cat.id) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--stone)";
                  (e.currentTarget as HTMLButtonElement).style.transform = "none";
                }
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <CatMonogram abbr={cat.abbr} />
                <span
                  style={{
                    flex: 1,
                    fontFamily: "var(--font-serif)",
                    fontSize: 15,
                    fontWeight: 600,
                    color: "var(--ink)",
                  }}
                >
                  {cat.name}
                </span>
                <span
                  style={{
                    fontSize: 10.5,
                    fontWeight: 700,
                    color: "var(--ink-3)",
                    background: "var(--stone)",
                    padding: "2px 8px",
                    borderRadius: 100,
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {cat.count}
                </span>
              </div>
              {activeCat === cat.id && (
                <>
                  <p
                    style={{
                      fontSize: 13,
                      color: "var(--ink-2)",
                      lineHeight: 1.7,
                      maxHeight: 60,
                      overflow: "hidden",
                      marginTop: 10,
                      fontFamily: "var(--font-sans)",
                    }}
                  >
                    {cat.body}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5, maxHeight: 40, overflow: "hidden", marginTop: 8 }}>
                    {cat.chips.map((chip) => (
                      <span
                        key={chip}
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: "var(--forest)",
                          background: "var(--forest-lt)",
                          border: "1px solid rgba(46,77,56,.18)",
                          padding: "3px 9px",
                          borderRadius: 100,
                          fontFamily: "var(--font-sans)",
                        }}
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </button>
          ))}
        </RevealWrapper>

        {/* Right diagram */}
        <RevealWrapper
          delay={1}
          style={{
            background: "var(--surf)",
            border: "1px solid var(--stone)",
            borderRadius: 18,
            padding: 24,
            position: "sticky",
            top: 76,
            boxShadow: "var(--sh-sm)",
          }}
        >
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: ".08em",
              textTransform: "uppercase",
              color: "var(--ink-3)",
              marginBottom: 16,
              fontFamily: "var(--font-sans)",
            }}
          >
            Your connected business
          </div>

          {/* Center box */}
          <div
            style={{
              background: "var(--terra-lt)",
              border: "1.5px solid var(--terra)",
              borderRadius: 12,
              padding: "14px 16px",
              textAlign: "center",
              margin: "0 auto 18px",
              width: "fit-content",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 16,
                fontWeight: 600,
                color: "var(--ink)",
              }}
            >
              Stack<span style={{ color: "var(--terra)" }}>it</span>
            </div>
            <div
              style={{
                fontSize: 10.5,
                color: "var(--ink-3)",
                marginTop: 2,
                fontFamily: "var(--font-sans)",
              }}
            >
              Your live dashboard
            </div>
          </div>

          {/* Nodes grid */}
          <motion.div
            key={activeCat}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 7 }}
          >
            {nodes.map((node) => (
              <div
                key={node.name}
                style={{
                  background: node.on ? "var(--forest-lt)" : "var(--w)",
                  border: `1px solid ${node.on ? "rgba(46,77,56,.3)" : "var(--stone)"}`,
                  borderRadius: 10,
                  padding: "9px 7px",
                  textAlign: "center",
                  transition: "border-color .2s, box-shadow .2s, transform .15s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "var(--terra)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 3px 10px rgba(181,96,58,.1)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = node.on ? "rgba(46,77,56,.3)" : "var(--stone)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                  (e.currentTarget as HTMLDivElement).style.transform = "none";
                }}
              >
                <Monogram abbr={node.abbr} on={node.on} />
                <div
                  style={{
                    fontSize: 10.5,
                    fontWeight: 700,
                    color: "var(--ink-2)",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {node.name}
                </div>
                <div
                  style={{
                    fontSize: 9,
                    color: node.on ? "var(--forest)" : "var(--ink-3)",
                    marginTop: 1,
                    fontWeight: node.on ? 700 : 400,
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {node.status}
                </div>
              </div>
            ))}
          </motion.div>

          <p
            style={{
              textAlign: "center",
              marginTop: 12,
              fontSize: 11.5,
              color: "var(--ink-3)",
              fontStyle: "italic",
              fontFamily: "var(--font-sans)",
            }}
          >
            Every node feeds your dashboard automatically
          </p>
        </RevealWrapper>
      </div>
    </section>
  );
}
