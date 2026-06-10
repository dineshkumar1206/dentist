import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ── Animation helpers ──────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: "easeOut" } },
});

const fadeLeft = (delay = 0) => ({
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, delay, ease: "easeOut" } },
});

const fadeRight = (delay = 0) => ({
  hidden: { opacity: 0, x: 50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, delay, ease: "easeOut" } },
});

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

// ── Reusable animated section wrapper ─────────────────────────────────────
function Reveal({ children, variant = fadeUp(), className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      variants={variant}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Data ───────────────────────────────────────────────────────────────────
const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "500+", label: "Happy Patients" },
  { value: "4.9", label: "Google Rating" },
  { value: "20+", label: "Services Offered" },
];

const values = [
  {
    icon: "🦷",
    title: "Patient-First Care",
    desc: "Every treatment plan is designed around your comfort, lifestyle, and long-term oral health — never a one-size-fits-all approach.",
  },
  {
    icon: "🔬",
    title: "Advanced Technology",
    desc: "From digital X-rays to laser dentistry, we invest in FDA-certified equipment so your outcomes are faster, safer, and more precise.",
  },
  {
    icon: "❤️",
    title: "Gentle & Compassionate",
    desc: "Dental anxiety is real. Our team is trained to create a calm, welcoming environment where nervous patients feel completely at ease.",
  },
  {
    icon: "🏅",
    title: "Clinical Excellence",
    desc: "Continuous education keeps our dentists at the forefront of modern techniques, delivering care that meets global standards.",
  },
];

const team = [
  {
    name: "Dr. Ranga",
    role: "Chief Dentist & Founder",
    exp: "15+ Years",
    speciality: "Cosmetic & Restorative Dentistry",
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
    color: "from-cyan-400 to-teal-500",
  },
  {
    name: "Dr. Priya Sharma",
    role: "Orthodontist",
    exp: "10+ Years",
    speciality: "Braces & Aligners",
    img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=face",
    color: "from-blue-400 to-cyan-500",
  },
  {
    name: "Dr. Arun Kumar",
    role: "Implantologist",
    exp: "12+ Years",
    speciality: "Dental Implants",
    img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=face",
    color: "from-teal-400 to-emerald-500",
  },
];

const milestones = [
  { year: "2009", event: "Founded Ranga's Dental Clinic in Chennai with a vision for affordable, world-class care." },
  { year: "2013", event: "Expanded to a fully equipped 3-chair clinic with digital imaging and sterilisation suite." },
  { year: "2017", event: "Introduced laser dentistry and same-day crown technology to the practice." },
  { year: "2021", event: "Crossed 500 five-star reviews and achieved FDA-certified equipment certification." },
  { year: "2024", event: "Launched a dedicated children's dentistry wing and orthodontic consultation suite." },
];

// ── Component ──────────────────────────────────────────────────────────────
export default function About() {
  return (
    <div
      className="min-h-screen font-sans text-gray-800"
      style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}
    >
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#e8f4fd] via-[#f0f8ff] to-white py-24 px-6">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-cyan-200 opacity-30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-teal-200 opacity-25 blur-3xl" />

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left text */}
          <div>
            <Reveal variant={fadeLeft()}>
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#0ea5e9] uppercase bg-cyan-50 border border-cyan-200 px-3 py-1.5 rounded-full mb-6">
                <span className="w-2 h-2 rounded-full bg-[#0ea5e9] animate-pulse" />
                About Us
              </span>
            </Reveal>

            <Reveal variant={fadeLeft(0.1)}>
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#0f172a] leading-tight mb-4">
                Smiles Built on{" "}
                <span className="text-[#0ea5e9]">Trust &</span>
                <br />
                Expertise
              </h1>
            </Reveal>

            <Reveal variant={fadeLeft(0.2)}>
              <div className="w-10 h-1 bg-teal-400 rounded mb-6" />
            </Reveal>

            <Reveal variant={fadeLeft(0.3)}>
              <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-md">
                Ranga's Dental Clinic has been Chennai's trusted destination for comprehensive oral care since
                2009. We combine cutting-edge technology with genuine compassion — because a healthy smile
                changes everything.
              </p>
            </Reveal>

            <Reveal variant={fadeLeft(0.4)}>
              <div className="flex gap-4 flex-wrap">
                <a
                  href="#team"
                  className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
                >
                  Meet the Team
                </a>
                <a
                  href="#story"
                  className="border border-[#0ea5e9] text-[#0ea5e9] hover:bg-cyan-50 font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
                >
                  Our Story →
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right — clinic image + floating badge */}
          <Reveal variant={fadeRight(0.2)} className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img
                src="/images/img-2.png"
                alt="Ranga's Dental Clinic interior"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl px-5 py-4 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-xl">⭐</div>
              <div>
                <div className="text-lg font-extrabold text-[#0f172a]">4.9 / 5.0</div>
                <div className="text-xs text-gray-400">500+ Patient Reviews</div>
              </div>
            </motion.div>

            {/* Top-right badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.4 }}
              className="absolute -top-4 -right-4 bg-[#0ea5e9] text-white rounded-2xl shadow-lg px-4 py-3 text-center"
            >
              <div className="text-xl font-black">15+</div>
              <div className="text-xs font-medium opacity-90">Years of Care</div>
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-[#0f172a] py-10 px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          {stats.map((s) => (
            <motion.div key={s.label} variants={fadeUp()}>
              <div className="text-3xl font-black text-[#0ea5e9]">{s.value}</div>
              <div className="text-xs text-gray-400 mt-1 uppercase tracking-wide">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── OUR STORY ── */}
      <section id="story" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* Image collage */}
          <Reveal variant={fadeLeft()} className="relative grid grid-cols-2 gap-3">
            <img
              src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=300&fit=crop"
              alt="Dental treatment"
              className="rounded-2xl w-full h-48 object-cover shadow-md col-span-2"
            />
            <img
              src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=300&h=220&fit=crop"
              alt="Modern dental chair"
              className="rounded-2xl w-full h-40 object-cover shadow-md"
            />
            <img
              src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=300&h=220&fit=crop&crop=right"
              alt="Dental equipment"
              className="rounded-2xl w-full h-40 object-cover shadow-md"
            />
          </Reveal>

          {/* Story text */}
          <div>
            <Reveal variant={fadeRight()}>
              <span className="text-xs font-semibold tracking-widest text-[#0ea5e9] uppercase">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f172a] mt-2 mb-4">
                15 Years of Crafting{" "}
                <span className="text-[#0ea5e9]">Confident Smiles</span>
              </h2>
              <div className="w-10 h-1 bg-teal-400 rounded mb-6" />
            </Reveal>
            <Reveal variant={fadeRight(0.1)}>
              <p className="text-gray-500 leading-relaxed mb-4">
                What started as a modest single-chair practice in 2009 has grown into one of Chennai's most
                trusted multi-specialty dental clinics. Dr. Ranga's founding belief was simple: every patient
                deserves access to world-class dental care in an environment that genuinely feels welcoming.
              </p>
              <p className="text-gray-500 leading-relaxed">
                Today, our team of specialists uses FDA-approved, cutting-edge technology to deliver treatments
                ranging from routine cleanings to full-smile makeovers — all under one roof.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="py-20 px-6 bg-[#f0f8ff]">
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center mb-14">
            <span className="text-xs font-semibold tracking-widest text-[#0ea5e9] uppercase">Milestones</span>
            <h2 className="text-3xl font-extrabold text-[#0f172a] mt-2">How We've Grown</h2>
          </Reveal>

          <div className="relative border-l-2 border-cyan-200 pl-8 space-y-10">
            {milestones.map((m, i) => (
              <Reveal key={m.year} variant={fadeLeft(i * 0.08)}>
                <div className="relative">
                  {/* Dot */}
                  <span className="absolute -left-[2.65rem] top-1 w-4 h-4 rounded-full bg-[#0ea5e9] border-2 border-white shadow" />
                  <div className="text-xs font-bold text-[#0ea5e9] mb-1 tracking-widest">{m.year}</div>
                  <p className="text-gray-600 text-sm leading-relaxed">{m.event}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-14">
            <span className="text-xs font-semibold tracking-widest text-[#0ea5e9] uppercase">Why Choose Us</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f172a] mt-2">
              The Values Behind Every Visit
            </h2>
          </Reveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((v) => (
              <motion.div
                key={v.title}
                variants={fadeUp()}
                whileHover={{ y: -6, boxShadow: "0 16px 32px rgba(14,165,233,0.12)" }}
                className="bg-[#f8fcff] border border-cyan-100 rounded-2xl p-6 cursor-default transition-shadow"
              >
                <div className="text-3xl mb-3">{v.icon}</div>
                <h3 className="font-bold text-[#0f172a] mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section id="team" className="py-24 px-6 bg-gradient-to-b from-[#e8f4fd] to-white">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-14">
            <span className="text-xs font-semibold tracking-widest text-[#0ea5e9] uppercase">Our Specialists</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f172a] mt-2">
              Meet the Hands Behind Your Smile
            </h2>
          </Reveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid sm:grid-cols-3 gap-8"
          >
            {team.map((doc) => (
              <motion.div
                key={doc.name}
                variants={fadeUp()}
                whileHover={{ y: -8 }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg border border-cyan-50 group"
              >
                {/* Image with gradient overlay */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={doc.img}
                    alt={doc.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${doc.color} opacity-20`} />
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-[#0ea5e9]">
                    {doc.exp}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-extrabold text-[#0f172a] text-lg">{doc.name}</h3>
                  <p className="text-[#0ea5e9] text-sm font-semibold">{doc.role}</p>
                  <p className="text-gray-400 text-xs mt-1">{doc.speciality}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-20 px-6 bg-[#0f172a] relative overflow-hidden">
        <div className="pointer-events-none absolute -top-20 left-1/4 w-72 h-72 rounded-full bg-cyan-500 opacity-10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 right-1/4 w-60 h-60 rounded-full bg-teal-400 opacity-10 blur-3xl" />

        <Reveal className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Ready for a{" "}
            <span className="text-[#0ea5e9]">Healthier Smile?</span>
          </h2>
          <p className="text-gray-400 mb-8">
            Book your free consultation today and take the first step towards the smile you deserve.
          </p>
          <motion.a
            href="#"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-bold px-8 py-4 rounded-xl transition-colors duration-200 shadow-lg shadow-cyan-500/30"
          >
            Book Free Consultation
          </motion.a>
        </Reveal>
      </section>
    </div>
  );
}