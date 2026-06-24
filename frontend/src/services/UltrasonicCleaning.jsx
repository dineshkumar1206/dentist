import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  CheckCircle2,
  Shield,
  Clock,
  Smile,
  ChevronRight,
  Star,
  CalendarCheck,
  Microscope,
  Sparkles,
  Activity,
  ArrowRight
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
  { icon: Shield, text: "Thoroughly removes persistent plaque, tartar, and structural bacterial deposits" },
  { icon: Activity, text: "Actively helps prevent painful gum disease, deep bleeding, and tooth decay" },
  { icon: Sparkles, text: "Eliminates embarrassing surface stains for a noticeably brighter, cleaner smile" },
  { icon: Smile, text: "Significantly reduces chronic bad breath while enhancing absolute oral freshness" },
  { icon: CheckCircle2, text: "Promotes completely healthier, smoother, and stronger gums and teeth structures" },
  { icon: Star, text: "Delivers an incredibly comfortable, quiet, and highly efficient treatment process" },
];

const steps = [
  {
    num: "01",
    title: "Oral Health Assessment",
    desc: "Our dental professionals carefully assess your teeth, gum line, and general health parameters before beginning cleaning.",
    icon: Microscope,
  },
  {
    num: "02",
    title: "Ultrasonic Scaling",
    desc: "Advanced high-frequency vibrations combined with a gentle water spray safely break down hardened tartar and calculus deposits.",
    icon: Shield,
  },
  {
    num: "03",
    title: "Prophy Polishing",
    desc: "Teeth are gently polished with premium paste to smooth out rough microscopic surfaces, discouraging future plaque attachment.",
    icon: Sparkles,
  },
  {
    num: "04",
    title: "Preventive Guidance",
    desc: "Personalized advice is given regarding correct home care brushing and flossing routines to maximize your clean feeling.",
    icon: Clock,
  },
];

const stats = [
  { value: "100%", label: "Plaque Elimination" },
  { value: "Gentle", label: "High-Freq Scaling" },
  { value: "Fresh", label: "Breath Optimization" },
  { value: "4.9★", label: "Patient Satisfaction" },
];

const heroImg = "/images/cleaning-hero.png";
const procedureImg = "/images/cleaning-importance.png";
const smileImg = "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80";

// ─── Component ────────────────────────────────────────────────────────────────
export default function UltrasonicCleaning() {
  const [activeStep, setActiveStep] = useState(0);
  const [showForm, setShowForm] = useState(false);

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

  return (
    <div className="mt-6 bg-[#fcfbfe] text-[#1a2332]" style={{ fontFamily: FONT_FAMILY }}>

      {/* ── FORM MODAL ── */}
      {showForm && (
        <FormService
          serviceName="Ultrasonic Cleaning & Polishing"
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
              Preventive Dental Care
            </motion.span>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-4xl md:text-5xl font-extrabold leading-[1.15] tracking-tight mb-4 text-[#0f172a]"
            >
              <BlurText
                text="Achieve a Cleaner and Healthier Smile with Ultrasonic Cleaning & Polishing"
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
              Ultrasonic dental cleaning is a highly effective, advanced procedure that effortlessly 
              washes away calculus, hardened tartar, and ugly surface stains from above and below your gum lines.
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
                Book Cleaning Appointment
              </button>

              <button className="group bg-[#8c7c96] hover:bg-[#8c43ad] text-white border-none rounded-full p-[8px_8px_8px_24px] text-15 font-semibold cursor-pointer inline-flex items-center gap-4 whitespace-nowrap transition-all duration-400 cubic-bezier(0.25,_1,_0.5,_1) shadow-[0_4px_14px_rgba(104,33,135,0.06)] hover:shadow-[0_6px_20px_rgba(104,33,135,0.2)] max-[479px]:w-full max-[479px]:justify-between">
                Learn More
                <div className="w-[38px] h-[38px] bg-white rounded-full flex items-center justify-center text-[#8c7c96] group-hover:text-[#581c74] transition-all duration-400 cubic-bezier(0.25,_1,_0.5,_1) group-hover:scale-[1.05]">
                  <ArrowRight size={18} strokeWidth={2.5} className="transition-transform duration-400 cubic-bezier(0.25,_1,_0.5,_1) group-hover:-rotate-45" />
                </div>
              </button>
            </motion.div>
          </div>

          {/* ── HERO IMAGE WITH GLARE ── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <ImageGlareHover
              glareColor="#ffffff"
              glareOpacity={0.3}
              glareSize={240}
              borderRadius="1.5rem"
              width="100%"
              className="shadow-2xl aspect-[4/3] relative z-10 bg-purple-50/20"
            >
              <img
                src={heroImg}
                alt="Ultrasonic Cleaning and Polishing Care specialty setup"
                className="w-full h-[420px] object-cover rounded-2xl"
              />
            </ImageGlareHover>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="absolute top-4 right-4 bg-[#682187] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow z-20"
            >
              Refresh Your Smile
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

      {/* ── IMPORTANCE SECTION WITH GLARE ── */}
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
                  alt="Importance of Professional Cleaning"
                  className="w-full h-[350px] object-cover rounded-2xl"
                />
              </ImageGlareHover>
              <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-xl bg-purple-100/40 border-2 border-purple-200/50 -z-10" />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <span className="text-xs font-bold tracking-[0.2em] text-[#682187] uppercase">
              Preventive Maintenance
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2 mb-4 tracking-tight leading-tight">
              <BlurText
                text="Why Is Professional Cleaning So Crucial?"
                delay={150}
                animateBy="words"
                direction="top"
              />
            </h2>
            <div className="h-1 w-12 bg-[#682187] rounded-full mb-6" />
            <p className="text-slate-500 font-light leading-relaxed mb-5">
              Even with rigorous brushing and daily flossing routine checks, plaque and sticky tartar naturally 
              accumulate over time in tough, hard-to-reach pockets of the dental arches. 
            </p>
            <p className="text-slate-500 font-light leading-relaxed">
              Our ultrasonic cleaning processes carefully disintegrate these hardened bacterial structures 
              before they can evolve into costly tooth decay, painful bleeding gum deep infections, chronic bad breath, 
              or complex structural root deterioration issues.
            </p>
            <div className="mt-8 flex items-center gap-4 bg-[#fdfbfe] border border-purple-100 rounded-xl p-4 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
                <Shield className="text-[#682187]" size={22} />
              </div>
              <p className="text-sm text-slate-600 font-medium">
                <strong className="text-[#1a2332]">Advanced Multi-Directional Systems</strong>{" "}
                — we combine vibrating scaling with high-velocity microscopic micro-polishing to secure smooth finishes that resist plaque buildup.
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
              Protect Your Gums & Bones
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2 mb-3 tracking-tight text-center flex justify-center">
              <BlurText
                text="Benefits of Advanced Ultrasonic Therapies"
                delay={150}
                animateBy="words"
                direction="top"
              />
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto font-light text-sm">
              Professional hygienic scaling goes much deeper than just cosmetics — it comprehensively resets 
              your overall systemic health and oral protection shields:
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
            Hygienic Execution
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2 tracking-tight leading-tight text-center flex justify-cente">
            <BlurText
              text="Our Cleaning Process"
              delay={150}
              animateBy="words"
              direction="top"
            />
          </h2>
          <p className="text-slate-500 font-light max-w-xl mx-auto mt-3 text-sm">
            Transparent, entirely comfortable, and guided gently by highly skilled dental practitioners.
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

      {/* ── WHY CHOOSE US WITH GLARE ── */}
      <section className="bg-[#f7f5fa] py-20 px-6 md:px-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <AnimatedSection delay={0.1}>
            <span className="text-xs font-bold tracking-[0.2em] text-[#682187] uppercase">
              Long-term Maintenance
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2 mb-4 tracking-tight leading-tight">
              <BlurText
                text="Maintain Excellent Hygiene with Regular Visits"
                delay={150}
                animateBy="words"
                direction="top"
              />
            </h2>
            <div className="h-1 w-12 bg-[#682187] rounded-full mb-6" />
            <p className="text-slate-500 font-light leading-relaxed mb-6">
              Routine ultrasonic scaling combined with smart domestic hygiene habits forms the cornerstone 
              of successful, lifelong wellness preservation.
            </p>
            {[
              "Highly experienced, incredibly gentle preventative hygienists",
              "State-of-the-art ultrasonic scaling tool components maximizing speed and comfort",
              "Personalized advice regarding complex or tricky hard-to-clean areas",
              "Welcoming, completely low-anxiety clinic environment suited for all ages",
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

          {/* ── MAINTENANCE IMAGE WITH GLARE ── */}
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
                  alt="Smiling dental patient with refreshed clean teeth"
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
                  <p className="font-bold text-[#1a2332] text-sm">Long-term Health</p>
                  <p className="text-xs text-slate-400">Preventive care tracker included</p>
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
                  text="Book Your Dental Cleaning Appointment Today"
                  delay={150}
                  animateBy="words"
                  direction="top"
                />
              </h2>
              <p className="text-white/85 max-w-xl mx-auto mb-8 text-base font-light leading-relaxed">
                Keep your smile thoroughly healthy, radiantly bright, and clean. Contact our specialist clinic 
                today to lock in an easy preventative consultation slot.
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