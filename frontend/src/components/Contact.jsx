import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  ShieldAlert,
  CalendarCheck2,
} from "lucide-react";
import FormService from "./FormService"; 

export default function Contact() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Updated link to a clean Google Maps search query destination
  const contactDetails = [
    {
      icon: <Phone className="w-5 h-5 text-[#0ea5e9]" />,
      title: "Emergency & Reception",
      value: "+91 98765 43210",
      link: "tel:+919876543210",
    },
    {
      icon: <Mail className="w-5 h-5 text-[#0ea5e9]" />,
      title: "Email Support",
      value: "appointments@ranganathan.com",
      link: "mailto:appointments@ranganathan.com",
    },
    {
      icon: <MapPin className="w-5 h-5 text-[#0ea5e9]" />,
      title: "Clinic Address",
      value: "RANGAS DENTAL CLINIC, RKP Hospital, 5 Vaithyalingam street, 5, Vaithiyalingam St, Nanmangalam, Chennai, Tamil Nadu 600129",
      link: "https://www.google.com/maps/search/?api=1&query=Rangas+Dental+Clinic+Kulattur+Chennai",
    },
  ];

  const businessHours = [
    { days: "Monday - Friday", hours: "09:00 AM - 08:00 PM" },
    { days: "Saturday", hours: "09:00 AM - 05:00 PM" },
    { days: "Sunday", hours: "Emergency Only" },
  ];

  return (
    <div className="min-h-screen mt-8 bg-slate-50/60 text-[#1a2332] selection:bg-[#0ea5e9]/10 selection:text-[#0ea5e9] relative overflow-hidden">
      {/* Soft Background Gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-sky-200/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-200/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mt-2 mb-12">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] font-bold tracking-widest text-[#0ea5e9] uppercase bg-sky-50 px-3 py-1.5 rounded-full"
          >
            Get In Touch
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl"
          >
            We’d Love to See Your Smile
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-base text-slate-500 leading-relaxed max-w-2xl mx-auto"
          >
            Have a dental concern or want to schedule a cleaning? Reach out directly or complete our structured application to lock down a time slot.
          </motion.p>
        </div>

        {/* Balanced Structural Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT SECTION: Aggregated Information Stack (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            {/* Urgent Booking Callout */}
            <motion.div 
              whileHover={{ y: -2 }}
              className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-lg relative overflow-hidden group flex flex-col justify-between h-full"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl transform translate-x-8 -translate-y-8 group-hover:bg-sky-500/20 transition-colors" />
              <div>
                <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
                  Need Urgent Care?
                </h2>
                <p className="text-slate-300 text-xs leading-relaxed mb-5">
                  If you are experiencing a severe toothache, swelling, or structural trauma, avoid waiting lists altogether. Call our priority line directly.
                </p>
              </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#0ea5e9] hover:bg-sky-400 active:scale-[0.99] text-white text-xs font-bold px-5 py-3 rounded-xl shadow-md transition-all cursor-pointer"
              >
                <CalendarCheck2 size={15} />
                Request Appointment Now
              </button>
            </motion.div>

            {/* Direct Line Details */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-100">Contact Metrics</h3>
              <div className="space-y-4">
                {contactDetails.map((item, idx) => (
                  <a 
                    key={idx} 
                    href={item.link} 
                    target={item.link.startsWith("http") ? "_blank" : "_self"}
                    rel="noreferrer"
                    className="flex items-center gap-4 p-2 -mx-2 rounded-2xl hover:bg-slate-50/80 transition-colors group"
                  >
                    <div className="p-2.5 bg-slate-50 rounded-xl group-hover:bg-sky-50 transition-colors shrink-0 border border-slate-100">
                      {item.icon}
                    </div>
                    <div className="space-y-0.5 min-w-0">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.title}</p>
                      <p className="text-sm font-bold text-slate-800 group-hover:text-[#0ea5e9] transition-colors flex items-center gap-1 truncate">
                        {item.value}
                        {item.link.startsWith("http") && <ExternalLink size={11} className="text-slate-300" />}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Timings */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-100 mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#0ea5e9]" />
                  Operating Hours
                </h3>
                <div className="divide-y divide-slate-100">
                  {businessHours.map((time, idx) => (
                    <div key={idx} className="flex justify-between py-2.5 text-xs">
                      <span className="font-semibold text-slate-500">{time.days}</span>
                      <span className={`font-bold ${time.hours.includes("Emergency") ? "text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md" : "text-slate-800"}`}>
                        {time.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-3 flex items-start gap-2 p-2.5 bg-amber-50/40 border border-amber-100/70 rounded-xl text-amber-800 text-[11px] leading-relaxed">
                <ShieldAlert size={14} className="shrink-0 text-amber-600 mt-0.5" />
                <span>Call ahead during national holidays to confirm available staff metrics.</span>
              </div>
            </div>

          </div>

          {/* RIGHT SECTION: Map Frame with Updated Embed Source URL (7 Columns) */}
          <div className="lg:col-span-7 flex">
            <div className="w-full rounded-3xl overflow-hidden shadow-sm border border-slate-200/80 relative group bg-slate-100 min-h-[450px] lg:min-h-full flex">
              <iframe
                title="Rangas Dental Clinic Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5101028206614!2d80.17956657367091!3d12.939177515591183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525e814b007e77%3A0xddfda2eb261014d4!2sRangas%20Dental%20Clinic!5e0!3m2!1sen!2sin!4v1781336477249!5m2!1sen!2sin"
                className="w-full h-full border-0 [html.dark_&]:invert contrast-[1.02] hover:grayscale-0 transition-all duration-500"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>
      </div>

      {/* MODAL SYSTEM OVERLAY */}
      <FormService 
              isOpen={isModalOpen} 
              onClose={() => setIsModalOpen(false)} 
              accentColor="#0ea5e9"
              serviceName="Select a specialty service" // Added serviceName to define initial input choice string
              defaultService="Select a specialty service" // Retained fallback mapping configuration hook
            />
    </div>
  );
}