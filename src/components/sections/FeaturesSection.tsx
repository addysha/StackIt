"use client";

import { EntranceDiv } from "@/components/ui/EntranceDiv";
import {
  DragCanvasMock,
  LiveSyncMock,
  ThirtyMinMock,
  VizTypesMock,
  RevenueMock,
  CustomMetricMock,
} from "./FeatureMocks";

function Badge({ label, className }: { label: string; className?: string }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-[3px] rounded-full text-[10px] font-bold tracking-[0.08em] uppercase mb-3 font-[family-name:var(--font-sans)] ${className ?? ""}`}
    >
      {label}
    </span>
  );
}

const TERRA_BADGE = "bg-[var(--terra-lt)] text-[var(--terra)] border border-[rgba(181,96,58,.2)]";

const CARD_BASE =
  "col-span-1 rounded-2xl p-5 lg:p-8 overflow-hidden transition-transform duration-[280ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:-translate-y-1 hover:shadow-md cursor-default";

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-12 px-5 lg:py-20 lg:px-10 bg-[var(--cream)] border-t border-[var(--stone)]"
    >
      {/* ── Section header ── */}
      <EntranceDiv className="max-w-[560px] mb-12">
        <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-[var(--terra)] mb-3.5 font-[family-name:var(--font-sans)]">
          Features
        </p>
        <h2 className="font-[family-name:var(--font-serif)] text-[clamp(30px,4vw,50px)] font-semibold leading-[1.18] tracking-tight text-[var(--ink)] mb-4">
          Everything you need.
          <br />
          <em className="not-italic italic text-[var(--terra)]">Exactly how you need it.</em>
        </h2>
        <p className="text-[16.5px] text-[var(--ink-2)] leading-[1.8] font-[family-name:var(--font-sans)] max-w-[540px]">
          Each feature was built around one kind of person - someone brilliant at
          their business, not at software.
        </p>
      </EntranceDiv>

      {/* ── Bento grid - original asymmetric layout: 5+4+3 / 8+4 / 4+8 ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 max-w-[1200px] mx-auto">

        {/* Row 1 - Card A: drag canvas, span-5 (light) */}
        <EntranceDiv delay={0} className={`${CARD_BASE} lg:col-span-5 bg-white border border-[var(--stone)]`}>
          <Badge label="New" className={TERRA_BADGE} />
          <h3 className="font-[family-name:var(--font-serif)] text-lg lg:text-xl font-semibold leading-snug text-[var(--ink)] mb-2">
            Flexible, drag-and-drop canvas
          </h3>
          <p className="text-[13px] text-[var(--ink-2)] leading-[1.7] font-[family-name:var(--font-sans)]">
            Build your exact dashboard by dragging metric blocks onto a canvas.
            They snap into place. No code, no config - it works like Lego.
          </p>
          <DragCanvasMock />
        </EntranceDiv>

        {/* Row 1 - Card B: live sync, span-4 (dark) */}
        <EntranceDiv delay={100} className={`${CARD_BASE} lg:col-span-4 bg-[var(--ink)]`}>
          <Badge
            label="● Live"
            className="bg-[var(--up-bg)] text-[var(--up)] border border-[rgba(46,125,82,.2)]"
          />
          <h3 className="font-[family-name:var(--font-serif)] text-lg lg:text-xl font-semibold leading-snug text-white mb-2">
            Always current. Always yours.
          </h3>
          <p className="text-[13px] text-white/65 leading-[1.7] font-[family-name:var(--font-sans)]">
            Data syncs in real time from every connected source. No manual
            refreshes. No CSV uploads. Open StackIt every morning and your
            numbers are already there.
          </p>
          <LiveSyncMock />
        </EntranceDiv>

        {/* Row 1 - Card C: 30 minutes, span-3 (terracotta) */}
        <EntranceDiv delay={200} className={`${CARD_BASE} lg:col-span-3 bg-[var(--terra)]`}>
          <h3 className="font-[family-name:var(--font-serif)] text-lg lg:text-xl font-semibold leading-snug text-white mb-2">
            Done for you in 30 minutes
          </h3>
          <p className="text-[13px] text-white/70 leading-[1.7] font-[family-name:var(--font-sans)] mb-3.5">
            We get you set up in 4 guaranteed steps - onboard your tools and
            your numbers are already there.
          </p>
          <ThirtyMinMock />
        </EntranceDiv>

        {/* Row 2 - Card D: viz types, span-8 (light, two-column interior) */}
        <EntranceDiv
          delay={300}
          className={`${CARD_BASE} lg:col-span-8 bg-white border border-[var(--stone)] lg:grid lg:grid-cols-2 lg:gap-5 lg:items-center`}
        >
          <div>
            <Badge label="10 types" className={TERRA_BADGE} />
            <h3 className="font-[family-name:var(--font-serif)] text-lg lg:text-xl font-semibold leading-snug text-[var(--ink)] mb-2">
              Data shown the way it makes sense
            </h3>
            <p className="text-[13px] text-[var(--ink-2)] leading-[1.7] font-[family-name:var(--font-sans)]">
              Cash runway is a gauge. Weekly sales is a heatmap. Top products is
              a ranked bar list. Every metric gets the chart that fits it.
            </p>
          </div>
          <VizTypesMock />
        </EntranceDiv>

        {/* Row 2 - Card E: revenue drivers, span-4 (forest) */}
        <EntranceDiv delay={400} className={`${CARD_BASE} lg:col-span-4 bg-[var(--forest)]`}>
          <h3 className="font-[family-name:var(--font-serif)] text-lg lg:text-xl font-semibold leading-snug text-white mb-2">
            See what&apos;s driving revenue
          </h3>
          <p className="text-[13px] text-white/65 leading-[1.7] font-[family-name:var(--font-sans)]">
            Ranked product performance with proportional bars. Know your
            best-sellers at a glance.
          </p>
          <RevenueMock />
        </EntranceDiv>

        {/* Row 3 - Card F: custom metric, span-4 (light) */}
        <EntranceDiv delay={500} className={`${CARD_BASE} lg:col-span-4 bg-white border border-[var(--stone)]`}>
          <Badge label="Custom" className={TERRA_BADGE} />
          <h3 className="font-[family-name:var(--font-serif)] text-lg lg:text-xl font-semibold leading-snug text-[var(--ink)] mb-2">
            Add any metric you want
          </h3>
          <p className="text-[13px] text-[var(--ink-2)] leading-[1.7] font-[family-name:var(--font-sans)]">
            No integration for it? Name it, enter the value, pick how it
            displays. Your dashboard, your rules.
          </p>
          <CustomMetricMock />
        </EntranceDiv>

      </div>
    </section>
  );
}
