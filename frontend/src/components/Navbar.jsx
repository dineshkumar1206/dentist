import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Removed Tooth to fix the crash shown in image_d0ee8b.png
import { Menu, X, ChevronDown, Drill, Baby, Activity, Sparkles, Zap, Smile, Layers, Heart, Scissors } from 'lucide-react'; 
import { NavLink } from "react-router-dom";
import FormService from "./FormService"; // Imported the Form Modal Component

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // New state to control the modal overlay

  const services = [
    { id: 1, title: "Implants", icon: Drill, href: "/services/implants" },
    { id: 2, title: "Child Dental Care", icon: Baby, href: "/services/child-dental-care" },
    { id: 3, title: "Root Canal Treatment", icon: Activity, href: "/services/root-canal" },
    { id: 4, title: "Tooth Whitening Procedures", icon: Sparkles, href: "/services/whitening" },
    { id: 5, title: "Ultrasonic Cleaning & Polishing", icon: Zap, href: "/services/cleaning" },
    { id: 6, title: "Fixed Braces / Clip Treatment", icon: Smile, href: "/services/braces" },
    { id: 7, title: "Full Teethsets (Removal & Fixed)", icon: Layers, href: "/services/teethsets" },
    { id: 8, title: "Gum Treatment / Flap Surgery", icon: Heart, href: "/services/gum-treatment" },
    { id: 9, title: "Surgical Removal of Wisdom Teeth", icon: Scissors, href: "/services/wisdom-teeth" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo Area */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <div>
                <img src="/images/RANGAS-ENTAL-CLINIC-FINAL-LOGO-1.png" alt="RANGA'S DENTAL CLINIC Logo" className="h-37 w-37 object-contain" />
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="flex space-x-1">
                {/* Home Link */}
                <NavLink
                  to="/"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0 }}
                  className="relative px-4 py-2 text-sm font-medium text-slate-600 hover:text-cyan-600 transition-colors duration-300 rounded-lg group"
                >
                  Home
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </NavLink>

                {/* Services Dropdown (Desktop Hover) */}
                <div className="relative group/dropdown flex items-center">
                  <button className="flex items-center space-x-1 px-4 py-2 text-sm font-medium text-slate-600 hover:text-cyan-600 transition-colors duration-300 rounded-lg group">
                    <span>Services</span>
                    <ChevronDown size={18} className="transition-transform duration-200 group-hover/dropdown:rotate-180" />
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-cyan-500 scale-x-0 group-hover/dropdown:scale-x-100 transition-transform duration-300 origin-left" />
                  </button>

                  {/* Dropdown Menu Overlay Panel */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-full w-[480px] pt-2 invisible opacity-0 group-hover/dropdown:visible group-hover/dropdown:opacity-100 transition-all duration-300 ease-out z-50">
                    <div className="bg-white border border-slate-100 shadow-xl rounded-2xl p-4 grid grid-cols-2 gap-2">
                      {services.map((service) => {
                        const IconComponent = service.icon;
                        return (
                          <NavLink
                            key={service.id}
                            to={service.href}
                            className="flex items-center space-x-3 p-3 rounded-xl hover:bg-cyan-50 text-slate-600 hover:text-cyan-600 transition-all duration-200 group/item"
                          >
                            <div className="p-2.5 bg-slate-50 rounded-lg group-hover/item:bg-cyan-100 transition-colors">
                              <IconComponent size={20} className="text-slate-500 group-hover/item:text-cyan-600" />
                            </div>
                            <span className="text-xs font-semibold tracking-wide leading-snug">{service.title}</span>
                          </NavLink>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* About Us Link */}
                <NavLink
                  to="/about"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="relative px-4 py-2 text-sm font-medium text-slate-600 hover:text-cyan-600 transition-colors duration-300 rounded-lg group"
                >
                  About Us
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </NavLink>

                {/* Contact us */}
                <NavLink
                  to="/contact"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="relative px-4 py-2 text-sm font-medium text-slate-600 hover:text-cyan-600 transition-colors duration-300 rounded-lg group"
                >
                  Contact
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </NavLink>
              </div>

              {/* Desktop Booking CTA */}
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsModalOpen(true)}
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-cyan-100 transition-colors duration-300 cursor-pointer"
              >
                Book Appointment
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-slate-600 hover:text-cyan-600 focus:outline-none p-2"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-2">
                {/* Home */}
                <NavLink
                  to="/"
                  className="block px-4 py-3 rounded-xl text-base font-medium text-slate-600 hover:bg-cyan-50 hover:text-cyan-600 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </NavLink>

                {/* Services Submenu Accordion */}
                <div>
                  <button 
                    onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                    className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-base font-medium text-slate-600 hover:bg-cyan-50 hover:text-cyan-600 transition-all"
                  >
                    <span>Services</span>
                    <ChevronDown size={18} className={`transition-transform duration-200 ${isMobileServicesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {isMobileServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-4 pr-2 overflow-hidden space-y-1 mt-1"
                      >
                        {services.map((service) => {
                          const IconComponent = service.icon;
                          return (
                            <NavLink
                              key={service.id}
                              to={service.href}
                              className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-cyan-600 transition-all"
                              onClick={() => {
                                setIsOpen(false);
                                setIsMobileServicesOpen(false);
                              }}
                            >
                              <IconComponent size={16} className="text-slate-400" />
                              <span>{service.title}</span>
                            </NavLink>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* About Us */}
                <NavLink
                  to="/about"
                  className="block px-4 py-3 rounded-xl text-base font-medium text-slate-600 hover:bg-cyan-50 hover:text-cyan-600 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  About Us
                </NavLink>

                {/* Mobile Booking CTA */}
                <div className="pt-4 px-4">
                  <button 
                    onClick={() => {
                      setIsOpen(false);
                      setIsModalOpen(true);
                    }}
                    className="w-full bg-cyan-600 text-white py-3 rounded-xl font-semibold shadow-lg shadow-cyan-100 cursor-pointer"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* GLOBAL FORM MODAL SYSTEM OVERLAY */}
      <FormService 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        accentColor="#0ea5e9"
        serviceName="Select a specialty service" // Added serviceName to define initial input choice string
        defaultService="Select a specialty service" // Retained fallback mapping configuration hook
      />
    </>
  );
};

export default Navbar;