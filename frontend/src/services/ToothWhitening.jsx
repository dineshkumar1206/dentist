import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Shield,
  Clock,
  Smile,
  ChevronRight,
  ChevronLeft,
  Star,
  CalendarCheck,
  Microscope,
  Sparkles,
  ArrowRight,
  Play,
  Pause,
  Volume2,
  VolumeX
} from "lucide-react";
import gsap from 'gsap';
import FormService from "../components/FormService"; 
import BlurText from "../components/BlurText"; 
import ImageGlareHover from "../components/ImageGlareHover"; 

/* ── Design token: Uniform Font Family & Flyer Palette ── */
const FONT_FAMILY = "'Outfit', system-ui, sans-serif";
const PRIMARY_PURPLE = "#682187";
const DARK_PURPLE = "#4c1263";

// ─── Animation helpers ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

function AnimatedSection({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      custom={delay}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const benefits = [
  { icon: Smile, text: "Creates a much brighter, beautifully attractive smile" },
  { icon: Star, text: "Instant boost to your everyday self-confidence and appearance" },
  { icon: Sparkles, text: "Effectively eliminates deep, stubborn stains and discoloration" },
  { icon: Shield, text: "100% safe treatment supervised carefully by dental specialists" },
  { icon: Clock, text: "Delivers incredibly fast, visibly clear, and immediate results" },
  { icon: CheckCircle2, text: "Maintains a vibrant, healthy, and youthful overall aesthetic" },
];

const steps = [
  {
    num: "01",
    title: "Oral Shade Assessment",
    desc: "A thorough examination ensures your teeth and gums are healthy, matching your initial starting shade baseline.",
    icon: Microscope,
  },
  {
    num: "02",
    title: "Enamel Protection",
    desc: "Advanced protective barriers are carefully applied over gums and lips to guarantee total comfort during activation.",
    icon: Shield,
  },
  {
    num: "03",
    title: "Whitening System",
    desc: "Professional-grade, enamel-safe whitening compounds are activated smoothly to deeply lift deep stains.",
    icon: Sparkles,
  },
  {
    num: "04",
    title: "Long-lasting Care",
    desc: "Post-care guidance and a customized plan are provided to help preserve your bright results long-term.",
    icon: Clock,
  },
];

const stats = [
  { value: "Safe", label: "Enamel Protection" },
  { value: "100%", label: "Noticeable Results" },
  { value: "Quick", label: "In-Office Treatment" },
  { value: "4.9★", label: "Patient Rating" },
];

// Carousel Images Pool
const carouselImages = [
  "/images/BA-1.png",
  "/images/BA-2.png",
  "/images/BA-3.png",
  "/images/BA-4.png"
];

const procedureImg = "/images/whitening-importance.png";
const smileImg = "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80";

// ─── Component ────────────────────────────────────────────────────────────────
export default function ToothWhitening() {
  const [activeStep, setActiveStep] = useState(0);
  const [showForm, setShowForm] = useState(false);
  
  // Video Player States
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const percent = (video.currentTime / video.duration) * 100 || 0;
      setVideoProgress(percent);
    };

    const handleVideoEnded = () => {
      setIsVideoPlaying(false);
      setVideoProgress(0);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleVideoEnded);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleVideoEnded);
    };
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isVideoPlaying) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    } else {
      videoRef.current.play();
      setIsVideoPlaying(true);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleProgressClick = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * videoRef.current.duration;
    videoRef.current.currentTime = newTime;
  };
  
  // Carousel States
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState(0); // -1 for left, 1 for right

  // Ref for Primary GSAP Magnetic Button Animation
  const primaryBtnRef = useRef(null);

  // Carousel handlers
  const handleNextSlide = () => {
    setSlideDirection(1);
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const handlePrevSlide = () => {
    setSlideDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const handleDotClick = (index) => {
    setSlideDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  // Drag swipe physics handler for Mobile & Tablet responsive moving
  const handleDragEnd = (event, info) => {
    const swipeThreshold = 50; // Minimum drag distance pixels required to swipe
    if (info.offset.x < -swipeThreshold) {
      handleNextSlide();
    } else if (info.offset.x > swipeThreshold) {
      handlePrevSlide();
    }
  };

  // Automatic Carousel Interval (Updated speed to 2.5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      handleNextSlide();
    }, 2500); // changes slides every 2.5 seconds
    return () => clearInterval(timer);
  }, [currentSlide]);

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

  // Motion Variants for Carousel slide transitions
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] }
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] }
    })
  };

  return (
    <div className="mt-6 bg-[#fcfbfe] text-[#1a2332]" style={{ fontFamily: FONT_FAMILY }}>

      {/* ── FORM MODAL ── */}
      {showForm && (
        <FormService
          serviceName="Professional Tooth Restoration"
          isOpen={showForm}
          onClose={() => setShowForm(false)}
          accentColor={PRIMARY_PURPLE}
        />
      )}

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#f5f2f8] via-[#fcfbfe] to-white pt-24 pb-20 px-6 md:px-16">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-purple-200/30 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[350px] h-[350px] rounded-full bg-fuchsia-200/20 blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[#682187] bg-[rgba(104,33,135,0.07)] border border-[rgba(104,33,135,0.14)] rounded-full px-4 py-1.5 mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#682187] animate-pulse" />
              Cosmetic Dentistry
            </motion.span>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-4xl md:text-5xl font-extrabold leading-[1.15] tracking-tight mb-4 text-[#0f172a]"
            >
              <BlurText
                text="Discover the Power of a Brighter, More Confident Smile"
                delay={150}
                animateBy="words"
                direction="top"
              />
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="h-1 w-16 bg-[#682187] rounded-full mb-6"
            />

            <motion.p
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-[#52525b] text-base font-light leading-relaxed mb-8 max-w-md"
            >
              Explore our before-and-after smile transformations and see the remarkable results achieved through professional teeth whitening and cosmetic dental treatments. Over time, teeth can become stained or discolored due to coffee, tea, smoking, and natural aging. Our advanced dental solutions help restore the natural brightness of your teeth, enhancing both your smile and self-confidence.
            </motion.p>

            {/* Action Buttons Layer */}
            <motion.div
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-4 items-center max-[479px]:flex-col max-[479px]:items-stretch"
            >
              <button
                ref={primaryBtnRef}
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-br from-[#682187] to-[#4c1263] text-white border-none rounded-[14px] p-[15px_28px] text-15 font-semibold cursor-pointer inline-flex items-center gap-2 tracking-[-0.01em] shadow-[0_4px_24px_rgba(104,33,135,0.3)] will-change-transform whitespace-nowrap max-[479px]:w-full max-[479px]:justify-center"
              >
                <CalendarCheck size={18} strokeWidth={2.2} />
                Book Free Consultation
              </button>

              <button className="group bg-[#8c7c96] hover:bg-[#8c43ad] text-white border-none rounded-full p-[8px_8px_8px_24px] text-15 font-semibold cursor-pointer inline-flex items-center gap-4 whitespace-nowrap transition-all duration-400 cubic-bezier(0.25,_1,_0.5,_1) shadow-[0_4px_14px_rgba(104,33,135,0.06)] hover:shadow-[0_6px_20px_rgba(104,33,135,0.2)] max-[479px]:w-full max-[479px]:justify-between">
                Learn More
                <div className="w-[38px] h-[38px] bg-white rounded-full flex items-center justify-center text-[#8c7c96] group-hover:text-[#581c74] transition-all duration-400 cubic-bezier(0.25,_1,_0.5,_1) group-hover:scale-[1.05]">
                  <ArrowRight size={18} strokeWidth={2.5} className="transition-transform duration-400 cubic-bezier(0.25,_1,_0.5,_1) group-hover:-rotate-45" />
                </div>
              </button>
            </motion.div>
          </div>

          {/* ── MODERN ANIMATED & RESPONSIVE TOUCH-SWIPE HERO CAROUSEL ── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative group/carousel select-none touch-pan-y"
          >
            <ImageGlareHover
              glareColor="#ffffff"
              glareOpacity={0.3}
              glareSize={240}
              borderRadius="1.5rem"
              width="100%"
              className="shadow-2xl aspect-[4/3] relative z-10 bg-purple-50/20 overflow-hidden"
            >
              <motion.div 
                className="w-full h-[320px] sm:h-[38px] md:h-[420px] relative overflow-hidden rounded-2xl cursor-grab active:cursor-grabbing"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={handleDragEnd}
              >
                <AnimatePresence initial={false} custom={slideDirection}>
                  <motion.img
                    key={currentSlide}
                    src={carouselImages[currentSlide]}
                    custom={slideDirection}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    draggable="false"
                    alt={`Professional Tooth Whitening slide ${currentSlide + 1}`}
                    className="absolute inset-0 w-full h-full object-cover rounded-2xl pointer-events-none"
                  />
                </AnimatePresence>
              </motion.div>
            </ImageGlareHover>

            {/* Responsive Arrow Buttons (Hidden on small screens/touch devices, visible on desktop hover) */}
            <button 
              onClick={handlePrevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm text-slate-800 hidden md:flex items-center justify-center shadow-md transition-all opacity-0 group-hover/carousel:opacity-100"
            >
              <ChevronLeft size={20} strokeWidth={2.5} />
            </button>
            <button 
              onClick={handleNextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm text-slate-800 hidden md:flex items-center justify-center shadow-md transition-all opacity-0 group-hover/carousel:opacity-100"
            >
              <ChevronRight size={20} strokeWidth={2.5} />
            </button>

            {/* Manual Navigation Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full">
              {carouselImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleDotClick(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${idx === currentSlide ? "w-5 bg-white" : "w-2 bg-white/50"}`}
                />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="absolute top-4 right-4 bg-[#682187] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow z-20"
            >
              Noticeable Results
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-[#0f172a] py-12 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <p className="text-3xl font-black bg-gradient-to-r from-purple-400 to-fuchsia-300 bg-clip-text text-transparent tracking-tight">{s.value}</p>
              <p className="text-xs text-slate-400 mt-1 uppercase font-bold tracking-[0.15em]">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── PATIENT PORTRAIT VIDEO REVIEW ── */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-gradient-to-br from-[#fbf9fe] via-white to-[#f5f0fa] overflow-hidden">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Video Player Column */}
          <AnimatedSection className="lg:col-span-5 flex justify-center w-full order-2 lg:order-1" delay={0.1}>
            <div className="relative w-full max-w-[290px] sm:max-w-[320px] aspect-[9/16] rounded-[2.5rem] overflow-hidden shadow-[0_25px_60px_-15px_rgba(104,33,135,0.25)] border-8 border-slate-950 bg-black group/video">
              <video
                ref={videoRef}
                src="/Video/WhatsApp Video 2026-06-30 at 10.55.06 AM.mp4"
                className="absolute w-[178%] h-[56.25%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90 object-cover cursor-pointer"
                loop
                playsInline
                onClick={togglePlay}
              />
              
              {/* Play Overlay when not playing */}
              {!isVideoPlaying && (
                <div 
                  className="absolute inset-0 flex flex-col justify-between p-6 bg-gradient-to-b from-black/20 via-black/40 to-black/80 cursor-pointer transition-all duration-300 hover:via-black/30 z-10"
                  onClick={togglePlay}
                >
                  <div className="flex justify-between items-center">
                    <span className="bg-[#682187]/90 text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full backdrop-blur-sm">
                      Patient Review
                    </span>
                    <span className="flex items-center gap-1 text-white text-[10px] font-medium bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Video Story
                    </span>
                  </div>

                  {/* Play Button */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                    <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-white text-[#682187] shadow-xl transition-transform duration-300 transform group-hover/video:scale-110 z-10">
                      <Play size={24} fill="#682187" className="ml-1" />
                    </div>
                    {/* Pulsing ring */}
                    <div className="absolute w-20 h-20 rounded-full bg-white/30 animate-ping pointer-events-none" />
                  </div>

                  {/* Patient Caption bottom */}
                  <div className="text-white">
                    <div className="flex items-center gap-1.5 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} fill="#fbbf24" color="#fbbf24" />
                      ))}
                    </div>
                    <p className="font-bold text-base leading-tight">Sarala's Transformation</p>
                    <p className="text-xs text-white/70 mt-0.5">Click to watch her story</p>
                  </div>
                </div>
              )}

              {/* Custom Controls when playing (appears on hover) */}
              {isVideoPlaying && (
                <div 
                  className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col gap-2 opacity-0 group-hover/video:opacity-100 transition-opacity duration-300 z-20"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Progress bar */}
                  <div 
                    className="w-full h-1.5 bg-white/30 hover:bg-white/40 rounded-full cursor-pointer relative overflow-hidden"
                    onClick={handleProgressClick}
                  >
                    <div 
                      className="absolute left-0 top-0 h-full bg-[#682187] rounded-full"
                      style={{ width: `${videoProgress}%` }}
                    />
                  </div>
                  {/* Controls */}
                  <div className="flex justify-between items-center text-white">
                    <button 
                      onClick={togglePlay}
                      className="hover:text-purple-300 transition-colors p-1 cursor-pointer"
                    >
                      <Pause size={16} fill="white" />
                    </button>
                    <button 
                      onClick={toggleMute}
                      className="hover:text-purple-300 transition-colors p-1 cursor-pointer"
                    >
                      {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </AnimatedSection>

          {/* Testimonial details Column */}
          <AnimatedSection className="lg:col-span-7 flex flex-col justify-center order-1 lg:order-2" delay={0.2}>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.2em] uppercase text-[#682187] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#682187]" />
              Real Patient Experience
            </span>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] mb-6 tracking-tight leading-tight">
              <BlurText
                text="Watch How Sarala Restored Her Smile & Confidence"
                delay={150}
                animateBy="words"
                direction="top"
              />
            </h2>
            <div className="h-1 w-12 bg-[#682187] rounded-full mb-6" />

            <div className="relative bg-white border border-purple-50 rounded-2xl p-6 sm:p-8 shadow-[0_10px_30px_-5px_rgba(104,33,135,0.05)] mb-8">
              {/* Large quote marks background */}
              <span className="absolute top-2 right-6 text-7xl font-serif text-purple-100 select-none pointer-events-none">“</span>
              
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />
                ))}
              </div>

              <p className="text-slate-600 font-light italic leading-relaxed text-base mb-6 relative z-10">
                "I was always extremely self-conscious about my smile, especially with the persistent stains from years of coffee and tea. The whitening treatment here was a complete game changer. It took less than an hour, was entirely comfortable, and the results were instant. Now, I can't stop smiling!"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center font-bold text-[#682187] text-lg shadow-inner">
                  S
                </div>
                <div>
                  <h4 className="font-bold text-[#1a2332] text-sm">Sarala</h4>
                  <p className="text-xs text-slate-400">Verified Patient • Treatment: June 2026</p>
                </div>
              </div>
            </div>

            {/* Metrics and Action */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-[#682187]/5 border border-[#682187]/10 rounded-xl p-4 flex flex-col justify-center">
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-0.5">Shade Result</p>
                <p className="text-xl font-bold text-[#682187]">4 Shades Brighter</p>
              </div>
              <div className="bg-[#682187]/5 border border-[#682187]/10 rounded-xl p-4 flex flex-col justify-center">
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-0.5">Treatment Time</p>
                <p className="text-xl font-bold text-[#682187]">45-Minute Session</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <button
                onClick={() => setShowForm(true)}
                className="bg-[#682187] hover:bg-[#4c1263] text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all text-sm cursor-pointer flex items-center gap-2"
              >
                <CalendarCheck size={16} />
                Get Your Own Bright Smile
              </button>
            </div>
          </AnimatedSection>

        </div>
      </section>

      {/* ── CAUSES & EXPLANATION SECTION WITH GLARE ── */}
      <section className="py-20 px-6 md:px-16 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <AnimatedSection>
            <div className="relative">
              <ImageGlareHover
                glareColor="#ffffff"
                glareOpacity={0.25}
                glareSize={200}
                borderRadius="1rem"
                width="100%"
                className="shadow-xl relative z-10"
              >
                <img
                  src={procedureImg}
                  alt="Causes of Tooth Discoloration"
                  className="w-full h-[350px] object-cover rounded-2xl"
                />
              </ImageGlareHover>
              <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-xl bg-purple-100/40 border-2 border-purple-200/50 -z-10" />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <span className="text-xs font-bold tracking-[0.2em] text-[#682187] uppercase">
              Understanding Before & After Tooth Restoration
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2 mb-4 tracking-tight leading-tight">
              <BlurText
                text="See the Difference with Professional Tooth Restoration"
                delay={150}
                animateBy="words"
                direction="top"
              />
            </h2>
            <div className="h-1 w-12 bg-[#682187] rounded-full mb-6" />
            <p className="text-slate-500 font-light leading-relaxed mb-4">
              Damaged, chipped, stained, or worn teeth can significantly impact both your smile and your confidence. Our before-and-after tooth restoration treatments showcase the remarkable improvements that modern restorative and cosmetic dentistry can achieve. Every case is carefully planned to restore the natural beauty, strength, and function of your teeth.
            </p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-slate-600 font-medium mb-6">
              <li className="flex items-center gap-2"><span className="text-[#682187]">✔</span> Repair Chipped & Broken Teeth</li>
              <li className="flex items-center gap-2"><span className="text-[#682187]">✔</span> Restore Worn or Damaged Tooth Structure</li>
              <li className="flex items-center gap-2"><span className="text-[#682187]">✔</span> Correct Tooth Discoloration & Stains</li>
              <li className="flex items-center gap-2"><span className="text-[#682187]">✔</span> Improve Tooth Shape & Natural Appearance</li>
              <li className="flex items-center gap-2"><span className="text-[#682187]">✔</span> Enhance Smile Function & Aesthetics</li>
              <li className="flex items-center gap-2"><span className="text-[#682187]">✔</span> Long-Lasting, Natural-Looking Results</li>
            </ul>
            <div className="flex items-center gap-4 bg-[#fdfbfe] border border-purple-100 rounded-xl p-4 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
                <Shield className="text-[#682187]" size={22} />
              </div>
              <p className="text-sm text-slate-600 font-medium">
                <strong className="text-[#1a2332]">Personalized Restoration for Every Smile</strong> — Every patient has unique dental needs. Our experienced dental team develops customized treatment plans using advanced restorative techniques to deliver healthy, durable, and aesthetically pleasing results while preserving your natural teeth whenever possible.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-20 px-6 md:px-16 bg-[#0f172a]">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <span className="text-xs font-bold tracking-[0.15em] uppercase text-purple-400">
              Why Choose Professional Systems
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2 mb-3 tracking-tight text-center flex justify-center">
              <BlurText
                text="Benefits of Professional Whitening"
                delay={150}
                animateBy="words"
                direction="top"
              />
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto font-light text-sm">
              Unlock a brilliant look while defending your long-term dental health 
              with premium systems:
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b, i) => (
              <motion.div
                key={b.text}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="flex items-start gap-4 bg-white/5 border border-white/10 hover:border-[#682187]/50 rounded-xl p-5 transition-colors duration-200 cursor-default"
              >
                <div className="w-10 h-10 rounded-lg bg-[#682187]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <b.icon className="text-purple-400" size={20} />
                </div>
                <p className="text-slate-200 text-sm font-light leading-relaxed">{b.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCEDURE STEPS ── */}
      <section className="py-20 px-6 md:px-16 max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-14">
          <span className="text-xs font-bold tracking-[0.2em] text-[#682187] uppercase">
            The Journey
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2 tracking-tight leading-tight text-center flex justify-center">
            <BlurText
              text="Our Whitening Process"
              delay={150}
              animateBy="words"
              direction="top"
            />
          </h2>
          <p className="text-slate-500 font-light max-w-xl mx-auto mt-3 text-sm">
            Tailored, highly effective treatments designed perfectly around your personal smile goals.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-4 gap-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              onClick={() => setActiveStep(i)}
              className={`relative rounded-2xl p-6 border-2 cursor-pointer transition-all duration-300 ${
                activeStep === i
                  ? "border-[#682187] bg-purple-50/40 shadow-lg shadow-purple-950/5"
                  : "border-gray-100 bg-white hover:border-[#682187]/40"
              }`}
            >
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 -right-2 w-4 h-0.5 bg-gray-100 z-10" />
              )}
              <span
                className={`text-xs font-bold tracking-widest ${
                  activeStep === i ? "text-[#682187]" : "text-gray-400"
                }`}
              >
                {s.num}
              </span>
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center my-3 transition-colors ${
                  activeStep === i ? "bg-[#682187]" : "bg-purple-50"
                }`}
              >
                <s.icon
                  size={20}
                  className={activeStep === i ? "text-white" : "text-[#682187]"}
                />
              </div>
              <h3 className="font-bold text-[#1a2332] text-sm mb-2">
                <BlurText
                  text={s.title}
                  delay={150}
                  animateBy="words"
                  direction="top"
                />
              </h3>
              <p className="text-slate-500 font-light text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── MAINTENANCE / WHY CHOOSE US WITH GLARE ── */}
      <section className="bg-[#f7f5fa] py-20 px-6 md:px-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <AnimatedSection delay={0.1}>
            <span className="text-xs font-bold tracking-[0.2em] text-[#682187] uppercase">
              Long Lasting Brightness
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2 mb-4 tracking-tight leading-tight">
              <BlurText
                text="Maintain Your Brilliant New Smile"
                delay={150}
                animateBy="words"
                direction="top"
              />
            </h2>
            <div className="h-1 w-12 bg-[#682187] rounded-full mb-6" />
            <p className="text-slate-500 font-light leading-relaxed mb-6">
              To seamlessly keep your teeth looking bright long after treatment cycles, our cosmetic specialists recommend the following:
            </p>
            {[
              "Limiting consumption of deeply staining dark foods and dark beverages",
              "Practicing strict oral hygiene routines and brushing behaviors daily",
              "Scheduling regular dental diagnostic check-ups and maintenance cleanings",
              "Utilizing custom personalized care advice to expand whitening duration",
            ].map((pt, i) => (
              <motion.div
                key={pt}
                custom={i}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-3"
              >
                <CheckCircle2 className="text-[#682187] shrink-0" size={18} />
                <span className="text-slate-600 text-sm font-medium">{pt}</span>
              </motion.div>
            ))}
          </AnimatedSection>

          {/* ── AFTERCARE SMILE IMAGE WITH GLARE ── */}
          <AnimatedSection>
            <div className="relative">
              <ImageGlareHover
                glareColor="#ffffff"
                glareOpacity={0.3}
                glareSize={180}
                borderRadius="1rem"
                width="100%"
                className="shadow-xl relative z-10"
              >
                <img
                  src={smileImg}
                  alt="Happy, confident patient with a bright smile"
                  className="w-full h-[400px] object-cover object-top rounded-2xl"
                />
              </ImageGlareHover>
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="absolute -bottom-5 -left-5 bg-white rounded-xl shadow-xl px-5 py-4 border border-purple-50 flex items-center gap-3 z-20"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
                  <CheckCircle2 className="text-emerald-500" size={20} />
                </div>
                <div>
                  <p className="font-bold text-[#1a2332] text-sm">Customized Treatment</p>
                  <p className="text-xs text-slate-400">Enamel-safe products prioritized</p>
                </div>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-20 px-6">
        <AnimatedSection className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-[#682187] to-[#4c1263] rounded-3xl overflow-hidden px-10 py-14 text-center shadow-2xl shadow-purple-900/20">
            <div className="absolute inset-0 opacity-5">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full border border-white"
                  style={{
                    width: `${120 + i * 80}px`,
                    height: `${120 + i * 80}px`,
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              ))}
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight text-center flex justify-center">
                <BlurText
                  text="Book Your Consultation Today"
                  delay={150}
                  animateBy="words"
                  direction="top"
                />
              </h2>
              <p className="text-white/85 max-w-xl mx-auto mb-8 text-base font-light leading-relaxed">
                Transform your look completely with our custom cosmetic approaches. Whether you want to 
                remove years of stubborn stains or simple dullness, we are ready to assist you.
              </p>
              <div className="flex flex-wrap justify-center gap-4 items-center max-[479px]:flex-col max-[479px]:items-stretch">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center gap-2 bg-white text-[#682187] font-bold px-8 py-3.5 rounded-xl shadow-lg transition-all text-sm cursor-pointer"
                >
                  <CalendarCheck size={18} />
                  Schedule Free Consultation
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 border border-white/40 text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-white/10 transition-all text-sm cursor-pointer"
                >
                  Call Our Clinic
                  <ChevronRight size={16} />
                </motion.button>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}