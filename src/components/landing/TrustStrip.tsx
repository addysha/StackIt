"use client";

const STRIP_ITEMS = [
  "Shopify",
  "Square",
  "Stripe",
  "Xero",
  "ANZ Bank Feed",
  "ASB Bank Feed",
  "BNZ Bank Feed",
  "PayPal",
  "MYOB",
  "Etsy",
];

export function TrustStrip() {
  const doubled = [...STRIP_ITEMS, ...STRIP_ITEMS];
  return (
    <div
      aria-hidden
      style={{
        borderTop: "1px solid var(--stone)",
        borderBottom: "1px solid var(--stone)",
        padding: "14px 0",
        overflow: "hidden",
        position: "relative",
        background: "var(--cream)",
      }}
    >
      {/* Fade masks */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: 120,
          zIndex: 2,
          background: "linear-gradient(to right, var(--cream), transparent)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          width: 120,
          zIndex: 2,
          background: "linear-gradient(to left, var(--cream), transparent)",
          pointerEvents: "none",
        }}
      />
      <div
        className="animate-ticker"
        style={{ display: "flex", gap: 28, width: "max-content" }}
      >
        {doubled.map((name, i) => (
          <span
            key={`${name}-${i}`}
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "var(--ink-3)",
              letterSpacing: ".05em",
              display: "flex",
              alignItems: "center",
              gap: 8,
              whiteSpace: "nowrap",
              fontFamily: "var(--font-sans)",
            }}
          >
            {name}
            <span
              style={{
                width: 4,
                height: 4,
                background: "var(--terra)",
                borderRadius: "50%",
                opacity: 0.4,
                display: "inline-block",
              }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
