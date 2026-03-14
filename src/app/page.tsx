import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
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
      <Hero />
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
