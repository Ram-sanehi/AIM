import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { StockTicker } from "@/components/StockTicker";
import { Footer } from "@/components/Footer";
import { CTA } from "@/components/CTA";
import {
  Shield,
  Car,
  Truck,
  Heart,
  TrendingUp,
  Home,
  Landmark,
  Plane,
  Building2,
  ChevronDown,
  Check,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const keyBenefits = [
  {
    title: "Comprehensive Coverage Analysis",
    description: "Detailed assessment of existing insurance policies and protection requirements to ensure adequate coverage.",
  },
  {
    title: "Best-in-Class Insurance Products",
    description: "Access to carefully selected insurance solutions from leading insurance providers.",
  },
  {
    title: "Claims Assistance Support",
    description: "Dedicated support during claim filing, documentation, follow-ups, and settlement processes.",
  },
  {
    title: "Regular Policy Reviews",
    description: "Periodic evaluations to ensure policies remain aligned with changing life goals and financial needs.",
  },
  {
    title: "Family Protection Planning",
    description: "Structured protection strategies covering health, income replacement, education goals, retirement needs, and estate transfer.",
  },
];

const processSteps = [
  {
    number: 1,
    title: "Need Assessment",
    description: "Evaluating personal, family, business, health, income, and asset protection requirements.",
  },
  {
    number: 2,
    title: "Gap Analysis",
    description: "Identifying underinsured areas, overlapping policies, and financial vulnerabilities.",
  },
  {
    number: 3,
    title: "Product Selection",
    description: "Comparing available insurance options and recommending suitable solutions.",
  },
  {
    number: 4,
    title: "Policy Procurement",
    description: "Assisting in documentation, onboarding, and securing optimal coverage.",
  },
  {
    number: 5,
    title: "Claim Support",
    description: "Providing guidance throughout the claim settlement process to ensure smooth execution.",
  },
];

const insuranceOfferings = [
  {
    icon: Car,
    title: "Two & Four Wheeler Insurance",
    overview:
      "Provides financial protection against accidents, theft, natural calamities, fire, third-party liabilities, and vehicle damage.",
    keyBenefits: [
      "Third-party liability coverage",
      "Own damage protection",
      "Cashless garage facilities",
      "Theft protection",
      "Add-on riders",
    ],
    suitableFor: "Individual vehicle owners and fleet operators.",
  },
  {
    icon: Truck,
    title: "Commercial Vehicle Insurance",
    overview:
      "Protection for trucks, buses, taxis, logistics vehicles, and commercial fleets.",
    keyBenefits: [
      "Vehicle damage protection",
      "Third-party liability",
      "Driver protection",
      "Business continuity",
      "Fleet management support",
    ],
    suitableFor: "Transport operators and commercial vehicle owners.",
  },
  {
    icon: Heart,
    title: "Health Insurance",
    overview:
      "Coverage for hospitalization expenses, surgeries, treatments, diagnostics, and medical emergencies.",
    keyBenefits: [
      "Cashless hospitalization",
      "Pre & post hospitalization cover",
      "Family floater options",
      "Tax benefits",
      "Critical illness add-ons",
    ],
    suitableFor: "Individuals, families, senior citizens, and corporate employees.",
  },
  {
    icon: TrendingUp,
    title: "Term Insurance",
    overview:
      "Pure life protection providing financial support to dependents in case of the policyholder's demise.",
    keyBenefits: [
      "High coverage at affordable premiums",
      "Income replacement",
      "Family financial security",
      "Loan protection",
      "Long-term protection",
    ],
    suitableFor: "Working professionals, business owners, and primary earners.",
  },
  {
    icon: Shield,
    title: "Life Insurance",
    overview: "Combines protection and long-term financial planning.",
    keyBenefits: [
      "Wealth creation",
      "Family security",
      "Savings discipline",
      "Goal-based planning",
      "Tax efficiency",
    ],
    suitableFor: "Individuals seeking both protection and long-term financial planning.",
  },
  {
    icon: Landmark,
    title: "Pension Schemes",
    overview:
      "Insurance-linked retirement solutions designed to generate post-retirement income.",
    keyBenefits: [
      "Retirement corpus creation",
      "Guaranteed income options",
      "Long-term security",
      "Tax advantages",
      "Financial independence",
    ],
    suitableFor: "Professionals, business owners, and retirees.",
  },
  {
    icon: Plane,
    title: "Travel Insurance",
    overview: "Protection against travel-related emergencies and uncertainties.",
    keyBenefits: [
      "Medical emergency coverage",
      "Trip cancellation protection",
      "Lost baggage assistance",
      "Passport loss coverage",
      "International support",
    ],
    suitableFor: "Domestic and international travelers.",
  },
  {
    icon: Home,
    title: "Home & Shop Insurance",
    overview:
      "Protection for residential and commercial properties against damage and losses.",
    keyBenefits: [
      "Fire protection",
      "Theft coverage",
      "Natural disaster coverage",
      "Asset protection",
      "Business interruption support",
    ],
    suitableFor: "Homeowners, shop owners, and property investors.",
  },
  {
    icon: Building2,
    title: "Industrial Insurance",
    overview:
      "Comprehensive risk management solutions for factories, warehouses, plants, and industrial operations.",
    keyBenefits: [
      "Property protection",
      "Machinery breakdown cover",
      "Liability protection",
      "Business interruption coverage",
      "Employee-related risk coverage",
    ],
    suitableFor: "Manufacturing units, industrial facilities, and enterprises.",
  },
];

const retirementBenefits = [
  "Corpus Calculation Based on Lifestyle Needs",
  "Multiple Income Stream Creation",
  "Inflation-Adjusted Planning",
  "Healthcare Cost Coverage",
  "Legacy & Estate Planning",
];

const retirementProcess = [
  { step: "Step 1", title: "Lifestyle Analysis", description: "Understanding expected retirement lifestyle and financial goals." },
  { step: "Step 2", title: "Corpus Calculation", description: "Estimating the amount required for long-term retirement sustainability." },
  { step: "Step 3", title: "Investment Strategy", description: "Building a diversified retirement-focused portfolio." },
  { step: "Step 4", title: "Income Planning", description: "Creating sustainable post-retirement cash flows." },
  { step: "Step 5", title: "Estate Planning", description: "Structuring wealth transfer and succession planning." },
];

const retirementOfferings = [
  {
    title: "SWP (Systematic Withdrawal Plan)",
    description: "A structured withdrawal strategy allowing investors to generate regular income while maintaining long-term investment growth.",
    benefits: ["Monthly income", "Tax-efficient withdrawals", "Capital appreciation potential", "Flexible withdrawal options"],
  },
  {
    title: "Senior Citizen Instruments",
    description: "Investment products specifically designed for retired individuals seeking stability and income.",
    benefits: ["Regular income", "Capital safety", "Government-backed options", "Lower risk profile"],
  },
  {
    title: "Pension Plans",
    description: "Long-term retirement solutions focused on wealth accumulation and retirement income generation.",
    benefits: ["Retirement corpus building", "Lifetime income options", "Financial independence", "Tax benefits"],
  },
  {
    title: "Government Schemes",
    description: "Retirement-oriented government initiatives supporting long-term financial security. Examples: NPS, Senior Citizen Savings Scheme, PM Vaya Vandana Yojani, Atal Pension Yojana",
    benefits: ["Government-backed security", "Stable returns", "Retirement income support", "Long-term wealth preservation"],
  },
];

const faqItems = [
  {
    question: "Why do I need insurance planning?",
    answer: "Insurance planning helps protect wealth, income, assets, and family goals against unforeseen risks.",
  },
  {
    question: "How much life insurance coverage should I have?",
    answer: "Coverage should generally be aligned with income replacement needs, liabilities, future goals, and family expenses.",
  },
  {
    question: "Is health insurance necessary if my employer provides coverage?",
    answer: "Yes. Employer coverage may not be sufficient or portable during career transitions.",
  },
  {
    question: "How often should insurance policies be reviewed?",
    answer: "At least once a year or after major life events such as marriage, childbirth, home purchase, or retirement.",
  },
  {
    question: "Do you assist during claims?",
    answer: "Yes. We provide guidance and support throughout the claims process.",
  },
];

const partners = {
  life: ["LIC", "HDFC Life", "ICICI Prudential Life", "SBI Life", "Max Life", "Tata AIA", "Bajaj Allianz Life"],
  general: ["ICICI Lombard", "HDFC ERGO", "Bajaj Allianz General", "Tata AIG", "Reliance General", "SBI General", "New India Assurance"],
  health: ["Star Health", "Care Health Insurance", "Niva Bupa", "Aditya Birla Health", "ManipalCigna"],
};

const InsurancePage = () => {
  const [expandedOffering, setExpandedOffering] = useState<number | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <StockTicker />

      {/* Hero section */}
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
              Protection Strategy
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight">
              Protect Today.{" "}
              <span className="gold-text">Secure Tomorrow.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground/90 max-w-2xl mx-auto font-light leading-relaxed">
              Comprehensive insurance solutions designed to protect your family, health, assets, business, and future financial goals.
            </p>
            <p className="text-base md:text-lg text-muted-foreground/80 max-w-2xl mx-auto font-light leading-relaxed">
              Insurance is not merely a financial product—it is a protection strategy. Our insurance advisory services help individuals, families, and businesses identify risks, bridge coverage gaps, and select suitable insurance solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-6">
              <Button
                asChild
                size="lg"
                className="gold-gradient text-primary-foreground hover:opacity-90 font-semibold text-xs uppercase tracking-wider px-8 h-12 rounded-sm shadow-md transition-all duration-200"
              >
                <Link to="/contact" className="inline-flex items-center gap-2">
                  Explore Insurance Solutions
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="font-semibold text-xs uppercase tracking-wider px-8 h-12 rounded-sm border-border/50 hover:border-primary/50 transition-all duration-200"
              >
                <Link to="/contact">Schedule Consultation</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Insurance Advisory */}
      <section className="py-24 border-b border-border/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <span className="text-primary font-semibold text-xs tracking-wider uppercase block">Why Insurance Matters</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold">
                <span className="gold-text">Protecting Your Wealth</span> and Goals Against Uncertainty
              </h2>
              <div className="h-[2px] w-20 bg-primary/50 rounded" />
              
              <div className="space-y-6 text-muted-foreground/90 text-base md:text-lg font-light leading-relaxed">
                <p>
                  Life is unpredictable. A well-structured insurance portfolio protects your loved ones, preserves wealth, minimizes financial shocks, and ensures continuity of your financial goals even during unforeseen circumstances.
                </p>
                <p>
                  At Alpha Investment Management, we provide objective insurance guidance based on individual needs rather than product sales. Our focus is on comprehensive protection planning, periodic reviews, and claims support throughout the policy lifecycle.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-28 bg-secondary/10 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20 space-y-4"
          >
            <span className="text-primary font-semibold text-xs tracking-wider uppercase">Our Advantages</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              Key Benefits of Our <span className="gold-text">Insurance Advisory</span>
            </h2>
            <p className="text-muted-foreground/80 text-base md:text-lg max-w-2xl mx-auto font-light">
              Premium protection strategies engineered to safeguard your wealth, health, assets, and family's financial future with institutional-grade expertise.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="glass-card rounded-2xl p-6 border border-transparent flex flex-col justify-between hover-glow hover:border-primary/40 transition-all duration-300 group shadow-md"
              >
                <div>
                  {/* Premium circular icon area with gradient border glow */}
                  <div className="relative w-20 h-20 mx-auto mb-6">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/60 to-amber-500/20 p-[2px] transition-transform duration-500 group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(218,165,32,0.15)]">
                      <div className="w-full h-full rounded-full bg-[#030712] flex items-center justify-center overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-60" />
                        <Shield className="h-9 w-9 text-primary/95 group-hover:text-primary transition-colors duration-300" />
                      </div>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-center text-foreground group-hover:text-primary transition-colors duration-300">{benefit.title}</h3>
                  
                  <p className="text-xs font-light text-center text-muted-foreground/85 mt-3 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-24 border-b border-border/10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-primary font-semibold text-xs tracking-wider uppercase block mb-3">Structured Approach</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold">
                Our <span className="gold-text">Insurance Advisory Process</span>
              </h2>
              <div className="h-[2px] w-20 bg-primary/50 rounded mt-5" />
            </motion.div>

            <div className="grid md:grid-cols-5 gap-4">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="glass-card rounded-2xl p-6 border border-transparent flex flex-col justify-between hover-glow hover:border-primary/40 transition-all duration-300 group shadow-md relative"
                >
                  <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-tr from-primary/60 to-amber-500/20 p-[2px] transition-transform duration-500 group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(218,165,32,0.15)]">
                      <div className="w-full h-full rounded-full bg-[#030712] flex items-center justify-center overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-60" />
                        <span className="text-xs font-bold font-display tracking-widest text-primary/95 group-hover:text-primary transition-colors duration-300">
                          {step.number}
                        </span>
                      </div>
                    </div>
                  <h3 className="text-sm font-semibold text-foreground pt-2">{step.title}</h3>
                  <p className="text-xs text-muted-foreground/80 leading-relaxed font-light flex-grow">
                    {step.description}
                  </p>
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute -right-2 top-1/2 w-4 h-4 border-t border-r border-border/50 transform -translate-y-1/2 rotate-45" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Insurance Offerings Section */}
      <section className="py-24 border-b border-border/10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-primary font-semibold text-xs tracking-wider uppercase block mb-3">Protection Portfolio</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold">
                Comprehensive <span className="gold-text">Insurance Offerings</span>
              </h2>
              <div className="h-[2px] w-20 bg-primary/50 rounded mt-5" />
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {insuranceOfferings.map((offering, index) => {
                const Icon = offering.icon;
                const isExpanded = expandedOffering === index;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.06, duration: 0.5 }}
                    className="glass-card rounded-2xl border border-transparent overflow-hidden hover-glow hover:border-primary/40 transition-all duration-300 group shadow-md"
                  >
                    <button
                      onClick={() => setExpandedOffering(isExpanded ? null : index)}
                      className="w-full p-6 text-left hover:bg-card/50 transition-colors duration-200"
                      aria-expanded={isExpanded}
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center flex-shrink-0">
                          <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                        </div>
                        <ChevronDown
                          className={`h-4 w-4 text-muted-foreground/50 transition-transform duration-300 flex-shrink-0 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                          aria-hidden="true"
                        />
                      </div>
                      <h3 className="text-sm font-semibold text-foreground mb-2">{offering.title}</h3>
                      <p className="text-xs text-muted-foreground/80 leading-relaxed font-light">
                        {offering.overview.substring(0, 80)}...
                      </p>
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-border/30 overflow-hidden bg-card/30"
                        >
                          <div className="p-6 space-y-4">
                            <div>
                              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-2">Overview</h4>
                              <p className="text-xs text-muted-foreground/80 leading-relaxed font-light">
                                {offering.overview}
                              </p>
                            </div>

                            <div>
                              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-2">Key Benefits</h4>
                              <ul className="space-y-1.5">
                                {offering.keyBenefits.map((benefit, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <Check className="h-3 w-3 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                                    <span className="text-xs text-muted-foreground/80 font-light">{benefit}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-1">Suitable For</h4>
                              <p className="text-xs text-muted-foreground/80 font-light">{offering.suitableFor}</p>
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
        </div>
      </section>

      {/* Retirement & Insurance Planning Section */}
      <section className="py-24 border-b border-border/10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-primary font-semibold text-xs tracking-wider uppercase block mb-3">Retirement Security</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold">
                Retirement Planning &<span className="gold-text"> Income Protection</span>
              </h2>
              <div className="h-[2px] w-20 bg-primary/50 rounded mt-5" />
              <p className="text-muted-foreground/90 text-base md:text-lg leading-relaxed font-light mt-6">
                Secure your retirement years through strategic planning, income generation, healthcare preparedness, and wealth transfer solutions.
              </p>
            </motion.div>

            {/* Key Benefits */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-6">Key Benefits</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {retirementBenefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.06, duration: 0.4 }}
                    className="flex items-start gap-3 p-4 rounded-sm border border-border/30 hover:border-primary/50 transition-colors"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span className="text-xs md:text-sm text-muted-foreground/80 font-light">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Retirement Planning Process */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-6">Retirement Planning Process</h3>
              <div className="grid md:grid-cols-5 gap-4">
                {retirementProcess.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08, duration: 0.4 }}
                    className="glass-card rounded-2xl p-4 space-y-2 text-center border border-transparent relative hover-glow hover:border-primary/40 transition-all duration-300 group shadow-md"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{item.step}</span>
                    <h4 className="text-xs font-semibold text-foreground">{item.title}</h4>
                    <p className="text-[11px] text-muted-foreground/70 leading-tight font-light">{item.description}</p>
                    {index < retirementProcess.length - 1 && (
                      <div className="hidden md:block absolute -right-2 top-1/2 w-4 h-4 border-t border-r border-border/50 transform -translate-y-1/2 rotate-45" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Retirement Offerings */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-6">Retirement Offerings</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {retirementOfferings.map((offering, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08, duration: 0.5 }}
                    className="glass-card rounded-2xl p-6 space-y-4 border border-transparent hover-glow hover:border-primary/40 transition-all duration-300 group shadow-md"
                  >
                    <h4 className="text-sm font-semibold text-foreground">{offering.title}</h4>
                    <p className="text-xs md:text-sm text-muted-foreground/80 leading-relaxed font-light">
                      {offering.description}
                    </p>
                    <div className="space-y-2 pt-2">
                      {offering.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Check className="h-3 w-3 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                          <span className="text-xs text-muted-foreground/80 font-light">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance Partners Section */}
      <section className="py-24 border-b border-border/10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <span className="text-primary font-semibold text-xs tracking-wider uppercase block mb-3">Trusted Partners</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                <span className="gold-text">Insurance Partners</span>
              </h2>
              <div className="h-[2px] w-20 bg-primary/50 rounded mx-auto mb-6" />
              <p className="text-muted-foreground/90 text-base md:text-lg leading-relaxed font-light max-w-2xl mx-auto">
                We collaborate with leading insurance providers to deliver reliable protection solutions across life, health, motor, travel, property, and business insurance segments.
              </p>
            </motion.div>

            {/* Life Insurance Partners */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Life Insurance Partners</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {partners.life.map((partner, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.04 }}
                    className="glass-card rounded-2xl p-4 text-center border border-transparent hover-glow hover:border-primary/40 transition-all duration-300 group shadow-md"
                  >
                    <p className="text-xs font-semibold text-foreground">{partner}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 border-b border-border/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-primary font-semibold text-xs tracking-wider uppercase block mb-3">Common Questions</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold">
                Frequently Asked <span className="gold-text">Questions</span>
              </h2>
              <div className="h-[2px] w-20 bg-primary/50 rounded mt-5" />
            </motion.div>

            <div className="space-y-2 divide-y divide-border/25">
              {faqItems.map((item, index) => {
                const isExpanded = expandedFaq === index;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <button
                      onClick={() => setExpandedFaq(isExpanded ? null : index)}
                      className="w-full py-4 flex items-center justify-between gap-3 text-left group hover:text-primary transition-colors"
                      aria-expanded={isExpanded}
                    >
                      <h3 className={`text-sm md:text-base font-semibold transition-colors ${
                        isExpanded ? "text-primary" : "group-hover:text-primary"
                      }`}>
                        {item.question}
                      </h3>
                      <ChevronDown
                        className={`h-4 w-4 text-primary transition-transform duration-300 flex-shrink-0 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      />
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden pb-4"
                        >
                          <p className="text-muted-foreground/90 text-sm leading-relaxed font-light pt-2">
                            {item.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </div>
  );
};

export default InsurancePage;
