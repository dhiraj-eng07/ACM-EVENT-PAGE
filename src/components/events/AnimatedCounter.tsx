import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface AnimatedCounterProps {
  icon: React.ReactNode;
  value: number;
  label: string;
}

export const AnimatedCounter = ({ icon, value, label }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  const digits = count.toString().padStart(3, "0").split("");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="flex flex-col items-center p-8 bg-card rounded-3xl shadow-xl border border-border"
    >
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center mb-6 text-primary-foreground">
        {icon}
      </div>

      <div className="flex gap-2 mb-4">
        {digits.map((digit, index) => (
          <motion.div
            key={index}
            initial={{ y: 100, opacity: 0 }}
            animate={isVisible ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="w-16 h-20 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center overflow-hidden border border-primary/20"
          >
            <span className="text-5xl font-bold text-primary">{digit}</span>
          </motion.div>
        ))}
      </div>

      <div className="text-xl font-semibold text-muted-foreground">
        {label}
      </div>
    </motion.div>
  );
};
