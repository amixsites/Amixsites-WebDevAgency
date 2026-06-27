import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { 
  ArrowRight,
  Code2,
  Globe2,
  Smartphone,
  Layers,
  Cpu,
  Palette
} from "lucide-react";
import "./Services3DCarousel.css";

// Premium Service Capabilities Data with Custom Editorial Visuals
const SERVICES_DATA = [
  {
    id: "custom-software",
    title: "Custom Software",
    subtitle: "Complex Architecture",
    description: "Architecting high-performance, complex digital infrastructures engineered with bulletproof, typed code systems.",
    gradient: "from-indigo-600 via-blue-700 to-indigo-950",
    glowColor: "#2563eb",
    visualType: "code-mesh",
    icon: Code2
  },
  {
    id: "web-development",
    title: "Web Engineering",
    subtitle: "Fluid-Motion Web",
    description: "Cinematic web ecosystems designed with flawless responsiveness and server-side static supremacy.",
    gradient: "from-sky-500 via-cyan-600 to-slate-900",
    glowColor: "#06b6d4",
    visualType: "browser-layers",
    icon: Globe2
  },
  {
    id: "mobile-app",
    title: "Mobile Ecosystems",
    subtitle: "Flagship Native Apps",
    description: "Stunning iOS & Android applications featuring gesture-inertia navigation and secure biometric states.",
    gradient: "from-rose-500 via-pink-600 to-purple-950",
    glowColor: "#f43f5e",
    visualType: "mobile-frame",
    icon: Smartphone
  },
  {
    id: "saas-development",
    title: "SaaS & Cloud Platforms",
    subtitle: "Multi-Tenant Architectures",
    description: "Scalable, secure, and ready-to-deploy multi-tenant software suites built to dominate regional market verticals.",
    gradient: "from-purple-600 via-violet-700 to-slate-950",
    glowColor: "#8b5cf6",
    visualType: "cloud-rings",
    icon: Layers
  },
  {
    id: "ai-automation",
    title: "AI Systems",
    subtitle: "Autonomous Networks",
    description: "Autonomous, self-optimizing neural networks integrating decision node vectors and generative logic engines.",
    gradient: "from-blue-600 via-teal-600 to-indigo-950",
    glowColor: "#10b981",
    visualType: "neural-network",
    icon: Cpu
  },
  {
    id: "uiux-design",
    title: "Creative Design",
    subtitle: "High-Fidelity Wireframes",
    description: "High-fidelity interactive prototypes centering around elegant typography and pixel-perfect design systems.",
    gradient: "from-purple-600 via-fuchsia-600 to-violet-950",
    glowColor: "#7c3aed",
    visualType: "design-artboard",
    icon: Palette
  }
];

export default function Services3DCarousel() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [windowWidth, setWindowWidth] = useState(1200);
  const [isInteracting, setIsInteracting] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [stageTilt, setStageTilt] = useState({ x: 0, y: 0 });
  const [activeCardTilt, setActiveCardTilt] = useState({ x: 0, y: 0 });
  const [mouseRelPos, setMouseRelPos] = useState({ x: 0, y: 0 });

  const stageRef = useRef<HTMLDivElement>(null);
  const pointerStart = useRef<{ x: number; y: number; time: number } | null>(null);
  const isDragging = useRef(false);
  const directionLocked = useRef<"horizontal" | "vertical" | null>(null);
  const interactionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Intersection Observer: track if section is 70%+ visible
  const [sectionActive, setSectionActive] = useState(false);
  const [scrollIdle, setScrollIdle] = useState(true);
  const scrollIdleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Observe the services section for 70% visibility
  useEffect(() => {
    const section = document.getElementById("services");
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => setSectionActive(entry.isIntersecting),
      { threshold: 0.7 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Track scroll idle state (idle after 300ms of no scroll)
  useEffect(() => {
    const handleScroll = () => {
      setScrollIdle(false);
      if (scrollIdleTimer.current) clearTimeout(scrollIdleTimer.current);
      scrollIdleTimer.current = setTimeout(() => setScrollIdle(true), 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollIdleTimer.current) clearTimeout(scrollIdleTimer.current);
    };
  }, []);

  // Whether manual drag interaction is allowed
  const canInteract = sectionActive && scrollIdle;

  // Dynamic window sizing
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Autoplay: rotates every 2.5s, pauses only during active drag
  useEffect(() => {
    if (isInteracting) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SERVICES_DATA.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [isInteracting]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + SERVICES_DATA.length) % SERVICES_DATA.length);
  };
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % SERVICES_DATA.length);
  };

  // Responsive layout parameters
  const isDesktop = windowWidth >= 1024;
  const cardWidth = isDesktop ? 420 : Math.min(350, windowWidth * 0.78);
  const cardHeight = isDesktop ? 550 : Math.min(460, windowWidth * 1.15);
  const gapMultiplier = isDesktop ? 380 : windowWidth * 0.62;

  // Pointer Down — only start tracking if interaction allowed
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("a") || (e.target as HTMLElement).closest("button")) return;
    if (!canInteract) return;

    pointerStart.current = { x: e.clientX, y: e.clientY, time: Date.now() };
    isDragging.current = false;
    directionLocked.current = null;
  };

  // Pointer Move — determine direction first, only capture horizontal
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!pointerStart.current) return;
    if (!canInteract) {
      pointerStart.current = null;
      return;
    }

    const dx = e.clientX - pointerStart.current.x;
    const dy = e.clientY - pointerStart.current.y;

    // Lock direction after 10px movement
    if (!directionLocked.current && (Math.abs(dx) > 10 || Math.abs(dy) > 10)) {
      if (Math.abs(dy) > Math.abs(dx)) {
        // Vertical — release immediately, let page scroll
        directionLocked.current = "vertical";
        pointerStart.current = null;
        return;
      } else {
        // Horizontal — capture for carousel
        directionLocked.current = "horizontal";
        isDragging.current = true;
        setIsInteracting(true);
        if (interactionTimeoutRef.current) {
          clearTimeout(interactionTimeoutRef.current);
          interactionTimeoutRef.current = null;
        }
        e.currentTarget.setPointerCapture(e.pointerId);
      }
    }

    if (directionLocked.current === "vertical") return;

    if (isDragging.current) {
      setDragOffset(dx);
    }

    // Desktop tilt effects (only on hover, no capture needed)
    if (isDesktop && stageRef.current && !isDragging.current) {
      const rect = stageRef.current.getBoundingClientRect();
      const sx = (e.clientX - rect.left) / rect.width - 0.5;
      const sy = (e.clientY - rect.top) / rect.height - 0.5;
      setStageTilt({ x: sx * 10, y: -sy * 6 });

      const activeCardId = SERVICES_DATA[activeIndex].id;
      const activeCardElement = document.getElementById(`card-${activeCardId}`);
      if (activeCardElement) {
        const cardRect = activeCardElement.getBoundingClientRect();
        const cx = e.clientX - cardRect.left;
        const cy = e.clientY - cardRect.top;
        setMouseRelPos({ x: cx, y: cy });
        const normX = (cx / cardRect.width) - 0.5;
        const normY = (cy / cardRect.height) - 0.5;
        setActiveCardTilt({ x: normX * 16, y: -normY * 10 });
      }
    }
  };

  // Pointer Up — resolve swipe or click
  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!pointerStart.current && !isDragging.current) return;

    if (isDragging.current) {
      try { e.currentTarget.releasePointerCapture(e.pointerId); } catch {}
    }

    const startPos = pointerStart.current;
    const wasDragging = isDragging.current;

    pointerStart.current = null;
    isDragging.current = false;
    directionLocked.current = null;
    setDragOffset(0);

    if (wasDragging && startPos) {
      const dx = e.clientX - startPos.x;
      const dt = Date.now() - startPos.time;
      const velocity = dx / (dt || 1);
      const swipeThreshold = isDesktop ? 80 : windowWidth * 0.12;

      if (Math.abs(velocity) > 0.4) {
        dx < 0 ? handleNext() : handlePrev();
      } else if (dx < -swipeThreshold) {
        handleNext();
      } else if (dx > swipeThreshold) {
        handlePrev();
      }
    } else {
      // Click on non-active card
      const elem = document.elementFromPoint(e.clientX, e.clientY);
      const clickedCard = elem?.closest("[data-card-index]");
      if (clickedCard) {
        const idx = parseInt(clickedCard.getAttribute("data-card-index") || "", 10);
        if (!isNaN(idx) && idx !== activeIndex) setActiveIndex(idx);
      }
    }

    // Resume autoplay after 2 seconds
    if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
    interactionTimeoutRef.current = setTimeout(() => setIsInteracting(false), 2000);
  };

  const handleMouseLeaveStage = () => {
    if (isDesktop) {
      setStageTilt({ x: 0, y: 0 });
      setActiveCardTilt({ x: 0, y: 0 });
    }
  };

  // 3D coordinate interpolation
  const getCardTransforms = (vOffset: number) => {
    const absOffset = Math.abs(vOffset);

    let opacity = 1;
    if (absOffset <= 1) opacity = 1 - absOffset * 0.25;
    else if (absOffset <= 2) opacity = 0.75 - (absOffset - 1) * 0.45;
    else opacity = Math.max(0, 0.30 - (absOffset - 2) * 0.30);

    let scale = 1;
    if (absOffset <= 1) scale = 1 - absOffset * 0.18;
    else if (absOffset <= 2) scale = 0.82 - (absOffset - 1) * 0.15;
    else scale = Math.max(0.45, 0.67 - (absOffset - 2) * 0.15);

    let translateZ = 150;
    if (absOffset <= 1) translateZ = 150 - absOffset * 250;
    else if (absOffset <= 2) translateZ = -100 - (absOffset - 1) * 200;
    else translateZ = -300 - (absOffset - 2) * 150;

    let rotateY = 0;
    if (vOffset < 0) {
      if (vOffset >= -1) rotateY = Math.abs(vOffset) * 35;
      else if (vOffset >= -2) rotateY = 35 + (Math.abs(vOffset) - 1) * 10;
      else rotateY = 45 + (Math.abs(vOffset) - 2) * 10;
    } else if (vOffset > 0) {
      if (vOffset <= 1) rotateY = -vOffset * 35;
      else if (vOffset <= 2) rotateY = -35 - (vOffset - 1) * 10;
      else rotateY = -45 - (vOffset - 2) * 10;
    }

    let translateX = 0;
    if (vOffset < 0) {
      if (vOffset >= -1) translateX = vOffset * gapMultiplier;
      else if (vOffset >= -2) translateX = -gapMultiplier + (vOffset + 1) * (gapMultiplier * 0.75);
      else translateX = -gapMultiplier * 1.75 + (vOffset + 2) * (gapMultiplier * 0.4);
    } else if (vOffset > 0) {
      if (vOffset <= 1) translateX = vOffset * gapMultiplier;
      else if (vOffset <= 2) translateX = gapMultiplier + (vOffset - 1) * (gapMultiplier * 0.75);
      else translateX = gapMultiplier * 1.75 + (vOffset - 2) * (gapMultiplier * 0.4);
    }

    let blur = 0;
    if (absOffset <= 1) blur = absOffset * 2;
    else if (absOffset <= 2) blur = 2 + (absOffset - 1) * 4;
    else blur = 6 + (absOffset - 2) * 2;

    let zIndex = 10;
    if (absOffset < 0.5) zIndex = 40;
    else if (absOffset < 1.5) zIndex = 30;
    else if (absOffset < 2.5) zIndex = 20;

    return { translateX, translateZ, rotateY, scale, opacity, blur, zIndex };
  };

  // Card visual renderers
  const renderCardVisual = (type: string, gradient: string, Icon: any) => {
    switch (type) {
      case "code-mesh":
        return (
          <div className={`w-full h-full bg-linear-to-b ${gradient} relative flex items-center justify-center p-6 overflow-hidden`}>
            <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
              <path d="M 20 40 L 120 180 L 220 80 M 120 180 L 320 220" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" fill="none" />
              <path d="M 220 80 L 300 140" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" fill="none" />
            </svg>
            <div className="absolute w-[82%] h-[72%] bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl p-4 flex flex-col justify-between transform -rotate-1 select-none">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                </div>
                <span className="font-mono text-[8px] text-white/50 tracking-widest font-extrabold uppercase">CORE_MESH.ts</span>
              </div>
              <div className="font-mono text-[9px] text-left text-white/80 space-y-1.5 py-2">
                <p className="text-cyan-300"><span className="text-pink-400">const</span> initEngine = () =&gt; &#123;</p>
                <p className="pl-3.5">nodes.deploy(<span className="text-yellow-200">"EdgeNode"</span>);</p>
                <p className="pl-3.5 text-emerald-400">// Typed architecture</p>
                <p className="text-cyan-300">&#125;;</p>
              </div>
              <div className="flex justify-between items-center text-[7px] font-mono text-white/30">
                <span>STACK: TS</span>
                <span>v4.1.2</span>
              </div>
            </div>
            <div className="absolute right-10 bottom-10 w-12 h-12 rounded-full bg-linear-to-tr from-cyan-400 to-indigo-600 animate-pulse border border-white/30 shadow-lg" />
          </div>
        );
      case "browser-layers":
        return (
          <div className={`w-full h-full bg-linear-to-b ${gradient} relative flex items-center justify-center p-6 overflow-hidden`}>
            <div className="absolute w-[85%] h-[75%] bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden flex flex-col justify-between transform rotate-2 select-none">
              <div className="bg-white/10 border-b border-white/10 px-3 py-2 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                </div>
                <span className="font-mono text-[7px] text-white/60 bg-white/5 px-2 py-0.5 rounded border border-white/10">design-art.io</span>
              </div>
              <div className="flex-1 flex flex-col justify-center items-center text-center p-3">
                <h4 className="font-serif text-2xl font-light text-white tracking-wide mb-1 select-none">Aesthetic</h4>
                <div className="w-8 h-[1px] bg-white/30 my-1.5" />
                <p className="text-[8px] text-white/50 uppercase tracking-widest font-mono">Precision Layout</p>
              </div>
              <div className="bg-white/5 border-t border-white/10 px-3 py-1.5 flex justify-between text-[7px] font-mono text-white/40">
                <span>FPS: 120</span>
                <span>WEB_GL</span>
              </div>
            </div>
            <div className="absolute -left-4 -bottom-4 w-24 h-24 rounded-full border border-white/10 animate-[spin_50s_linear_infinite]" />
          </div>
        );
      case "mobile-frame":
        return (
          <div className={`w-full h-full bg-linear-to-b ${gradient} relative flex items-center justify-center p-6 overflow-hidden`}>
            <div className="absolute w-[130px] h-[220px] bg-white/10 backdrop-blur-2xl rounded-[32px] border-2 border-white/30 shadow-[0_24px_48px_rgba(0,0,0,0.3)] p-3 flex flex-col justify-between transform rotate-[-4deg] select-none">
              <div className="w-10 h-3 bg-black/40 rounded-full mx-auto" />
              <div className="flex-1 flex flex-col justify-center items-center gap-2 my-2">
                <div className="w-full bg-white/10 rounded-lg p-1.5 border border-white/10 flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-rose-400" />
                  <div className="flex-1 h-1.5 bg-white/20 rounded" />
                </div>
                <div className="w-full bg-white/10 rounded-lg p-1.5 border border-white/10 flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-purple-400" />
                  <div className="flex-1 h-1.5 bg-white/20 rounded" />
                </div>
              </div>
              <div className="w-10 h-0.5 bg-white/30 rounded-full mx-auto" />
            </div>
          </div>
        );
      default:
        return (
          <div className={`w-full h-full bg-linear-to-b ${gradient} relative flex items-center justify-center overflow-hidden`}>
            <div className="absolute w-24 h-24 rounded-full border-2 border-dashed border-white/10 animate-[spin_60s_linear_infinite]" />
            <div className="absolute w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shadow-lg backdrop-blur-md">
              <Icon className="w-6 h-6 text-white" />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="relative w-full overflow-hidden py-4 px-0 flex flex-col items-center select-none">
      
      {/* 3D Perspective Stage Container */}
      <div 
        ref={stageRef}
        id="desktop-carousel-viewport"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onMouseLeave={handleMouseLeaveStage}
        style={{
          transform: isDesktop ? `rotateY(${stageTilt.x}deg) rotateX(${stageTilt.y}deg)` : "none",
          transformStyle: "preserve-3d",
          transition: isDragging.current ? "none" : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          touchAction: "pan-y"
        }}
        className="relative w-full h-[580px] md:h-[660px] flex items-center justify-center overflow-visible select-none carousel-stage-container"
      >
        
        {/* Dynamic Glowing Ambient Shadow background */}
        <div 
          className="absolute inset-0 w-[240px] md:w-[500px] h-[240px] md:h-[350px] bg-radial blur-[80px] md:blur-[140px] rounded-full opacity-40 transition-all duration-1000 pointer-events-none z-0 left-1/2 -translate-x-1/2 top-1/4"
          style={{ backgroundColor: SERVICES_DATA[activeIndex].glowColor }}
        />

        {/* 3D Slide Track */}
        <div className="relative w-full h-full flex items-center justify-center z-10" style={{ transformStyle: "preserve-3d" }}>
          {SERVICES_DATA.map((service, idx) => {
            let offset = idx - activeIndex;
            const total = SERVICES_DATA.length;
            if (offset < -total / 2) offset += total;
            if (offset > total / 2) offset -= total;

            const isActive = idx === activeIndex;
            const dragProgress = dragOffset / gapMultiplier;
            const virtualOffset = offset + dragProgress;

            const { translateX, translateZ, rotateY, scale, opacity, blur, zIndex } = getCardTransforms(virtualOffset);

            const cardTiltX = isActive ? activeCardTilt.x : 0;
            const cardTiltY = isActive ? activeCardTilt.y : 0;

            const floatClass = isActive 
              ? "animate-float-center" 
              : (offset < 0 ? "animate-float-side-left" : "animate-float-side-right");

            return (
              <motion.div
                key={service.id}
                id={`card-${service.id}`}
                data-card-index={idx}
                onClick={(e) => {
                  if (isDragging.current || Math.abs(dragOffset) > 10) return;
                  if ((e.target as HTMLElement).closest("a") || (e.target as HTMLElement).closest("button")) return;
                  if (!isActive) setActiveIndex(idx);
                }}
                animate={{
                  x: translateX,
                  scale: scale,
                  rotateY: rotateY + cardTiltX,
                  rotateX: cardTiltY,
                  z: translateZ,
                  opacity: opacity,
                  filter: `blur(${isActive ? 0 : blur}px)`
                }}
                transition={
                  isDragging.current 
                    ? { type: "tween", duration: 0.05, ease: "linear" }
                    : { type: "spring", stiffness: 140, damping: 22, mass: 0.9 }
                }
                style={{ 
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  zIndex: zIndex,
                  transformStyle: "preserve-3d"
                }}
                className={`absolute rounded-[32px] border cursor-pointer overflow-hidden transition-all duration-300 ${
                  isActive 
                    ? "bg-white/65 backdrop-blur-[40px] border-white/70 shadow-[0_40px_100px_rgba(15,23,42,0.14)]" 
                    : "bg-white/20 backdrop-blur-[15px] border-white/30 shadow-sm hover:border-slate-400 hover:bg-white/40 hover:shadow-md"
                }`}
              >
                <div 
                  className={`w-full h-full flex flex-col justify-between text-left relative ${floatClass}`}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Glassmorphic cursor reflection */}
                  {isActive && (
                    <div 
                      className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-60 z-20 transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(circle 280px at ${mouseRelPos.x}px ${mouseRelPos.y}px, rgba(255,255,255,0.4) 0%, transparent 100%)`
                      }}
                    />
                  )}

                  {/* Glass shimmer */}
                  <div className="absolute inset-0 rounded-[32px] overflow-hidden pointer-events-none select-none z-0">
                    <div 
                      className="absolute inset-0 bg-linear-to-tr from-white/0 via-white/10 to-white/20 transform -skew-x-12 translate-x-[-30%] transition-transform duration-700 ease-out"
                      style={{
                        transform: isActive ? `translateX(${(cardTiltX * 2.5) - 15}%) translateY(${cardTiltY * 1.5}%)` : 'translateX(-30%)'
                      }}
                    />
                    <div className="absolute inset-px rounded-[31px] border border-white/30" />
                  </div>

                  {/* Visual Segment (Top 48%) */}
                  <div className="h-[48%] w-full border-b border-white/20 relative overflow-hidden">
                    {renderCardVisual(service.visualType, service.gradient, service.icon)}
                  </div>

                  {/* Text block (Bottom 52%) */}
                  <div className="p-5 md:p-6.5 flex-1 flex flex-col justify-between relative z-10">
                    <div>
                      <span className="font-mono text-[9px] font-black uppercase tracking-widest text-blue-600 block mb-1">
                        {service.subtitle}
                      </span>
                      <h3 className="font-sans text-lg md:text-xl font-extrabold text-slate-900 mb-2 tracking-tight">
                        {service.title}
                      </h3>
                      <p className="font-sans text-[11.5px] md:text-xs text-slate-600 leading-relaxed max-w-sm">
                        {service.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3.5 border-t border-slate-100/60">
                      <span className="font-sans text-[8px] font-bold text-slate-400">
                        DESIGN SYSTEM
                      </span>
                      <a
                        id={`action-explore-${service.id}`}
                        href="#contact"
                        className={`font-sans text-[10px] md:text-xs font-bold px-3.5 py-1.5 rounded-full border flex items-center gap-1 transition-all duration-300 ${
                          isActive 
                            ? "bg-slate-900 border-slate-900 text-white hover:bg-slate-800 hover:scale-105 shadow-md" 
                            : "bg-white/40 border-white/50 text-slate-500"
                        }`}
                      >
                        <span>Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
