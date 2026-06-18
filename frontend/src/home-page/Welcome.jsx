import React from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import BlurText from "../components/BlurText"; 
import ImageGlareHover from "../components/ImageGlareHover"; 

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
        width: '100%', height: '100%',
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
              fontSize: 'clamp(8px, 1vw, 11.5px)',
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
  <div className="relative w-[95px] h-[95px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] lg:w-[160px] lg:h-[160px]">
    <CircularText
      text="BEST SERVICES • EXCELLENCE • "
      spinDuration={18}
      onHover="speedUp"
    />
    
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
      w-[56px] h-[56px]
      sm:w-[64px] sm:h-[64px]
      md:w-[80px] md:h-[80px]
      lg:w-[88px] lg:h-[88px]
      bg-white border border-purple-100 rounded-full flex items-center justify-center shadow-lg shadow-purple-950/15 pointer-events-none z-10 overflow-hidden"
    >
      <img
        src="/images/tooth-icon.jpg"
        alt="Tooth Icon"
        className="w-[60%] h-[60%] object-contain"
      />
    </div>
  </div>
);

/* ──════════════════════════════════════
    MAIN HERO2 Component
════════════════════════════════════════ */
const Hero2 = () => {
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
    <div className="w-full bg-[#fcfbfe] pt-8 sm:pt-12 lg:pt-20" style={{ fontFamily: FONT_FAMILY }}>
      
      {/* Boxed Content Layout Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-6 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-center min-h-[calc(100vh-10rem)]">
        
        {/* ══ LEFT VISUAL SPLIT ══ */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-6 w-full aspect-[4/3] sm:aspect-[16/10] lg:h-[540px] xl:h-[600px] relative"
        >
          {/* Integrated ImageGlareHover with purple branding theme shadows */}
          <ImageGlareHover 
            glareColor="#ffffff"
            glareOpacity={0.3}
            glareSize={240}
            borderRadius="2.5rem"
            width="100%"
            height="100%"
            className="p-3 sm:p-4 bg-purple-50/40 shadow-xl shadow-purple-950/5"
          >
            {/* Practice image workspace layout layer */}
            <img
              className="w-full h-full object-cover object-center rounded-[2rem] block"
              src="/images/img-4.png"
              alt="State of the art modern clinical dental workspace"
            />
            <div className="absolute inset-4 bg-gradient-to-t from-purple-950/10 via-transparent to-transparent pointer-events-none rounded-[2rem]" />
          </ImageGlareHover>

          {/* Floating Spinning Badge Overlay */}
          <motion.div
            className="absolute top-4 sm:top-6 md:top-8 lg:top-10 left-1/2 -translate-x-1/2 z-30"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', damping: 15, delay: 0.4 }}
          >
            <SpinBadge />
          </motion.div>

          {/* Secondary Smile Result Inset Window Panel */}
          <motion.div
            className="absolute bottom-4 sm:bottom-12 left-4 sm:left-6 w-[140px] h-[105px] sm:w-[190px] sm:h-[145px] rounded-2xl overflow-hidden shadow-2xl shadow-purple-950/20 border-4 border-white/95 z-30 transform hover:scale-105 transition-transform duration-300"
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

        {/* ══ RIGHT CONTENT FRAME ══ */}
        <motion.div 
          variants={textContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="lg:col-span-6 w-full flex flex-col justify-center px-2 sm:px-6 lg:px-8 xl:px-12 py-4"
        >
          <motion.p 
            variants={textItemVariants}
            className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#682187] mb-4"
          >
            Welcome to WhiteDental
          </motion.p>

          <motion.h2 
            variants={textItemVariants}
            className="text-slate-900 tracking-tight leading-[1.12] mb-5 font-bold text-3xl sm:text-4xl md:text-5xl xl:text-[3.25rem]"
          >
            <BlurText
              text="Clinical excellence in the heart of your city"
              delay={150}
              animateBy="words"
              direction="top"
            />
          </motion.h2>

          <motion.p 
            variants={textItemVariants}
            className="text-sm sm:text-base font-light leading-relaxed text-slate-500 mb-8 max-w-md"
          >
            Established in 2010, we have spent over 16 years providing high-quality dental care. Our dedicated team uses advanced tech and diagnostic tools to deliver the stress-free, luxury smile care you deserve.
          </motion.p>

          <motion.div variants={textItemVariants} className="w-full sm:w-auto">
            {/* Pure Tailwind Capsule Toggle Button Integration matching your core references */}
            <button className="group inline-flex items-center gap-4 bg-[#8c7c96] text-white font-semibold text-sm rounded-full pl-6 pr-2 py-2 shadow-md shadow-purple-900/5 hover:bg-[#8c43ad] transition-all duration-400 ease-out w-full sm:w-auto justify-between sm:justify-start">
              Explore Our Services
              <div className="w-[38px] h-[38px] bg-white text-[#8c7c96] rounded-full flex items-center justify-center group-hover:text-[#581c74] group-hover:scale-105 transition-all duration-400 ease-out">
                <ArrowRight size={18} strokeWidth={2.5} className="transition-transform duration-400 ease-out group-hover:rotate-[-45deg]" />
              </div>
            </button>
          </motion.div>

        </motion.div>
      </section>
    </div>
  );
};

export default Hero2;