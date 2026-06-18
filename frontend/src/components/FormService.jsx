import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Phone,
  Mail,
  CalendarDays,
  Clock,
  MessageSquare,
  CheckCircle2,
  ChevronRight,
  Stethoscope,
  AlertCircle,
  X,
} from "lucide-react";

// ─── Animation variants ───────────────────────────────────────────────────────
const backdropAnim = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalAnim = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, scale: 0.95, y: 15, transition: { duration: 0.25 } },
};

// ─── Time slots ───────────────────────────────────────────────────────────────
const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
];

// ─── Age groups ───────────────────────────────────────────────────────────────
const ageGroups = ["Under 5", "5–8 years", "9–12 years", "13–17 years", "18+ (Adult)"];

// ─── Services from Image Card ──────────────────────────────────────────────────
const servicesList = [
  "Implants",
  "Child Dental Care",
  "Root Canal Treatment",
  "Tooth Whitening Procedures",
  "Ultrasonic Cleaning & Polishing",
  "Fixed Braces / Clip Treatment",
  "Full Teethsets (Removal & Fixed)",
  "Gum Treatment / Flap Surgery",
  "Surgical Removal of Wisdom Teeth"
];

// ─── Field wrapper ────────────────────────────────────────────────────────────
function Field({ label, required, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-widest text-[#1a2332]/60">
        {label}
        {required && <span className="text-[#682187] ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <p className="flex items-center gap-1 text-xs text-red-500 mt-0.5">
          <AlertCircle size={11} /> {error}
        </p>
      )}
    </div>
  );
}

// ─── Input base styles (Updated to Brand Purple Tokens) ────────────────────────
const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-[#1a2332] placeholder-gray-400 outline-none transition-all duration-200 focus:border-[#682187] focus:ring-2 focus:ring-[#682187]/20 hover:border-[#682187]/50";

const errorInputClass =
  "w-full rounded-xl border border-red-300 bg-red-50/40 px-4 py-3 text-sm text-[#1a2332] placeholder-gray-400 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-200 transition-all duration-200";

// ─── Main component ───────────────────────────────────────────────────────────
export default function FormService({
  serviceName = "Child Dental Care",
  accentColor = "#682187", // Synchronized default token fallback
  isOpen = true, 
  onClose,       
  onSubmit,
}) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    service: serviceName,
    age: "",
    date: "",
    time: "",
    concern: "",
    consent: false,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // ── Validation ──────────────────────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "First name is required";
    if (!form.lastName.trim()) e.lastName = "Last name is required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    else if (!/^[+\d\s\-()]{7,15}$/.test(form.phone.trim()))
      e.phone = "Enter a valid phone number";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address";
    if (!form.service) e.service = "Please select a dental service";
    if (!form.age) e.age = "Please select an age group";
    if (!form.date) e.date = "Please choose a preferred date";
    else {
      const chosen = new Date(form.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (chosen < today) e.date = "Date must be today or in the future";
    }
    if (!form.time) e.time = "Please select a time slot";
    if (!form.consent) e.consent = "You must agree to continue";
    return e;
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      const firstErrId = Object.keys(e)[0];
      document.getElementById(`field-${firstErrId}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    setSubmitted(true);
    onSubmit?.(form);
  };

  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropAnim}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm overflow-y-auto"
        >
          <motion.div
            variants={modalAnim}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()} 
            className="relative w-full max-w-lg my-auto rounded-3xl bg-white border border-gray-100 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* Close Button Top Right */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 z-10 p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100/50 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            {submitted ? (
              /* Success Screen Box */
              <div className="p-10 text-center flex flex-col items-center justify-center overflow-y-auto">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                  style={{ background: `${accentColor}18` }}
                >
                  <CheckCircle2 size={38} style={{ color: accentColor }} />
                </motion.div>
                <h3 className="text-2xl font-extrabold text-[#1a2332] mb-2">
                  Appointment Requested!
                </h3>
                <p className="text-[#4a5568] text-sm font-light leading-relaxed mb-4">
                  Thank you, <strong>{form.firstName}</strong>! Your{" "}
                  <strong>{form.service}</strong> consultation request has been received.
                  Our team will confirm your slot on{" "}
                  <strong>{form.date}</strong> at <strong>{form.time}</strong> via
                  call or email within 24 hours.
                </p>
                <div
                  className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold"
                  style={{ background: `${accentColor}15`, color: accentColor }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ background: accentColor }}
                  />
                  Confirmation sent to {form.email}
                </div>
                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        firstName: "", lastName: "", phone: "", email: "",
                        service: serviceName, age: "", date: "", time: "", concern: "", consent: false,
                      });
                    }}
                    className="text-xs text-[#682187] font-semibold hover:underline cursor-pointer"
                  >
                    Book another appointment
                  </button>
                  <span className="text-gray-300 text-xs">|</span>
                  <button
                    onClick={onClose}
                    className="text-xs text-gray-400 hover:text-gray-600 underline cursor-pointer"
                  >
                    Close Form
                  </button>
                </div>
              </div>
            ) : (
              /* Regular Form Workflow Elements */
              <>
                {/* Header Profile Section */}
                <div
                  className="px-8 py-6 flex items-start gap-4 pr-14"
                  style={{
                    background: `linear-gradient(135deg, ${accentColor}18 0%, ${accentColor}08 100%)`,
                    borderBottom: `1px solid ${accentColor}25`,
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ background: `${accentColor}20` }}
                  >
                    <Stethoscope size={22} style={{ color: accentColor }} />
                  </div>
                  <div>
                    <p
                      className="text-[11px] font-bold uppercase tracking-widest mb-0.5"
                      style={{ color: accentColor }}
                    >
                      Book a Consultation
                    </p>
                    <h3 className="text-xl font-extrabold text-[#1a2332] leading-tight">
                      Appointment Form
                    </h3>
                  </div>
                </div>

                {/* Main Content Layers */}
                <div className="px-8 py-6 flex-1 overflow-y-auto flex flex-col gap-5 CustomScrollbar">
                  {/* Row: First + Last name */}
                  <div className="grid grid-cols-2 gap-4">
                    <div id="field-firstName">
                      <Field label="First Name" required error={errors.firstName}>
                        <div className="relative">
                          <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1-2 text-gray-400 pointer-events-none" />
                          <input
                            className={`${errors.firstName ? errorInputClass : inputClass} pl-9`}
                            placeholder="Aarav"
                            value={form.firstName}
                            onChange={(e) => handleChange("firstName", e.target.value)}
                          />
                        </div>
                      </Field>
                    </div>
                    <div id="field-lastName">
                      <Field label="Last Name" required error={errors.lastName}>
                        <input
                          className={errors.lastName ? errorInputClass : inputClass}
                          placeholder="Sharma"
                          value={form.lastName}
                          onChange={(e) => handleChange("lastName", e.target.value)}
                        />
                      </Field>
                    </div>
                  </div>

                  {/* Phone */}
                  <div id="field-phone">
                    <Field label="Phone Number" required error={errors.phone}>
                      <div className="relative">
                        <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        <input
                          className={`${errors.phone ? errorInputClass : inputClass} pl-9`}
                          placeholder="+91 98765 43210"
                          value={form.phone}
                          onChange={(e) => handleChange("phone", e.target.value)}
                        />
                      </div>
                    </Field>
                  </div>

                  {/* Email */}
                  <div id="field-email">
                    <Field label="Email Address" required error={errors.email}>
                      <div className="relative">
                        <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        <input
                          type="email"
                          className={`${errors.email ? errorInputClass : inputClass} pl-9`}
                          placeholder="aarav@email.com"
                          value={form.email}
                          onChange={(e) => handleChange("email", e.target.value)}
                        />
                      </div>
                    </Field>
                  </div>

                  {/* Specialty Dropdowns */}
                  <div id="field-service">
                    <Field label="Required Treatment Specialty" required error={errors.service}>
                      <select
                        className={`${errors.service ? errorInputClass : inputClass} cursor-pointer`}
                        value={form.service}
                        onChange={(e) => handleChange("service", e.target.value)}
                      >
                        <option value="">Select a specialty service</option>
                        {servicesList.map((srv) => (
                          <option key={srv} value={srv}>{srv}</option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  {/* Age Group */}
                  <div id="field-age">
                    <Field label="Patient Age Group" required error={errors.age}>
                      <select
                        className={`${errors.age ? errorInputClass : inputClass} cursor-pointer`}
                        value={form.age}
                        onChange={(e) => handleChange("age", e.target.value)}
                      >
                        <option value="">Select age group</option>
                        {ageGroups.map((a) => (
                          <option key={a} value={a}>{a}</option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  {/* Date + Time inputs */}
                  <div className="grid grid-cols-2 gap-4">
                    <div id="field-date">
                      <Field label="Preferred Date" required error={errors.date}>
                        <div className="relative">
                          <CalendarDays size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                          <input
                            type="date"
                            min={todayStr}
                            className={`${errors.date ? errorInputClass : inputClass} pl-9`}
                            value={form.date}
                            onChange={(e) => handleChange("date", e.target.value)}
                          />
                        </div>
                      </Field>
                    </div>
                    <div id="field-time">
                      <Field label="Preferred Time" required error={errors.time}>
                        <div className="relative">
                          <Clock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                          <select
                            className={`${errors.time ? errorInputClass : inputClass} pl-9 cursor-pointer`}
                            value={form.time}
                            onChange={(e) => handleChange("time", e.target.value)}
                          >
                            <option value="">Select slot</option>
                            {timeSlots.map((t) => (
                              <option key={t} value={t}>{t}</option>
                            ))}
                          </select>
                        </div>
                      </Field>
                    </div>
                  </div>

                  {/* Concerns text area */}
                  <Field label="Describe Your Concern (Optional)">
                    <div className="relative">
                      <MessageSquare size={15} className="absolute left-3.5 top-3.5 text-gray-400 pointer-events-none" />
                      <textarea
                        rows={2}
                        className={`${inputClass} pl-9 resize-none`}
                        placeholder="Tell us a bit about what brings you in..."
                        value={form.concern}
                        onChange={(e) => handleChange("concern", e.target.value)}
                      />
                    </div>
                  </Field>

                  {/* Consent Elements block */}
                  <div className="field-consent">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div
                        onClick={() => handleChange("consent", !form.consent)}
                        className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${
                          form.consent
                            ? "border-[#682187] bg-[#682187]"
                            : errors.consent
                            ? "border-red-400 bg-red-50"
                            : "border-gray-300 group-hover:border-[#682187]/60"
                        }`}
                        style={form.consent ? { borderColor: accentColor, background: accentColor } : {}}
                      >
                        {form.consent && <CheckCircle2 size={12} className="text-white" strokeWidth={3} />}
                      </div>
                      <span className="text-xs text-[#4a5568] leading-relaxed select-none">
                        I agree to be contacted by the clinic regarding my{" "}
                        <strong>{form.service || "dental"}</strong> appointment.
                      </span>
                    </label>
                    {errors.consent && (
                      <p className="flex items-center gap-1 text-xs text-red-500 mt-1.5 ml-8">
                        <AlertCircle size={11} /> {errors.consent}
                      </p>
                    )}
                  </div>
                </div>

                {/* Sticky Action Footer */}
                <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex flex-col gap-3">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="w-full flex items-center cursor-pointer justify-center gap-2.5 text-white font-bold py-3.5 rounded-xl shadow-md transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                    style={{
                      background: submitting
                        ? `${accentColor}99`
                        : `linear-gradient(135deg, ${accentColor} 0%, #4c1263 100%)`,
                    }}
                  >
                    {submitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Booking your slot…
                      </>
                    ) : (
                      <>
                        Confirm Appointment
                        <ChevronRight size={17} />
                      </>
                    )}
                  </motion.button>
                  <button
                    onClick={onClose}
                    className="text-center text-xs text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                  >
                    Cancel and exit
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}