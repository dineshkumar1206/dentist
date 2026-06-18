import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Calendar, ShieldCheck, Star, ArrowRight, Award } from 'lucide-react';
import gsap from 'gsap';
import FormService from '../components/FormService';
import BlurText from "../components/BlurText"; 
import ImageGlareHover from "../components/ImageGlareHover";

/* ─── Design token: Uniform Font Family & Flyer Palette ─── */
const FONT_FAMILY = "'Outfit', system-ui, sans-serif";
const PRIMARY_PURPLE = "#682187"; // Core color from flyer
const DARK_PURPLE = "#4c1263";

/* ─── Breakpoint hook ─── */
const useBreakpoint = () => {
  const [bp, setBp] = useState({ isMobile: false, isTablet: false });
  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setBp({ isMobile: w < 640, isTablet: w >= 640 && w < 1024 });
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return bp;
};

/* ─── Stat pill ─── */
const StatPill = ({ icon: Icon, value, label, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    style={{
      display: 'flex', alignItems: 'center', gap: 10,
      background: 'rgba(255,255,255,0.88)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255,255,255,0.92)',
      borderRadius: 14, padding: '11px 15px',
      boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
      flex: '1 1 130px', minWidth: 0,
    }}
  >
    <div style={{ width: 34, height: 34, borderRadius: 10, flexShrink: 0, background: color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Icon size={15} color="#fff" strokeWidth={2} />
    </div>
    <div style={{ minWidth: 0 }}>
      <div style={{ fontFamily: FONT_FAMILY, fontWeight: 700, fontSize: 13, color: '#0f172a', letterSpacing: '-0.02em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{value}</div>
      <div style={{ fontFamily: FONT_FAMILY, fontSize: 11, color: '#94a3b8', marginTop: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</div>
    </div>
  </motion.div>
);

/* ─── Availability card ─── */
const AvailabilityCard = ({ isMobile, onBookClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    style={{
      position: 'absolute',
      bottom: isMobile ? 14 : 26,
      left: isMobile ? 10 : -32,
      background: 'rgba(255,255,255,0.97)',
      backdropFilter: 'blur(20px)',
      borderRadius: 15, padding: '11px 15px',
      boxShadow: '0 8px 28px rgba(0,0,0,0.11)',
      border: '1px solid rgba(255,255,255,0.9)',
      minWidth: isMobile ? 164 : 205,
      zIndex: 15,
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <motion.div
        animate={{ scale: [1, 1.35, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', flexShrink: 0 }}
      />
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: FONT_FAMILY, fontSize: 10, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Next Available</div>
        <div style={{ fontFamily: FONT_FAMILY, fontSize: 13, fontWeight: 700, color: '#0f172a', marginTop: 1 }}>Today · 2:30 PM</div>
      </div>
      <motion.button 
        whileHover={{ scale: 1.05 }} 
        whileTap={{ scale: 0.96 }}
        onClick={onBookClick}
        style={{ background: PRIMARY_PURPLE, color: '#fff', border: 'none', borderRadius: 8, padding: '5px 10px', fontFamily: FONT_FAMILY, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}
      >
        Book
      </motion.button>
    </div>
  </motion.div>
);

/* ─── Rating card ─── */
const RatingCard = ({ isMobile }) => (
  <motion.div
    initial={{ opacity: 0, x: -14 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 1.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    style={{
      position: 'absolute',
      top: isMobile ? 10 : 32,
      right: isMobile ? 10 : -22,
      background: 'rgba(255,255,255,0.97)',
      backdropFilter: 'blur(20px)',
      borderRadius: 15, padding: '11px 15px',
      boxShadow: '0 8px 28px rgba(0,0,0,0.09)',
      border: '1px solid rgba(255,255,255,0.9)',
      zIndex: 15,
    }}
  >
    <div style={{ display: 'flex', gap: 2, marginBottom: 4 }}>
      {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#f59e0b" color="#f59e0b" />)}
    </div>
    <div style={{ fontFamily: FONT_FAMILY, fontSize: 15, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.03em' }}>4.9 / 5.0</div>
    <div style={{ fontFamily: FONT_FAMILY, fontSize: 10, color: '#94a3b8', marginTop: 1, fontWeight: 500 }}>500+ reviews</div>
  </motion.div>
);

/* ─── Services strip ─── */
const ServicesStrip = ({ isMobile }) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    style={{
      position: 'absolute',
      bottom: isMobile ? -18 : -20,
      left: '50%', transform: 'translateX(-50%)',
      background: 'rgba(255,255,255,0.97)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(255,255,255,0.9)',
      borderRadius: 13, padding: '9px 16px',
      display: 'flex', alignItems: 'center', gap: isMobile ? 10 : 16,
      boxShadow: '0 6px 24px rgba(0,0,0,0.07)',
      whiteSpace: 'nowrap', zIndex: 15,
    }}
  >
    {[
      { label: isMobile ? 'Whitening' : 'Teeth Whitening', color: '#a855f7' },
      { label: 'Implants', color: PRIMARY_PURPLE },
      { label: 'Orthodontics', color: '#6366f1' },
    ].map(({ label, color }) => (
      <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <div style={{ width: 7, height: 7, borderRadius: '50%', background: color }} />
        <span style={{ fontFamily: FONT_FAMILY, fontSize: isMobile ? 10 : 12, fontWeight: 600, color: '#334155' }}>{label}</span>
      </div>
    ))}
  </motion.div>
);

/* ══════════════════════════════════════
    MAIN HERO COMPONENT
══════════════════════════════════════ */
const Hero = () => {
  const { isMobile, isTablet } = useBreakpoint();
  const isStacked = isMobile || isTablet;

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Framer Motion Background Blobs
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const blobX = useTransform(springX, v => `${v * 0.015}px`);
  const blobY = useTransform(springY, v => `${v * 0.015}px`);

  // Refs for GSAP Magnetic Button Animations
  const primaryBtnRef = useRef(null);
  const secondaryBtnRef = useRef(null);

  useEffect(() => {
    // Apply magnetic animations only on non-mobile devices
    if (window.innerWidth < 640) return;

    const setupMagneticButton = (buttonRef) => {
      const el = buttonRef.current;
      if (!el) return;

      const onMouseMove = (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(el, {
          x: x * 0.35,
          y: y * 0.35,
          scale: 1.03,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      const onMouseLeave = () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "elastic.out(1, 0.4)"
        });
      };

      el.addEventListener('mousemove', onMouseMove);
      el.addEventListener('mouseleave', onMouseLeave);

      return () => {
        el.removeEventListener('mousemove', onMouseMove);
        el.removeEventListener('mouseleave', onMouseLeave);
      };
    };

    const cleanupPrimary = setupMagneticButton(primaryBtnRef);
    const cleanupSecondary = setupMagneticButton(secondaryBtnRef);

    return () => {
      if (cleanupPrimary) cleanupPrimary();
      if (cleanupSecondary) cleanupSecondary();
    };
  }, []);

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const cv = { hidden: {}, visible: { transition: { staggerChildren: 0.11, delayChildren: 0.2 } } };
  const su = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } } };

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        /* ── Layout & Image Colors ── */
        .h-root { position: relative; min-height: 100vh; background: #fcfbfe; overflow: hidden; display: flex; align-items: center; }
        .h-inner { max-width: 1280px; margin: 0 auto; padding: 96px 40px 80px; width: 100%; position: relative; z-index: 1; }
        .h-grid  { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center; }

        @media (max-width: 1023px) {
          .h-inner { padding: 96px 32px 80px; }
          .h-grid  { grid-template-columns: 1fr; gap: 48px; }
          .h-img-col { order: -1; }
        }

        @media (max-width: 639px) {
          .h-inner { padding: 100px 18px 72px; }
          .h-grid  { gap: 36px; }
        }

        /* ── Typography ── */
        .h-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: ${FONT_FAMILY}; font-size: 11px; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase; color: ${PRIMARY_PURPLE};
          background: rgba(104,33,135,0.07); padding: 6px 14px;
          border-radius: 100px; border: 1px solid rgba(104,33,135,0.14);
          margin-bottom: 20px;
        }

        .h-h1 {
          font-family: ${FONT_FAMILY}; 
          font-weight: 700;
          font-size: clamp(28px, 4vw, 52px);
          line-height: 1.15; 
          color: #0f172a;
          margin: 0 0 20px; 
          letter-spacing: -0.02em;
        }
        @media (max-width: 1023px) {
          .h-h1 { font-size: clamp(30px, 5.5vw, 46px); }
        }
        @media (max-width: 639px) { 
          .h-h1 { 
            font-size: clamp(26px, 7.5vw, 34px); 
            line-height: 1.2;
            letter-spacing: -0.01em;
          } 
        }

        .h-h1 > span { display: inline; }
        .h-divider { width: 48px; height: 3px; background: linear-gradient(90deg, ${PRIMARY_PURPLE}, #a855f7); border-radius: 2px; margin-bottom: 22px; }

        .h-desc {
          font-family: ${FONT_FAMILY}; font-size: 16px; line-height: 1.75;
          color: #52525b; font-weight: 300; margin: 0 0 34px; max-width: 480px;
        }
        @media (max-width: 1023px) { .h-desc { max-width: 100%; } }
        @media (max-width: 639px)  { .h-desc { font-size: 15px; } }

        /* ── GSAP Animated CTAs ── */
        .h-cta-row { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 40px; }

        .h-btn-p {
          background: linear-gradient(135deg, ${PRIMARY_PURPLE} 0%, ${DARK_PURPLE} 100%);
          color: #fff; border: none; border-radius: 14px; padding: 15px 28px;
          font-family: ${FONT_FAMILY}; font-size: 15px; font-weight: 600;
          cursor: pointer; display: inline-flex; align-items: center; gap: 8px;
          letter-spacing: -0.01em; box-shadow: 0 4px 24px rgba(104,33,135,0.3);
          will-change: transform; white-space: nowrap;
        }

        .h-btn-s {
          background: transparent; color: #3f3f46;
          border: 1.5px solid #e4e4e7; border-radius: 14px; padding: 15px 22px;
          font-family: ${FONT_FAMILY}; font-size: 15px; font-weight: 500;
          cursor: pointer; display: inline-flex; align-items: center; gap: 8px;
          will-change: transform; white-space: nowrap;
          background: #fff;
        }

        @media (max-width: 479px) {
          .h-cta-row { flex-direction: column; }
          .h-btn-p, .h-btn-s { width: 100%; justify-content: center; }
        }

        /* ── Stats ── */
        .h-stats { display: flex; gap: 10px; flex-wrap: wrap; }

        /* ── Image frame ── */
        .h-img-wrap { position: relative; width: 100%; max-width: 480px; margin: 0 auto; }
        @media (max-width: 1023px) { .h-img-wrap { max-width: 520px; } }

        .h-img-frame {
          position: relative; width: 100%; aspect-ratio: 4/5;
          border-radius: 28px; overflow: hidden;
          background: linear-gradient(145deg, #f3e8ff, #fae8ff);
          box-shadow: 0 28px 72px rgba(104,33,135,0.1); z-index: 1;
        }
        @media (max-width: 639px) { .h-img-frame { aspect-ratio: 3/4; border-radius: 20px; } }

        .h-img-frame img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .h-img-fade {
          position: absolute; bottom: 0; left: 0; right: 0; height: 35%;
          background: linear-gradient(to top, rgba(76,18,99,0.15), transparent);
          pointer-events: none; z-index: 2;
        }

        .h-ring {
          position: absolute; top: -20px; right: -20px;
          width: 72%; height: 72%; border-radius: 50%;
          border: 1.5px dashed rgba(104,33,135,0.2);
          pointer-events: none; z-index: 0;
        }
        @media (max-width: 1023px) { .h-ring { display: none; } }
      `}</style>

      <section className="h-root" onMouseMove={handleMouseMove}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 1px 1px, #f1f0f5 1px, transparent 0)', backgroundSize: '30px 30px', opacity: 0.72, pointerEvents: 'none' }} />

        {/* Ambient background glows tailored to flyer artwork */}
        <motion.div style={{ x: blobX, y: blobY, position: 'absolute', top: '0%', left: '-10%', width: 560, height: 560, borderRadius: '50%', background: 'radial-gradient(circle, rgba(243,232,255,0.6) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <motion.div style={{ x: blobX, y: blobY, position: 'absolute', bottom: '-8%', right: '-6%', width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(circle, rgba(250,232,255,0.4) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="h-inner">
          <div className="h-grid">

            {/* ── TEXT CONTENT SECTION ── */}
            <motion.div variants={cv} initial="hidden" animate="visible">
              <motion.div variants={su}>
                <span className="h-eyebrow">
                  <motion.span
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ repeat: Infinity, duration: 2.5 }}
                    style={{ width: 6, height: 6, borderRadius: '50%', background: PRIMARY_PURPLE, display: 'inline-block', flexShrink: 0 }}
                  />
                  Now Accepting New Patients
                </span>
              </motion.div>

              <motion.h1 variants={su} className="h-h1">
                <BlurText
                  text="Expert Care for a Brighter, Healthier Smile"
                  delay={150}
                  animateBy="words"
                  direction="top"
                />
              </motion.h1>

              <motion.div variants={su} className="h-divider" />

              <motion.p variants={su} className="h-desc">
                World-class dental care, tailored uniquely to you. From routine checkups to complete cosmetic makeovers — delivered with cutting-edge technology in a calm, welcoming environment.
              </motion.p>

              {/* GSAP Driven Action Layer */}
              <motion.div variants={su} className="h-cta-row">
                <button 
                  ref={primaryBtnRef}
                  className="h-btn-p" 
                  onClick={() => setIsModalOpen(true)}
                >
                  <Calendar size={16} strokeWidth={2.2} />
                  Book Free Consultation
                </button>
                <button 
                  ref={secondaryBtnRef}
                  className="h-btn-s"
                >
                  Explore Services
                  <ArrowRight size={15} strokeWidth={2} />
                </button>
              </motion.div>

              <motion.div variants={su} className="h-stats">
                <StatPill icon={Star}        value="4.9 / 5.0"   label="500+ Patient Reviews" color="#f59e0b" delay={0.85} />
                <StatPill icon={ShieldCheck} value="FDA Approved" label="Certified Technology"  color="#10b981" delay={0.95} />
                <StatPill icon={Award}       value="16+ Years"    label="Clinical Experience"   color={PRIMARY_PURPLE} delay={1.05} />
              </motion.div>
            </motion.div>

            {/* ── VISUAL WRAPPER WITH GLARE ── */}
            <motion.div
              className="h-img-col"
              initial={{ opacity: 0, scale: 0.93, x: isStacked ? 0 : 36 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <div className="h-img-wrap">
                <div className="h-ring" />

                <ImageGlareHover 
                  glareColor="#ffffff" 
                  glareOpacity={0.3} 
                  glareSize={240} 
                  borderRadius={isMobile ? "20px" : "28px"}
                >
                  <div className="h-img-frame">
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 2 }} />
                    <img
                      src="/images/img-2.png"
                      alt="Modern clinical dental setup"
                    />
                    <div className="h-img-fade" />
                  </div>
                </ImageGlareHover>

                {/* Overlaid spatial content */}
                <AvailabilityCard isMobile={isMobile} onBookClick={() => setIsModalOpen(true)} />
                <RatingCard      isMobile={isMobile} />
                <ServicesStrip   isMobile={isMobile} />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <FormService 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        accentColor={PRIMARY_PURPLE}
        serviceName="Select a specialty service"
        defaultService="Select a specialty service"
      />
    </>
  );
};

export default Hero;