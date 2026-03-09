"use client";

import { RevealWrapper } from "@/components/ui/RevealWrapper";

const MINI_WIDGETS = [
  { label: "Revenue", value: "$14,250", trend: "↑ 12%", up: true },
  { label: "Orders", value: "241", trend: "↑ 8%", up: true },
  { label: "Cash", value: "$8,420", trend: "↓ 8%", up: false },
  { label: "Customers", value: "142", trend: "↑ 18%", up: true },
];

const LIVE_SOURCES = [
  { abbr: "SH", name: "Shopify", connected: true },
  { abbr: "AN", name: "ANZ Bank Feed", connected: true },
  { abbr: "ST", name: "Stripe", connected: true },
  { abbr: "XR", name: "Xero", connected: false },
];

const TOP_PRODUCTS = [
  { name: "Merino Tee - Black", value: "$4,260", pct: 100 },
  { name: "Canvas Tote", value: "$2,940", pct: 69 },
  { name: "Beanie - Grey", value: "$1,340", pct: 31 },
];

function Monogram({ abbr, size = 28 }: { abbr: string; size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 6,
        background: "rgba(255,255,255,.12)",
        border: "1px solid rgba(255,255,255,.15)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.35,
        fontWeight: 700,
        color: "rgba(255,255,255,.8)",
        fontFamily: "var(--font-sans)",
        flexShrink: 0,
        letterSpacing: ".02em",
      }}
    >
      {abbr}
    </div>
  );
}

export function FeaturesBento() {
  return (
    <section
      id="features"
      style={{
        padding: "80px 40px 100px",
        background: "var(--cream)",
        borderTop: "1px solid var(--stone)",
      }}
    >
      {/* Header */}
      <RevealWrapper style={{ maxWidth: 560, marginBottom: 48 }}>
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
          Features
        </p>
        <h2
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(30px, 4vw, 50px)",
            fontWeight: 600,
            lineHeight: 1.18,
            letterSpacing: "-.02em",
            color: "var(--ink)",
            marginBottom: 16,
          }}
        >
          Everything you need.
          <br />
          <em style={{ fontStyle: "italic", color: "var(--terra)" }}>Exactly how you need it.</em>
        </h2>
        <p
          style={{
            fontSize: 16.5,
            color: "var(--ink-2)",
            lineHeight: 1.8,
            fontFamily: "var(--font-sans)",
            maxWidth: 540,
          }}
        >
          Each feature was built around one kind of person - someone brilliant at
          their business, not at software.
        </p>
      </RevealWrapper>

      {/* Bento grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gap: 14,
          maxWidth: 1200,
          margin: "0 auto",
        }}
        className="max-md:grid-cols-1"
      >
        {/* Cell 1 - span 5, white, drag canvas */}
        <RevealWrapper
          style={{
            gridColumn: "span 5",
            background: "var(--surf)",
            border: "1px solid var(--stone)",
            borderRadius: 18,
            padding: 28,
            overflow: "hidden",
            position: "relative",
            transition: "transform .28s var(--ease), box-shadow .28s",
            cursor: "default",
          }}
          className="max-md:!col-span-1"
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
            (e.currentTarget as HTMLElement).style.boxShadow = "var(--sh-md)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "none";
            (e.currentTarget as HTMLElement).style.boxShadow = "none";
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: ".08em",
              textTransform: "uppercase",
              padding: "3px 10px",
              borderRadius: 100,
              marginBottom: 12,
              background: "var(--terra-lt)",
              color: "var(--terra)",
              border: "1px solid rgba(181,96,58,.2)",
              fontFamily: "var(--font-sans)",
            }}
          >
            New
          </span>
          <div
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 20,
              fontWeight: 600,
              lineHeight: 1.3,
              marginBottom: 8,
              color: "var(--ink)",
            }}
          >
            Flexible, drag-and-drop canvas
          </div>
          <p
            style={{
              fontSize: 13,
              color: "var(--ink-2)",
              lineHeight: 1.7,
              fontFamily: "var(--font-sans)",
            }}
          >
            Build your exact dashboard by dragging metric blocks onto a canvas.
            They snap into place. No code, no config - it works like Lego.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 7,
              marginTop: 16,
            }}
          >
            {MINI_WIDGETS.map((w) => (
              <div
                key={w.label}
                style={{
                  background: "rgba(253,250,245,.9)",
                  border: "1px solid var(--stone)",
                  borderRadius: 10,
                  padding: "10px 12px",
                }}
              >
                <div
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: ".07em",
                    color: "var(--ink-3)",
                    marginBottom: 4,
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {w.label}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: 18,
                    fontWeight: 600,
                    color: "var(--ink)",
                    lineHeight: 1,
                  }}
                >
                  {w.value}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    marginTop: 3,
                    color: w.up ? "var(--up)" : "var(--dn)",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {w.trend}
                </div>
              </div>
            ))}
          </div>
        </RevealWrapper>

        {/* Cell 2 - span 4, dark, live data */}
        <RevealWrapper
          delay={1}
          style={{
            gridColumn: "span 4",
            background: "var(--ink)",
            borderRadius: 18,
            padding: 28,
            overflow: "hidden",
            transition: "transform .28s var(--ease), box-shadow .28s",
            cursor: "default",
          }}
          className="max-md:!col-span-1"
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
            (e.currentTarget as HTMLElement).style.boxShadow = "var(--sh-md)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "none";
            (e.currentTarget as HTMLElement).style.boxShadow = "none";
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: ".08em",
              textTransform: "uppercase",
              padding: "3px 10px",
              borderRadius: 100,
              marginBottom: 12,
              background: "var(--up-bg)",
              color: "var(--up)",
              border: "1px solid rgba(46,125,82,.2)",
              fontFamily: "var(--font-sans)",
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                background: "var(--up)",
                borderRadius: "50%",
                animation: "blink 2s infinite",
                display: "inline-block",
              }}
            />
            Live
          </span>
          <div
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 20,
              fontWeight: 600,
              lineHeight: 1.3,
              marginBottom: 8,
              color: "#fff",
            }}
          >
            Always current. Always yours.
          </div>
          <p
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,.65)",
              lineHeight: 1.7,
              fontFamily: "var(--font-sans)",
            }}
          >
            Data syncs in real time from every connected source. No manual
            refreshes. No CSV uploads. Open Stackit every morning and your
            numbers are already there.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 12 }}>
            {LIVE_SOURCES.map((s) => (
              <div
                key={s.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(255,255,255,.06)",
                  border: "1px solid rgba(255,255,255,.1)",
                  borderRadius: 8,
                  padding: "8px 10px",
                }}
              >
                <Monogram abbr={s.abbr} size={26} />
                <span
                  style={{
                    fontSize: 12,
                    color: "rgba(255,255,255,.75)",
                    flex: 1,
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {s.name}
                </span>
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: s.connected ? "#3fa85f" : "var(--warn)",
                    boxShadow: s.connected ? "0 0 5px #3fa85f" : "0 0 5px var(--warn)",
                    animation: "blink 2.4s infinite",
                    flexShrink: 0,
                  }}
                />
              </div>
            ))}
          </div>
        </RevealWrapper>

        {/* Cell 3 - span 3, terra, "Done for you in 30 minutes" */}
        <RevealWrapper
          delay={2}
          style={{
            gridColumn: "span 3",
            background: "var(--terra)",
            borderRadius: 18,
            padding: 28,
            overflow: "hidden",
            transition: "transform .28s var(--ease), box-shadow .28s",
            cursor: "default",
          }}
          className="max-md:!col-span-1"
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
            (e.currentTarget as HTMLElement).style.boxShadow = "var(--sh-md)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "none";
            (e.currentTarget as HTMLElement).style.boxShadow = "none";
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 20,
              fontWeight: 600,
              lineHeight: 1.3,
              marginBottom: 8,
              color: "#fff",
            }}
          >
            Done for you in 30 minutes
          </div>
          <p
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,.7)",
              lineHeight: 1.7,
              fontFamily: "var(--font-sans)",
              marginBottom: 14,
            }}
          >
            We get you set up in 4 guaranteed steps - onboard your tools and
            your numbers are already there.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {[
              { label: "Sign up", done: true },
              { label: "Connect your tools", done: true },
              { label: "Try the dashboard", done: true },
              { label: "You love it", done: true },
            ].map((step) => (
              <div
                key={step.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "rgba(255,255,255,.12)",
                  border: "1px solid rgba(255,255,255,.15)",
                  borderRadius: 8,
                  padding: "7px 10px",
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    color: "rgba(255,255,255,.9)",
                    fontFamily: "var(--font-sans)",
                    fontWeight: 500,
                  }}
                >
                  {step.label}
                </span>
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: ".06em",
                    color: "rgba(255,255,255,.6)",
                    background: "rgba(255,255,255,.15)",
                    padding: "2px 8px",
                    borderRadius: 100,
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  Done
                </span>
              </div>
            ))}
          </div>
        </RevealWrapper>

        {/* Cell 4 - span 8, white, viz types */}
        <RevealWrapper
          style={{
            gridColumn: "span 8",
            background: "var(--surf)",
            border: "1px solid var(--stone)",
            borderRadius: 18,
            padding: 28,
            overflow: "hidden",
            transition: "transform .28s var(--ease), box-shadow .28s",
            cursor: "default",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
            alignItems: "center",
          }}
          className="max-md:!col-span-1 max-md:!grid-cols-1"
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
            (e.currentTarget as HTMLElement).style.boxShadow = "var(--sh-md)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "none";
            (e.currentTarget as HTMLElement).style.boxShadow = "none";
          }}
        >
          <div>
            <span
              style={{
                display: "inline-flex",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: ".08em",
                textTransform: "uppercase",
                padding: "3px 10px",
                borderRadius: 100,
                marginBottom: 12,
                background: "var(--terra-lt)",
                color: "var(--terra)",
                border: "1px solid rgba(181,96,58,.2)",
                fontFamily: "var(--font-sans)",
              }}
            >
              10 types
            </span>
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 20,
                fontWeight: 600,
                lineHeight: 1.3,
                marginBottom: 8,
                color: "var(--ink)",
              }}
            >
              Data shown the way it makes sense
            </div>
            <p
              style={{
                fontSize: 13,
                color: "var(--ink-2)",
                lineHeight: 1.7,
                fontFamily: "var(--font-sans)",
              }}
            >
              Cash runway is a gauge. Weekly sales is a heatmap. Top products is
              a ranked bar list. Revenue trend is a sparkline. Every metric gets
              the visualisation that fits it.
            </p>
          </div>
          <div>
            {/* Heatmap */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                background: "var(--cream)",
                borderRadius: 10,
                padding: 10,
                gap: 3,
                marginBottom: 8,
              }}
            >
              {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
                <div
                  key={d}
                  style={{
                    fontSize: 8,
                    color: "var(--ink-3)",
                    textAlign: "center",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {d}
                </div>
              ))}
              {[
                0.10, 0.22, 0.38, 0.18, 0.52, 0.82, 0.68,
                0.15, 0.30, 0.48, 0.24, 0.60, 0.90, 0.75,
                0.08, 0.18, 0.35, 0.14, 0.48, 0.78, 0.62,
                0.20, 0.40, 0.58, 0.30, 0.70, 0.95, 0.80,
              ].map(
                (op, i) => (
                  <div
                    key={i}
                    style={{
                      aspectRatio: "1",
                      borderRadius: 3,
                      background: `rgba(181,96,58,${op})`,
                    }}
                  />
                )
              )}
            </div>
            {/* Bar chart */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: 3,
                height: 48,
                background: "var(--cream)",
                borderRadius: 10,
                padding: "8px 8px 6px",
                marginTop: 6,
              }}
            >
              {[38, 52, 44, 62, 58, 74, 68, 88, 95].map((h, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: `${h}%`,
                    background: i === 8 ? "var(--terra)" : "var(--forest)",
                    opacity: i === 8 ? 1 : 0.38 + i * 0.07,
                    borderRadius: "2px 2px 0 0",
                  }}
                />
              ))}
            </div>
          </div>
        </RevealWrapper>

        {/* Cell 5 - span 4, forest, top products */}
        <RevealWrapper
          delay={1}
          style={{
            gridColumn: "span 4",
            background: "var(--forest)",
            borderRadius: 18,
            padding: 28,
            overflow: "hidden",
            transition: "transform .28s var(--ease), box-shadow .28s",
            cursor: "default",
          }}
          className="max-md:!col-span-1"
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
            (e.currentTarget as HTMLElement).style.boxShadow = "var(--sh-md)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "none";
            (e.currentTarget as HTMLElement).style.boxShadow = "none";
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 20,
              fontWeight: 600,
              lineHeight: 1.3,
              marginBottom: 8,
              color: "#fff",
            }}
          >
            See what's driving revenue
          </div>
          <p
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,.65)",
              lineHeight: 1.7,
              fontFamily: "var(--font-sans)",
            }}
          >
            Ranked product performance with proportional bars. Know your
            best-sellers at a glance.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 5, marginTop: 12 }}>
            {TOP_PRODUCTS.map((row, idx) => (
              <div
                key={row.name}
                style={{ display: "flex", alignItems: "center", gap: 8 }}
              >
                <span
                  style={{
                    fontSize: 9.5,
                    color: "rgba(255,255,255,.4)",
                    fontWeight: 700,
                    width: 14,
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  0{idx + 1}
                </span>
                <span
                  style={{
                    fontSize: 11.5,
                    color: "rgba(255,255,255,.8)",
                    flex: 1,
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {row.name}
                </span>
                <div
                  style={{
                    width: 50,
                    height: 4,
                    background: "rgba(255,255,255,.12)",
                    borderRadius: 100,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      borderRadius: 100,
                      background: "rgba(255,255,255,.7)",
                      width: `${row.pct}%`,
                    }}
                  />
                </div>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "rgba(255,255,255,.9)",
                    fontFamily: "var(--font-serif)",
                  }}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </RevealWrapper>

        {/* Cell 6 - span 4, white, custom widgets */}
        <RevealWrapper
          delay={2}
          style={{
            gridColumn: "span 4",
            background: "var(--surf)",
            border: "1px solid var(--stone)",
            borderRadius: 18,
            padding: 28,
            overflow: "hidden",
            transition: "transform .28s var(--ease), box-shadow .28s",
            cursor: "default",
          }}
          className="max-md:!col-span-1"
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
            (e.currentTarget as HTMLElement).style.boxShadow = "var(--sh-md)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "none";
            (e.currentTarget as HTMLElement).style.boxShadow = "none";
          }}
        >
          <span
            style={{
              display: "inline-flex",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: ".08em",
              textTransform: "uppercase",
              padding: "3px 10px",
              borderRadius: 100,
              marginBottom: 12,
              background: "var(--terra-lt)",
              color: "var(--terra)",
              border: "1px solid rgba(181,96,58,.2)",
              fontFamily: "var(--font-sans)",
            }}
          >
            Custom
          </span>
          <div
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 20,
              fontWeight: 600,
              lineHeight: 1.3,
              marginBottom: 8,
              color: "var(--ink)",
            }}
          >
            Add any metric you want
          </div>
          <p
            style={{
              fontSize: 13,
              color: "var(--ink-2)",
              lineHeight: 1.7,
              fontFamily: "var(--font-sans)",
            }}
          >
            No integration for it? Name it, enter the value, pick how it
            displays. Your dashboard, your rules.
          </p>
          <div
            style={{
              marginTop: 14,
              background: "var(--cream)",
              border: "1.5px dashed var(--slate)",
              borderRadius: 10,
              padding: 12,
            }}
          >
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: "var(--ink-3)",
                marginBottom: 6,
                fontFamily: "var(--font-sans)",
              }}
            >
              Widget name
            </div>
            <div
              style={{
                background: "#fff",
                border: "1px solid var(--stone)",
                borderRadius: 7,
                padding: "7px 10px",
                fontSize: 12,
                color: "var(--terra)",
                fontWeight: 600,
                fontFamily: "var(--font-sans)",
              }}
            >
              Weekly Tips
            </div>
            <div
              style={{
                height: 5,
                background: "var(--stone)",
                borderRadius: 100,
                overflow: "hidden",
                marginTop: 9,
              }}
            >
              <div
                style={{
                  width: "62%",
                  height: "100%",
                  background: "var(--terra)",
                  borderRadius: 100,
                }}
              />
            </div>
            <div
              style={{
                fontSize: 10,
                color: "var(--ink-3)",
                marginTop: 4,
                display: "flex",
                justifyContent: "space-between",
                fontFamily: "var(--font-sans)",
              }}
            >
              <span>$0</span>
              <span style={{ fontWeight: 700, color: "var(--ink-2)" }}>$1,240 / $2,000</span>
            </div>
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}
