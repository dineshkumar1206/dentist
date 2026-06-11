import { Check } from "lucide-react";
import { motion } from "framer-motion";

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
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-16 xl:px-24 overflow-hidden">
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
            className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-gray-400 mb-5"
          >
            Why Choose Us
          </motion.p>

          {/* Headline */}
          <motion.h2
            variants={fadeUpVariants}
            className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 leading-tight mb-6"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Are you looking for a dentist to give you that special smile?
          </motion.h2>

          {/* Subtext */}
          <motion.p 
            variants={fadeUpVariants}
            className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8 max-w-md"
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
                <Check size={16} strokeWidth={3} className="text-teal-500 flex-shrink-0" />
                <span className="text-gray-700 text-sm sm:text-base">{item}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div variants={fadeUpVariants}>
            <button className="border border-gray-800 text-gray-800 text-xs font-semibold tracking-[0.2em] uppercase px-8 py-4 hover:bg-gray-900 hover:text-white transition-all duration-300">
              Book a Visit
            </button>
          </motion.div>
        </motion.div>

        {/* RIGHT: Responsive Landscape Image */}
        <motion.div 
          className="flex-1 w-full flex justify-center lg:justify-end"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <div
            className="w-full max-w-xl lg:max-w-2xl overflow-hidden bg-gray-100 shadow-sm"
            style={{
              // Elegant asymmetrical curve styling optimized specifically for landscape frames
              borderRadius: "120px 24px 120px 24px", 
              aspectRatio: "16/10" 
            }}
          >
            <img
              src="/images/why-choose-us.png"
              alt="Happy patient with a beautiful smile"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}