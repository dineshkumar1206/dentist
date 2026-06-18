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
      targetValue: 50000,
      suffix: "+",
      title: "Happy Patients",
      subtitle: "Trusted family care",
      icon: Users,
      color: "from-[#682187] to-[#4c1263]",
      bgColor: "bg-purple-50",
      iconColor: "text-[#682187]",
    },
    {
      id: 2,
      targetValue: 3200,
      suffix: "+",
      title: "Smiles Straightened",
      subtitle: "Expert orthodontics",
      icon: Smile,
      color: "from-[#a855f7] to-[#682187]",
      bgColor: "bg-fuchsia-50/70",
      iconColor: "text-[#a855f7]",
    },
    {
      id: 3,
      targetValue: 16,
      suffix: "+",
      title: "Years Experienced",
      subtitle: "Clinical excellence",
      icon: Award,
      color: "from-[#682187] to-[#a855f7]",
      bgColor: "bg-purple-100/40",
      iconColor: "text-[#4c1263]",
    },
    {
      id: 4,
      targetValue: 99.4,
      suffix: "%",
      title: "Satisfaction Rate",
      subtitle: "Diagnostic feedback",
      icon: Sparkles,
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600",
      isDecimal: true,
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
      className="w-full bg-[#fcfbfe] py-12 sm:py-16 lg:py-24 relative overflow-hidden"
      style={{ fontFamily: FONT_FAMILY }}
    >
      {/* Dynamic background blur traces tuned to your brand guidelines */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-40">
        <div className="absolute right-[-10%] top-[-20%] w-[400px] h-[400px] bg-purple-200/50 rounded-full blur-3xl" />
        <div className="absolute left-[-5%] bottom-[-10%] w-[350px] h-[350px] bg-fuchsia-100/50 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Boxed Grid System Layout Matrix */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8"
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
                   p-4 sm:p-6 lg:p-8
                   border border-slate-100
                   shadow-md shadow-purple-950/5
                   flex flex-col items-center sm:items-start text-center sm:text-left
                   relative overflow-hidden
                   group transition-all duration-300
                   min-h-[190px] sm:min-h-[240px]
                 "
              >
                {/* Micro Ambient Hover Glow Bar */}
                <div className={`absolute top-0 left-0 h-1.5 w-0 group-hover:w-full bg-gradient-to-r ${stat.color} transition-all duration-500 rounded-t-3xl`} />

                {/* Metric Icon Container */}
                <div className={`
                    p-2.5
                    sm:p-3.5
                    rounded-xl
                    sm:rounded-2xl
                    ${stat.bgColor}
                    ${stat.iconColor}
                    mb-3 sm:mb-5
                    flex items-center justify-center
                  `}>
                  <IconComponent className="w-4 h-4 sm:w-6 sm:h-6" strokeWidth={2} />
                </div>

                {/* Animated Numerical Display */}
                <div className="flex items-baseline mb-1 sm:mb-2 max-w-full overflow-hidden">
                  <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-none">
                    {stat.isDecimal ? (
                      <span>99.4</span>
                    ) : (
                      <CountUpNumber target={stat.targetValue} />
                    )}
                  </h2>
                  <span className={`text-lg sm:text-2xl font-normal bg-gradient-to-r ${stat.color} bg-clip-text text-transparent ml-0.5`}>
                    {stat.suffix}
                  </span>
                </div>

                {/* Typography Labels Section */}
                <h3 className="text-slate-800 font-semibold text-xs sm:text-base lg:text-lg mb-0.5 sm:mb-1 tracking-tight line-clamp-1">
                  {stat.title}
                </h3>
                <p className="text-slate-400 text-[11px] sm:text-sm leading-normal line-clamp-2">
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