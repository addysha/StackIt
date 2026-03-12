"use client";

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

const STEPS = ["Sign up", "Connect your tools", "Try the dashboard", "You love it"];

const HEATMAP_VALS = [
  0.1, 0.22, 0.38, 0.18, 0.52, 0.82, 0.68,
  0.15, 0.3, 0.48, 0.24, 0.6, 0.9, 0.75,
  0.08, 0.18, 0.35, 0.14, 0.48, 0.78, 0.62,
  0.2, 0.4, 0.58, 0.3, 0.7, 0.95, 0.8,
];

const BAR_HEIGHTS = [38, 52, 44, 62, 58, 74, 68, 88, 95];

export function DragCanvasMock() {
  return (
    <div className="grid grid-cols-2 gap-1.5 mt-4">
      {MINI_WIDGETS.map((w) => (
        <div
          key={w.label}
          className="bg-[var(--cream)] border border-[var(--stone)] rounded-[10px] px-3 py-2.5"
        >
          <div className="text-[9px] font-bold uppercase tracking-[0.07em] text-[var(--ink-3)] mb-1 font-[family-name:var(--font-sans)]">
            {w.label}
          </div>
          <div className="font-[family-name:var(--font-serif)] text-lg font-semibold leading-none text-[var(--ink)]">
            {w.value}
          </div>
          <div
            className={`text-[10px] font-semibold mt-0.5 font-[family-name:var(--font-sans)] ${w.up ? "text-[var(--up)]" : "text-[var(--dn)]"}`}
          >
            {w.trend}
          </div>
        </div>
      ))}
    </div>
  );
}

export function LiveSyncMock() {
  return (
    <div className="flex flex-col gap-1.5 mt-3">
      {LIVE_SOURCES.map((s) => (
        <div
          key={s.name}
          className="flex items-center gap-2 bg-white/[0.06] border border-white/10 rounded-lg px-2.5 py-2"
        >
          <div className="w-6 h-6 rounded-md bg-white/10 border border-white/15 flex items-center justify-center text-[8px] font-bold text-white/80 shrink-0 font-[family-name:var(--font-sans)]">
            {s.abbr}
          </div>
          <span className="text-[12px] text-white/75 flex-1 font-[family-name:var(--font-sans)]">
            {s.name}
          </span>
          <span
            className={`w-1.5 h-1.5 rounded-full shrink-0 ${s.connected ? "bg-[#3fa85f] shadow-[0_0_5px_#3fa85f]" : "bg-[var(--warn)] shadow-[0_0_5px_var(--warn)]"}`}
          />
        </div>
      ))}
    </div>
  );
}

export function ThirtyMinMock() {
  return (
    <div className="flex flex-col gap-1.5 mt-4">
      {STEPS.map((label) => (
        <div
          key={label}
          className="flex items-center justify-between bg-white/[0.12] border border-white/15 rounded-lg px-2.5 py-1.5"
        >
          <span className="text-[12px] text-white/90 font-medium font-[family-name:var(--font-sans)]">
            {label}
          </span>
          <span className="text-[9px] font-bold uppercase tracking-[0.06em] text-white/60 bg-white/15 px-2 py-0.5 rounded-full font-[family-name:var(--font-sans)]">
            Done
          </span>
        </div>
      ))}
    </div>
  );
}

export function VizTypesMock() {
  return (
    <div>
      <div className="grid grid-cols-7 gap-[3px] bg-[var(--cream)] rounded-[10px] p-2.5 mb-2">
        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
          <div key={d} className="text-[8px] text-[var(--ink-3)] text-center font-[family-name:var(--font-sans)]">
            {d}
          </div>
        ))}
        {HEATMAP_VALS.map((op, i) => (
          <div
            key={i}
            className="aspect-square rounded-[3px]"
            style={{ background: `rgba(181,96,58,${op})` }}
          />
        ))}
      </div>
      <div className="flex items-end gap-[3px] h-12 bg-[var(--cream)] rounded-[10px] px-2 py-1.5">
        {BAR_HEIGHTS.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-sm"
            style={{
              height: `${h}%`,
              background: i === 8 ? "var(--terra)" : "var(--forest)",
              opacity: i === 8 ? 1 : 0.38 + i * 0.07,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function RevenueMock() {
  return (
    <div className="flex flex-col gap-1.5 mt-3">
      {TOP_PRODUCTS.map((row, idx) => (
        <div key={row.name} className="flex items-center gap-2">
          <span className="text-[9.5px] text-white/40 font-bold w-3.5 font-[family-name:var(--font-sans)]">
            0{idx + 1}
          </span>
          <span className="text-[11.5px] text-white/80 flex-1 font-[family-name:var(--font-sans)]">
            {row.name}
          </span>
          <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-white/70"
              style={{ width: `${row.pct}%` }}
            />
          </div>
          <span className="text-[11px] font-bold text-white/90 font-[family-name:var(--font-serif)]">
            {row.value}
          </span>
        </div>
      ))}
    </div>
  );
}

export function CustomMetricMock() {
  return (
    <div className="mt-4 bg-[var(--cream)] border-2 border-dashed border-[var(--slate)] rounded-[10px] p-3">
      <div className="text-[10px] font-bold text-[var(--ink-3)] mb-1.5 font-[family-name:var(--font-sans)]">
        Widget name
      </div>
      <div className="bg-white border border-[var(--stone)] rounded-[7px] px-2.5 py-1.5 text-[12px] font-semibold text-[var(--terra)] font-[family-name:var(--font-sans)]">
        Weekly Tips
      </div>
      <div className="h-1.5 bg-[var(--stone)] rounded-full overflow-hidden mt-2.5">
        <div className="w-[62%] h-full bg-[var(--terra)] rounded-full" />
      </div>
      <div className="flex justify-between text-[10px] text-[var(--ink-3)] mt-1 font-[family-name:var(--font-sans)]">
        <span>$0</span>
        <span className="font-bold text-[var(--ink-2)]">$1,240 / $2,000</span>
      </div>
    </div>
  );
}
