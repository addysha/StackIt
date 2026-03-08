"use client";

import { useEffect, useRef } from "react";
import { scrollToHash } from "@/lib/utils";

export function Hero() {
  const dotGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (dotGridRef.current) {
        dotGridRef.current.style.transform = `translateY(${window.scrollY * 0.25}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "100px 40px 80px",
        position: "relative",
        overflow: "hidden",
        background: "var(--w)",
      }}
    >
      {/* Background gradient */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(181,96,58,.07) 0%, transparent 65%), radial-gradient(ellipse 40% 35% at 20% 80%, rgba(46,77,56,.05) 0%, transparent 55%), radial-gradient(ellipse 35% 30% at 80% 75%, rgba(181,96,58,.04) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />

      {/* Parallax dot grid */}
      <div
        ref={dotGridRef}
        aria-hidden
        className="hero-dot-grid"
        style={{ position: "absolute", inset: 0, pointerEvents: "none", willChange: "transform" }}
      />

      {/* Eyebrow badge */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          background: "var(--forest-lt)",
          border: "1px solid rgba(46,77,56,.2)",
          color: "var(--forest)",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: ".08em",
          textTransform: "uppercase",
          padding: "5px 14px",
          borderRadius: 100,
          marginBottom: 28,
          animation: "fadeUp .6s both",
          position: "relative",
          zIndex: 1,
          fontFamily: "var(--font-sans)",
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            background: "var(--forest)",
            borderRadius: "50%",
            animation: "blink 2.4s infinite",
            display: "inline-block",
          }}
        />
        Now in early access · NZ-built
      </div>

      {/* H1 */}
      <h1
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(40px, 5.5vw, 72px)",
          fontWeight: 600,
          lineHeight: 1.1,
          letterSpacing: "-.025em",
          maxWidth: 820,
          marginBottom: 22,
          animation: "fadeUp .65s .08s both",
          color: "var(--ink)",
          position: "relative",
          zIndex: 1,
        }}
      >
        Your whole business,
        <br />
        <em style={{ fontStyle: "italic", color: "var(--terra)" }}>one screen.</em>
      </h1>

      {/* Subtext */}
      <p
        style={{
          fontSize: "clamp(16px, 1.5vw, 19px)",
          color: "var(--ink-2)",
          maxWidth: 520,
          lineHeight: 1.75,
          marginBottom: 40,
          animation: "fadeUp .65s .16s both",
          fontWeight: 400,
          fontFamily: "var(--font-sans)",
          position: "relative",
          zIndex: 1,
        }}
      >
        Stackit pulls your revenue, cash, customers, and stock into one live
        dashboard. Drag the widgets you want. We set it up while you watch.
      </p>

      {/* Buttons */}
      <div
        style={{
          display: "flex",
          gap: 12,
          justifyContent: "center",
          flexWrap: "wrap",
          animation: "fadeUp .65s .24s both",
          position: "relative",
          zIndex: 1,
        }}
      >
        <a
          href="#cta"
          onClick={scrollToHash}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            padding: "14px 30px",
            borderRadius: 100,
            fontFamily: "var(--font-sans)",
            fontSize: 14.5,
            fontWeight: 700,
            textDecoration: "none",
            background: "var(--terra)",
            color: "#fff",
            boxShadow: "0 6px 24px rgba(181,96,58,.3)",
            transition: "all .22s cubic-bezier(.34,1.56,.64,1)",
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
        <a
          href="#demo"
          onClick={scrollToHash}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            padding: "14px 30px",
            borderRadius: 100,
            fontFamily: "var(--font-sans)",
            fontSize: 14.5,
            fontWeight: 700,
            textDecoration: "none",
            background: "transparent",
            color: "var(--ink-2)",
            border: "1.5px solid var(--stone)",
            transition: "all .22s cubic-bezier(.34,1.56,.64,1)",
            letterSpacing: ".01em",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--slate)";
            (e.currentTarget as HTMLAnchorElement).style.color = "var(--ink)";
            (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--stone)";
            (e.currentTarget as HTMLAnchorElement).style.color = "var(--ink-2)";
            (e.currentTarget as HTMLAnchorElement).style.transform = "none";
          }}
        >
          See the dashboard →
        </a>
      </div>

      {/* Hero note */}
      <p
        style={{
          marginTop: 18,
          fontSize: 12.5,
          color: "var(--ink-3)",
          animation: "fadeUp .65s .32s both",
          fontFamily: "var(--font-sans)",
          position: "relative",
          zIndex: 1,
        }}
      >
        First 10 businesses get in free &nbsp;·&nbsp; No credit card
      </p>

      {/* Browser chrome mockup */}
      <div
        style={{
          marginTop: 64,
          animation: "fadeUp .8s .4s both",
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 900,
        }}
      >
        {/* Chrome bar */}
        <div
          style={{
            background: "var(--cream)",
            border: "1px solid var(--stone)",
            borderRadius: "14px 14px 0 0",
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            boxShadow: "var(--sh-md)",
          }}
        >
          <div style={{ display: "flex", gap: 5 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF6058" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FFBD2E" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#29C940" }} />
          </div>
          <div
            style={{
              flex: 1,
              background: "rgba(255,255,255,.7)",
              border: "1px solid var(--stone)",
              borderRadius: 6,
              padding: "5px 12px",
              fontSize: 11.5,
              color: "var(--ink-3)",
              fontWeight: 500,
              margin: "0 16px",
              fontFamily: "var(--font-sans)",
            }}
          >
            app.stackit.co.nz/dashboard
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              fontSize: 10.5,
              color: "var(--up)",
              fontWeight: 700,
              fontFamily: "var(--font-sans)",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                background: "#3fa85f",
                borderRadius: "50%",
                display: "inline-block",
                animation: "blink 2.4s infinite",
              }}
            />
            LIVE
          </div>
        </div>

        {/* Browser body */}
        <div
          style={{
            background: "var(--w)",
            border: "1px solid var(--stone)",
            borderTop: "none",
            borderRadius: "0 0 14px 14px",
            overflow: "hidden",
            boxShadow: "var(--sh-lg)",
          }}
        >
          {/* Topbar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 16px",
              height: 44,
              background: "rgba(253,250,245,.95)",
              borderBottom: "1px solid var(--stone)",
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
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  background: "var(--surf)",
                  border: "1px solid var(--stone)",
                  color: "var(--ink-2)",
                  padding: "4px 12px",
                  borderRadius: 100,
                  fontSize: 11.5,
                  fontWeight: 600,
                  fontFamily: "var(--font-sans)",
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <path d="M1 11L4.5 7.5M10.5 2.5L7 6M4.5 7.5L7 6M4.5 7.5L3 9M7 6L8.5 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Edit
              </div>
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--terra), var(--terra-dk))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 9,
                  fontWeight: 700,
                  color: "#fff",
                  fontFamily: "var(--font-sans)",
                }}
              >
                AD
              </div>
            </div>
          </div>

          {/* Dashboard grid */}
          <div
            style={{
              padding: "16px",
              background: "var(--w)",
              backgroundImage: "radial-gradient(var(--stone) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
              display: "grid",
              gridTemplateColumns: "repeat(6, 1fr)",
              gap: 8,
            }}
          >
            {/* Revenue card */}
            <div
              style={{
                gridColumn: "span 3",
                background: "#fff",
                border: "1px solid var(--stone)",
                borderRadius: 11,
                padding: 14,
              }}
            >
              <div
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: ".08em",
                  color: "var(--ink-3)",
                  marginBottom: 6,
                  fontFamily: "var(--font-sans)",
                }}
              >
                Revenue · Month
              </div>
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 26,
                  fontWeight: 600,
                  color: "var(--ink)",
                  lineHeight: 1,
                  marginBottom: 5,
                }}
              >
                $14,250
              </div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 3,
                  fontSize: 10,
                  fontWeight: 700,
                  padding: "2px 8px",
                  borderRadius: 100,
                  background: "var(--up-bg)",
                  color: "var(--up)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                ↑ 12% vs last month
              </div>
              <div style={{ marginTop: 9, height: 28, opacity: 0.7 }}>
                <svg viewBox="0 0 220 28" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
                  <defs>
                    <linearGradient id="hg1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--forest)" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="var(--forest)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <path d="M0,26 L28,21 L55,23 L83,14 L110,17 L138,9 L165,12 L193,5 L220,2" fill="none" stroke="var(--forest)" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M0,26 L28,21 L55,23 L83,14 L110,17 L138,9 L165,12 L193,5 L220,2 L220,28 L0,28Z" fill="url(#hg1)" />
                </svg>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 8,
                  paddingTop: 7,
                  borderTop: "1px solid var(--stone)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                <span style={{ fontSize: 9, color: "var(--ink-3)" }}>Synced 3m ago</span>
                <span
                  style={{
                    fontSize: 9,
                    color: "var(--ink-3)",
                    background: "var(--cream)",
                    padding: "1px 6px",
                    borderRadius: 4,
                    border: "1px solid var(--stone)",
                    fontWeight: 600,
                  }}
                >
                  shopify
                </span>
              </div>
            </div>

            {/* Cash Runway card */}
            <div
              style={{
                gridColumn: "span 2",
                background: "#fff",
                border: "1px solid var(--stone)",
                borderRadius: 11,
                padding: 14,
              }}
            >
              <div
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: ".08em",
                  color: "var(--ink-3)",
                  marginBottom: 6,
                  fontFamily: "var(--font-sans)",
                }}
              >
                Cash · Runway
              </div>
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 22,
                  fontWeight: 600,
                  color: "var(--warn)",
                  lineHeight: 1,
                  marginBottom: 5,
                }}
              >
                18 days
              </div>
              <div
                style={{
                  height: 5,
                  background: "var(--stone)",
                  borderRadius: 100,
                  overflow: "hidden",
                  marginTop: 10,
                }}
              >
                <div
                  style={{
                    width: "28%",
                    height: "100%",
                    background: "linear-gradient(to right, var(--up), var(--warn), var(--dn))",
                    borderRadius: 100,
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 4,
                  fontFamily: "var(--font-sans)",
                }}
              >
                <span style={{ fontSize: 8.5, color: "var(--ink-3)" }}>$8,420 in bank</span>
                <span style={{ fontSize: 8.5, color: "var(--dn)", fontWeight: 700 }}>Low</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 9,
                  paddingTop: 7,
                  borderTop: "1px solid var(--stone)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                <span style={{ fontSize: 9, color: "var(--ink-3)" }}>Synced 1h ago</span>
                <span
                  style={{
                    fontSize: 9,
                    color: "var(--ink-3)",
                    background: "var(--cream)",
                    padding: "1px 6px",
                    borderRadius: 4,
                    border: "1px solid var(--stone)",
                    fontWeight: 600,
                  }}
                >
                  akahu
                </span>
              </div>
            </div>

            {/* Orders */}
            <div
              style={{
                gridColumn: "span 1",
                background: "#fff",
                border: "1px solid var(--stone)",
                borderRadius: 11,
                padding: 14,
              }}
            >
              <div
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: ".08em",
                  color: "var(--ink-3)",
                  marginBottom: 6,
                  fontFamily: "var(--font-sans)",
                }}
              >
                Orders
              </div>
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 22,
                  fontWeight: 600,
                  color: "var(--ink)",
                  lineHeight: 1,
                  marginBottom: 5,
                }}
              >
                24
              </div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 3,
                  fontSize: 9,
                  fontWeight: 700,
                  padding: "2px 6px",
                  borderRadius: 100,
                  background: "var(--up-bg)",
                  color: "var(--up)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                ↑ 3
              </div>
            </div>

            {/* Heatmap */}
            <div
              style={{
                gridColumn: "span 2",
                background: "#fff",
                border: "1px solid var(--stone)",
                borderRadius: 11,
                padding: 14,
              }}
            >
              <div
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: ".08em",
                  color: "var(--ink-3)",
                  marginBottom: 8,
                  fontFamily: "var(--font-sans)",
                }}
              >
                Sales by Day
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
                {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                  <div key={i} style={{ fontSize: 7, color: "var(--ink-3)", textAlign: "center", fontFamily: "var(--font-sans)" }}>{d}</div>
                ))}
                {[0.15, 0.28, 0.42, 0.2, 0.6, 0.9, 0.75, 0.18, 0.32, 0.48, 0.24, 0.65, 0.88, 0.7].map((op, i) => (
                  <div
                    key={i}
                    style={{
                      aspectRatio: "1",
                      borderRadius: 2,
                      background: `rgba(181,96,58,${op})`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Top products */}
            <div
              style={{
                gridColumn: "span 4",
                background: "#fff",
                border: "1px solid var(--stone)",
                borderRadius: 11,
                padding: 14,
              }}
            >
              <div
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: ".08em",
                  color: "var(--ink-3)",
                  marginBottom: 8,
                  fontFamily: "var(--font-sans)",
                }}
              >
                Top Products · Month
              </div>
              {[
                { name: "Merino Tee — Black", val: "$4,260", pct: 100 },
                { name: "Canvas Tote", val: "$2,940", pct: 69 },
                { name: "Beanie — Grey", val: "$1,340", pct: 31 },
              ].map((row, idx) => (
                <div
                  key={row.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    padding: "5px 0",
                    borderBottom: idx < 2 ? "1px solid var(--stone)" : "none",
                  }}
                >
                  <span style={{ fontSize: 9, color: "var(--ink-3)", fontWeight: 700, width: 13, fontFamily: "var(--font-sans)" }}>
                    0{idx + 1}
                  </span>
                  <span style={{ fontSize: 11, fontWeight: 500, flex: 1, color: "var(--ink)", fontFamily: "var(--font-sans)" }}>
                    {row.name}
                  </span>
                  <div style={{ width: 48, height: 4, background: "var(--stone)", borderRadius: 100, overflow: "hidden" }}>
                    <div style={{ width: `${row.pct}%`, height: "100%", background: "var(--terra)", borderRadius: 100 }} />
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "var(--forest)", fontFamily: "var(--font-serif)", minWidth: 38, textAlign: "right" }}>
                    {row.val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
