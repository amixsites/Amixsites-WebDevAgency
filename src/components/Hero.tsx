import { useEffect, useState, useRef, MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { 
  ArrowRight, 
  Terminal, 
  Layers, 
  Cpu, 
  Code2, 
  Globe2, 
  Sparkles,
  Database
} from "lucide-react";
import { BRAND_POSITIONING } from "../data";
import ThreeCanvas from "./ThreeCanvas";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  // Butter-smooth springs for subtle, high-end Apple-style mouse interaction
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 40, stiffness: 180, mass: 0.5 };
  
  // Parallax layers for subtle floating DOM overlays
  const layerX1 = useSpring(useTransform(mouseX, [-0.5, 0.5], [-18, 18]), springConfig);
  const layerY1 = useSpring(useTransform(mouseY, [-0.5, 0.5], [-18, 18]), springConfig);

  const layerX2 = useSpring(useTransform(mouseX, [-0.5, 0.5], [20, -20]), springConfig);
  const layerY2 = useSpring(useTransform(mouseY, [-0.5, 0.5], [-15, 15]), springConfig);

  const layerX3 = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);
  const layerY3 = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);

  const handleMouseMove = (e: MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Staggered word reveal for premium entrance transition
  const headlineWords = "Warangal's Partner for Websites & Business Software".split(" ");

  const techBadges = [
    { text: "⚡ Next.js 16", color: "text-blue-600 bg-blue-50 border-blue-100" },
    { text: "TypeScript", color: "text-indigo-600 bg-indigo-50 border-indigo-100" },
    { text: "Supabase", color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
    { text: "PostgreSQL", color: "text-cyan-600 bg-cyan-50 border-cyan-100" },
    { text: "Framer Motion", color: "text-violet-600 bg-violet-50 border-violet-100" }
  ];

  return (
    <section 
      id="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen w-full flex flex-col items-center justify-center pt-28 pb-20 px-6 bg-white overflow-hidden"
    >
      {/* Light gradient spots (Apple style: subtle, clean) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-linear-to-tr from-blue-100/30 via-sky-100/20 to-purple-100/30 blur-3xl rounded-full pointer-events-none select-none z-0" />
      
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 items-center relative z-10">
        
        {/* Left Side: Staggered Headline, Pitch and CTAs */}
        <div id="hero-left" className="lg:col-span-6 flex flex-col justify-center text-left">
          
          {/* Subtle Live Badge */}
          <div className="flex items-center gap-2 mb-6">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
            </span>
            <span className="font-mono text-[11px] uppercase tracking-widest text-slate-500 font-extrabold">
              Premium Software Development Studio
            </span>
          </div>
 
          {/* Staggered Word Reveal Heading */}
          <h1 id="hero-title" className="font-sans text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.08] mb-6">
            {headlineWords.map((word, index) => {
              const isAccent = word.toLowerCase().includes("websites") || word.toLowerCase().includes("software") || word.toLowerCase().includes("partner");
              return (
                <motion.span
                  key={index}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    duration: 0.8, 
                    ease: [0.16, 1, 0.3, 1], 
                    delay: 0.2 + index * 0.06 
                  }}
                  className={`inline-block mr-2 ${
                    isAccent 
                      ? "text-blue-600 bg-linear-to-r from-blue-600 via-sky-500 to-indigo-600 bg-clip-text text-transparent" 
                      : ""
                  }`}
                >
                  {word}
                </motion.span>
              );
            })}
          </h1>
 
          {/* Muted Subheading Description */}
          <motion.p
            id="hero-desc"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
            className="font-sans text-base md:text-lg text-slate-600 leading-relaxed max-w-xl mb-10"
          >
            From schools and restaurants to hospitals and startups, we create digital solutions that help local businesses grow.
          </motion.p>
 
          {/* Interactive CTAs */}
          <motion.div
            id="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12"
          >
            <a
              id="hero-start-cta"
              href="#contact"
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-sans font-semibold shadow-xl shadow-blue-500/20 hover:shadow-2xl hover:shadow-blue-500/35 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Your Project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 rounded-full bg-linear-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </a>
 
            <a
              id="hero-work-cta"
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-sans font-semibold shadow-xs hover:border-slate-300 transition-all duration-200"
            >
              See Solutions
            </a>
          </motion.div>

          {/* Specialized Tech Tags */}
          <motion.div
            id="hero-tech-stack"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="flex flex-col gap-3 text-left"
          >
            <span className="font-sans text-xs font-bold text-slate-400 uppercase tracking-widest">
              Engineered with world-class frameworks
            </span>
            <div className="flex flex-wrap gap-2">
              {techBadges.map((badge, index) => (
                <span
                  key={index}
                  className={`text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-all duration-300 hover:-translate-y-0.5 cursor-default ${badge.color}`}
                >
                  {badge.text}
                </span>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Right Side: Large 50% abstract interactive WebGL artwork scene */}
        <div 
          id="hero-right"
          className="lg:col-span-6 h-[480px] sm:h-[560px] lg:h-[640px] w-full flex items-center justify-center relative perspective-[1200px]"
        >
          {/* Inner glass overlay rings representing orbital tracking */}
          <div className="absolute w-[440px] h-[440px] rounded-full border border-dashed border-slate-200/50 animate-[spin_120s_linear_infinite] pointer-events-none z-0" />
          <div className="absolute w-[320px] h-[320px] rounded-full border border-slate-200/30 animate-[spin_60s_linear_infinite_reverse] pointer-events-none z-0" />

          {/* ThreeJS High Performance Background Canvas */}
          <ThreeCanvas />

          {/* Interactive floating glass DOM panels layered carefully on top of WebGL canvas */}
          {/* Floating Element 1: Systems Architecture Map (Top Left) */}
          <motion.div
            id="hero-floating-node-1"
            style={{ x: layerX1, y: layerY1 }}
            className="absolute top-6 left-6 bg-white/70 backdrop-blur-xl rounded-2xl p-4 border border-slate-200/60 shadow-xl flex items-center gap-3.5 w-60 hover:bg-white/90 transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
              <Cpu className="w-5 h-5" />
            </div>
            <div className="text-left overflow-hidden">
              <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400 block font-bold">Node State</span>
              <span className="font-sans text-xs font-bold text-slate-800 block truncate">GraphQL Mesh Network</span>
            </div>
          </motion.div>

          {/* Floating Element 2: Clean CLI Console output (Bottom Left) */}
          <motion.div
            id="hero-floating-node-2"
            style={{ x: layerX2, y: layerY2 }}
            className="absolute bottom-10 left-4 bg-slate-950/95 backdrop-blur-xl rounded-2xl p-4 border border-slate-800 shadow-2xl flex flex-col gap-2 w-64 hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 font-bold">Terminal Build</span>
              </div>
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-slate-800" />
                <span className="w-2 h-2 rounded-full bg-slate-800" />
              </div>
            </div>
            <div className="font-mono text-[9px] text-slate-300 space-y-1 text-left">
              <p className="text-emerald-400">$ amix deploy --prod</p>
              <p className="text-slate-500">✔ Optimized build chunk resolved (452kb)</p>
              <p className="text-slate-400">✔ Serverless edge runtime live worldwide</p>
            </div>
          </motion.div>

          {/* Floating Element 3: Product Components Stack (Top Right) */}
          <motion.div
            id="hero-floating-node-3"
            style={{ x: layerX3, y: layerY3 }}
            className="absolute top-12 right-6 bg-white/70 backdrop-blur-xl rounded-2xl p-4 border border-slate-200/60 shadow-xl flex flex-col gap-2 w-52 hover:bg-white/90 transition-all duration-300"
          >
            <div className="flex items-center gap-2 mb-1">
              <Layers className="w-4 h-4 text-violet-500 shrink-0" />
              <span className="font-sans text-xs font-bold text-slate-800">Design System</span>
            </div>
            <div className="space-y-1.5 text-left">
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-lg p-1.5">
                <Code2 className="w-3 h-3 text-slate-400" />
                <span className="font-mono text-[9px] text-slate-600 font-bold">GlassCard.tsx</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-lg p-1.5">
                <Sparkles className="w-3 h-3 text-slate-400" />
                <span className="font-mono text-[9px] text-slate-600 font-bold">RefractShader.glsl</span>
              </div>
            </div>
          </motion.div>

          {/* Floating Element 4: Cloud DB cluster specs (Bottom Right) */}
          <motion.div
            id="hero-floating-node-4"
            style={{ x: layerX1, y: layerY2 }}
            className="absolute bottom-6 right-6 bg-white/70 backdrop-blur-xl rounded-2xl p-4 border border-slate-200/60 shadow-xl flex items-center gap-3 w-48 hover:bg-white/90 transition-all duration-300"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
              <Database className="w-4.5 h-4.5" />
            </div>
            <div className="text-left">
              <span className="font-mono text-[9px] text-slate-400 block font-bold leading-none mb-0.5">PostgreSQL</span>
              <span className="font-sans text-xs font-bold text-slate-700">Multi-Region DB</span>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
