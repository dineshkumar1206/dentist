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
  Activity,
  AlertTriangle,
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
  { icon: Shield, text: "Thoroughly removes harmful bacteria and deep-seated infection roots" },
  { icon: Activity, text: "Significantly reduces chronic gum inflammation, swelling, and bleeding" },
  { icon: CheckCircle2, text: "Prevents further progressive gum erosion and underlying jawbone damage" },
  { icon: Smile, text: "Helps save your natural teeth from shifting or eventual tooth loss" },
  { icon: AlertTriangle, text: "Eliminates chronic bad breath caused by underlying periodontal disease" },
  { icon: Star, text: "Promotes completely healthier, firmer gums and stronger anchor structures" },
];

const steps = [
  {
    num: "01",
    title: "Diagnosis & Imaging",
    desc: "A comprehensive assessment using high-definition digital X-rays to accurately map the internal infection and canal structure.",
    icon: Microscope,
  },
  {
    num: "02",
    title: "Deep Disinfection",
    desc: "The compromised or infected inner pulp is gently removed. The root canals are thoroughly cleaned, reshaped, and sanitized.",
    icon: Shield,
  },
  {
    num: "03",
    title: "Hermetic Sealing",
    desc: "The cleaned root canals are biocompatibly filled and sealed tightly to completely insulate the tooth from future bacteria.",
    icon: Clock,
  },
  {
    num: "04",
    title: "Final Restoration",
    desc: "The tooth is reinforced and built back up with a premium aesthetic filling or custom crown to fully restore structural strength.",
    icon: Smile,
  },
];

const stats = [
  { value: "97%", label: "Procedure Success Rate" },
  { value: "100%", label: "Biocompatible Sealants" },
  { value: "Pain-Free", label: "Advanced Local Anesthesia" },
  { value: "4.9★", label: "Patient Satisfaction" },
];

const heroImg = "/images/root-canal-hero.png";
const procedureImg = "/images/root-canal.png";
const smileImg = "/images/root-canal-service.jpg";

// ─── Component ────────────────────────────────────────────────────────────────
export default function RootCanal() {
  const [activeStep, setActiveStep] = useState(0);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="font-sans mt-6 bg-[#f0f7ff] text-[#1a2332]">

      {/* ── FORM MODAL ── */}
      {showForm && (
        <FormService
          serviceName="Root Canal Treatment"
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
              Root Canal Treatment
            </motion.span>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-4xl md:text-5xl font-extrabold leading-tight mb-4"
            >
              <BlurText
                text="Save Your Natural Tooth with Expert Root Canal Care"
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
              Root canal treatment is a highly effective, comfortable dental procedure 
              used to rescue a severely damaged or infected tooth. Eliminate pain, halt 
              spreading infection, and fully restore your natural bite functionality.
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
                Book Free Consultation
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
                alt="Root Canal Treatment"
                className="w-full h-[420px] object-cover"
              />
            </ImageGlareHover>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="absolute top-4 right-4 bg-[#0ea5e9] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow z-20"
            >
              97% Success Rate
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

      {/* ── UNDERSTANDING SECTION WITH GLARE ── */}
      <section className="py-20 px-6 md:px-16 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-14 items-center">
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
                  alt="Understanding Root Canal Treatment"
                  className="w-full h-[350px] object-cover"
                />
              </ImageGlareHover>
              <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-xl bg-[#0ea5e9]/15 border-2 border-[#0ea5e9]/30 -z-10" />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <span className="text-xs font-semibold tracking-widest uppercase text-[#0ea5e9]">
              Advanced Endodontic Therapy
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2 mb-4 leading-tight">
              <BlurText
                text="Understanding Root Canal Therapy"
                delay={150}
                animateBy="words"
                direction="top"
              />
            </h2>
            <div className="h-1 w-12 bg-[#0ea5e9] rounded-full mb-6" />
            <p className="text-[#4a5568] leading-relaxed mb-5">
              When the inner pulp of a tooth becomes infected due to deep decay, cracks, 
              or a dental injury, root canal treatment is necessary to save it. The process involves 
              removing the diseased pulp, cleaning and shaping the canal network, and fully disinfecting 
              the chamber.
            </p>
            <p className="text-[#4a5568] leading-relaxed mb-4">
              <strong>Watch out for these classic signs:</strong> persistent or throbbing toothaches, 
              prolonged sensitivity to hot or cold foods, localized gum swelling, tooth discoloration, 
              or painful biting pressure.
            </p>
            <div className="mt-6 flex items-center gap-4 bg-[#f0f7ff] border border-[#0ea5e9]/20 rounded-xl p-4">
              <div className="w-12 h-12 rounded-full bg-[#0ea5e9]/15 flex items-center justify-center shrink-0">
                <Shield className="text-[#0ea5e9]" size={22} />
              </div>
              <p className="text-sm text-[#4a5568]">
                <strong className="text-[#1a2332]">Pure Bio-Compatible Materials</strong>{" "}
                — we isolate the canal entirely with high-grade fillings and custom crowns to keep your tooth strong for life.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="bg-gradient-to-br from-[#1a2332] to-[#0f172a] py-20 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#0ea5e9]">
              Why Choose Root Canal Therapy
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2 mb-3">
              <BlurText
                text="The Real Benefits of Saving Your Tooth"
                delay={150}
                animateBy="words"
                direction="top"
              />
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Choosing root canal therapy over extraction allows you to maintain your 
              natural alignment, protects your jawbone structure, and achieves premium relief:
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
            Step by Step
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2 leading-tight">
            <BlurText
              text="Our Treatment Process"
              delay={150}
              animateBy="words"
              direction="top"
            />
          </h2>
          <p className="text-[#4a5568] max-w-xl mx-auto mt-3">
            Transparent, comfortable, and guided carefully by specialist dentists.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              onClick={() => setActiveStep(i)}
              className={`relative rounded-2xl p-6 border-2 cursor-pointer transition-all duration-300 h-full ${
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
                className={`w-11 h-11 rounded-xl flex items-center justify-center my-3 ${
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

              <p className="text-[#4a5568] text-sm leading-relaxed">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── WHY CHOOSE US WITH GLARE ── */}
      <section className="bg-[#f0f7ff] py-20 px-6 md:px-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <AnimatedSection delay={0.1}>
            <span className="text-xs font-semibold tracking-widest uppercase text-[#0ea5e9]">
              Our Promise
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2 mb-4 leading-tight">
              <BlurText
                text="Why Trust Our Specialist Root Canal Services?"
                delay={150}
                animateBy="words"
                direction="top"
              />
            </h2>
            <div className="h-1 w-12 bg-[#0ea5e9] rounded-full mb-6" />
            <p className="text-[#4a5568] leading-relaxed mb-6">
              We focus heavily on optimal patient comfort, complete micro-infection elimination, 
              and beautiful structural restoration outcomes.
            </p>
            {[
              "Highly experienced endodontic and root canal specialists",
              "Advanced rotary technology for fast, predictable, and quiet canal cleaning",
              "Micro-focused, ultra-low dose digital diagnostic X-rays",
              "Compassionate local anesthesia techniques ensuring zero procedural pain",
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

          {/* ── PROMISE SMILE IMAGE WITH GLARE ── */}
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
                  alt="Relieved patient after professional root canal treatment"
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
                  <p className="font-bold text-[#1a2332] text-sm">Pain Relief Guaranteed</p>
                  <p className="text-xs text-gray-400">Post-care tracking included</p>
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
                  text="Book Your Consultation Today"
                  delay={150}
                  animateBy="words"
                  direction="top"
                />
              </h2>
              <p className="text-white/85 max-w-xl mx-auto mb-8 text-lg leading-relaxed">
                If you are currently experiencing persistent pain or temperature sensitivity, 
                acting fast can save your tooth. Our expert dental team is fully prepared 
                to bring back your healthy, pain-free smile.
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
                  rel="noopener noreferrer"
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