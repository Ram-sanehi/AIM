import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/insurance", label: "Insurance" },
  { href: "/empanelment", label: "Empanelment" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Floating Header */}
      <motion.header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#030B22]/90 backdrop-blur-md border-b border-[#D4AF37]/20 shadow-md"
            : "bg-[#030B22]/5 backdrop-blur-md border-b border-[#D4AF37]/10"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Top bar (only visible when not scrolled) */}
        {!scrolled && (
          <div className="hidden md:block bg-[#030B22]/10 border-b border-white/5">
            <div className="container mx-auto px-4 py-1.5 flex justify-between items-center text-[11px] tracking-wide">
              <div className="flex items-center gap-6 text-muted-foreground/80">
                <a href="tel:+919607509586" className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors">
                  <Phone className="h-3 w-3 text-[#D4AF37]/85" />
                  +91 9607509586
                </a>
                <a href="mailto:alphainvestmentmnt@gmail.com" className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors">
                  <Mail className="h-3 w-3 text-[#D4AF37]/85" />
                  alphainvestmentmnt@gmail.com
                </a>
              </div>
              <div className="text-muted-foreground/80">
                Mon - Sat: 9:00 AM - 6:00 PM
              </div>
            </div>
          </div>
        )}

        <div className="container mx-auto px-4">
          <div className={`flex items-center justify-between transition-all duration-300 ${
            scrolled ? "h-14" : "h-17"
          }`}>
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg border border-[#D4AF37]/20 bg-slate-950">
                <img src="/logo-circular1.png" alt="Alpha Investment Management" width="44" height="44" className="w-full h-full object-cover" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-[13px] font-display font-bold gold-text tracking-widest leading-none uppercase">Alpha Investment</h1>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`relative text-[11px] font-semibold uppercase tracking-wider transition-colors py-1 hover:text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-[#D4AF37] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left after:duration-300 ${
                    location.pathname === link.href
                      ? "text-primary"
                      : "text-foreground/80"
                  }`}
                >
                  {link.label}
                  {location.pathname === link.href && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#D4AF37] rounded-full"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <Button asChild size="sm" className="gold-gradient text-primary-foreground hover:opacity-95 font-semibold text-[10px] uppercase tracking-widest px-5 h-8.5 rounded-sm shadow-md shadow-primary/5 hover:shadow-[#D4AF37]/15 transition-all duration-300 hover:scale-[1.02]">
                <Link to="/contact">Schedule Consultation</Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#030B22]/95 border-t border-[#D4AF37]/20 overflow-hidden backdrop-blur-xl"
            >
              <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={link.href}
                      className={`block py-2.5 px-4 rounded text-xs font-semibold uppercase tracking-wider transition-colors ${
                        location.pathname === link.href
                          ? "bg-[#D4AF37]/10 text-primary"
                          : "text-foreground hover:bg-[#030B22]/50 hover:text-primary"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                  className="pt-3"
                >
                  <Button asChild className="w-full gold-gradient text-primary-foreground font-semibold text-xs uppercase tracking-wider rounded-sm">
                    <Link to="/contact">Schedule Consultation</Link>
                  </Button>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
