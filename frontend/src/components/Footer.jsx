import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Animation layout configs
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  return (
    <footer className="w-full bg-[#0f172a] text-slate-400 pt-16 pb-8 border-t border-slate-800 relative overflow-hidden">
      {/* Decorative Subtle Background Accents */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-20">
        <div className="absolute left-[-10%] bottom-[-20%] w-[450px] h-[450px] bg-cyan-900 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid Matrix */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 xl:gap-12 pb-12 border-b border-slate-800"
        >
          
          {/* COLUMN 1: BRAND IDENTITY BLOCK */}
          <motion.div variants={itemVariants} className="lg:col-span-4 space-y-5">
            <div className="flex items-center space-x-3 group cursor-pointer">
            <img src="/images/Dentist-logo.jpg" alt="RANGA'S DENTAL CLINIC Logo" className="h-15 w-15 object-contain" />

              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-wider text-white uppercase leading-none">Ranga's</span>
                <span className="text-xs tracking-[0.3em] text-cyan-400 uppercase font-light mt-1">Dental Clinic</span>
              </div>
            </div>
            
            <p className="text-sm font-light leading-relaxed text-slate-400 max-w-sm">
              Providing modern, compassionate dental treatments utilizing state-of-the-art diagnostic tools to restore and protect your smile.
            </p>

            {/* FIXED: Replaced Lucide imports with lightweight, bulletproof inline SVGs */}
            <div className="flex space-x-3 pt-2">
              {/* Facebook Icon */}
              <a href="#" className="p-2.5 rounded-xl bg-slate-800/60 text-slate-400 hover:bg-cyan-500 hover:text-white transition-colors duration-300 flex items-center justify-center">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.8z"/>
                </svg>
              </a>

              {/* Instagram Icon */}
              <a href="#" className="p-2.5 rounded-xl bg-slate-800/60 text-slate-400 hover:bg-cyan-500 hover:text-white transition-colors duration-300 flex items-center justify-center">
                <svg className="w-4 h-4 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>

              {/* LinkedIn Icon */}
              <a href="#" className="p-2.5 rounded-xl bg-slate-800/60 text-slate-300 hover:bg-cyan-500 hover:text-white transition-colors duration-300 flex items-center justify-center">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>
            </div>
          </motion.div>

          {/* COLUMN 2: QUICK LINK DIRECTORY */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5 text-sm font-light">
              {['Home', 'Services', 'About Us', 'Testimonials'].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-cyan-400 transition-colors duration-200 flex items-center group">
                    <span>{link}</span>
                    <ArrowUpRight size={12} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* COLUMN 3: CLINIC APPOINTMENT METRICS */}
          <motion.div variants={itemVariants} className="lg:col-span-3 space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Appointments</h4>
            
            <div className="space-y-4 font-light text-sm">
              <div className="flex items-start space-x-3">
                <div className="mt-1 text-cyan-400 p-2 rounded-lg bg-slate-800/40 flex-shrink-0">
                  <Phone size={16} />
                </div>
                <div>
                  <p className="text-xs text-slate-300 font-medium uppercase tracking-wider mb-0.5">Call for Bookings</p>
                  <a href="tel:+919962477757" className="text-white font-semibold block hover:text-cyan-400 transition-colors">+91 99624 77757</a>
                  <a href="tel:+919962477758" className="text-white font-semibold block hover:text-cyan-400 transition-colors">+91 99624 77758</a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="mt-1 text-cyan-400 p-2 rounded-lg bg-slate-800/40 flex-shrink-0">
                  <Clock size={16} />
                </div>
                <div>
                  <p className="text-xs text-slate-300 font-medium uppercase tracking-wider mb-0.5">Timing Structure</p>
                  <p className="text-white font-medium">Mon - Sat: 9 AM - 9 PM</p>
                  <p className="text-slate-300 text-xs">Sunday: By Appointment Only</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* COLUMN 4: HOSPITAL LOCATION ACCENT */}
          <motion.div variants={itemVariants} className="lg:col-span-3 space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Location</h4>
            
            <div className="flex items-start space-x-3 font-light text-sm">
              <div className="mt-1 text-cyan-400 p-2 rounded-lg bg-slate-800/40 flex-shrink-0">
                <MapPin size={16} />
              </div>
              <div className="space-y-1 text-slate-300">
                <p className="text-white font-bold text-sm text-cyan-400">@ RKP HOSPITALS</p>
                <p className="leading-relaxed">
                  No. Vaithyalingam Street,<br />
                  Nanmangalam,<br />
                  Chennai - 600 129
                </p>
              </div>
            </div>
          </motion.div>

        </motion.div>

        {/* Bottom Bar Matrix */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs font-light text-slate-300 gap-4">
          <p>© {currentYear} Ranga's Dental Clinic. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}