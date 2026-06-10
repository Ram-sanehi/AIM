import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { StockTicker } from "@/components/StockTicker";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  Check,
  Star,
  MessageCircle
} from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Our Office",
    details: [
      "Shop no 2, First Floor",
      "Mahalungeker Complex, (opposite R K Wine shop)",
      "Mahalunge Ingale Kaman",
      "Chakan-Talegaon Highway, Chakan",
      "Pune 410501"
    ],
    isAddress: true
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+91 9607509586"],
    links: ["tel:+919607509586"],
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["alphainvestmentmnt@gmail.com"],
    links: ["mailto:alphainvestmentmnt@gmail.com"],
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: [
      "Monday - Friday: 9:00 AM - 6:00 PM",
      "Saturday: 10:00 AM - 2:00 PM",
      "Sunday: Closed"
    ],
    isHours: true
  },
];

const MediumIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M13.54 12c0 3.77-3.03 6.82-6.77 6.82S0 15.77 0 12s3.03-6.82 6.77-6.82 6.77 3.05 6.77 6.82zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42zm3.04 0c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75c.66 0 1.19 2.58 1.19 5.75z" />
  </svg>
);

const Contact = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      <StockTicker />
      <main>

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
              Get In Touch
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mt-4">
              Speak With Our <br className="hidden md:inline" />
              <span className="gold-text">Wealth Management Experts</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground/90 max-w-2xl mx-auto font-light leading-relaxed">
              Have questions about our wealth planning or investment strategies? Connect with our dedicated advisory team for a private consultation, tailored to establish long-term financial security.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-12 items-start">
            
            {/* Contact Info (Column 1) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6 lg:col-span-1"
            >
              <div className="space-y-2">
                <span className="text-primary font-semibold text-xs tracking-wider uppercase">Contact Details</span>
                <h2 className="text-2xl font-display font-bold">Connect Directly</h2>
                <p className="text-muted-foreground/80 text-sm font-light">
                  Reach out through any of our direct lines for assistance.
                </p>
              </div>

              <div className="space-y-5">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.5 }}
                    className="relative overflow-hidden glass-card rounded-2xl p-6 border border-border/30 hover:border-primary/45 hover:-translate-y-[2px] transition-all duration-300 shadow-sm flex items-start gap-5 group"
                  >
                    {/* Subtle animated border slide-across line on card bottom */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2.5px] bg-primary group-hover:w-full transition-all duration-500 z-10" />
                    <div className="w-12 h-12 rounded-xl border border-primary/20 bg-primary/5 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground mb-2 text-xs uppercase tracking-wider">{item.title}</h3>
                      <div className="space-y-1">
                        {item.details.map((detail, i) => (
                          item.links ? (
                            <a
                              key={i}
                              href={item.links[i]}
                              className="block text-muted-foreground/85 hover:text-primary transition-colors text-sm font-light leading-relaxed"
                            >
                              {detail}
                            </a>
                          ) : (
                            <div key={i} className="text-muted-foreground/85 text-sm font-light leading-relaxed">
                              {detail}
                              {item.isAddress && i < item.details.length - 1 && (
                                <span className="block border-b border-border/10 my-1.5" />
                              )}
                            </div>
                          )
                        ))}
                      </div>
                      {item.isHours && (
                        <span className="mt-3.5 inline-block text-[9px] font-bold text-primary uppercase tracking-[0.12em] bg-primary/5 px-2.5 py-1 rounded border border-primary/10">
                          Consultation by Appointment Available
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* WhatsApp Card */}
              <motion.a
                href="https://wa.me/919607509586?text=Hi%2C%20I%20would%20like%20to%20schedule%20a%20wealth%20management%20consultation."
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25, duration: 0.5 }}
                className="relative overflow-hidden glass-card rounded-2xl p-6 border border-border/30 hover:border-emerald-500/45 hover:-translate-y-[2px] transition-all duration-300 shadow-sm flex items-start gap-5 group block"
              >
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2.5px] bg-emerald-500 group-hover:w-full transition-all duration-500 z-10" />
                <div className="w-12 h-12 rounded-xl border border-emerald-500/30 bg-emerald-500/5 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <MessageCircle className="h-5 w-5 text-emerald-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground mb-1 text-xs uppercase tracking-wider">WhatsApp Us</h3>
                  <p className="text-muted-foreground/80 text-sm font-light leading-relaxed">
                    Chat directly with an advisor for a quick consultation or query.
                  </p>
                  <span className="mt-2 inline-block text-[9px] font-bold text-emerald-500 uppercase tracking-[0.12em] bg-emerald-500/5 px-2.5 py-1 rounded border border-emerald-500/15">
                    +91 9607509586
                  </span>
                </div>
              </motion.a>

              {/* Trust Badge Grid Card */}
              <div className="glass-card rounded-2xl p-6 border border-border/30 bg-[#030712]/30 space-y-4 shadow-sm group relative overflow-hidden transition-all duration-300 hover:border-primary/30">
                {/* Subtle animated border slide-across line on card bottom */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2.5px] bg-primary group-hover:w-full transition-all duration-500 z-10" />
                <h4 className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">Credibility & Fiduciary Standing</h4>
                <div className="grid grid-cols-2 gap-3.5 pt-1">
                  {[
                    "SEBI Registered Advisor",
                    "7+ Years Experience",
                    "3,000+ Clients Served",
                    "100% Transparent Fees"
                  ].map((badge) => (
                    <div key={badge} className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-primary/5 border border-primary/20 flex items-center justify-center shrink-0">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-[11px] text-muted-foreground/90 font-light">{badge}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Google Trust Badge Card */}
              <div className="glass-card rounded-2xl p-6 border border-primary/20 bg-slate-950/40 space-y-4 shadow-sm flex flex-col items-center text-center group relative overflow-hidden transition-all duration-300 hover:border-primary/30">
                {/* Subtle animated border slide-across line on card bottom */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2.5px] bg-primary group-hover:w-full transition-all duration-500 z-10" />
                <div className="flex items-center gap-2">
                  <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.18em] text-foreground">Google Business Rating</h4>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-1.5">
                    <span className="text-3xl font-display font-extrabold text-foreground">5.0</span>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                  <p className="text-[10px] text-muted-foreground/70 mt-1 font-light">Verified Client Reviews</p>
                </div>
                <a
                  href={import.meta.env.VITE_GOOGLE_PLACE_ID ? `https://search.google.com/local/reviews?placeid=${import.meta.env.VITE_GOOGLE_PLACE_ID}` : "https://www.google.com/maps/search/?api=1&query=Alpha+Investment+Management+Chakan+Pune"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl border border-border/30 hover:border-primary/45 text-[10px] font-bold tracking-wider text-muted-foreground hover:text-primary transition-all duration-300 bg-[#020617]/50 text-center"
                >
                  Verify on Google Maps
                </a>
              </div>

              {/* Social Links */}
              <div className="space-y-4 pt-2">
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">Follow Us</h4>
                  <p className="text-muted-foreground/80 text-[11px] font-light mt-1.5 leading-relaxed">
                    Stay connected for financial insights, market updates, and wealth management guidance.
                  </p>
                </div>
                <div className="flex gap-2.5">
                  {[
                    { icon: Linkedin, href: "#", name: "LinkedIn" },
                    { icon: Twitter, href: "https://x.com/alphaaim_in", name: "Twitter/X" },
                    { icon: Facebook, href: "https://www.facebook.com/shalini.malhotra.50767984/", name: "Facebook" },
                    { icon: Instagram, href: "https://www.instagram.com/alphainvestmentmanagement?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", name: "Instagram" },
                    { icon: MediumIcon, href: "https://medium.com/@mcp", name: "Medium" },
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target={social.href !== "#" ? "_blank" : undefined}
                      rel={social.href !== "#" ? "noopener noreferrer" : undefined}
                      aria-label={social.name}
                      className="w-9 h-9 rounded-lg bg-slate-900/40 border border-border/30 hover:border-primary/45 flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm"
                    >
                      <social.icon className="h-4.5 w-4.5" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form (Column 2-3) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="space-y-2 text-left">
                <span className="text-primary font-semibold text-xs tracking-wider uppercase">Inquiry form</span>
                <h2 className="text-2xl font-display font-bold">Send A Direct Message</h2>
                <p className="text-muted-foreground/80 text-sm font-light">
                  Submit details below, and an investment professional will coordinate a follow-up consultation.
                </p>
              </div>

              {/* Consultation Benefits Section */}
              <div className="grid sm:grid-cols-3 gap-4 p-5 rounded-2xl border border-primary/20 bg-slate-950/45 shadow-sm text-left">
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Fiduciary Fit
                  </h4>
                  <p className="text-[10px] text-muted-foreground/85 leading-relaxed font-light">
                    We evaluate your wealth goals under a strict fiduciary standard with zero third-party bias.
                  </p>
                </div>
                <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-border/10 pt-3 sm:pt-0 sm:pl-4">
                  <h4 className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Fee & Tax Audit
                  </h4>
                  <p className="text-[10px] text-muted-foreground/85 leading-relaxed font-light">
                    Get an audit of your current holdings for high-cost commissions and tax-optimization gaps.
                  </p>
                </div>
                <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-border/10 pt-3 sm:pt-0 sm:pl-4">
                  <h4 className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Legacy Blueprint
                  </h4>
                  <p className="text-[10px] text-muted-foreground/85 leading-relaxed font-light">
                    Receive clear guidance on structural compounding timelines, safety buffers, and risk metrics.
                  </p>
                </div>
              </div>

              <ContactForm />
            </motion.div>

          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 bg-gradient-to-b from-background via-slate-950/20 to-slate-950/40 border-t border-border/10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center md:text-left space-y-2">
              <span className="text-primary font-semibold text-xs tracking-wider uppercase">Directions</span>
              <h3 className="text-2xl md:text-3xl font-display font-bold">Office Map & Location</h3>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl overflow-hidden h-[400px] border border-border/30 shadow-md group relative hover:border-primary/30 transition-colors duration-300"
            >
              {/* Subtle animated border slide-across line on card bottom */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2.5px] bg-primary group-hover:w-full transition-all duration-500 z-10" />
              <iframe
                src="https://maps.google.com/maps?q=Shop%20no%202,%20First%20Floor,%20Mahalungeker%20Complex,%20(opposite%20R%20K%20Wine%20shop),%20Mahalunge%20Ingale%20Kaman,%20Chakan-Talegaon%20Highway,%20Chakan,%20Pune%20410501&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Alpha Investment Management - Office Location in Chakan, Pune"
                className="grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-in-out"
              />
            </motion.div>
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-slate-900/10 border border-border/20 rounded-2xl p-6 group relative overflow-hidden transition-all duration-300 hover:border-primary/30">
              {/* Subtle animated border slide-across line on card bottom */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2.5px] bg-primary group-hover:w-full transition-all duration-500 z-10" />
              <div className="text-center sm:text-left space-y-1">
                <p className="text-foreground text-sm font-semibold">Alpha Investment Management Services</p>
                <p className="text-muted-foreground/80 text-xs font-light">
                  Shop no 2, First Floor, Mahalungeker Complex, (opposite R K Wine shop), Mahalunge Ingale Kaman, Chakan-Talegaon Highway, Chakan, Pune 410501
                </p>
                <p className="text-[10px] text-primary/75 uppercase tracking-wide">Landmark: Opposite R K Wine Shop</p>
              </div>
              <a
                href="https://maps.google.com/?q=Chakan+Talegaon+Highway,+Chakan,+Pune"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl border border-primary/35 hover:bg-primary/5 text-primary text-xs font-semibold tracking-wide transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shrink-0"
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
};

export default Contact;
