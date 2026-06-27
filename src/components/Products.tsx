import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  GraduationCap, 
  UtensilsCrossed, 
  Calendar, 
  ExternalLink, 
  Layers, 
  Check, 
  ShieldAlert, 
  Clock 
} from "lucide-react";
import { SAAS_PRODUCTS_DATA } from "../data";

export default function Products() {
  const [activeTab, setActiveTab] = useState(SAAS_PRODUCTS_DATA[0].id);

  const activeProduct = SAAS_PRODUCTS_DATA.find(p => p.id === activeTab) || SAAS_PRODUCTS_DATA[0];

  const renderProductIcon = (id: string) => {
    switch (id) {
      case "prod-school-erp":
        return <GraduationCap className="w-5 h-5 text-blue-600" />;
      case "prod-restaurant-pos":
        return <UtensilsCrossed className="w-5 h-5 text-amber-600" />;
      case "prod-banquet-manager":
        return <Calendar className="w-5 h-5 text-purple-600" />;
      default:
        return <Layers className="w-5 h-5 text-slate-600" />;
    }
  };

  // Dynamically render a high-fidelity simulated micro-application dashboard corresponding to the active SaaS module
  const renderSimulatedApp = (id: string) => {
    switch (id) {
      case "prod-school-erp":
        return (
          <div className="w-full h-full bg-slate-50 flex flex-col p-4 text-left font-sans select-none overflow-hidden">
            <div className="flex justify-between items-center border-b border-slate-200/60 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold">Am</div>
                <span className="text-xs font-bold text-slate-800">EduSuite ERP</span>
              </div>
              <span className="text-[9px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-mono font-bold">Academic Session: 2026</span>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-3">
              <div className="bg-white rounded-xl p-2.5 border border-slate-200/50 shadow-xs">
                <span className="text-[9px] text-slate-400 block font-semibold uppercase">Students</span>
                <span className="font-mono text-sm font-extrabold text-slate-800">1,482</span>
              </div>
              <div className="bg-white rounded-xl p-2.5 border border-slate-200/50 shadow-xs">
                <span className="text-[9px] text-slate-400 block font-semibold uppercase">Collection</span>
                <span className="font-mono text-sm font-extrabold text-emerald-600">₹8.4L</span>
              </div>
              <div className="bg-white rounded-xl p-2.5 border border-slate-200/50 shadow-xs">
                <span className="text-[9px] text-slate-400 block font-semibold uppercase">Attendance</span>
                <span className="font-mono text-sm font-extrabold text-blue-600">96.8%</span>
              </div>
            </div>
            {/* Student Records Table */}
            <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden flex-1 flex flex-col justify-between">
              <div className="p-2 bg-slate-100/50 border-b border-slate-200/50 flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-600">Active Students</span>
                <span className="text-[8px] text-slate-400">Class 10-A</span>
              </div>
              <div className="divide-y divide-slate-100 px-2.5">
                <div className="py-2 flex justify-between text-[10px]">
                  <span className="font-semibold text-slate-700">Aarav Sharma</span>
                  <span className="text-emerald-500 font-bold">Present</span>
                </div>
                <div className="py-2 flex justify-between text-[10px]">
                  <span className="font-semibold text-slate-700">Ananya Verma</span>
                  <span className="text-emerald-500 font-bold">Present</span>
                </div>
                <div className="py-2 flex justify-between text-[10px]">
                  <span className="font-semibold text-slate-700">Devansh Gupta</span>
                  <span className="text-amber-500 font-bold">Late</span>
                </div>
              </div>
              <div className="p-2 border-t border-slate-100 text-center bg-slate-50">
                <span className="text-[9px] text-blue-600 font-bold">View Parent Portal v2.4</span>
              </div>
            </div>
          </div>
        );
      case "prod-restaurant-pos":
        return (
          <div className="w-full h-full bg-slate-50 flex flex-col p-4 text-left font-sans select-none overflow-hidden">
            <div className="flex justify-between items-center border-b border-slate-200/60 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-amber-500 flex items-center justify-center text-white text-[10px] font-bold">POS</div>
                <span className="text-xs font-bold text-slate-800">QuickBite POS</span>
              </div>
              <span className="text-[9px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-mono font-bold">Terminal #3 (Online)</span>
            </div>
            <div className="grid grid-cols-12 gap-3 flex-1">
              {/* Menu Column */}
              <div className="col-span-8 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white border border-slate-200/60 rounded-lg p-2 flex justify-between items-center shadow-xs">
                    <div>
                      <span className="text-[10px] font-bold text-slate-700 block">Butter Chicken</span>
                      <span className="text-[8px] text-slate-400">₹320</span>
                    </div>
                    <span className="text-[10px] bg-amber-50 text-amber-600 font-mono font-bold px-1.5 py-0.5 rounded border border-amber-100">+Add</span>
                  </div>
                  <div className="bg-white border border-slate-200/60 rounded-lg p-2 flex justify-between items-center shadow-xs">
                    <div>
                      <span className="text-[10px] font-bold text-slate-700 block">Garlic Naan</span>
                      <span className="text-[8px] text-slate-400">₹60</span>
                    </div>
                    <span className="text-[10px] bg-amber-50 text-amber-600 font-mono font-bold px-1.5 py-0.5 rounded border border-amber-100">+Add</span>
                  </div>
                </div>
                {/* Active Orders List */}
                <div className="bg-white border border-slate-200/60 rounded-xl p-2.5">
                  <span className="text-[9px] font-extrabold uppercase text-slate-400 tracking-wider block mb-1.5">Kitchen Queues</span>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] bg-amber-50/50 p-1.5 rounded-md border border-amber-100/50">
                      <span className="font-bold text-slate-800">Table #4</span>
                      <span className="text-[9px] text-amber-600 font-semibold flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" /> 4m cooking
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Checkout Column */}
              <div className="col-span-4 bg-white border border-slate-200/60 rounded-xl p-2.5 flex flex-col justify-between shadow-sm">
                <div>
                  <span className="text-[9px] font-extrabold uppercase text-slate-400 block mb-2">Cart</span>
                  <div className="text-[9px] space-y-1 text-slate-600 border-b border-slate-100 pb-2">
                    <div className="flex justify-between">
                      <span>1x Butter Chicken</span>
                      <span>₹320</span>
                    </div>
                    <div className="flex justify-between">
                      <span>2x Garlic Naan</span>
                      <span>₹120</span>
                    </div>
                  </div>
                </div>
                <div className="pt-2">
                  <div className="flex justify-between text-[10px] font-bold text-slate-800 mb-2">
                    <span>Total</span>
                    <span>₹440</span>
                  </div>
                  <button className="w-full py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg text-[9px] shadow-xs">
                    Print Invoice
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case "prod-banquet-manager":
        return (
          <div className="w-full h-full bg-slate-50 flex flex-col p-4 text-left font-sans select-none overflow-hidden">
            <div className="flex justify-between items-center border-b border-slate-200/60 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-purple-600 flex items-center justify-center text-white text-[10px] font-bold">BM</div>
                <span className="text-xs font-bold text-slate-800">RoyalBanquet Suite</span>
              </div>
              <span className="text-[9px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-mono font-bold">Hall: Grand Ballroom</span>
            </div>
            {/* Booking Grid */}
            <div className="grid grid-cols-7 gap-1 text-center mb-3">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <span key={i} className="text-[8px] font-bold text-slate-400">{d}</span>
              ))}
              {[14, 15, 16, 17, 18, 19, 20].map((num) => {
                const isBooked = num === 17 || num === 18;
                return (
                  <div 
                    key={num} 
                    className={`p-1.5 rounded-lg text-[9px] font-bold ${
                      isBooked 
                        ? "bg-purple-600 text-white shadow-xs" 
                        : "bg-white text-slate-700 border border-slate-150"
                    }`}
                  >
                    {num}
                  </div>
                );
              })}
            </div>
            {/* Active Details Card */}
            <div className="bg-white border border-slate-200/60 rounded-xl p-3 flex-1 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[9px] font-bold uppercase text-slate-400">Selected Event</span>
                  <h4 className="text-[11px] font-extrabold text-slate-800 mt-0.5">Wedding Banquet: Malhotra Family</h4>
                </div>
                <span className="text-[9px] bg-purple-50 text-purple-600 border border-purple-100 font-bold px-2 py-0.5 rounded-full">Confirmed</span>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-100">
                <div>
                  <span className="text-[8px] text-slate-400 block">Total Budget</span>
                  <span className="text-[10px] font-extrabold text-slate-700">₹4,20,000</span>
                </div>
                <div>
                  <span className="text-[8px] text-slate-400 block">Guest Count</span>
                  <span className="text-[10px] font-extrabold text-slate-700">350 pax</span>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section 
      id="products" 
      className="relative py-28 px-4 bg-white overflow-hidden border-b border-slate-100"
    >
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-purple-400/5 blur-3xl rounded-full pointer-events-none select-none z-0" />
      
      <div className="w-full max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div id="products-header" className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-[11px] uppercase tracking-widest text-blue-600 font-bold bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-full inline-block mb-4">
            SaaS Products
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-5">
            Ready-to-Deploy Solutions
          </h2>
          <p className="font-sans text-base text-slate-600 leading-relaxed">
            Pre-engineered, customizable software products that can be fully customized, white-labeled, and launched for your business in a fraction of the time.
          </p>
        </div>

        {/* Tab Controls */}
        <div id="products-tabs" className="flex justify-center flex-wrap gap-2.5 mb-14 max-w-3xl mx-auto">
          {SAAS_PRODUCTS_DATA.map((product) => {
            const isActive = product.id === activeTab;
            return (
              <button
                id={`product-tab-btn-${product.id}`}
                key={product.id}
                onClick={() => setActiveTab(product.id)}
                className={`font-sans text-sm font-semibold flex items-center gap-2 px-5 py-3 rounded-full border transition-all duration-300 active:scale-95 ${
                  isActive 
                    ? "bg-slate-900 border-slate-900 text-white shadow-md shadow-slate-900/10" 
                    : "bg-slate-50 border-slate-200/60 text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                }`}
              >
                {renderProductIcon(product.id)}
                <span>{product.title}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Presentation Block */}
        <div id="products-showcase" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-slate-50/50 rounded-4xl border border-slate-200/50 p-8 lg:p-12">
          
          {/* Left: Metadata description */}
          <div id="products-meta-pane" className="lg:col-span-5 text-left flex flex-col justify-center">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-2">
              SaaS Blueprint Overview
            </span>
            <h3 className="font-sans text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
              {activeProduct.tagline}
            </h3>
            <p className="font-sans text-sm sm:text-base text-slate-600 leading-relaxed mb-8">
              {activeProduct.description}
            </p>

            <div className="space-y-4 mb-10">
              <span className="font-sans text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Featured Engineering Modules
              </span>
              <div className="grid grid-cols-2 gap-3">
                {activeProduct.modules.map((mod, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100 text-blue-600 shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="font-sans text-xs font-semibold text-slate-700">
                      {mod}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                id="products-request-demo-cta"
                href="#contact"
                className="inline-flex items-center justify-center gap-1.5 px-6 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-sans font-semibold text-sm shadow-md shadow-blue-500/10 transition-colors"
              >
                Request Custom Demo
              </a>
              <a
                id="products-browser-spec-cta"
                href={`#contact`}
                className="inline-flex items-center justify-center gap-1.5 px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-sans font-semibold text-sm transition-colors"
              >
                <span>{activeProduct.browserUrl}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right: High-Fidelity App UI simulator */}
          <div id="products-simulator-pane" className="lg:col-span-7 flex justify-center perspective-[1200px]">
            <motion.div
              key={activeProduct.id}
              initial={{ opacity: 0, scale: 0.95, rotateY: 10 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[580px] aspect-[1.25] bg-white rounded-3xl border border-slate-200 shadow-[0_24px_48px_rgba(15,23,42,0.06)] overflow-hidden flex flex-col hover:shadow-[0_32px_64px_rgba(15,23,42,0.1)] transition-shadow duration-300"
            >
              {/* Browser frame decoration */}
              <div className="bg-slate-100/70 border-b border-slate-200/80 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span className="font-mono text-[9px] text-slate-400 ml-4 bg-white px-3 py-0.5 rounded-full border border-slate-200/50">
                    https://{activeProduct.browserUrl}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[9px] font-mono text-emerald-600 font-bold bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md">
                  <span>SSL SECURED</span>
                </div>
              </div>

              {/* Sandbox Container */}
              <div className="flex-1 overflow-hidden relative">
                {renderSimulatedApp(activeProduct.id)}
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
