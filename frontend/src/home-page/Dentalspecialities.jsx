import React from 'react';
import { motion } from 'framer-motion';
import {
  Drill,
  Baby,
  Activity,
  Sparkles,
  Zap,
  Smile,
  Layers,
  Heart,
  Scissors,
} from 'lucide-react';

/* ── Single Font Definition ── */
const FONT_FAMILY = "'Outfit', system-ui, sans-serif";

// ALL 9 SERVICES EXACT DATA MANIFEST
const services = [
  { id: 1, title: "Implants", icon: Drill },
  { id: 2, title: "Child Dental Care", icon: Baby },
  { id: 3, title: "Root Canal Treatment", icon: Activity },
  { id: 4, title: "Tooth Whitening Procedures", icon: Sparkles },
  { id: 5, title: "Ultrasonic Cleaning & Polishing", icon: Zap },
  { id: 6, title: "Fixed Braces / Clip Treatment", icon: Smile },
  { id: 7, title: "Full Teethsets (Removal & Fixed)", icon: Layers },
  { id: 8, title: "Gum Treatment / Flap Surgery", icon: Heart },
  { id: 9, title: "Surgical Removal of Wisdom Teeth", icon: Scissors },
];

// Scroll Viewport View Entry Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.4, ease: 'easeOut' } 
  }
};

function ServiceCard({ service }) {
  const Icon = service.icon;

  return (
    <motion.div
      variants={itemVariants}
      className="group relative bg-white border-b border-r border-slate-100 p-3 sm:p-10 lg:p-12 flex flex-col items-center justify-center text-center cursor-pointer overflow-hidden transition-all duration-300 hover:bg-cyan-400 w-full h-full min-h-[140px] sm:min-h-0"
    >
      {/* Icon Wrapper Graphic */}
      <div className="w-8 h-8 sm:w-14 sm:h-14 flex items-center justify-center text-cyan-500 transition-all duration-300 group-hover:scale-110 group-hover:text-white">
        <Icon
          strokeWidth={1.3}
          className="w-6 h-6 sm:w-8 sm:h-8 transition-colors duration-300"
        />
      </div>

      {/* Specialty Title Header Block */}
      <div className="flex items-center justify-center mt-2 mb-2 sm:mt-3 sm:mb-4 min-h-[42px] sm:min-h-[56px]">
        <h3 className="font-semibold text-slate-800 text-[11px] sm:text-base lg:text-lg tracking-tight leading-tight sm:leading-snug transition-colors duration-200 group-hover:text-white max-w-full sm:max-w-[200px] line-clamp-3 sm:line-clamp-none">
          {service.title}
        </h3>
      </div>

      {/* Interactive CTA Anchor Vector */}
      <div
        className="
          flex items-center justify-center gap-0.5 sm:gap-1
          text-[8px] sm:text-[10px] md:text-[11px]
          font-bold
          tracking-[0.04em] sm:tracking-[0.12em] md:tracking-[0.15em]
          uppercase
          text-slate-700
          transition-all duration-300
          group-hover:text-white
        "
      >
        <span className="scale-[0.9] sm:scale-100">Details</span>
        <span
          className="
            text-[9px] sm:text-xs
            transition-transform duration-300
            group-hover:translate-x-0.5
            group-hover:translate-y-0.5
          "
        >
          ↘
        </span>
      </div>
    </motion.div>
  );
}

export default function DentalSpecialities() {
  return (
    <section 
      className="w-full bg-white py-12 sm:py-20 relative overflow-hidden"
      style={{ fontFamily: FONT_FAMILY }}
    >
      {/* Structural Background Details */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-30">
        <svg viewBox="0 0 100 100" className="absolute -left-10 top-20 w-44 h-44 text-slate-100" fill="none">
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        
        {/* Section Headline Block */}
        <div className="mb-8 sm:mb-16 text-center mx-auto max-w-2xl">
          <p className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase text-cyan-600 mb-2">
            Most Popular Services
          </p>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
            Our Services
          </h2>
          <div className="mt-3 mx-auto w-10 h-0.5 bg-cyan-500 rounded-full" />
        </div>

        {/* UPDATED RESPONSIVE GRID CONFIG:
          - grid-cols-3: Allocates exactly 3 columns across ALL screen frames (including mobile)
          - Total 9 items / 3 columns = Strict 3 rows and 3 columns on mobile layout.
        */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.02 }}
          className="grid grid-cols-3 border-t border-l border-slate-100 shadow-sm mx-auto"
        >
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}