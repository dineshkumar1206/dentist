import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Heart, Share2 } from 'lucide-react';
import BlurText from "../components/BlurText"; 
import ImageGlareHover from "../components/ImageGlareHover"; 

/* ── Single Font Definition ── */
const FONT_FAMILY = "'Outfit', system-ui, sans-serif";

const services = [
  { 
    id: 1, 
    title: "Implants",
    description: "Permanent tooth replacement solutions that restore function, comfort, and confidence.",
    image: "/images/tooth-implant.png",
    href: "/services/implants" 
  },
  { 
    id: 2, 
    title: "Child Dental Care",
    description: "Gentle and preventive dental treatments designed specifically for children's oral health.",
    image: "/images/child-dental.png",
    href: "/services/child-dental-care" 
  },
  { 
    id: 3, 
    title: "Root Canal Treatment",
    description: "Effective treatment to save infected teeth and relieve dental pain.",
    image: "/images/root-canal-hero.png",
    href: "/services/root-canal" 
  },
  { 
    id: 4, 
    title: "Tooth Whitening Procedures",
    description: "Professional whitening treatments for a brighter and more radiant smile.",
    image: "/images/whitening-importance.png",
    href: "/services/whitening" 
  },
  { 
    id: 5, 
    title: "Ultrasonic Cleaning & Polishing",
    description: "Deep cleaning procedures that remove plaque, stains, and tartar buildup.",
    image: "/images/cleaning-hero.png",
    href: "/services/cleaning" 
  },
  { 
    id: 6, 
    title: "Fixed Braces / Clip Treatment",
    description: "Orthodontic solutions that straighten teeth and improve bite alignment.",
    image: "/images/braces-hero.png",
    href: "/services/braces" 
  },
  { 
    id: 7, 
    title: "Full Teethsets (Removal & Fixed)",
    description: "Custom dentures and fixed prosthetics to restore missing teeth and smiles.",
    image: "/images/fullsets-hero.png",
    href: "/services/teethsets" 
  },
  { 
    id: 8, 
    title: "Gum Treatment / Flap Surgery",
    description: "Advanced periodontal care to treat gum disease and protect oral health.",
    image: "/images/gum-hero.png",
    href: "/services/gum-treatment" 
  },
  { 
    id: 9, 
    title: "Surgical Removal of Wisdom Teeth",
    description: "Safe and comfortable extraction of impacted or problematic wisdom teeth.",
    image: "/images/wisdom-hero.png",
    href: "/services/wisdom-teeth" 
  },
];

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
  return (
    <motion.div
      variants={itemVariants}
      className="flex-shrink-0 w-[280px] sm:w-[310px] h-[390px] sm:h-[410px] bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300"
    >
      <Link to={service.href} className="flex flex-col h-full group">
        
        {/* Card Image Banner Wrapper */}
        <ImageGlareHover
          glareColor="#ffffff"
          glareOpacity={0.35}
          glareSize={180}
          borderRadius="0px" 
          width="100%"
          height="190px"
          className="sm:h-[210px] flex-shrink-0 overflow-hidden bg-slate-50 relative"
        >
          <img 
            src={service.image} 
            alt={service.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Floating Action Controls — Transformed to match brand purples */}
          <div className="absolute top-3 right-3 flex items-center gap-2 z-20">
            <button 
              onClick={(e) => { e.preventDefault(); }} 
              className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-slate-600 hover:bg-white hover:text-red-500 transition-colors shadow-xs"
            >
              <Heart size={14} />
            </button>
            <button 
              onClick={(e) => { e.preventDefault(); }} 
              className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-slate-600 hover:bg-white hover:text-[#682187] transition-colors shadow-xs"
            >
              <Share2 size={14} />
            </button>
          </div>
        </ImageGlareHover>

        {/* Card Metadata Frame */}
        <div className="p-5 text-left bg-white grid grid-rows-[auto_1fr_auto] flex-1 min-h-0">
          <h3 className="font-bold text-slate-800 text-base tracking-tight group-hover:text-[#682187] transition-colors duration-200 line-clamp-1 mb-1.5">
            {service.title}
          </h3>
          
          <div className="overflow-hidden">
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-3">
              {service.description}
            </p>
          </div>
          
          {/* Action Link synced with primary color signature rules */}
          <div className="mt-4 pt-1 flex items-center text-xs font-semibold text-[#8c7c96] group-hover:text-[#682187] group-hover:translate-x-1 transition-all duration-300">
            Learn More <span className="ml-1">➔</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function DentalSpecialities() {
  const carouselRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-scrolling carousel loop
  useEffect(() => {
    let scrollInterval;
    if (!isHovered) {
      scrollInterval = setInterval(() => {
        if (carouselRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
          if (scrollLeft + clientWidth >= scrollWidth - 10) {
            carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
          }
        }
      }, 3500);
    }

    return () => clearInterval(scrollInterval);
  }, [isHovered]);

  const handleScroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -330 : 330;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section 
      className="w-full bg-[#fcfbfe] py-12 sm:py-20 relative overflow-hidden"
      style={{ fontFamily: FONT_FAMILY }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-8 sm:mb-12 flex items-end justify-between">
          <div>
            <p className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase text-[#682187] mb-2">
              Most Popular Services
            </p>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
              <BlurText
                text="Our Clinical Services"
                delay={150}
                animateBy="words"
                direction="top"
              />
            </h2>
          </div>

          {/* Navigational Control Handles mapped to custom purple branding rules */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleScroll('left')}
              className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-[#fcfbfe] hover:border-[#8c7c96] hover:text-[#682187] transition-all shadow-xs active:scale-95 cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-[#fcfbfe] hover:border-[#8c7c96] hover:text-[#682187] transition-all shadow-xs active:scale-95 cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Carousel Tracks */}
        <motion.div 
          ref={carouselRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.02 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex gap-6 overflow-x-auto pb-6 pt-2 px-1 snap-x snap-mandatory scrollbar-none"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <style>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          
          {services.map((service) => (
            <div key={service.id} className="snap-start flex">
              <ServiceCard service={service} />
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}