import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Phone } from "lucide-react";
import { CONTACT_PHONE } from "../data";

const WA_NUMBER = "919246891902";
const WA_MESSAGE = "Hi Amix, I found your website and I'm interested in discussing my project. Can you help me?";
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;

const CTA_MESSAGES = [
  "Need a website or software?",
  "Let's discuss your project 🚀",
];

export default function FloatingContact() {
  const [visible, setVisible] = useState(false);
  const [hiddenByProcess, setHiddenByProcess] = useState(false);
  const [ctaIndex, setCTAIndex] = useState(0);
  const [showCTA, setShowCTA] = useState(false);
  const [waTooltip, setWaTooltip] = useState(false);
  const [callTooltip, setCallTooltip] = useState(false);
  const ctaTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Entrance animation after page load
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Show CTA badge after 3s, then rotate messages
  useEffect(() => {
    const showTimer = setTimeout(() => setShowCTA(true), 3000);
    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!showCTA) return;
    ctaTimerRef.current = setInterval(() => {
      setCTAIndex((prev) => (prev + 1) % CTA_MESSAGES.length);
    }, 4000);
    return () => {
      if (ctaTimerRef.current) clearInterval(ctaTimerRef.current);
    };
  }, [showCTA]);

  // Hide when Process (Flow) section is in view
  useEffect(() => {
    const processSection = document.getElementById("process");
    if (!processSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHiddenByProcess(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(processSection);
    return () => observer.disconnect();
  }, []);

  const shouldShow = visible && !hiddenByProcess;

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 60 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3 sm:bottom-7 sm:right-7"
          aria-label="Floating contact buttons"
        >
          {/* CTA Badge */}
          <AnimatePresence mode="wait">
            {showCTA && (
              <motion.div
                key={ctaIndex}
                initial={{ opacity: 0, y: 6, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.9 }}
                transition={{ duration: 0.35 }}
                className="mr-1 px-3.5 py-2 rounded-xl bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-lg text-xs font-semibold text-slate-700 max-w-[200px] text-center select-none pointer-events-none"
              >
                {CTA_MESSAGES[ctaIndex]}
              </motion.div>
            )}
          </AnimatePresence>

          {/* WhatsApp Button */}
          <div className="relative flex items-center gap-2">
            {/* Tooltip */}
            <AnimatePresence>
              {waTooltip && (
                <motion.span
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-full mr-3 whitespace-nowrap px-3 py-1.5 rounded-lg bg-slate-900 text-white text-[11px] font-semibold shadow-lg pointer-events-none"
                >
                  Chat with Amix
                </motion.span>
              )}
            </AnimatePresence>

            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              onMouseEnter={() => setWaTooltip(true)}
              onMouseLeave={() => setWaTooltip(false)}
              className="relative group w-14 h-14 rounded-full flex items-center justify-center bg-[#25D366] hover:bg-[#1ebe5b] shadow-[0_8px_24px_rgba(37,211,102,0.35)] hover:shadow-[0_12px_32px_rgba(37,211,102,0.5)] hover:scale-110 active:scale-95 transition-all duration-300"
            >
              {/* Pulse ring */}
              <span className="absolute inset-0 rounded-full bg-[#25D366] animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite] opacity-30" />

              {/* WhatsApp SVG */}
              <svg
                viewBox="0 0 24 24"
                fill="white"
                className="w-7 h-7 relative z-10"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
          </div>

          {/* Call Button */}
          <div className="relative flex items-center gap-2">
            {/* Tooltip */}
            <AnimatePresence>
              {callTooltip && (
                <motion.span
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-full mr-3 whitespace-nowrap px-3 py-1.5 rounded-lg bg-slate-900 text-white text-[11px] font-semibold shadow-lg pointer-events-none"
                >
                  Call Now
                </motion.span>
              )}
            </AnimatePresence>

            <a
              href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
              aria-label="Call us"
              onMouseEnter={() => setCallTooltip(true)}
              onMouseLeave={() => setCallTooltip(false)}
              className="relative group w-12 h-12 rounded-full flex items-center justify-center bg-white/70 backdrop-blur-xl border border-slate-200/60 shadow-[0_6px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.12)] hover:scale-110 hover:bg-blue-600 hover:border-blue-600 active:scale-95 transition-all duration-300"
            >
              <Phone className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors duration-300" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
