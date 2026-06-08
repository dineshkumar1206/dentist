import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Removed Tooth to fix the crash shown in image_d0ee8b.png
import { Menu, X } from 'lucide-react'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Services', href: '#' },
    { name: 'About Us', href: '#' },
    { name: 'Testimonials', href: '#' },
  ];

  return (
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
              
              <img src="/images/Dentist-logo.jpg" alt="RANGA'S DENTAL CLINIC Logo" className="h-15 w-15 object-contain" />
              
            </div>
            
            <div className="flex flex-col leading-none">
  <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-slate-800 to-cyan-600 bg-clip-text text-transparent">
    RANGA'S
  </span>

  <span className="text-[10px] lg:text-xs font-medium tracking-[0.25em] uppercase text-slate-500 mt-1">
    dental clinic
  </span>
</div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-1">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="relative px-4 py-2 text-sm font-medium text-slate-600 hover:text-cyan-600 transition-colors duration-300 rounded-lg group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </motion.a>
              ))}
            </div>

            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-cyan-100 transition-colors duration-300"
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
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block px-4 py-3 rounded-xl text-base font-medium text-slate-600 hover:bg-cyan-50 hover:text-cyan-600 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 px-4">
                <button className="w-full bg-cyan-600 text-white py-3 rounded-xl font-semibold shadow-lg shadow-cyan-100">
                  Book Appointment
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;