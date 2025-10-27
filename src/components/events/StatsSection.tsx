import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Users, Award, MapPin } from "lucide-react";

interface StatItemProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  delay: number;
  hasPlus?: boolean;
}

const StatItem = ({ icon, value, label, delay, hasPlus = false }: StatItemProps) => {
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

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col items-center p-6 bg-card rounded-2xl shadow-lg border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
    >
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center mb-4 text-primary-foreground">
        {icon}
      </div>
      <div className="text-4xl font-bold text-foreground mb-2 min-h-[3rem] flex items-center">
        {count.toLocaleString()}
        {hasPlus && isVisible && count === value && "+"}
      </div>
      <div className="text-sm text-muted-foreground font-medium">
        {label}
      </div>
    </motion.div>
  );
};

export const StatsSection = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
      <StatItem
        icon={<Calendar className="w-8 h-8" />}
        value={15}
        label="Events Organized"
        delay={0.1}
      />
      <StatItem
        icon={<Users className="w-8 h-8" />}
        value={1200}
        label="Participants"
        delay={0.2}
        hasPlus
      />
      <StatItem
        icon={<Award className="w-8 h-8" />}
        value={25}
        label="Speakers"
        delay={0.3}
      />
      <StatItem
        icon={<MapPin className="w-8 h-8" />}
        value={8}
        label="Locations"
        delay={0.4}
      />
    </div>
  );
};
