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
  const duplicated = [...STRIP_ITEMS, ...STRIP_ITEMS];
  return (
    <div
      className="relative overflow-hidden border-y border-[var(--border-default)] bg-[var(--bg-elevated)] py-3.5"
      aria-hidden
    >
      <div className="absolute left-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-r from-[var(--bg-elevated)] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-l from-[var(--bg-elevated)] to-transparent pointer-events-none" />
      <div className="flex w-max gap-7 animate-ticker">
        {duplicated.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="flex shrink-0 items-center gap-2 text-xs font-bold uppercase tracking-wide text-[var(--text-tertiary)]"
          >
            {name}
            <span className="size-1 rounded-full bg-[var(--accent)] opacity-40" />
          </span>
        ))}
      </div>
    </div>
  );
}
