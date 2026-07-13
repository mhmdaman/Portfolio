import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Certifications from "../components/Certifications";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

import CursorParticles from "../components/CursorParticles";
import WeatherCanvas from "../components/WeatherCanvas";
import Lenis from "lenis";

const Portfolio = () => {
  const [weather, setWeather] = useState("clear");
  useEffect(() => {
    // 1. Initialize Lenis for smooth scroll
    const lenis = new Lenis({
      lerp: 0.1, // Smoothness intensity (0.1 is standard for buttery smooth feel)
      wheelMultiplier: 1.0,
      smoothWheel: true,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. Reveal on scroll observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    
    return () => {
      observer.disconnect();
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-neutral-950 text-neutral-100 font-body overflow-x-hidden grain">
      {/* Background elements that persist on scroll */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <WeatherCanvas weather={weather} />
        <CursorParticles density={0.00006} />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/0 via-neutral-950/20 to-neutral-950/0" />
      </div>

      <div className="relative z-10">
        <Header weather={weather} onWeatherChange={setWeather} />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
        <Footer />

      </div>
    </main>
  );
};

export default Portfolio;