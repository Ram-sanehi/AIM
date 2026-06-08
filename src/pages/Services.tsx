import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { StockTicker } from "@/components/StockTicker";
import { Footer } from "@/components/Footer";
import { CTA } from "@/components/CTA";
import { 
  TrendingUp, 
  PiggyBank, 
  Shield, 
  Building2, 
  Calculator, 
  Briefcase,
  ChevronDown,
  Check,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: TrendingUp,
    title: "Investment Management",
    description: "Personalized investment strategies designed to balance long-term growth with disciplined risk management.",
    keyBenefits: [
      "Customized portfolio aligned with your goals",
      "Regular rebalancing to optimize returns",
      "Access to diverse investment options",
      "Professional risk management",
      "Tax-efficient investment strategies",
    ],
    process: [
      "Risk Assessment - Understanding your risk tolerance and investment horizon",
      "Goal Setting - Defining clear financial objectives",
      "Strategy Design - Creating a personalized investment plan",
      "Implementation - Executing the investment strategy",
      "Monitoring - Continuous portfolio tracking and adjustments",
    ],
    instruments: [
      "Equity Instruments",
      "Debt Instruments",
      "Derivatives",
      "Mutual Funds",
      "Foreign Exchange",
      "Money Market",
      "Government Schemes",
      "Real Estate & Commodities",
      "Cash Equivalents",
    ],
  },
  {
    icon: PiggyBank,
    title: "Financial Planning",
    description: "A structured roadmap crafted to coordinate your assets, liabilities, and aspirations into a unified path toward long-term security.",
    keyBenefits: [
      "Clear roadmap to financial success",
      "Budget optimization strategies",
      "Emergency fund planning",
      "Education funding solutions",
      "Marriage and major life event planning",
    ],
    process: [
      "Financial Assessment - Analyzing your current financial position",
      "Goal Identification - Understanding your aspirations",
      "Plan Development - Creating actionable financial strategies",
      "Implementation Support - Helping you execute the plan",
      "Regular Reviews - Adjusting the plan as life changes",
    ],
    offerings: [
      "Personal Financial Planning",
      "Family Wealth Planning",
      "Education Planning",
      "Marriage Planning",
      "Business Planning",
      "Succession Planning",
    ],
  },
  {
    icon: Building2,
    title: "Loan Services",
    description: "Institutional access to custom capital, structured at competitive rates to facilitate property acquisition or business expansion.",
    keyBenefits: [
      "Competitive interest rates",
      "Quick approval process",
      "Flexible repayment options",
      "Minimal documentation",
      "Expert guidance throughout",
    ],
    process: [
      "Requirement Analysis - Understanding your loan needs",
      "Product Comparison - Finding the best loan options",
      "Documentation - Preparing required documents",
      "Application - Submitting to selected lenders",
      "Disbursement - Ensuring smooth fund transfer",
    ],
    offerings: [
      "Personal Loan",
      "Home Loan",
      "New & Used Vehicle Loans",
      "Loan Against Property",
      "Loan for Plot/Land",
      "Loan for Renovation",
    ],
  },
  {
    icon: Shield,
    title: "Insurance Mall",
    description: "Comprehensive insurance solutions are now available through our dedicated Insurance Mall — a unit of Alpha Investment Management.",
    keyBenefits: [],
    process: [],
    offerings: [],
    isExternal: true,
    externalLink: "https://insurancemall.alphaaim.in",
  },
  {
    icon: Calculator,
    title: "Tax Mitigation Strategy",
    description: "Strategic optimization of your tax exposures, utilizing legally sound structuring and tax-efficient asset selection.",
    keyBenefits: [
      "Maximize tax savings legally",
      "ELSS and 80C optimization",
      "Tax-efficient investment planning",
      "Capital gains management",
      "Comprehensive tax reporting",
    ],
    process: [
      "Tax Review - Analyzing your current tax situation",
      "Deduction Mapping - Identifying all available deductions",
      "Strategy Formulation - Creating tax-efficient plans",
      "Investment Selection - Choosing tax-saving instruments",
      "Documentation - Maintaining proper records",
    ],
    offerings: [
      "Section 80C Deductions (LIC, PPF, ELSS, FD)",
      "Section 80D Medical Deductions",
      "Section 24 Home Loan Interest",
      "Section 80E Education Loan",
      "Capital Gains Planning",
      "Business Loss Optimization",
    ],
  },
  {
    icon: Briefcase,
    title: "Retirement Planning",
    description: "Disciplined asset transition and decumulation structures designed to preserve purchasing power and legacy continuity.",
    keyBenefits: [
      "Corpus calculation based on lifestyle needs",
      "Multiple income stream creation",
      "Inflation-adjusted planning",
      "Healthcare cost coverage",
      "Legacy and estate planning",
    ],
    process: [
      "Lifestyle Analysis - Understanding retirement expectations",
      "Corpus Calculation - Determining required savings",
      "Investment Strategy - Building retirement portfolio",
      "Income Planning - Creating post-retirement income",
      "Estate Planning - Ensuring smooth wealth transfer",
    ],
    offerings: [
      "SWP (Systematic Withdrawal Plan)",
      "Senior Citizen Instruments",
      "Pension Plans",
      "Government Schemes",
    ],
  },
];

const ServicesPage = () => {
  const [expandedService, setExpandedService] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      <StockTicker />

      {/* Hero Section */}
      <section className="py-28 md:py-36 hero-gradient relative overflow-hidden border-b border-border/10">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl mx-auto text-center space-y-6"
          >
            <span className="text-primary text-xs uppercase tracking-widest font-semibold bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">
              Our Capabilities
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mt-4">
              Personalized Wealth Solutions <br />
              <span className="gold-text">Built Around Your Goals</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground/90 max-w-xl mx-auto font-light leading-relaxed">
              Our SEBI-registered advisors deliver comprehensive wealth strategies engineered to preserve capital, optimize tax exposures, and fund your family's lifelong milestones.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Accordion List */}
      <section className="py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-6">
            {services.map((service, index) => {
              const isExpanded = expandedService === index;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  className={`glass-card rounded-2xl overflow-hidden border transition-all duration-300 relative group ${
                    isExpanded 
                      ? "border-primary/30 bg-gradient-to-b from-slate-900/40 via-slate-950/20 to-slate-950/10 shadow-lg shadow-primary/[0.02]" 
                      : "border-border/30 hover:border-primary/20 hover:-translate-y-[2px] bg-slate-950/20 shadow-sm"
                  }`}
                >
                  {/* Subtle animated border slide-across line on card bottom */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2.5px] bg-primary group-hover:w-full transition-all duration-500 z-10" />
                  {/* Service Header Trigger */}
                  {(service as any).isExternal ? (
                    <a
                      href={(service as any).externalLink}
                      className="w-full p-6 md:p-8 flex items-center gap-5 md:gap-6 text-left transition-colors relative group"
                    >
                      <div className="w-14 h-14 rounded-2xl border border-primary/20 bg-primary/5 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_rgba(218,165,32,0.03)]">
                        <service.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <h3 className="text-lg md:text-xl font-bold font-display text-foreground group-hover:text-primary transition-colors duration-300 flex items-center gap-2">
                          {service.title}
                          <ExternalLink className="h-4 w-4 text-primary/50" />
                        </h3>
                        <p className="text-muted-foreground/85 text-xs md:text-sm font-light leading-relaxed max-w-2xl">
                          {service.description}
                        </p>
                      </div>
                      <Button className="gold-gradient text-primary-foreground hover:opacity-95 font-semibold text-[10px] uppercase tracking-wider px-5 h-9 rounded-sm shadow-md hidden md:inline-flex">
                        Visit Insurance Mall
                        <ExternalLink className="h-3 w-3 ml-1.5" />
                      </Button>
                    </a>
                  ) : (
                  <button
                    onClick={() => setExpandedService(isExpanded ? null : index)}
                    className="w-full p-6 md:p-8 flex items-center gap-5 md:gap-6 text-left transition-colors relative group"
                  >
                    {/* Glowing gold back-gradient on active header */}
                    {isExpanded && (
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.03] to-transparent pointer-events-none" />
                    )}

                    <div className="w-14 h-14 rounded-2xl border border-primary/20 bg-primary/5 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_rgba(218,165,32,0.03)]">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>

                    <div className="flex-1 space-y-1">
                      <h3 className="text-lg md:text-xl font-bold font-display text-foreground group-hover:text-primary transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground/85 text-xs md:text-sm font-light leading-relaxed max-w-2xl">
                        {service.description}
                      </p>
                    </div>

                    <div className="w-9 h-9 rounded-full border border-border/50 flex items-center justify-center shrink-0 group-hover:border-primary/45 transition-colors">
                      <ChevronDown 
                        className={`h-4 w-4 text-muted-foreground group-hover:text-primary transition-transform duration-300 ${
                          isExpanded ? "rotate-180 text-primary" : ""
                        }`} 
                      />
                    </div>
                  </button>
                  )}

                  {/* Expanded Content Details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-8 md:px-10 md:pb-10 grid md:grid-cols-3 gap-10 border-t border-border/10 pt-8 bg-[#02050c]/20">
                          
                          {/* Column 1: Key Benefits */}
                          <div className="space-y-5">
                            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-primary flex items-center gap-2 border-b border-border/10 pb-3">
                              Key Benefits
                            </h4>
                            <ul className="space-y-3.5">
                              {service.keyBenefits.map((benefit, i) => (
                                <motion.li
                                  key={i}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.04 }}
                                  className="flex items-start gap-3"
                                >
                                  <Check className="h-4.5 w-4.5 text-primary shrink-0 mt-0.5" />
                                  <span className="text-muted-foreground/90 text-xs md:text-sm font-light leading-relaxed">
                                    {benefit}
                                  </span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>

                          {/* Column 2: Our Process */}
                          <div className="space-y-5">
                            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-primary border-b border-border/10 pb-3">
                              Our Process
                            </h4>
                            <ol className="relative border-l border-primary/20 pl-3 ml-3 space-y-5">
                              {service.process.map((step, i) => {
                                const parts = step.split(" - ");
                                const stepTitle = parts[0];
                                const stepDesc = parts.slice(1).join(" - ");
                                return (
                                  <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.04 }}
                                    className="relative pl-6"
                                  >
                                    {/* Ring Step Badge */}
                                    <span className="absolute -left-[22.5px] top-0 w-[18px] h-[18px] rounded-full bg-slate-950 border border-primary/45 flex items-center justify-center text-[9px] text-primary font-bold shadow-[0_0_8px_rgba(218,165,32,0.1)]">
                                      {i + 1}
                                    </span>
                                    <h5 className="text-xs md:text-sm font-semibold text-foreground">
                                      {stepTitle}
                                    </h5>
                                    {stepDesc && (
                                      <p className="text-[11px] leading-relaxed text-muted-foreground/80 mt-1 font-light">
                                        {stepDesc}
                                      </p>
                                    )}
                                  </motion.li>
                                );
                              })}
                            </ol>
                          </div>

                          {/* Column 3: Offerings/Instruments */}
                          <div className="space-y-5">
                            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-primary border-b border-border/10 pb-3">
                              {service.instruments ? "Asset Classes Covered" : "Our Offerings"}
                            </h4>
                            <div className="flex flex-wrap gap-2 pt-1">
                              {(service.offerings || service.instruments)?.map((offering, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: i * 0.03 }}
                                  className="px-3.5 py-1.5 rounded-xl bg-[#030712]/50 border border-border/40 hover:border-primary/30 hover:bg-primary/[0.02] hover:text-primary transition-all duration-300 text-xs text-muted-foreground/85 cursor-default font-light tracking-wide shadow-sm"
                                >
                                  {offering}
                                </motion.div>
                              ))}
                            </div>
                          </div>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </div>
  );
};

export default ServicesPage;
