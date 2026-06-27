import { useState, useEffect, useRef, MouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Zap, Menu, X, PhoneCall } from "lucide-react";
import { BRAND_NAME, CONTACT_PHONE } from "../data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const magneticButtonRef = useRef<HTMLAnchorElement>(null);
  
  // Track scrolling to adjust navbar padding and glass strength
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Magnetic button hover effect
  const [magneticPos, setMagneticPos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!magneticButtonRef.current) return;
    const rect = magneticButtonRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    // Limit displacement to keep it subtle and elegant
    setMagneticPos({ x: x * 0.35, y: y * 0.35 });
  };

  const handleMouseLeave = () => {
    setMagneticPos({ x: 0, y: 0 });
  };

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "Products", href: "#products" },
    { name: "Process", href: "#process" },
    { name: "About", href: "#why-amix" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 flex justify-center px-4 pt-6 transition-all duration-500">
        <motion.div
          id="navbar-container"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className={`w-full max-w-5xl flex items-center justify-between rounded-full border border-slate-200/50 px-6 py-3 transition-all duration-500 ${
            scrolled 
              ? "bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] py-2.5 scale-[0.98]" 
              : "bg-white/40 backdrop-blur-md shadow-none py-3.5"
          }`}
        >
          {/* Logo & Brand */}
          <a id="nav-logo" href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-full bg-linear-to-tr from-blue-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-blue-500/10 group-hover:scale-105 transition-transform duration-300">
              <Zap className="w-4.5 h-4.5" />
            </div>
            <span className="font-sans text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
              {BRAND_NAME}<span className="text-blue-600">Sites</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav id="nav-desktop-links" className="hidden md:flex items-center gap-1.5 bg-slate-100/50 rounded-full p-1 border border-slate-200/20">
            {navLinks.map((link) => (
              <a
                id={`nav-link-${link.name.toLowerCase()}`}
                key={link.name}
                href={link.href}
                className="font-sans text-sm font-medium px-4 py-1.5 rounded-full text-slate-600 hover:text-slate-900 hover:bg-white transition-all duration-300 relative group"
              >
                {link.name}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
              </a>
            ))}
          </nav>

          {/* Call + Contact CTAs */}
          <div id="nav-ctas" className="hidden md:flex items-center gap-4">
            <a 
              id="nav-call-link"
              href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
              className="flex items-center gap-1.5 font-sans text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors duration-300"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{CONTACT_PHONE}</span>
            </a>

            <motion.a
              id="nav-magnetic-cta"
              ref={magneticButtonRef}
              href="#contact"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              animate={{ x: magneticPos.x, y: magneticPos.y }}
              transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.4 }}
              className="font-sans text-sm font-medium px-5 py-2.5 rounded-full text-white bg-blue-600 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 hover:bg-blue-700 active:scale-95 transition-all duration-300 flex items-center justify-center border border-blue-500/10"
            >
              Start a Project
            </motion.a>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            id="nav-mobile-trigger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center p-2 rounded-full hover:bg-slate-100 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-slate-800" /> : <Menu className="w-6 h-6 text-slate-800" />}
          </button>
        </motion.div>
      </header>

      {/* Mobile Drawer (iOS 17 Styled) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-drawer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              id="mobile-drawer-content"
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
              className="absolute top-0 left-0 w-full bg-white/95 backdrop-blur-2xl border-b border-slate-200 shadow-2xl px-6 pt-28 pb-10 flex flex-col gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link, index) => (
                  <motion.a
                    id={`mobile-link-${link.name.toLowerCase()}`}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-sans text-lg font-semibold text-slate-800 hover:text-blue-600 transition-colors duration-200 py-2 border-b border-slate-100"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>

              <div className="flex flex-col gap-4 mt-4">
                <a
                  id="mobile-call-link"
                  href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
                  className="flex items-center justify-center gap-2 py-3 rounded-full border border-slate-200 font-sans text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors duration-200"
                >
                  <PhoneCall className="w-4 h-4 text-slate-500" />
                  <span>Call Us: {CONTACT_PHONE}</span>
                </a>

                <a
                  id="mobile-cta-link"
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-sans text-center text-sm font-semibold shadow-lg shadow-blue-500/20"
                >
                  Start a Project
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
