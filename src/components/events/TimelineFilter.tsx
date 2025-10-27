import { motion } from "framer-motion";
import { Calendar, ChevronRight } from "lucide-react";

interface TimelineFilterProps {
  years: string[];
  selectedYear: string;
  onYearSelect: (year: string) => void;
}

export const TimelineFilter = ({ years, selectedYear, onYearSelect }: TimelineFilterProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mb-16"
    >
      {/* Header */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <Calendar className="w-6 h-6 text-primary" />
        <h3 className="text-2xl md:text-3xl font-bold text-foreground">
          Filter by Year
        </h3>
      </div>

      {/* Timeline Container */}
      <div className="relative max-w-5xl mx-auto px-4">
        {/* Background Card */}
        <div className="relative bg-gradient-to-br from-card via-accent/50 to-card rounded-3xl p-8 md:p-12 shadow-2xl border border-border/50 overflow-hidden">
          {/* Decorative Gradient Orbs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-glow/5 rounded-full blur-3xl" />

          {/* Timeline Line - Desktop */}
          <div className="hidden md:block absolute top-1/2 left-12 right-12 h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20 transform -translate-y-1/2" />
          
          {/* Progress Line - Animated */}
          <motion.div
            className="hidden md:block absolute top-1/2 left-12 h-1 bg-gradient-to-r from-primary to-primary-glow transform -translate-y-1/2"
            initial={{ width: 0 }}
            animate={{ 
              width: `${(years.indexOf(selectedYear) / (years.length - 1)) * 100}%` 
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />

          {/* Years Grid */}
          <div className="relative z-10 grid grid-cols-2 md:flex md:justify-between gap-6 md:gap-4">
            {years.map((year, index) => {
              const isActive = selectedYear === year;
              
              return (
                <motion.button
                  key={year}
                  onClick={() => onYearSelect(year)}
                  className="flex flex-col items-center cursor-pointer group relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Glow Effect */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full blur-xl opacity-50"
                      style={{
                        background: "linear-gradient(135deg, hsl(210 100% 45%), hsl(210 100% 60%))",
                      }}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  )}

                  {/* Year Circle */}
                  <motion.div
                    className={`relative w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center font-bold text-base md:text-lg transition-all duration-300 shadow-lg mb-3 ${
                      isActive
                        ? "bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-primary/30"
                        : "bg-card text-muted-foreground border-2 border-border group-hover:border-primary/50 group-hover:shadow-primary/20"
                    }`}
                    animate={isActive ? { scale: [1, 1.05, 1] } : {}}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {/* Inner Glow */}
                    {isActive && (
                      <div className="absolute inset-1 rounded-full bg-white/10" />
                    )}
                    
                    <span className="relative z-10">
                      {year === "all" ? (
                        <Calendar className="w-6 h-6 md:w-7 md:h-7" />
                      ) : (
                        year.slice(-2)
                      )}
                    </span>

                    {/* Active Indicator */}
                    {isActive && (
                      <motion.div
                        className="absolute -top-1 -right-1 w-4 h-4 bg-primary-glow rounded-full border-2 border-card"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.div>

                  {/* Year Label */}
                  <motion.div
                    className={`text-sm md:text-base font-semibold transition-all duration-300 ${
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground group-hover:text-foreground"
                    }`}
                  >
                    {year === "all" ? "All" : year}
                  </motion.div>

                  {/* Selection Indicator Arrow */}
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute -bottom-6 left-1/2 transform -translate-x-1/2"
                    >
                      <ChevronRight className="w-5 h-5 text-primary rotate-90" />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Selected Year Display - Mobile Enhancement */}
          <motion.div
            key={selectedYear}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-center md:hidden"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary/10 to-primary-glow/10 rounded-full border border-primary/20">
              <span className="text-sm text-muted-foreground">Selected:</span>
              <span className="text-base font-bold text-primary">
                {selectedYear === "all" ? "All Years" : selectedYear}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Info Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-6 text-sm text-muted-foreground"
        >
          Click on a year to filter events • Currently showing{" "}
          <span className="font-semibold text-primary">
            {selectedYear === "all" ? "all events" : `events from ${selectedYear}`}
          </span>
        </motion.p>
      </div>
    </motion.div>
  );
};
