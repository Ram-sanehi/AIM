import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { StockTicker } from "@/components/StockTicker";
import { Footer } from "@/components/Footer";
import { CTA } from "@/components/CTA";
import { 
  Target, 
  Eye, 
  Award, 
  Users, 
  TrendingUp, 
  Shield, 
  Heart,
  Lightbulb,
  Linkedin,
  Facebook,
  Instagram,
  ArrowRight
} from "lucide-react";

// Counter component for animated statistics
const Counter = ({ value, duration = 2 }: { value: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // Parse prefix, suffix and number (e.g., "₹300Cr+" -> prefix "₹", number 300, suffix "Cr+")
  const prefix = value.match(/^[^\d]+/)?.[0] || "";
  const suffix = value.match(/[^\d]+$/)?.[0] || "";
  const numericPart = parseInt(value.replace(/[^\d]/g, ""), 10) || 0;

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = numericPart;
      if (start === end) return;

      const totalMiliseconds = duration * 1000;
      const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 15);
      
      const timer = setInterval(() => {
        start += Math.ceil(end / (totalMiliseconds / incrementTime));
        if (start >= end) {
          clearInterval(timer);
          setCount(end);
        } else {
          setCount(start);
        }
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, numericPart, duration]);

  return (
    <span ref={ref} className="font-display font-bold text-4xl md:text-5xl lg:text-6xl gold-text tracking-tight block mb-2">
      {prefix}{count.toLocaleString("en-IN")}{suffix}
    </span>
  );
};

const milestones = [
  { year: "2014", title: "Founded", description: "Established with a commitment to bring institutional-grade financial guidance directly to families." },
  { year: "2017", title: "SEBI Registered", description: "Earned our SEBI Registered Investment Advisor status, establishing our legal fiduciary commitment to clients." },
  { year: "2020", title: "1,000 Families Served", description: "Honored to support 1,000+ client families in securing their financial independence." },
  { year: "2023", title: "₹100 Crores AUM", description: "Surpassed ₹100 Crores in assets under advisory, reflecting the growing confidence of our community." },
  { year: "2025", title: "Tech-Enabled Advisory", description: "Launched our refined digital wealth platform, blending personal advice with seamless execution." },
  { year: "2026", title: "Present Day", description: "Guiding 3,000+ client portfolios and managing over ₹300 Crores in assets with unwavering compliance." },
];

const values = [
  { 
    icon: Shield, 
    title: "Integrity First", 
    description: "Our word is our bond. We hold ourselves to the highest fiduciary standards, ensuring our actions always mirror our promises." 
  },
  { 
    icon: Users, 
    title: "Client-Centricity", 
    description: "Your goals dictate our strategies. Every recommendation is crafted with your family's financial well-being as our absolute north star." 
  },
  { 
    icon: Lightbulb, 
    title: "Continuous Innovation", 
    description: "Dynamic strategies for evolving markets. We combine time-tested wisdom with modern analysis to navigate shifting economic landscapes." 
  },
  { 
    icon: Heart, 
    title: "Unwavering Trust", 
    description: "Forged through absolute transparency. We believe lasting wealth is built on a foundation of clear communication and no hidden agendas." 
  },
];

const About = () => {
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
            className="max-w-4xl mx-auto text-center space-y-6"
          >
            <span className="text-primary text-xs uppercase tracking-widest font-semibold bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">
              Who We Are
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mt-4">
              Helping Families Build <br className="hidden md:inline" />
              <span className="gold-text">Financial Confidence</span> Since 2014
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground/90 max-w-2xl mx-auto font-light leading-relaxed">
              True wealth is not just about numbers; it is about the freedom, security, and peace of mind it brings. 
              We craft bespoke strategies designed to transform your life goals into an enduring financial legacy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 space-y-6"
            >
              <span className="text-primary font-semibold text-xs tracking-wider uppercase block">Our Heritage</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold">
                A Vision Born Out Of <span className="gold-text">Trust &amp; Fiduciary Responsibility</span>
              </h2>
              <div className="h-[2px] w-20 bg-primary/50 rounded" />
              
              <div className="space-y-6 text-muted-foreground/90 text-base md:text-lg font-light leading-relaxed">
                <p>
                  Alpha Investment Management was established with a singular, powerful belief: that institutional-grade financial guidance should be accessible to families and individual investors, not just large corporations.
                </p>
                <p>
                  Recognizing the widespread lack of transparent financial advisory in the market, our founder created a firm centered on strict regulatory compliance, client education, and customized strategic planning. We wanted to build a company that we would trust with our own families' hard-earned wealth.
                </p>
                <p>
                  Today, we guide over 3,000 client portfolios across India. We believe our growth is a simple reflection of our clients' success. By blending rigorous research with personal relationships, we design robust investment strategies that withstand market cycles.
                </p>
              </div>
            </motion.div>

            {/* Founder Spotlight Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5"
            >
              <div className="glass-card rounded-2xl p-8 border border-border/40 relative overflow-hidden group shadow-2xl">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full blur-xl pointer-events-none" />
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-amber-500/30 p-[1.5px]">
                      <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center font-display text-xl font-bold text-primary">
                        NP
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-foreground">Nageshwar Prasad</h4>
                      <p className="text-xs text-primary font-semibold tracking-wider uppercase">Founder &amp; Business Head</p>
                    </div>
                  </div>
                  
                  <blockquote className="text-sm italic text-muted-foreground/90 leading-relaxed border-l-2 border-primary/40 pl-4 py-1">
                    "True wealth advisory is not about chasing short-term speculation. It is about constructing resilient, custom portfolios that safeguard your family's future, built entirely on transparency and absolute alignment of interest."
                  </blockquote>

                  <div className="pt-4 border-t border-border/20 flex justify-between items-center text-xs text-muted-foreground font-mono">
                    <span>SEBI Registered Advisor</span>
                    <span>Est. 2014</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Institutional Statistics Banner */}
      <section className="py-16 bg-secondary/15 border-y border-border/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center divide-y md:divide-y-0 md:divide-x divide-border/20">
            <div className="pt-4 md:pt-0">
              <Counter value="10+" />
              <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Years Experience</div>
            </div>
            <div className="pt-4 md:pt-0 md:pl-4">
              <Counter value="3000+" />
              <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Happy Clients</div>
            </div>
            <div className="pt-4 md:pt-0 md:pl-4">
              <Counter value="₹300Cr+" />
              <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Assets Managed</div>
            </div>
            <div className="pt-4 md:pt-0 md:pl-4">
              <Counter value="100%" />
              <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Compliance Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-28 bg-secondary/10 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20 space-y-4"
          >
            <span className="text-primary font-semibold text-xs tracking-wider uppercase">Our Experts</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              Meet Our <span className="gold-text">Leadership Team</span>
            </h2>
            <p className="text-muted-foreground/80 text-base md:text-lg max-w-2xl mx-auto font-light">
              Distinguished credentials, deep market intelligence, and an unwavering commitment to your financial growth.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Nageshwar Prasad",
                role: "Founder & Business Head",
                initials: "NP",
                qualifications: [
                  "SEBI Registered Investment Advisor & Portfolio Manager",
                  "CFA Level II Candidate",
                  "Master's in Finance – Henley Business School, London, UK",
                  "AMFI & IRDA Approved Distributor",
                  "10+ Years of Experience in Investment Management",
                ],
                social: {
                  linkedin: "https://linkedin.com",
                  facebook: "https://www.facebook.com/shalini.malhotra.50767984/",
                  instagram: "https://www.instagram.com/alphainvestmentmanagement?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                }
              },
              {
                name: "Sonali Malhotra",
                role: "Head of Risk Management",
                initials: "SM",
                qualifications: [
                  "Chartered Accountant (CA)",
                  "Master of Commerce (M.Com)",
                  "NISM Certified Wealth Analyst",
                  "7+ Years of Experience in Insurance & Risk Advisory",
                ],
                social: {
                  linkedin: "https://linkedin.com",
                  facebook: "https://www.facebook.com/shalini.malhotra.50767984/",
                  instagram: "https://www.instagram.com/alphainvestmentmanagement?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                }
              },
              {
                name: "Rahul Jain",
                role: "Relationship Manager",
                initials: "RJ",
                qualifications: [
                  "Master of Commerce (M.Com)",
                  "NISM Certified Advisor",
                  "Expertise in Client Relationship & Wealth Advisory",
                  "5+ Years in Tailored Financial Planning",
                ],
                social: {
                  linkedin: "https://linkedin.com",
                  facebook: "https://www.facebook.com/shalini.malhotra.50767984/",
                  instagram: "https://www.instagram.com/alphainvestmentmanagement?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                }
              },
              {
                name: "Advocate Rajat Diwan",
                role: "Compliance Officer",
                initials: "RD",
                qualifications: [
                  "Bachelor of Laws (LLB)",
                  "Master of Arts (MA)",
                  "Legal & Regulatory Compliance Specialist",
                  "Oversees Strict Adherence to SEBI Frameworks",
                ],
                social: {
                  linkedin: "https://linkedin.com",
                  facebook: "https://www.facebook.com/shalini.malhotra.50767984/",
                  instagram: "https://www.instagram.com/alphainvestmentmanagement?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                }
              },
            ].map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="glass-card rounded-2xl p-6 border border-border/30 flex flex-col justify-between hover-glow hover:border-primary/40 transition-all duration-300 group shadow-md"
              >
                <div className="flex flex-col h-full justify-between">
                  <div>
                    {/* Premium circular profile image placeholder */}
                    <div className="relative w-24 h-24 mx-auto mb-6">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/60 to-amber-500/20 p-[2px] transition-transform duration-500 group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(218,165,32,0.15)]">
                        <div className="w-full h-full rounded-full bg-[#030712] flex items-center justify-center overflow-hidden relative">
                          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-60" />
                          <span className="text-xl font-bold font-display tracking-widest text-primary/95 group-hover:text-primary transition-colors duration-300">
                            {member.initials}
                          </span>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-center text-foreground group-hover:text-primary transition-colors duration-300">{member.name}</h3>
                    <p className="text-xs font-semibold text-primary/80 uppercase tracking-widest text-center mt-1 mb-6 border-b border-border/20 pb-3">{member.role}</p>
                    
                    <ul className="space-y-2.5 text-left mb-4">
                      {member.qualifications.map((qual, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary/70 shrink-0 text-xs mt-0.5">•</span>
                          <span className="text-[11px] leading-relaxed text-muted-foreground/90 font-light">{qual}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-center gap-3 mt-6 pt-4 border-t border-border/15">
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-[#030712] border border-border/60 hover:border-primary/60 flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-300"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                    <a
                      href={member.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-[#030712] border border-border/60 hover:border-primary/60 flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-300"
                      aria-label="Facebook"
                    >
                      <Facebook className="h-4 w-4" />
                    </a>
                    <a
                      href={member.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-[#030712] border border-border/60 hover:border-primary/60 flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-300"
                      aria-label="Instagram"
                    >
                      <Instagram className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 bg-gradient-to-b from-background to-secondary/15 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Mission Card (Sleek Dark Premium Solid) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-b from-slate-900/30 to-slate-950/40 border border-border/40 rounded-2xl p-8 md:p-10 hover-glow hover:border-primary/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center mb-6 bg-primary/5">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-2xl font-display font-bold mb-4">Our Mission</h3>
                <p className="text-muted-foreground/90 text-sm md:text-base leading-relaxed font-light">
                  To empower families and individuals with the fiduciary advice, robust tools, and disciplined investment strategies they require to master financial independence. We are committed to absolute transparency, creating long-term capital compounding and sustainable peace of mind for every legacy we help build.
                </p>
              </div>
            </motion.div>

            {/* Vision Card (High Contrast Glassmorphic Card with subtle ambient border glow) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card rounded-2xl p-8 md:p-10 border border-primary/20 hover-glow hover:border-primary/40 transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
              <div>
                <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center mb-6 bg-primary/10 shadow-[0_0_15px_rgba(218,165,32,0.1)]">
                  <Eye className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-2xl font-display font-bold mb-4">Our Vision</h3>
                <p className="text-muted-foreground/90 text-sm md:text-base leading-relaxed font-light">
                  To be recognized as India's premier boutique wealth advisory firm, respected for our absolute dedication to client success, uncompromising ethical frameworks, and cutting-edge market intelligence. We aim to construct a community of secure, informed, and confident investors who compound wealth across generations.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline / Milestones Section */}
      <section className="py-28 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20 space-y-4"
          >
            <span className="text-primary font-semibold text-xs tracking-wider uppercase">Our Journey</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              Milestones That <span className="gold-text">Define Our Growth</span>
            </h2>
          </motion.div>

          <div className="relative max-w-5xl mx-auto">
            {/* Central glowing vertical timeline line */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-[2px] bg-gradient-to-b from-primary/10 via-primary/50 to-primary/10 pointer-events-none" />
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.6 }}
                  className={`flex flex-col md:flex-row gap-8 items-start md:items-center relative ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Left or Right card placement */}
                  <div className={`flex-1 w-full pl-8 md:pl-0 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <div className="glass-card rounded-2xl p-6 md:p-8 border border-border/30 inline-block text-left hover-glow hover:-translate-y-1 hover:border-primary/40 transition-all duration-300 w-full max-w-md shadow-md">
                      <span className="text-2xl font-bold font-display gold-text tracking-tight block mb-2">{milestone.year}</span>
                      <h3 className="text-lg font-bold text-foreground mb-2">{milestone.title}</h3>
                      <p className="text-xs md:text-sm text-muted-foreground/90 font-light leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>

                  {/* Central glowing dot indicator */}
                  <div className="absolute left-[9px] md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-slate-950 border-2 border-primary flex items-center justify-center z-10">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-ping absolute opacity-70" />
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>

                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-28 bg-secondary/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20 space-y-4"
          >
            <span className="text-primary font-semibold text-xs tracking-wider uppercase">What We Stand For</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              Our Core <span className="gold-text">Foundational Principles</span>
            </h2>
            <p className="text-muted-foreground/80 text-base md:text-lg max-w-2xl mx-auto font-light">
              These shared values guide every strategic decision, analysis, and advisor conversation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.6 }}
                className="relative group overflow-hidden bg-slate-900/10 border border-border/30 rounded-2xl p-8 hover:bg-slate-900/30 transition-all duration-300 hover:border-primary/30 flex flex-col justify-between shadow-md"
              >
                {/* Subtle animated border slide-across line on card bottom */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-500" />
                
                <div>
                  <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center mb-6 bg-primary/5 group-hover:bg-primary/10 transition-colors">
                    <value.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">{value.title}</h3>
                  <p className="text-muted-foreground/90 text-xs md:text-sm leading-relaxed font-light">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </div>
  );
};

export default About;
