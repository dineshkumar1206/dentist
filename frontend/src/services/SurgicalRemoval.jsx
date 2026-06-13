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
import FormService from "../components/FormService"; // ← import the form

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
  { icon: Shield, text: "Provides complete relief from severe, throbbing pain and back-jaw discomfort" },
  { icon: Activity, text: "Prevents acute local infections, swelling conditions, and painful gum disease" },
  { icon: CheckCircle2, text: "Protects adjacent healthy molars from destructive root friction and decay" },
  { icon: Smile, text: "Drastically reduces the risk of developing painful cysts or bone complications" },
  { icon: Sparkles, text: "Stops dental overcrowding and protects your overall orthodontic alignment" },
  { icon: Star, text: "Supports optimal, completely stress-free, and healthy long-term oral wellness" },
];

const steps = [
  {
    num: "01",
    title: "Digital Imaging Analysis",
    desc: "Detailed examinations along with ultra-precise digital imaging map out the exact root depth and nerve positions.",
    icon: Microscope,
  },
  {
    num: "02",
    title: "Comfort Anesthesia",
    desc: "Advanced local anesthesia configurations are delicately administered to ensure a completely pain-free procedure.",
    icon: Shield,
  },
  {
    num: "03",
    title: "Surgical Extraction",
    desc: "Problematic or completely impacted wisdom teeth are safely removed using specialized, minimally invasive methods.",
    icon: Sparkles,
  },
  {
    num: "04",
    title: "Guided Regeneration",
    desc: "Comprehensive post-operative care and detailed healing milestones are managed for a smooth recovery track.",
    icon: Clock,
  },
];

const stats = [
  { value: "Safe", label: "Surgical Protocols" },
  { value: "Premium", label: "Local Anesthesia" },
  { value: "Minimally", label: "Invasive Methods" },
  { value: "4.9★", label: "Patient Comfort" },
];

const heroImg = "/images/wisdom-hero.png";
const procedureImg = "/images/wisdom-importance.png";
const smileImg =
  "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80";

// ─── Component ────────────────────────────────────────────────────────────────
export default function SurgicalRemoval() {
  const [activeStep, setActiveStep] = useState(0);

  // ── Modal state — false by default so it does not load automatically ──────
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="font-sans mt-6 bg-[#f0f7ff] text-[#1a2332]">

      {/* ── FORM MODAL — Only mounts and renders when showForm is explicitly true ── */}
      {showForm && (
        <FormService
          serviceName="Surgical Removal of Wisdom Teeth"
          isOpen={showForm}
          onClose={() => setShowForm(false)}
        />
      )}

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
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
              Oral Surgery
            </motion.span>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-4xl md:text-5xl font-extrabold leading-tight mb-4"
            >
              Safe and Comfortable{" "}
              <span className="text-[#0ea5e9]">Wisdom Tooth Extraction</span>
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
              When final molars lack the proper space to erupt safely, they trigger immense pressure, 
              localized infection, and deep tissue misalignment. Protect your long-term smile structure with expert surgical care.
            </motion.p>

            <motion.div
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-4"
            >
              {/* ── BUTTON 1: opens the form modal ── */}
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-semibold px-7 py-3.5 rounded-full shadow-lg shadow-[#0ea5e9]/30 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <CalendarCheck size={18} />
                Schedule Extraction Consultation
              </button>
              <button className="inline-flex items-center gap-2 text-[#0ea5e9] font-semibold px-6 py-3.5 rounded-full border border-[#0ea5e9]/40 hover:bg-[#0ea5e9]/10 transition-all duration-200">
                Learn More
                <ChevronRight size={16} />
              </button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white">
              <img
                src={heroImg}
                alt="Surgical Removal of Wisdom Teeth"
                className="w-full h-[420px] object-cover"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="absolute top-4 right-4 bg-[#0ea5e9] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow"
            >
              Expert Extractions
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────────────────── */}
      <AnimatedSection className="bg-[#1a2332] py-8 px-6">
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
      </AnimatedSection>

      {/* ── SIGNS AND INDICATORS SECTION ─────────────────────────────────── */}
      <section className="py-20 px-6 md:px-16 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <AnimatedSection>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl ring-4 ring-white">
                <img
                  src={procedureImg}
                  alt="When Is Wisdom Tooth Extraction Necessary"
                  className="w-full h-[350px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-xl bg-[#0ea5e9]/15 border-2 border-[#0ea5e9]/30 -z-10" />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <span className="text-xs font-semibold tracking-widest uppercase text-[#0ea5e9]">
              Diagnostic Necessity
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2 mb-4 leading-tight">
              When Is Extraction <span className="text-[#0ea5e9]">Surgically Required?</span>
            </h2>
            <div className="h-1 w-12 bg-[#0ea5e9] rounded-full mb-6" />
            <p className="text-[#4a5568] leading-relaxed mb-4">
              Because wisdom teeth emerge late, they frequently present as fully or partially impacted under 
              the gum lines, making early clinical tracking absolutely crucial. Watch for these signals:
            </p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-[#4a5568] font-medium mb-6">
              <li className="flex items-center gap-2">❌ Severe throbbing pain in back-jaw zones</li>
              <li className="flex items-center gap-2">❌ Impacted teeth completely locked in bone</li>
              <li className="flex items-center gap-2">❌ Localized swelling, redness, or infection</li>
              <li className="flex items-center gap-2">❌ Friction damage to neighboring molars</li>
              <li className="flex items-center gap-2">❌ Strict difficulty chewing or opening jaws</li>
              <li className="flex items-center gap-2">❌ Recurring pericoronitis gum outbreaks</li>
            </ul>

            <div className="flex items-center gap-4 bg-[#f0f7ff] border border-[#0ea5e9]/20 rounded-xl p-4">
              <div className="w-12 h-12 rounded-full bg-[#0ea5e9]/15 flex items-center justify-center shrink-0">
                <Shield className="text-[#0ea5e9]" size={22} />
              </div>
              <p className="text-sm text-[#4a5568]">
                <strong className="text-[#1a2332]">Surgical Precision</strong> — our oral surgical specialists incorporate advanced physical metrics to softly decouple dental units from underlying networks, prioritizing your comfort.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── BENEFITS ─────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#1a2332] to-[#0f172a] py-20 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#0ea5e9]">
              Safeguard Long-Term Wellness
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2 mb-3">
              Benefits of Timely Wisdom Teeth Removal
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Extracting problematic third molars blocks deep root absorption layout damage, systemic shifting, and sinus tension factors:
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

      {/* ── PROCEDURE STEPS ──────────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-16 max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-14">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#0ea5e9]">
            Clinical Protocol
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2 leading-tight">
            Our Surgical <span className="text-[#0ea5e9]">Extraction Process</span>
          </h2>
          <p className="text-[#4a5568] max-w-xl mx-auto mt-3">
            Completely transparent, deeply controlled, and executed utilizing advanced anesthetic delivery systems.
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
              <h3 className="font-bold text-[#1a2332] text-sm mb-2">{s.title}</h3>
              <p className="text-[#4a5568] text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── MAINTENANCE / WHY CHOOSE US ────────────────────────────────────── */}
      <section className="bg-[#f0f7ff] py-20 px-6 md:px-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <AnimatedSection delay={0.1}>
            <span className="text-xs font-semibold tracking-widest uppercase text-[#0ea5e9]">
              Optimal Recovery
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2 mb-4 leading-tight">
              Post-Operative Recovery <span className="text-[#0ea5e9]">& Aftercare Flow</span>
            </h2>
            <div className="h-1 w-12 bg-[#0ea5e9] rounded-full mb-6" />
            <p className="text-[#4a5568] leading-relaxed mb-6">
              Following safe molar extraction, regular tracking safeguards rapid healing parameters. 
              Our clinical surgical team guarantees predictable results through:
            </p>
            {[
              "Highly structured, detailed instructions covering clot preservation and physical hygiene care",
              "Advanced prescription tracking configurations to completely mitigate swelling and minor discomfort",
              "Minimally invasive soft-tissue closure systems reducing typical recovery down-times",
              "Scheduled complimentary follow-ups to closely inspect bone remodeling baselines",
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

          <AnimatedSection>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl ring-4 ring-white">
                <img
                  src={smileImg}
                  alt="Relieved patient following successful wisdom tooth surgical extraction"
                  className="w-full h-[400px] object-cover object-top"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="absolute -bottom-5 -left-5 bg-white rounded-xl shadow-xl px-5 py-4 border border-gray-100 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="text-green-500" size={20} />
                </div>
                <div>
                  <p className="font-bold text-[#1a2332] text-sm">Full Healing Tracking</p>
                  <p className="text-xs text-gray-400">Post-operative support included</p>
                </div>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
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
                Schedule Your Wisdom Tooth Consultation Today
              </h2>
              <p className="text-white/85 max-w-xl mx-auto mb-8 text-lg leading-relaxed">
                If you are currently experiencing active swelling, back-jaw tension, or molar compression, 
                timely intervention prevents serious complications. Contact our expert clinic today.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {/* ── BUTTON 2: opens the form modal ── */}
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