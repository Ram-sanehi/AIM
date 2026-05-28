import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { AboutPreview } from "@/components/AboutPreview";
import { Services } from "@/components/Services";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Testimonials } from "@/components/Testimonials";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { StockTicker } from "@/components/StockTicker";
import { FloatingChat } from "@/components/FloatingChat";

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      <Hero />
      <AboutPreview />
      <Services />
      <WhyChooseUs />
      <Testimonials />
      <CTA />
      <Footer />
      <StockTicker />
      <FloatingChat />
    </div>
  );
};

export default Index;
