import React, { useRef, useEffect, useState } from 'react'; // Added useState
import { motion, useInView } from "framer-motion";
import { ArrowRight } from 'lucide-react'; 
import gsap from 'gsap';
import BlurText from "../components/BlurText"; 
import ImageGlareHover from "../components/ImageGlareHover"; 
import FormService from "../components/FormService"; // Imported FormService

/* ── Design token: Uniform Font Family & Flyer Palette ── */
const FONT_FAMILY = "'Outfit', system-ui, sans-serif";
const PRIMARY_PURPLE = "#682187"; 
const DARK_PURPLE = "#4c1263";

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
  { value: "16+ ", label: "Years Experience" },
  { value: "50,000+", label: "Happy Patients" },
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
    exp: "16+ Years",
    speciality: "Cosmetic & Restorative Dentistry",
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
    color: "from-purple-400 to-[#682187]",
  },
  {
    name: "Dr. Priya Sharma",
    role: "Orthodontist",
    exp: "10+ Years",
    speciality: "Braces & Aligners",
    img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=face",
    color: "from-fuchsia-400 to-[#682187]",
  },
  {
    name: "Dr. Arun Kumar",
    role: "Implantologist",
    exp: "12+ Years",
    speciality: "Dental Implants",
    img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=face",
    color: "from-[#8c7c96] to-[#4c1263]",
  },
];

const milestones = [
  { year: "2009", event: "Founded Ranga's Dental Clinic in Chennai with a vision for affordable, world-class care." },
  { year: "2013", event: "Expanded to a fully equipped 3-chair clinic with digital imaging and sterilisation suite." },
  { year: "2017", event: "Introduced laser dentistry and same-day crown technology to the practice." },
  { year: "2021", event: "Crossed 500 five-star reviews and achieved FDA-certified equipment certification." },
  { year: "2024", event: "Launched a dedicated children's dentistry wing and orthodontic consultation suite." },
];

export default function About() {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state added
  
  // Refs for GSAP Magnetic Button Interactions
  const meetTeamRef = useRef(null);
  const bannerCtaRef = useRef(null);

  useEffect(() => {
    if (window.innerWidth < 640) return;

    const attachMagneticEffect = (elementRef, speedMultiplier = 0.35) => {
      const el = elementRef.current;
      if (!el) return;

      const onMouseMove = (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(el, {
          x: x * speedMultiplier,
          y: y * speedMultiplier,
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

    const cleanMeetTeam = attachMagneticEffect(meetTeamRef);
    const cleanBannerCta = attachMagneticEffect(bannerCtaRef);

    return () => {
      if (cleanMeetTeam) cleanMeetTeam();
      if (cleanBannerCta) cleanBannerCta();
    };
  }, []);

  return (
    <div className="min-h-screen text-slate-800 bg-[#fcfbfe]" style={{ fontFamily: FONT_FAMILY }}>
      
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#f5f2f8] via-[#fcfbfe] to-white py-24 px-6">
        {/* Ambient background glows */}
        <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-purple-200/40 opacity-40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-fuchsia-200/30 opacity-30 blur-3xl" />

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left text */}
          <div>
            <Reveal variant={fadeLeft()}>
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#682187] uppercase bg-purple-50 border border-purple-200 px-3 py-1.5 rounded-full mb-6">
                <span className="w-2 h-2 rounded-full bg-[#682187] animate-pulse" />
                About Us
              </span>
            </Reveal>

            <Reveal variant={fadeLeft(0.1)}>
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#0f172a] tracking-tight leading-[1.15] mb-4">
                <BlurText
                  text="Smiles Built on Trust & Expertise"
                  delay={150}
                  animateBy="words"
                  direction="top"
                />
              </h1>
            </Reveal>

            <Reveal variant={fadeLeft(0.2)}>
              <div className="w-10 h-1 bg-[#682187] rounded mb-6" />
            </Reveal>

            <Reveal variant={fadeLeft(0.3)}>
              <p className="text-slate-500 font-light text-base leading-relaxed mb-8 max-w-md">
                Ranga's Dental Clinic has been Chennai's trusted destination for comprehensive oral care since
                2009. We combine cutting-edge technology with genuine compassion — because a healthy smile
                changes everything.
              </p>
            </Reveal>

            {/* Actions Row */}
            <Reveal variant={fadeLeft(0.4)}>
              <div className="flex gap-4 flex-wrap items-center">
                <button
                  ref={meetTeamRef}
                  onClick={() => document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-gradient-to-br from-[#682187] to-[#4c1263] text-white font-semibold text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-purple-900/10 transition-shadow duration-200 cursor-pointer will-change-transform"
                >
                  Meet the Team
                </button>

                {/* Updated "Our Story" button with your precise pure Tailwind capsule structure */}
                <button 
                  onClick={() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group inline-flex items-center gap-4 bg-[#8c7c96] text-white font-semibold text-sm rounded-full pl-6 pr-2 py-2 shadow-md shadow-purple-900/5 hover:bg-[#8c43ad] transition-all duration-400 ease-out w-full sm:w-auto justify-between sm:justify-start cursor-pointer"
                >
                  Our Story
                  <div className="w-[38px] h-[38px] bg-white text-[#8c7c96] rounded-full flex items-center justify-center group-hover:text-[#581c74] group-hover:scale-105 transition-all duration-400 ease-out">
                    <ArrowRight size={18} strokeWidth={2.5} className="transition-transform duration-400 ease-out group-hover:rotate-[-45deg]" />
                  </div>
                </button>
              </div>
            </Reveal>
          </div>

          {/* Right — clinic image wrapped in Glare frame */}
          <Reveal variant={fadeRight(0.2)} className="relative">
            <ImageGlareHover
              glareColor="#ffffff"
              glareOpacity={0.3}
              glareSize={240}
              borderRadius="1.5rem"
              width="100%"
              className="shadow-2xl aspect-[4/3] relative z-10 bg-purple-50/20"
            >
              <div className="w-full h-full relative">
                <img
                  src="/images/img-2.png"
                  alt="Ranga's Dental Clinic interior"
                  className="w-full h-full object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-950/15 to-transparent pointer-events-none rounded-2xl" />
              </div>
            </ImageGlareHover>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl px-5 py-4 flex items-center gap-3 z-20 border border-purple-50"
            >
              <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-xl">⭐</div>
              <div>
                <div className="text-lg font-extrabold text-[#0f172a] tracking-tight">4.9 / 5.0</div>
                <div className="text-xs text-slate-400 font-medium">500+ Patient Reviews</div>
              </div>
            </motion.div>

            {/* Top-right badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.4 }}
              className="absolute -top-4 -right-4 bg-[#682187] text-white rounded-2xl shadow-lg px-4 py-3 text-center z-20"
            >
              <div className="text-xl font-black">16+</div>
              <div className="text-xs font-semibold opacity-90 tracking-wide">Years of Care</div>
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-[#0f172a] py-12 px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          {stats.map((s) => (
            <motion.div key={s.label} variants={fadeUp()}>
              <div className="text-3xl font-black text-white bg-gradient-to-r from-purple-400 to-fuchsia-300 bg-clip-text text-transparent tracking-tight">{s.value}</div>
              <div className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-[0.15em]">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── OUR STORY ── */}
      <section id="story" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* Image collage with separate Glare items */}
          <Reveal variant={fadeLeft()} className="relative grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <ImageGlareHover glareOpacity={0.25} borderRadius="1rem" width="100%">
                <img
                  src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=300&fit=crop"
                  alt="Dental treatment"
                  className="rounded-2xl w-full h-48 object-cover shadow-md"
                />
              </ImageGlareHover>
            </div>
            <div>
              <ImageGlareHover glareOpacity={0.25} borderRadius="1rem" width="100%">
                <img
                  src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=300&h=220&fit=crop"
                  alt="Modern dental chair"
                  className="rounded-2xl w-full h-40 object-cover shadow-md"
                />
              </ImageGlareHover>
            </div>
            <div>
              <ImageGlareHover glareOpacity={0.25} borderRadius="1rem" width="100%">
                <img
                  src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=300&h=220&fit=crop&crop=right"
                  alt="Dental equipment"
                  className="rounded-2xl w-full h-40 object-cover shadow-md"
                />
              </ImageGlareHover>
            </div>
          </Reveal>

          {/* Story text */}
          <div>
            <Reveal variant={fadeRight()}>
              <span className="text-xs font-bold tracking-[0.2em] text-[#682187] uppercase">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f172a] tracking-tight mt-2 mb-4">
                <BlurText
                  text="16 Years of Crafting Confident Smiles"
                  delay={150}
                  animateBy="words"
                  direction="top"
                />
              </h2>
              <div className="w-10 h-1 bg-[#682187] rounded mb-6" />
            </Reveal>
            <Reveal variant={fadeRight(0.1)}>
              <p className="text-slate-500 font-light leading-relaxed mb-4">
                What started as a modest single-chair practice in 2009 has grown into one of Chennai's most
                trusted multi-specialty dental clinics. Dr. Ranga's founding belief was simple: every patient
                deserves access to world-class dental care in an environment that genuinely feels welcoming.
              </p>
              <p className="text-slate-500 font-light leading-relaxed">
                Today, our team of specialists uses FDA-approved, cutting-edge technology to deliver treatments
                ranging from routine cleanings to full-smile makeovers — all under one roof.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="py-20 px-6 bg-[#f7f5fa]">
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center mb-14">
            <span className="text-xs font-bold tracking-[0.2em] text-[#682187] uppercase">Milestones</span>
            <h2 className="text-3xl font-extrabold text-[#0f172a] tracking-tight mt-2">
              <BlurText
                text="How We've Grown"
                delay={150}
                animateBy="words"
                direction="top"
              />
            </h2>
          </Reveal>

          <div className="relative border-l-2 border-purple-200 pl-8 space-y-10">
            {milestones.map((m, i) => (
              <Reveal key={m.year} variant={fadeLeft(i * 0.08)}>
                <div className="relative">
                  {/* Dot */}
                  <span className="absolute -left-[2.65rem] top-1 w-4 h-4 rounded-full bg-[#682187] border-2 border-white shadow-xs" />
                  <div className="text-xs font-bold text-[#682187] mb-1 tracking-widest">{m.year}</div>
                  <p className="text-slate-600 font-light text-sm leading-relaxed">{m.event}</p>
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
            <span className="text-xs font-bold tracking-[0.2em] text-[#682187] uppercase">Why Choose Us</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f172a] tracking-tight mt-2">
              <BlurText
                text="The Values Behind Every Visit"
                delay={150}
                animateBy="words"
                direction="top"
              />
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
                whileHover={{ y: -6, boxShadow: "0 16px 32px rgba(104,33,135,0.08)" }}
                className="bg-[#fdfbfe] border border-purple-100 rounded-2xl p-6 cursor-default transition-shadow"
              >
                <div className="text-3xl mb-3">{v.icon}</div>
                <h3 className="font-bold text-[#0f172a] mb-2">{v.title}</h3>
                <p className="text-slate-500 text-sm font-light leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section id="team" className="py-24 px-6 bg-gradient-to-b from-[#f7f5fa] to-white">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-14">
            <span className="text-xs font-bold tracking-[0.2em] text-[#682187] uppercase">Our Specialists</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f172a] tracking-tight mt-2">
              <BlurText
                text="Meet the Hands Behind Your Smile"
                delay={150}
                animateBy="words"
                direction="top"
              />
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
                className="bg-white rounded-3xl overflow-hidden shadow-lg border border-purple-50 group"
              >
                <ImageGlareHover
                  glareColor="#ffffff"
                  glareOpacity={0.3}
                  glareSize={150}
                  borderRadius="0px" 
                  width="100%"
                  className="h-60 bg-slate-100 relative"
                >
                  <img
                    src={doc.img}
                    alt={doc.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${doc.color} opacity-20 pointer-events-none`} />
                  
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-bold text-[#682187] z-20">
                    {doc.exp}
                  </div>
                </ImageGlareHover>

                <div className="p-5">
                  <h3 className="font-extrabold text-[#0f172a] text-lg tracking-tight">{doc.name}</h3>
                  <p className="text-[#682187] text-sm font-bold mt-0.5">{doc.role}</p>
                  <p className="text-slate-400 text-xs font-light mt-1">{doc.speciality}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-20 px-6 bg-[#0f172a] relative overflow-hidden">
        <div className="pointer-events-none absolute -top-20 left-1/4 w-72 h-72 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 right-1/4 w-60 h-60 rounded-full bg-fuchsia-400/10 blur-3xl" />

        <Reveal className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
            <BlurText
              text="Ready for a Healthier Smile?"
              delay={150}
              animateBy="words"
              direction="top"
            />
          </h2>
          <p className="text-slate-400 font-light mb-8">
            Book your free consultation today and take the first step towards the smile you deserve.
          </p>
          
          <button
            ref={bannerCtaRef}
            onClick={() => setIsModalOpen(true)} // Connected modal click handler here
            className="inline-block bg-gradient-to-br from-[#682187] to-[#4c1263] text-white font-bold px-8 py-4 rounded-xl transition-shadow duration-200 shadow-lg shadow-purple-900/20 cursor-pointer will-change-transform"
          >
            Book Free Consultation
          </button>
        </Reveal>
      </section>

      {/* FORM MODAL SYSTEM OVERLAY */}
      <FormService 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        accentColor={PRIMARY_PURPLE}
        serviceName="General Consultation"
        defaultService="General Consultation"
      />
    </div>
  );
}