import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Shield, Clock, ShieldCheck, Users, Award, Building2, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobileScreen(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Canvas particle system for tiny floating gold particles (gold dust)
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (canvas) {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }
    };
    window.addEventListener("resize", handleResize);

    const colors = ["#fbbf24", "#f59e0b", "#fef08a", "#d4af37", "#fef9c3"];
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      fadeSpeed: number;
      color: string;
    }> = [];

    // Create 100 gold glowing particles representing gold dust
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.4 + 0.8,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.6 + 0.1,
        fadeSpeed: (Math.random() - 0.5) * 0.002,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        // Add subtle random force (drift) to make motion dynamic/random
        p.speedX += (Math.random() - 0.5) * 0.015;
        p.speedY += (Math.random() - 0.5) * 0.015;

        // Clamp speed
        const limit = 0.6;
        p.speedX = Math.max(-limit, Math.min(limit, p.speedX));
        p.speedY = Math.max(-limit, Math.min(limit, p.speedY));

        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity += p.fadeSpeed;

        if (p.opacity <= 0.05 || p.opacity >= 0.8) {
          p.fadeSpeed = -p.fadeSpeed;
        }

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative min-h-[90vh] pt-16 pb-4 flex flex-col justify-between overflow-hidden bg-[#030B22]">
      
      {/* Background Canvas Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0 opacity-80" />

      {/* Blob glows (soft blurred gold radial glows) */}
      <div className="absolute top-[25%] left-[5%] w-[450px] h-[450px] bg-[#d4af37]/[0.015] rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[5%] w-[550px] h-[550px] bg-[#d4af37]/[0.03] rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Large diffused radial glow bloom (warm amber/gold light source behind threads) */}
      <div className="absolute top-[40%] left-[25%] -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,_rgba(245,158,11,0.06)_0%,_rgba(218,165,32,0.02)_40%,_transparent_70%)] blur-[100px] pointer-events-none z-0 mix-blend-screen" />

      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(3,11,34,0.85)_0%,_#030B22_100%)] z-0 pointer-events-none" />

      {/* Dynamic flowing golden waves/threads matching reference image curves */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 1200 600" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gold-thread-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d4af37" stopOpacity="0" />
            <stop offset="20%" stopColor="#d4af37" stopOpacity="0.02" />
            <stop offset="50%" stopColor="#f3e5ab" stopOpacity="0.20" />
            <stop offset="80%" stopColor="#d4af37" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="gold-thread-2" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#d4af37" stopOpacity="0" />
            <stop offset="30%" stopColor="#d4af37" stopOpacity="0.03" />
            <stop offset="60%" stopColor="#f3e5ab" stopOpacity="0.14" />
            <stop offset="90%" stopColor="#d4af37" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="gold-thread-3" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d4af37" stopOpacity="0" />
            <stop offset="40%" stopColor="#f3e5ab" stopOpacity="0.15" />
            <stop offset="80%" stopColor="#d4af37" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="gold-fanned-line" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d4af37" stopOpacity="0" />
            <stop offset="35%" stopColor="#d4af37" stopOpacity="0.03" />
            <stop offset="75%" stopColor="#f3e5ab" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Animated wispy threads (plasma streams) */}
        
        {/* Thread 1 */}
        <motion.path
          d="M -150,300 C 250,550 550,200 1350,220"
          fill="none"
          stroke="url(#gold-thread-1)"
          strokeWidth="0.8"
          animate={isMobileScreen ? undefined : {
            d: [
              "M -150,300 C 250,550 550,200 1350,220",
              "M -150,280 C 220,570 580,170 1350,200",
              "M -150,300 C 250,550 550,200 1350,220"
            ]
          }}
          transition={{
            duration: 32,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Thread 2 */}
        <motion.path
          d="M -150,320 C 230,520 570,220 1350,190"
          fill="none"
          stroke="url(#gold-thread-2)"
          strokeWidth="0.6"
          animate={isMobileScreen ? undefined : {
            d: [
              "M -150,320 C 230,520 570,220 1350,190",
              "M -150,340 C 260,500 540,240 1350,210",
              "M -150,320 C 230,520 570,220 1350,190"
            ]
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />

        {/* Thread 3 */}
        <motion.path
          d="M -150,280 C 270,580 530,180 1350,250"
          fill="none"
          stroke="url(#gold-thread-3)"
          strokeWidth="0.5"
          animate={isMobileScreen ? undefined : {
            d: [
              "M -150,280 C 270,580 530,180 1350,250",
              "M -150,290 C 240,590 560,150 1350,230",
              "M -150,280 C 270,580 530,180 1350,250"
            ]
          }}
          transition={{
            duration: 36,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        {/* Thread 4 */}
        <motion.path
          d="M -150,350 C 200,480 600,250 1350,160"
          fill="none"
          stroke="url(#gold-thread-1)"
          strokeWidth="0.5"
          animate={isMobileScreen ? undefined : {
            d: [
              "M -150,350 C 200,480 600,250 1350,160",
              "M -150,330 C 210,490 590,230 1350,180",
              "M -150,350 C 200,480 600,250 1350,160"
            ]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        />

        {/* Thread 5 */}
        <motion.path
          d="M -150,250 C 300,600 500,120 1350,280"
          fill="none"
          stroke="url(#gold-thread-2)"
          strokeWidth="0.4"
          animate={isMobileScreen ? undefined : {
            d: [
              "M -150,250 C 300,600 500,120 1350,280",
              "M -150,270 C 280,590 520,130 1350,260",
              "M -150,250 C 300,600 500,120 1350,280"
            ]
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />

        {/* Thread 6 */}
        <motion.path
          d="M -150,220 C 280,440 520,130 1350,140"
          fill="none"
          stroke="url(#gold-thread-3)"
          strokeWidth="0.4"
          animate={isMobileScreen ? undefined : {
            d: [
              "M -150,220 C 280,440 520,130 1350,140",
              "M -150,240 C 260,420 540,150 1350,120",
              "M -150,220 C 280,440 520,130 1350,140"
            ]
          }}
          transition={{
            duration: 34,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        {/* Thread 7 */}
        <motion.path
          d="M -150,380 C 180,500 580,280 1350,290"
          fill="none"
          stroke="url(#gold-thread-1)"
          strokeWidth="0.6"
          animate={isMobileScreen ? undefined : {
            d: [
              "M -150,380 C 180,500 580,280 1350,290",
              "M -150,360 C 200,520 560,260 1350,310",
              "M -150,380 C 180,500 580,280 1350,290"
            ]
          }}
          transition={{
            duration: 42,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />

        {/* Parallel fanned curved line patterns behind right side cards */}
        {Array.from({ length: 32 }).map((_, i) => {
          const startY = 380 + i * (120 / 31);
          const cp1x = 690 + i * (60 / 31);
          const cp1y = 260 + i * (180 / 31);
          const cp2x = 840 + i * (60 / 31);
          const cp2y = 160 + i * (240 / 31);
          const endY = 60 + i * (340 / 31);
          const opacity = Math.max(0.003, 0.20 * Math.pow(0.88, i));
          const strokeWidth = Math.max(0.15, 0.5 - i * (0.35 / 31));

          return (
            <path
              key={i}
              d={`M 450,${startY.toFixed(1)} C ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} 1300,${endY.toFixed(1)}`}
              fill="none"
              stroke="url(#gold-fanned-line)"
              strokeWidth={strokeWidth.toFixed(2)}
              style={{ opacity }}
            />
          );
        })}
      </svg>

      {/* Main Grid Content */}
      <div className="container mx-auto px-4 relative z-10 flex-grow flex items-center py-4">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
          
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 space-y-8 text-left"
          >
            {/* SEBI Outlined Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/35 bg-[#D4AF37]/5 text-[9px] font-bold tracking-widest uppercase text-primary shadow-[0_0_15px_rgba(218,165,32,0.15)]">
              <Shield className="h-3 w-3 fill-primary/10 text-primary" />
              SEBI REGISTERED INVESTMENT ADVISOR
            </div>

            {/* Massive Luxury Serif Headline (25% larger typography) */}
            <h1 className="text-4xl md:text-5xl lg:text-[76px] font-display font-bold leading-[1.05] text-foreground tracking-tight text-balance">
              Strategic Wealth. <br />
              Secured <span className="bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#D4AF37] bg-clip-text text-transparent">Legacies.</span>
            </h1>

            {/* Decorative Element */}
            <div className="w-12 h-[1px] bg-[#D4AF37] opacity-60" />

            {/* Premium Subheading */}
            <p className="text-base md:text-[18px] text-muted-foreground/80 leading-relaxed max-w-[520px] font-light">
              Bespoke investment strategies, expert advisory, and disciplined wealth management tailored to your life goals.
            </p>

            {/* Trust Cards (2x2 Premium Glass Cards) */}
            <div className="grid grid-cols-2 gap-4 max-w-[520px] pt-2">
              {[
                { val: "₹300 Cr+", label: "Managed", icon: TrendingUp },
                { val: "3000+", label: "Clients", icon: Users },
                { val: "10+", label: "Years Experience", icon: Award },
                { val: "15+", label: "Partner Institutions", icon: Building2 }
              ].map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.02, borderColor: "rgba(212, 175, 55, 0.4)", boxShadow: "0 10px 20px rgba(212, 175, 55, 0.05)" }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col justify-between p-5 rounded-2xl border border-[#D4AF37]/15 bg-[#030B22]/60 backdrop-blur-md min-h-[105px] text-left group"
                  >
                    <div className="flex justify-between items-center w-full">
                      <div className="text-xl md:text-2xl font-bold font-display text-foreground tracking-tight group-hover:text-[#D4AF37] transition-colors duration-300">
                        {item.val}
                      </div>
                      <div className="w-7 h-7 rounded-full bg-[#D4AF37]/5 border border-[#D4AF37]/15 flex items-center justify-center shrink-0">
                        <IconComponent className="h-3.5 w-3.5 text-[#D4AF37]/80" />
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-muted-foreground/60 tracking-wider uppercase mt-3">
                      {item.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* Two CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button asChild size="lg" className="gold-gradient text-primary-foreground hover:opacity-95 text-xs px-8 py-5.5 shadow-lg shadow-primary/5 hover:shadow-[#D4AF37]/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] font-bold uppercase tracking-wider rounded-sm">
                <Link to="/contact" className="inline-flex items-center gap-2">
                  Book Consultation
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-[#D4AF37]/30 bg-slate-950/40 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/80 text-xs px-8 py-5.5 transition-all duration-300 active:scale-[0.98] font-bold uppercase tracking-wider rounded-sm text-foreground backdrop-blur-sm">
                <Link to="/services">Our Approach</Link>
              </Button>
            </div>

            {/* Trust Statement */}
            <div className="flex items-start gap-3 pt-6 border-t border-[#D4AF37]/10 max-w-[520px]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-1 shrink-0" />
              <div className="text-[10px] text-muted-foreground/60 tracking-wider font-light uppercase leading-relaxed">
                <span className="text-[#D4AF37] font-semibold">Trusted by 3000+ investors</span> <br className="sm:hidden" />
                <span className="hidden sm:inline"> — </span> Fiduciary. Independent. Committed to your legacy.
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE (Premium Glass Wealth Philosophy Card) */}
          <div className="lg:col-span-5 flex justify-center items-center relative mt-8 lg:mt-0">
            
            {/* Soft gold glowing blob behind the card */}
            <div className="absolute -inset-10 bg-gradient-to-tr from-[#D4AF37]/10 via-transparent to-[#D4AF37]/5 rounded-full blur-3xl opacity-80 pointer-events-none z-0 animate-pulse" style={{ animationDuration: "8s" }} />

            {/* Premium Gold Accent Ring Behind Card */}
            <div className="absolute w-[95%] h-[95%] border border-[#D4AF37]/10 rounded-3xl -rotate-2 scale-98 pointer-events-none z-0" />
            
            {/* Main Luxury Private Wealth Philosophy Card */}
            <motion.div
              initial={{ opacity: 0, y: 40, rotate: 0 }}
              animate={{ opacity: 1, y: 0, rotate: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              whileHover={{ rotate: 0, scale: 1.01, boxShadow: "0 25px 50px rgba(212, 175, 55, 0.07)" }}
              className="w-full max-w-[420px] moving-border-glow-gold backdrop-blur-2xl rounded-3xl p-9 md:p-10 shadow-[0_30px_70px_rgba(3,11,34,0.8)] relative z-10 overflow-hidden"
            >
              {/* Elegant Diagonal Reflective Glare Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent -translate-y-full hover:translate-y-full transition-transform duration-1000 ease-in-out pointer-events-none" />
              
              {/* Top Card Header */}
              <div className="border-b border-[#D4AF37]/25 pb-5 mb-8">
                <span className="text-[9px] font-bold tracking-[0.25em] text-[#D4AF37] uppercase block">Alpha Private Wealth</span>
                <h3 className="text-lg font-display font-semibold text-foreground mt-1 tracking-wider uppercase">Investment Philosophy</h3>
              </div>

              {/* Five Philosophy Principles (With 30% more whitespace and 40% shorter descriptions) */}
              <div className="space-y-6">
                {[
                  {
                    num: "01",
                    title: "Capital Preservation",
                    desc: "Our first priority is to protect what matters most."
                  },
                  {
                    num: "02",
                    title: "Risk-First Allocation",
                    desc: "Every strategy begins with understanding and managing risk."
                  },
                  {
                    num: "03",
                    title: "Long-Term Compounding",
                    desc: "We build wealth through patience, discipline and consistency."
                  },
                  {
                    num: "04",
                    title: "Tax-Efficient Planning",
                    desc: "We optimize today, so you keep more of tomorrow."
                  },
                  {
                    num: "05",
                    title: "Generational Wealth",
                    desc: "We help families grow, protect and pass on their legacy."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="group">
                    <div className="flex gap-4">
                      <span className="text-[10px] font-mono text-[#D4AF37]/70 mt-0.5 tracking-wider font-semibold">{item.num}</span>
                      <div className="space-y-1 text-left">
                        <h4 className="text-xs font-semibold text-foreground/90 tracking-wide font-display group-hover:text-[#D4AF37] transition-colors duration-300">{item.title}</h4>
                        <p className="text-[10.5px] text-muted-foreground/60 leading-normal font-light">{item.desc}</p>
                      </div>
                    </div>
                    {idx < 4 && (
                      <div className="border-t border-[#D4AF37]/10 my-4.5" />
                    )}
                  </div>
                ))}
              </div>

              {/* Card Footer / Institutional Signature */}
              <div className="mt-8 pt-5 border-t border-[#D4AF37]/15 flex justify-between items-center text-[9px] font-mono tracking-widest uppercase">
                <span className="text-muted-foreground/40">Memorandum // APW</span>
                <span className="text-[#D4AF37] font-semibold">Fiduciary Advisory</span>
              </div>
            </motion.div>

          </div>

        </div>
      </div>

    </section>
  );
}
