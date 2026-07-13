import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, profile } from "../data/mock";
import WeatherSwitcher from "./WeatherSwitcher";

const Header = ({ weather, onWeatherChange }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (e, href) => {
    e.preventDefault();
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-neutral-950/80 backdrop-blur-md border-b border-neutral-900/50" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <a href="#top" onClick={(e) => handleNav(e, "#top")} className="flex items-center gap-2 group">
          <span className={`w-2.5 h-2.5 group-hover:rotate-45 transition-transform duration-500 ${scrolled ? "bg-neutral-950" : "bg-white"}`} />
          <span className={`font-display font-semibold tracking-tight transition-colors ${scrolled ? "text-neutral-950" : "text-white"}`}>
            {profile.firstName}<span className={scrolled ? "text-neutral-400" : "text-neutral-500"}>.</span>{profile.lastName.toLowerCase()}
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => handleNav(e, l.href)}
              className={`link-hover text-sm font-body transition-colors ${scrolled ? "text-neutral-700 hover:text-neutral-950" : "text-neutral-300 hover:text-white"}`}
            >
              <span className={`font-mono-alt mr-1.5 ${scrolled ? "text-neutral-400" : "text-neutral-500"}`}>0{i + 1}</span>
              {l.label}
            </a>
          ))}

          {/* Weather switcher — styled like a nav link */}
          <span className={`w-px h-4 ${scrolled ? "bg-neutral-300" : "bg-neutral-700"}`} />
          <WeatherSwitcher current={weather} onChange={onWeatherChange} scrolled={scrolled} />
        </nav>

        <a
          href="#contact"
          onClick={(e) => handleNav(e, "#contact")}
          className={`hidden md:inline-flex btn-primary items-center gap-2 px-4 py-2 text-sm border transition-colors ${scrolled ? "bg-neutral-950 text-white border-neutral-950 hover:bg-white hover:text-neutral-950" : "bg-white text-neutral-950 border-white hover:bg-transparent hover:text-white"}`}
        >
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
          Let&apos;s talk
        </a>

        <button onClick={() => setOpen(!open)} className={`md:hidden p-2 ${scrolled ? "text-neutral-950" : "text-white"}`} aria-label="menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-neutral-200">
          <div className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map((l, i) => (
              <a key={l.href} href={l.href} onClick={(e) => handleNav(e, l.href)} className="text-neutral-800 flex items-center gap-3">
                <span className="font-mono-alt text-neutral-400 text-xs">0{i + 1}</span>
                {l.label}
              </a>
            ))}
            <a href="#contact" onClick={(e) => handleNav(e, "#contact")} className="mt-2 inline-flex justify-center px-4 py-2 bg-neutral-950 text-white text-sm">
              Let&apos;s talk
            </a>
            <div className="pt-2 border-t border-neutral-200">
              <WeatherSwitcher current={weather} onChange={onWeatherChange} scrolled={true} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
