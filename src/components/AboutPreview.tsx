import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield } from "lucide-react";

export function AboutPreview() {
  return (
    <section className="py-24 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 relative z-10 max-w-5xl">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          
          {/* Heritage Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-7 space-y-6"
          >
            <div className="w-12 h-1.5 bg-primary rounded-full" />
            <span className="text-primary font-semibold text-xs tracking-wider uppercase block">Our Heritage</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              A Vision Born Out Of <span className="gold-text">Trust &amp; Fiduciary Care</span>
            </h2>
            <p className="text-muted-foreground/90 text-sm md:text-base leading-relaxed font-light">
              Alpha Investment Management was established to bring institutional-grade financial guidance directly to families and private wealth clients. By operating under a strict regulatory framework, we maintain absolute alignment of interest with your family's future.
            </p>
            <div className="pt-2">
              <Button asChild variant="outline" className="border-primary/25 bg-transparent hover:border-primary/55 hover:bg-primary/5 text-xs px-6 py-5 transition-all duration-300 rounded-xl">
                <Link to="/about" className="inline-flex items-center">
                  Read Our Full Story
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-5"
          >
            <div className="glass-card rounded-2xl p-7 border border-border/40 hover:border-primary/45 transition-all duration-350 hover:shadow-[0_10px_30px_rgba(218,165,32,0.12)] relative overflow-hidden bg-[#030712]/30 shadow-2xl">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full blur-xl pointer-events-none" />
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-amber-500/30 p-[1.5px]">
                    <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center font-display text-sm font-bold text-primary">
                      NP
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">Nageshwar Prasad</h4>
                    <p className="text-[10px] text-primary font-semibold tracking-wider uppercase">Founder &amp; Business Head</p>
                  </div>
                </div>
                
                <blockquote className="text-xs italic text-muted-foreground/90 leading-relaxed border-l-2 border-primary/40 pl-3 py-1">
                  "True wealth advisory is not about chasing short-term speculation. It is about constructing resilient, custom portfolios that safeguard your family's future, built entirely on transparency and absolute alignment of interest."
                </blockquote>

                <div className="pt-3 border-t border-border/10 flex justify-between items-center text-[10px] text-muted-foreground/60 uppercase tracking-widest font-mono">
                  <div className="flex items-center gap-1">
                    <Shield className="h-3.5 w-3.5 text-primary" />
                    <span>SEBI Registered</span>
                  </div>
                  <span>Est. 2014</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
