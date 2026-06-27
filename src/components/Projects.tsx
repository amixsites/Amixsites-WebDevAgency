import { useState } from "react";
import { motion } from "motion/react";
import { 
  ExternalLink, 
  ArrowRight, 
  ShoppingBag, 
  Sparkles, 
  ChevronRight,
  TrendingUp
} from "lucide-react";
import { PORTFOLIO_DATA } from "../data";

export default function Projects() {
  const [hoveredProj, setHoveredProj] = useState<string | null>(null);

  return (
    <section 
      id="projects" 
      className="relative py-28 px-4 bg-slate-50/50 overflow-hidden border-b border-slate-100"
    >
      {/* Abstract light spots */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/5 blur-3xl rounded-full pointer-events-none select-none z-0" />
      
      <div className="w-full max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div id="projects-header" className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-20">
          <div className="text-left max-w-2xl">
            <span className="font-mono text-[11px] uppercase tracking-widest text-blue-600 font-bold bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-full inline-block mb-4">
              Featured Work
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
              Projects That Drive Business Results
            </h2>
            <p className="font-sans text-base text-slate-600 leading-relaxed">
              Explore our portfolio of successful digital products. Each project is engineered with high precision, performance, and conversion design patterns.
            </p>
          </div>
          <a
            id="projects-all-cta"
            href="#contact"
            className="group inline-flex items-center gap-1.5 font-sans text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            <span>Discuss your project idea</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Portfolio Layout (3 Column Cinematic Cards) */}
        <div id="projects-grid" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PORTFOLIO_DATA.map((project, idx) => {
            const isHovered = hoveredProj === project.id;
            
            // Custom CSS background classes for visual cards representing e-commerce themes
            const bgThemes = [
              "bg-linear-to-tr from-pink-500/10 via-purple-500/10 to-violet-500/10",
              "bg-linear-to-tr from-rose-500/10 via-slate-500/10 to-sky-500/10",
              "bg-linear-to-tr from-emerald-500/10 via-teal-500/10 to-amber-500/10"
            ];

            const ringColors = [
              "border-purple-200/50",
              "border-sky-200/50",
              "border-emerald-200/50"
            ];

            return (
              <motion.div
                id={`project-card-${project.id}`}
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: idx * 0.15 }}
                viewport={{ once: true, margin: "-100px" }}
                onMouseEnter={() => setHoveredProj(project.id)}
                onMouseLeave={() => setHoveredProj(null)}
                className="group relative bg-white rounded-3xl border border-slate-200/50 overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.01)] hover:shadow-[0_24px_48px_rgba(15,23,42,0.06)] transition-all duration-500 flex flex-col cursor-pointer"
              >
                
                {/* Image Placeholder Frame / Artistic representation of e-commerce storefront */}
                <div className={`aspect-[1.45] w-full ${bgThemes[idx]} p-6 relative flex items-center justify-center border-b border-slate-100 overflow-hidden`}>
                  
                  {/* Subtle Grid overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

                  {/* High fidelity device container */}
                  <div className={`w-[90%] h-[90%] bg-white rounded-t-2xl border-t border-x ${ringColors[idx]} shadow-2xl p-4 flex flex-col justify-between transition-transform duration-500 group-hover:scale-[1.03] translate-y-4`}>
                    
                    {/* Header bar */}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                        <span className="font-mono text-[8px] text-slate-400">
                          {project.url.replace("https://", "")}
                        </span>
                      </div>
                      <ExternalLink className="w-2.5 h-2.5 text-slate-300" />
                    </div>

                    {/* Content preview */}
                    <div className="flex-1 flex flex-col justify-center text-center items-center">
                      <ShoppingBag className="w-8 h-8 text-slate-300 mb-2 group-hover:rotate-6 transition-transform" />
                      <span className="font-mono text-[10px] tracking-widest uppercase font-extrabold text-slate-400">
                        {project.category}
                      </span>
                      <h4 className="font-sans text-sm font-black text-slate-800 mt-1">
                        {project.title} Storefront
                      </h4>
                    </div>

                    {/* Bottom visual metrics */}
                    <div className="border-t border-slate-50 pt-2 flex justify-between items-center text-[9px] font-mono text-slate-400">
                      <span>CLIENT SATISFACTION: 100%</span>
                      <span>ACTIVE SSL</span>
                    </div>

                  </div>

                </div>

                {/* Content block */}
                <div className="p-7 flex-1 flex flex-col justify-between text-left">
                  
                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.map((tag, tIdx) => (
                        <span 
                          key={tIdx}
                          className="font-mono text-[9px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 border border-slate-200/50 px-2.5 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="font-sans text-xl font-bold text-slate-950 mb-2 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="font-sans text-sm text-slate-600 leading-relaxed mb-6">
                      {project.description}
                    </p>
                  </div>

                  {/* Business KPI stats block */}
                  <div className="border-t border-slate-100 pt-5 mt-2 flex items-center justify-between">
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5">
                        Performance Metric
                      </span>
                      <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold font-sans">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span>{project.stats}</span>
                      </div>
                    </div>

                    <a 
                      id={`project-link-${project.id}`}
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border border-slate-200/60 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-slate-900 group-hover:border-slate-900 transition-all duration-300"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>

                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
