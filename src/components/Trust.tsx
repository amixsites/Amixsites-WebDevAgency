import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Briefcase, 
  Users, 
  Layers, 
  Building2, 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  Quote 
} from "lucide-react";
import { STATS_DATA, TESTIMONIALS_DATA } from "../data";

export default function Trust() {
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  // Auto-rotate testimonials every 5 seconds as specified
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonialIdx((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setActiveTestimonialIdx((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  const handleNext = () => {
    setActiveTestimonialIdx((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const activeTestimonial = TESTIMONIALS_DATA[activeTestimonialIdx];

  // Map stat icon names to Lucide icons
  const renderStatIcon = (iconName: string) => {
    const iconProps = { className: "w-5 h-5 text-blue-600" };
    switch (iconName) {
      case "Briefcase":
        return <Briefcase {...iconProps} />;
      case "Users":
        return <Users {...iconProps} />;
      case "Layers":
        return <Layers {...iconProps} />;
      case "Building2":
        return <Building2 {...iconProps} />;
      default:
        return <Briefcase {...iconProps} />;
    }
  };

  // Avatar initials colors
  const avatarColors = [
    "bg-blue-100 text-blue-700",
    "bg-amber-100 text-amber-700",
    "bg-purple-100 text-purple-700",
    "bg-emerald-100 text-emerald-700",
    "bg-rose-100 text-rose-700"
  ];

  return (
    <section 
      id="why-amix" 
      className="relative py-28 px-4 bg-slate-50/50 overflow-hidden border-b border-slate-100"
    >
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 blur-3xl rounded-full pointer-events-none select-none z-0" />

      <div className="w-full max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
        
        {/* Left: Beautiful Animated Statistics Grid */}
        <div id="stats-panel" className="lg:col-span-5 flex flex-col justify-center text-left">
          <span className="font-mono text-[11px] uppercase tracking-widest text-blue-600 font-bold bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-full inline-block mb-4 w-fit">
            Amix Analytics
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
            Proven Engineering & Global Scale
          </h2>
          <p className="font-sans text-sm sm:text-base text-slate-600 leading-relaxed mb-10">
            We are dedicated to launching modern software that delivers substantial value. Our production frameworks are engineered to scale perfectly.
          </p>

          {/* Stats Bento Grid */}
          <div className="grid grid-cols-2 gap-4">
            {STATS_DATA.map((stat, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/50 p-5 shadow-xs hover:border-slate-300 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4">
                  {renderStatIcon(stat.iconName)}
                </div>
                <div className="font-mono text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-1">
                  {stat.value}
                </div>
                <div className="font-sans text-xs font-extrabold text-slate-800 mb-0.5">
                  {stat.label}
                </div>
                <p className="font-sans text-[10.5px] text-slate-400">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Custom Client Testimonial Carousel */}
        <div id="testimonial-panel" className="lg:col-span-7 flex flex-col justify-center relative">
          
          <div className="bg-white border border-slate-200/50 rounded-4xl p-8 md:p-10 shadow-[0_16px_40px_rgba(0,0,0,0.02)] relative overflow-hidden flex flex-col justify-between text-left h-full min-h-[380px]">
            
            {/* Background design elements */}
            <Quote className="absolute right-8 top-8 w-24 h-24 text-slate-100/50 pointer-events-none select-none z-0" />

            <div className="relative z-10">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-6">
                Client Success Stories
              </span>

              {/* Dynamic Slides Transition */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  
                  {/* Rating Stars */}
                  <div className="flex gap-1">
                    {Array.from({ length: activeTestimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Comment Quote */}
                  <p className="font-sans text-base md:text-lg text-slate-700 font-medium leading-relaxed italic">
                    "{activeTestimonial.content}"
                  </p>

                  {/* Profile Metadata */}
                  <div className="flex items-center gap-3.5 pt-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-sans font-bold text-sm shrink-0 shadow-xs ${avatarColors[activeTestimonialIdx % avatarColors.length]}`}>
                      {activeTestimonial.name.split(" ").map(w => w[0]).join("")}
                    </div>
                    <div>
                      <h4 className="font-sans text-sm font-bold text-slate-900 leading-tight">
                        {activeTestimonial.name}
                      </h4>
                      <span className="font-sans text-xs text-slate-400">
                        {activeTestimonial.role}, {activeTestimonial.company}
                      </span>
                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider Navigation controls */}
            <div className="relative z-10 flex items-center justify-between border-t border-slate-100 pt-6 mt-8">
              
              {/* Pagination Dots */}
              <div className="flex gap-1.5">
                {TESTIMONIALS_DATA.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTestimonialIdx(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === activeTestimonialIdx ? "w-6 bg-slate-900" : "w-1.5 bg-slate-200 hover:bg-slate-300"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Arrow controls */}
              <div className="flex gap-2">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full border border-slate-200 hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4.5 h-4.5" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full border border-slate-200 hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4.5 h-4.5" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
