import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="py-28 relative overflow-hidden bg-background">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent pointer-events-none" />
      
      {/* Subtle gold mesh background blur */}
      <div className="absolute inset-0 opacity-30 pointer-events-none overflow-hidden">
        <div className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Animated background glow */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(218, 165, 32, 0.15) 0%, rgba(218, 165, 32, 0.03) 45%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-display font-bold leading-[1.15] tracking-tight text-balance">
            Let’s Craft a <br className="sm:hidden" />
            <span className="gold-text">Smarter Wealth Strategy</span> for You
          </h2>
          
          <p className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto font-light">
            Begin your journey towards complete financial peace of mind. Partner with our SEBI-registered advisors to design a bespoke investment roadmap tailored to your family's future.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button asChild size="lg" className="gold-gradient text-primary-foreground hover:opacity-95 text-base px-8 py-6 shadow-xl shadow-primary/10 hover:shadow-primary/25 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] font-semibold rounded-xl border border-primary/20">
              <Link to="/contact">
                Schedule Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary/20 bg-transparent hover:border-primary/50 hover:bg-primary/5 text-base px-8 py-6 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] rounded-xl text-foreground font-medium">
              <a href="tel:+919607509586" className="inline-flex items-center">
                <Phone className="mr-2 h-4 w-4 text-primary" />
                Call Us Now
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
