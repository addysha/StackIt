import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { IntegrationStrip } from "@/components/landing/IntegrationStrip";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { ProductPreview } from "@/components/landing/ProductPreview";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { IntegrationsSection } from "@/components/landing/IntegrationsSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { FinalCta } from "@/components/landing/FinalCta";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[var(--w)] pt-[calc(56px+env(safe-area-inset-top,0px))]">
      <Navbar />
      {/* Hero + trust strip: on mobile hero is content-height so strip sits closer (less whitespace) */}
      <div className="md:contents">
        <Hero />
        <div className="pt-2 pb-4 md:pt-0 md:pb-0">
          <IntegrationStrip />
        </div>
      </div>
      <FeaturesSection />
      <ProblemSection />
      <ProductPreview />
      <HowItWorks />
      <IntegrationsSection />
      <PricingSection />
      <FaqSection />
      <FinalCta />
      <Footer />
    </main>
  );
}
