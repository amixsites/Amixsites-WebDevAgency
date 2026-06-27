import { useEffect, useRef } from "react";
import Services3DCarousel from "./Services3DCarousel";
import { animateServicesEntrance, setupScrollParallax3D } from "./servicesCarouselAnimation";

export default function Services() {
  const sectionRef = useRef<HTMLElement | null>(null);

  // Initialize GSAP Editorial Entrance and Parallax Scroll animations
  useEffect(() => {
    if (!sectionRef.current) return;

    // Trigger Section entry
    const revertEntrance = animateServicesEntrance(
      "#services",
      "#services-editorial-header",
      "#desktop-carousel-viewport"
    );

    // Trigger subtle scrolling 3D space parallax
    const revertParallax = setupScrollParallax3D(
      "#services",
      "#desktop-carousel-viewport",
      "#ambient-radial-glow-shapes"
    );

    return () => {
      revertEntrance();
      revertParallax();
    };
  }, []);

  return (
    <section 
      id="services" 
      ref={sectionRef}
      className="relative py-28 bg-[#FFFFFF] overflow-hidden border-b border-slate-100 select-none"
    >
      {/* Light Luxury Soft Blur Gradient Shapes */}
      <div 
        id="ambient-radial-glow-shapes" 
        className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
      >
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#EFF6FF] rounded-full blur-[140px] opacity-70" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#F8FAFC] rounded-full blur-[120px] opacity-80" />
      </div>
      
      <div className="w-full relative z-10 text-center">
        
        {/* Section Title Header (Luxury Typography) */}
        <div id="services-editorial-header" className="max-w-3xl mx-auto px-6 mb-16 opacity-0">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-blue-600 font-extrabold bg-blue-50/70 border border-blue-100/50 px-4 py-1.5 rounded-full inline-block mb-5">
            Capabilities
          </span>
          <h2 className="font-sans text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 mb-6">
            Enterprise Solutions
          </h2>
          <div className="w-16 h-[2px] bg-blue-600/30 mx-auto mb-6" />
          <p className="font-sans text-base text-slate-500 leading-relaxed max-w-2xl mx-auto">
            Explore our physical-style 3D technology capability suites. Custom engineered software solutions designed to digitize and scale your operational workflows.
          </p>
        </div>

        {/* Unified Responsive 3D Carousel Component */}
        <div id="services-interactive-viewport" className="w-full">
          <Services3DCarousel />
        </div>

        {/* Premium Stripe-Style Bottom Info Ribbon */}
        <div id="services-industries-ribbon" className="mt-16 max-w-5xl mx-auto px-6">
          <div className="bg-white/60 backdrop-blur-xl rounded-3xl border border-slate-200/60 p-7 flex flex-col md:flex-row items-center justify-between gap-6 text-left shadow-sm">
            <div>
              <h4 className="font-sans text-sm font-black text-slate-900 mb-1">
                Need customized enterprise API integrations or dedicated ERPs?
              </h4>
              <p className="font-sans text-xs text-slate-500">
                We design specialized cloud systems complying with strict high-security, performance, and volume requirements.
              </p>
            </div>
            <a
              id="services-custom-consult-cta"
              href="#contact"
              className="font-sans text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 px-6 py-3.5 rounded-full transition-all hover:scale-105 active:scale-98 whitespace-nowrap shadow-xs shrink-0"
            >
              Consult Solutions Architect
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
