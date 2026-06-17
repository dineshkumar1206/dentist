import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

// Counter that loops: counts up 0→15, pauses, resets, repeats
const AnimatedCounter = () => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let raf;
    let running = true;

    const runCycle = () => {
      const duration = 1800;
      const pauseAfter = 2200;
      const start = performance.now();

      const step = (now) => {
        if (!running) return;
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(Math.round(eased * 15));
        if (progress < 1) {
          raf = requestAnimationFrame(step);
        } else {
          // pause then reset
          setTimeout(() => {
            if (!running) return;
            setDisplay(0);
            setTimeout(() => {
              if (running) runCycle();
            }, 200);
          }, pauseAfter);
        }
      };

      raf = requestAnimationFrame(step);
    };

    runCycle();
    return () => {
      running = false;
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <span className="tabular-nums">
      {display}
      <motion.span
        className="text-amber-500"
        animate={{ opacity: display === 15 ? [1, 0.4, 1] : 1 }}
        transition={{ duration: 0.6, repeat: display === 15 ? Infinity : 0 }}
      >
        +
      </motion.span>
    </span>
  );
};

// Orbiting dot around the tooth
const OrbitDot = ({ radius, duration, delay, color, size }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      background: color,
      top: "50%",
      left: "50%",
      marginTop: -size / 2,
      marginLeft: -size / 2,
    }}
    animate={{
      x: [
        Math.cos(0) * radius,
        Math.cos(Math.PI * 0.5) * radius,
        Math.cos(Math.PI) * radius,
        Math.cos(Math.PI * 1.5) * radius,
        Math.cos(Math.PI * 2) * radius,
      ],
      y: [
        Math.sin(0) * radius,
        Math.sin(Math.PI * 0.5) * radius,
        Math.sin(Math.PI) * radius,
        Math.sin(Math.PI * 1.5) * radius,
        Math.sin(Math.PI * 2) * radius,
      ],
      opacity: [0.6, 1, 0.6, 1, 0.6],
    }}
    transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
  />
);

// Sparkle star
const Sparkle = ({ delay, x, y, size }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ left: x, top: y }}
    initial={{ opacity: 0, scale: 0, rotate: 0 }}
    animate={{ opacity: [0, 1, 0], scale: [0, size, 0], rotate: [0, 180, 360] }}
    transition={{ duration: 2.5, delay, repeat: Infinity, repeatDelay: 1.8, ease: "easeInOut" }}
  >
    <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
      <path d="M6 0L7 5L12 6L7 7L6 12L5 7L0 6L5 5L6 0Z" fill="#F59E0B" />
    </svg>
  </motion.div>
);

export default function MainHero() {
  const toothControls = useAnimation();

  useEffect(() => {
    toothControls.start({
      y: [0, -6, 0],
      rotate: [-1.5, 1.5, -1.5],
      transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
    });
  }, [toothControls]);

  const sparkles = [
    { delay: 0,   x: "8%",  y: "8%",  size: 1.1 },
    { delay: 0.7, x: "82%", y: "12%", size: 0.9 },
    { delay: 1.2, x: "88%", y: "78%", size: 1.0 },
    { delay: 0.4, x: "10%", y: "82%", size: 0.8 },
    { delay: 1.7, x: "48%", y: "4%",  size: 1.0 },
    { delay: 1.0, x: "4%",  y: "46%", size: 0.75},
    { delay: 1.4, x: "93%", y: "44%", size: 0.7 },
  ];

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden bg-white">

      {/* ── Banner Image — NO colour overlay ── */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
      >
        <img
          src="/images/home-banner-1.png"
          alt="Amethyst Dental & Aesthetics"
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* ── Floating Experience Card ── */}
      <div className="absolute inset-0 flex items-center justify-center sm:items-center sm:justify-start sm:pl-14 md:pl-20">
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 60, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Ambient amber glow behind card */}
          <motion.div
            className="absolute inset-0 rounded-3xl"
            style={{
              background: "radial-gradient(ellipse at center, rgba(245,158,11,0.22) 0%, transparent 72%)",
              filter: "blur(28px)",
            }}
            animate={{ opacity: [0.5, 0.85, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Card — Wider width adjusted via minWidth */}
          <motion.div
            className="relative bg-white/80 backdrop-blur-2xl border border-amber-100 rounded-3xl flex flex-col items-center gap-6 shadow-2xl"
            style={{ minWidth: 380, padding: "2.5rem 3rem" }}
            whileHover={{ scale: 1.03, boxShadow: "0 36px 72px rgba(15,23,42,0.18)" }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
          >
            {/* Sparkles */}
            {sparkles.map((s, i) => <Sparkle key={i} {...s} />)}

            {/* ── Tooth icon with orbit rings ── */}
            <div className="relative flex items-center justify-center" style={{ width: 140, height: 140 }}>

              {/* Outer slow-spin dashed ring */}
              <motion.div
                className="absolute rounded-full border-2 border-dashed border-amber-400/30"
                style={{ width: 136, height: 136 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />

              {/* Inner counter-spin solid ring */}
              <motion.div
                className="absolute rounded-full border border-amber-300/40"
                style={{ width: 108, height: 108 }}
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              />

              {/* Pulsing glow disc */}
              <motion.div
                className="absolute rounded-full bg-amber-400/10"
                style={{ width: 90, height: 90 }}
                animate={{ scale: [1, 1.3, 1], opacity: [0.35, 0.6, 0.35] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Orbiting dots */}
              <OrbitDot radius={62} duration={6}  delay={0}    color="#F59E0B" size={7} />
              <OrbitDot radius={62} duration={6}  delay={3}    color="#FCD34D" size={5} />
              <OrbitDot radius={50} duration={9}  delay={1.5}  color="#D97706" size={4} />

              {/* Tooth Image Custom Asset */}
              <motion.div animate={toothControls} className="relative z-10">
                <motion.div
                  initial={{ rotateY: -90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
                >
                  <img 
                    src="/images/banner-tooth-icon.png" 
                    alt="Tooth Icon" 
                    className="w-20 h-20 object-contain drop-shadow-[0_6px_20px_rgba(217,119,6,0.4)]" 
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* Divider */}
            <motion.div
              className="h-px bg-gradient-to-r from-transparent via-amber-400/70 to-transparent"
              style={{ width: "70%" }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 1.4 }}
            />

            {/* ── Counter section ── */}
            <div className="flex flex-col items-center gap-1.5">
              <motion.div
                className="text-6xl font-extrabold text-slate-800 leading-none tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.2, ease: "easeOut" }}
              >
                <AnimatedCounter />
              </motion.div>

              <motion.p
                className="text-sm font-bold tracking-[0.2em] text-amber-600 uppercase mt-1"
                initial={{ opacity: 0, letterSpacing: "0.05em" }}
                animate={{ opacity: 1, letterSpacing: "0.2em" }}
                transition={{ duration: 1, delay: 1.5 }}
              >
                Years
              </motion.p>

              <motion.p
                className="text-xs font-medium text-slate-500 tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.8 }}
              >
                of Excellence
              </motion.p>
            </div>

            {/* Bottom accent bar */}
            <motion.div
              className="w-full h-1 rounded-full bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 2 }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}