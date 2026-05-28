import { motion } from "framer-motion";
import { ShieldCheck, Eye, Target, Compass, Award } from "lucide-react";

export function WhyChooseUs() {
  const reasons = [
    {
      icon: ShieldCheck,
      title: "SEBI Registered Advisory",
      description: "Operated under strict regulatory compliance to ensure absolute transparency, trust, and alignment with your best interest.",
    },
    {
      icon: Eye,
      title: "Transparent Investment Strategy",
      description: "No hidden fees, no conflict of interest. We offer clear, data-backed investment rationales for every single recommendation.",
    },
    {
      icon: Target,
      title: "Personalized Financial Planning",
      description: "Your financial goals are unique. We build tailored investment strategies that align with your cash flow and risk profile.",
    },
    {
      icon: Compass,
      title: "Long-Term Wealth Focus",
      description: "We avoid short-term speculation. Our investment philosophy centers on compounding, risk mitigation, and generational wealth.",
    },
    {
      icon: Award,
      title: "Experienced Market Guidance",
      description: "Over a decade of navigating complex market cycles. Benefit from seasoned professionals who know when to act and when to hold.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="py-24 relative overflow-hidden bg-background">
      {/* Background soft glow */}
      <div 
        className="absolute top-1/2 left-0 w-[500px] h-[500px] -translate-y-1/2 pointer-events-none opacity-30 z-0"
        style={{
          background: 'radial-gradient(circle, rgba(218, 165, 32, 0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Side Content */}
          <div className="lg:col-span-5 space-y-6">
            <div className="w-12 h-1.5 bg-primary rounded-full mb-4" />
            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-display font-extrabold leading-[1.15] tracking-tight">
              Why Clients Trust <br />
              <span className="gold-text">Alpha Investment</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              We stand for financial integrity, data-driven strategies, and a relentless focus on long-term client success. We don't just manage assets — we build enduring partnerships.
            </p>
            <div className="p-5 border border-border/30 rounded-xl bg-secondary/20 backdrop-blur-sm max-w-md">
              <p className="text-xs text-muted-foreground italic leading-relaxed">
                "Our mission is to replace investment complexity with absolute clarity. We operate on the single principle that our clients' success is the ultimate measure of our own."
              </p>
              <div className="mt-3 text-xs font-bold uppercase tracking-wider text-primary">- Alpha Advisory Committee</div>
            </div>
          </div>

          {/* Right Side Reasons Stack */}
          <div className="lg:col-span-7">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-4"
            >
              {reasons.map((reason, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="group flex gap-5 p-6 rounded-2xl glass-card bg-card/25 hover:bg-card/45 border border-white/5 hover:border-primary/35 hover:shadow-[0_0_20px_rgba(218,165,32,0.08)] transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl gold-gradient flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <reason.icon className="h-5.5 w-5.5 text-primary-foreground" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-bold text-base md:text-lg text-foreground group-hover:text-primary transition-colors duration-300">
                      {reason.title}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
