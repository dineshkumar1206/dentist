import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Smile, Award, Sparkles } from 'lucide-react';

/* ── Single Font Definition ── */
const FONT_FAMILY = "'Outfit', system-ui, sans-serif";

// Reusable Counter Engine component
const CountUpNumber = ({ target, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const isElementInView = useInView(elementRef, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isElementInView) return;

    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      
      // Smooth easeOutQuad mathematical progression curve
      const easeProgress = progress * (2 - progress);
      
      setCount(Math.floor(easeProgress * target));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [target, duration, isElementInView]);

  return <span ref={elementRef}>{count.toLocaleString()}</span>;
};

export default function Counter() {
  const statMetrics = [
    {
      id: 1,
      targetValue: 15400,
      suffix: "+",
      title: "Happy Patients",
      subtitle: "Trusted family dental care",
      icon: Users,
      color: "from-cyan-500 to-blue-500",
      bgColor: "bg-cyan-50",
      iconColor: "text-cyan-600",
    },
    {
      id: 2,
      targetValue: 3200,
      suffix: "+",
      title: "Smiles Straightened",
      subtitle: "Modern expert orthodontics",
      icon: Smile,
      color: "from-teal-500 to-emerald-500",
      bgColor: "bg-teal-50",
      iconColor: "text-teal-600",
    },
    {
      id: 3,
      targetValue: 16,
      suffix: "+",
      title: "Years Experienced",
      subtitle: "Clinical dental excellence",
      icon: Award,
      color: "from-blue-500 to-indigo-500",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      id: 4,
      targetValue: 99.4,
      suffix: "%",
      title: "Satisfaction Rate",
      subtitle: "Flawless diagnostic feedback",
      icon: Sparkles,
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600",
      isDecimal: true, // Marker to render decimals accurately if needed later
    },
  ];

  // Parent cascading sequence containers
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section 
      className="w-full bg-[#f8fafc] py-12 sm:py-16 lg:py-24 relative overflow-hidden"
      style={{ fontFamily: FONT_FAMILY }}
    >
      {/* Decorative clean line background traces */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-30">
        <div className="absolute right-[-10%] top-[-20%] w-[400px] h-[400px] bg-cyan-200 rounded-full blur-3xl" />
        <div className="absolute left-[-5%] bottom-[-10%] w-[350px] h-[350px] bg-teal-100 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Boxed Grid System Layout Matrix */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
        >
          {statMetrics.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.id}
                variants={itemVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="
                     bg-white
                     rounded-2xl lg:rounded-3xl
                     p-5 sm:p-6 lg:p-8
                     border border-slate-100
                     shadow-md shadow-slate-200/40
                     flex flex-col items-center sm:items-start text-center sm:text-left
                     relative overflow-hidden
                     group transition-all duration-300
                     min-h-[220px]
                     sm:min-h-[240px]
                   "
              >
                {/* Micro Ambient Hover Glow Bar */}
                <div className={`absolute top-0 left-0 h-1.5 w-0 group-hover:w-full bg-gradient-to-r ${stat.color} transition-all duration-500 rounded-t-3xl`} />

                {/* Metric Icon Container */}
                <div className={`
                      p-3
                      sm:p-3.5
                      rounded-xl
                      sm:rounded-2xl
                      ${stat.bgColor}
                      ${stat.iconColor}
                      mb-4 sm:mb-5
                      flex items-center justify-center
                    `}>
                  <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />
                </div>

                {/* Animated Numerical Layout Display */}
                <div className="flex items-baseline mb-2">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-none">
                    {/* Handles normal counting or strict decimal outputs cleanly */}
                    {stat.isDecimal ? (
                      // Fallback fallback if your layout tracks decimals without extra library weight
                      <span>99.4</span>
                    ) : (
                      <CountUpNumber target={stat.targetValue} />
                    )}
                  </h2>
                  <span className={`text-xl sm:text-2xl font-normal bg-gradient-to-r ${stat.color} bg-clip-text text-transparent ml-0.5`}>
                    {stat.suffix}
                  </span>
                </div>

                {/* Typography Labels Section */}
                <h3 className="text-slate-800 font-semibold text-sm sm:text-base lg:text-lg mb-1 tracking-tight">
                  {stat.title}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-normal">
                  {stat.subtitle}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}