import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
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
} from "lucide-react";
import FormService from "../components/FormService"; 
import BlurText from "../components/BlurText"; 
import ImageGlareHover from "../components/ImageGlareHover"; // <-- Imported Glare Component

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
const smileImg =
  "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80";

// ─── Component ────────────────────────────────────────────────────────────────
export default function FullTeethsets() {
  const [activeStep, setActiveStep] = useState(0);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="font-sans mt-6 bg-[#f0f7ff] text-[#1a2332]">

      {/* ── FORM MODAL ── */}
      {showForm && (
        <FormService
          serviceName="Full Teeth Sets (Removable & Fixed)"
          isOpen={showForm}
          onClose={() => setShowForm(false)}
        />
      )}

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#f0f7ff] via-[#e0f2fe] to-[#f0f7ff] pt-24 pb-20 px-6 md:px-16">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#0ea5e9]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[350px] h-[350px] rounded-full bg-[#06b6d4]/10 blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#0ea5e9] bg-[#0ea5e9]/10 border border-[#0ea5e9]/30 rounded-full px-4 py-1.5 mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#0ea5e9] animate-pulse" />
              Restorative Dentistry
            </motion.span>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-4xl md:text-5xl font-extrabold leading-tight mb-4"
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
              className="h-1 w-16 bg-[#0ea5e9] rounded-full mb-6"
            />

            <motion.p
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-[#4a5568] text-lg leading-relaxed mb-8 max-w-md"
            >
              Custom-built dental restoration therapies offer complete arch solutions for individuals missing multiple teeth. 
              Regain your premium oral capabilities, facial contour support, and smile comfortably.
            </motion.p>

            <motion.div
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-semibold px-7 py-3.5 rounded-full shadow-lg shadow-[#0ea5e9]/30 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <CalendarCheck size={18} />
                Book Restoration Consultation
              </button>
              <button className="inline-flex items-center gap-2 text-[#0ea5e9] font-semibold px-6 py-3.5 rounded-full border border-[#0ea5e9]/40 hover:bg-[#0ea5e9]/10 transition-all duration-200">
                Learn More
                <ChevronRight size={16} />
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
              glareSize={180}
              borderRadius="1rem"
              width="100%"
              className="shadow-2xl ring-4 ring-white relative z-10"
            >
              <img
                src={heroImg}
                alt="Full Teeth Sets Treatment"
                className="w-full h-[420px] object-cover"
              />
            </ImageGlareHover>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="absolute top-4 right-4 bg-[#0ea5e9] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow z-20"
            >
              Full Rehabilitation
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-[#1a2332] py-8 px-6">
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
              <p className="text-3xl font-extrabold text-[#0ea5e9]">{s.value}</p>
              <p className="text-sm text-gray-400 mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── SELECTION CONFIGURATIONS ── */}
      <section className="py-20 px-6 md:px-16 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          {/* ── SELECTION IMAGE WITH GLARE ── */}
          <AnimatedSection>
            <div className="relative">
              <ImageGlareHover
                glareColor="#ffffff"
                glareOpacity={0.25}
                glareSize={180}
                borderRadius="1rem"
                width="100%"
                className="shadow-xl ring-4 ring-white relative z-10"
              >
                <img
                  src={procedureImg}
                  alt="Understanding Restorative Configurations"
                  className="w-full h-[350px] object-cover"
                />
              </ImageGlareHover>
              <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-xl bg-[#0ea5e9]/15 border-2 border-[#0ea5e9]/30 -z-10" />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <span className="text-xs font-semibold tracking-widest uppercase text-[#0ea5e9]">
              Rehabilitation Modalities
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2 mb-4 leading-tight">
              <BlurText
                text="Types of Full Arch Restoration Prosthetics"
                delay={150}
                animateBy="words"
                direction="top"
              />
            </h2>
            <div className="h-1 w-12 bg-[#0ea5e9] rounded-full mb-6" />
            
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
                <p className="text-sm text-[#4a5568] leading-relaxed">
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
                <p className="text-sm text-[#4a5568] leading-relaxed">
                  Permanently anchored restorations secured firmly by strategic dental implants. This structure eliminates slipping, brings back original natural biting forces, and yields completely seamless functional profiles.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-[#f0f7ff] border border-[#0ea5e9]/20 rounded-xl p-4">
              <div className="w-12 h-12 rounded-full bg-[#0ea5e9]/15 flex items-center justify-center shrink-0">
                <Shield className="text-[#0ea5e9]" size={22} />
              </div>
              <p className="text-sm text-[#4a5568]">
                <strong className="text-[#1a2332]">Biocompatible Integrity</strong> — we incorporate advanced dental resins and porcelain compounds that stand up beautifully to continuous daily mechanical wear.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-20 px-6 md:px-16 bg-[#1a2332]">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#0ea5e9]">
              Reclaiming Your Comfort
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2 mb-3">
              <BlurText
                text="Benefits of Modern Full Teeth Sets"
                delay={150}
                animateBy="words"
                direction="top"
              />
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
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
                className="flex items-start gap-4 bg-white/5 border border-white/10 hover:border-[#0ea5e9]/50 rounded-xl p-5 transition-colors duration-200 cursor-default"
              >
                <div className="w-10 h-10 rounded-lg bg-[#0ea5e9]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <b.icon className="text-[#0ea5e9]" size={20} />
                </div>
                <p className="text-gray-200 text-sm leading-relaxed">{b.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCEDURE STEPS ── */}
      <section className="py-20 px-6 md:px-16 max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-14">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#0ea5e9]">
            The Engineering Process
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2 leading-tight">
            <BlurText
              text="Our Restoration Care Workflow"
              delay={150}
              animateBy="words"
              direction="top"
            />
          </h2>
          <p className="text-[#4a5568] max-w-xl mx-auto mt-3">
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
                  ? "border-[#0ea5e9] bg-[#0ea5e9]/8 shadow-lg shadow-[#0ea5e9]/15"
                  : "border-gray-200 bg-white hover:border-[#0ea5e9]/40"
              }`}
            >
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 -right-2 w-4 h-0.5 bg-gray-200 z-10" />
              )}
              <span
                className={`text-xs font-bold tracking-widest ${
                  activeStep === i ? "text-[#0ea5e9]" : "text-gray-400"
                }`}
              >
                {s.num}
              </span>
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center my-3 transition-colors ${
                  activeStep === i ? "bg-[#0ea5e9]" : "bg-[#f0f7ff]"
                }`}
              >
                <s.icon
                  size={20}
                  className={activeStep === i ? "text-white" : "text-[#0ea5e9]"}
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
              <p className="text-[#4a5568] text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── MAINTENANCE / WHY CHOOSE US ── */}
      <section className="bg-[#f0f7ff] py-20 px-6 md:px-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <AnimatedSection delay={0.1}>
            <span className="text-xs font-semibold tracking-widest uppercase text-[#0ea5e9]">
              Prolonging Structural Health
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2 mb-4 leading-tight">
              <BlurText
                text="Caring for Your New Restored Smile"
                delay={150}
                animateBy="words"
                direction="top"
              />
            </h2>
            <div className="h-1 w-12 bg-[#0ea5e9] rounded-full mb-6" />
            <p className="text-[#4a5568] leading-relaxed mb-6">
              Correct protective routines and scheduled preventative evaluations preserve your full set prosthetic integrity. We ensure long-term stability via:
            </p>
            {[
              "Clear, structured instructions covering both removable cleaning and fixed arch sanitizing steps",
              "Routine tracking reviews to check soft mucosal padding tissue adaptations over time",
              "High-fidelity material setups resistant to fracture factors under intense pressure copy profiles",
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
                <CheckCircle2 className="text-[#0ea5e9] shrink-0" size={18} />
                <span className="text-[#4a5568] text-sm">{pt}</span>
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
                className="shadow-xl ring-4 ring-white relative z-10"
              >
                <img
                  src={smileImg}
                  alt="Confident smile following full restorative rehabilitation"
                  className="w-full h-[400px] object-cover object-top"
                />
              </ImageGlareHover>
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="absolute -bottom-5 -left-5 bg-white rounded-xl shadow-xl px-5 py-4 border border-gray-100 flex items-center gap-3 z-20"
              >
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="text-green-500" size={20} />
                </div>
                <div>
                  <p className="font-bold text-[#1a2332] text-sm">Full Adaptive Testing</p>
                  <p className="text-xs text-gray-400">Post-fitting follow-ups included</p>
                </div>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-20 px-6">
        <AnimatedSection className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-r from-[#0ea5e9] to-[#06b6d4] rounded-3xl overflow-hidden px-10 py-14 text-center shadow-2xl shadow-[#0ea5e9]/30">
            <div className="absolute inset-0 opacity-10">
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
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                <BlurText
                  text="Schedule Your Consultation Today"
                  delay={150}
                  animateBy="words"
                  direction="top"
                />
              </h2>
              <p className="text-white/85 max-w-xl mx-auto mb-8 text-lg leading-relaxed">
                If you are looking to reconstruct missing teeth or explore alternative full arch fixtures, 
                our specialized team is here to map out the ideal treatment balance for you.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center gap-2 bg-white text-[#0ea5e9] font-bold px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  <CalendarCheck size={18} />
                  Schedule Free Consultation
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 border-2 border-white text-white font-semibold px-7 py-3.5 rounded-full hover:bg-white/10 transition-all"
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