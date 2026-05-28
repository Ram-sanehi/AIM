import { motion } from "framer-motion";
import { 
  TrendingUp, 
  PiggyBank, 
  Shield, 
  Building2, 
  Calculator, 
  Briefcase,
  ArrowRight 
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: TrendingUp,
    title: "Investment Management",
    description: "Strategic portfolio management with diversified investment solutions for optimal returns.",
    features: ["Equity & Debt Funds", "Portfolio Rebalancing", "Risk Assessment"],
  },
  {
    icon: PiggyBank,
    title: "Financial Planning",
    description: "Comprehensive financial planning to achieve your short-term and long-term goals.",
    features: ["Goal-based Planning", "Cash Flow Analysis", "Budget Management"],
  },
  {
    icon: Building2,
    title: "Loan Services",
    description: "Access to competitive loan products for personal, home, and business needs.",
    features: ["Home Loans", "Personal Loans", "Business Financing"],
  },
  {
    icon: Shield,
    title: "Insurance & Risk Management",
    description: "Protect your family and assets with comprehensive insurance solutions.",
    features: ["Life Insurance", "Health Coverage", "General Insurance"],
  },
  {
    icon: Calculator,
    title: "Tax Mitigation Strategy",
    description: "Optimize your tax liabilities with strategic planning and ELSS investments.",
    features: ["Tax Planning", "ELSS Investments", "80C Optimization"],
  },
  {
    icon: Briefcase,
    title: "Retirement Planning",
    description: "Secure your golden years with tailored retirement and estate planning.",
    features: ["NPS & PPF", "Pension Plans", "Estate Planning"],
  },
];

export function Services() {
  const buttonLabels = ["Explore Service", "View Details", "Understand More"];

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Comprehensive <span className="gold-text">Financial Solutions</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            We offer a complete range of financial services designed to help you achieve 
            your financial objectives and secure your future.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="group glass-card rounded-2xl p-8 hover-glow transition-all duration-350 hover:-translate-y-2 hover:border-primary/45 border border-white/5 bg-card/25 hover:shadow-[0_10px_30px_rgba(218,165,32,0.12)] flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                  <service.icon className="h-5.5 w-5.5 text-primary-foreground" />
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-xs md:text-sm leading-relaxed text-muted-foreground mb-5">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-xs text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/70" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2">
                <Link 
                  to="/services" 
                  className="inline-flex items-center gap-1.5 text-primary text-xs font-semibold uppercase tracking-wider hover:gap-2.5 transition-all duration-300"
                >
                  {buttonLabels[index % buttonLabels.length]} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Button asChild size="lg" className="gold-gradient text-primary-foreground hover:opacity-95 text-base px-8 py-6 shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
            <Link to="/services">
              View All Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
