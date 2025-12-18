import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Eye, Video, Award } from "lucide-react";

const stats = [
  { 
    label: "Total Subscribers", 
    value: 746000, 
    suffix: "+",
    icon: Users,
    color: "text-primary"
  },
  { 
    label: "Total Views", 
    value: 38500000, 
    suffix: "+",
    icon: Eye,
    color: "text-codedecode-primary"
  },
  { 
    label: "Videos Published", 
    value: 735, 
    suffix: "",
    icon: Video,
    color: "text-gamechanger-primary"
  },
  { 
    label: "Awards & Features", 
    value: 24, 
    suffix: "",
    icon: Award,
    color: "text-horror-primary"
  },
];

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(0) + "K";
  }
  return num.toString();
};

interface AnimatedCounterProps {
  value: number;
  suffix: string;
  isInView: boolean;
}

const AnimatedCounter = ({ value, suffix, isInView }: AnimatedCounterProps) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const stepValue = value / steps;
    const stepDuration = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += stepValue;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [value, isInView]);

  return (
    <span className="tabular-nums">
      {formatNumber(displayValue)}{suffix}
    </span>
  );
};

const StatsCounter = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      {/* Animated Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-codedecode-primary/20 to-transparent translate-y-20" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gamechanger-primary/20 to-transparent -translate-y-20" />
      </div>

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Growing Every Day
          </h2>
          <p className="text-muted-foreground">
            Join a community of content lovers across three unique channels
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="cine-card p-6 md:p-8 text-center h-full">
                  <div className={`inline-flex p-3 rounded-xl bg-secondary mb-4 ${stat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  
                  <p className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold ${stat.color} mb-2`}>
                    <AnimatedCounter 
                      value={stat.value} 
                      suffix={stat.suffix} 
                      isInView={isInView} 
                    />
                  </p>
                  
                  <p className="text-muted-foreground text-sm">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
