import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Animated Teeth Logo ─────────────────────────────────────────────────── */
const TeethLogo = () => {
  return (
    <svg
      viewBox="0 0 160 90"
      xmlns="http://www.w3.org/2000/svg"
      className="w-36 h-20 drop-shadow-xl"
    >
      {/* ── Upper gum arc ── */}
      <motion.path
        d="M10 42 Q80 10 150 42"
        fill="none"
        stroke="#c084fc"
        strokeWidth="5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />

      {/* ── Gum fill behind upper teeth ── */}
      <motion.path
        d="M10 42 Q80 10 150 42 L150 50 Q80 20 10 50 Z"
        fill="#9b59b6"
        opacity="0.3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 0.5 }}
      />

      {/* ── Upper teeth (7 teeth) ── */}
      {[
        { x: 16,  y: 36, w: 14, h: 20, r: "3 3 5 5", delay: 0.1 },
        { x: 32,  y: 30, w: 16, h: 24, r: "3 3 5 5", delay: 0.18 },
        { x: 50,  y: 26, w: 16, h: 26, r: "3 3 5 5", delay: 0.26 },
        { x: 68,  y: 25, w: 16, h: 26, r: "3 3 5 5", delay: 0.34 },
        { x: 86,  y: 26, w: 16, h: 26, r: "3 3 5 5", delay: 0.42 },
        { x: 104, y: 30, w: 16, h: 24, r: "3 3 5 5", delay: 0.50 },
        { x: 122, y: 36, w: 14, h: 20, r: "3 3 5 5", delay: 0.58 },
      ].map((t, i) => (
        <motion.rect
          key={`upper-${i}`}
          x={t.x}
          y={t.y}
          width={t.w}
          height={t.h}
          rx="3"
          ry="5"
          fill="url(#toothGrad)"
          stroke="#7c3aed"
          strokeWidth="0.8"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ delay: t.delay, duration: 0.4, ease: "backOut" }}
          style={{ transformOrigin: `${t.x + t.w / 2}px ${t.y}px` }}
        />
      ))}

      {/* ── Lower gum arc ── */}
      <motion.path
        d="M10 58 Q80 88 150 58"
        fill="none"
        stroke="#c084fc"
        strokeWidth="5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
      />

      {/* ── Gum fill behind lower teeth ── */}
      <motion.path
        d="M10 58 Q80 88 150 58 L150 50 Q80 78 10 50 Z"
        fill="#9b59b6"
        opacity="0.3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 0.6 }}
      />

      {/* ── Lower teeth (7 teeth) ── */}
      {[
        { x: 16,  y: 44, w: 14, h: 18, delay: 0.65 },
        { x: 32,  y: 42, w: 16, h: 22, delay: 0.72 },
        { x: 50,  y: 40, w: 16, h: 24, delay: 0.79 },
        { x: 68,  y: 39, w: 16, h: 24, delay: 0.86 },
        { x: 86,  y: 40, w: 16, h: 24, delay: 0.93 },
        { x: 104, y: 42, w: 16, h: 22, delay: 1.00 },
        { x: 122, y: 44, w: 14, h: 18, delay: 1.07 },
      ].map((t, i) => (
        <motion.rect
          key={`lower-${i}`}
          x={t.x}
          y={t.y}
          width={t.w}
          height={t.h}
          rx="3"
          ry="5"
          fill="url(#toothGrad)"
          stroke="#7c3aed"
          strokeWidth="0.8"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ delay: t.delay, duration: 0.4, ease: "backOut" }}
          style={{ transformOrigin: `${t.x + t.w / 2}px ${t.y + t.h}px` }}
        />
      ))}

      {/* ── Shine on a couple of upper teeth ── */}
      <motion.ellipse
        cx="60" cy="32" rx="3" ry="6"
        fill="white" opacity="0"
        animate={{ opacity: [0, 0.35, 0] }}
        transition={{ delay: 1.3, duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
      />
      <motion.ellipse
        cx="76" cy="31" rx="3" ry="6"
        fill="white" opacity="0"
        animate={{ opacity: [0, 0.35, 0] }}
        transition={{ delay: 1.5, duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
      />

      {/* ── Gradient def ── */}
      <defs>
        <linearGradient id="toothGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#f3e8ff" />
          <stop offset="40%"  stopColor="#e9d5ff" />
          <stop offset="100%" stopColor="#c084fc" />
        </linearGradient>
      </defs>
    </svg>
  );
};

/* ── Preloader ───────────────────────────────────────────────────────────── */
const Preloader = ({ isLoading }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) { clearInterval(interval); return 100; }
        return prev + 1;
      });
    }, 20);
    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-50"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: -100,
            transition: { duration: 0.8, ease: "easeInOut" },
          }}
        >
          <div className="relative flex flex-col items-center">

            {/* Pulsing background glow */}
            <motion.div
              className="absolute w-48 h-48 rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, #d8b4fe55 0%, #a855f722 60%, transparent 80%)" }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Teeth logo — gentle float */}
            <motion.div
              className="relative z-10"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <TeethLogo />
            </motion.div>

            {/* Clinic name */}
            <motion.div
              className="mt-5 text-center"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <div
                className="text-3xl font-black text-slate-800 leading-none"
                style={{ fontFamily: "'Inter','Segoe UI',sans-serif", letterSpacing: "0.18em" }}
              >
                RANGA'S
              </div>
              <div
                className="text-sm font-bold text-slate-400 mt-0.5"
                style={{ letterSpacing: "0.28em" }}
              >
                DENTAL CLINIC
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.p
              className="mt-2 text-xs font-medium tracking-widest uppercase text-purple-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              Crafting Perfect Smiles
            </motion.p>

            {/* Progress bar */}
            <div className="w-48 h-1.5 bg-slate-200 rounded-full mt-6 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(to right, #c084fc, #7c3aed)",
                  transition: "width 0.02s linear",
                }}
              />
            </div>

            <span className="mt-2 text-xs font-semibold text-purple-500">
              {progress}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;