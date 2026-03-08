import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";

const PLACEHOLDER_SECTIONS = [
  { id: "features", label: "Features" },
  { id: "integrations", label: "Integrations" },
  { id: "pricing", label: "Pricing" },
  { id: "faq", label: "FAQ" },
  { id: "how-it-works", label: "How It Works" },
  { id: "early-access", label: "Get Early Access" },
] as const;

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <Navbar />
      <Hero />
      {/* Scroll targets — minimal visible placeholders until sections 3–12 exist */}
      {PLACEHOLDER_SECTIONS.map(({ id, label }) => (
        <section
          key={id}
          id={id}
          className="flex min-h-[40vh] flex-col items-center justify-center border-t border-[var(--border)] py-16"
          aria-label={label}
        >
          <span className="font-[family-name:var(--font-display)] text-lg font-medium text-[var(--text-tertiary)]">
            {label}
          </span>
          <span className="mt-1 text-sm text-[var(--text-tertiary)] opacity-70">
            Section coming soon
          </span>
        </section>
      ))}
    </main>
  );
}
