import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/empanelment", label: "Empanelment" },
  { href: "/contact", label: "Contact" },
];

const services = [
  "Investment Management",
  "Financial Planning",
  "Loan Services",
  "Insurance Solutions",
  "Tax Planning",
  "Retirement Planning",
];

const MediumIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M13.54 12c0 3.77-3.03 6.82-6.77 6.82S0 15.77 0 12s3.03-6.82 6.77-6.82 6.77 3.05 6.77 6.82zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42zm3.04 0c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75c.66 0 1.19 2.58 1.19 5.75z" />
  </svg>
);

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { toast } = useToast();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubscribing(true);
    
    // Simulate subscription delay
    setTimeout(() => {
      setIsSubscribing(false);
      setEmail("");
      toast({
        title: "Thank you for subscribing!",
        description: "You'll receive the latest financial insights in your inbox.",
      });
    }, 800);
  };

  return (
    <footer className="bg-[#020617] border-t border-border/15 pt-20">
      {/* Main footer content */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Company info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Link to="/" className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full overflow-hidden flex items-center justify-center shadow-lg border border-primary/30">
                <img src="/logo-circular1.png" alt="Alpha Investment Management" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-[11px] font-display font-extrabold gold-text leading-tight uppercase tracking-[0.2em]">
                  Alpha Investment
                </h3>
              </div>
            </Link>
            
            <p className="text-muted-foreground/80 text-sm leading-relaxed font-light max-w-sm">
              Your fiduciary partner for bespoke wealth management and strategic capital preservation. Guiding families and individuals towards secure financial legacies since 2014.
            </p>
            
            <div className="flex gap-2.5 pt-2">
              {[
                { icon: Linkedin, href: "#", name: "LinkedIn" },
                { icon: Twitter, href: "#", name: "Twitter/X" },
                { icon: Facebook, href: "#", name: "Facebook" },
                { icon: Instagram, href: "#", name: "Instagram" },
                { icon: MediumIcon, href: "#", name: "Medium" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.name}
                  className="w-8 h-8 rounded-lg bg-slate-900/40 flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary border border-border/30 hover:border-primary/45 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:pl-8"
          >
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary/80 mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground/85 hover:text-primary transition-all duration-300 text-sm font-light inline-flex items-center gap-1 hover:translate-x-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary/80 mb-6">
              Our Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-muted-foreground/85 hover:text-primary transition-all duration-300 text-sm font-light inline-flex items-center gap-1 hover:translate-x-1"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary/80 mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3.5">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/5 border border-primary/20 flex items-center justify-center mt-1">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                </div>
                <span className="text-muted-foreground/80 text-xs md:text-sm leading-relaxed font-light">
                  Shop no 2, First Floor,<br />
                  Mahalungeker Complex, (opposite R K Wine shop),<br />
                  Mahalunge Ingale Kaman,<br />
                  Chakan-Talegaon Highway, Chakan,<br />
                  Pune 410501
                </span>
              </li>
              <li>
                <a href="tel:+919607509586" className="flex items-center gap-3.5 text-muted-foreground/85 hover:text-primary transition-colors group">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/5 border border-primary/20 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <Phone className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="text-xs md:text-sm font-medium">+91 9607509586</span>
                </a>
              </li>
              <li>
                <a href="mailto:alphainvestmentmnt@gmail.com" className="flex items-center gap-3.5 text-muted-foreground/85 hover:text-primary transition-colors group">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/5 border border-primary/20 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <Mail className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="text-xs md:text-sm font-medium truncate">alphainvestmentmnt@gmail.com</span>
                </a>
              </li>
              <li className="flex items-start gap-3.5">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/5 border border-primary/20 flex items-center justify-center mt-0.5">
                  <Clock className="h-3.5 w-3.5 text-primary" />
                </div>
                <span className="text-muted-foreground/80 text-xs md:text-sm leading-normal font-light">
                  Mon - Fri: 9am - 6pm <br />
                  Sat: 10am - 2pm
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 pt-16 border-t border-border/10"
        >
          <div className="max-w-xl mx-auto text-center space-y-5">
            <span className="text-[10px] uppercase tracking-[0.25em] text-primary font-bold">Insights</span>
            <h4 className="text-xl md:text-2xl font-display font-bold">Subscribe to Our Newsletter</h4>
            <p className="text-muted-foreground/80 text-sm max-w-md mx-auto font-light leading-relaxed">
              Receive bespoke wealth advice, regulatory compliance guidance, and periodic market commentary directly to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto items-center pt-4" onSubmit={handleNewsletterSubmit}>
              <Input
                type="email"
                placeholder="Enter your professional email"
                className="w-full bg-[#030712]/50 border-border/30 focus-visible:ring-primary/30 rounded-xl h-12 text-sm placeholder:text-muted-foreground/50 transition-all duration-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubscribing}
              />
              <Button 
                type="submit" 
                className="w-full sm:w-auto gold-gradient text-primary-foreground hover:opacity-95 font-semibold px-8 h-12 rounded-xl shadow-lg shadow-primary/5 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]" 
                disabled={isSubscribing}
              >
                {isSubscribing ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </motion.div>

        {/* Regulatory Compliance Note */}
        <div className="mt-16 pt-8 border-t border-border/10 text-center max-w-4xl mx-auto">
          <p className="text-[10px] text-muted-foreground/50 leading-relaxed uppercase tracking-[0.12em] font-light">
            Disclaimer: Investment in securities market are subject to market risks. Read all the related documents carefully before investing. Registration granted by SEBI, membership of BASL and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/10 bg-[#01040f] py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/75">
            <p>© 2026 Alpha Investment Management Services. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
              <Link to="/disclaimer" className="hover:text-primary transition-colors">Disclaimer</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
