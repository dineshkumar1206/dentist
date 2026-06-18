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
  { icon: Smile, text: "Restores a completely beautiful, full, and natural-looking smile" },
  { icon: Activity, text: "Improves vital chewing efficiencies and clear vocal speech abilities" },
  { icon: Shield, text: "Enhances youthful facial muscle appearance and structure support" },
  { icon: Star, text: "Significantly elevates daily lifestyle confidence and self-esteem" },
  { icon: CheckCircle2, text: "Provides a strictly comfortable, highly precise, and customized physical fit" },
  { icon: Sparkles, text: "Maintains optimal jaw functionality and overall oral systemic health" },
];

const steps = [
  {
    num: "01",
    title: "Complete Oral Assessment",
    desc: "Our dental specialists execute a detailed consultation and full assessment to determine your perfect prosthetic mapping path.",
    icon: Microscope,
  },
  {
    num: "02",
    title: "Prosthetic Engineering",
    desc: "Personalized treatment configurations are established using premium diagnostic metrics to plan fit parameters.",
    icon: Shield,
  },
  {
    num: "03",
    title: "Customized Fabrication",
    desc: "Your full teeth sets are meticulously designed using premium, resilient dental compounds for maximum longevity.",
    icon: Sparkles,
  },
  {
    num: "04",
    title: "Precision Placement",
    desc: "Whether fitting removable dentures or permanently securing fixed implant setups, complete support is insured.",
    icon: Clock,
  },
];

const stats = [
  { value: "Premium", label: "Dental Polymers" },
  { value: "Custom", label: "Anatomical Fit" },
  { value: "100%", label: "Functional Recovery" },
  { value: "4.9★", label: "Patient Rating" },
];

const heroImg = "/images/fullsets-hero.png";
const procedureImg = "/images/fullsets-importance.png";
const smileImg = "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80";

// ─── Component ────────────────────────────────────────────────────────────────
export default function FullTeethsets() {
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
          serviceName="Full Teethsets (Removal & Fixed)"
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
              Restorative Dentistry
            </motion.span>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-4xl md:text-5xl font-extrabold leading-[1.15] tracking-tight mb-4 text-[#0f172a]"
            >
              <BlurText
                text="Restore Your Complete Smile with Full Teeth Sets"
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
              Custom-built dental restoration therapies offer complete arch solutions for individuals missing multiple teeth. 
              Regain your premium oral capabilities, facial contour support, and smile comfortably.
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
                Book Restoration Consultation
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
                alt="Full Teeth Sets System rehabilitation layout"
                className="w-full h-[420px] object-cover rounded-2xl"
              />
            </ImageGlareHover>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="absolute top-4 right-4 bg-[#682187] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow z-20"
            >
              Full Rehabilitation
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

      {/* ── SELECTION CONFIGURATIONS ── */}
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
                  alt="Understanding Restorative Configurations"
                  className="w-full h-[350px] object-cover rounded-2xl"
                />
              </ImageGlareHover>
              <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-xl bg-purple-100/40 border-2 border-purple-200/50 -z-10" />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <span className="text-xs font-bold tracking-[0.2em] text-[#682187] uppercase">
              Rehabilitation Modalities
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2 mb-4 tracking-tight leading-tight">
              <BlurText
                text="Types of Full Arch Restoration Prosthetics"
                delay={150}
                animateBy="words"
                direction="top"
              />
            </h2>
            <div className="h-1 w-12 bg-[#682187] rounded-full mb-6" />
            
            <div className="space-y-4 mb-6">
              <div>
                <h4 className="text-sm font-bold text-[#1a2332]">
                  <BlurText
                    text="Option A: Removable Dentures"
                    delay={150}
                    animateBy="words"
                    direction="top"
                  />
                </h4>
                <p className="text-sm text-slate-500 font-light leading-relaxed">
                  Custom-made prosthetic fixtures designed to rest securely over your soft mucosal gums. They can be cleanly removed for straightforward home hygiene maintenance, representing a highly practical approach.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1a2332]">
                  <BlurText
                    text="Option B: Fixed Full Sets"
                    delay={150}
                    animateBy="words"
                    direction="top"
                  />
                </h4>
                <p className="text-sm text-slate-500 font-light leading-relaxed">
                  Permanently anchored restorations secured firmly by strategic dental implants. This structure eliminates slipping, brings back original natural biting forces, and yields completely seamless functional profiles.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-[#fdfbfe] border border-purple-100 rounded-xl p-4 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
                <Shield className="text-[#682187]" size={22} />
              </div>
              <p className="text-sm text-slate-600 font-medium">
                <strong className="text-[#1a2332]">Biocompatible Integrity</strong> — we incorporate advanced dental resins and porcelain compounds that stand up beautifully to continuous daily mechanical wear.
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
              Reclaiming Your Comfort
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2 mb-3 tracking-tight">
              <BlurText
                text="Benefits of Modern Full Teeth Sets"
                delay={150}
                animateBy="words"
                direction="top"
              />
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto font-light text-sm">
              Replacing entire arches of missing teeth completely reverses structural collapsing, facial drooping, and restriction layouts:
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
            The Engineering Process
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2 tracking-tight leading-tight">
            <BlurText
              text="Our Restoration Care Workflow"
              delay={150}
              animateBy="words"
              direction="top"
            />
          </h2>
          <p className="text-slate-500 font-light max-w-xl mx-auto mt-3 text-sm">
            Carefully customized, scientifically executed, and completely monitored by restorative specialists.
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

      {/* ── MAINTENANCE / WHY CHOOSE US ── */}
      <section className="bg-[#f7f5fa] py-20 px-6 md:px-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <AnimatedSection delay={0.1}>
            <span className="text-xs font-bold tracking-[0.2em] text-[#682187] uppercase">
              Prolonging Structural Health
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2 mb-4 tracking-tight leading-tight">
              <BlurText
                text="Caring for Your New Restored Smile"
                delay={150}
                animateBy="words"
                direction="top"
              />
            </h2>
            <div className="h-1 w-12 bg-[#682187] rounded-full mb-6" />
            <p className="text-slate-500 font-light leading-relaxed mb-6">
              Correct protective routines and scheduled preventative evaluations preserve your full set prosthetic integrity. We ensure long-term stability via:
            </p>
            {[
              "Clear, structured instructions covering both removable cleaning and fixed arch housing steps",
              "Routine tracking reviews to check soft mucosal padding tissue adaptations over time",
              "High-fidelity material setups resistant to fracture factors under intense pressure parameters",
              "Compassionate dental specialists prioritizing smooth, headache-free long term tracking outcomes",
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

          {/* ── MAINTENANCE SMILE IMAGE WITH GLARE ── */}
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
                  alt="Confident smile following full restorative rehabilitation"
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
                  <p className="font-bold text-[#1a2332] text-sm">Full Adaptive Testing</p>
                  <p className="text-xs text-slate-400">Post-fitting follow-ups included</p>
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
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
                <BlurText
                  text="Schedule Your Consultation Today"
                  delay={150}
                  animateBy="words"
                  direction="top"
                />
              </h2>
              <p className="text-white/85 max-w-xl mx-auto mb-8 text-base font-light leading-relaxed">
                If you are looking to reconstruct missing teeth or explore alternative full arch fixtures, 
                our specialized team is here to map out the ideal treatment balance for you.
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