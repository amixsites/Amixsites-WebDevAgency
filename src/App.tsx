/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Products from "./components/Products";
import Projects from "./components/Projects";
import Process from "./components/Process";
import Trust from "./components/Trust";
import Contact from "./components/Contact";

export default function App() {
  return (
    <div id="app-root" className="min-h-screen bg-white text-slate-900 selection:bg-blue-600/10 selection:text-blue-600">
      
      {/* Dynamic Glass Pill Navigation Header */}
      <Navbar />

      <main id="main-content">
        {/* Interactive 3D Crystal Core Hero Segment */}
        <Hero />

        {/* Enterprise-Grade Solutions Service Grid */}
        <Services />

        {/* Cinematic E-Commerce Portfolio projects */}
        <Projects />

        {/* Ready-To-Deploy Customizable SaaS products list */}
        <Products />

        {/* 7-Step Battle-Tested Architectural Process */}
        <Process />

        {/* Real-time scaling metrics & Automated testimonials */}
        <Trust />

        {/* Direct WhatsApp connection & Custom proposal builder */}
        <Contact />
      </main>

    </div>
  );
}
