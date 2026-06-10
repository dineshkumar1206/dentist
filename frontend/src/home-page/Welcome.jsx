import React from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';

/* ── Single Font Definition ── */
const FONT_FAMILY = "'Outfit', system-ui, sans-serif";

/* ══════════════════════════════════════
   CircularText Component
══════════════════════════════════════ */
const getRotationTransition = (duration, from, loop = true) => ({
  from,
  to: from + 360,
  ease: 'linear',
  duration,
  type: 'tween',
  repeat: loop ? Infinity : 0,
});

const getTransition = (duration, from) => ({
  rotate: getRotationTransition(duration, from),
  scale: { type: 'spring', damping: 20, stiffness: 300 },
});

const CircularText = ({ text, spinDuration = 20, onHover = 'speedUp', className = '' }) => {
  const letters = Array.from(text);
  const controls = useAnimation();
  const rotation = useMotionValue(0);

  React.useEffect(() => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start),
    });
  }, [spinDuration, text, onHover, controls, rotation]);

  const handleHoverStart = () => {
    const start = rotation.get();
    if (!onHover) return;
    let transitionConfig;
    let scaleVal = 1;
    switch (onHover) {
      case 'slowDown':   transitionConfig = getTransition(spinDuration * 2, start); break;
      case 'speedUp':    transitionConfig = getTransition(spinDuration / 4, start); break;
      case 'pause':      transitionConfig = { rotate: { type: 'spring', damping: 20, stiffness: 300 }, scale: { type: 'spring', damping: 20, stiffness: 300 } }; break;
      case 'goBonkers':  transitionConfig = getTransition(spinDuration / 20, start); scaleVal = 0.8; break;
      default:           transitionConfig = getTransition(spinDuration, start);
    }
    controls.start({ rotate: start + 360, scale: scaleVal, transition: transitionConfig });
  };

  const handleHoverEnd = () => {
    const start = rotation.get();
    controls.start({ rotate: start + 360, scale: 1, transition: getTransition(spinDuration, start) });
  };

  return (
    <motion.div
      className={className}
      style={{
        rotate: rotation,
        width: 160, height: 160,
        position: 'relative',
        borderRadius: '50%',
        cursor: 'pointer',
        margin: '0 auto',
      }}
      initial={{ rotate: 0 }}
      animate={controls}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      {letters.map((letter, i) => {
        const rotationDeg = (360 / letters.length) * i;
        const factor = Math.PI / letters.length;
        const x = factor * i;
        const y = factor * i;
        const transform = `rotateZ(${rotationDeg}deg) translate3d(${x}px, ${y}px, 0)`;
        return (
          <span
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'inline-block',
              fontSize: 11.5,
              fontFamily: FONT_FAMILY,
              fontWeight: 900,
              letterSpacing: '0.09em',
              color: '#ffffff', 
              textTransform: 'uppercase',
              transform,
              WebkitTransform: transform,
              textAlign: 'center',
              transition: 'all 0.5s cubic-bezier(0,0,0,1)',
            }}
          >
            {letter}
          </span>
        );
      })}
    </motion.div>
  );
};

const SpinBadge = () => (
  <div className="relative w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[140px] md:h-[140px] lg:w-[160px] lg:h-[160px]">
    <CircularText
      text="BEST SERVICES • EXCELLENCE • "
      spinDuration={18}
      onHover="speedUp"
    />
    
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
       w-[56px] h-[56px]
sm:w-[64px] sm:h-[64px]
md:w-[80px] md:h-[80px]
lg:w-[88px] lg:h-[88px]
       bg-white border border-cyan-100 rounded-full flex items-center justify-center shadow-lg shadow-cyan-950/15 pointer-events-none z-10">     
        <svg className='w-[60%] h-[60%]' viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M28 35 C25 45 28 65 35 78 C38 85 43 91 50 90 C47 78 48 70 53 70" fill="#bae6fd" opacity="0.8"/>
        <path d="M62 28 C70 27 78 30 78 35" stroke="#bae6fd" strokeWidth="6" strokeLinecap="round"/>
        <path d="M61 75 C63 83 60 90 58 91 C57 92 55 86 56 79" fill="#bae6fd" opacity="0.8"/>
        <path 
          d="M50 28 C41 25 28 30 25 43 C21 56 28 69 34 82 C36 86 41 91 47 90 C51 89 51 80 51 73 C51 80 51 89 55 90 C61 91 66 86 68 82 C74 69 81 56 77 43 C74 30 61 25 50 28 Z" 
          stroke="#034675" 
          strokeWidth="5" 
          strokeLinejoin="round" 
          strokeLinecap="round"
        />
        <path d="M34 38 C33 46 35 51 36 55" stroke="#034675" strokeWidth="4" strokeLinecap="round"/>
      </svg>
    </div>
  </div>
);

/* ══════════════════════════════════════
   MAIN HERO2 Component
══════════════════════════════════════ */
const Hero2 = () => {
  // Stagger wrapper configuration for the text elements on the right
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const textItemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
    },
  };

  return (
    <div className="w-full bg-[#f8fafc] pt-20" style={{ fontFamily: FONT_FAMILY }}>
      
      {/* Boxed Content Layout Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-center min-h-[calc(100vh-10rem)]">
        
        {/* ══ LEFT VISUAL SPLIT (Triggered on Scroll Viewport Entry) ══ */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }} // Fires once when 20% of the graphic frame crosses the threshold
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-6 w-full aspect-[4/3] sm:aspect-[16/10] lg:h-[540px] xl:h-[600px] relative bg-cyan-50/50 rounded-[2.5rem] p-3 sm:p-4 shadow-xl shadow-slate-200/50 overflow-hidden flex flex-col justify-end group"
        >
          {/* Practice image workspace layout layer */}
          <img
            className="w-full h-full object-cover object-center rounded-[2rem] block transform group-hover:scale-[1.015] transition-transform duration-700 ease-out"
            src="/images/img-4.png"
            alt="State of the art modern clinical dental workspace"
          />
          <div className="absolute inset-4 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none rounded-[2rem]" />

          {/* Floating Spinning Badge Overlay */}
          <motion.div
            className="absolute top-10 left-1/2 -translate-x-1/2 z-30"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', damping: 15, delay: 0.4 }}
          >
            <SpinBadge />
          </motion.div>

          {/* Secondary Smile Result Inset Window Panel */}
          <motion.div
            className="absolute bottom-10 sm:bottom-12 left-4 sm:left-6 w-[140px] h-[105px] sm:w-[190px] sm:h-[145px] rounded-2xl overflow-hidden shadow-2xl shadow-slate-950/30 border-4 border-white/95 z-30 transform hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          >
            <img
              className="w-full h-full object-cover object-center block"
              src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=85&w=600"
              alt="Healthy flawless smile alignment result"
            />
          </motion.div>
        </motion.div>

        {/* ══ RIGHT CONTENT FRAME (Triggered on Scroll Viewport Entry via Stagger) ══ */}
        <motion.div 
          variants={textContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }} // Ensures cascading transitions start cleanly as the user moves down
          className="lg:col-span-6 w-full flex flex-col justify-center px-2 sm:px-6 lg:px-8 xl:px-12 py-4"
        >
          <motion.p 
            variants={textItemVariants}
            className="text-[11px] font-bold tracking-[0.25em] uppercase text-cyan-600 mb-4"
          >
            Welcome to WhiteDental
          </motion.p>

          <motion.h1 
            variants={textItemVariants}
            className="text-slate-900 tracking-tight leading-[1.12] mb-5 font-bold text-3xl sm:text-4xl md:text-5xl xl:text-[3.25rem]"
          >
            Clinical excellence <br />
            in the heart of <br />
            your city
          </motion.h1>

          <motion.p 
            variants={textItemVariants}
            className="text-sm sm:text-base font-light leading-relaxed text-slate-500 mb-8 max-w-md"
          >
            Established in 2010, we have spent over 16 years providing high-quality dental care. Our dedicated team uses advanced tech and diagnostic tools to deliver the stress-free, luxury smile care you deserve.
          </motion.p>

          <motion.div variants={textItemVariants}>
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 12px 24px -10px rgba(15,23,42,0.2)" }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-white bg-slate-900 border border-transparent rounded-xl px-10 py-4.5 cursor-pointer hover:bg-cyan-600 transition-colors duration-300 w-full sm:w-auto text-center justify-center shadow-lg shadow-slate-900/10"
            >
              Explore Our Services
            </motion.button>
          </motion.div>

        </motion.div>
      </section>
    </div>
  );
};

export default Hero2;