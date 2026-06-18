import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import FormService from "../components/FormService";
import BlurText from "../components/BlurText"; 
import ImageGlareHover from "../components/ImageGlareHover";

/* ── Design token: Uniform Font Family & Flyer Palette ── */
const FONT_FAMILY = "'Outfit', system-ui, sans-serif";
const PRIMARY_PURPLE = "#682187";

const features = [
  "Dental check-ups",
  "Root canal treatment",
  "Hygiene treatments",
  "Dental implant restoration",
  "Crowns, veneers and bridges",
  "Professional teeth-whitening.",
];

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function WhyChooseUs() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Reusable asymmetrical border radius token matching your specific image design layout
  const customFrameRadius = "120px 24px 120px 24px";

  return (
    <>
      <section className="bg-[#fcfbfe] py-16 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-16 xl:px-24 overflow-hidden" style={{ fontFamily: FONT_FAMILY }}>
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* LEFT: Text Content */}
          <motion.div 
            className="flex-1 w-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            {/* Tag */}
            <motion.p 
              variants={fadeUpVariants}
              className="text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-[#682187] mb-5"
            >
              Why Choose Us
            </motion.p>

            {/* Heading */}
            <motion.h2
              variants={fadeUpVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-6"
            >
              <BlurText
                text="Are you looking for a dentist to give you that special smile?"
                delay={150}
                animateBy="words"
                direction="top"
              />
            </motion.h2>

            {/* Subtext */}
            <motion.p 
              variants={fadeUpVariants}
              className="text-slate-500 text-sm sm:text-base font-light leading-relaxed mb-8 max-w-md"
            >
              Our clinic provides the highest quality dental care with a group of experienced dentists and specialists dedicated to your smile.
            </motion.p>

            {/* Features Grid */}
            <motion.div 
              variants={fadeUpVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mb-10"
            >
              {features.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Check size={16} strokeWidth={3} className="text-[#682187] flex-shrink-0" />
                  <span className="text-slate-700 font-medium text-sm sm:text-base">{item}</span>
                </div>
              ))}
            </motion.div>

            {/* Premium Capsule Action Button */}
            <motion.div variants={fadeUpVariants} className="w-full sm:w-auto">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="group inline-flex items-center gap-4 bg-[#8c7c96] text-white font-semibold text-sm rounded-full pl-6 pr-2 py-2 shadow-md shadow-purple-900/5 hover:bg-[#8c43ad] transition-all duration-400 ease-out w-full sm:w-auto justify-between sm:justify-start cursor-pointer"
              >
                Book a Visit
                <div className="w-[38px] h-[38px] bg-white text-[#8c7c96] rounded-full flex items-center justify-center group-hover:text-[#581c74] group-hover:scale-105 transition-all duration-400 ease-out">
                  <ArrowRight size={18} strokeWidth={2.5} className="transition-transform duration-400 ease-out group-hover:rotate-[-45deg]" />
                </div>
              </button>
            </motion.div>
          </motion.div>

          {/* RIGHT: Landscape Image Frame with Glare Overlay */}
          <motion.div 
            className="flex-1 w-full flex justify-center lg:justify-end"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <ImageGlareHover
              glareColor="#ffffff"
              glareOpacity={0.3}
              glareSize={240}
              borderRadius={customFrameRadius} 
              width="100%"
              className="max-w-xl lg:max-w-2xl bg-purple-50/40 shadow-xl shadow-purple-950/5"
              style={{ aspectRatio: "16/10" }}
            >
              <img
                src="/images/why-choose-us.png"
                alt="Happy patient with a beautiful smile"
                className="w-full h-full object-cover object-center"
              />
            </ImageGlareHover>
          </motion.div>

        </div>
      </section>

      {/* FORM MODAL SYSTEM OVERLAY */}
      <FormService 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        accentColor={PRIMARY_PURPLE}
        serviceName="Select a specialty service"
        defaultService="Select a specialty service"
      />
    </>
  );
}