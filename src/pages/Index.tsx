import { lazy, Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { AuthorityStrip } from "@/components/AuthorityStrip";
import { AboutPreview } from "@/components/AboutPreview";
import { Services } from "@/components/Services";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { TrustedInvestors } from "@/components/TrustedInvestors";
import { FAQSection } from "@/components/FAQSection";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

// Lazy-load heavy non-critical components
const StockTicker = lazy(() => import("@/components/StockTicker").then(m => ({ default: m.StockTicker })));
const FloatingChat = lazy(() => import("@/components/FloatingChat").then(m => ({ default: m.FloatingChat })));

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      <main>
      <Hero />
      <AuthorityStrip />
      <AboutPreview />
      <Services />
      <WhyChooseUs />
      <TrustedInvestors />
      <FAQSection />
      <CTA />
      </main>
      <Footer />
      {/* Deferred non-critical components */}
      <Suspense fallback={null}>
        <StockTicker />
        <FloatingChat />
      </Suspense>
    </div>
  );
};

export default Index;
