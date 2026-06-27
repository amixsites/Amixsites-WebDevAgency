import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Search, 
  Lightbulb, 
  Palette, 
  Code2, 
  TestTube, 
  Rocket, 
  Headphones,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { PROCESS_STEPS_DATA } from "../data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Tech tag data for high-fidelity technical depth
const PHASE_DETAILS = [
  {
    tag: "COGNITIVE MESH",
    items: ["Core Requirements Analyzed", "Competitor Matrix Mapping", "Target Persona Audit"]
  },
  {
    tag: "ARCHITECTURE PLAN",
    items: ["CI/CD Pipeline Roadmap", "Database Relational Schema", "Load-Balance Spec Sheet"]
  },
  {
    tag: "CREATIVE ARTBOARD",
    items: ["High-Fidelity Prototypes", "Dynamic Token Colors", "Fluid Micro-Interactions"]
  },
  {
    tag: "CODE SYSTEM",
    items: ["Bulletproof Typescript", "Automated Node Clusters", "Serverless Static Supremacy"]
  },
  {
    tag: "QA & VALIDATION",
    items: ["E2E Integration Flows", "Multi-Browser Sandbox", "A11y Accessibility Compliance"]
  },
  {
    tag: "RELEASE PIPELINE",
    items: ["Zero-Downtime Hot Swaps", "Global CDN Ingress", "Edge Network Propagation"]
  },
  {
    tag: "SLA MONITORING",
    items: ["24/7 Autonomous Alerting", "Live Log Telemetry", "Continuous Scaling Advisory"]
  }
];

export default function Process() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);

  // Monitor resize to ensure correct math
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Map icon strings to Lucide components
  const renderStepIcon = (iconName: string, isActive: boolean) => {
    const iconProps = { 
      className: `w-6 h-6 transition-transform duration-500 ${
        isActive ? "text-cyan-400 scale-110" : "text-slate-500"
      }` 
    };
    switch (iconName) {
      case "Search":
        return <Search {...iconProps} />;
      case "Lightbulb":
        return <Lightbulb {...iconProps} />;
      case "Palette":
        return <Palette {...iconProps} />;
      case "Code2":
        return <Code2 {...iconProps} />;
      case "TestTube":
        return <TestTube {...iconProps} />;
      case "Rocket":
        return <Rocket {...iconProps} />;
      case "HeadphonesIcon":
      case "Headphones":
        return <Headphones {...iconProps} />;
      default:
        return <Code2 {...iconProps} />;
    }
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    // Pin viewport and scrub scroll percentage
    const triggerInstance = ScrollTrigger.create({
      id: "process-scroll",
      trigger: sectionRef.current,
      start: "top top",
      end: "+=350%", // Generous scroll headroom for smooth flow pacing
      scrub: 1.2,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onToggle: (self) => {
        // Smoothly hide navbar when entering process timeline viewport
        const navbar = document.querySelector("header");
        if (navbar) {
          navbar.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
          if (self.isActive) {
            navbar.style.transform = "translateY(-150%)";
            navbar.style.opacity = "0";
            navbar.style.pointerEvents = "none";
          } else {
            navbar.style.transform = "translateY(0)";
            navbar.style.opacity = "1";
            navbar.style.pointerEvents = "auto";
          }
        }
      },
      onUpdate: (self) => {
        setScrollProgress(self.progress);
        
        // Continuous segment active mapping
        const segmentCount = PROCESS_STEPS_DATA.length;
        const currentActive = Math.min(
          segmentCount - 1,
          Math.floor(self.progress * segmentCount)
        );
        setActiveIndex(currentActive);
      },
      onLeave: () => {
        // Restore navbar on section exit
        const navbar = document.querySelector("header");
        if (navbar) {
          navbar.style.transform = "translateY(0)";
          navbar.style.opacity = "1";
          navbar.style.pointerEvents = "auto";
        }
      },
      onLeaveBack: () => {
        // Restore navbar on exit backward
        const navbar = document.querySelector("header");
        if (navbar) {
          navbar.style.transform = "translateY(0)";
          navbar.style.opacity = "1";
          navbar.style.pointerEvents = "auto";
        }
      }
    });

    return () => {
      ScrollTrigger.getById("process-scroll")?.kill();
      
      // Safety restoration
      const navbar = document.querySelector("header");
      if (navbar) {
        navbar.style.transform = "translateY(0)";
        navbar.style.opacity = "1";
        navbar.style.pointerEvents = "auto";
      }
    };
  }, []);

  // Handle premium dot click page scroll positioning
  const handleDotClick = (index: number) => {
    const scrollTriggerInstance = ScrollTrigger.getById("process-scroll");
    if (scrollTriggerInstance) {
      const start = scrollTriggerInstance.start;
      const end = scrollTriggerInstance.end;
      const targetScroll = start + (index / (PROCESS_STEPS_DATA.length - 1)) * (end - start);
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth"
      });
    }
  };

  // Dimensions configuration for horizontal math
  const isMobile = windowWidth < 768;
  const cardWidth = isMobile ? windowWidth * 0.82 : 440;
  const cardGap = isMobile ? 24 : 80;
  const totalCards = PROCESS_STEPS_DATA.length;

  // Track position: centers the current interpolated floating active card position perfectly
  const currentFloatIndex = scrollProgress * (totalCards - 1);
  const trackX = windowWidth / 2 - (currentFloatIndex * (cardWidth + cardGap) + cardWidth / 2);

  // Background light positioning: Cinematic spotlight following the active card
  const spotlightX = 20 + scrollProgress * 60; // moves from 20% to 80%

  return (
    <section 
      ref={sectionRef}
      id="process" 
      className="relative w-screen h-screen m-0 p-0 bg-[#020008] overflow-hidden select-none"
    >
      {/* 1. Cinematic digital background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.012)_1px,_transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-25" />
      
      {/* 2. Soft background light transformations */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-150 ease-out z-0 opacity-40 blur-[130px]"
        style={{
          background: `radial-gradient(circle at ${spotlightX}% 50%, rgba(6, 182, 212, 0.22) 0%, rgba(99, 102, 241, 0.12) 35%, transparent 70%)`
        }}
      />

      {/* Main viewport overlay */}
      <div className="relative w-full h-full flex flex-col justify-between py-6 md:py-10 z-10 overflow-hidden">
        
        {/* Sticky Header Row (No padding restriction, edge alignment matched) */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-4 relative z-20">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-cyan-400 font-extrabold bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full inline-block mb-2 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
              Engineering Pipeline
            </span>
            <h2 className="font-sans text-xl md:text-3xl font-black tracking-tight text-white uppercase">
              How We Build Excellence
            </h2>
          </div>
          <div className="text-left md:text-right max-w-xs md:max-w-sm">
            <p className="font-sans text-[10px] md:text-xs text-slate-400 leading-relaxed">
              Scroll to transmit energy through the digital pipeline. Witness our 7 architectural creation phases power to completion.
            </p>
          </div>
        </div>

        {/* Fixed Interactive Horizontal Progress Navigation */}
        <div className="w-full max-w-5xl mx-auto px-6 md:px-12 relative z-30 my-2">
          <div className="relative h-14 flex items-center justify-between">
            {/* Base line */}
            <div className="absolute left-0 right-0 h-[3px] bg-white/5 rounded-full z-0" />
            
            {/* Active completed progress line */}
            <div 
              className="absolute left-0 h-[3px] bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 rounded-full z-10 transition-all duration-150 shadow-[0_0_15px_#06b6d4]"
              style={{ width: `${scrollProgress * 100}%` }}
            />

            {/* Glowing electrical spark orb */}
            <div 
              className="absolute w-4 h-4 rounded-full bg-white border-2 border-cyan-300 z-20 -translate-y-1/2 top-1/2 -ml-2 shadow-[0_0_15px_#06b6d4,0_0_30px_#6366f1] transition-all duration-150"
              style={{ 
                left: `${scrollProgress * 100}%`,
                opacity: scrollProgress > 0 ? 1 : 0
              }}
            >
              <div className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-75" />
            </div>

            {/* Individual step nodes */}
            {PROCESS_STEPS_DATA.map((step, index) => {
              const nodeProgress = index / (totalCards - 1);
              const isCompleted = scrollProgress >= nodeProgress - 0.01;
              const isActive = activeIndex === index;

              return (
                <button
                  key={step.step}
                  onClick={() => handleDotClick(index)}
                  className="flex flex-col items-center relative z-30 focus:outline-none group cursor-pointer"
                >
                  <div 
                    className={`w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center transition-all duration-300 border ${
                      isActive 
                        ? "bg-cyan-500 border-cyan-400 text-slate-950 scale-110 shadow-[0_0_15px_rgba(6,182,212,0.5)] font-bold" 
                        : isCompleted 
                          ? "bg-slate-950 border-cyan-500/60 text-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.2)]" 
                          : "bg-slate-950 border-white/10 text-slate-600 group-hover:border-slate-500"
                    }`}
                  >
                    <span className="font-mono text-[10px] font-bold">0{step.step}</span>
                  </div>
                  <span 
                    className={`absolute top-10 md:top-11 font-mono text-[8px] uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${
                      isActive 
                        ? "text-cyan-400 font-extrabold opacity-100" 
                        : isCompleted 
                          ? "text-slate-300 opacity-80" 
                          : "text-slate-600 opacity-40 group-hover:opacity-70"
                    }`}
                  >
                    {step.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Horizontal Timeline 3D Track */}
        <div className="flex-1 w-full flex items-center relative overflow-visible z-10">
          <div 
            ref={trackRef}
            className="absolute top-1/2 left-0 flex items-center h-[380px] md:h-[440px] overflow-visible"
            style={{ 
              transform: `translateX(${trackX}px) translateY(-50%)`,
              transformStyle: "preserve-3d",
              width: `${(cardWidth + cardGap) * totalCards}px`,
              transition: "transform 0.15s ease-out"
            }}
          >
            
            {/* Timeline Horizontal Base Energy Rail (runs right behind cards) */}
            <div 
              className="absolute h-[2px] bg-white/5 rounded-full z-0 pointer-events-none"
              style={{
                left: `${cardWidth / 2}px`,
                right: `${cardWidth / 2}px`,
                top: "40%"
              }}
            />

            {/* Active illuminated horizontal energy path */}
            <div 
              className="absolute h-[2px] bg-gradient-to-r from-blue-500/80 via-cyan-400 to-indigo-500/80 rounded-full z-0 pointer-events-none shadow-[0_0_12px_#06b6d4,0_0_20px_#6366f1]"
              style={{
                left: `${cardWidth / 2}px`,
                width: `${scrollProgress * (totalCards - 1) * (cardWidth + cardGap)}px`,
                top: "40%"
              }}
            />

            {/* Glowing spark flowing through timeline rail */}
            <div 
              className="absolute w-5 h-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white border-2 border-cyan-300 z-10 pointer-events-none shadow-[0_0_20px_rgba(6,182,212,1),0_0_35px_rgba(99,102,241,1)] transition-all duration-150"
              style={{
                left: `${cardWidth / 2 + scrollProgress * (totalCards - 1) * (cardWidth + cardGap)}px`,
                top: "40%"
              }}
            >
              <div className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-75" />
            </div>

            {/* Cinematic sliding steps */}
            {PROCESS_STEPS_DATA.map((step, index) => {
              const diff = index - currentFloatIndex;
              const isUpcoming = diff >= 0.5;
              const isPassed = diff <= -0.5;
              const isActive = !isUpcoming && !isPassed;

              const absDiff = Math.abs(diff);

              // Responsive scaling, depth, and angle transformation logic
              const scale = isActive 
                ? (1.04 + Math.sin(Date.now() / 600) * 0.005) 
                : (1 - Math.min(1.2, absDiff) * 0.12);

              const opacity = isUpcoming 
                ? Math.max(0.12, 1 - absDiff * 0.8) 
                : 0.88; // completed phases remain beautifully lit at 88%

              const rotateY = Math.max(-25, Math.min(25, -diff * 22));
              const translateZ = isActive ? 35 : -Math.min(1.5, absDiff) * 110;

              // Interactive 3D glass glare alignment based on viewport delta
              const glareX = -diff * 180;
              const glareSkew = -22 + diff * 12;

              return (
                <div
                  key={step.step}
                  className="absolute top-0 transition-all duration-150 ease-out flex flex-col justify-center"
                  style={{
                    left: `${index * (cardWidth + cardGap)}px`,
                    width: `${cardWidth}px`,
                    height: "100%",
                    transform: `perspective(1000px) rotateY(${rotateY}deg) translateZ(${translateZ}px) scale(${scale})`,
                    opacity: opacity,
                    transformStyle: "preserve-3d",
                    zIndex: isActive ? 50 : 20 - Math.floor(absDiff * 2)
                  }}
                >
                  {/* Subtle active background lighting rays behind card */}
                  {isActive && (
                    <div className="absolute -inset-10 bg-gradient-to-r from-cyan-500/15 via-blue-500/10 to-indigo-500/15 blur-3xl rounded-full scale-110 pointer-events-none -z-10 animate-pulse" />
                  )}

                  {/* 3D Glass Surface Card */}
                  <div 
                    className={`w-full h-[320px] md:h-[380px] rounded-[32px] border relative overflow-hidden flex flex-col justify-between p-6 md:p-8 backdrop-blur-xl transition-all duration-500 ${
                      isActive 
                        ? "bg-slate-950/40 border-cyan-400/50 shadow-[0_0_40px_rgba(6,182,212,0.18)]" 
                        : isPassed 
                          ? "bg-slate-950/50 border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.06)]" 
                          : "bg-slate-950/10 border-white/5"
                    }`}
                  >
                    {/* Animated white glare sweep reflection */}
                    <div 
                      className="absolute inset-0 pointer-events-none select-none z-10 mix-blend-overlay opacity-30"
                      style={{
                        background: `linear-gradient(115deg, transparent 35%, rgba(255, 255, 255, 0.25) 48%, rgba(255, 255, 255, 0.4) 51%, rgba(255, 255, 255, 0.25) 54%, transparent 65%)`,
                        transform: `translateX(${glareX}px) skewX(${glareSkew}deg)`,
                        transition: "transform 0.15s ease-out"
                      }}
                    />

                    {/* Edge-glow soft illuminated neon frame */}
                    <div className={`absolute inset-px rounded-[31px] border pointer-events-none transition-all duration-500 ${
                      isActive 
                        ? "border-cyan-400/35 shadow-[inset_0_0_20px_rgba(6,182,212,0.1)]" 
                        : isPassed 
                          ? "border-indigo-500/15 shadow-[inset_0_0_10px_rgba(99,102,241,0.04)]" 
                          : "border-white/5"
                    }`} />

                    {/* Header Row */}
                    <div className="flex justify-between items-center z-20 relative">
                      <span className={`font-mono text-[9px] md:text-xs font-black uppercase tracking-widest transition-colors duration-500 ${
                        isActive ? "text-cyan-400" : isPassed ? "text-slate-400" : "text-slate-600"
                      }`}>
                        Phase 0{step.step}
                      </span>
                      
                      {isPassed ? (
                        <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-cyan-400 opacity-80" />
                      ) : isActive ? (
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                          <span className="font-mono text-[8px] text-cyan-400 font-extrabold tracking-widest">ACTIVE</span>
                        </div>
                      ) : (
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-700/60" />
                      )}
                    </div>

                    {/* Center details block */}
                    <div className="space-y-3 md:space-y-4 z-20 relative flex-1 flex flex-col justify-center">
                      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center border transition-all duration-500 ${
                        isActive 
                          ? "bg-slate-900 border-cyan-400/40 shadow-[0_0_15px_rgba(6,182,212,0.15)]" 
                          : isPassed 
                            ? "bg-slate-950/80 border-cyan-500/15" 
                            : "bg-slate-950/40 border-white/5"
                      }`}>
                        {renderStepIcon(step.iconName, isActive)}
                      </div>

                      <div>
                        <h3 className={`font-sans text-base md:text-xl font-bold tracking-tight mb-1 uppercase transition-all duration-500 ${
                          isActive ? "text-white" : isPassed ? "text-slate-300" : "text-slate-500"
                        }`}>
                          {step.title}
                        </h3>
                        <p className={`font-sans text-[10px] md:text-xs leading-relaxed transition-all duration-500 ${
                          isActive ? "text-slate-300" : isPassed ? "text-slate-400" : "text-slate-600"
                        }`}>
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Footer tags (Micro technical details module) */}
                    <div className="border-t border-white/5 pt-3 z-20 relative flex flex-col gap-1.5">
                      <span className={`font-mono text-[8px] tracking-[0.2em] uppercase transition-colors duration-500 ${
                        isActive ? "text-cyan-400/80 font-bold" : isPassed ? "text-slate-400/60" : "text-slate-700"
                      }`}>
                        {PHASE_DETAILS[index]?.tag || "PIPELINE ELEMENT"}
                      </span>
                      <div className="flex flex-wrap gap-1 md:gap-1.5">
                        {(PHASE_DETAILS[index]?.items || []).map((subItem, sIdx) => (
                          <span 
                            key={sIdx}
                            className={`font-mono text-[7px] md:text-[8px] px-1.5 py-0.5 rounded border transition-all duration-500 ${
                              isActive 
                                ? "bg-cyan-500/5 border-cyan-400/15 text-slate-300" 
                                : isPassed 
                                  ? "bg-white/0 border-white/5 text-slate-400" 
                                  : "bg-white/0 border-white/0 text-slate-700"
                            }`}
                          >
                            {subItem}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}

          </div>
        </div>

        {/* Premium bottom status row (fixed aligned dashboard panel) */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-20 flex justify-between items-center text-[8px] md:text-[9px] font-mono tracking-[0.15em] text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80 animate-pulse" />
            PIPELINE SYSTEM: ONLINE
          </span>
          <div className="flex gap-1 md:gap-1.5">
            {PROCESS_STEPS_DATA.map((_, dotIdx) => (
              <span 
                key={dotIdx}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  dotIdx === activeIndex 
                    ? "bg-cyan-400 scale-110 shadow-[0_0_8px_#06b6d4]" 
                    : dotIdx < activeIndex 
                      ? "bg-indigo-500/60" 
                      : "bg-slate-800"
                }`}
              />
            ))}
          </div>
          <span>PHASE_SEQ: 0{activeIndex + 1} // 07</span>
        </div>

      </div>
    </section>
  );
}
