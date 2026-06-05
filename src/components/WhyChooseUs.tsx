import { motion } from "framer-motion";
import { ShieldCheck, Scale, Coins, Target, Sliders, LineChart, ShieldAlert } from "lucide-react";

export function WhyChooseUs() {
  const pillars = [
    {
      icon: ShieldCheck,
      title: "SEBI Registered Advisory",
      description: "Reg. No. INA000017348. Operating under strict regulatory oversight from SEBI and BASL, ensuring complete regulatory compliance.",
    },
    {
      icon: Scale,
      title: "Fiduciary Duty",
      description: "We are legally and ethically bound to put your interests first. Our advice is independent, conflict-free, and objective.",
    },
    {
      icon: Coins,
      title: "Transparent Fee Structure",
      description: "A pure fee-only advisory model. We earn zero commissions or distribution incentives, eliminating any bias from our advice.",
    },
    {
      icon: Target,
      title: "Goal-Based Investing",
      description: "Portfolios structured systematically around your real-world targets: retirement planning, estate creation, and cash-flow safety.",
    },
    {
      icon: Sliders,
      title: "Risk Management Framework",
      description: "Rigorous quantitative risk frameworks focused on capital preservation, volatility mitigation, and downside protection.",
    },
    {
      icon: LineChart,
      title: "Long-Term Wealth Creation",
      description: "Built for decade-scale compounding. We construct diversified portfolios designed to grow and protect your multi-generational legacy.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="py-24 relative overflow-hidden bg-background border-t border-border/10">
      {/* Soft warm gold background glow bloom */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none opacity-20 z-0"
        style={{
          background: 'radial-gradient(circle, rgba(218, 165, 32, 0.03) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      <div className="container mx-auto px-4 relative z-10 max-w-5xl">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-[9px] font-bold tracking-widest uppercase text-primary">
            <ShieldAlert className="h-3 w-3 text-primary" /> Fiduciary Values
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            Why Investors Choose <span className="gold-text">Alpha</span>
          </h2>
          <div className="h-[2px] w-12 bg-primary/40 mx-auto mt-2" />
          <p className="text-muted-foreground/90 text-sm md:text-base leading-relaxed font-light">
            We are dedicated to wealth preservation and conflict-free execution. Here are the core pillars that guide our institutional partnership with you.
          </p>
        </div>

        {/* 3x2 Grid of pillars */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02, 
                borderColor: "rgba(212, 175, 55, 0.35)", 
                boxShadow: "0 15px 30px rgba(212, 175, 55, 0.03)" 
              }}
              transition={{ duration: 0.3 }}
              className="relative overflow-hidden flex flex-col justify-between p-6 rounded-2xl glass-card bg-slate-950/45 border border-border/15 min-h-[200px] text-left group transition-all duration-300"
            >
              {/* Subtle animated border slide-across line on card bottom */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2.5px] bg-primary group-hover:w-full transition-all duration-500 z-10" />

              <div>
                <div className="w-10 h-10 rounded-xl bg-primary/5 border border-primary/20 flex items-center justify-center mb-5 group-hover:bg-[#D4AF37]/10 group-hover:border-[#D4AF37]/55 transition-all duration-300 shrink-0">
                  <pillar.icon className="h-5 w-5 text-primary group-hover:scale-105 transition-transform duration-300" />
                </div>
                <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors duration-300 tracking-wide">
                  {pillar.title}
                </h3>
                <p className="text-xs text-muted-foreground/80 leading-relaxed font-light mt-3">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
