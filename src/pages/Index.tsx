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
import { StockTicker } from "@/components/StockTicker";
import { FloatingChat } from "@/components/FloatingChat";

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      <Hero />
      <AuthorityStrip />
      <AboutPreview />
      <Services />
      <WhyChooseUs />
      <TrustedInvestors />
      <FAQSection />
      <CTA />
      <Footer />
      <StockTicker />
      <FloatingChat />
    </div>
  );
};

export default Index;
