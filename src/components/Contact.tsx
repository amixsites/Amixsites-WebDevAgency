import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Phone, 
  Mail, 
  Send, 
  CheckCircle, 
  MessageSquare, 
  Zap, 
  Twitter, 
  Linkedin, 
  Github, 
  Dribbble, 
  Globe 
} from "lucide-react";
import { 
  BRAND_NAME, 
  CONTACT_PHONE, 
  CONTACT_EMAIL, 
  CONTACT_WHATSAPP, 
  MADE_IN 
} from "../data";

export default function Contact() {
  const [selectedService, setSelectedService] = useState("Custom SaaS");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  // Form Submission Validation
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};
    if (!formData.name.trim()) errors.name = "Full name is required";
    if (!formData.email.trim()) {
      errors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.message.trim()) errors.message = "Message details are required";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setSubmitted(true);
  };

  const services = [
    "School ERP",
    "Restaurant POS",
    "Banquet Management",
    "E-Commerce",
    "Business Website",
    "Custom SaaS"
  ];

  // WhatsApp prefilled message URL
  const waPrefilledMsg = `Hi 👋\nI'm interested in developing a website, SaaS application, ERP, POS system, or custom software for my business.\nCan we discuss the requirements and pricing?`;
  const waUrl = `${CONTACT_WHATSAPP}?text=${encodeURIComponent(waPrefilledMsg)}`;

  return (
    <section 
      id="contact" 
      className="relative pt-24 pb-12 px-6 bg-white overflow-hidden"
    >
      {/* Light gradient backdrop */}
      <div className="absolute bottom-0 left-0 right-0 h-[400px] bg-linear-to-t from-blue-50/50 via-white to-white pointer-events-none select-none z-0" />

      <div className="w-full max-w-7xl mx-auto relative z-10">
        
        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 pb-20 border-b border-slate-100">
          
          {/* Left Column: Direct Links, Brand pitch, Availability */}
          <div id="contact-info-block" className="lg:col-span-5 text-left flex flex-col justify-between">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-widest text-blue-600 font-bold bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-full inline-block mb-4">
                Connect With Us
              </span>
              <h2 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
                Let's Design and Build Something World-Class
              </h2>
              <p className="font-sans text-sm sm:text-base text-slate-600 leading-relaxed mb-10">
                Have a customized concept, software blueprint, or manual workflow you want to automate? Fill out the proposal form, or schedule a direct architectural sync below.
              </p>

              {/* Channels List */}
              <div className="space-y-5 mb-10">
                <a 
                  id="contact-channel-whatsapp"
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-emerald-50/40 hover:bg-emerald-50 border border-emerald-100 p-4 rounded-2xl group transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                    <MessageSquare className="w-5 h-5 fill-white" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400 font-bold block">Instant Chat</span>
                    <span className="font-sans text-sm font-bold text-emerald-700 block">WhatsApp: {CONTACT_PHONE}</span>
                  </div>
                </a>

                <a 
                  id="contact-channel-phone"
                  href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
                  className="flex items-center gap-4 bg-blue-50/40 hover:bg-blue-50 border border-blue-100 p-4 rounded-2xl group transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400 font-bold block">Hotline Call</span>
                    <span className="font-sans text-sm font-bold text-blue-700 block">Phone: {CONTACT_PHONE}</span>
                  </div>
                </a>

                <a 
                  id="contact-channel-email"
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="flex items-center gap-4 bg-slate-50 hover:bg-slate-100/70 border border-slate-200/50 p-4 rounded-2xl group transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400 font-bold block">Electronic Mail</span>
                    <span className="font-sans text-sm font-bold text-slate-800 block">Email: {CONTACT_EMAIL}</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Status updates */}
            <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4.5 flex items-center justify-between">
              <div className="text-left">
                <span className="font-sans text-xs font-bold text-slate-800 block mb-0.5">Availability Status</span>
                <p className="font-sans text-xs text-slate-500">Currently taking custom projects.</p>
              </div>
              <div className="flex items-center gap-1.5 bg-emerald-100 text-emerald-800 font-sans text-[11px] font-bold px-3 py-1 rounded-full border border-emerald-200">
                <span className="h-2 w-2 rounded-full bg-emerald-600 inline-block animate-pulse" />
                <span>ACTIVE</span>
              </div>
            </div>

          </div>

          {/* Right Column: High Fidelity Request Form */}
          <div id="contact-form-block" className="lg:col-span-7">
            
            <div className="bg-slate-50/50 border border-slate-200/50 rounded-4xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.01)] relative overflow-hidden">
              
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form 
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6 text-left"
                  >
                    
                    {/* Project Scope Segment */}
                    <div className="space-y-2">
                      <label className="font-sans text-xs font-bold uppercase tracking-wider text-slate-400 block">
                        What platform are you looking to build?
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {services.map((serv) => {
                          const isSelected = selectedService === serv;
                          return (
                            <button
                              id={`contact-service-btn-${serv.toLowerCase().replace(/\s/g, "-")}`}
                              key={serv}
                              type="button"
                              onClick={() => setSelectedService(serv)}
                              className={`font-sans text-xs font-bold px-3 py-2.5 rounded-xl border transition-all duration-300 ${
                                isSelected 
                                  ? "bg-slate-900 border-slate-900 text-white shadow-xs" 
                                  : "bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100/50"
                              }`}
                            >
                              {serv}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Simple details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="name-input" className="font-sans text-xs font-bold uppercase tracking-wider text-slate-400 block">Full Name</label>
                        <input
                          id="name-input"
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Rahul Sharma"
                          className={`w-full bg-white border rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all ${
                            formErrors.name ? "border-red-400 focus:ring-red-400/20 focus:border-red-500" : "border-slate-200"
                          }`}
                        />
                        {formErrors.name && <span className="text-[11px] text-red-500 font-semibold">{formErrors.name}</span>}
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="email-input" className="font-sans text-xs font-bold uppercase tracking-wider text-slate-400 block">Email Address</label>
                        <input
                          id="email-input"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="rahul@company.com"
                          className={`w-full bg-white border rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all ${
                            formErrors.email ? "border-red-400 focus:ring-red-400/20 focus:border-red-500" : "border-slate-200"
                          }`}
                        />
                        {formErrors.email && <span className="text-[11px] text-red-500 font-semibold">{formErrors.email}</span>}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="phone-input" className="font-sans text-xs font-bold uppercase tracking-wider text-slate-400 block">Phone Number (Optional)</label>
                      <input
                        id="phone-input"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="message-input" className="font-sans text-xs font-bold uppercase tracking-wider text-slate-400 block">Project Description</label>
                      <textarea
                        id="message-input"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Detail your requirements, scale timelines, integrations..."
                        className={`w-full bg-white border rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all ${
                          formErrors.message ? "border-red-400 focus:ring-red-400/20 focus:border-red-500" : "border-slate-200"
                        }`}
                      />
                      {formErrors.message && <span className="text-[11px] text-red-500 font-semibold">{formErrors.message}</span>}
                    </div>

                    <button
                      id="contact-submit-btn"
                      type="submit"
                      className="w-full py-4 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-sans font-semibold text-sm shadow-lg shadow-slate-900/10 flex items-center justify-center gap-2 transition-all active:scale-98"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Project Proposal</span>
                    </button>

                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-14 text-center space-y-6 flex flex-col items-center justify-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shadow-md">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="font-sans text-xl font-extrabold text-slate-900 mb-2">Proposal Received Successfully!</h3>
                      <p className="font-sans text-sm text-slate-500 max-w-sm mx-auto">
                        Thank you, <strong className="text-slate-800">{formData.name}</strong>. Our lead solutions architect will review your <strong className="text-slate-800">{selectedService}</strong> specifications and reach out within 2 hours.
                      </p>
                    </div>
                    <button
                      id="contact-reset-btn"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: "", email: "", phone: "", message: "" });
                      }}
                      className="font-sans text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 border border-blue-100 px-5 py-2.5 rounded-full transition-all"
                    >
                      Send Another Inquiry
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </div>

        </div>

        {/* FOOTER BLOCK (MAPPED PERFECTLY FROM WEBPAGE_CONTENT) */}
        <footer id="footer" className="pt-16 grid grid-cols-2 md:grid-cols-12 gap-8 text-left relative z-10">
          
          {/* Brand Col */}
          <div className="col-span-2 md:col-span-4 flex flex-col gap-4 text-left">
            <a href="#" className="flex items-center gap-2.5 group w-fit">
              <div className="w-9 h-9 rounded-full bg-linear-to-tr from-blue-600 to-violet-600 flex items-center justify-center text-white shadow-xs">
                <Zap className="w-4.5 h-4.5" />
              </div>
              <span className="font-sans text-xl font-bold tracking-tight text-slate-900">
                {BRAND_NAME}<span className="text-blue-600">Sites</span>
              </span>
            </a>
            <p className="font-sans text-xs text-slate-500 leading-relaxed max-w-xs">
              Building modern software that powers schools, restaurants, and businesses worldwide. Your digital transformation partner.
            </p>
            {/* Social handles */}
            <div className="flex gap-3 mt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors" aria-label="GitHub">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors" aria-label="Dribbble">
                <Dribbble className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div className="col-span-1 md:col-span-2 flex flex-col gap-3">
            <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Services</h4>
            <a href="#services" className="font-sans text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors">School ERP</a>
            <a href="#services" className="font-sans text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors">Restaurant POS</a>
            <a href="#services" className="font-sans text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors">Banquet Manager</a>
            <a href="#services" className="font-sans text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors">E-Commerce</a>
            <a href="#services" className="font-sans text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors">Business Websites</a>
          </div>

          {/* Products Column */}
          <div className="col-span-1 md:col-span-2 flex flex-col gap-3">
            <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Products</h4>
            <a href="#products" className="font-sans text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors">School ERP</a>
            <a href="#products" className="font-sans text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors">Restaurant POS</a>
            <a href="#products" className="font-sans text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors">Banquet Manager</a>
          </div>

          {/* Company Column */}
          <div className="col-span-1 md:col-span-2 flex flex-col gap-3">
            <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Company</h4>
            <a href="#why-amix" className="font-sans text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors">About Us</a>
            <a href="#process" className="font-sans text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors">Our Process</a>
            <a href="#projects" className="font-sans text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors">Projects</a>
            <a href="#contact" className="font-sans text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors">Contact</a>
          </div>

          {/* Legal Column */}
          <div className="col-span-1 md:col-span-2 flex flex-col gap-3">
            <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Legal</h4>
            <a href="#" className="font-sans text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors">Privacy Policy</a>
            <a href="#" className="font-sans text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors">Terms of Service</a>
          </div>

          {/* Bottom Copyright & Location info */}
          <div className="col-span-2 md:col-span-12 border-t border-slate-100 pt-8 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
            <span className="font-sans text-xs text-slate-400">
              © 2026 {BRAND_NAME}. All rights reserved.
            </span>
            <span className="font-sans text-xs text-slate-400 flex items-center gap-1">
              Crafted with ❤️ in <span className="font-bold text-slate-600">{MADE_IN}</span>
            </span>
          </div>

        </footer>

      </div>
    </section>
  );
}
