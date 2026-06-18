import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Calendar, ShieldCheck, Star, ArrowRight, Award } from 'lucide-react';
import gsap from 'gsap';
import FormService from '../components/FormService';
import BlurText from "../components/BlurText"; 
import ImageGlareHover from "../components/ImageGlareHover";

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
    className="flex items-center gap-[10px] bg-white/88 backdrop-blur-[12px] border border-white/92 rounded-[14px] p-[11px_15px] shadow-[0_2px_16px_rgba(0,0,0,0.04)] flex-[1_1_130px] min-w-0"
  >
    <div 
      style={{ background: color }}
      className="w-[34px] h-[34px] rounded-[10px] shrink-0 flex items-center justify-center"
    >
      <Icon size={15} color="#fff" strokeWidth={2} />
    </div>
    <div className="min-w-0">
      <div className="font-['Outfit',_system-ui,_sans-serif] font-bold text-[13px] text-[#0f172a] tracking-[-0.02em] overflow-hidden text-ellipsis whitespace-nowrap">
        {value}
      </div>
      <div className="font-['Outfit',_system-ui,_sans-serif] text-[11px] text-[#94a3b8] mt-px overflow-hidden text-ellipsis whitespace-nowrap">
        {label}
      </div>
    </div>
  </motion.div>
);

/* ─── Availability card ─── */
const AvailabilityCard = ({ isMobile, onBookClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    className={`absolute bg-white/97 backdrop-blur-[20px] rounded-[15px] p-[11px_15px] shadow-[0_8px_28px_rgba(0,0,0,0.11)] border border-white/90 z-15
      ${isMobile ? 'bottom-[14px] left-[10px] min-w-[164px]' : 'bottom-[26px] -left-[32px] min-w-[205px]'}`}
  >
    <div className="flex items-center gap-2">
      <motion.div
        animate={{ scale: [1, 1.35, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="w-2 h-2 rounded-full bg-[#10b981] shrink-0"
      />
      <div className="flex-1">
        <div className="font-['Outfit',_system-ui,_sans-serif] text-[10px] text-[#64748b] uppercase tracking-[0.08em] font-semibold">
          Next Available
        </div>
        <div className="font-['Outfit',_system-ui,_sans-serif] text-[13px] font-bold text-[#0f172a] mt-px">
          Today · 2:30 PM
        </div>
      </div>
      <motion.button 
        whileHover={{ scale: 1.05 }} 
        whileTap={{ scale: 0.96 }}
        onClick={onBookClick}
        className="bg-[#682187] text-white border-none rounded-lg p-[5px_10px] font-['Outfit',_system-ui,_sans-serif] text-[11px] font-bold cursor-pointer"
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
    className={`absolute bg-white/97 backdrop-blur-[20px] rounded-[15px] p-[11px_15px] shadow-[0_8px_28px_rgba(0,0,0,0.09)] border border-white/90 z-15
      ${isMobile ? 'top-[10px] right-[10px]' : 'top-[32px] -right-[22px]'}`}
  >
    <div className="flex gap-0.5 mb-1">
      {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#f59e0b" color="#f59e0b" />)}
    </div>
    <div className="font-['Outfit',_system-ui,_sans-serif] text-15 font-bold text-[#0f172a] tracking-[-0.03em]">
      4.9 / 5.0
    </div>
    <div className="font-['Outfit',_system-ui,_sans-serif] text-[10px] text-[#94a3b8] mt-px font-medium">
      500+ reviews
    </div>
  </motion.div>
);

/* ─── Services strip ─── */
const ServicesStrip = ({ isMobile }) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className={`absolute left-1/2 -translate-x-1/2 bg-white/97 backdrop-blur-[16px] border border-white/90 rounded-[13px] p-[9px_16px] flex items-center shadow-[0_6px_24px_rgba(0,0,0,0.07)] whitespace-nowrap z-15
      ${isMobile ? '-bottom-[18px] gap-[10px]' : '-bottom-[20px] gap-4'}`}
  >
    {[
      { label: isMobile ? 'Whitening' : 'Teeth Whitening', color: '#a855f7' },
      { label: 'Implants', color: '#682187' },
      { label: 'Orthodontics', color: '#6366f1' },
    ].map(({ label, color }) => (
      <div key={label} className="flex items-center gap-1.25">
        <div style={{ background: color }} className="w-[7px] h-[7px] rounded-full" />
        <span className={`font-['Outfit',_system-ui,_sans-serif] font-semibold text-[#334155] ${isMobile ? 'text-[10px]' : 'text-xs'}`}>
          {label}
        </span>
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

  // Ref for Primary GSAP Magnetic Button Animation
  const primaryBtnRef = useRef(null);

  useEffect(() => {
    if (window.innerWidth < 640) return;

    const el = primaryBtnRef.current;
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
      <section className="relative min-h-screen bg-[#fcfbfe] overflow-hidden flex items-center select-none" onMouseMove={handleMouseMove}>
        {/* Grid pattern background overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#f1f0f5_1px,transparent_0)] bg-[size:30px_30px] opacity-72 pointer-events-none" />

        {/* Ambient background glows */}
        <motion.div style={{ x: blobX, y: blobY }} className="absolute top-0 -left-[10%] w-[560px] h-[560px] rounded-full bg-[radial-gradient(circle,rgba(243,232,255,0.6)_0%,transparent_70%)] pointer-events-none" />
        <motion.div style={{ x: blobX, y: blobY }} className="absolute -bottom-[8%] -right-[6%] w-[480px] h-[480px] rounded-full bg-[radial-gradient(circle,rgba(250,232,255,0.4)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-[1280px] mx-auto w-full z-1 relative p-[96px_40px_80px] max-lg:p-[96px_32px_80px] max-sm:p-[100px_18px_72px]">
          <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-[72px] max-lg:gap-12 max-sm:gap-9 items-center">

            {/* ── TEXT CONTENT SECTION ── */}
            <motion.div variants={cv} initial="hidden" animate="visible">
              <motion.div variants={su}>
                <span className="inline-flex items-center gap-2 font-['Outfit',_system-ui,_sans-serif] text-[11px] font-semibold tracking-[0.12em] uppercase text-[#682187] bg-[rgba(104,33,135,0.07)] p-[6px_14px] rounded-full border border-[rgba(104,33,135,0.14)] mb-5">
                  <motion.span
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ repeat: Infinity, duration: 2.5 }}
                    className="w-1.5 h-1.5 rounded-full bg-[#682187] inline-block shrink-0"
                  />
                  Now Accepting New Patients
                </span>
              </motion.div>

              <motion.h1 variants={su} className="font-['Outfit',_system-ui,_sans-serif] font-bold text-[clamp(28px,4vw,52px)] max-lg:text-[clamp(30px,5.5vw,46px)] max-sm:text-[clamp(26px,7.5vw,34px)] leading-[1.15] max-sm:leading-1.2 text-[#0f172a] m-[0_0_20px] tracking-[-0.02em] max-sm:tracking-[-0.01em] [&>span]:inline">
                <BlurText
                  text="Expert Care for a Brighter, Healthier Smile"
                  delay={150}
                  animateBy="words"
                  direction="top"
                />
              </motion.h1>

              <motion.div variants={su} className="w-12 h-[3px] bg-gradient-to-r from-[#682187] to-[#a855f7] rounded-[2px] mb-[22px]" />

              <motion.p variants={su} className="font-['Outfit',_system-ui,_sans-serif] text-base max-sm:text-[15px] leading-[1.75] text-[#52525b] font-light m-[0_0_34px] max-w-[480px] max-lg:max-w-none">
                World-class dental care, tailored uniquely to you. From routine checkups to complete cosmetic makeovers — delivered with cutting-edge technology in a calm, welcoming environment.
              </motion.p>

              {/* Action Buttons Layer */}
              <motion.div variants={su} className="flex gap-3.5 flex-wrap items-center mb-10 max-[479px]:flex-col max-[479px]:items-stretch">
                <button 
                  ref={primaryBtnRef}
                  className="bg-gradient-to-br from-[#682187] to-[#4c1263] text-white border-none rounded-[14px] p-[15px_28px] font-['Outfit',_system-ui,_sans-serif] text-15 font-semibold cursor-pointer inline-flex items-center gap-2 tracking-[-0.01em] shadow-[0_4px_24px_rgba(104,33,135,0.3)] will-change-transform whitespace-nowrap max-[479px]:w-full max-[479px]:justify-center" 
                  onClick={() => setIsModalOpen(true)}
                >
                  <Calendar size={16} strokeWidth={2.2} />
                  Book Free Consultation
                </button>
                
                {/* Secondary Button Custom Capsule style */}
                <button className="group bg-[#8c7c96] hover:bg-[#8c43ad] text-white border-none rounded-full p-[8px_8px_8px_24px] font-['Outfit',_system-ui,_sans-serif] text-15 font-semibold cursor-pointer inline-flex items-center gap-4 whitespace-nowrap transition-all duration-400 cubic-bezier(0.25,_1,_0.5,_1) shadow-[0_4px_14px_rgba(104,33,135,0.06)] hover:shadow-[0_6px_20px_rgba(104,33,135,0.2)] max-[479px]:w-full max-[479px]:justify-between">
                  Explore Services
                  <div className="w-[38px] h-[38px] bg-white rounded-full flex items-center justify-center text-[#8c7c96] group-hover:text-[#581c74] transition-all duration-400 cubic-bezier(0.25,_1,_0.5,_1) group-hover:scale-[1.05]">
                    <ArrowRight size={18} strokeWidth={2.5} className="transition-transform duration-400 cubic-bezier(0.25,_1,_0.5,_1) group-hover:-rotate-45" />
                  </div>
                </button>
              </motion.div>

              <motion.div variants={su} className="flex gap-2.5 flex-wrap">
                <StatPill icon={Star}        value="4.9 / 5.0"   label="500+ Patient Reviews" color="#f59e0b" delay={0.85} />
                <StatPill icon={ShieldCheck} value="FDA Approved" label="Certified Technology"  color="#10b981" delay={0.95} />
                <StatPill icon={Award}       value="16+ Years"    label="Clinical Experience"   color="#682187" delay={1.05} />
              </motion.div>
            </motion.div>

            {/* ── VISUAL WRAPPER WITH GLARE ── */}
            <motion.div
              className="flex justify-center max-lg:order-first"
              initial={{ opacity: 0, scale: 0.93, x: isStacked ? 0 : 36 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            >
              <div className="relative w-full max-w-[480px] max-lg:max-w-[520px] mx-auto">
                <div className="absolute -top-5 -right-5 w-[72%] h-[72%] rounded-full border border-dashed border-[rgba(104,33,135,0.2)] pointer-events-none z-0 max-lg:hidden" />

                <ImageGlareHover 
                  glareColor="#ffffff" 
                  glareOpacity={0.3} 
                  glareSize={240} 
                  borderRadius={isMobile ? "20px" : "28px"}
                >
                  <div className="relative w-full aspect-[4/5] max-sm:aspect-[3/4] rounded-[28px] max-sm:rounded-[20px] overflow-hidden bg-gradient-to-br from-[#f3e8ff] to-[#fae8ff] shadow-[0_28px_72px_rgba(104,33,135,0.1)] z-1">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/12 to-transparent pointer-events-none z-2" />
                    <img
                      src="/images/img-2.png"
                      alt="Modern clinical dental setup"
                      className="w-full h-full object-cover block"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-[35%] bg-gradient-to-t from-[rgba(76,18,99,0.15)] to-transparent pointer-events-none z-2" />
                  </div>
                </ImageGlareHover>

                {/* Overlaid content items */}
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
        accentColor="#682187"
        serviceName="Select a specialty service"
        defaultService="Select a specialty service"
      />
    </>
  );
};

export default Hero;