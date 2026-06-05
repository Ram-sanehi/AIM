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
  Check
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
                    className="glass-card rounded-2xl p-6 border border-border/30 hover:border-primary/45 hover:-translate-y-[2px] transition-all duration-300 shadow-sm flex items-start gap-5 group"
                  >
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

              {/* Trust Badge Grid Card */}
              <div className="glass-card rounded-2xl p-6 border border-border/30 bg-[#030712]/30 space-y-4 shadow-sm">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">Credibility & Fiduciary Standing</h4>
                <div className="grid grid-cols-2 gap-3.5 pt-1">
                  {[
                    "SEBI Registered Advisor",
                    "10+ Years Experience",
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
                    { icon: Twitter, href: "#", name: "Twitter/X" },
                    { icon: Facebook, href: "https://www.facebook.com/shalini.malhotra.50767984/", name: "Facebook" },
                    { icon: Instagram, href: "https://www.instagram.com/alphainvestmentmanagement?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", name: "Instagram" },
                    { icon: MediumIcon, href: "#", name: "Medium" },
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
              <div className="space-y-2">
                <span className="text-primary font-semibold text-xs tracking-wider uppercase">Inquiry form</span>
                <h2 className="text-2xl font-display font-bold">Send A Direct Message</h2>
                <p className="text-muted-foreground/80 text-sm font-light">
                  Submit details below, and an investment professional will coordinate a follow-up consultation.
                </p>
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
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.0!2d73.55!3d18.73!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2ba0000000000%3A0x0!2sChakan%20Talegaon%20Highway%2C%20Chakan%2C%20Pune!5e0!3m2!1sen!2sin!4v1706460000000"
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
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-slate-900/10 border border-border/20 rounded-2xl p-6">
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

      <Footer />
    </div>
  );
};

export default Contact;
