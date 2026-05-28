import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, TrendingUp, Award, Building2 } from "lucide-react";

interface Stat {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { icon: Users, value: 3000, suffix: "+", label: "Happy Clients" },
  { icon: TrendingUp, value: 300, suffix: "Cr+", label: "Assets Under Management" },
  { icon: Award, value: 10, suffix: "+", label: "Years of Excellence" },
  { icon: Building2, value: 15, suffix: "+", label: "Partner Institutions" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const duration = 2000;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(value * easeOut));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-5xl md:text-6xl font-extrabold tracking-tight gold-text font-display mb-1">
      {suffix.includes("Cr") ? "₹" : ""}{count.toLocaleString()}{suffix}
    </div>
  );
}

export function Stats() {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-secondary/15 to-secondary/35 border-y border-border/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-y-12 md:gap-y-0"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center relative px-4 flex flex-col items-center justify-center border-border/20 odd:border-r even:border-r-0 md:border-r md:last:border-r-0"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4 transition-transform hover:scale-105 duration-350">
                <stat.icon className="h-6.5 w-6.5 text-primary" />
              </div>
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
