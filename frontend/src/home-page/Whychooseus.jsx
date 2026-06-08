import { Check } from "lucide-react";

const features = [
  "Dental check-ups;",
  "Root canal treatment;",
  "Hygiene treatments;",
  "Dental implant restoration;",
  "Crowns, veneers and bridges;",
  "Professional teeth-whitening.",
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-16 xl:px-24">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

        {/* LEFT: Text Content */}
        <div className="flex-1 w-full">
          {/* Tag */}
          <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-gray-400 mb-5">
            Why Choose Us
          </p>

          {/* Headline */}
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 leading-tight mb-6"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Are you looking for a dentist to give you that special smile?
          </h2>

          {/* Subtext */}
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8 max-w-md">
            Our clinic provides the highest quality dental care with a group of experienced dentists and specialists dedicated to your smile.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mb-10">
            {features.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <Check size={16} strokeWidth={3} className="text-teal-500 flex-shrink-0" />
                <span className="text-gray-700 text-sm sm:text-base">{item}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button className="border border-gray-800 text-gray-800 text-xs font-semibold tracking-[0.2em] uppercase px-8 py-4 hover:bg-gray-900 hover:text-white transition-all duration-300">
            Book a Visit
          </button>
        </div>

        {/* RIGHT: Image */}
        <div className="flex-1 w-full flex justify-center lg:justify-end">
          <div
            className="w-full max-w-sm sm:max-w-md lg:max-w-lg overflow-hidden"
            style={{
              borderRadius: "50% 50% 50% 50% / 10% 10% 10% 10%",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=700&q=80"
              alt="Happy patient with a beautiful smile"
              className="w-full h-full object-cover object-top"
              style={{ aspectRatio: "4/5" }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}