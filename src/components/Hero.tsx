import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Shield, Clock, ShieldCheck, Users, Award, Building2 } from "lucide-react";
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
    <section className="relative min-h-[90vh] pt-28 pb-10 flex flex-col justify-between overflow-hidden bg-[#030B22]">
      
      {/* Background Canvas Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0 opacity-80" />

      {/* Blob glows (soft blurred gold radial glows) */}
      <div className="absolute top-[25%] left-[5%] w-[450px] h-[450px] bg-[#d4af37]/[0.015] rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[5%] w-[550px] h-[550px] bg-[#d4af37]/[0.03] rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Large diffused radial glow bloom (warm amber/gold light source behind threads) */}
      <div className="absolute top-[40%] left-[25%] -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,_rgba(245,158,11,0.06)_0%,_rgba(218,165,32,0.02)_40%,_transparent_70%)] blur-[100px] pointer-events-none z-0 mix-blend-screen" />

      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-950 via-slate-950 to-slate-950 z-0 pointer-events-none" />

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
      <div className="container mx-auto px-4 relative z-10 flex-grow flex items-center">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center w-full">
          
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 space-y-7 text-left"
          >
            {/* SEBI Outlined Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/35 bg-[#D4AF37]/5 text-[9px] font-bold tracking-widest uppercase text-primary shadow-[0_0_15px_rgba(218,165,32,0.15)]">
              <Shield className="h-3 w-3 fill-primary/10 text-primary" />
              SEBI Registered Investment Advisor
            </div>

            {/* Massive Luxury Serif Headline (25% larger typography) */}
            <h1 className="text-4xl md:text-5xl lg:text-[76px] font-display font-bold leading-[1.05] text-foreground tracking-tight text-balance">
              Strategic Wealth. <br />
              Secured <span className="bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#D4AF37] bg-clip-text text-transparent">Legacies.</span>
            </h1>

            {/* Premium Subheading */}
            <p className="text-base md:text-[18px] text-muted-foreground/80 leading-relaxed max-w-xl font-light">
              Bespoke investment strategies, expert advisory, and disciplined wealth management tailored to your life goals.
            </p>

            {/* Trust Bar directly below Subheading */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] text-muted-foreground/70 pt-1 font-semibold tracking-wide border-t border-white/5 border-b py-2.5 max-w-xl">
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#D4AF37]" />
                ₹300 Cr+ Managed
              </span>
              <span className="text-white/10 hidden sm:inline">|</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#D4AF37]" />
                3000+ Clients
              </span>
              <span className="text-white/10 hidden sm:inline">|</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#D4AF37]" />
                10+ Years Experience
              </span>
              <span className="text-white/10 hidden sm:inline">|</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#D4AF37]" />
                15+ Partners
              </span>
            </div>

            {/* Two CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-1">
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
          </motion.div>

          {/* RIGHT SIDE (Floating Dashboard UI) */}
          <div className="lg:col-span-6 relative mt-8 lg:mt-0">
            
            {/* Soft gold glowing blob behind the dashboard */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#D4AF37]/10 via-transparent to-transparent rounded-3xl blur-2xl opacity-75 pointer-events-none z-0" />
            
            {/* Floating Card 1: Client Portfolio */}
            <motion.div
              initial={{ opacity: 0, x: 30, y: -20 }}
              animate={{ opacity: 1, x: 0, y: [0, -6, 0] }}
              transition={{
                opacity: { duration: 1, delay: 0.4 },
                x: { duration: 1, delay: 0.4 },
                y: {
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.4,
                },
              }}
              className="absolute -top-10 -right-2 md:-right-6 z-25 bg-[#030B22]/80 backdrop-blur-md border border-[#D4AF37]/35 rounded-xl p-3.5 shadow-xl hover:border-[#D4AF37]/60 transition-colors duration-300 w-44"
            >
              <span className="text-[9px] text-muted-foreground/60 font-bold uppercase tracking-widest block">Client Portfolio</span>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-base font-bold text-white font-display">₹3.72 Cr</span>
                <span className="text-[9px] text-[#D4AF37] font-bold">+24.6%</span>
              </div>
            </motion.div>

            {/* Floating Card 2: Risk Profile */}
            <motion.div
              initial={{ opacity: 0, x: -30, y: 20 }}
              animate={{ opacity: 1, x: 0, y: [0, 6, 0] }}
              transition={{
                opacity: { duration: 1, delay: 0.5 },
                x: { duration: 1, delay: 0.5 },
                y: {
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5,
                },
              }}
              className="absolute -bottom-8 -left-2 md:-left-8 z-25 bg-[#030B22]/85 backdrop-blur-md border border-[#D4AF37]/35 rounded-xl p-3.5 shadow-xl hover:border-[#D4AF37]/60 transition-colors duration-300 w-40 flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center shrink-0">
                <ShieldCheck className="h-4 w-4 text-[#D4AF37]" />
              </div>
              <div>
                <span className="text-[9px] text-muted-foreground/60 font-bold uppercase tracking-widest block">Risk Profile</span>
                <span className="text-[11px] font-bold text-white mt-0.5 block font-display">Balanced Growth</span>
              </div>
            </motion.div>

            {/* Main Portfolio Growth Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass-card bg-slate-950/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative z-10 hover:border-[#D4AF37]/30 transition-colors duration-300"
            >
              <span className="text-[10px] text-muted-foreground/60 font-bold uppercase tracking-wider block">Portfolio Performance</span>
              <h3 className="text-2xl font-bold font-display text-foreground mt-1.5">₹3,72,45,000</h3>
              <span className="inline-block text-[10px] text-[#D4AF37] font-bold bg-[#D4AF37]/10 px-2.5 py-0.5 rounded mt-1 border border-[#D4AF37]/20">
                +24.6% (12M Growth)
              </span>

              {/* SVG Golden Line Chart */}
              <div className="h-44 w-full relative mt-6">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGoldGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal dotted grid lines */}
                  <line x1="0" y1="10" x2="100" y2="10" stroke="rgba(212,175,55,0.06)" strokeWidth="0.5" strokeDasharray="3 3" />
                  <line x1="0" y1="20" x2="100" y2="20" stroke="rgba(212,175,55,0.06)" strokeWidth="0.5" strokeDasharray="3 3" />
                  <line x1="0" y1="30" x2="100" y2="30" stroke="rgba(212,175,55,0.06)" strokeWidth="0.5" strokeDasharray="3 3" />

                  {/* Gradient Fill under Path */}
                  <path
                    d="M 0,33 C 20,31 40,24 60,19 C 80,11 90,7 100,5 L 100,40 L 0,40 Z"
                    fill="url(#chartGoldGrad)"
                  />

                  {/* Glow shadow line behind */}
                  <path
                    d="M 0,33 C 20,31 40,24 60,19 C 80,11 90,7 100,5"
                    fill="none"
                    stroke="#D4AF37"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-40 blur-[1px]"
                  />

                  {/* Sharp thin trend line in front */}
                  <path
                    d="M 0,33 C 20,31 40,24 60,19 C 80,11 90,7 100,5"
                    fill="none"
                    stroke="#D4AF37"
                    strokeWidth="0.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Glowing Node Points in golden yellow */}
                  <circle cx="0" cy="33" r="0.6" fill="#D4AF37" />
                  <circle cx="20" cy="31" r="0.6" fill="#D4AF37" />
                  <circle cx="40" cy="24" r="0.6" fill="#D4AF37" />
                  <circle cx="60" cy="19" r="0.6" fill="#D4AF37" />
                  <circle cx="80" cy="11" r="0.6" fill="#D4AF37" />
                  <circle cx="100" cy="5" r="1.2" fill="#D4AF37" />
                  <circle cx="100" cy="5" r="2.5" fill="#D4AF37" className="animate-ping" style={{ transformOrigin: "100px 5px" }} />
                </svg>
              </div>

              {/* X Axis Labels */}
              <div className="flex justify-between items-center text-[9px] text-muted-foreground/50 font-mono mt-4 pt-4 border-t border-white/5">
                <span>Jan</span>
                <span>Mar</span>
                <span>May</span>
                <span>Jul</span>
                <span>Sep</span>
                <span>Nov</span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* STATS ROW AT BOTTOM OF HERO (Centered and Separated by vertical dividers) */}
      <div className="w-full relative z-10 mt-4 pt-4 border-t border-border/10">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 md:gap-y-0 items-center justify-items-center">
            
            {/* Stat 1 */}
            <div className="flex items-center gap-4 w-full justify-center md:border-r border-border/30 px-4">
              <div className="w-10 h-10 rounded-full border border-primary/20 bg-primary/5 flex items-center justify-center shrink-0">
                <Users className="h-4.5 w-4.5 text-primary" />
              </div>
              <div className="text-left">
                <div className="text-xl md:text-2xl font-bold font-display text-foreground leading-none">3,000+</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mt-1">Happy Clients</div>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex items-center gap-4 w-full justify-center md:border-r border-border/30 px-4">
              <div className="w-10 h-10 rounded-full border border-primary/20 bg-primary/5 flex items-center justify-center shrink-0 font-display text-primary text-sm font-semibold">
                ₹
              </div>
              <div className="text-left">
                <div className="text-xl md:text-2xl font-bold font-display text-foreground leading-none">300Cr+</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mt-1">Assets Managed</div>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex items-center gap-4 w-full justify-center md:border-r border-border/30 px-4">
              <div className="w-10 h-10 rounded-full border border-primary/20 bg-primary/5 flex items-center justify-center shrink-0">
                <Award className="h-4.5 w-4.5 text-primary" />
              </div>
              <div className="text-left">
                <div className="text-xl md:text-2xl font-bold font-display text-foreground leading-none">10+</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mt-1">Years of Excellence</div>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="flex items-center gap-4 w-full justify-center px-4">
              <div className="w-10 h-10 rounded-full border border-primary/20 bg-primary/5 flex items-center justify-center shrink-0">
                <Building2 className="h-4.5 w-4.5 text-primary" />
              </div>
              <div className="text-left">
                <div className="text-xl md:text-2xl font-bold font-display text-foreground leading-none">15+</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mt-1">Partner Institutions</div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}
